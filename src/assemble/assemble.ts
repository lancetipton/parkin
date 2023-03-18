import { addMeta } from './addMeta'
import { addEmpty } from './addEmpty'
import { addTags } from './addTags'
import { indexed } from './indexed'
import { addSteps } from './addSteps'
import { addRules } from './addRules'
import { addContent } from './addContent'
import { addScenarios } from './addScenarios'
import { addBackground } from './addBackground'
import { assembleFeature } from './feature'
import { formatAssembled } from './format'

export const assemble = {
  addMeta,
  addTags,
  addEmpty,
  addSteps,
  indexed,
  addRules,
  addContent,
  addScenarios,
  addBackground,
  format: formatAssembled,
  feature: assembleFeature,
}
