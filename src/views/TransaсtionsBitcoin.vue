<template lang="pug">
.bitcoin-transactions
  .control-buttons
    q-btn(color="secondary" label="Запуск" @click="subscribeToTransactions")
    q-btn(color="red" label="Зупинка" @click="unsubscribetoTransactions")
    q-btn(color="amber" label="Сброс" @click="resetTransactions")
  q-table(:title="`Amount: ${amount}`" :rows="rows" :columns="columns" row-key="name")
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useWebSocket } from "@vueuse/core";

const updateAmount = (transaction) => {
  let sum = 0;
  if (transaction && transaction.x && transaction.x.out) {
    const outputs = transaction.x.out;
    outputs.forEach((output) => {
      sum += output.value;
    });
  }
  amount.value += sum;
};

const getTransactionInfo = (transaction) => {
  if (
    !transaction ||
    !transaction.x ||
    !transaction.x.inputs ||
    !transaction.x.out
  ) {
    return { from: "Unknown", to: "Unknown", sum: 0 }; // Return default values if transaction data is incomplete
  }

  // Get input and output data from the transaction
  const inputs = transaction.x.inputs;
  const outputs = transaction.x.out;

  // Determine the sender (from) - first address from inputs
  const from = inputs.length > 0 ? inputs[0].prev_out.addr : "Unknown";

  // Determine the recipient (to) - first address from outputs
  const to = outputs.length > 0 ? outputs[0].addr : "Unknown";

  // Calculate the transaction amount (sum) - sum of all output values
  let sum = 0;
  outputs.forEach((output) => {
    sum += output.value;
  });

  // Update the total amount
  updateAmount(transaction);

  // Return an object with the determined parameters
  return { from, to, sum };
};

const { status, data, close, send } = useWebSocket(
  "wss://ws.blockchain.info/inv",
  {
    autoReconnect: true,
    onMessage: (ws, event) => {
      const transactionInfo = getTransactionInfo(JSON.parse(event.data));
      console.log(JSON.parse(event.data));
      // console.log(transactionInfo);
      rows.unshift(transactionInfo);
    },
  }
);

const subscribeToTransactions = () => {
  send("{ op: ping }");

  send("{ op: unconfirmed_sub }");

  send("{ op: addr_sub, addr: $bitcoin_address }");
};

const unsubscribetoTransactions = () => {
  send("{ op: unconfirmed_unsub }");

  send("{ op: addr_unsub, addr: $bitcoin_address }");
};

const resetTransactions = () => {
  amount.value = 0;

  rows = [];
};

const amount = ref(0);

const columns = [
  {
    name: "name",
    required: true,
    label: "From",
    align: "left",
    field: "from",
    sortable: true,
  },
  {
    name: "calories",
    align: "center",
    label: "To",
    field: "to",
    sortable: true,
  },
  { name: "fat", label: "Sum", field: "sum", sortable: true },
];

let rows = reactive([]);
</script>

<style scoped lang="scss">
.bitcoin-transactions {
  display: flex;
  gap: 35px;
  flex-direction: column;
  margin-top: 100px;
  padding: 0 50px;

  .control-buttons {
    display: flex;
    justify-content: space-between;
    flex-direction: row;

    .btn {
      padding: 5px 10px;
      border-radius: 10px;
      color: white;

      &-start {
        background-color: green;
      }

      &-stop {
        background-color: red;
      }

      &-reset {
        background-color: yellow;
      }
    }
  }

  .total-count {
    padding: 20px 0;
  }
}
</style>
