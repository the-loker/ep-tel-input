export { default as ru } from './lang/ru';
export { default as en } from './lang/en';

export type TInputTelLocale = {
  [key: string]: string | string[] | TInputTelLocale;
};
