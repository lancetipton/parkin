System.register([], (function (exports) {
  'use strict';
  return {
    execute: (function () {

      exports({
        _: _defineProperty,
        g: _classPrivateFieldInitSpec,
        h: _classPrivateFieldGet,
        j: _classPrivateFieldSet
      });

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
        var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");

        return _classApplyDescriptorGet(receiver, descriptor);
      }

      function _classPrivateFieldSet(receiver, privateMap, value) {
        var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");

        _classApplyDescriptorSet(receiver, descriptor, value);

        return value;
      }

      function _classExtractFieldDescriptor(receiver, privateMap, action) {
        if (!privateMap.has(receiver)) {
          throw new TypeError("attempted to " + action + " private field on non-instance");
        }

        return privateMap.get(receiver);
      }

      function _classApplyDescriptorGet(receiver, descriptor) {
        if (descriptor.get) {
          return descriptor.get.call(receiver);
        }

        return descriptor.value;
      }

      function _classApplyDescriptorSet(receiver, descriptor, value) {
        if (descriptor.set) {
          descriptor.set.call(receiver, value);
        } else {
          if (!descriptor.writable) {
            throw new TypeError("attempted to set read only private field");
          }

          descriptor.value = value;
        }
      }

      function _checkPrivateRedeclaration(obj, privateCollection) {
        if (privateCollection.has(obj)) {
          throw new TypeError("Cannot initialize the same private elements twice on an object");
        }
      }

      function _classPrivateFieldInitSpec(obj, privateMap, value) {
        _checkPrivateRedeclaration(obj, privateMap);

        privateMap.set(obj, value);
      }

      const isArr = exports('i', value => Array.isArray(value));

      const isObj = exports('c', obj => typeof obj === 'object' && !Array.isArray(obj) && obj !== null);

      const isFunc = exports('b', func => typeof func === 'function');

      const isStr = exports('a', str => typeof str === 'string');

      const deepFreeze = exports('e', obj => {
        Object.freeze(obj);
        Object.getOwnPropertyNames(obj).map(prop => {
          obj.hasOwnProperty(prop) && obj[prop] !== null && (typeof obj[prop] === 'object' || isFunc(obj[prop])) && !Object.isFrozen(obj[prop]) && deepFreeze(obj[prop]);
        });
        return obj;
      });

      const noOp = exports('f', () => {});
      const noOpObj = exports('n', Object.freeze({}));
      deepFreeze({
        content: {}
      });
      deepFreeze([]);

      const checkCall = exports('d', (method, ...params) => {
        return isFunc(method) ? method(...params) : undefined;
      });

      Array.from(['caller', 'callee', 'arguments', 'apply', 'bind', 'call', 'toString', '__proto__', '__defineGetter__', '__defineSetter__', 'hasOwnProperty', '__lookupGetter__', '__lookupSetter__', 'isPrototypeOf', 'propertyIsEnumerable', 'valueOf', 'toLocaleString']).concat(Object.getOwnPropertyNames(Object.prototype)).reduce((map, functionName) => {
        map[functionName] = true;
        return map;
      }, {});

    })
  };
}));
