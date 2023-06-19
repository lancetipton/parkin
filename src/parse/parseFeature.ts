import type {
  TTagsAst,
  TFeatureAst,
  TWorldConfig,
  TBlockParentAst,
  TParseFeatureOpts,
} from '../types'

import { EAstObject } from '../types'
import { parseStep } from './parseStep'
import { checkTags } from './checkTags'
import { emptyObj, exists } from '@keg-hub/jsutils'
import { setActiveParent } from './setActiveParent'
import { replaceWorld } from '../utils/worldReplace'
import { ruleFactory, ensureRule } from './ensureRule'
import { featureFactory, ensureFeature } from './ensureFeature'
import { scenarioFactory, ensureScenario } from './ensureScenario'
import { backgroundFactory, ensureBackground } from './ensureBackground'
import { featureEmptyLine, featureComment, featureMeta } from './ensureMeta'

/**
 * Regular expressions for matching feature file keywords
 * @type {object}
 */
const RX_NEWLINE = /\r?\n/g

const defWorld = { $alias: {} }

const resolveArgs = (
  pWorld:TWorldConfig,
  world?:TWorldConfig,
  options?:TParseFeatureOpts
) => {
  const isOpts = !options && !world?.$alias && exists(world?.worldReplace)

  return {
    worldCfg: isOpts ? pWorld : world,
    opts: isOpts ? (options || emptyObj as TParseFeatureOpts) : world,
  }
}

/**
 * Parses a feature files text content into an object
 * @function
 * @public
 * @export
 *
 */
export const parseFeature = function (
  text:string,
  world?:TWorldConfig,
  options?:TParseFeatureOpts
):TFeatureAst[] {

  const { opts, worldCfg } = resolveArgs(
    this ? this.world : defWorld,
    world,
    options
  )

  const features:TFeatureAst[] = []

  const replaceText = opts?.worldReplace === false
    ? (text || '').toString()
    : replaceWorld((text || '').toString(), worldCfg)

  const lines = replaceText.split(RX_NEWLINE)

  let parseError = false
  let feature = featureFactory(false, text)
  let rule = ruleFactory(false, feature)
  let scenario = scenarioFactory(false, feature)
  let background = backgroundFactory(false, feature)
  let activeParent:TBlockParentAst = feature
  let tagCache:TTagsAst = undefined

  /*
   * Loop over each line of text, and compose the line with corresponding regex to find a match
   */
  return lines.reduce((featuresGroup, line, index) => {

    if(parseError) return featuresGroup

    /*
     * Check for new feature, or parse the current features text
     */
    feature = ensureFeature(featuresGroup, feature, line, text, index)

    /**
     * If there's an error parsing the feature, set it so we don't continue parsing
     */
    if(feature?.errors?.length) parseError = true

    /*
     * Check for child content of the feature or activeParent and parse the line when matched
     * Or if there is a parseError
     */
    if (
      parseError ||
      featureEmptyLine(feature, line, index) ||
      featureComment(feature, line, index) ||
      featureMeta(feature, line, index)
    ){
      return featuresGroup
    }

    /*
     * Check for new feature rule, and add rule to feature object
     */
    rule = ensureRule(feature, rule, line, index)

    /*
     * Check for new feature scenario, and add scenario to feature object
     */
    scenario = ensureScenario(feature, rule, scenario, line, index)

    /*
     * Check for new feature scenario, and add scenario to feature object
     */
    background = ensureBackground(feature, rule, background, line, index)

    // Check for stepTags before check for the next active parent
    // This way We don't add a step to the wrong parent
    if ((`steps` in activeParent) && parseStep(activeParent, lines, line, index))
      return featuresGroup

    /*
     * Get the currently active parent based on the next line to be parsed
     * This allows setting the active parent before the next iteration
     */
    activeParent = setActiveParent(
      activeParent,
      feature,
      rule,
      scenario,
      background,
      line
    )

    /**
     * If there's tag cache from the last iteration
     * After the next active parent has been set
     */
    if(tagCache){
      // background can not have tags, so add them to the feature instead
      const tagParent = activeParent.type === EAstObject.background ? feature : activeParent
      tagParent.tags = tagCache
      tagCache = undefined
    }
    // Check for tags after the next active parent has been set
    else tagCache = checkTags(line, index)

    return featuresGroup
  }, features)
}
