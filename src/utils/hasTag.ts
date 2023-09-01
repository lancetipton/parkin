import {eitherArr, emptyArr, isArr, isStr} from "@keg-hub/jsutils"

/**
 * @return {Array<string>?} A match of all words starting with '@', the tag indicator.
 * Returns false if input is invalid.
 */
export const parseTags = (tags?:string|string[]):string[] => {
  const parsed = isStr(tags)
    ? tags.match(/([@](\w|-)*)/g)
    : isArr<string>(tags)
      ? tags
      : emptyArr

  return parsed.filter(tag => isStr(tag) && tag.startsWith(`@`) && tag.length > 2)
}

/**
 * Check if one of the passed in item tags exists within the compare tags
 * Returns `true` if at least 1 tag form the item tags is in the compare tags
 * Otherwise returns `false`
 */
export const hasTag = (
  itemTags:string|string[]=emptyArr,
  compareTags:string|string[]=emptyArr
) => {

  const iTags = isStr(itemTags)
    ? parseTags(itemTags)
    : eitherArr<string[]>(itemTags, [])

  const cTags = isStr(compareTags)
    ? parseTags(compareTags)
    : eitherArr<string[]>(compareTags, [])

  return Boolean(cTags.find((cTag) => iTags.includes(cTag)))
}