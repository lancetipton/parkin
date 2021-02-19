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

const isStr = str => typeof str === 'string';

const equalsNaN = val => typeof val === 'number' && val != val;
const isNum = val => typeof val === 'number' && !equalsNaN(val);

const noOpObj = Object.freeze({});
const noPropObj = deepFreeze({
  content: {}
});
const noPropArr = deepFreeze([]);

const exists = value => value === value && value !== undefined && value !== null;

const eitherArr = (a, b) => isArr(a) ? a : b;

const checkCall = (method, ...params) => isFunc(method) && method(...params) || undefined;
const uuid = a => a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);

const toStr = val => val === null || val === undefined ? '' : isStr(val) ? val : JSON.stringify(val);

const capitalize = (str, lowercaseTail = true) => {
  if (!isStr(str) || !str[0]) return str;
  const tail = lowercaseTail ? str.slice(1).toLowerCase() : str.slice(1);
  return `${str[0].toUpperCase()}${tail}`;
};

const getNums = val => toStr(val).replace(/([^.\d])/gm, '');

const toFloat = val => val && !equalsNaN(val) && parseFloat(isNum(val) && val || getNums(val)) || 0;
const toInt = val => val && !equalsNaN(val) && parseInt(isNum(val) && val || getNums(val)) || 0;

const defObjProps = Array.from(['caller', 'callee', 'arguments', 'apply', 'bind', 'call', 'toString', '__proto__', '__defineGetter__', '__defineSetter__', 'hasOwnProperty', '__lookupGetter__', '__lookupSetter__', 'isPrototypeOf', 'propertyIsEnumerable', 'valueOf', 'toLocaleString']).concat(Object.getOwnPropertyNames(Object.prototype)).reduce((map, functionName) => {
  map[functionName] = true;
  return map;
}, {});

const matchRegex = (step, text) => {
  const match = text.match(new RegExp(step.match));
  return match ? {
    step,
    match: match.slice(1, match.length)
  } : noOpObj;
};

const constants = deepFreeze({
  REGEX_VARIANT: 'regex',
  EXPRESSION_VARIANT: 'expression',
  STEP_TYPES: ['given', 'when', 'then', 'and', 'but']
});

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
    name: 'any'
  },
  word: { ...typeModel,
    name: 'word',
    transformer: arg => toStr(arg)
  },
  float: { ...typeModel,
    name: 'float',
    type: 'number',
    transformer: arg => toFloat(arg)
  },
  int: { ...typeModel,
    name: 'int',
    type: 'number',
    transformer: arg => !arg.includes('.') && toInt(arg)
  },
  string: { ...typeModel,
    name: 'string',
    transformer: arg => arg.trim().replace(/^("|')/, '').replace(/("|')$/, '')
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
    const asType = checkCall(paramType.transformer, item);
    return typeof asType === paramType.type ? asType : null;
  }).filter(item => exists(item) && item);
};

const RX_OPTIONAL = /\s*\S*\(s\)\s*/g;
const RX_ALT = /\s*\S*\/\S*\s*/g;
const RX_EXPRESSION = /\s*{(.*?)}\s*/g;
const RX_EXP_REPLACE = `(.*)`;
const RX_MATCH_REPLACE = /{|}/g;
const inBrowser = Boolean(typeof window !== 'undefined');
const escapeStr = str => {
  return inBrowser ? str.replace(/[|\\()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d') : str;
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
    transformers.push(paramTypes[type] || paramTypes.any);
    return RX_EXP_REPLACE;
  });
  return {
    regex,
    transformers
  };
};
const checkOptional = match => {
  const regex = runRegexCheck(match, RX_OPTIONAL, (val, ...args) => `${val.trim().replace('(s)', '')}s*`);
  return {
    regex
  };
};
const checkAlternative = match => {
  const altIndexes = [];
  const regex = runRegexCheck(match, RX_ALT,
  (val, ...args) => `(?:${val.trim().replace('/', '|')})`);
  return {
    regex,
    altIndexes
  };
};
const matchExpression = (step, text) => {
  const escaped = escapeStr(step.match);
  const {
    regex
  } = checkOptional(escaped);
  const {
    regex: regexAlts
  } = checkAlternative(regex);
  const {
    regex: match,
    transformers
  } = convertToRegex(regexAlts);
  const found = matchRegex({ ...step,
    match
  }, text);
  if (!found || !found.step || !found.match) return noOpObj;
  const converted = convertTypes(found.match, transformers);
  return converted.length !== found.match.length ? noOpObj : {
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
    variant: match.toString().indexOf('/') === 0 ? REGEX_VARIANT$1 : EXPRESSION_VARIANT
  };
  step.name = sanitize(step);
  step.content = getContent(step);
  this[internalType].push(step);
  return step;
};
const registerFromParse = function (definitions) {
  return eitherArr(definitions, [definitions]).map(definition => {
    const step = Function(`return (Given, When, Then, And, But) => {
        return ${definition.content}
      }`)()(this.Given, this.When, this.Then, this.And, this.But);
    return { ...step,
      ...definition
    };
  });
};
class Steps {
  constructor(world) {
    _defineProperty(this, "types", STEP_TYPES);
    _defineProperty(this, "resolve", text => {
      const list = this.types.reduce((stepDefs, type) => stepDefs.concat(this[`_${type}`]), []);
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
const getRXMatch = (line, regex, index) => line.match(regex)[index].trim();
const featureFactory = (feature, text) => {
  return {
    feature,
    uuid: uuid(),
    tags: [],
    comments: {},
    scenarios: [],
    text
  };
};
const scenarioFactory = scenario => {
  return {
    scenario,
    uuid: uuid(),
    steps: []
  };
};
const stepFactory = (type, step, altType) => {
  const built = {
    step,
    type,
    uuid: uuid()
  };
  altType && (built.altType = altType);
  return built;
};
const addReason = (feature, reason) => {
  reason ? !feature.reason ? feature.reason = reason : feature.reason += `\n${reason}` : null;
};
const checkStepTag = (scenario, line) => {
  return RegStepTags.reduce((added, regTag) => {
    if (added) return added;
    const hasTag = regTag.regex.test(line);
    hasTag && scenario.steps.push(stepFactory(regTag.type, getRXMatch(line, regTag.regex, 1), regTag.alt));
    return hasTag;
  }, false);
};
const featureMeta = (feature, line) => {
  return featureMetaTags.reduce((added, regTag) => {
    if (added) return added;
    const hasTag = regTag.regex.test(line);
    return hasTag ? regTag.key === 'reason' ? addReason(feature, getRXMatch(line, regTag.regex, 0)) : feature[regTag.key] = getRXMatch(line, regTag.regex, 0) : hasTag;
  }, false);
};
const featureTag = (feature, line) => {
  if (!RX_TAG.test(line)) return false;
  const tags = getRXMatch(line, RX_TAG, 0);
  feature.tags = feature.tags.concat(tags.split(' '));
  return true;
};
const featureComment = (feature, line, index) => {
  if (!RX_COMMENT.test(line)) return false;
  const comment = getRXMatch(line, RX_COMMENT, 1);
  feature.comments[index] = comment;
  return true;
};
const ensureFeature = (featuresGroup, feature, line, text) => {
  if (!RX_FEATURE.test(line)) return feature;
  const featureText = getRXMatch(line, RX_FEATURE, 1);
  if (!feature.feature) {
    feature.feature = featureText;
    !featuresGroup.includes(feature) && featuresGroup.push(feature);
    return feature;
  }
  return featureFactory(featureText, text);
};
const ensureScenario = (feature, scenario, line) => {
  if (!RX_SCENARIO.test(line) && !RX_EXAMPLE.test(line)) return scenario;
  let scenarioText = getRXMatch(line, RX_SCENARIO, 1);
  scenarioText = scenarioText || getRXMatch(line, RX_EXAMPLE, 1);
  !scenario.scenario ? scenario.scenario = scenarioText : scenario = scenarioFactory(scenarioText);
  !feature.scenarios.includes(scenario) && feature.scenarios.push(scenario);
  return scenario;
};
const feature = text => {
  const features = [];
  const lines = (text || '').toString().split(RX_NEWLINE);
  let scenario = scenarioFactory(false);
  let feature = featureFactory(false, text);
  return lines.reduce((featuresGroup, line, index) => {
    feature = ensureFeature(featuresGroup, feature, line, text);
    scenario = ensureScenario(feature, scenario, line);
    featureTag(feature, line) || featureComment(feature, line, index) || featureMeta(feature, line) || checkStepTag(scenario, line);
    return featuresGroup;
  }, features);
};

const {
  REGEX_VARIANT: REGEX_VARIANT$2,
  EXPRESSION_VARIANT: EXPRESSION_VARIANT$1
} = constants;
const NEWLINES_MATCH = /\n|\r|\r\n/;
const COMMENT_MATCH = /\/\/.*/g;
const MULTI_LINE_MATCH = /\/\*(.*\n)*\*\//;
const FIND_DEFINITION = new RegExp(/(Given|When|Then)\(('|"|`|\/)(.*)('|"|`|\/),/, 'gm');
const NEXT_DEFINITION = new RegExp(/(Given|When|Then|And|But)\(/, 'g');
const getContent$1 = definition => {
  const content = definition.input.split(definition[0]).pop();
  const found = NEXT_DEFINITION.exec(content);
  const parsedContent = !found ? `${definition[0].trim()} ${content.trim()}` : `${definition[0].trim()}${content.split(found[0].trim()).shift()}`;
  return parsedContent.split(`\n`).filter(line => line).join(`\n`);
};
const stripComments = text => {
  return text.trim().split(NEWLINES_MATCH).filter(line => !COMMENT_MATCH.test(line.trim())).join(`\n`).replace(MULTI_LINE_MATCH, '');
};
const definition = text => {
  return Array.from(
  stripComments(text).matchAll(FIND_DEFINITION),
  definition => {
    const [_, type, identifier, match] = definition;
    const variant = identifier === `/` ? REGEX_VARIANT$2 : EXPRESSION_VARIANT$1;
    return {
      match,
      variant,
      type: type.toLowerCase(),
      content: getContent$1(definition)
    };
  });
};

const parse = {
  feature,
  definition
};

const getTestMethod = type => global[type] || testMethodFill(type);
const runStep = (stepsInstance, step) => {
  const test = getTestMethod('test');
  return test(`${capitalize(step.type)} ${step.step}`, stepsInstance.resolve(step.step));
};
const runScenario = (stepsInstance, scenario) => {
  const describe = getTestMethod('describe');
  return describe(`Scenario: ${scenario.scenario}`, () => {
    scenario.steps.map(step => runStep(stepsInstance, step));
  });
};
const resolveFeatures = data => {
  return isStr(data) ? parse.feature(data) : isObj(data) ? [data] : isArr(data) ? data.reduce((features, feature) => features.concat(resolveFeatures(feature)), []) : throwMissingFeatureText();
};
class Runner {
  constructor(steps) {
    _defineProperty(this, "run", data => {
      const features = resolveFeatures(data);
      console.log(`---------- features ----------`);
      console.log(features);
      const describe = getTestMethod('describe');
      features.map(feature => {
        describe(`Feature: ${feature.feature}`, () => {
          feature.scenarios.map(scenario => runScenario(this.steps, scenario));
        });
      });
    });
    !steps && throwMissingSteps();
    this.steps = steps;
  }
}

class Parkin {
  constructor(world, _steps) {
    _defineProperty(this, "registerSteps", steps => {
      Object.entries(steps).map((type, typedSteps) =>
      Object.entries(typedSteps).map((matcher, method) =>
      this.steps[capitalize(type)](matcher, method)));
    });
    this.steps = new Steps(world);
    this.runner = new Runner(this.steps);
    this.run = this.runner.run;
    this.parse = parse;
    this.paramTypes = {
      register: registerParamType
    };
    isObj(_steps) && this.registerSteps(_steps);
    this.steps.types.map(type => {
      this[capitalize(type)] = (matcher, method) => this.steps.register(`_${type}`, type, matcher, method);
    });
  }
}

exports.Parkin = Parkin;
//# sourceMappingURL=index.js.map
