import { ref, computed, watch } from 'vue';
import { getPhoneCode, parsePhoneNumberFromString } from 'libphonenumber-js';

import type { SetupContext } from 'vue';
import type { CountryCode } from 'libphonenumber-js';
import type { TProps, TEmits } from './tel-input';

function makeInternationalPhone(phoneStr: string, countryCode: CountryCode) {
  const phone = parsePhoneNumberFromString(phoneStr, countryCode);

  if (!phone) return phoneStr;

  return phone.formatInternational();
}

function clearPhoneCode(value: string, countryCode: CountryCode) {
  let regexp = new RegExp(`\\${getInternationalPhoneCode(countryCode)}`);

  return value.replace(regexp, '').trim();
}

function getInternationalPhoneCode(countryCode: CountryCode) {
  return `+${getPhoneCode(countryCode)}`;
}

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
    const phone = parsePhoneNumberFromString(
      props.modelValue,
      selectedCounry.value
    );

    if (!phone) return false;

    return phone.isValid();
  }

  return {
    value,
    selectedCounry,
    isValid,
  };
};
