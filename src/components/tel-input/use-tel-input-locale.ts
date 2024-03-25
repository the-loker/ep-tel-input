import { get } from 'lodash-unified';
import English from './i18n/lang/en';

import type { TInputTelLocale } from './i18n';

export const useTelInputLocale = (
  localeOverrides?: TInputTelLocale | undefined
) => {
  const locale = localeOverrides || English;

  return {
    locale,
    t: (path: string): string => {
      return get(locale, path, `Locale not found ${path}`);
    },
  };
};
