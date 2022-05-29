System.register(['./wait-26c5e7c6-2112d3c7.js', './globalScope-fc1eb958.js'], (function (exports) {
  'use strict';
  var isArr, isStr, isFunc, isObj, noOpObj, checkCall, deepFreeze, _defineProperty, noOp, _classPrivateFieldInitSpec, _classPrivateFieldGet, _classPrivateFieldSet, hasWindow, resolveGlobalObj, resolveRequire, resolveModule, hasJasmine, resolveJasmine;
  return {
    setters: [function (module) {
      isArr = module.i;
      isStr = module.a;
      isFunc = module.b;
      isObj = module.c;
      noOpObj = module.n;
      checkCall = module.d;
      deepFreeze = module.e;
      _defineProperty = module._;
      noOp = module.f;
      _classPrivateFieldInitSpec = module.g;
      _classPrivateFieldGet = module.h;
      _classPrivateFieldSet = module.j;
    }, function (module) {
      hasWindow = module.h;
      resolveGlobalObj = module.r;
      resolveRequire = module.a;
      resolveModule = module.b;
      hasJasmine = module.c;
      resolveJasmine = module.d;
    }],
    execute: (function () {

      const equalsNaN = val => typeof val === 'number' && val != val;

      const exists = value => value === value && value !== undefined && value !== null;

      const eitherArr = (a, b) => isArr(a) ? a : b;

      const toStr = val => val === null || val === undefined ? '' : isStr(val) ? val : JSON.stringify(val);

      const isColl = val => typeof val === 'object' && val !== null;

      const updateColl = (obj, path, type, val) => {
        const org = obj;
        if (!isColl(obj) || !obj || !path) return type !== 'set' && val || undefined;
        const parts = isArr(path) ? Array.from(path) : path.split('.');
        const key = parts.pop();
        let prop;
        let breakPath;
        while (prop = parts.shift()) {
          const next = obj[prop];
          isColl(next) || isFunc(next) ? obj = next : (() => {
            if (type === 'set') obj[prop] = {};else breakPath = true;
            obj = obj[prop];
          })();
          if (breakPath) return val;
        }
        return type === 'get' ? key in obj ? obj[key] : val : type === 'unset' ? delete obj[key] : (obj[key] = val) && org || org;
      };
      const get = (obj, path, fallback) => updateColl(obj, path, 'get', fallback);

      const isRegex = val => Boolean(val && val instanceof RegExp);
      const getRegexSource = maybeRx => isRegex(maybeRx) ? maybeRx.source : isStr(maybeRx) ? maybeRx : null;
      const parseArgs = args => {
        if (isArr(args[0])) return [args[0], args[1]];
        const last = args[args.length - 1];
        const options = isStr(last) ? last : undefined;
        const expressions = options ? args.splice(0, args.length - 1) : args;
        return [expressions, options];
      };
      const joinRegex = (...args) => {
        const [expressions, options] = parseArgs(args);
        const source = expressions.reduce((joined, next) => {
          const nextSource = getRegexSource(next);
          return !nextSource ? joined : joined === '' ? nextSource : `${joined}|${nextSource}`;
        }, '');
        return new RegExp(`(${source})`, options);
      };

      const capitalize = (str, lowercaseTail = true) => {
        if (!isStr(str) || !str[0]) return str;
        const tail = lowercaseTail ? str.slice(1).toLowerCase() : str.slice(1);
        return `${str[0].toUpperCase()}${tail}`;
      };
      const quoteSymbols = ['\"', '\''];
      const isQuoted = (str, quotes = quoteSymbols) => {
        return isStr(str) && quotes.some(quote => str.startsWith(quote) && str.endsWith(quote));
      };
      const reverseStr = str => {
        if (!isStr(str)) return undefined;
        let reversed = '';
        for (let char of str) {
          reversed = char + reversed;
        }
        return reversed;
      };
      const getNearestDelimiterIndex = (text, index, delimiters) => {
        const indices = delimiters.map(str => text.indexOf(str, index)).sort();
        return indices.find(idx => idx >= 0);
      };
      const getWordStartingAt = (text, index, delimiters = [' ']) => {
        const endingSpaceIdx = getNearestDelimiterIndex(text, index, delimiters);
        return text.substring(index, endingSpaceIdx === -1 ? text.length : endingSpaceIdx);
      };
      const getWordEndingAt = (text, index, delimiters = [' ']) => {
        const reversed = reverseStr(text);
        const reversedIndex = text.length - index;
        return reverseStr(getWordStartingAt(reversed, reversedIndex, delimiters));
      };

      const getRXMatch = (line, regex, index) => {
        const matching = line.match(regex)[index];
        return matching ? matching.trim() : ` `;
      };
      const sanitizeForId = (text, index) => {
        const cleaned = text && text.trim() && text.trim().toLowerCase().replace(/[\s\/\\\(\)\+=_&%\$#@!\*~`\|\?:;"'<>,.{}]/g, '-');
        return cleaned ? `${cleaned}-${text.length}` : `${index}-${index.length}`;
      };
      const sanitize = step => {
        let name = step.match.toString();
        name[0] === '/' && (name = name.substr(1));
        name[0] === '^' && (name = name.substr(1));
        name.charAt(name.length - 1) === '/' && (name = name.slice(0, -1));
        name.charAt(name.length - 1) === '$' && (name = name.slice(0, -1));
        return name.replace(/\(\?:([^\|]+)+\|+([^\)]+)?\)/, '$1');
      };
      const validateDefinition = (definition, definitions) => {
        return definitions.reduce((validated, def) => {
          if (!validated || def.content === validated.content) return false;
          def.uuid === validated.uuid && (validated.uuid = `${validated.uuid}-${validated.content.length}`);
          return validated;
        }, { ...definition
        });
      };
      const removeQuotes = arg => arg.trim().replace(/^("|')/, '').replace(/("|')$/, '');

      const RX_OPTIONAL = /\w*\([^)]*?\)/;
      const RX_ALT = /\s*\S*\/\S*\s*/;
      const RX_PARAMETER = /\s*{(.*?)}\s*/;
      const RX_EXPRESSION = joinRegex(RX_PARAMETER, RX_OPTIONAL, 'g');
      const RX_ANY = /(.*)/;
      const RX_MATCH_REPLACE = /{|}/g;
      const RX_DOUBLE_QUOTED = /"[^"]+"/;
      const RX_SINGLE_QUOTED = /'[^']+'/;
      const RX_FLOAT = /-?[0-9]+[.][0-9]+/;
      const RX_INT = /-?[0-9]+/;
      const RX_WORLD = /^["]?\$world\.\S+["]?/;
      const RX_WORLD_REPLACE = /(\$:world|\$world)+\.[^"'\s]*/gm;

      const testMethodFill = type => {
        return () => {
          throw new Error(`` + `Test method ${type} does not exist on the global scope.\n` + `Please ensure ${type} exists before calling the run method!\n`);
        };
      };
      const throwMissingSteps = () => {
        throw new Error(`Runner class constructor requires an instance of the Steps class`);
      };
      const throwMissingFeatureText = () => {
        throw new Error(`Runner class requires feature text when calling the run method`);
      };
      const throwNoMatchingStep = text => {
        throw new ReferenceError(text);
      };
      const throwParamTypeExists = () => {
        throw new Error(`Cannot register param type "${name}". It already exists!`);
      };
      const throwFeatureNotAnObj = feature => {
        throw new Error(`Assemble feature requires an object matching the feature model spec!`, feature);
      };
      const throwMissingWorldValue = (arg, world) => {
        throw new Error(`Can not replace ${arg} with value from $world, it does not exist on the world object`, world, arg);
      };
      const throwInvalidHookType = (hookTypes, type) => {
        throw new Error([`Expected client hook type to be one of ', ${hookTypes}.`, `Found: ${type}`].join('\n'));
      };
      const throwWorldReplace = (err, currentMatch) => {
        console.log(`Error in $world replace of text content. Current match was ${currentMatch}`);
        throw err;
      };

      const checkWorldValue = (func, type) => {
        return (arg, $world) => {
          const hasWorldVal = arg.match(RX_WORLD);
          if (!isObj($world) || !hasWorldVal) return matchType(func(arg), type);
          const worldVal = get($world, removeQuotes(arg).replace('$world.', ''));
          return exists(worldVal) ? matchType(worldVal, type) : throwMissingWorldValue(arg, $world);
        };
      };
      const matchType = (val, type) => {
        return typeof val === type ? val : null;
      };
      const typeModel = {
        name: '',
        regex: '',
        type: 'string',
        useForSnippets: true,
        preferForRegexpMatch: false,
        transformer: checkWorldValue(arg => arg, 'string')
      };
      const __paramTypes = {
        any: { ...typeModel,
          name: 'any',
          regex: RX_ANY
        },
        word: { ...typeModel,
          name: 'word',
          regex: RX_ANY,
          transformer: checkWorldValue(arg => {
            return !isQuoted(arg) ? toStr(arg) : undefined;
          }, typeModel.type)
        },
        float: { ...typeModel,
          name: 'float',
          type: 'number',
          regex: RX_FLOAT,
          transformer: checkWorldValue(arg => {
            const result = parseFloat(arg);
            return equalsNaN(result) ? undefined : result;
          }, 'number')
        },
        int: { ...typeModel,
          name: 'int',
          type: 'number',
          regex: RX_INT,
          transformer: checkWorldValue(arg => {
            const result = parseInt(arg);
            return equalsNaN(result) || arg.includes('.') ? undefined : result;
          }, 'number')
        },
        string: { ...typeModel,
          name: 'string',
          regex: joinRegex(RX_DOUBLE_QUOTED, RX_SINGLE_QUOTED),
          transformer: checkWorldValue(arg => {
            return isQuoted(arg) ? removeQuotes(arg) : undefined;
          }, typeModel.type)
        }
      };
      const getParamTypes = () => __paramTypes;
      const registerParamType = (model = noOpObj, key = model.name) => {
        if (__paramTypes[key]) return throwParamTypeExists();
        __paramTypes[key] = { ...typeModel,
          ...model
        };
        __paramTypes[key].transformer = checkWorldValue(__paramTypes[key].transformer, __paramTypes[key].type);
        return __paramTypes;
      };
      const convertTypes = (matches, transformers, $world) => {
        return matches.map((item, i) => {
          const paramType = transformers[i] || __paramTypes.any;
          return checkCall(paramType.transformer, item, $world);
        }).filter(exists);
      };

      const matchRegex = (definition, text) => {
        const match = text.match(new RegExp(definition.match));
        return match ? {
          definition,
          match: match.slice(1, match.length).filter(Boolean)
        } : noOpObj;
      };
      const toAlternateRegex = optional => {
        const split = optional.split(/(\(|\))/);
        const [start,, middle,, end] = split;
        if (start === '' && end === '') return optional + '?';else if (start === '') return `(${middle}|${middle}${end})`;else if (end === '') return `(${start}|${start}${middle})`;else return `(${start}${end}|${start}${middle}${end})`;
      };
      const getFullOptionalText = match => {
        const text = match.input;
        const precedingWord = getWordEndingAt(text, match.index);
        return precedingWord + match[0];
      };
      const getOptionalRegex = match => {
        const optionalText = getFullOptionalText(match);
        return toAlternateRegex(optionalText);
      };
      const getParamRegex = type => {
        const params = getParamTypes();
        const spec = params[type] || params.any;
        return spec.regex.source;
      };
      const getAlternateRegex = value => {
        return `(${value.trim().replace(/\//g, '|')})`;
      };
      const getMatchRegex = (type, match) => {
        const [val, paramType] = match;
        switch (type) {
          case 'parameter':
            return new RegExp(getParamRegex(paramType));
          case 'optional':
            return new RegExp(getOptionalRegex(match));
          case 'alternate':
            return new RegExp(getAlternateRegex(val));
          default:
            return null;
        }
      };
      const parseMatch = (matchArr, type = 'other') => {
        const val = matchArr[0];
        return {
          text: val.trim(),
          index: matchArr.index,
          input: matchArr.input,
          regex: getMatchRegex(type, matchArr),
          type,
          ...(type === 'parameter' && {
            paramType: val.trim().replace(RX_MATCH_REPLACE, '')
          })
        };
      };
      const getRegexParts = defMatcher => {
        const parameters = [...defMatcher.matchAll(new RegExp(RX_PARAMETER, 'gi'))].map(match => parseMatch(match, 'parameter'));
        const optionals = [...defMatcher.matchAll(new RegExp(RX_OPTIONAL, 'gi'))].map(match => parseMatch(match, 'optional'));
        const alts = [...defMatcher.matchAll(new RegExp(RX_ALT, 'gi'))].map(match => parseMatch(match, 'alternate'));
        const sortedExpressions = [...parameters, ...optionals, ...alts].sort((matchA, matchB) => matchA.index - matchB.index);
        return sortedExpressions;
      };

      const constants = deepFreeze({
        REGEX_VARIANT: 'regex',
        WORLD_AT_RUNTIME: `$:`,
        EXPRESSION_VARIANT: 'expression',
        STEP_TYPES: ['given', 'when', 'then', 'and', 'but'],
        HOOK_TYPES: ['beforeAll', 'afterAll', 'beforeEach', 'afterEach'],
        FEATURE_META: ['feature', 'perspective', 'desire', 'reason', 'comments'],
        LOG_JEST_SPEC_ENV: `PARKIN_LOG_JEST_SPEC`,
        SPEC_RESULT_LOG: `------- PARKIN SPEC RESULT LOG -------`
      });

      const escapeStr = str => {
        return hasWindow ? str.replace(/[|\\[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d') : str.replace(/[|\\[\]^$+*?.]/g, '\\$&');
      };
      const runRegexCheck = (matcher, testRx, replaceWith) => {
        if (!testRx.test(matcher)) return matcher;
        let regexStr = matcher;
        matcher.replace(testRx, (...args) => {
          const match = args[0].trim();
          const [start, ...end] = regexStr.split(match);
          const replace = isFunc(replaceWith) ? replaceWith(...args) : replaceWith;
          regexStr = `${start}${replace}${end.join(match)}`;
        });
        return regexStr;
      };
      const convertToRegex = match => {
        const paramTypes = getParamTypes();
        const transformers = [];
        const regex = runRegexCheck(match, RX_EXPRESSION, (val, ...args) => {
          const type = val.trim().replace(RX_MATCH_REPLACE, '');
          const isParameter = val.match(RX_PARAMETER);
          const isOptional = val.match(RX_OPTIONAL);
          isParameter && transformers.push(paramTypes[type] || paramTypes.any);
          return isParameter ? getParamRegex(type) : isOptional ? toAlternateRegex(val) : val;
        });
        return {
          regex,
          transformers
        };
      };
      const checkAlternative = match => {
        const altIndexes = [];
        const regex = runRegexCheck(match, new RegExp(RX_ALT, 'g'),
        getAlternateRegex);
        return {
          regex,
          altIndexes
        };
      };
      const checkAnchors = str => {
        let final = str;
        if (!str.startsWith('^')) final = '^' + final;
        if (!str.endsWith('$')) final += '$';
        return {
          regex: final
        };
      };
      const extractParameters = (text, stepMatcher, wordMatches) => {
        const parts = getRegexParts(stepMatcher);
        const expectedParamLength = parts.filter(part => part.type === 'parameter').length;
        const result = parts.reduce((state, part) => {
          const {
            params,
            textIndex,
            wordMatchIndex
          } = state;
          const substring = text.substring(textIndex);
          const isWord = part.paramType === 'word';
          const partMatch = substring.match(part.regex);
          const wordMatch = {
            0: wordMatches[wordMatchIndex],
            index: substring.indexOf(wordMatches[wordMatchIndex])
          };
          const match = isWord ? wordMatch : partMatch;
          if (!match) return state;
          part.type === 'parameter' && match && params.push(match[0]);
          return {
            params,
            textIndex: textIndex + (match && match.index + match[0].length),
            wordMatchIndex: wordMatchIndex + (isWord && 1)
          };
        }, {
          params: [],
          textIndex: 0,
          wordMatchIndex: 0
        });
        return expectedParamLength === result.params.length ? result.params : null;
      };
      const matchExpression = (definition, text, $world) => {
        if (definition.match === text) return {
          definition,
          match: []
        };
        const escaped = escapeStr(definition.match);
        const {
          regex: regexAlts
        } = checkAlternative(escaped);
        const {
          regex: convertedRegex,
          transformers
        } = convertToRegex(regexAlts);
        const {
          regex: match
        } = checkAnchors(convertedRegex);
        const found = matchRegex({ ...definition,
          match
        }, text);
        if (!found || !found.definition || !found.match) return noOpObj;
        const params = extractParameters(text, definition.match, found.match);
        if (!params) return noOpObj;
        const converted = convertTypes(params, transformers, $world);
        return converted.length !== params.length ? noOpObj : {
          definition,
          match: converted
        };
      };

      const {
        REGEX_VARIANT: REGEX_VARIANT$1
      } = constants;
      const matcher = (definitions, text, $world) => {
        return definitions.reduce((found, definition) => {
          return found.match || !definition.match ? found : definition.variant !== REGEX_VARIANT$1 ? matchExpression(definition, text, $world) : matchRegex(definition, text);
        }, noOpObj);
      };

      const {
        REGEX_VARIANT,
        EXPRESSION_VARIANT,
        STEP_TYPES
      } = constants;
      const getContent = step => {
        const match = step.variant === REGEX_VARIANT ? step.match.toString() : `"${step.match}"`;
        return `${capitalize(step.type)}(${match}, ${step.method.toString()})`;
      };
      const registerFromCall = function (internalType, type, match, method, meta = noOpObj) {
        const definition = {
          type,
          meta,
          match,
          method,
          tokens: [],
          variant: match.toString().indexOf('/') === 0 ? REGEX_VARIANT : EXPRESSION_VARIANT
        };
        definition.name = sanitize(definition);
        definition.uuid = sanitizeForId(`${type}-${definition.name}`);
        definition.content = getContent(definition);
        const definitions = this.list();
        const newDefinition = validateDefinition(definition, definitions);
        newDefinition && this[internalType].push(newDefinition);
        return newDefinition;
      };
      const tempRegister = (parent, type, container) => {
        return (...args) => {
          const definition = parent[type](...args);
          container[type].push(definition);
          return definition;
        };
      };
      const registerFromParse = function (definitions) {
        const DEF_TYPES = this.types.map(type => capitalize(type));
        const container = DEF_TYPES.reduce((built, type) => {
          built[type] = [];
          return built;
        }, {});
        eitherArr(definitions, [definitions]).map(definition => {
          Function(`return (global, require, module, ${DEF_TYPES.join(',')}) => {
          return (function(global) { ${definition} }).call(global, global)
        }`)()(
          resolveGlobalObj(), resolveRequire(), resolveModule(),
          ...DEF_TYPES.map(type => tempRegister(this, type, container)));
        });
        return container;
      };
      const joinAllSteps = instance => {
        return instance.types.reduce((stepDefs, type) => stepDefs.concat(instance[`_${type}`]), []);
      };
      class Steps {
        constructor(world) {
          _defineProperty(this, "types", STEP_TYPES);
          _defineProperty(this, "list", () => {
            return joinAllSteps(this);
          });
          _defineProperty(this, "typeList", () => {
            return this.types.reduce((stepDefs, type) => {
              const internalType = `_${type}`;
              stepDefs[internalType] = [...this[internalType]];
              return stepDefs;
            }, {});
          });
          _defineProperty(this, "match", text => {
            const list = this.list();
            const found = matcher(list, text, this._world);
            if (!found.match || !found.definition) return false;
            found.match.push(this._world);
            return found;
          });
          _defineProperty(this, "resolve", text => {
            const found = this.match(text);
            return found ? found.definition.method(...found.match) : throwNoMatchingStep(`Matching definition could not be found for step: "${text}"`);
          });
          _defineProperty(this, "register", (...args) => {
            return isStr(args[0]) ? registerFromCall.apply(this, args) : registerFromParse.apply(this, args);
          });
          _defineProperty(this, "clear", () => {
            this.types.map(type => this[`_${type}`] = []);
          });
          this._world = world || {};
          const self = this;
          this.types.map(type => {
            const internalType = `_${type}`;
            this[internalType] = [];
            this[capitalize(type)] = (match, method, meta) => {
              return self.register(internalType, type, match, method, meta);
            };
          });
        }
      }

      const {
        HOOK_TYPES
      } = constants;
      class Hooks {
        constructor() {
          _defineProperty(this, "types", HOOK_TYPES);
          _defineProperty(this, "getRegistered", type => {
            return this.types.includes(type) ? this._registeredHooks[type] || noOp : throwInvalidHookType(HOOK_TYPES.join(', '), type);
          });
          this._registeredHooks = {};
          this.types.map(type => {
            this[type] = clientHookFn => {
              if (!isFunc(clientHookFn)) return;
              this._registeredHooks[type] = clientHookFn;
            };
          });
        }
      }

      const RX_GIVEN = /^\s*Given (.*)$/;
      const RX_WHEN = /^\s*When(.*)$/;
      const RX_THEN = /^\s*Then (.*)$/;
      const RX_AND = /^\s*And (.*)$/;
      const RX_BUT = /^\s*But (.*)$/;
      const RX_ASTERISK = /^\s*\* (.*)$/;
      const RX_DOC_QUOTES = /^\s*?"""\s*?/;
      const RX_DOC_TICKS = /^\s*?```\s*?/;
      const RX_DATA_TABLE = /^\s*?\|/;
      const RegStepTags = [{
        regex: RX_GIVEN,
        type: 'given'
      }, {
        regex: RX_WHEN,
        type: 'when'
      }, {
        regex: RX_THEN,
        type: 'then'
      }, {
        regex: RX_AND,
        type: 'and'
      }, {
        regex: RX_BUT,
        type: 'but'
      }, {
        regex: RX_ASTERISK,
        type: 'and'
      }];
      const checkDataTable = (step, lines, line, index) => {
        if (!RX_DATA_TABLE.test(line)) return step;
        let tableEnd;
        step.table = {
          index,
          content: lines.reduce((table, ln) => {
            tableEnd = tableEnd || !RX_DATA_TABLE.test(ln);
            !tableEnd && table.push(ln.split('|').reduce((row, item) => {
              const column = item.trim();
              column && row.push(column);
              return row;
            }, []));
            return table;
          }, [])
        };
        return step;
      };
      const checkDocString = (step, lines, line, index) => {
        let docMatch = RX_DOC_QUOTES.test(line) && '"""';
        docMatch = docMatch || RX_DOC_TICKS.test(line) && '```';
        if (!docMatch) return step;
        const whiteSpace = line.split(docMatch)[0];
        const spacer = new Array(whiteSpace.length).fill('\\s').join('');
        const spacerRegex = new RegExp(`^${spacer}`);
        step.doc = {
          index,
          whiteSpace,
          type: docMatch === `"""` ? 'quote' : 'tick',
          content: lines.split(docMatch).slice(1).shift().trim().split('\n').reduce((cleaned, ln) => {
            cleaned.push(ln.replace(spacerRegex, '').trim());
            return cleaned;
          }, []).join('\n')
        };
        return step;
      };
      const stepFactory = (type, stepText, lines, index) => {
        let step = {
          type,
          index,
          step: stepText,
          uuid: sanitizeForId(`${type}-${stepText}`)
        };
        const nextIndex = index + 1;
        const nextLine = lines[nextIndex];
        const afterLines = lines.slice(nextIndex);
        step = checkDataTable(step, afterLines, nextLine, nextIndex);
        step = checkDocString(step, afterLines.join('\n'), nextLine, nextIndex);
        return step;
      };
      const parseStep = (scenario, lines, line, index) => {
        return RegStepTags.reduce((added, regTag) => {
          if (added) return added;
          const hasTag = regTag.regex.test(line);
          hasTag && scenario.steps.push(stepFactory(regTag.type, getRXMatch(line, regTag.regex, 1), lines, index));
          return hasTag;
        }, false);
      };

      const {
        WORLD_AT_RUNTIME
      } = constants;
      const worldReplace = (text, world) => {
        let currentMatch;
        try {
          return text.replace(RX_WORLD_REPLACE, match => {
            currentMatch = match;
            const cleaned = match.trim();
            if (cleaned.indexOf(WORLD_AT_RUNTIME) === 0) return cleaned.replace(WORLD_AT_RUNTIME, `$`);
            const location = cleaned.replace(/^\$world\./, '');
            const replaceWith = get(world, location);
            return isFunc(replaceWith) ? replaceWith(world, path) : exists(replaceWith) ? replaceWith : match;
          });
        } catch (err) {
          throwWorldReplace(err, currentMatch);
        }
      };

      const RX_NEWLINE = /\r?\n/g;
      const RX_TAG = /^\s*@(.*)$/;
      const RX_COMMENT = /^\s*#(.*)$/;
      const RX_FEATURE = /^\s*Feature:(.*)$/;
      const RX_RULE = /^\s*Rule:(.*)$/;
      const RX_AS = /^\s*As (.*)$/;
      const RX_I_WANT = /^\s*I want (.*)$/;
      const RX_SO_THAT = /^\s*So that (.*)$/;
      const RX_IN_ORDER = /^\s*In order (.*)$/;
      const RX_SCENARIO = /^\s*Scenario:(.*)$/;
      const RX_EXAMPLE = /^\s*Example:(.*)$/;
      const RX_BACKGROUND = /^\s*Background:(.*)$/;
      const featureMetaTags = [{
        regex: RX_AS,
        key: 'perspective'
      }, {
        regex: RX_I_WANT,
        key: 'desire'
      }, {
        regex: RX_SO_THAT,
        key: 'reason'
      }, {
        regex: RX_IN_ORDER,
        key: 'reason'
      }];
      const featureFactory = (feature, content, index) => {
        return {
          index,
          content,
          feature,
          tags: [],
          rules: [],
          reason: [],
          comments: [],
          scenarios: [],
          ...(feature && {
            uuid: sanitizeForId(feature, index)
          })
        };
      };
      const ruleFactory = (rule, index) => {
        return {
          index,
          rule,
          tags: [],
          scenarios: [],
          ...(rule && {
            uuid: sanitizeForId(rule, index)
          })
        };
      };
      const scenarioFactory = (scenario, index) => {
        return {
          index,
          scenario,
          tags: [],
          steps: [],
          ...(scenario && {
            uuid: sanitizeForId(scenario, index)
          })
        };
      };
      const backgroundFactory = (background, index) => {
        return {
          index,
          steps: [],
          background,
          ...(background && {
            uuid: sanitizeForId(background, index)
          })
        };
      };
      const addReason = (feature, reason, index) => {
        reason && feature.reason.push({
          content: reason,
          index
        });
      };
      const featureMeta = (feature, line, index) => {
        let metaAdded = false;
        featureMetaTags.reduce((added, regTag) => {
          if (added) return added;
          const hasTag = regTag.regex.test(line);
          if (!metaAdded && hasTag) metaAdded = true;
          return hasTag ? regTag.key === 'reason' ? addReason(feature, getRXMatch(line, regTag.regex, 0), index) : feature[regTag.key] = {
            content: getRXMatch(line, regTag.regex, 0),
            index
          } : hasTag;
        }, false);
        return metaAdded;
      };
      const checkTag = (parent, feature, line, index) => {
        if (!RX_TAG.test(line)) return false;
        const tagParent = parent.background ? feature : parent;
        const tags = getRXMatch(line, RX_TAG, 0);
        tagParent.tags = (tagParent.tags || []).concat(tags.split(' '));
        return true;
      };
      const featureComment = (feature, line, index) => {
        if (!RX_COMMENT.test(line)) return false;
        const comment = line.match(RX_COMMENT)[0];
        feature.comments.push({
          content: comment,
          index
        });
        return true;
      };
      const ensureFeature = (featuresGroup, feature, line, content, index) => {
        if (!RX_FEATURE.test(line)) return feature;
        const featureText = getRXMatch(line, RX_FEATURE, 1);
        if (!feature.feature) {
          feature.feature = featureText;
          if (!feature.index) feature.index = index;
          if (!feature.uuid) feature.uuid = sanitizeForId(feature.feature, index);
          !featuresGroup.includes(feature) && featuresGroup.push(feature);
          return feature;
        }
        const builtFeature = featureFactory(featureText, content, index);
        featuresGroup.push(builtFeature);
        return builtFeature;
      };
      const ensureRule = (feature, rule, line, index) => {
        if (!RX_RULE.test(line)) return rule;
        let ruleText = getRXMatch(line, RX_RULE, 1);
        !rule.rule ? rule.rule = ruleText : rule = ruleFactory(ruleText, index);
        !rule.index && (rule.index = index);
        !rule.uuid && (rule.uuid = sanitizeForId(rule.rule, index));
        !feature.rules.includes(rule) && feature.rules.push(rule);
        return rule;
      };
      const ensureScenario = (feature, rule, scenario, line, index) => {
        const hasScenario = RX_SCENARIO.test(line);
        if (!hasScenario && !RX_EXAMPLE.test(line)) return scenario;
        let scenarioText = hasScenario && getRXMatch(line, RX_SCENARIO, 1);
        scenarioText = scenarioText || getRXMatch(line, RX_EXAMPLE, 1);
        !scenario.scenario ? scenario.scenario = scenarioText : scenario = scenarioFactory(scenarioText, index);
        !scenario.index && (scenario.index = index);
        !scenario.uuid && (scenario.uuid = sanitizeForId(scenario.scenario, index));
        const parent = rule.uuid ? rule : feature;
        !parent.scenarios.includes(scenario) && parent.scenarios.push(scenario);
        return scenario;
      };
      const ensureBackground = (feature, rule, background, line, index) => {
        if (!RX_BACKGROUND.test(line)) return background;
        const parent = rule.uuid ? rule : feature;
        const backgroundText = `${parent.uuid}-background`;
        !background.background ? background.background = backgroundText || '' : background = backgroundFactory(backgroundText, index);
        !background.index && (background.index = index);
        !background.uuid && (background.uuid = sanitizeForId(background.background, index));
        parent.background = background;
        return background;
      };
      const setActiveParent = (activeParent, feature, rule, scenario, background, line) => {
        return RX_SCENARIO.test(line) || RX_EXAMPLE.test(line) ? scenario : RX_FEATURE.test(line) ? feature : RX_RULE.test(line) ? rule : RX_BACKGROUND.test(line) ? background : activeParent;
      };
      const parseFeature = function (text, world) {
        world = world || this && this.world || noOpObj;
        const features = [];
        const replaceText = worldReplace((text || '').toString(), world);
        const lines = replaceText.split(RX_NEWLINE);
        let rule = ruleFactory(false);
        let scenario = scenarioFactory(false);
        let background = backgroundFactory(false);
        let feature = featureFactory(false, text);
        let activeParent = feature;
        return lines.reduce((featuresGroup, line, index) => {
          feature = ensureFeature(featuresGroup, feature, line, text, index);
          if (featureComment(feature, line, index) || featureMeta(feature, line, index)) return featuresGroup;
          rule = ensureRule(feature, rule, line, index);
          scenario = ensureScenario(feature, rule, scenario, line, index);
          background = ensureBackground(feature, rule, background, line, index);
          if (parseStep(activeParent, lines, line, index)) return featuresGroup;
          activeParent = setActiveParent(activeParent, feature, rule, scenario, background, line);
          checkTag(activeParent, feature, line);
          return featuresGroup;
        }, features);
      };

      const parseDefinition = function (text) {
        const registered = this.steps.register([text]);
        return registered;
      };

      const {
        SPEC_RESULT_LOG,
        LOG_JEST_SPEC_ENV
      } = constants;
      const logResultToTerminal = result => {
        const timestamp = new Date().getTime();
        get(process, `env.${LOG_JEST_SPEC_ENV}`) && process.stdout.write([SPEC_RESULT_LOG, JSON.stringify({ ...result,
          timestamp
        }), SPEC_RESULT_LOG].join(``));
      };
      const getSuiteData = suite => {
        const description = get(suite, `description`);
        const type = !description ? `Feature` : description.startsWith(`Scenario >`) ? `Scenario` : description.startsWith(`Background >`) ? `Background` : description.startsWith(`Rule >`) ? `Rule` : `Feature`;
        return {
          type: type.toLowerCase(),
          ...(type !== `Feature` && {
            description: description.replace(`${type} >`, `${type}:`)
          })
        };
      };
      const getTestMethod = (type, testMode) => {
        return testMode ? noOp : global[type] || testMethodFill(type);
      };
      const buildReporter = jasmineEnv => {
        const suites = [];
        const jasmineDescribe = jasmineEnv.describe;
        jasmineEnv.describe = (...args) => {
          const suite = jasmineDescribe.apply(null, args);
          suites.push(suite);
          return suite;
        };
        return {
          suiteStarted: suite => {
            logResultToTerminal({ ...suite,
              ...getSuiteData(suite),
              action: `start`
            });
          },
          specStarted: result => {
            logResultToTerminal({ ...result,
              type: `step`,
              action: `start`
            });
          },
          specDone: result => {
            logResultToTerminal({ ...result,
              type: 'step',
              action: 'end'
            });
            if (result.status !== 'failed') return;
            const suite = suites.find(suite => suite.children.find(spec => spec.result === result));
            suite && suite.children.map(spec => spec.disable());
          },
          suiteDone: suite => {
            logResultToTerminal({ ...suite,
              ...getSuiteData(suite),
              action: `end`
            });
          }
        };
      };
      const skipTestsOnFail = testMode => {
        if (!hasJasmine) return;
        const jasmineEnv = resolveJasmine().getEnv();
        jasmineEnv && jasmineEnv.describe && jasmineEnv.addReporter(buildReporter(jasmineEnv));
      };

      const buildTitle = (text, type) => {
        return `${capitalize(type)} > ${text}`;
      };
      const resolveFeatures = (data, $world) => {
        return isStr(data) ? parseFeature(data, $world) : isObj(data) ? [data] : isArr(data) ? data.reduce((features, feature) => features.concat(resolveFeatures(feature, $world)), []) : throwMissingFeatureText();
      };
      const runStep = async (stepsInstance, step, testMode) => {
        const test = getTestMethod('test', testMode);
        test(`${capitalize(step.type)} ${step.step}`, async () => {
          return await stepsInstance.resolve(step.step);
        });
      };
      const loopSteps = (parent, title, stepsInstance, testMode) => {
        const describe = getTestMethod('describe', testMode);
        let responses = [];
        describe(title, () => {
          const responses = parent.steps.map(step => runStep(stepsInstance, step, testMode));
          Promise.all(responses);
        });
        return responses;
      };
      const runScenario = (stepsInstance, scenario, background, testMode) => {
        background && loopSteps(background, buildTitle(scenario.scenario, `Background`), stepsInstance, testMode);
        return loopSteps(scenario, buildTitle(scenario.scenario, `Scenario`), stepsInstance, testMode);
      };
      const runRule = (stepsInstance, rule, background, testMode) => {
        let responses = [];
        describe(`Rule > ${rule.rule}`, () => {
          responses = rule.scenarios.map(scenario => runScenario(stepsInstance, scenario, background || rule.background, testMode));
          Promise.all(responses);
        });
        return responses;
      };
      const parseFeatureTags = tags => {
        return isStr(tags) && tags.match(/[@]\w*/g);
      };
      const itemMatch = (name = '', tags = [], filterOptions = {}) => {
        const {
          name: filterName,
          tags: filterTags
        } = filterOptions;
        const parsedTags = isStr(filterTags) ? parseFeatureTags(filterTags) : eitherArr(filterTags, []);
        const nameMatch = !filterName || name.includes(filterName);
        const tagMatch = !parsedTags.length || parsedTags.every(clientTag => tags.includes(clientTag));
        return nameMatch && tagMatch;
      };
      const filterFeatures = (features, filterOptions = {}) => {
        return features.reduce((filtered, feature) => {
          const isMatchingFeature = itemMatch(feature.feature, feature.tags, filterOptions);
          if (isMatchingFeature) {
            filtered.push(feature);
            return filtered;
          }
          const matchingScenarios = feature.scenarios.filter(scenario => itemMatch(scenario.scenario, [...(scenario.tags || []), ...(feature.tags || [])], filterOptions));
          if (matchingScenarios.length) {
            filtered.push({ ...feature,
              scenarios: matchingScenarios
            });
          }
          return filtered;
        }, []);
      };
      class Runner {
        constructor(steps, hooks, world) {
          _defineProperty(this, "getFeatures", (data, options) => {
            const features = resolveFeatures(data, this._world);
            return filterFeatures(features, options);
          });
          _defineProperty(this, "run", async (data, options = noOpObj) => {
            const testMode = this.run.PARKIN_TEST_MODE;
            skipTestsOnFail();
            const describe = getTestMethod('describe', testMode);
            const beforeAll = getTestMethod('beforeAll', testMode);
            const afterAll = getTestMethod('afterAll', testMode);
            const beforeEach = getTestMethod('beforeEach', testMode);
            const afterEach = getTestMethod('afterEach', testMode);
            const features = this.getFeatures(data, options);
            if (!features.length) return false;
            const promises = await features.map(async feature => {
              let responses = [];
              beforeAll(this.hooks.getRegistered('beforeAll'));
              afterAll(this.hooks.getRegistered('afterAll'));
              beforeEach(this.hooks.getRegistered('beforeEach'));
              afterEach(this.hooks.getRegistered('afterEach'));
              describe(buildTitle(feature.feature, `Feature`), () => {
                responses = feature.rules.map(rule => runRule(this.steps, rule, feature.background, testMode));
                responses.concat(feature.scenarios.map(scenario => runScenario(this.steps, scenario, feature.background, testMode)));
                Promise.all(responses);
              });
              return responses;
            });
            await Promise.all(promises);
            return true;
          });
          !steps && throwMissingSteps();
          !hooks && throwMissingHooks();
          this.steps = steps;
          this.hooks = hooks;
          this._world = world;
        }
      }

      const {
        FEATURE_META
      } = constants;
      const addContent = (assembled, content, index) => {
        !exists(index) ? assembled.push(content) : exists(assembled[index]) ? assembled.splice(index, 0, content) : assembled[index] = content;
      };
      const addTags = (assembled, tags, spacer = '') => {
        isArr(tags) && tags.length && addContent(assembled, `${spacer}${tags.join(' ')}`);
      };
      const addMeta = (assembled, feature) => {
        FEATURE_META.map(key => {
          switch (key) {
            case 'feature':
              addContent(assembled, `Feature: ${feature[key]}`, feature.index);
              break;
            case 'comments':
              isArr(feature[key]) && feature[key].map(item => addContent(assembled, item.content, item.index));
              break;
            case 'reason':
              isArr(feature[key]) && feature[key].map(item => addContent(assembled, `  ${item.content}`, item.index));
              break;
            case 'desire':
            case 'perspective':
              feature[key] && addContent(assembled, `  ${feature[key].content}`, feature[key].index);
              break;
          }
        });
      };
      const addSteps = (assembled, scenario) => {
        isArr(scenario.steps) && scenario.steps.length && scenario.steps.map(step => addContent(assembled, `    ${capitalize(step.type)} ${step.step}`, step.index));
      };
      const addScenarios = (assembled, feature) => {
        feature.scenarios && feature.scenarios.map(scenario => {
          addTags(assembled, scenario.tags, `  `);
          addContent(assembled, `  Scenario: ${scenario.scenario}`, scenario.index);
          addSteps(assembled, scenario);
        });
      };
      const formatComment = (assembled, line, index) => {
        const next = assembled[index + 1];
        const prev = assembled[index - 1];
        let compareLine = exists(next) ? next : prev;
        if (!compareLine) return `${line}\n`;
        const comment = line.split('#').pop();
        const whiteSpace = Array(compareLine.length - compareLine.trimStart().length).join(' ');
        return `${whiteSpace} # ${comment}\n`;
      };
      const formatAssembled = assembled => {
        return Array.from(assembled, (line, index) => {
          return !exists(line) ? '\n' : line.startsWith('#') ? formatComment(assembled, line, index) : `${line}\n`;
        }).join('').trim();
      };
      const assembleFeature = toAssemble => {
        return eitherArr(toAssemble, [toAssemble]).map(feature => {
          let assembled = [];
          !isObj(feature) && throwFeatureNotAnObj(feature);
          addTags(assembled, feature.tags);
          addMeta(assembled, feature);
          addScenarios(assembled, feature);
          return formatAssembled(assembled);
        });
      };

      const assemble = {
        feature: assembleFeature
      };

      var _isInit = new WeakMap();
      class Parkin {
        constructor(_world, _steps) {
          _classPrivateFieldInitSpec(this, _isInit, {
            writable: true,
            value: false
          });
          _defineProperty(this, "init", (world = noOpObj, steps) => {
            if (_classPrivateFieldGet(this, _isInit)) return console.warn(`This instance of parkin has already been initialized!`);
            _classPrivateFieldSet(this, _isInit, true);
            this.world = world;
            this.steps = new Steps(this.world);
            this.hooks = new Hooks(this.world);
            this.runner = new Runner(this.steps, this.hooks, this.world);
            this.run = this.runner.run;
            this.parse = {
              feature: parseFeature.bind(this),
              definition: parseDefinition.bind(this)
            };
            this.assemble = assemble;
            this.paramTypes = {
              register: registerParamType
            };
            isObj(steps) && this.registerSteps(steps);
            this.steps.types.map(type => {
              this[capitalize(type)] = (matcher, method, meta) => this.steps.register(`_${type}`, type, matcher, method, meta);
            });
          });
          _defineProperty(this, "registerSteps", steps => {
            Object.entries(steps).map((type, typedSteps) =>
            Object.entries(typedSteps).map((matcher, content) =>
            this.steps[capitalize(type)](matcher, ...eitherArr(content, [content]))));
          });
          isObj(_world) && this.init(_world, _steps);
        }
      } exports('Parkin', Parkin);
      const PKInstance = exports('PKInstance', new Parkin());

    })
  };
}));
