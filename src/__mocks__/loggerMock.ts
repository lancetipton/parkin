
const methods = [
  `data`,
  `dir`,
  `error`,
  `fail`,
  `info`,
  `log`,
  `white`,
  `success`,
  `text`,
  `warn`,
  `green`,
  `red`,
  `yellow`,
  `cyan`,
  `magenta`,
  `blue`,
  `gray`,
  `clear`,
  `color`,
  `empty`,
  `header`,
  `highlight`,
  `label`,
  `log`,
  `pair`,
  `print`,
  `setColors`,
  `spaceMsg`,
  `spacedMsg`,
  `stderr`,
  `stdout`,
  `subHeader`,
  `table`,
]

export const Logger = methods.reduce((logObj, method) => {
  logObj[method] = ((...args:any) => {
    Logger.called.push([method, ...args])
    
    return args[0]
  }) as any
  return logObj
}, {
  called: [],
  colors: {
    colorMap: {
      reset: `[reset]`,
      red: `[red]`,
      green: `[green]`,
      yellow: `[yellow]`,
      gray: `[gray]`,
      blue: `[blue]`,
      magenta: `[magenta]`,
      cyan: `[cyan]`,
      white: `[white]`,
      dim: `[dim]`,
    }
  },
  mockClear: () => {
    Logger.called = []
  },
} as any)

Logger.colors = {...Logger, ...Logger.colors}
