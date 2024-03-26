import { isString } from 'element-plus/es/utils/types.mjs';
import allCountries from './countries';

import type { PropType, ExtractPropTypes } from 'vue';
import type { TInputTelLocale } from './i18n';
import type { CountryCode } from 'libphonenumber-js';

function countryValidate(value: CountryCode | CountryCode[]) {
  if (typeof value === 'string') {
    return allCountries.includes(value);
  }

  if (Array.isArray(value)) {
    return value.every((countryCode) => allCountries.includes(countryCode));
  }

  return false;
}

export const inputProps = {
  modelValue: {
    type: String as PropType<string>,
    default: '',
  },
  defaultCountry: {
    type: String as PropType<CountryCode>,
    validator: countryValidate,
  },
  firstCountries: {
    type: Array as PropType<CountryCode[]>,
    default: [],
    validator: countryValidate,
  },
  onlyCountries: {
    type: Array as PropType<CountryCode[]>,
    default: [],
    validator: countryValidate,
  },
  disabled: {
    type: Boolean as PropType<boolean>,
  },
  locale: {
    type: Object as PropType<TInputTelLocale>,
  },
} as const;

export type TProps = ExtractPropTypes<typeof inputProps>;

export const inputEmits = {
  'update:modelValue': (value: string) => isString(value),
};

export type TEmits = typeof inputEmits;
