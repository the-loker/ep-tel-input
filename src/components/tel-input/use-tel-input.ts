import { ref, computed, watch } from 'vue';

import {
  phoneValidate,
  clearPhoneCode,
  makeInternationalPhone,
  cleanInvalidCharacters,
  getInternationalPhoneCode,
} from './utils';

import type { SetupContext } from 'vue';
import type { CountryCode } from 'libphonenumber-js';
import type { TProps, TEmits } from './tel-input';

export const useTelInput = (
  props: TProps,
  emits: SetupContext<TEmits>['emit']
) => {
  const selectedCounry = ref<CountryCode>('RU');

  const value = computed({
    get() {
      return phoneFromated.value;
    },
    set(value) {
      if (!value || !value.replace(/\D/g, '')) value = '';

      if (value) {
        value = cleanInvalidCharacters(value);
      }

      emits(
        'update:modelValue',
        makeInternationalPhone(value, selectedCounry.value)
      );
    },
  });

  watch(selectedCounry, changePhoneCode, { deep: true });

  function changePhoneCode(
    newCountryCode: CountryCode,
    oldCountryCode: CountryCode
  ) {
    if (!props.modelValue) return;

    const cleanPhone = clearPhoneCode(props.modelValue, oldCountryCode);

    emits(
      'update:modelValue',
      `${getInternationalPhoneCode(newCountryCode)} ${cleanPhone}`
    );
  }

  const phoneFromated = computed(() => {
    if (!props.modelValue || !props.modelValue.replace(/\D/g, '')) {
      return getInternationalPhoneCode(selectedCounry.value);
    }

    return makeInternationalPhone(props.modelValue, selectedCounry.value);
  });

  function isValid(): boolean {
    return phoneValidate(props.modelValue, selectedCounry.value);
  }

  return {
    value,
    selectedCounry,
    isValid,
  };
};
