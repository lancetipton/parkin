System.register(['./wait-26c5e7c6-2112d3c7.js'], (function (exports) {
  'use strict';
  var checkCall, noOpObj, noOp;
  return {
    setters: [function (module) {
      checkCall = module.d;
      noOpObj = module.n;
      noOp = module.f;
    }],
    execute: (function () {

      const hasWindow = exports('h', Boolean(typeof window !== 'undefined'));
      const hasGlobal = Boolean(typeof global !== 'undefined');
      const hasModule = Boolean(typeof module === 'object');
      const hasRequire = Boolean(typeof require === 'function');
      const hasJasmine = exports('c', Boolean(hasGlobal && typeof global.jasmine !== 'undefined'));
      const resolveJasmine = exports('d', () => hasJasmine ? checkCall(() => global.jasmine) : {
        getEnv: () => noOpObj
      });
      const resolveModule = exports('b', () => hasModule ? checkCall(() => module) : {
        exports: {}
      });
      const resolveRequire = exports('a', () => hasRequire ? checkCall(() => require) : noOp);
      const resolveGlobalObj = exports('r', () => {
        try {
          return hasWindow ? checkCall(() => window) : hasGlobal ? checkCall(() => global) : noOpObj;
        } catch (err) {
          return noOpObj;
        }
      });

    })
  };
}));
