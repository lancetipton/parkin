'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = privateMap.get(receiver);

  if (!descriptor) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }

  return descriptor.value;
}

function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = privateMap.get(receiver);

  if (!descriptor) {
    throw new TypeError("attempted to set private field on non-instance");
  }

  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }

    descriptor.value = value;
  }

  return value;
}

const isArr = value => Array.isArray(value);

const isObj = obj => typeof obj === 'object' && !Array.isArray(obj) && obj !== null;

const isFunc = func => typeof func === 'function';

const deepFreeze = obj => {
  Object.freeze(obj);
  Object.getOwnPropertyNames(obj).map(prop => {
    obj.hasOwnProperty(prop) && obj[prop] !== null && (typeof obj[prop] === 'object' || isFunc(obj[prop])) && !Object.isFrozen(obj[prop]) && deepFreeze(obj[prop]);
  });
  return obj;
};

const noOp = () => {};
const noOpObj = Object.freeze({});
const noPropObj = deepFreeze({
  content: {}
});
const noPropArr = deepFreeze([]);

const exists = value => value === value && value !== undefined && value !== null;

const isStr = str => typeof str === 'string';

const equalsNaN = val => typeof val === 'number' && val != val;

const eitherArr = (a, b) => isArr(a) ? a : b;

const toStr = val => val === null || val === undefined ? '' : isStr(val) ? val : JSON.stringify(val);

const checkCall = (method, ...params) => {
  return isFunc(method) ? method(...params) : undefined;
};

const defObjProps = Array.from(['caller', 'callee', 'arguments', 'apply', 'bind', 'call', 'toString', '__proto__', '__defineGetter__', '__defineSetter__', 'hasOwnProperty', '__lookupGetter__', '__lookupSetter__', 'isPrototypeOf', 'propertyIsEnumerable', 'valueOf', 'toLocaleString']).concat(Object.getOwnPropertyNames(Object.prototype)).reduce((map, functionName) => {
  map[functionName] = true;
  return map;
}, {});

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

const typeModel = {
  name: '',
  regexp: '',
  type: 'string',
  useForSnippets: true,
  transformer: arg => arg,
  preferForRegexpMatch: false
};
const __paramTypes = {
  any: { ...typeModel,
    name: 'any',
    regex: RX_ANY
  },
  word: { ...typeModel,
    name: 'word',
    regex: RX_ANY,
    transformer: arg => !isQuoted(arg) ? toStr(arg) : undefined
  },
  float: { ...typeModel,
    name: 'float',
    type: 'number',
    regex: RX_FLOAT,
    transformer: arg => {
      const result = parseFloat(arg);
      return equalsNaN(result) ? undefined : result;
    }
  },
  int: { ...typeModel,
    name: 'int',
    type: 'number',
    regex: RX_INT,
    transformer: arg => {
      const result = parseInt(arg);
      return arg.includes('.') || equalsNaN(result) ? undefined : result;
    }
  },
  string: { ...typeModel,
    name: 'string',
    regex: joinRegex(RX_DOUBLE_QUOTED, RX_SINGLE_QUOTED),
    transformer: arg => {
      return isQuoted(arg) ? arg.trim().replace(/^("|')/, '').replace(/("|')$/, '') : undefined;
    }
  }
};
const getParamTypes = () => __paramTypes;
const registerParamType = (model = noOpObj, key = model.name) => {
  __paramTypes[key] ? throwParamTypeExists() : __paramTypes[key] = { ...typeModel,
    ...model
  };
};
const convertTypes = (matches, transformers) => {
  return matches.map((item, i) => {
    const paramType = transformers[i];
    if (!paramType) return item;
    const asType = checkCall(paramType.transformer, item);
    return typeof asType === paramType.type ? asType : null;
  }).filter(exists);
};

const matchRegex = (step, text) => {
  const match = text.match(new RegExp(step.match));
  return match ? {
    step,
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
const getRegexParts = stepMatcher => {
  const parameters = [...stepMatcher.matchAll(new RegExp(RX_PARAMETER, 'gi'))].map(match => parseMatch(match, 'parameter'));
  const optionals = [...stepMatcher.matchAll(new RegExp(RX_OPTIONAL, 'gi'))].map(match => parseMatch(match, 'optional'));
  const alts = [...stepMatcher.matchAll(new RegExp(RX_ALT, 'gi'))].map(match => parseMatch(match, 'alternate'));
  const sortedExpressions = [...parameters, ...optionals, ...alts].sort((matchA, matchB) => matchA.index - matchB.index);
  return sortedExpressions;
};

const constants = deepFreeze({
  REGEX_VARIANT: 'regex',
  EXPRESSION_VARIANT: 'expression',
  STEP_TYPES: ['given', 'when', 'then', 'and', 'but'],
  HOOK_TYPES: ['beforeAll', 'afterAll', 'beforeEach', 'afterEach'],
  FEATURE_META: ['feature', 'perspective', 'desire', 'reason', 'comments']
});

const inBrowser = Boolean(typeof window !== 'undefined');
const escapeStr = str => {
  return inBrowser ? str.replace(/[|\\[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d') : str;
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
  if (!str.startsWith('^')) {
    final = '^' + final;
  }
  if (!str.endsWith('$')) {
    final += '$';
  }
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
const matchExpression = (step, text) => {
  const escaped = escapeStr(step.match);
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
  const found = matchRegex({ ...step,
    match
  }, text);
  if (!found || !found.step || !found.match) return noOpObj;
  const params = extractParameters(text, step.match, found.match);
  if (!params) return noOpObj;
  const converted = convertTypes(params, transformers);
  return converted.length !== params.length ? noOpObj : {
    step,
    match: converted
  };
};

const {
  REGEX_VARIANT
} = constants;
const matcher = (stepDefs, text) => {
  return stepDefs.reduce((found, step) => {
    return found.match || !step.match ? found : step.variant !== REGEX_VARIANT ? matchExpression(step, text) : matchRegex(step, text);
  }, noOpObj);
};

const {
  REGEX_VARIANT: REGEX_VARIANT$1,
  EXPRESSION_VARIANT,
  STEP_TYPES
} = constants;
const sanitize = step => {
  let name = step.match.toString();
  if (name[0] === '^') name = name.substr(1);
  if (name.charAt(name.length - 1) === '$') name = name.slice(0, -1);
  return name.replace(/\(\?:([^\|]+)+\|+([^\)]+)?\)/, '$1');
};
const getContent = step => {
  const match = step.variant === REGEX_VARIANT$1 ? step.match.toString() : `"${step.match}"`;
  return `${capitalize(step.type)}(${match}, ${step.method.toString()})`;
};
const registerFromCall = function (internalType, type, match, method) {
  const step = {
    type,
    match,
    method,
    tokens: [],
    variant: match.toString().indexOf('/') === 0 ? REGEX_VARIANT$1 : EXPRESSION_VARIANT
  };
  step.name = sanitize(step);
  step.uuid = step.name;
  step.content = getContent(step);
  this[internalType].push(step);
  return step;
};
const registerFromParse = function (definitions) {
  return eitherArr(definitions, [definitions]).map(definition => {
    const step = Function(`return (Given, When, Then, And, But) => {
        return ${definition}
      }`)()(this.Given, this.When, this.Then, this.And, this.But);
    return { ...step,
      ...definition
    };
  });
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
    _defineProperty(this, "resolve", text => {
      const list = this.list();
      const {
        match,
        step
      } = matcher(list, text);
      if (!match || !step) return throwNoMatchingStep(text);
      match.push(this._world);
      return step.method(...match);
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
      this[capitalize(type)] = (match, method) => {
        return self.register(internalType, type, match, method);
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
      if (!this.types.includes(type)) throw new Error(`Expected client hook type to be one of ', ${HOOK_TYPES.join(', ')}.
         Found: ${type}`);
      return this._registeredHooks[type] || noOp;
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

const RX_NEWLINE = /\r?\n/g;
const RX_TAG = /^\s*@(.*)$/;
const RX_COMMENT = /^\s*#(.*)$/;
const RX_FEATURE = /^\s*Feature:(.*)$/;
const RX_AS = /^\s*As (.*)$/;
const RX_I_WANT = /^\s*I want (.*)$/;
const RX_SO_THAT = /^\s*So that (.*)$/;
const RX_IN_ORDER = /^\s*In order (.*)$/;
const RX_SCENARIO = /^\s*Scenario:(.*)$/;
const RX_EXAMPLE = /^\s*Example:(.*)$/;
const RX_BACKGROUND = /^\s*Background:(.*)$/;
const RX_GIVEN = /^\s*Given (.*)$/;
const RX_WHEN = /^\s*When(.*)$/;
const RX_THEN = /^\s*Then (.*)$/;
const RX_AND = /^\s*And (.*)$/;
const RX_BUT = /^\s*But (.*)$/;
const RX_ASTERISK = /^\s*\* (.*)$/;
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
  type: 'and',
  alt: 'when'
}, {
  regex: RX_BUT,
  type: 'but',
  alt: 'when'
}, {
  regex: RX_ASTERISK,
  type: 'and',
  alt: 'when'
}];
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
const sanitizeForId = text => {
  const cleaned = text.trim().toLowerCase().replace(/ /g, '-');
  return `${text.length}-${cleaned}`;
};
const getRXMatch = (line, regex, index) => line.match(regex)[index].trim();
const featureFactory = (feature, content, index) => {
  return {
    index,
    content,
    feature,
    tags: [],
    reason: [],
    comments: [],
    scenarios: [],
    ...(feature && {
      uuid: sanitizeForId(feature)
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
      uuid: sanitizeForId(scenario)
    })
  };
};
const backgroundFactory = (background, index) => {
  return {
    index,
    steps: [],
    background,
    ...(background && {
      uuid: sanitizeForId(background)
    })
  };
};
const stepFactory = (type, step, altType, index) => {
  const built = {
    step,
    type,
    uuid: sanitizeForId(`${type}-${step}`),
    index
  };
  altType && (built.altType = altType);
  return built;
};
const addReason = (feature, reason, index) => {
  reason && feature.reason.push({
    content: reason,
    index
  });
};
const checkStepTag = (scenario, line, index) => {
  return RegStepTags.reduce((added, regTag) => {
    if (added) return added;
    const hasTag = regTag.regex.test(line);
    hasTag && scenario.steps.push(stepFactory(regTag.type, getRXMatch(line, regTag.regex, 1), regTag.alt, index));
    return hasTag;
  }, false);
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
    if (!feature.uuid) feature.uuid = sanitizeForId(feature.feature);
    !featuresGroup.includes(feature) && featuresGroup.push(feature);
    return feature;
  }
  return featureFactory(featureText, content, index);
};
const ensureScenario = (feature, scenario, line, index) => {
  if (!RX_SCENARIO.test(line) && !RX_EXAMPLE.test(line)) return scenario;
  let scenarioText = getRXMatch(line, RX_SCENARIO, 1);
  scenarioText = scenarioText || getRXMatch(line, RX_EXAMPLE, 1);
  !scenario.scenario ? scenario.scenario = scenarioText : scenario = scenarioFactory(scenarioText, index);
  !scenario.index && (scenario.index = index);
  !scenario.uuid && (scenario.uuid = sanitizeForId(scenario.scenario));
  !feature.scenarios.includes(scenario) && feature.scenarios.push(scenario);
  return scenario;
};
const ensureBackground = (feature, background, line, index) => {
  if (!RX_BACKGROUND.test(line)) return background;
  const backgroundText = getRXMatch(line, RX_BACKGROUND, 1);
  !background.background ? background.background = backgroundText || '' : background = backgroundFactory(backgroundText, index);
  !background.index && (background.index = index);
  !background.uuid && (background.uuid = sanitizeForId(background.background));
  feature.background = background;
  return background;
};
const setActiveParent = (activeParent, feature, scenario, background, nextLine) => {
  return RX_SCENARIO.test(nextLine) || RX_EXAMPLE.test(nextLine) ? scenario : RX_FEATURE.test(nextLine) ? feature : RX_BACKGROUND.test(nextLine) ? background : activeParent;
};
const feature = text => {
  const features = [];
  const lines = (text || '').toString().split(RX_NEWLINE);
  let scenario = scenarioFactory(false);
  let background = backgroundFactory(false);
  let feature = featureFactory(false, text);
  let activeParent = feature;
  return lines.reduce((featuresGroup, line, index) => {
    feature = ensureFeature(featuresGroup, feature, line, text, index);
    if (featureComment(feature, line, index) || featureMeta(feature, line, index)) return featuresGroup;
    scenario = ensureScenario(feature, scenario, line, index);
    background = ensureBackground(feature, background, line, index);
    if (checkStepTag(activeParent, line, index)) return featuresGroup;
    const nextLine = lines[index + 1];
    activeParent = setActiveParent(activeParent, feature, scenario, background, nextLine);
    checkTag(activeParent, feature, line);
    return featuresGroup;
  }, features);
};

const definitionNoOp = () => {
  console.error(`Parking.parse.definition method not set!\n`, `A definition parse method must be passed as the third argument on Parkin init.`);
  return noPropArr;
};
const parse = {
  feature,
  definition: definitionNoOp
};

const inBrowser$1 = Boolean(typeof window !== 'undefined');
const HAS_JASMINE = Boolean(typeof global !== 'undefined' && typeof global.jasmine !== 'undefined');
const getTestMethod = (type, testMode) => {
  return testMode ? noOp : global[type] || testMethodFill(type);
};
const buildReporter = (jasmineEnv, testMode) => {
  const suites = [];
  const jasmineDescribe = jasmineEnv.describe;
  jasmineEnv.describe = (...args) => {
    const suite = jasmineDescribe.apply(null, args);
    suites.push(suite);
    return suite;
  };
  return {
    specDone: result => {
      if (result.status !== 'failed') return;
      const suite = suites.find(suite => suite.children.find(spec => spec.result === result));
      suite && suite.children.map(spec => spec.disable());
    }
  };
};
const skipTestsOnFail = testMode => {
  if (inBrowser$1 || !HAS_JASMINE) return;
  const jasmineEnv = global.jasmine.getEnv();
  jasmineEnv.addReporter(buildReporter(jasmineEnv));
};

const resolveFeatures = data => {
  return isStr(data) ? parse.feature(data) : isObj(data) ? [data] : isArr(data) ? data.reduce((features, feature) => features.concat(resolveFeatures(feature)), []) : throwMissingFeatureText();
};
const runStep = async (stepsInstance, step, testMode) => {
  const test = getTestMethod('test', testMode);
  test(`${capitalize(step.type)} ${step.step}`, async done => {
    await stepsInstance.resolve(step.step);
    done();
  });
};
const runScenario = (stepsInstance, scenario, testMode) => {
  const describe = getTestMethod('describe', testMode);
  let responses = [];
  describe(`Scenario: ${scenario.scenario}`, () => {
    responses = scenario.steps.map(async step => await runStep(stepsInstance, step, testMode));
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
  constructor(steps, hooks) {
    _defineProperty(this, "getFeatures", (data, options) => {
      const features = resolveFeatures(data);
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
        describe(`Feature: ${feature.feature}`, () => {
          responses = feature.scenarios.map(async scenario => await runScenario(this.steps, scenario, testMode));
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
  constructor(_world, _steps, _definition) {
    _isInit.set(this, {
      writable: true,
      value: false
    });
    _defineProperty(this, "init", (world = noOpObj, steps, definition) => {
      if (_classPrivateFieldGet(this, _isInit)) return console.warn(`This instance of parkin has already been initialized!`);
      _classPrivateFieldSet(this, _isInit, true);
      this.steps = new Steps(world);
      this.hooks = new Hooks();
      this.runner = new Runner(this.steps, this.hooks);
      this.run = this.runner.run;
      this.parse = parse;
      exists(definition) ? isFunc(definition) ? this.parse.definition = definition : console.error(`The third argument used to parse definitions, must be a function!`) : null;
      this.assemble = assemble;
      this.paramTypes = {
        register: registerParamType
      };
      isObj(steps) && this.registerSteps(steps);
      this.steps.types.map(type => {
        this[capitalize(type)] = (matcher, method) => this.steps.register(`_${type}`, type, matcher, method);
      });
    });
    _defineProperty(this, "registerSteps", steps => {
      Object.entries(steps).map((type, typedSteps) =>
      Object.entries(typedSteps).map((matcher, method) =>
      this.steps[capitalize(type)](matcher, method)));
    });
    isObj(_world) && this.init(_world, _steps, _definition);
  }
}
const PKInstance = new Parkin();

exports.PKInstance = PKInstance;
exports.Parkin = Parkin;
//# sourceMappingURL=index.js.map
