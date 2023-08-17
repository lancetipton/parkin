import {ife} from '@keg-hub/jsutils'
import { Maestro } from './maestro'
import { maestroFeature } from './__mocks__/maestroFeature'

ife(() => {
  const world = { $alias: {} }
  const maestro = new Maestro({ world })
  const converted = maestro.convert(maestroFeature)

  converted.forEach(flow => process.stdout.write(flow))
})

