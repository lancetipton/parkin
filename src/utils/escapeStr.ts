import { hasWindow } from './globalScope'


/**
 * Escapes a string so it can be converted into a regular expression
 * Ensures special chars are escaped, a string with "." in it will be replaced with "\."
 * @function
 * @private
 * @param {string} str - Step match text to be escaped
 *
 * @return {string} Escaped string to allow converting into a regular expression
 */
export const escapeStr = (str:string) => {
  return hasWindow
    ? str.replace(/[|\\[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d')
    : str.replace(/[|\\[\]^$+*?.]/g, '\\$&')
}
