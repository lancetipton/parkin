const { Parkin } = require('@ltipton/parkin')
const { deepMerge, noOpObj } = require('@keg-hub/jsutils')

/**
 * Global world object cache holder
 */
let __WORLD = {}

// TODO: figure out a way to load custom world object from the consumer
global.registerWorld = (world=noOpObj, merge) => {
  __WORLD = merge ? deepMerge(__WORLD, world) : world
}

/**
 * Parkin singleton instance, accepting the 
 * herkin world: a merge of herkin defaults with 
 * the client's world object
 */
module.exports = {
  parkin: new Parkin(__WORLD)
}