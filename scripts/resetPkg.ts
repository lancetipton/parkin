import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'util'
import { exec } from 'child_process'


const dirname = path.dirname(fileURLToPath(import.meta.url))
const cmdExec = promisify(exec)
const rootPath = path.join(dirname, `../`)


/**
 * Executes a command in the docs directory
 * @function
 *
 * @param {string} cmd - Command to be run
 *
 * @returns {Promise} - resolves to response from cmdExec method
 */
const runCmd = async cmd => {
  return await cmdExec(cmd, { cwd: rootPath })
}

/**
 * Gets the current package.json version
 * Then resets the package.json in git
 * Finally updates the package.json back to the version it was before git checkout
 */
const resetPkg = async () => {
  const oldv = process.env.npm_package_version
  await runCmd(`git checkout ./package.json`)
  await runCmd(`pnpm version ${oldv} --no-git-tag-version --allow-same-version --no-commit-hooks`)
  await runCmd(`git add ./package.json`)

  try {
    const resp = await runCmd(`git commit -m "Update version to \"${oldv}\""`)
    console.log(resp)
  }
  catch(err){
    if(err.stdout.includes(`not staged`)) return
    throw err
  }
}


resetPkg()
