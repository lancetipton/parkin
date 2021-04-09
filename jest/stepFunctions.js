const { parkin } = require('./instance')

/**
 * Helper to bind the step method to the parkin instance
 * @param {Object} parkin - Instance of the Parkin class
 * @param {string} name - Name of the step register method
 */
const getStepHandler = (parkin, name) => (parkin[name].bind(parkin))

/**
 * Cucumber-like step functions
 * @example
 * import { Given } from 'HerkinParkin'
 * Given('<some matcher>', () => doSomething(p))
 */
module.exports = {
  Given: getStepHandler(parkin, 'Given'),
  When: getStepHandler(parkin, 'When'),
  Then: getStepHandler(parkin, 'Then'),
  And: getStepHandler(parkin, 'And'),
  But: getStepHandler(parkin, 'But'),
}