import type { TAssembleFeatureOpts, TBreakSections } from '../types'

export const mergeBreaks = (
  options:TAssembleFeatureOpts,
  breaks:TBreakSections
):TAssembleFeatureOpts => ({...options, breaks: {...options.breaks, ...breaks}})