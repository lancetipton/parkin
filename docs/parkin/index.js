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

const noOp = () => {};
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
  STEP_TYPES: ['given', 'when', 'then', 'and', 'but'],
  FEATURE_META: ['feature', 'perspective', 'desire', 'reason', 'comments']
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
const featureFactory = (feature, content, index) => {
  return {
    index,
    content,
    feature,
    tags: [],
    reason: [],
    uuid: uuid(),
    comments: [],
    scenarios: []
  };
};
const scenarioFactory = (scenario, index) => {
  return {
    scenario,
    uuid: uuid(),
    steps: [],
    index
  };
};
const stepFactory = (type, step, altType, index) => {
  const built = {
    step,
    type,
    uuid: uuid(),
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
  return featureMetaTags.reduce((added, regTag) => {
    if (added) return added;
    const hasTag = regTag.regex.test(line);
    return hasTag ? regTag.key === 'reason' ? addReason(feature, getRXMatch(line, regTag.regex, 0), index) : feature[regTag.key] = {
      content: getRXMatch(line, regTag.regex, 0),
      index
    } : hasTag;
  }, false);
};
const featureTag = (feature, line, index) => {
  if (!RX_TAG.test(line)) return false;
  const tags = getRXMatch(line, RX_TAG, 0);
  feature.tags = feature.tags.concat(tags.split(' '));
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
  !feature.scenarios.includes(scenario) && feature.scenarios.push(scenario);
  return scenario;
};
const feature = text => {
  const features = [];
  const lines = (text || '').toString().split(RX_NEWLINE);
  let scenario = scenarioFactory(false);
  let feature = featureFactory(false, text);
  return lines.reduce((featuresGroup, line, index) => {
    feature = ensureFeature(featuresGroup, feature, line, text, index);
    scenario = ensureScenario(feature, scenario, line, index);
    featureTag(feature, line) || featureComment(feature, line, index) || featureMeta(feature, line, index) || checkStepTag(scenario, line, index);
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

const getTestMethod = (type, testMode) => {
  return testMode ? noOp : global[type] || testMethodFill(type);
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
const getTaggedItems = (items, tags) => {
  return items.filter(item => {
    if (!isArr(item.tags) || !item.tags.length) return false;
    const itemTags = item.tags.map(tag => tag.replace('@', ''));
    return tags.find(tag => itemTags.includes(tag.replace('@', '')));
  }, []);
};
const filterFromTags = (features, tags) => {
  return !tags || isArr(tags) && !tags.length ? features :
  getTaggedItems(features, tags).reduce((filtered, feature) => {
    const tagScenarios = getTaggedItems(feature.scenarios, tags);
    tagScenarios.length ? filtered.push({ ...features,
      scenarios: tagScenarios
    }) : filtered.push(feature);
    return filtered;
  }, []);
};
class Runner {
  constructor(steps) {
    _defineProperty(this, "run", async (data, options = noOpObj) => {
      const testMode = this.run.PARKIN_TEST_MODE;
      const describe = getTestMethod('describe', testMode);
      const features = filterFromTags(resolveFeatures(data), options.tags);
      const promises = await features.map(async feature => {
        let responses = [];
        describe(`Feature: ${feature.feature}`, () => {
          responses = feature.scenarios.map(async scenario => await runScenario(this.steps, scenario, testMode));
        });
        return responses;
      });
      await Promise.all(promises);
      return true;
    });
    !steps && throwMissingSteps();
    this.steps = steps;
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
    this.assemble = assemble;
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
