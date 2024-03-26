import { ref, computed, watch } from 'vue';

import {
  phoneValidate,
  clearPhoneCode,
  makeInternationalPhone,
  cleanInvalidCharacters,
  getInternationalPhoneCode,
  countryMatches,
} from './utils';
import { useTelInputLocale } from './use-tel-input-locale';
import allCountries from './countries';

import type { SetupContext } from 'vue';
import type { CountryCode } from 'libphonenumber-js';
import type { TProps, TEmits } from './tel-input';

export interface ICountry {
  name: string;
  code: CountryCode;
}

export type TCountries = {
  [key in CountryCode]: ICountry;
};

export const useTelInput = (
  props: TProps,
  emits: SetupContext<TEmits>['emit']
) => {
  const { t } = useTelInputLocale(props.locale);
  const selectedCountry = ref<CountryCode>(
    props.defaultCountry || allCountries[0]
  );
  const searchValue = ref<string>('');

  const value = computed({
    get() {
      return phoneFromated.value;
    },
    set(value) {
      const phoneCode = getInternationalPhoneCode(selectedCountry.value);
      const isIncorrect = !(
        clearPhoneCode(value, selectedCountry.value) &&
        value.startsWith(phoneCode)
      );

      if (!value || isIncorrect) {
        value = phoneCode;

        emits('update:modelValue', '');

        return;
      }

      value = cleanInvalidCharacters(value);

      emits(
        'update:modelValue',
        makeInternationalPhone(value, selectedCountry.value)
      );
    },
  });

  const countries = computed(() => {
    const countries = {} as TCountries;
    const firstCountries = {} as TCountries;

    for (let i = 0; i < allCountries.length; i++) {
      const hasFirstCountry =
        props.firstCountries.length &&
        props.firstCountries.includes(allCountries[i]);

      if (props.onlyCountries.length) {
        if (!searchValue.value) {
          if (!props.onlyCountries.includes(allCountries[i])) continue;

          countries[allCountries[i]] = {
            name: t(`countries.${allCountries[i]}`),
            code: allCountries[i],
          };

          continue;
        }

        if (searchValue.value) {
          const isMatchCountry = countryMatches(
            searchValue.value,
            t(`countries.${allCountries[i]}`)
          );

          if (isMatchCountry && props.onlyCountries.includes(allCountries[i])) {
            countries[allCountries[i]] = {
              name: t(`countries.${allCountries[i]}`),
              code: allCountries[i],
            };
          }
        }

        continue;
      }

      if (!searchValue.value) {
        if (hasFirstCountry) {
          firstCountries[allCountries[i]] = {
            name: t(`countries.${allCountries[i]}`),
            code: allCountries[i],
          };

          continue;
        }

        countries[allCountries[i]] = {
          name: t(`countries.${allCountries[i]}`),
          code: allCountries[i],
        };

        continue;
      }

      const isMatchCountry = countryMatches(
        searchValue.value,
        t(`countries.${allCountries[i]}`)
      );

      if (isMatchCountry) {
        countries[allCountries[i]] = {
          name: t(`countries.${allCountries[i]}`),
          code: allCountries[i],
        };
      }
    }

    return { ...firstCountries, ...countries };
  });

  watch(selectedCountry, changePhoneCode, { deep: true });

  function changePhoneCode(
    newCountryCode: CountryCode,
    oldCountryCode: CountryCode
  ) {
    // Reset search string
    searchValue.value = '';

    if (!props.modelValue) return;

    const cleanPhone = clearPhoneCode(props.modelValue, oldCountryCode);

    emits(
      'update:modelValue',
      `${getInternationalPhoneCode(newCountryCode)} ${cleanPhone}`
    );
  }

  const phoneFromated = computed(() => {
    if (!props.modelValue || !props.modelValue.replace(/\D/g, '')) {
      return getInternationalPhoneCode(selectedCountry.value);
    }

    return makeInternationalPhone(props.modelValue, selectedCountry.value);
  });

  function isValid(): boolean {
    return phoneValidate(props.modelValue, selectedCountry.value);
  }

  return {
    value,
    countries,
    searchValue,
    selectedCountry,
    isValid,
  };
};
