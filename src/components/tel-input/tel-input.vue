<script lang="ts" setup>
  import { defineProps, defineEmits, defineExpose } from 'vue';
  import { inputProps, inputEmits } from './tel-input';
  import { useTelInput } from './use-tel-input';
  import { useTelInputLocale } from './use-tel-input-locale';

  const props = defineProps(inputProps);
  const emits = defineEmits(inputEmits);

  const { value, countries, searchValue, selectedCountry, isValid } =
    useTelInput(props, emits);
  const { t } = useTelInputLocale(props.locale);

  defineExpose({ isValid });
</script>

<template>
  {{ selectedCountry }}
  <el-input v-model="value" type="tel">
    <template #prepend>
      <div class="ep-countries-select">
        <el-select v-model="selectedCountry" style="width: 70px">
          <template #header>
            <el-input v-model="searchValue" :placeholder="t('input.search')" />
          </template>

          <template #prefix>
            <span
              v-if="selectedCountry"
              class="el-flag"
              :class="'el-flag--' + selectedCountry.toLocaleLowerCase()"
            ></span>
          </template>

          <el-option
            v-for="country in countries"
            :key="country.code"
            :label="country.name"
            :value="country.code"
          >
            <div class="ep-country-option">
              <span
                class="el-flag"
                :class="'el-flag--' + country.code.toLocaleLowerCase()"
              ></span>
              <span>{{ country.name }}</span>
            </div>
          </el-option>
        </el-select>
      </div>
    </template>
  </el-input>
</template>

<style lang="scss">
  @import "./assets/styles/index.scss";

  .ep-countries-select {
    display: flex;

    .el-select__selection {
      visibility: hidden;
    }
  }

  .ep-country-option {
    display: flex;
    align-items: center;
    flex-direction: row;

    .el-flag {
      margin-right: 10px;
    }
  }

</style>
