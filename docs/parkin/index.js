"use strict";function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function _classPrivateFieldGet(e,t){var r=t.get(e);if(!r)throw new TypeError("attempted to get private field on non-instance");return r.get?r.get.call(e):r.value}function _classPrivateFieldSet(e,t,r){var n=t.get(e);if(!n)throw new TypeError("attempted to set private field on non-instance");if(n.set)n.set.call(e,r);else{if(!n.writable)throw new TypeError("attempted to set read only private field");n.value=r}return r}Object.defineProperty(exports,"__esModule",{value:!0});const isArr=e=>Array.isArray(e),isObj=e=>"object"==typeof e&&!Array.isArray(e)&&null!==e,isFunc=e=>"function"==typeof e,deepFreeze=e=>(Object.freeze(e),Object.getOwnPropertyNames(e).map((t=>{e.hasOwnProperty(t)&&null!==e[t]&&("object"==typeof e[t]||isFunc(e[t]))&&!Object.isFrozen(e[t])&&deepFreeze(e[t])})),e),noOp=()=>{},noOpObj=Object.freeze({}),noPropObj=deepFreeze({content:{}}),noPropArr=deepFreeze([]),exists=e=>e==e&&null!=e,isStr=e=>"string"==typeof e,equalsNaN=e=>"number"==typeof e&&e!=e,eitherArr=(e,t)=>isArr(e)?e:t,toStr=e=>null==e?"":isStr(e)?e:JSON.stringify(e),checkCall=(e,...t)=>isFunc(e)?e(...t):void 0,defObjProps=Array.from(["caller","callee","arguments","apply","bind","call","toString","__proto__","__defineGetter__","__defineSetter__","hasOwnProperty","__lookupGetter__","__lookupSetter__","isPrototypeOf","propertyIsEnumerable","valueOf","toLocaleString"]).concat(Object.getOwnPropertyNames(Object.prototype)).reduce(((e,t)=>(e[t]=!0,e)),{}),isRegex=e=>Boolean(e&&e instanceof RegExp),getRegexSource=e=>{return t=e,Boolean(t&&t instanceof RegExp)?e.source:isStr(e)?e:null;var s},parseArgs=e=>{if(isArr(e[0]))return[e[0],e[1]];const t=e[e.length-1],r=isStr(t)?t:void 0;return[r?e.splice(0,e.length-1):e,r]},joinRegex=(...e)=>{const[t,r]=parseArgs(e),n=t.reduce(((e,t)=>{const r=(s=n=t,Boolean(s&&s instanceof RegExp)?n.source:isStr(n)?n:null);var n,s;return r?""===e?r:`${e}|${r}`:e}),"");return new RegExp(`(${n})`,r)},capitalize=(e,t=!0)=>{if(!isStr(e)||!e[0])return e;const r=t?e.slice(1).toLowerCase():e.slice(1);return`${e[0].toUpperCase()}${r}`},quoteSymbols=['"',"'"],isQuoted=(e,t=quoteSymbols)=>isStr(e)&&t.some((t=>e.startsWith(t)&&e.endsWith(t))),reverseStr=e=>{if(!isStr(e))return;let t="";for(let r of e)t=r+t;return t},getNearestDelimiterIndex=(e,t,r)=>r.map((r=>e.indexOf(r,t))).sort().find((e=>e>=0)),getWordStartingAt=(e,t,r=[" "])=>{const n=getNearestDelimiterIndex(e,t,r);return e.substring(t,-1===n?e.length:n)},getWordEndingAt=(e,t,r=[" "])=>{const n=reverseStr(e),s=e.length-t;return reverseStr(getWordStartingAt(n,s,r))},RX_OPTIONAL=/\w*\([^)]*?\)/,RX_ALT=/\s*\S*\/\S*\s*/,RX_PARAMETER=/\s*{(.*?)}\s*/,RX_EXPRESSION=joinRegex(RX_PARAMETER,RX_OPTIONAL,"g"),RX_ANY=/(.*)/,RX_MATCH_REPLACE=/{|}/g,RX_DOUBLE_QUOTED=/"[^"]+"/,RX_SINGLE_QUOTED=/'[^']+'/,RX_FLOAT=/-?[0-9]+[.][0-9]+/,RX_INT=/-?[0-9]+/,testMethodFill=e=>()=>{throw new Error(`Test method ${e} does not exist on the global scope.\nPlease ensure ${e} exists before calling the run method!\n`)},throwMissingSteps=()=>{throw new Error("Runner class constructor requires an instance of the Steps class")},throwMissingFeatureText=()=>{throw new Error("Runner class requires feature text when calling the run method")},throwNoMatchingStep=e=>{throw new ReferenceError(e)},throwParamTypeExists=()=>{throw new Error(`Cannot register param type "${name}". It already exists!`)},throwFeatureNotAnObj=e=>{throw new Error("Assemble feature requires an object matching the feature model spec!",e)},typeModel={name:"",regexp:"",type:"string",useForSnippets:!0,transformer:e=>e,preferForRegexpMatch:!1},__paramTypes={any:{...typeModel,name:"any",regex:RX_ANY},word:{...typeModel,name:"word",regex:RX_ANY,transformer:e=>{return isQuoted(e)?void 0:null==(t=e)?"":isStr(t)?t:JSON.stringify(t);var t}},float:{...typeModel,name:"float",type:"number",regex:RX_FLOAT,transformer:e=>{const t=parseFloat(e);return equalsNaN(t)?void 0:t}},int:{...typeModel,name:"int",type:"number",regex:RX_INT,transformer:e=>{const t=parseInt(e);return e.includes(".")||equalsNaN(t)?void 0:t}},string:{...typeModel,name:"string",regex:joinRegex(RX_DOUBLE_QUOTED,RX_SINGLE_QUOTED),transformer:e=>isQuoted(e)?e.trim().replace(/^("|')/,"").replace(/("|')$/,""):void 0}},getParamTypes=()=>__paramTypes,registerParamType=(e=noOpObj,t=e.name)=>{__paramTypes[t]?throwParamTypeExists():__paramTypes[t]={...typeModel,...e}},convertTypes=(e,t)=>e.map(((e,r)=>{const n=t[r];if(!n)return e;const s=checkCall(n.transformer,e);return typeof s===n.type?s:null})).filter(exists),matchRegex=(e,t)=>{const r=t.match(new RegExp(e.match));return r?{definition:e,match:r.slice(1,r.length).filter(Boolean)}:noOpObj},toAlternateRegex=e=>{const t=e.split(/(\(|\))/),[r,,n,,s]=t;return""===r&&""===s?e+"?":""===r?`(${n}|${n}${s})`:""===s?`(${r}|${r}${n})`:`(${r}${s}|${r}${n}${s})`},getFullOptionalText=e=>{const t=e.input;return getWordEndingAt(t,e.index)+e[0]},getOptionalRegex=e=>{const t=getFullOptionalText(e);return toAlternateRegex(t)},getParamRegex=e=>{const t=getParamTypes();return(t[e]||t.any).regex.source},getAlternateRegex=e=>`(${e.trim().replace(/\//g,"|")})`,getMatchRegex=(e,t)=>{const[r,n]=t;switch(e){case"parameter":return new RegExp(getParamRegex(n));case"optional":return new RegExp(getOptionalRegex(t));case"alternate":return new RegExp(getAlternateRegex(r));default:return null}},parseMatch=(e,t="other")=>{const r=e[0];return{text:r.trim(),index:e.index,input:e.input,regex:getMatchRegex(t,e),type:t,..."parameter"===t&&{paramType:r.trim().replace(RX_MATCH_REPLACE,"")}}},getRegexParts=e=>[...[...e.matchAll(new RegExp(RX_PARAMETER,"gi"))].map((e=>parseMatch(e,"parameter"))),...[...e.matchAll(new RegExp(RX_OPTIONAL,"gi"))].map((e=>parseMatch(e,"optional"))),...[...e.matchAll(new RegExp(RX_ALT,"gi"))].map((e=>parseMatch(e,"alternate")))].sort(((e,t)=>e.index-t.index)),constants=deepFreeze({REGEX_VARIANT:"regex",EXPRESSION_VARIANT:"expression",STEP_TYPES:["given","when","then","and","but"],HOOK_TYPES:["beforeAll","afterAll","beforeEach","afterEach"],FEATURE_META:["feature","perspective","desire","reason","comments"]}),hasWindow=Boolean("undefined"!=typeof window),hasGlobal=Boolean("undefined"!=typeof global),hasModule=Boolean("object"==typeof module),hasRequire=Boolean("function"==typeof require),hasJasmine=Boolean(hasGlobal&&void 0!==global.jasmine),resolveModule=()=>hasModule?checkCall((()=>module)):{exports:{}},resolveRequire=()=>hasRequire?checkCall((()=>require)):noOp,resolveGlobalObj=()=>{try{return hasWindow?checkCall((()=>window)):hasGlobal?checkCall((()=>global)):noOpObj}catch(e){return noOpObj}},escapeStr=e=>hasWindow?e.replace(/[|\\[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d"):e,runRegexCheck=(e,t,r)=>{if(!t.test(e))return e;let n=e;return e.replace(t,((...e)=>{const t=e[0].trim(),[s,...a]=n.split(t),i=isFunc(r)?r(...e):r;n=`${s}${i}${a.join(t)}`})),n},convertToRegex=e=>{const t=getParamTypes(),r=[];return{regex:runRegexCheck(e,RX_EXPRESSION,((e,...n)=>{const s=e.trim().replace(RX_MATCH_REPLACE,""),a=e.match(RX_PARAMETER),i=e.match(RX_OPTIONAL);return a&&r.push(t[s]||t.any),a?getParamRegex(s):i?toAlternateRegex(e):e})),transformers:r}},checkAlternative=e=>({regex:runRegexCheck(e,new RegExp(RX_ALT,"g"),getAlternateRegex),altIndexes:[]}),checkAnchors=e=>{let t=e;return e.startsWith("^")||(t="^"+t),e.endsWith("$")||(t+="$"),{regex:t}},extractParameters=(e,t,r)=>{const n=[...[...(s=t).matchAll(new RegExp(RX_PARAMETER,"gi"))].map((e=>parseMatch(e,"parameter"))),...[...s.matchAll(new RegExp(RX_OPTIONAL,"gi"))].map((e=>parseMatch(e,"optional"))),...[...s.matchAll(new RegExp(RX_ALT,"gi"))].map((e=>parseMatch(e,"alternate")))].sort(((e,t)=>e.index-t.index));var s;const a=n.filter((e=>"parameter"===e.type)).length,i=n.reduce(((t,n)=>{const{params:s,textIndex:a,wordMatchIndex:i}=t,o=e.substring(a),c="word"===n.paramType,p=o.match(n.regex),l={0:r[i],index:o.indexOf(r[i])},u=c?l:p;return u?("parameter"===n.type&&u&&s.push(u[0]),{params:s,textIndex:a+(u&&u.index+u[0].length),wordMatchIndex:i+(c&&1)}):t}),{params:[],textIndex:0,wordMatchIndex:0});return a===i.params.length?i.params:null},matchExpression=(e,t)=>{const r=(n=e.match,hasWindow?n.replace(/[|\\[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d"):n);var n;const{regex:s}=checkAlternative(r),{regex:a,transformers:i}=convertToRegex(s),{regex:o}=checkAnchors(a),c=matchRegex({...e,match:o},t);if(!c||!c.definition||!c.match)return noOpObj;const p=extractParameters(t,e.match,c.match);if(!p)return noOpObj;const l=convertTypes(p,i);return l.length!==p.length?noOpObj:{definition:e,match:l}},{REGEX_VARIANT:REGEX_VARIANT}=constants,matcher=(e,t)=>e.reduce(((e,r)=>e.match||!r.match?e:r.variant!==REGEX_VARIANT?matchExpression(r,t):matchRegex(r,t)),noOpObj),{REGEX_VARIANT:REGEX_VARIANT$1,EXPRESSION_VARIANT:EXPRESSION_VARIANT,STEP_TYPES:STEP_TYPES}=constants,sanitize=e=>{let t=e.match.toString();return"^"===t[0]&&(t=t.substr(1)),"$"===t.charAt(t.length-1)&&(t=t.slice(0,-1)),t.replace(/\(\?:([^\|]+)+\|+([^\)]+)?\)/,"$1")},getContent=e=>{const t=e.variant===REGEX_VARIANT$1?e.match.toString():`"${e.match}"`;return`${capitalize(e.type)}(${t}, ${e.method.toString()})`},registerFromCall=function(e,t,r,n){const s={type:t,match:r,method:n,tokens:[],variant:0===r.toString().indexOf("/")?REGEX_VARIANT$1:EXPRESSION_VARIANT};return s.name=sanitize(s),s.uuid=s.name,s.content=getContent(s),this[e].push(s),s},tempRegister=(e,t,r)=>(...n)=>{const s=e[t](...n);return r[t].push(s),s},registerFromParse=function(e){const t=this.types.map((e=>capitalize(e))),r=t.reduce(((e,t)=>(e[t]=[],e)),{});return eitherArr(e,[e]).map((e=>{Function(`return (global, require, module, ${t.join(",")}) => {\n          return (function(global) { ${e} }).call(global, global)\n        }`)()(resolveGlobalObj(),hasRequire?checkCall((()=>require)):noOp,hasModule?checkCall((()=>module)):{exports:{}},...t.map((e=>tempRegister(this,e,r))))})),r},joinAllSteps=e=>e.types.reduce(((t,r)=>t.concat(e[`_${r}`])),[]);class Steps{constructor(e){_defineProperty(this,"types",STEP_TYPES),_defineProperty(this,"list",(()=>{return(e=this).types.reduce(((t,r)=>t.concat(e[`_${r}`])),[]);var e})),_defineProperty(this,"typeList",(()=>this.types.reduce(((e,t)=>{const r=`_${t}`;return e[r]=[...this[r]],e}),{}))),_defineProperty(this,"match",(e=>{const t=this.list(),r=matcher(t,e);return!(!r.match||!r.definition)&&(r.match.push(this._world),r)})),_defineProperty(this,"resolve",(e=>{const t=this.match(e);return t?t.definition.method(...t.match):throwNoMatchingStep(e)})),_defineProperty(this,"register",((...e)=>isStr(e[0])?registerFromCall.apply(this,e):registerFromParse.apply(this,e))),_defineProperty(this,"clear",(()=>{this.types.map((e=>this[`_${e}`]=[]))})),this._world=e||{};const t=this;this.types.map((e=>{const r=`_${e}`;this[r]=[],this[capitalize(e)]=(n,s)=>t.register(r,e,n,s)}))}}const{HOOK_TYPES:HOOK_TYPES}=constants;class Hooks{constructor(){_defineProperty(this,"types",HOOK_TYPES),_defineProperty(this,"getRegistered",(e=>{if(!this.types.includes(e))throw new Error(`Expected client hook type to be one of ', ${HOOK_TYPES.join(", ")}.\n         Found: ${e}`);return this._registeredHooks[e]||noOp})),this._registeredHooks={},this.types.map((e=>{this[e]=t=>{isFunc(t)&&(this._registeredHooks[e]=t)}}))}}const RX_NEWLINE=/\r?\n/g,RX_TAG=/^\s*@(.*)$/,RX_COMMENT=/^\s*#(.*)$/,RX_FEATURE=/^\s*Feature:(.*)$/,RX_AS=/^\s*As (.*)$/,RX_I_WANT=/^\s*I want (.*)$/,RX_SO_THAT=/^\s*So that (.*)$/,RX_IN_ORDER=/^\s*In order (.*)$/,RX_SCENARIO=/^\s*Scenario:(.*)$/,RX_EXAMPLE=/^\s*Example:(.*)$/,RX_BACKGROUND=/^\s*Background:(.*)$/,RX_GIVEN=/^\s*Given (.*)$/,RX_WHEN=/^\s*When(.*)$/,RX_THEN=/^\s*Then (.*)$/,RX_AND=/^\s*And (.*)$/,RX_BUT=/^\s*But (.*)$/,RX_ASTERISK=/^\s*\* (.*)$/,RegStepTags=[{regex:RX_GIVEN,type:"given"},{regex:RX_WHEN,type:"when"},{regex:RX_THEN,type:"then"},{regex:RX_AND,type:"and",alt:"when"},{regex:RX_BUT,type:"but",alt:"when"},{regex:RX_ASTERISK,type:"and",alt:"when"}],featureMetaTags=[{regex:RX_AS,key:"perspective"},{regex:RX_I_WANT,key:"desire"},{regex:RX_SO_THAT,key:"reason"},{regex:RX_IN_ORDER,key:"reason"}],sanitizeForId=e=>{const t=e.trim().toLowerCase().replace(/ /g,"-");return`${e.length}-${t}`},getRXMatch=(e,t,r)=>e.match(t)[r].trim(),featureFactory=(e,t,r)=>({index:r,content:t,feature:e,tags:[],reason:[],comments:[],scenarios:[],...e&&{uuid:sanitizeForId(e)}}),scenarioFactory=(e,t)=>({index:t,scenario:e,tags:[],steps:[],...e&&{uuid:sanitizeForId(e)}}),backgroundFactory=(e,t)=>({index:t,steps:[],background:e,...e&&{uuid:sanitizeForId(e)}}),stepFactory=(e,t,r,n)=>{const s={step:t,type:e,uuid:sanitizeForId(`${e}-${t}`),index:n};return r&&(s.altType=r),s},addReason=(e,t,r)=>{t&&e.reason.push({content:t,index:r})},checkStepTag=(e,t,r)=>RegStepTags.reduce(((n,s)=>{if(n)return n;const a=s.regex.test(t);return a&&e.steps.push(stepFactory(s.type,getRXMatch(t,s.regex,1),s.alt,r)),a}),!1),featureMeta=(e,t,r)=>{let n=!1;return featureMetaTags.reduce(((s,a)=>{if(s)return s;const i=a.regex.test(t);return!n&&i&&(n=!0),i?"reason"===a.key?addReason(e,getRXMatch(t,a.regex,0),r):e[a.key]={content:getRXMatch(t,a.regex,0),index:r}:i}),!1),n},checkTag=(e,t,r,n)=>{if(!RX_TAG.test(r))return!1;const s=e.background?t:e,a=getRXMatch(r,RX_TAG,0);return s.tags=(s.tags||[]).concat(a.split(" ")),!0},featureComment=(e,t,r)=>{if(!RX_COMMENT.test(t))return!1;const n=t.match(RX_COMMENT)[0];return e.comments.push({content:n,index:r}),!0},ensureFeature=(e,t,r,n,s)=>{if(!RX_FEATURE.test(r))return t;const a=getRXMatch(r,RX_FEATURE,1);return t.feature?featureFactory(a,n,s):(t.feature=a,t.index||(t.index=s),t.uuid||(t.uuid=sanitizeForId(t.feature)),!e.includes(t)&&e.push(t),t)},ensureScenario=(e,t,r,n)=>{if(!RX_SCENARIO.test(r)&&!RX_EXAMPLE.test(r))return t;let s=getRXMatch(r,RX_SCENARIO,1);return s=s||getRXMatch(r,RX_EXAMPLE,1),t.scenario?t=scenarioFactory(s,n):t.scenario=s,!t.index&&(t.index=n),!t.uuid&&(t.uuid=sanitizeForId(t.scenario)),!e.scenarios.includes(t)&&e.scenarios.push(t),t},ensureBackground=(e,t,r,n)=>{if(!RX_BACKGROUND.test(r))return t;const s=getRXMatch(r,RX_BACKGROUND,1);return t.background?t=backgroundFactory(s,n):t.background=s||"",!t.index&&(t.index=n),!t.uuid&&(t.uuid=sanitizeForId(t.background)),e.background=t,t},setActiveParent=(e,t,r,n,s)=>RX_SCENARIO.test(s)||RX_EXAMPLE.test(s)?r:RX_FEATURE.test(s)?t:RX_BACKGROUND.test(s)?n:e,parseFeature=e=>{const t=(e||"").toString().split(RX_NEWLINE);let r=scenarioFactory(!1),n=backgroundFactory(!1),s=featureFactory(!1,e),a=s;return t.reduce(((i,o,c)=>{if(s=ensureFeature(i,s,o,e,c),featureComment(s,o,c)||featureMeta(s,o,c))return i;if(r=ensureScenario(s,r,o,c),n=ensureBackground(s,n,o,c),checkStepTag(a,o,c))return i;const p=t[c+1];return a=setActiveParent(a,s,r,n,p),checkTag(a,s,o),i}),[])},parseDefinition=function(e){return this.steps.register([e])},getTestMethod=(e,t)=>t?noOp:global[e]||testMethodFill(e),buildReporter=(e,t)=>{const r=[],n=e.describe;return e.describe=(...e)=>{const t=n.apply(null,e);return r.push(t),t},{specDone:e=>{if("failed"!==e.status)return;const t=r.find((t=>t.children.find((t=>t.result===e))));t&&t.children.map((e=>e.disable()))}}},skipTestsOnFail=e=>{if(hasWindow||!hasJasmine)return;const t=global.jasmine.getEnv();t.addReporter(buildReporter(t))},resolveFeatures=e=>isStr(e)?parseFeature(e):isObj(e)?[e]:isArr(e)?e.reduce(((e,t)=>e.concat(resolveFeatures(t))),[]):throwMissingFeatureText(),runStep=async(e,t,r)=>{getTestMethod("test",r)(`${capitalize(t.type)} ${t.step}`,(async r=>{await e.resolve(t.step),r()}))},runScenario=(e,t,r)=>{const n=getTestMethod("describe",r);let s=[];return n(`Scenario: ${t.scenario}`,(()=>{s=t.steps.map((async t=>await runStep(e,t,r)))})),s},parseFeatureTags=e=>isStr(e)&&e.match(/[@]\w*/g),itemMatch=(e="",t=[],r={})=>{const{name:n,tags:s}=r,a=isStr(s)?parseFeatureTags(s):eitherArr(s,[]),i=!n||e.includes(n),o=!a.length||a.every((e=>t.includes(e)));return i&&o},filterFeatures=(e,t={})=>e.reduce(((e,r)=>{if(itemMatch(r.feature,r.tags,t))return e.push(r),e;const n=r.scenarios.filter((e=>itemMatch(e.scenario,[...e.tags||[],...r.tags||[]],t)));return n.length&&e.push({...r,scenarios:n}),e}),[]);class Runner{constructor(e,t){_defineProperty(this,"getFeatures",((e,t)=>{const r=resolveFeatures(e);return filterFeatures(r,t)})),_defineProperty(this,"run",(async(e,t=noOpObj)=>{const r=this.run.PARKIN_TEST_MODE;skipTestsOnFail();const n=getTestMethod("describe",r),s=getTestMethod("beforeAll",r),a=getTestMethod("afterAll",r),i=getTestMethod("beforeEach",r),o=getTestMethod("afterEach",r),c=this.getFeatures(e,t);if(!c.length)return!1;const p=await c.map((async e=>{let t=[];return s(this.hooks.getRegistered("beforeAll")),a(this.hooks.getRegistered("afterAll")),i(this.hooks.getRegistered("beforeEach")),o(this.hooks.getRegistered("afterEach")),n(`Feature: ${e.feature}`,(()=>{t=e.scenarios.map((async e=>await runScenario(this.steps,e,r)))})),t}));return await Promise.all(p),!0})),!e&&throwMissingSteps(),!t&&throwMissingHooks(),this.steps=e,this.hooks=t}}const{FEATURE_META:FEATURE_META}=constants,addContent=(e,t,r)=>{exists(r)?exists(e[r])?e.splice(r,0,t):e[r]=t:e.push(t)},addTags=(e,t,r="")=>{isArr(t)&&t.length&&addContent(e,`${r}${t.join(" ")}`)},addMeta=(e,t)=>{FEATURE_META.map((r=>{switch(r){case"feature":addContent(e,`Feature: ${t[r]}`,t.index);break;case"comments":isArr(t[r])&&t[r].map((t=>addContent(e,t.content,t.index)));break;case"reason":isArr(t[r])&&t[r].map((t=>addContent(e,`  ${t.content}`,t.index)));break;case"desire":case"perspective":t[r]&&addContent(e,`  ${t[r].content}`,t[r].index)}}))},addSteps=(e,t)=>{isArr(t.steps)&&t.steps.length&&t.steps.map((t=>addContent(e,`    ${capitalize(t.type)} ${t.step}`,t.index)))},addScenarios=(e,t)=>{t.scenarios&&t.scenarios.map((t=>{addTags(e,t.tags,"  "),addContent(e,`  Scenario: ${t.scenario}`,t.index),addSteps(e,t)}))},formatComment=(e,t,r)=>{const n=e[r+1],s=e[r-1];let a=exists(n)?n:s;if(!a)return`${t}\n`;const i=t.split("#").pop();return`${Array(a.length-a.trimStart().length).join(" ")} # ${i}\n`},formatAssembled=e=>Array.from(e,((t,r)=>exists(t)?t.startsWith("#")?formatComment(e,t,r):`${t}\n`:"\n")).join("").trim(),assembleFeature=e=>eitherArr(e,[e]).map((e=>{let t=[];return!isObj(e)&&throwFeatureNotAnObj(e),addTags(t,e.tags),addMeta(t,e),addScenarios(t,e),formatAssembled(t)})),assemble={feature:assembleFeature};var _isInit=new WeakMap;class Parkin{constructor(e,t){_isInit.set(this,{writable:!0,value:!1}),_defineProperty(this,"init",((e=noOpObj,t)=>{if(_classPrivateFieldGet(this,_isInit))return console.warn("This instance of parkin has already been initialized!");_classPrivateFieldSet(this,_isInit,!0),this.steps=new Steps(e),this.hooks=new Hooks,this.runner=new Runner(this.steps,this.hooks),this.run=this.runner.run,this.parse={feature:parseFeature.bind(this),definition:parseDefinition.bind(this)},this.assemble=assemble,this.paramTypes={register:registerParamType},isObj(t)&&this.registerSteps(t),this.steps.types.map((e=>{this[capitalize(e)]=(t,r,n)=>this.steps.register(`_${e}`,e,t,r,n)}))})),_defineProperty(this,"registerSteps",(e=>{Object.entries(e).map(((e,t)=>Object.entries(t).map(((t,r)=>this.steps[capitalize(e)](t,...eitherArr(r,[r]))))))})),isObj(e)&&this.init(e,t)}}const PKInstance=new Parkin;exports.PKInstance=PKInstance,exports.Parkin=Parkin;
