const $ = selector => document.querySelector(selector)
const world = {}
let PK
let debug = false

const logDebug = (...data) => {
  debug && console.log(...data)
}

/*
 * Gets the current value of the feature text from the textarea dom node
 * Then parses and runs the feature steps with the Parkin instance
 */
const testFeature = () => {
  const featureText = $(`#feature-text`).value
  const parsedFeature = PK.parse.feature(featureText)
  logDebug(`Parsed feature:\n`, parsedFeature)

  PK.run(parsedFeature)
}

/*
 * Clears any previously registered step definitions
 * Gets the current value of the definitions from the textarea dom node
 * Then parses and registers them with the Parkin instance
 */
const setupDefinitions = () => {
  // Remove any pre-loaded steps
  PK.steps.clear()

  // Re-parse the definition text to get the latest definitions
  const definitionText = $(`#definition-text`).value
  const parsedDefinition = PK.parse.definition(definitionText)

  logDebug(`Parsed definitions:\n`, parsedDefinition)
}

/*
 * Called from the Run Feature Button on the Dom
 */
const runFeature = () => {
  // First ensure the definitions are up to date
  setupDefinitions()
  // Then run the feature steps
  testFeature()
}

/*
 * This script is loaded at the end of the index.html file
 * This is ensure the Parkin library has been loaded 
 * We use an iif to ensure it's run when the browser is ready
 */
(() => PK = new Parkin({}))()

runFeature()