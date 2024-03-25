import { getPhoneCode, parsePhoneNumberFromString } from 'libphonenumber-js';

import type { CountryCode } from 'libphonenumber-js';

export function phoneValidate(
  phoneString: string,
  countryCode: CountryCode
): boolean {
  const phone = parsePhoneNumberFromString(phoneString, countryCode);

  if (!phone) return false;

  return phone.isValid();
}

export function clearPhoneCode(value: string, countryCode: CountryCode) {
  let regexp = new RegExp(`\\${getInternationalPhoneCode(countryCode)}`);

  return value.replace(regexp, '').trim();
}

export function makeInternationalPhone(
  phoneStr: string,
  countryCode: CountryCode
) {
  const phone = parsePhoneNumberFromString(phoneStr, countryCode);

  if (!phone) return phoneStr;

  return phone.formatInternational();
}

export function cleanInvalidCharacters(value: string): string {
  const results = value.match(/^\+[0-9\s]*/g);

  if (!results) return value;

  return results.join('');
}

export function getInternationalPhoneCode(countryCode: CountryCode): string {
  return `+${getPhoneCode(countryCode)}`;
}

export function countryMatches(
  searchCountry: string,
  countryName: string
): boolean {
  const searchCountryStr = searchCountry.toLocaleLowerCase();
  const countryNameStr = countryName.toLocaleLowerCase();

  return countryNameStr.includes(searchCountryStr);
}
