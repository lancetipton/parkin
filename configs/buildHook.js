import { promisify } from 'util'
import { exec } from 'child_process'
import path from 'path'

const cmdExec = promisify(exec)
const { NODE_ENV, DOC_APP_PATH } = process.env

/**
 * 
 * @export
 * @param {string} 
 *
 * @returns {void}
 */
export default function buildHook(){
  return {
    name: 'buildHook',
    buildEnd: async () => {
      // If in development mode || in a docker container don't update the docs folder
      if(NODE_ENV !== 'development' || DOC_APP_PATH) return

      const buildDir = path.join(__dirname, '../build/cjs')
      const docsDir = path.join(__dirname, '../docs/parkin')
    
      console.log(`Removing old docs/parkin folder...`)
      // Remove the old docks build directory
      await cmdExec(`rm -rf ${docsDir}`)

      console.log(`Copying build/cjs into docs/parkin folder...`)
      // Copy over the new build directory
      await cmdExec(`cp -R ${buildDir} ${docsDir}`)

    }
  }
}
