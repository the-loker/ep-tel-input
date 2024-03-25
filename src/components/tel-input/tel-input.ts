import { isString } from 'element-plus/es/utils/types.mjs';
import allCountries from './countries';

import type { PropType, ExtractPropTypes } from 'vue';
import type { TInputTelLocale } from './i18n';
import type { CountryCode } from 'libphonenumber-js';

export const inputProps = {
  modelValue: {
    type: String as PropType<string>,
    default: '',
  },
  defaultCountry: {
    type: String as PropType<CountryCode>,
    validator: (value: CountryCode) => {
      return allCountries.includes(value);
    },
  },
  firstCountries: {
    type: Array as PropType<CountryCode[]>,
    default: [],
  },
  onlyCountries: {
    type: Array as PropType<CountryCode[]>,
    default: [],
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
