import type {
  TRuleAst,
  TFeatureAst,
  TScenarioAst,
  TParkinRunOpts,
  TBackgroundAst,
} from '../types'

import {
  isArr,
  isStr,
  emptyObj,
  emptyArr,
  eitherArr,
  exists,
} from '@keg-hub/jsutils'

/**
 * @param {string} tags
 * @return {Array<string>?} A match of all words starting with '@', the tag indicator.
 * Returns false if input is invalid.
 */
const parseFeatureTags = (tags?:string|string[]) => {
  return isStr(tags)
    ? tags.match(/[@]\w*/g)
    : isArr<string>(tags)
      ? tags
      : emptyArr
}

type TFilterMatch = {
  name?:string,
  tags:string[],
  options:{
    name?:string,
    tags?:string[]
  }
}

type TFilterChild = {
  tags?:string[]
  nameKey: `background`|`scenario`|`rule`
  children: (TBackgroundAst|TRuleAst | TScenarioAst)[]
  options:{
    name?:string,
    tags?:string[]
  }
}

/**
 * @param {string?} name - name of test item to check
 * @param {string[]} tags - Tags related to the test item
 * @param {TParkinRunOpts} filterOptions - Define how the steps are run
 *
 * @return {Boolean} - true if feature matches the filter options
 */
const filterMatch = ({
  name,
  tags,
  options
}:TFilterMatch) => {
  const {
    name: filterName,
    tags: filterTags
  } = options

  const nameMatch = !filterName || !name || name.includes(filterName)
  const tagMatch = !filterTags.length
    || (tags.length && filterTags.every((clientTag:string) => tags.includes(clientTag)))

  return nameMatch && tagMatch
}


const getFilterOpts = (filterOptions:TParkinRunOpts = emptyObj) => {
  const {
    name,
    tags: filterTags
  } = filterOptions

  const tags = isStr(filterTags)
    ? parseFeatureTags(filterTags)
    : eitherArr(filterTags, [])

  return { name, tags }
}


const filterChild = ({
  options,
  nameKey,
  children,
  tags=emptyArr,
}:TFilterChild) => {
  // check for matching children, where children inherit their parent feature's tags
  return children.filter(child =>
    filterMatch({
      options,
      name: child[nameKey],
      tags: [ ...(child?.tags?.tokens || emptyArr), ...tags ],
    })
  )
}

/**
 * Filters features, rules, background, and scenarios based on the passed in filterOptions
 * If tags exist, and they match, then the item is included
 * If no tags exists, or the tags don't match, then they are not included
 * If a features has a matching tag, then the entire feature is included
 * To filter on rules, background or scenarios, the feature must not include the matching tag
 *  - Instead the tag should be included on the rule, background or scenario
 *  - And the feature should not has ANY tags
 * @function
 * @private
 * @param {Array} features - Features to be run
 * @param {TParkinRunOpts} filterOptions - Filters for running Features
 *
 * @returns {Array} - Filtered features that should be run
 */
export const filterFeatures = (
  features:TFeatureAst[],
  filterOptions:TParkinRunOpts = emptyObj
) => {

  const options = getFilterOpts(filterOptions)

  // If no filters, then run all features
  if(!options?.tags?.length && !options?.name) return features

  return features.reduce((filtered, feature) => {

    const isMatchingFeature = filterMatch({
      options,
      name: feature.feature,
      tags: feature?.tags?.tokens,
    })

    if (isMatchingFeature) {
      filtered.push(feature)
      return filtered
    }

    const { rules, scenarios, background, ...rest} = feature
    const copy = { ...rest, rules: [], scenarios: [] } as Partial<TFeatureAst>

    // check for matching background, where background inherit their parent feature's tags
    const matchingBackground = exists(background)
      && filterChild({
        options,
        nameKey: `background`,
        children: [background],
        tags: feature?.tags?.tokens,
      }) as TBackgroundAst[]

    // check for matching rules, where rules inherit their parent feature's tags
    const matchingRules = filterChild({
      options,
      nameKey: `rule`,
      children: rules,
      tags: feature?.tags?.tokens,
    }) as TRuleAst[]

    // check for matching scenarios, where scenarios inherit their parent feature's tags
    const matchingScenarios = filterChild({
      options,
      nameKey: `scenario`,
      children: scenarios,
      tags: feature?.tags?.tokens,
    }) as TScenarioAst[]


    const hasBackgroundMatch = Boolean(matchingBackground.length)
    const hasRuleMatch = Boolean(matchingRules.length)
    const hasScenarioMatch = Boolean(matchingScenarios.length)

    if(hasBackgroundMatch || hasRuleMatch || hasScenarioMatch){
      hasBackgroundMatch && (copy.background = matchingBackground[0])
      hasRuleMatch && (copy.rules = matchingRules)
      hasScenarioMatch && (copy.scenarios = matchingScenarios)

      filtered.push(copy)
    }

    return filtered
  }, [])
}
