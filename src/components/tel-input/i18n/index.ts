export { default as ru } from './lang/ru.json';
export { default as en } from './lang/en.json';

import type { CountryCode } from 'libphonenumber-js';

export type TLocale = {
  [key in CountryCode]: string;
};
