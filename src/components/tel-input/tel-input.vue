<script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue';
  import { inputProps, inputEmits } from './tel-input';
  import { useTelInput } from './use-tel-input';

  const props = defineProps(inputProps);
  const emits = defineEmits(inputEmits);

  const { onInput } = useTelInput(props, emits);
</script>

<template>
  <el-input v-model="props.modelValue" @input="onInput"></el-input>
</template>
