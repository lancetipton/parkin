import { joinRegex } from '@keg-hub/jsutils'

export const RX_OPTIONAL = /\w*\([^)]*?\)/

export const RX_ALT = /\s*\S*\/\S*\s*/

export const RX_PARAMETER = /\s*{(.*?)}\s*/

export const RX_EXPRESSION = joinRegex(RX_PARAMETER, RX_OPTIONAL, 'g')

export const RX_ANY = /(.*)/

export const RX_MATCH_REPLACE = /{|}/g

export const RX_DOUBLE_QUOTED = /"[^"]+"/

export const RX_SINGLE_QUOTED = /'[^']+'/

export const RX_FLOAT = /-?[0-9]+[.][0-9]+/

export const RX_INT = /-?[0-9]+/

export const RX_WORLD = /^["]?\$world\.\S+["]?/

export const RX_WORLD_REPLACE = /(\$:world|\$world)+\.[^"'\s]*/gm
