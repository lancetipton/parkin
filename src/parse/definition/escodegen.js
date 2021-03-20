export const escodegen = (function () {

  function require(file, parentModule) {
    if ({}.hasOwnProperty.call(require.cache, file)) return require.cache[file]
    var resolved = require.resolve(file)
    if (!resolved) throw new Error('Failed to resolve module ' + file)
    var module$ = {
      id: file,
      require: require,
      filename: file,
      exports: {},
      loaded: false,
      parent: parentModule,
      children: [],
    }
    if (parentModule) parentModule.children.push(module$)
    var dirname = file.slice(0, file.lastIndexOf('/') + 1)
    require.cache[file] = module$.exports
    resolved.call(module$.exports, module$, module$.exports, dirname, file)
    module$.loaded = true
    return (require.cache[file] = module$.exports)
  }
  require.modules = {}
  require.cache = {}

  require.resolve = function (file) {
    return {}.hasOwnProperty.call(require.modules, file)
      ? require.modules[file]
      : void 0
  }

  require.define = function (file, fn) {
    require.modules[file] = fn
  }

  require.define('/escodegen.js', function (
    module,
    exports,
    __dirname,
    __filename
  ) {
    ;(function () {
      'use strict'
      var Syntax
      var Precedence
      var BinaryPrecedence
      var SourceNode
      var estraverse
      var esutils
      var base
      var indent
      var json
      var renumber
      var hexadecimal
      var quotes
      var escapeless
      var newline
      var space
      var parentheses
      var semicolons
      var safeConcatenation
      var directive
      var extra
      var parse
      var sourceMap
      var sourceCode
      var preserveBlankLines
      var FORMAT_MINIFY
      var FORMAT_DEFAULTS
      estraverse = require('/node_modules/estraverse/estraverse.js', module)
      esutils = require('/node_modules/esutils/lib/utils.js', module)
      Syntax = estraverse.Syntax
      function isExpression(node) {
        return CodeGenerator.Expression.hasOwnProperty(node.type)
      }
      function isStatement(node) {
        return CodeGenerator.Statement.hasOwnProperty(node.type)
      }
      Precedence = {
        Sequence: 0,
        Yield: 1,
        Assignment: 1,
        Conditional: 2,
        ArrowFunction: 2,
        Coalesce: 3,
        LogicalOR: 4,
        LogicalAND: 5,
        BitwiseOR: 6,
        BitwiseXOR: 7,
        BitwiseAND: 8,
        Equality: 9,
        Relational: 10,
        BitwiseSHIFT: 11,
        Additive: 12,
        Multiplicative: 13,
        Exponentiation: 14,
        Await: 15,
        Unary: 15,
        Postfix: 16,
        OptionalChaining: 17,
        Call: 18,
        New: 19,
        TaggedTemplate: 20,
        Member: 21,
        Primary: 22,
      }
      BinaryPrecedence = {
        '??': Precedence.Coalesce,
        '||': Precedence.LogicalOR,
        '&&': Precedence.LogicalAND,
        '|': Precedence.BitwiseOR,
        '^': Precedence.BitwiseXOR,
        '&': Precedence.BitwiseAND,
        '==': Precedence.Equality,
        '!=': Precedence.Equality,
        '===': Precedence.Equality,
        '!==': Precedence.Equality,
        is: Precedence.Equality,
        isnt: Precedence.Equality,
        '<': Precedence.Relational,
        '>': Precedence.Relational,
        '<=': Precedence.Relational,
        '>=': Precedence.Relational,
        in: Precedence.Relational,
        instanceof: Precedence.Relational,
        '<<': Precedence.BitwiseSHIFT,
        '>>': Precedence.BitwiseSHIFT,
        '>>>': Precedence.BitwiseSHIFT,
        '+': Precedence.Additive,
        '-': Precedence.Additive,
        '*': Precedence.Multiplicative,
        '%': Precedence.Multiplicative,
        '/': Precedence.Multiplicative,
        '**': Precedence.Exponentiation,
      }
      var F_ALLOW_IN = 1
      var F_ALLOW_CALL = 1 << 1
      var F_ALLOW_UNPARATH_NEW = 1 << 2
      var F_FUNC_BODY = 1 << 3
      var F_DIRECTIVE_CTX = 1 << 4
      var F_SEMICOLON_OPT = 1 << 5
      var F_FOUND_COALESCE = 1 << 6
      var E_FTT = F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW
      var E_TTF = F_ALLOW_IN | F_ALLOW_CALL
      var E_TTT = F_ALLOW_IN | F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW
      var E_TFF = F_ALLOW_IN
      var E_FFT = F_ALLOW_UNPARATH_NEW
      var E_TFT = F_ALLOW_IN | F_ALLOW_UNPARATH_NEW
      var S_TFFF = F_ALLOW_IN
      var S_TFFT = F_ALLOW_IN | F_SEMICOLON_OPT
      var S_FFFF = 0
      var S_TFTF = F_ALLOW_IN | F_DIRECTIVE_CTX
      var S_TTFF = F_ALLOW_IN | F_FUNC_BODY
      function getDefaultOptions() {
        return {
          indent: null,
          base: null,
          parse: null,
          format: {
            indent: {
              style: '  ',
              base: 0,
            },
            newline: '\n',
            space: ' ',
            json: false,
            renumber: false,
            hexadecimal: false,
            quotes: 'single',
            escapeless: false,
            compact: false,
            parentheses: true,
            semicolons: false,
            safeConcatenation: false,
            preserveBlankLines: false,
          },
          moz: {
            comprehensionExpressionStartsWithAssignment: false,
            starlessGenerator: false,
          },
          sourceMapRoot: null,
          directive: false,
          raw: true,
          verbatim: null,
          sourceCode: null,
        }
      }
      function stringRepeat(str, num) {
        var result = ''
        for (num |= 0; num > 0; num >>>= 1, str += str) {
          if (num & 1) {
            result += str
          }
        }
        return result
      }
      function hasLineTerminator(str) {
        return /[\r\n]/g.test(str)
      }
      function endsWithLineTerminator(str) {
        var len = str.length
        return len && esutils.code.isLineTerminator(str.charCodeAt(len - 1))
      }
      function merge(target, override) {
        var key
        for (key in override) {
          if (override.hasOwnProperty(key)) {
            target[key] = override[key]
          }
        }
        return target
      }
      function updateDeeply(target, override) {
        var key
        var val
        function isHashObject(target) {
          return (
            typeof target === 'object' &&
            target instanceof Object &&
            !(target instanceof RegExp)
          )
        }
        for (key in override) {
          if (override.hasOwnProperty(key)) {
            val = override[key]
            if (isHashObject(val)) {
              if (isHashObject(target[key])) {
                updateDeeply(target[key], val)
              }
              else {
                target[key] = updateDeeply({}, val)
              }
            }
            else {
              target[key] = val
            }
          }
        }
        return target
      }
      function generateNumber(value) {
        var result
        var point
        var temp
        var exponent
        var pos
        if (value !== value) {
          throw new Error('Numeric literal whose value is NaN')
        }
        if (value < 0 || (value === 0 && 1 / value < 0)) {
          throw new Error('Numeric literal whose value is negative')
        }
        if (value === 1 / 0) {
          return json ? 'null' : renumber ? '1e400' : '1e+400'
        }
        result = '' + value
        if (!renumber || result.length < 3) {
          return result
        }
        point = result.indexOf('.')
        if (!json && result.charCodeAt(0) === 48 && point === 1) {
          point = 0
          result = result.slice(1)
        }
        temp = result
        result = result.replace('e+', 'e')
        exponent = 0
        if ((pos = temp.indexOf('e')) > 0) {
          exponent = +temp.slice(pos + 1)
          temp = temp.slice(0, pos)
        }
        if (point >= 0) {
          exponent -= temp.length - point - 1
          temp = +(temp.slice(0, point) + temp.slice(point + 1)) + ''
        }
        pos = 0
        while (temp.charCodeAt(temp.length + pos - 1) === 48) {
          --pos
        }
        if (pos !== 0) {
          exponent -= pos
          temp = temp.slice(0, pos)
        }
        if (exponent !== 0) {
          temp += 'e' + exponent
        }
        if (
          (temp.length < result.length ||
            (hexadecimal &&
              value > 1e12 &&
              Math.floor(value) === value &&
              (temp = '0x' + value.toString(16)).length < result.length)) &&
          +temp === value
        ) {
          result = temp
        }
        return result
      }
      function escapeRegExpCharacter(ch, previousIsBackslash) {
        if ((ch & ~1) === 8232) {
          return (
            (previousIsBackslash ? 'u' : '\\u') +
            (ch === 8232 ? '2028' : '2029')
          )
        }
        else if (ch === 10 || ch === 13) {
          return (previousIsBackslash ? '' : '\\') + (ch === 10 ? 'n' : 'r')
        }
        return String.fromCharCode(ch)
      }
      function generateRegExp(reg) {
        var match
        var result
        var flags
        var i
        var iz
        var ch
        var characterInBrack
        var previousIsBackslash
        result = reg.toString()
        if (reg.source) {
          match = result.match(/\/([^/]*)$/)
          if (!match) {
            return result
          }
          flags = match[1]
          result = ''
          characterInBrack = false
          previousIsBackslash = false
          for (i = 0, iz = reg.source.length; i < iz; ++i) {
            ch = reg.source.charCodeAt(i)
            if (!previousIsBackslash) {
              if (characterInBrack) {
                if (ch === 93) {
                  characterInBrack = false
                }
              }
              else {
                if (ch === 47) {
                  result += '\\'
                }
                else if (ch === 91) {
                  characterInBrack = true
                }
              }
              result += escapeRegExpCharacter(ch, previousIsBackslash)
              previousIsBackslash = ch === 92
            }
            else {
              result += escapeRegExpCharacter(ch, previousIsBackslash)
              previousIsBackslash = false
            }
          }
          return '/' + result + '/' + flags
        }
        return result
      }
      function escapeAllowedCharacter(code, next) {
        var hex
        if (code === 8) {
          return '\\b'
        }
        if (code === 12) {
          return '\\f'
        }
        if (code === 9) {
          return '\\t'
        }
        hex = code.toString(16).toUpperCase()
        if (json || code > 255) {
          return '\\u' + '0000'.slice(hex.length) + hex
        }
        else if (code === 0 && !esutils.code.isDecimalDigit(next)) {
          return '\\0'
        }
        else if (code === 11) {
          return '\\x0B'
        }
        else {
          return '\\x' + '00'.slice(hex.length) + hex
        }
      }
      function escapeDisallowedCharacter(code) {
        if (code === 92) {
          return '\\\\'
        }
        if (code === 10) {
          return '\\n'
        }
        if (code === 13) {
          return '\\r'
        }
        if (code === 8232) {
          return '\\u2028'
        }
        if (code === 8233) {
          return '\\u2029'
        }
        throw new Error('Incorrectly classified character')
      }
      function escapeDirective(str) {
        var i
        var iz
        var code
        var quote
        quote = quotes === 'double' ? '"' : "'"
        for (i = 0, iz = str.length; i < iz; ++i) {
          code = str.charCodeAt(i)
          if (code === 39) {
            quote = '"'
            break
          }
          else if (code === 34) {
            quote = "'"
            break
          }
          else if (code === 92) {
            ++i
          }
        }
        return quote + str + quote
      }
      function escapeString(str) {
        var result = ''
        var i
        var len
        var code
        var singleQuotes = 0
        var doubleQuotes = 0
        var single
        var quote
        for (i = 0, len = str.length; i < len; ++i) {
          code = str.charCodeAt(i)
          if (code === 39) {
            ++singleQuotes
          }
          else if (code === 34) {
            ++doubleQuotes
          }
          else if (code === 47 && json) {
            result += '\\'
          }
          else if (esutils.code.isLineTerminator(code) || code === 92) {
            result += escapeDisallowedCharacter(code)
            continue
          }
          else if (
            !esutils.code.isIdentifierPartES5(code) &&
            ((json && code < 32) ||
              (!json && !escapeless && (code < 32 || code > 126)))
          ) {
            result += escapeAllowedCharacter(code, str.charCodeAt(i + 1))
            continue
          }
          result += String.fromCharCode(code)
        }
        single = !(
          quotes === 'double' ||
          (quotes === 'auto' && doubleQuotes < singleQuotes)
        )
        quote = single ? "'" : '"'
        if (!(single ? singleQuotes : doubleQuotes)) {
          return quote + result + quote
        }
        str = result
        result = quote
        for (i = 0, len = str.length; i < len; ++i) {
          code = str.charCodeAt(i)
          if ((code === 39 && single) || (code === 34 && !single)) {
            result += '\\'
          }
          result += String.fromCharCode(code)
        }
        return result + quote
      }
      function noEmptySpace() {
        return space ? space : ' '
      }
      function join(left, right) {
        var leftSource
        var rightSource
        var leftCharCode
        var rightCharCode
        leftSource = toSourceNodeWhenNeeded(left).toString()
        if (leftSource.length === 0) {
          return [right]
        }
        rightSource = toSourceNodeWhenNeeded(right).toString()
        if (rightSource.length === 0) {
          return [left]
        }
        leftCharCode = leftSource.charCodeAt(leftSource.length - 1)
        rightCharCode = rightSource.charCodeAt(0)
        if (
          ((leftCharCode === 43 || leftCharCode === 45) &&
            leftCharCode === rightCharCode) ||
          (esutils.code.isIdentifierPartES5(leftCharCode) &&
            esutils.code.isIdentifierPartES5(rightCharCode)) ||
          (leftCharCode === 47 && rightCharCode === 105)
        ) {
          return [ left, noEmptySpace(), right ]
        }
        else if (
          esutils.code.isWhiteSpace(leftCharCode) ||
          esutils.code.isLineTerminator(leftCharCode) ||
          esutils.code.isWhiteSpace(rightCharCode) ||
          esutils.code.isLineTerminator(rightCharCode)
        ) {
          return [ left, right ]
        }
        return [ left, space, right ]
      }
      function addIndent(stmt) {
        return [ base, stmt ]
      }
      function withIndent(fn) {
        var previousBase
        previousBase = base
        base += indent
        fn(base)
        base = previousBase
      }
      function calculateSpaces(str) {
        var i
        for (i = str.length - 1; i >= 0; --i) {
          if (esutils.code.isLineTerminator(str.charCodeAt(i))) {
            break
          }
        }
        return str.length - 1 - i
      }
      function generateBlankLines(start, end, result) {
        var j
        var newlineCount = 0
        for (j = start; j < end; j++) {
          if (sourceCode[j] === '\n') {
            newlineCount++
          }
        }
        for (j = 1; j < newlineCount; j++) {
          result.push(newline)
        }
      }
      function CodeGenerator() {}
      CodeGenerator.prototype.maybeBlock = function (stmt, flags) {
        var result
        var noLeadingComment
        var that = this
        noLeadingComment = !stmt.leadingComments
        if (stmt.type === Syntax.BlockStatement && noLeadingComment) {
          return [ space, this.generateStatement(stmt, flags) ]
        }
        if (stmt.type === Syntax.EmptyStatement && noLeadingComment) {
          return ';'
        }
        withIndent(function () {
          result = [ newline, addIndent(that.generateStatement(stmt, flags)) ]
        })
        return result
      }
      CodeGenerator.prototype.maybeBlockSuffix = function (stmt, result) {
        var ends = endsWithLineTerminator(
          toSourceNodeWhenNeeded(result).toString()
        )
        if (
          stmt.type === Syntax.BlockStatement &&
          (!stmt.leadingComments) &&
          !ends
        ) {
          return [ result, space ]
        }
        if (ends) {
          return [ result, base ]
        }
        return [ result, newline, base ]
      }
      function generateIdentifier(node) {
        return toSourceNodeWhenNeeded(node.name, node)
      }
      function generateAsyncPrefix(node, spaceRequired) {
        return node.async
          ? 'async' + (spaceRequired ? noEmptySpace() : space)
          : ''
      }
      function generateStarSuffix(node) {
        var isGenerator = node.generator && !extra.moz.starlessGenerator
        return isGenerator ? '*' + space : ''
      }
      function generateMethodPrefix(prop) {
        var func = prop.value
        var prefix = ''
        if (func.async) {
          prefix += generateAsyncPrefix(func, !prop.computed)
        }
        if (func.generator) {
          prefix += generateStarSuffix(func) ? '*' : ''
        }
        return prefix
      }
      CodeGenerator.prototype.generatePattern = function (
        node,
        precedence,
        flags
      ) {
        if (node.type === Syntax.Identifier) {
          return generateIdentifier(node)
        }
        return this.generateExpression(node, precedence, flags)
      }
      CodeGenerator.prototype.generateFunctionParams = function (node) {
        var i
        var iz
        var result
        var hasDefault
        hasDefault = false
        if (
          node.type === Syntax.ArrowFunctionExpression &&
          !node.rest &&
          (!node.defaults || node.defaults.length === 0) &&
          node.params.length === 1 &&
          node.params[0].type === Syntax.Identifier
        ) {
          result = [
            generateAsyncPrefix(node, true),
            generateIdentifier(node.params[0]),
          ]
        }
        else {
          result =
            node.type === Syntax.ArrowFunctionExpression
              ? [generateAsyncPrefix(node, false)]
              : []
          result.push('(')
          if (node.defaults) {
            hasDefault = true
          }
          for (i = 0, iz = node.params.length; i < iz; ++i) {
            if (hasDefault && node.defaults[i]) {
              result.push(
                this.generateAssignment(
                  node.params[i],
                  node.defaults[i],
                  '=',
                  Precedence.Assignment,
                  E_TTT
                )
              )
            }
            else {
              result.push(
                this.generatePattern(
                  node.params[i],
                  Precedence.Assignment,
                  E_TTT
                )
              )
            }
            if (i + 1 < iz) {
              result.push(',' + space)
            }
          }
          if (node.rest) {
            if (node.params.length) {
              result.push(',' + space)
            }
            result.push('...')
            result.push(generateIdentifier(node.rest))
          }
          result.push(')')
        }
        return result
      }
      CodeGenerator.prototype.generateFunctionBody = function (node) {
        var result
        var expr
        result = this.generateFunctionParams(node)
        if (node.type === Syntax.ArrowFunctionExpression) {
          result.push(space)
          result.push('=>')
        }
        if (node.expression) {
          result.push(space)
          expr = this.generateExpression(
            node.body,
            Precedence.Assignment,
            E_TTT
          )
          if (expr.toString().charAt(0) === '{') {
            expr = [ '(', expr, ')' ]
          }
          result.push(expr)
        }
        else {
          result.push(this.maybeBlock(node.body, S_TTFF))
        }
        return result
      }
      CodeGenerator.prototype.generateIterationForStatement = function (
        operator,
        stmt,
        flags
      ) {
        var result = [
          'for' + (stmt.await ? noEmptySpace() + 'await' : '') + space + '(',
        ]
        var that = this
        withIndent(function () {
          if (stmt.left.type === Syntax.VariableDeclaration) {
            withIndent(function () {
              result.push(stmt.left.kind + noEmptySpace())
              result.push(
                that.generateStatement(stmt.left.declarations[0], S_FFFF)
              )
            })
          }
          else {
            result.push(
              that.generateExpression(stmt.left, Precedence.Call, E_TTT)
            )
          }
          result = join(result, operator)
          result = [
            join(
              result,
              that.generateExpression(stmt.right, Precedence.Assignment, E_TTT)
            ),
            ')',
          ]
        })
        result.push(this.maybeBlock(stmt.body, flags))
        return result
      }
      CodeGenerator.prototype.generatePropertyKey = function (expr, computed) {
        var result = []
        if (computed) {
          result.push('[')
        }
        result.push(this.generateExpression(expr, Precedence.Assignment, E_TTT))
        if (computed) {
          result.push(']')
        }
        return result
      }
      CodeGenerator.prototype.generateAssignment = function (
        left,
        right,
        operator,
        precedence,
        flags
      ) {
        if (Precedence.Assignment < precedence) {
          flags |= F_ALLOW_IN
        }
        return parenthesize(
          [
            this.generateExpression(left, Precedence.Call, flags),
            space + operator + space,
            this.generateExpression(right, Precedence.Assignment, flags),
          ],
          Precedence.Assignment,
          precedence
        )
      }
      CodeGenerator.prototype.semicolon = function (flags) {
        if (!semicolons && flags & F_SEMICOLON_OPT) {
          return ''
        }
        return ';'
      }
      CodeGenerator.Statement = {
        BlockStatement: function (stmt, flags) {
          var range
          var content
          var result = [ '{', newline ]
          var that = this
          withIndent(function () {
            if (stmt.body.length === 0 && preserveBlankLines) {
              range = stmt.range
              if (range[1] - range[0] > 2) {
                content = sourceCode.substring(range[0] + 1, range[1] - 1)
                if (content[0] === '\n') {
                  result = ['{']
                }
                result.push(content)
              }
            }
            var i
            var iz
            var fragment
            var bodyFlags
            bodyFlags = S_TFFF
            if (flags & F_FUNC_BODY) {
              bodyFlags |= F_DIRECTIVE_CTX
            }
            for (i = 0, iz = stmt.body.length; i < iz; ++i) {
              if (preserveBlankLines) {
                if (i === 0) {
                  if (stmt.body[0].leadingComments) {
                    range = stmt.body[0].leadingComments[0].extendedRange
                    content = sourceCode.substring(range[0], range[1])
                    if (content[0] === '\n') {
                      result = ['{']
                    }
                  }
                  if (!stmt.body[0].leadingComments) {
                    generateBlankLines(
                      stmt.range[0],
                      stmt.body[0].range[0],
                      result
                    )
                  }
                }
                if (i > 0) {
                  if (
                    !stmt.body[i - 1].trailingComments &&
                    !stmt.body[i].leadingComments
                  ) {
                    generateBlankLines(
                      stmt.body[i - 1].range[1],
                      stmt.body[i].range[0],
                      result
                    )
                  }
                }
              }
              if (i === iz - 1) {
                bodyFlags |= F_SEMICOLON_OPT
              }
              if (stmt.body[i].leadingComments && preserveBlankLines) {
                fragment = that.generateStatement(stmt.body[i], bodyFlags)
              }
              else {
                fragment = addIndent(
                  that.generateStatement(stmt.body[i], bodyFlags)
                )
              }
              result.push(fragment)
              if (
                !endsWithLineTerminator(
                  toSourceNodeWhenNeeded(fragment).toString()
                )
              ) {
                if (preserveBlankLines && i < iz - 1) {
                  if (!stmt.body[i + 1].leadingComments) {
                    result.push(newline)
                  }
                }
                else {
                  result.push(newline)
                }
              }
              if (preserveBlankLines) {
                if (i === iz - 1) {
                  if (!stmt.body[i].trailingComments) {
                    generateBlankLines(
                      stmt.body[i].range[1],
                      stmt.range[1],
                      result
                    )
                  }
                }
              }
            }
          })
          result.push(addIndent('}'))
          return result
        },
        BreakStatement: function (stmt, flags) {
          if (stmt.label) {
            return 'break ' + stmt.label.name + this.semicolon(flags)
          }
          return 'break' + this.semicolon(flags)
        },
        ContinueStatement: function (stmt, flags) {
          if (stmt.label) {
            return 'continue ' + stmt.label.name + this.semicolon(flags)
          }
          return 'continue' + this.semicolon(flags)
        },
        ClassBody: function (stmt, flags) {
          var result = [ '{', newline ]
          var that = this
          withIndent(function (indent) {
            var i
            var iz
            for (i = 0, iz = stmt.body.length; i < iz; ++i) {
              result.push(indent)
              result.push(
                that.generateExpression(
                  stmt.body[i],
                  Precedence.Sequence,
                  E_TTT
                )
              )
              if (i + 1 < iz) {
                result.push(newline)
              }
            }
          })
          if (
            !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())
          ) {
            result.push(newline)
          }
          result.push(base)
          result.push('}')
          return result
        },
        ClassDeclaration: function (stmt, flags) {
          var result
          var fragment
          result = ['class']
          if (stmt.id) {
            result = join(
              result,
              this.generateExpression(stmt.id, Precedence.Sequence, E_TTT)
            )
          }
          if (stmt.superClass) {
            fragment = join(
              'extends',
              this.generateExpression(stmt.superClass, Precedence.Unary, E_TTT)
            )
            result = join(result, fragment)
          }
          result.push(space)
          result.push(this.generateStatement(stmt.body, S_TFFT))
          return result
        },
        DirectiveStatement: function (stmt, flags) {
          if (extra.raw && stmt.raw) {
            return stmt.raw + this.semicolon(flags)
          }
          return escapeDirective(stmt.directive) + this.semicolon(flags)
        },
        DoWhileStatement: function (stmt, flags) {
          var result = join('do', this.maybeBlock(stmt.body, S_TFFF))
          result = this.maybeBlockSuffix(stmt.body, result)
          return join(result, [
            'while' + space + '(',
            this.generateExpression(stmt.test, Precedence.Sequence, E_TTT),
            ')' + this.semicolon(flags),
          ])
        },
        CatchClause: function (stmt, flags) {
          var result
          var that = this
          withIndent(function () {
            var guard
            if (stmt.param) {
              result = [
                'catch' + space + '(',
                that.generateExpression(stmt.param, Precedence.Sequence, E_TTT),
                ')',
              ]
              if (stmt.guard) {
                guard = that.generateExpression(
                  stmt.guard,
                  Precedence.Sequence,
                  E_TTT
                )
                result.splice(2, 0, ' if ', guard)
              }
            }
            else {
              result = ['catch']
            }
          })
          result.push(this.maybeBlock(stmt.body, S_TFFF))
          return result
        },
        DebuggerStatement: function (stmt, flags) {
          return 'debugger' + this.semicolon(flags)
        },
        EmptyStatement: function (stmt, flags) {
          return ';'
        },
        ExportDefaultDeclaration: function (stmt, flags) {
          var result = ['export']
          var bodyFlags
          bodyFlags = flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF
          result = join(result, 'default')
          if (isStatement(stmt.declaration)) {
            result = join(
              result,
              this.generateStatement(stmt.declaration, bodyFlags)
            )
          }
          else {
            result = join(
              result,
              this.generateExpression(
                stmt.declaration,
                Precedence.Assignment,
                E_TTT
              ) + this.semicolon(flags)
            )
          }
          return result
        },
        ExportNamedDeclaration: function (stmt, flags) {
          var result = ['export']
          var bodyFlags
          var that = this
          bodyFlags = flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF
          if (stmt.declaration) {
            return join(
              result,
              this.generateStatement(stmt.declaration, bodyFlags)
            )
          }
          if (stmt.specifiers) {
            if (stmt.specifiers.length === 0) {
              result = join(result, '{' + space + '}')
            }
            else if (
              stmt.specifiers[0].type === Syntax.ExportBatchSpecifier
            ) {
              result = join(
                result,
                this.generateExpression(
                  stmt.specifiers[0],
                  Precedence.Sequence,
                  E_TTT
                )
              )
            }
            else {
              result = join(result, '{')
              withIndent(function (indent) {
                var i
                var iz
                result.push(newline)
                for (i = 0, iz = stmt.specifiers.length; i < iz; ++i) {
                  result.push(indent)
                  result.push(
                    that.generateExpression(
                      stmt.specifiers[i],
                      Precedence.Sequence,
                      E_TTT
                    )
                  )
                  if (i + 1 < iz) {
                    result.push(',' + newline)
                  }
                }
              })
              if (
                !endsWithLineTerminator(
                  toSourceNodeWhenNeeded(result).toString()
                )
              ) {
                result.push(newline)
              }
              result.push(base + '}')
            }
            if (stmt.source) {
              result = join(result, [
                'from' + space,
                this.generateExpression(
                  stmt.source,
                  Precedence.Sequence,
                  E_TTT
                ),
                this.semicolon(flags),
              ])
            }
            else {
              result.push(this.semicolon(flags))
            }
          }
          return result
        },
        ExportAllDeclaration: function (stmt, flags) {
          return [
            'export' + space,
            '*' + space,
            'from' + space,
            this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
            this.semicolon(flags),
          ]
        },
        ExpressionStatement: function (stmt, flags) {
          var result
          var fragment
          function isClassPrefixed(fragment) {
            var code
            if (fragment.slice(0, 5) !== 'class') {
              return false
            }
            code = fragment.charCodeAt(5)
            return (
              code === 123 ||
              esutils.code.isWhiteSpace(code) ||
              esutils.code.isLineTerminator(code)
            )
          }
          function isFunctionPrefixed(fragment) {
            var code
            if (fragment.slice(0, 8) !== 'function') {
              return false
            }
            code = fragment.charCodeAt(8)
            return (
              code === 40 ||
              esutils.code.isWhiteSpace(code) ||
              code === 42 ||
              esutils.code.isLineTerminator(code)
            )
          }
          function isAsyncPrefixed(fragment) {
            var code
            var i
            var iz
            if (fragment.slice(0, 5) !== 'async') {
              return false
            }
            if (!esutils.code.isWhiteSpace(fragment.charCodeAt(5))) {
              return false
            }
            for (i = 6, iz = fragment.length; i < iz; ++i) {
              if (!esutils.code.isWhiteSpace(fragment.charCodeAt(i))) {
                break
              }
            }
            if (i === iz) {
              return false
            }
            if (fragment.slice(i, i + 8) !== 'function') {
              return false
            }
            code = fragment.charCodeAt(i + 8)
            return (
              code === 40 ||
              esutils.code.isWhiteSpace(code) ||
              code === 42 ||
              esutils.code.isLineTerminator(code)
            )
          }
          result = [
            this.generateExpression(
              stmt.expression,
              Precedence.Sequence,
              E_TTT
            ),
          ]
          fragment = toSourceNodeWhenNeeded(result).toString()
          if (
            fragment.charCodeAt(0) === 123 ||
            isClassPrefixed(fragment) ||
            isFunctionPrefixed(fragment) ||
            isAsyncPrefixed(fragment) ||
            (directive &&
              flags & F_DIRECTIVE_CTX &&
              stmt.expression.type === Syntax.Literal &&
              typeof stmt.expression.value === 'string')
          ) {
            result = [ '(', result, ')' + this.semicolon(flags) ]
          }
          else {
            result.push(this.semicolon(flags))
          }
          return result
        },
        ImportDeclaration: function (stmt, flags) {
          var result
          var cursor
          var that = this
          if (stmt.specifiers.length === 0) {
            return [
              'import',
              space,
              this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
              this.semicolon(flags),
            ]
          }
          result = ['import']
          cursor = 0
          if (stmt.specifiers[cursor].type === Syntax.ImportDefaultSpecifier) {
            result = join(result, [
              this.generateExpression(
                stmt.specifiers[cursor],
                Precedence.Sequence,
                E_TTT
              ),
            ])
            ++cursor
          }
          if (stmt.specifiers[cursor]) {
            if (cursor !== 0) {
              result.push(',')
            }
            if (
              stmt.specifiers[cursor].type === Syntax.ImportNamespaceSpecifier
            ) {
              result = join(result, [
                space,
                this.generateExpression(
                  stmt.specifiers[cursor],
                  Precedence.Sequence,
                  E_TTT
                ),
              ])
            }
            else {
              result.push(space + '{')
              if (stmt.specifiers.length - cursor === 1) {
                result.push(space)
                result.push(
                  this.generateExpression(
                    stmt.specifiers[cursor],
                    Precedence.Sequence,
                    E_TTT
                  )
                )
                result.push(space + '}' + space)
              }
              else {
                withIndent(function (indent) {
                  var i
                  var iz
                  result.push(newline)
                  for (i = cursor, iz = stmt.specifiers.length; i < iz; ++i) {
                    result.push(indent)
                    result.push(
                      that.generateExpression(
                        stmt.specifiers[i],
                        Precedence.Sequence,
                        E_TTT
                      )
                    )
                    if (i + 1 < iz) {
                      result.push(',' + newline)
                    }
                  }
                })
                if (
                  !endsWithLineTerminator(
                    toSourceNodeWhenNeeded(result).toString()
                  )
                ) {
                  result.push(newline)
                }
                result.push(base + '}' + space)
              }
            }
          }
          result = join(result, [
            'from' + space,
            this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
            this.semicolon(flags),
          ])
          return result
        },
        VariableDeclarator: function (stmt, flags) {
          var itemFlags = flags & F_ALLOW_IN ? E_TTT : E_FTT
          if (stmt.init) {
            return [
              this.generateExpression(
                stmt.id,
                Precedence.Assignment,
                itemFlags
              ),
              space,
              '=',
              space,
              this.generateExpression(
                stmt.init,
                Precedence.Assignment,
                itemFlags
              ),
            ]
          }
          return this.generatePattern(stmt.id, Precedence.Assignment, itemFlags)
        },
        VariableDeclaration: function (stmt, flags) {
          var result
          var i
          var iz
          var node
          var bodyFlags
          var that = this
          result = [stmt.kind]
          bodyFlags = flags & F_ALLOW_IN ? S_TFFF : S_FFFF
          function block() {
            node = stmt.declarations[0]
            if (node.leadingComments) {
              result.push('\n')
              result.push(addIndent(that.generateStatement(node, bodyFlags)))
            }
            else {
              result.push(noEmptySpace())
              result.push(that.generateStatement(node, bodyFlags))
            }
            for (i = 1, iz = stmt.declarations.length; i < iz; ++i) {
              node = stmt.declarations[i]
              if (node.leadingComments) {
                result.push(',' + newline)
                result.push(addIndent(that.generateStatement(node, bodyFlags)))
              }
              else {
                result.push(',' + space)
                result.push(that.generateStatement(node, bodyFlags))
              }
            }
          }
          if (stmt.declarations.length > 1) {
            withIndent(block)
          }
          else {
            block()
          }
          result.push(this.semicolon(flags))
          return result
        },
        ThrowStatement: function (stmt, flags) {
          return [
            join(
              'throw',
              this.generateExpression(stmt.argument, Precedence.Sequence, E_TTT)
            ),
            this.semicolon(flags),
          ]
        },
        TryStatement: function (stmt, flags) {
          var result
          var i
          var iz
          var guardedHandlers
          result = [ 'try', this.maybeBlock(stmt.block, S_TFFF) ]
          result = this.maybeBlockSuffix(stmt.block, result)
          if (stmt.handlers) {
            for (i = 0, iz = stmt.handlers.length; i < iz; ++i) {
              result = join(
                result,
                this.generateStatement(stmt.handlers[i], S_TFFF)
              )
              if (stmt.finalizer || i + 1 !== iz) {
                result = this.maybeBlockSuffix(stmt.handlers[i].body, result)
              }
            }
          }
          else {
            guardedHandlers = stmt.guardedHandlers || []
            for (i = 0, iz = guardedHandlers.length; i < iz; ++i) {
              result = join(
                result,
                this.generateStatement(guardedHandlers[i], S_TFFF)
              )
              if (stmt.finalizer || i + 1 !== iz) {
                result = this.maybeBlockSuffix(guardedHandlers[i].body, result)
              }
            }
            if (stmt.handler) {
              if (Array.isArray(stmt.handler)) {
                for (i = 0, iz = stmt.handler.length; i < iz; ++i) {
                  result = join(
                    result,
                    this.generateStatement(stmt.handler[i], S_TFFF)
                  )
                  if (stmt.finalizer || i + 1 !== iz) {
                    result = this.maybeBlockSuffix(stmt.handler[i].body, result)
                  }
                }
              }
              else {
                result = join(
                  result,
                  this.generateStatement(stmt.handler, S_TFFF)
                )
                if (stmt.finalizer) {
                  result = this.maybeBlockSuffix(stmt.handler.body, result)
                }
              }
            }
          }
          if (stmt.finalizer) {
            result = join(result, [
              'finally',
              this.maybeBlock(stmt.finalizer, S_TFFF),
            ])
          }
          return result
        },
        SwitchStatement: function (stmt, flags) {
          var result
          var fragment
          var i
          var iz
          var bodyFlags
          var that = this
          withIndent(function () {
            result = [
              'switch' + space + '(',
              that.generateExpression(
                stmt.discriminant,
                Precedence.Sequence,
                E_TTT
              ),
              ')' + space + '{' + newline,
            ]
          })
          if (stmt.cases) {
            bodyFlags = S_TFFF
            for (i = 0, iz = stmt.cases.length; i < iz; ++i) {
              if (i === iz - 1) {
                bodyFlags |= F_SEMICOLON_OPT
              }
              fragment = addIndent(
                this.generateStatement(stmt.cases[i], bodyFlags)
              )
              result.push(fragment)
              if (
                !endsWithLineTerminator(
                  toSourceNodeWhenNeeded(fragment).toString()
                )
              ) {
                result.push(newline)
              }
            }
          }
          result.push(addIndent('}'))
          return result
        },
        SwitchCase: function (stmt, flags) {
          var result
          var fragment
          var i
          var iz
          var bodyFlags
          var that = this
          withIndent(function () {
            if (stmt.test) {
              result = [
                join(
                  'case',
                  that.generateExpression(stmt.test, Precedence.Sequence, E_TTT)
                ),
                ':',
              ]
            }
            else {
              result = ['default:']
            }
            i = 0
            iz = stmt.consequent.length
            if (iz && stmt.consequent[0].type === Syntax.BlockStatement) {
              fragment = that.maybeBlock(stmt.consequent[0], S_TFFF)
              result.push(fragment)
              i = 1
            }
            if (
              i !== iz &&
              !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())
            ) {
              result.push(newline)
            }
            bodyFlags = S_TFFF
            for (; i < iz; ++i) {
              if (i === iz - 1 && flags & F_SEMICOLON_OPT) {
                bodyFlags |= F_SEMICOLON_OPT
              }
              fragment = addIndent(
                that.generateStatement(stmt.consequent[i], bodyFlags)
              )
              result.push(fragment)
              if (
                i + 1 !== iz &&
                !endsWithLineTerminator(
                  toSourceNodeWhenNeeded(fragment).toString()
                )
              ) {
                result.push(newline)
              }
            }
          })
          return result
        },
        IfStatement: function (stmt, flags) {
          var result
          var bodyFlags
          var semicolonOptional
          var that = this
          withIndent(function () {
            result = [
              'if' + space + '(',
              that.generateExpression(stmt.test, Precedence.Sequence, E_TTT),
              ')',
            ]
          })
          semicolonOptional = flags & F_SEMICOLON_OPT
          bodyFlags = S_TFFF
          if (semicolonOptional) {
            bodyFlags |= F_SEMICOLON_OPT
          }
          if (stmt.alternate) {
            result.push(this.maybeBlock(stmt.consequent, S_TFFF))
            result = this.maybeBlockSuffix(stmt.consequent, result)
            if (stmt.alternate.type === Syntax.IfStatement) {
              result = join(result, [
                'else ',
                this.generateStatement(stmt.alternate, bodyFlags),
              ])
            }
            else {
              result = join(
                result,
                join('else', this.maybeBlock(stmt.alternate, bodyFlags))
              )
            }
          }
          else {
            result.push(this.maybeBlock(stmt.consequent, bodyFlags))
          }
          return result
        },
        ForStatement: function (stmt, flags) {
          var result
          var that = this
          withIndent(function () {
            result = ['for' + space + '(']
            if (stmt.init) {
              if (stmt.init.type === Syntax.VariableDeclaration) {
                result.push(that.generateStatement(stmt.init, S_FFFF))
              }
              else {
                result.push(
                  that.generateExpression(stmt.init, Precedence.Sequence, E_FTT)
                )
                result.push(';')
              }
            }
            else {
              result.push(';')
            }
            if (stmt.test) {
              result.push(space)
              result.push(
                that.generateExpression(stmt.test, Precedence.Sequence, E_TTT)
              )
              result.push(';')
            }
            else {
              result.push(';')
            }
            if (stmt.update) {
              result.push(space)
              result.push(
                that.generateExpression(stmt.update, Precedence.Sequence, E_TTT)
              )
              result.push(')')
            }
            else {
              result.push(')')
            }
          })
          result.push(
            this.maybeBlock(
              stmt.body,
              flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF
            )
          )
          return result
        },
        ForInStatement: function (stmt, flags) {
          return this.generateIterationForStatement(
            'in',
            stmt,
            flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF
          )
        },
        ForOfStatement: function (stmt, flags) {
          return this.generateIterationForStatement(
            'of',
            stmt,
            flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF
          )
        },
        LabeledStatement: function (stmt, flags) {
          return [
            stmt.label.name + ':',
            this.maybeBlock(
              stmt.body,
              flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF
            ),
          ]
        },
        Program: function (stmt, flags) {
          var result
          var fragment
          var i
          var iz
          var bodyFlags
          iz = stmt.body.length
          result = [safeConcatenation && iz > 0 ? '\n' : '']
          bodyFlags = S_TFTF
          for (i = 0; i < iz; ++i) {
            if (!safeConcatenation && i === iz - 1) {
              bodyFlags |= F_SEMICOLON_OPT
            }
            if (preserveBlankLines) {
              if (i === 0) {
                if (!stmt.body[0].leadingComments) {
                  generateBlankLines(
                    stmt.range[0],
                    stmt.body[i].range[0],
                    result
                  )
                }
              }
              if (i > 0) {
                if (
                  !stmt.body[i - 1].trailingComments &&
                  !stmt.body[i].leadingComments
                ) {
                  generateBlankLines(
                    stmt.body[i - 1].range[1],
                    stmt.body[i].range[0],
                    result
                  )
                }
              }
            }
            fragment = addIndent(
              this.generateStatement(stmt.body[i], bodyFlags)
            )
            result.push(fragment)
            if (
              i + 1 < iz &&
              !endsWithLineTerminator(
                toSourceNodeWhenNeeded(fragment).toString()
              )
            ) {
              if (preserveBlankLines) {
                if (!stmt.body[i + 1].leadingComments) {
                  result.push(newline)
                }
              }
              else {
                result.push(newline)
              }
            }
            if (preserveBlankLines) {
              if (i === iz - 1) {
                if (!stmt.body[i].trailingComments) {
                  generateBlankLines(
                    stmt.body[i].range[1],
                    stmt.range[1],
                    result
                  )
                }
              }
            }
          }
          return result
        },
        FunctionDeclaration: function (stmt, flags) {
          return [
            generateAsyncPrefix(stmt, true),
            'function',
            generateStarSuffix(stmt) || noEmptySpace(),
            stmt.id ? generateIdentifier(stmt.id) : '',
            this.generateFunctionBody(stmt),
          ]
        },
        ReturnStatement: function (stmt, flags) {
          if (stmt.argument) {
            return [
              join(
                'return',
                this.generateExpression(
                  stmt.argument,
                  Precedence.Sequence,
                  E_TTT
                )
              ),
              this.semicolon(flags),
            ]
          }
          return ['return' + this.semicolon(flags)]
        },
        WhileStatement: function (stmt, flags) {
          var result
          var that = this
          withIndent(function () {
            result = [
              'while' + space + '(',
              that.generateExpression(stmt.test, Precedence.Sequence, E_TTT),
              ')',
            ]
          })
          result.push(
            this.maybeBlock(
              stmt.body,
              flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF
            )
          )
          return result
        },
        WithStatement: function (stmt, flags) {
          var result
          var that = this
          withIndent(function () {
            result = [
              'with' + space + '(',
              that.generateExpression(stmt.object, Precedence.Sequence, E_TTT),
              ')',
            ]
          })
          result.push(
            this.maybeBlock(
              stmt.body,
              flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF
            )
          )
          return result
        },
      }
      merge(CodeGenerator.prototype, CodeGenerator.Statement)
      CodeGenerator.Expression = {
        SequenceExpression: function (expr, precedence, flags) {
          var result
          var i
          var iz
          if (Precedence.Sequence < precedence) {
            flags |= F_ALLOW_IN
          }
          result = []
          for (i = 0, iz = expr.expressions.length; i < iz; ++i) {
            result.push(
              this.generateExpression(
                expr.expressions[i],
                Precedence.Assignment,
                flags
              )
            )
            if (i + 1 < iz) {
              result.push(',' + space)
            }
          }
          return parenthesize(result, Precedence.Sequence, precedence)
        },
        AssignmentExpression: function (expr, precedence, flags) {
          return this.generateAssignment(
            expr.left,
            expr.right,
            expr.operator,
            precedence,
            flags
          )
        },
        ArrowFunctionExpression: function (expr, precedence, flags) {
          return parenthesize(
            this.generateFunctionBody(expr),
            Precedence.ArrowFunction,
            precedence
          )
        },
        ConditionalExpression: function (expr, precedence, flags) {
          if (Precedence.Conditional < precedence) {
            flags |= F_ALLOW_IN
          }
          return parenthesize(
            [
              this.generateExpression(expr.test, Precedence.Coalesce, flags),
              space + '?' + space,
              this.generateExpression(
                expr.consequent,
                Precedence.Assignment,
                flags
              ),
              space + ':' + space,
              this.generateExpression(
                expr.alternate,
                Precedence.Assignment,
                flags
              ),
            ],
            Precedence.Conditional,
            precedence
          )
        },
        LogicalExpression: function (expr, precedence, flags) {
          if (expr.operator === '??') {
            flags |= F_FOUND_COALESCE
          }
          return this.BinaryExpression(expr, precedence, flags)
        },
        BinaryExpression: function (expr, precedence, flags) {
          var result
          var leftPrecedence
          var rightPrecedence
          var currentPrecedence
          var fragment
          var leftSource
          currentPrecedence = BinaryPrecedence[expr.operator]
          leftPrecedence =
            expr.operator === '**' ? Precedence.Postfix : currentPrecedence
          rightPrecedence =
            expr.operator === '**' ? currentPrecedence : currentPrecedence + 1
          if (currentPrecedence < precedence) {
            flags |= F_ALLOW_IN
          }
          fragment = this.generateExpression(expr.left, leftPrecedence, flags)
          leftSource = fragment.toString()
          if (
            leftSource.charCodeAt(leftSource.length - 1) === 47 &&
            esutils.code.isIdentifierPartES5(expr.operator.charCodeAt(0))
          ) {
            result = [ fragment, noEmptySpace(), expr.operator ]
          }
          else {
            result = join(fragment, expr.operator)
          }
          fragment = this.generateExpression(expr.right, rightPrecedence, flags)
          if (
            (expr.operator === '/' && fragment.toString().charAt(0) === '/') ||
            (expr.operator.slice(-1) === '<' &&
              fragment.toString().slice(0, 3) === '!--')
          ) {
            result.push(noEmptySpace())
            result.push(fragment)
          }
          else {
            result = join(result, fragment)
          }
          if (expr.operator === 'in' && !(flags & F_ALLOW_IN)) {
            return [ '(', result, ')' ]
          }
          if (
            (expr.operator === '||' || expr.operator === '&&') &&
            flags & F_FOUND_COALESCE
          ) {
            return [ '(', result, ')' ]
          }
          return parenthesize(result, currentPrecedence, precedence)
        },
        CallExpression: function (expr, precedence, flags) {
          var result
          var i
          var iz
          result = [
            this.generateExpression(expr.callee, Precedence.Call, E_TTF),
          ]
          if (expr.optional) {
            result.push('?.')
          }
          result.push('(')
          for (i = 0, iz = expr['arguments'].length; i < iz; ++i) {
            result.push(
              this.generateExpression(
                expr['arguments'][i],
                Precedence.Assignment,
                E_TTT
              )
            )
            if (i + 1 < iz) {
              result.push(',' + space)
            }
          }
          result.push(')')
          if (!(flags & F_ALLOW_CALL)) {
            return [ '(', result, ')' ]
          }
          return parenthesize(result, Precedence.Call, precedence)
        },
        ChainExpression: function (expr, precedence, flags) {
          if (Precedence.OptionalChaining < precedence) {
            flags |= F_ALLOW_CALL
          }
          var result = this.generateExpression(
            expr.expression,
            Precedence.OptionalChaining,
            flags
          )
          return parenthesize(result, Precedence.OptionalChaining, precedence)
        },
        NewExpression: function (expr, precedence, flags) {
          var result
          var length
          var i
          var iz
          var itemFlags
          length = expr['arguments'].length
          itemFlags =
            flags & F_ALLOW_UNPARATH_NEW && !parentheses && length === 0
              ? E_TFT
              : E_TFF
          result = join(
            'new',
            this.generateExpression(expr.callee, Precedence.New, itemFlags)
          )
          if (!(flags & F_ALLOW_UNPARATH_NEW) || parentheses || length > 0) {
            result.push('(')
            for (i = 0, iz = length; i < iz; ++i) {
              result.push(
                this.generateExpression(
                  expr['arguments'][i],
                  Precedence.Assignment,
                  E_TTT
                )
              )
              if (i + 1 < iz) {
                result.push(',' + space)
              }
            }
            result.push(')')
          }
          return parenthesize(result, Precedence.New, precedence)
        },
        MemberExpression: function (expr, precedence, flags) {
          var result
          var fragment
          result = [
            this.generateExpression(
              expr.object,
              Precedence.Call,
              flags & F_ALLOW_CALL ? E_TTF : E_TFF
            ),
          ]
          if (expr.computed) {
            if (expr.optional) {
              result.push('?.')
            }
            result.push('[')
            result.push(
              this.generateExpression(
                expr.property,
                Precedence.Sequence,
                flags & F_ALLOW_CALL ? E_TTT : E_TFT
              )
            )
            result.push(']')
          }
          else {
            if (
              !expr.optional &&
              expr.object.type === Syntax.Literal &&
              typeof expr.object.value === 'number'
            ) {
              fragment = toSourceNodeWhenNeeded(result).toString()
              if (
                fragment.indexOf('.') < 0 &&
                !/[eExX]/.test(fragment) &&
                esutils.code.isDecimalDigit(
                  fragment.charCodeAt(fragment.length - 1)
                ) &&
                !(fragment.length >= 2 && fragment.charCodeAt(0) === 48)
              ) {
                result.push(' ')
              }
            }
            result.push(expr.optional ? '?.' : '.')
            result.push(generateIdentifier(expr.property))
          }
          return parenthesize(result, Precedence.Member, precedence)
        },
        MetaProperty: function (expr, precedence, flags) {
          var result
          result = []
          result.push(
            typeof expr.meta === 'string'
              ? expr.meta
              : generateIdentifier(expr.meta)
          )
          result.push('.')
          result.push(
            typeof expr.property === 'string'
              ? expr.property
              : generateIdentifier(expr.property)
          )
          return parenthesize(result, Precedence.Member, precedence)
        },
        UnaryExpression: function (expr, precedence, flags) {
          var result
          var fragment
          var rightCharCode
          var leftSource
          var leftCharCode
          fragment = this.generateExpression(
            expr.argument,
            Precedence.Unary,
            E_TTT
          )
          if (space === '') {
            result = join(expr.operator, fragment)
          }
          else {
            result = [expr.operator]
            if (expr.operator.length > 2) {
              result = join(result, fragment)
            }
            else {
              leftSource = toSourceNodeWhenNeeded(result).toString()
              leftCharCode = leftSource.charCodeAt(leftSource.length - 1)
              rightCharCode = fragment.toString().charCodeAt(0)
              if (
                ((leftCharCode === 43 || leftCharCode === 45) &&
                  leftCharCode === rightCharCode) ||
                (esutils.code.isIdentifierPartES5(leftCharCode) &&
                  esutils.code.isIdentifierPartES5(rightCharCode))
              ) {
                result.push(noEmptySpace())
                result.push(fragment)
              }
              else {
                result.push(fragment)
              }
            }
          }
          return parenthesize(result, Precedence.Unary, precedence)
        },
        YieldExpression: function (expr, precedence, flags) {
          var result
          if (expr.delegate) {
            result = 'yield*'
          }
          else {
            result = 'yield'
          }
          if (expr.argument) {
            result = join(
              result,
              this.generateExpression(expr.argument, Precedence.Yield, E_TTT)
            )
          }
          return parenthesize(result, Precedence.Yield, precedence)
        },
        AwaitExpression: function (expr, precedence, flags) {
          var result = join(
            expr.all ? 'await*' : 'await',
            this.generateExpression(expr.argument, Precedence.Await, E_TTT)
          )
          return parenthesize(result, Precedence.Await, precedence)
        },
        UpdateExpression: function (expr, precedence, flags) {
          if (expr.prefix) {
            return parenthesize(
              [
                expr.operator,
                this.generateExpression(expr.argument, Precedence.Unary, E_TTT),
              ],
              Precedence.Unary,
              precedence
            )
          }
          return parenthesize(
            [
              this.generateExpression(expr.argument, Precedence.Postfix, E_TTT),
              expr.operator,
            ],
            Precedence.Postfix,
            precedence
          )
        },
        FunctionExpression: function (expr, precedence, flags) {
          var result = [ generateAsyncPrefix(expr, true), 'function' ]
          if (expr.id) {
            result.push(generateStarSuffix(expr) || noEmptySpace())
            result.push(generateIdentifier(expr.id))
          }
          else {
            result.push(generateStarSuffix(expr) || space)
          }
          result.push(this.generateFunctionBody(expr))
          return result
        },
        ArrayPattern: function (expr, precedence, flags) {
          return this.ArrayExpression(expr, precedence, flags, true)
        },
        ArrayExpression: function (expr, precedence, flags, isPattern) {
          var result
          var multiline
          var that = this
          if (!expr.elements.length) {
            return '[]'
          }
          multiline = isPattern ? false : expr.elements.length > 1
          result = [ '[', multiline ? newline : '' ]
          withIndent(function (indent) {
            var i
            var iz
            for (i = 0, iz = expr.elements.length; i < iz; ++i) {
              if (!expr.elements[i]) {
                if (multiline) {
                  result.push(indent)
                }
                if (i + 1 === iz) {
                  result.push(',')
                }
              }
              else {
                result.push(multiline ? indent : '')
                result.push(
                  that.generateExpression(
                    expr.elements[i],
                    Precedence.Assignment,
                    E_TTT
                  )
                )
              }
              if (i + 1 < iz) {
                result.push(',' + (multiline ? newline : space))
              }
            }
          })
          if (
            multiline &&
            !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())
          ) {
            result.push(newline)
          }
          result.push(multiline ? base : '')
          result.push(']')
          return result
        },
        RestElement: function (expr, precedence, flags) {
          return '...' + this.generatePattern(expr.argument)
        },
        ClassExpression: function (expr, precedence, flags) {
          var result
          var fragment
          result = ['class']
          if (expr.id) {
            result = join(
              result,
              this.generateExpression(expr.id, Precedence.Sequence, E_TTT)
            )
          }
          if (expr.superClass) {
            fragment = join(
              'extends',
              this.generateExpression(expr.superClass, Precedence.Unary, E_TTT)
            )
            result = join(result, fragment)
          }
          result.push(space)
          result.push(this.generateStatement(expr.body, S_TFFT))
          return result
        },
        MethodDefinition: function (expr, precedence, flags) {
          var result
          var fragment
          if (expr['static']) {
            result = ['static' + space]
          }
          else {
            result = []
          }
          if (expr.kind === 'get' || expr.kind === 'set') {
            fragment = [
              join(
                expr.kind,
                this.generatePropertyKey(expr.key, expr.computed)
              ),
              this.generateFunctionBody(expr.value),
            ]
          }
          else {
            fragment = [
              generateMethodPrefix(expr),
              this.generatePropertyKey(expr.key, expr.computed),
              this.generateFunctionBody(expr.value),
            ]
          }
          return join(result, fragment)
        },
        Property: function (expr, precedence, flags) {
          if (expr.kind === 'get' || expr.kind === 'set') {
            return [
              expr.kind,
              noEmptySpace(),
              this.generatePropertyKey(expr.key, expr.computed),
              this.generateFunctionBody(expr.value),
            ]
          }
          if (expr.shorthand) {
            if (expr.value.type === 'AssignmentPattern') {
              return this.AssignmentPattern(
                expr.value,
                Precedence.Sequence,
                E_TTT
              )
            }
            return this.generatePropertyKey(expr.key, expr.computed)
          }
          if (expr.method) {
            return [
              generateMethodPrefix(expr),
              this.generatePropertyKey(expr.key, expr.computed),
              this.generateFunctionBody(expr.value),
            ]
          }
          return [
            this.generatePropertyKey(expr.key, expr.computed),
            ':' + space,
            this.generateExpression(expr.value, Precedence.Assignment, E_TTT),
          ]
        },
        ObjectExpression: function (expr, precedence, flags) {
          var multiline
          var result
          var fragment
          var that = this
          if (!expr.properties.length) {
            return '{}'
          }
          multiline = expr.properties.length > 1
          withIndent(function () {
            fragment = that.generateExpression(
              expr.properties[0],
              Precedence.Sequence,
              E_TTT
            )
          })
          if (!multiline) {
            if (
              !hasLineTerminator(toSourceNodeWhenNeeded(fragment).toString())
            ) {
              return [ '{', space, fragment, space, '}' ]
            }
          }
          withIndent(function (indent) {
            var i
            var iz
            result = [ '{', newline, indent, fragment ]
            if (multiline) {
              result.push(',' + newline)
              for (i = 1, iz = expr.properties.length; i < iz; ++i) {
                result.push(indent)
                result.push(
                  that.generateExpression(
                    expr.properties[i],
                    Precedence.Sequence,
                    E_TTT
                  )
                )
                if (i + 1 < iz) {
                  result.push(',' + newline)
                }
              }
            }
          })
          if (
            !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())
          ) {
            result.push(newline)
          }
          result.push(base)
          result.push('}')
          return result
        },
        AssignmentPattern: function (expr, precedence, flags) {
          return this.generateAssignment(
            expr.left,
            expr.right,
            '=',
            precedence,
            flags
          )
        },
        ObjectPattern: function (expr, precedence, flags) {
          var result
          var i
          var iz
          var multiline
          var property
          var that = this
          if (!expr.properties.length) {
            return '{}'
          }
          multiline = false
          if (expr.properties.length === 1) {
            property = expr.properties[0]
            if (
              property.type === Syntax.Property &&
              property.value.type !== Syntax.Identifier
            ) {
              multiline = true
            }
          }
          else {
            for (i = 0, iz = expr.properties.length; i < iz; ++i) {
              property = expr.properties[i]
              if (property.type === Syntax.Property && !property.shorthand) {
                multiline = true
                break
              }
            }
          }
          result = [ '{', multiline ? newline : '' ]
          withIndent(function (indent) {
            var i
            var iz
            for (i = 0, iz = expr.properties.length; i < iz; ++i) {
              result.push(multiline ? indent : '')
              result.push(
                that.generateExpression(
                  expr.properties[i],
                  Precedence.Sequence,
                  E_TTT
                )
              )
              if (i + 1 < iz) {
                result.push(',' + (multiline ? newline : space))
              }
            }
          })
          if (
            multiline &&
            !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())
          ) {
            result.push(newline)
          }
          result.push(multiline ? base : '')
          result.push('}')
          return result
        },
        ThisExpression: function (expr, precedence, flags) {
          return 'this'
        },
        Super: function (expr, precedence, flags) {
          return 'super'
        },
        Identifier: function (expr, precedence, flags) {
          return generateIdentifier(expr)
        },
        ImportDefaultSpecifier: function (expr, precedence, flags) {
          return generateIdentifier(expr.id || expr.local)
        },
        ImportNamespaceSpecifier: function (expr, precedence, flags) {
          var result = ['*']
          var id = expr.id || expr.local
          if (id) {
            result.push(space + 'as' + noEmptySpace() + generateIdentifier(id))
          }
          return result
        },
        ImportSpecifier: function (expr, precedence, flags) {
          var imported = expr.imported
          var result = [imported.name]
          var local = expr.local
          if (local && local.name !== imported.name) {
            result.push(
              noEmptySpace() + 'as' + noEmptySpace() + generateIdentifier(local)
            )
          }
          return result
        },
        ExportSpecifier: function (expr, precedence, flags) {
          var local = expr.local
          var result = [local.name]
          var exported = expr.exported
          if (exported && exported.name !== local.name) {
            result.push(
              noEmptySpace() +
                'as' +
                noEmptySpace() +
                generateIdentifier(exported)
            )
          }
          return result
        },
        Literal: function (expr, precedence, flags) {
          var raw
          if (expr.hasOwnProperty('raw') && parse && extra.raw) {
            try {
              raw = parse(expr.raw).body[0].expression
              if (raw.type === Syntax.Literal) {
                if (raw.value === expr.value) {
                  return expr.raw
                }
              }
            }
            catch (e) {}
          }
          if (expr.regex) {
            return '/' + expr.regex.pattern + '/' + expr.regex.flags
          }
          if (typeof expr.value === 'bigint') {
            return expr.value.toString() + 'n'
          }
          if (expr.bigint) {
            return expr.bigint + 'n'
          }
          if (expr.value === null) {
            return 'null'
          }
          if (typeof expr.value === 'string') {
            return escapeString(expr.value)
          }
          if (typeof expr.value === 'number') {
            return generateNumber(expr.value)
          }
          if (typeof expr.value === 'boolean') {
            return expr.value ? 'true' : 'false'
          }
          return generateRegExp(expr.value)
        },
        GeneratorExpression: function (expr, precedence, flags) {
          return this.ComprehensionExpression(expr, precedence, flags)
        },
        ComprehensionExpression: function (expr, precedence, flags) {
          var result
          var i
          var iz
          var fragment
          var that = this
          result = expr.type === Syntax.GeneratorExpression ? ['('] : ['[']
          if (extra.moz.comprehensionExpressionStartsWithAssignment) {
            fragment = this.generateExpression(
              expr.body,
              Precedence.Assignment,
              E_TTT
            )
            result.push(fragment)
          }
          if (expr.blocks) {
            withIndent(function () {
              for (i = 0, iz = expr.blocks.length; i < iz; ++i) {
                fragment = that.generateExpression(
                  expr.blocks[i],
                  Precedence.Sequence,
                  E_TTT
                )
                if (
                  i > 0 ||
                  extra.moz.comprehensionExpressionStartsWithAssignment
                ) {
                  result = join(result, fragment)
                }
                else {
                  result.push(fragment)
                }
              }
            })
          }
          if (expr.filter) {
            result = join(result, 'if' + space)
            fragment = this.generateExpression(
              expr.filter,
              Precedence.Sequence,
              E_TTT
            )
            result = join(result, [ '(', fragment, ')' ])
          }
          if (!extra.moz.comprehensionExpressionStartsWithAssignment) {
            fragment = this.generateExpression(
              expr.body,
              Precedence.Assignment,
              E_TTT
            )
            result = join(result, fragment)
          }
          result.push(expr.type === Syntax.GeneratorExpression ? ')' : ']')
          return result
        },
        ComprehensionBlock: function (expr, precedence, flags) {
          var fragment
          if (expr.left.type === Syntax.VariableDeclaration) {
            fragment = [
              expr.left.kind,
              noEmptySpace(),
              this.generateStatement(expr.left.declarations[0], S_FFFF),
            ]
          }
          else {
            fragment = this.generateExpression(
              expr.left,
              Precedence.Call,
              E_TTT
            )
          }
          fragment = join(fragment, expr.of ? 'of' : 'in')
          fragment = join(
            fragment,
            this.generateExpression(expr.right, Precedence.Sequence, E_TTT)
          )
          return [ 'for' + space + '(', fragment, ')' ]
        },
        SpreadElement: function (expr, precedence, flags) {
          return [
            '...',
            this.generateExpression(
              expr.argument,
              Precedence.Assignment,
              E_TTT
            ),
          ]
        },
        TaggedTemplateExpression: function (expr, precedence, flags) {
          var itemFlags = E_TTF
          if (!(flags & F_ALLOW_CALL)) {
            itemFlags = E_TFF
          }
          var result = [
            this.generateExpression(expr.tag, Precedence.Call, itemFlags),
            this.generateExpression(expr.quasi, Precedence.Primary, E_FFT),
          ]
          return parenthesize(result, Precedence.TaggedTemplate, precedence)
        },
        TemplateElement: function (expr, precedence, flags) {
          return expr.value.raw
        },
        TemplateLiteral: function (expr, precedence, flags) {
          var result
          var i
          var iz
          result = ['`']
          for (i = 0, iz = expr.quasis.length; i < iz; ++i) {
            result.push(
              this.generateExpression(expr.quasis[i], Precedence.Primary, E_TTT)
            )
            if (i + 1 < iz) {
              result.push('${' + space)
              result.push(
                this.generateExpression(
                  expr.expressions[i],
                  Precedence.Sequence,
                  E_TTT
                )
              )
              result.push(space + '}')
            }
          }
          result.push('`')
          return result
        },
        ModuleSpecifier: function (expr, precedence, flags) {
          return this.Literal(expr, precedence, flags)
        },
        ImportExpression: function (expr, precedence, flag) {
          return parenthesize(
            [
              'import(',
              this.generateExpression(
                expr.source,
                Precedence.Assignment,
                E_TTT
              ),
              ')',
            ],
            Precedence.Call,
            precedence
          )
        },
      }
      merge(CodeGenerator.prototype, CodeGenerator.Expression)

      function parenthesize(text, current, should) {
        if (current < should) {
          return [ '(', text, ')' ]
        }
        return text
      }
      function generateVerbatimString(string) {
        var i
        var iz
        var result
        result = string.split(/\r\n|\n/)
        for (i = 1, iz = result.length; i < iz; i++) {
          result[i] = newline + base + result[i]
        }
        return result
      }
      function generateVerbatim(expr, precedence) {
        var verbatim
        var result
        var prec
        verbatim = expr[extra.verbatim]
        if (typeof verbatim === 'string') {
          result = parenthesize(
            generateVerbatimString(verbatim),
            Precedence.Sequence,
            precedence
          )
        }
        else {
          result = generateVerbatimString(verbatim.content)
          prec =
            verbatim.precedence != null
              ? verbatim.precedence
              : Precedence.Sequence
          result = parenthesize(result, prec, precedence)
        }
        return toSourceNodeWhenNeeded(result, expr)
      }

      function flattenToString(arr) {
        var i
        var iz
        var elem
        var result = ''
        for (i = 0, iz = arr.length; i < iz; ++i) {
          elem = arr[i]
          result += Array.isArray(elem) ? flattenToString(elem) : elem
        }
        return result
      }

      function toSourceNodeWhenNeeded(generated, node) {
        return Array.isArray(generated)
          ? flattenToString(generated)
          : generated
      }

      CodeGenerator.prototype.generateExpression = function (
        expr,
        precedence,
        flags
      ) {
        var result
        var type
        type = expr.type || Syntax.Property
        if (extra.verbatim && expr.hasOwnProperty(extra.verbatim)) {
          return generateVerbatim(expr, precedence)
        }
        result = this[type](expr, precedence, flags)

        return toSourceNodeWhenNeeded(result, expr)
      }

      CodeGenerator.prototype.generateStatement = function (stmt, flags) {
        var result
        var fragment
        result = this[stmt.type](stmt, flags)
        fragment = toSourceNodeWhenNeeded(result).toString()
        if (
          stmt.type === Syntax.Program &&
          !safeConcatenation &&
          newline === '' &&
          fragment.charAt(fragment.length - 1) === '\n'
        ) {
          result = sourceMap
            ? toSourceNodeWhenNeeded(result).replaceRight(/\s+$/, '')
            : fragment.replace(/\s+$/, '')
        }
        return toSourceNodeWhenNeeded(result, stmt)
      }

      function generate(node, options) {

        options = getDefaultOptions()
        indent = options.format.indent.style
        base = stringRepeat(indent, options.format.indent.base)

        json = options.format.json
        renumber = options.format.renumber
        hexadecimal = json ? false : options.format.hexadecimal
        quotes = json ? 'double' : options.format.quotes
        escapeless = options.format.escapeless
        newline = options.format.newline
        space = options.format.space
        if (options.format.compact) newline = space = indent = base = ''
        parentheses = options.format.parentheses
        semicolons = options.format.semicolons
        safeConcatenation = options.format.safeConcatenation
        directive = options.directive
        parse = json ? null : options.parse
        sourceCode = options.sourceCode
        preserveBlankLines = options.format.preserveBlankLines && sourceCode !== null
        extra = options

        var codegen = new CodeGenerator()
        if (isStatement(node))
          return codegen.generateStatement(node, S_TFFF)
        if (isExpression(node))
          return codegen.generateExpression(node, Precedence.Sequence, E_TTT)

        throw new Error('Unknown node type: ' + node.type)
      }

      FORMAT_MINIFY = {
        indent: {
          style: '',
          base: 0,
        },
        renumber: true,
        hexadecimal: true,
        quotes: 'auto',
        escapeless: true,
        compact: true,
        parentheses: false,
        semicolons: false,
      }
      FORMAT_DEFAULTS = getDefaultOptions().format
      exports.version = '2.0.0-parkin'
      exports.generate = generate
      exports.Precedence = updateDeeply({}, Precedence)
      exports.browser = false
      exports.FORMAT_MINIFY = FORMAT_MINIFY
      exports.FORMAT_DEFAULTS = FORMAT_DEFAULTS
    })()
  })
  require.define('/node_modules/esutils/lib/utils.js', function (
    module,
    exports,
    __dirname,
    __filename
  ) {
    ;(function () {
      'use strict'
      exports.ast = require('/node_modules/esutils/lib/ast.js', module)
      exports.code = require('/node_modules/esutils/lib/code.js', module)
      exports.keyword = require('/node_modules/esutils/lib/keyword.js', module)
    })()
  })
  require.define('/node_modules/esutils/lib/keyword.js', function (
    module,
    exports,
    __dirname,
    __filename
  ) {
    ;(function () {
      'use strict'
      var code = require('/node_modules/esutils/lib/code.js', module)
      function isStrictModeReservedWordES6(id) {
        switch (id) {
        case 'implements':
        case 'interface':
        case 'package':
        case 'private':
        case 'protected':
        case 'public':
        case 'static':
        case 'let':
          return true
        default:
          return false
        }
      }
      function isKeywordES5(id, strict) {
        if (!strict && id === 'yield') {
          return false
        }
        return isKeywordES6(id, strict)
      }
      function isKeywordES6(id, strict) {
        if (strict && isStrictModeReservedWordES6(id)) {
          return true
        }
        switch (id.length) {
        case 2:
          return id === 'if' || id === 'in' || id === 'do'
        case 3:
          return id === 'var' || id === 'for' || id === 'new' || id === 'try'
        case 4:
          return (
            id === 'this' ||
              id === 'else' ||
              id === 'case' ||
              id === 'void' ||
              id === 'with' ||
              id === 'enum'
          )
        case 5:
          return (
            id === 'while' ||
              id === 'break' ||
              id === 'catch' ||
              id === 'throw' ||
              id === 'const' ||
              id === 'yield' ||
              id === 'class' ||
              id === 'super'
          )
        case 6:
          return (
            id === 'return' ||
              id === 'typeof' ||
              id === 'delete' ||
              id === 'switch' ||
              id === 'export' ||
              id === 'import'
          )
        case 7:
          return id === 'default' || id === 'finally' || id === 'extends'
        case 8:
          return id === 'function' || id === 'continue' || id === 'debugger'
        case 10:
          return id === 'instanceof'
        default:
          return false
        }
      }
      function isReservedWordES5(id, strict) {
        return (
          id === 'null' ||
          id === 'true' ||
          id === 'false' ||
          isKeywordES5(id, strict)
        )
      }
      function isReservedWordES6(id, strict) {
        return (
          id === 'null' ||
          id === 'true' ||
          id === 'false' ||
          isKeywordES6(id, strict)
        )
      }
      function isRestrictedWord(id) {
        return id === 'eval' || id === 'arguments'
      }
      function isIdentifierNameES5(id) {
        var i
        var iz
        var ch
        if (id.length === 0) {
          return false
        }
        ch = id.charCodeAt(0)
        if (!code.isIdentifierStartES5(ch)) {
          return false
        }
        for (i = 1, iz = id.length; i < iz; ++i) {
          ch = id.charCodeAt(i)
          if (!code.isIdentifierPartES5(ch)) {
            return false
          }
        }
        return true
      }
      function decodeUtf16(lead, trail) {
        return (lead - 55296) * 1024 + (trail - 56320) + 65536
      }
      function isIdentifierNameES6(id) {
        var i
        var iz
        var ch
        var lowCh
        var check
        if (id.length === 0) {
          return false
        }
        check = code.isIdentifierStartES6
        for (i = 0, iz = id.length; i < iz; ++i) {
          ch = id.charCodeAt(i)
          if (55296 <= ch && ch <= 56319) {
            ++i
            if (i >= iz) {
              return false
            }
            lowCh = id.charCodeAt(i)
            if (!(56320 <= lowCh && lowCh <= 57343)) {
              return false
            }
            ch = decodeUtf16(ch, lowCh)
          }
          if (!check(ch)) {
            return false
          }
          check = code.isIdentifierPartES6
        }
        return true
      }
      function isIdentifierES5(id, strict) {
        return isIdentifierNameES5(id) && !isReservedWordES5(id, strict)
      }
      function isIdentifierES6(id, strict) {
        return isIdentifierNameES6(id) && !isReservedWordES6(id, strict)
      }
      module.exports = {
        isKeywordES5: isKeywordES5,
        isKeywordES6: isKeywordES6,
        isReservedWordES5: isReservedWordES5,
        isReservedWordES6: isReservedWordES6,
        isRestrictedWord: isRestrictedWord,
        isIdentifierNameES5: isIdentifierNameES5,
        isIdentifierNameES6: isIdentifierNameES6,
        isIdentifierES5: isIdentifierES5,
        isIdentifierES6: isIdentifierES6,
      }
    })()
  })
  require.define('/node_modules/esutils/lib/code.js', function (
    module,
    exports,
    __dirname,
    __filename
  ) {
    ;(function () {
      'use strict'
      var ES6Regex
      var ES5Regex
      var NON_ASCII_WHITESPACES
      var IDENTIFIER_START
      var IDENTIFIER_PART
      var ch
      ES5Regex = {
        NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
        NonAsciiIdentifierPart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
      }
      ES6Regex = {
        NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
        NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/,
      }
      function isDecimalDigit(ch) {
        return 48 <= ch && ch <= 57
      }
      function isHexDigit(ch) {
        return (
          (48 <= ch && ch <= 57) ||
          (97 <= ch && ch <= 102) ||
          (65 <= ch && ch <= 70)
        )
      }
      function isOctalDigit(ch) {
        return ch >= 48 && ch <= 55
      }
      NON_ASCII_WHITESPACES = [
        5760,
        8192,
        8193,
        8194,
        8195,
        8196,
        8197,
        8198,
        8199,
        8200,
        8201,
        8202,
        8239,
        8287,
        12288,
        65279,
      ]
      function isWhiteSpace(ch) {
        return (
          ch === 32 ||
          ch === 9 ||
          ch === 11 ||
          ch === 12 ||
          ch === 160 ||
          (ch >= 5760 && NON_ASCII_WHITESPACES.indexOf(ch) >= 0)
        )
      }
      function isLineTerminator(ch) {
        return ch === 10 || ch === 13 || ch === 8232 || ch === 8233
      }
      function fromCodePoint(cp) {
        if (cp <= 65535) {
          return String.fromCharCode(cp)
        }
        var cu1 = String.fromCharCode(Math.floor((cp - 65536) / 1024) + 55296)
        var cu2 = String.fromCharCode(((cp - 65536) % 1024) + 56320)
        return cu1 + cu2
      }
      IDENTIFIER_START = new Array(128)
      for (ch = 0; ch < 128; ++ch) {
        IDENTIFIER_START[ch] =
          (ch >= 97 && ch <= 122) ||
          (ch >= 65 && ch <= 90) ||
          ch === 36 ||
          ch === 95
      }
      IDENTIFIER_PART = new Array(128)
      for (ch = 0; ch < 128; ++ch) {
        IDENTIFIER_PART[ch] =
          (ch >= 97 && ch <= 122) ||
          (ch >= 65 && ch <= 90) ||
          (ch >= 48 && ch <= 57) ||
          ch === 36 ||
          ch === 95
      }
      function isIdentifierStartES5(ch) {
        return ch < 128
          ? IDENTIFIER_START[ch]
          : ES5Regex.NonAsciiIdentifierStart.test(fromCodePoint(ch))
      }
      function isIdentifierPartES5(ch) {
        return ch < 128
          ? IDENTIFIER_PART[ch]
          : ES5Regex.NonAsciiIdentifierPart.test(fromCodePoint(ch))
      }
      function isIdentifierStartES6(ch) {
        return ch < 128
          ? IDENTIFIER_START[ch]
          : ES6Regex.NonAsciiIdentifierStart.test(fromCodePoint(ch))
      }
      function isIdentifierPartES6(ch) {
        return ch < 128
          ? IDENTIFIER_PART[ch]
          : ES6Regex.NonAsciiIdentifierPart.test(fromCodePoint(ch))
      }
      module.exports = {
        isDecimalDigit: isDecimalDigit,
        isHexDigit: isHexDigit,
        isOctalDigit: isOctalDigit,
        isWhiteSpace: isWhiteSpace,
        isLineTerminator: isLineTerminator,
        isIdentifierStartES5: isIdentifierStartES5,
        isIdentifierPartES5: isIdentifierPartES5,
        isIdentifierStartES6: isIdentifierStartES6,
        isIdentifierPartES6: isIdentifierPartES6,
      }
    })()
  })
  require.define('/node_modules/esutils/lib/ast.js', function (
    module,
    exports,
    __dirname,
    __filename
  ) {
    ;(function () {
      'use strict'
      function isExpression(node) {
        if (node == null) {
          return false
        }
        switch (node.type) {
        case 'ArrayExpression':
        case 'AssignmentExpression':
        case 'BinaryExpression':
        case 'CallExpression':
        case 'ConditionalExpression':
        case 'FunctionExpression':
        case 'Identifier':
        case 'Literal':
        case 'LogicalExpression':
        case 'MemberExpression':
        case 'NewExpression':
        case 'ObjectExpression':
        case 'SequenceExpression':
        case 'ThisExpression':
        case 'UnaryExpression':
        case 'UpdateExpression':
          return true
        }
        return false
      }
      function isIterationStatement(node) {
        if (node == null) {
          return false
        }
        switch (node.type) {
        case 'DoWhileStatement':
        case 'ForInStatement':
        case 'ForStatement':
        case 'WhileStatement':
          return true
        }
        return false
      }
      function isStatement(node) {
        if (node == null) {
          return false
        }
        switch (node.type) {
        case 'BlockStatement':
        case 'BreakStatement':
        case 'ContinueStatement':
        case 'DebuggerStatement':
        case 'DoWhileStatement':
        case 'EmptyStatement':
        case 'ExpressionStatement':
        case 'ForInStatement':
        case 'ForStatement':
        case 'IfStatement':
        case 'LabeledStatement':
        case 'ReturnStatement':
        case 'SwitchStatement':
        case 'ThrowStatement':
        case 'TryStatement':
        case 'VariableDeclaration':
        case 'WhileStatement':
        case 'WithStatement':
          return true
        }
        return false
      }
      function isSourceElement(node) {
        return (
          isStatement(node) ||
          (node != null && node.type === 'FunctionDeclaration')
        )
      }
      function trailingStatement(node) {
        switch (node.type) {
        case 'IfStatement':
          if (node.alternate != null) {
            return node.alternate
          }
          return node.consequent
        case 'LabeledStatement':
        case 'ForStatement':
        case 'ForInStatement':
        case 'WhileStatement':
        case 'WithStatement':
          return node.body
        }
        return null
      }
      function isProblematicIfStatement(node) {
        var current
        if (node.type !== 'IfStatement') {
          return false
        }
        if (node.alternate == null) {
          return false
        }
        current = node.consequent
        do {
          if (current.type === 'IfStatement') {
            if (current.alternate == null) {
              return true
            }
          }
          current = trailingStatement(current)
        } while (current)
        return false
      }
      module.exports = {
        isExpression: isExpression,
        isStatement: isStatement,
        isIterationStatement: isIterationStatement,
        isSourceElement: isSourceElement,
        isProblematicIfStatement: isProblematicIfStatement,
        trailingStatement: trailingStatement,
      }
    })()
  })
  require.define('/node_modules/estraverse/estraverse.js', function (
    module,
    exports,
    __dirname,
    __filename
  ) {
    ;(function clone(exports) {
      'use strict'
      var Syntax
      var VisitorOption
      var VisitorKeys
      var BREAK
      var SKIP
      var REMOVE
      function deepCopy(obj) {
        var ret = {}
        var key
        var val
        for (key in obj) {
          if (obj.hasOwnProperty(key)) {
            val = obj[key]
            if (typeof val === 'object' && val !== null) {
              ret[key] = deepCopy(val)
            }
            else {
              ret[key] = val
            }
          }
        }
        return ret
      }
      function upperBound(array, func) {
        var diff
        var len
        var i
        var current
        len = array.length
        i = 0
        while (len) {
          diff = len >>> 1
          current = i + diff
          if (func(array[current])) {
            len = diff
          }
          else {
            i = current + 1
            len -= diff + 1
          }
        }
        return i
      }
      Syntax = {
        AssignmentExpression: 'AssignmentExpression',
        AssignmentPattern: 'AssignmentPattern',
        ArrayExpression: 'ArrayExpression',
        ArrayPattern: 'ArrayPattern',
        ArrowFunctionExpression: 'ArrowFunctionExpression',
        AwaitExpression: 'AwaitExpression',
        BlockStatement: 'BlockStatement',
        BinaryExpression: 'BinaryExpression',
        BreakStatement: 'BreakStatement',
        CallExpression: 'CallExpression',
        CatchClause: 'CatchClause',
        ChainExpression: 'ChainExpression',
        ClassBody: 'ClassBody',
        ClassDeclaration: 'ClassDeclaration',
        ClassExpression: 'ClassExpression',
        ComprehensionBlock: 'ComprehensionBlock',
        ComprehensionExpression: 'ComprehensionExpression',
        ConditionalExpression: 'ConditionalExpression',
        ContinueStatement: 'ContinueStatement',
        DebuggerStatement: 'DebuggerStatement',
        DirectiveStatement: 'DirectiveStatement',
        DoWhileStatement: 'DoWhileStatement',
        EmptyStatement: 'EmptyStatement',
        ExportAllDeclaration: 'ExportAllDeclaration',
        ExportDefaultDeclaration: 'ExportDefaultDeclaration',
        ExportNamedDeclaration: 'ExportNamedDeclaration',
        ExportSpecifier: 'ExportSpecifier',
        ExpressionStatement: 'ExpressionStatement',
        ForStatement: 'ForStatement',
        ForInStatement: 'ForInStatement',
        ForOfStatement: 'ForOfStatement',
        FunctionDeclaration: 'FunctionDeclaration',
        FunctionExpression: 'FunctionExpression',
        GeneratorExpression: 'GeneratorExpression',
        Identifier: 'Identifier',
        IfStatement: 'IfStatement',
        ImportExpression: 'ImportExpression',
        ImportDeclaration: 'ImportDeclaration',
        ImportDefaultSpecifier: 'ImportDefaultSpecifier',
        ImportNamespaceSpecifier: 'ImportNamespaceSpecifier',
        ImportSpecifier: 'ImportSpecifier',
        Literal: 'Literal',
        LabeledStatement: 'LabeledStatement',
        LogicalExpression: 'LogicalExpression',
        MemberExpression: 'MemberExpression',
        MetaProperty: 'MetaProperty',
        MethodDefinition: 'MethodDefinition',
        ModuleSpecifier: 'ModuleSpecifier',
        NewExpression: 'NewExpression',
        ObjectExpression: 'ObjectExpression',
        ObjectPattern: 'ObjectPattern',
        Program: 'Program',
        Property: 'Property',
        RestElement: 'RestElement',
        ReturnStatement: 'ReturnStatement',
        SequenceExpression: 'SequenceExpression',
        SpreadElement: 'SpreadElement',
        Super: 'Super',
        SwitchStatement: 'SwitchStatement',
        SwitchCase: 'SwitchCase',
        TaggedTemplateExpression: 'TaggedTemplateExpression',
        TemplateElement: 'TemplateElement',
        TemplateLiteral: 'TemplateLiteral',
        ThisExpression: 'ThisExpression',
        ThrowStatement: 'ThrowStatement',
        TryStatement: 'TryStatement',
        UnaryExpression: 'UnaryExpression',
        UpdateExpression: 'UpdateExpression',
        VariableDeclaration: 'VariableDeclaration',
        VariableDeclarator: 'VariableDeclarator',
        WhileStatement: 'WhileStatement',
        WithStatement: 'WithStatement',
        YieldExpression: 'YieldExpression',
      }
      VisitorKeys = {
        AssignmentExpression: [ 'left', 'right' ],
        AssignmentPattern: [ 'left', 'right' ],
        ArrayExpression: ['elements'],
        ArrayPattern: ['elements'],
        ArrowFunctionExpression: [ 'params', 'body' ],
        AwaitExpression: ['argument'],
        BlockStatement: ['body'],
        BinaryExpression: [ 'left', 'right' ],
        BreakStatement: ['label'],
        CallExpression: [ 'callee', 'arguments' ],
        CatchClause: [ 'param', 'body' ],
        ChainExpression: ['expression'],
        ClassBody: ['body'],
        ClassDeclaration: [ 'id', 'superClass', 'body' ],
        ClassExpression: [ 'id', 'superClass', 'body' ],
        ComprehensionBlock: [ 'left', 'right' ],
        ComprehensionExpression: [ 'blocks', 'filter', 'body' ],
        ConditionalExpression: [ 'test', 'consequent', 'alternate' ],
        ContinueStatement: ['label'],
        DebuggerStatement: [],
        DirectiveStatement: [],
        DoWhileStatement: [ 'body', 'test' ],
        EmptyStatement: [],
        ExportAllDeclaration: ['source'],
        ExportDefaultDeclaration: ['declaration'],
        ExportNamedDeclaration: [ 'declaration', 'specifiers', 'source' ],
        ExportSpecifier: [ 'exported', 'local' ],
        ExpressionStatement: ['expression'],
        ForStatement: [ 'init', 'test', 'update', 'body' ],
        ForInStatement: [ 'left', 'right', 'body' ],
        ForOfStatement: [ 'left', 'right', 'body' ],
        FunctionDeclaration: [ 'id', 'params', 'body' ],
        FunctionExpression: [ 'id', 'params', 'body' ],
        GeneratorExpression: [ 'blocks', 'filter', 'body' ],
        Identifier: [],
        IfStatement: [ 'test', 'consequent', 'alternate' ],
        ImportExpression: ['source'],
        ImportDeclaration: [ 'specifiers', 'source' ],
        ImportDefaultSpecifier: ['local'],
        ImportNamespaceSpecifier: ['local'],
        ImportSpecifier: [ 'imported', 'local' ],
        Literal: [],
        LabeledStatement: [ 'label', 'body' ],
        LogicalExpression: [ 'left', 'right' ],
        MemberExpression: [ 'object', 'property' ],
        MetaProperty: [ 'meta', 'property' ],
        MethodDefinition: [ 'key', 'value' ],
        ModuleSpecifier: [],
        NewExpression: [ 'callee', 'arguments' ],
        ObjectExpression: ['properties'],
        ObjectPattern: ['properties'],
        Program: ['body'],
        Property: [ 'key', 'value' ],
        RestElement: ['argument'],
        ReturnStatement: ['argument'],
        SequenceExpression: ['expressions'],
        SpreadElement: ['argument'],
        Super: [],
        SwitchStatement: [ 'discriminant', 'cases' ],
        SwitchCase: [ 'test', 'consequent' ],
        TaggedTemplateExpression: [ 'tag', 'quasi' ],
        TemplateElement: [],
        TemplateLiteral: [ 'quasis', 'expressions' ],
        ThisExpression: [],
        ThrowStatement: ['argument'],
        TryStatement: [ 'block', 'handler', 'finalizer' ],
        UnaryExpression: ['argument'],
        UpdateExpression: ['argument'],
        VariableDeclaration: ['declarations'],
        VariableDeclarator: [ 'id', 'init' ],
        WhileStatement: [ 'test', 'body' ],
        WithStatement: [ 'object', 'body' ],
        YieldExpression: ['argument'],
      }
      BREAK = {}
      SKIP = {}
      REMOVE = {}
      VisitorOption = {
        Break: BREAK,
        Skip: SKIP,
        Remove: REMOVE,
      }
      function Reference(parent, key) {
        this.parent = parent
        this.key = key
      }
      Reference.prototype.replace = function replace(node) {
        this.parent[this.key] = node
      }
      Reference.prototype.remove = function remove() {
        if (Array.isArray(this.parent)) {
          this.parent.splice(this.key, 1)
          return true
        }
        else {
          this.replace(null)
          return false
        }
      }
      function Element(node, path, wrap, ref) {
        this.node = node
        this.path = path
        this.wrap = wrap
        this.ref = ref
      }
      function Controller() {}
      Controller.prototype.path = function path() {
        var i
        var iz
        var j
        var jz
        var result
        var element
        function addToPath(result, path) {
          if (Array.isArray(path)) {
            for (j = 0, jz = path.length; j < jz; ++j) {
              result.push(path[j])
            }
          }
          else {
            result.push(path)
          }
        }
        if (!this.__current.path) {
          return null
        }
        result = []
        for (i = 2, iz = this.__leavelist.length; i < iz; ++i) {
          element = this.__leavelist[i]
          addToPath(result, element.path)
        }
        addToPath(result, this.__current.path)
        return result
      }
      Controller.prototype.type = function () {
        var node = this.current()
        return node.type || this.__current.wrap
      }
      Controller.prototype.parents = function parents() {
        var i
        var iz
        var result
        result = []
        for (i = 1, iz = this.__leavelist.length; i < iz; ++i) {
          result.push(this.__leavelist[i].node)
        }
        return result
      }
      Controller.prototype.current = function current() {
        return this.__current.node
      }
      Controller.prototype.__execute = function __execute(callback, element) {
        var previous
        var result
        result = undefined
        previous = this.__current
        this.__current = element
        this.__state = null
        if (callback) {
          result = callback.call(
            this,
            element.node,
            this.__leavelist[this.__leavelist.length - 1].node
          )
        }
        this.__current = previous
        return result
      }
      Controller.prototype.notify = function notify(flag) {
        this.__state = flag
      }
      Controller.prototype.skip = function () {
        this.notify(SKIP)
      }
      Controller.prototype['break'] = function () {
        this.notify(BREAK)
      }
      Controller.prototype.remove = function () {
        this.notify(REMOVE)
      }
      Controller.prototype.__initialize = function (root, visitor) {
        this.visitor = visitor
        this.root = root
        this.__worklist = []
        this.__leavelist = []
        this.__current = null
        this.__state = null
        this.__fallback = null
        if (visitor.fallback === 'iteration') {
          this.__fallback = Object.keys
        }
        else if (typeof visitor.fallback === 'function') {
          this.__fallback = visitor.fallback
        }
        this.__keys = VisitorKeys
        if (visitor.keys) {
          this.__keys = Object.assign(Object.create(this.__keys), visitor.keys)
        }
      }
      function isNode(node) {
        if (node == null) {
          return false
        }
        return typeof node === 'object' && typeof node.type === 'string'
      }
      function isProperty(nodeType, key) {
        return (
          (nodeType === Syntax.ObjectExpression ||
            nodeType === Syntax.ObjectPattern) &&
          'properties' === key
        )
      }
      function candidateExistsInLeaveList(leavelist, candidate) {
        for (var i = leavelist.length - 1; i >= 0; --i) {
          if (leavelist[i].node === candidate) {
            return true
          }
        }
        return false
      }
      Controller.prototype.traverse = function traverse(root, visitor) {
        var worklist
        var leavelist
        var element
        var node
        var nodeType
        var ret
        var key
        var current
        var current2
        var candidates
        var candidate
        var sentinel
        this.__initialize(root, visitor)
        sentinel = {}
        worklist = this.__worklist
        leavelist = this.__leavelist
        worklist.push(new Element(root, null, null, null))
        leavelist.push(new Element(null, null, null, null))
        while (worklist.length) {
          element = worklist.pop()
          if (element === sentinel) {
            element = leavelist.pop()
            ret = this.__execute(visitor.leave, element)
            if (this.__state === BREAK || ret === BREAK) {
              return
            }
            continue
          }
          if (element.node) {
            ret = this.__execute(visitor.enter, element)
            if (this.__state === BREAK || ret === BREAK) {
              return
            }
            worklist.push(sentinel)
            leavelist.push(element)
            if (this.__state === SKIP || ret === SKIP) {
              continue
            }
            node = element.node
            nodeType = node.type || element.wrap
            candidates = this.__keys[nodeType]
            if (!candidates) {
              if (this.__fallback) {
                candidates = this.__fallback(node)
              }
              else {
                throw new Error('Unknown node type ' + nodeType + '.')
              }
            }
            current = candidates.length
            while ((current -= 1) >= 0) {
              key = candidates[current]
              candidate = node[key]
              if (!candidate) {
                continue
              }
              if (Array.isArray(candidate)) {
                current2 = candidate.length
                while ((current2 -= 1) >= 0) {
                  if (!candidate[current2]) {
                    continue
                  }
                  if (
                    candidateExistsInLeaveList(leavelist, candidate[current2])
                  ) {
                    continue
                  }
                  if (isProperty(nodeType, candidates[current])) {
                    element = new Element(
                      candidate[current2],
                      [ key, current2 ],
                      'Property',
                      null
                    )
                  }
                  else if (isNode(candidate[current2])) {
                    element = new Element(
                      candidate[current2],
                      [ key, current2 ],
                      null,
                      null
                    )
                  }
                  else {
                    continue
                  }
                  worklist.push(element)
                }
              }
              else if (isNode(candidate)) {
                if (candidateExistsInLeaveList(leavelist, candidate)) {
                  continue
                }
                worklist.push(new Element(candidate, key, null, null))
              }
            }
          }
        }
      }
      Controller.prototype.replace = function replace(root, visitor) {
        var worklist
        var leavelist
        var node
        var nodeType
        var target
        var element
        var current
        var current2
        var candidates
        var candidate
        var sentinel
        var outer
        var key
        function removeElem(element) {
          var i
          var key
          var nextElem
          var parent
          if (element.ref.remove()) {
            key = element.ref.key
            parent = element.ref.parent
            i = worklist.length
            while (i--) {
              nextElem = worklist[i]
              if (nextElem.ref && nextElem.ref.parent === parent) {
                if (nextElem.ref.key < key) {
                  break
                }
                --nextElem.ref.key
              }
            }
          }
        }
        this.__initialize(root, visitor)
        sentinel = {}
        worklist = this.__worklist
        leavelist = this.__leavelist
        outer = { root: root }
        element = new Element(root, null, null, new Reference(outer, 'root'))
        worklist.push(element)
        leavelist.push(element)
        while (worklist.length) {
          element = worklist.pop()
          if (element === sentinel) {
            element = leavelist.pop()
            target = this.__execute(visitor.leave, element)
            if (
              target !== undefined &&
              target !== BREAK &&
              target !== SKIP &&
              target !== REMOVE
            ) {
              element.ref.replace(target)
            }
            if (this.__state === REMOVE || target === REMOVE) {
              removeElem(element)
            }
            if (this.__state === BREAK || target === BREAK) {
              return outer.root
            }
            continue
          }
          target = this.__execute(visitor.enter, element)
          if (
            target !== undefined &&
            target !== BREAK &&
            target !== SKIP &&
            target !== REMOVE
          ) {
            element.ref.replace(target)
            element.node = target
          }
          if (this.__state === REMOVE || target === REMOVE) {
            removeElem(element)
            element.node = null
          }
          if (this.__state === BREAK || target === BREAK) {
            return outer.root
          }
          node = element.node
          if (!node) {
            continue
          }
          worklist.push(sentinel)
          leavelist.push(element)
          if (this.__state === SKIP || target === SKIP) {
            continue
          }
          nodeType = node.type || element.wrap
          candidates = this.__keys[nodeType]
          if (!candidates) {
            if (this.__fallback) {
              candidates = this.__fallback(node)
            }
            else {
              throw new Error('Unknown node type ' + nodeType + '.')
            }
          }
          current = candidates.length
          while ((current -= 1) >= 0) {
            key = candidates[current]
            candidate = node[key]
            if (!candidate) {
              continue
            }
            if (Array.isArray(candidate)) {
              current2 = candidate.length
              while ((current2 -= 1) >= 0) {
                if (!candidate[current2]) {
                  continue
                }
                if (isProperty(nodeType, candidates[current])) {
                  element = new Element(
                    candidate[current2],
                    [ key, current2 ],
                    'Property',
                    new Reference(candidate, current2)
                  )
                }
                else if (isNode(candidate[current2])) {
                  element = new Element(
                    candidate[current2],
                    [ key, current2 ],
                    null,
                    new Reference(candidate, current2)
                  )
                }
                else {
                  continue
                }
                worklist.push(element)
              }
            }
            else if (isNode(candidate)) {
              worklist.push(
                new Element(candidate, key, null, new Reference(node, key))
              )
            }
          }
        }
        return outer.root
      }
      function traverse(root, visitor) {
        var controller = new Controller()
        return controller.traverse(root, visitor)
      }
      function replace(root, visitor) {
        var controller = new Controller()
        return controller.replace(root, visitor)
      }
      exports.Syntax = Syntax
      exports.traverse = traverse
      exports.replace = replace
      exports.VisitorKeys = VisitorKeys
      exports.VisitorOption = VisitorOption
      exports.Controller = Controller
      return exports
    })(exports)
  })

  const codegen = require('/escodegen.js')
  codegen.browser = true

  return codegen
})()

