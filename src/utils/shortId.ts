import { uuid, hashString } from '@keg-hub/jsutils'

/**
 * Generates a short id by hashing a random uuid
 * Temp until method is added to js-utils repo
 */
export const shortId = (idx?:number) => hashString(uuid(idx))
