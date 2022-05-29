System.register(['./wait-26c5e7c6-2112d3c7.js'], (function (exports) {
  'use strict';
  var isArr, isStr, noOpObj, isFunc, isObj, _defineProperty, _classPrivateFieldInitSpec, _classPrivateFieldGet, _classPrivateFieldSet, noOp, checkCall;
  return {
    setters: [function (module) {
      isArr = module.i;
      isStr = module.a;
      noOpObj = module.n;
      isFunc = module.b;
      isObj = module.c;
      _defineProperty = module._;
      _classPrivateFieldInitSpec = module.g;
      _classPrivateFieldGet = module.h;
      _classPrivateFieldSet = module.j;
      noOp = module.f;
      checkCall = module.d;
    }],
    execute: (function () {

      const keyMap = (arr, toUpperCase) => isArr(arr) && arr.reduce((obj, key) => {
        if (!isStr(key)) return obj;
        const use = toUpperCase && key.toUpperCase() || key;
        obj[use] = use;
        return obj;
      }, {}) || {};

      const helperTypes = keyMap([`beforeAll`, `beforeEach`, `afterAll`, `afterEach`]);
      const globalTypes = exports('g', { ...keyMap([`test`, `it`, `xtest`, `xit`, `describe`]),
        ...helperTypes
      });
      const Types = { ...globalTypes,
        ...keyMap([`root`])
      };
      const throwError = error => {
        throw new Error(error);
      };
      const validateHelper = (type, action, parent) => {
        !isFunc(action) && throwError(`The ${type} method requires a "function" as the first argument`)(!parent || parent.type === Types.root) && throwError(`The ${type} method must be called within a ${Types.describe} method`);
      };
      const validateRootRun = root => {
        root.type !== Types.root && throwError(`Invalid root type "${root.type}" set for root object`);
        !root.describes || !root.describes.length && throwError(`No tests have been registered to this ParkinTest instance`);
      };
      const validateItem = (type, description, action) => {
        !isStr(type) && throwError(`Test item type is required as a string`);
        !isFunc(action) && throwError(`The ${type} method requires a "function" as the second argument`);
        !isStr(description) && throwError(`The ${type} method requires a "string" as the first argument`);
      };
      const createItem = (type, metadata = noOpObj, validate = true) => {
        const {
          description,
          action
        } = metadata;
        validate && validateItem(type, description, action);
        return { ...metadata,
          type
        };
      };

      const runResult = (item, {
        id,
        fullName,
        action,
        failed,
        passed,
        testPath
      }) => {
        const result = {
          id,
          action,
          testPath,
          fullName,
          type: item.type,
          failedExpectations: [],
          passedExpectations: [],
          failed: Boolean(failed),
          passed: Boolean(passed),
          description: item.description,
          timestamp: new Date().getTime()
        };
        isObj(failed) && result.failedExpectations.push(failed);
        isObj(passed) && result.passedExpectations.push(passed);
        if (passed || failed) result.status = passed ? `passed` : `failed`;
        return result;
      };
      const loopHooks = async args => {
        const {
          type,
          test,
          specId,
          suiteId,
          describe,
          root
        } = args;
        let hookIdx;
        const activeItem = root || describe;
        const fullName = root ? root.description : test ? `${describe === null || describe === void 0 ? void 0 : describe.description} > ${test === null || test === void 0 ? void 0 : test.description} > ${type}` : `${describe === null || describe === void 0 ? void 0 : describe.description} > ${type}`;
        try {
          activeItem[type].length && (await Promise.all(activeItem[type].map((fn, idx) => {
            hookIdx = idx;
            return fn();
          })));
        } catch (error) {
          return runResult(activeItem, {
            fullName,
            action: type,
            status: 'failed',
            id: test ? specId : suiteId,
            failed: {
              name: error.name,
              message: error.message
            },
            testPath: test ? `/${suiteId}/${specId}/${type}${hookIdx}` : `/${suiteId}/${type}${hookIdx}`
          });
        }
      };
      const loopTests = async args => {
        const {
          suiteId,
          describe,
          testOnly,
          specDone,
          specStarted
        } = args;
        let describeFailed = false;
        const results = [];
        for (let testIdx = 0; testIdx < describe.tests.length; testIdx++) {
          const test = describe.tests[testIdx];
          const specId = `spec${testIdx}`;
          const testPath = `/${suiteId}/${specId}`;
          const fullName = `${describe.description} > ${test.description}`;
          let testResult = runResult(test, {
            fullName,
            testPath,
            id: specId,
            action: 'start'
          });
          if (testOnly && !test.only || test.skip) {
            specStarted({ ...testResult,
              skipped: true,
              action: 'skipped',
              status: 'skipped'
            });
            continue;
          } else specStarted(testResult);
          const beforeEachResult = await loopHooks({
            test,
            specId,
            suiteId,
            describe,
            type: Types.beforeEach
          });
          if (beforeEachResult) {
            describeFailed = true;
            results.push(beforeEachResult);
            specDone(beforeEachResult);
            break;
          }
          try {
            const result = await test.action();
            testResult = runResult(test, {
              fullName,
              id: specId,
              testPath: testPath,
              action: Types.test,
              passed: result || true
            });
          } catch (error) {
            testResult = runResult(test, {
              fullName,
              id: specId,
              action: Types.test,
              testPath: testPath,
              failed: {
                name: error.name,
                message: error.message
              }
            });
            describeFailed = true;
          }
          const afterEachResult = await loopHooks({
            test,
            specId,
            suiteId,
            describe,
            type: Types.afterEach
          });
          if (afterEachResult) {
            describeFailed = true;
            results.push(afterEachResult);
            specDone(afterEachResult);
            break;
          }
          results.push(testResult);
          specDone({ ...testResult,
            action: 'end'
          });
        }
        return {
          tests: results,
          failed: describeFailed
        };
      };
      const callBeforeHooks = async ({
        root,
        suiteId,
        describe
      }) => {
        const beforeEachResult = await loopHooks({
          root,
          suiteId: Types.root,
          type: Types.beforeEach
        });
        const beforeAllResult = !beforeEachResult && (await loopHooks({
          suiteId,
          describe,
          type: Types.beforeAll
        }));
        return beforeEachResult || beforeAllResult;
      };
      const callAfterHooks = async ({
        root,
        suiteId,
        describe
      }) => {
        const afterEachResult = await loopHooks({
          root,
          suiteId: Types.root,
          type: Types.afterEach
        });
        const afterAllResult = !afterEachResult && (await loopHooks({
          suiteId,
          describe,
          type: Types.afterAll
        }));
        return afterEachResult || afterAllResult;
      };
      const loopDescribes = async args => {
        const {
          root,
          testOnly,
          specDone,
          suiteDone,
          specStarted,
          parentIdx = ``,
          suiteStarted,
          describeOnly
        } = args;
        let describeFailed = false;
        const results = [];
        for (let idx = 0; idx < root.describes.length; idx++) {
          const describe = root.describes[idx];
          const suiteId = `suite-${parentIdx}${idx}`;
          let describeResult = runResult(describe, {
            id: suiteId,
            action: 'start',
            testPath: `/${suiteId}`,
            fullName: describe.description
          });
          const shouldSkip = describe.skip || describeOnly && !describe.only && !describe.onlyChild || testOnly && !describe.onlyChild;
          if (shouldSkip) {
            suiteStarted({ ...describeResult,
              skipped: true,
              action: 'skipped',
              status: 'skipped'
            });
            continue;
          } else suiteStarted(describeResult);
          const beforeResult = await callBeforeHooks({
            root,
            suiteId,
            describe
          });
          if (beforeResult) {
            describeFailed = true;
            describeResult = { ...describeResult,
              ...beforeResult
            };
            suiteDone(describeResult);
            results.push(describeResult);
            continue;
          }
          const testResults = await loopTests({
            suiteId,
            describe,
            testOnly,
            specDone,
            specStarted
          });
          const describesResults = describe.describes && describe.describes.length && (await loopDescribes({ ...args,
            root: describe,
            parentIdx: `${idx}-`
          }));
          describeResult = { ...describeResult,
            ...describesResults,
            action: 'end',
            tests: testResults.tests
          };
          if (testResults.failed || describesResults.failed) {
            describeFailed = true;
            describeResult.failed = true;
          } else describeResult.passed = true;
          const afterResult = await callAfterHooks({
            root,
            suiteId,
            describe
          });
          if (afterResult) {
            describeFailed = true;
            describeResult = { ...describeResult,
              ...afterResult
            };
            suiteDone(describeResult);
            results.push(describeResult);
            continue;
          }
          suiteDone(describeResult);
          results.push(describeResult);
        }
        return {
          describes: results,
          failed: describeFailed
        };
      };
      const run = async args => {
        validateRootRun(args.root);
        const beforeAllResult = await loopHooks({
          root: args.root,
          suiteId: Types.root,
          type: Types.beforeAll
        });
        if (beforeAllResult) return [beforeAllResult];
        const {
          describes
        } = await loopDescribes(args);
        const afterAllResult = await loopHooks({
          root: args.root,
          suiteId: Types.root,
          type: Types.afterAll
        });
        afterAllResult && describes.push(afterAllResult);
        return describes;
      };

      var _specDone = new WeakMap();
      var _suiteDone = new WeakMap();
      var _specStarted = new WeakMap();
      var _suiteStarted = new WeakMap();
      var _activeParent = new WeakMap();
      var _testOnly = new WeakMap();
      var _describeOnly = new WeakMap();
      var _root = new WeakMap();
      var _addFrameworkHooks = new WeakMap();
      var _addOnly = new WeakMap();
      var _addSkip = new WeakMap();
      var _addEach = new WeakMap();
      var _addHelpers = new WeakMap();
      class ParkinTest {
        constructor(config = noOpObj) {
          _defineProperty(this, "timeout", 6000);
          _classPrivateFieldInitSpec(this, _specDone, {
            writable: true,
            value: noOp
          });
          _classPrivateFieldInitSpec(this, _suiteDone, {
            writable: true,
            value: noOp
          });
          _classPrivateFieldInitSpec(this, _specStarted, {
            writable: true,
            value: noOp
          });
          _classPrivateFieldInitSpec(this, _suiteStarted, {
            writable: true,
            value: noOp
          });
          _classPrivateFieldInitSpec(this, _activeParent, {
            writable: true,
            value: undefined
          });
          _classPrivateFieldInitSpec(this, _testOnly, {
            writable: true,
            value: false
          });
          _classPrivateFieldInitSpec(this, _describeOnly, {
            writable: true,
            value: false
          });
          _classPrivateFieldInitSpec(this, _root, {
            writable: true,
            value: createItem(Types.root, {
              describes: []
            }, false)
          });
          _defineProperty(this, "getActiveParent", () => {
            return _classPrivateFieldGet(this, _activeParent);
          });
          _classPrivateFieldInitSpec(this, _addFrameworkHooks, {
            writable: true,
            value: ({
              timeout,
              specDone,
              suiteDone,
              specStarted,
              suiteStarted
            }) => {
              if (timeout) this.timeout = timeout;
              if (specDone) _classPrivateFieldSet(this, _specDone, specDone);
              if (suiteDone) _classPrivateFieldSet(this, _suiteDone, suiteDone);
              if (specStarted) _classPrivateFieldSet(this, _specStarted, specStarted);
              if (suiteStarted) _classPrivateFieldSet(this, _suiteStarted, suiteStarted);
            }
          });
          _classPrivateFieldInitSpec(this, _addOnly, {
            writable: true,
            value: () => {
              this.describe.only = (...args) => {
                this.describe(...args);
                const item = _classPrivateFieldGet(this, _activeParent).describes[_classPrivateFieldGet(this, _activeParent).describes.length - 1];
                item.only = true;
                _classPrivateFieldSet(this, _describeOnly, true);
                checkCall(_classPrivateFieldGet(this, _activeParent).hasOnlyChild);
              };
              this.test.only = (...args) => {
                this.test(...args);
                const item = _classPrivateFieldGet(this, _activeParent).tests[_classPrivateFieldGet(this, _activeParent).tests.length - 1];
                item.only = true;
                _classPrivateFieldSet(this, _testOnly, true);
                checkCall(_classPrivateFieldGet(this, _activeParent).hasOnlyChild);
              };
            }
          });
          _classPrivateFieldInitSpec(this, _addSkip, {
            writable: true,
            value: () => {
              this.describe.skip = (...args) => {
                this.describe(...args);
                const item = _classPrivateFieldGet(this, _activeParent).describes[_classPrivateFieldGet(this, _activeParent).describes.length - 1];
                item.skip = true;
              };
              this.test.skip = (...args) => {
                this.test(...args);
                const item = _classPrivateFieldGet(this, _activeParent).tests[_classPrivateFieldGet(this, _activeParent).tests.length - 1];
                item.skip = true;
              };
            }
          });
          _classPrivateFieldInitSpec(this, _addEach, {
            writable: true,
            value: () => {}
          });
          _classPrivateFieldInitSpec(this, _addHelpers, {
            writable: true,
            value: () => {
              Object.values(helperTypes).map(type => {
                this[type] = action => {
                  validateHelper(type, action, _classPrivateFieldGet(this, _activeParent));
                  _classPrivateFieldGet(this, _activeParent)[type].push(action);
                };
              });
            }
          });
          _defineProperty(this, "describe", (description, action) => {
            const item = createItem(Types.describe, {
              action,
              tests: [],
              description,
              describes: []
            });
            item.disabled = () => item.skip = true;
            Object.values(helperTypes).map(type => item[type] = []);
            _classPrivateFieldGet(this, _activeParent).describes.push(item);
            const lastParent = _classPrivateFieldGet(this, _activeParent);
            item.hasOnlyChild = () => {
              item.onlyChild = true;
              checkCall(lastParent.hasOnlyChild);
            };
            _classPrivateFieldSet(this, _activeParent, item);
            action();
            _classPrivateFieldSet(this, _activeParent, lastParent);
          });
          _defineProperty(this, "test", (description, action, timeout) => {
            if (!_classPrivateFieldGet(this, _activeParent) || _classPrivateFieldGet(this, _activeParent).type === Types.root) throwError(`All ${Types.test} method calls must be called within a ${Types.describe} method`);
            const item = createItem(Types.test, {
              action,
              timeout,
              description
            });
            item.disabled = () => item.skip = true;
            _classPrivateFieldGet(this, _activeParent).tests.push(item);
          });
          _defineProperty(this, "xtest", description => {
            if (!_classPrivateFieldGet(this, _activeParent) || _classPrivateFieldGet(this, _activeParent).type === Types.root) throwError(`All ${Types.test} method calls must be called within a ${Types.describe} method`);
            !isStr(description) && throwError(`The ${Types.test} method requires a "string" as the first argument`);
            const item = createItem(Types.test, {
              description,
              skip: true
            }, false);
            item.disabled = () => item.skip = true;
            _classPrivateFieldGet(this, _activeParent).tests.push(item);
          });
          _classPrivateFieldGet(this, _root).description = config.description || `root`;
          Object.values(helperTypes).map(type => _classPrivateFieldGet(this, _root)[type] = []);
          _classPrivateFieldGet(this, _addOnly).call(this);
          _classPrivateFieldGet(this, _addSkip).call(this);
          _classPrivateFieldGet(this, _addHelpers).call(this);
          this.it = this.test;
          this.xit = this.xtest;
          _classPrivateFieldSet(this, _activeParent, _classPrivateFieldGet(this, _root));
          _classPrivateFieldGet(this, _addFrameworkHooks).call(this, config);
          this.run = (config = noOpObj) => {
            _classPrivateFieldGet(this, _root).description = config.description || _classPrivateFieldGet(this, _root).description;
            _classPrivateFieldGet(this, _addFrameworkHooks).call(this, config);
            return run({
              root: _classPrivateFieldGet(this, _root),
              testOnly: _classPrivateFieldGet(this, _testOnly),
              specDone: _classPrivateFieldGet(this, _specDone),
              suiteDone: _classPrivateFieldGet(this, _suiteDone),
              specStarted: _classPrivateFieldGet(this, _specStarted),
              describeOnly: _classPrivateFieldGet(this, _describeOnly),
              suiteStarted: _classPrivateFieldGet(this, _suiteStarted)
            });
          };
        }
      } exports('P', ParkinTest);

    })
  };
}));
