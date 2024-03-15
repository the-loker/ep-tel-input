<script setup lang="ts">
  import { ref } from 'vue';

  import telInput from './components/tel-input/tel-input.vue';

  const phone = ref();
</script>

<template>
  <telInput v-model="phone" />
</template>
