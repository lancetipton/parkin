import type { Maestro } from "../maestro"
import { EMaestroCmds } from "../constants"

export const buildThenSteps = (maestro:Maestro) => {
  maestro.parkin.Then(`the {string} {string} is {string}`, (
    type:string,
    selector:string,
    state:string
  ) => {

    const cmd = state === `visible`
      ? EMaestroCmds.assertVisible
      : EMaestroCmds.assertNotVisible

    maestro.flow.addStep({
      cmd,
      children: { [type]: selector }
    })
  })
}
