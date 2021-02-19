import { promisify } from 'util'
import { exec } from 'child_process'
import path from 'path'

const cmdExec = promisify(exec)

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
      const buildDir = path.join(__dirname, '../build/cjs')
      const docsDir = path.join(__dirname, '../docs/parkin')
    
      // Remove the old docks build directory
      await cmdExec(`rm -rf ${docsDir}`)

      // Copy over the new build directory
      await cmdExec(`cp -R ${buildDir} ${docsDir}`)

    }
  }
}
