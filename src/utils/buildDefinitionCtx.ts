import type {
  TStepAst,
  TWorldConfig,
  TMatchRespExt,
  TStepResolveOpts
} from '../types'


export const buildDefinitionCtx = (
  world:TWorldConfig,
  step?:TStepAst,
  options?:TStepResolveOpts
) => {

  // Add the Step instance's world to the match arguments
  // Always added as the last argument
  const ctx:TMatchRespExt = { step, world }

  // If the doc and table exist, add them to the ctx
  step?.doc && (ctx.doc = step?.doc)
  step?.table && (ctx.table = step?.table)
  options && (ctx.options = options)

  return ctx
}
