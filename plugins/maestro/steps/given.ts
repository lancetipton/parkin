import type { Maestro } from "../maestro"
import { EMaestroCmds } from "../constants"

export const buildGivenSteps = (maestro:Maestro) => {

  maestro.parkin.Given(`the app id is {string}`, (appId, { world }) => {
    maestro.flow.appId = appId
  })

  maestro.parkin.Given(`I launch the app`, ({ world }) => {
    maestro.flow.addStep({
      sep: ``,
      cmd: EMaestroCmds.launchApp
    })
  })

  maestro.parkin.Given(`run flow {string}`, (flow:string, { world }) => {
    maestro.flow.addStep({
      args: [flow],
      cmd: EMaestroCmds.runFlow,
    })
  })

  maestro.parkin.Given(`I run the flow {string}`, (flow:string, { world }) => {
    maestro.flow.addStep({
      args: [flow],
      cmd: EMaestroCmds.runFlow,
    })
  })

  maestro.parkin.Given(`run the flow {string}`, (flow:string, { world }) => {
    maestro.flow.addStep({
      args: [flow],
      cmd: EMaestroCmds.runFlow,
    })
  })

  maestro.parkin.Given(`run script {string}`, (script:string, { world }) => {
    maestro.flow.addStep({
      args: [script],
      cmd: EMaestroCmds.runScript,
    })
  })

  maestro.parkin.Given(`I run the script {string}`, (script:string, { world }) => {
    maestro.flow.addStep({
      args: [script],
      cmd: EMaestroCmds.runScript,
    })
  })

  maestro.parkin.Given(`run the script {string}`, (script:string, { world }) => {
    maestro.flow.addStep({
      args: [script],
      cmd: EMaestroCmds.runScript,
    })
  })

}