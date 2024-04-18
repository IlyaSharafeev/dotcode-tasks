<template lang="pug">
.bitcoin-transactions
  router-link(to="/" )
    q-btn.go-home(color='white' text-color='black' label='home')
  .control-buttons
    q-btn(color="secondary" label="Запуск" @click="subscribeToTransactions")
    q-btn(color="red" label="Зупинка" @click="unsubscribetoTransactions")
    q-btn(color="amber" label="Сброс" @click="resetTransactions")
  q-table(:title="`Amount: ${amount} BTC`" :rows="rows" :columns="columns" row-key="name")
</template>

<script setup lang="ts">
import { onUnmounted, reactive, ref } from "vue";
import { useWebSocket } from "@vueuse/core";
import { Transaction, TransactionInfo } from "@/types/transaction.interface";

onUnmounted(() => {
  close();
});

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

let rows = ref<TransactionInfo[]>([]);

const updateAmount = (transaction: Transaction) => {
  let sum = 0;
  if (transaction && transaction.x && transaction.x.out) {
    const outputs = transaction.x.out;
    outputs.forEach((output) => {
      sum += output.value;
    });
  }
  amount.value += sum;
};

const getTransactionInfo = (transaction: Transaction) => {
  if (
    !transaction ||
    !transaction.x ||
    !transaction.x.inputs ||
    !transaction.x.out
  ) {
    return { from: "Unknown", to: "Unknown", sum: 0 }; // Return default values if transaction data is incomplete
  }

  const inputs = transaction.x.inputs;
  const outputs = transaction.x.out;

  const from = inputs.length > 0 ? inputs[0].prev_out.addr : "Unknown";

  const to = outputs.length > 0 ? outputs[0].addr : "Unknown";

  let sum = 0;
  outputs.forEach((output) => {
    sum += output.value;
  });

  updateAmount(transaction);

  return { from, to, sum } as TransactionInfo;
};

const { status, data, close, send } = useWebSocket(
  `${process.env.VUE_APP_API_URL}`,
  {
    autoReconnect: true,
    onMessage: (ws: WebSocket, event: MessageEvent) => {
      const transactionInfo: TransactionInfo = getTransactionInfo(
        JSON.parse(event.data)
      );
      rows.value.unshift(transactionInfo);
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

  rows.value = [];
};
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
