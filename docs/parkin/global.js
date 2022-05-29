System.register(['./test-8531a9fa.js', './globalScope-fc1eb958.js', './wait-26c5e7c6-2112d3c7.js'], (function (exports) {
  'use strict';
  var ParkinTest, globalTypes, resolveGlobalObj;
  return {
    setters: [function (module) {
      ParkinTest = module.P;
      globalTypes = module.g;
    }, function (module) {
      resolveGlobalObj = module.r;
    }, function () {}],
    execute: (function () {

      const setParkinTestGlobals = force => {
        const PTE = new ParkinTest();
        const globalObj = resolveGlobalObj();
        const forceGlobal = force || process.env.PARKIN_TEST_GLOBALS_OVERRIDE;
        globalObj.ParkinTest = PTE;
        Object.values(globalTypes).map(name => (!globalObj[name] || forceGlobal) && (globalObj[name] = PTE[name].bind(PTE)));
      };
      setParkinTestGlobals();
      const setGlobals = exports('setGlobals', (force = true) => setParkinTestGlobals(force));

    })
  };
}));
