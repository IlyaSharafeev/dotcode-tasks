<template>
  <div>
    <draggable-resizable-container
      :grid="[10, 10]"
      :show-grid="true"
      class="container"
    >
      <draggable-resizable-vue
        v-for="(element, index) in dataElements"
        :key="index"
        v-model:x="element.x"
        v-model:y="element.y"
        v-model:h="element.height"
        v-model:w="element.width"
        v-model:active="element.isActive"
        class="element"
        @activated="handleElementActivated(index)"
        @deactivated="handleElementDeactivated(index)"
        @dragstop="handleElementDragged"
        @resizestop="saveElementPositions"
        :style="{ zIndex: element.zIndex }"
      >
        Element {{ element.id }}
        <q-btn
          color="white"
          text-color="black"
          @click="removeElement(index)"
          class="delete-btn"
        />
      </draggable-resizable-vue>
    </draggable-resizable-container>
    <q-btn
      color="white"
      text-color="black"
      label="+"
      @click="addElement"
      class="add-btn"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import {
  DraggableResizableVue,
  DraggableResizableContainer,
} from "draggable-resizable-vue3";

const dataElements = ref([
  {
    id: 1,
    x: 20,
    y: 20,
    width: 300,
    height: 100,
    zIndex: 2,
    isActive: false,
  },
  {
    id: 2,
    x: 400,
    y: 60,
    width: 300,
    height: 100,
    zIndex: 2,
    isActive: false,
  },
  {
    id: 3,
    x: 20,
    y: 300,
    width: 300,
    height: 100,
    zIndex: 2,
    isActive: false,
  },
  {
    id: 4,
    x: 400,
    y: 390,
    width: 300,
    height: 100,
    zIndex: 2,
    isActive: false,
  },
  {
    id: 5,
    x: 400,
    y: 590,
    width: 300,
    height: 100,
    zIndex: 2,
    isActive: false,
  },
]);

const handleElementActivated = (index) => {
  dataElements.value[index].zIndex = 9999;
};

const handleElementDeactivated = (index) => {
  dataElements.value[index].zIndex = 0;
};

const localStorageKey = "savedElementPositions";

const saveElementPositions = () => {
  localStorage.setItem(localStorageKey, JSON.stringify(dataElements.value));
};

const loadElementPositions = () => {
  const savedPositions = localStorage.getItem(localStorageKey);
  if (savedPositions) {
    dataElements.value = JSON.parse(savedPositions);
  }
};

onMounted(() => {
  loadElementPositions();
});

const handleElementDragged = () => {
  saveElementPositions();
};

const addElement = () => {
  saveElementPositions();
  const containerWidth = document.querySelector(".container").offsetWidth;
  const containerHeight = document.querySelector(".container").offsetHeight;
  const savedPositions = localStorage.getItem(localStorageKey);
  let newId = JSON.parse(savedPositions).length;

  const newElement = {
    id: ++newId,
    x: (containerWidth - 300) / 2,
    y: (containerHeight - 100) / 2,
    width: 300,
    height: 100,
    zIndex: 2,
    isActive: false,
  };
  dataElements.value.push(newElement);
  saveElementPositions();
};

const removeElement = (index) => {
  dataElements.value.splice(index, 1);
  saveElementPositions();
};
</script>

<style lang="scss">
.container {
  width: 100%;
  height: 100vh;

  .element {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    font-weight: bold;
    background-color: #7676ff;
    border-radius: 15px;
    border: 1px solid #ffffff;
    color: white;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
      rgba(0, 0, 0, 0.22) 0px 10px 10px;

    .delete-btn {
      background: url("@/assets/icons/delete-icon.svg") center no-repeat !important;
      background-color: white !important;
      width: 10px !important;
      height: 10px !important;
      padding: 15px;
    }
  }
}

.add-btn {
  background-color: white;
  position: absolute;
  bottom: 30px;
  right: 30px;
  cursor: pointer;
  width: 50px;
  height: 50px;
  font-weight: bolder;
  border-radius: 100%;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}
</style>
