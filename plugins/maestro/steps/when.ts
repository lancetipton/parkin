import type { Maestro } from "../maestro"
import { EMaestroCmds } from "../constants"

export const buildWhenSteps = (maestro: Maestro) => {

  maestro.parkin.When(`I tap the {string} {string}`, (
    selector: string,
    type: string,
  ) => {
    maestro.flow.addStep({
      cmd: EMaestroCmds.tapOn,
      children: { [type]: selector }
    })
  })
  
  maestro.parkin.When(`I long press the {string} {string}`, (selector: string, type: string) => {
    maestro.flow.addStep({
      cmd: EMaestroCmds.longPressOn,
      children: {[type]: selector}
    })
  })

  maestro.parkin.When(`I input {string}`, (text: string) => {
    maestro.flow.addStep({
      cmd: EMaestroCmds.inputText,
      args: [text]
    })
  })
}