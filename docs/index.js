const $ = selector => document.querySelector(selector)
const PK = new Parkin()
const world = {}

let debug = true

const logDebug = (...data) => {
  debug && console.log(...data)
}

const testFeature = () => {
  const featureText = $(`#feature-text`).value
  const parsedFeature = PK.parse.feature(featureText)
  logDebug(`Parsed feature:\n`, parsedFeature)

  PK.run(parsedFeature)

}

const setupDefinitions = () => {
  // Remove any pre-loaded steps
  PK.steps.clear()

  // Re-parse the definition text
  const definitionText = $(`#definition-text`).value
  const parsedDefinition = PK.parse.definition(definitionText)

  logDebug(`Parsed definitions:\n`, parsedDefinition)

  // Register the parsed definitions
  PK.steps.register(parsedDefinition)
}

const runFeature = () => {
  setupDefinitions()
  testFeature()
}
