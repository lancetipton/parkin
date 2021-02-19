import { constants } from '../constants'
import { throwFeatureNotAnObj } from '../errors'
import { eitherArr, isObj, isArr, capitalize, exists } from '@keg-hub/jsutils'

const { FEATURE_META } = constants

/**
 * Adds content to the assembled array based on the passed in index
 * If no index exists, then the content is added to the end
 * If the index already exists, then the content is spliced into the array at the index
 * @function
 * @private
 * @param {Array<String>} assembled - Array of strings converted from a feature model
 * @param {string} content - String to add to the assembled array
 * @param {number} index - Location in the assembled array where the content should be placed
 *
 * @return {void}
 */
const addContent = (assembled, content, index) => {
  !exists(index)
    ? assembled.push(content)
    : exists(assembled[index])
      ? assembled.splice(index, 0, content)
      : (assembled[index] = content)
}

/**
 * Converts a array of tags into a string and adds them to the assembled array 
 * @function
 * @private
 * @param {Array<String>} assembled - Array of strings converted from a feature model
 * @param {Array<String>} tags - Group of tags from a feature or scenario
 *
 * @return {void}
 */
const addTags = (assembled, tags, spacer='') => {
  isArr(tags) &&
    tags.length &&
    addContent(assembled, `${spacer}${tags.join(' ')}`)
}

/**
 * Converts a features meta data into strings and adds them to the assembled array 
 * @function
 * @private
 * @param {Array<String>} assembled - Array of strings converted from a feature model
 * @param {Object} feature - Parsed feature model containing a scenarios array
 *
 * @return {void}
 */
const addMeta = (assembled, feature) => {
  FEATURE_META.map(key => {
    switch(key){
      case 'feature':
        addContent(assembled, `Feature: ${feature[key]}`, feature.index)
      break
      case 'comments':
        isArr(feature[key]) &&
          feature[key].map(item => addContent(assembled, item.content, item.index))
        break
      case 'reason':
        isArr(feature[key]) &&
          feature[key].map(item => addContent(assembled, `  ${item.content}`, item.index))
      break
      case 'desire':
      case 'perspective':
        feature[key] &&
          addContent(assembled, `  ${feature[key].content}`, feature[key].index)
      break
    }
  })
}

/**
 * Converts a scenarios steps into strings and adds them to the assembled array 
 * @function
 * @private
 * @param {Array<String>} assembled - Array of strings converted from a feature model
 * @param {Object} scenario - Parsed scenario model containing a steps array
 *
 * @return {void}
 */
const addSteps = (assembled, scenario) => {
  isArr(scenario.steps) &&
    scenario.steps.length &&
    scenario.steps.map(step => addContent(
      assembled,
      `    ${capitalize(step.type)} ${step.step}`,
      step.index
    ))
}

/**
 * Converts a features scenarios into strings and adds them to the assembled array 
 * @function
 * @private
 * @param {Array<String>} assembled - Array of strings converted from a feature model
 * @param {Object} feature - Parsed feature model containing a scenarios array
 *
 * @return {void}
 */
const addScenarios = (assembled, feature) => {
  feature.scenarios &&
    feature.scenarios.map(scenario => {
      addTags(assembled, scenario.tags, `  `)
      addContent(assembled, `  Scenario: ${scenario.scenario}`, scenario.index)
      addSteps(assembled, scenario)
    })
}

/**
 * Checks the whitespace of adjacent lines to determine the whitespace of the comment
 * Uses the next line first, then the previous line if the next line does not exist
 * @function
 * @private
 * @param {Array<String>} assembled - Array of strings converted from a feature model
 * @param {string} line - Comment line to be formatted
 * @param {number} index - Position of the line within the assembled array
 *
 * @return {string} - Formatted comment line relative to it's adjacent lines
 */
const formatComment = (assembled, line, index) => {
  const next = assembled[index + 1]
  const prev = assembled[index - 1]
  let compareLine = exists(next) ? next : prev

  // If no line to compare with just return the comment
  if(!compareLine) return `${line}\n`

  // Split on the comment char, so we have just the text of the comment
  const comment = line.split('#').pop()

  // Get the white space of the compose line
  const whiteSpace = Array(compareLine.length - compareLine.trimStart().length).join(' ')

  // Add that to the comment and replace the comment char #
  // This allows the comments to be spaced relative the the adjacent lines
  // Must add an extra space after addSpace because whiteSpace is 1 space short
  return `${addSpace} # ${line}\n`
}

/**
 * Converts the assembled array into a formatted feature string
 * Calls helper to format comment lines containing a #
 * Adds a line ending char at the end of each line => '\n'
 * @function
 * @private
 * @param {Array<String>} assembled - Array of strings converted from a feature model
 *
 * @return {string} - Reassembled feature as a string
 */
const formatAssembled = assembled => {
  // Use array.from to allow access to empty array position
  // This ensures we can replace it with an empty string
  return Array.from(assembled, (line, index) => {
    // For any non-existing lines, add an empty space
    // This can happen from empty parsed lines
    // That have an index, but no content
    return !exists(line)
      ? '\n'
      : line.startsWith('#')
        ? formatComment(assembled, line, index)
        : `${line}\n`

  }).join('').trim()
}

/**
 * Converts parsed feature models back into a formatted strings
 * @function
 * @public
 * @export
 * @param {Array|Object} toAssemble - Parsed feature model to be converted
 *
 * @return {Array<String>} - Reassembled features as an array of strings
 */
export const assembleFeature = toAssemble => {
  return eitherArr(toAssemble, [toAssemble])
    .map(feature => {
      let assembled = []
      !isObj(feature) && throwFeatureNotAnObj(feature)

      addTags(assembled, feature.tags)
      addMeta(assembled, feature)
      addScenarios(assembled, feature)

      return formatAssembled(assembled)
    })
}