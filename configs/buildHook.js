import { promisify } from 'util'
import { exec } from 'child_process'
import path from 'path'
import { uuid } from '@keg-hub/jsutils'

const cmdExec = promisify(exec)
const { NODE_ENV, DOC_APP_PATH } = process.env
const buildDir = path.join(__dirname, '../build/cjs')
const docsDir = path.join(__dirname, '../docs/parkin')

let buildId

/**
 * 
 * @export
 * @param {string} 
 *
 * @returns {void}
 */
export default function build(){
  return {
    name: 'buildHook',
    buildStart: async () => {
      // If in a docker container don't update the docs folder
      if(DOC_APP_PATH) return

      try {
        console.log(`Removing old docs/parkin folder...`)
        // Remove the old docks build directory
        await cmdExec(`rm -rf ${docsDir}`)
      }
      catch(err){
        console.error(err.stack)
      }
    },
    writeBundle: async (...args) => {

      // If in a docker container don't update the docs folder
      if(DOC_APP_PATH || buildId) return (buildId = false)
      
      // Set the id tracker so we only run the copy cmd once
      buildId = uuid()

      try {
        console.log(`Copying build/cjs into docs/parkin folder...`)
        // Copy over the new build directory
        await cmdExec(`cp -R ${buildDir} ${docsDir}`)
      }
      catch(err){
        console.error(err.stack)
      }
    }
  }
}
