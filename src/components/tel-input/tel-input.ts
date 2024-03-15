import type { PropType, ExtractPropTypes } from 'vue';

export const inputProps = {
  modelValue: {
    type: String as PropType<string>,
    default: '',
  },
} as const;

export type TProps = ExtractPropTypes<typeof inputProps>;

export const inputEmits = {
  'update:modelValue': (value: string) => value,
};

export type TEmits = typeof inputEmits;
