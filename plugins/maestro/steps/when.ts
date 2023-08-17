import type { Maestro } from "../maestro"
import { EMaestroCmds } from "../constants"

export const buildWhenSteps = (maestro:Maestro) => {

  maestro.parkin.When(`I tap the {string} {string}`, (
    selector:string,
    type:string
  ) => {
    maestro.flow.addStep({
      cmd: EMaestroCmds.tapOn,
      children: { [type]: selector }
    })
  })

}
