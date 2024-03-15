import type { SetupContext } from 'vue';
import type { TProps, TEmits } from './tel-input';

export const useTelInput = (
  props: TProps,
  emits: SetupContext<TEmits>['emit']
) => {
  function onInput(value: string) {
    emits('update:modelValue', value);
  }

  return {
    onInput,
  };
};
