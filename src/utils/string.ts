export const urlJoins = (...joins: string[]) =>
  joins.length ? `join=${joins.join("&join=")}` : undefined;

/**
 * Joins an array of URL params into a single string.
 * Filters out any falsy values.
 *
 * @param {...string} params - The params to join.
 * @return {string} The joined params.
 */
export const urlParamsJoiner = (...params: (string | undefined)[]): string =>
  params.filter(Boolean).join("&");
