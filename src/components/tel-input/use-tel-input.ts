import { ref, watch } from 'vue';
import { getPhoneCode, parsePhoneNumberFromString } from 'libphonenumber-js';

import type { SetupContext } from 'vue';
import type { CountryCode } from 'libphonenumber-js';
import type { TProps, TEmits } from './tel-input';

export const useTelInput = (
  props: TProps,
  emits: SetupContext<TEmits>['emit']
) => {
  const phoneValue = ref<string>('');
  const selectedCounry = ref<CountryCode>('RU');

  function watchPhoneValue(value: string) {
    if (!value || !value.replace(/\D/g, '')) {
      phoneValue.value = `+${getPhoneCode(selectedCounry.value)}`;

      emits('update:modelValue', phoneValue.value);

      return;
    }

    const phone = parsePhoneNumberFromString(value, selectedCounry.value);

    if (!phone) {
      return emits('update:modelValue', value);
    }

    if (phone) {
      phoneValue.value = phone.formatInternational();

      emits('update:modelValue', phone.formatInternational());
    }
  }

  function setDefaultValue(countryCode: CountryCode): void {
    phoneValue.value = `+${getPhoneCode(countryCode)}`;
  }

  watch(phoneValue, watchPhoneValue, {
    deep: true,
    immediate: true,
  });

  watch(selectedCounry, setDefaultValue, { deep: true });

  function isValid(): boolean {
    const phone = parsePhoneNumberFromString(
      props.modelValue,
      selectedCounry.value
    );

    if (!phone) return false;

    return phone.isValid();
  }

  return {
    phoneValue,
    selectedCounry,
    isValid,
  };
};
