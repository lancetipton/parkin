
import { get } from "@keg-hub/jsutils"
import { TFeatureAst, EAstObject } from "../types"
import { ParentTypes, StepTypes } from '../constants'

type TFindIdInFeature = {id:string, uuid?:never}
type TFindUUIDInFeature = { id?:never, uuid:string }
type TFindWithID = TFindUUIDInFeature | TFindIdInFeature

export type TFindInFeature = TFindWithID & {
  feature:TFeatureAst
}

/**
 * Finds an item in a features from the items uuid ( id )
 */
export const findInFeature = (props:TFindInFeature) => {
  const { id, feature } = props
  if(!id) return

  const loc = id.split(`.`).reduce((acc, part) => {
    if(part.startsWith(EAstObject.feature)) return acc

    const child = ParentTypes.includes(part as EAstObject)
      ? part === EAstObject.scenario
        ? EAstObject.scenarios
        : part === EAstObject.rule
          ? EAstObject.rules
          : EAstObject.background
      : StepTypes.includes(part as EAstObject)
        ? EAstObject.steps
        : part

    child && acc.push(child)

    return acc
  }, [] as string[])

  const item = get(feature, loc)

  return item.uuid === id && item
}
