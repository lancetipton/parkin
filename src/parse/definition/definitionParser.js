import esprima from 'esprima'
import { escodegen } from './escodegen.js'

/*
 * Parkin allowed key words for step definitions
 * @Object
 */
const STEP_KEYS = [ 'Given', 'When', 'Then', 'And', 'But' ]

/*
 * Parses a step definition file, and converts it into an object
 * Extracts each definition in a file into its own object
 * @function
 * @public
 * @export
 * @param {string} text - Full Definition file text
 *
 * @return {Array} - All parsed definition calls as objects
 */
export const definitionParser = text => {
  const ast = esprima.parse(text)

  return ast.body.reduce((definitions, child) => {
    child.type === esprima.Syntax.ExpressionStatement &&
      child.expression.type === esprima.Syntax.CallExpression &&
      STEP_KEYS.includes(child.expression.callee.name) &&
      definitions.push(escodegen.generate(child))

    return definitions
  }, [])
}
