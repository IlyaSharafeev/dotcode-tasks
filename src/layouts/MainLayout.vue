<template lang="pug">
router-view(v-slot="{ Component }")
  transition(name="fade", mode="out-in")
    component(:is="Component")
</template>

<script lang="ts" setup></script>
