import { ref, computed } from 'vue';
import { getPhoneCode, parsePhoneNumberFromString } from 'libphonenumber-js';

import type { SetupContext } from 'vue';
import type { CountryCode } from 'libphonenumber-js';
import type { TProps, TEmits } from './tel-input';

function makeInternationalPhone(phoneStr: string, countryCode: CountryCode) {
  const phone = parsePhoneNumberFromString(phoneStr, countryCode);

  if (!phone) return phoneStr;

  return phone.formatInternational();
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
      if (!value) value = '';

      emits(
        'update:modelValue',
        makeInternationalPhone(value, selectedCounry.value)
      );
    },
  });

  const phoneFromated = computed(() => {
    if (!props.modelValue) {
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
