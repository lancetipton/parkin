const { parkin } = require('./instance')
const { PARKIN_FEATURE_NAME, PARKIN_FEATURE_TAGS } = process.env

/**
 * Global helper to allow re-using the same parking instance for each test
 * @function
 */
global.getParkinInstance = () => parkin

// TODO: figure out a way to load the options instead of using ENVs
/**
 * Global helper for loading options to pass to the Parkin.run method
 * @function
 */
global.getParkinOptions = () => {
  return {
    ...(PARKIN_FEATURE_NAME && { name: PARKIN_FEATURE_NAME }),
    ...(PARKIN_FEATURE_TAGS && { tags: PARKIN_FEATURE_TAGS })
  }
}
