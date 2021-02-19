import { eitherArr, isObj, isArr, capitalize, exists } from '@keg-hub/jsutils'
import { constants } from '../constants'
import { throwFeatureNotAnObj } from '../errors'
const { FEATURE_META, STEP_TYPES } = constants

const addContent = (assembled, content, index) => {
  !exists(index)
    ? assembled.push(content)
    : exists(assembled[index])
      ? assembled.splice(index, 0, content)
      : (assembled[index] = content)
}

const addTags = (assembled, tags, spacer='') => {
  isArr(tags) &&
    tags.length &&
    assembled.push(`${spacer}${tags.join(' ')}`)
}

const addMeta = (assembled, feature) => {
  FEATURE_META.map(key => {
    switch(key){
      case 'feature':
        assembled.push(`Feature: ${feature[key]}`)
      break
      case 'reason':
        feature[key].map(reason => assembled.push(`  ${reason.content}`))
      break
      case 'desire':
      case 'perspective':
        assembled.push(`  ${feature[key].content}`)
      break
    }
  })
}

const addSteps = (assembled, scenario) => {
  STEP_TYPES.map(type => {
    isArr(scenario[type]) &&
      scenario[type].map(step => assembled.push(`    ${capitalize(type)} ${step.step}`))
  })
}

const addScenarios = (assembled, feature) => {
  if(!feature.scenarios) return assembled
  
  feature.scenarios.map(scenario => {
    assembled.push('\n')
    addTags(assembled, scenario.tags, `  `)
    assembled.push(`  Scenario: ${scenario.scenario}`)
    addSteps(assembled, scenario)
  })
}

export const assembleFeature = toAssemble => {
  let assembled = []
  eitherArr(toAssemble, [toAssemble]).map(feature => {
    !isObj(feature) && throwFeatureNotAnObj(feature)

    addTags(assembled, feature.tags)
    addMeta(assembled, feature)
    addScenarios(assembled, feature)
    assembled.push(`\n`)

  })

  console.log(`---------- assembled ----------`)
  console.log(assembled)
}