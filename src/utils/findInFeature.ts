
import { TFeatureAst, EAstObject, TParentAst, TStepAst } from "../types"
import { get } from "@keg-hub/jsutils/get"
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
export const findInFeature = <T extends TParentAst|TStepAst=any>(props:TFindInFeature):T => {
  const { id, uuid, feature } = props
  const ref = id || uuid
  if(!ref) return

  const loc = ref?.toLowerCase?.().split(`.`).reduce((acc, part) => {
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

  return get(feature, loc)
}
