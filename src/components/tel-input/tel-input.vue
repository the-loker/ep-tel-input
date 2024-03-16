<script lang="ts" setup>
  import { defineProps, defineEmits, defineExpose } from 'vue';
  import { inputProps, inputEmits } from './tel-input';
  import { useTelInput } from './use-tel-input';

  const props = defineProps(inputProps);
  const emits = defineEmits(inputEmits);

  const { value, selectedCounry, isValid } = useTelInput(props, emits);

  defineExpose({ isValid });
</script>

<template>
  <el-input v-model="value" type="tel">
    <template #prepend>
      <el-select
        v-model="selectedCounry"
        placeholder="Select"
        style="width: 70px"
        filterable
      >
        <!-- <el-option v-for="" /> -->
        <el-option label="RU" value="RU" />
        <el-option label="UA" value="UA" />
        <el-option label="KZ" value="KZ" />
        <el-option label="BY" value="BY" />
      </el-select>
    </template>
  </el-input>
</template>
