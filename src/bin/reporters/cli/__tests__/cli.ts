jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()
import { Logger } from '../../../../__mocks__/loggerMock'
import {
  suiteFailResult,
  suitePassResult
} from '../../../../__mocks__/testResults'

jest.setMock('@keg-hub/cli-utils', { Logger })

process.exit = jest.fn()

const { CLIReporter } = require('../cli')

describe(`CLI.Reporter`, () => {

  afterEach(() => {
    // @ts-ignore
    process.exit.mockClear()
    Logger.mockClear()
  })

  it(`should produce the correct output`, () => {
    CLIReporter.results([suitePassResult])

    expect(Logger.called).toEqual([
      [
        'log',
        '\n' +
          '\x1B[42m\x1B[30m PASS \x1B[0m [yellow]Feature [white]> [gray]World Replace steps[reset]\n' +
          '  [green]✔ [magenta]Background [white]> [gray]$world.feature.scenario.first[reset]\n' +
          '    [green]✔ [cyan]Given [gray]that a world object exists[reset]\n' +
          '    [green]✔ [cyan]Then [gray]"$world.feature.background.then" should be replaced[reset]\n'
      ]
    ])
  })

  it(`should not print steps when steps is false`, () => {
    CLIReporter.results([suitePassResult], { steps: false })

    expect(Logger.called).toEqual([
      [
        'log',
        '\n' +
          '\x1B[42m\x1B[30m PASS \x1B[0m [yellow]Feature [white]> [gray]World Replace steps[reset]\n' +
          '  [green]✔ [magenta]Background [white]> [gray]$world.feature.scenario.first[reset]\n'
      ]
    ])
  })

  it(`should not print features when features is false`, () => {
    CLIReporter.results([suitePassResult], { features: false, })

    expect(Logger.called).toEqual([
      [
        'log',
        '  [green]✔ [magenta]Background [white]> [gray]$world.feature.scenario.first[reset]\n' +
          '    [green]✔ [cyan]Given [gray]that a world object exists[reset]\n' +
          '    [green]✔ [cyan]Then [gray]"$world.feature.background.then" should be replaced[reset]\n'
      ]
    ])
  })

  it(`should not print parents when stepParents is false`, () => {
    CLIReporter.results([suitePassResult], { stepParents: false, })

    expect(Logger.called).toEqual([
      [
        'log',
        '\n' +
          '\x1B[42m\x1B[30m PASS \x1B[0m [yellow]Feature [white]> [gray]World Replace steps[reset]\n' +
          '    [green]✔ [cyan]Given [gray]that a world object exists[reset]\n' +
          '    [green]✔ [cyan]Then [gray]"$world.feature.background.then" should be replaced[reset]\n'
      ]
    ])
  })


  it(`should not print anything when there is no error, and errorOnly is true`, () => {
    CLIReporter.results([suitePassResult], {errorOnly: true})
    expect(Logger.called).toEqual([])
  })

  it(`should only print an error, when there's an error and errorOnly is true`, () => {
    CLIReporter.results([suiteFailResult], {
      errorOnly: true,
    })

    expect(Logger.called).toEqual([
      [ 'red', 'Failed test error' ],
      [ 'white', '      Mock Data\n      Another line' ],
      [
        'log',
        '\n' +
          '\x1B[41m\x1B[30m FAIL \x1B[0m [red]Feature [white]> [white]World Replace steps[reset]\n' +
          '  [red]✘ [red]Background [white]> [white]$world.feature.scenario.first[reset]\n' +
          '    [red]✘ [red]Then [white]"$world.feature.background.then" should be replaced[reset]\n' +
          '\n' +
          '      Failed test error\n' +
          '      Mock Data\n' +
          '      Another line\n' +
          '\n'
      ]
    ])
  })

  it(`should call process.exit when exitWithError is true`, () => {
    CLIReporter.results([suiteFailResult], {exitWithError: true})
    expect(process.exit).toHaveBeenCalled()
  })

  it(`should throw an error when throwOnFailed is true, and exitWithError is false`, () => {
    expect(() => {
      CLIReporter.results([suiteFailResult], { throwOnFailed:true, exitWithError: false})
    }).toThrow()
  })

  it(`should use exitWithError over throwOnFailed when both are true`, () => {
    // Because we override the process.exit call
    // It does not exit the program, to the method still throws
    // Which is fine, because we know as long as process.exit is called,
    // then it was called before the error was thrown
    expect(() => {
      CLIReporter.results([suiteFailResult], {throwOnFailed:true, exitWithError: true})
    }).toThrow()
    expect(process.exit).toHaveBeenCalled()
  })

})
