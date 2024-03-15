<script setup lang="ts">
  import { ref, onMounted } from 'vue';

  import telInput from './components/tel-input/tel-input.vue';

  const phone = ref();
</script>

<template>
  {{ phone }}
  <telInput v-model="phone" />
</template>
