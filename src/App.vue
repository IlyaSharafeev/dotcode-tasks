<template>
  <component :is="layout"></component>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import MainLayout from "./layouts/MainLayout.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const layout = computed(() => {
  return router.currentRoute.value.meta.layout || MainLayout;
});
</script>

<style></style>
