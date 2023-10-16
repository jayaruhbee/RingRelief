// node_modules/@passageidentity/passage-elements/dist/package/customElements.es.js
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve2, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e2) {
        reject(e2);
      }
    };
    var step = (x2) => x2.done ? resolve2(x2.value) : Promise.resolve(x2.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
var EMPTY_OBJ = {};
var EMPTY_ARR = [];
var NOOP = () => {
};
var NO = () => false;
var onRE = /^on[^a-z]/;
var isOn = (key) => onRE.test(key);
var isModelListener = (key) => key.startsWith("onUpdate:");
var extend = Object.assign;
var remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
var hasOwnProperty$2 = Object.prototype.hasOwnProperty;
var hasOwn$1 = (val, key) => hasOwnProperty$2.call(val, key);
var isArray$1 = Array.isArray;
var isMap = (val) => toTypeString$1(val) === "[object Map]";
var isSet = (val) => toTypeString$1(val) === "[object Set]";
var isDate$1 = (val) => toTypeString$1(val) === "[object Date]";
var isFunction$1 = (val) => typeof val === "function";
var isString$2 = (val) => typeof val === "string";
var isSymbol = (val) => typeof val === "symbol";
var isObject$2 = (val) => val !== null && typeof val === "object";
var isPromise = (val) => {
  return isObject$2(val) && isFunction$1(val.then) && isFunction$1(val.catch);
};
var objectToString$1 = Object.prototype.toString;
var toTypeString$1 = (value) => objectToString$1.call(value);
var toRawType = (value) => {
  return toTypeString$1(value).slice(8, -1);
};
var isPlainObject$1 = (val) => toTypeString$1(val) === "[object Object]";
var isIntegerKey = (key) => isString$2(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
var isReservedProp = makeMap(
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
var cacheStringFunction = (fn) => {
  const cache2 = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache2[str];
    return hit || (cache2[str] = fn(str));
  };
};
var camelizeRE = /-(\w)/g;
var camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_2, c2) => c2 ? c2.toUpperCase() : "");
});
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
var capitalize$1 = cacheStringFunction(
  (str) => str.charAt(0).toUpperCase() + str.slice(1)
);
var toHandlerKey = cacheStringFunction(
  (str) => str ? `on${capitalize$1(str)}` : ``
);
var hasChanged = (value, oldValue) => !Object.is(value, oldValue);
var invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
var def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
var looseToNumber = (val) => {
  const n2 = parseFloat(val);
  return isNaN(n2) ? val : n2;
};
var toNumber = (val) => {
  const n2 = isString$2(val) ? Number(val) : NaN;
  return isNaN(n2) ? val : n2;
};
var _globalThis$1;
var getGlobalThis$1 = () => {
  return _globalThis$1 || (_globalThis$1 = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function normalizeStyle(value) {
  if (isArray$1(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString$2(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString$2(value)) {
    return value;
  } else if (isObject$2(value)) {
    return value;
  }
}
var listDelimiterRE = /;(?![^(]*\))/g;
var propertyDelimiterRE = /:([^]+)/;
var styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString$2(value)) {
    res = value;
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$2(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
function normalizeProps(props) {
  if (!props)
    return null;
  let { class: klass, style } = props;
  if (klass && !isString$2(klass)) {
    props.class = normalizeClass(klass);
  }
  if (style) {
    props.style = normalizeStyle(style);
  }
  return props;
}
var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
var isSpecialBooleanAttr = makeMap(specialBooleanAttrs);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
function looseCompareArrays(a, b) {
  if (a.length !== b.length)
    return false;
  let equal = true;
  for (let i = 0; equal && i < a.length; i++) {
    equal = looseEqual(a[i], b[i]);
  }
  return equal;
}
function looseEqual(a, b) {
  if (a === b)
    return true;
  let aValidType = isDate$1(a);
  let bValidType = isDate$1(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? a.getTime() === b.getTime() : false;
  }
  aValidType = isSymbol(a);
  bValidType = isSymbol(b);
  if (aValidType || bValidType) {
    return a === b;
  }
  aValidType = isArray$1(a);
  bValidType = isArray$1(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? looseCompareArrays(a, b) : false;
  }
  aValidType = isObject$2(a);
  bValidType = isObject$2(b);
  if (aValidType || bValidType) {
    if (!aValidType || !bValidType) {
      return false;
    }
    const aKeysCount = Object.keys(a).length;
    const bKeysCount = Object.keys(b).length;
    if (aKeysCount !== bKeysCount) {
      return false;
    }
    for (const key in a) {
      const aHasKey = a.hasOwnProperty(key);
      const bHasKey = b.hasOwnProperty(key);
      if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
        return false;
      }
    }
  }
  return String(a) === String(b);
}
function looseIndexOf(arr, val) {
  return arr.findIndex((item) => looseEqual(item, val));
}
var toDisplayString$1 = (val) => {
  return isString$2(val) ? val : val == null ? "" : isArray$1(val) || isObject$2(val) && (val.toString === objectToString$1 || !isFunction$1(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
var replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject$2(val) && !isArray$1(val) && !isPlainObject$1(val)) {
    return String(val);
  }
  return val;
};
var activeEffectScope;
var EffectScope = class {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
        this
      ) - 1;
    }
  }
  get active() {
    return this._active;
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    }
  }
  on() {
    activeEffectScope = this;
  }
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this._active = false;
    }
  }
};
function effectScope(detached) {
  return new EffectScope(detached);
}
function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
var createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
var wasTracked = (dep) => (dep.w & trackOpBit) > 0;
var newTracked = (dep) => (dep.n & trackOpBit) > 0;
var initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit;
    }
  }
};
var finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
var targetMap = /* @__PURE__ */ new WeakMap();
var effectTrackDepth = 0;
var trackOpBit = 1;
var maxMarkerBits = 30;
var activeEffect;
var ITERATE_KEY = Symbol("");
var MAP_KEY_ITERATE_KEY = Symbol("");
var ReactiveEffect = class {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = void 0;
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }
      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = void 0;
      if (this.deferStop) {
        this.stop();
      }
    }
  }
  stop() {
    if (activeEffect === this) {
      this.deferStop = true;
    } else if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
};
function cleanupEffect(effect2) {
  const { deps } = effect2;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect2);
    }
    deps.length = 0;
  }
}
var shouldTrack = true;
var trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep());
    }
    trackEffects(dep);
  }
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray$1(target)) {
    const newLength = Number(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0]);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects));
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  const effects = isArray$1(dep) ? dep : [...dep];
  for (const effect2 of effects) {
    if (effect2.computed) {
      triggerEffect(effect2);
    }
  }
  for (const effect2 of effects) {
    if (!effect2.computed) {
      triggerEffect(effect2);
    }
  }
}
function triggerEffect(effect2, debuggerEventExtraInfo) {
  if (effect2 !== activeEffect || effect2.allowRecurse) {
    if (effect2.scheduler) {
      effect2.scheduler();
    } else {
      effect2.run();
    }
  }
}
var isNonTrackableKeys = makeMap(`__proto__,__v_isRef,__isVue`);
var builtInSymbols = new Set(
  Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
var get$1 = createGetter();
var shallowGet = createGetter(false, true);
var readonlyGet = createGetter(true);
var arrayInstrumentations = createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function hasOwnProperty$1(key) {
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray$1(target);
    if (!isReadonly2) {
      if (targetIsArray && hasOwn$1(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty$1;
      }
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject$2(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
var set$1 = createSetter();
var shallowSet = createSetter(true);
function createSetter(shallow = false) {
  return function set2(target, key, value, receiver) {
    let oldValue = target[key];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }
    if (!shallow) {
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray$1(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray$1(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn$1(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn$1(target, key);
  target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, void 0);
  }
  return result;
}
function has$1(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray$1(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
var mutableHandlers = {
  get: get$1,
  set: set$1,
  deleteProperty,
  has: has$1,
  ownKeys
};
var readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    return true;
  },
  deleteProperty(target, key) {
    return true;
  }
};
var shallowReactiveHandlers = extend(
  {},
  mutableHandlers,
  {
    get: shallowGet,
    set: shallowSet
  }
);
var toShallow = (value) => value;
var getProto = (v2) => Reflect.getPrototypeOf(v2);
function get(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return {
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get(this, key);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(
      method,
      false,
      false
    );
    readonlyInstrumentations2[method] = createIterableMethod(
      method,
      true,
      false
    );
    shallowInstrumentations2[method] = createIterableMethod(
      method,
      false,
      true
    );
    shallowReadonlyInstrumentations2[method] = createIterableMethod(
      method,
      true,
      true
    );
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
var [
  mutableInstrumentations,
  readonlyInstrumentations,
  shallowInstrumentations,
  shallowReadonlyInstrumentations
] = createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn$1(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
var mutableCollectionHandlers = {
  get: createInstrumentationGetter(false, false)
};
var shallowCollectionHandlers = {
  get: createInstrumentationGetter(false, true)
};
var readonlyCollectionHandlers = {
  get: createInstrumentationGetter(true, false)
};
var reactiveMap = /* @__PURE__ */ new WeakMap();
var shallowReactiveMap = /* @__PURE__ */ new WeakMap();
var readonlyMap = /* @__PURE__ */ new WeakMap();
var shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$2(target)) {
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
var toReactive = (value) => isObject$2(value) ? reactive(value) : value;
var toReadonly = (value) => isObject$2(value) ? readonly(value) : value;
function trackRefValue(ref2) {
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    {
      trackEffects(ref2.dep || (ref2.dep = createDep()));
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  const dep = ref2.dep;
  if (dep) {
    {
      triggerEffects(dep);
    }
  }
}
function isRef(r2) {
  return !!(r2 && r2.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function shallowRef(value) {
  return createRef(value, true);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
var RefImpl = class {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this);
    }
  }
};
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
var shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
var ComputedRefImpl = class {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this["__v_isReadonly"] = false;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty || !self2._cacheable) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
};
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction$1(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = NOOP;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  return cRef;
}
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction$1(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(
        appErrorHandler,
        null,
        10,
        [err, exposedInstance, errorInfo]
      );
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    console.error(err);
  }
}
var isFlushing = false;
var isFlushPending = false;
var queue = [];
var flushIndex = 0;
var pendingPostFlushCbs = [];
var activePostFlushCbs = null;
var postFlushIndex = 0;
var resolvedPromise = Promise.resolve();
var currentFlushPromise = null;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJobId = getId(queue[middle]);
    middleJobId < id ? start = middle + 1 : end = middle;
  }
  return start;
}
function queueJob(job) {
  if (!queue.length || !queue.includes(
    job,
    isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
  )) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function invalidateJob(job) {
  const i = queue.indexOf(job);
  if (i > flushIndex) {
    queue.splice(i, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray$1(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(
      cb,
      cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex
    )) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(seen, i = isFlushing ? flushIndex + 1 : 0) {
  for (; i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.pre) {
      queue.splice(i, 1);
      i--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
var getId = (job) => job.id == null ? Infinity : job.id;
var comparator = (a, b) => {
  const diff = getId(a) - getId(b);
  if (diff === 0) {
    if (a.pre && !b.pre)
      return -1;
    if (b.pre && !a.pre)
      return 1;
  }
  return diff;
};
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  queue.sort(comparator);
  const check = NOOP;
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (false)
          ;
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs();
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs();
    }
  }
}
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number: number2, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a) => isString$2(a) ? a.trim() : a);
    }
    if (number2) {
      args = rawArgs.map(looseToNumber);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance,
      6,
      args
    );
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(
      onceHandler,
      instance,
      6,
      args
    );
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache2 = appContext.emitsCache;
  const cached = cache2.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction$1(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$2(comp)) {
      cache2.set(comp, null);
    }
    return null;
  }
  if (isArray$1(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject$2(comp)) {
    cache2.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn$1(options, key[0].toLowerCase() + key.slice(1)) || hasOwn$1(options, hyphenate(key)) || hasOwn$1(options, key);
}
var currentRenderingInstance = null;
var currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function pushScopeId(id) {
  currentScopeId = id;
}
function popScopeId() {
  currentScopeId = null;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx)
    return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    let res;
    try {
      res = fn(...args);
    } finally {
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
function renderComponentRoot(instance) {
  const {
    type: Component,
    vnode,
    proxy,
    withProxy,
    props,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit: emit2,
    render: render2,
    renderCache,
    data,
    setupState,
    ctx,
    inheritAttrs
  } = instance;
  let result;
  let fallthroughAttrs;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      result = normalizeVNode(
        render2.call(
          proxyToUse,
          proxyToUse,
          renderCache,
          props,
          setupState,
          data,
          ctx
        )
      );
      fallthroughAttrs = attrs;
    } else {
      const render22 = Component;
      if (false)
        ;
      result = normalizeVNode(
        render22.length > 1 ? render22(
          props,
          false ? {
            get attrs() {
              markAttrsAccessed();
              return attrs;
            },
            slots,
            emit: emit2
          } : { attrs, slots, emit: emit2 }
        ) : render22(
          props,
          null
        )
      );
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(
            fallthroughAttrs,
            propsOptions
          );
        }
        root = cloneVNode(root, fallthroughAttrs);
      }
    }
  }
  if (vnode.dirs) {
    root = cloneVNode(root);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    root.transition = vnode.transition;
  }
  {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
var getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
var filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent && parent.subTree === vnode) {
    (vnode = parent.vnode).el = el;
    parent = parent.parent;
  }
}
var isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray$1(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
var INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  var _a;
  const instance = getCurrentScope() === ((_a = currentInstance) == null ? void 0 : _a.scope) ? currentInstance : null;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray$1(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s2) => isReactive(s2) || isShallow(s2));
    getter = () => source.map((s2) => {
      if (isRef(s2)) {
        return s2.value;
      } else if (isReactive(s2)) {
        return traverse(s2);
      } else if (isFunction$1(s2)) {
        return callWithErrorHandling(s2, instance, 2);
      } else
        ;
    });
  } else if (isFunction$1(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(
          source,
          instance,
          3,
          [onCleanup]
        );
      };
    }
  } else {
    getter = NOOP;
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
    };
  };
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    onCleanup = NOOP;
    if (!cb) {
      getter();
    } else if (immediate) {
      callWithAsyncErrorHandling(cb, instance, 3, [
        getter(),
        isMultiSource ? [] : void 0,
        onCleanup
      ]);
    }
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else {
      return NOOP;
    }
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some(
        (v2, i) => hasChanged(v2, oldValue[i])
      ) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect = new ReactiveEffect(getter, scheduler);
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(
      effect.run.bind(effect),
      instance && instance.suspense
    );
  } else {
    effect.run();
  }
  const unwatch = () => {
    effect.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect);
    }
  };
  if (ssrCleanup)
    ssrCleanup.push(unwatch);
  return unwatch;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString$2(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction$1(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value, seen) {
  if (!isObject$2(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, seen);
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v2) => {
      traverse(v2, seen);
    });
  } else if (isPlainObject$1(value)) {
    for (const key in value) {
      traverse(value[key], seen);
    }
  }
  return value;
}
function withDirectives(vnode, directives) {
  const internalInstance = currentRenderingInstance;
  if (internalInstance === null) {
    return vnode;
  }
  const instance = getExposeProxy(internalInstance) || internalInstance.proxy;
  const bindings = vnode.dirs || (vnode.dirs = []);
  for (let i = 0; i < directives.length; i++) {
    let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
    if (dir) {
      if (isFunction$1(dir)) {
        dir = {
          mounted: dir,
          updated: dir
        };
      }
      if (dir.deep) {
        traverse(value);
      }
      bindings.push({
        dir,
        instance,
        value,
        oldValue: void 0,
        arg,
        modifiers
      });
    }
  }
  return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
function useTransitionState() {
  const state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  onMounted(() => {
    state.isMounted = true;
  });
  onBeforeUnmount(() => {
    state.isUnmounting = true;
  });
  return state;
}
var TransitionHookValidator = [Function, Array];
var BaseTransitionPropsValidators = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  onBeforeEnter: TransitionHookValidator,
  onEnter: TransitionHookValidator,
  onAfterEnter: TransitionHookValidator,
  onEnterCancelled: TransitionHookValidator,
  onBeforeLeave: TransitionHookValidator,
  onLeave: TransitionHookValidator,
  onAfterLeave: TransitionHookValidator,
  onLeaveCancelled: TransitionHookValidator,
  onBeforeAppear: TransitionHookValidator,
  onAppear: TransitionHookValidator,
  onAfterAppear: TransitionHookValidator,
  onAppearCancelled: TransitionHookValidator
};
var BaseTransitionImpl = {
  name: `BaseTransition`,
  props: BaseTransitionPropsValidators,
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevTransitionKey;
    return () => {
      const children = slots.default && getTransitionRawChildren(slots.default(), true);
      if (!children || !children.length) {
        return;
      }
      let child = children[0];
      if (children.length > 1) {
        for (const c2 of children) {
          if (c2.type !== Comment) {
            child = c2;
            break;
          }
        }
      }
      const rawProps = toRaw(props);
      const { mode } = rawProps;
      if (state.isLeaving) {
        return emptyPlaceholder(child);
      }
      const innerChild = getKeepAliveChild(child);
      if (!innerChild) {
        return emptyPlaceholder(child);
      }
      const enterHooks = resolveTransitionHooks(
        innerChild,
        rawProps,
        state,
        instance
      );
      setTransitionHooks(innerChild, enterHooks);
      const oldChild = instance.subTree;
      const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
      let transitionKeyChanged = false;
      const { getTransitionKey } = innerChild.type;
      if (getTransitionKey) {
        const key = getTransitionKey();
        if (prevTransitionKey === void 0) {
          prevTransitionKey = key;
        } else if (key !== prevTransitionKey) {
          prevTransitionKey = key;
          transitionKeyChanged = true;
        }
      }
      if (oldInnerChild && oldInnerChild.type !== Comment && (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
        const leavingHooks = resolveTransitionHooks(
          oldInnerChild,
          rawProps,
          state,
          instance
        );
        setTransitionHooks(oldInnerChild, leavingHooks);
        if (mode === "out-in") {
          state.isLeaving = true;
          leavingHooks.afterLeave = () => {
            state.isLeaving = false;
            if (instance.update.active !== false) {
              instance.update();
            }
          };
          return emptyPlaceholder(child);
        } else if (mode === "in-out" && innerChild.type !== Comment) {
          leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
            const leavingVNodesCache = getLeavingNodesForType(
              state,
              oldInnerChild
            );
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
            el._leaveCb = () => {
              earlyRemove();
              el._leaveCb = void 0;
              delete enterHooks.delayedLeave;
            };
            enterHooks.delayedLeave = delayedLeave;
          };
        }
      }
      return child;
    };
  }
};
var BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(state, vnode) {
  const { leavingVNodes } = state;
  let leavingVNodesCache = leavingVNodes.get(vnode.type);
  if (!leavingVNodesCache) {
    leavingVNodesCache = /* @__PURE__ */ Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }
  return leavingVNodesCache;
}
function resolveTransitionHooks(vnode, props, state, instance) {
  const {
    appear,
    mode,
    persisted = false,
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onEnterCancelled,
    onBeforeLeave,
    onLeave,
    onAfterLeave,
    onLeaveCancelled,
    onBeforeAppear,
    onAppear,
    onAfterAppear,
    onAppearCancelled
  } = props;
  const key = String(vnode.key);
  const leavingVNodesCache = getLeavingNodesForType(state, vnode);
  const callHook2 = (hook, args) => {
    hook && callWithAsyncErrorHandling(
      hook,
      instance,
      9,
      args
    );
  };
  const callAsyncHook = (hook, args) => {
    const done = args[1];
    callHook2(hook, args);
    if (isArray$1(hook)) {
      if (hook.every((hook2) => hook2.length <= 1))
        done();
    } else if (hook.length <= 1) {
      done();
    }
  };
  const hooks = {
    mode,
    persisted,
    beforeEnter(el) {
      let hook = onBeforeEnter;
      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      }
      if (el._leaveCb) {
        el._leaveCb(
          true
        );
      }
      const leavingVNode = leavingVNodesCache[key];
      if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el._leaveCb) {
        leavingVNode.el._leaveCb();
      }
      callHook2(hook, [el]);
    },
    enter(el) {
      let hook = onEnter;
      let afterHook = onAfterEnter;
      let cancelHook = onEnterCancelled;
      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }
      let called = false;
      const done = el._enterCb = (cancelled) => {
        if (called)
          return;
        called = true;
        if (cancelled) {
          callHook2(cancelHook, [el]);
        } else {
          callHook2(afterHook, [el]);
        }
        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }
        el._enterCb = void 0;
      };
      if (hook) {
        callAsyncHook(hook, [el, done]);
      } else {
        done();
      }
    },
    leave(el, remove2) {
      const key2 = String(vnode.key);
      if (el._enterCb) {
        el._enterCb(
          true
        );
      }
      if (state.isUnmounting) {
        return remove2();
      }
      callHook2(onBeforeLeave, [el]);
      let called = false;
      const done = el._leaveCb = (cancelled) => {
        if (called)
          return;
        called = true;
        remove2();
        if (cancelled) {
          callHook2(onLeaveCancelled, [el]);
        } else {
          callHook2(onAfterLeave, [el]);
        }
        el._leaveCb = void 0;
        if (leavingVNodesCache[key2] === vnode) {
          delete leavingVNodesCache[key2];
        }
      };
      leavingVNodesCache[key2] = vnode;
      if (onLeave) {
        callAsyncHook(onLeave, [el, done]);
      } else {
        done();
      }
    },
    clone(vnode2) {
      return resolveTransitionHooks(vnode2, props, state, instance);
    }
  };
  return hooks;
}
function emptyPlaceholder(vnode) {
  if (isKeepAlive(vnode)) {
    vnode = cloneVNode(vnode);
    vnode.children = null;
    return vnode;
  }
}
function getKeepAliveChild(vnode) {
  return isKeepAlive(vnode) ? vnode.children ? vnode.children[0] : void 0 : vnode;
}
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
function getTransitionRawChildren(children, keepComment = false, parentKey) {
  let ret = [];
  let keyedFragmentCount = 0;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
    if (child.type === Fragment) {
      if (child.patchFlag & 128)
        keyedFragmentCount++;
      ret = ret.concat(
        getTransitionRawChildren(child.children, keepComment, key)
      );
    } else if (keepComment || child.type !== Comment) {
      ret.push(key != null ? cloneVNode(child, { key }) : child);
    }
  }
  if (keyedFragmentCount > 1) {
    for (let i = 0; i < ret.length; i++) {
      ret[i].patchFlag = -2;
    }
  }
  return ret;
}
function defineComponent(options, extraOptions) {
  return isFunction$1(options) ? (() => extend({ name: options.name }, extraOptions, { setup: options }))() : options;
}
var isAsyncWrapper = (i) => !!i.type.__asyncLoader;
var isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  }
}
var createHook = (lifecycle) => (hook, target = currentInstance) => (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target);
var onBeforeMount = createHook("bm");
var onMounted = createHook("m");
var onBeforeUpdate = createHook("bu");
var onUpdated = createHook("u");
var onBeforeUnmount = createHook("bum");
var onUnmounted = createHook("um");
var onServerPrefetch = createHook("sp");
var onRenderTriggered = createHook(
  "rtg"
);
var onRenderTracked = createHook(
  "rtc"
);
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
var COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
var NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
function resolveDynamicComponent(component) {
  if (isString$2(component)) {
    return resolveAsset(COMPONENTS, component, false) || component;
  } else {
    return component || NULL_DYNAMIC_COMPONENT;
  }
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(
        Component,
        false
      );
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize$1(camelize(name)))) {
        return Component;
      }
    }
    const res = resolve(instance[type] || Component[type], name) || resolve(instance.appContext[type], name);
    if (!res && maybeSelfReference) {
      return Component;
    }
    return res;
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize$1(camelize(name))]);
}
function renderList(source, renderItem, cache2, index) {
  let ret;
  const cached = cache2 && cache2[index];
  if (isArray$1(source) || isString$2(source)) {
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i, void 0, cached && cached[i]);
    }
  } else if (typeof source === "number") {
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
    }
  } else if (isObject$2(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(
        source,
        (item, i) => renderItem(item, i, void 0, cached && cached[i])
      );
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i, cached && cached[i]);
      }
    }
  } else {
    ret = [];
  }
  if (cache2) {
    cache2[index] = ret;
  }
  return ret;
}
function renderSlot(slots, name, props = {}, fallback, noSlotted) {
  if (currentRenderingInstance.isCE || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.isCE) {
    if (name !== "default")
      props.name = name;
    return createVNode("slot", props, fallback && fallback());
  }
  let slot = slots[name];
  if (slot && slot._c) {
    slot._d = false;
  }
  openBlock();
  const validSlotContent = slot && ensureValidVNode(slot(props));
  const rendered = createBlock(
    Fragment,
    {
      key: props.key || validSlotContent && validSlotContent.key || `_${name}`
    },
    validSlotContent || (fallback ? fallback() : []),
    validSlotContent && slots._ === 1 ? 64 : -2
  );
  if (!noSlotted && rendered.scopeId) {
    rendered.slotScopeIds = [rendered.scopeId + "-s"];
  }
  if (slot && slot._c) {
    slot._d = true;
  }
  return rendered;
}
function ensureValidVNode(vnodes) {
  return vnodes.some((child) => {
    if (!isVNode$1(child))
      return true;
    if (child.type === Comment)
      return false;
    if (child.type === Fragment && !ensureValidVNode(child.children))
      return false;
    return true;
  }) ? vnodes : null;
}
var getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
var publicPropertiesMap = extend(/* @__PURE__ */ Object.create(null), {
  $: (i) => i,
  $el: (i) => i.vnode.el,
  $data: (i) => i.data,
  $props: (i) => i.props,
  $attrs: (i) => i.attrs,
  $slots: (i) => i.slots,
  $refs: (i) => i.refs,
  $parent: (i) => getPublicInstance(i.parent),
  $root: (i) => getPublicInstance(i.root),
  $emit: (i) => i.emit,
  $options: (i) => resolveMergedOptions(i),
  $forceUpdate: (i) => i.f || (i.f = () => queueJob(i.update)),
  $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
  $watch: (i) => instanceWatch.bind(i)
});
var hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn$1(state, key);
var PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    let normalizedProps;
    if (key[0] !== "$") {
      const n2 = accessCache[key];
      if (n2 !== void 0) {
        switch (n2) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn$1(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if ((normalizedProps = instance.propsOptions[0]) && hasOwn$1(normalizedProps, key)) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn$1(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn$1(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (globalProperties = appContext.config.globalProperties, hasOwn$1(globalProperties, key)) {
      {
        return globalProperties[key];
      }
    } else
      ;
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (data !== EMPTY_OBJ && hasOwn$1(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn$1(instance.props, key)) {
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      return false;
    } else {
      {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, propsOptions }
  }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn$1(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn$1(normalizedProps, key) || hasOwn$1(ctx, key) || hasOwn$1(publicPropertiesMap, key) || hasOwn$1(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn$1(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
function normalizePropsOrEmits(props) {
  return isArray$1(props) ? props.reduce(
    (normalized, p2) => (normalized[p2] = null, normalized),
    {}
  ) : props;
}
var shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(options.beforeCreate, instance, "bc");
  }
  const {
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render: render2,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    expose,
    inheritAttrs,
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = null;
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction$1(methodHandler)) {
        {
          ctx[key] = methodHandler.bind(publicThis);
        }
      }
    }
  }
  if (dataOptions) {
    const data = dataOptions.call(publicThis, publicThis);
    if (!isObject$2(data))
      ;
    else {
      instance.data = reactive(data);
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction$1(opt) ? opt.bind(publicThis, publicThis) : isFunction$1(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      const set2 = !isFunction$1(opt) && isFunction$1(opt.set) ? opt.set.bind(publicThis) : NOOP;
      const c2 = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c2.value,
        set: (v2) => c2.value = v2
      });
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction$1(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook$1(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray$1(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray$1(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render2 && instance.render === NOOP) {
    instance.render = render2;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
  if (isArray$1(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject$2(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v2) => injected.value = v2
      });
    } else {
      ctx[key] = injected;
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(
    isArray$1(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
    instance,
    type
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString$2(raw)) {
    const handler = ctx[raw];
    if (isFunction$1(handler)) {
      watch(getter, handler);
    }
  } else if (isFunction$1(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject$2(raw)) {
    if (isArray$1(raw)) {
      raw.forEach((r2) => createWatcher(r2, ctx, publicThis, key));
    } else {
      const handler = isFunction$1(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction$1(handler)) {
        watch(getter, handler, raw);
      }
    }
  } else
    ;
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache2,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache2.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m2) => mergeOptions(resolved, m2, optionMergeStrategies, true)
      );
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject$2(base)) {
    cache2.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m2) => mergeOptions(to, m2, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose")
      ;
    else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
var internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  watch: mergeWatchOptions,
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(
      isFunction$1(to) ? to.call(this, this) : to,
      isFunction$1(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray$1(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray$1(to) && isArray$1(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
var uid$1 = 0;
function createAppAPI(render2, hydrate) {
  return function createApp(rootComponent, rootProps = null) {
    if (!isFunction$1(rootComponent)) {
      rootComponent = extend({}, rootComponent);
    }
    if (rootProps != null && !isObject$2(rootProps)) {
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new Set();
    let isMounted = false;
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v2) {
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin))
          ;
        else if (plugin && isFunction$1(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app, ...options);
        } else if (isFunction$1(plugin)) {
          installedPlugins.add(plugin);
          plugin(app, ...options);
        } else
          ;
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          }
        }
        return app;
      },
      component(name, component) {
        if (!component) {
          return context.components[name];
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        if (!directive) {
          return context.directives[name];
        }
        context.directives[name] = directive;
        return app;
      },
      mount(rootContainer, isHydrate, isSVG) {
        if (!isMounted) {
          const vnode = createVNode(
            rootComponent,
            rootProps
          );
          vnode.appContext = context;
          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render2(vnode, rootContainer, isSVG);
          }
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          return getExposeProxy(vnode.component) || vnode.component.proxy;
        }
      },
      unmount() {
        if (isMounted) {
          render2(null, app._container);
          delete app._container.__vue_app__;
        }
      },
      provide(key, value) {
        context.provides[key] = value;
        return app;
      },
      runWithContext(fn) {
        currentApp = app;
        try {
          return fn();
        } finally {
          currentApp = null;
        }
      }
    };
    return app;
  };
}
var currentApp = null;
function provide(key, value) {
  if (!currentInstance)
    ;
  else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance || currentApp) {
    const provides = instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : currentApp._context.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction$1(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else
      ;
  }
}
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  def(attrs, InternalObjectKey, 1);
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: { patchFlag }
  } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if ((optimized || patchFlag > 0) && !(patchFlag & 16)) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn$1(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || !hasOwn$1(rawProps, key) && ((kebabKey = hyphenate(key)) === key || !hasOwn$1(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && (rawPrevProps[key] !== void 0 || rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn$1(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn$1(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(
        options,
        rawCurrentProps,
        key,
        castValues[key],
        instance,
        !hasOwn$1(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn$1(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction$1(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(
            null,
            props
          );
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[0]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[1] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache2 = appContext.propsCache;
  const cached = cache2.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction$1(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$2(comp)) {
      cache2.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray$1(raw)) {
    for (let i = 0; i < raw.length; i++) {
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray$1(opt) || isFunction$1(opt) ? { type: opt } : extend({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[0] = booleanIndex > -1;
          prop[1] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn$1(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject$2(comp)) {
    cache2.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  }
  return false;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*(function|class) (\w+)/);
  return match ? match[2] : ctor === null ? "null" : "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray$1(expectedTypes)) {
    return expectedTypes.findIndex((t2) => isSameType(t2, type));
  } else if (isFunction$1(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
var isInternalKey = (key) => key[0] === "_" || key === "$stable";
var normalizeSlotValue = (value) => isArray$1(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
var normalizeSlot = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (false)
      ;
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
var normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key))
      continue;
    const value = rawSlots[key];
    if (isFunction$1(value)) {
      slots[key] = normalizeSlot(key, value, ctx);
    } else if (value != null) {
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
var normalizeVNodeSlots = (instance, children) => {
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
var initSlots = (instance, children) => {
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      instance.slots = toRaw(children);
      def(children, "_", type);
    } else {
      normalizeObjectSlots(
        children,
        instance.slots = {}
      );
    }
  } else {
    instance.slots = {};
    if (children) {
      normalizeVNodeSlots(instance, children);
    }
  }
  def(instance.slots, InternalObjectKey, 1);
};
var updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        extend(slots, children);
        if (!optimized && type === 1) {
          delete slots._;
        }
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
        delete slots[key];
      }
    }
  }
};
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray$1(rawRef)) {
    rawRef.forEach(
      (r2, i) => setRef(
        r2,
        oldRawRef && (isArray$1(oldRawRef) ? oldRawRef[i] : oldRawRef),
        parentSuspense,
        vnode,
        isUnmount
      )
    );
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref2 } = rawRef;
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  if (oldRef != null && oldRef !== ref2) {
    if (isString$2(oldRef)) {
      refs[oldRef] = null;
      if (hasOwn$1(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction$1(ref2)) {
    callWithErrorHandling(ref2, owner, 12, [value, refs]);
  } else {
    const _isString = isString$2(ref2);
    const _isRef = isRef(ref2);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? hasOwn$1(setupState, ref2) ? setupState[ref2] : refs[ref2] : ref2.value;
          if (isUnmount) {
            isArray$1(existing) && remove(existing, refValue);
          } else {
            if (!isArray$1(existing)) {
              if (_isString) {
                refs[ref2] = [refValue];
                if (hasOwn$1(setupState, ref2)) {
                  setupState[ref2] = refs[ref2];
                }
              } else {
                ref2.value = [refValue];
                if (rawRef.k)
                  refs[rawRef.k] = ref2.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref2] = value;
          if (hasOwn$1(setupState, ref2)) {
            setupState[ref2] = value;
          }
        } else if (_isRef) {
          ref2.value = value;
          if (rawRef.k)
            refs[rawRef.k] = value;
        } else
          ;
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    }
  }
}
var queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function baseCreateRenderer(options, createHydrationFns) {
  const target = getGlobalThis$1();
  target.__VUE__ = true;
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId = NOOP,
    insertStaticContent: hostInsertStaticContent
  } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref2, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, isSVG);
        }
        break;
      case Fragment:
        processFragment(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        break;
      default:
        if (shapeFlag & 1) {
          processElement(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 6) {
          processComponent(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 64) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized,
            internals
          );
        } else if (shapeFlag & 128) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized,
            internals
          );
        } else
          ;
    }
    if (ref2 != null && parentComponent) {
      setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateText(n2.children),
        container,
        anchor
      );
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateComment(n2.children || ""),
        container,
        anchor
      );
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, isSVG) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(
      n2.children,
      container,
      anchor,
      isSVG,
      n2.el,
      n2.anchor
    );
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    isSVG = isSVG || n2.type === "svg";
    if (n1 == null) {
      mountElement(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    } else {
      patchElement(
        n1,
        n2,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { type, props, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(
      vnode.type,
      isSVG,
      props && props.is,
      props
    );
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(
        vnode.children,
        el,
        null,
        parentComponent,
        parentSuspense,
        isSVG && type !== "foreignObject",
        slotScopeIds,
        optimized
      );
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "created");
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    if (props) {
      for (const key in props) {
        if (key !== "value" && !isReservedProp(key)) {
          hostPatchProp(
            el,
            key,
            null,
            props[key],
            isSVG,
            vnode.children,
            parentComponent,
            parentSuspense,
            unmountChildren
          );
        }
      }
      if ("value" in props) {
        hostPatchProp(el, "value", null, props.value);
      }
      if (vnodeHook = props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (vnode === subTree) {
        const parentVNode = parentComponent.vnode;
        setScopeId(
          el,
          parentVNode,
          parentVNode.scopeId,
          parentVNode.slotScopeIds,
          parentComponent.parent
        );
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(
        null,
        child,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    const areChildrenSVG = isSVG && n2.type !== "foreignObject";
    if (dynamicChildren) {
      patchBlockChildren(
        n1.dynamicChildren,
        dynamicChildren,
        el,
        parentComponent,
        parentSuspense,
        areChildrenSVG,
        slotScopeIds
      );
    } else if (!optimized) {
      patchChildren(
        n1,
        n2,
        el,
        null,
        parentComponent,
        parentSuspense,
        areChildrenSVG,
        slotScopeIds,
        false
      );
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(
          el,
          n2,
          oldProps,
          newProps,
          parentComponent,
          parentSuspense,
          isSVG
        );
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, isSVG);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(
                el,
                key,
                prev,
                next,
                isSVG,
                n1.children,
                parentComponent,
                parentSuspense,
                unmountChildren
              );
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(
        el,
        n2,
        oldProps,
        newProps,
        parentComponent,
        parentSuspense,
        isSVG
      );
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = oldVNode.el && (oldVNode.type === Fragment || !isSameVNodeType(oldVNode, newVNode) || oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : fallbackContainer;
      patch(
        oldVNode,
        newVNode,
        container,
        null,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        true
      );
    }
  };
  const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(
              el,
              key,
              oldProps[key],
              null,
              isSVG,
              vnode.children,
              parentComponent,
              parentSuspense,
              unmountChildren
            );
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp(key))
          continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(
            el,
            key,
            prev,
            next,
            isSVG,
            vnode.children,
            parentComponent,
            parentSuspense,
            unmountChildren
          );
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(
        n2.children,
        container,
        fragmentEndAnchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && n1.dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          container,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds
        );
        if (n2.key != null || parentComponent && n2 === parentComponent.subTree) {
          traverseStaticChildren(
            n1,
            n2,
            true
          );
        }
      } else {
        patchChildren(
          n1,
          n2,
          container,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(
          n2,
          container,
          anchor,
          isSVG,
          optimized
        );
      } else {
        mountComponent(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          optimized
        );
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    const instance = initialVNode.component = createComponentInstance(
      initialVNode,
      parentComponent,
      parentSuspense
    );
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      setupComponent(instance);
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
      return;
    }
    setupRenderEffect(
      instance,
      initialVNode,
      container,
      anchor,
      parentSuspense,
      isSVG,
      optimized
    );
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        updateComponentPreRender(instance, n2, optimized);
        return;
      } else {
        instance.next = n2;
        invalidateJob(instance.update);
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m: m2, parent } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            instance.subTree = renderComponentRoot(instance);
            hydrateNode(
              el,
              instance.subTree,
              instance,
              parentSuspense,
              null
            );
          };
          if (isAsyncWrapperVNode) {
            initialVNode.type.__asyncLoader().then(
              () => !instance.isUnmounted && hydrateSubTree()
            );
          } else {
            hydrateSubTree();
          }
        } else {
          const subTree = instance.subTree = renderComponentRoot(instance);
          patch(
            null,
            subTree,
            container,
            anchor,
            instance,
            parentSuspense,
            isSVG
          );
          initialVNode.el = subTree.el;
        }
        if (m2) {
          queuePostRenderEffect(m2, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
            parentSuspense
          );
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u: u2, parent, vnode } = instance;
        let originNext = next;
        let vnodeHook;
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        const nextTree = renderComponentRoot(instance);
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        patch(
          prevTree,
          nextTree,
          hostParentNode(prevTree.el),
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          isSVG
        );
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u2) {
          queuePostRenderEffect(u2, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, next, vnode),
            parentSuspense
          );
        }
      }
    };
    const effect = instance.effect = new ReactiveEffect(
      componentUpdateFn,
      () => queueJob(update),
      instance.scope
    );
    const update = instance.update = () => effect.run();
    update.id = instance.uid;
    toggleRecurse(instance, true);
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs();
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(
        c1[i],
        nextChild,
        container,
        null,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    }
    if (oldLength > newLength) {
      unmountChildren(
        c1,
        parentComponent,
        parentSuspense,
        true,
        false,
        commonLength
      );
    } else {
      mountChildren(
        c2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized,
        commonLength
      );
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(
            null,
            c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]),
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j2;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++)
        newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j2 = s2; j2 <= e2; j2++) {
            if (newIndexToOldIndexMap[j2 - s2] === 0 && isSameVNodeType(prevChild, c2[j2])) {
              newIndex = j2;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(
            prevChild,
            c2[newIndex],
            container,
            null,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j2 = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(
            null,
            nextChild,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        } else if (moved) {
          if (j2 < 0 || i !== increasingNewIndexSequence[j2]) {
            move(nextChild, container, anchor, 2);
          } else {
            j2--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove22 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove22();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove22, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const {
      type,
      props,
      ref: ref2,
      children,
      dynamicChildren,
      shapeFlag,
      patchFlag,
      dirs
    } = vnode;
    if (ref2 != null) {
      setRef(ref2, null, parentSuspense, vnode, true);
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(
          vnode,
          parentComponent,
          parentSuspense,
          optimized,
          internals,
          doRemove
        );
      } else if (dynamicChildren && (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(
          dynamicChildren,
          parentComponent,
          parentSuspense,
          false,
          true
        );
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    const { bum, scope, update, subTree, um } = instance;
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (update) {
      update.active = false;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    return hostNextSibling(vnode.anchor || vnode.el);
  };
  const render2 = (vnode, container, isSVG) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null, null, isSVG);
    }
    flushPreFlushCbs();
    flushPostFlushCbs();
    container._vnode = vnode;
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;
  if (createHydrationFns) {
    [hydrate, hydrateNode] = createHydrationFns(
      internals
    );
  }
  return {
    render: render2,
    hydrate,
    createApp: createAppAPI(render2, hydrate)
  };
}
function toggleRecurse({ effect, update }, allowed) {
  effect.allowRecurse = update.allowRecurse = allowed;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray$1(ch1) && isArray$1(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow)
          traverseStaticChildren(c1, c2);
      }
      if (c2.type === Text) {
        c2.el = c1.el;
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i, j2, u2, v2, c2;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j2 = result[result.length - 1];
      if (arr[j2] < arrI) {
        p2[i] = j2;
        result.push(i);
        continue;
      }
      u2 = 0;
      v2 = result.length - 1;
      while (u2 < v2) {
        c2 = u2 + v2 >> 1;
        if (arr[result[c2]] < arrI) {
          u2 = c2 + 1;
        } else {
          v2 = c2;
        }
      }
      if (arrI < arr[result[u2]]) {
        if (u2 > 0) {
          p2[i] = result[u2 - 1];
        }
        result[u2] = i;
      }
    }
  }
  u2 = result.length;
  v2 = result[u2 - 1];
  while (u2-- > 0) {
    result[u2] = v2;
    v2 = p2[v2];
  }
  return result;
}
var isTeleport = (type) => type.__isTeleport;
var Fragment = Symbol.for("v-fgt");
var Text = Symbol.for("v-txt");
var Comment = Symbol.for("v-cmt");
var Static = Symbol.for("v-stc");
var blockStack = [];
var currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
var isBlockTreeEnabled = 1;
function setBlockTracking(value) {
  isBlockTreeEnabled += value;
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(
    createBaseVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      true
    )
  );
}
function createBlock(type, props, children, patchFlag, dynamicProps) {
  return setupBlock(
    createVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      true
    )
  );
}
function isVNode$1(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}
var InternalObjectKey = `__vInternal`;
var normalizeKey = ({ key }) => key != null ? key : null;
var normalizeRef = ({
  ref: ref2,
  ref_key,
  ref_for
}) => {
  if (typeof ref2 === "number") {
    ref2 = "" + ref2;
  }
  return ref2 != null ? isString$2(ref2) || isRef(ref2) || isFunction$1(ref2) ? { i: currentRenderingInstance, r: ref2, k: ref_key, f: !!ref_for } : ref2 : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString$2(children) ? 8 : 16;
  }
  if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock && (vnode.patchFlag > 0 || shapeFlag & 6) && vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
var createVNode = _createVNode;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    type = Comment;
  }
  if (isVNode$1(type)) {
    const cloned = cloneVNode(
      type,
      props,
      true
    );
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag |= -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString$2(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject$2(style)) {
      if (isProxy(style) && !isArray$1(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString$2(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject$2(type) ? 4 : isFunction$1(type) ? 2 : 0;
  return createBaseVNode(
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    isBlockNode,
    true
  );
}
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false) {
  const { props, ref: ref2, patchFlag, children } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? mergeRef && ref2 ? isArray$1(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref2,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx,
    ce: vnode.ce
  };
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function createCommentVNode(text = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray$1(child)) {
    return createVNode(
      Fragment,
      null,
      child.slice()
    );
  } else if (typeof child === "object") {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray$1(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !(InternalObjectKey in children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction$1(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray$1(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
var emptyAppContext = createAppContext();
var uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new EffectScope(
      true
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    components: null,
    directives: null,
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    emit: null,
    emitted: null,
    propsDefaults: EMPTY_OBJ,
    inheritAttrs: type.inheritAttrs,
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
var currentInstance = null;
var getCurrentInstance = () => currentInstance || currentRenderingInstance;
var internalSetCurrentInstance;
var globalCurrentInstanceSetters;
var settersKey = "__VUE_INSTANCE_SETTERS__";
{
  if (!(globalCurrentInstanceSetters = getGlobalThis$1()[settersKey])) {
    globalCurrentInstanceSetters = getGlobalThis$1()[settersKey] = [];
  }
  globalCurrentInstanceSetters.push((i) => currentInstance = i);
  internalSetCurrentInstance = (instance) => {
    if (globalCurrentInstanceSetters.length > 1) {
      globalCurrentInstanceSetters.forEach((s2) => s2(instance));
    } else {
      globalCurrentInstanceSetters[0](instance);
    }
  };
}
var setCurrentInstance = (instance) => {
  internalSetCurrentInstance(instance);
  instance.scope.on();
};
var unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
var isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  const { setup } = Component;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      0,
      [instance.props, setupContext]
    );
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch((e2) => {
          handleError(e2, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction$1(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject$2(setupResult)) {
    instance.setupState = proxyRefs(setupResult);
  } else
    ;
  finishComponentSetup(instance, isSSR);
}
var compile$1;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile$1 && !Component.render) {
      const template = Component.template || resolveMergedOptions(instance).template;
      if (template) {
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        const finalCompilerOptions = extend(
          extend(
            {
              isCustomElement,
              delimiters
            },
            compilerOptions
          ),
          componentCompilerOptions
        );
        Component.render = compile$1(template, finalCompilerOptions);
      }
    }
    instance.render = Component.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions(instance);
    resetTracking();
    unsetCurrentInstance();
  }
}
function getAttrsProxy(instance) {
  return instance.attrsProxy || (instance.attrsProxy = new Proxy(
    instance.attrs,
    {
      get(target, key) {
        track(instance, "get", "$attrs");
        return target[key];
      }
    }
  ));
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    instance.exposed = exposed || {};
  };
  {
    return {
      get attrs() {
        return getAttrsProxy(instance);
      },
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  }
}
function getComponentName(Component, includeInferred = true) {
  return isFunction$1(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function isClassComponent(value) {
  return isFunction$1(value) && "__vccOpts" in value;
}
var computed = (getterOrOptions, debugOptions) => {
  return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
function h$1(type, propsOrChildren, children) {
  const l = arguments.length;
  if (l === 2) {
    if (isObject$2(propsOrChildren) && !isArray$1(propsOrChildren)) {
      if (isVNode$1(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      }
      return createVNode(type, propsOrChildren);
    } else {
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    } else if (l === 3 && isVNode$1(children)) {
      children = [children];
    }
    return createVNode(type, propsOrChildren, children);
  }
}
var ssrContextKey = Symbol.for("v-scx");
var useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    return ctx;
  }
};
var version = "3.3.4";
var svgNS = "http://www.w3.org/2000/svg";
var doc = typeof document !== "undefined" ? document : null;
var templateContainer = doc && doc.createElement("template");
var nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, isSVG, is, props) => {
    const el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? { is } : void 0);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  insertStaticContent(content, parent, anchor, isSVG, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling))
          break;
      }
    } else {
      templateContainer.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
      const template = templateContainer.content;
      if (isSVG) {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      before ? before.nextSibling : parent.firstChild,
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
function patchClass(el, value, isSVG) {
  const transitionClasses = el._vtc;
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString$2(next);
  if (next && !isCssString) {
    if (prev && !isString$2(prev)) {
      for (const key in prev) {
        if (next[key] == null) {
          setStyle(style, key, "");
        }
      }
    }
    for (const key in next) {
      setStyle(style, key, next[key]);
    }
  } else {
    const currentDisplay = style.display;
    if (isCssString) {
      if (prev !== next) {
        style.cssText = next;
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
    if ("_vod" in el) {
      style.display = currentDisplay;
    }
  }
}
var importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray$1(val)) {
    val.forEach((v2) => setStyle(style, name, v2));
  } else {
    if (val == null)
      val = "";
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(
          hyphenate(prefixed),
          val.replace(importantRE, ""),
          "important"
        );
      } else {
        style[prefixed] = val;
      }
    }
  }
}
var prefixes = ["Webkit", "Moz", "ms"];
var prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize$1(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
var xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    const isBoolean2 = isSpecialBooleanAttr(key);
    if (value == null || isBoolean2 && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean2 ? "" : value);
    }
  }
}
function patchDOMProp(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === "innerHTML" || key === "textContent") {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }
    el[key] = value == null ? "" : value;
    return;
  }
  const tag = el.tagName;
  if (key === "value" && tag !== "PROGRESS" && !tag.includes("-")) {
    el._value = value;
    const oldValue = tag === "OPTION" ? el.getAttribute("value") : el.value;
    const newValue = value == null ? "" : value;
    if (oldValue !== newValue) {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value = includeBooleanAttr(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e2) {
  }
  needRemove && el.removeAttribute(key);
}
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el._vei || (el._vei = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(nextValue, instance);
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
var optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m2;
    while (m2 = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m2[0].length);
      options[m2[0].toLowerCase()] = true;
    }
  }
  const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
  return [event, options];
}
var cachedNow = 0;
var p = Promise.resolve();
var getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
  const invoker = (e2) => {
    if (!e2._vts) {
      e2._vts = Date.now();
    } else if (e2._vts <= invoker.attached) {
      return;
    }
    callWithAsyncErrorHandling(
      patchStopImmediatePropagation(e2, invoker.value),
      instance,
      5,
      [e2]
    );
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e2, value) {
  if (isArray$1(value)) {
    const originalStop = e2.stopImmediatePropagation;
    e2.stopImmediatePropagation = () => {
      originalStop.call(e2);
      e2._stopped = true;
    };
    return value.map((fn) => (e22) => !e22._stopped && fn && fn(e22));
  } else {
    return value;
  }
}
var nativeOnRE = /^on[a-z]/;
var patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(
      el,
      key,
      nextValue,
      prevChildren,
      parentComponent,
      parentSuspense,
      unmountChildren
    );
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && nativeOnRE.test(key) && isFunction$1(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (nativeOnRE.test(key) && isString$2(value)) {
    return false;
  }
  return key in el;
}
function defineCustomElement(options, hydrate2) {
  const Comp = defineComponent(options);
  class VueCustomElement extends VueElement {
    constructor(initialProps) {
      super(Comp, initialProps, hydrate2);
    }
  }
  VueCustomElement.def = Comp;
  return VueCustomElement;
}
var BaseClass = typeof HTMLElement !== "undefined" ? HTMLElement : class {
};
var VueElement = class _VueElement extends BaseClass {
  constructor(_def, _props = {}, hydrate2) {
    super();
    this._def = _def;
    this._props = _props;
    this._instance = null;
    this._connected = false;
    this._resolved = false;
    this._numberProps = null;
    if (this.shadowRoot && hydrate2) {
      hydrate2(this._createVNode(), this.shadowRoot);
    } else {
      this.attachShadow({ mode: "open" });
      if (!this._def.__asyncLoader) {
        this._resolveProps(this._def);
      }
    }
  }
  connectedCallback() {
    this._connected = true;
    if (!this._instance) {
      if (this._resolved) {
        this._update();
      } else {
        this._resolveDef();
      }
    }
  }
  disconnectedCallback() {
    this._connected = false;
    nextTick(() => {
      if (!this._connected) {
        render(null, this.shadowRoot);
        this._instance = null;
      }
    });
  }
  _resolveDef() {
    this._resolved = true;
    for (let i = 0; i < this.attributes.length; i++) {
      this._setAttr(this.attributes[i].name);
    }
    new MutationObserver((mutations) => {
      for (const m2 of mutations) {
        this._setAttr(m2.attributeName);
      }
    }).observe(this, { attributes: true });
    const resolve2 = (def2, isAsync = false) => {
      const { props, styles } = def2;
      let numberProps;
      if (props && !isArray$1(props)) {
        for (const key in props) {
          const opt = props[key];
          if (opt === Number || opt && opt.type === Number) {
            if (key in this._props) {
              this._props[key] = toNumber(this._props[key]);
            }
            (numberProps || (numberProps = /* @__PURE__ */ Object.create(null)))[camelize(key)] = true;
          }
        }
      }
      this._numberProps = numberProps;
      if (isAsync) {
        this._resolveProps(def2);
      }
      this._applyStyles(styles);
      this._update();
    };
    const asyncDef = this._def.__asyncLoader;
    if (asyncDef) {
      asyncDef().then((def2) => resolve2(def2, true));
    } else {
      resolve2(this._def);
    }
  }
  _resolveProps(def2) {
    const { props } = def2;
    const declaredPropKeys = isArray$1(props) ? props : Object.keys(props || {});
    for (const key of Object.keys(this)) {
      if (key[0] !== "_" && declaredPropKeys.includes(key)) {
        this._setProp(key, this[key], true, false);
      }
    }
    for (const key of declaredPropKeys.map(camelize)) {
      Object.defineProperty(this, key, {
        get() {
          return this._getProp(key);
        },
        set(val) {
          this._setProp(key, val);
        }
      });
    }
  }
  _setAttr(key) {
    let value = this.getAttribute(key);
    const camelKey = camelize(key);
    if (this._numberProps && this._numberProps[camelKey]) {
      value = toNumber(value);
    }
    this._setProp(camelKey, value, false);
  }
  _getProp(key) {
    return this._props[key];
  }
  _setProp(key, val, shouldReflect = true, shouldUpdate = true) {
    if (val !== this._props[key]) {
      this._props[key] = val;
      if (shouldUpdate && this._instance) {
        this._update();
      }
      if (shouldReflect) {
        if (val === true) {
          this.setAttribute(hyphenate(key), "");
        } else if (typeof val === "string" || typeof val === "number") {
          this.setAttribute(hyphenate(key), val + "");
        } else if (!val) {
          this.removeAttribute(hyphenate(key));
        }
      }
    }
  }
  _update() {
    render(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const vnode = createVNode(this._def, extend({}, this._props));
    if (!this._instance) {
      vnode.ce = (instance) => {
        this._instance = instance;
        instance.isCE = true;
        const dispatch = (event, args) => {
          this.dispatchEvent(
            new CustomEvent(event, {
              detail: args
            })
          );
        };
        instance.emit = (event, ...args) => {
          dispatch(event, args);
          if (hyphenate(event) !== event) {
            dispatch(hyphenate(event), args);
          }
        };
        let parent = this;
        while (parent = parent && (parent.parentNode || parent.host)) {
          if (parent instanceof _VueElement) {
            instance.parent = parent._instance;
            instance.provides = parent._instance.provides;
            break;
          }
        }
      };
    }
    return vnode;
  }
  _applyStyles(styles) {
    if (styles) {
      styles.forEach((css) => {
        const s2 = document.createElement("style");
        s2.textContent = css;
        this.shadowRoot.appendChild(s2);
      });
    }
  }
};
var TRANSITION = "transition";
var ANIMATION = "animation";
var Transition = (props, { slots }) => h$1(BaseTransition, resolveTransitionProps(props), slots);
Transition.displayName = "Transition";
var DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
Transition.props = extend(
  {},
  BaseTransitionPropsValidators,
  DOMTransitionPropsValidators
);
var callHook = (hook, args = []) => {
  if (isArray$1(hook)) {
    hook.forEach((h2) => h2(...args));
  } else if (hook) {
    hook(...args);
  }
};
var hasExplicitCallback = (hook) => {
  return hook ? isArray$1(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
};
function resolveTransitionProps(rawProps) {
  const baseProps = {};
  for (const key in rawProps) {
    if (!(key in DOMTransitionPropsValidators)) {
      baseProps[key] = rawProps[key];
    }
  }
  if (rawProps.css === false) {
    return baseProps;
  }
  const {
    name = "v",
    type,
    duration,
    enterFromClass = `${name}-enter-from`,
    enterActiveClass = `${name}-enter-active`,
    enterToClass = `${name}-enter-to`,
    appearFromClass = enterFromClass,
    appearActiveClass = enterActiveClass,
    appearToClass = enterToClass,
    leaveFromClass = `${name}-leave-from`,
    leaveActiveClass = `${name}-leave-active`,
    leaveToClass = `${name}-leave-to`
  } = rawProps;
  const durations = normalizeDuration(duration);
  const enterDuration = durations && durations[0];
  const leaveDuration = durations && durations[1];
  const {
    onBeforeEnter,
    onEnter,
    onEnterCancelled,
    onLeave,
    onLeaveCancelled,
    onBeforeAppear = onBeforeEnter,
    onAppear = onEnter,
    onAppearCancelled = onEnterCancelled
  } = baseProps;
  const finishEnter = (el, isAppear, done) => {
    removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
    removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
    done && done();
  };
  const finishLeave = (el, done) => {
    el._isLeaving = false;
    removeTransitionClass(el, leaveFromClass);
    removeTransitionClass(el, leaveToClass);
    removeTransitionClass(el, leaveActiveClass);
    done && done();
  };
  const makeEnterHook = (isAppear) => {
    return (el, done) => {
      const hook = isAppear ? onAppear : onEnter;
      const resolve2 = () => finishEnter(el, isAppear, done);
      callHook(hook, [el, resolve2]);
      nextFrame(() => {
        removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
        addTransitionClass(el, isAppear ? appearToClass : enterToClass);
        if (!hasExplicitCallback(hook)) {
          whenTransitionEnds(el, type, enterDuration, resolve2);
        }
      });
    };
  };
  return extend(baseProps, {
    onBeforeEnter(el) {
      callHook(onBeforeEnter, [el]);
      addTransitionClass(el, enterFromClass);
      addTransitionClass(el, enterActiveClass);
    },
    onBeforeAppear(el) {
      callHook(onBeforeAppear, [el]);
      addTransitionClass(el, appearFromClass);
      addTransitionClass(el, appearActiveClass);
    },
    onEnter: makeEnterHook(false),
    onAppear: makeEnterHook(true),
    onLeave(el, done) {
      el._isLeaving = true;
      const resolve2 = () => finishLeave(el, done);
      addTransitionClass(el, leaveFromClass);
      forceReflow();
      addTransitionClass(el, leaveActiveClass);
      nextFrame(() => {
        if (!el._isLeaving) {
          return;
        }
        removeTransitionClass(el, leaveFromClass);
        addTransitionClass(el, leaveToClass);
        if (!hasExplicitCallback(onLeave)) {
          whenTransitionEnds(el, type, leaveDuration, resolve2);
        }
      });
      callHook(onLeave, [el, resolve2]);
    },
    onEnterCancelled(el) {
      finishEnter(el, false);
      callHook(onEnterCancelled, [el]);
    },
    onAppearCancelled(el) {
      finishEnter(el, true);
      callHook(onAppearCancelled, [el]);
    },
    onLeaveCancelled(el) {
      finishLeave(el);
      callHook(onLeaveCancelled, [el]);
    }
  });
}
function normalizeDuration(duration) {
  if (duration == null) {
    return null;
  } else if (isObject$2(duration)) {
    return [NumberOf(duration.enter), NumberOf(duration.leave)];
  } else {
    const n2 = NumberOf(duration);
    return [n2, n2];
  }
}
function NumberOf(val) {
  const res = toNumber(val);
  return res;
}
function addTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c2) => c2 && el.classList.add(c2));
  (el._vtc || (el._vtc = /* @__PURE__ */ new Set())).add(cls);
}
function removeTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c2) => c2 && el.classList.remove(c2));
  const { _vtc } = el;
  if (_vtc) {
    _vtc.delete(cls);
    if (!_vtc.size) {
      el._vtc = void 0;
    }
  }
}
function nextFrame(cb) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
}
var endId = 0;
function whenTransitionEnds(el, expectedType, explicitTimeout, resolve2) {
  const id = el._endId = ++endId;
  const resolveIfNotStale = () => {
    if (id === el._endId) {
      resolve2();
    }
  };
  if (explicitTimeout) {
    return setTimeout(resolveIfNotStale, explicitTimeout);
  }
  const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
  if (!type) {
    return resolve2();
  }
  const endEvent = type + "end";
  let ended = 0;
  const end = () => {
    el.removeEventListener(endEvent, onEnd);
    resolveIfNotStale();
  };
  const onEnd = (e2) => {
    if (e2.target === el && ++ended >= propCount) {
      end();
    }
  };
  setTimeout(() => {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(endEvent, onEnd);
}
function getTransitionInfo(el, expectedType) {
  const styles = window.getComputedStyle(el);
  const getStyleProperties = (key) => (styles[key] || "").split(", ");
  const transitionDelays = getStyleProperties(`${TRANSITION}Delay`);
  const transitionDurations = getStyleProperties(`${TRANSITION}Duration`);
  const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
  const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
  const animationTimeout = getTimeout(animationDelays, animationDurations);
  let type = null;
  let timeout = 0;
  let propCount = 0;
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  const hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(
    getStyleProperties(`${TRANSITION}Property`).toString()
  );
  return {
    type,
    timeout,
    propCount,
    hasTransform
  };
}
function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
}
function toMs(s2) {
  return Number(s2.slice(0, -1).replace(",", ".")) * 1e3;
}
function forceReflow() {
  return document.body.offsetHeight;
}
var getModelAssigner = (vnode) => {
  const fn = vnode.props["onUpdate:modelValue"] || false;
  return isArray$1(fn) ? (value) => invokeArrayFns(fn, value) : fn;
};
function onCompositionStart(e2) {
  e2.target.composing = true;
}
function onCompositionEnd(e2) {
  const target = e2.target;
  if (target.composing) {
    target.composing = false;
    target.dispatchEvent(new Event("input"));
  }
}
var vModelText = {
  created(el, { modifiers: { lazy, trim, number: number2 } }, vnode) {
    el._assign = getModelAssigner(vnode);
    const castToNumber = number2 || vnode.props && vnode.props.type === "number";
    addEventListener(el, lazy ? "change" : "input", (e2) => {
      if (e2.target.composing)
        return;
      let domValue = el.value;
      if (trim) {
        domValue = domValue.trim();
      }
      if (castToNumber) {
        domValue = looseToNumber(domValue);
      }
      el._assign(domValue);
    });
    if (trim) {
      addEventListener(el, "change", () => {
        el.value = el.value.trim();
      });
    }
    if (!lazy) {
      addEventListener(el, "compositionstart", onCompositionStart);
      addEventListener(el, "compositionend", onCompositionEnd);
      addEventListener(el, "change", onCompositionEnd);
    }
  },
  mounted(el, { value }) {
    el.value = value == null ? "" : value;
  },
  beforeUpdate(el, { value, modifiers: { lazy, trim, number: number2 } }, vnode) {
    el._assign = getModelAssigner(vnode);
    if (el.composing)
      return;
    if (document.activeElement === el && el.type !== "range") {
      if (lazy) {
        return;
      }
      if (trim && el.value.trim() === value) {
        return;
      }
      if ((number2 || el.type === "number") && looseToNumber(el.value) === value) {
        return;
      }
    }
    const newValue = value == null ? "" : value;
    if (el.value !== newValue) {
      el.value = newValue;
    }
  }
};
var vModelCheckbox = {
  deep: true,
  created(el, _2, vnode) {
    el._assign = getModelAssigner(vnode);
    addEventListener(el, "change", () => {
      const modelValue = el._modelValue;
      const elementValue = getValue(el);
      const checked = el.checked;
      const assign2 = el._assign;
      if (isArray$1(modelValue)) {
        const index = looseIndexOf(modelValue, elementValue);
        const found = index !== -1;
        if (checked && !found) {
          assign2(modelValue.concat(elementValue));
        } else if (!checked && found) {
          const filtered = [...modelValue];
          filtered.splice(index, 1);
          assign2(filtered);
        }
      } else if (isSet(modelValue)) {
        const cloned = new Set(modelValue);
        if (checked) {
          cloned.add(elementValue);
        } else {
          cloned.delete(elementValue);
        }
        assign2(cloned);
      } else {
        assign2(getCheckboxValue(el, checked));
      }
    });
  },
  mounted: setChecked,
  beforeUpdate(el, binding, vnode) {
    el._assign = getModelAssigner(vnode);
    setChecked(el, binding, vnode);
  }
};
function setChecked(el, { value, oldValue }, vnode) {
  el._modelValue = value;
  if (isArray$1(value)) {
    el.checked = looseIndexOf(value, vnode.props.value) > -1;
  } else if (isSet(value)) {
    el.checked = value.has(vnode.props.value);
  } else if (value !== oldValue) {
    el.checked = looseEqual(value, getCheckboxValue(el, true));
  }
}
var vModelRadio = {
  created(el, { value }, vnode) {
    el.checked = looseEqual(value, vnode.props.value);
    el._assign = getModelAssigner(vnode);
    addEventListener(el, "change", () => {
      el._assign(getValue(el));
    });
  },
  beforeUpdate(el, { value, oldValue }, vnode) {
    el._assign = getModelAssigner(vnode);
    if (value !== oldValue) {
      el.checked = looseEqual(value, vnode.props.value);
    }
  }
};
var vModelSelect = {
  deep: true,
  created(el, { value, modifiers: { number: number2 } }, vnode) {
    const isSetModel = isSet(value);
    addEventListener(el, "change", () => {
      const selectedVal = Array.prototype.filter.call(el.options, (o2) => o2.selected).map(
        (o2) => number2 ? looseToNumber(getValue(o2)) : getValue(o2)
      );
      el._assign(
        el.multiple ? isSetModel ? new Set(selectedVal) : selectedVal : selectedVal[0]
      );
    });
    el._assign = getModelAssigner(vnode);
  },
  mounted(el, { value }) {
    setSelected(el, value);
  },
  beforeUpdate(el, _binding, vnode) {
    el._assign = getModelAssigner(vnode);
  },
  updated(el, { value }) {
    setSelected(el, value);
  }
};
function setSelected(el, value) {
  const isMultiple = el.multiple;
  if (isMultiple && !isArray$1(value) && !isSet(value)) {
    return;
  }
  for (let i = 0, l = el.options.length; i < l; i++) {
    const option = el.options[i];
    const optionValue = getValue(option);
    if (isMultiple) {
      if (isArray$1(value)) {
        option.selected = looseIndexOf(value, optionValue) > -1;
      } else {
        option.selected = value.has(optionValue);
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i)
          el.selectedIndex = i;
        return;
      }
    }
  }
  if (!isMultiple && el.selectedIndex !== -1) {
    el.selectedIndex = -1;
  }
}
function getValue(el) {
  return "_value" in el ? el._value : el.value;
}
function getCheckboxValue(el, checked) {
  const key = checked ? "_trueValue" : "_falseValue";
  return key in el ? el[key] : checked;
}
var vModelDynamic = {
  created(el, binding, vnode) {
    callModelHook(el, binding, vnode, null, "created");
  },
  mounted(el, binding, vnode) {
    callModelHook(el, binding, vnode, null, "mounted");
  },
  beforeUpdate(el, binding, vnode, prevVNode) {
    callModelHook(el, binding, vnode, prevVNode, "beforeUpdate");
  },
  updated(el, binding, vnode, prevVNode) {
    callModelHook(el, binding, vnode, prevVNode, "updated");
  }
};
function resolveDynamicModel(tagName, type) {
  switch (tagName) {
    case "SELECT":
      return vModelSelect;
    case "TEXTAREA":
      return vModelText;
    default:
      switch (type) {
        case "checkbox":
          return vModelCheckbox;
        case "radio":
          return vModelRadio;
        default:
          return vModelText;
      }
  }
}
function callModelHook(el, binding, vnode, prevVNode, hook) {
  const modelToUse = resolveDynamicModel(
    el.tagName,
    vnode.props && vnode.props.type
  );
  const fn = modelToUse[hook];
  fn && fn(el, binding, vnode, prevVNode);
}
var systemModifiers = ["ctrl", "shift", "alt", "meta"];
var modifierGuards = {
  stop: (e2) => e2.stopPropagation(),
  prevent: (e2) => e2.preventDefault(),
  self: (e2) => e2.target !== e2.currentTarget,
  ctrl: (e2) => !e2.ctrlKey,
  shift: (e2) => !e2.shiftKey,
  alt: (e2) => !e2.altKey,
  meta: (e2) => !e2.metaKey,
  left: (e2) => "button" in e2 && e2.button !== 0,
  middle: (e2) => "button" in e2 && e2.button !== 1,
  right: (e2) => "button" in e2 && e2.button !== 2,
  exact: (e2, modifiers) => systemModifiers.some((m2) => e2[`${m2}Key`] && !modifiers.includes(m2))
};
var withModifiers = (fn, modifiers) => {
  return (event, ...args) => {
    for (let i = 0; i < modifiers.length; i++) {
      const guard = modifierGuards[modifiers[i]];
      if (guard && guard(event, modifiers))
        return;
    }
    return fn(event, ...args);
  };
};
var vShow = {
  beforeMount(el, { value }, { transition }) {
    el._vod = el.style.display === "none" ? "" : el.style.display;
    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el);
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    if (!value === !oldValue)
      return;
    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setDisplay(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value);
    }
  },
  beforeUnmount(el, { value }) {
    setDisplay(el, value);
  }
};
function setDisplay(el, value) {
  el.style.display = value ? el._vod : "none";
}
var rendererOptions = extend({ patchProp }, nodeOps);
var renderer;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
var render = (...args) => {
  ensureRenderer().render(...args);
};
function assign$2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      target[key] = source[key];
    }
  }
  return target;
}
var defaultConverter = {
  read: function(value) {
    if (value[0] === '"') {
      value = value.slice(1, -1);
    }
    return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
  },
  write: function(value) {
    return encodeURIComponent(value).replace(
      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
      decodeURIComponent
    );
  }
};
function init(converter, defaultAttributes) {
  function set2(name, value, attributes) {
    if (typeof document === "undefined") {
      return;
    }
    attributes = assign$2({}, defaultAttributes, attributes);
    if (typeof attributes.expires === "number") {
      attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
    }
    if (attributes.expires) {
      attributes.expires = attributes.expires.toUTCString();
    }
    name = encodeURIComponent(name).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
    var stringifiedAttributes = "";
    for (var attributeName in attributes) {
      if (!attributes[attributeName]) {
        continue;
      }
      stringifiedAttributes += "; " + attributeName;
      if (attributes[attributeName] === true) {
        continue;
      }
      stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
    }
    return document.cookie = name + "=" + converter.write(value, name) + stringifiedAttributes;
  }
  function get2(name) {
    if (typeof document === "undefined" || arguments.length && !name) {
      return;
    }
    var cookies = document.cookie ? document.cookie.split("; ") : [];
    var jar = {};
    for (var i = 0; i < cookies.length; i++) {
      var parts = cookies[i].split("=");
      var value = parts.slice(1).join("=");
      try {
        var found = decodeURIComponent(parts[0]);
        jar[found] = converter.read(value, found);
        if (name === found) {
          break;
        }
      } catch (e2) {
      }
    }
    return name ? jar[name] : jar;
  }
  return Object.create(
    {
      set: set2,
      get: get2,
      remove: function(name, attributes) {
        set2(
          name,
          "",
          assign$2({}, attributes, {
            expires: -1
          })
        );
      },
      withAttributes: function(attributes) {
        return init(this.converter, assign$2({}, this.attributes, attributes));
      },
      withConverter: function(converter2) {
        return init(assign$2({}, this.converter, converter2), this.attributes);
      }
    },
    {
      attributes: { value: Object.freeze(defaultAttributes) },
      converter: { value: Object.freeze(converter) }
    }
  );
}
var api = init(defaultConverter, { path: "/" });
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var uaParser = { exports: {} };
(function(module, exports) {
  (function(window2, undefined$1) {
    var LIBVERSION = "1.0.35", EMPTY = "", UNKNOWN = "?", FUNC_TYPE = "function", UNDEF_TYPE = "undefined", OBJ_TYPE = "object", STR_TYPE = "string", MAJOR = "major", MODEL = "model", NAME = "name", TYPE = "type", VENDOR = "vendor", VERSION2 = "version", ARCHITECTURE = "architecture", CONSOLE = "console", MOBILE = "mobile", TABLET = "tablet", SMARTTV = "smarttv", WEARABLE = "wearable", EMBEDDED = "embedded", UA_MAX_LENGTH = 350;
    var AMAZON = "Amazon", APPLE = "Apple", ASUS = "ASUS", BLACKBERRY = "BlackBerry", BROWSER = "Browser", CHROME = "Chrome", EDGE = "Edge", FIREFOX = "Firefox", GOOGLE = "Google", HUAWEI = "Huawei", LG = "LG", MICROSOFT = "Microsoft", MOTOROLA = "Motorola", OPERA = "Opera", SAMSUNG = "Samsung", SHARP = "Sharp", SONY = "Sony", XIAOMI = "Xiaomi", ZEBRA = "Zebra", FACEBOOK = "Facebook", CHROMIUM_OS = "Chromium OS", MAC_OS = "Mac OS";
    var extend2 = function(regexes2, extensions) {
      var mergedRegexes = {};
      for (var i in regexes2) {
        if (extensions[i] && extensions[i].length % 2 === 0) {
          mergedRegexes[i] = extensions[i].concat(regexes2[i]);
        } else {
          mergedRegexes[i] = regexes2[i];
        }
      }
      return mergedRegexes;
    }, enumerize = function(arr) {
      var enums = {};
      for (var i = 0; i < arr.length; i++) {
        enums[arr[i].toUpperCase()] = arr[i];
      }
      return enums;
    }, has2 = function(str1, str2) {
      return typeof str1 === STR_TYPE ? lowerize(str2).indexOf(lowerize(str1)) !== -1 : false;
    }, lowerize = function(str) {
      return str.toLowerCase();
    }, majorize = function(version2) {
      return typeof version2 === STR_TYPE ? version2.replace(/[^\d\.]/g, EMPTY).split(".")[0] : undefined$1;
    }, trim = function(str, len) {
      if (typeof str === STR_TYPE) {
        str = str.replace(/^\s\s*/, EMPTY);
        return typeof len === UNDEF_TYPE ? str : str.substring(0, UA_MAX_LENGTH);
      }
    };
    var rgxMapper = function(ua, arrays) {
      var i = 0, j2, k2, p2, q2, matches, match;
      while (i < arrays.length && !matches) {
        var regex = arrays[i], props = arrays[i + 1];
        j2 = k2 = 0;
        while (j2 < regex.length && !matches) {
          if (!regex[j2]) {
            break;
          }
          matches = regex[j2++].exec(ua);
          if (!!matches) {
            for (p2 = 0; p2 < props.length; p2++) {
              match = matches[++k2];
              q2 = props[p2];
              if (typeof q2 === OBJ_TYPE && q2.length > 0) {
                if (q2.length === 2) {
                  if (typeof q2[1] == FUNC_TYPE) {
                    this[q2[0]] = q2[1].call(this, match);
                  } else {
                    this[q2[0]] = q2[1];
                  }
                } else if (q2.length === 3) {
                  if (typeof q2[1] === FUNC_TYPE && !(q2[1].exec && q2[1].test)) {
                    this[q2[0]] = match ? q2[1].call(this, match, q2[2]) : undefined$1;
                  } else {
                    this[q2[0]] = match ? match.replace(q2[1], q2[2]) : undefined$1;
                  }
                } else if (q2.length === 4) {
                  this[q2[0]] = match ? q2[3].call(this, match.replace(q2[1], q2[2])) : undefined$1;
                }
              } else {
                this[q2] = match ? match : undefined$1;
              }
            }
          }
        }
        i += 2;
      }
    }, strMapper = function(str, map) {
      for (var i in map) {
        if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
          for (var j2 = 0; j2 < map[i].length; j2++) {
            if (has2(map[i][j2], str)) {
              return i === UNKNOWN ? undefined$1 : i;
            }
          }
        } else if (has2(map[i], str)) {
          return i === UNKNOWN ? undefined$1 : i;
        }
      }
      return str;
    };
    var oldSafariMap = {
      "1.0": "/8",
      "1.2": "/1",
      "1.3": "/3",
      "2.0": "/412",
      "2.0.2": "/416",
      "2.0.3": "/417",
      "2.0.4": "/419",
      "?": "/"
    }, windowsVersionMap = {
      "ME": "4.90",
      "NT 3.11": "NT3.51",
      "NT 4.0": "NT4.0",
      "2000": "NT 5.0",
      "XP": ["NT 5.1", "NT 5.2"],
      "Vista": "NT 6.0",
      "7": "NT 6.1",
      "8": "NT 6.2",
      "8.1": "NT 6.3",
      "10": ["NT 6.4", "NT 10.0"],
      "RT": "ARM"
    };
    var regexes = {
      browser: [
        [
          /\b(?:crmo|crios)\/([\w\.]+)/i
        ],
        [VERSION2, [NAME, "Chrome"]],
        [
          /edg(?:e|ios|a)?\/([\w\.]+)/i
        ],
        [VERSION2, [NAME, "Edge"]],
        [
          /(opera mini)\/([-\w\.]+)/i,
          /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
          /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i
        ],
        [NAME, VERSION2],
        [
          /opios[\/ ]+([\w\.]+)/i
        ],
        [VERSION2, [NAME, OPERA + " Mini"]],
        [
          /\bopr\/([\w\.]+)/i
        ],
        [VERSION2, [NAME, OPERA]],
        [
          /(kindle)\/([\w\.]+)/i,
          /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
          /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,
          /(ba?idubrowser)[\/ ]?([\w\.]+)/i,
          /(?:ms|\()(ie) ([\w\.]+)/i,
          /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
          /(heytap|ovi)browser\/([\d\.]+)/i,
          /(weibo)__([\d\.]+)/i
        ],
        [NAME, VERSION2],
        [
          /(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i
        ],
        [VERSION2, [NAME, "UC" + BROWSER]],
        [
          /microm.+\bqbcore\/([\w\.]+)/i,
          /\bqbcore\/([\w\.]+).+microm/i
        ],
        [VERSION2, [NAME, "WeChat(Win) Desktop"]],
        [
          /micromessenger\/([\w\.]+)/i
        ],
        [VERSION2, [NAME, "WeChat"]],
        [
          /konqueror\/([\w\.]+)/i
        ],
        [VERSION2, [NAME, "Konqueror"]],
        [
          /trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i
        ],
        [VERSION2, [NAME, "IE"]],
        [
          /ya(?:search)?browser\/([\w\.]+)/i
        ],
        [VERSION2, [NAME, "Yandex"]],
        [
          /(avast|avg)\/([\w\.]+)/i
        ],
        [[NAME, /(.+)/, "$1 Secure " + BROWSER], VERSION2],
        [
          /\bfocus\/([\w\.]+)/i
        ],
        [VERSION2, [NAME, FIREFOX + " Focus"]],
        [
          /\bopt\/([\w\.]+)/i
        ],
        [VERSION2, [NAME, OPERA + " Touch"]],
        [
          /coc_coc\w+\/([\w\.]+)/i
        ],
        [VERSION2, [NAME, "Coc Coc"]],
        [
          /dolfin\/([\w\.]+)/i
        ],
        [VERSION2, [NAME, "Dolphin"]],
        [
          /coast\/([\w\.]+)/i
        ],
        [VERSION2, [NAME, OPERA + " Coast"]],
        [
          /miuibrowser\/([\w\.]+)/i
        ],
        [VERSION2, [NAME, "MIUI " + BROWSER]],
        [
          /fxios\/([-\w\.]+)/i
        ],
        [VERSION2, [NAME, FIREFOX]],
        [
          /\bqihu|(qi?ho?o?|360)browser/i
        ],
        [[NAME, "360 " + BROWSER]],
        [
          /(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i
        ],
        [[NAME, /(.+)/, "$1 " + BROWSER], VERSION2],
        [
          /(comodo_dragon)\/([\w\.]+)/i
        ],
        [[NAME, /_/g, " "], VERSION2],
        [
          /(electron)\/([\w\.]+) safari/i,
          /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
          /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i
        ],
        [NAME, VERSION2],
        [
          /(metasr)[\/ ]?([\w\.]+)/i,
          /(lbbrowser)/i,
          /\[(linkedin)app\]/i
        ],
        [NAME],
        [
          /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i
        ],
        [[NAME, FACEBOOK], VERSION2],
        [
          /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
          /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
          /safari (line)\/([\w\.]+)/i,
          /\b(line)\/([\w\.]+)\/iab/i,
          /(chromium|instagram)[\/ ]([-\w\.]+)/i
        ],
        [NAME, VERSION2],
        [
          /\bgsa\/([\w\.]+) .*safari\//i
        ],
        [VERSION2, [NAME, "GSA"]],
        [
          /musical_ly(?:.+app_?version\/|_)([\w\.]+)/i
        ],
        [VERSION2, [NAME, "TikTok"]],
        [
          /headlesschrome(?:\/([\w\.]+)| )/i
        ],
        [VERSION2, [NAME, CHROME + " Headless"]],
        [
          / wv\).+(chrome)\/([\w\.]+)/i
        ],
        [[NAME, CHROME + " WebView"], VERSION2],
        [
          /droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i
        ],
        [VERSION2, [NAME, "Android " + BROWSER]],
        [
          /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i
        ],
        [NAME, VERSION2],
        [
          /version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i
        ],
        [VERSION2, [NAME, "Mobile Safari"]],
        [
          /version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i
        ],
        [VERSION2, NAME],
        [
          /webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i
        ],
        [NAME, [VERSION2, strMapper, oldSafariMap]],
        [
          /(webkit|khtml)\/([\w\.]+)/i
        ],
        [NAME, VERSION2],
        [
          /(navigator|netscape\d?)\/([-\w\.]+)/i
        ],
        [[NAME, "Netscape"], VERSION2],
        [
          /mobile vr; rv:([\w\.]+)\).+firefox/i
        ],
        [VERSION2, [NAME, FIREFOX + " Reality"]],
        [
          /ekiohf.+(flow)\/([\w\.]+)/i,
          /(swiftfox)/i,
          /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
          /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
          /(firefox)\/([\w\.]+)/i,
          /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
          /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
          /(links) \(([\w\.]+)/i,
          /panasonic;(viera)/i
        ],
        [NAME, VERSION2],
        [
          /(cobalt)\/([\w\.]+)/i
        ],
        [NAME, [VERSION2, /master.|lts./, ""]]
      ],
      cpu: [
        [
          /(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i
        ],
        [[ARCHITECTURE, "amd64"]],
        [
          /(ia32(?=;))/i
        ],
        [[ARCHITECTURE, lowerize]],
        [
          /((?:i[346]|x)86)[;\)]/i
        ],
        [[ARCHITECTURE, "ia32"]],
        [
          /\b(aarch64|arm(v?8e?l?|_?64))\b/i
        ],
        [[ARCHITECTURE, "arm64"]],
        [
          /\b(arm(?:v[67])?ht?n?[fl]p?)\b/i
        ],
        [[ARCHITECTURE, "armhf"]],
        [
          /windows (ce|mobile); ppc;/i
        ],
        [[ARCHITECTURE, "arm"]],
        [
          /((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i
        ],
        [[ARCHITECTURE, /ower/, EMPTY, lowerize]],
        [
          /(sun4\w)[;\)]/i
        ],
        [[ARCHITECTURE, "sparc"]],
        [
          /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i
        ],
        [[ARCHITECTURE, lowerize]]
      ],
      device: [
        [
          /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i
        ],
        [MODEL, [VENDOR, SAMSUNG], [TYPE, TABLET]],
        [
          /\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
          /samsung[- ]([-\w]+)/i,
          /sec-(sgh\w+)/i
        ],
        [MODEL, [VENDOR, SAMSUNG], [TYPE, MOBILE]],
        [
          /(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i
        ],
        [MODEL, [VENDOR, APPLE], [TYPE, MOBILE]],
        [
          /\((ipad);[-\w\),; ]+apple/i,
          /applecoremedia\/[\w\.]+ \((ipad)/i,
          /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
        ],
        [MODEL, [VENDOR, APPLE], [TYPE, TABLET]],
        [
          /(macintosh);/i
        ],
        [MODEL, [VENDOR, APPLE]],
        [
          /\b(sh-?[altvz]?\d\d[a-ekm]?)/i
        ],
        [MODEL, [VENDOR, SHARP], [TYPE, MOBILE]],
        [
          /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i
        ],
        [MODEL, [VENDOR, HUAWEI], [TYPE, TABLET]],
        [
          /(?:huawei|honor)([-\w ]+)[;\)]/i,
          /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i
        ],
        [MODEL, [VENDOR, HUAWEI], [TYPE, MOBILE]],
        [
          /\b(poco[\w ]+)(?: bui|\))/i,
          /\b; (\w+) build\/hm\1/i,
          /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
          /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
          /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i
        ],
        [[MODEL, /_/g, " "], [VENDOR, XIAOMI], [TYPE, MOBILE]],
        [
          /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i
        ],
        [[MODEL, /_/g, " "], [VENDOR, XIAOMI], [TYPE, TABLET]],
        [
          /; (\w+) bui.+ oppo/i,
          /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i
        ],
        [MODEL, [VENDOR, "OPPO"], [TYPE, MOBILE]],
        [
          /vivo (\w+)(?: bui|\))/i,
          /\b(v[12]\d{3}\w?[at])(?: bui|;)/i
        ],
        [MODEL, [VENDOR, "Vivo"], [TYPE, MOBILE]],
        [
          /\b(rmx[12]\d{3})(?: bui|;|\))/i
        ],
        [MODEL, [VENDOR, "Realme"], [TYPE, MOBILE]],
        [
          /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
          /\bmot(?:orola)?[- ](\w*)/i,
          /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i
        ],
        [MODEL, [VENDOR, MOTOROLA], [TYPE, MOBILE]],
        [
          /\b(mz60\d|xoom[2 ]{0,2}) build\//i
        ],
        [MODEL, [VENDOR, MOTOROLA], [TYPE, TABLET]],
        [
          /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i
        ],
        [MODEL, [VENDOR, LG], [TYPE, TABLET]],
        [
          /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
          /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
          /\blg-?([\d\w]+) bui/i
        ],
        [MODEL, [VENDOR, LG], [TYPE, MOBILE]],
        [
          /(ideatab[-\w ]+)/i,
          /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i
        ],
        [MODEL, [VENDOR, "Lenovo"], [TYPE, TABLET]],
        [
          /(?:maemo|nokia).*(n900|lumia \d+)/i,
          /nokia[-_ ]?([-\w\.]*)/i
        ],
        [[MODEL, /_/g, " "], [VENDOR, "Nokia"], [TYPE, MOBILE]],
        [
          /(pixel c)\b/i
        ],
        [MODEL, [VENDOR, GOOGLE], [TYPE, TABLET]],
        [
          /droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i
        ],
        [MODEL, [VENDOR, GOOGLE], [TYPE, MOBILE]],
        [
          /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i
        ],
        [MODEL, [VENDOR, SONY], [TYPE, MOBILE]],
        [
          /sony tablet [ps]/i,
          /\b(?:sony)?sgp\w+(?: bui|\))/i
        ],
        [[MODEL, "Xperia Tablet"], [VENDOR, SONY], [TYPE, TABLET]],
        [
          / (kb2005|in20[12]5|be20[12][59])\b/i,
          /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i
        ],
        [MODEL, [VENDOR, "OnePlus"], [TYPE, MOBILE]],
        [
          /(alexa)webm/i,
          /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,
          /(kf[a-z]+)( bui|\)).+silk\//i
        ],
        [MODEL, [VENDOR, AMAZON], [TYPE, TABLET]],
        [
          /((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i
        ],
        [[MODEL, /(.+)/g, "Fire Phone $1"], [VENDOR, AMAZON], [TYPE, MOBILE]],
        [
          /(playbook);[-\w\),; ]+(rim)/i
        ],
        [MODEL, VENDOR, [TYPE, TABLET]],
        [
          /\b((?:bb[a-f]|st[hv])100-\d)/i,
          /\(bb10; (\w+)/i
        ],
        [MODEL, [VENDOR, BLACKBERRY], [TYPE, MOBILE]],
        [
          /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i
        ],
        [MODEL, [VENDOR, ASUS], [TYPE, TABLET]],
        [
          / (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i
        ],
        [MODEL, [VENDOR, ASUS], [TYPE, MOBILE]],
        [
          /(nexus 9)/i
        ],
        [MODEL, [VENDOR, "HTC"], [TYPE, TABLET]],
        [
          /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
          /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
          /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i
        ],
        [VENDOR, [MODEL, /_/g, " "], [TYPE, MOBILE]],
        [
          /droid.+; ([ab][1-7]-?[0178a]\d\d?)/i
        ],
        [MODEL, [VENDOR, "Acer"], [TYPE, TABLET]],
        [
          /droid.+; (m[1-5] note) bui/i,
          /\bmz-([-\w]{2,})/i
        ],
        [MODEL, [VENDOR, "Meizu"], [TYPE, MOBILE]],
        [
          /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,
          /(hp) ([\w ]+\w)/i,
          /(asus)-?(\w+)/i,
          /(microsoft); (lumia[\w ]+)/i,
          /(lenovo)[-_ ]?([-\w]+)/i,
          /(jolla)/i,
          /(oppo) ?([\w ]+) bui/i
        ],
        [VENDOR, MODEL, [TYPE, MOBILE]],
        [
          /(kobo)\s(ereader|touch)/i,
          /(archos) (gamepad2?)/i,
          /(hp).+(touchpad(?!.+tablet)|tablet)/i,
          /(kindle)\/([\w\.]+)/i,
          /(nook)[\w ]+build\/(\w+)/i,
          /(dell) (strea[kpr\d ]*[\dko])/i,
          /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
          /(trinity)[- ]*(t\d{3}) bui/i,
          /(gigaset)[- ]+(q\w{1,9}) bui/i,
          /(vodafone) ([\w ]+)(?:\)| bui)/i
        ],
        [VENDOR, MODEL, [TYPE, TABLET]],
        [
          /(surface duo)/i
        ],
        [MODEL, [VENDOR, MICROSOFT], [TYPE, TABLET]],
        [
          /droid [\d\.]+; (fp\du?)(?: b|\))/i
        ],
        [MODEL, [VENDOR, "Fairphone"], [TYPE, MOBILE]],
        [
          /(u304aa)/i
        ],
        [MODEL, [VENDOR, "AT&T"], [TYPE, MOBILE]],
        [
          /\bsie-(\w*)/i
        ],
        [MODEL, [VENDOR, "Siemens"], [TYPE, MOBILE]],
        [
          /\b(rct\w+) b/i
        ],
        [MODEL, [VENDOR, "RCA"], [TYPE, TABLET]],
        [
          /\b(venue[\d ]{2,7}) b/i
        ],
        [MODEL, [VENDOR, "Dell"], [TYPE, TABLET]],
        [
          /\b(q(?:mv|ta)\w+) b/i
        ],
        [MODEL, [VENDOR, "Verizon"], [TYPE, TABLET]],
        [
          /\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i
        ],
        [MODEL, [VENDOR, "Barnes & Noble"], [TYPE, TABLET]],
        [
          /\b(tm\d{3}\w+) b/i
        ],
        [MODEL, [VENDOR, "NuVision"], [TYPE, TABLET]],
        [
          /\b(k88) b/i
        ],
        [MODEL, [VENDOR, "ZTE"], [TYPE, TABLET]],
        [
          /\b(nx\d{3}j) b/i
        ],
        [MODEL, [VENDOR, "ZTE"], [TYPE, MOBILE]],
        [
          /\b(gen\d{3}) b.+49h/i
        ],
        [MODEL, [VENDOR, "Swiss"], [TYPE, MOBILE]],
        [
          /\b(zur\d{3}) b/i
        ],
        [MODEL, [VENDOR, "Swiss"], [TYPE, TABLET]],
        [
          /\b((zeki)?tb.*\b) b/i
        ],
        [MODEL, [VENDOR, "Zeki"], [TYPE, TABLET]],
        [
          /\b([yr]\d{2}) b/i,
          /\b(dragon[- ]+touch |dt)(\w{5}) b/i
        ],
        [[VENDOR, "Dragon Touch"], MODEL, [TYPE, TABLET]],
        [
          /\b(ns-?\w{0,9}) b/i
        ],
        [MODEL, [VENDOR, "Insignia"], [TYPE, TABLET]],
        [
          /\b((nxa|next)-?\w{0,9}) b/i
        ],
        [MODEL, [VENDOR, "NextBook"], [TYPE, TABLET]],
        [
          /\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i
        ],
        [[VENDOR, "Voice"], MODEL, [TYPE, MOBILE]],
        [
          /\b(lvtel\-)?(v1[12]) b/i
        ],
        [[VENDOR, "LvTel"], MODEL, [TYPE, MOBILE]],
        [
          /\b(ph-1) /i
        ],
        [MODEL, [VENDOR, "Essential"], [TYPE, MOBILE]],
        [
          /\b(v(100md|700na|7011|917g).*\b) b/i
        ],
        [MODEL, [VENDOR, "Envizen"], [TYPE, TABLET]],
        [
          /\b(trio[-\w\. ]+) b/i
        ],
        [MODEL, [VENDOR, "MachSpeed"], [TYPE, TABLET]],
        [
          /\btu_(1491) b/i
        ],
        [MODEL, [VENDOR, "Rotor"], [TYPE, TABLET]],
        [
          /(shield[\w ]+) b/i
        ],
        [MODEL, [VENDOR, "Nvidia"], [TYPE, TABLET]],
        [
          /(sprint) (\w+)/i
        ],
        [VENDOR, MODEL, [TYPE, MOBILE]],
        [
          /(kin\.[onetw]{3})/i
        ],
        [[MODEL, /\./g, " "], [VENDOR, MICROSOFT], [TYPE, MOBILE]],
        [
          /droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i
        ],
        [MODEL, [VENDOR, ZEBRA], [TYPE, TABLET]],
        [
          /droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i
        ],
        [MODEL, [VENDOR, ZEBRA], [TYPE, MOBILE]],
        [
          /smart-tv.+(samsung)/i
        ],
        [VENDOR, [TYPE, SMARTTV]],
        [
          /hbbtv.+maple;(\d+)/i
        ],
        [[MODEL, /^/, "SmartTV"], [VENDOR, SAMSUNG], [TYPE, SMARTTV]],
        [
          /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i
        ],
        [[VENDOR, LG], [TYPE, SMARTTV]],
        [
          /(apple) ?tv/i
        ],
        [VENDOR, [MODEL, APPLE + " TV"], [TYPE, SMARTTV]],
        [
          /crkey/i
        ],
        [[MODEL, CHROME + "cast"], [VENDOR, GOOGLE], [TYPE, SMARTTV]],
        [
          /droid.+aft(\w)( bui|\))/i
        ],
        [MODEL, [VENDOR, AMAZON], [TYPE, SMARTTV]],
        [
          /\(dtv[\);].+(aquos)/i,
          /(aquos-tv[\w ]+)\)/i
        ],
        [MODEL, [VENDOR, SHARP], [TYPE, SMARTTV]],
        [
          /(bravia[\w ]+)( bui|\))/i
        ],
        [MODEL, [VENDOR, SONY], [TYPE, SMARTTV]],
        [
          /(mitv-\w{5}) bui/i
        ],
        [MODEL, [VENDOR, XIAOMI], [TYPE, SMARTTV]],
        [
          /Hbbtv.*(technisat) (.*);/i
        ],
        [VENDOR, MODEL, [TYPE, SMARTTV]],
        [
          /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
          /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i
        ],
        [[VENDOR, trim], [MODEL, trim], [TYPE, SMARTTV]],
        [
          /\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i
        ],
        [[TYPE, SMARTTV]],
        [
          /(ouya)/i,
          /(nintendo) ([wids3utch]+)/i
        ],
        [VENDOR, MODEL, [TYPE, CONSOLE]],
        [
          /droid.+; (shield) bui/i
        ],
        [MODEL, [VENDOR, "Nvidia"], [TYPE, CONSOLE]],
        [
          /(playstation [345portablevi]+)/i
        ],
        [MODEL, [VENDOR, SONY], [TYPE, CONSOLE]],
        [
          /\b(xbox(?: one)?(?!; xbox))[\); ]/i
        ],
        [MODEL, [VENDOR, MICROSOFT], [TYPE, CONSOLE]],
        [
          /((pebble))app/i
        ],
        [VENDOR, MODEL, [TYPE, WEARABLE]],
        [
          /(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i
        ],
        [MODEL, [VENDOR, APPLE], [TYPE, WEARABLE]],
        [
          /droid.+; (glass) \d/i
        ],
        [MODEL, [VENDOR, GOOGLE], [TYPE, WEARABLE]],
        [
          /droid.+; (wt63?0{2,3})\)/i
        ],
        [MODEL, [VENDOR, ZEBRA], [TYPE, WEARABLE]],
        [
          /(quest( 2| pro)?)/i
        ],
        [MODEL, [VENDOR, FACEBOOK], [TYPE, WEARABLE]],
        [
          /(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i
        ],
        [VENDOR, [TYPE, EMBEDDED]],
        [
          /(aeobc)\b/i
        ],
        [MODEL, [VENDOR, AMAZON], [TYPE, EMBEDDED]],
        [
          /droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i
        ],
        [MODEL, [TYPE, MOBILE]],
        [
          /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i
        ],
        [MODEL, [TYPE, TABLET]],
        [
          /\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i
        ],
        [[TYPE, TABLET]],
        [
          /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i
        ],
        [[TYPE, MOBILE]],
        [
          /(android[-\w\. ]{0,9});.+buil/i
        ],
        [MODEL, [VENDOR, "Generic"]]
      ],
      engine: [
        [
          /windows.+ edge\/([\w\.]+)/i
        ],
        [VERSION2, [NAME, EDGE + "HTML"]],
        [
          /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i
        ],
        [VERSION2, [NAME, "Blink"]],
        [
          /(presto)\/([\w\.]+)/i,
          /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
          /ekioh(flow)\/([\w\.]+)/i,
          /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
          /(icab)[\/ ]([23]\.[\d\.]+)/i,
          /\b(libweb)/i
        ],
        [NAME, VERSION2],
        [
          /rv\:([\w\.]{1,9})\b.+(gecko)/i
        ],
        [VERSION2, NAME]
      ],
      os: [
        [
          /microsoft (windows) (vista|xp)/i
        ],
        [NAME, VERSION2],
        [
          /(windows) nt 6\.2; (arm)/i,
          /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,
          /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i
        ],
        [NAME, [VERSION2, strMapper, windowsVersionMap]],
        [
          /(win(?=3|9|n)|win 9x )([nt\d\.]+)/i
        ],
        [[NAME, "Windows"], [VERSION2, strMapper, windowsVersionMap]],
        [
          /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
          /ios;fbsv\/([\d\.]+)/i,
          /cfnetwork\/.+darwin/i
        ],
        [[VERSION2, /_/g, "."], [NAME, "iOS"]],
        [
          /(mac os x) ?([\w\. ]*)/i,
          /(macintosh|mac_powerpc\b)(?!.+haiku)/i
        ],
        [[NAME, MAC_OS], [VERSION2, /_/g, "."]],
        [
          /droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i
        ],
        [VERSION2, NAME],
        [
          /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
          /(blackberry)\w*\/([\w\.]*)/i,
          /(tizen|kaios)[\/ ]([\w\.]+)/i,
          /\((series40);/i
        ],
        [NAME, VERSION2],
        [
          /\(bb(10);/i
        ],
        [VERSION2, [NAME, BLACKBERRY]],
        [
          /(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i
        ],
        [VERSION2, [NAME, "Symbian"]],
        [
          /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i
        ],
        [VERSION2, [NAME, FIREFOX + " OS"]],
        [
          /web0s;.+rt(tv)/i,
          /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i
        ],
        [VERSION2, [NAME, "webOS"]],
        [
          /watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i
        ],
        [VERSION2, [NAME, "watchOS"]],
        [
          /crkey\/([\d\.]+)/i
        ],
        [VERSION2, [NAME, CHROME + "cast"]],
        [
          /(cros) [\w]+(?:\)| ([\w\.]+)\b)/i
        ],
        [[NAME, CHROMIUM_OS], VERSION2],
        [
          /panasonic;(viera)/i,
          /(netrange)mmh/i,
          /(nettv)\/(\d+\.[\w\.]+)/i,
          /(nintendo|playstation) ([wids345portablevuch]+)/i,
          /(xbox); +xbox ([^\);]+)/i,
          /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
          /(mint)[\/\(\) ]?(\w*)/i,
          /(mageia|vectorlinux)[; ]/i,
          /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
          /(hurd|linux) ?([\w\.]*)/i,
          /(gnu) ?([\w\.]*)/i,
          /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
          /(haiku) (\w+)/i
        ],
        [NAME, VERSION2],
        [
          /(sunos) ?([\w\.\d]*)/i
        ],
        [[NAME, "Solaris"], VERSION2],
        [
          /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
          /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
          /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
          /(unix) ?([\w\.]*)/i
        ],
        [NAME, VERSION2]
      ]
    };
    var UAParser2 = function(ua, extensions) {
      if (typeof ua === OBJ_TYPE) {
        extensions = ua;
        ua = undefined$1;
      }
      if (!(this instanceof UAParser2)) {
        return new UAParser2(ua, extensions).getResult();
      }
      var _navigator = typeof window2 !== UNDEF_TYPE && window2.navigator ? window2.navigator : undefined$1;
      var _ua = ua || (_navigator && _navigator.userAgent ? _navigator.userAgent : EMPTY);
      var _uach = _navigator && _navigator.userAgentData ? _navigator.userAgentData : undefined$1;
      var _rgxmap = extensions ? extend2(regexes, extensions) : regexes;
      var _isSelfNav = _navigator && _navigator.userAgent == _ua;
      this.getBrowser = function() {
        var _browser = {};
        _browser[NAME] = undefined$1;
        _browser[VERSION2] = undefined$1;
        rgxMapper.call(_browser, _ua, _rgxmap.browser);
        _browser[MAJOR] = majorize(_browser[VERSION2]);
        if (_isSelfNav && _navigator && _navigator.brave && typeof _navigator.brave.isBrave == FUNC_TYPE) {
          _browser[NAME] = "Brave";
        }
        return _browser;
      };
      this.getCPU = function() {
        var _cpu = {};
        _cpu[ARCHITECTURE] = undefined$1;
        rgxMapper.call(_cpu, _ua, _rgxmap.cpu);
        return _cpu;
      };
      this.getDevice = function() {
        var _device = {};
        _device[VENDOR] = undefined$1;
        _device[MODEL] = undefined$1;
        _device[TYPE] = undefined$1;
        rgxMapper.call(_device, _ua, _rgxmap.device);
        if (_isSelfNav && !_device[TYPE] && _uach && _uach.mobile) {
          _device[TYPE] = MOBILE;
        }
        if (_isSelfNav && _device[MODEL] == "Macintosh" && _navigator && typeof _navigator.standalone !== UNDEF_TYPE && _navigator.maxTouchPoints && _navigator.maxTouchPoints > 2) {
          _device[MODEL] = "iPad";
          _device[TYPE] = TABLET;
        }
        return _device;
      };
      this.getEngine = function() {
        var _engine = {};
        _engine[NAME] = undefined$1;
        _engine[VERSION2] = undefined$1;
        rgxMapper.call(_engine, _ua, _rgxmap.engine);
        return _engine;
      };
      this.getOS = function() {
        var _os = {};
        _os[NAME] = undefined$1;
        _os[VERSION2] = undefined$1;
        rgxMapper.call(_os, _ua, _rgxmap.os);
        if (_isSelfNav && !_os[NAME] && _uach && _uach.platform != "Unknown") {
          _os[NAME] = _uach.platform.replace(/chrome os/i, CHROMIUM_OS).replace(/macos/i, MAC_OS);
        }
        return _os;
      };
      this.getResult = function() {
        return {
          ua: this.getUA(),
          browser: this.getBrowser(),
          engine: this.getEngine(),
          os: this.getOS(),
          device: this.getDevice(),
          cpu: this.getCPU()
        };
      };
      this.getUA = function() {
        return _ua;
      };
      this.setUA = function(ua2) {
        _ua = typeof ua2 === STR_TYPE && ua2.length > UA_MAX_LENGTH ? trim(ua2, UA_MAX_LENGTH) : ua2;
        return this;
      };
      this.setUA(_ua);
      return this;
    };
    UAParser2.VERSION = LIBVERSION;
    UAParser2.BROWSER = enumerize([NAME, VERSION2, MAJOR]);
    UAParser2.CPU = enumerize([ARCHITECTURE]);
    UAParser2.DEVICE = enumerize([MODEL, VENDOR, TYPE, CONSOLE, MOBILE, SMARTTV, TABLET, WEARABLE, EMBEDDED]);
    UAParser2.ENGINE = UAParser2.OS = enumerize([NAME, VERSION2]);
    {
      if (module.exports) {
        exports = module.exports = UAParser2;
      }
      exports.UAParser = UAParser2;
    }
    var $2 = typeof window2 !== UNDEF_TYPE && (window2.jQuery || window2.Zepto);
    if ($2 && !$2.ua) {
      var parser = new UAParser2();
      $2.ua = parser.getResult();
      $2.ua.get = function() {
        return parser.getUA();
      };
      $2.ua.set = function(ua) {
        parser.setUA(ua);
        var result = parser.getResult();
        for (var prop in result) {
          $2.ua[prop] = result[prop];
        }
      };
    }
  })(typeof window === "object" ? window : commonjsGlobal);
})(uaParser, uaParser.exports);
var UAParser = uaParser.exports;
var s = (a, e2, t2) => new Promise((r2, i) => {
  var o2 = (l) => {
    try {
      d(t2.next(l));
    } catch (p2) {
      i(p2);
    }
  }, y2 = (l) => {
    try {
      d(t2.throw(l));
    } catch (p2) {
      i(p2);
    }
  }, d = (l) => l.done ? r2(l.value) : Promise.resolve(l.value).then(o2, y2);
  d((t2 = t2.apply(a, e2)).next());
});
var g = (a, e2) => s(void 0, null, function* () {
  let t2, r2 = new Promise((i) => {
    t2 = setTimeout(i, e2);
  });
  return Promise.race([a, r2]).then((i) => (clearTimeout(t2), i));
});
var n$1 = class {
  static encodeBytes(e2) {
    let r2 = btoa(String.fromCharCode(...new Uint8Array(e2))).replace(/\+/g, "-").replace(/\//g, "_");
    return C(r2);
  }
  static decodeBytes(e2) {
    let t2 = e2.replace(/-/g, "+").replace(/_/g, "/"), r2 = C(t2);
    return Uint8Array.from(atob(r2), (o2) => o2.charCodeAt(0));
  }
};
var C = (a) => {
  let e2 = a.indexOf("=");
  return a.slice(0, e2 === -1 ? a.length : e2);
};
var c$1 = class {
  static createCredentialAvailable() {
    return s(this, null, function* () {
      let e2 = { securityKey: false, platform: false, isAvailable: false };
      return window.PublicKeyCredential && (e2.securityKey = true, e2.isAvailable = true, yield g(window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable().then((t2) => {
        e2.platform = t2;
      }).catch(() => console.log("Something went wrong.")), 1e3)), e2;
    });
  }
  static parsePublicKey(e2) {
    if (e2.challenge = n$1.decodeBytes(e2.challenge.toString()), e2.user.id = n$1.decodeBytes(e2.user.id.toString()), e2.excludeCredentials)
      for (let t2 = 0; t2 < e2.excludeCredentials.length; t2++) {
        let r2 = e2.excludeCredentials[t2];
        r2.id = n$1.decodeBytes(r2.id.toString());
      }
    return e2;
  }
  static getTransports(e2) {
    let t2 = [];
    return e2.response.getTransports && typeof e2.response.getTransports == "function" && (t2 = e2.response.getTransports()), t2;
  }
  static createCredential(e2) {
    return s(this, null, function* () {
      let t2 = { credential: null, transports: [] }, r2 = this.parsePublicKey(e2), i = yield navigator.credentials.create({ publicKey: r2 }).then((o2) => o2);
      return i == null || (t2.credential = i, t2.transports = this.getTransports(i)), t2;
    });
  }
};
var u = class {
  constructor() {
    this.userAgent = new UAParser();
  }
  getSyncedCredential() {
    return !!(this._isiOSPasskeySupported() || this._isMacPasskeySupported() || this._isChromeSyncedCredential());
  }
  getCrossDeviceCredential() {
    return !!(this._isiOSPasskeySupported() || this._isMacPasskeySupported() || this._isChromiumCrossDevice());
  }
  _isiOSPasskeySupported() {
    return this.userAgent.getOS().name == "iOS" && parseFloat(this.userAgent.getOS().version || "") >= 16;
  }
  _isMacPasskeySupported() {
    return this.userAgent.getBrowser().name == "Safari" && parseFloat(this.userAgent.getBrowser().version || "") >= 16 && this.userAgent.getOS().name == "Mac OS";
  }
  _isChromeSyncedCredential() {
    var r2;
    let e2 = (r2 = this.userAgent.getOS().name) != null ? r2 : "";
    return ((e2 == null ? void 0 : e2.includes("Windows")) || (e2 == null ? void 0 : e2.includes("Mac OS")) || (e2 == null ? void 0 : e2.includes("Android"))) && this.userAgent.getBrowser().name == "Chrome" && parseFloat(this.userAgent.getBrowser().version || "") >= 108;
  }
  _isChromiumCrossDevice() {
    return this.userAgent.getOS().name === "Android" ? false : this.userAgent.getEngine().name == "Blink" && parseFloat(this.userAgent.getBrowser().version || "") >= 109;
  }
};
var m = class {
  static parsePublicKey(e2) {
    if (e2.challenge = n$1.decodeBytes(e2.challenge.toString()), e2.allowCredentials) {
      for (let t2 = 0; t2 < e2.allowCredentials.length; t2++) {
        let r2 = e2.allowCredentials[t2];
        r2.id = n$1.decodeBytes(r2.id.toString());
      }
      return e2;
    }
    return e2;
  }
  static getCredential(e2, t2) {
    return s(this, null, function* () {
      return yield navigator.credentials.get({ mediation: t2 == null ? void 0 : t2.mediation, signal: t2 == null ? void 0 : t2.signal, publicKey: this.parsePublicKey(e2) }).then((i) => i);
    });
  }
  static getCredentialAvailable() {
    return s(this, null, function* () {
      let e2 = { securityKey: false, platform: false, syncedCredential: false, crossDeviceCredential: false, conditionalUI: false, isAvailable: false }, t2 = yield c$1.createCredentialAvailable();
      if (e2.securityKey = t2.securityKey, e2.platform = t2.platform, e2.isAvailable = t2.isAvailable, !e2.securityKey)
        return e2;
      e2.conditionalUI = yield this._isConditionalMediationAvailable();
      let r2 = new u();
      return e2.syncedCredential = r2.getSyncedCredential(), e2.crossDeviceCredential = r2.getCrossDeviceCredential(), e2;
    });
  }
  static _isConditionalMediationAvailable() {
    return s(this, null, function* () {
      return PublicKeyCredential.isConditionalMediationAvailable ? yield PublicKeyCredential.isConditionalMediationAvailable() : false;
    });
  }
};
function e(e2) {
  this.message = e2;
}
e.prototype = new Error(), e.prototype.name = "InvalidCharacterError";
var r = "undefined" != typeof window && window.atob && window.atob.bind(window) || function(r2) {
  var t2 = String(r2).replace(/=+$/, "");
  if (t2.length % 4 == 1)
    throw new e("'atob' failed: The string to be decoded is not correctly encoded.");
  for (var n2, o2, a = 0, i = 0, c2 = ""; o2 = t2.charAt(i++); ~o2 && (n2 = a % 4 ? 64 * n2 + o2 : o2, a++ % 4) ? c2 += String.fromCharCode(255 & n2 >> (-2 * a & 6)) : 0)
    o2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o2);
  return c2;
};
function t(e2) {
  var t2 = e2.replace(/-/g, "+").replace(/_/g, "/");
  switch (t2.length % 4) {
    case 0:
      break;
    case 2:
      t2 += "==";
      break;
    case 3:
      t2 += "=";
      break;
    default:
      throw "Illegal base64url string!";
  }
  try {
    return function(e3) {
      return decodeURIComponent(r(e3).replace(/(.)/g, function(e4, r2) {
        var t3 = r2.charCodeAt(0).toString(16).toUpperCase();
        return t3.length < 2 && (t3 = "0" + t3), "%" + t3;
      }));
    }(t2);
  } catch (e3) {
    return r(t2);
  }
}
function n(e2) {
  this.message = e2;
}
function o$1(e2, r2) {
  if ("string" != typeof e2)
    throw new n("Invalid token specified");
  var o2 = true === (r2 = r2 || {}).header ? 0 : 1;
  try {
    return JSON.parse(t(e2.split(".")[o2]));
  } catch (e3) {
    throw new n("Invalid token specified: " + e3.message);
  }
}
n.prototype = new Error(), n.prototype.name = "InvalidTokenError";
[
  EvalError,
  RangeError,
  ReferenceError,
  SyntaxError,
  TypeError,
  URIError,
  globalThis.DOMException,
  globalThis.AssertionError,
  globalThis.SystemError
].filter(Boolean).map(
  (constructor) => [constructor.name, constructor]
);
var y = class {
  encodeBytes(e2) {
    let n2 = btoa(String.fromCharCode(...new Uint8Array(e2))).replace(/\+/g, "-").replace(/\//g, "_");
    return $(n2);
  }
  decodeBytes(e2) {
    let t2 = e2.replace(/-/g, "+").replace(/_/g, "/"), n2 = $(t2);
    return Uint8Array.from(atob(n2), (p2) => p2.charCodeAt(0));
  }
};
var $ = (s2) => {
  let e2 = s2.indexOf("=");
  return s2.slice(0, e2 === -1 ? s2.length : e2);
};
var h = class extends Error {
  constructor(t2, n2) {
    super();
    this.name = "PassageError", this.statusCode = n2.status, this.statusText = n2.statusText, this.message = this._parsePsgErrorResponse(t2);
  }
  _parsePsgErrorResponse(t2) {
    try {
      return t2 = JSON.parse(t2), t2.error ? t2.error : "";
    } catch (e2) {
      return t2;
    }
  }
};
var P = ((r2) => (r2[r2.MultipleChoice = 300] = "MultipleChoice", r2[r2.MovedPermanantly = 301] = "MovedPermanantly", r2[r2.Found = 302] = "Found", r2[r2.SeeOther = 303] = "SeeOther", r2[r2.NotModified = 304] = "NotModified", r2[r2.TemporaryRedirect = 307] = "TemporaryRedirect", r2[r2.PermanentRedirect = 308] = "PermanentRedirect", r2[r2.BadRequest = 400] = "BadRequest", r2[r2.Unauthorized = 401] = "Unauthorized", r2[r2.PaymentRequired = 402] = "PaymentRequired", r2[r2.Forbidden = 403] = "Forbidden", r2[r2.NotFound = 404] = "NotFound", r2[r2.MethodNotAllowed = 405] = "MethodNotAllowed", r2[r2.NotAcceptable = 406] = "NotAcceptable", r2[r2.ProxyAuthenticationRequired = 407] = "ProxyAuthenticationRequired", r2[r2.RequestTimeout = 408] = "RequestTimeout", r2[r2.Conflict = 409] = "Conflict", r2[r2.Gone = 410] = "Gone", r2[r2.LengthRequired = 411] = "LengthRequired", r2[r2.PreconditionFailed = 412] = "PreconditionFailed", r2[r2.PayloadTooLarge = 413] = "PayloadTooLarge", r2[r2.URITooLong = 414] = "URITooLong", r2[r2.UnsupportedMediaType = 415] = "UnsupportedMediaType", r2[r2.RangeNotSatisfiable = 416] = "RangeNotSatisfiable", r2[r2.ExpectationFailed = 417] = "ExpectationFailed", r2[r2.MisdirectedRequest = 421] = "MisdirectedRequest", r2[r2.UnprocessableEntity = 422] = "UnprocessableEntity", r2[r2.Locked = 423] = "Locked", r2[r2.FailedDependency = 424] = "FailedDependency", r2[r2.TooEarly = 425] = "TooEarly", r2[r2.UpgradeRequired = 426] = "UpgradeRequired", r2[r2.PreconditionRequired = 428] = "PreconditionRequired", r2[r2.TooManyRequests = 429] = "TooManyRequests", r2[r2.RequestHeaderFieldsTooLarge = 431] = "RequestHeaderFieldsTooLarge", r2[r2.UnavailableForLegalReasons = 451] = "UnavailableForLegalReasons", r2[r2.InternalServerError = 500] = "InternalServerError", r2[r2.NotImplemented = 501] = "NotImplemented", r2[r2.BadGateway = 502] = "BadGateway", r2[r2.ServiceUnavailable = 503] = "ServiceUnavailable", r2[r2.GatewayTimeout = 504] = "GatewayTimeout", r2[r2.HTTPVersionNotSupported = 505] = "HTTPVersionNotSupported", r2[r2.VariantAlsoNegotiates = 506] = "VariantAlsoNegotiates", r2[r2.InsufficientStorage = 507] = "InsufficientStorage", r2[r2.LoopDetected = 508] = "LoopDetected", r2[r2.NotExtended = 510] = "NotExtended", r2[r2.NetworkAuthenticationRequired = 511] = "NetworkAuthenticationRequired", r2[r2.PSGCredObjectDoesNotExist = 700] = "PSGCredObjectDoesNotExist", r2[r2.PSGParsePublicKeyForNewDeviceFailed = 701] = "PSGParsePublicKeyForNewDeviceFailed", r2[r2.PSGParsePublicKeyForLoginFailed = 702] = "PSGParsePublicKeyForLoginFailed", r2[r2.PSGCouldNotGetUserCredential = 703] = "PSGCouldNotGetUserCredential", r2[r2.PSGLoginRequired = 704] = "PSGLoginRequired", r2))(P || {});
var j = new y();
var w = class {
  psgCredIDExists(e2) {
    let t2 = e2.user.id, n2 = e2.handshake.challenge.publicKey.allowCredentials, i = this.getPsgCredObj();
    if (!i)
      throw new h("Could not get psg_cred_obj", { status: 700, statusText: "PSG Cred Object Does Not Exist" });
    let p2 = JSON.parse(i)[t2];
    return p2 ? n2.find((g2) => {
      if (j.encodeBytes(j.decodeBytes(g2.id)) === j.encodeBytes(j.decodeBytes(p2)))
        return true;
    }) : false;
  }
  setPsgCredID(e2, t2) {
    if (!t2)
      throw new h("Could not get user's credential", { status: 703, statusText: "PSG Could Not Get User Credential" });
    let n2 = this.getPsgCredObj();
    if (n2) {
      let i = JSON.parse(n2);
      i[e2] = t2 == null ? void 0 : t2.id, this.setPsgCredObj(JSON.stringify(i));
    } else
      this.setPsgCredObj(JSON.stringify({ [e2]: t2 == null ? void 0 : t2.id }));
  }
  removeCredential(e2) {
    let t2 = this.getPsgCredObj();
    if (t2 === void 0)
      return;
    let n2 = JSON.parse(t2);
    Object.keys(n2).forEach((i) => {
      n2[i] === e2 && delete n2[i];
    }), this.setPsgCredObj(JSON.stringify(n2));
  }
  getPsgCredObj() {
    let e2 = api.get("psg_cred_obj"), t2 = localStorage.getItem("psg_cred_obj");
    if (e2 !== void 0)
      return api.set("psg_cred_obj", e2, { expires: 400, sameSite: "Strict" }), t2 === null && localStorage.setItem("psg_cred_obj", e2), e2;
    if (t2 !== null)
      return api.set("psg_cred_obj", t2, { expires: 400, sameSite: "Strict" }), t2;
  }
  setPsgCredObj(e2) {
    api.set("psg_cred_obj", e2, { expires: 400, sameSite: "Strict" }), localStorage.setItem("psg_cred_obj", e2);
  }
};
function c(s2) {
  return __async(this, null, function* () {
    return s2.ok ? s2.json() : yield s2.text().then((e2) => {
      throw new h(e2, s2);
    });
  });
}
function D() {
  let s2 = navigator.userAgent.toLowerCase().indexOf("firefox") > -1, e2 = window.navigator.userAgent.match(/Firefox\/([0-9]+)\./), t2 = e2 ? parseInt(e2[1]) : 0;
  return navigator.platform.indexOf("Win") !== -1 && s2 && t2 === 98;
}
function J(s2) {
  let e2 = new Uint8Array(68);
  e2.set(s2.slice(0, 68));
  let t2 = new Uint8Array(s2.byteLength - 68);
  t2.set(s2.slice(68, s2.byteLength));
  let n2 = new Uint8Array(15), i = new Uint8Array(e2.byteLength + n2.byteLength + t2.byteLength);
  i.set(e2, 0), i.set(n2, e2.byteLength), i.set(t2, e2.byteLength + n2.byteLength);
  let p2 = i[30] + 15;
  return i.set([p2], 30), i;
}
var V = { URL: "https://auth.passage.id", version: "@passageidentity/passage-js 3.8.1", CAPTURE_EVENT_URL: "https://us-central1-passage-prod.cloudfunctions.net/capture-event", SENTRY_RELEASE: "passage-js@3.8.1-prod", SENTRY_PROJECT: "passage-js", SENTRY_PROJECT_DSN: "", SENTRY_PROJECT_ENV: "prod", SENTRY_PROJECT_VERSION: "3.8.1" };
var f = V;
function o(s2) {
  var i;
  let e2 = new Headers(s2), t2 = f.version, n2 = f.EXTRA_HEADERS;
  if (e2.append("Passage-Version", t2), n2) {
    let p2 = ((i = n2.find((a) => a.hasOwnProperty("elementVersion"))) == null ? void 0 : i.elementVersion) || null;
    p2 && e2.append("Passage-Element-Version", p2);
  }
  return e2;
}
var q = class {
  getRefreshToken() {
    return Promise.resolve(void 0);
  }
};
var G = class extends q {
  clearTokens() {
    return Promise.resolve();
  }
};
var H = class extends G {
  constructor() {
    super(...arguments);
    this.noLocalStorage = typeof window > "u";
    this.noLocalStorageError = (t2) => "Failed to access localStorage or cookies. Must be run client-side.";
  }
  getAuthToken() {
    if (this.noLocalStorage)
      return Promise.reject(this.noLocalStorageError("getAuthToken"));
    let t2 = localStorage.getItem("psg_auth_token");
    return t2 === null ? Promise.resolve("") : Promise.resolve(t2);
  }
  setAuthToken(t2) {
    if (this.noLocalStorage)
      return Promise.reject(this.noLocalStorageError("setAuthToken"));
    localStorage.setItem("psg_auth_token", t2);
    let n2 = !this._isHttps() && this._isLocalHost();
    return document.cookie = `psg_auth_token = ${t2}; path=/ ${n2 ? "" : ";secure"}`, Promise.resolve();
  }
  getRefreshToken() {
    this.noLocalStorage && Promise.reject(this.noLocalStorageError("getRefreshToken"));
    let t2 = localStorage.getItem("psg_refresh_token");
    return t2 === null ? Promise.resolve(void 0) : Promise.resolve(t2);
  }
  setRefreshToken(t2) {
    return this.noLocalStorage && Promise.reject(this.noLocalStorageError("setRefreshToken")), localStorage.setItem("psg_refresh_token", t2), Promise.resolve();
  }
  setTokens(t2) {
    return this.noLocalStorage && Promise.reject(this.noLocalStorageError("setTokens")), this.setAuthToken(t2.auth_token), t2.refresh_token && this.setRefreshToken(t2.refresh_token), Promise.resolve();
  }
  clearTokens() {
    return this.noLocalStorage && Promise.reject(this.noLocalStorageError("clearTokens")), localStorage.removeItem("psg_auth_token"), document.cookie = "psg_auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;", localStorage.removeItem("psg_refresh_token"), Promise.resolve();
  }
  _isLocalHost() {
    return Boolean(window.location.hostname === "localhost" || window.location.hostname === "[::1]" || window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));
  }
  _isHttps() {
    return location.protocol === "https:";
  }
};
function v(s2) {
  return s2.setTokens !== void 0;
}
var Z = (s2) => typeof s2 == "object" && s2 !== null && typeof s2.auth_result < "u";
function k(s2, e2) {
  return Z(s2) ? (v(e2) && e2.setTokens(s2.auth_result), s2) : (console.warn("Not a valid auth response"), s2);
}
var E = ((n2) => (n2.Platform = "platform", n2.CrossPlatform = "cross-platform", n2.Any = "any", n2))(E || {});
var F = new y();
var te = new w();
var U = class {
  constructor(e2, t2, n2) {
    this.tokenStore = t2;
    this.apiUrl = e2 + "/register/", this.identifier = n2;
  }
  withWebAuthn(e2) {
    return __async(this, null, function* () {
      var m2;
      let t2 = yield fetch(this.apiUrl + "webauthn/start", { headers: o(), body: JSON.stringify({ identifier: this.identifier, authenticator_attachment: (m2 = e2 == null ? void 0 : e2.authenticatorAttachment) != null ? m2 : "platform" }), method: "POST" }).then(c), n2 = t2.handshake.challenge.publicKey, { credential: i, transports: p2 } = yield c$1.createCredential(n2).catch((T) => {
        throw new h("error parsing public key for webAuthn", { status: 702, statusText: "PSG Parse Public Key For Login Failed" });
      }), a = new Uint8Array(i == null ? void 0 : i.response.attestationObject);
      D() && (a = J(a));
      let g2 = t2.user.id, b = yield fetch(this.apiUrl + "webauthn/finish", { headers: o(), method: "POST", body: JSON.stringify({ user_id: g2, handshake_id: t2.handshake.id, handshake_response: { rawId: F.encodeBytes(i == null ? void 0 : i.rawId), id: i == null ? void 0 : i.id, type: i == null ? void 0 : i.type, response: { attestationObject: F.encodeBytes(a), clientDataJSON: F.encodeBytes(i == null ? void 0 : i.response.clientDataJSON) }, transports: p2 } }) }).then(c).then((T) => k(T, this.tokenStore));
      return te.setPsgCredID(g2, i), b.auth_result;
    });
  }
};
var N = new y();
var O = class {
  constructor(e2, t2, n2) {
    this.tokenStore = t2;
    this.apiUrl = e2 + "/login/", this.identifier = n2 != null ? n2 : "";
  }
  withWebAuthn(e2) {
    return __async(this, null, function* () {
      let t2 = JSON.stringify({ identifier: this.identifier }), n2 = this.identifier ? t2 : void 0, i = yield fetch(this.apiUrl + "webauthn/start", { headers: o(), method: "POST", body: n2 }).then(c), p2 = i.handshake.challenge.publicKey, a = yield m.getCredential(p2, e2).catch((b) => {
        throw new h("error parsing public key for webAuthn", { status: 702, statusText: "PSG Parse Public Key For Login Failed" });
      });
      return a ? (yield fetch(this.apiUrl + "webauthn/finish", { headers: o(), method: "POST", body: JSON.stringify({ user_id: this.identifier ? i.user.id : void 0, handshake_id: i.handshake.id, handshake_response: { id: a.id, rawId: N.encodeBytes(a.rawId), type: a.type, response: { clientDataJSON: N.encodeBytes(a.response.clientDataJSON), authenticatorData: N.encodeBytes(a.response.authenticatorData), signature: N.encodeBytes(a.response.signature), userHandle: N.encodeBytes(a.response.userHandle) } } }) }).then(c).then((b) => k(b, this.tokenStore))).auth_result : { auth_token: "", redirect_url: "" };
    });
  }
};
var A = class {
  constructor(e2) {
    this.apiUrl = e2;
  }
  appInfo() {
    return __async(this, null, function* () {
      return (yield fetch(this.apiUrl, { headers: o(), method: "GET" }).then(c)).app;
    });
  }
  identifierExists(e2) {
    return __async(this, null, function* () {
      return (yield fetch(this.apiUrl + "/users?identifier=" + encodeURIComponent(e2), { headers: o(), method: "GET" }).then(c)).user;
    });
  }
};
var _ = new y();
var z = new w();
var S = class {
  constructor(e2, t2) {
    this.tokenStore = t2;
    this.apiUrl = e2;
  }
  newRegister(e2, t2) {
    return __async(this, null, function* () {
      return (yield fetch(this.apiUrl + "/register/magic-link", { headers: o(), method: "POST", body: JSON.stringify({ identifier: e2, magic_link_path: window.location.pathname + window.location.search + window.location.hash, language: t2 }) }).then(c)).magic_link;
    });
  }
  newLogin(e2, t2) {
    return __async(this, null, function* () {
      return (yield fetch(this.apiUrl + "/login/magic-link", { headers: o(), method: "POST", body: JSON.stringify({ identifier: e2, magic_link_path: window.location.pathname + window.location.search + window.location.hash, language: t2 }) }).then(c)).magic_link;
    });
  }
  getStatus(e2) {
    return __async(this, null, function* () {
      return (yield fetch(this.apiUrl + "/magic-link/status", { headers: o(), method: "POST", body: JSON.stringify({ id: e2 }) }).then(c).then((n2) => k(n2, this.tokenStore))).auth_result;
    });
  }
  activate(e2) {
    return __async(this, null, function* () {
      return (yield fetch(this.apiUrl + "/magic-link/activate", { headers: o(), method: "PATCH", body: JSON.stringify({ magic_link: e2 }) }).then(c).then((n2) => k(n2, this.tokenStore))).auth_result;
    });
  }
  activateWebAuthnLogin(e2) {
    return __async(this, null, function* () {
      let t2 = yield fetch(this.apiUrl + "/magic-link/webauthn/login/start", { headers: o(), body: JSON.stringify({ magic_link: e2 }), method: "POST" }).then(c);
      if (!(yield z.psgCredIDExists(t2)))
        throw new h("psg_cred_obj does not exist in the allow list", { status: 700, statusText: "Not Found" });
      let i = yield navigator.credentials.get({ publicKey: this._parsePublicKeyLogin(t2.handshake.challenge.publicKey) }).catch((a) => {
        throw new h("could not parse publickey for login", { status: 702, statusText: "PSG Parse Public Key For Login Failed" });
      });
      return i ? (yield fetch(this.apiUrl + "/magic-link/webauthn/login/finish", { headers: o(), method: "POST", body: JSON.stringify({ magic_link: e2, user_id: t2.user.id, handshake_id: t2.handshake.id, handshake_response: { id: i.id, rawId: _.encodeBytes(i.rawId), type: i.type, response: { clientDataJSON: _.encodeBytes(i.response.clientDataJSON), authenticatorData: _.encodeBytes(i.response.authenticatorData), signature: _.encodeBytes(i.response.signature), userHandle: _.encodeBytes(i.response.userHandle) } } }) }).then(c).then((a) => k(a, this.tokenStore))).auth_result : { auth_token: "", redirect_url: "" };
    });
  }
  activateWebAuthnNewDevice(e2) {
    return __async(this, null, function* () {
      let t2 = yield fetch(this.apiUrl + "/magic-link/webauthn/new/start", { headers: o(), body: JSON.stringify({ magic_link: e2 }), method: "POST" }).then(c), n2 = yield navigator.credentials.create({ publicKey: this._parsePublicKeyNewDevice(t2.handshake.challenge.publicKey) }).catch((g2) => {
        throw new h("could not parse public key for new device", { status: 701, statusText: "PSG Parse Public Key For New Device Failed" });
      }), i = new Uint8Array(n2 == null ? void 0 : n2.response.attestationObject);
      D() && (i = J(i));
      let p2 = yield fetch(this.apiUrl + "/magic-link/webauthn/new/finish", { headers: o(), method: "POST", body: JSON.stringify({ magic_link: e2, user_id: t2.user.id, handshake_id: t2.handshake.id, handshake_response: { rawId: _.encodeBytes(n2.rawId), id: n2.id, type: n2.type, response: { attestationObject: _.encodeBytes(i), clientDataJSON: _.encodeBytes(n2.response.clientDataJSON) } }, device_name: navigator.userAgent }) }).then(c).then((g2) => k(g2, this.tokenStore)), a = t2.user.id;
      return z.setPsgCredID(a, n2), p2.auth_result;
    });
  }
  _parsePublicKeyLogin(e2) {
    if (e2.challenge = _.decodeBytes(e2.challenge.toString()), e2.allowCredentials) {
      for (let t2 = 0; t2 < e2.allowCredentials.length; t2++) {
        let n2 = e2.allowCredentials[t2];
        n2.id = _.decodeBytes(n2.id.toString());
      }
      return e2;
    }
    return e2;
  }
  _parsePublicKeyNewDevice(e2) {
    return e2.challenge = _.decodeBytes(e2.challenge.toString()), e2.user.id = _.decodeBytes(e2.user.id.toString()), e2;
  }
};
var R = class {
  constructor(e2, t2) {
    this.tokenStore = t2;
    this.apiUrl = e2;
  }
  newRegister(e2, t2) {
    return __async(this, null, function* () {
      return yield fetch(this.apiUrl + "/register/otp", { headers: o(), method: "POST", body: JSON.stringify({ identifier: e2, language: t2 }) }).then(c);
    });
  }
  newLogin(e2, t2) {
    return __async(this, null, function* () {
      return yield fetch(this.apiUrl + "/login/otp", { headers: o(), method: "POST", body: JSON.stringify({ identifier: e2, language: t2 }) }).then(c);
    });
  }
  activate(e2, t2) {
    return __async(this, null, function* () {
      return (yield fetch(this.apiUrl + "/otp/activate", { headers: o(), method: "POST", body: JSON.stringify({ otp: e2, otp_id: t2 }) }).then(c).then((i) => k(i, this.tokenStore))).auth_result;
    });
  }
};
var re = ((n2) => (n2.ACTIVE = "active", n2.INACTIVE = "inactive", n2.PENDING = "pending", n2))(re || {});
var W = ((n2) => (n2.Platform = "platform", n2.Passkey = "passkey", n2.SecurityKey = "security_key", n2))(W || {});
function x(s2) {
  return `${f.URL}/v1/apps/${s2}`;
}
var L = class {
  constructor(e2, t2) {
    this.tokenStore = t2;
    this.apiUrl = x(e2) + "/tokens/";
  }
  authGuard() {
    return __async(this, null, function* () {
      try {
        let e2 = yield this.tokenStore.getAuthToken(), t2 = o$1(e2, { header: true }), n2 = o$1(e2);
        return !!(n2 !== void 0 && t2 !== void 0 && this._validJWTPayload(n2) && this._validJWTHeader(t2));
      } catch (e2) {
        return false;
      }
    });
  }
  signOut() {
    return __async(this, null, function* () {
      let e2 = yield this.tokenStore.getRefreshToken();
      return e2 ? fetch(`${this.apiUrl}?` + new URLSearchParams({ refresh_token: e2 }), { method: "DELETE" }).then(({ status: t2 }) => t2 === 200).finally(() => {
        v(this.tokenStore) && this.tokenStore.clearTokens();
      }) : (v(this.tokenStore) && this.tokenStore.clearTokens(), true);
    });
  }
  getAuthToken() {
    return __async(this, null, function* () {
      let e2 = yield this.tokenStore.getAuthToken();
      if ((yield this.tokenStore.getRefreshToken()) === void 0) {
        if (!e2)
          throw new h("Login required", { status: 704, statusText: "Login required" });
        return e2;
      }
      if (e2) {
        let n2 = o$1(e2);
        if (n2 !== void 0 && this._validJWTPayload(n2))
          return Promise.resolve(e2);
      }
      return this.refresh().then((n2) => n2.auth_token);
    });
  }
  refresh() {
    return __async(this, null, function* () {
      let e2 = new h("Login required", { status: 704, statusText: "Login required" }), t2 = yield this.tokenStore.getRefreshToken();
      return t2 ? fetch(this.apiUrl, { headers: o(), method: "POST", body: JSON.stringify({ refresh_token: t2 }) }).then(c).then((n2) => (v(this.tokenStore) && this.tokenStore.setTokens(n2.auth_result), n2.auth_result)).catch(() => {
        throw e2;
      }) : Promise.reject(e2);
    });
  }
  _validJWTPayload(e2) {
    let n2 = Math.floor(Date.now() / 1e3);
    return !(e2.exp && n2 > e2.exp);
  }
  _validJWTHeader(e2) {
    let t2 = { alg: "RS256", typ: "JWT" };
    return !(e2.alg !== t2.alg || e2.typ !== t2.typ);
  }
};
var I = new y();
var Y = new w();
var M = class {
  constructor(e2, t2) {
    this.tokenStore = t2;
    this.apiUrl = x(e2) + "/currentuser", this.session = new L(e2, this.tokenStore);
  }
  userInfo() {
    return __async(this, null, function* () {
      let e2 = yield this._getToken(), t2 = yield fetch(this.apiUrl, { method: "GET", headers: o({ Authorization: `Bearer ${e2}` }) }).then((n2) => __async(this, null, function* () {
        return n2.status !== 200 ? void 0 : yield n2.json();
      })).catch((n2) => {
        throw new h("Failed to fetch current user.", { status: 404, statusText: "Not Found" });
      });
      return t2 == null ? void 0 : t2.user;
    });
  }
  changeEmail(e2, t2) {
    return __async(this, null, function* () {
      let n2 = yield this._getToken();
      return (yield fetch(`${this.apiUrl}/email`, { method: "PATCH", headers: o({ Authorization: `Bearer ${n2}`, "Content-Type": "application/json" }), body: JSON.stringify({ new_email: e2, language: t2 }) }).then(c)).magic_link;
    });
  }
  changePhone(e2, t2) {
    return __async(this, null, function* () {
      let n2 = yield this._getToken();
      return (yield fetch(`${this.apiUrl}/phone`, { method: "PATCH", headers: o({ Authorization: `Bearer ${n2}`, "Content-Type": "application/json" }), body: JSON.stringify({ new_phone: e2, language: t2 }) }).then(c)).magic_link;
    });
  }
  editDevice(e2, t2) {
    return __async(this, null, function* () {
      if (e2 === "" || e2 === void 0)
        throw new h("A deviceID is required for an edit device request.", { status: 400, statusText: "Bad Request" });
      if (Object.keys(t2).length === 0)
        throw new h("Edit device request must not have an empty request body.", { status: 400, statusText: "Bad Request" });
      let n2 = yield this._getToken();
      return (yield fetch(`${this.apiUrl}/devices/${e2}`, { method: "PATCH", headers: o({ Authorization: `Bearer ${n2}`, "Content-Type": "application/json" }), body: JSON.stringify(__spreadValues({}, t2)) }).then(c)).device;
    });
  }
  listDevices() {
    return __async(this, null, function* () {
      let e2 = yield this._getToken();
      return (yield fetch(`${this.apiUrl}/devices/`, { method: "GET", headers: o({ Authorization: `Bearer ${e2}`, "Content-Type": "application/json" }) }).then(c)).devices;
    });
  }
  addDevice(e2) {
    return __async(this, null, function* () {
      var b;
      let t2 = yield this._getToken(), n2 = yield fetch(this.apiUrl + "/devices/start", { headers: o({ Authorization: `Bearer ${t2}` }), body: JSON.stringify({ authenticator_attachment: (b = e2 == null ? void 0 : e2.authenticatorAttachment) != null ? b : "platform" }), method: "POST" }).then(c), i = yield navigator.credentials.create({ publicKey: this._parsePublicKey(n2.handshake.challenge.publicKey) }).catch((m2) => {
        throw new h("failed to parse public key", { status: 701, statusText: "PSG Parse Public Key For New Device Failed" });
      }).then((m2) => m2), p2 = [];
      (i == null ? void 0 : i.response.getTransports) && typeof (i == null ? void 0 : i.response.getTransports) == "function" && (p2 = i == null ? void 0 : i.response.getTransports());
      let a = n2.user.id, g2 = yield fetch(this.apiUrl + "/devices/finish", { headers: o({ Authorization: `Bearer ${t2}` }), method: "POST", body: JSON.stringify({ user_id: a, handshake_id: n2.handshake.id, handshake_response: { rawId: I.encodeBytes(i == null ? void 0 : i.rawId), id: i == null ? void 0 : i.id, type: i == null ? void 0 : i.type, response: { attestationObject: I.encodeBytes(i == null ? void 0 : i.response.attestationObject), clientDataJSON: I.encodeBytes(i == null ? void 0 : i.response.clientDataJSON) }, transports: p2 } }) }).then(c);
      return Y.setPsgCredID(a, i), g2.device;
    });
  }
  deleteDevice(e2) {
    return __async(this, null, function* () {
      let t2 = typeof e2 == "string" ? e2 : e2.id, n2 = typeof e2 == "string" ? void 0 : e2.cred_id;
      if (!t2)
        throw new h("A deviceID is required to delete a device.", { status: 404, statusText: "Not Found" });
      let i = false, p2 = yield this._getToken();
      return i = yield fetch(`${this.apiUrl}/devices/${t2}`, { method: "DELETE", headers: o({ Authorization: `Bearer ${p2}`, "Content-Type": "application/json" }) }).then((a) => __async(this, null, function* () {
        return a.ok ? true : yield a.text().then((g2) => {
          throw new h(g2, a);
        });
      })), i && n2 !== void 0 && Y.removeCredential(n2), i;
    });
  }
  getMetadata() {
    return __async(this, null, function* () {
      let e2 = yield this._getToken();
      return (yield fetch(`${this.apiUrl}/user-metadata`, { method: "GET", headers: o({ Authorization: `Bearer ${e2}` }) }).then(c)).user_metadata;
    });
  }
  updateMetadata(e2) {
    return __async(this, null, function* () {
      let t2 = yield this._getToken();
      return (yield fetch(`${this.apiUrl}/user-metadata`, { method: "PATCH", headers: o({ Authorization: `Bearer ${t2}`, "Content-Type": "application/json" }), body: JSON.stringify({ user_metadata: e2 }) }).then(c)).user;
    });
  }
  _parsePublicKey(e2) {
    return e2.challenge = I.decodeBytes(e2.challenge.toString()), e2.user.id = I.decodeBytes(e2.user.id.toString()), e2;
  }
  _getToken() {
    return __async(this, null, function* () {
      return yield this.session.getAuthToken();
    });
  }
};
var B = class {
  getBrowserInfo() {
    return __async(this, null, function* () {
      let e2 = yield m.getCredentialAvailable();
      return { createPassKeySupported: e2.syncedCredential, getPassKeySupported: e2.syncedCredential, conditionalUISupported: e2.conditionalUI };
    });
  }
};
var Q = class {
  constructor(e2, t2) {
    this.appID = e2;
    this.fullUrl = x(this.appID), (t2 == null ? void 0 : t2.tokenStore) === void 0 ? this.tokenStore = new H() : this.tokenStore = t2.tokenStore, this.extraHeaders = t2 == null ? void 0 : t2.extraHeaders, f.EXTRA_HEADERS = this.extraHeaders;
  }
  credIDExists(e2) {
    let t2 = new w().getPsgCredObj();
    return t2 ? !!JSON.parse(t2)[e2] : false;
  }
  register(e2, t2) {
    return __async(this, null, function* () {
      return yield new U(this.fullUrl, this.tokenStore, e2).withWebAuthn(t2);
    });
  }
  login(e2) {
    return __async(this, null, function* () {
      return yield new O(this.fullUrl, this.tokenStore, e2).withWebAuthn();
    });
  }
  loginConditional(e2) {
    return __async(this, null, function* () {
      return yield new O(this.fullUrl, this.tokenStore).withWebAuthn({ mediation: "conditional", signal: e2 });
    });
  }
  appInfo() {
    return __async(this, null, function* () {
      return yield new A(this.fullUrl).appInfo();
    });
  }
  browserInfo() {
    return __async(this, null, function* () {
      return yield new B().getBrowserInfo();
    });
  }
  getCredentialAvailable() {
    return __async(this, null, function* () {
      return yield m.getCredentialAvailable();
    });
  }
  createCredentialAvailable() {
    return __async(this, null, function* () {
      return yield c$1.createCredentialAvailable();
    });
  }
  checkWebauthnConfig(e2) {
    let t2 = true;
    return e2.auth_origin.replace(/\/$/, "") != window.location.origin.replace(/\/$/, "") && (console.error('The auth_origin configured for webauthn in your app settings does not match the "origin" of your current URL.  Please reconfigure this in the admin console. (Your current "origin" is `' + window.location.origin + "`) Passage will continue to work with other authentication methods."), t2 = false), t2;
  }
  isWebauthnSupported(e2) {
    return __async(this, null, function* () {
      let t2 = yield c$1.createCredentialAvailable();
      return e2 ? t2.securityKey : t2.platform;
    });
  }
  identifierExists(e2) {
    return __async(this, null, function* () {
      let n2 = yield new A(this.fullUrl).identifierExists(e2);
      return n2 && (n2.hasPasskey = n2.webauthn_types.includes("passkey"), n2);
    });
  }
  newRegisterMagicLink(e2, t2) {
    return __async(this, null, function* () {
      return yield new S(this.fullUrl, this.tokenStore).newRegister(e2, t2);
    });
  }
  newLoginMagicLink(e2, t2) {
    return __async(this, null, function* () {
      return yield new S(this.fullUrl, this.tokenStore).newLogin(e2, t2);
    });
  }
  magicLinkActivate(e2) {
    return __async(this, null, function* () {
      return yield new S(this.fullUrl, this.tokenStore).activate(e2);
    });
  }
  magicLinkActivateWebAuthnLogin(e2) {
    return __async(this, null, function* () {
      return yield new S(this.fullUrl, this.tokenStore).activateWebAuthnLogin(e2);
    });
  }
  magicLinkActivateWebAuthnNewDevice(e2) {
    return __async(this, null, function* () {
      return yield new S(this.fullUrl, this.tokenStore).activateWebAuthnNewDevice(e2);
    });
  }
  getMagicLinkStatus(e2) {
    return __async(this, null, function* () {
      return yield new S(this.fullUrl, this.tokenStore).getStatus(e2);
    });
  }
  newRegisterOneTimePasscode(e2, t2) {
    return __async(this, null, function* () {
      return yield new R(this.fullUrl, this.tokenStore).newRegister(e2, t2);
    });
  }
  newLoginOneTimePasscode(e2, t2) {
    return __async(this, null, function* () {
      return yield new R(this.fullUrl, this.tokenStore).newLogin(e2, t2);
    });
  }
  oneTimePasscodeActivate(e2, t2) {
    return __async(this, null, function* () {
      return yield new R(this.fullUrl, this.tokenStore).activate(e2, t2);
    });
  }
  getCurrentUser() {
    return new M(this.appID, this.tokenStore);
  }
  getCurrentSession() {
    return new L(this.appID, this.tokenStore);
  }
  createUser(e2) {
    return __async(this, null, function* () {
      return (yield fetch(`${this.fullUrl}/users`, { headers: o(), body: JSON.stringify(__spreadValues({}, e2)), method: "POST" }).then(c)).user;
    });
  }
};
var ce = ((n2) => (n2.email = "email", n2.phone = "phone", n2.both = "both", n2))(ce || {});
var ue = ((i) => (i.Phone = "phone", i.Email = "email", i.Both = "both", i.Either = "either", i))(ue || {});
var le = ((a) => (a.STRING = "string", a.BOOLEAN = "boolean", a.INTEGER = "integer", a.DATE = "date", a.PHONE = "phone", a.EMAIL = "email", a))(le || {});
var he = ((n2) => (n2.LoginCode = "otp", n2.MagicLink = "magic_link", n2.None = "none", n2))(he || {});
var pe = ((d) => (d.ANDALE_MONO = "Andalé Mono", d.ARIAL = "Arial", d.ARIAL_BLACK = "Arial Black", d.BASKERVILLE = "Baskerville", d.BRADLEY_HAND = "Bradley Hand", d.BRUSH_SCRIPT_MT = "Brush Script MT", d.COMIC_SANS_MS = "Comic Sans MS", d.COURIER = "Courier", d.GEORGIA = "Georgia", d.GILL_SANS = "Gill Sans", d.HELVETICA = "Helvetica", d.IMPACT = "Impact", d.LUCIDA = "Lucida", d.LUMINARI = "Luminari", d.MONACO = "Monaco", d.PALATINO = "Palatino", d.TAHOMA = "Tahoma", d.TIMES_NEW_ROMAN = "Times New Roman", d.TREBUCHET_MS = "Trebuchet MS", d.VERDANA = "Verdana", d))(pe || {});
var inBrowser = typeof window !== "undefined";
var makeSymbol = (name, shareable = false) => !shareable ? Symbol(name) : Symbol.for(name);
var generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({ l: locale, k: key, s: source });
var friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
var isNumber = (val) => typeof val === "number" && isFinite(val);
var isDate = (val) => toTypeString(val) === "[object Date]";
var isRegExp = (val) => toTypeString(val) === "[object RegExp]";
var isEmptyObject = (val) => isPlainObject(val) && Object.keys(val).length === 0;
var assign$1 = Object.assign;
var _globalThis;
var getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function escapeHtml(rawText) {
  return rawText.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
var isArray = Array.isArray;
var isFunction = (val) => typeof val === "function";
var isString$1 = (val) => typeof val === "string";
var isBoolean = (val) => typeof val === "boolean";
var isObject$1 = (val) => val !== null && typeof val === "object";
var objectToString = Object.prototype.toString;
var toTypeString = (value) => objectToString.call(value);
var isPlainObject = (val) => {
  if (!isObject$1(val))
    return false;
  const proto = Object.getPrototypeOf(val);
  return proto === null || proto.constructor === Object;
};
var toDisplayString = (val) => {
  return val == null ? "" : isArray(val) || isPlainObject(val) && val.toString === objectToString ? JSON.stringify(val, null, 2) : String(val);
};
function join$1(items, separator = "") {
  return items.reduce((str, item, index) => index === 0 ? str + item : str + separator + item, "");
}
function incrementer(code2) {
  let current = code2;
  return () => ++current;
}
function warn(msg, err) {
  if (typeof console !== "undefined") {
    console.warn(`[intlify] ` + msg);
    if (err) {
      console.warn(err.stack);
    }
  }
}
function createPosition(line, column, offset) {
  return { line, column, offset };
}
function createLocation(start, end, source) {
  const loc = { start, end };
  if (source != null) {
    loc.source = source;
  }
  return loc;
}
var RE_ARGS = /\{([0-9a-zA-Z]+)\}/g;
function format$1(message, ...args) {
  if (args.length === 1 && isObject(args[0])) {
    args = args[0];
  }
  if (!args || !args.hasOwnProperty) {
    args = {};
  }
  return message.replace(RE_ARGS, (match, identifier2) => {
    return args.hasOwnProperty(identifier2) ? args[identifier2] : "";
  });
}
var assign = Object.assign;
var isString = (val) => typeof val === "string";
var isObject = (val) => val !== null && typeof val === "object";
function join(items, separator = "") {
  return items.reduce((str, item, index) => index === 0 ? str + item : str + separator + item, "");
}
var CompileErrorCodes = {
  EXPECTED_TOKEN: 1,
  INVALID_TOKEN_IN_PLACEHOLDER: 2,
  UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
  UNKNOWN_ESCAPE_SEQUENCE: 4,
  INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
  UNBALANCED_CLOSING_BRACE: 6,
  UNTERMINATED_CLOSING_BRACE: 7,
  EMPTY_PLACEHOLDER: 8,
  NOT_ALLOW_NEST_PLACEHOLDER: 9,
  INVALID_LINKED_FORMAT: 10,
  MUST_HAVE_MESSAGES_IN_PLURAL: 11,
  UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
  UNEXPECTED_EMPTY_LINKED_KEY: 13,
  UNEXPECTED_LEXICAL_ANALYSIS: 14,
  UNHANDLED_CODEGEN_NODE_TYPE: 15,
  UNHANDLED_MINIFIER_NODE_TYPE: 16,
  __EXTEND_POINT__: 17
};
var errorMessages = {
  [CompileErrorCodes.EXPECTED_TOKEN]: `Expected token: '{0}'`,
  [CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER]: `Invalid token in placeholder: '{0}'`,
  [CompileErrorCodes.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER]: `Unterminated single quote in placeholder`,
  [CompileErrorCodes.UNKNOWN_ESCAPE_SEQUENCE]: `Unknown escape sequence: \\{0}`,
  [CompileErrorCodes.INVALID_UNICODE_ESCAPE_SEQUENCE]: `Invalid unicode escape sequence: {0}`,
  [CompileErrorCodes.UNBALANCED_CLOSING_BRACE]: `Unbalanced closing brace`,
  [CompileErrorCodes.UNTERMINATED_CLOSING_BRACE]: `Unterminated closing brace`,
  [CompileErrorCodes.EMPTY_PLACEHOLDER]: `Empty placeholder`,
  [CompileErrorCodes.NOT_ALLOW_NEST_PLACEHOLDER]: `Not allowed nest placeholder`,
  [CompileErrorCodes.INVALID_LINKED_FORMAT]: `Invalid linked format`,
  [CompileErrorCodes.MUST_HAVE_MESSAGES_IN_PLURAL]: `Plural must have messages`,
  [CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_MODIFIER]: `Unexpected empty linked modifier`,
  [CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_KEY]: `Unexpected empty linked key`,
  [CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS]: `Unexpected lexical analysis in token: '{0}'`,
  [CompileErrorCodes.UNHANDLED_CODEGEN_NODE_TYPE]: `unhandled codegen node type: '{0}'`,
  [CompileErrorCodes.UNHANDLED_MINIFIER_NODE_TYPE]: `unhandled mimifier node type: '{0}'`
};
function createCompileError(code2, loc, options = {}) {
  const { domain, messages, args } = options;
  const msg = format$1((messages || errorMessages)[code2] || "", ...args || []);
  const error = new SyntaxError(String(msg));
  error.code = code2;
  if (loc) {
    error.location = loc;
  }
  error.domain = domain;
  return error;
}
function defaultOnError(error) {
  throw error;
}
var CHAR_SP = " ";
var CHAR_CR = "\r";
var CHAR_LF = "\n";
var CHAR_LS = String.fromCharCode(8232);
var CHAR_PS = String.fromCharCode(8233);
function createScanner(str) {
  const _buf = str;
  let _index = 0;
  let _line = 1;
  let _column = 1;
  let _peekOffset = 0;
  const isCRLF = (index2) => _buf[index2] === CHAR_CR && _buf[index2 + 1] === CHAR_LF;
  const isLF = (index2) => _buf[index2] === CHAR_LF;
  const isPS = (index2) => _buf[index2] === CHAR_PS;
  const isLS = (index2) => _buf[index2] === CHAR_LS;
  const isLineEnd = (index2) => isCRLF(index2) || isLF(index2) || isPS(index2) || isLS(index2);
  const index = () => _index;
  const line = () => _line;
  const column = () => _column;
  const peekOffset = () => _peekOffset;
  const charAt = (offset) => isCRLF(offset) || isPS(offset) || isLS(offset) ? CHAR_LF : _buf[offset];
  const currentChar = () => charAt(_index);
  const currentPeek = () => charAt(_index + _peekOffset);
  function next() {
    _peekOffset = 0;
    if (isLineEnd(_index)) {
      _line++;
      _column = 0;
    }
    if (isCRLF(_index)) {
      _index++;
    }
    _index++;
    _column++;
    return _buf[_index];
  }
  function peek() {
    if (isCRLF(_index + _peekOffset)) {
      _peekOffset++;
    }
    _peekOffset++;
    return _buf[_index + _peekOffset];
  }
  function reset() {
    _index = 0;
    _line = 1;
    _column = 1;
    _peekOffset = 0;
  }
  function resetPeek(offset = 0) {
    _peekOffset = offset;
  }
  function skipToPeek() {
    const target = _index + _peekOffset;
    while (target !== _index) {
      next();
    }
    _peekOffset = 0;
  }
  return {
    index,
    line,
    column,
    peekOffset,
    charAt,
    currentChar,
    currentPeek,
    next,
    peek,
    reset,
    resetPeek,
    skipToPeek
  };
}
var EOF = void 0;
var DOT = ".";
var LITERAL_DELIMITER = "'";
var ERROR_DOMAIN$3 = "tokenizer";
function createTokenizer(source, options = {}) {
  const location2 = options.location !== false;
  const _scnr = createScanner(source);
  const currentOffset = () => _scnr.index();
  const currentPosition = () => createPosition(_scnr.line(), _scnr.column(), _scnr.index());
  const _initLoc = currentPosition();
  const _initOffset = currentOffset();
  const _context = {
    currentType: 14,
    offset: _initOffset,
    startLoc: _initLoc,
    endLoc: _initLoc,
    lastType: 14,
    lastOffset: _initOffset,
    lastStartLoc: _initLoc,
    lastEndLoc: _initLoc,
    braceNest: 0,
    inLinked: false,
    text: ""
  };
  const context = () => _context;
  const { onError } = options;
  function emitError(code2, pos, offset, ...args) {
    const ctx = context();
    pos.column += offset;
    pos.offset += offset;
    if (onError) {
      const loc = location2 ? createLocation(ctx.startLoc, pos) : null;
      const err = createCompileError(code2, loc, {
        domain: ERROR_DOMAIN$3,
        args
      });
      onError(err);
    }
  }
  function getToken(context2, type, value) {
    context2.endLoc = currentPosition();
    context2.currentType = type;
    const token = { type };
    if (location2) {
      token.loc = createLocation(context2.startLoc, context2.endLoc);
    }
    if (value != null) {
      token.value = value;
    }
    return token;
  }
  const getEndToken = (context2) => getToken(context2, 14);
  function eat(scnr, ch) {
    if (scnr.currentChar() === ch) {
      scnr.next();
      return ch;
    } else {
      emitError(CompileErrorCodes.EXPECTED_TOKEN, currentPosition(), 0, ch);
      return "";
    }
  }
  function peekSpaces(scnr) {
    let buf = "";
    while (scnr.currentPeek() === CHAR_SP || scnr.currentPeek() === CHAR_LF) {
      buf += scnr.currentPeek();
      scnr.peek();
    }
    return buf;
  }
  function skipSpaces(scnr) {
    const buf = peekSpaces(scnr);
    scnr.skipToPeek();
    return buf;
  }
  function isIdentifierStart(ch) {
    if (ch === EOF) {
      return false;
    }
    const cc = ch.charCodeAt(0);
    return cc >= 97 && cc <= 122 || cc >= 65 && cc <= 90 || cc === 95;
  }
  function isNumberStart(ch) {
    if (ch === EOF) {
      return false;
    }
    const cc = ch.charCodeAt(0);
    return cc >= 48 && cc <= 57;
  }
  function isNamedIdentifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ret = isIdentifierStart(scnr.currentPeek());
    scnr.resetPeek();
    return ret;
  }
  function isListIdentifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ch = scnr.currentPeek() === "-" ? scnr.peek() : scnr.currentPeek();
    const ret = isNumberStart(ch);
    scnr.resetPeek();
    return ret;
  }
  function isLiteralStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === LITERAL_DELIMITER;
    scnr.resetPeek();
    return ret;
  }
  function isLinkedDotStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 8) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === ".";
    scnr.resetPeek();
    return ret;
  }
  function isLinkedModifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 9) {
      return false;
    }
    peekSpaces(scnr);
    const ret = isIdentifierStart(scnr.currentPeek());
    scnr.resetPeek();
    return ret;
  }
  function isLinkedDelimiterStart(scnr, context2) {
    const { currentType } = context2;
    if (!(currentType === 8 || currentType === 12)) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === ":";
    scnr.resetPeek();
    return ret;
  }
  function isLinkedReferStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 10) {
      return false;
    }
    const fn = () => {
      const ch = scnr.currentPeek();
      if (ch === "{") {
        return isIdentifierStart(scnr.peek());
      } else if (ch === "@" || ch === "%" || ch === "|" || ch === ":" || ch === "." || ch === CHAR_SP || !ch) {
        return false;
      } else if (ch === CHAR_LF) {
        scnr.peek();
        return fn();
      } else {
        return isIdentifierStart(ch);
      }
    };
    const ret = fn();
    scnr.resetPeek();
    return ret;
  }
  function isPluralStart(scnr) {
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === "|";
    scnr.resetPeek();
    return ret;
  }
  function detectModuloStart(scnr) {
    const spaces = peekSpaces(scnr);
    const ret = scnr.currentPeek() === "%" && scnr.peek() === "{";
    scnr.resetPeek();
    return {
      isModulo: ret,
      hasSpace: spaces.length > 0
    };
  }
  function isTextStart(scnr, reset = true) {
    const fn = (hasSpace = false, prev = "", detectModulo = false) => {
      const ch = scnr.currentPeek();
      if (ch === "{") {
        return prev === "%" ? false : hasSpace;
      } else if (ch === "@" || !ch) {
        return prev === "%" ? true : hasSpace;
      } else if (ch === "%") {
        scnr.peek();
        return fn(hasSpace, "%", true);
      } else if (ch === "|") {
        return prev === "%" || detectModulo ? true : !(prev === CHAR_SP || prev === CHAR_LF);
      } else if (ch === CHAR_SP) {
        scnr.peek();
        return fn(true, CHAR_SP, detectModulo);
      } else if (ch === CHAR_LF) {
        scnr.peek();
        return fn(true, CHAR_LF, detectModulo);
      } else {
        return true;
      }
    };
    const ret = fn();
    reset && scnr.resetPeek();
    return ret;
  }
  function takeChar(scnr, fn) {
    const ch = scnr.currentChar();
    if (ch === EOF) {
      return EOF;
    }
    if (fn(ch)) {
      scnr.next();
      return ch;
    }
    return null;
  }
  function takeIdentifierChar(scnr) {
    const closure = (ch) => {
      const cc = ch.charCodeAt(0);
      return cc >= 97 && cc <= 122 || cc >= 65 && cc <= 90 || cc >= 48 && cc <= 57 || cc === 95 || cc === 36;
    };
    return takeChar(scnr, closure);
  }
  function takeDigit(scnr) {
    const closure = (ch) => {
      const cc = ch.charCodeAt(0);
      return cc >= 48 && cc <= 57;
    };
    return takeChar(scnr, closure);
  }
  function takeHexDigit(scnr) {
    const closure = (ch) => {
      const cc = ch.charCodeAt(0);
      return cc >= 48 && cc <= 57 || cc >= 65 && cc <= 70 || cc >= 97 && cc <= 102;
    };
    return takeChar(scnr, closure);
  }
  function getDigits(scnr) {
    let ch = "";
    let num = "";
    while (ch = takeDigit(scnr)) {
      num += ch;
    }
    return num;
  }
  function readModulo(scnr) {
    skipSpaces(scnr);
    const ch = scnr.currentChar();
    if (ch !== "%") {
      emitError(CompileErrorCodes.EXPECTED_TOKEN, currentPosition(), 0, ch);
    }
    scnr.next();
    return "%";
  }
  function readText(scnr) {
    let buf = "";
    while (true) {
      const ch = scnr.currentChar();
      if (ch === "{" || ch === "}" || ch === "@" || ch === "|" || !ch) {
        break;
      } else if (ch === "%") {
        if (isTextStart(scnr)) {
          buf += ch;
          scnr.next();
        } else {
          break;
        }
      } else if (ch === CHAR_SP || ch === CHAR_LF) {
        if (isTextStart(scnr)) {
          buf += ch;
          scnr.next();
        } else if (isPluralStart(scnr)) {
          break;
        } else {
          buf += ch;
          scnr.next();
        }
      } else {
        buf += ch;
        scnr.next();
      }
    }
    return buf;
  }
  function readNamedIdentifier(scnr) {
    skipSpaces(scnr);
    let ch = "";
    let name = "";
    while (ch = takeIdentifierChar(scnr)) {
      name += ch;
    }
    if (scnr.currentChar() === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
    }
    return name;
  }
  function readListIdentifier(scnr) {
    skipSpaces(scnr);
    let value = "";
    if (scnr.currentChar() === "-") {
      scnr.next();
      value += `-${getDigits(scnr)}`;
    } else {
      value += getDigits(scnr);
    }
    if (scnr.currentChar() === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
    }
    return value;
  }
  function readLiteral(scnr) {
    skipSpaces(scnr);
    eat(scnr, `'`);
    let ch = "";
    let literal = "";
    const fn = (x2) => x2 !== LITERAL_DELIMITER && x2 !== CHAR_LF;
    while (ch = takeChar(scnr, fn)) {
      if (ch === "\\") {
        literal += readEscapeSequence(scnr);
      } else {
        literal += ch;
      }
    }
    const current = scnr.currentChar();
    if (current === CHAR_LF || current === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, currentPosition(), 0);
      if (current === CHAR_LF) {
        scnr.next();
        eat(scnr, `'`);
      }
      return literal;
    }
    eat(scnr, `'`);
    return literal;
  }
  function readEscapeSequence(scnr) {
    const ch = scnr.currentChar();
    switch (ch) {
      case "\\":
      case `'`:
        scnr.next();
        return `\\${ch}`;
      case "u":
        return readUnicodeEscapeSequence(scnr, ch, 4);
      case "U":
        return readUnicodeEscapeSequence(scnr, ch, 6);
      default:
        emitError(CompileErrorCodes.UNKNOWN_ESCAPE_SEQUENCE, currentPosition(), 0, ch);
        return "";
    }
  }
  function readUnicodeEscapeSequence(scnr, unicode, digits) {
    eat(scnr, unicode);
    let sequence = "";
    for (let i = 0; i < digits; i++) {
      const ch = takeHexDigit(scnr);
      if (!ch) {
        emitError(CompileErrorCodes.INVALID_UNICODE_ESCAPE_SEQUENCE, currentPosition(), 0, `\\${unicode}${sequence}${scnr.currentChar()}`);
        break;
      }
      sequence += ch;
    }
    return `\\${unicode}${sequence}`;
  }
  function readInvalidIdentifier(scnr) {
    skipSpaces(scnr);
    let ch = "";
    let identifiers = "";
    const closure = (ch2) => ch2 !== "{" && ch2 !== "}" && ch2 !== CHAR_SP && ch2 !== CHAR_LF;
    while (ch = takeChar(scnr, closure)) {
      identifiers += ch;
    }
    return identifiers;
  }
  function readLinkedModifier(scnr) {
    let ch = "";
    let name = "";
    while (ch = takeIdentifierChar(scnr)) {
      name += ch;
    }
    return name;
  }
  function readLinkedRefer(scnr) {
    const fn = (detect = false, buf) => {
      const ch = scnr.currentChar();
      if (ch === "{" || ch === "%" || ch === "@" || ch === "|" || ch === "(" || ch === ")" || !ch) {
        return buf;
      } else if (ch === CHAR_SP) {
        return buf;
      } else if (ch === CHAR_LF || ch === DOT) {
        buf += ch;
        scnr.next();
        return fn(detect, buf);
      } else {
        buf += ch;
        scnr.next();
        return fn(true, buf);
      }
    };
    return fn(false, "");
  }
  function readPlural(scnr) {
    skipSpaces(scnr);
    const plural = eat(scnr, "|");
    skipSpaces(scnr);
    return plural;
  }
  function readTokenInPlaceholder(scnr, context2) {
    let token = null;
    const ch = scnr.currentChar();
    switch (ch) {
      case "{":
        if (context2.braceNest >= 1) {
          emitError(CompileErrorCodes.NOT_ALLOW_NEST_PLACEHOLDER, currentPosition(), 0);
        }
        scnr.next();
        token = getToken(context2, 2, "{");
        skipSpaces(scnr);
        context2.braceNest++;
        return token;
      case "}":
        if (context2.braceNest > 0 && context2.currentType === 2) {
          emitError(CompileErrorCodes.EMPTY_PLACEHOLDER, currentPosition(), 0);
        }
        scnr.next();
        token = getToken(context2, 3, "}");
        context2.braceNest--;
        context2.braceNest > 0 && skipSpaces(scnr);
        if (context2.inLinked && context2.braceNest === 0) {
          context2.inLinked = false;
        }
        return token;
      case "@":
        if (context2.braceNest > 0) {
          emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
        }
        token = readTokenInLinked(scnr, context2) || getEndToken(context2);
        context2.braceNest = 0;
        return token;
      default:
        let validNamedIdentifier = true;
        let validListIdentifier = true;
        let validLiteral = true;
        if (isPluralStart(scnr)) {
          if (context2.braceNest > 0) {
            emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
          }
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        if (context2.braceNest > 0 && (context2.currentType === 5 || context2.currentType === 6 || context2.currentType === 7)) {
          emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
          context2.braceNest = 0;
          return readToken(scnr, context2);
        }
        if (validNamedIdentifier = isNamedIdentifierStart(scnr, context2)) {
          token = getToken(context2, 5, readNamedIdentifier(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (validListIdentifier = isListIdentifierStart(scnr, context2)) {
          token = getToken(context2, 6, readListIdentifier(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (validLiteral = isLiteralStart(scnr, context2)) {
          token = getToken(context2, 7, readLiteral(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (!validNamedIdentifier && !validListIdentifier && !validLiteral) {
          token = getToken(context2, 13, readInvalidIdentifier(scnr));
          emitError(CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER, currentPosition(), 0, token.value);
          skipSpaces(scnr);
          return token;
        }
        break;
    }
    return token;
  }
  function readTokenInLinked(scnr, context2) {
    const { currentType } = context2;
    let token = null;
    const ch = scnr.currentChar();
    if ((currentType === 8 || currentType === 9 || currentType === 12 || currentType === 10) && (ch === CHAR_LF || ch === CHAR_SP)) {
      emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
    }
    switch (ch) {
      case "@":
        scnr.next();
        token = getToken(context2, 8, "@");
        context2.inLinked = true;
        return token;
      case ".":
        skipSpaces(scnr);
        scnr.next();
        return getToken(context2, 9, ".");
      case ":":
        skipSpaces(scnr);
        scnr.next();
        return getToken(context2, 10, ":");
      default:
        if (isPluralStart(scnr)) {
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        if (isLinkedDotStart(scnr, context2) || isLinkedDelimiterStart(scnr, context2)) {
          skipSpaces(scnr);
          return readTokenInLinked(scnr, context2);
        }
        if (isLinkedModifierStart(scnr, context2)) {
          skipSpaces(scnr);
          return getToken(context2, 12, readLinkedModifier(scnr));
        }
        if (isLinkedReferStart(scnr, context2)) {
          skipSpaces(scnr);
          if (ch === "{") {
            return readTokenInPlaceholder(scnr, context2) || token;
          } else {
            return getToken(context2, 11, readLinkedRefer(scnr));
          }
        }
        if (currentType === 8) {
          emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
        }
        context2.braceNest = 0;
        context2.inLinked = false;
        return readToken(scnr, context2);
    }
  }
  function readToken(scnr, context2) {
    let token = { type: 14 };
    if (context2.braceNest > 0) {
      return readTokenInPlaceholder(scnr, context2) || getEndToken(context2);
    }
    if (context2.inLinked) {
      return readTokenInLinked(scnr, context2) || getEndToken(context2);
    }
    const ch = scnr.currentChar();
    switch (ch) {
      case "{":
        return readTokenInPlaceholder(scnr, context2) || getEndToken(context2);
      case "}":
        emitError(CompileErrorCodes.UNBALANCED_CLOSING_BRACE, currentPosition(), 0);
        scnr.next();
        return getToken(context2, 3, "}");
      case "@":
        return readTokenInLinked(scnr, context2) || getEndToken(context2);
      default:
        if (isPluralStart(scnr)) {
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        const { isModulo, hasSpace } = detectModuloStart(scnr);
        if (isModulo) {
          return hasSpace ? getToken(context2, 0, readText(scnr)) : getToken(context2, 4, readModulo(scnr));
        }
        if (isTextStart(scnr)) {
          return getToken(context2, 0, readText(scnr));
        }
        break;
    }
    return token;
  }
  function nextToken() {
    const { currentType, offset, startLoc, endLoc } = _context;
    _context.lastType = currentType;
    _context.lastOffset = offset;
    _context.lastStartLoc = startLoc;
    _context.lastEndLoc = endLoc;
    _context.offset = currentOffset();
    _context.startLoc = currentPosition();
    if (_scnr.currentChar() === EOF) {
      return getToken(_context, 14);
    }
    return readToken(_scnr, _context);
  }
  return {
    nextToken,
    currentOffset,
    currentPosition,
    context
  };
}
var ERROR_DOMAIN$2 = "parser";
var KNOWN_ESCAPES = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function fromEscapeSequence(match, codePoint4, codePoint6) {
  switch (match) {
    case `\\\\`:
      return `\\`;
    case `\\'`:
      return `'`;
    default: {
      const codePoint = parseInt(codePoint4 || codePoint6, 16);
      if (codePoint <= 55295 || codePoint >= 57344) {
        return String.fromCodePoint(codePoint);
      }
      return "�";
    }
  }
}
function createParser(options = {}) {
  const location2 = options.location !== false;
  const { onError } = options;
  function emitError(tokenzer, code2, start, offset, ...args) {
    const end = tokenzer.currentPosition();
    end.offset += offset;
    end.column += offset;
    if (onError) {
      const loc = location2 ? createLocation(start, end) : null;
      const err = createCompileError(code2, loc, {
        domain: ERROR_DOMAIN$2,
        args
      });
      onError(err);
    }
  }
  function startNode(type, offset, loc) {
    const node = { type };
    if (location2) {
      node.start = offset;
      node.end = offset;
      node.loc = { start: loc, end: loc };
    }
    return node;
  }
  function endNode(node, offset, pos, type) {
    if (type) {
      node.type = type;
    }
    if (location2) {
      node.end = offset;
      if (node.loc) {
        node.loc.end = pos;
      }
    }
  }
  function parseText(tokenizer, value) {
    const context = tokenizer.context();
    const node = startNode(3, context.offset, context.startLoc);
    node.value = value;
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseList(tokenizer, index) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(5, offset, loc);
    node.index = parseInt(index, 10);
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseNamed(tokenizer, key) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(4, offset, loc);
    node.key = key;
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLiteral(tokenizer, value) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(9, offset, loc);
    node.value = value.replace(KNOWN_ESCAPES, fromEscapeSequence);
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLinkedModifier(tokenizer) {
    const token = tokenizer.nextToken();
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(8, offset, loc);
    if (token.type !== 12) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_MODIFIER, context.lastStartLoc, 0);
      node.value = "";
      endNode(node, offset, loc);
      return {
        nextConsumeToken: token,
        node
      };
    }
    if (token.value == null) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
    }
    node.value = token.value || "";
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return {
      node
    };
  }
  function parseLinkedKey(tokenizer, value) {
    const context = tokenizer.context();
    const node = startNode(7, context.offset, context.startLoc);
    node.value = value;
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLinked(tokenizer) {
    const context = tokenizer.context();
    const linkedNode = startNode(6, context.offset, context.startLoc);
    let token = tokenizer.nextToken();
    if (token.type === 9) {
      const parsed = parseLinkedModifier(tokenizer);
      linkedNode.modifier = parsed.node;
      token = parsed.nextConsumeToken || tokenizer.nextToken();
    }
    if (token.type !== 10) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
    }
    token = tokenizer.nextToken();
    if (token.type === 2) {
      token = tokenizer.nextToken();
    }
    switch (token.type) {
      case 11:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseLinkedKey(tokenizer, token.value || "");
        break;
      case 5:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseNamed(tokenizer, token.value || "");
        break;
      case 6:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseList(tokenizer, token.value || "");
        break;
      case 7:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseLiteral(tokenizer, token.value || "");
        break;
      default:
        emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_KEY, context.lastStartLoc, 0);
        const nextContext = tokenizer.context();
        const emptyLinkedKeyNode = startNode(7, nextContext.offset, nextContext.startLoc);
        emptyLinkedKeyNode.value = "";
        endNode(emptyLinkedKeyNode, nextContext.offset, nextContext.startLoc);
        linkedNode.key = emptyLinkedKeyNode;
        endNode(linkedNode, nextContext.offset, nextContext.startLoc);
        return {
          nextConsumeToken: token,
          node: linkedNode
        };
    }
    endNode(linkedNode, tokenizer.currentOffset(), tokenizer.currentPosition());
    return {
      node: linkedNode
    };
  }
  function parseMessage(tokenizer) {
    const context = tokenizer.context();
    const startOffset = context.currentType === 1 ? tokenizer.currentOffset() : context.offset;
    const startLoc = context.currentType === 1 ? context.endLoc : context.startLoc;
    const node = startNode(2, startOffset, startLoc);
    node.items = [];
    let nextToken = null;
    do {
      const token = nextToken || tokenizer.nextToken();
      nextToken = null;
      switch (token.type) {
        case 0:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseText(tokenizer, token.value || ""));
          break;
        case 6:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseList(tokenizer, token.value || ""));
          break;
        case 5:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseNamed(tokenizer, token.value || ""));
          break;
        case 7:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseLiteral(tokenizer, token.value || ""));
          break;
        case 8:
          const parsed = parseLinked(tokenizer);
          node.items.push(parsed.node);
          nextToken = parsed.nextConsumeToken || null;
          break;
      }
    } while (context.currentType !== 14 && context.currentType !== 1);
    const endOffset = context.currentType === 1 ? context.lastOffset : tokenizer.currentOffset();
    const endLoc = context.currentType === 1 ? context.lastEndLoc : tokenizer.currentPosition();
    endNode(node, endOffset, endLoc);
    return node;
  }
  function parsePlural(tokenizer, offset, loc, msgNode) {
    const context = tokenizer.context();
    let hasEmptyMessage = msgNode.items.length === 0;
    const node = startNode(1, offset, loc);
    node.cases = [];
    node.cases.push(msgNode);
    do {
      const msg = parseMessage(tokenizer);
      if (!hasEmptyMessage) {
        hasEmptyMessage = msg.items.length === 0;
      }
      node.cases.push(msg);
    } while (context.currentType !== 14);
    if (hasEmptyMessage) {
      emitError(tokenizer, CompileErrorCodes.MUST_HAVE_MESSAGES_IN_PLURAL, loc, 0);
    }
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseResource(tokenizer) {
    const context = tokenizer.context();
    const { offset, startLoc } = context;
    const msgNode = parseMessage(tokenizer);
    if (context.currentType === 14) {
      return msgNode;
    } else {
      return parsePlural(tokenizer, offset, startLoc, msgNode);
    }
  }
  function parse2(source) {
    const tokenizer = createTokenizer(source, assign({}, options));
    const context = tokenizer.context();
    const node = startNode(0, context.offset, context.startLoc);
    if (location2 && node.loc) {
      node.loc.source = source;
    }
    node.body = parseResource(tokenizer);
    if (options.onCacheKey) {
      node.cacheKey = options.onCacheKey(source);
    }
    if (context.currentType !== 14) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, source[context.offset] || "");
    }
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  return { parse: parse2 };
}
function getTokenCaption(token) {
  if (token.type === 14) {
    return "EOF";
  }
  const name = (token.value || "").replace(/\r?\n/gu, "\\n");
  return name.length > 10 ? name.slice(0, 9) + "…" : name;
}
function createTransformer(ast, options = {}) {
  const _context = {
    ast,
    helpers: /* @__PURE__ */ new Set()
  };
  const context = () => _context;
  const helper = (name) => {
    _context.helpers.add(name);
    return name;
  };
  return { context, helper };
}
function traverseNodes(nodes, transformer) {
  for (let i = 0; i < nodes.length; i++) {
    traverseNode(nodes[i], transformer);
  }
}
function traverseNode(node, transformer) {
  switch (node.type) {
    case 1:
      traverseNodes(node.cases, transformer);
      transformer.helper("plural");
      break;
    case 2:
      traverseNodes(node.items, transformer);
      break;
    case 6:
      const linked = node;
      traverseNode(linked.key, transformer);
      transformer.helper("linked");
      transformer.helper("type");
      break;
    case 5:
      transformer.helper("interpolate");
      transformer.helper("list");
      break;
    case 4:
      transformer.helper("interpolate");
      transformer.helper("named");
      break;
  }
}
function transform(ast, options = {}) {
  const transformer = createTransformer(ast);
  transformer.helper("normalize");
  ast.body && traverseNode(ast.body, transformer);
  const context = transformer.context();
  ast.helpers = Array.from(context.helpers);
}
function optimize(ast) {
  const body = ast.body;
  if (body.type === 2) {
    optimizeMessageNode(body);
  } else {
    body.cases.forEach((c2) => optimizeMessageNode(c2));
  }
  return ast;
}
function optimizeMessageNode(message) {
  if (message.items.length === 1) {
    const item = message.items[0];
    if (item.type === 3 || item.type === 9) {
      message.static = item.value;
      delete item.value;
    }
  } else {
    const values = [];
    for (let i = 0; i < message.items.length; i++) {
      const item = message.items[i];
      if (!(item.type === 3 || item.type === 9)) {
        break;
      }
      if (item.value == null) {
        break;
      }
      values.push(item.value);
    }
    if (values.length === message.items.length) {
      message.static = join(values);
      for (let i = 0; i < message.items.length; i++) {
        const item = message.items[i];
        if (item.type === 3 || item.type === 9) {
          delete item.value;
        }
      }
    }
  }
}
var ERROR_DOMAIN$1 = "minifier";
function minify(node) {
  node.t = node.type;
  switch (node.type) {
    case 0:
      const resource = node;
      minify(resource.body);
      resource.b = resource.body;
      delete resource.body;
      break;
    case 1:
      const plural = node;
      const cases = plural.cases;
      for (let i = 0; i < cases.length; i++) {
        minify(cases[i]);
      }
      plural.c = cases;
      delete plural.cases;
      break;
    case 2:
      const message = node;
      const items = message.items;
      for (let i = 0; i < items.length; i++) {
        minify(items[i]);
      }
      message.i = items;
      delete message.items;
      if (message.static) {
        message.s = message.static;
        delete message.static;
      }
      break;
    case 3:
    case 9:
    case 8:
    case 7:
      const valueNode = node;
      if (valueNode.value) {
        valueNode.v = valueNode.value;
        delete valueNode.value;
      }
      break;
    case 6:
      const linked = node;
      minify(linked.key);
      linked.k = linked.key;
      delete linked.key;
      if (linked.modifier) {
        minify(linked.modifier);
        linked.m = linked.modifier;
        delete linked.modifier;
      }
      break;
    case 5:
      const list = node;
      list.i = list.index;
      delete list.index;
      break;
    case 4:
      const named = node;
      named.k = named.key;
      delete named.key;
      break;
    default: {
      throw createCompileError(CompileErrorCodes.UNHANDLED_MINIFIER_NODE_TYPE, null, {
        domain: ERROR_DOMAIN$1,
        args: [node.type]
      });
    }
  }
  delete node.type;
}
var ERROR_DOMAIN = "parser";
function createCodeGenerator(ast, options) {
  const { sourceMap, filename, breakLineCode, needIndent: _needIndent } = options;
  const location2 = options.location !== false;
  const _context = {
    filename,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    map: void 0,
    breakLineCode,
    needIndent: _needIndent,
    indentLevel: 0
  };
  if (location2 && ast.loc) {
    _context.source = ast.loc.source;
  }
  const context = () => _context;
  function push(code2, node) {
    _context.code += code2;
  }
  function _newline(n2, withBreakLine = true) {
    const _breakLineCode = withBreakLine ? breakLineCode : "";
    push(_needIndent ? _breakLineCode + `  `.repeat(n2) : _breakLineCode);
  }
  function indent(withNewLine = true) {
    const level = ++_context.indentLevel;
    withNewLine && _newline(level);
  }
  function deindent(withNewLine = true) {
    const level = --_context.indentLevel;
    withNewLine && _newline(level);
  }
  function newline() {
    _newline(_context.indentLevel);
  }
  const helper = (key) => `_${key}`;
  const needIndent = () => _context.needIndent;
  return {
    context,
    push,
    indent,
    deindent,
    newline,
    helper,
    needIndent
  };
}
function generateLinkedNode(generator, node) {
  const { helper } = generator;
  generator.push(`${helper("linked")}(`);
  generateNode(generator, node.key);
  if (node.modifier) {
    generator.push(`, `);
    generateNode(generator, node.modifier);
    generator.push(`, _type`);
  } else {
    generator.push(`, undefined, _type`);
  }
  generator.push(`)`);
}
function generateMessageNode(generator, node) {
  const { helper, needIndent } = generator;
  generator.push(`${helper("normalize")}([`);
  generator.indent(needIndent());
  const length = node.items.length;
  for (let i = 0; i < length; i++) {
    generateNode(generator, node.items[i]);
    if (i === length - 1) {
      break;
    }
    generator.push(", ");
  }
  generator.deindent(needIndent());
  generator.push("])");
}
function generatePluralNode(generator, node) {
  const { helper, needIndent } = generator;
  if (node.cases.length > 1) {
    generator.push(`${helper("plural")}([`);
    generator.indent(needIndent());
    const length = node.cases.length;
    for (let i = 0; i < length; i++) {
      generateNode(generator, node.cases[i]);
      if (i === length - 1) {
        break;
      }
      generator.push(", ");
    }
    generator.deindent(needIndent());
    generator.push(`])`);
  }
}
function generateResource(generator, node) {
  if (node.body) {
    generateNode(generator, node.body);
  } else {
    generator.push("null");
  }
}
function generateNode(generator, node) {
  const { helper } = generator;
  switch (node.type) {
    case 0:
      generateResource(generator, node);
      break;
    case 1:
      generatePluralNode(generator, node);
      break;
    case 2:
      generateMessageNode(generator, node);
      break;
    case 6:
      generateLinkedNode(generator, node);
      break;
    case 8:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 7:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 5:
      generator.push(`${helper("interpolate")}(${helper("list")}(${node.index}))`, node);
      break;
    case 4:
      generator.push(`${helper("interpolate")}(${helper("named")}(${JSON.stringify(node.key)}))`, node);
      break;
    case 9:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 3:
      generator.push(JSON.stringify(node.value), node);
      break;
    default: {
      throw createCompileError(CompileErrorCodes.UNHANDLED_CODEGEN_NODE_TYPE, null, {
        domain: ERROR_DOMAIN,
        args: [node.type]
      });
    }
  }
}
var generate = (ast, options = {}) => {
  const mode = isString(options.mode) ? options.mode : "normal";
  const filename = isString(options.filename) ? options.filename : "message.intl";
  const sourceMap = !!options.sourceMap;
  const breakLineCode = options.breakLineCode != null ? options.breakLineCode : mode === "arrow" ? ";" : "\n";
  const needIndent = options.needIndent ? options.needIndent : mode !== "arrow";
  const helpers = ast.helpers || [];
  const generator = createCodeGenerator(ast, {
    mode,
    filename,
    sourceMap,
    breakLineCode,
    needIndent
  });
  generator.push(mode === "normal" ? `function __msg__ (ctx) {` : `(ctx) => {`);
  generator.indent(needIndent);
  if (helpers.length > 0) {
    generator.push(`const { ${join(helpers.map((s2) => `${s2}: _${s2}`), ", ")} } = ctx`);
    generator.newline();
  }
  generator.push(`return `);
  generateNode(generator, ast);
  generator.deindent(needIndent);
  generator.push(`}`);
  delete ast.helpers;
  const { code: code2, map } = generator.context();
  return {
    ast,
    code: code2,
    map: map ? map.toJSON() : void 0
  };
};
function baseCompile$1(source, options = {}) {
  const assignedOptions = assign({}, options);
  const jit = !!assignedOptions.jit;
  const enalbeMinify = !!assignedOptions.minify;
  const enambeOptimize = assignedOptions.optimize == null ? true : assignedOptions.optimize;
  const parser = createParser(assignedOptions);
  const ast = parser.parse(source);
  if (!jit) {
    transform(ast, assignedOptions);
    return generate(ast, assignedOptions);
  } else {
    enambeOptimize && optimize(ast);
    enalbeMinify && minify(ast);
    return { ast, code: "" };
  }
}
function initFeatureFlags$1() {
  if (typeof __INTLIFY_PROD_DEVTOOLS__ !== "boolean") {
    getGlobalThis().__INTLIFY_PROD_DEVTOOLS__ = false;
  }
  if (typeof __INTLIFY_DROP_MESSAGE_COMPILER__ !== "boolean") {
    getGlobalThis().__INTLIFY_DROP_MESSAGE_COMPILER__ = false;
  }
}
var pathStateMachine = [];
pathStateMachine[0] = {
  ["w"]: [0],
  ["i"]: [3, 0],
  ["["]: [4],
  ["o"]: [7]
};
pathStateMachine[1] = {
  ["w"]: [1],
  ["."]: [2],
  ["["]: [4],
  ["o"]: [7]
};
pathStateMachine[2] = {
  ["w"]: [2],
  ["i"]: [3, 0],
  ["0"]: [3, 0]
};
pathStateMachine[3] = {
  ["i"]: [3, 0],
  ["0"]: [3, 0],
  ["w"]: [1, 1],
  ["."]: [2, 1],
  ["["]: [4, 1],
  ["o"]: [7, 1]
};
pathStateMachine[4] = {
  ["'"]: [5, 0],
  ['"']: [6, 0],
  ["["]: [
    4,
    2
  ],
  ["]"]: [1, 3],
  ["o"]: 8,
  ["l"]: [4, 0]
};
pathStateMachine[5] = {
  ["'"]: [4, 0],
  ["o"]: 8,
  ["l"]: [5, 0]
};
pathStateMachine[6] = {
  ['"']: [4, 0],
  ["o"]: 8,
  ["l"]: [6, 0]
};
var literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function isLiteral(exp) {
  return literalValueRE.test(exp);
}
function stripQuotes(str) {
  const a = str.charCodeAt(0);
  const b = str.charCodeAt(str.length - 1);
  return a === b && (a === 34 || a === 39) ? str.slice(1, -1) : str;
}
function getPathCharType(ch) {
  if (ch === void 0 || ch === null) {
    return "o";
  }
  const code2 = ch.charCodeAt(0);
  switch (code2) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
      return ch;
    case 95:
    case 36:
    case 45:
      return "i";
    case 9:
    case 10:
    case 13:
    case 160:
    case 65279:
    case 8232:
    case 8233:
      return "w";
  }
  return "i";
}
function formatSubPath(path) {
  const trimmed = path.trim();
  if (path.charAt(0) === "0" && isNaN(parseInt(path))) {
    return false;
  }
  return isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed;
}
function parse(path) {
  const keys = [];
  let index = -1;
  let mode = 0;
  let subPathDepth = 0;
  let c2;
  let key;
  let newChar;
  let type;
  let transition;
  let action;
  let typeMap;
  const actions = [];
  actions[0] = () => {
    if (key === void 0) {
      key = newChar;
    } else {
      key += newChar;
    }
  };
  actions[1] = () => {
    if (key !== void 0) {
      keys.push(key);
      key = void 0;
    }
  };
  actions[2] = () => {
    actions[0]();
    subPathDepth++;
  };
  actions[3] = () => {
    if (subPathDepth > 0) {
      subPathDepth--;
      mode = 4;
      actions[0]();
    } else {
      subPathDepth = 0;
      if (key === void 0) {
        return false;
      }
      key = formatSubPath(key);
      if (key === false) {
        return false;
      } else {
        actions[1]();
      }
    }
  };
  function maybeUnescapeQuote() {
    const nextChar = path[index + 1];
    if (mode === 5 && nextChar === "'" || mode === 6 && nextChar === '"') {
      index++;
      newChar = "\\" + nextChar;
      actions[0]();
      return true;
    }
  }
  while (mode !== null) {
    index++;
    c2 = path[index];
    if (c2 === "\\" && maybeUnescapeQuote()) {
      continue;
    }
    type = getPathCharType(c2);
    typeMap = pathStateMachine[mode];
    transition = typeMap[type] || typeMap["l"] || 8;
    if (transition === 8) {
      return;
    }
    mode = transition[0];
    if (transition[1] !== void 0) {
      action = actions[transition[1]];
      if (action) {
        newChar = c2;
        if (action() === false) {
          return;
        }
      }
    }
    if (mode === 7) {
      return keys;
    }
  }
}
var cache$1 = /* @__PURE__ */ new Map();
function resolveWithKeyValue(obj, path) {
  return isObject$1(obj) ? obj[path] : null;
}
function resolveValue(obj, path) {
  if (!isObject$1(obj)) {
    return null;
  }
  let hit = cache$1.get(path);
  if (!hit) {
    hit = parse(path);
    if (hit) {
      cache$1.set(path, hit);
    }
  }
  if (!hit) {
    return null;
  }
  const len = hit.length;
  let last = obj;
  let i = 0;
  while (i < len) {
    const val = last[hit[i]];
    if (val === void 0) {
      return null;
    }
    last = val;
    i++;
  }
  return last;
}
var DEFAULT_MODIFIER = (str) => str;
var DEFAULT_MESSAGE = (ctx) => "";
var DEFAULT_MESSAGE_DATA_TYPE = "text";
var DEFAULT_NORMALIZE = (values) => values.length === 0 ? "" : join$1(values);
var DEFAULT_INTERPOLATE = toDisplayString;
function pluralDefault(choice, choicesLength) {
  choice = Math.abs(choice);
  if (choicesLength === 2) {
    return choice ? choice > 1 ? 1 : 0 : 1;
  }
  return choice ? Math.min(choice, 2) : 0;
}
function getPluralIndex(options) {
  const index = isNumber(options.pluralIndex) ? options.pluralIndex : -1;
  return options.named && (isNumber(options.named.count) || isNumber(options.named.n)) ? isNumber(options.named.count) ? options.named.count : isNumber(options.named.n) ? options.named.n : index : index;
}
function normalizeNamed(pluralIndex, props) {
  if (!props.count) {
    props.count = pluralIndex;
  }
  if (!props.n) {
    props.n = pluralIndex;
  }
}
function createMessageContext(options = {}) {
  const locale = options.locale;
  const pluralIndex = getPluralIndex(options);
  const pluralRule = isObject$1(options.pluralRules) && isString$1(locale) && isFunction(options.pluralRules[locale]) ? options.pluralRules[locale] : pluralDefault;
  const orgPluralRule = isObject$1(options.pluralRules) && isString$1(locale) && isFunction(options.pluralRules[locale]) ? pluralDefault : void 0;
  const plural = (messages) => {
    return messages[pluralRule(pluralIndex, messages.length, orgPluralRule)];
  };
  const _list = options.list || [];
  const list = (index) => _list[index];
  const _named = options.named || {};
  isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
  const named = (key) => _named[key];
  function message(key) {
    const msg = isFunction(options.messages) ? options.messages(key) : isObject$1(options.messages) ? options.messages[key] : false;
    return !msg ? options.parent ? options.parent.message(key) : DEFAULT_MESSAGE : msg;
  }
  const _modifier = (name) => options.modifiers ? options.modifiers[name] : DEFAULT_MODIFIER;
  const normalize = isPlainObject(options.processor) && isFunction(options.processor.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE;
  const interpolate = isPlainObject(options.processor) && isFunction(options.processor.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE;
  const type = isPlainObject(options.processor) && isString$1(options.processor.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE;
  const linked = (key, ...args) => {
    const [arg1, arg2] = args;
    let type2 = "text";
    let modifier = "";
    if (args.length === 1) {
      if (isObject$1(arg1)) {
        modifier = arg1.modifier || modifier;
        type2 = arg1.type || type2;
      } else if (isString$1(arg1)) {
        modifier = arg1 || modifier;
      }
    } else if (args.length === 2) {
      if (isString$1(arg1)) {
        modifier = arg1 || modifier;
      }
      if (isString$1(arg2)) {
        type2 = arg2 || type2;
      }
    }
    const ret = message(key)(ctx);
    const msg = type2 === "vnode" && isArray(ret) && modifier ? ret[0] : ret;
    return modifier ? _modifier(modifier)(msg, type2) : msg;
  };
  const ctx = {
    ["list"]: list,
    ["named"]: named,
    ["plural"]: plural,
    ["linked"]: linked,
    ["message"]: message,
    ["type"]: type,
    ["interpolate"]: interpolate,
    ["normalize"]: normalize,
    ["values"]: assign$1({}, _list, _named)
  };
  return ctx;
}
var devtools = null;
function setDevToolsHook(hook) {
  devtools = hook;
}
function initI18nDevTools(i18n2, version2, meta) {
  devtools && devtools.emit("i18n:init", {
    timestamp: Date.now(),
    i18n: i18n2,
    version: version2,
    meta
  });
}
var translateDevTools = createDevToolsHook("function:translate");
function createDevToolsHook(hook) {
  return (payloads) => devtools && devtools.emit(hook, payloads);
}
var CoreWarnCodes = {
  NOT_FOUND_KEY: 1,
  FALLBACK_TO_TRANSLATE: 2,
  CANNOT_FORMAT_NUMBER: 3,
  FALLBACK_TO_NUMBER_FORMAT: 4,
  CANNOT_FORMAT_DATE: 5,
  FALLBACK_TO_DATE_FORMAT: 6,
  EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER: 7,
  __EXTEND_POINT__: 8
};
function fallbackWithSimple(ctx, fallback, start) {
  return [.../* @__PURE__ */ new Set([
    start,
    ...isArray(fallback) ? fallback : isObject$1(fallback) ? Object.keys(fallback) : isString$1(fallback) ? [fallback] : [start]
  ])];
}
function fallbackWithLocaleChain(ctx, fallback, start) {
  const startLocale = isString$1(start) ? start : DEFAULT_LOCALE;
  const context = ctx;
  if (!context.__localeChainCache) {
    context.__localeChainCache = /* @__PURE__ */ new Map();
  }
  let chain = context.__localeChainCache.get(startLocale);
  if (!chain) {
    chain = [];
    let block = [start];
    while (isArray(block)) {
      block = appendBlockToChain(chain, block, fallback);
    }
    const defaults = isArray(fallback) || !isPlainObject(fallback) ? fallback : fallback["default"] ? fallback["default"] : null;
    block = isString$1(defaults) ? [defaults] : defaults;
    if (isArray(block)) {
      appendBlockToChain(chain, block, false);
    }
    context.__localeChainCache.set(startLocale, chain);
  }
  return chain;
}
function appendBlockToChain(chain, block, blocks) {
  let follow = true;
  for (let i = 0; i < block.length && isBoolean(follow); i++) {
    const locale = block[i];
    if (isString$1(locale)) {
      follow = appendLocaleToChain(chain, block[i], blocks);
    }
  }
  return follow;
}
function appendLocaleToChain(chain, locale, blocks) {
  let follow;
  const tokens = locale.split("-");
  do {
    const target = tokens.join("-");
    follow = appendItemToChain(chain, target, blocks);
    tokens.splice(-1, 1);
  } while (tokens.length && follow === true);
  return follow;
}
function appendItemToChain(chain, target, blocks) {
  let follow = false;
  if (!chain.includes(target)) {
    follow = true;
    if (target) {
      follow = target[target.length - 1] !== "!";
      const locale = target.replace(/!/g, "");
      chain.push(locale);
      if ((isArray(blocks) || isPlainObject(blocks)) && blocks[locale]) {
        follow = blocks[locale];
      }
    }
  }
  return follow;
}
var VERSION$1 = "9.4.1";
var NOT_REOSLVED = -1;
var DEFAULT_LOCALE = "en-US";
var MISSING_RESOLVE_VALUE = "";
var capitalize = (str) => `${str.charAt(0).toLocaleUpperCase()}${str.substr(1)}`;
function getDefaultLinkedModifiers() {
  return {
    upper: (val, type) => {
      return type === "text" && isString$1(val) ? val.toUpperCase() : type === "vnode" && isObject$1(val) && "__v_isVNode" in val ? val.children.toUpperCase() : val;
    },
    lower: (val, type) => {
      return type === "text" && isString$1(val) ? val.toLowerCase() : type === "vnode" && isObject$1(val) && "__v_isVNode" in val ? val.children.toLowerCase() : val;
    },
    capitalize: (val, type) => {
      return type === "text" && isString$1(val) ? capitalize(val) : type === "vnode" && isObject$1(val) && "__v_isVNode" in val ? capitalize(val.children) : val;
    }
  };
}
var _compiler;
function registerMessageCompiler(compiler) {
  _compiler = compiler;
}
var _resolver;
function registerMessageResolver(resolver) {
  _resolver = resolver;
}
var _fallbacker;
function registerLocaleFallbacker(fallbacker) {
  _fallbacker = fallbacker;
}
var _additionalMeta = null;
var setAdditionalMeta = (meta) => {
  _additionalMeta = meta;
};
var getAdditionalMeta = () => _additionalMeta;
var _fallbackContext = null;
var setFallbackContext = (context) => {
  _fallbackContext = context;
};
var getFallbackContext = () => _fallbackContext;
var _cid = 0;
function createCoreContext(options = {}) {
  const onWarn = isFunction(options.onWarn) ? options.onWarn : warn;
  const version2 = isString$1(options.version) ? options.version : VERSION$1;
  const locale = isString$1(options.locale) ? options.locale : DEFAULT_LOCALE;
  const fallbackLocale = isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || isString$1(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : locale;
  const messages = isPlainObject(options.messages) ? options.messages : { [locale]: {} };
  const datetimeFormats = isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [locale]: {} };
  const numberFormats = isPlainObject(options.numberFormats) ? options.numberFormats : { [locale]: {} };
  const modifiers = assign$1({}, options.modifiers || {}, getDefaultLinkedModifiers());
  const pluralRules = options.pluralRules || {};
  const missing = isFunction(options.missing) ? options.missing : null;
  const missingWarn = isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  const fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  const fallbackFormat = !!options.fallbackFormat;
  const unresolving = !!options.unresolving;
  const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  const processor = isPlainObject(options.processor) ? options.processor : null;
  const warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  const escapeParameter = !!options.escapeParameter;
  const messageCompiler = isFunction(options.messageCompiler) ? options.messageCompiler : _compiler;
  const messageResolver = isFunction(options.messageResolver) ? options.messageResolver : _resolver || resolveWithKeyValue;
  const localeFallbacker = isFunction(options.localeFallbacker) ? options.localeFallbacker : _fallbacker || fallbackWithSimple;
  const fallbackContext = isObject$1(options.fallbackContext) ? options.fallbackContext : void 0;
  const internalOptions = options;
  const __datetimeFormatters = isObject$1(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : /* @__PURE__ */ new Map();
  const __numberFormatters = isObject$1(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : /* @__PURE__ */ new Map();
  const __meta = isObject$1(internalOptions.__meta) ? internalOptions.__meta : {};
  _cid++;
  const context = {
    version: version2,
    cid: _cid,
    locale,
    fallbackLocale,
    messages,
    modifiers,
    pluralRules,
    missing,
    missingWarn,
    fallbackWarn,
    fallbackFormat,
    unresolving,
    postTranslation,
    processor,
    warnHtmlMessage,
    escapeParameter,
    messageCompiler,
    messageResolver,
    localeFallbacker,
    fallbackContext,
    onWarn,
    __meta
  };
  {
    context.datetimeFormats = datetimeFormats;
    context.numberFormats = numberFormats;
    context.__datetimeFormatters = __datetimeFormatters;
    context.__numberFormatters = __numberFormatters;
  }
  if (__INTLIFY_PROD_DEVTOOLS__) {
    initI18nDevTools(context, version2, __meta);
  }
  return context;
}
function handleMissing(context, key, locale, missingWarn, type) {
  const { missing, onWarn } = context;
  if (missing !== null) {
    const ret = missing(context, locale, key, type);
    return isString$1(ret) ? ret : key;
  } else {
    return key;
  }
}
function updateFallbackLocale(ctx, locale, fallback) {
  const context = ctx;
  context.__localeChainCache = /* @__PURE__ */ new Map();
  ctx.localeFallbacker(ctx, fallback, locale);
}
function format(ast) {
  const msg = (ctx) => formatParts(ctx, ast);
  return msg;
}
function formatParts(ctx, ast) {
  const body = ast.b || ast.body;
  if ((body.t || body.type) === 1) {
    const plural = body;
    const cases = plural.c || plural.cases;
    return ctx.plural(cases.reduce((messages, c2) => [
      ...messages,
      formatMessageParts(ctx, c2)
    ], []));
  } else {
    return formatMessageParts(ctx, body);
  }
}
function formatMessageParts(ctx, node) {
  const _static = node.s || node.static;
  if (_static) {
    return ctx.type === "text" ? _static : ctx.normalize([_static]);
  } else {
    const messages = (node.i || node.items).reduce((acm, c2) => [...acm, formatMessagePart(ctx, c2)], []);
    return ctx.normalize(messages);
  }
}
function formatMessagePart(ctx, node) {
  const type = node.t || node.type;
  switch (type) {
    case 3:
      const text = node;
      return text.v || text.value;
    case 9:
      const literal = node;
      return literal.v || literal.value;
    case 4:
      const named = node;
      return ctx.interpolate(ctx.named(named.k || named.key));
    case 5:
      const list = node;
      return ctx.interpolate(ctx.list(list.i || list.index));
    case 6:
      const linked = node;
      const modifier = linked.m || linked.modifier;
      return ctx.linked(formatMessagePart(ctx, linked.k || linked.key), modifier ? formatMessagePart(ctx, modifier) : void 0, ctx.type);
    case 7:
      const linkedKey = node;
      return linkedKey.v || linkedKey.value;
    case 8:
      const linkedModifier = node;
      return linkedModifier.v || linkedModifier.value;
    default:
      throw new Error(`unhandled node type on format message part: ${type}`);
  }
}
var code$2 = CompileErrorCodes.__EXTEND_POINT__;
var inc$2 = incrementer(code$2);
var CoreErrorCodes = {
  INVALID_ARGUMENT: code$2,
  INVALID_DATE_ARGUMENT: inc$2(),
  INVALID_ISO_DATE_ARGUMENT: inc$2(),
  NOT_SUPPORT_NON_STRING_MESSAGE: inc$2(),
  __EXTEND_POINT__: inc$2()
};
function createCoreError(code2) {
  return createCompileError(code2, null, void 0);
}
var defaultOnCacheKey = (message) => message;
var compileCache = /* @__PURE__ */ Object.create(null);
var isMessageAST = (val) => isObject$1(val) && (val.t === 0 || val.type === 0) && ("b" in val || "body" in val);
function baseCompile(message, options = {}) {
  let detectError = false;
  const onError = options.onError || defaultOnError;
  options.onError = (err) => {
    detectError = true;
    onError(err);
  };
  return __spreadProps(__spreadValues({}, baseCompile$1(message, options)), { detectError });
}
function compile(message, context) {
  if (!__INTLIFY_DROP_MESSAGE_COMPILER__ && isString$1(message)) {
    isBoolean(context.warnHtmlMessage) ? context.warnHtmlMessage : true;
    const onCacheKey = context.onCacheKey || defaultOnCacheKey;
    const cacheKey = onCacheKey(message);
    const cached = compileCache[cacheKey];
    if (cached) {
      return cached;
    }
    const { ast, detectError } = baseCompile(message, __spreadProps(__spreadValues({}, context), {
      location: false,
      jit: true
    }));
    const msg = format(ast);
    return !detectError ? compileCache[cacheKey] = msg : msg;
  } else {
    const cacheKey = message.cacheKey;
    if (cacheKey) {
      const cached = compileCache[cacheKey];
      if (cached) {
        return cached;
      }
      return compileCache[cacheKey] = format(message);
    } else {
      return format(message);
    }
  }
}
var NOOP_MESSAGE_FUNCTION = () => "";
var isMessageFunction = (val) => isFunction(val);
function translate(context, ...args) {
  const { fallbackFormat, postTranslation, unresolving, messageCompiler, fallbackLocale, messages } = context;
  const [key, options] = parseTranslateArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const escapeParameter = isBoolean(options.escapeParameter) ? options.escapeParameter : context.escapeParameter;
  const resolvedMessage = !!options.resolvedMessage;
  const defaultMsgOrKey = isString$1(options.default) || isBoolean(options.default) ? !isBoolean(options.default) ? options.default : !messageCompiler ? () => key : key : fallbackFormat ? !messageCompiler ? () => key : key : "";
  const enableDefaultMsg = fallbackFormat || defaultMsgOrKey !== "";
  const locale = isString$1(options.locale) ? options.locale : context.locale;
  escapeParameter && escapeParams(options);
  let [formatScope, targetLocale, message] = !resolvedMessage ? resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) : [
    key,
    locale,
    messages[locale] || {}
  ];
  let format2 = formatScope;
  let cacheBaseKey = key;
  if (!resolvedMessage && !(isString$1(format2) || isMessageAST(format2) || isMessageFunction(format2))) {
    if (enableDefaultMsg) {
      format2 = defaultMsgOrKey;
      cacheBaseKey = format2;
    }
  }
  if (!resolvedMessage && (!(isString$1(format2) || isMessageAST(format2) || isMessageFunction(format2)) || !isString$1(targetLocale))) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let occurred = false;
  const onError = () => {
    occurred = true;
  };
  const msg = !isMessageFunction(format2) ? compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, onError) : format2;
  if (occurred) {
    return format2;
  }
  const ctxOptions = getMessageContextOptions(context, targetLocale, message, options);
  const msgContext = createMessageContext(ctxOptions);
  const messaged = evaluateMessage(context, msg, msgContext);
  const ret = postTranslation ? postTranslation(messaged, key) : messaged;
  if (__INTLIFY_PROD_DEVTOOLS__) {
    const payloads = {
      timestamp: Date.now(),
      key: isString$1(key) ? key : isMessageFunction(format2) ? format2.key : "",
      locale: targetLocale || (isMessageFunction(format2) ? format2.locale : ""),
      format: isString$1(format2) ? format2 : isMessageFunction(format2) ? format2.source : "",
      message: ret
    };
    payloads.meta = assign$1({}, context.__meta, getAdditionalMeta() || {});
    translateDevTools(payloads);
  }
  return ret;
}
function escapeParams(options) {
  if (isArray(options.list)) {
    options.list = options.list.map((item) => isString$1(item) ? escapeHtml(item) : item);
  } else if (isObject$1(options.named)) {
    Object.keys(options.named).forEach((key) => {
      if (isString$1(options.named[key])) {
        options.named[key] = escapeHtml(options.named[key]);
      }
    });
  }
}
function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
  const { messages, onWarn, messageResolver: resolveValue2, localeFallbacker } = context;
  const locales = localeFallbacker(context, fallbackLocale, locale);
  let message = {};
  let targetLocale;
  let format2 = null;
  const type = "translate";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = locales[i];
    message = messages[targetLocale] || {};
    if ((format2 = resolveValue2(message, key)) === null) {
      format2 = message[key];
    }
    if (isString$1(format2) || isMessageAST(format2) || isMessageFunction(format2)) {
      break;
    }
    const missingRet = handleMissing(
      context,
      key,
      targetLocale,
      missingWarn,
      type
    );
    if (missingRet !== key) {
      format2 = missingRet;
    }
  }
  return [format2, targetLocale, message];
}
function compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, onError) {
  const { messageCompiler, warnHtmlMessage } = context;
  if (isMessageFunction(format2)) {
    const msg2 = format2;
    msg2.locale = msg2.locale || targetLocale;
    msg2.key = msg2.key || key;
    return msg2;
  }
  if (messageCompiler == null) {
    const msg2 = () => format2;
    msg2.locale = targetLocale;
    msg2.key = key;
    return msg2;
  }
  const msg = messageCompiler(format2, getCompileContext(context, targetLocale, cacheBaseKey, format2, warnHtmlMessage, onError));
  msg.locale = targetLocale;
  msg.key = key;
  msg.source = format2;
  return msg;
}
function evaluateMessage(context, msg, msgCtx) {
  const messaged = msg(msgCtx);
  return messaged;
}
function parseTranslateArgs(...args) {
  const [arg1, arg2, arg3] = args;
  const options = {};
  if (!isString$1(arg1) && !isNumber(arg1) && !isMessageFunction(arg1) && !isMessageAST(arg1)) {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  const key = isNumber(arg1) ? String(arg1) : isMessageFunction(arg1) ? arg1 : arg1;
  if (isNumber(arg2)) {
    options.plural = arg2;
  } else if (isString$1(arg2)) {
    options.default = arg2;
  } else if (isPlainObject(arg2) && !isEmptyObject(arg2)) {
    options.named = arg2;
  } else if (isArray(arg2)) {
    options.list = arg2;
  }
  if (isNumber(arg3)) {
    options.plural = arg3;
  } else if (isString$1(arg3)) {
    options.default = arg3;
  } else if (isPlainObject(arg3)) {
    assign$1(options, arg3);
  }
  return [key, options];
}
function getCompileContext(context, locale, key, source, warnHtmlMessage, onError) {
  return {
    locale,
    key,
    warnHtmlMessage,
    onError: (err) => {
      onError && onError(err);
      {
        throw err;
      }
    },
    onCacheKey: (source2) => generateFormatCacheKey(locale, key, source2)
  };
}
function getMessageContextOptions(context, locale, message, options) {
  const { modifiers, pluralRules, messageResolver: resolveValue2, fallbackLocale, fallbackWarn, missingWarn, fallbackContext } = context;
  const resolveMessage = (key) => {
    let val = resolveValue2(message, key);
    if (val == null && fallbackContext) {
      const [, , message2] = resolveMessageFormat(fallbackContext, key, locale, fallbackLocale, fallbackWarn, missingWarn);
      val = resolveValue2(message2, key);
    }
    if (isString$1(val) || isMessageAST(val)) {
      let occurred = false;
      const onError = () => {
        occurred = true;
      };
      const msg = compileMessageFormat(context, key, locale, val, key, onError);
      return !occurred ? msg : NOOP_MESSAGE_FUNCTION;
    } else if (isMessageFunction(val)) {
      return val;
    } else {
      return NOOP_MESSAGE_FUNCTION;
    }
  };
  const ctxOptions = {
    locale,
    modifiers,
    pluralRules,
    messages: resolveMessage
  };
  if (context.processor) {
    ctxOptions.processor = context.processor;
  }
  if (options.list) {
    ctxOptions.list = options.list;
  }
  if (options.named) {
    ctxOptions.named = options.named;
  }
  if (isNumber(options.plural)) {
    ctxOptions.pluralIndex = options.plural;
  }
  return ctxOptions;
}
function datetime(context, ...args) {
  const { datetimeFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
  const { __datetimeFormatters } = context;
  const [key, value, options, overrides] = parseDateTimeArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = isString$1(options.locale) ? options.locale : context.locale;
  const locales = localeFallbacker(
    context,
    fallbackLocale,
    locale
  );
  if (!isString$1(key) || key === "") {
    return new Intl.DateTimeFormat(locale, overrides).format(value);
  }
  let datetimeFormat = {};
  let targetLocale;
  let format2 = null;
  const type = "datetime format";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = locales[i];
    datetimeFormat = datetimeFormats[targetLocale] || {};
    format2 = datetimeFormat[key];
    if (isPlainObject(format2))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
  }
  if (!isPlainObject(format2) || !isString$1(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id = `${targetLocale}__${key}`;
  if (!isEmptyObject(overrides)) {
    id = `${id}__${JSON.stringify(overrides)}`;
  }
  let formatter = __datetimeFormatters.get(id);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(targetLocale, assign$1({}, format2, overrides));
    __datetimeFormatters.set(id, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
var DATETIME_FORMAT_OPTIONS_KEYS = [
  "localeMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName",
  "formatMatcher",
  "hour12",
  "timeZone",
  "dateStyle",
  "timeStyle",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "hourCycle",
  "fractionalSecondDigits"
];
function parseDateTimeArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  const options = {};
  let overrides = {};
  let value;
  if (isString$1(arg1)) {
    const matches = arg1.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!matches) {
      throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
    }
    const dateTime = matches[3] ? matches[3].trim().startsWith("T") ? `${matches[1].trim()}${matches[3].trim()}` : `${matches[1].trim()}T${matches[3].trim()}` : matches[1].trim();
    value = new Date(dateTime);
    try {
      value.toISOString();
    } catch (e2) {
      throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (isDate(arg1)) {
    if (isNaN(arg1.getTime())) {
      throw createCoreError(CoreErrorCodes.INVALID_DATE_ARGUMENT);
    }
    value = arg1;
  } else if (isNumber(arg1)) {
    value = arg1;
  } else {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  if (isString$1(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
    Object.keys(arg2).forEach((key) => {
      if (DATETIME_FORMAT_OPTIONS_KEYS.includes(key)) {
        overrides[key] = arg2[key];
      } else {
        options[key] = arg2[key];
      }
    });
  }
  if (isString$1(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearDateTimeFormat(ctx, locale, format2) {
  const context = ctx;
  for (const key in format2) {
    const id = `${locale}__${key}`;
    if (!context.__datetimeFormatters.has(id)) {
      continue;
    }
    context.__datetimeFormatters.delete(id);
  }
}
function number(context, ...args) {
  const { numberFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
  const { __numberFormatters } = context;
  const [key, value, options, overrides] = parseNumberArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = isString$1(options.locale) ? options.locale : context.locale;
  const locales = localeFallbacker(
    context,
    fallbackLocale,
    locale
  );
  if (!isString$1(key) || key === "") {
    return new Intl.NumberFormat(locale, overrides).format(value);
  }
  let numberFormat = {};
  let targetLocale;
  let format2 = null;
  const type = "number format";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = locales[i];
    numberFormat = numberFormats[targetLocale] || {};
    format2 = numberFormat[key];
    if (isPlainObject(format2))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
  }
  if (!isPlainObject(format2) || !isString$1(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id = `${targetLocale}__${key}`;
  if (!isEmptyObject(overrides)) {
    id = `${id}__${JSON.stringify(overrides)}`;
  }
  let formatter = __numberFormatters.get(id);
  if (!formatter) {
    formatter = new Intl.NumberFormat(targetLocale, assign$1({}, format2, overrides));
    __numberFormatters.set(id, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
var NUMBER_FORMAT_OPTIONS_KEYS = [
  "localeMatcher",
  "style",
  "currency",
  "currencyDisplay",
  "currencySign",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "compactDisplay",
  "notation",
  "signDisplay",
  "unit",
  "unitDisplay",
  "roundingMode",
  "roundingPriority",
  "roundingIncrement",
  "trailingZeroDisplay"
];
function parseNumberArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  const options = {};
  let overrides = {};
  if (!isNumber(arg1)) {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  const value = arg1;
  if (isString$1(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
    Object.keys(arg2).forEach((key) => {
      if (NUMBER_FORMAT_OPTIONS_KEYS.includes(key)) {
        overrides[key] = arg2[key];
      } else {
        options[key] = arg2[key];
      }
    });
  }
  if (isString$1(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearNumberFormat(ctx, locale, format2) {
  const context = ctx;
  for (const key in format2) {
    const id = `${locale}__${key}`;
    if (!context.__numberFormatters.has(id)) {
      continue;
    }
    context.__numberFormatters.delete(id);
  }
}
{
  initFeatureFlags$1();
}
var VERSION = "9.4.1";
function initFeatureFlags() {
  if (typeof __VUE_I18N_FULL_INSTALL__ !== "boolean") {
    getGlobalThis().__VUE_I18N_FULL_INSTALL__ = true;
  }
  if (typeof __VUE_I18N_LEGACY_API__ !== "boolean") {
    getGlobalThis().__VUE_I18N_LEGACY_API__ = true;
  }
  if (typeof __INTLIFY_DROP_MESSAGE_COMPILER__ !== "boolean") {
    getGlobalThis().__INTLIFY_DROP_MESSAGE_COMPILER__ = false;
  }
  if (typeof __INTLIFY_PROD_DEVTOOLS__ !== "boolean") {
    getGlobalThis().__INTLIFY_PROD_DEVTOOLS__ = false;
  }
}
var code$1 = CoreWarnCodes.__EXTEND_POINT__;
var inc$1 = incrementer(code$1);
({
  FALLBACK_TO_ROOT: code$1,
  NOT_SUPPORTED_PRESERVE: inc$1(),
  NOT_SUPPORTED_FORMATTER: inc$1(),
  NOT_SUPPORTED_PRESERVE_DIRECTIVE: inc$1(),
  NOT_SUPPORTED_GET_CHOICE_INDEX: inc$1(),
  COMPONENT_NAME_LEGACY_COMPATIBLE: inc$1(),
  NOT_FOUND_PARENT_SCOPE: inc$1(),
  IGNORE_OBJ_FLATTEN: inc$1(),
  NOTICE_DROP_ALLOW_COMPOSITION: inc$1()
});
var code = CoreErrorCodes.__EXTEND_POINT__;
var inc = incrementer(code);
var I18nErrorCodes = {
  UNEXPECTED_RETURN_TYPE: code,
  INVALID_ARGUMENT: inc(),
  MUST_BE_CALL_SETUP_TOP: inc(),
  NOT_INSTALLED: inc(),
  NOT_AVAILABLE_IN_LEGACY_MODE: inc(),
  REQUIRED_VALUE: inc(),
  INVALID_VALUE: inc(),
  CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: inc(),
  NOT_INSTALLED_WITH_PROVIDE: inc(),
  UNEXPECTED_ERROR: inc(),
  NOT_COMPATIBLE_LEGACY_VUE_I18N: inc(),
  BRIDGE_SUPPORT_VUE_2_ONLY: inc(),
  MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: inc(),
  NOT_AVAILABLE_COMPOSITION_IN_LEGACY: inc(),
  __EXTEND_POINT__: inc()
};
function createI18nError(code2, ...args) {
  return createCompileError(code2, null, void 0);
}
var TranslateVNodeSymbol = makeSymbol("__translateVNode");
var DatetimePartsSymbol = makeSymbol("__datetimeParts");
var NumberPartsSymbol = makeSymbol("__numberParts");
var SetPluralRulesSymbol = makeSymbol("__setPluralRules");
makeSymbol("__intlifyMeta");
var InejctWithOptionSymbol = makeSymbol("__injectWithOption");
var DisposeSymbol = makeSymbol("__dispose");
function handleFlatJson(obj) {
  if (!isObject$1(obj)) {
    return obj;
  }
  for (const key in obj) {
    if (!hasOwn(obj, key)) {
      continue;
    }
    if (!key.includes(".")) {
      if (isObject$1(obj[key])) {
        handleFlatJson(obj[key]);
      }
    } else {
      const subKeys = key.split(".");
      const lastIndex = subKeys.length - 1;
      let currentObj = obj;
      let hasStringValue = false;
      for (let i = 0; i < lastIndex; i++) {
        if (!(subKeys[i] in currentObj)) {
          currentObj[subKeys[i]] = {};
        }
        if (!isObject$1(currentObj[subKeys[i]])) {
          hasStringValue = true;
          break;
        }
        currentObj = currentObj[subKeys[i]];
      }
      if (!hasStringValue) {
        currentObj[subKeys[lastIndex]] = obj[key];
        delete obj[key];
      }
      if (isObject$1(currentObj[subKeys[lastIndex]])) {
        handleFlatJson(currentObj[subKeys[lastIndex]]);
      }
    }
  }
  return obj;
}
function getLocaleMessages(locale, options) {
  const { messages, __i18n, messageResolver, flatJson } = options;
  const ret = isPlainObject(messages) ? messages : isArray(__i18n) ? {} : { [locale]: {} };
  if (isArray(__i18n)) {
    __i18n.forEach((custom) => {
      if ("locale" in custom && "resource" in custom) {
        const { locale: locale2, resource } = custom;
        if (locale2) {
          ret[locale2] = ret[locale2] || {};
          deepCopy(resource, ret[locale2]);
        } else {
          deepCopy(resource, ret);
        }
      } else {
        isString$1(custom) && deepCopy(JSON.parse(custom), ret);
      }
    });
  }
  if (messageResolver == null && flatJson) {
    for (const key in ret) {
      if (hasOwn(ret, key)) {
        handleFlatJson(ret[key]);
      }
    }
  }
  return ret;
}
var isNotObjectOrIsArray = (val) => !isObject$1(val) || isArray(val);
function deepCopy(src, des) {
  if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
    throw createI18nError(I18nErrorCodes.INVALID_VALUE);
  }
  for (const key in src) {
    if (hasOwn(src, key)) {
      if (isNotObjectOrIsArray(src[key]) || isNotObjectOrIsArray(des[key])) {
        des[key] = src[key];
      } else {
        deepCopy(src[key], des[key]);
      }
    }
  }
}
function getComponentOptions(instance) {
  return instance.type;
}
function adjustI18nResources(gl, options, componentOptions) {
  let messages = isObject$1(options.messages) ? options.messages : {};
  if ("__i18nGlobal" in componentOptions) {
    messages = getLocaleMessages(gl.locale.value, {
      messages,
      __i18n: componentOptions.__i18nGlobal
    });
  }
  const locales = Object.keys(messages);
  if (locales.length) {
    locales.forEach((locale) => {
      gl.mergeLocaleMessage(locale, messages[locale]);
    });
  }
  {
    if (isObject$1(options.datetimeFormats)) {
      const locales2 = Object.keys(options.datetimeFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          gl.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
        });
      }
    }
    if (isObject$1(options.numberFormats)) {
      const locales2 = Object.keys(options.numberFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          gl.mergeNumberFormat(locale, options.numberFormats[locale]);
        });
      }
    }
  }
}
function createTextNode(key) {
  return createVNode(Text, null, key, 0);
}
var DEVTOOLS_META = "__INTLIFY_META__";
var composerID = 0;
function defineCoreMissingHandler(missing) {
  return (ctx, locale, key, type) => {
    return missing(locale, key, getCurrentInstance() || void 0, type);
  };
}
var getMetaInfo = () => {
  const instance = getCurrentInstance();
  let meta = null;
  return instance && (meta = getComponentOptions(instance)[DEVTOOLS_META]) ? { [DEVTOOLS_META]: meta } : null;
};
function createComposer(options = {}, VueI18nLegacy) {
  const { __root, __injectWithOption } = options;
  const _isGlobal = __root === void 0;
  let _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : true;
  const _locale = ref(
    __root && _inheritLocale ? __root.locale.value : isString$1(options.locale) ? options.locale : DEFAULT_LOCALE
  );
  const _fallbackLocale = ref(
    __root && _inheritLocale ? __root.fallbackLocale.value : isString$1(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value
  );
  const _messages = ref(getLocaleMessages(_locale.value, options));
  const _datetimeFormats = ref(isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
  const _numberFormats = ref(isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
  let _missingWarn = __root ? __root.missingWarn : isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  let _fallbackWarn = __root ? __root.fallbackWarn : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  let _fallbackRoot = __root ? __root.fallbackRoot : isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
  let _fallbackFormat = !!options.fallbackFormat;
  let _missing = isFunction(options.missing) ? options.missing : null;
  let _runtimeMissing = isFunction(options.missing) ? defineCoreMissingHandler(options.missing) : null;
  let _postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  let _warnHtmlMessage = __root ? __root.warnHtmlMessage : isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  let _escapeParameter = !!options.escapeParameter;
  const _modifiers = __root ? __root.modifiers : isPlainObject(options.modifiers) ? options.modifiers : {};
  let _pluralRules = options.pluralRules || __root && __root.pluralRules;
  let _context;
  const getCoreContext = () => {
    _isGlobal && setFallbackContext(null);
    const ctxOptions = {
      version: VERSION,
      locale: _locale.value,
      fallbackLocale: _fallbackLocale.value,
      messages: _messages.value,
      modifiers: _modifiers,
      pluralRules: _pluralRules,
      missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
      missingWarn: _missingWarn,
      fallbackWarn: _fallbackWarn,
      fallbackFormat: _fallbackFormat,
      unresolving: true,
      postTranslation: _postTranslation === null ? void 0 : _postTranslation,
      warnHtmlMessage: _warnHtmlMessage,
      escapeParameter: _escapeParameter,
      messageResolver: options.messageResolver,
      messageCompiler: options.messageCompiler,
      __meta: { framework: "vue" }
    };
    {
      ctxOptions.datetimeFormats = _datetimeFormats.value;
      ctxOptions.numberFormats = _numberFormats.value;
      ctxOptions.__datetimeFormatters = isPlainObject(_context) ? _context.__datetimeFormatters : void 0;
      ctxOptions.__numberFormatters = isPlainObject(_context) ? _context.__numberFormatters : void 0;
    }
    const ctx = createCoreContext(ctxOptions);
    _isGlobal && setFallbackContext(ctx);
    return ctx;
  };
  _context = getCoreContext();
  updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
  function trackReactivityValues() {
    return [
      _locale.value,
      _fallbackLocale.value,
      _messages.value,
      _datetimeFormats.value,
      _numberFormats.value
    ];
  }
  const locale = computed({
    get: () => _locale.value,
    set: (val) => {
      _locale.value = val;
      _context.locale = _locale.value;
    }
  });
  const fallbackLocale = computed({
    get: () => _fallbackLocale.value,
    set: (val) => {
      _fallbackLocale.value = val;
      _context.fallbackLocale = _fallbackLocale.value;
      updateFallbackLocale(_context, _locale.value, val);
    }
  });
  const messages = computed(() => _messages.value);
  const datetimeFormats = computed(() => _datetimeFormats.value);
  const numberFormats = computed(() => _numberFormats.value);
  function getPostTranslationHandler() {
    return isFunction(_postTranslation) ? _postTranslation : null;
  }
  function setPostTranslationHandler(handler) {
    _postTranslation = handler;
    _context.postTranslation = handler;
  }
  function getMissingHandler() {
    return _missing;
  }
  function setMissingHandler(handler) {
    if (handler !== null) {
      _runtimeMissing = defineCoreMissingHandler(handler);
    }
    _missing = handler;
    _context.missing = _runtimeMissing;
  }
  const wrapWithDeps = (fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) => {
    trackReactivityValues();
    let ret;
    try {
      if (__INTLIFY_PROD_DEVTOOLS__) {
        setAdditionalMeta(getMetaInfo());
      }
      if (!_isGlobal) {
        _context.fallbackContext = __root ? getFallbackContext() : void 0;
      }
      ret = fn(_context);
    } finally {
      if (__INTLIFY_PROD_DEVTOOLS__) {
        setAdditionalMeta(null);
      }
      if (!_isGlobal) {
        _context.fallbackContext = void 0;
      }
    }
    if (isNumber(ret) && ret === NOT_REOSLVED) {
      const [key, arg2] = argumentParser();
      return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
    } else if (successCondition(ret)) {
      return ret;
    } else {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_RETURN_TYPE);
    }
  };
  function t2(...args) {
    return wrapWithDeps((context) => Reflect.apply(translate, null, [context, ...args]), () => parseTranslateArgs(...args), "translate", (root) => Reflect.apply(root.t, root, [...args]), (key) => key, (val) => isString$1(val));
  }
  function rt(...args) {
    const [arg1, arg2, arg3] = args;
    if (arg3 && !isObject$1(arg3)) {
      throw createI18nError(I18nErrorCodes.INVALID_ARGUMENT);
    }
    return t2(...[arg1, arg2, assign$1({ resolvedMessage: true }, arg3 || {})]);
  }
  function d(...args) {
    return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root) => Reflect.apply(root.d, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString$1(val));
  }
  function n2(...args) {
    return wrapWithDeps((context) => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root) => Reflect.apply(root.n, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString$1(val));
  }
  function normalize(values) {
    return values.map((val) => isString$1(val) || isNumber(val) || isBoolean(val) ? createTextNode(String(val)) : val);
  }
  const interpolate = (val) => val;
  const processor = {
    normalize,
    interpolate,
    type: "vnode"
  };
  function translateVNode(...args) {
    return wrapWithDeps(
      (context) => {
        let ret;
        const _context2 = context;
        try {
          _context2.processor = processor;
          ret = Reflect.apply(translate, null, [_context2, ...args]);
        } finally {
          _context2.processor = null;
        }
        return ret;
      },
      () => parseTranslateArgs(...args),
      "translate",
      (root) => root[TranslateVNodeSymbol](...args),
      (key) => [createTextNode(key)],
      (val) => isArray(val)
    );
  }
  function numberParts(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(number, null, [context, ...args]),
      () => parseNumberArgs(...args),
      "number format",
      (root) => root[NumberPartsSymbol](...args),
      () => [],
      (val) => isString$1(val) || isArray(val)
    );
  }
  function datetimeParts(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(datetime, null, [context, ...args]),
      () => parseDateTimeArgs(...args),
      "datetime format",
      (root) => root[DatetimePartsSymbol](...args),
      () => [],
      (val) => isString$1(val) || isArray(val)
    );
  }
  function setPluralRules(rules) {
    _pluralRules = rules;
    _context.pluralRules = _pluralRules;
  }
  function te2(key, locale2) {
    const targetLocale = isString$1(locale2) ? locale2 : _locale.value;
    const message = getLocaleMessage(targetLocale);
    return _context.messageResolver(message, key) !== null;
  }
  function resolveMessages(key) {
    let messages2 = null;
    const locales = fallbackWithLocaleChain(_context, _fallbackLocale.value, _locale.value);
    for (let i = 0; i < locales.length; i++) {
      const targetLocaleMessages = _messages.value[locales[i]] || {};
      const messageValue = _context.messageResolver(targetLocaleMessages, key);
      if (messageValue != null) {
        messages2 = messageValue;
        break;
      }
    }
    return messages2;
  }
  function tm(key) {
    const messages2 = resolveMessages(key);
    return messages2 != null ? messages2 : __root ? __root.tm(key) || {} : {};
  }
  function getLocaleMessage(locale2) {
    return _messages.value[locale2] || {};
  }
  function setLocaleMessage(locale2, message) {
    _messages.value[locale2] = message;
    _context.messages = _messages.value;
  }
  function mergeLocaleMessage(locale2, message) {
    _messages.value[locale2] = _messages.value[locale2] || {};
    deepCopy(message, _messages.value[locale2]);
    _context.messages = _messages.value;
  }
  function getDateTimeFormat(locale2) {
    return _datetimeFormats.value[locale2] || {};
  }
  function setDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = format2;
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function mergeDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = assign$1(_datetimeFormats.value[locale2] || {}, format2);
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function getNumberFormat(locale2) {
    return _numberFormats.value[locale2] || {};
  }
  function setNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = format2;
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  function mergeNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = assign$1(_numberFormats.value[locale2] || {}, format2);
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  composerID++;
  if (__root && inBrowser) {
    watch(__root.locale, (val) => {
      if (_inheritLocale) {
        _locale.value = val;
        _context.locale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
    watch(__root.fallbackLocale, (val) => {
      if (_inheritLocale) {
        _fallbackLocale.value = val;
        _context.fallbackLocale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
  }
  const composer = {
    id: composerID,
    locale,
    fallbackLocale,
    get inheritLocale() {
      return _inheritLocale;
    },
    set inheritLocale(val) {
      _inheritLocale = val;
      if (val && __root) {
        _locale.value = __root.locale.value;
        _fallbackLocale.value = __root.fallbackLocale.value;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    },
    get availableLocales() {
      return Object.keys(_messages.value).sort();
    },
    messages,
    get modifiers() {
      return _modifiers;
    },
    get pluralRules() {
      return _pluralRules || {};
    },
    get isGlobal() {
      return _isGlobal;
    },
    get missingWarn() {
      return _missingWarn;
    },
    set missingWarn(val) {
      _missingWarn = val;
      _context.missingWarn = _missingWarn;
    },
    get fallbackWarn() {
      return _fallbackWarn;
    },
    set fallbackWarn(val) {
      _fallbackWarn = val;
      _context.fallbackWarn = _fallbackWarn;
    },
    get fallbackRoot() {
      return _fallbackRoot;
    },
    set fallbackRoot(val) {
      _fallbackRoot = val;
    },
    get fallbackFormat() {
      return _fallbackFormat;
    },
    set fallbackFormat(val) {
      _fallbackFormat = val;
      _context.fallbackFormat = _fallbackFormat;
    },
    get warnHtmlMessage() {
      return _warnHtmlMessage;
    },
    set warnHtmlMessage(val) {
      _warnHtmlMessage = val;
      _context.warnHtmlMessage = val;
    },
    get escapeParameter() {
      return _escapeParameter;
    },
    set escapeParameter(val) {
      _escapeParameter = val;
      _context.escapeParameter = val;
    },
    t: t2,
    getLocaleMessage,
    setLocaleMessage,
    mergeLocaleMessage,
    getPostTranslationHandler,
    setPostTranslationHandler,
    getMissingHandler,
    setMissingHandler,
    [SetPluralRulesSymbol]: setPluralRules
  };
  {
    composer.datetimeFormats = datetimeFormats;
    composer.numberFormats = numberFormats;
    composer.rt = rt;
    composer.te = te2;
    composer.tm = tm;
    composer.d = d;
    composer.n = n2;
    composer.getDateTimeFormat = getDateTimeFormat;
    composer.setDateTimeFormat = setDateTimeFormat;
    composer.mergeDateTimeFormat = mergeDateTimeFormat;
    composer.getNumberFormat = getNumberFormat;
    composer.setNumberFormat = setNumberFormat;
    composer.mergeNumberFormat = mergeNumberFormat;
    composer[InejctWithOptionSymbol] = __injectWithOption;
    composer[TranslateVNodeSymbol] = translateVNode;
    composer[DatetimePartsSymbol] = datetimeParts;
    composer[NumberPartsSymbol] = numberParts;
  }
  return composer;
}
function convertComposerOptions(options) {
  const locale = isString$1(options.locale) ? options.locale : DEFAULT_LOCALE;
  const fallbackLocale = isString$1(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : locale;
  const missing = isFunction(options.missing) ? options.missing : void 0;
  const missingWarn = isBoolean(options.silentTranslationWarn) || isRegExp(options.silentTranslationWarn) ? !options.silentTranslationWarn : true;
  const fallbackWarn = isBoolean(options.silentFallbackWarn) || isRegExp(options.silentFallbackWarn) ? !options.silentFallbackWarn : true;
  const fallbackRoot = isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
  const fallbackFormat = !!options.formatFallbackMessages;
  const modifiers = isPlainObject(options.modifiers) ? options.modifiers : {};
  const pluralizationRules = options.pluralizationRules;
  const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : void 0;
  const warnHtmlMessage = isString$1(options.warnHtmlInMessage) ? options.warnHtmlInMessage !== "off" : true;
  const escapeParameter = !!options.escapeParameterHtml;
  const inheritLocale = isBoolean(options.sync) ? options.sync : true;
  let messages = options.messages;
  if (isPlainObject(options.sharedMessages)) {
    const sharedMessages = options.sharedMessages;
    const locales = Object.keys(sharedMessages);
    messages = locales.reduce((messages2, locale2) => {
      const message = messages2[locale2] || (messages2[locale2] = {});
      assign$1(message, sharedMessages[locale2]);
      return messages2;
    }, messages || {});
  }
  const { __i18n, __root, __injectWithOption } = options;
  const datetimeFormats = options.datetimeFormats;
  const numberFormats = options.numberFormats;
  const flatJson = options.flatJson;
  return {
    locale,
    fallbackLocale,
    messages,
    flatJson,
    datetimeFormats,
    numberFormats,
    missing,
    missingWarn,
    fallbackWarn,
    fallbackRoot,
    fallbackFormat,
    modifiers,
    pluralRules: pluralizationRules,
    postTranslation,
    warnHtmlMessage,
    escapeParameter,
    messageResolver: options.messageResolver,
    inheritLocale,
    __i18n,
    __root,
    __injectWithOption
  };
}
function createVueI18n(options = {}, VueI18nLegacy) {
  {
    const composer = createComposer(convertComposerOptions(options));
    const { __extender } = options;
    const vueI18n = {
      id: composer.id,
      get locale() {
        return composer.locale.value;
      },
      set locale(val) {
        composer.locale.value = val;
      },
      get fallbackLocale() {
        return composer.fallbackLocale.value;
      },
      set fallbackLocale(val) {
        composer.fallbackLocale.value = val;
      },
      get messages() {
        return composer.messages.value;
      },
      get datetimeFormats() {
        return composer.datetimeFormats.value;
      },
      get numberFormats() {
        return composer.numberFormats.value;
      },
      get availableLocales() {
        return composer.availableLocales;
      },
      get formatter() {
        return {
          interpolate() {
            return [];
          }
        };
      },
      set formatter(val) {
      },
      get missing() {
        return composer.getMissingHandler();
      },
      set missing(handler) {
        composer.setMissingHandler(handler);
      },
      get silentTranslationWarn() {
        return isBoolean(composer.missingWarn) ? !composer.missingWarn : composer.missingWarn;
      },
      set silentTranslationWarn(val) {
        composer.missingWarn = isBoolean(val) ? !val : val;
      },
      get silentFallbackWarn() {
        return isBoolean(composer.fallbackWarn) ? !composer.fallbackWarn : composer.fallbackWarn;
      },
      set silentFallbackWarn(val) {
        composer.fallbackWarn = isBoolean(val) ? !val : val;
      },
      get modifiers() {
        return composer.modifiers;
      },
      get formatFallbackMessages() {
        return composer.fallbackFormat;
      },
      set formatFallbackMessages(val) {
        composer.fallbackFormat = val;
      },
      get postTranslation() {
        return composer.getPostTranslationHandler();
      },
      set postTranslation(handler) {
        composer.setPostTranslationHandler(handler);
      },
      get sync() {
        return composer.inheritLocale;
      },
      set sync(val) {
        composer.inheritLocale = val;
      },
      get warnHtmlInMessage() {
        return composer.warnHtmlMessage ? "warn" : "off";
      },
      set warnHtmlInMessage(val) {
        composer.warnHtmlMessage = val !== "off";
      },
      get escapeParameterHtml() {
        return composer.escapeParameter;
      },
      set escapeParameterHtml(val) {
        composer.escapeParameter = val;
      },
      get preserveDirectiveContent() {
        return true;
      },
      set preserveDirectiveContent(val) {
      },
      get pluralizationRules() {
        return composer.pluralRules || {};
      },
      __composer: composer,
      t(...args) {
        const [arg1, arg2, arg3] = args;
        const options2 = {};
        let list = null;
        let named = null;
        if (!isString$1(arg1)) {
          throw createI18nError(I18nErrorCodes.INVALID_ARGUMENT);
        }
        const key = arg1;
        if (isString$1(arg2)) {
          options2.locale = arg2;
        } else if (isArray(arg2)) {
          list = arg2;
        } else if (isPlainObject(arg2)) {
          named = arg2;
        }
        if (isArray(arg3)) {
          list = arg3;
        } else if (isPlainObject(arg3)) {
          named = arg3;
        }
        return Reflect.apply(composer.t, composer, [
          key,
          list || named || {},
          options2
        ]);
      },
      rt(...args) {
        return Reflect.apply(composer.rt, composer, [...args]);
      },
      tc(...args) {
        const [arg1, arg2, arg3] = args;
        const options2 = { plural: 1 };
        let list = null;
        let named = null;
        if (!isString$1(arg1)) {
          throw createI18nError(I18nErrorCodes.INVALID_ARGUMENT);
        }
        const key = arg1;
        if (isString$1(arg2)) {
          options2.locale = arg2;
        } else if (isNumber(arg2)) {
          options2.plural = arg2;
        } else if (isArray(arg2)) {
          list = arg2;
        } else if (isPlainObject(arg2)) {
          named = arg2;
        }
        if (isString$1(arg3)) {
          options2.locale = arg3;
        } else if (isArray(arg3)) {
          list = arg3;
        } else if (isPlainObject(arg3)) {
          named = arg3;
        }
        return Reflect.apply(composer.t, composer, [
          key,
          list || named || {},
          options2
        ]);
      },
      te(key, locale) {
        return composer.te(key, locale);
      },
      tm(key) {
        return composer.tm(key);
      },
      getLocaleMessage(locale) {
        return composer.getLocaleMessage(locale);
      },
      setLocaleMessage(locale, message) {
        composer.setLocaleMessage(locale, message);
      },
      mergeLocaleMessage(locale, message) {
        composer.mergeLocaleMessage(locale, message);
      },
      d(...args) {
        return Reflect.apply(composer.d, composer, [...args]);
      },
      getDateTimeFormat(locale) {
        return composer.getDateTimeFormat(locale);
      },
      setDateTimeFormat(locale, format2) {
        composer.setDateTimeFormat(locale, format2);
      },
      mergeDateTimeFormat(locale, format2) {
        composer.mergeDateTimeFormat(locale, format2);
      },
      n(...args) {
        return Reflect.apply(composer.n, composer, [...args]);
      },
      getNumberFormat(locale) {
        return composer.getNumberFormat(locale);
      },
      setNumberFormat(locale, format2) {
        composer.setNumberFormat(locale, format2);
      },
      mergeNumberFormat(locale, format2) {
        composer.mergeNumberFormat(locale, format2);
      },
      getChoiceIndex(choice, choicesLength) {
        return -1;
      }
    };
    vueI18n.__extender = __extender;
    return vueI18n;
  }
}
var baseFormatProps = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    validator: (val) => val === "parent" || val === "global",
    default: "parent"
  },
  i18n: {
    type: Object
  }
};
function getInterpolateArg({ slots }, keys) {
  if (keys.length === 1 && keys[0] === "default") {
    const ret = slots.default ? slots.default() : [];
    return ret.reduce((slot, current) => {
      return [
        ...slot,
        ...current.type === Fragment ? current.children : [current]
      ];
    }, []);
  } else {
    return keys.reduce((arg, key) => {
      const slot = slots[key];
      if (slot) {
        arg[key] = slot();
      }
      return arg;
    }, {});
  }
}
function getFragmentableTag(tag) {
  return Fragment;
}
var TranslationImpl = defineComponent({
  name: "i18n-t",
  props: assign$1({
    keypath: {
      type: String,
      required: true
    },
    plural: {
      type: [Number, String],
      validator: (val) => isNumber(val) || !isNaN(val)
    }
  }, baseFormatProps),
  setup(props, context) {
    const { slots, attrs } = context;
    const i18n2 = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return () => {
      const keys = Object.keys(slots).filter((key) => key !== "_");
      const options = {};
      if (props.locale) {
        options.locale = props.locale;
      }
      if (props.plural !== void 0) {
        options.plural = isString$1(props.plural) ? +props.plural : props.plural;
      }
      const arg = getInterpolateArg(context, keys);
      const children = i18n2[TranslateVNodeSymbol](props.keypath, arg, options);
      const assignedAttrs = assign$1({}, attrs);
      const tag = isString$1(props.tag) || isObject$1(props.tag) ? props.tag : getFragmentableTag();
      return h$1(tag, assignedAttrs, children);
    };
  }
});
var Translation = TranslationImpl;
function isVNode(target) {
  return isArray(target) && !isString$1(target[0]);
}
function renderFormatter(props, context, slotKeys, partFormatter) {
  const { slots, attrs } = context;
  return () => {
    const options = { part: true };
    let overrides = {};
    if (props.locale) {
      options.locale = props.locale;
    }
    if (isString$1(props.format)) {
      options.key = props.format;
    } else if (isObject$1(props.format)) {
      if (isString$1(props.format.key)) {
        options.key = props.format.key;
      }
      overrides = Object.keys(props.format).reduce((options2, prop) => {
        return slotKeys.includes(prop) ? assign$1({}, options2, { [prop]: props.format[prop] }) : options2;
      }, {});
    }
    const parts = partFormatter(...[props.value, options, overrides]);
    let children = [options.key];
    if (isArray(parts)) {
      children = parts.map((part, index) => {
        const slot = slots[part.type];
        const node = slot ? slot({ [part.type]: part.value, index, parts }) : [part.value];
        if (isVNode(node)) {
          node[0].key = `${part.type}-${index}`;
        }
        return node;
      });
    } else if (isString$1(parts)) {
      children = [parts];
    }
    const assignedAttrs = assign$1({}, attrs);
    const tag = isString$1(props.tag) || isObject$1(props.tag) ? props.tag : getFragmentableTag();
    return h$1(tag, assignedAttrs, children);
  };
}
var NumberFormatImpl = defineComponent({
  name: "i18n-n",
  props: assign$1({
    value: {
      type: Number,
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  setup(props, context) {
    const i18n2 = props.i18n || useI18n({
      useScope: "parent",
      __useComponent: true
    });
    return renderFormatter(props, context, NUMBER_FORMAT_OPTIONS_KEYS, (...args) => i18n2[NumberPartsSymbol](...args));
  }
});
var NumberFormat = NumberFormatImpl;
var DatetimeFormatImpl = defineComponent({
  name: "i18n-d",
  props: assign$1({
    value: {
      type: [Number, Date],
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  setup(props, context) {
    const i18n2 = props.i18n || useI18n({
      useScope: "parent",
      __useComponent: true
    });
    return renderFormatter(props, context, DATETIME_FORMAT_OPTIONS_KEYS, (...args) => i18n2[DatetimePartsSymbol](...args));
  }
});
var DatetimeFormat = DatetimeFormatImpl;
function getComposer$2(i18n2, instance) {
  const i18nInternal = i18n2;
  if (i18n2.mode === "composition") {
    return i18nInternal.__getInstance(instance) || i18n2.global;
  } else {
    const vueI18n = i18nInternal.__getInstance(instance);
    return vueI18n != null ? vueI18n.__composer : i18n2.global.__composer;
  }
}
function vTDirective(i18n2) {
  const _process = (binding) => {
    const { instance, modifiers, value } = binding;
    if (!instance || !instance.$) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const composer = getComposer$2(i18n2, instance.$);
    const parsedValue = parseValue(value);
    return [
      Reflect.apply(composer.t, composer, [...makeParams(parsedValue)]),
      composer
    ];
  };
  const register = (el, binding) => {
    const [textContent, composer] = _process(binding);
    if (inBrowser && i18n2.global === composer) {
      el.__i18nWatcher = watch(composer.locale, () => {
        binding.instance && binding.instance.$forceUpdate();
      });
    }
    el.__composer = composer;
    el.textContent = textContent;
  };
  const unregister = (el) => {
    if (inBrowser && el.__i18nWatcher) {
      el.__i18nWatcher();
      el.__i18nWatcher = void 0;
      delete el.__i18nWatcher;
    }
    if (el.__composer) {
      el.__composer = void 0;
      delete el.__composer;
    }
  };
  const update = (el, { value }) => {
    if (el.__composer) {
      const composer = el.__composer;
      const parsedValue = parseValue(value);
      el.textContent = Reflect.apply(composer.t, composer, [
        ...makeParams(parsedValue)
      ]);
    }
  };
  const getSSRProps = (binding) => {
    const [textContent] = _process(binding);
    return { textContent };
  };
  return {
    created: register,
    unmounted: unregister,
    beforeUpdate: update,
    getSSRProps
  };
}
function parseValue(value) {
  if (isString$1(value)) {
    return { path: value };
  } else if (isPlainObject(value)) {
    if (!("path" in value)) {
      throw createI18nError(I18nErrorCodes.REQUIRED_VALUE, "path");
    }
    return value;
  } else {
    throw createI18nError(I18nErrorCodes.INVALID_VALUE);
  }
}
function makeParams(value) {
  const { path, locale, args, choice, plural } = value;
  const options = {};
  const named = args || {};
  if (isString$1(locale)) {
    options.locale = locale;
  }
  if (isNumber(choice)) {
    options.plural = choice;
  }
  if (isNumber(plural)) {
    options.plural = plural;
  }
  return [path, named, options];
}
function apply(app, i18n2, ...options) {
  const pluginOptions = isPlainObject(options[0]) ? options[0] : {};
  const useI18nComponentName = !!pluginOptions.useI18nComponentName;
  const globalInstall = isBoolean(pluginOptions.globalInstall) ? pluginOptions.globalInstall : true;
  if (globalInstall) {
    [!useI18nComponentName ? Translation.name : "i18n", "I18nT"].forEach((name) => app.component(name, Translation));
    [NumberFormat.name, "I18nN"].forEach((name) => app.component(name, NumberFormat));
    [DatetimeFormat.name, "I18nD"].forEach((name) => app.component(name, DatetimeFormat));
  }
  {
    app.directive("t", vTDirective(i18n2));
  }
}
function defineMixin(vuei18n, composer, i18n2) {
  return {
    beforeCreate() {
      const instance = getCurrentInstance();
      if (!instance) {
        throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
      }
      const options = this.$options;
      if (options.i18n) {
        const optionsI18n = options.i18n;
        if (options.__i18n) {
          optionsI18n.__i18n = options.__i18n;
        }
        optionsI18n.__root = composer;
        if (this === this.$root) {
          this.$i18n = mergeToGlobal(vuei18n, optionsI18n);
        } else {
          optionsI18n.__injectWithOption = true;
          optionsI18n.__extender = i18n2.__vueI18nExtend;
          this.$i18n = createVueI18n(optionsI18n);
          const _vueI18n = this.$i18n;
          if (_vueI18n.__extender) {
            _vueI18n.__disposer = _vueI18n.__extender(this.$i18n);
          }
        }
      } else if (options.__i18n) {
        if (this === this.$root) {
          this.$i18n = mergeToGlobal(vuei18n, options);
        } else {
          this.$i18n = createVueI18n({
            __i18n: options.__i18n,
            __injectWithOption: true,
            __extender: i18n2.__vueI18nExtend,
            __root: composer
          });
          const _vueI18n = this.$i18n;
          if (_vueI18n.__extender) {
            _vueI18n.__disposer = _vueI18n.__extender(this.$i18n);
          }
        }
      } else {
        this.$i18n = vuei18n;
      }
      if (options.__i18nGlobal) {
        adjustI18nResources(composer, options, options);
      }
      this.$t = (...args) => this.$i18n.t(...args);
      this.$rt = (...args) => this.$i18n.rt(...args);
      this.$tc = (...args) => this.$i18n.tc(...args);
      this.$te = (key, locale) => this.$i18n.te(key, locale);
      this.$d = (...args) => this.$i18n.d(...args);
      this.$n = (...args) => this.$i18n.n(...args);
      this.$tm = (key) => this.$i18n.tm(key);
      i18n2.__setInstance(instance, this.$i18n);
    },
    mounted() {
    },
    unmounted() {
      const instance = getCurrentInstance();
      if (!instance) {
        throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
      }
      const _vueI18n = this.$i18n;
      delete this.$t;
      delete this.$rt;
      delete this.$tc;
      delete this.$te;
      delete this.$d;
      delete this.$n;
      delete this.$tm;
      if (_vueI18n.__disposer) {
        _vueI18n.__disposer();
        delete _vueI18n.__disposer;
        delete _vueI18n.__extender;
      }
      i18n2.__deleteInstance(instance);
      delete this.$i18n;
    }
  };
}
function mergeToGlobal(g2, options) {
  g2.locale = options.locale || g2.locale;
  g2.fallbackLocale = options.fallbackLocale || g2.fallbackLocale;
  g2.missing = options.missing || g2.missing;
  g2.silentTranslationWarn = options.silentTranslationWarn || g2.silentFallbackWarn;
  g2.silentFallbackWarn = options.silentFallbackWarn || g2.silentFallbackWarn;
  g2.formatFallbackMessages = options.formatFallbackMessages || g2.formatFallbackMessages;
  g2.postTranslation = options.postTranslation || g2.postTranslation;
  g2.warnHtmlInMessage = options.warnHtmlInMessage || g2.warnHtmlInMessage;
  g2.escapeParameterHtml = options.escapeParameterHtml || g2.escapeParameterHtml;
  g2.sync = options.sync || g2.sync;
  g2.__composer[SetPluralRulesSymbol](options.pluralizationRules || g2.pluralizationRules);
  const messages = getLocaleMessages(g2.locale, {
    messages: options.messages,
    __i18n: options.__i18n
  });
  Object.keys(messages).forEach((locale) => g2.mergeLocaleMessage(locale, messages[locale]));
  if (options.datetimeFormats) {
    Object.keys(options.datetimeFormats).forEach((locale) => g2.mergeDateTimeFormat(locale, options.datetimeFormats[locale]));
  }
  if (options.numberFormats) {
    Object.keys(options.numberFormats).forEach((locale) => g2.mergeNumberFormat(locale, options.numberFormats[locale]));
  }
  return g2;
}
var I18nInjectionKey = makeSymbol("global-vue-i18n");
function createI18n(options = {}, VueI18nLegacy) {
  const __legacyMode = __VUE_I18N_LEGACY_API__ && isBoolean(options.legacy) ? options.legacy : __VUE_I18N_LEGACY_API__;
  const __globalInjection = isBoolean(options.globalInjection) ? options.globalInjection : true;
  const __allowComposition = __VUE_I18N_LEGACY_API__ && __legacyMode ? !!options.allowComposition : true;
  const __instances = /* @__PURE__ */ new Map();
  const [globalScope, __global] = createGlobal(options, __legacyMode);
  const symbol = makeSymbol("");
  function __getInstance(component) {
    return __instances.get(component) || null;
  }
  function __setInstance(component, instance) {
    __instances.set(component, instance);
  }
  function __deleteInstance(component) {
    __instances.delete(component);
  }
  {
    let _a;
    const i18n2 = {
      get mode() {
        return __VUE_I18N_LEGACY_API__ && __legacyMode ? "legacy" : "composition";
      },
      get allowComposition() {
        return __allowComposition;
      },
      install(app, ...options2) {
        return __async(this, null, function* () {
          app.__VUE_I18N_SYMBOL__ = symbol;
          app.provide(app.__VUE_I18N_SYMBOL__, i18n2);
          if (isPlainObject(options2[0])) {
            const opts = options2[0];
            i18n2.__composerExtend = opts.__composerExtend;
            i18n2.__vueI18nExtend = opts.__vueI18nExtend;
          }
          let globalReleaseHandler = null;
          if (!__legacyMode && __globalInjection) {
            globalReleaseHandler = injectGlobalFields(app, i18n2.global);
          }
          if (__VUE_I18N_FULL_INSTALL__) {
            apply(app, i18n2, ...options2);
          }
          if (__VUE_I18N_LEGACY_API__ && __legacyMode) {
            app.mixin(defineMixin(__global, __global.__composer, i18n2));
          }
          const unmountApp = app.unmount;
          app.unmount = () => {
            globalReleaseHandler && globalReleaseHandler();
            i18n2.dispose();
            unmountApp();
          };
        });
      },
      get global() {
        return __global;
      },
      dispose() {
        globalScope.stop();
      },
      __instances,
      __getInstance,
      __setInstance,
      __deleteInstance
    };
    return i18n2;
  }
}
function useI18n(options = {}) {
  const instance = getCurrentInstance();
  if (instance == null) {
    throw createI18nError(I18nErrorCodes.MUST_BE_CALL_SETUP_TOP);
  }
  if (!instance.isCE && instance.appContext.app != null && !instance.appContext.app.__VUE_I18N_SYMBOL__) {
    throw createI18nError(I18nErrorCodes.NOT_INSTALLED);
  }
  const i18n2 = getI18nInstance(instance);
  const gl = getGlobalComposer(i18n2);
  const componentOptions = getComponentOptions(instance);
  const scope = getScope(options, componentOptions);
  if (__VUE_I18N_LEGACY_API__) {
    if (i18n2.mode === "legacy" && !options.__useComponent) {
      if (!i18n2.allowComposition) {
        throw createI18nError(I18nErrorCodes.NOT_AVAILABLE_IN_LEGACY_MODE);
      }
      return useI18nForLegacy(instance, scope, gl, options);
    }
  }
  if (scope === "global") {
    adjustI18nResources(gl, options, componentOptions);
    return gl;
  }
  if (scope === "parent") {
    let composer2 = getComposer(i18n2, instance, options.__useComponent);
    if (composer2 == null) {
      composer2 = gl;
    }
    return composer2;
  }
  const i18nInternal = i18n2;
  let composer = i18nInternal.__getInstance(instance);
  if (composer == null) {
    const composerOptions = assign$1({}, options);
    if ("__i18n" in componentOptions) {
      composerOptions.__i18n = componentOptions.__i18n;
    }
    if (gl) {
      composerOptions.__root = gl;
    }
    composer = createComposer(composerOptions);
    if (i18nInternal.__composerExtend) {
      composer[DisposeSymbol] = i18nInternal.__composerExtend(composer);
    }
    setupLifeCycle(i18nInternal, instance, composer);
    i18nInternal.__setInstance(instance, composer);
  }
  return composer;
}
function createGlobal(options, legacyMode, VueI18nLegacy) {
  const scope = effectScope();
  {
    const obj = __VUE_I18N_LEGACY_API__ && legacyMode ? scope.run(() => createVueI18n(options)) : scope.run(() => createComposer(options));
    if (obj == null) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    return [scope, obj];
  }
}
function getI18nInstance(instance) {
  {
    const i18n2 = inject(!instance.isCE ? instance.appContext.app.__VUE_I18N_SYMBOL__ : I18nInjectionKey);
    if (!i18n2) {
      throw createI18nError(!instance.isCE ? I18nErrorCodes.UNEXPECTED_ERROR : I18nErrorCodes.NOT_INSTALLED_WITH_PROVIDE);
    }
    return i18n2;
  }
}
function getScope(options, componentOptions) {
  return isEmptyObject(options) ? "__i18n" in componentOptions ? "local" : "global" : !options.useScope ? "local" : options.useScope;
}
function getGlobalComposer(i18n2) {
  return i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
}
function getComposer(i18n2, target, useComponent = false) {
  let composer = null;
  const root = target.root;
  let current = getParentComponentInstance(target, useComponent);
  while (current != null) {
    const i18nInternal = i18n2;
    if (i18n2.mode === "composition") {
      composer = i18nInternal.__getInstance(current);
    } else {
      if (__VUE_I18N_LEGACY_API__) {
        const vueI18n = i18nInternal.__getInstance(current);
        if (vueI18n != null) {
          composer = vueI18n.__composer;
          if (useComponent && composer && !composer[InejctWithOptionSymbol]) {
            composer = null;
          }
        }
      }
    }
    if (composer != null) {
      break;
    }
    if (root === current) {
      break;
    }
    current = current.parent;
  }
  return composer;
}
function getParentComponentInstance(target, useComponent = false) {
  if (target == null) {
    return null;
  }
  {
    return !useComponent ? target.parent : target.vnode.ctx || target.parent;
  }
}
function setupLifeCycle(i18n2, target, composer) {
  {
    onMounted(() => {
    }, target);
    onUnmounted(() => {
      const _composer = composer;
      i18n2.__deleteInstance(target);
      const dispose = _composer[DisposeSymbol];
      if (dispose) {
        dispose();
        delete _composer[DisposeSymbol];
      }
    }, target);
  }
}
function useI18nForLegacy(instance, scope, root, options = {}) {
  const isLocalScope = scope === "local";
  const _composer = shallowRef(null);
  if (isLocalScope && instance.proxy && !(instance.proxy.$options.i18n || instance.proxy.$options.__i18n)) {
    throw createI18nError(I18nErrorCodes.MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION);
  }
  const _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : !isString$1(options.locale);
  const _locale = ref(
    !isLocalScope || _inheritLocale ? root.locale.value : isString$1(options.locale) ? options.locale : DEFAULT_LOCALE
  );
  const _fallbackLocale = ref(
    !isLocalScope || _inheritLocale ? root.fallbackLocale.value : isString$1(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value
  );
  const _messages = ref(getLocaleMessages(_locale.value, options));
  const _datetimeFormats = ref(isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
  const _numberFormats = ref(isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
  const _missingWarn = isLocalScope ? root.missingWarn : isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  const _fallbackWarn = isLocalScope ? root.fallbackWarn : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  const _fallbackRoot = isLocalScope ? root.fallbackRoot : isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
  const _fallbackFormat = !!options.fallbackFormat;
  const _missing = isFunction(options.missing) ? options.missing : null;
  const _postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  const _warnHtmlMessage = isLocalScope ? root.warnHtmlMessage : isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  const _escapeParameter = !!options.escapeParameter;
  const _modifiers = isLocalScope ? root.modifiers : isPlainObject(options.modifiers) ? options.modifiers : {};
  const _pluralRules = options.pluralRules || isLocalScope && root.pluralRules;
  function trackReactivityValues() {
    return [
      _locale.value,
      _fallbackLocale.value,
      _messages.value,
      _datetimeFormats.value,
      _numberFormats.value
    ];
  }
  const locale = computed({
    get: () => {
      return _composer.value ? _composer.value.locale.value : _locale.value;
    },
    set: (val) => {
      if (_composer.value) {
        _composer.value.locale.value = val;
      }
      _locale.value = val;
    }
  });
  const fallbackLocale = computed({
    get: () => {
      return _composer.value ? _composer.value.fallbackLocale.value : _fallbackLocale.value;
    },
    set: (val) => {
      if (_composer.value) {
        _composer.value.fallbackLocale.value = val;
      }
      _fallbackLocale.value = val;
    }
  });
  const messages = computed(() => {
    if (_composer.value) {
      return _composer.value.messages.value;
    } else {
      return _messages.value;
    }
  });
  const datetimeFormats = computed(() => _datetimeFormats.value);
  const numberFormats = computed(() => _numberFormats.value);
  function getPostTranslationHandler() {
    return _composer.value ? _composer.value.getPostTranslationHandler() : _postTranslation;
  }
  function setPostTranslationHandler(handler) {
    if (_composer.value) {
      _composer.value.setPostTranslationHandler(handler);
    }
  }
  function getMissingHandler() {
    return _composer.value ? _composer.value.getMissingHandler() : _missing;
  }
  function setMissingHandler(handler) {
    if (_composer.value) {
      _composer.value.setMissingHandler(handler);
    }
  }
  function warpWithDeps(fn) {
    trackReactivityValues();
    return fn();
  }
  function t2(...args) {
    return _composer.value ? warpWithDeps(() => Reflect.apply(_composer.value.t, null, [...args])) : warpWithDeps(() => "");
  }
  function rt(...args) {
    return _composer.value ? Reflect.apply(_composer.value.rt, null, [...args]) : "";
  }
  function d(...args) {
    return _composer.value ? warpWithDeps(() => Reflect.apply(_composer.value.d, null, [...args])) : warpWithDeps(() => "");
  }
  function n2(...args) {
    return _composer.value ? warpWithDeps(() => Reflect.apply(_composer.value.n, null, [...args])) : warpWithDeps(() => "");
  }
  function tm(key) {
    return _composer.value ? _composer.value.tm(key) : {};
  }
  function te2(key, locale2) {
    return _composer.value ? _composer.value.te(key, locale2) : false;
  }
  function getLocaleMessage(locale2) {
    return _composer.value ? _composer.value.getLocaleMessage(locale2) : {};
  }
  function setLocaleMessage(locale2, message) {
    if (_composer.value) {
      _composer.value.setLocaleMessage(locale2, message);
      _messages.value[locale2] = message;
    }
  }
  function mergeLocaleMessage(locale2, message) {
    if (_composer.value) {
      _composer.value.mergeLocaleMessage(locale2, message);
    }
  }
  function getDateTimeFormat(locale2) {
    return _composer.value ? _composer.value.getDateTimeFormat(locale2) : {};
  }
  function setDateTimeFormat(locale2, format2) {
    if (_composer.value) {
      _composer.value.setDateTimeFormat(locale2, format2);
      _datetimeFormats.value[locale2] = format2;
    }
  }
  function mergeDateTimeFormat(locale2, format2) {
    if (_composer.value) {
      _composer.value.mergeDateTimeFormat(locale2, format2);
    }
  }
  function getNumberFormat(locale2) {
    return _composer.value ? _composer.value.getNumberFormat(locale2) : {};
  }
  function setNumberFormat(locale2, format2) {
    if (_composer.value) {
      _composer.value.setNumberFormat(locale2, format2);
      _numberFormats.value[locale2] = format2;
    }
  }
  function mergeNumberFormat(locale2, format2) {
    if (_composer.value) {
      _composer.value.mergeNumberFormat(locale2, format2);
    }
  }
  const wrapper = {
    get id() {
      return _composer.value ? _composer.value.id : -1;
    },
    locale,
    fallbackLocale,
    messages,
    datetimeFormats,
    numberFormats,
    get inheritLocale() {
      return _composer.value ? _composer.value.inheritLocale : _inheritLocale;
    },
    set inheritLocale(val) {
      if (_composer.value) {
        _composer.value.inheritLocale = val;
      }
    },
    get availableLocales() {
      return _composer.value ? _composer.value.availableLocales : Object.keys(_messages.value);
    },
    get modifiers() {
      return _composer.value ? _composer.value.modifiers : _modifiers;
    },
    get pluralRules() {
      return _composer.value ? _composer.value.pluralRules : _pluralRules;
    },
    get isGlobal() {
      return _composer.value ? _composer.value.isGlobal : false;
    },
    get missingWarn() {
      return _composer.value ? _composer.value.missingWarn : _missingWarn;
    },
    set missingWarn(val) {
      if (_composer.value) {
        _composer.value.missingWarn = val;
      }
    },
    get fallbackWarn() {
      return _composer.value ? _composer.value.fallbackWarn : _fallbackWarn;
    },
    set fallbackWarn(val) {
      if (_composer.value) {
        _composer.value.missingWarn = val;
      }
    },
    get fallbackRoot() {
      return _composer.value ? _composer.value.fallbackRoot : _fallbackRoot;
    },
    set fallbackRoot(val) {
      if (_composer.value) {
        _composer.value.fallbackRoot = val;
      }
    },
    get fallbackFormat() {
      return _composer.value ? _composer.value.fallbackFormat : _fallbackFormat;
    },
    set fallbackFormat(val) {
      if (_composer.value) {
        _composer.value.fallbackFormat = val;
      }
    },
    get warnHtmlMessage() {
      return _composer.value ? _composer.value.warnHtmlMessage : _warnHtmlMessage;
    },
    set warnHtmlMessage(val) {
      if (_composer.value) {
        _composer.value.warnHtmlMessage = val;
      }
    },
    get escapeParameter() {
      return _composer.value ? _composer.value.escapeParameter : _escapeParameter;
    },
    set escapeParameter(val) {
      if (_composer.value) {
        _composer.value.escapeParameter = val;
      }
    },
    t: t2,
    getPostTranslationHandler,
    setPostTranslationHandler,
    getMissingHandler,
    setMissingHandler,
    rt,
    d,
    n: n2,
    tm,
    te: te2,
    getLocaleMessage,
    setLocaleMessage,
    mergeLocaleMessage,
    getDateTimeFormat,
    setDateTimeFormat,
    mergeDateTimeFormat,
    getNumberFormat,
    setNumberFormat,
    mergeNumberFormat
  };
  function sync(composer) {
    composer.locale.value = _locale.value;
    composer.fallbackLocale.value = _fallbackLocale.value;
    Object.keys(_messages.value).forEach((locale2) => {
      composer.mergeLocaleMessage(locale2, _messages.value[locale2]);
    });
    Object.keys(_datetimeFormats.value).forEach((locale2) => {
      composer.mergeDateTimeFormat(locale2, _datetimeFormats.value[locale2]);
    });
    Object.keys(_numberFormats.value).forEach((locale2) => {
      composer.mergeNumberFormat(locale2, _numberFormats.value[locale2]);
    });
    composer.escapeParameter = _escapeParameter;
    composer.fallbackFormat = _fallbackFormat;
    composer.fallbackRoot = _fallbackRoot;
    composer.fallbackWarn = _fallbackWarn;
    composer.missingWarn = _missingWarn;
    composer.warnHtmlMessage = _warnHtmlMessage;
  }
  onBeforeMount(() => {
    if (instance.proxy == null || instance.proxy.$i18n == null) {
      throw createI18nError(I18nErrorCodes.NOT_AVAILABLE_COMPOSITION_IN_LEGACY);
    }
    const composer = _composer.value = instance.proxy.$i18n.__composer;
    if (scope === "global") {
      _locale.value = composer.locale.value;
      _fallbackLocale.value = composer.fallbackLocale.value;
      _messages.value = composer.messages.value;
      _datetimeFormats.value = composer.datetimeFormats.value;
      _numberFormats.value = composer.numberFormats.value;
    } else if (isLocalScope) {
      sync(composer);
    }
  });
  return wrapper;
}
var globalExportProps = [
  "locale",
  "fallbackLocale",
  "availableLocales"
];
var globalExportMethods = ["t", "rt", "d", "n", "tm", "te"];
function injectGlobalFields(app, composer) {
  const i18n2 = /* @__PURE__ */ Object.create(null);
  globalExportProps.forEach((prop) => {
    const desc = Object.getOwnPropertyDescriptor(composer, prop);
    if (!desc) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const wrap = isRef(desc.value) ? {
      get() {
        return desc.value.value;
      },
      set(val) {
        desc.value.value = val;
      }
    } : {
      get() {
        return desc.get && desc.get();
      }
    };
    Object.defineProperty(i18n2, prop, wrap);
  });
  app.config.globalProperties.$i18n = i18n2;
  globalExportMethods.forEach((method) => {
    const desc = Object.getOwnPropertyDescriptor(composer, method);
    if (!desc || !desc.value) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    Object.defineProperty(app.config.globalProperties, `$${method}`, desc);
  });
  const dispose = () => {
    delete app.config.globalProperties.$i18n;
    globalExportMethods.forEach((method) => {
      delete app.config.globalProperties[`$${method}`];
    });
  };
  return dispose;
}
{
  initFeatureFlags();
}
{
  registerMessageCompiler(compile);
}
registerMessageResolver(resolveValue);
registerLocaleFallbacker(fallbackWithLocaleChain);
if (__INTLIFY_PROD_DEVTOOLS__) {
  const target = getGlobalThis();
  target.__INTLIFY__ = true;
  setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
var i18n = createI18n({
  legacy: false,
  messages: {}
});
function setLocale(locale) {
  return __async(this, null, function* () {
    let localeToSet = locale;
    if (locale === void 0 || locale === null) {
      localeToSet = navigator.language;
    }
    if (localeToSet === void 0) {
      return;
    }
    yield fetchLocale(localeToSet);
    i18n.global.locale.value = localeToSet;
  });
}
function setFallbackLocale(locale) {
  return __async(this, null, function* () {
    yield fetchLocale(locale);
    i18n.global.fallbackLocale.value = locale;
  });
}
function useLocale() {
  return i18n.global;
}
var baseURL = "https://storage.googleapis.com/passage-frontend/locales/passage-auth";
var localeVersion = "v2";
function fetchLocale(locale) {
  return __async(this, null, function* () {
    const localeParts = locale.split("-");
    const lang = localeParts[0];
    let langJSON = void 0;
    if (!localeLoaded(lang)) {
      langJSON = yield fetchLocaleJson(lang);
    }
    let countryJSON = void 0;
    if (localeParts.length > 1 && !localeLoaded(locale)) {
      countryJSON = yield fetchLocaleJson(locale);
    }
    if (countryJSON !== void 0) {
      i18n.global.setLocaleMessage(locale, countryJSON);
    }
    if (langJSON !== void 0) {
      i18n.global.setLocaleMessage(lang, langJSON);
    }
  });
}
function localeLoaded(locale) {
  return i18n.global.availableLocales.includes(locale);
}
function fetchLocaleJson(locale) {
  return __async(this, null, function* () {
    const url = `${baseURL}/${localeVersion}/${locale.toLowerCase()}.json`;
    return yield fetch(url).then((res) => res.json()).catch(() => void 0);
  });
}
var passageSymbol = Symbol();
function createPassageInstance(appId, tokenStore) {
  const elementVersion = "1.14.0";
  const passage = new Q(appId, {
    tokenStore,
    extraHeaders: [{ elementVersion }]
  });
  provide(passageSymbol, passage);
}
function usePassage() {
  const passage = inject(passageSymbol);
  if (passage === void 0) {
    throw new Error("Passage instance not found");
  }
  return { passage };
}
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
var dayjs_min = { exports: {} };
(function(module, exports) {
  !function(t2, e2) {
    module.exports = e2();
  }(commonjsGlobal, function() {
    var t2 = 1e3, e2 = 6e4, n2 = 36e5, r2 = "millisecond", i = "second", s2 = "minute", u2 = "hour", a = "day", o2 = "week", c2 = "month", f2 = "quarter", h2 = "year", d = "date", l = "Invalid Date", $2 = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y2 = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M2 = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t3) {
      var e3 = ["th", "st", "nd", "rd"], n3 = t3 % 100;
      return "[" + t3 + (e3[(n3 - 20) % 10] || e3[n3] || e3[0]) + "]";
    } }, m2 = function(t3, e3, n3) {
      var r3 = String(t3);
      return !r3 || r3.length >= e3 ? t3 : "" + Array(e3 + 1 - r3.length).join(n3) + t3;
    }, v2 = { s: m2, z: function(t3) {
      var e3 = -t3.utcOffset(), n3 = Math.abs(e3), r3 = Math.floor(n3 / 60), i2 = n3 % 60;
      return (e3 <= 0 ? "+" : "-") + m2(r3, 2, "0") + ":" + m2(i2, 2, "0");
    }, m: function t3(e3, n3) {
      if (e3.date() < n3.date())
        return -t3(n3, e3);
      var r3 = 12 * (n3.year() - e3.year()) + (n3.month() - e3.month()), i2 = e3.clone().add(r3, c2), s3 = n3 - i2 < 0, u3 = e3.clone().add(r3 + (s3 ? -1 : 1), c2);
      return +(-(r3 + (n3 - i2) / (s3 ? i2 - u3 : u3 - i2)) || 0);
    }, a: function(t3) {
      return t3 < 0 ? Math.ceil(t3) || 0 : Math.floor(t3);
    }, p: function(t3) {
      return { M: c2, y: h2, w: o2, d: a, D: d, h: u2, m: s2, s: i, ms: r2, Q: f2 }[t3] || String(t3 || "").toLowerCase().replace(/s$/, "");
    }, u: function(t3) {
      return void 0 === t3;
    } }, g2 = "en", D2 = {};
    D2[g2] = M2;
    var p2 = function(t3) {
      return t3 instanceof b;
    }, S2 = function t3(e3, n3, r3) {
      var i2;
      if (!e3)
        return g2;
      if ("string" == typeof e3) {
        var s3 = e3.toLowerCase();
        D2[s3] && (i2 = s3), n3 && (D2[s3] = n3, i2 = s3);
        var u3 = e3.split("-");
        if (!i2 && u3.length > 1)
          return t3(u3[0]);
      } else {
        var a2 = e3.name;
        D2[a2] = e3, i2 = a2;
      }
      return !r3 && i2 && (g2 = i2), i2 || !r3 && g2;
    }, w2 = function(t3, e3) {
      if (p2(t3))
        return t3.clone();
      var n3 = "object" == typeof e3 ? e3 : {};
      return n3.date = t3, n3.args = arguments, new b(n3);
    }, O2 = v2;
    O2.l = S2, O2.i = p2, O2.w = function(t3, e3) {
      return w2(t3, { locale: e3.$L, utc: e3.$u, x: e3.$x, $offset: e3.$offset });
    };
    var b = function() {
      function M3(t3) {
        this.$L = S2(t3.locale, null, true), this.parse(t3);
      }
      var m3 = M3.prototype;
      return m3.parse = function(t3) {
        this.$d = function(t4) {
          var e3 = t4.date, n3 = t4.utc;
          if (null === e3)
            return /* @__PURE__ */ new Date(NaN);
          if (O2.u(e3))
            return /* @__PURE__ */ new Date();
          if (e3 instanceof Date)
            return new Date(e3);
          if ("string" == typeof e3 && !/Z$/i.test(e3)) {
            var r3 = e3.match($2);
            if (r3) {
              var i2 = r3[2] - 1 || 0, s3 = (r3[7] || "0").substring(0, 3);
              return n3 ? new Date(Date.UTC(r3[1], i2, r3[3] || 1, r3[4] || 0, r3[5] || 0, r3[6] || 0, s3)) : new Date(r3[1], i2, r3[3] || 1, r3[4] || 0, r3[5] || 0, r3[6] || 0, s3);
            }
          }
          return new Date(e3);
        }(t3), this.$x = t3.x || {}, this.init();
      }, m3.init = function() {
        var t3 = this.$d;
        this.$y = t3.getFullYear(), this.$M = t3.getMonth(), this.$D = t3.getDate(), this.$W = t3.getDay(), this.$H = t3.getHours(), this.$m = t3.getMinutes(), this.$s = t3.getSeconds(), this.$ms = t3.getMilliseconds();
      }, m3.$utils = function() {
        return O2;
      }, m3.isValid = function() {
        return !(this.$d.toString() === l);
      }, m3.isSame = function(t3, e3) {
        var n3 = w2(t3);
        return this.startOf(e3) <= n3 && n3 <= this.endOf(e3);
      }, m3.isAfter = function(t3, e3) {
        return w2(t3) < this.startOf(e3);
      }, m3.isBefore = function(t3, e3) {
        return this.endOf(e3) < w2(t3);
      }, m3.$g = function(t3, e3, n3) {
        return O2.u(t3) ? this[e3] : this.set(n3, t3);
      }, m3.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, m3.valueOf = function() {
        return this.$d.getTime();
      }, m3.startOf = function(t3, e3) {
        var n3 = this, r3 = !!O2.u(e3) || e3, f3 = O2.p(t3), l2 = function(t4, e4) {
          var i2 = O2.w(n3.$u ? Date.UTC(n3.$y, e4, t4) : new Date(n3.$y, e4, t4), n3);
          return r3 ? i2 : i2.endOf(a);
        }, $3 = function(t4, e4) {
          return O2.w(n3.toDate()[t4].apply(n3.toDate("s"), (r3 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e4)), n3);
        }, y3 = this.$W, M4 = this.$M, m4 = this.$D, v3 = "set" + (this.$u ? "UTC" : "");
        switch (f3) {
          case h2:
            return r3 ? l2(1, 0) : l2(31, 11);
          case c2:
            return r3 ? l2(1, M4) : l2(0, M4 + 1);
          case o2:
            var g3 = this.$locale().weekStart || 0, D3 = (y3 < g3 ? y3 + 7 : y3) - g3;
            return l2(r3 ? m4 - D3 : m4 + (6 - D3), M4);
          case a:
          case d:
            return $3(v3 + "Hours", 0);
          case u2:
            return $3(v3 + "Minutes", 1);
          case s2:
            return $3(v3 + "Seconds", 2);
          case i:
            return $3(v3 + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, m3.endOf = function(t3) {
        return this.startOf(t3, false);
      }, m3.$set = function(t3, e3) {
        var n3, o3 = O2.p(t3), f3 = "set" + (this.$u ? "UTC" : ""), l2 = (n3 = {}, n3[a] = f3 + "Date", n3[d] = f3 + "Date", n3[c2] = f3 + "Month", n3[h2] = f3 + "FullYear", n3[u2] = f3 + "Hours", n3[s2] = f3 + "Minutes", n3[i] = f3 + "Seconds", n3[r2] = f3 + "Milliseconds", n3)[o3], $3 = o3 === a ? this.$D + (e3 - this.$W) : e3;
        if (o3 === c2 || o3 === h2) {
          var y3 = this.clone().set(d, 1);
          y3.$d[l2]($3), y3.init(), this.$d = y3.set(d, Math.min(this.$D, y3.daysInMonth())).$d;
        } else
          l2 && this.$d[l2]($3);
        return this.init(), this;
      }, m3.set = function(t3, e3) {
        return this.clone().$set(t3, e3);
      }, m3.get = function(t3) {
        return this[O2.p(t3)]();
      }, m3.add = function(r3, f3) {
        var d2, l2 = this;
        r3 = Number(r3);
        var $3 = O2.p(f3), y3 = function(t3) {
          var e3 = w2(l2);
          return O2.w(e3.date(e3.date() + Math.round(t3 * r3)), l2);
        };
        if ($3 === c2)
          return this.set(c2, this.$M + r3);
        if ($3 === h2)
          return this.set(h2, this.$y + r3);
        if ($3 === a)
          return y3(1);
        if ($3 === o2)
          return y3(7);
        var M4 = (d2 = {}, d2[s2] = e2, d2[u2] = n2, d2[i] = t2, d2)[$3] || 1, m4 = this.$d.getTime() + r3 * M4;
        return O2.w(m4, this);
      }, m3.subtract = function(t3, e3) {
        return this.add(-1 * t3, e3);
      }, m3.format = function(t3) {
        var e3 = this, n3 = this.$locale();
        if (!this.isValid())
          return n3.invalidDate || l;
        var r3 = t3 || "YYYY-MM-DDTHH:mm:ssZ", i2 = O2.z(this), s3 = this.$H, u3 = this.$m, a2 = this.$M, o3 = n3.weekdays, c3 = n3.months, f3 = n3.meridiem, h3 = function(t4, n4, i3, s4) {
          return t4 && (t4[n4] || t4(e3, r3)) || i3[n4].slice(0, s4);
        }, d2 = function(t4) {
          return O2.s(s3 % 12 || 12, t4, "0");
        }, $3 = f3 || function(t4, e4, n4) {
          var r4 = t4 < 12 ? "AM" : "PM";
          return n4 ? r4.toLowerCase() : r4;
        };
        return r3.replace(y2, function(t4, r4) {
          return r4 || function(t5) {
            switch (t5) {
              case "YY":
                return String(e3.$y).slice(-2);
              case "YYYY":
                return O2.s(e3.$y, 4, "0");
              case "M":
                return a2 + 1;
              case "MM":
                return O2.s(a2 + 1, 2, "0");
              case "MMM":
                return h3(n3.monthsShort, a2, c3, 3);
              case "MMMM":
                return h3(c3, a2);
              case "D":
                return e3.$D;
              case "DD":
                return O2.s(e3.$D, 2, "0");
              case "d":
                return String(e3.$W);
              case "dd":
                return h3(n3.weekdaysMin, e3.$W, o3, 2);
              case "ddd":
                return h3(n3.weekdaysShort, e3.$W, o3, 3);
              case "dddd":
                return o3[e3.$W];
              case "H":
                return String(s3);
              case "HH":
                return O2.s(s3, 2, "0");
              case "h":
                return d2(1);
              case "hh":
                return d2(2);
              case "a":
                return $3(s3, u3, true);
              case "A":
                return $3(s3, u3, false);
              case "m":
                return String(u3);
              case "mm":
                return O2.s(u3, 2, "0");
              case "s":
                return String(e3.$s);
              case "ss":
                return O2.s(e3.$s, 2, "0");
              case "SSS":
                return O2.s(e3.$ms, 3, "0");
              case "Z":
                return i2;
            }
            return null;
          }(t4) || i2.replace(":", "");
        });
      }, m3.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, m3.diff = function(r3, d2, l2) {
        var $3, y3 = this, M4 = O2.p(d2), m4 = w2(r3), v3 = (m4.utcOffset() - this.utcOffset()) * e2, g3 = this - m4, D3 = function() {
          return O2.m(y3, m4);
        };
        switch (M4) {
          case h2:
            $3 = D3() / 12;
            break;
          case c2:
            $3 = D3();
            break;
          case f2:
            $3 = D3() / 3;
            break;
          case o2:
            $3 = (g3 - v3) / 6048e5;
            break;
          case a:
            $3 = (g3 - v3) / 864e5;
            break;
          case u2:
            $3 = g3 / n2;
            break;
          case s2:
            $3 = g3 / e2;
            break;
          case i:
            $3 = g3 / t2;
            break;
          default:
            $3 = g3;
        }
        return l2 ? $3 : O2.a($3);
      }, m3.daysInMonth = function() {
        return this.endOf(c2).$D;
      }, m3.$locale = function() {
        return D2[this.$L];
      }, m3.locale = function(t3, e3) {
        if (!t3)
          return this.$L;
        var n3 = this.clone(), r3 = S2(t3, e3, true);
        return r3 && (n3.$L = r3), n3;
      }, m3.clone = function() {
        return O2.w(this.$d, this);
      }, m3.toDate = function() {
        return new Date(this.valueOf());
      }, m3.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, m3.toISOString = function() {
        return this.$d.toISOString();
      }, m3.toString = function() {
        return this.$d.toUTCString();
      }, M3;
    }(), _2 = b.prototype;
    return w2.prototype = _2, [["$ms", r2], ["$s", i], ["$m", s2], ["$H", u2], ["$W", a], ["$M", c2], ["$y", h2], ["$D", d]].forEach(function(t3) {
      _2[t3[1]] = function(e3) {
        return this.$g(e3, t3[0], t3[1]);
      };
    }), w2.extend = function(t3, e3) {
      return t3.$i || (t3(e3, b, w2), t3.$i = true), w2;
    }, w2.locale = S2, w2.isDayjs = p2, w2.unix = function(t3) {
      return w2(1e3 * t3);
    }, w2.en = D2[g2], w2.Ls = D2, w2.p = {}, w2;
  });
})(dayjs_min);
var dayjs = dayjs_min.exports;
var defaultCountryCode = ref("us");
function updateDefaultCountryCode(newCode) {
  if (newCode) {
    defaultCountryCode.value = newCode;
  }
}
function useDefaultCountryCode() {
  return {
    defaultCountryCode,
    updateDefaultCountryCode
  };
}
var appleBiometric = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI2IiBoZWlnaHQ9IjYxIiB2aWV3Qm94PSIwIDAgMTI2IDYxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8bGluZSB4MT0iNjMuNSIgeTE9Ii0yLjE4NTU3ZS0wOCIgeDI9IjYzLjUiIHkyPSI2MSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yLjI4NTE2IDIwLjM0ODZWMTUuMjk0OUMyLjI4NTE2IDEyLjUzMjUgNC41MzI1NiAxMC4yODUyIDcuMjk0OTIgMTAuMjg1MkgxMi4zNDg2QzEyLjk3OTYgMTAuMjg1MiAxMy40OTEyIDkuNzczNTkgMTMuNDkxMiA5LjE0MjU4QzEzLjQ5MTIgOC41MTE1NyAxMi45Nzk2IDggMTIuMzQ4NiA4SDcuMjk0OTJDMy4yNzI1MiA4IDAgMTEuMjcyNSAwIDE1LjI5NDlWMjAuMzQ4NkMwIDIwLjk3OTYgMC41MTE1NjcgMjEuNDkxMiAxLjE0MjU4IDIxLjQ5MTJDMS43NzM1OSAyMS40OTEyIDIuMjg1MTYgMjAuOTc5NiAyLjI4NTE2IDIwLjM0ODZaTTEyLjM0ODYgNTAuNzE0OEMxMi45Nzk2IDUwLjcxNDggMTMuNDkxMiA1MS4yMjY0IDEzLjQ5MTIgNTEuODU3NEMxMy40OTEyIDUyLjQ4ODQgMTIuOTc5NiA1MyAxMi4zNDg2IDUzSDcuMjk0OTJDMy4yNzI1MiA1MyAwIDQ5LjcyNzUgMCA0NS43MDUxVjQwLjY1MTRDMCA0MC4wMjA0IDAuNTExNTY3IDM5LjUwODggMS4xNDI1OCAzOS41MDg4QzEuNzczNTkgMzkuNTA4OCAyLjI4NTE2IDQwLjAyMDQgMi4yODUxNiA0MC42NTE0VjQ1LjcwNTFDMi4yODUxNiA0OC40Njc0IDQuNTMyNTYgNTAuNzE0OCA3LjI5NDkyIDUwLjcxNDhIMTIuMzQ4NlpNNDUgNDAuNjUxNFY0NS43MDUxQzQ1IDQ5LjcyNzUgNDEuNzI3NSA1MyAzNy43MDUxIDUzSDMyLjY1MTRDMzIuMDIwNCA1MyAzMS41MDg4IDUyLjQ4ODQgMzEuNTA4OCA1MS44NTc0QzMxLjUwODggNTEuMjI2NCAzMi4wMjA0IDUwLjcxNDggMzIuNjUxNCA1MC43MTQ4SDM3LjcwNTFDNDAuNDY3NCA1MC43MTQ4IDQyLjcxNDggNDguNDY3NCA0Mi43MTQ4IDQ1LjcwNTFWNDAuNjUxNEM0Mi43MTQ4IDQwLjAyMDQgNDMuMjI2NCAzOS41MDg4IDQzLjg1NzQgMzkuNTA4OEM0NC40ODg0IDM5LjUwODggNDUgNDAuMDIwNCA0NSA0MC42NTE0Wk00NSAxNS4yOTQ5VjIwLjM0ODZDNDUgMjAuOTc5NiA0NC40ODg0IDIxLjQ5MTIgNDMuODU3NCAyMS40OTEyQzQzLjIyNjQgMjEuNDkxMiA0Mi43MTQ4IDIwLjk3OTYgNDIuNzE0OCAyMC4zNDg2VjE1LjI5NDlDNDIuNzE0OCAxMi41MzI1IDQwLjQ2NzQgMTAuMjg1MiAzNy43MDUxIDEwLjI4NTJIMzIuNjUxNEMzMi4wMjA0IDEwLjI4NTIgMzEuNTA4OCA5Ljc3MzU5IDMxLjUwODggOS4xNDI1OEMzMS41MDg4IDguNTExNTcgMzIuMDIwNCA4IDMyLjY1MTQgOEgzNy43MDUxQzQxLjcyNzUgOCA0NSAxMS4yNzI1IDQ1IDE1LjI5NDlaTTMwLjM4NSA0MS4yNTk0QzMwLjg2NjQgNDAuODE0OCAzMC44OTYyIDQwLjA2NDEgMzAuNDUxNSAzOS41ODI3QzMwLjAwNjkgMzkuMTAxMyAyOS4yNTYyIDM5LjA3MTYgMjguNzc0OCAzOS41MTYyQzI3LjA2MiA0MS4wOTg0IDI0LjgzMzUgNDEuOTY5NyAyMi41IDQxLjk2OTdDMjAuMTY2NCA0MS45Njk3IDE3LjkzOCA0MS4wOTg0IDE2LjIyNTEgMzkuNTE2MkMxNS43NDM3IDM5LjA3MTYgMTQuOTkzMSAzOS4xMDE0IDE0LjU0ODQgMzkuNTgyN0MxNC4xMDM4IDQwLjA2NDEgMTQuMTMzNSA0MC44MTQ4IDE0LjYxNDkgNDEuMjU5NEMxNi43Njc2IDQzLjI0NzcgMTkuNTY3OCA0NC4zNDI4IDIyLjUgNDQuMzQyOEMyNS40MzIxIDQ0LjM0MjggMjguMjMyNCA0My4yNDc3IDMwLjM4NSA0MS4yNTk0Wk0yNC44NzMgMjQuOTYyOVYzMy40MDA0QzI0Ljg3MyAzNS4wNzI0IDIzLjUxMjggMzYuNDMyNiAyMS44NDA4IDM2LjQzMjZIMjAuODc0QzIwLjIxODcgMzYuNDMyNiAxOS42ODc1IDM1LjkwMTQgMTkuNjg3NSAzNS4yNDYxQzE5LjY4NzUgMzQuNTkwOCAyMC4yMTg3IDM0LjA1OTYgMjAuODc0IDM0LjA1OTZIMjEuODQwOEMyMi4yMDQzIDM0LjA1OTYgMjIuNSAzMy43NjM5IDIyLjUgMzMuNDAwNFYyNC45NjI5QzIyLjUgMjQuMzA3NiAyMy4wMzEyIDIzLjc3NjQgMjMuNjg2NSAyMy43NzY0QzI0LjM0MTggMjMuNzc2NCAyNC44NzMgMjQuMzA3NiAyNC44NzMgMjQuOTYyOVpNMzMuMDQ2OSAyOC4yODA4VjI0Ljg5N0MzMy4wNDY5IDI0LjI3ODEgMzIuNTQ1MiAyMy43NzY0IDMxLjkyNjMgMjMuNzc2NEMzMS4zMDc0IDIzLjc3NjQgMzAuODA1NyAyNC4yNzgxIDMwLjgwNTcgMjQuODk3VjI4LjI4MDhDMzAuODA1NyAyOC44OTk2IDMxLjMwNzQgMjkuNDAxNCAzMS45MjYzIDI5LjQwMTRDMzIuNTQ1MiAyOS40MDE0IDMzLjA0NjkgMjguODk5NiAzMy4wNDY5IDI4LjI4MDhaTTEyLjIxNjggMjguMjgwOEMxMi4yMTY4IDI4Ljg5OTYgMTIuNzE4NSAyOS40MDE0IDEzLjMzNzQgMjkuNDAxNEMxMy45NTYzIDI5LjQwMTQgMTQuNDU4IDI4Ljg5OTYgMTQuNDU4IDI4LjI4MDhWMjQuODk3QzE0LjQ1OCAyNC4yNzgxIDEzLjk1NjMgMjMuNzc2NCAxMy4zMzc0IDIzLjc3NjRDMTIuNzE4NSAyMy43NzY0IDEyLjIxNjggMjQuMjc4MSAxMi4yMTY4IDI0Ljg5N1YyOC4yODA4WiIgZmlsbD0iY3VycmVudGNvbG9yIi8+CjxwYXRoIGQ9Ik0xMDcuNzY4IDguNjYzMzNDMTA0LjY2MiA3Ljg3NzAxIDEwMS4zOTQgNy43NjQ2NiA5OC4yMTMyIDguNDYxNDRDOTcuOTY3NCA4LjUxNTI5IDk3LjgxMTEgOC43NjExNiA5Ny44NjQyIDkuMDEwNkM5Ny45MTczIDkuMjYwMDQgOTguMTU5NSA5LjQxODYgOTguNDA1MyA5LjM2NDc1QzEwMS40NTEgOC42OTc0NSAxMDQuNTg5IDguODA3NDggMTA3LjU3MyA5LjU2NjU4QzExNC43MSAxMS4zODE5IDEyMC42NTEgMTYuODI3NiAxMjIuOTE0IDIzLjk0MTFDMTIzLjc4OSAyNi42OTIxIDEyNC4xNiAyOS42MjE0IDEyNC4yMzUgMzIuNjkxNEMxMjQuMjQxIDMyLjk0NjUgMTI0LjQ1IDMzLjE0ODIgMTI0LjcwMSAzMy4xNDJDMTI0Ljk1MyAzMy4xMzU3IDEyNS4xNTEgMzIuOTIzOCAxMjUuMTQ1IDMyLjY2ODdDMTI1LjA3IDI5LjU1NjYgMTI0LjY5NCAyNi41NTE5IDEyMy43OTcgMjMuNzEwMUMxMjEuNDQ3IDE2LjI2MjggMTE1LjIzOCAxMC41NTQyIDEwNy43NjggOC42NjMzM1oiIGZpbGw9ImN1cnJlbnRjb2xvciIvPgo8cGF0aCBkPSJNOTUuOTAyNiAxMC4wNjEzQzk2LjE0NSA5Ljk5MzQ0IDk2LjI4NzMgOS43MzkgOTYuMjIwNCA5LjQ5MzAxQzk2LjE1MzYgOS4yNDcwMSA5NS45MDI4IDkuMTAyNiA5NS42NjA0IDkuMTcwNDdDOTIuMzM0MyAxMC4xMDE3IDg3LjY1NTQgMTMuMzE5MyA4NC43NjM4IDE3LjYxNzhDODQuNzYyNyAxNy42MTk0IDg0Ljc2MTYgMTcuNjIxMSA4NC43NjA1IDE3LjYyMjhDODIuMjIxNSAyMS41MDU5IDgwLjYyOTkgMjYuMzg1NiA4MS4wNzQyIDMxLjEyMDdDODEuMDc0NiAzMS4xMjUyIDgxLjA3NTEgMzEuMTI5NyA4MS4wNzU3IDMxLjEzNDJDODEuMTgyMiAzMS45OTg5IDgxLjM2MSAzMi44NjE5IDgxLjU0IDMzLjcyNTlDODEuOTE3IDM1LjU0NTcgODIuMjk0OSAzNy4zNyA4Mi4wMDAzIDM5LjIyMzJDODEuOTYwMyAzOS40NzUyIDgyLjEyOSAzOS43MTIzIDgyLjM3NzMgMzkuNzUzQzgyLjYyNTUgMzkuNzkzNiA4Mi44NTkzIDM5LjYyMjMgODIuODk5MyAzOS4zNzA0QzgzLjIwNzIgMzcuNDMzMSA4Mi44MjQ5IDM1LjU0MzUgODIuNDQyNSAzMy42NTM2QzgyLjI2NTYgMzIuNzc5NSA4Mi4wODg3IDMxLjkwNTMgODEuOTgwMSAzMS4wMjY0QzgxLjU2MjIgMjYuNTUyIDgzLjA2NzUgMjEuODg0MyA4NS41MTc2IDE4LjEzNjNDODguMjk5MiAxNC4wMDI4IDkyLjgwMzUgMTAuOTI5IDk1LjkwMjYgMTAuMDYxM1oiIGZpbGw9ImN1cnJlbnRjb2xvciIvPgo8cGF0aCBkPSJNMTAxLjg3NyAxMS4wOTM2QzEwNy41OTQgMTAuNzM5NCAxMTMuMzA5IDEzLjEwNjkgMTE3LjE0NyAxNy42NDI2QzExNy4zMTEgMTcuODM2MiAxMTcuMjg5IDE4LjEyNzkgMTE3LjA5OCAxOC4yOTQyQzExNi45MDcgMTguNDYwNCAxMTYuNjIgMTguNDM4MyAxMTYuNDU2IDE4LjI0NDdDMTEyLjgwNiAxMy45MzE0IDEwNy4zNjggMTEuNjc4NCAxMDEuOTMgMTIuMDE2MkMxMDEuOTI4IDEyLjAxNjMgMTAxLjkyNiAxMi4wMTY0IDEwMS45MjQgMTIuMDE2NUM5NS4wNDc3IDEyLjM1NDIgODguNjA3OCAxNy4wODg0IDg2LjIzOSAyMy43MjIxQzg2LjE1MzQgMjMuOTYyIDg1Ljg5MjMgMjQuMDg2IDg1LjY1NTggMjMuOTk5MUM4NS40MTk0IDIzLjkxMjIgODUuMjk3MiAyMy42NDcyIDg1LjM4MjkgMjMuNDA3M0M4Ny44NzgzIDE2LjQxODkgOTQuNjQwNiAxMS40NTAyIDEwMS44NzcgMTEuMDkzNloiIGZpbGw9ImN1cnJlbnRjb2xvciIvPgo8cGF0aCBkPSJNMTE4LjUzNCAxOS42NjEyQzExOC4zOTQgMTkuNDQ5NCAxMTguMTExIDE5LjM5MyAxMTcuOTAyIDE5LjUzNTJDMTE3LjY5NCAxOS42Nzc1IDExNy42MzggMTkuOTY0NiAxMTcuNzc4IDIwLjE3NjRDMTE5LjkwNiAyMy4zOTE3IDEyMC43ODYgMjYuODkwNSAxMjEuMTM0IDMxLjA0MjZDMTIxLjE1NSAzMS4yOTY5IDEyMS4zNzUgMzEuNDg1NSAxMjEuNjI2IDMxLjQ2MzlDMTIxLjg3NiAzMS40NDIyIDEyMi4wNjIgMzEuMjE4NiAxMjIuMDQxIDMwLjk2NDNDMTIxLjY4NSAyNi43MjE1IDEyMC43NzggMjMuMDUyMiAxMTguNTM0IDE5LjY2MTJaIiBmaWxsPSJjdXJyZW50Y29sb3IiLz4KPHBhdGggZD0iTTEyMS43MzYgMzIuOTI2MUMxMjEuOTg3IDMyLjkxMDEgMTIyLjIwNCAzMy4xMDM3IDEyMi4yMTkgMzMuMzU4NEMxMjIuMzkxIDM2LjE0NDYgMTIyLjM5MiAzOS4yOTY5IDEyMi4wODkgNDEuNjI2NUMxMjIuMDU2IDQxLjg3OTQgMTIxLjgyNyA0Mi4wNTc0IDEyMS41NzggNDIuMDIzOUMxMjEuMzI4IDQxLjk5MDQgMTIxLjE1MyA0MS43NTgyIDEyMS4xODYgNDEuNTA1MkMxMjEuNDc5IDM5LjI2IDEyMS40OCAzNi4xNzQ1IDEyMS4zMSAzMy40MTZDMTIxLjI5NSAzMy4xNjEzIDEyMS40ODUgMzIuOTQyIDEyMS43MzYgMzIuOTI2MVoiIGZpbGw9ImN1cnJlbnRjb2xvciIvPgo8cGF0aCBkPSJNODUuNTUxNSAyNS45NjAxQzg1LjYxMDUgMjUuNzEyIDg1LjQ2MDIgMjUuNDYyNCA4NS4yMTU3IDI1LjQwMjVDODQuOTcxMyAyNS4zNDI2IDg0LjcyNTMgMjUuNDk1MSA4NC42NjYzIDI1Ljc0MzJDODQuMzMyMSAyNy4xNDc4IDg0LjE1ODYgMjguNTkwOCA4NC4xNTE4IDMwLjAzNTFDODQuMTQ0NyAzMS41MjM3IDg0LjQxODIgMzIuOTc2OCA4NC42OTE4IDM0LjQzMDRDODQuOTE1NiAzNS42MTk1IDg1LjEzOTUgMzYuODA5IDg1LjIxIDM4LjAxODdDODUuMzAyNSAzOS42MDc2IDg0Ljk3MzEgNDEuMTk4OSA4NC40MDQgNDIuNzEzNUM4NC4zMTQ0IDQyLjk1MTkgODQuNDMyMyA0My4yMTg5IDg0LjY2NzIgNDMuMzA5OEM4NC45MDIyIDQzLjQwMDggODUuMTY1MyA0My4yODEyIDg1LjI1NDkgNDMuMDQyN0M4NS44NTY0IDQxLjQ0MTggODYuMjIxMSAzOS43MTc0IDg2LjExOSAzNy45NjQyQzg2LjA0OSAzNi43NjI4IDg1LjgyNTIgMzUuNTgwMiA4NS42MDE0IDM0LjM5ODFDODUuMzI4MyAzMi45NTU2IDg1LjA1NTMgMzEuNTEzOSA4NS4wNjI0IDMwLjAzOTVDODUuMDY4OSAyOC42NjcyIDg1LjIzMzggMjcuMjk1NSA4NS41NTE1IDI1Ljk2MDFaIiBmaWxsPSJjdXJyZW50Y29sb3IiLz4KPHBhdGggZD0iTTk3LjQ5ODUgMTUuNjkyMkM5Ny41OTIyIDE1LjkyOSA5Ny40NzkgMTYuMTk4MSA5Ny4yNDU2IDE2LjI5MzJDOTIuNTI1NCAxOC4yMTY5IDg4Ljk4MDggMjIuNTU4IDg4LjI1NzcgMjcuNjc3MUM4Ny45NTU2IDI5LjgxNTggODguMjgyIDMxLjkzNDIgODguNjA4MyAzNC4wNTIyQzg4Ljc5MiAzNS4yNDQ5IDg4Ljk3NTcgMzYuNDM3NCA4OS4wNDcyIDM3LjYzMzNDODkuMjAyMSA0MC4yMjY0IDg4LjkxMSA0My4wNzQ2IDg3LjI0ODEgNDUuNjY2MUM4Ny4xMTA5IDQ1Ljg4IDg2LjgyODggNDUuOTQwNCA4Ni42MTgxIDQ1LjgwMTJDODYuNDA3NCA0NS42NjE5IDg2LjM0NzggNDUuMzc1NyA4Ni40ODUgNDUuMTYxOEM4OC4wMDAxIDQyLjgwMDcgODguMjg2OSA0MC4xNzgxIDg4LjEzODIgMzcuNjg5MkM4OC4wNjU4IDM2LjQ3NTggODcuODgzMiAzNS4yNjk1IDg3LjcwMDcgMzQuMDYzOUM4Ny4zNzMzIDMxLjkwMDggODcuMDQ2MyAyOS43NDAzIDg3LjM1NjMgMjcuNTQ1OUM4OC4xMjg0IDIyLjA4MDEgOTEuOTAzNCAxNy40NzQ1IDk2LjkwNjMgMTUuNDM1NkM5Ny4xMzk2IDE1LjM0MDUgOTcuNDA0NyAxNS40NTU0IDk3LjQ5ODUgMTUuNjkyMloiIGZpbGw9ImN1cnJlbnRjb2xvciIvPgo8cGF0aCBkPSJNMTEzLjQ4MiAxOC4zMjI4QzEwOS43NTggMTQuNzgzMyAxMDQuMzYxIDEzLjU0OCA5OS40NTYyIDE0LjYzOThDOTkuMjEwNSAxNC42OTQ1IDk5LjA1NTEgMTQuOTQwOSA5OS4xMDkgMTUuMTkwMUM5OS4xNjI4IDE1LjQzOTQgOTkuNDA1NiAxNS41OTcxIDk5LjY1MTMgMTUuNTQyNUMxMDQuMjk2IDE0LjUwODYgMTA5LjM3OCAxNS42ODggMTEyLjg2IDE4Ljk5NzNDMTE1Ljc5NCAyMS43ODY3IDExNy40OTggMjUuODQ1MyAxMTcuOTQ0IDMwLjI3MzVDMTE3Ljk3IDMwLjUyNzQgMTE4LjE5NCAzMC43MTIxIDExOC40NDQgMzAuNjg2MkMxMTguNjk0IDMwLjY2MDIgMTE4Ljg3NiAzMC40MzM0IDExOC44NSAzMC4xNzk1QzExOC4zODcgMjUuNTgxNCAxMTYuNjExIDIxLjI5NjkgMTEzLjQ4MiAxOC4zMjI4WiIgZmlsbD0iY3VycmVudGNvbG9yIi8+CjxwYXRoIGQ9Ik0xMTguNzU1IDMyLjM4QzExOS4wMDUgMzIuMzU0IDExOS4yMjkgMzIuNTM4NiAxMTkuMjU1IDMyLjc5MjVDMTE5LjY4NyAzNy4wNjUxIDExOS41MDEgNDEuNjc5OSAxMTguODQ4IDQ2LjE0NDNDMTE4LjgxMSA0Ni4zOTY3IDExOC41NzkgNDYuNTcxIDExOC4zMzEgNDYuNTMzNUMxMTguMDgyIDQ2LjQ5NiAxMTcuOTEgNDYuMjYxMSAxMTcuOTQ3IDQ2LjAwODZDMTE4LjU5MSA0MS42MDYzIDExOC43NzIgMzcuMDY5OSAxMTguMzQ5IDMyLjg4NjlDMTE4LjMyMyAzMi42MzMgMTE4LjUwNSAzMi40MDYxIDExOC43NTUgMzIuMzhaIiBmaWxsPSJjdXJyZW50Y29sb3IiLz4KPHBhdGggZD0iTTEwMi44ODIgMTcuMzkwNUM5NS45MDQ1IDE3LjM5MDUgOTAuMjM1NyAyMy4wMzkzIDkwLjIzNTcgMzAuMDIzMkM5MC4yMzU3IDMwLjc2OTIgOTAuMzAwOSAzMS41MDAyIDkwLjQyNTMgMzIuMjExQzkwLjQ2OTMgMzIuNDYyMiA5MC43MDU2IDMyLjYyOTcgOTAuOTUzMiAzMi41ODUxQzkxLjIwMDggMzIuNTQwNSA5MS4zNjU4IDMyLjMwMDcgOTEuMzIxOSAzMi4wNDk0QzkxLjIwNjcgMzEuMzkxMyA5MS4xNDYzIDMwLjcxNDQgOTEuMTQ2MyAzMC4wMjMyQzkxLjE0NjMgMjMuNTYzOCA5Ni4zOTM0IDE4LjMxNDYgMTAyLjg4MiAxOC4zMTQ2QzEwNS44MTQgMTguMzE0NiAxMDguNDkyIDE5LjM4NyAxMTAuNTQ5IDIxLjE1OTFDMTEwLjc0IDIxLjMyNDMgMTExLjAyOCAyMS4zMDA1IDExMS4xOSAyMS4xMDZDMTExLjM1MyAyMC45MTE1IDExMS4zMyAyMC42MTk5IDExMS4xMzggMjAuNDU0N0MxMDguOTIyIDE4LjU0NTEgMTA2LjAzNiAxNy4zOTA1IDEwMi44ODIgMTcuMzkwNVoiIGZpbGw9ImN1cnJlbnRjb2xvciIvPgo8cGF0aCBkPSJNMTEyLjE1OCAyMi4xNzc1QzExMi4zNCAyMi4wMDA4IDExMi42MjggMjIuMDA3IDExMi44MDIgMjIuMTkxMkMxMTQuODExIDI0LjMxNzYgMTE1LjQ1NCAyNy42NTk3IDExNS44OCAzMC40NjQ0QzExNi4zNTkgMzMuNjIzNyAxMTYuNDMzIDM2LjcwNTggMTE2LjQzMyAzOC4xMzQ4QzExNi40MzMgMzguMzkgMTE2LjIyOSAzOC41OTY5IDExNS45NzcgMzguNTk2OUMxMTUuNzI2IDM4LjU5NjkgMTE1LjUyMiAzOC4zOSAxMTUuNTIyIDM4LjEzNDhDMTE1LjUyMiAzNi43Mjg5IDExNS40NDkgMzMuNjk5IDExNC45OCAzMC42MDUxQzExNC41ODUgMjguMDAxMiAxMTQuMDE1IDI0LjgxMDUgMTEyLjE0NSAyMi44MzA4QzExMS45NzEgMjIuNjQ2NiAxMTEuOTc3IDIyLjM1NDEgMTEyLjE1OCAyMi4xNzc1WiIgZmlsbD0iY3VycmVudGNvbG9yIi8+CjxwYXRoIGQ9Ik0xMTYuMzE3IDQwLjc4MUMxMTYuMzM3IDQwLjUyNjcgMTE2LjE1IDQwLjMwNCAxMTUuODk5IDQwLjI4MzdDMTE1LjY0OSA0MC4yNjM0IDExNS40MjkgNDAuNDUzMiAxMTUuNDA5IDQwLjcwNzZDMTE1LjE4NiA0My41NTM4IDExNC44OTMgNDYuMzk2OCAxMTQuMzAxIDQ5LjAyMzFDMTE0LjI0NCA0OS4yNzE4IDExNC4zOTggNDkuNTE5NyAxMTQuNjQzIDQ5LjU3NjdDMTE0Ljg4OCA0OS42MzM2IDExNS4xMzIgNDkuNDc4MiAxMTUuMTg4IDQ5LjIyOTRDMTE1Ljc5NyA0Ni41MzQgMTE2LjA5MyA0My42MzQ4IDExNi4zMTcgNDAuNzgxWiIgZmlsbD0iY3VycmVudGNvbG9yIi8+CjxwYXRoIGQ9Ik05MS4xNTgyIDMzLjkxMTZDOTEuNDA0OSAzMy44NjIzIDkxLjY0NDMgMzQuMDI1MyA5MS42OTI5IDM0LjI3NTdDOTIuNjU1NSAzOS4yMzY4IDkxLjk5MDUgNDMuNzQzNyA4OS40NDEyIDQ3LjY5MTVDODkuMzAzMyA0Ny45MDUgODkuMDIxMSA0Ny45NjQ2IDg4LjgxMDggNDcuODI0N0M4OC42MDA1IDQ3LjY4NDggODguNTQxNyA0Ny4zOTg0IDg4LjY3OTUgNDcuMTg1QzkxLjA3ODIgNDMuNDcwNSA5MS43MjM3IDM5LjIxNzcgOTAuNzk5NCAzNC40NTQyQzkwLjc1MDggMzQuMjAzOCA5MC45MTE0IDMzLjk2MDkgOTEuMTU4MiAzMy45MTE2WiIgZmlsbD0iY3VycmVudGNvbG9yIi8+CjxwYXRoIGQ9Ik0xMDIuODgyIDIwLjM5NjhDOTguMzUyNSAyMC4zOTY4IDkzLjkwOTYgMjMuOTU0NiA5My40NTYxIDI4LjQyNkM5My4yNTc1IDMwLjM4MzYgOTMuNTM2NCAzMi4zMTE5IDkzLjgxNTQgMzQuMjQwOUM5NC4wNTkxIDM1LjkyNTMgOTQuMzAyOCAzNy42MTAzIDk0LjIyODggMzkuMzE1OUM5NC4wNTk0IDQzLjIxOTQgOTIuOTMwOCA0Ni40NDE2IDkwLjk5MTYgNDkuMDk1NkM5MC44NDE4IDQ5LjMwMDYgOTAuODg0MiA0OS41OSA5MS4wODYxIDQ5Ljc0MkM5MS4yODgxIDQ5Ljg5NCA5MS41NzMzIDQ5Ljg1MSA5MS43MjMxIDQ5LjY0NkM5My43Nzk4IDQ2LjgzMTIgOTQuOTYxOSA0My40Mjc3IDk1LjEzODUgMzkuMzU2NUM5NS4yMTIyIDM3LjY1ODYgOTQuOTY3NyAzNS45NzkgOTQuNzIzNCAzNC4zMDA0Qzk0LjQ0NCAzMi4zODEgOTQuMTY0OSAzMC40NjMgOTQuMzYxOSAyOC41MjA3Qzk0Ljc2MDMgMjQuNTkyNiA5OC43NDQzIDIxLjMyMDkgMTAyLjg4MiAyMS4zMjA5QzEwNC44MTEgMjEuMzIwOSAxMDkuODA0IDIyLjM4MTMgMTExLjM5MiAyNy42MzE2QzExMi4zODcgMzAuOTIxNyAxMTIuNjU5IDM1LjM3NDUgMTEyLjQxOCAzOS43MDAzQzExMi4xNzcgNDQuMDI1NiAxMTEuNDI3IDQ4LjE2MjUgMTEwLjQxOCA1MC44MTUzQzExMC4zMjggNTEuMDUzMyAxMTAuNDQ1IDUxLjMyMDggMTEwLjY3OSA1MS40MTI2QzExMC45MTQgNTEuNTA0NSAxMTEuMTc4IDUxLjM4NTkgMTExLjI2OCA1MS4xNDc4QzExMi4zMjMgNDguMzcyNCAxMTMuMDgzIDQ0LjEzMDggMTEzLjMyNyAzOS43NTI1QzExMy41NzEgMzUuMzc0NyAxMTMuMzAzIDMwLjc5ODcgMTEyLjI2MiAyNy4zNjA0QzExMC41IDIxLjUzMjQgMTA0Ljk3MyAyMC4zOTY4IDEwMi44ODIgMjAuMzk2OFoiIGZpbGw9ImN1cnJlbnRjb2xvciIvPgo8cGF0aCBkPSJNOTUuODc0OCA0Ny42OTIyQzk2LjA4NTQgNDcuODMxNiA5Ni4xNDQ4IDQ4LjExNzkgOTYuMDA3NCA0OC4zMzE3Qzk1LjcyNSA0OC43NzEgOTUuNDc2NyA0OS4yMzA2IDk1LjIyODMgNDkuNjkwM0M5NC45Nzk5IDUwLjE0OTkgOTQuNzMxNSA1MC42MDk2IDk0LjQ0OTEgNTEuMDQ5Qzk0LjMxMTcgNTEuMjYyOCA5NC4wMjk2IDUxLjMyMyA5My44MTkgNTEuMTgzNkM5My42MDg0IDUxLjA0NDIgOTMuNTQ5IDUwLjc1NzkgOTMuNjg2NCA1MC41NDQyQzkzLjk2ODcgNTAuMTA0OSA5NC4yMTcxIDQ5LjY0NTIgOTQuNDY1NSA0OS4xODU2Qzk0LjcxMzkgNDguNzI1OSA5NC45NjIzIDQ4LjI2NjIgOTUuMjQ0NyA0Ny44MjY4Qzk1LjM4MiA0Ny42MTMxIDk1LjY2NDIgNDcuNTUyOCA5NS44NzQ4IDQ3LjY5MjJaIiBmaWxsPSJjdXJyZW50Y29sb3IiLz4KPHBhdGggZD0iTTk5Ljc3MzQgMjUuMTkzMkM5OS45ODI0IDI1LjA1MTMgMTAwLjAzOCAyNC43NjQ0IDk5Ljg5ODcgMjQuNTUyMkM5OS43NTg5IDI0LjM0MDEgOTkuNDc2MSAyNC4yODMyIDk5LjI2NzEgMjQuNDI1MUM5Ny40NjQyIDI1LjY0ODkgOTYuMzU4IDI3LjMzMTcgOTYuMzU4IDI5Ljc5N0M5Ni4zNTggMzEuMjY1IDk2LjYxNDMgMzIuNDY0OSA5Ni44NzcxIDMzLjY5NTZDOTcuMjcwNSAzNS41MzczIDk3LjUzNzIgMzcuMzc0OSA5Ny40ODkzIDM5LjI2NjZDOTcuNDMxMSA0MS41NjM2IDk2Ljk4ODIgNDMuNjYyNiA5Ni4xMzY5IDQ1LjY2MjJDOTYuMDM3MiA0NS44OTY0IDk2LjE0MzQgNDYuMTY4NCA5Ni4zNzQzIDQ2LjI2OTZDOTYuNjA1MSA0Ni4zNzA4IDk2Ljg3MzEgNDYuMjYyOSA5Ni45NzI4IDQ2LjAyODdDOTcuODcyOSA0My45MTQ1IDk4LjMzODUgNDEuNjk4NCA5OC4zOTk2IDM5LjI5MDNDOTguNDQ5NCAzNy4zMjQ3IDk4LjE3NTIgMzUuNDE0MyA5Ny43NjczIDMzLjUwMDJDOTcuNTAzOSAzMi4yNjQxIDk3LjI2ODcgMzEuMTYwNSA5Ny4yNjg3IDI5Ljc5N0M5Ny4yNjg3IDI3LjY4NDcgOTguMTg0MyAyNi4yNzE4IDk5Ljc3MzQgMjUuMTkzMloiIGZpbGw9ImN1cnJlbnRjb2xvciIvPgo8cGF0aCBkPSJNMTAxLjU1IDIzLjU2OTdDMTAzLjQ0IDIzLjE3ODggMTA1LjQ3MyAyMy42NjE5IDEwNi45NjkgMjQuODkxMUMxMDkuNjQyIDI3LjA4NjcgMTA5Ljk5OCAzMS4wOTA4IDExMC4yODYgMzQuMzM1NUwxMTAuMzAxIDM0LjUwMDhDMTEwLjY3MyAzOC42ODMzIDExMC4yNDcgNDIuNzQ1OCAxMDkuMzg4IDQ2LjgyNTZDMTA5LjMzNiA0Ny4wNzUyIDEwOS4wOTQgNDcuMjM0MyAxMDguODQ4IDQ3LjE4MUMxMDguNjAyIDQ3LjEyNzcgMTA4LjQ0NSA0Ni44ODIyIDEwOC40OTggNDYuNjMyNkMxMDkuMzQzIDQyLjYxNCAxMDkuNzU2IDM4LjY0ODIgMTA5LjM5NCAzNC41ODM5QzEwOS4zODIgMzQuNDQ5NCAxMDkuMzcgMzQuMzEyOSAxMDkuMzU4IDM0LjE3NDhMMTA5LjM1OCAzNC4xNzI4QzEwOS4xMDIgMzEuMjQwNiAxMDguNzgxIDI3LjU2ODIgMTA2LjM5NiAyNS42MDk0QzEwNS4xMTcgMjQuNTU4NSAxMDMuMzYyIDI0LjEzOCAxMDEuNzMyIDI0LjQ3NTJDMTAxLjQ4NiAyNC41MjYyIDEwMS4yNDUgMjQuMzY0OCAxMDEuMTk1IDI0LjExNDhDMTAxLjE0NSAyMy44NjQ3IDEwMS4zMDQgMjMuNjIwNyAxMDEuNTUgMjMuNTY5N1oiIGZpbGw9ImN1cnJlbnRjb2xvciIvPgo8cGF0aCBkPSJNMTA4Ljc0NSA0OS4xMjQ4QzEwOC44MDcgNDguODc3NSAxMDguNjYgNDguNjI1OSAxMDguNDE2IDQ4LjU2M0MxMDguMTcyIDQ4LjUgMTA3LjkyNSA0OC42NDk1IDEwNy44NjIgNDguODk2OEMxMDcuNTg3IDQ5Ljk5NCAxMDcuMTYzIDUwLjk4NDMgMTA2LjYyNSA1MS44OTYxQzEwNi40OTYgNTIuMTE1MSAxMDYuNTY2IDUyLjM5ODkgMTA2Ljc4MiA1Mi41Mjk5QzEwNi45OTggNTIuNjYxIDEwNy4yNzggNTIuNTg5NyAxMDcuNDA3IDUyLjM3MDdDMTA3Ljk4NiA1MS4zODgxIDEwOC40NDYgNTAuMzE1MiAxMDguNzQ1IDQ5LjEyNDhaIiBmaWxsPSJjdXJyZW50Y29sb3IiLz4KPHBhdGggZD0iTTEwNi41MTggNDIuNDE5NUMxMDYuNzY4IDQyLjQ0OTUgMTA2Ljk0NyA0Mi42NzkyIDEwNi45MTcgNDIuOTMyNkMxMDYuNDg3IDQ2LjYyMDMgMTA1LjUxNiA0OS45MDkyIDEwMy45NTkgNTIuNzYxOEMxMDMuODM3IDUyLjk4NSAxMDMuNTYgNTMuMDY1NyAxMDMuMzQgNTIuOTQyQzEwMy4xMiA1Mi44MTgzIDEwMy4wNCA1Mi41MzcxIDEwMy4xNjIgNTIuMzEzOUMxMDQuNjUzIDQ5LjU4MzkgMTA1LjU5NCA0Ni40MTQ0IDEwNi4wMTMgNDIuODI0QzEwNi4wNDIgNDIuNTcwNiAxMDYuMjY5IDQyLjM4OTUgMTA2LjUxOCA0Mi40MTk1WiIgZmlsbD0iY3VycmVudGNvbG9yIi8+CjxwYXRoIGQ9Ik0xMDYuNDI1IDI5LjU1NDdDMTA2LjEwOSAyNy44NDMxIDEwNC42NjEgMjYuNTMzOCAxMDIuOTA0IDI2LjUzMzhDMTAwLjUyNCAyNi41MzM4IDk4Ljg1NDcgMjguOTY4IDk5LjQ0MzEgMzEuMjMyOEMxMDAuNDM5IDM1LjIzMDYgMTAwLjYwMiAzOS4wODM1IDk5LjkyODEgNDIuNzk0NUw5OS45Mjc2IDQyLjc5NzJDOTkuMzQyOCA0Ni4xMjkgOTguMjE5NyA0OS4xMjY0IDk2LjY4NzcgNTEuNjY2M0M5Ni41NTY1IDUxLjg4MzkgOTYuNjIzOSA1Mi4xNjg0IDk2LjgzODQgNTIuMzAxNkM5Ny4wNTI4IDUyLjQzNDggOTcuMzMzMSA1Mi4zNjY0IDk3LjQ2NDQgNTIuMTQ4N0M5OS4wNTkgNDkuNTA0OSAxMDAuMjIgNDYuMzk4MyAxMDAuODI0IDQyLjk2MDZDMTAxLjUyNCAzOS4xMDY1IDEwMS4zNSAzNS4xMTg0IDEwMC4zMjUgMzEuMDA0TDEwMC4zMjQgMzAuOTk5MkM5OS44ODI4IDI5LjMwNSAxMDEuMTEzIDI3LjQ1NzkgMTAyLjkwNCAyNy40NTc5QzEwNC4xOTcgMjcuNDU3OSAxMDUuMjg4IDI4LjQyMjkgMTA1LjUyOSAyOS43MjE2QzEwNi4xOTIgMzMuNjIyNyAxMDYuNTM3IDM3LjI0MDMgMTA2LjI5MSA0MC4zNTVDMTA2LjI3MSA0MC42MDk0IDEwNi40NTggNDAuODMyMSAxMDYuNzA5IDQwLjg1MjVDMTA2Ljk1OSA0MC44NzI4IDEwNy4xNzkgNDAuNjgzMSAxMDcuMTk5IDQwLjQyODhDMTA3LjQ1NCAzNy4yMDAzIDEwNy4wOTQgMzMuNDkzNyAxMDYuNDI2IDI5LjU2MTJDMTA2LjQyNSAyOS41NTkgMTA2LjQyNSAyOS41NTY5IDEwNi40MjUgMjkuNTU0N1oiIGZpbGw9ImN1cnJlbnRjb2xvciIvPgo8cGF0aCBkPSJNMTAxLjU0NSA0OS41NjY3QzEwMS43NjkgNDkuNjgzNCAxMDEuODU3IDQ5Ljk2MTkgMTAxLjc0MiA1MC4xODg5TDEwMC41MzYgNTIuNTcxNUMxMDAuNDIxIDUyLjc5ODUgMTAwLjE0NiA1Mi44ODc5IDk5LjkyMjggNTIuNzcxM0M5OS42OTkyIDUyLjY1NDcgOTkuNjExIDUyLjM3NjEgOTkuNzI1OSA1Mi4xNDkxTDEwMC45MzIgNDkuNzY2NUMxMDEuMDQ3IDQ5LjUzOTYgMTAxLjMyMiA0OS40NTAxIDEwMS41NDUgNDkuNTY2N1oiIGZpbGw9ImN1cnJlbnRjb2xvciIvPgo8cGF0aCBkPSJNMTAzLjI0MyAzMC4wMDAyQzEwMy4xODUgMjkuNzUxOCAxMDIuOTQgMjkuNTk3NyAxMDIuNjk1IDI5LjY1NjFDMTAyLjQ1MSAyOS43MTQ1IDEwMi4yOTkgMjkuOTYzMiAxMDIuMzU2IDMwLjIxMTZDMTAzLjg5MiAzNi44NDQ0IDEwMy42ODEgNDIuNjY4NyAxMDEuODExIDQ3LjYzMDJDMTAxLjcyMSA0Ny44Njg2IDEwMS44MzggNDguMTM1NyAxMDIuMDczIDQ4LjIyNjlDMTAyLjMwOCA0OC4zMTggMTAyLjU3MSA0OC4xOTg3IDEwMi42NjEgNDcuOTYwNEMxMDQuNjExIDQyLjc4NzEgMTA0LjgwOSAzNi43Njc3IDEwMy4yNDMgMzAuMDAwMloiIGZpbGw9ImN1cnJlbnRjb2xvciIvPgo8L3N2Zz4K";
var windowsHello = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTM2IiBoZWlnaHQ9IjU0IiB2aWV3Qm94PSIwIDAgMTM2IDU0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMzAuMDI1MSA1My45MDYyQzEyLjQ0MjcgNTMuOTA2MiAxLjYzNjgzIDM4LjMzODUgMS4wODczOCAzNy42MDU5Qy0wLjAxMTUyNiAzNS45NTc1IDAuMzU0Nzc0IDMzLjIxMDMgMi4wMDMxMyAzMi4xMTE0QzMuNjUxNDggMzEuMDEyNSA2LjAzMjQzIDMwLjgyOTMgNy4xMzEzMyAzMi40Nzc3QzcuMzE0NDggMzIuNjYwOCAxNi40NzIgNDUuNDgxMyAzMC4wMjUxIDQ1LjQ4MTNDNDMuNTc4MiA0NS40ODEzIDUyLjczNTcgMzIuNDc3NyA1Mi45MTg5IDMyLjQ3NzdDNTQuMDE3OCAzMC44MjkzIDU2LjM5ODcgMzEuMDEyNSA1OC4wNDcxIDMyLjExMTRDNTkuNjk1NCAzMy4yMTAzIDYwLjA2MTcgMzUuOTU3NSA1OC45NjI4IDM3LjYwNTlDNTguNDEzNCAzOC4zMzg1IDQ3LjYwNzUgNTMuOTA2MiAzMC4wMjUxIDUzLjkwNjJaIiBmaWxsPSJjdXJyZW50Y29sb3IiLz4KPHBhdGggZD0iTTE0LjI3NDIgMTguNTU4M0MxOC4zMjAyIDE4LjU1ODMgMjEuNjAwMiAxNS4yNzgzIDIxLjYwMDIgMTEuMjMyM0MyMS42MDAyIDcuMTg2MjEgMTguMzIwMiAzLjkwNjI1IDE0LjI3NDIgMy45MDYyNUMxMC4yMjgxIDMuOTA2MjUgNi45NDgxOCA3LjE4NjIxIDYuOTQ4MTggMTEuMjMyM0M2Ljk0ODE4IDE1LjI3ODMgMTAuMjI4MSAxOC41NTgzIDE0LjI3NDIgMTguNTU4M1oiIGZpbGw9ImN1cnJlbnRjb2xvciIvPgo8cGF0aCBkPSJNNDUuNzc2IDE4LjU1ODNDNDkuODIyMSAxOC41NTgzIDUzLjEwMiAxNS4yNzgzIDUzLjEwMiAxMS4yMzIzQzUzLjEwMiA3LjE4NjIxIDQ5LjgyMjEgMy45MDYyNSA0NS43NzYgMy45MDYyNUM0MS43MyAzLjkwNjI1IDM4LjQ1IDcuMTg2MjEgMzguNDUgMTEuMjMyM0MzOC40NSAxNS4yNzgzIDQxLjczIDE4LjU1ODMgNDUuNzc2IDE4LjU1ODNaIiBmaWxsPSJjdXJyZW50Y29sb3IiLz4KPGxpbmUgeDE9IjgwLjE4MjYiIHkxPSIyIiB4Mj0iODAuMTgyNiIgeTI9IjUyIiBzdHJva2U9ImN1cnJlbnRjb2xvciIvPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMjAwNF84MzYpIj4KPHBhdGggZD0iTTEwNi41NzkgMkg5OS42ODI2VjguOTM1NDhIMTA2LjU3OVYyWiIgZmlsbD0iY3VycmVudGNvbG9yIi8+CjxwYXRoIGQ9Ik0xMjAuNzA4IDJIMTEzLjgxMVY4LjkzNTQ4SDEyMC43MDhWMloiIGZpbGw9ImN1cnJlbnRjb2xvciIvPgo8cGF0aCBkPSJNMTM1LjMxNyAySDEyOC40MjFWOC45MzU0OEgxMzUuMzE3VjJaIiBmaWxsPSJjdXJyZW50Y29sb3IiLz4KPHBhdGggZD0iTTEwNi41NzkgMTYuMzlIOTkuNjgyNlYyMy4zMjU1SDEwNi41NzlWMTYuMzlaIiBmaWxsPSJjdXJyZW50Y29sb3IiLz4KPHBhdGggZD0iTTEyMC43MDggMTYuMzlIMTEzLjgxMVYyMy4zMjU1SDEyMC43MDhWMTYuMzlaIiBmaWxsPSJjdXJyZW50Y29sb3IiLz4KPHBhdGggZD0iTTEzNS4zMTcgMTYuMzlIMTI4LjQyMVYyMy4zMjU1SDEzNS4zMTdWMTYuMzlaIiBmaWxsPSJjdXJyZW50Y29sb3IiLz4KPHBhdGggZD0iTTEwNi41NzkgMzAuNjg5NEg5OS42ODI2VjM3LjYyNDhIMTA2LjU3OVYzMC42ODk0WiIgZmlsbD0iY3VycmVudGNvbG9yIi8+CjxwYXRoIGQ9Ik0xMjAuNzA4IDMwLjY4OTRIMTEzLjgxMVYzNy42MjQ4SDEyMC43MDhWMzAuNjg5NFoiIGZpbGw9ImN1cnJlbnRjb2xvciIvPgo8cGF0aCBkPSJNMTM1LjMxNyAzMC42ODk0SDEyOC40MjFWMzcuNjI0OEgxMzUuMzE3VjMwLjY4OTRaIiBmaWxsPSJjdXJyZW50Y29sb3IiLz4KPHBhdGggZD0iTTEyMC43MDggNDUuMDY0NUgxMTMuODExVjUySDEyMC43MDhWNDUuMDY0NVoiIGZpbGw9ImN1cnJlbnRjb2xvciIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzIwMDRfODM2Ij4KPHJlY3Qgd2lkdGg9IjM1LjYzNDgiIGhlaWdodD0iNTAiIGZpbGw9IndoaXRlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg5OS42ODI2IDIpIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==";
var genericBiometrics = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYyIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgMTYyIDUwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMzEuMzI5OCAyNS4xNDM0QzMyLjc2NSAyNi42MTE5IDMzLjU3NzQgMjguMzkzMSAzNC4xNjQzIDMwLjg1MzVMMzQuNDIwNiAzMi4wMjIxTDM0Ljg3OTQgMzQuNDQ5MkMzNS4xMDc1IDM1LjU4OTcgMzUuMjg0MyAzNi4yMjI3IDM1LjUzMDQgMzYuNzc2M0MzNi4yOTkyIDM4LjUwMTEgMzcuNjU3NSA0MC4yNzIgMzkuNjE4MSA0Mi4wNjg2QzM5LjgwOSA0Mi4yMzc4IDM5Ljk2NDMgNDIuNDQzMyA0MC4wNzQ5IDQyLjY3MzFDNDAuMTg1NiA0Mi45MDI5IDQwLjI0OTQgNDMuMTUyNCA0MC4yNjI3IDQzLjQwNzFDNDAuMjc1OSA0My42NjE4IDQwLjIzODMgNDMuOTE2NiA0MC4xNTIxIDQ0LjE1NjdDNDAuMDY1OSA0NC4zOTY3IDM5LjkzMjggNDQuNjE3MiAzOS43NjA2IDQ0LjgwNTNDMzkuNTg4MyA0NC45OTM0IDM5LjM4MDMgNDUuMTQ1MyAzOS4xNDg3IDQ1LjI1MjJDMzguOTE3MiA0NS4zNTkxIDM4LjY2NjcgNDUuNDE4OCAzOC40MTE4IDQ1LjQyNzlDMzguMTU2OSA0NS40MzcgMzcuOTAyNyA0NS4zOTUzIDM3LjY2NDEgNDUuMzA1MkMzNy40MjU1IDQ1LjIxNTEgMzcuMjA3MiA0NS4wNzg1IDM3LjAyMiA0NC45MDMyQzM0LjY5NDkgNDIuNzcwOCAzMy4wMjM5IDQwLjU4OTggMzIuMDE5MiAzOC4zNDIyQzMxLjYzNzMgMzcuNDg2MiAzMS40MDQxIDM2LjY3NjMgMzEuMTMyNSAzNS4zMThMMzAuNTk0MyAzMi40OTg4TDMwLjU1ODQgMzIuMzQ1MUMzMC4wOTcxIDMwLjE2NjYgMjkuNTIzIDI4Ljc5NTUgMjguNTc5OCAyNy44MjkzQzI2Ljc1MjUgMjUuOTU4NCAyMi41MzkxIDI2LjQ1MyAyMS40MTE1IDI4LjIzNDJDMTkuOTcxMSAzMC41MTI2IDE5LjYwNDYgMzQuMzc0OSAyMC43NDc3IDM4LjI3MDRDMjEuNjMxOSA0MS4yNzkzIDIyLjgwMzEgNDQuMjQxOSAyNC4yNjM5IDQ3LjE1NTlDMjQuMzg3OCA0Ny4zODI0IDI0LjQ2NDcgNDcuNjMxNiAyNC40OTAxIDQ3Ljg4ODVDMjQuNTE1NSA0OC4xNDU0IDI0LjQ4OSA0OC40MDQ3IDI0LjQxMiA0OC42NTExQzI0LjMzNSA0OC44OTc1IDI0LjIwOTEgNDkuMTI1OSAyNC4wNDIgNDkuMzIyNkMyMy44NzQ4IDQ5LjUxOTMgMjMuNjY5NyA0OS42ODAzIDIzLjQzOSA0OS43OTZDMjMuMjA4MiA0OS45MTE4IDIyLjk1NjUgNDkuOTc5OCAyMi42OTg5IDQ5Ljk5NjFDMjIuNDQxMyA1MC4wMTI1IDIyLjE4MyA0OS45NzY3IDIxLjkzOTUgNDkuODkxMUMyMS42OTU5IDQ5LjgwNTQgMjEuNDcyMiA0OS42NzE2IDIxLjI4MTUgNDkuNDk3NkMyMS4wOTA4IDQ5LjMyMzUgMjAuOTM3MiA0OS4xMTI5IDIwLjgyOTcgNDguODc4MkMxOS4yOSA0NS44MjIyIDE4LjAyODMgNDIuNjM0IDE3LjA1OTcgMzkuMzUyQzE1LjYxOTQgMzQuNDUxNyAxNi4wOTYxIDI5LjQ0OSAxOC4xNjE3IDI2LjE3ODhDMjAuNjA0MiAyMi4zMTkxIDI3Ljc1MiAyMS40Nzg1IDMxLjMyOTggMjUuMTQzNFpNMjUuMjY2IDMxLjA3NjRDMjUuNTE4NSAzMS4wNjc5IDI1Ljc3MDIgMzEuMTA5MiAyNi4wMDY2IDMxLjE5NzlDMjYuMjQzMSAzMS4yODY3IDI2LjQ1OTggMzEuNDIxMiAyNi42NDQzIDMxLjU5MzhDMjYuODI4NyAzMS43NjY0IDI2Ljk3NzQgMzEuOTczNiAyNy4wODE3IDMyLjIwMzZDMjcuMTg2IDMyLjQzMzcgMjcuMjQ0IDMyLjY4MjEgMjcuMjUyMyAzMi45MzQ1QzI3LjM4MzkgMzYuODkzNiAyOC42NzAzIDQwLjcyNzggMzAuOTUzMSA0My45NjUxTDMxLjQ1NTQgNDQuNjQ2OUwzMi4yMjQyIDQ1LjY0NjRDMzIuNTE5MiA0Ni4wMzA4IDMyLjY1ODEgNDYuNTEyNCAzMi42MTMxIDQ2Ljk5NDhDMzIuNTY4MiA0Ny40NzcyIDMyLjM0MjcgNDcuOTI0OCAzMS45ODE4IDQ4LjI0ODFDMzEuNjIxIDQ4LjU3MTQgMzEuMTUxMyA0OC43NDY1IDMwLjY2NjkgNDguNzM4M0MzMC4xODI1IDQ4LjczMDIgMjkuNzE5IDQ4LjUzOTQgMjkuMzY5MiA0OC4yMDQxTDI5LjE3OTUgNDcuOTkxNEwyOC40MTA3IDQ2Ljk5MTlDMjUuMzI3OCA0Mi45ODYzIDIzLjU3ODkgMzguMTE0NSAyMy40MTA1IDMzLjA2MjdDMjMuMzkzMiAzMi41NTMyIDIzLjU3OSAzMi4wNTc4IDIzLjkyNyAzMS42ODUzQzI0LjI3NDkgMzEuMzEyOCAyNC43NTY2IDMxLjA5MzggMjUuMjY2IDMxLjA3NjRaTTE1Ljc2MDMgMTguMDQ5M0MyMS4xNzMxIDE0LjA0MzUgMjguMjUxOCAxNC4yNjE0IDMzLjAxMzYgMTcuMzIxNUMzNS4zOTcxIDE4Ljg1NDEgMzcuMjAzOSAyMC42NDA0IDM4LjQwMzMgMjIuNjg1NkMzOC42NjE2IDIzLjEyNTMgMzguNzM0NyAyMy42NDk3IDM4LjYwNjMgMjQuMTQzM0MzOC40NzggMjQuNjM2OSAzOC4xNTg4IDI1LjA1OTQgMzcuNzE5MSAyNS4zMTc2QzM3LjI3OTMgMjUuNTc1OSAzNi43NTQ5IDI1LjY0ODkgMzYuMjYxMyAyNS41MjA2QzM1Ljc2NzcgMjUuMzkyMyAzNS4zNDUzIDI1LjA3MzEgMzUuMDg3IDI0LjYzMzRDMzQuMjEwNSAyMy4xMzY2IDMyLjgzNjggMjEuNzc1NyAzMC45MzUxIDIwLjU1NThDMjcuNDQ0NSAxOC4zMTA3IDIyLjA5MzIgMTguMTQ2NyAxOC4wNDkgMjEuMTQwMkMxMy44NDg0IDI0LjI0ODkgMTIuMDggMjkuNTc0NiAxMi42MDggMzUuMTg5OEMxMi45MDI3IDM4LjMzNDUgMTMuODQ4NCA0MS41MTI1IDE1LjQ2MDUgNDQuNzM0QzE1LjY4MzUgNDUuMTg5NSAxNS43MTc0IDQ1LjcxNDggMTUuNTU0OSA0Ni4xOTUyQzE1LjM5MjMgNDYuNjc1NyAxNS4wNDY1IDQ3LjA3MjQgMTQuNTkyNyA0Ny4yOTg5QzE0LjEzODkgNDcuNTI1NSAxMy42MTQgNDcuNTYzNSAxMy4xMzIzIDQ3LjQwNDdDMTIuNjUwNiA0Ny4yNDU5IDEyLjI1MTIgNDYuOTAzMSAxMi4wMjExIDQ2LjQ1MTFDMTAuMjA0IDQyLjgxOTUgOS4xMTk5IDM5LjE4MDMgOC43NzkwNCAzNS41NDg3QzguMTM4MzIgMjguNzA1OCAxMC4zNDI0IDIyLjA2MDIgMTUuNzYwMyAxOC4wNDkzWk0zOS4yODc1IDI5LjA3MjNDMzkuNzk2MiAyOS4wNDY0IDQwLjI5NDMgMjkuMjIzNiA0MC42NzI1IDI5LjU2NDhDNDEuMDUwNyAyOS45MDU5IDQxLjI3OCAzMC4zODMzIDQxLjMwNDUgMzAuODkxOUM0MS4zODQgMzIuNDM5OSA0MS43NjU4IDMzLjcwMzQgNDIuNDM3MyAzNC43MjA4QzQzLjAwMTIgMzUuNTc0MyA0My40OTgzIDM2LjA2NjQgNDMuODgwMiAzNi4yNTg2TDQ0LjAzNjYgMzYuMzIwMUM0NC41MjQ2IDM2LjQ2NzYgNDQuOTM0IDM2LjgwMjkgNDUuMTc0OCAzNy4yNTIzQzQ1LjQxNTYgMzcuNzAxNyA0NS40NjgxIDM4LjIyODMgNDUuMzIwNiAzOC43MTY0QzQ1LjE3MzEgMzkuMjA0NCA0NC44Mzc3IDM5LjYxMzkgNDQuMzg4MyAzOS44NTQ3QzQzLjkzODkgNDAuMDk1NSA0My40MTIzIDQwLjE0NzkgNDIuOTI0MyA0MC4wMDA0QzQxLjUyMjQgMzkuNTc3NSA0MC4zMTc4IDM4LjQ5MzQgMzkuMjI2IDM2LjgzNTJDMzguMTYyNCAzNS4yMjA2IDM3LjU4MDcgMzMuMjkzMyAzNy40NjUzIDMxLjA5MThDMzcuNDUyMiAzMC44Mzk3IDM3LjQ4ODkgMzAuNTg3NSAzNy41NzMyIDMwLjM0OTZDMzcuNjU3NSAzMC4xMTE3IDM3Ljc4NzkgMjkuODkyNyAzNy45NTY5IDI5LjcwNTJDMzguMTI1OSAyOS41MTc2IDM4LjMzMDEgMjkuMzY1MiAzOC41NTggMjkuMjU2NkMzOC43ODU5IDI5LjE0OCAzOS4wMzI5IDI5LjA4NTQgMzkuMjg1IDI5LjA3MjNIMzkuMjg3NVpNMjAuMTg2NCA5LjYyMjU4QzIwLjI5IDkuODUyOTQgMjAuMzQ3MyAxMC4xMDE1IDIwLjM1NDggMTAuMzUzOUMyMC4zNjIzIDEwLjYwNjQgMjAuMzIgMTAuODU3OSAyMC4yMzAyIDExLjA5NEMyMC4xNDA1IDExLjMzMDEgMjAuMDA1MSAxMS41NDYzIDE5LjgzMTggMTEuNzNDMTkuNjU4NSAxMS45MTM4IDE5LjQ1MDcgMTIuMDYxNiAxOS4yMjAyIDEyLjE2NUMxNC41MDQ1IDE0LjI4NyAxMS4wMzQ0IDE3LjMxMTIgOC43NTU5NyAyMS4yNThDNS45MDM0OSAyNi4xOTkzIDUuMTMyMDcgMzEuOTczNCA1Ljc3Mjc5IDM2Ljg0MDNDNS44MDU3NyAzNy4wOTA3IDUuNzg5MTEgMzcuMzQ1MiA1LjcyMzc2IDM3LjU4OTJDNS42NTg0IDM3LjgzMzEgNS41NDU2NCAzOC4wNjE4IDUuMzkxOSAzOC4yNjIyQzUuMDgxNDEgMzguNjY2OSA0LjYyMjg3IDM4LjkzMTcgNC4xMTcxNiAzOC45OTgzQzMuODY2NzYgMzkuMDMxMyAzLjYxMjMyIDM5LjAxNDYgMy4zNjgzNSAzOC45NDkzQzMuMTI0MzkgMzguODgzOSAyLjg5NTY5IDM4Ljc3MTEgMi42OTUzIDM4LjYxNzRDMi4yOTA2MSAzOC4zMDY5IDIuMDI1ODMgMzcuODQ4NCAxLjk1OTIyIDM3LjM0MjdDMS4yMjExMSAzMS43MDE4IDIuMTAwMTggMjUuMDk3MiA1LjQyNjggMTkuMzM1OUM4LjEyNTUxIDE0LjY2ODkgMTIuMjE1OSAxMS4xMDM5IDE3LjY0NjYgOC42NTg5NEMxNy44NzY4IDguNTU1MjMgMTguMTI1MiA4LjQ5Nzg4IDE4LjM3NzUgOC40OTAxOUMxOC42Mjk5IDguNDgyNDkgMTguODgxMyA4LjUyNDU4IDE5LjExNzQgOC42MTQwN0MxOS4zNTM1IDguNzAzNTYgMTkuNTY5NyA4LjgzODY4IDE5Ljc1MzUgOS4wMTE3M0MxOS45Mzc0IDkuMTg0NzcgMjAuMDg1NCA5LjM5MjM0IDIwLjE4OSA5LjYyMjU4SDIwLjE4NjRaTTI2LjE5MTIgNy42MDU2QzMwLjg4MTMgNy43MDA0MiAzNS41NTA5IDkuODU1OCA0MC4xODIgMTMuOTc2OUM0NC44NTQxIDE4LjEzMzkgNDcuNjY4MiAyMy43ODUgNDguNjI0MSAzMC44NDA2QzQ4LjY2MzkgMzEuMDkzNCA0OC42NTI4IDMxLjM1MTUgNDguNTkxNiAzMS41OTk5QzQ4LjUzMDMgMzEuODQ4MyA0OC40MjAxIDMyLjA4MTkgNDguMjY3NCAzMi4yODcyQzQ4LjExNDcgMzIuNDkyNCA0Ny45MjI1IDMyLjY2NTEgNDcuNzAyMiAzMi43OTUxQzQ3LjQ4MTggMzIuOTI1MSA0Ny4yMzc4IDMzLjAwOTggNDYuOTg0MyAzMy4wNDQzQzQ2LjczMDggMzMuMDc4OCA0Ni40NzI5IDMzLjA2MjMgNDYuMjI1OSAzMi45OTU4QzQ1Ljk3ODggMzIuOTI5MyA0NS43NDc1IDMyLjgxNDIgNDUuNTQ1NiAzMi42NTcyQzQ1LjM0MzYgMzIuNTAwMSA0NS4xNzUgMzIuMzA0NCA0NS4wNDk3IDMyLjA4MTNDNDQuOTI0MyAzMS44NTgzIDQ0Ljg0NDggMzEuNjEyNSA0NC44MTU3IDMxLjM1ODNDNDMuOTc3NiAyNS4xNzY3IDQxLjU4MzkgMjAuMzcxMyAzNy42MjY4IDE2Ljg0OTlDMzMuNjI4NyAxMy4yOTI2IDI5Ljc5NzIgMTEuNTI0MiAyNi4xMTQzIDExLjQ0OTlDMjUuODYxOSAxMS40NDQ5IDI1LjYxMyAxMS4zOTAxIDI1LjM4MTcgMTEuMjg4OUMyNS4xNTA0IDExLjE4NzYgMjQuOTQxNCAxMS4wNDE4IDI0Ljc2NjQgMTAuODU5N0MyNC41OTE1IDEwLjY3NzcgMjQuNDU0MiAxMC40NjMgMjQuMzYyMiAxMC4yMjc4QzI0LjI3MDMgOS45OTI2OCAyNC4yMjU2IDkuNzQxNzMgMjQuMjMwNiA5LjQ4OTMxQzI0LjIzNTcgOS4yMzY4OSAyNC4yOTA0IDguOTg3OTMgMjQuMzkxNyA4Ljc1NjY2QzI0LjQ5MjkgOC41MjUzOCAyNC42Mzg3IDguMzE2MzIgMjQuODIwOCA4LjE0MTRDMjUuMDAyOSA3Ljk2NjQ4IDI1LjIxNzYgNy44MjkxMyAyNS40NTI3IDcuNzM3MkMyNS42ODc5IDcuNjQ1MjcgMjUuOTM4OCA3LjYwMDU1IDI2LjE5MTIgNy42MDU2Wk04LjU4MTcgNy42NDE0OEM4Ljc1MDA1IDcuODMgOC44Nzk1OCA4LjA0OTg4IDguOTYyODUgOC4yODg1MkM5LjA0NjEyIDguNTI3MTYgOS4wODE1MSA4Ljc3OTg5IDkuMDY2OTkgOS4wMzIyM0M5LjA1MjQ3IDkuMjg0NTcgOC45ODgzMiA5LjUzMTU2IDguODc4MjIgOS43NTkwOEM4Ljc2ODEyIDkuOTg2NTkgOC42MTQyMyAxMC4xOTAyIDguNDI1MzYgMTAuMzU4MUM3LjczNTk1IDEwLjk2ODEgNy4wMTU3OCAxMS42OTg1IDYuMjYyMjkgMTIuNTQ2OEM1LjU1NDk0IDEzLjM0NjQgNC44MjcwOCAxNC4zODE4IDQuMDk0MSAxNS42NTU2QzMuOTY4ODEgMTUuODc2IDMuODAxMTcgMTYuMDY5NCAzLjYwMDgyIDE2LjIyNDdDMy40MDA0OCAxNi4zOCAzLjE3MTQgMTYuNDk0MiAyLjkyNjc2IDE2LjU2MDZDMi42ODIxMiAxNi42MjcgMi40MjY3NiAxNi42NDQ0IDIuMTc1MzggMTYuNjExN0MxLjkyNCAxNi41NzkgMS42ODE1NyAxNi40OTY5IDEuNDYyMDMgMTYuMzcwMkMxLjI0MjUgMTYuMjQzNCAxLjA1MDIxIDE2LjA3NDUgMC44OTYyMzEgMTUuODczMUMwLjc0MjI1IDE1LjY3MTggMC42Mjk2MiAxNS40NDE5IDAuNTY0ODI3IDE1LjE5NjlDMC41MDAwMzMgMTQuOTUxOCAwLjQ4NDM1NSAxNC42OTYzIDAuNTE4Njk2IDE0LjQ0NTJDMC41NTMwMzcgMTQuMTk0IDAuNjM2NzE4IDEzLjk1MjEgMC43NjQ5MjEgMTMuNzMzNEMxLjUxMTkxIDEyLjQwMzUgMi4zOTAyMyAxMS4xNTE3IDMuMzg2NzUgOS45OTY3NkM0LjIzNTA2IDkuMDM4MjQgNS4wNjI4NyA4LjIwMjc1IDUuODY3NjEgNy40ODUxNEM2LjA1NjA4IDcuMzE3MTggNi4yNzU3OCA3LjE4Nzk4IDYuNTE0MTggNy4xMDQ5M0M2Ljc1MjU4IDcuMDIxODkgNy4wMDUgNi45ODY2MSA3LjI1NzA0IDcuMDAxMTNDNy41MDkwNyA3LjAxNTY1IDcuNzU1NzcgNy4wNzk2NyA3Ljk4MzA2IDcuMTg5NTRDOC4yMTAzNSA3LjI5OTQxIDguNDEzNzcgNy40NTI5OCA4LjU4MTcgNy42NDE0OFpNMjUuNDU4MyAwLjAzOTk4QzMxLjA3ODYgMC4zMDM5NTYgMzUuNzg2NiAxLjg0MTY4IDM5LjYzMSA0LjgwOTVDNDAuMDM0NyA1LjEyMTE1IDQwLjI5ODEgNS41ODA0MiA0MC4zNjMzIDYuMDg2MjlDNDAuNDI4NCA2LjU5MjE1IDQwLjI4OTkgNy4xMDMxNyAzOS45NzgyIDcuNTA2OTNDMzkuNjY2NiA3LjkxMDY4IDM5LjIwNzMgOC4xNzQwOSAzOC43MDE0IDguMjM5MjJDMzguMTk1NiA4LjMwNDM0IDM3LjY4NDYgOC4xNjU4NSAzNy4yODA4IDcuODU0MkMzNC4wOSA1LjM4ODcxIDMwLjE0MzIgNC4xMDk4MyAyNS4yNzg4IDMuODgxNzNDMjAuNDAxNyAzLjY1MTA4IDE2LjQwODcgNC42MDk1OSAxMy4xOTc0IDYuMzkwNzlDMTIuMjEzMyA2LjkzNjY4IDExLjEwODcgNi42NjI0NiAxMC41NTI2IDUuNzU3NzZDMTAuNDE3IDUuNTQzNzUgMTAuMzI1NyA1LjMwNDcyIDEwLjI4NDEgNS4wNTQ4QzEwLjI0MjUgNC44MDQ4OSAxMC4yNTE1IDQuNTQ5MTcgMTAuMzEwNSA0LjMwMjc5QzEwLjM2OTYgNC4wNTY0MSAxMC40Nzc0IDMuODI0MzggMTAuNjI3NyAzLjYyMDQzQzEwLjc3OCAzLjQxNjQ4IDEwLjk2NzcgMy4yNDQ3NiAxMS4xODU2IDMuMTE1NDNDMTUuMTE5NiAwLjc5ODU5MiAxOS44NTMyIC0wLjIyMTQzNCAyNS40NjA4IDAuMDM5OThIMjUuNDU4M1oiIGZpbGw9ImN1cnJlbnRjb2xvciIvPgo8bGluZSB4MT0iNjkuMTQ3NSIgeTE9Ii0yLjE4NTU3ZS0wOCIgeDI9IjY5LjE0NzUiIHkyPSI1MCIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiLz4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzIwMTRfMTE0MSkiPgo8cGF0aCBkPSJNMTYwLjEzMiAxLjE3MTg4QzE2MC4yNCAxLjE3MTg4IDE2MC4zMjcgMS4yNTk0OSAxNjAuMzI3IDEuMzY3MTlWNDguNjMyOEMxNjAuMzI3IDQ4Ljc0MDUgMTYwLjI0IDQ4LjgyODEgMTYwLjEzMiA0OC44MjgxSDkwLjAxNDdDODkuOTA3IDQ4LjgyODEgODkuODE5NCA0OC43NDA1IDg5LjgxOTQgNDguNjMyOFYxLjM2NzE5Qzg5LjgxOTQgMS4yNTk0OSA4OS45MDcgMS4xNzE4OCA5MC4wMTQ3IDEuMTcxODhIMTYwLjEzMlpNOTguMzE1NSAzLjQxQzk3Ljk0MjQgMi43NzI3MiA5Ny4yNTAzIDIuMzQzNzUgOTYuNDYgMi4zNDM3NUM5NS42Njk3IDIuMzQzNzUgOTQuOTc3NyAyLjc3MjcyIDk0LjYwNDYgMy40MUM5NC4yMzE0IDIuNzcyNzIgOTMuNTM5NCAyLjM0Mzc1IDkyLjc0OTEgMi4zNDM3NUM5MS41NjQ0IDIuMzQzNzUgOTAuNjAwNiAzLjMwNzUzIDkwLjYwMDYgNC40OTIxOUM5MC42MDA2IDUuNjc2ODQgOTEuNTY0NCA2LjY0MDYyIDkyLjc0OTEgNi42NDA2MkM5My41Mzk0IDYuNjQwNjIgOTQuMjMxNCA2LjIxMTY2IDk0LjYwNDYgNS41NzQzOEM5NC45Nzc3IDYuMjExNjYgOTUuNjY5NyA2LjY0MDYyIDk2LjQ2IDYuNjQwNjJDOTcuMjUwMyA2LjY0MDYyIDk3Ljk0MjQgNi4yMTE2NiA5OC4zMTU1IDUuNTc0MzhDOTguNjg4NiA2LjIxMTY2IDk5LjM4MDcgNi42NDA2MiAxMDAuMTcxIDYuNjQwNjJDMTAxLjM1NiA2LjY0MDYyIDEwMi4zMTkgNS42NzY4NCAxMDIuMzE5IDQuNDkyMTlDMTAyLjMxOSAzLjMwNzUzIDEwMS4zNTYgMi4zNDM3NSAxMDAuMTcxIDIuMzQzNzVDOTkuMzgwNyAyLjM0Mzc1IDk4LjY4ODYgMi43NzI3MiA5OC4zMTU1IDMuNDFaTTE2MC4xMzIgMC4zOTA2MjVIOTAuMDE0N0M4OS40NzU2IDAuMzkwNjI1IDg5LjAzODEgMC44MjgxMjUgODkuMDM4MSAxLjM2NzE5VjQ4LjYzMjhDODkuMDM4MSA0OS4xNzE5IDg5LjQ3NTYgNDkuNjA5NCA5MC4wMTQ3IDQ5LjYwOTRIMTYwLjEzMkMxNjAuNjcxIDQ5LjYwOTQgMTYxLjEwOCA0OS4xNzE5IDE2MS4xMDggNDguNjMyOFYxLjM2NzE5QzE2MS4xMDggMC44MjgxMjUgMTYwLjY3MSAwLjM5MDYyNSAxNjAuMTMyIDAuMzkwNjI1Wk0xMDAuMTcxIDUuODU5MzhDOTkuNDE1MSA1Ljg1OTM4IDk4LjgwMzggNS4yNDgwNSA5OC44MDM4IDQuNDkyMTlDOTguODAzOCAzLjczNjMzIDk5LjQxNTEgMy4xMjUgMTAwLjE3MSAzLjEyNUMxMDAuOTI3IDMuMTI1IDEwMS41MzggMy43MzYzMyAxMDEuNTM4IDQuNDkyMTlDMTAxLjUzOCA1LjI0ODA1IDEwMC45MjcgNS44NTkzOCAxMDAuMTcxIDUuODU5MzhaTTk2LjQ2IDUuODU5MzhDOTUuNzA0MiA1Ljg1OTM4IDk1LjA5MjggNS4yNDgwNSA5NS4wOTI4IDQuNDkyMTlDOTUuMDkyOCAzLjczNjMzIDk1LjcwNDIgMy4xMjUgOTYuNDYgMy4xMjVDOTcuMjE1OSAzLjEyNSA5Ny44MjcyIDMuNzM2MzMgOTcuODI3MiA0LjQ5MjE5Qzk3LjgyNzIgNS4yNDgwNSA5Ny4yMTU5IDUuODU5MzggOTYuNDYgNS44NTkzOFpNOTIuNzQ5MSA1Ljg1OTM4QzkxLjk5MzIgNS44NTkzOCA5MS4zODE5IDUuMjQ4MDUgOTEuMzgxOSA0LjQ5MjE5QzkxLjM4MTkgMy43MzYzMyA5MS45OTMyIDMuMTI1IDkyLjc0OTEgMy4xMjVDOTMuNTA0OSAzLjEyNSA5NC4xMTYzIDMuNzM2MzMgOTQuMTE2MyA0LjQ5MjE5Qzk0LjExNjMgNS4yNDgwNSA5My41MDQ5IDUuODU5MzggOTIuNzQ5MSA1Ljg1OTM4WiIgZmlsbD0iY3VycmVudGNvbG9yIi8+CjxwYXRoIGQ9Ik0xNjAuMTMyIDAuMzkwNjI1SDkwLjAxNDdDODkuNDc1NiAwLjM5MDYyNSA4OS4wMzgxIDAuODI4MTIzIDg5LjAzODEgMS4zNjcxOVY4LjM5ODQ0SDE2MS4xMDhWMS4zNjcxOUMxNjEuMTA4IDAuODI4MTIzIDE2MC42NzEgMC4zOTA2MjUgMTYwLjEzMiAwLjM5MDYyNVpNOTIuNzQ5MSA1Ljg1OTM4QzkxLjk5MzIgNS44NTkzOCA5MS4zODE5IDUuMjQ4MDUgOTEuMzgxOSA0LjQ5MjE5QzkxLjM4MTkgMy43MzYzMyA5MS45OTMyIDMuMTI1IDkyLjc0OTEgMy4xMjVDOTMuNTA0OSAzLjEyNSA5NC4xMTYzIDMuNzM2MzMgOTQuMTE2MyA0LjQ5MjE5Qzk0LjExNjMgNS4yNDgwNSA5My41MDQ5IDUuODU5MzggOTIuNzQ5MSA1Ljg1OTM4Wk05Ni40NiA1Ljg1OTM4Qzk1LjcwNDIgNS44NTkzOCA5NS4wOTI4IDUuMjQ4MDUgOTUuMDkyOCA0LjQ5MjE5Qzk1LjA5MjggMy43MzYzMyA5NS43MDQyIDMuMTI1IDk2LjQ2IDMuMTI1Qzk3LjIxNTkgMy4xMjUgOTcuODI3MiAzLjczNjMzIDk3LjgyNzIgNC40OTIxOUM5Ny44MjcyIDUuMjQ4MDUgOTcuMjE1OSA1Ljg1OTM4IDk2LjQ2IDUuODU5MzhaTTEwMC4xNzEgNS44NTkzOEM5OS40MTUxIDUuODU5MzggOTguODAzOCA1LjI0ODA1IDk4LjgwMzggNC40OTIxOUM5OC44MDM4IDMuNzM2MzMgOTkuNDE1MSAzLjEyNSAxMDAuMTcxIDMuMTI1QzEwMC45MjcgMy4xMjUgMTAxLjUzOCAzLjczNjMzIDEwMS41MzggNC40OTIxOUMxMDEuNTM4IDUuMjQ4MDUgMTAwLjkyNyA1Ljg1OTM4IDEwMC4xNzEgNS44NTkzOFoiIGZpbGw9ImN1cnJlbnRjb2xvciIvPgo8cGF0aCBkPSJNMTAzLjM3NSAyNC43Nzg4VjI4Ljk0MTMiIHN0cm9rZT0iY3VycmVudGNvbG9yIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik05OC45NTAzIDI4LjEwODlMMTAzLjM4NCAyOC44OTA3IiBzdHJva2U9ImN1cnJlbnRjb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTA3Ljc5OSAyOC4xMDg5TDEwMy4zNjUgMjguODkwNyIgc3Ryb2tlPSJjdXJyZW50Y29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHBhdGggZD0iTTEwMC41OTYgMzMuMjI3N0wxMDMuMzc4IDI4Ljk0MzYiIHN0cm9rZT0iY3VycmVudGNvbG9yIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik0xMDYuMDc3IDMzLjI3NDlMMTAzLjQ0NyAyOC44OTY0IiBzdHJva2U9ImN1cnJlbnRjb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTE3LjM4OCAyNC43Nzg4VjI4Ljk0MTMiIHN0cm9rZT0iY3VycmVudGNvbG9yIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik0xMTIuOTY0IDI4LjEwODlMMTE3LjM5OCAyOC44OTA3IiBzdHJva2U9ImN1cnJlbnRjb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTIxLjgxMyAyOC4xMDg5TDExNy4zNzkgMjguODkwNyIgc3Ryb2tlPSJjdXJyZW50Y29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHBhdGggZD0iTTExNC42MSAzMy4yMjc3TDExNy4zOTIgMjguOTQzNiIgc3Ryb2tlPSJjdXJyZW50Y29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHBhdGggZD0iTTEyMC4wOTEgMzMuMjc0OUwxMTcuNDYgMjguODk2NCIgc3Ryb2tlPSJjdXJyZW50Y29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHBhdGggZD0iTTEzMS40MDIgMjQuNzc4OFYyOC45NDEzIiBzdHJva2U9ImN1cnJlbnRjb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTI2Ljk3OCAyOC4xMDg5TDEzMS40MTEgMjguODkwNyIgc3Ryb2tlPSJjdXJyZW50Y29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHBhdGggZD0iTTEzNS44MjYgMjguMTA4OUwxMzEuMzkyIDI4Ljg5MDciIHN0cm9rZT0iY3VycmVudGNvbG9yIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik0xMjguNjIzIDMzLjIyNzdMMTMxLjQwNSAyOC45NDM2IiBzdHJva2U9ImN1cnJlbnRjb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTM0LjEwNSAzMy4yNzQ5TDEzMS40NzQgMjguODk2NCIgc3Ryb2tlPSJjdXJyZW50Y29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHBhdGggZD0iTTE0MC45OTEgMzMuMjc0OUgxNTEuMTQ4IiBzdHJva2U9ImN1cnJlbnRjb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzIwMTRfMTE0MSI+CjxyZWN0IHdpZHRoPSI3Mi44NTE2IiBoZWlnaHQ9IjUwIiBmaWxsPSJ3aGl0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoODguNjQ3NSkiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K";
var emailFailed = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA2MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMyLjI5OTMgMzcuNjI3OEg2LjY0NDZWMTAuNzUwOEwyOS4yMjMgMjQuMTg5M0w1MS44MDE0IDEwLjc1MDhWMjQuNDMxMkM1My44MzM0IDI0Ljc1MzcgNTUuNzI0NCAyNS40MjU3IDU3LjQ0NiAyNi4zNjY0VjUuMzc1NEM1Ny40NDYgMi40MTg5MyA1NC45MDU5IDAgNTEuODAxNCAwSDYuNjQ0NkMzLjU0MDA3IDAgMSAyLjQxODkzIDEgNS4zNzU0VjM3LjYyNzhDMSA0MC41ODQzIDMuNTQwMDcgNDMuMDAzMiA2LjY0NDYgNDMuMDAzMkgzMi4yOTkzQzMyLjE1ODIgNDIuMTE2MyAzMi4wNDUzIDQxLjIyOTQgMzIuMDQ1MyA0MC4zMTU1QzMyLjA0NTMgMzkuNDAxNyAzMi4xNTgyIDM4LjUxNDggMzIuMjk5MyAzNy42Mjc4Wk01MS44MDE0IDUuMzc1NEwyOS4yMjMgMTguODEzOUw2LjY0NDYgNS4zNzU0SDUxLjgwMTRaTTUyLjk1ODUgNDAuMzE1NUw1OC45NyA0Ni4wMTM1TDU0Ljk2MjMgNDkuODNMNDguOTc5MSA0NC4xMDUyTDQyLjk5NTggNDkuODNMMzkuMDE2NCA0Ni4wMTM1TDQ0Ljk5OTYgNDAuMzE1NUwzOS4wMTY0IDM0LjYxNzZMNDIuOTk1OCAzMC44Mjc5TDQ4Ljk3OTEgMzYuNTI1OUw1NC45NjIzIDMwLjgyNzlMNTguOTcgMzQuNjE3Nkw1Mi45NTg1IDQwLjMxNTVaIiBmaWxsPSIjRkYwMDAwIi8+Cjwvc3ZnPgo=";
var emailSuccess = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNTQiIHZpZXdCb3g9IjAgMCA2MCA1NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzUzMF8xNDQzKSI+CjxwYXRoIGQ9Ik01MS43MTkxIDQuMDY3NzVINy41NTQ0NkM0LjUxODE0IDQuMDY3NzUgMi4wNjE0OCA2LjU1OTI3IDIuMDYxNDggOS42MDQ0N0wyLjAzMzg3IDQyLjgyNDhDMi4wMzM4NyA0NS44NyA0LjUxODE0IDQ4LjM2MTUgNy41NTQ0NiA0OC4zNjE1SDI5LjYzNjhWNDIuODI0OEg3LjU1NDQ2VjE1LjE0MTJMMjkuNjM2OCAyOC45ODNMNTEuNzE5MSAxNS4xNDEyVjI4Ljk4M0g1Ny4yMzk3VjkuNjA0NDdDNTcuMjM5NyA2LjU1OTI3IDU0Ljc1NTQgNC4wNjc3NSA1MS43MTkxIDQuMDY3NzVaTTI5LjYzNjggMjMuNDQ2M0w3LjU1NDQ2IDkuNjA0NDdINTEuNzE5MUwyOS42MzY4IDIzLjQ0NjNaTTQ0LjM3NjcgNTMuODk4M0wzNC42MDUzIDQ0LjA5ODNMMzguNDk3MyA0MC4xOTQ5TDQ0LjM0OTEgNDYuMDYzOEw1Ni4wNTI4IDM0LjMyNTlMNjAgMzguMjI5M0w0NC4zNzY3IDUzLjg5ODNaIiBmaWxsPSIjMDRENzhCIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfNTMwXzE0NDMiPgo8cmVjdCB3aWR0aD0iNjAiIGhlaWdodD0iNTMuODk4MyIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K";
var email = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDQiIGhlaWdodD0iMzgiIHZpZXdCb3g9IjAgMCA0NCAzOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTM5Ljg0MjUgMTAuNjc0NEwyMy4wNDMyIDIuMjQ3NzNDMjIuNzE4MSAyLjA4NDc2IDIyLjM2MDUgMiAyMS45OTgxIDJDMjEuNjM1NiAyIDIxLjI3OCAyLjA4NDc2IDIwLjk1MyAyLjI0NzczTDQuMTUzNjQgMTAuNjc0NEMzLjUwOTYxIDEwLjk5NTEgMi45NjY2NCAxMS40OTI1IDIuNTg2MDggMTIuMTEwMkMyLjIwNTUxIDEyLjcyOCAyLjAwMjUxIDEzLjQ0MTcgMiAxNC4xNzA2VjMyLjIwOTJDMiAzNC4zNjc2IDMuNzQ0MDYgMzYuMTE3NiA1Ljg5NTc4IDM2LjExNzZIMzguMTA0MkM0MC4yNTU5IDM2LjExNzYgNDIgMzQuMzY3NiA0MiAzMi4yMDkyVjE0LjE3MDZDNDEuOTk3MSAxMy40NDEzIDQxLjc5MzYgMTIuNzI3MyA0MS40MTIzIDEyLjEwOTVDNDEuMDMxIDExLjQ5MTcgNDAuNDg3MyAxMC45OTQ2IDM5Ljg0MjUgMTAuNjc0NFYxMC42NzQ0WiIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0zNC45NDEgMzAuMjM1NEwyMi43OTY1IDIwLjE1NDFDMjIuNDAwNyAxOS44MjU2IDIxLjkxMzUgMTkuNjQ3MiAyMS40MTIxIDE5LjY0NzJDMjAuOTEwNiAxOS42NDcyIDIwLjQyMzUgMTkuODI1NiAyMC4wMjc3IDIwLjE1NDFMNy44ODIyIDMwLjIzNTQiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMjYuNzA1NyAyMy4xNzY2TDM5LjY0NjkgMTIuNTg4MyIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0zLjE3NjM5IDEyLjU4ODNMMTYuMTE3NiAyMy4xNzY2IiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==";
var fingerprintFailed = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjkiIGhlaWdodD0iNTEiIHZpZXdCb3g9IjAgMCAyOSA1MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEuMDYwNDUgMTIuMjIyMkMwLjg3MzA1MyAxMi4yMjM2IDAuNjg4NTQ0IDEyLjE4MjMgMC41MjU2NiAxMi4xMDIzQzAuNDA2MTg5IDEyLjA0NDMgMC4zMDEzMSAxMS45NjY0IDAuMjE3MTYgMTEuODczQzAuMTMzMDEgMTEuNzc5NiAwLjA3MTI3OTggMTEuNjcyNyAwLjAzNTU4MDUgMTEuNTU4NUMtMC4wMDAxMTg4NCAxMS40NDQzIC0wLjAwOTA3MDE0IDExLjMyNTEgMC4wMDkyNTA0MiAxMS4yMDc5QzAuMDI3NTcxIDExLjA5MDcgMC4wNzI3OTU1IDEwLjk3NzggMC4xNDIyNzggMTAuODc1OEMxLjQ4MTM0IDguOTQ2ODggNS41NTU0NyA0LjQ0NDU4IDE0LjQ0NTUgNC40NDQ1OEMxOC4yOTgxIDQuNDQ0NTggMjEuNjc3IDUuMzE3OTUgMjQuNDgzNiA3LjAzOTVDMjYuNzkzNiA4LjQ1MjM1IDI4LjA4ODIgMTAuMDUxNiAyOC43MDUgMTAuODIxOUMyOC43ODMyIDEwLjkxOSAyOC44MzgxIDExLjAyODYgMjguODY2NSAxMS4xNDQzQzI4Ljg5NDkgMTEuMjYgMjguODk2MiAxMS4zNzk0IDI4Ljg3MDMgMTEuNDk1NUMyOC44NDQ0IDExLjYxMTYgMjguNzkxOSAxMS43MjIxIDI4LjcxNTggMTEuODIwNUMyOC42Mzk3IDExLjkxODggMjguNTQxNSAxMi4wMDMgMjguNDI3MiAxMi4wNjgxQzI4LjE5MzQgMTIuMjAxNSAyNy45MDg2IDEyLjI1MSAyNy42MzMyIDEyLjIwNjNDMjcuMzU3OSAxMi4xNjE1IDI3LjExMzUgMTIuMDI1OSAyNi45NTIgMTEuODI4M0MyNS44MzU4IDEwLjQ0MzEgMjIuNDMyNiA2LjIyNzg4IDE0LjQ0NTUgNi4yMjc4OEM2LjY0OTM2IDYuMjI3ODggMy4xMjQ2IDEwLjEwNjggMS45NzY1NCAxMS43NzAyQzEuODg0MyAxMS45MDkxIDEuNzUwNzUgMTIuMDI0MiAxLjU4OTcgMTIuMTAzN0MxLjQyODY1IDEyLjE4MzEgMS4yNDU5NCAxMi4yMjQgMS4wNjA0NSAxMi4yMjIyWiIgZmlsbD0iI0ZGMDAwMCIvPgo8cGF0aCBkPSJNMTguODA3OCAzMy4zMzMxQzE4LjcxOTQgMzMuMzM0MiAxOC42MzExIDMzLjMyNDIgMTguNTQ1MiAzMy4zMDMzQzEyLjExMTIgMzEuNzA1NiA5LjcwODgzIDI1LjI1NzggOS42MTExMyAyNC45ODk3TDkuNTk1ODggMjQuOTMwN0M5LjU0MzIyIDI0Ljc0NDUgOC4yNTIyNyAyMC4zMjMxIDEwLjIzNDEgMTcuNzMzNEMxMS4xNDI1IDE2LjU1MjUgMTIuNTI0MiAxNS45NDY4IDE0LjM0ODcgMTUuOTQ2OEMxNi4wNDUxIDE1Ljk0NjggMTcuMjY4OCAxNi40NzU0IDE4LjExIDE3LjU2OTVDMTguODAyOSAxOC40NjI4IDE5LjA4MDEgMTkuNTY0NSAxOS4zNDgzIDIwLjYyNTlDMTkuOTExNiAyMi44MzYzIDIwLjMxODQgMjMuOTk3MSAyMi42NTk4IDI0LjExNjVDMjMuNjg4MiAyNC4xNjg2IDI0LjM2MzggMjMuNTY1NyAyNC43NDcgMjMuMDUyM0MyNS43ODI5IDIxLjY1MjYgMjUuOTYzMSAxOS4zNzA3IDI1LjE4MjEgMTcuMzU2MkMyNC4xNzg4IDE0Ljc1NjEgMjAuNjE3OCA5Ljg1NDAxIDE0LjMzOSA5Ljg1NDAxQzExLjY1ODggOS44NTQwMSA5LjE5NjA2IDEwLjcxNzUgNy4yMjExOCAxMi4zNDAyQzUuNTg2NTQgMTMuNjg0MyA0LjI5MTQ0IDE1LjU4MjEgMy42Njc4IDE3LjUzMjdDMi41MTEyOSAyMS4xNjQzIDQuMDI4MTMgMjYuODcyOSA0LjA0MjY4IDI2LjkyNUM0LjA3ODEgMjcuMDU3OSA0LjA4NjYyIDI3LjE5NjUgNC4wNjc3NCAyNy4zMzI3QzQuMDQ4ODcgMjcuNDY4OSA0LjAwMjk3IDI3LjYgMy45MzI3NyAyNy43MTgxQzMuODYyNTcgMjcuODM2MyAzLjc2OTQ4IDI3LjkzOTEgMy42NTkgMjguMDIwNkMzLjU0ODUxIDI4LjEwMjIgMy40MjI4NiAyOC4xNjA3IDMuMjg5NDUgMjguMTkyN0MzLjAxOTk1IDI4LjI2NDYgMi43MzMwOSAyOC4yMjc3IDIuNDkwMzUgMjguMDkwMUMyLjI0NzYyIDI3Ljk1MjUgMi4wNjgzMiAyNy43MjUgMS45OTA4OSAyNy40NTY0QzEuOTIxNiAyNy4xOTU5IDAuMzAxNTA3IDIxLjEwNzMgMS42Mzc0OSAxNi45MTAzQzMuMDkyNjYgMTIuMzYyNCA3LjU4MzU5IDcuNzc3NzEgMTQuMzQxMSA3Ljc3NzcxQzE3LjQ2NDIgNy43Nzc3MSAyMC40MTQ3IDguODQxOTEgMjIuODc3NCAxMC44NTE1QzI0Ljc4NDQgMTIuNDE0NSAyNi4zNDIxIDE0LjUxMzcgMjcuMTU3IDE2LjYxMjJDMjguMTkyOSAxOS4yOTE1IDI3LjkxNTEgMjIuMjk4NiAyNi40NTA5IDI0LjI2MzFDMjUuNDc1MiAyNS41NzMyIDI0LjA4NTkgMjYuMjU4MSAyMi41NDY5IDI2LjE4MzhDMTguNTM3NiAyNS45ODI0IDE3LjgxNjkgMjMuMTc2NyAxNy4yOTE2IDIxLjEzMDJDMTYuNzUxMiAxOS4wMzEgMTYuNDA1NCAxOC4wMTg5IDE0LjM0MTEgMTguMDE4OUMxMy4yMDc1IDE4LjAxODkgMTIuNDExMyAxOC4zMzE1IDExLjkxNTggMTguOTc4OUMxMS4yNDAyIDE5Ljg2NDYgMTEuMTg3NiAyMS4yNDkgMTEuMjYyNCAyMi4yNTM1QzExLjMxMTUgMjIuOTUzMyAxMS40Mjk5IDIzLjY0NjUgMTEuNjE1OCAyNC4zMjI4QzExLjc4MDcgMjQuNzM5NiAxMy45MjgxIDMwLjAxOSAxOS4wNzExIDMxLjI5NjRDMTkuMjA0IDMxLjMyOCAxOS4zMjk0IDMxLjM4NTcgMTkuNDM5OSAzMS40NjYzQzE5LjU1MDQgMzEuNTQ2OCAxOS42NDM4IDMxLjY0ODYgMTkuNzE0NyAzMS43NjU2QzE5Ljc4NTYgMzEuODgyNyAxOS44MzI2IDMyLjAxMjcgMTkuODUzIDMyLjE0ODFDMTkuODczNCAzMi4yODM1IDE5Ljg2NjcgMzIuNDIxNiAxOS44MzMzIDMyLjU1NDRDMTkuNzcwNiAzMi43Nzg2IDE5LjYzNjQgMzIuOTc2MSAxOS40NTEyIDMzLjExNjdDMTkuMjY2MSAzMy4yNTczIDE5LjA0MDEgMzMuMzMzMyAxOC44MDc4IDMzLjMzMzFaIiBmaWxsPSIjRkYwMDAwIi8+CjxwYXRoIGQ9Ik0xMC4wMTg5IDMyLjIyMjJDOS44NzExIDMyLjIyMjUgOS43MjQ3NiAzMi4xOTUyIDkuNTg4NiAzMi4xNDE5QzkuNDUyNDQgMzIuMDg4NiA5LjMyOTI1IDMyLjAxMDQgOS4yMjYzNyAzMS45MTJDNi41ODc0NiAyOS4zNDI4IDUuMDk0NzMgMjYuNDY5OSA0LjUzMyAyMi44Nzc3VjIyLjg1ODZDNC4yMTc3IDIwLjQ4MDUgNC42NzkyOSAxNy4xMTM2IDYuOTQxMTEgMTQuNzk4N0M4LjYxMDY3IDEzLjA5MDUgMTAuOTU3NyAxMi4yMjIzIDEzLjkwNDggMTIuMjIyM0MxNy4zOTAyIDEyLjIyMjMgMjAuMTI5MyAxMy43MjU2IDIxLjgzNzIgMTYuNTYyOUMyMy4wNzY0IDE4LjYyNDEgMjMuMzIyMSAyMC42NzgxIDIzLjMyODUgMjAuNzYyNUMyMy4zNDE1IDIwLjg5MjUgMjMuMzI2NyAyMS4wMjM2IDIzLjI4NSAyMS4xNDgzQzIzLjI0MzMgMjEuMjczIDIzLjE3NTUgMjEuMzg4OCAyMy4wODU0IDIxLjQ4OTJDMjIuOTk1NCAyMS41ODk1IDIyLjg4NDkgMjEuNjcyNCAyMi43NjAyIDIxLjczMzFDMjIuNjM1NiAyMS43OTM4IDIyLjQ5OTMgMjEuODMxMSAyMi4zNTkxIDIxLjg0MjhDMjIuMDc2MyAyMS44NzEzIDIxLjc5MjcgMjEuNzk1NCAyMS41Njk2IDIxLjYzMTZDMjEuMzQ2NiAyMS40Njc4IDIxLjIwMTkgMjEuMjI5MiAyMS4xNjY4IDIwLjk2NzNDMjAuOTc5NyAxOS43MzQ5IDIwLjU0OTggMTguNTQ0OSAxOS44OTg1IDE3LjQ1NjhDMTguNTc0OCAxNS4yOTAxIDE2LjU2MDggMTQuMTg4NyAxMy44OTcgMTQuMTg4N0MxMS41OTYxIDE0LjE4ODcgOS43OTU5MSAxNC44MzEgOC41NTc0MSAxNi4wOTkxQzYuNzcyMSAxNy45MjcyIDYuNDI2OTYgMjAuNzQzMyA2LjY3MTk3IDIyLjYwNjNDNy4xNjQxIDI1Ljc4MjkgOC40OCAyOC4zMDk5IDEwLjgwMzYgMzAuNTY4MUMxMC45MDA2IDMwLjY2MTcgMTAuOTc2MyAzMC43NzI0IDExLjAyNjIgMzAuODkzN0MxMS4wNzYyIDMxLjAxNDkgMTEuMDk5MyAzMS4xNDQzIDExLjA5NDMgMzEuMjc0QzExLjA4OTIgMzEuNDAzOCAxMS4wNTYxIDMxLjUzMTIgMTAuOTk2OSAzMS42NDg4QzEwLjkzNzcgMzEuNzY2NSAxMC44NTM2IDMxLjg3MTkgMTAuNzQ5NiAzMS45NTg3QzEwLjU0OTQgMzIuMTI3MSAxMC4yODkyIDMyLjIyMDkgMTAuMDE4OSAzMi4yMjIyWiIgZmlsbD0iI0ZGMDAwMCIvPgo8cGF0aCBkPSJNMjIuOTg3MyAyOS45OTk5QzIwLjYwODcgMjkuOTk5OSAxOC41ODY1IDI5LjM1NjUgMTYuOTY4MyAyOC4wNzc1QzEzLjcxNzMgMjUuNTE4OSAxMy4zNTI4IDIxLjM1MTggMTMuMzM2NyAyMS4xNzU5QzEzLjMxMzggMjAuODg3MyAxMy40MDkyIDIwLjYwMTUgMTMuNjAyIDIwLjM4MTZDMTMuNzk0OCAyMC4xNjE2IDE0LjA2OTEgMjAuMDI1NSAxNC4zNjQ2IDIwLjAwMzFDMTQuNjYwMiAxOS45ODA4IDE0Ljk1MjcgMjAuMDc0IDE1LjE3NzkgMjAuMjYyM0MxNS40MDMgMjAuNDUwNiAxNS41NDI0IDIwLjcxODUgMTUuNTY1MyAyMS4wMDcyQzE1LjU3MzQgMjEuMDY4NyAxNS44OTgzIDI0LjQ3NzMgMTguNDA0MyAyNi40NDA0QzE5Ljg4NzEgMjcuNTk3MSAyMS44NjkgMjguMDU2MSAyNC4zMTEzIDI3Ljc4OEMyNC42MDMyIDI3Ljc1MzQgMjQuODk3MiAyNy44MzMxIDI1LjEyOTEgMjguMDA5NkMyNS4zNjExIDI4LjE4NjIgMjUuNTEyIDI4LjQ0NTMgMjUuNTQ4OSAyOC43MzAyQzI1LjU2NDkgMjguODcxIDI1LjU1MiAyOS4wMTM0IDI1LjUxMSAyOS4xNDkzQzI1LjQ3MDEgMjkuMjg1MSAyNS40MDE4IDI5LjQxMTYgMjUuMzEwMiAyOS41MjE0QzI1LjIxODcgMjkuNjMxMiAyNS4xMDU2IDI5LjcyMjEgMjQuOTc3NyAyOS43ODg4QzI0Ljg0OTggMjkuODU1NSAyNC43MDk2IDI5Ljg5NjYgMjQuNTY1MyAyOS45MDk4QzI0LjA0MTUgMjkuOTY5NSAyMy41MTQ2IDI5Ljk5OTUgMjIuOTg3MyAyOS45OTk5WiIgZmlsbD0iI0ZGMDAwMCIvPgo8cGF0aCBkPSJNMjQuOTA0NyAyLjM2OTU2QzI0LjAxOTYgMS43NzMzOCAyMC44ODExIDAgMTQuOTc5OCAwQzguNzg1MzcgMCA1LjYzOTI3IDEuOTU5MSA0Ljk0MzMyIDIuNDU3QzQuODk3MzUgMi40ODYyMSA0Ljg1NDMzIDIuNTIwMSA0LjgxNDg4IDIuNTU4MTdDNC44MTA3MiAyLjU2MjM0IDQuODA1MjkgMi41NjQ4OSA0Ljc5OTUyIDIuNTY1NEM0LjY4ODM5IDIuNjY1ODUgNC41OTkyMSAyLjc4OTY3IDQuNTM3OTQgMi45Mjg2MUM0LjQ3NjY4IDMuMDY3NTUgNC40NDQ3MiAzLjIxODQyIDQuNDQ0MjEgMy4zNzExNUM0LjQ0NjEyIDMuNTE0MzIgNC40NzUzIDMuNjU1NjkgNC41MzAwOCAzLjc4NzE3QzQuNTg0ODYgMy45MTg2NCA0LjY2NDE2IDQuMDM3NjMgNC43NjM0NCA0LjEzNzMyQzQuODYyNzIgNC4yMzcwMSA0Ljk4MDAzIDQuMzE1NDQgNS4xMDg2NCA0LjM2ODEyQzUuMjM3MjUgNC40MjA3OSA1LjM3NDY0IDQuNDQ2NjcgNS41MTI5MyA0LjQ0NDI4QzUuNzM0NTggNC40NDQxMyA1Ljk1MDg4IDQuMzczNzcgNi4xMzI3OSA0LjI0MjY2QzYuMTYyODEgNC4yMTk1NCA4Ljg3MDUzIDIuMTU5OTkgMTQuOTgxOSAyLjE1OTk5QzIxLjA5MzQgMi4xNTk5OSAyMy44MTU3IDQuMjEyMzEgMjMuODQ1MSA0LjIyNzQ5QzI0LjAzMDkgNC4zNzAxNiAyNC4yNTY2IDQuNDQ2MjcgMjQuNDg4IDQuNDQ0MjhDMjQuNjI2NCA0LjQ0NjQ4IDI0Ljc2MzggNC40MjAzNiAyNC44OTI1IDQuMzY3NDJDMjUuMDIxMSA0LjMxNDQ4IDI1LjEzODMgNC4yMzU3NiAyNS4yMzc1IDQuMTM1NzhDMjUuMzM2NyA0LjAzNTgxIDI1LjQxNTggMy45MTY1NCAyNS40NzAzIDMuNzg0ODNDMjUuNTI0OSAzLjY1MzExIDI1LjU1MzcgMy41MTE1NSAyNS41NTUzIDMuMzY4MjZDMjUuNTU1MyAzLjE1MzYyIDI1LjQ5MzQgMi45NDM4NyAyNS4zNzc1IDIuNzY1OTJDMjUuMjYxNiAyLjU4Nzk3IDI1LjA5NjkgMi40NDk5NCAyNC45MDQ3IDIuMzY5NTZaIiBmaWxsPSIjRkYwMDAwIi8+CjxwYXRoIGQ9Ik0yMi4yMjIxIDQzLjMzMzRDMjIuMjIyMSAzOS42NTI5IDE5LjIzNiAzNi42NjY3IDE1LjU1NTQgMzYuNjY2N0MxMS44NzQ5IDM2LjY2NjcgOC44ODg3OSAzOS42NTI5IDguODg4NzkgNDMuMzMzNEM4Ljg4ODc5IDQ3LjAxMzkgMTEuODc0OSA1MCAxNS41NTU0IDUwQzE5LjIzNiA1MCAyMi4yMjIxIDQ3LjAxMzkgMjIuMjIyMSA0My4zMzM0WiIgc3Ryb2tlPSIjRkYwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPgo8cGF0aCBkPSJNMTcuNzc3OCA0NS41NTU2TDEzLjMzMzQgNDEuMTExMiIgc3Ryb2tlPSIjRkYwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTMuMzMzNCA0NS41NTU2TDE3Ljc3NzggNDEuMTExMiIgc3Ryb2tlPSIjRkYwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K";
var fingerprintSuccess = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDQiIGhlaWdodD0iNzgiIHZpZXdCb3g9IjAgMCA0NCA3OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEuNjE1MTUgMTguNjE1MkMxLjMyOTczIDE4LjYxNzQgMS4wNDg3MSAxOC41NTQ0IDAuODAwNjIzIDE4LjQzMjZDMC42MTg2NTggMTguMzQ0MyAwLjQ1ODkxOSAxOC4yMjU2IDAuMzMwNzUyIDE4LjA4MzRDMC4yMDI1ODYgMTcuOTQxMiAwLjEwODU2NSAxNy43NzgzIDAuMDU0MTkyIDE3LjYwNDRDLTAuMDAwMTgxMDAyIDE3LjQzMDUgLTAuMDEzODE0NiAxNy4yNDg5IDAuMDE0MDg5MSAxNy4wNzA0QzAuMDQxOTkyOCAxNi44OTE4IDAuMTEwODc0IDE2LjcxOTkgMC4yMTY3MDEgMTYuNTY0NkMyLjI1NjIgMTMuNjI2NyA4LjQ2MTQzIDYuNzY5MjkgMjIuMDAxNyA2Ljc2OTI5QzI3Ljg2OTUgNi43NjkyOSAzMy4wMTU4IDguMDk5NDkgMzcuMjkwNSAxMC43MjE2QzQwLjgwODggMTIuODczNCA0Mi43ODA2IDE1LjMwOTMgNDMuNzIgMTYuNDgyNEM0My44MzkxIDE2LjYzMDMgNDMuOTIyOCAxNi43OTczIDQzLjk2NiAxNi45NzM1QzQ0LjAwOTMgMTcuMTQ5NyA0NC4wMTEyIDE3LjMzMTYgNDMuOTcxOCAxNy41MDg0QzQzLjkzMjQgMTcuNjg1MyA0My44NTI0IDE3Ljg1MzYgNDMuNzM2NCAxOC4wMDMzQzQzLjYyMDUgMTguMTUzMSA0My40NzExIDE4LjI4MTQgNDMuMjk2OSAxOC4zODA1QzQyLjk0MDggMTguNTgzNyA0Mi41MDcxIDE4LjY1OTEgNDIuMDg3NyAxOC41OTFDNDEuNjY4MiAxOC41MjI4IDQxLjI5NjEgMTguMzE2MyA0MS4wNSAxOC4wMTUzQzM5LjM1MDEgMTUuOTA1NCAzNC4xNjY3IDkuNDg1MzkgMjIuMDAxNyA5LjQ4NTM5QzEwLjEyNzUgOS40ODUzOSA0Ljc1OTAzIDE1LjM5MzMgMy4wMTA0MyAxNy45MjY4QzIuODY5OTMgMTguMTM4MyAyLjY2NjUzIDE4LjMxMzcgMi40MjEyNCAxOC40MzQ3QzIuMTc1OTUgMTguNTU1NyAxLjg5NzY3IDE4LjYxOCAxLjYxNTE1IDE4LjYxNTJaIiBmaWxsPSIjMDRENzhCIi8+CjxwYXRoIGQ9Ik0yOC42NDU4IDUwLjc2OUMyOC41MTExIDUwLjc3MDYgMjguMzc2OCA1MC43NTU0IDI4LjI0NTkgNTAuNzIzNUMxOC40NDY1IDQ4LjI5MDEgMTQuNzg3NCAzOC40Njk3IDE0LjYzODYgMzguMDYxM0wxNC42MTU0IDM3Ljk3MTRDMTQuNTM1MSAzNy42ODc5IDEyLjU2ODkgMzAuOTUzNiAxNS41ODc0IDI3LjAwOTRDMTYuOTcxIDI1LjIxMDggMTkuMDc1NSAyNC4yODgyIDIxLjg1NDMgMjQuMjg4MkMyNC40MzggMjQuMjg4MiAyNi4zMDE4IDI1LjA5MzQgMjcuNTgzMSAyNi43NTk3QzI4LjYzODUgMjguMTIwMyAyOS4wNjA2IDI5Ljc5ODMgMjkuNDY5MSAzMS40MTQ5QzMwLjMyNzEgMzQuNzgxNSAzMC45NDY2IDM2LjU0OTQgMzQuNTEyOCAzNi43MzE0QzM2LjA3OSAzNi44MTA4IDM3LjEwOCAzNS44OTI0IDM3LjY5MTcgMzUuMTEwNkMzOS4yNjk1IDMyLjk3ODcgMzkuNTQzOSAyOS41MDMxIDM4LjM1NDUgMjYuNDM0OUMzNi44MjYzIDIyLjQ3NDggMzEuNDAyNiAxNS4wMDg0IDIxLjgzOTYgMTUuMDA4NEMxNy43NTczIDE1LjAwODQgMTQuMDA2NCAxNi4zMjM1IDEwLjk5ODUgMTguNzk1QzguNTA4ODEgMjAuODQyMyA2LjUzNjI3IDIzLjczMjggNS41ODY0MSAyNi43MDM2QzMuODI0OTQgMzIuMjM0OSA2LjEzNTIxIDQwLjkyOTYgNi4xNTczOCA0MS4wMDg5QzYuMjExMzIgNDEuMjExMyA2LjIyNDMgNDEuNDIyNCA2LjE5NTU1IDQxLjYyOTlDNi4xNjY4IDQxLjgzNzQgNi4wOTY5IDQyLjAzNyA1Ljk4OTk4IDQyLjIxNjlDNS44ODMwNiA0Mi4zOTY5IDUuNzQxMjggNDIuNTUzNSA1LjU3MyA0Mi42Nzc3QzUuNDA0NzIgNDIuODAxOCA1LjIxMzM0IDQyLjg5MSA1LjAxMDE2IDQyLjkzOThDNC41OTk2NyA0My4wNDkyIDQuMTYyNzYgNDIuOTkzMSAzLjc5MzA2IDQyLjc4MzVDMy40MjMzNSA0Mi41NzM4IDMuMTUwMjcgNDIuMjI3NCAzLjAzMjM0IDQxLjgxODNDMi45MjY4IDQxLjQyMTYgMC40NTkyNyAzMi4xNDgxIDIuNDk0MDggMjUuNzU1N0M0LjcxMDQyIDE4LjgyODkgMTEuNTUwNSAxMS44NDYxIDIxLjg0MjcgMTEuODQ2MUMyNi41OTk0IDExLjg0NjEgMzEuMDkzMyAxMy40NjY5IDM0Ljg0NDIgMTYuNTI3N0MzNy43NDg3IDE4LjkwODMgNDAuMTIxMiAyMi4xMDU1IDQxLjM2MjQgMjUuMzAxOEM0Mi45NDAyIDI5LjM4MjUgNDIuNTE3IDMzLjk2MjYgNDAuMjg2OSAzNi45NTQ3QzM4LjgwMDkgMzguOTUwMSAzNi42ODQ4IDM5Ljk5MzIgMzQuMzQwOCAzOS44OEMyOC4yMzQyIDM5LjU3MzIgMjcuMTM2NiAzNS4yOTk5IDI2LjMzNjYgMzIuMTgzQzI1LjUxMzQgMjguOTg1OCAyNC45ODY4IDI3LjQ0NDIgMjEuODQyNyAyNy40NDQyQzIwLjExNjEgMjcuNDQ0MiAxOC45MDM0IDI3LjkyMDMgMTguMTQ4OCAyOC45MDY0QzE3LjExOTggMzAuMjU1NCAxNy4wMzk2IDMyLjM2NCAxNy4xNTM2IDMzLjg5MzhDMTcuMjI4NCAzNC45NTk3IDE3LjQwODcgMzYuMDE1NSAxNy42OTE4IDM3LjA0NTZDMTcuOTQzIDM3LjY4MDQgMjEuMjEzNyA0NS43MjEzIDI5LjA0NjkgNDcuNjY3QzI5LjI0OTQgNDcuNzE1IDI5LjQ0MDMgNDcuODAzIDI5LjYwODUgNDcuOTI1N0MyOS43NzY4IDQ4LjA0ODMgMjkuOTE5MSA0OC4yMDMzIDMwLjAyNzEgNDguMzgxNkMzMC4xMzUxIDQ4LjU1OTkgMzAuMjA2NyA0OC43NTc5IDMwLjIzNzcgNDguOTY0MUMzMC4yNjg4IDQ5LjE3MDQgMzAuMjU4NiA0OS4zODA3IDMwLjIwNzggNDkuNTgzQzMwLjExMjMgNDkuOTI0NSAyOS45MDc5IDUwLjIyNTIgMjkuNjI1OCA1MC40Mzk0QzI5LjM0MzggNTAuNjUzNSAyOC45OTk2IDUwLjc2OTMgMjguNjQ1OCA1MC43NjlaIiBmaWxsPSIjMDRENzhCIi8+CjxwYXRoIGQ9Ik0xNS4yNiA0OS4wNzY5QzE1LjAzNDkgNDkuMDc3MyAxNC44MTIgNDkuMDM1NyAxNC42MDQ2IDQ4Ljk1NDVDMTQuMzk3MiA0OC44NzMzIDE0LjIwOTYgNDguNzU0MiAxNC4wNTI5IDQ4LjYwNDNDMTAuMDMzNiA0NC42OTEzIDcuNzYwMDcgNDAuMzE1NyA2LjkwNDUyIDM0Ljg0NDRWMzQuODE1NEM2LjQyNDI4IDMxLjE5MzMgNy4xMjczMyAyNi4wNjUyIDEwLjU3MjMgMjIuNTM5NEMxMy4xMTUxIDE5LjkzNzggMTYuNjg5OSAxOC42MTU0IDIxLjE3ODYgMTguNjE1NEMyNi40ODcxIDE4LjYxNTQgMzAuNjU4OSAyMC45MDUgMzMuMjYwMiAyNS4yMjY0QzM1LjE0NzYgMjguMzY1OSAzNS41MjE4IDMxLjQ5NDMgMzUuNTMxNiAzMS42MjI3QzM1LjU1MTMgMzEuODIwNyAzNS41Mjg4IDMyLjAyMDQgMzUuNDY1MyAzMi4yMTA0QzM1LjQwMTggMzIuNDAwMyAzNS4yOTg1IDMyLjU3NjcgMzUuMTYxMyAzMi43Mjk2QzM1LjAyNDIgMzIuODgyNCAzNC44NTU5IDMzLjAwODcgMzQuNjY2MSAzMy4xMDExQzM0LjQ3NjMgMzMuMTkzNSAzNC4yNjg3IDMzLjI1MDMgMzQuMDU1MiAzMy4yNjgyQzMzLjYyNDQgMzMuMzExNiAzMy4xOTI1IDMzLjE5NiAzMi44NTI3IDMyLjk0NjZDMzIuNTEyOSAzMi42OTcxIDMyLjI5MjUgMzIuMzMzNyAzMi4yMzkxIDMxLjkzNDhDMzEuOTU0MiAzMC4wNTc2IDMxLjI5OTQgMjguMjQ1MiAzMC4zMDc0IDI2LjU4NzlDMjguMjkxMiAyMy4yODc5IDI1LjIyMzggMjEuNjEwMyAyMS4xNjY3IDIxLjYxMDNDMTcuNjYyMiAyMS42MTAzIDE0LjkyMDMgMjIuNTg4NiAxMy4wMzQgMjQuNTJDMTAuMzE0OCAyNy4zMDQzIDkuNzg5MTggMzEuNTkzNiAxMC4xNjIzIDM0LjQzMTFDMTAuOTExOSAzOS4yNjkyIDEyLjkxNjEgNDMuMTE4IDE2LjQ1NTIgNDYuNTU3NUMxNi42MDI5IDQ2LjcgMTYuNzE4MiA0Ni44Njg3IDE2Ljc5NDIgNDcuMDUzNEMxNi44NzAzIDQ3LjIzODEgMTYuOTA1NSA0Ny40MzUxIDE2Ljg5NzggNDcuNjMyN0MxNi44OTAyIDQ3LjgzMDMgMTYuODM5NyA0OC4wMjQ0IDE2Ljc0OTYgNDguMjAzNkMxNi42NTk0IDQ4LjM4MjcgMTYuNTMxMyA0OC41NDMyIDE2LjM3MyA0OC42NzU2QzE2LjA2OCA0OC45MzIgMTUuNjcxNiA0OS4wNzQ5IDE1LjI2IDQ5LjA3NjlaIiBmaWxsPSIjMDRENzhCIi8+CjxwYXRoIGQ9Ik0zNS4wMTE0IDQ1LjY5MjRDMzEuMzg4NiA0NS42OTI0IDI4LjMwODYgNDQuNzEyNSAyNS44NDQgNDIuNzY0NUMyMC44OTI0IDM4Ljg2NzYgMjAuMzM3MyAzMi41MjA3IDIwLjMxMjggMzIuMjUyOUMyMC4yNzc5IDMxLjgxMzIgMjAuNDIzMiAzMS4zNzggMjAuNzE2OCAzMS4wNDNDMjEuMDEwNSAzMC43MDgxIDIxLjQyODMgMzAuNTAwNyAyMS44Nzg0IDMwLjQ2NjZDMjIuMzI4NSAzMC40MzI2IDIyLjc3NCAzMC41NzQ1IDIzLjExNyAzMC44NjEzQzIzLjQ1OTkgMzEuMTQ4MSAyMy42NzIyIDMxLjU1NjMgMjMuNzA3MSAzMS45OTU5QzIzLjcxOTMgMzIuMDg5NiAyNC4yMTQzIDM3LjI4MTIgMjguMDMxMSA0MC4yNzExQzMwLjI4OTUgNDIuMDMyOCAzMy4zMDgxIDQyLjczMTkgMzcuMDI3OSA0Mi4zMjM2QzM3LjQ3MjUgNDIuMjcwOSAzNy45MjA0IDQyLjM5MjMgMzguMjczNiA0Mi42NjEyQzM4LjYyNjggNDIuOTMwMSAzOC44NTY3IDQzLjMyNDcgMzguOTEyOSA0My43NTg3QzM4LjkzNzMgNDMuOTczIDM4LjkxNzcgNDQuMTkgMzguODU1MyA0NC4zOTY5QzM4Ljc5MjggNDQuNjAzOCAzOC42ODg5IDQ0Ljc5NjUgMzguNTQ5NCA0NC45NjM3QzM4LjQxIDQ1LjEzMSAzOC4yMzc4IDQ1LjI2OTQgMzguMDQzIDQ1LjM3MUMzNy44NDgyIDQ1LjQ3MjUgMzcuNjM0NiA0NS41MzUyIDM3LjQxNDcgNDUuNTU1MkMzNi42MTcgNDUuNjQ2MiAzNS44MTQ2IDQ1LjY5MiAzNS4wMTE0IDQ1LjY5MjRaIiBmaWxsPSIjMDRENzhCIi8+CjxwYXRoIGQ9Ik0zNy45MzIyIDMuNjA5MDNDMzYuNTg0MSAyLjcwMSAzMS44MDQxIDAgMjIuODE1OSAwQzEzLjM4MTIgMCA4LjU4OTQ2IDIuOTgzODYgNy41Mjk0NiAzLjc0MjIxQzcuNDU5NDYgMy43ODY3IDcuMzkzOTIgMy44MzgzMiA3LjMzMzg0IDMuODk2M0M3LjMyNzUgMy45MDI2NSA3LjMxOTI0IDMuOTA2NTQgNy4zMTA0NSAzLjkwNzMxQzcuMTQxMTggNC4wNjAzIDcuMDA1MzYgNC4yNDg5IDYuOTEyMDUgNC40NjA1MUM2LjgxODczIDQuNjcyMTMgNi43NzAwNiA0LjkwMTkxIDYuNzY5MjkgNS4xMzQ1M0M2Ljc3MjIgNS4zNTI1OSA2LjgxNjY0IDUuNTY3OTEgNi45MDAwNyA1Ljc2ODE2QzYuOTgzNTEgNS45Njg0MSA3LjEwNDI5IDYuMTQ5NjQgNy4yNTU1IDYuMzAxNDdDNy40MDY3MSA2LjQ1MzMxIDcuNTg1MzggNi41NzI3NiA3Ljc4MTI2IDYuNjUyOTlDNy45NzcxNCA2LjczMzIyIDguMTg2MzkgNi43NzI2NCA4LjM5NzAyIDYuNzY5QzguNzM0NjIgNi43Njg3NiA5LjA2NDA2IDYuNjYxNjEgOS4zNDExMyA2LjQ2MTkyQzkuMzg2ODQgNi40MjY3IDEzLjUxMDkgMy4yODk4NCAyMi44MTkxIDMuMjg5ODRDMzIuMTI3MyAzLjI4OTg0IDM2LjI3MzcgNi40MTU2OSAzNi4zMTgzIDYuNDM4OEMzNi42MDE0IDYuNjU2MTEgMzYuOTQ1MSA2Ljc3MjAyIDM3LjI5NzUgNi43NjlDMzcuNTA4MyA2Ljc3MjM1IDM3LjcxNzcgNi43MzI1NiAzNy45MTM2IDYuNjUxOTNDMzguMTA5NSA2LjU3MTMgMzguMjg4MSA2LjQ1MTQgMzguNDM5MiA2LjI5OTEzQzM4LjU5MDIgNi4xNDY4NiAzOC43MTA3IDUuOTY1MiAzOC43OTM4IDUuNzY0NkMzOC44NzY4IDUuNTYzOTkgMzguOTIwOCA1LjM0ODM3IDM4LjkyMzEgNS4xMzAxM0MzOC45MjMyIDQuODAzMjIgMzguODI4OSA0LjQ4Mzc1IDM4LjY1MjQgNC4yMTI3MUMzOC40NzU4IDMuOTQxNjggMzguMjI1IDMuNzMxNDYgMzcuOTMyMiAzLjYwOTAzWiIgZmlsbD0iIzA0RDc4QiIvPgo8cGF0aCBkPSJNMzIuMTUzOCA2NS45OTk5QzMyLjE1MzggNjAuMzk0MSAyNy42MDU3IDU1Ljg0NjEgMjEuOTk5OSA1NS44NDYxQzE2LjM5NDEgNTUuODQ2MSAxMS44NDYxIDYwLjM5NDEgMTEuODQ2MSA2NS45OTk5QzExLjg0NjEgNzEuNjA1NyAxNi4zOTQxIDc2LjE1MzggMjEuOTk5OSA3Ni4xNTM4QzI3LjYwNTcgNzYuMTUzOCAzMi4xNTM4IDcxLjYwNTcgMzIuMTUzOCA2NS45OTk5WiIgc3Ryb2tlPSIjMDRENzhCIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPgo8cGF0aCBkPSJNMjcuMDc2OSA2MS43NjkzTDE5Ljk2OTIgNzAuMjMwOEwxNi45MjMgNjYuODQ2MiIgc3Ryb2tlPSIjMDRENzhCIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K";
var passkey = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIxLjg3NSAyNUMyNy4wNTI3IDI1IDMxLjI1IDIwLjgwMjcgMzEuMjUgMTUuNjI1QzMxLjI1IDEwLjQ0NzMgMjcuMDUyNyA2LjI1IDIxLjg3NSA2LjI1QzE2LjY5NzMgNi4yNSAxMi41IDEwLjQ0NzMgMTIuNSAxNS42MjVDMTIuNSAyMC44MDI3IDE2LjY5NzMgMjUgMjEuODc1IDI1WiIgZmlsbD0iY3VycmVudENvbG9yIi8+CjxwYXRoIGQ9Ik00Ni44NzUgMjQuOTk5OEM0Ni44Nzk2IDIzLjY5MzkgNDYuNTMzNCAyMi40MTA2IDQ1Ljg3MjQgMjEuMjg0MkM0NS4yMTE1IDIwLjE1NzggNDQuMjYwMiAxOS4yMjk2IDQzLjExNzkgMTguNTk2NUM0MS45NzU2IDE3Ljk2MzUgNDAuNjg0MyAxNy42NDg4IDM5LjM3ODggMTcuNjg1NUMzOC4wNzMzIDE3LjcyMjEgMzYuODAxNyAxOC4xMDg3IDM1LjY5NjcgMTguODA0OUMzNC41OTE3IDE5LjUwMSAzMy42OTQgMjAuNDgxMSAzMy4wOTczIDIxLjY0MjhDMzIuNTAwNiAyMi44MDQ2IDMyLjIyNjkgMjQuMTA1MiAzMi4zMDQ3IDI1LjQwODlDMzIuMzgyNSAyNi43MTI1IDMyLjgwOTEgMjcuOTcxNCAzMy41Mzk4IDI5LjA1MzhDMzQuMjcwNCAzMC4xMzYzIDM1LjI3ODQgMzEuMDAyNiAzNi40NTg0IDMxLjU2MjNWNDIuNzA4MkwzOS41ODM0IDQ1LjgzMzJMNDQuNzkxNyA0MC42MjQ4TDQxLjY2NjcgMzcuNDk5OEw0NC43OTE3IDM0LjM3NDhMNDIuMjA4NCAzMS43OTE1QzQzLjU4MDQgMzEuMjYyMSA0NC43NjAzIDMwLjMzMDIgNDUuNTkzMSAyOS4xMTgxQzQ2LjQyNTkgMjcuOTA2IDQ2Ljg3MjggMjYuNDcwNSA0Ni44NzUgMjQuOTk5OFpNMzkuNTgzNCAyNC45OTk4QzM5LjE3MTMgMjQuOTk5OCAzOC43Njg1IDI0Ljg3NzcgMzguNDI1OSAyNC42NDg3QzM4LjA4MzMgMjQuNDE5OCAzNy44MTYzIDI0LjA5NDQgMzcuNjU4NiAyMy43MTM4QzM3LjUwMDkgMjMuMzMzMSAzNy40NTk3IDIyLjkxNDIgMzcuNTQwMSAyMi41MTAxQzM3LjYyMDUgMjIuMTA1OSAzNy44MTg5IDIxLjczNDcgMzguMTEwMiAyMS40NDM0QzM4LjQwMTYgMjEuMTUyIDM4Ljc3MjggMjAuOTUzNiAzOS4xNzY5IDIwLjg3MzJDMzkuNTgxMSAyMC43OTI4IDM5Ljk5OTkgMjAuODM0MSA0MC4zODA2IDIwLjk5MThDNDAuNzYxMyAyMS4xNDk0IDQxLjA4NjcgMjEuNDE2NSA0MS4zMTU2IDIxLjc1OTFDNDEuNTQ0NSAyMi4xMDE3IDQxLjY2NjcgMjIuNTA0NSA0MS42NjY3IDIyLjkxNjVDNDEuNjY2NyAyMy40NjkgNDEuNDQ3MiAyMy45OTg5IDQxLjA1NjUgMjQuMzg5NkM0MC42NjU4IDI0Ljc4MDMgNDAuMTM1OSAyNC45OTk4IDM5LjU4MzQgMjQuOTk5OFoiIGZpbGw9ImN1cnJlbnRDb2xvciIvPgo8cGF0aCBkPSJNMzAuMDgzMyAyOS4yMDgzQzI4LjQ4MzUgMjguNDk1IDI2Ljc1MTYgMjguMTI2IDI1IDI4LjEyNUgxOC43NUMxNS40MzQ4IDI4LjEyNSAxMi4yNTU0IDI5LjQ0MiA5LjkxMTE3IDMxLjc4NjJDNy41NjY5NiAzNC4xMzA0IDYuMjUgMzcuMzA5OCA2LjI1IDQwLjYyNVY0NC43OTE3SDMzLjMzMzNWMzMuMzEyNUMzMS45Mjg0IDMyLjIzMzIgMzAuODExOSAzMC44MjMzIDMwLjA4MzMgMjkuMjA4M1oiIGZpbGw9ImN1cnJlbnRDb2xvciIvPgo8L3N2Zz4K";
var phone = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE5LjU4OTcgMzMuMzg3NUwyMC45MjMgMzMuMTU4NEMyMS4xODEzIDMzLjExMjUgMjEuNDg5NyAzMy4wNDU5IDIxLjg0NTkgMzIuOTU0MkMyNi4yNTAxIDMxLjg1IDI5LjE2NjcgMjguNTU4NCAyOS4xNjY3IDI1QzI5LjE2NjcgMjAuNTUyMSAyNC42MzM0IDE2LjY2NjcgMTguNzUwMSAxNi42NjY3QzEyLjg2NjcgMTYuNjY2NyA4LjMzMzQyIDIwLjU1MjEgOC4zMzM0MiAyNUM4LjMzMzQyIDI3LjUzNzUgOS43OTU5MiAyOS45NTQyIDEyLjM1NjMgMzEuNTYyNUwxMi40MzEzIDMxLjYwNDJMMTQuNTgzNCAzMi43OTE3VjM4LjU0NzlMMTkuNTg5NyAzMy4zODc1Wk0yMS42MzU1IDM3LjI2MjVMMTMuOTk1OSA0NS4xMzc1QzEzLjcwNzIgNDUuNDM1MyAxMy4zMzYyIDQ1LjY0MDIgMTIuOTMwMyA0NS43MjU5QzEyLjUyNDUgNDUuODExNSAxMi4xMDIzIDQ1Ljc3NDEgMTEuNzE3OCA0NS42MTgzQzExLjMzMzQgNDUuNDYyNiAxMS4wMDQyIDQ1LjE5NTYgMTAuNzcyNCA0NC44NTE2QzEwLjU0MDYgNDQuNTA3NyAxMC40MTY4IDQ0LjEwMjMgMTAuNDE2NyA0My42ODc1VjM1LjI1QzEwLjMyMzcgMzUuMTk5NyAxMC4yMzIgMzUuMTQ2OSAxMC4xNDE3IDM1LjA5MTdDNi41MTg4MyAzMi44MTY3IDQuMTY2NzUgMjkuMTQzOCA0LjE2Njc1IDI1QzQuMTY2NzUgMTguMDk1OSAxMC42OTU5IDEyLjUgMTguNzUwMSAxMi41QzI2LjgwNDIgMTIuNSAzMy4zMzM0IDE4LjA5NTkgMzMuMzMzNCAyNUMzMy4zMzM0IDMwLjY3OTIgMjguOTE0NyAzNS40NzUgMjIuODYyNiAzNi45OTU5QzIyLjQ1NyAzNy4wOTk4IDIyLjA0NzcgMzcuMTg4OCAyMS42MzU1IDM3LjI2MjVaTTE4LjYxNjcgMTAuNDE2N0MyMS4xMzc2IDYuNjgxMjcgMjUuODU0MiA0LjE2NjY5IDMxLjI1MDEgNC4xNjY2OUMzOS4zMDQyIDQuMTY2NjkgNDUuODMzNCA5Ljc2MjUyIDQ1LjgzMzQgMTYuNjY2N0M0NS44MzM0IDIwLjgxMDQgNDMuNDc5MyAyNC40ODM0IDM5Ljg1ODQgMjYuNzU4NEMzOS43NjgyIDI2LjgxMzYgMzkuNjc2NSAyNi44NjY0IDM5LjU4MzQgMjYuOTE2N1YzNS4zNTQyQzM5LjU4MzQgMzUuNzY5IDM5LjQ1OTYgMzYuMTc0MyAzOS4yMjc4IDM2LjUxODNDMzguOTk2IDM2Ljg2MjMgMzguNjY2OCAzNy4xMjkyIDM4LjI4MjMgMzcuMjg1QzM3Ljg5NzkgMzcuNDQwNyAzNy40NzU3IDM3LjQ3ODIgMzcuMDY5OSAzNy4zOTI1QzM2LjY2NCAzNy4zMDY5IDM2LjI5MyAzNy4xMDIgMzYuMDA0MiAzNi44MDQyTDMyLjM4OTcgMzMuMDc5MkwzNC41NjI2IDI5LjMzMzRMMzUuNDE2NyAzMC4yMTQ2VjI0LjQ1ODRMMzcuNTY4OCAyMy4yNzA5TDM3LjY0MzggMjMuMjI5MkM0MC4yMDYzIDIxLjYyMDkgNDEuNjY2OCAxOS4yMDQyIDQxLjY2NjggMTYuNjY2N0M0MS42NjY4IDEyLjIxODggMzcuMTMzNCA4LjMzMzM1IDMxLjI1MDEgOC4zMzMzNUMyOC41ODM0IDguMzMzMzUgMjYuMTk1OSA5LjEzMTI3IDI0LjM4MTMgMTAuNDE2N0gxOC42MTY3WiIgZmlsbD0iY3VycmVudENvbG9yIi8+Cjwvc3ZnPgo=";
var help = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxNSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcuNSAwQzYuMDE2NjQgMCA0LjU2NjU5IDAuNDM5ODY3IDMuMzMzMjMgMS4yNjM5OEMyLjA5OTg2IDIuMDg4MDkgMS4xMzg1NiAzLjI1OTQzIDAuNTcwOTA3IDQuNjI5ODdDMC4wMDMyNDk2MyA2LjAwMDMyIC0wLjE0NTI3NSA3LjUwODMyIDAuMTQ0MTE0IDguOTYzMTdDMC40MzM1MDMgMTAuNDE4IDEuMTQ3ODEgMTEuNzU0NCAyLjE5NjcgMTIuODAzM0MzLjI0NTU5IDEzLjg1MjIgNC41ODE5NyAxNC41NjY1IDYuMDM2ODIgMTQuODU1OUM3LjQ5MTY4IDE1LjE0NTMgOC45OTk2OCAxNC45OTY3IDEwLjM3MDEgMTQuNDI5MUMxMS43NDA2IDEzLjg2MTQgMTIuOTExOSAxMi45MDAxIDEzLjczNiAxMS42NjY4QzE0LjU2MDEgMTAuNDMzNCAxNSA4Ljk4MzM2IDE1IDcuNUMxNSA2LjUxNTA4IDE0LjgwNiA1LjUzOTgxIDE0LjQyOTEgNC42Mjk4N0MxNC4wNTIyIDMuNzE5OTMgMTMuNDk5NyAyLjg5MzE0IDEyLjgwMzMgMi4xOTY3QzEyLjEwNjkgMS41MDAyNiAxMS4yODAxIDAuOTQ3ODE0IDEwLjM3MDEgMC41NzA5MDNDOS40NjAxOCAwLjE5Mzk5MyA4LjQ4NDkxIDAgNy41IDBaTTcuNSAxMkM3LjM1MTY2IDEyIDcuMjA2NjYgMTEuOTU2IDcuMDgzMzIgMTEuODczNkM2Ljk1OTk5IDExLjc5MTIgNi44NjM4NiAxMS42NzQxIDYuODA3MDkgMTEuNTM3QzYuNzUwMzIgMTEuNCA2LjczNTQ3IDExLjI0OTIgNi43NjQ0MSAxMS4xMDM3QzYuNzkzMzUgMTAuOTU4MiA2Ljg2NDc4IDEwLjgyNDYgNi45Njk2NyAxMC43MTk3QzcuMDc0NTYgMTAuNjE0OCA3LjIwODIgMTAuNTQzMyA3LjM1MzY4IDEwLjUxNDRDNy40OTkxNyAxMC40ODU1IDcuNjQ5OTcgMTAuNTAwMyA3Ljc4NzAxIDEwLjU1NzFDNy45MjQwNiAxMC42MTM5IDguMDQxMTkgMTAuNzEgOC4xMjM2IDEwLjgzMzNDOC4yMDYwMSAxMC45NTY3IDguMjUgMTEuMTAxNyA4LjI1IDExLjI1QzguMjUgMTEuNDQ4OSA4LjE3MDk4IDExLjYzOTcgOC4wMzAzMyAxMS43ODAzQzcuODg5NjggMTEuOTIxIDcuNjk4OTEgMTIgNy41IDEyWk04LjI1IDguMTNWOUM4LjI1IDkuMTk4OTEgOC4xNzA5OCA5LjM4OTY4IDguMDMwMzMgOS41MzAzM0M3Ljg4OTY4IDkuNjcwOTggNy42OTg5MSA5Ljc1IDcuNSA5Ljc1QzcuMzAxMDkgOS43NSA3LjExMDMyIDkuNjcwOTggNi45Njk2NyA5LjUzMDMzQzYuODI5MDIgOS4zODk2OCA2Ljc1IDkuMTk4OTEgNi43NSA5VjcuNUM2Ljc1IDcuMzAxMDkgNi44MjkwMiA3LjExMDMyIDYuOTY5NjcgNi45Njk2N0M3LjExMDMyIDYuODI5MDIgNy4zMDEwOSA2Ljc1IDcuNSA2Ljc1QzcuNzIyNSA2Ljc1IDcuOTQwMDEgNi42ODQwMiA4LjEyNTAyIDYuNTYwNEM4LjMxMDAyIDYuNDM2NzggOC40NTQyMiA2LjI2MTA4IDguNTM5MzYgNi4wNTU1MkM4LjYyNDUxIDUuODQ5OTUgOC42NDY3OSA1LjYyMzc1IDguNjAzMzggNS40MDU1MkM4LjU1OTk3IDUuMTg3MjkgOC40NTI4MyA0Ljk4Njg0IDguMjk1NSA0LjgyOTVDOC4xMzgxNiA0LjY3MjE3IDcuOTM3NzEgNC41NjUwMiA3LjcxOTQ4IDQuNTIxNjJDNy41MDEyNSA0LjQ3ODIxIDcuMjc1MDUgNC41MDA0OSA3LjA2OTQ4IDQuNTg1NjNDNi44NjM5MSA0LjY3MDc4IDYuNjg4MjEgNC44MTQ5OCA2LjU2NDYgNC45OTk5OEM2LjQ0MDk4IDUuMTg0OTkgNi4zNzUgNS40MDI0OSA2LjM3NSA1LjYyNUM2LjM3NSA1LjgyMzkxIDYuMjk1OTggNi4wMTQ2OCA2LjE1NTMzIDYuMTU1MzNDNi4wMTQ2OCA2LjI5NTk4IDUuODIzOTEgNi4zNzUgNS42MjUgNi4zNzVDNS40MjYwOSA2LjM3NSA1LjIzNTMyIDYuMjk1OTggNS4wOTQ2NyA2LjE1NTMzQzQuOTU0MDIgNi4wMTQ2OCA0Ljg3NSA1LjgyMzkxIDQuODc1IDUuNjI1QzQuODczMDQgNS4xMzc3MiA1LjAwNjc1IDQuNjU5NTIgNS4yNjExNSA0LjI0MzkzQzUuNTE1NTUgMy44MjgzNCA1Ljg4MDYyIDMuNDkxNzYgNi4zMTU0NiAzLjI3MTg4QzYuNzUwMzEgMy4wNTIgNy4yMzc3OCAyLjk1NzQ5IDcuNzIzMjkgMi45OTg5NEM4LjIwODggMy4wNDA0IDguNjczMTkgMy4yMTYxNyA5LjA2NDQ3IDMuNTA2NTlDOS40NTU3NCAzLjc5NyA5Ljc1ODQ2IDQuMTkwNTkgOS45Mzg3MyA0LjY0MzNDMTAuMTE5IDUuMDk2IDEwLjE2OTcgNS41ODk5NSAxMC4wODUyIDYuMDY5ODRDMTAuMDAwNiA2LjU0OTczIDkuNzg0MTkgNi45OTY2MSA5LjQ2MDA3IDcuMzYwNDdDOS4xMzU5NiA3LjcyNDMyIDguNzE2OTYgNy45OTA3NyA4LjI1IDguMTNaIiBmaWxsPSJjdXJyZW50Q29sb3IiLz4KPC9zdmc+Cg==";
var close = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI4IiB2aWV3Qm94PSIwIDAgOCA4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMSAxTDcgN00xIDdMNyAxIiBzdHJva2U9IiM2QjZCNkIiIHN0cm9rZS13aWR0aD0iMC43NSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=";
var loginWithEmail = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzIiIGhlaWdodD0iNTYiIHZpZXdCb3g9IjAgMCA3MiA1NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTY5LjMzMzMgMjhWM0gzNkgyLjY2NjY2VjI4VjUzSDM2IiBzdHJva2U9ImN1cnJlbnRjb2xvciIgc3Ryb2tlLXdpZHRoPSI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTY5LjMzMzMgNDQuNjY2Nkg0NiIgc3Ryb2tlPSJjdXJyZW50Y29sb3IiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik01NC4zMzMzIDM2LjMzMzRMNDYgNDQuNjY2N0w1NC4zMzMzIDUzIiBzdHJva2U9ImN1cnJlbnRjb2xvciIgc3Ryb2tlLXdpZHRoPSI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTIuNjY2NjYgM0wzNiAyOEw2OS4zMzMzIDMiIHN0cm9rZT0iY3VycmVudGNvbG9yIiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K";
var loginWithText = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTciIGhlaWdodD0iNTYiIHZpZXdCb3g9IjAgMCA1NyA1NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE0LjQyOTYgMjguNDA0MUg0Mi4zNzg1TTE0LjQyOTYgMTcuMjI0NUgzMS4xOTg5IiBzdHJva2U9ImN1cnJlbnRjb2xvciIgc3Ryb2tlLXdpZHRoPSI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTMuMjUgNTEuNTczN1Y4LjgzOTc4QzMuMjUgNy4zNTcyOCAzLjgzODkyIDUuOTM1NSA0Ljg4NzIxIDQuODg3MjFDNS45MzU1IDMuODM4OTIgNy4zNTcyOCAzLjI1IDguODM5NzggMy4yNUg0Ny45NjgzQzQ5LjQ1MDggMy4yNSA1MC44NzI2IDMuODM4OTIgNTEuOTIwOCA0Ljg4NzIxQzUyLjk2OTEgNS45MzU1IDUzLjU1OCA3LjM1NzI4IDUzLjU1OCA4LjgzOTc4VjM2Ljc4ODdDNTMuNTU4IDM4LjI3MTIgNTIuOTY5MSAzOS42OTMgNTEuOTIwOCA0MC43NDEzQzUwLjg3MjYgNDEuNzg5NiA0OS40NTA4IDQyLjM3ODUgNDcuOTY4MyA0Mi4zNzg1SDE3LjExNTVDMTYuMjc3NiA0Mi4zNzg2IDE1LjQ1MDYgNDIuNTY3IDE0LjY5NTQgNDIuOTI5OUMxMy45NDAyIDQzLjI5MjcgMTMuMjc2MyA0My44MjA2IDEyLjc1MjYgNDQuNDc0N0w2LjIzNzc0IDUyLjYxOUM2LjAyMDkzIDUyLjg5MDcgNS43MjUwNCA1My4wODgzIDUuMzkxIDUzLjE4NDVDNS4wNTY5NSA1My4yODA3IDQuNzAxMjcgNTMuMjcwNyA0LjM3MzE2IDUzLjE1NTlDNC4wNDUwNCA1My4wNDExIDMuNzYwNzEgNTIuODI3MiAzLjU1OTQ5IDUyLjU0MzdDMy4zNTgyOCA1Mi4yNjAzIDMuMjUwMTMgNTEuOTIxMyAzLjI1IDUxLjU3MzdWNTEuNTczN1oiIHN0cm9rZT0iY3VycmVudGNvbG9yIiBzdHJva2Utd2lkdGg9IjUiLz4KPC9zdmc+Cg==";
var privateIcon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNSAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYuOTM0OCAwLjYwMjEwNUM3LjI1MjUyIDAuNDgzMjMxIDcuNTk5NjYgMC40Njc3MzMgNy45MjY3MSAwLjU1NzgyM0w4LjA2NTE5IDAuNjAyMTA1TDEzLjcwMSAyLjcxNTU1QzEzLjk4NjggMi44MjI3IDE0LjIzNjIgMy4wMDg4NiAxNC40MjAyIDMuMjUyMzJDMTQuNjA0MyAzLjQ5NTc5IDE0LjcxNTMgMy43ODY1NCAxNC43NDA0IDQuMDkwNjlMMTQuNzQ2MSA0LjIyMzU0VjguNTQxNEMxNC43NDYgOS44NDYwNCAxNC4zOTM4IDExLjEyNjUgMTMuNzI2NSAxMi4yNDc1QzEzLjA1OTIgMTMuMzY4NiAxMi4xMDE2IDE0LjI4ODcgMTAuOTU0OCAxNC45MTA3TDEwLjc0MDYgMTUuMDIyNkw4LjA0MDIzIDE2LjM3MjhDNy44OTE1NCAxNi40NDcgNy43MjkxMyAxNi40ODk4IDcuNTYzMTcgMTYuNDk4NEM3LjM5NzIgMTYuNTA3IDcuMjMxMjUgMTYuNDgxMiA3LjA3NTY5IDE2LjQyMjdMNi45NTk3NiAxNi4zNzI4TDQuMjU5MzggMTUuMDIyNkMzLjA5MjQ1IDE0LjQzOTEgMi4xMDQ3IDEzLjU1MTQgMS40MDA0IDEyLjQ1MzJDMC42OTYxMDUgMTEuMzU0OSAwLjMwMTM5MyAxMC4wODY5IDAuMjU3OTMyIDguNzgyOTRMMC4yNTM5MDYgOC41NDE0VjQuMjIzNTRDMC4yNTM5MTEgMy45MTg1IDAuMzQwNTU5IDMuNjE5NzQgMC41MDM3NjIgMy4zNjIwNEMwLjY2Njk2NiAzLjEwNDMzIDAuOTAwMDEyIDIuODk4MjggMS4xNzU3NyAyLjc2Nzg4TDEuMjk4OTUgMi43MTU1NUw2LjkzNDggMC42MDIxMDVaTTcuNDk5OTkgMi4xMTAxTDEuODY0MTUgNC4yMjM1NFY4LjU0MTRDMS44NjQxNyA5LjU1MTgzIDIuMTM1ODQgMTAuNTQzNyAyLjY1MDcxIDExLjQxMzFDMy4xNjU1OSAxMi4yODI1IDMuOTA0NzQgMTIuOTk3NSA0Ljc5MDc2IDEzLjQ4MzJMNC45Nzk5NiAxMy41ODIzTDcuNDk5OTkgMTQuODQyM0wxMC4wMiAxMy41ODIzQzEwLjkyNCAxMy4xMzA0IDExLjY4OTggMTIuNDQzOCAxMi4yMzcyIDExLjU5NDNDMTIuNzg0NyAxMC43NDQ5IDEzLjA5MzcgOS43NjM4MiAxMy4xMzE4IDguNzUzOTVMMTMuMTM1OCA4LjU0MTRWNC4yMjM1NEw3LjQ5OTk5IDIuMTEwMVpNMTAuMjY0IDUuNzgyMjVDMTAuNDA4OSA1LjYzNzg1IDEwLjYwMzMgNS41NTQwMiAxMC44MDc3IDUuNTQ3NzhDMTEuMDEyMiA1LjU0MTUzIDExLjIxMTQgNS42MTMzNSAxMS4zNjQ4IDUuNzQ4NjRDMTEuNTE4MiA1Ljg4MzkyIDExLjYxNDQgNi4wNzI1NCAxMS42MzM4IDYuMjc2MTdDMTEuNjUzMiA2LjQ3OTgxIDExLjU5NDQgNi42ODMxOSAxMS40NjkyIDYuODQ1MDFMMTEuNDAyNCA2LjkyMDY5TDcuMTg4NDEgMTEuMTM1NUM3LjAzNDkxIDExLjI4OSA2LjgzMDM5IDExLjM4MDcgNi42MTM2OSAxMS4zOTM0QzYuMzk2OTkgMTEuNDA2IDYuMTgzMjEgMTEuMzM4NiA2LjAxMjkzIDExLjIwMzlMNS45MzU2NCAxMS4xMzU1TDQuMDAwMTMgOS4xOTk5OUMzLjg1NDIgOS4wNTU0NCAzLjc2OTA0IDguODYwNTcgMy43NjIwNyA4LjY1NTI5QzMuNzU1MTEgOC40NSAzLjgyNjg3IDguMjQ5ODEgMy45NjI2NyA4LjA5NTdDNC4wOTg0NyA3Ljk0MTU5IDQuMjg4MDMgNy44NDUyMSA0LjQ5MjU2IDcuODI2MjlDNC42OTcxIDcuODA3MzcgNC45MDExMyA3Ljg2NzMzIDUuMDYyODkgNy45OTM5Mkw1LjEzODU3IDguMDYwNzRMNi41NjIwMyA5LjQ4NDJMMTAuMjY0IDUuNzgyMjVaIiBmaWxsPSJjdXJyZW50Q29sb3IiLz4KPC9zdmc+Cg==";
var secure = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxMyAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEuOTI4NTcgMTYuNUMxLjUwOTUyIDE2LjUgMS4xNTA2NiAxNi4zNTA3IDAuODUxOTk0IDE2LjA1MkMwLjU1MzMyNyAxNS43NTMzIDAuNDA0MjQ4IDE1LjM5NDcgMC40MDQ3NTYgMTQuOTc2MlY3LjM1NzE0QzAuNDA0NzU2IDYuOTM4MSAwLjU1NDA4OSA2LjU3OTI0IDAuODUyNzU2IDYuMjgwNTdDMS4xNTE0MiA1Ljk4MTkgMS41MTAwMyA1LjgzMjgzIDEuOTI4NTcgNS44MzMzM0gyLjY5MDQ3VjQuMzA5NTJDMi42OTA0NyAzLjI1NTU2IDMuMDYyMDMgMi4zNTcwMiAzLjgwNTE0IDEuNjEzOTFDNC41NDgyNSAwLjg3MDc5NCA1LjQ0NjUzIDAuNDk5NDkzIDYuNDk5OTkgMC41MDAwMDFDNy41NTM5NiAwLjUwMDAwMSA4LjQ1MjUgMC44NzE1NTYgOS4xOTU2MSAxLjYxNDY3QzkuOTM4NzIgMi4zNTc3OCAxMC4zMSAzLjI1NjA2IDEwLjMwOTUgNC4zMDk1MlY1LjgzMzMzSDExLjA3MTRDMTEuNDkwNSA1LjgzMzMzIDExLjg0OTMgNS45ODI2NyAxMi4xNDggNi4yODEzM0MxMi40NDY3IDYuNTggMTIuNTk1NyA2LjkzODYgMTIuNTk1MiA3LjM1NzE0VjE0Ljk3NjJDMTIuNTk1MiAxNS4zOTUyIDEyLjQ0NTkgMTUuNzU0MSAxMi4xNDcyIDE2LjA1MjhDMTEuODQ4NiAxNi4zNTE0IDExLjQ5IDE2LjUwMDUgMTEuMDcxNCAxNi41SDEuOTI4NTdaTTEuOTI4NTcgMTQuOTc2MkgxMS4wNzE0VjcuMzU3MTRIMS45Mjg1N1YxNC45NzYyWk02LjQ5OTk5IDEyLjY5MDVDNi45MTkwNCAxMi42OTA1IDcuMjc3OSAxMi41NDExIDcuNTc2NTYgMTIuMjQyNUM3Ljg3NTIzIDExLjk0MzggOC4wMjQzMSAxMS41ODUyIDguMDIzOCAxMS4xNjY3QzguMDIzOCAxMC43NDc2IDcuODc0NDcgMTAuMzg4OCA3LjU3NTggMTAuMDkwMUM3LjI3NzE0IDkuNzkxNDMgNi45MTg1MyA5LjY0MjM1IDYuNDk5OTkgOS42NDI4NkM2LjA4MDk1IDkuNjQyODYgNS43MjIwOSA5Ljc5MjE5IDUuNDIzNDIgMTAuMDkwOUM1LjEyNDc2IDEwLjM4OTUgNC45NzU2OCAxMC43NDgxIDQuOTc2MTggMTEuMTY2N0M0Ljk3NjE4IDExLjU4NTcgNS4xMjU1MiAxMS45NDQ2IDUuNDI0MTggMTIuMjQzMkM1LjcyMjg1IDEyLjU0MTkgNi4wODE0NSAxMi42OTEgNi40OTk5OSAxMi42OTA1Wk00LjIxNDI4IDUuODMzMzNIOC43ODU3MVY0LjMwOTUyQzguNzg1NzEgMy42NzQ2IDguNTYzNDkgMy4xMzQ5MiA4LjExOTA0IDIuNjkwNDhDNy42NzQ2IDIuMjQ2MDMgNy4xMzQ5MSAyLjAyMzgxIDYuNDk5OTkgMi4wMjM4MUM1Ljg2NTA3IDIuMDIzODEgNS4zMjUzOSAyLjI0NjAzIDQuODgwOTUgMi42OTA0OEM0LjQzNjUgMy4xMzQ5MiA0LjIxNDI4IDMuNjc0NiA0LjIxNDI4IDQuMzA5NTJWNS44MzMzM1oiIGZpbGw9ImN1cnJlbnRDb2xvciIvPgo8L3N2Zz4K";
var simple = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNyAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUuNTI2NDQgMTEuNzEyNUM1LjcyNzk3IDExLjg1NDQgNS45Njg1NyAxMS45MzAzIDYuMjE1MDUgMTEuOTI5N0M2LjQ2MTUzIDExLjkyOSA2LjcwMTc1IDExLjg1MiA2LjkwMjU4IDExLjcwOTFDNy4xMDYwMyAxMS41NjA1IDcuMjYwMzMgMTEuMzU0NyA3LjM0NDkxIDExLjExN0w3Ljg1NTgyIDkuNTQ3N0M3Ljk4NjYxIDkuMTU0MTggOC4yMDcyNiA4Ljc5NjU0IDguNTAwMjggOC41MDMxMkM4Ljc5MzMxIDguMjA5NyA5LjE1MDY1IDcuOTg4NTYgOS41NDM5OSA3Ljg1NzI0TDExLjEzMzkgNy4zNDI5QzExLjM2ODkgNy4yNTc4IDExLjU3MTQgNy4xMDEwOCAxMS43MTI2IDYuODk0ODRDMTEuODUzOSA2LjY4ODYgMTEuOTI2OSA2LjQ0MzIzIDExLjkyMTQgNi4xOTMzQzExLjkxNTggNS45NDMzNyAxMS44MzIgNS43MDE0OCAxMS42ODE3IDUuNTAxNzJDMTEuNTMxNCA1LjMwMTk2IDExLjMyMjIgNS4xNTQzOSAxMS4wODM2IDUuMDc5ODFMOS41MTE5OSA0LjU2Nzc2QzkuMTE4MjIgNC40MzcyIDguNzYwMyA0LjIxNjY1IDguNDY2NjYgMy45MjM2QzguMTczMDIgMy42MzA1NiA3Ljk1MTc0IDMuMjczMDkgNy44MjAzOCAyLjg3OTU5TDcuMzAzNzYgMS4yOTMxNEM3LjIyMDU3IDEuMDU5NDIgNy4wNjY2IDAuODU3NDMzIDYuODYzMjggMC43MTUyODhDNi42NTk5NSAwLjU3MzE0NCA2LjQxNzM4IDAuNDk3OTA3IDYuMTY5MyAwLjUwMDA0NEM1LjkyMTIyIDAuNTAyMTgyIDUuNjc5OTggMC41ODE1ODcgNS40NzkxMyAwLjcyNzIxNEM1LjI3ODI5IDAuODcyODQxIDUuMTI3ODIgMS4wNzc0NSA1LjA0ODY3IDEuMzEyNTdMNC41MjYzMyAyLjkxMjczQzQuMzk1NTEgMy4yOTU2NCA0LjE3OTM2IDMuNjQzOCAzLjg5NDIzIDMuOTMwOTJDMy42MDkxIDQuMjE4MDMgMy4yNjI0NCA0LjQzNjU3IDIuODgwNDUgNC41NzAwNUwxLjI5MTcyIDUuMDgwOTZDMS4wNTgwOSA1LjE2NDMyIDAuODU2MjEyIDUuMzE4MzYgMC43MTQxMTQgNS41MjE2OEMwLjU3MjAxNiA1LjcyNSAwLjQ5Njc0NyA1Ljk2NzUyIDAuNDk4NzU4IDYuMjE1NTdDMC41MDA3NjggNi40NjM2MiAwLjU3OTk1OCA2LjcwNDg5IDAuNzI1MzMzIDYuOTA1ODhDMC44NzA3MDggNy4xMDY4NyAxLjA3NTA2IDcuMjU3NjIgMS4zMSA3LjMzNzE5TDIuODgwNDUgNy44NDU4MUMzLjI3NTg3IDcuOTc3MzEgMy42MzQ5NyA4LjE5OTY2IDMuOTI4OTQgOC40OTUwMkM0LjIyMjkgOC43OTAzOCA0LjQ0MzU2IDkuMTUwNTIgNC41NzMyIDkuNTQ2NTZMNS4wODk4MiAxMS4xMzY0QzUuMTcyMTEgMTEuMzY5NiA1LjMyNTI3IDExLjU3MDggNS41MjY0NCAxMS43MTI1Wk01LjYyMzU5IDMuMjM3MzRMNi4yMjU5NCAxLjY2MzQ2TDYuNzI4ODQgMy4yMzczNEM2LjkxNTgzIDMuODAwODcgNy4yMzIwMiA0LjMxMjg2IDcuNjUyMTUgNC43MzI0QzguMDcyMjkgNS4xNTE5NCA4LjU4NDcyIDUuNDY3NCA5LjE0ODUyIDUuNjUzNTlMMTAuNzU1NSA2LjI1OTM2TDkuMTc1OTUgNi43NzAyN0M4LjYxMjc3IDYuOTU4MTQgOC4xMDEwOSA3LjI3NDYxIDcuNjgxNDkgNy42OTQ2MUM3LjI2MTg5IDguMTE0NjEgNi45NDU4OSA4LjYyNjU5IDYuNzU4NTYgOS4xODk5NUw2LjE2MDc5IDEwLjc2NUw1LjY0NzU5IDkuMTg4OEM1LjQ2MzMzIDguNjI1NDIgNS4xNTAyNSA4LjExMjc1IDQuNzMzMjEgNy42OTE1MUM0LjMxMTc3IDcuMjcwNDQgMy43OTg0OSA2Ljk1Mjc2IDMuMjMzNjMgNi43NjM0MUwxLjY1ODYxIDYuMTY2NzhMMy4yNDI3NyA1LjY1MjQ0QzMuNzk5MDEgNS40NTk4NiA0LjMwMzQ5IDUuMTQxOTIgNC43MTcyMSA0LjcyMzJDNS4xMjc3OSA0LjMwMjgxIDUuNDM3NjkgMy43OTQ3OSA1LjYyMzU5IDMuMjM3MzRaTTEyLjU0MDkgMTYuMzMyNEMxMi42NTc4IDE2LjQxNDYgMTIuNzkyMiAxNi40Njg1IDEyLjkzMzUgMTYuNDg5N0MxMy4wNzQ5IDE2LjUxMSAxMy4yMTkyIDE2LjQ5OTEgMTMuMzU1MSAxNi40NTVDMTMuNDkxMSAxNi40MTA5IDEzLjYxNDkgMTYuMzM1NyAxMy43MTY4IDE2LjIzNTVDMTMuODE4NiAxNi4xMzUyIDEzLjg5NTggMTYuMDEyNyAxMy45NDIyIDE1Ljg3NzVMMTQuMjI1NiAxNS4wMDY1QzE0LjI4NjYgMTQuODI1OSAxNC4zODgzIDE0LjY2MTcgMTQuNTIyOCAxNC41MjY1QzE0LjY1NzcgMTQuMzg5MyAxNC44MjIyIDE0LjI4ODggMTUuMDAyOCAxNC4yMjkzTDE1Ljg4NTIgMTMuOTQxM0MxNi4wNjczIDEzLjg3ODQgMTYuMjI0OSAxMy43NTk3IDE2LjMzNTUgMTMuNjAyQzE2LjQ0NjEgMTMuNDQ0MyAxNi41MDQxIDEzLjI1NTcgMTYuNTAxMiAxMy4wNjMxQzE2LjQ5ODIgMTIuODcwNSAxNi40MzQ2IDEyLjY4MzggMTYuMzE5MyAxMi41Mjk1QzE2LjIwMzkgMTIuMzc1MiAxNi4wNDI4IDEyLjI2MTMgMTUuODU4OSAxMi4yMDRMMTQuOTg1NyAxMS45MTgyQzE0LjgwNDkgMTEuODU4MSAxNC42NDA2IDExLjc1NjkgMTQuNTA1NyAxMS42MjI0QzE0LjM3MDkgMTEuNDg3OSAxNC4yNjkxIDExLjMyMzkgMTQuMjA4NSAxMS4xNDMzTDEzLjkyMDQgMTAuMjU5OEMxMy44NTg2IDEwLjA3ODEgMTMuNzQxMSA5LjkyMDQxIDEzLjU4NDcgOS44MDkxOEMxMy40MjgyIDkuNjk3OTUgMTMuMjQwOCA5LjYzODc3IDEzLjA0ODggOS42NDAwM0MxMi44NTY4IDkuNjQxMyAxMi42NzAyIDkuNzAyOTQgMTIuNTE1MiA5LjgxNjIyQzEyLjM2MDIgOS45Mjk1MSAxMi4yNDQ5IDEwLjA4ODcgMTIuMTg1NCAxMC4yNzEyTDExLjkwMzEgMTEuMTQyMUMxMS44NDQ5IDExLjMyMTQgMTEuNzQ2IDExLjQ4NDggMTEuNjE0MSAxMS42MTk0QzExLjQ4MjMgMTEuNzU0IDExLjMyMSAxMS44NTYzIDExLjE0MyAxMS45MTgyTDEwLjI1OTUgMTIuMjA2M0MxMC4wNzc3IDEyLjI2NzkgOS45MTk5IDEyLjM4NTEgOS44MDg0NyAxMi41NDE0QzkuNjk3MDMgMTIuNjk3NyA5LjYzNzYxIDEyLjg4NTEgOS42Mzg2MyAxMy4wNzcxQzkuNjM5NjQgMTMuMjY5IDkuNzAxMDMgMTMuNDU1OCA5LjgxNDExIDEzLjYxMDlDOS45MjcxOCAxMy43NjYgMTAuMDg2MiAxMy44ODE2IDEwLjI2ODYgMTMuOTQxM0wxMS4xNDA3IDE0LjIyMzZDMTEuMzIzNiAxNC4yODUzIDExLjQ4ODIgMTQuMzg3MSAxMS42MjMxIDE0LjUyMTlDMTEuNzU5MSAxNC42NTc5IDExLjg1OTcgMTQuODIyNSAxMS45MTc5IDE1LjAwNDNMMTIuMjA3MSAxNS44ODg5QzEyLjI2OTcgMTYuMDY3OCAxMi4zODY0IDE2LjIyMjcgMTIuNTQwOSAxNi4zMzI0Wk0xMS40OTczIDEzLjE0MDFMMTEuMjkyNyAxMy4wNzM4TDExLjUwMyAxMy4wMDA2QzExLjg0ODggMTIuODc5MSAxMi4xNjIzIDEyLjY4MDQgMTIuNDE5OCAxMi40MTk2QzEyLjY3NzMgMTIuMTU4NyAxMi44NzE5IDExLjg0MjYgMTIuOTg4OSAxMS40OTUzTDEzLjA1NTIgMTEuMjkxOUwxMy4xMjM4IDExLjQ5ODhDMTMuMjQwMyAxMS44NDkxIDEzLjQzNjkgMTIuMTY3NSAxMy42OTgxIDEyLjQyODZDMTMuOTU5MiAxMi42ODk3IDE0LjI3NzUgMTIuODg2NCAxNC42Mjc5IDEzLjAwMjlMMTQuODUwOCAxMy4wNzQ5TDE0LjY0NTEgMTMuMTQzNUMxNC4yOTM5IDEzLjI2MDIgMTMuOTc0OSAxMy40NTc0IDEzLjcxMzUgMTMuNzE5M0MxMy40NTIxIDEzLjk4MTMgMTMuMjU1NyAxNC4zMDA4IDEzLjEzOTggMTQuNjUyMkwxMy4wNzI0IDE0Ljg1OTFMMTMuMDA2MSAxNC42NTM0QzEyLjg5MDQgMTQuMzAwOSAxMi42OTM2IDEzLjk4MDQgMTIuNDMxNiAxMy43MTc4QzEyLjE2OTUgMTMuNDU1MiAxMS44NDk2IDEzLjI1NzcgMTEuNDk3MyAxMy4xNDEyVjEzLjE0MDFaIiBmaWxsPSJjdXJyZW50Q29sb3IiLz4KPC9zdmc+Cg==";
var iconInvalidCode = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTMiIHZpZXdCb3g9IjAgMCAxNCAxMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYuNDk5ODMgNy45OTk5NlY1LjQ5OTk2QzYuNDk5ODMgNS4zNjczNSA2LjU1MjUxIDUuMjQwMTcgNi42NDYyNyA1LjE0NjQxQzYuNzQwMDQgNS4wNTI2NCA2Ljg2NzIyIDQuOTk5OTYgNi45OTk4MyA0Ljk5OTk2QzcuMTMyNDQgNC45OTk5NiA3LjI1OTYxIDUuMDUyNjQgNy4zNTMzOCA1LjE0NjQxQzcuNDQ3MTUgNS4yNDAxNyA3LjQ5OTgzIDUuMzY3MzUgNy40OTk4MyA1LjQ5OTk2VjcuOTk5OTZDNy40OTk4MyA4LjEzMjU3IDcuNDQ3MTUgOC4yNTk3NSA3LjM1MzM4IDguMzUzNTFDNy4yNTk2MSA4LjQ0NzI4IDcuMTMyNDQgOC40OTk5NiA2Ljk5OTgzIDguNDk5OTZDNi44NjcyMiA4LjQ5OTk2IDYuNzQwMDQgOC40NDcyOCA2LjY0NjI3IDguMzUzNTFDNi41NTI1MSA4LjI1OTc1IDYuNDk5ODMgOC4xMzI1NyA2LjQ5OTgzIDcuOTk5OTZaTTEzLjc5OTggMTIuMjVDMTMuNjY4NiAxMi40Nzg2IDEzLjQ3OTIgMTIuNjY4NCAxMy4yNTA5IDEyLjgwMDFDMTMuMDIyNSAxMi45MzE4IDEyLjc2MzQgMTMuMDAwOCAxMi40OTk4IDEzSDEuNDk5ODNDMS4yMzYyMyAxMy4wMDA5IDAuOTc3MDU5IDEyLjkzMjIgMC43NDg2NDIgMTIuODAwNkMwLjUyMDIyNiAxMi42NjkgMC4zMzA2OTUgMTIuNDc5MyAwLjE5OTI5NyAxMi4yNTA4QzAuMDY3ODk4OCAxMi4wMjIzIC0wLjAwMDY4NzI5IDExLjc2MzEgMC4wMDA1MDM1MjcgMTEuNDk5NUMwLjAwMTY5NDM0IDExLjIzNTkgMC4wNzI2MTk2IDEwLjk3NzMgMC4yMDYwNzcgMTAuNzVMNS42OTk4MyAxLjI0OTk2QzUuODMxMzUgMS4wMjE0OCA2LjAyMDc3IDAuODMxNjk3IDYuMjQ4OTkgMC42OTk3MzVDNi40NzcyMiAwLjU2Nzc3MiA2LjczNjIgMC40OTgyOTEgNi45OTk4MyAwLjQ5ODI5MUM3LjI2MzQ2IDAuNDk4MjkxIDcuNTIyNDMgMC41Njc3NzIgNy43NTA2NiAwLjY5OTczNUM3Ljk3ODg5IDAuODMxNjk3IDguMTY4MzEgMS4wMjE0OCA4LjI5OTgzIDEuMjQ5OTZMMTMuNzkzNiAxMC43NUMxMy45MjggMTAuOTc2OCAxMy45OTk1IDExLjIzNTQgMTQuMDAwNiAxMS40OTkxQzE0LjAwMTcgMTEuNzYyOCAxMy45MzI0IDEyLjAyMiAxMy43OTk4IDEyLjI1Wk0xMi45MzExIDExLjI1TDcuNDMxMDggMS43NDk5NkM3LjM4Njk2IDEuNjc0NzcgNy4zMjM5NiAxLjYxMjQyIDcuMjQ4MzEgMS41NjkxQzcuMTcyNjYgMS41MjU3OCA3LjA4NyAxLjUwMjk5IDYuOTk5ODMgMS41MDI5OUM2LjkxMjY1IDEuNTAyOTkgNi44MjY5OSAxLjUyNTc4IDYuNzUxMzUgMS41NjkxQzYuNjc1NyAxLjYxMjQyIDYuNjEyNjkgMS42NzQ3NyA2LjU2ODU4IDEuNzQ5OTZMMS4wNjg1OCAxMS4yNUMxLjAyMzQzIDExLjMyNTUgMC45OTk1OTQgMTEuNDExOSAwLjk5OTU5NCAxMS41QzAuOTk5NTk0IDExLjU4OCAxLjAyMzQzIDExLjY3NDQgMS4wNjg1OCAxMS43NUMxLjExMTgyIDExLjgyNjEgMS4xNzQ1NSAxMS44ODk0IDEuMjUwMzQgMTEuOTMzNEMxLjMyNjEyIDExLjk3NzMgMS40MTIyMyAxMi4wMDAzIDEuNDk5ODMgMTJIMTIuNDk5OEMxMi41ODc0IDEyLjAwMDMgMTIuNjczNSAxMS45NzczIDEyLjc0OTMgMTEuOTMzNEMxMi44MjUxIDExLjg4OTQgMTIuODg3OCAxMS44MjYxIDEyLjkzMTEgMTEuNzVDMTIuOTc2MiAxMS42NzQ0IDEzLjAwMDEgMTEuNTg4IDEzLjAwMDEgMTEuNUMxMy4wMDAxIDExLjQxMTkgMTIuOTc2MiAxMS4zMjU1IDEyLjkzMTEgMTEuMjVaTTYuOTk5ODMgOS40OTk5NkM2Ljg1MTQ5IDkuNDk5OTYgNi43MDY0OSA5LjU0Mzk1IDYuNTgzMTUgOS42MjYzNkM2LjQ1OTgxIDkuNzA4NzcgNi4zNjM2OCA5LjgyNTkgNi4zMDY5MiA5Ljk2Mjk1QzYuMjUwMTUgMTAuMSA2LjIzNTMgMTAuMjUwOCA2LjI2NDI0IDEwLjM5NjNDNi4yOTMxOCAxMC41NDE4IDYuMzY0NjEgMTAuNjc1NCA2LjQ2OTUgMTAuNzgwM0M2LjU3NDM5IDEwLjg4NTIgNi43MDgwMiAxMC45NTY2IDYuODUzNTEgMTAuOTg1NUM2Ljk5ODk5IDExLjAxNDUgNy4xNDk3OSAxMC45OTk2IDcuMjg2ODQgMTAuOTQyOUM3LjQyMzg4IDEwLjg4NjEgNy41NDEwMiAxMC43OSA3LjYyMzQzIDEwLjY2NjZDNy43MDU4NCAxMC41NDMzIDcuNzQ5ODMgMTAuMzk4MyA3Ljc0OTgzIDEwLjI1QzcuNzQ5ODMgMTAuMDUxIDcuNjcwODEgOS44NjAyOCA3LjUzMDE2IDkuNzE5NjNDNy4zODk1IDkuNTc4OTggNy4xOTg3NCA5LjQ5OTk2IDYuOTk5ODMgOS40OTk5NloiIGZpbGw9ImN1cnJlbnRDb2xvciIvPgo8L3N2Zz4K";
var passkeyArrow = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjYiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA2NiA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQ0Ljg3NSAzNi4yNUg2MS44NzVNNjEuODc1IDM2LjI1TDU2LjY0NDIgMzAuNzVNNjEuODc1IDM2LjI1TDU2LjY0NDIgNDEuNzUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTkuNzUgMjIuNzVDMjQuOTI3NyAyMi43NSAyOS4xMjUgMTguNTUyNyAyOS4xMjUgMTMuMzc1QzI5LjEyNSA4LjE5NzMzIDI0LjkyNzcgNCAxOS43NSA0QzE0LjU3MjMgNCAxMC4zNzUgOC4xOTczMyAxMC4zNzUgMTMuMzc1QzEwLjM3NSAxOC41NTI3IDE0LjU3MjMgMjIuNzUgMTkuNzUgMjIuNzVaIiBmaWxsPSJjdXJyZW50Q29sb3IiLz4KPHBhdGggZD0iTTQ0Ljc0OTggMjIuNzVDNDQuNzU0NCAyMS40NDQgNDQuNDA4MSAyMC4xNjA4IDQzLjc0NzIgMTkuMDM0NEM0My4wODYzIDE3LjkwOCA0Mi4xMzUgMTYuOTc5NyA0MC45OTI3IDE2LjM0NjdDMzkuODUwNCAxNS43MTM2IDM4LjU1OSAxNS4zOTkgMzcuMjUzNiAxNS40MzU2QzM1Ljk0ODEgMTUuNDcyMyAzNC42NzY0IDE1Ljg1ODkgMzMuNTcxNCAxNi41NTVDMzIuNDY2NSAxNy4yNTEyIDMxLjU2ODcgMTguMjMxMyAzMC45NzIgMTkuMzkzQzMwLjM3NTQgMjAuNTU0NyAzMC4xMDE2IDIxLjg1NTMgMzAuMTc5NSAyMy4xNTlDMzAuMjU3MyAyNC40NjI3IDMwLjY4MzggMjUuNzIxNSAzMS40MTQ1IDI2LjgwNEMzMi4xNDUyIDI3Ljg4NjQgMzMuMTUzMiAyOC43NTI4IDM0LjMzMzEgMjkuMzEyNVY0MC40NTgzTDM3LjQ1ODEgNDMuNTgzM0w0Mi42NjY1IDM4LjM3NUwzOS41NDE1IDM1LjI1TDQyLjY2NjUgMzIuMTI1TDQwLjA4MzEgMjkuNTQxN0M0MS40NTUxIDI5LjAxMjIgNDIuNjM1IDI4LjA4MDMgNDMuNDY3OCAyNi44NjgzQzQ0LjMwMDcgMjUuNjU2MiA0NC43NDc2IDI0LjIyMDYgNDQuNzQ5OCAyMi43NVpNMzcuNDU4MSAyMi43NUMzNy4wNDYxIDIyLjc1IDM2LjY0MzMgMjIuNjI3OCAzNi4zMDA3IDIyLjM5ODlDMzUuOTU4MSAyMi4xNyAzNS42OTExIDIxLjg0NDYgMzUuNTMzNCAyMS40NjM5QzM1LjM3NTcgMjEuMDgzMiAzNS4zMzQ0IDIwLjY2NDMgMzUuNDE0OCAyMC4yNjAyQzM1LjQ5NTIgMTkuODU2MSAzNS42OTM2IDE5LjQ4NDkgMzUuOTg1IDE5LjE5MzVDMzYuMjc2MyAxOC45MDIyIDM2LjY0NzYgMTguNzAzNyAzNy4wNTE3IDE4LjYyMzRDMzcuNDU1OCAxOC41NDMgMzcuODc0NyAxOC41ODQyIDM4LjI1NTQgMTguNzQxOUMzOC42MzYxIDE4Ljg5OTYgMzguOTYxNCAxOS4xNjY2IDM5LjE5MDQgMTkuNTA5MkMzOS40MTkzIDE5Ljg1MTggMzkuNTQxNSAyMC4yNTQ2IDM5LjU0MTUgMjAuNjY2N0MzOS41NDE1IDIxLjIxOTIgMzkuMzIyIDIxLjc0OTEgMzguOTMxMyAyMi4xMzk4QzM4LjU0MDYgMjIuNTMwNSAzOC4wMTA3IDIyLjc1IDM3LjQ1ODEgMjIuNzVaIiBmaWxsPSJjdXJyZW50Q29sb3IiLz4KPHBhdGggZD0iTTI3Ljk1ODMgMjYuOTU4M0MyNi4zNTg1IDI2LjI0NSAyNC42MjY2IDI1Ljg3NiAyMi44NzUgMjUuODc1SDE2LjYyNUMxMy4zMDk4IDI1Ljg3NSAxMC4xMzA0IDI3LjE5MiA3Ljc4NjE3IDI5LjUzNjJDNS40NDE5NiAzMS44ODA0IDQuMTI1IDM1LjA1OTggNC4xMjUgMzguMzc1VjQyLjU0MTdIMzEuMjA4M1YzMS4wNjI1QzI5LjgwMzQgMjkuOTgzMiAyOC42ODY5IDI4LjU3MzMgMjcuOTU4MyAyNi45NTgzWiIgZmlsbD0iY3VycmVudENvbG9yIi8+Cjwvc3ZnPgo=";
var success = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjgiIGhlaWdodD0iNjgiIHZpZXdCb3g9IjAgMCA2OCA2OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTM0LjAwMDEgMC42NjY2MjZDMTUuNjAwMSAwLjY2NjYyNiAwLjY2NjcxOCAxNS42IDAuNjY2NzE4IDM0QzAuNjY2NzE4IDUyLjQgMTUuNjAwMSA2Ny4zMzMzIDM0LjAwMDEgNjcuMzMzM0M1Mi40IDY3LjMzMzMgNjcuMzMzNCA1Mi40IDY3LjMzMzQgMzRDNjcuMzMzNCAxNS42IDUyLjQgMC42NjY2MjYgMzQuMDAwMSAwLjY2NjYyNlpNMjQuOTY2NyA0OC4zTDEzIDM2LjMzMzNDMTEuNzAwMSAzNS4wMzMzIDExLjcwMDEgMzIuOTMzMyAxMyAzMS42MzMzQzE0LjMgMzAuMzMzMyAxNi40MDAxIDMwLjMzMzMgMTcuNzAwMSAzMS42MzMzTDI3LjMzMzQgNDEuMjMzM0w1MC4yNjY3IDE4LjNDNTEuNTY2NyAxNyA1My42NjY3IDE3IDU0Ljk2NjcgMTguM0M1Ni4yNjY3IDE5LjYgNTYuMjY2NyAyMS43IDU0Ljk2NjcgMjNMMjkuNjY2NyA0OC4zQzI4LjQgNDkuNiAyNi4yNjY3IDQ5LjYgMjQuOTY2NyA0OC4zWiIgZmlsbD0iIzAwNzY2MiIvPgo8L3N2Zz4K";
var failure = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iNDAiIGZpbGw9IiNERDAwMzEiLz4KPG1hc2sgaWQ9InBhdGgtMi1pbnNpZGUtMV80MzVfNDM3NyIgZmlsbD0id2hpdGUiPgo8cGF0aCBkPSJNMjMuMjMgMjMuMjMwMUMyMy40NjIyIDIyLjk5NzMgMjMuNzM4MSAyMi44MTI1IDI0LjA0MTggMjIuNjg2NUMyNC4zNDU1IDIyLjU2MDUgMjQuNjcxMSAyMi40OTU2IDI1IDIyLjQ5NTZDMjUuMzI4OCAyMi40OTU2IDI1LjY1NDQgMjIuNTYwNSAyNS45NTgxIDIyLjY4NjVDMjYuMjYxOCAyMi44MTI1IDI2LjUzNzcgMjIuOTk3MyAyNi43NyAyMy4yMzAxTDQwIDM2LjQ2NTFMNTMuMjMgMjMuMjMwMUM1My40NjI0IDIyLjk5NzYgNTMuNzM4MyAyMi44MTMzIDU0LjA0MiAyMi42ODc1QzU0LjM0NTcgMjIuNTYxNyA1NC42NzEyIDIyLjQ5NjkgNTUgMjIuNDk2OUM1NS4zMjg3IDIyLjQ5NjkgNTUuNjU0MiAyMi41NjE3IDU1Ljk1NzkgMjIuNjg3NUM1Ni4yNjE2IDIyLjgxMzMgNTYuNTM3NSAyMi45OTc2IDU2Ljc3IDIzLjIzMDFDNTcuMDAyNCAyMy40NjI1IDU3LjE4NjggMjMuNzM4NSA1Ny4zMTI2IDI0LjA0MjJDNTcuNDM4NCAyNC4zNDU5IDU3LjUwMzEgMjQuNjcxNCA1Ny41MDMxIDI1LjAwMDFDNTcuNTAzMSAyNS4zMjg4IDU3LjQzODQgMjUuNjU0MyA1Ny4zMTI2IDI1Ljk1OEM1Ny4xODY4IDI2LjI2MTcgNTcuMDAyNCAyNi41Mzc2IDU2Ljc3IDI2Ljc3MDFMNDMuNTM1IDQwLjAwMDFMNTYuNzcgNTMuMjMwMUM1Ny4wMDI0IDUzLjQ2MjUgNTcuMTg2OCA1My43Mzg1IDU3LjMxMjYgNTQuMDQyMkM1Ny40Mzg0IDU0LjM0NTkgNTcuNTAzMSA1NC42NzE0IDU3LjUwMzEgNTUuMDAwMUM1Ny41MDMxIDU1LjMyODggNTcuNDM4NCA1NS42NTQzIDU3LjMxMjYgNTUuOTU4QzU3LjE4NjggNTYuMjYxNyA1Ny4wMDI0IDU2LjUzNzYgNTYuNzcgNTYuNzcwMUM1Ni41Mzc1IDU3LjAwMjUgNTYuMjYxNiA1Ny4xODY5IDU1Ljk1NzkgNTcuMzEyN0M1NS42NTQyIDU3LjQzODUgNTUuMzI4NyA1Ny41MDMyIDU1IDU3LjUwMzJDNTQuNjcxMiA1Ny41MDMyIDU0LjM0NTcgNTcuNDM4NSA1NC4wNDIgNTcuMzEyN0M1My43MzgzIDU3LjE4NjkgNTMuNDYyNCA1Ny4wMDI1IDUzLjIzIDU2Ljc3MDFMNDAgNDMuNTM1MUwyNi43NyA1Ni43NzAxQzI2LjUzNzUgNTcuMDAyNSAyNi4yNjE2IDU3LjE4NjkgMjUuOTU3OSA1Ny4zMTI3QzI1LjY1NDIgNTcuNDM4NSAyNS4zMjg3IDU3LjUwMzIgMjUgNTcuNTAzMkMyNC42NzEyIDU3LjUwMzIgMjQuMzQ1NyA1Ny40Mzg1IDI0LjA0MiA1Ny4zMTI3QzIzLjczODMgNTcuMTg2OSAyMy40NjI0IDU3LjAwMjUgMjMuMjMgNTYuNzcwMUMyMi45OTc1IDU2LjUzNzYgMjIuODEzMSA1Ni4yNjE3IDIyLjY4NzMgNTUuOTU4QzIyLjU2MTUgNTUuNjU0MyAyMi40OTY4IDU1LjMyODggMjIuNDk2OCA1NS4wMDAxQzIyLjQ5NjggNTQuNjcxNCAyMi41NjE1IDU0LjM0NTkgMjIuNjg3MyA1NC4wNDIyQzIyLjgxMzEgNTMuNzM4NSAyMi45OTc1IDUzLjQ2MjUgMjMuMjMgNTMuMjMwMUwzNi40NjUgNDAuMDAwMUwyMy4yMyAyNi43NzAxQzIyLjk5NzEgMjYuNTM3OCAyMi44MTI0IDI2LjI2MiAyMi42ODY0IDI1Ljk1ODJDMjIuNTYwNCAyNS42NTQ1IDIyLjQ5NTUgMjUuMzI4OSAyMi40OTU1IDI1LjAwMDFDMjIuNDk1NSAyNC42NzEyIDIyLjU2MDQgMjQuMzQ1NiAyMi42ODY0IDI0LjA0MTlDMjIuODEyNCAyMy43MzgyIDIyLjk5NzEgMjMuNDYyMyAyMy4yMyAyMy4yMzAxWiIvPgo8L21hc2s+CjxwYXRoIGQ9Ik0yMy4yMyAyMy4yMzAxQzIzLjQ2MjIgMjIuOTk3MyAyMy43MzgxIDIyLjgxMjUgMjQuMDQxOCAyMi42ODY1QzI0LjM0NTUgMjIuNTYwNSAyNC42NzExIDIyLjQ5NTYgMjUgMjIuNDk1NkMyNS4zMjg4IDIyLjQ5NTYgMjUuNjU0NCAyMi41NjA1IDI1Ljk1ODEgMjIuNjg2NUMyNi4yNjE4IDIyLjgxMjUgMjYuNTM3NyAyMi45OTczIDI2Ljc3IDIzLjIzMDFMNDAgMzYuNDY1MUw1My4yMyAyMy4yMzAxQzUzLjQ2MjQgMjIuOTk3NiA1My43MzgzIDIyLjgxMzMgNTQuMDQyIDIyLjY4NzVDNTQuMzQ1NyAyMi41NjE3IDU0LjY3MTIgMjIuNDk2OSA1NSAyMi40OTY5QzU1LjMyODcgMjIuNDk2OSA1NS42NTQyIDIyLjU2MTcgNTUuOTU3OSAyMi42ODc1QzU2LjI2MTYgMjIuODEzMyA1Ni41Mzc1IDIyLjk5NzYgNTYuNzcgMjMuMjMwMUM1Ny4wMDI0IDIzLjQ2MjUgNTcuMTg2OCAyMy43Mzg1IDU3LjMxMjYgMjQuMDQyMkM1Ny40Mzg0IDI0LjM0NTkgNTcuNTAzMSAyNC42NzE0IDU3LjUwMzEgMjUuMDAwMUM1Ny41MDMxIDI1LjMyODggNTcuNDM4NCAyNS42NTQzIDU3LjMxMjYgMjUuOTU4QzU3LjE4NjggMjYuMjYxNyA1Ny4wMDI0IDI2LjUzNzYgNTYuNzcgMjYuNzcwMUw0My41MzUgNDAuMDAwMUw1Ni43NyA1My4yMzAxQzU3LjAwMjQgNTMuNDYyNSA1Ny4xODY4IDUzLjczODUgNTcuMzEyNiA1NC4wNDIyQzU3LjQzODQgNTQuMzQ1OSA1Ny41MDMxIDU0LjY3MTQgNTcuNTAzMSA1NS4wMDAxQzU3LjUwMzEgNTUuMzI4OCA1Ny40Mzg0IDU1LjY1NDMgNTcuMzEyNiA1NS45NThDNTcuMTg2OCA1Ni4yNjE3IDU3LjAwMjQgNTYuNTM3NiA1Ni43NyA1Ni43NzAxQzU2LjUzNzUgNTcuMDAyNSA1Ni4yNjE2IDU3LjE4NjkgNTUuOTU3OSA1Ny4zMTI3QzU1LjY1NDIgNTcuNDM4NSA1NS4zMjg3IDU3LjUwMzIgNTUgNTcuNTAzMkM1NC42NzEyIDU3LjUwMzIgNTQuMzQ1NyA1Ny40Mzg1IDU0LjA0MiA1Ny4zMTI3QzUzLjczODMgNTcuMTg2OSA1My40NjI0IDU3LjAwMjUgNTMuMjMgNTYuNzcwMUw0MCA0My41MzUxTDI2Ljc3IDU2Ljc3MDFDMjYuNTM3NSA1Ny4wMDI1IDI2LjI2MTYgNTcuMTg2OSAyNS45NTc5IDU3LjMxMjdDMjUuNjU0MiA1Ny40Mzg1IDI1LjMyODcgNTcuNTAzMiAyNSA1Ny41MDMyQzI0LjY3MTIgNTcuNTAzMiAyNC4zNDU3IDU3LjQzODUgMjQuMDQyIDU3LjMxMjdDMjMuNzM4MyA1Ny4xODY5IDIzLjQ2MjQgNTcuMDAyNSAyMy4yMyA1Ni43NzAxQzIyLjk5NzUgNTYuNTM3NiAyMi44MTMxIDU2LjI2MTcgMjIuNjg3MyA1NS45NThDMjIuNTYxNSA1NS42NTQzIDIyLjQ5NjggNTUuMzI4OCAyMi40OTY4IDU1LjAwMDFDMjIuNDk2OCA1NC42NzE0IDIyLjU2MTUgNTQuMzQ1OSAyMi42ODczIDU0LjA0MjJDMjIuODEzMSA1My43Mzg1IDIyLjk5NzUgNTMuNDYyNSAyMy4yMyA1My4yMzAxTDM2LjQ2NSA0MC4wMDAxTDIzLjIzIDI2Ljc3MDFDMjIuOTk3MSAyNi41Mzc4IDIyLjgxMjQgMjYuMjYyIDIyLjY4NjQgMjUuOTU4MkMyMi41NjA0IDI1LjY1NDUgMjIuNDk1NSAyNS4zMjg5IDIyLjQ5NTUgMjUuMDAwMUMyMi40OTU1IDI0LjY3MTIgMjIuNTYwNCAyNC4zNDU2IDIyLjY4NjQgMjQuMDQxOUMyMi44MTI0IDIzLjczODIgMjIuOTk3MSAyMy40NjIzIDIzLjIzIDIzLjIzMDFaIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjQwIiBtYXNrPSJ1cmwoI3BhdGgtMi1pbnNpZGUtMV80MzVfNDM3NykiLz4KPC9zdmc+Cg==";
var poweredByPassage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMTQwIDE2IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMS41NTY4MiAxMlYzLjI3MjczSDQuNTA1NjhDNS4xOTAzNCAzLjI3MjczIDUuNzUgMy4zOTYzMSA2LjE4NDY2IDMuNjQzNDdDNi42MjIxNiAzLjg4Nzc4IDYuOTQ2MDIgNC4yMTg3NSA3LjE1NjI1IDQuNjM2MzZDNy4zNjY0OCA1LjA1Mzk4IDcuNDcxNTkgNS41MTk4OSA3LjQ3MTU5IDYuMDM0MDlDNy40NzE1OSA2LjU0ODMgNy4zNjY0OCA3LjAxNTYyIDcuMTU2MjUgNy40MzYwOEM2Ljk0ODg2IDcuODU2NTMgNi42Mjc4NCA4LjE5MTc2IDYuMTkzMTggOC40NDE3NkM1Ljc1ODUyIDguNjg4OTIgNS4yMDE3IDguODEyNSA0LjUyMjczIDguODEyNUgyLjQwOTA5VjcuODc1SDQuNDg4NjRDNC45NTczOSA3Ljg3NSA1LjMzMzgxIDcuNzk0MDMgNS42MTc5IDcuNjMyMUM1LjkwMTk5IDcuNDcwMTcgNi4xMDc5NSA3LjI1MTQyIDYuMjM1OCA2Ljk3NTg1QzYuMzY2NDggNi42OTc0NCA2LjQzMTgyIDYuMzgzNTIgNi40MzE4MiA2LjAzNDA5QzYuNDMxODIgNS42ODQ2NiA2LjM2NjQ4IDUuMzcyMTYgNi4yMzU4IDUuMDk2NTlDNi4xMDc5NSA0LjgyMTAyIDUuOTAwNTcgNC42MDUxMSA1LjYxMzY0IDQuNDQ4ODZDNS4zMjY3IDQuMjg5NzcgNC45NDYwMiA0LjIxMDIzIDQuNDcxNTkgNC4yMTAyM0gyLjYxMzY0VjEySDEuNTU2ODJaTTExLjYyNjQgMTIuMTM2NEMxMS4wMzU1IDEyLjEzNjQgMTAuNTE3IDExLjk5NTcgMTAuMDcxIDExLjcxNDVDOS42Mjc4NCAxMS40MzMyIDkuMjgxMjUgMTEuMDM5OCA5LjAzMTI1IDEwLjUzNDFDOC43ODQwOSAxMC4wMjg0IDguNjYwNTEgOS40Mzc1IDguNjYwNTEgOC43NjEzNkM4LjY2MDUxIDguMDc5NTUgOC43ODQwOSA3LjQ4NDM3IDkuMDMxMjUgNi45NzU4NUM5LjI4MTI1IDYuNDY3MzMgOS42Mjc4NCA2LjA3MjQ0IDEwLjA3MSA1Ljc5MTE5QzEwLjUxNyA1LjUwOTk0IDExLjAzNTUgNS4zNjkzMiAxMS42MjY0IDUuMzY5MzJDMTIuMjE3MyA1LjM2OTMyIDEyLjczNDQgNS41MDk5NCAxMy4xNzc2IDUuNzkxMTlDMTMuNjIzNiA2LjA3MjQ0IDEzLjk3MDIgNi40NjczMyAxNC4yMTczIDYuOTc1ODVDMTQuNDY3MyA3LjQ4NDM3IDE0LjU5MjMgOC4wNzk1NSAxNC41OTIzIDguNzYxMzZDMTQuNTkyMyA5LjQzNzUgMTQuNDY3MyAxMC4wMjg0IDE0LjIxNzMgMTAuNTM0MUMxMy45NzAyIDExLjAzOTggMTMuNjIzNiAxMS40MzMyIDEzLjE3NzYgMTEuNzE0NUMxMi43MzQ0IDExLjk5NTcgMTIuMjE3MyAxMi4xMzY0IDExLjYyNjQgMTIuMTM2NFpNMTEuNjI2NCAxMS4yMzNDMTIuMDc1MyAxMS4yMzMgMTIuNDQ0NiAxMS4xMTc5IDEyLjczNDQgMTAuODg3OEMxMy4wMjQxIDEwLjY1NzcgMTMuMjM4NiAxMC4zNTUxIDEzLjM3NzggOS45ODAxMUMxMy41MTcgOS42MDUxMSAxMy41ODY2IDkuMTk4ODYgMTMuNTg2NiA4Ljc2MTM2QzEzLjU4NjYgOC4zMjM4NiAxMy41MTcgNy45MTYxOSAxMy4zNzc4IDcuNTM4MzVDMTMuMjM4NiA3LjE2MDUxIDEzLjAyNDEgNi44NTUxMSAxMi43MzQ0IDYuNjIyMTZDMTIuNDQ0NiA2LjM4OTIgMTIuMDc1MyA2LjI3MjczIDExLjYyNjQgNi4yNzI3M0MxMS4xNzc2IDYuMjcyNzMgMTAuODA4MiA2LjM4OTIgMTAuNTE4NSA2LjYyMjE2QzEwLjIyODcgNi44NTUxMSAxMC4wMTQyIDcuMTYwNTEgOS44NzUgNy41MzgzNUM5LjczNTggNy45MTYxOSA5LjY2NjE5IDguMzIzODYgOS42NjYxOSA4Ljc2MTM2QzkuNjY2MTkgOS4xOTg4NiA5LjczNTggOS42MDUxMSA5Ljg3NSA5Ljk4MDExQzEwLjAxNDIgMTAuMzU1MSAxMC4yMjg3IDEwLjY1NzcgMTAuNTE4NSAxMC44ODc4QzEwLjgwODIgMTEuMTE3OSAxMS4xNzc2IDExLjIzMyAxMS42MjY0IDExLjIzM1pNMTcuMzg3OCAxMkwxNS4zOTM1IDUuNDU0NTVIMTYuNDUwM0wxNy44NjUxIDEwLjQ2NTlIMTcuOTMzMkwxOS4zMzEgNS40NTQ1NUgyMC40MDQ4TDIxLjc4NTUgMTAuNDQ4OUgyMS44NTM3TDIzLjI2ODUgNS40NTQ1NUgyNC4zMjUzTDIyLjMzMSAxMkgyMS4zNDIzTDE5LjkxMDUgNi45NzE1OUgxOS44MDgyTDE4LjM3NjQgMTJIMTcuMzg3OFpNMjguMTc2NSAxMi4xMzY0QzI3LjU0NTggMTIuMTM2NCAyNy4wMDE4IDExLjk5NzIgMjYuNTQ0NCAxMS43MTg4QzI2LjA4OTggMTEuNDM3NSAyNS43MzkgMTEuMDQ1NSAyNS40OTE4IDEwLjU0MjZDMjUuMjQ3NSAxMC4wMzY5IDI1LjEyNTQgOS40NDg4NiAyNS4xMjU0IDguNzc4NDFDMjUuMTI1NCA4LjEwNzk1IDI1LjI0NzUgNy41MTcwNSAyNS40OTE4IDcuMDA1NjhDMjUuNzM5IDYuNDkxNDggMjYuMDgyNyA2LjA5MDkxIDI2LjUyMzEgNS44MDM5OEMyNi45NjYzIDUuNTE0MiAyNy40ODMzIDUuMzY5MzIgMjguMDc0MiA1LjM2OTMyQzI4LjQxNTEgNS4zNjkzMiAyOC43NTE4IDUuNDI2MTQgMjkuMDg0MiA1LjUzOTc3QzI5LjQxNjUgNS42NTM0MSAyOS43MTkxIDUuODM4MDcgMjkuOTkxOCA2LjA5Mzc1QzMwLjI2NDYgNi4zNDY1OSAzMC40ODE5IDYuNjgxODIgMzAuNjQzOCA3LjA5OTQzQzMwLjgwNTggNy41MTcwNSAzMC44ODY3IDguMDMxMjUgMzAuODg2NyA4LjY0MjA1VjkuMDY4MThIMjUuODQxM1Y4LjE5ODg2SDI5Ljg2NEMyOS44NjQgNy44Mjk1NSAyOS43OTAxIDcuNSAyOS42NDI0IDcuMjEwMjNDMjkuNDk3NSA2LjkyMDQ1IDI5LjI5MDEgNi42OTE3NiAyOS4wMjAyIDYuNTI0MTVDMjguNzUzMiA2LjM1NjUzIDI4LjQzNzkgNi4yNzI3MyAyOC4wNzQyIDYuMjcyNzNDMjcuNjczNyA2LjI3MjczIDI3LjMyNzEgNi4zNzIxNiAyNy4wMzQ0IDYuNTcxMDJDMjYuNzQ0NyA2Ljc2NzA1IDI2LjUyMTcgNy4wMjI3MyAyNi4zNjU0IDcuMzM4MDdDMjYuMjA5MiA3LjY1MzQxIDI2LjEzMSA3Ljk5MTQ4IDI2LjEzMSA4LjM1MjI3VjguOTMxODJDMjYuMTMxIDkuNDI2MTQgMjYuMjE2MyA5Ljg0NTE3IDI2LjM4NjcgMTAuMTg4OUMyNi41NiAxMC41Mjk4IDI2LjgwMDEgMTAuNzg5OCAyNy4xMDY5IDEwLjk2ODhDMjcuNDEzNyAxMS4xNDQ5IDI3Ljc3MDIgMTEuMjMzIDI4LjE3NjUgMTEuMjMzQzI4LjQ0MDcgMTEuMjMzIDI4LjY3OTMgMTEuMTk2IDI4Ljg5MjQgMTEuMTIyMkMyOS4xMDgzIDExLjA0NTUgMjkuMjk0NCAxMC45MzE4IDI5LjQ1MDYgMTAuNzgxMkMyOS42MDY5IDEwLjYyNzggMjkuNzI3NiAxMC40Mzc1IDI5LjgxMjkgMTAuMjEwMkwzMC43ODQ0IDEwLjQ4M0MzMC42ODIyIDEwLjgxMjUgMzAuNTEwMyAxMS4xMDIzIDMwLjI2ODggMTEuMzUyM0MzMC4wMjczIDExLjU5OTQgMjkuNzI5IDExLjc5MjYgMjkuMzczOSAxMS45MzE4QzI5LjAxODggMTIuMDY4MiAyOC42MTk3IDEyLjEzNjQgMjguMTc2NSAxMi4xMzY0Wk0zMi40MTY1IDEyVjUuNDU0NTVIMzMuMzg4MVY2LjQ0MzE4SDMzLjQ1NjNDMzMuNTc1NiA2LjExOTMyIDMzLjc5MTUgNS44NTY1MyAzNC4xMDQgNS42NTQ4M0MzNC40MTY1IDUuNDUzMTIgMzQuNzY4OCA1LjM1MjI3IDM1LjE2MDkgNS4zNTIyN0MzNS4yMzQ3IDUuMzUyMjcgMzUuMzI3MSA1LjM1MzY5IDM1LjQzNzkgNS4zNTY1M0MzNS41NDg3IDUuMzU5MzcgMzUuNjMyNSA1LjM2MzY0IDM1LjY4OTMgNS4zNjkzMlY2LjM5MjA1QzM1LjY1NTIgNi4zODM1MiAzNS41NzcxIDYuMzcwNzQgMzUuNDU0OSA2LjM1MzY5QzM1LjMzNTYgNi4zMzM4MSAzNS4yMDkyIDYuMzIzODYgMzUuMDc1NiA2LjMyMzg2QzM0Ljc1NzUgNi4zMjM4NiAzNC40NzM0IDYuMzkwNjIgMzQuMjIzNCA2LjUyNDE1QzMzLjk3NjIgNi42NTQ4MyAzMy43ODAyIDYuODM2NjUgMzMuNjM1MyA3LjA2OTZDMzMuNDkzMyA3LjI5OTcyIDMzLjQyMjIgNy41NjI1IDMzLjQyMjIgNy44NTc5NVYxMkgzMi40MTY1Wk0zOS40MjY1IDEyLjEzNjRDMzguNzk1OCAxMi4xMzY0IDM4LjI1MTggMTEuOTk3MiAzNy43OTQ0IDExLjcxODhDMzcuMzM5OCAxMS40Mzc1IDM2Ljk4OSAxMS4wNDU1IDM2Ljc0MTggMTAuNTQyNkMzNi40OTc1IDEwLjAzNjkgMzYuMzc1NCA5LjQ0ODg2IDM2LjM3NTQgOC43Nzg0MUMzNi4zNzU0IDguMTA3OTUgMzYuNDk3NSA3LjUxNzA1IDM2Ljc0MTggNy4wMDU2OEMzNi45ODkgNi40OTE0OCAzNy4zMzI3IDYuMDkwOTEgMzcuNzczMSA1LjgwMzk4QzM4LjIxNjMgNS41MTQyIDM4LjczMzMgNS4zNjkzMiAzOS4zMjQyIDUuMzY5MzJDMzkuNjY1MSA1LjM2OTMyIDQwLjAwMTggNS40MjYxNCA0MC4zMzQyIDUuNTM5NzdDNDAuNjY2NSA1LjY1MzQxIDQwLjk2OTEgNS44MzgwNyA0MS4yNDE4IDYuMDkzNzVDNDEuNTE0NiA2LjM0NjU5IDQxLjczMTkgNi42ODE4MiA0MS44OTM4IDcuMDk5NDNDNDIuMDU1OCA3LjUxNzA1IDQyLjEzNjcgOC4wMzEyNSA0Mi4xMzY3IDguNjQyMDVWOS4wNjgxOEgzNy4wOTEzVjguMTk4ODZINDEuMTE0QzQxLjExNCA3LjgyOTU1IDQxLjA0MDEgNy41IDQwLjg5MjQgNy4yMTAyM0M0MC43NDc1IDYuOTIwNDUgNDAuNTQwMSA2LjY5MTc2IDQwLjI3MDIgNi41MjQxNUM0MC4wMDMyIDYuMzU2NTMgMzkuNjg3OSA2LjI3MjczIDM5LjMyNDIgNi4yNzI3M0MzOC45MjM3IDYuMjcyNzMgMzguNTc3MSA2LjM3MjE2IDM4LjI4NDQgNi41NzEwMkMzNy45OTQ3IDYuNzY3MDUgMzcuNzcxNyA3LjAyMjczIDM3LjYxNTQgNy4zMzgwN0MzNy40NTkyIDcuNjUzNDEgMzcuMzgxIDcuOTkxNDggMzcuMzgxIDguMzUyMjdWOC45MzE4MkMzNy4zODEgOS40MjYxNCAzNy40NjYzIDkuODQ1MTcgMzcuNjM2NyAxMC4xODg5QzM3LjgxIDEwLjUyOTggMzguMDUwMSAxMC43ODk4IDM4LjM1NjkgMTAuOTY4OEMzOC42NjM3IDExLjE0NDkgMzkuMDIwMiAxMS4yMzMgMzkuNDI2NSAxMS4yMzNDMzkuNjkwNyAxMS4yMzMgMzkuOTI5MyAxMS4xOTYgNDAuMTQyNCAxMS4xMjIyQzQwLjM1ODMgMTEuMDQ1NSA0MC41NDQ0IDEwLjkzMTggNDAuNzAwNiAxMC43ODEyQzQwLjg1NjkgMTAuNjI3OCA0MC45Nzc2IDEwLjQzNzUgNDEuMDYyOSAxMC4yMTAyTDQyLjAzNDQgMTAuNDgzQzQxLjkzMjIgMTAuODEyNSA0MS43NjAzIDExLjEwMjMgNDEuNTE4OCAxMS4zNTIzQzQxLjI3NzMgMTEuNTk5NCA0MC45NzkgMTEuNzkyNiA0MC42MjM5IDExLjkzMThDNDAuMjY4OCAxMi4wNjgyIDM5Ljg2OTcgMTIuMTM2NCAzOS40MjY1IDEyLjEzNjRaTTQ2LjEzODEgMTIuMTM2NEM0NS41OTI3IDEyLjEzNjQgNDUuMTExMiAxMS45OTg2IDQ0LjY5MzUgMTEuNzIzQzQ0LjI3NTkgMTEuNDQ0NiA0My45NDkyIDExLjA1MjYgNDMuNzEzNCAxMC41NDY5QzQzLjQ3NzYgMTAuMDM4NCA0My4zNTk3IDkuNDM3NSA0My4zNTk3IDguNzQ0MzJDNDMuMzU5NyA4LjA1NjgyIDQzLjQ3NzYgNy40NjAyMyA0My43MTM0IDYuOTU0NTVDNDMuOTQ5MiA2LjQ0ODg2IDQ0LjI3NzMgNi4wNTgyNCA0NC42OTc4IDUuNzgyNjdDNDUuMTE4MyA1LjUwNzEgNDUuNjA0IDUuMzY5MzIgNDYuMTU1MiA1LjM2OTMyQzQ2LjU4MTMgNS4zNjkzMiA0Ni45MTggNS40NDAzNCA0Ny4xNjUxIDUuNTgyMzlDNDcuNDE1MSA1LjcyMTU5IDQ3LjYwNTUgNS44ODA2OCA0Ny43MzYyIDYuMDU5NjZDNDcuODY5NyA2LjIzNTggNDcuOTczNCA2LjM4MDY4IDQ4LjA0NzIgNi40OTQzMkg0OC4xMzI1VjMuMjcyNzNINDkuMTM4MVYxMkg0OC4xNjY1VjEwLjk5NDNINDguMDQ3MkM0Ny45NzM0IDExLjExMzYgNDcuODY4MyAxMS4yNjQyIDQ3LjczMTkgMTEuNDQ2QzQ3LjU5NTUgMTEuNjI1IDQ3LjQwMDkgMTEuNzg1NSA0Ny4xNDgxIDExLjkyNzZDNDYuODk1MiAxMi4wNjY4IDQ2LjU1ODYgMTIuMTM2NCA0Ni4xMzgxIDEyLjEzNjRaTTQ2LjI3NDUgMTEuMjMzQzQ2LjY3NzkgMTEuMjMzIDQ3LjAxODggMTEuMTI3OCA0Ny4yOTcyIDEwLjkxNzZDNDcuNTc1NiAxMC43MDQ1IDQ3Ljc4NzMgMTAuNDEwNSA0Ny45MzIyIDEwLjAzNTVDNDguMDc3MSA5LjY1NzY3IDQ4LjE0OTUgOS4yMjE1OSA0OC4xNDk1IDguNzI3MjdDNDguMTQ5NSA4LjIzODY0IDQ4LjA3ODUgNy44MTEwOCA0Ny45MzY0IDcuNDQ0NkM0Ny43OTQ0IDcuMDc1MjggNDcuNTg0MiA2Ljc4ODM1IDQ3LjMwNTggNi41ODM4MUM0Ny4wMjczIDYuMzc2NDIgNDYuNjgzNiA2LjI3MjczIDQ2LjI3NDUgNi4yNzI3M0M0NS44NDg0IDYuMjcyNzMgNDUuNDkzMyA2LjM4MjEgNDUuMjA5MiA2LjYwMDg1QzQ0LjkyNzkgNi44MTY3NiA0NC43MTYzIDcuMTEwOCA0NC41NzQyIDcuNDgyOTVDNDQuNDM1IDcuODUyMjcgNDQuMzY1NCA4LjI2NzA1IDQ0LjM2NTQgOC43MjcyN0M0NC4zNjU0IDkuMTkzMTggNDQuNDM2NCA5LjYxNjQ4IDQ0LjU3ODUgOS45OTcxNkM0NC43MjM0IDEwLjM3NSA0NC45MzY0IDEwLjY3NjEgNDUuMjE3NyAxMC45MDA2QzQ1LjUwMTggMTEuMTIyMiA0NS44NTQgMTEuMjMzIDQ2LjI3NDUgMTEuMjMzWk01NC42MzEgMTJWMy4yNzI3M0g1NS42MzY3VjYuNDk0MzJINTUuNzIxOUM1NS43OTU4IDYuMzgwNjggNTUuODk4MSA2LjIzNTggNTYuMDI4OCA2LjA1OTY2QzU2LjE2MjMgNS44ODA2OCA1Ni4zNTI2IDUuNzIxNTkgNTYuNTk5OCA1LjU4MjM5QzU2Ljg0OTggNS40NDAzNCA1Ny4xODc5IDUuMzY5MzIgNTcuNjE0IDUuMzY5MzJDNTguMTY1MSA1LjM2OTMyIDU4LjY1MDkgNS41MDcxIDU5LjA3MTQgNS43ODI2N0M1OS40OTE4IDYuMDU4MjQgNTkuODIgNi40NDg4NiA2MC4wNTU4IDYuOTU0NTVDNjAuMjkxNSA3LjQ2MDIzIDYwLjQwOTQgOC4wNTY4MiA2MC40MDk0IDguNzQ0MzJDNjAuNDA5NCA5LjQzNzUgNjAuMjkxNSAxMC4wMzg0IDYwLjA1NTggMTAuNTQ2OUM1OS44MiAxMS4wNTI2IDU5LjQ5MzMgMTEuNDQ0NiA1OS4wNzU2IDExLjcyM0M1OC42NTggMTEuOTk4NiA1OC4xNzY1IDEyLjEzNjQgNTcuNjMxIDEyLjEzNjRDNTcuMjEwNiAxMi4xMzY0IDU2Ljg3MzkgMTIuMDY2OCA1Ni42MjExIDExLjkyNzZDNTYuMzY4MyAxMS43ODU1IDU2LjE3MzcgMTEuNjI1IDU2LjAzNzMgMTEuNDQ2QzU1LjkwMDkgMTEuMjY0MiA1NS43OTU4IDExLjExMzYgNTUuNzIxOSAxMC45OTQzSDU1LjYwMjZWMTJINTQuNjMxWk01NS42MTk3IDguNzI3MjdDNTUuNjE5NyA5LjIyMTU5IDU1LjY5MjEgOS42NTc2NyA1NS44MzcgMTAuMDM1NUM1NS45ODE5IDEwLjQxMDUgNTYuMTkzNSAxMC43MDQ1IDU2LjQ3MTkgMTAuOTE3NkM1Ni43NTA0IDExLjEyNzggNTcuMDkxMyAxMS4yMzMgNTcuNDk0NyAxMS4yMzNDNTcuOTE1MSAxMS4yMzMgNTguMjY2IDExLjEyMjIgNTguNTQ3MiAxMC45MDA2QzU4LjgzMTMgMTAuNjc2MSA1OS4wNDQ0IDEwLjM3NSA1OS4xODY0IDkuOTk3MTZDNTkuMzMxMyA5LjYxNjQ4IDU5LjQwMzggOS4xOTMxOCA1OS40MDM4IDguNzI3MjdDNTkuNDAzOCA4LjI2NzA1IDU5LjMzMjcgNy44NTIyNyA1OS4xOTA3IDcuNDgyOTVDNTkuMDUxNSA3LjExMDggNTguODM5OCA2LjgxNjc2IDU4LjU1NTggNi42MDA4NUM1OC4yNzQ1IDYuMzgyMSA1Ny45MjA4IDYuMjcyNzMgNTcuNDk0NyA2LjI3MjczQzU3LjA4NTYgNi4yNzI3MyA1Ni43NDE4IDYuMzc2NDIgNTYuNDYzNCA2LjU4MzgxQzU2LjE4NSA2Ljc4ODM1IDU1Ljk3NDggNy4wNzUyOCA1NS44MzI3IDcuNDQ0NkM1NS42OTA3IDcuODExMDggNTUuNjE5NyA4LjIzODY0IDU1LjYxOTcgOC43MjcyN1pNNjIuMzYxMiAxNC40NTQ1QzYyLjE5MDcgMTQuNDU0NSA2Mi4wMzg3IDE0LjQ0MDMgNjEuOTA1MiAxNC40MTE5QzYxLjc3MTcgMTQuMzg2NCA2MS42NzkzIDE0LjM2MDggNjEuNjI4MiAxNC4zMzUyTDYxLjg4MzkgMTMuNDQ4OUM2Mi4xMjgyIDEzLjUxMTQgNjIuMzQ0MSAxMy41MzQxIDYyLjUzMTYgMTMuNTE3QzYyLjcxOTEgMTMuNSA2Mi44ODUzIDEzLjQxNjIgNjMuMDMwMiAxMy4yNjU2QzYzLjE3NzkgMTMuMTE3OSA2My4zMTI5IDEyLjg3NzggNjMuNDM1IDEyLjU0NTVMNjMuNjIyNSAxMi4wMzQxTDYxLjIwMjEgNS40NTQ1NUg2Mi4yOTNMNjQuMDk5OCAxMC42NzA1SDY0LjE2OEw2NS45NzQ4IDUuNDU0NTVINjcuMDY1N0w2NC4yODczIDEyLjk1NDVDNjQuMTYyMyAxMy4yOTI2IDY0LjAwNzUgMTMuNTcyNCA2My44MjI4IDEzLjc5NEM2My42MzgxIDE0LjAxODUgNjMuNDIzNyAxNC4xODQ3IDYzLjE3OTMgMTQuMjkyNkM2Mi45Mzc5IDE0LjQwMDYgNjIuNjY1MSAxNC40NTQ1IDYyLjM2MTIgMTQuNDU0NVpNNzEuOTA0NSAxMlYzLjI3MjczSDc0Ljg1MzNDNzUuNTM4IDMuMjcyNzMgNzYuMDk3NyAzLjM5NjMxIDc2LjUzMjMgMy42NDM0N0M3Ni45Njk4IDMuODg3NzggNzcuMjkzNyA0LjIxODc1IDc3LjUwMzkgNC42MzYzNkM3Ny43MTQxIDUuMDUzOTggNzcuODE5MiA1LjUxOTg5IDc3LjgxOTIgNi4wMzQwOUM3Ny44MTkyIDYuNTQ4MyA3Ny43MTQxIDcuMDE1NjIgNzcuNTAzOSA3LjQzNjA4Qzc3LjI5NjUgNy44NTY1MyA3Ni45NzU1IDguMTkxNzYgNzYuNTQwOCA4LjQ0MTc2Qzc2LjEwNjIgOC42ODg5MiA3NS41NDk0IDguODEyNSA3NC44NzA0IDguODEyNUg3Mi43NTY3VjcuODc1SDc0LjgzNjNDNzUuMzA1IDcuODc1IDc1LjY4MTUgNy43OTQwMyA3NS45NjU2IDcuNjMyMUM3Ni4yNDk2IDcuNDcwMTcgNzYuNDU1NiA3LjI1MTQyIDc2LjU4MzUgNi45NzU4NUM3Ni43MTQxIDYuNjk3NDQgNzYuNzc5NSA2LjM4MzUyIDc2Ljc3OTUgNi4wMzQwOUM3Ni43Nzk1IDUuNjg0NjYgNzYuNzE0MSA1LjM3MjE2IDc2LjU4MzUgNS4wOTY1OUM3Ni40NTU2IDQuODIxMDIgNzYuMjQ4MiA0LjYwNTExIDc1Ljk2MTMgNC40NDg4NkM3NS42NzQ0IDQuMjg5NzcgNzUuMjkzNyA0LjIxMDIzIDc0LjgxOTIgNC4yMTAyM0g3Mi45NjEzVjEySDcxLjkwNDVaTTgxLjMxMTQgMTIuMTUzNEM4MC44OTY3IDEyLjE1MzQgODAuNTIwMiAxMi4wNzUzIDgwLjE4MjIgMTEuOTE5Qzc5Ljg0NDEgMTEuNzU5OSA3OS41NzU2IDExLjUzMTIgNzkuMzc2OCAxMS4yMzNDNzkuMTc3OSAxMC45MzE4IDc5LjA3ODUgMTAuNTY4MiA3OS4wNzg1IDEwLjE0MkM3OS4wNzg1IDkuNzY3MDUgNzkuMTUyMyA5LjQ2MzA3IDc5LjMwMDEgOS4yMzAxMUM3OS40NDc4IDguOTk0MzIgNzkuNjQ1MiA4LjgwOTY2IDc5Ljg5MjQgOC42NzYxNEM4MC4xMzk2IDguNTQyNjEgODAuNDEyMyA4LjQ0MzE4IDgwLjcxMDYgOC4zNzc4NEM4MS4wMTE3IDguMzA5NjYgODEuMzE0MyA4LjI1NTY4IDgxLjYxODMgOC4yMTU5MUM4Mi4wMTYgOC4xNjQ3NyA4Mi4zMzg0IDguMTI2NDIgODIuNTg1NiA4LjEwMDg1QzgyLjgzNTYgOC4wNzI0NCA4My4wMTc0IDguMDI1NTcgODMuMTMxIDcuOTYwMjNDODMuMjQ3NSA3Ljg5NDg5IDgzLjMwNTggNy43ODEyNSA4My4zMDU4IDcuNjE5MzJWNy41ODUyM0M4My4zMDU4IDcuMTY0NzcgODMuMTkwNyA2LjgzODA3IDgyLjk2MDYgNi42MDUxMUM4Mi43MzMzIDYuMzcyMTYgODIuMzg4MSA2LjI1NTY4IDgxLjkyNTEgNi4yNTU2OEM4MS40NDUgNi4yNTU2OCA4MS4wNjg1IDYuMzYwOCA4MC43OTU4IDYuNTcxMDJDODAuNTIzMSA2Ljc4MTI1IDgwLjMzMTMgNy4wMDU2OCA4MC4yMjA1IDcuMjQ0MzJMNzkuMjY2IDYuOTAzNDFDNzkuNDM2NCA2LjUwNTY4IDc5LjY2MzcgNi4xOTYwMiA3OS45NDc4IDUuOTc0NDNDODAuMjM0NyA1Ljc1IDgwLjU0NzIgNS41OTM3NSA4MC44ODUzIDUuNTA1NjhDODEuMjI2MiA1LjQxNDc3IDgxLjU2MTQgNS4zNjkzMiA4MS44OTEgNS4zNjkzMkM4Mi4xMDEyIDUuMzY5MzIgODIuMzQyNyA1LjM5NDg5IDgyLjYxNTQgNS40NDYwMkM4Mi44OTEgNS40OTQzMiA4My4xNTY2IDUuNTk1MTcgODMuNDEyMyA1Ljc0ODU4QzgzLjY3MDggNS45MDE5OSA4My44ODUzIDYuMTMzNTIgODQuMDU1OCA2LjQ0MzE4Qzg0LjIyNjIgNi43NTI4NCA4NC4zMTE0IDcuMTY3NjEgODQuMzExNCA3LjY4NzVWMTJIODMuMzA1OFYxMS4xMTM2SDgzLjI1NDZDODMuMTg2NCAxMS4yNTU3IDgzLjA3MjggMTEuNDA3NyA4Mi45MTM3IDExLjU2OTZDODIuNzU0NiAxMS43MzE1IDgyLjU0MyAxMS44NjkzIDgyLjI3ODggMTEuOTgzQzgyLjAxNDYgMTIuMDk2NiA4MS42OTIxIDEyLjE1MzQgODEuMzExNCAxMi4xNTM0Wk04MS40NjQ4IDExLjI1QzgxLjg2MjYgMTEuMjUgODIuMTk3OCAxMS4xNzE5IDgyLjQ3MDUgMTEuMDE1NkM4Mi43NDYxIDEwLjg1OTQgODIuOTUzNSAxMC42NTc3IDgzLjA5MjcgMTAuNDEwNUM4My4yMzQ3IDEwLjE2MzQgODMuMzA1OCA5LjkwMzQxIDgzLjMwNTggOS42MzA2OFY4LjcxMDIzQzgzLjI2MzEgOC43NjEzNiA4My4xNjk0IDguODA4MjQgODMuMDI0NSA4Ljg1MDg1QzgyLjg4MjUgOC44OTA2MiA4Mi43MTc3IDguOTI2MTQgODIuNTMwMiA4Ljk1NzM5QzgyLjM0NTUgOC45ODU4IDgyLjE2NTEgOS4wMTEzNiA4MS45ODkgOS4wMzQwOUM4MS44MTU3IDkuMDUzOTggODEuNjc1MSA5LjA3MTAyIDgxLjU2NzEgOS4wODUyM0M4MS4zMDU4IDkuMTE5MzIgODEuMDYxNCA5LjE3NDcyIDgwLjgzNDIgOS4yNTE0MkM4MC42MDk3IDkuMzI1MjggODAuNDI3OSA5LjQzNzUgODAuMjg4NyA5LjU4ODA3QzgwLjE1MjMgOS43MzU4IDgwLjA4NDIgOS45Mzc1IDgwLjA4NDIgMTAuMTkzMkM4MC4wODQyIDEwLjU0MjYgODAuMjEzNCAxMC44MDY4IDgwLjQ3MTkgMTAuOTg1OEM4MC43MzMzIDExLjE2MTkgODEuMDY0MyAxMS4yNSA4MS40NjQ4IDExLjI1Wk05MC43ODM0IDYuOTIwNDVMODkuODggNy4xNzYxNEM4OS44MjMyIDcuMDI1NTcgODkuNzM5MyA2Ljg3OTI2IDg5LjYyODYgNi43MzcyMkM4OS41MjA2IDYuNTkyMzMgODkuMzcyOSA2LjQ3MzAxIDg5LjE4NTQgNi4zNzkyNkM4OC45OTc5IDYuMjg1NTEgODguNzU3OCA2LjIzODY0IDg4LjQ2NTIgNi4yMzg2NEM4OC4wNjQ2IDYuMjM4NjQgODcuNzMwOCA2LjMzMDk3IDg3LjQ2MzggNi41MTU2MkM4Ny4xOTk2IDYuNjk3NDQgODcuMDY3NSA2LjkyODk4IDg3LjA2NzUgNy4yMTAyM0M4Ny4wNjc1IDcuNDYwMjMgODcuMTU4NCA3LjY1NzY3IDg3LjM0MDIgNy44MDI1NkM4Ny41MjIgNy45NDc0NCA4Ny44MDYxIDguMDY4MTggODguMTkyNSA4LjE2NDc3TDg5LjE2NDEgOC40MDM0MUM4OS43NDkzIDguNTQ1NDUgOTAuMTg1NCA4Ljc2Mjc4IDkwLjQ3MjMgOS4wNTU0QzkwLjc1OTIgOS4zNDUxNyA5MC45MDI3IDkuNzE4NzUgOTAuOTAyNyAxMC4xNzYxQzkwLjkwMjcgMTAuNTUxMSA5MC43OTQ3IDEwLjg4NjQgOTAuNTc4OCAxMS4xODE4QzkwLjM2NTggMTEuNDc3MyA5MC4wNjc1IDExLjcxMDIgODkuNjgzOSAxMS44ODA3Qzg5LjMwMDQgMTIuMDUxMSA4OC44NTQ0IDEyLjEzNjQgODguMzQ1OSAxMi4xMzY0Qzg3LjY3ODMgMTIuMTM2NCA4Ny4xMjU3IDExLjk5MTUgODYuNjg4MiAxMS43MDE3Qzg2LjI1MDcgMTEuNDExOSA4NS45NzM3IDEwLjk4ODYgODUuODU3MiAxMC40MzE4TDg2LjgxMTggMTAuMTkzMkM4Ni45MDI3IDEwLjU0NTUgODcuMDc0NiAxMC44MDk3IDg3LjMyNzQgMTAuOTg1OEM4Ny41ODMxIDExLjE2MTkgODcuOTE2OSAxMS4yNSA4OC4zMjg4IDExLjI1Qzg4Ljc5NzYgMTEuMjUgODkuMTY5NyAxMS4xNTA2IDg5LjQ0NTMgMTAuOTUxN0M4OS43MjM3IDEwLjc1IDg5Ljg2MjkgMTAuNTA4NSA4OS44NjI5IDEwLjIyNzNDODkuODYyOSAxMCA4OS43ODM0IDkuODA5NjYgODkuNjI0MyA5LjY1NjI1Qzg5LjQ2NTIgOS41IDg5LjIyMDkgOS4zODM1MiA4OC44OTEzIDkuMzA2ODJMODcuODAwNCA5LjA1MTE0Qzg3LjIwMSA4LjkwOTA5IDg2Ljc2MDcgOC42ODg5MiA4Ni40Nzk0IDguMzkwNjJDODYuMjAxIDguMDg5NDkgODYuMDYxOCA3LjcxMzA3IDg2LjA2MTggNy4yNjEzNkM4Ni4wNjE4IDYuODkyMDUgODYuMTY1NSA2LjU2NTM0IDg2LjM3MjkgNi4yODEyNUM4Ni41ODMxIDUuOTk3MTYgODYuODY4NiA1Ljc3NDE1IDg3LjIyOTQgNS42MTIyMkM4Ny41OTMgNS40NTAyOCA4OC4wMDUgNS4zNjkzMiA4OC40NjUyIDUuMzY5MzJDODkuMTEyOSA1LjM2OTMyIDg5LjYyMTQgNS41MTEzNiA4OS45OTA4IDUuNzk1NDVDOTAuMzYyOSA2LjA3OTU1IDkwLjYyNzEgNi40NTQ1NSA5MC43ODM0IDYuOTIwNDVaTTk3LjA1MjkgNi45MjA0NUw5Ni4xNDk1IDcuMTc2MTRDOTYuMDkyNyA3LjAyNTU3IDk2LjAwODkgNi44NzkyNiA5NS44OTgxIDYuNzM3MjJDOTUuNzkwMSA2LjU5MjMzIDk1LjY0MjQgNi40NzMwMSA5NS40NTQ5IDYuMzc5MjZDOTUuMjY3NCA2LjI4NTUxIDk1LjAyNzMgNi4yMzg2NCA5NC43MzQ3IDYuMjM4NjRDOTQuMzM0MiA2LjIzODY0IDk0LjAwMDQgNi4zMzA5NyA5My43MzMzIDYuNTE1NjJDOTMuNDY5MSA2LjY5NzQ0IDkzLjMzNyA2LjkyODk4IDkzLjMzNyA3LjIxMDIzQzkzLjMzNyA3LjQ2MDIzIDkzLjQyNzkgNy42NTc2NyA5My42MDk3IDcuODAyNTZDOTMuNzkxNSA3Ljk0NzQ0IDk0LjA3NTYgOC4wNjgxOCA5NC40NjIgOC4xNjQ3N0w5NS40MzM2IDguNDAzNDFDOTYuMDE4OCA4LjU0NTQ1IDk2LjQ1NDkgOC43NjI3OCA5Ni43NDE4IDkuMDU1NEM5Ny4wMjg4IDkuMzQ1MTcgOTcuMTcyMiA5LjcxODc1IDk3LjE3MjIgMTAuMTc2MUM5Ny4xNzIyIDEwLjU1MTEgOTcuMDY0MyAxMC44ODY0IDk2Ljg0ODQgMTEuMTgxOEM5Ni42MzUzIDExLjQ3NzMgOTYuMzM3IDExLjcxMDIgOTUuOTUzNSAxMS44ODA3Qzk1LjU3IDEyLjA1MTEgOTUuMTIzOSAxMi4xMzY0IDk0LjYxNTQgMTIuMTM2NEM5My45NDc4IDEyLjEzNjQgOTMuMzk1MiAxMS45OTE1IDkyLjk1NzcgMTEuNzAxN0M5Mi41MjAyIDExLjQxMTkgOTIuMjQzMyAxMC45ODg2IDkyLjEyNjggMTAuNDMxOEw5My4wODEzIDEwLjE5MzJDOTMuMTcyMiAxMC41NDU1IDkzLjM0NDEgMTAuODA5NyA5My41OTY5IDEwLjk4NThDOTMuODUyNiAxMS4xNjE5IDk0LjE4NjQgMTEuMjUgOTQuNTk4NCAxMS4yNUM5NS4wNjcxIDExLjI1IDk1LjQzOTMgMTEuMTUwNiA5NS43MTQ4IDEwLjk1MTdDOTUuOTkzMyAxMC43NSA5Ni4xMzI1IDEwLjUwODUgOTYuMTMyNSAxMC4yMjczQzk2LjEzMjUgMTAgOTYuMDUyOSA5LjgwOTY2IDk1Ljg5MzggOS42NTYyNUM5NS43MzQ3IDkuNSA5NS40OTA0IDkuMzgzNTIgOTUuMTYwOSA5LjMwNjgyTDk0LjA3IDkuMDUxMTRDOTMuNDcwNSA4LjkwOTA5IDkzLjAzMDIgOC42ODg5MiA5Mi43NDg5IDguMzkwNjJDOTIuNDcwNSA4LjA4OTQ5IDkyLjMzMTMgNy43MTMwNyA5Mi4zMzEzIDcuMjYxMzZDOTIuMzMxMyA2Ljg5MjA1IDkyLjQzNSA2LjU2NTM0IDkyLjY0MjQgNi4yODEyNUM5Mi44NTI2IDUuOTk3MTYgOTMuMTM4MSA1Ljc3NDE1IDkzLjQ5ODkgNS42MTIyMkM5My44NjI2IDUuNDUwMjggOTQuMjc0NSA1LjM2OTMyIDk0LjczNDcgNS4zNjkzMkM5NS4zODI1IDUuMzY5MzIgOTUuODkxIDUuNTExMzYgOTYuMjYwMyA1Ljc5NTQ1Qzk2LjYzMjUgNi4wNzk1NSA5Ni44OTY3IDYuNDU0NTUgOTcuMDUyOSA2LjkyMDQ1Wk0xMDAuNjEyIDEyLjE1MzRDMTAwLjE5NyAxMi4xNTM0IDk5LjgyMSAxMi4wNzUzIDk5LjQ4MyAxMS45MTlDOTkuMTQ0OSAxMS43NTk5IDk4Ljg3NjQgMTEuNTMxMiA5OC42Nzc2IDExLjIzM0M5OC40Nzg3IDEwLjkzMTggOTguMzc5MyAxMC41NjgyIDk4LjM3OTMgMTAuMTQyQzk4LjM3OTMgOS43NjcwNSA5OC40NTMxIDkuNDYzMDcgOTguNjAwOSA5LjIzMDExQzk4Ljc0ODYgOC45OTQzMiA5OC45NDYgOC44MDk2NiA5OS4xOTMyIDguNjc2MTRDOTkuNDQwMyA4LjU0MjYxIDk5LjcxMzEgOC40NDMxOCAxMDAuMDExIDguMzc3ODRDMTAwLjMxMyA4LjMwOTY2IDEwMC42MTUgOC4yNTU2OCAxMDAuOTE5IDguMjE1OTFDMTAxLjMxNyA4LjE2NDc3IDEwMS42MzkgOC4xMjY0MiAxMDEuODg2IDguMTAwODVDMTAyLjEzNiA4LjA3MjQ0IDEwMi4zMTggOC4wMjU1NyAxMDIuNDMyIDcuOTYwMjNDMTAyLjU0OCA3Ljg5NDg5IDEwMi42MDcgNy43ODEyNSAxMDIuNjA3IDcuNjE5MzJWNy41ODUyM0MxMDIuNjA3IDcuMTY0NzcgMTAyLjQ5MSA2LjgzODA3IDEwMi4yNjEgNi42MDUxMUMxMDIuMDM0IDYuMzcyMTYgMTAxLjY4OSA2LjI1NTY4IDEwMS4yMjYgNi4yNTU2OEMxMDAuNzQ2IDYuMjU1NjggMTAwLjM2OSA2LjM2MDggMTAwLjA5NyA2LjU3MTAyQzk5LjgyMzkgNi43ODEyNSA5OS42MzIxIDcuMDA1NjggOTkuNTIxMyA3LjI0NDMyTDk4LjU2NjggNi45MDM0MUM5OC43MzcyIDYuNTA1NjggOTguOTY0NSA2LjE5NjAyIDk5LjI0ODYgNS45NzQ0M0M5OS41MzU1IDUuNzUgOTkuODQ4IDUuNTkzNzUgMTAwLjE4NiA1LjUwNTY4QzEwMC41MjcgNS40MTQ3NyAxMDAuODYyIDUuMzY5MzIgMTAxLjE5MiA1LjM2OTMyQzEwMS40MDIgNS4zNjkzMiAxMDEuNjQzIDUuMzk0ODkgMTAxLjkxNiA1LjQ0NjAyQzEwMi4xOTIgNS40OTQzMiAxMDIuNDU3IDUuNTk1MTcgMTAyLjcxMyA1Ljc0ODU4QzEwMi45NzIgNS45MDE5OSAxMDMuMTg2IDYuMTMzNTIgMTAzLjM1NyA2LjQ0MzE4QzEwMy41MjcgNi43NTI4NCAxMDMuNjEyIDcuMTY3NjEgMTAzLjYxMiA3LjY4NzVWMTJIMTAyLjYwN1YxMS4xMTM2SDEwMi41NTVDMTAyLjQ4NyAxMS4yNTU3IDEwMi4zNzQgMTEuNDA3NyAxMDIuMjE0IDExLjU2OTZDMTAyLjA1NSAxMS43MzE1IDEwMS44NDQgMTEuODY5MyAxMDEuNTggMTEuOTgzQzEwMS4zMTUgMTIuMDk2NiAxMDAuOTkzIDEyLjE1MzQgMTAwLjYxMiAxMi4xNTM0Wk0xMDAuNzY2IDExLjI1QzEwMS4xNjMgMTEuMjUgMTAxLjQ5OSAxMS4xNzE5IDEwMS43NzEgMTEuMDE1NkMxMDIuMDQ3IDEwLjg1OTQgMTAyLjI1NCAxMC42NTc3IDEwMi4zOTMgMTAuNDEwNUMxMDIuNTM2IDEwLjE2MzQgMTAyLjYwNyA5LjkwMzQxIDEwMi42MDcgOS42MzA2OFY4LjcxMDIzQzEwMi41NjQgOC43NjEzNiAxMDIuNDcgOC44MDgyNCAxMDIuMzI1IDguODUwODVDMTAyLjE4MyA4Ljg5MDYyIDEwMi4wMTggOC45MjYxNCAxMDEuODMxIDguOTU3MzlDMTAxLjY0NiA4Ljk4NTggMTAxLjQ2NiA5LjAxMTM2IDEwMS4yOSA5LjAzNDA5QzEwMS4xMTYgOS4wNTM5OCAxMDAuOTc2IDkuMDcxMDIgMTAwLjg2OCA5LjA4NTIzQzEwMC42MDcgOS4xMTkzMiAxMDAuMzYyIDkuMTc0NzIgMTAwLjEzNSA5LjI1MTQyQzk5LjkxMDUgOS4zMjUyOCA5OS43Mjg3IDkuNDM3NSA5OS41ODk1IDkuNTg4MDdDOTkuNDUzMSA5LjczNTggOTkuMzg0OSA5LjkzNzUgOTkuMzg0OSAxMC4xOTMyQzk5LjM4NDkgMTAuNTQyNiA5OS41MTQyIDEwLjgwNjggOTkuNzcyNyAxMC45ODU4QzEwMC4wMzQgMTEuMTYxOSAxMDAuMzY1IDExLjI1IDEwMC43NjYgMTEuMjVaTTEwOC4wOSAxNC41OTA5QzEwNy42MDQgMTQuNTkwOSAxMDcuMTg2IDE0LjUyODQgMTA2LjgzNyAxNC40MDM0QzEwNi40ODggMTQuMjgxMiAxMDYuMTk2IDE0LjExOTMgMTA1Ljk2MyAxMy45MTc2QzEwNS43MzMgMTMuNzE4OCAxMDUuNTUgMTMuNTA1NyAxMDUuNDE0IDEzLjI3ODRMMTA2LjIxNSAxMi43MTU5QzEwNi4zMDYgMTIuODM1MiAxMDYuNDIxIDEyLjk3MTYgMTA2LjU2IDEzLjEyNUMxMDYuNjk5IDEzLjI4MTIgMTA2Ljg5IDEzLjQxNjIgMTA3LjEzMSAxMy41Mjk4QzEwNy4zNzUgMTMuNjQ2MyAxMDcuNjk1IDEzLjcwNDUgMTA4LjA5IDEzLjcwNDVDMTA4LjYxOCAxMy43MDQ1IDEwOS4wNTQgMTMuNTc2NyAxMDkuMzk4IDEzLjMyMUMxMDkuNzQyIDEzLjA2NTMgMTA5LjkxNCAxMi42NjQ4IDEwOS45MTQgMTIuMTE5M1YxMC43ODk4SDEwOS44MjhDMTA5Ljc1NSAxMC45MDkxIDEwOS42NSAxMS4wNTY4IDEwOS41MTMgMTEuMjMzQzEwOS4zOCAxMS40MDYyIDEwOS4xODYgMTEuNTYxMSAxMDguOTM0IDExLjY5NzRDMTA4LjY4NCAxMS44MzEgMTA4LjM0NiAxMS44OTc3IDEwNy45MTkgMTEuODk3N0MxMDcuMzkxIDExLjg5NzcgMTA2LjkxNyAxMS43NzI3IDEwNi40OTYgMTEuNTIyN0MxMDYuMDc4IDExLjI3MjcgMTA1Ljc0OCAxMC45MDkxIDEwNS41MDMgMTAuNDMxOEMxMDUuMjYyIDkuOTU0NTUgMTA1LjE0MSA5LjM3NSAxMDUuMTQxIDguNjkzMThDMTA1LjE0MSA4LjAyMjczIDEwNS4yNTkgNy40Mzg5MiAxMDUuNDk1IDYuOTQxNzZDMTA1LjczIDYuNDQxNzYgMTA2LjA1OSA2LjA1NTQgMTA2LjQ3OSA1Ljc4MjY3QzEwNi45IDUuNTA3MSAxMDcuMzg1IDUuMzY5MzIgMTA3LjkzNiA1LjM2OTMyQzEwOC4zNjMgNS4zNjkzMiAxMDguNzAxIDUuNDQwMzQgMTA4Ljk1MSA1LjU4MjM5QzEwOS4yMDMgNS43MjE1OSAxMDkuMzk3IDUuODgwNjggMTA5LjUzIDYuMDU5NjZDMTA5LjY2NyA2LjIzNTggMTA5Ljc3MiA2LjM4MDY4IDEwOS44NDYgNi40OTQzMkgxMDkuOTQ4VjUuNDU0NTVIMTEwLjkxOVYxMi4xODc1QzExMC45MTkgMTIuNzUgMTEwLjc5MiAxMy4yMDc0IDExMC41MzYgMTMuNTU5N0MxMTAuMjgzIDEzLjkxNDggMTA5Ljk0MiAxNC4xNzQ3IDEwOS41MTMgMTQuMzM5NUMxMDkuMDg3IDE0LjUwNzEgMTA4LjYxMyAxNC41OTA5IDEwOC4wOSAxNC41OTA5Wk0xMDguMDU2IDEwLjk5NDNDMTA4LjQ1OSAxMC45OTQzIDEwOC44IDEwLjkwMiAxMDkuMDc4IDEwLjcxNzNDMTA5LjM1NyAxMC41MzI3IDEwOS41NjkgMTAuMjY3IDEwOS43MTMgOS45MjA0NUMxMDkuODU4IDkuNTczODYgMTA5LjkzMSA5LjE1OTA5IDEwOS45MzEgOC42NzYxNEMxMDkuOTMxIDguMjA0NTUgMTA5Ljg2IDcuNzg4MzUgMTA5LjcxOCA3LjQyNzU2QzEwOS41NzYgNy4wNjY3NiAxMDkuMzY1IDYuNzg0MDkgMTA5LjA4NyA2LjU3OTU1QzEwOC44MDkgNi4zNzUgMTA4LjQ2NSA2LjI3MjczIDEwOC4wNTYgNi4yNzI3M0MxMDcuNjMgNi4yNzI3MyAxMDcuMjc1IDYuMzgwNjggMTA2Ljk5IDYuNTk2NTlDMTA2LjcwOSA2LjgxMjUgMTA2LjQ5OCA3LjEwMjI3IDEwNi4zNTUgNy40NjU5MUMxMDYuMjE2IDcuODI5NTUgMTA2LjE0NyA4LjIzMjk1IDEwNi4xNDcgOC42NzYxNEMxMDYuMTQ3IDkuMTMwNjggMTA2LjIxOCA5LjUzMjY3IDEwNi4zNiA5Ljg4MjFDMTA2LjUwNSAxMC4yMjg3IDEwNi43MTggMTAuNTAxNCAxMDYuOTk5IDEwLjcwMDNDMTA3LjI4MyAxMC44OTYzIDEwNy42MzUgMTAuOTk0MyAxMDguMDU2IDEwLjk5NDNaTTExNS41MDUgMTIuMTM2NEMxMTQuODc0IDEyLjEzNjQgMTE0LjMzIDExLjk5NzIgMTEzLjg3MyAxMS43MTg4QzExMy40MTggMTEuNDM3NSAxMTMuMDY3IDExLjA0NTUgMTEyLjgyIDEwLjU0MjZDMTEyLjU3NiAxMC4wMzY5IDExMi40NTMgOS40NDg4NiAxMTIuNDUzIDguNzc4NDFDMTEyLjQ1MyA4LjEwNzk1IDExMi41NzYgNy41MTcwNSAxMTIuODIgNy4wMDU2OEMxMTMuMDY3IDYuNDkxNDggMTEzLjQxMSA2LjA5MDkxIDExMy44NTEgNS44MDM5OEMxMTQuMjk0IDUuNTE0MiAxMTQuODExIDUuMzY5MzIgMTE1LjQwMiA1LjM2OTMyQzExNS43NDMgNS4zNjkzMiAxMTYuMDggNS40MjYxNCAxMTYuNDEyIDUuNTM5NzdDMTE2Ljc0NSA1LjY1MzQxIDExNy4wNDcgNS44MzgwNyAxMTcuMzIgNi4wOTM3NUMxMTcuNTkzIDYuMzQ2NTkgMTE3LjgxIDYuNjgxODIgMTE3Ljk3MiA3LjA5OTQzQzExOC4xMzQgNy41MTcwNSAxMTguMjE1IDguMDMxMjUgMTE4LjIxNSA4LjY0MjA1VjkuMDY4MThIMTEzLjE2OVY4LjE5ODg2SDExNy4xOTJDMTE3LjE5MiA3LjgyOTU1IDExNy4xMTggNy41IDExNi45NzEgNy4yMTAyM0MxMTYuODI2IDYuOTIwNDUgMTE2LjYxOCA2LjY5MTc2IDExNi4zNDggNi41MjQxNUMxMTYuMDgxIDYuMzU2NTMgMTE1Ljc2NiA2LjI3MjczIDExNS40MDIgNi4yNzI3M0MxMTUuMDAyIDYuMjcyNzMgMTE0LjY1NSA2LjM3MjE2IDExNC4zNjMgNi41NzEwMkMxMTQuMDczIDYuNzY3MDUgMTEzLjg1IDcuMDIyNzMgMTEzLjY5NCA3LjMzODA3QzExMy41MzcgNy42NTM0MSAxMTMuNDU5IDcuOTkxNDggMTEzLjQ1OSA4LjM1MjI3VjguOTMxODJDMTEzLjQ1OSA5LjQyNjE0IDExMy41NDQgOS44NDUxNyAxMTMuNzE1IDEwLjE4ODlDMTEzLjg4OCAxMC41Mjk4IDExNC4xMjggMTAuNzg5OCAxMTQuNDM1IDEwLjk2ODhDMTE0Ljc0MiAxMS4xNDQ5IDExNS4wOTggMTEuMjMzIDExNS41MDUgMTEuMjMzQzExNS43NjkgMTEuMjMzIDExNi4wMDcgMTEuMTk2IDExNi4yMjEgMTEuMTIyMkMxMTYuNDM2IDExLjA0NTUgMTE2LjYyMyAxMC45MzE4IDExNi43NzkgMTAuNzgxMkMxMTYuOTM1IDEwLjYyNzggMTE3LjA1NiAxMC40Mzc1IDExNy4xNDEgMTAuMjEwMkwxMTguMTEzIDEwLjQ4M0MxMTguMDEgMTAuODEyNSAxMTcuODM4IDExLjEwMjMgMTE3LjU5NyAxMS4zNTIzQzExNy4zNTUgMTEuNTk5NCAxMTcuMDU3IDExLjc5MjYgMTE2LjcwMiAxMS45MzE4QzExNi4zNDcgMTIuMDY4MiAxMTUuOTQ4IDEyLjEzNjQgMTE1LjUwNSAxMi4xMzY0WiIgZmlsbD0iY3VycmVudENvbG9yIi8+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF80MDBfNDExNSkiPgo8cGF0aCBvcGFjaXR5PSIwLjgiIGQ9Ik0xMjYuMjI2IDQuNzY3NzRMMTI3Ljg3MyA1LjcxODIxQzEyOC4yMDMgNS45MDkxMiAxMjguNDg5IDYuMTY4ODUgMTI4LjcxIDYuNDc5OEMxMjguOTMxIDYuNzkwNzUgMTI5LjA4MyA3LjE0NTY0IDEyOS4xNTUgNy41MjA0M0MxMjkuMjI3IDcuODk1MjEgMTI5LjIxOCA4LjI4MTEzIDEyOS4xMjggOC42NTIwMkMxMjkuMDM4IDkuMDIyOSAxMjguODY5IDkuMzcwMSAxMjguNjMzIDkuNjcwMDZMMTI0LjcwNSA3LjQwMjIyQzEyNC41MzIgNy4zMDIzNSAxMjQuMzgxIDcuMTY5MzggMTI0LjI1OSA3LjAxMDkyQzEyNC4xMzggNi44NTI0NSAxMjQuMDQ4IDYuNjcxNTkgMTIzLjk5NyA2LjQ3ODY1QzEyMy45NDUgNi4yODU3MSAxMjMuOTMyIDYuMDg0NDggMTIzLjk1OCA1Ljg4NjQ1QzEyMy45ODQgNS42ODg0MiAxMjQuMDQ5IDUuNDk3NDYgMTI0LjE0OSA1LjMyNDQ3QzEyNC4yNDggNS4xNTE0OSAxMjQuMzgxIDQuOTk5ODcgMTI0LjU0IDQuODc4MjhDMTI0LjY5OCA0Ljc1NjY4IDEyNC44NzkgNC42Njc0OSAxMjUuMDcyIDQuNjE1NzlDMTI1LjI2NSA0LjU2NDA5IDEyNS40NjYgNC41NTA5MSAxMjUuNjY0IDQuNTc2OThDMTI1Ljg2MiA0LjYwMzA1IDEyNi4wNTMgNC42Njc4NyAxMjYuMjI2IDQuNzY3NzRaIiBmaWxsPSJjdXJyZW50Q29sb3IiLz4KPHBhdGggb3BhY2l0eT0iMC41IiBkPSJNMTI2LjIyNiAxMS4zMDE3TDEyNy44NzIgMTAuMzUxM0MxMjguMjAzIDEwLjE2MDQgMTI4LjQ4OSA5LjkwMDYyIDEyOC43MSA5LjU4OTY3QzEyOC45MzEgOS4yNzg3MiAxMjkuMDgzIDguOTIzODMgMTI5LjE1NSA4LjU0OTA0QzEyOS4yMjcgOC4xNzQyNiAxMjkuMjE4IDcuNzg4MzQgMTI5LjEyOCA3LjQxNzQ1QzEyOS4wMzggNy4wNDY1NyAxMjguODY5IDYuNjk5MzggMTI4LjYzMyA2LjM5OTQxTDEyNC43MDUgOC42NjcyNUMxMjQuNTMyIDguNzY3MSAxMjQuMzggOC45MDAwNSAxMjQuMjU5IDkuMDU4NTJDMTI0LjEzNyA5LjIxNjk5IDEyNC4wNDggOS4zOTc4NyAxMjMuOTk2IDkuNTkwODNDMTIzLjk0NCA5Ljc4Mzc5IDEyMy45MzEgOS45ODUwNSAxMjMuOTU3IDEwLjE4MzFDMTIzLjk4MyAxMC4zODEyIDEyNC4wNDggMTAuNTcyMiAxMjQuMTQ4IDEwLjc0NTJDMTI0LjI0OCAxMC45MTgyIDEyNC4zODEgMTEuMDY5OCAxMjQuNTM5IDExLjE5MTRDMTI0LjY5OCAxMS4zMTMxIDEyNC44NzkgMTEuNDAyMiAxMjUuMDcyIDExLjQ1MzlDMTI1LjI2NSAxMS41MDU2IDEyNS40NjYgMTEuNTE4OCAxMjUuNjY0IDExLjQ5MjdDMTI1Ljg2MiAxMS40NjY1IDEyNi4wNTMgMTEuNDAxNyAxMjYuMjI2IDExLjMwMTdaIiBmaWxsPSJjdXJyZW50Q29sb3IiLz4KPHBhdGggb3BhY2l0eT0iMC41IiBkPSJNMTM2Ljc3NCA0Ljc2Nzc1TDEzNS4xMjggNS43MTgyMUMxMzQuNzk3IDUuOTA5MTIgMTM0LjUxMiA2LjE2ODg2IDEzNC4yOSA2LjQ3OThDMTM0LjA2OSA2Ljc5MDc1IDEzMy45MTcgNy4xNDU2NSAxMzMuODQ1IDcuNTIwNDNDMTMzLjc3MyA3Ljg5NTIyIDEzMy43ODIgOC4yODExMyAxMzMuODcyIDguNjUyMDJDMTMzLjk2MiA5LjAyMjkxIDEzNC4xMzEgOS4zNzAxIDEzNC4zNjcgOS42NzAwNkwxMzguMjk1IDcuNDAyMjJDMTM4LjQ2OCA3LjMwMjM1IDEzOC42MTkgNy4xNjkzOSAxMzguNzQxIDcuMDEwOTJDMTM4Ljg2MyA2Ljg1MjQ2IDEzOC45NTIgNi42NzE1OSAxMzkuMDA0IDYuNDc4NjVDMTM5LjA1NSA2LjI4NTcyIDEzOS4wNjggNi4wODQ0OSAxMzkuMDQyIDUuODg2NDVDMTM5LjAxNiA1LjY4ODQyIDEzOC45NTEgNS40OTc0NiAxMzguODUyIDUuMzI0NDhDMTM4Ljc1MiA1LjE1MTQ5IDEzOC42MTkgNC45OTk4OCAxMzguNDYgNC44NzgyOEMxMzguMzAyIDQuNzU2NjkgMTM4LjEyMSA0LjY2NzQ5IDEzNy45MjggNC42MTU4QzEzNy41MzggNC41MTEzOSAxMzcuMTIzIDQuNTY2MDUgMTM2Ljc3NCA0Ljc2Nzc1WiIgZmlsbD0iY3VycmVudENvbG9yIi8+CjxwYXRoIG9wYWNpdHk9IjAuOCIgZD0iTTEzNi43NzQgMTEuMzAxN0wxMzUuMTI4IDEwLjM1MTNDMTM0Ljc5NyAxMC4xNjA0IDEzNC41MTIgOS45MDA2MiAxMzQuMjkgOS41ODk2N0MxMzQuMDY5IDkuMjc4NzIgMTMzLjkxNyA4LjkyMzgzIDEzMy44NDUgOC41NDkwNEMxMzMuNzczIDguMTc0MjYgMTMzLjc4MiA3Ljc4ODM0IDEzMy44NzIgNy40MTc0NUMxMzMuOTYyIDcuMDQ2NTcgMTM0LjEzMSA2LjY5OTM4IDEzNC4zNjcgNi4zOTk0MUwxMzguMjk1IDguNjY3MjVDMTM4LjQ2OCA4Ljc2NzA5IDEzOC42MiA4LjkwMDA0IDEzOC43NDEgOS4wNTg1MUMxMzguODYzIDkuMjE2OTggMTM4Ljk1MiA5LjM5Nzg2IDEzOS4wMDQgOS41OTA4M0MxMzkuMDU2IDkuNzgzOCAxMzkuMDY5IDkuOTg1MDcgMTM5LjA0MyAxMC4xODMxQzEzOS4wMTcgMTAuMzgxMiAxMzguOTUyIDEwLjU3MjIgMTM4Ljg1MiAxMC43NDUyQzEzOC43NTIgMTAuOTE4MyAxMzguNjE5IDExLjA2OTkgMTM4LjQ2MSAxMS4xOTE1QzEzOC4zMDIgMTEuMzEzMSAxMzguMTIxIDExLjQwMjMgMTM3LjkyOCAxMS40NTRDMTM3LjczNSAxMS41MDU3IDEzNy41MzQgMTEuNTE4OCAxMzcuMzM2IDExLjQ5MjdDMTM3LjEzOCAxMS40NjY2IDEzNi45NDcgMTEuNDAxNyAxMzYuNzc0IDExLjMwMTdaIiBmaWxsPSJjdXJyZW50Q29sb3IiLz4KPHBhdGggZD0iTTEzMS41IDkuNTIxNDFDMTMyLjM0IDkuNTIxNDEgMTMzLjAyMSA4Ljg0MDQ1IDEzMy4wMjEgOC4wMDA0NUMxMzMuMDIxIDcuMTYwNDUgMTMyLjM0IDYuNDc5NDkgMTMxLjUgNi40Nzk0OUMxMzAuNjYgNi40Nzk0OSAxMjkuOTc5IDcuMTYwNDUgMTI5Ljk3OSA4LjAwMDQ1QzEyOS45NzkgOC44NDA0NSAxMzAuNjYgOS41MjE0MSAxMzEuNSA5LjUyMTQxWiIgZmlsbD0iY3VycmVudENvbG9yIi8+CjxwYXRoIG9wYWNpdHk9IjAuOCIgZD0iTTEyOC4yMzMgMTMuMjczOUwxMjkuMTg0IDExLjYyNzZDMTI5LjM3NCAxMS4yOTcxIDEyOS42MzQgMTEuMDExNSAxMjkuOTQ1IDEwLjc5MDJDMTMwLjI1NiAxMC41Njg5IDEzMC42MTEgMTAuNDE3IDEzMC45ODYgMTAuMzQ0OUMxMzEuMzYxIDEwLjI3MjcgMTMxLjc0NiAxMC4yODIgMTMyLjExNyAxMC4zNzIxQzEzMi40ODggMTAuNDYyMSAxMzIuODM1IDEwLjYzMDkgMTMzLjEzNSAxMC44NjY5TDEzMC44NjggMTQuNzk0OUMxMzAuNjY2IDE1LjE0NDIgMTMwLjMzNCAxNS4zOTkxIDEyOS45NDQgMTUuNTAzNkMxMjkuNTU0IDE1LjYwOCAxMjkuMTM5IDE1LjU1MzMgMTI4Ljc5IDE1LjM1MTZDMTI4LjQ0IDE1LjE0OTkgMTI4LjE4NiAxNC44MTc3IDEyOC4wODEgMTQuNDI4QzEyNy45NzcgMTQuMDM4NCAxMjguMDMxIDEzLjYyMzIgMTI4LjIzMyAxMy4yNzM5WiIgZmlsbD0iY3VycmVudENvbG9yIi8+CjxwYXRoIG9wYWNpdHk9IjAuNSIgZD0iTTEzNC43NjcgMTMuMjczOUwxMzMuODE3IDExLjYyNzZDMTMzLjYyNiAxMS4yOTcxIDEzMy4zNjYgMTEuMDExNSAxMzMuMDU1IDEwLjc5MDJDMTMyLjc0NCAxMC41Njg5IDEzMi4zODkgMTAuNDE3IDEzMi4wMTQgMTAuMzQ0OUMxMzEuNjQgMTAuMjcyNyAxMzEuMjU0IDEwLjI4MiAxMzAuODgzIDEwLjM3MjFDMTMwLjUxMiAxMC40NjIxIDEzMC4xNjUgMTAuNjMwOSAxMjkuODY1IDEwLjg2NjlMMTMyLjEzMyAxNC43OTQ5QzEzMi4yMzIgMTQuOTY3OSAxMzIuMzY1IDE1LjExOTUgMTMyLjUyNCAxNS4yNDExQzEzMi42ODIgMTUuMzYyNyAxMzIuODYzIDE1LjQ1MTkgMTMzLjA1NiAxNS41MDM2QzEzMy4yNDkgMTUuNTU1MyAxMzMuNDUgMTUuNTY4NCAxMzMuNjQ4IDE1LjU0MjRDMTMzLjg0NiAxNS41MTYzIDEzNC4wMzcgMTUuNDUxNSAxMzQuMjEgMTUuMzUxNkMxMzQuMzgzIDE1LjI1MTcgMTM0LjUzNSAxNS4xMTg4IDEzNC42NTcgMTQuOTYwM0MxMzQuNzc4IDE0LjgwMTggMTM0Ljg2NyAxNC42MjEgMTM0LjkxOSAxNC40MjhDMTM0Ljk3MSAxNC4yMzUxIDEzNC45ODQgMTQuMDMzOSAxMzQuOTU4IDEzLjgzNThDMTM0LjkzMiAxMy42Mzc4IDEzNC44NjcgMTMuNDQ2OCAxMzQuNzY3IDEzLjI3MzlaIiBmaWxsPSJjdXJyZW50Q29sb3IiLz4KPHBhdGggb3BhY2l0eT0iMC41IiBkPSJNMTI4LjIzMyAyLjcyNjM1TDEyOS4xODQgNC4zNzI2QzEyOS4zNzQgNC43MDMwOSAxMjkuNjM0IDQuOTg4NjcgMTI5Ljk0NSA1LjIwOTk5QzEzMC4yNTYgNS40MzEzIDEzMC42MTEgNS41ODMxOCAxMzAuOTg2IDUuNjU1MzNDMTMxLjM2MSA1LjcyNzQ3IDEzMS43NDYgNS43MTgyIDEzMi4xMTcgNS42MjgxNEMxMzIuNDg4IDUuNTM4MDggMTMyLjgzNSA1LjM2OTM0IDEzMy4xMzUgNS4xMzMzNEwxMzAuODY4IDEuMjA1MzNDMTMwLjc2OCAxLjAzMjM1IDEzMC42MzUgMC44ODA3MzMgMTMwLjQ3NiAwLjc1OTEzN0MxMzAuMzE4IDAuNjM3NTQyIDEzMC4xMzcgMC41NDgzNDkgMTI5Ljk0NCAwLjQ5NjY1MkMxMjkuNzUxIDAuNDQ0OTU0IDEyOS41NSAwLjQzMTc2NSAxMjkuMzUyIDAuNDU3ODM3QzEyOS4xNTQgMC40ODM5MDggMTI4Ljk2MyAwLjU0ODczIDEyOC43OSAwLjY0ODYwMkMxMjguNjE3IDAuNzQ4NDczIDEyOC40NjUgMC44ODE0MzggMTI4LjM0NCAxLjAzOTlDMTI4LjIyMiAxLjE5ODM3IDEyOC4xMzMgMS4zNzkyNCAxMjguMDgxIDEuNTcyMTdDMTI4LjAyOSAxLjc2NTExIDEyOC4wMTYgMS45NjYzNCAxMjguMDQyIDIuMTY0MzdDMTI4LjA2OCAyLjM2MjQxIDEyOC4xMzMgMi41NTMzNyAxMjguMjMzIDIuNzI2MzVaIiBmaWxsPSJjdXJyZW50Q29sb3IiLz4KPHBhdGggb3BhY2l0eT0iMC44IiBkPSJNMTM0Ljc2NyAyLjcyNjM1TDEzMy44MTcgNC4zNzI2MUMxMzMuNjI2IDQuNzAzMDkgMTMzLjM2NiA0Ljk4ODY3IDEzMy4wNTUgNS4yMDk5OUMxMzIuNzQ0IDUuNDMxMyAxMzIuMzg5IDUuNTgzMTggMTMyLjAxNCA1LjY1NTMzQzEzMS42NCA1LjcyNzQ4IDEzMS4yNTQgNS43MTgyMSAxMzAuODgzIDUuNjI4MTVDMTMwLjUxMiA1LjUzODA5IDEzMC4xNjUgNS4zNjkzNCAxMjkuODY1IDUuMTMzMzVMMTMyLjEzMyAxLjIwNTM0QzEzMi4zMzQgMC44NTU5ODMgMTMyLjY2NyAwLjYwMTA2MyAxMzMuMDU2IDAuNDk2NjU2QzEzMy40NDYgMC4zOTIyNDggMTMzLjg2MSAwLjQ0NjkwNiAxMzQuMjEgMC42NDg2MDVDMTM0LjU2IDAuODUwMzA1IDEzNC44MTUgMS4xODI1MiAxMzQuOTE5IDEuNTcyMThDMTM1LjAyMyAxLjk2MTgzIDEzNC45NjkgMi4zNzcgMTM0Ljc2NyAyLjcyNjM1WiIgZmlsbD0iY3VycmVudENvbG9yIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfNDAwXzQxMTUiPgo8cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9IndoaXRlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMjMuNSkiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K";
var ellipsis = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjc1IDEwQzEzLjc1IDEwLjY5MDQgMTQuMzA5NiAxMS4yNSAxNSAxMS4yNUMxNS42OTA0IDExLjI1IDE2LjI1IDEwLjY5MDQgMTYuMjUgMTBDMTYuMjUgOS4zMDk2NCAxNS42OTA0IDguNzUgMTUgOC43NUMxNC4zMDk2IDguNzUgMTMuNzUgOS4zMDk2NCAxMy43NSAxMFoiIGZpbGw9ImN1cnJlbnRDb2xvciIvPgo8cGF0aCBkPSJNOC43NSAxMEM4Ljc1IDEwLjY5MDQgOS4zMDk2NCAxMS4yNSAxMCAxMS4yNUMxMC42OTA0IDExLjI1IDExLjI1IDEwLjY5MDQgMTEuMjUgMTBDMTEuMjUgOS4zMDk2NCAxMC42OTA0IDguNzUgMTAgOC43NUM5LjMwOTY0IDguNzUgOC43NSA5LjMwOTY0IDguNzUgMTBaIiBmaWxsPSJjdXJyZW50Q29sb3IiLz4KPHBhdGggZD0iTTMuNzUgMTBDMy43NSAxMC42OTA0IDQuMzA5NjQgMTEuMjUgNSAxMS4yNUM1LjY5MDM2IDExLjI1IDYuMjUgMTAuNjkwNCA2LjI1IDEwQzYuMjUgOS4zMDk2NCA1LjY5MDM2IDguNzUgNSA4Ljc1QzQuMzA5NjQgOC43NSAzLjc1IDkuMzA5NjQgMy43NSAxMFoiIGZpbGw9ImN1cnJlbnRDb2xvciIvPgo8L3N2Zz4K";
var chevronLeft = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyNCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE0IDE4TDEwIDE0TDE0IDEwIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=";
var chevronRight = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyNCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwIDEwTDE0IDE0TDEwIDE4IiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=";
var doubleChevronLeft = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAzMCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDE4TDE2IDE0TDIwIDEwIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0xNCAxOEwxMCAxNEwxNCAxMCIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K";
var doubleChevronRight = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAzMCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwIDEwTDE0IDE0TDEwIDE4IiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0xNiAxMEwyMCAxNEwxNiAxOCIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K";
var chevronDown = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEuMDIyNTkgMy4zMDgyNEMxLjEzOTggMy4xOTEwNyAxLjI5ODc0IDMuMTI1MjQgMS40NjQ0NyAzLjEyNTI0QzEuNjMwMTkgMy4xMjUyNCAxLjc4OTE0IDMuMTkxMDcgMS45MDYzNCAzLjMwODI0TDUuMDAwMDkgNi40MDE5OUw4LjA5Mzg0IDMuMzA4MjRDOC4yMTE3MiAzLjE5NDM5IDguMzY5NTkgMy4xMzEzOSA4LjUzMzQ3IDMuMTMyODFDOC42OTczNCAzLjEzNDI0IDguODU0MSAzLjE5OTk3IDguOTY5OTggMy4zMTU4NUM5LjA4NTg2IDMuNDMxNzMgOS4xNTE1OSAzLjU4ODQ5IDkuMTUzMDEgMy43NTIzNkM5LjE1NDQ0IDMuOTE2MjMgOS4wOTE0NCA0LjA3NDExIDguOTc3NTkgNC4xOTE5OUw1LjQ0MTk3IDcuNzI3NjFDNS4zMjQ3NiA3Ljg0NDc4IDUuMTY1ODIgNy45MTA2IDUuMDAwMDkgNy45MTA2QzQuODM0MzYgNy45MTA2IDQuNjc1NDIgNy44NDQ3OCA0LjU1ODIyIDcuNzI3NjFMMS4wMjI1OSA0LjE5MTk5QzAuOTA1NDIyIDQuMDc0NzggMC44Mzk2IDMuOTE1ODQgMC44Mzk2IDMuNzUwMTFDMC44Mzk2IDMuNTg0MzggMC45MDU0MjIgMy40MjU0NCAxLjAyMjU5IDMuMzA4MjRaIiBmaWxsPSJjdXJyZW50Q29sb3IiLz4KPC9zdmc+Cg==";
var tableChevronDown = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjYgNC44MDAwNUw3Ljk5OTk4IDEwLjRMMi4zOTk5OCA0LjgwMDA1IiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K";
var Icons = {
  appleBiometric,
  windowsHello,
  genericBiometrics,
  emailFailed,
  emailSuccess,
  email,
  fingerprintFailed,
  fingerprintSuccess,
  passkey,
  phone,
  help,
  close,
  loginWithEmail,
  loginWithText,
  privateIcon,
  secure,
  simple,
  iconInvalidCode,
  passkeyArrow,
  success,
  failure,
  poweredByPassage,
  ellipsis,
  chevronLeft,
  chevronRight,
  doubleChevronLeft,
  doubleChevronRight,
  chevronDown,
  tableChevronDown
};
var cache = {};
function filterAttrs(attrs) {
  return Object.keys(attrs).reduce((result, key) => {
    if (attrs[key] !== false && attrs[key] !== null && attrs[key] !== void 0) {
      result[key] = attrs[key];
    }
    return result;
  }, {});
}
var InlineSvg = {
  name: "InlineSvg",
  inheritAttrs: false,
  render() {
    if (!this.svgElSource) {
      return null;
    }
    return h$1(
      "svg",
      Object.assign(
        {},
        this.getSvgAttrs(this.svgElSource),
        filterAttrs(this.$attrs),
        { innerHTML: this.getSvgContent(this.svgElSource) }
      )
    );
  },
  props: {
    src: {
      type: String,
      required: true
    },
    title: {
      type: String
    },
    transformSource: {
      type: Function,
      default: (svg) => svg
    },
    keepDuringLoading: {
      type: Boolean,
      default: true
    }
  },
  emits: ["loaded", "unloaded", "error"],
  data() {
    return {
      svgElSource: null
    };
  },
  watch: {
    src(newValue) {
      this.getSource(newValue);
    }
  },
  mounted() {
    this.getSource(this.src);
  },
  methods: {
    getSvgAttrs(svgEl) {
      let svgAttrs = {};
      const attrs = svgEl.attributes;
      if (!attrs) {
        return svgAttrs;
      }
      for (let i = attrs.length - 1; i >= 0; i--) {
        svgAttrs[attrs[i].name] = attrs[i].value;
      }
      return svgAttrs;
    },
    getSvgContent(svgEl) {
      svgEl = svgEl.cloneNode(true);
      svgEl = this.transformSource(svgEl);
      if (this.title) {
        setTitle(svgEl, this.title);
      }
      return svgEl.innerHTML;
    },
    getSource(src) {
      if (!cache[src]) {
        cache[src] = this.download(src);
      }
      if (this.svgElSource && cache[src].getIsPending() && !this.keepDuringLoading) {
        this.svgElSource = null;
        this.$emit("unloaded");
      }
      cache[src].then((svg) => {
        this.svgElSource = svg;
        this.$nextTick(() => {
          this.$emit("loaded", this.$el);
        });
      }).catch((err) => {
        if (this.svgElSource) {
          this.svgElSource = null;
          this.$emit("unloaded");
        }
        delete cache[src];
        this.$emit("error", err);
      });
    },
    download(url) {
      return makePromiseState(new Promise((resolve2, reject) => {
        const request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.onload = () => {
          if (request.status >= 200 && request.status < 400) {
            try {
              const parser = new DOMParser();
              const result = parser.parseFromString(request.responseText, "text/xml");
              let svgEl = result.getElementsByTagName("svg")[0];
              if (svgEl) {
                resolve2(svgEl);
              } else {
                reject(new Error('Loaded file is not valid SVG"'));
              }
            } catch (e2) {
              reject(e2);
            }
          } else {
            reject(new Error("Error loading SVG"));
          }
        };
        request.onerror = reject;
        request.send();
      }));
    }
  }
};
function setTitle(svg, title) {
  const titleTags = svg.getElementsByTagName("title");
  if (titleTags.length) {
    titleTags[0].textContent = title;
  } else {
    const titleEl = document.createElementNS("http://www.w3.org/2000/svg", "title");
    titleEl.textContent = title;
    svg.insertBefore(titleEl, svg.firstChild);
  }
}
function makePromiseState(promise) {
  if (promise.getIsPending)
    return promise;
  let isPending = true;
  let result = promise.then(
    (v2) => {
      isPending = false;
      return v2;
    },
    (e2) => {
      isPending = false;
      throw e2;
    }
  );
  result.getIsPending = function getIsPending() {
    return isPending;
  };
  return result;
}
function useAddDevice() {
  const addPending = ref(false);
  const errorMessage = ref("");
  const { passage } = usePassage();
  function addDevice(authenticatorAttachment) {
    return __async(this, null, function* () {
      errorMessage.value = "";
      addPending.value = true;
      try {
        const passageUser = passage.getCurrentUser();
        return yield passageUser.addDevice({ authenticatorAttachment });
      } catch (err) {
        console.error("Failed to add device, auth token likely missing or invalid.", err);
        errorMessage.value = useLocale().t("failed-to-add-this-device");
        return void 0;
      } finally {
        addPending.value = false;
      }
    });
  }
  return {
    addDevice,
    addPending,
    errorMessage
  };
}
function useAppInfo() {
  const invalidAppId = ref(false);
  const loading = ref(true);
  const appInfoRef = ref();
  const passage = ref();
  function execute() {
    return __async(this, null, function* () {
      invalidAppId.value = false;
      try {
        passage.value = usePassage().passage;
        const appInfo = yield passage.value.appInfo();
        yield setFallbackLocale(appInfo.default_language);
        invalidAppId.value = false;
        appInfoRef.value = appInfo;
        loading.value = false;
      } catch (err) {
        invalidAppId.value = true;
        loading.value = false;
      }
    });
  }
  onMounted(() => __async(this, null, function* () {
    yield execute();
  }));
  return {
    appInfo: appInfoRef,
    invalidAppId,
    loading,
    passage
  };
}
var _sfc_main = defineComponent({
  name: "Dropdown",
  components: {
    InlineSvg
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    maxDropdownItems: {
      type: Number,
      default: 7
    },
    modelValue: null,
    readonly: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "Select..."
    },
    error: {
      type: Boolean,
      default: false
    },
    colorScheme: {
      type: String,
      default: "default",
      required: false
    }
  },
  emits: {
    "change"(newValue) {
      return true;
    },
    "update:modelValue": (newValue) => {
      return true;
    }
  },
  setup(props, context) {
    const dropdownContainer = ref();
    const dropdownList = ref(null);
    function setItemRef(ref2) {
    }
    const selectedItem = computed(() => {
      return props.items.find((item) => item.value === props.modelValue);
    });
    const displayName = computed(() => {
      var _a, _b;
      return (_b = (_a = selectedItem.value) == null ? void 0 : _a.name) != null ? _b : props.placeholder;
    });
    const displayStyle = computed(() => {
      var _a, _b;
      return (_b = (_a = selectedItem.value) == null ? void 0 : _a.style) != null ? _b : "";
    });
    const showList = ref(false);
    const listMaxHeight = ref(0);
    function getListMaxHeight() {
      const listItemHeight = 30;
      const mininumItems = 2;
      const listGapOffset = 10;
      const absoluteMinHeight = listItemHeight * mininumItems;
      const absoluteMaxHeight = listItemHeight * props.maxDropdownItems + 1;
      if (dropdownContainer.value === null) {
        return absoluteMaxHeight;
      }
      const listTop = dropdownContainer.value.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;
      const maxVisibleHeight = windowHeight - listTop - listGapOffset;
      if (maxVisibleHeight < absoluteMinHeight) {
        return absoluteMinHeight;
      }
      if (maxVisibleHeight > absoluteMaxHeight) {
        return absoluteMaxHeight;
      }
      return maxVisibleHeight;
    }
    function toggleList() {
      if (props.readonly) {
        return;
      }
      if (!showList.value) {
        listMaxHeight.value = getListMaxHeight();
      }
      showList.value = !showList.value;
    }
    function selectItem(item) {
      context.emit("change", item.value);
      context.emit("update:modelValue", item.value);
      showList.value = false;
    }
    function getListWidth() {
      if (dropdownList.value === null) {
        return 0;
      }
      const width = dropdownList.value.getBoundingClientRect().width;
      return Math.ceil(width);
    }
    const buttonWidth = ref(0);
    const listWidthStyle = ref("");
    onMounted(() => {
      const listWidth = getListWidth();
      const buttonPadding = 15;
      buttonWidth.value = getListWidth() - buttonPadding;
      listWidthStyle.value = `width: ${listWidth}px;`;
    });
    return {
      displayName,
      showList,
      selectItem,
      setItemRef,
      buttonWidth,
      dropdownContainer,
      listWidthStyle,
      listMaxHeight,
      toggleList,
      dropdownList,
      displayStyle,
      selectedItem,
      Icons
    };
  }
});
var _hoisted_1 = ["readonly"];
var _hoisted_2 = ["onClick"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_inline_svg = resolveComponent("inline-svg");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["dropdown-container", [_ctx.colorScheme]]),
    tabindex: "0",
    onFocusout: _cache[1] || (_cache[1] = withModifiers(($event) => _ctx.showList = false, ["prevent"])),
    ref: "dropdownContainer",
    readonly: _ctx.readonly
  }, [
    createBaseVNode("div", {
      class: normalizeClass(["dropdown-button", { expanded: _ctx.showList, error: _ctx.error }]),
      style: normalizeStyle(`width: ${_ctx.buttonWidth}px; ${_ctx.displayStyle}`),
      onClick: _cache[0] || (_cache[0] = withModifiers((...args) => _ctx.toggleList && _ctx.toggleList(...args), ["prevent"]))
    }, [
      createBaseVNode("div", {
        class: normalizeClass(["dropdown-title", { placeholder: _ctx.selectedItem === void 0 }])
      }, toDisplayString$1(_ctx.displayName), 3),
      createVNode(_component_inline_svg, {
        src: _ctx.Icons.chevronDown,
        alt: "Chevron down"
      }, null, 8, ["src"])
    ], 6),
    createBaseVNode("div", {
      class: normalizeClass(["dropdown-list", { collapsed: !_ctx.showList }]),
      style: normalizeStyle(`max-height: ${_ctx.listMaxHeight}px; ${_ctx.listWidthStyle}`),
      ref: "dropdownList"
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.items, (item, index) => {
        return openBlock(), createElementBlock("div", {
          class: normalizeClass(["item", { "bottom-border": index !== _ctx.items.length - 1 }]),
          style: normalizeStyle(item.style),
          key: index,
          ref_for: true,
          ref: _ctx.setItemRef,
          onClick: withModifiers(($event) => _ctx.selectItem(item), ["prevent"])
        }, toDisplayString$1(item.name), 15, _hoisted_2);
      }), 128))
    ], 6)
  ], 42, _hoisted_1);
}
var Dropdown = _export_sfc(_sfc_main, [["render", _sfc_render]]);
function useIntlTelInput(containerRef) {
  onMounted(() => {
    if (containerRef.value === null) {
      return;
    }
    const shadowDOM = containerRef.value.parentNode;
    if (shadowDOM === null) {
      return;
    }
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.16/css/intlTelInput.css";
    shadowDOM.appendChild(link);
  });
}
function useStoreLocale(props) {
  const languageLoading = ref(true);
  setLocale(props.lang).finally(() => {
    languageLoading.value = false;
  });
  watch(
    () => props.lang,
    (previous, next) => {
      if (previous !== next) {
        setLocale(props.lang);
      }
    }
  );
  return {
    languageLoading
  };
}
var appStyles = ':root .grid-stack-item>.ui-resizable-handle{filter:none}.grid-stack{position:relative}.grid-stack.grid-stack-rtl{direction:ltr}.grid-stack.grid-stack-rtl>.grid-stack-item{direction:rtl}.grid-stack .grid-stack-placeholder>.placeholder-content{border:1px dashed #d3d3d3;margin:0;position:absolute;width:auto;z-index:0!important;text-align:center}.grid-stack>.grid-stack-item{min-width:8.3333333333%;position:absolute;padding:0}.grid-stack>.grid-stack-item>.grid-stack-item-content{margin:0;position:absolute;width:auto;overflow-x:hidden;overflow-y:auto}.grid-stack>.grid-stack-item>.ui-resizable-handle{position:absolute;font-size:.1px;display:block;-ms-touch-action:none;touch-action:none}.grid-stack>.grid-stack-item.ui-resizable-autohide>.ui-resizable-handle,.grid-stack>.grid-stack-item.ui-resizable-disabled>.ui-resizable-handle{display:none}.grid-stack>.grid-stack-item.ui-draggable-dragging,.grid-stack>.grid-stack-item.ui-resizable-resizing{z-index:100}.grid-stack>.grid-stack-item.ui-draggable-dragging>.grid-stack-item-content,.grid-stack>.grid-stack-item.ui-resizable-resizing>.grid-stack-item-content{box-shadow:1px 4px 6px #0003;opacity:.8}.grid-stack>.grid-stack-item>.ui-resizable-se,.grid-stack>.grid-stack-item>.ui-resizable-sw{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDUxMS42MjYgNTExLjYyNyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTExLjYyNiA1MTEuNjI3OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTMyOC45MDYsNDAxLjk5NGgtMzYuNTUzVjEwOS42MzZoMzYuNTUzYzQuOTQ4LDAsOS4yMzYtMS44MDksMTIuODQ3LTUuNDI2YzMuNjEzLTMuNjE1LDUuNDIxLTcuODk4LDUuNDIxLTEyLjg0NSAgIGMwLTQuOTQ5LTEuODAxLTkuMjMxLTUuNDI4LTEyLjg1MWwtNzMuMDg3LTczLjA5QzI2NS4wNDQsMS44MDksMjYwLjc2LDAsMjU1LjgxMywwYy00Ljk0OCwwLTkuMjI5LDEuODA5LTEyLjg0Nyw1LjQyNCAgIGwtNzMuMDg4LDczLjA5Yy0zLjYxOCwzLjYxOS01LjQyNCw3LjkwMi01LjQyNCwxMi44NTFjMCw0Ljk0NiwxLjgwNyw5LjIyOSw1LjQyNCwxMi44NDVjMy42MTksMy42MTcsNy45MDEsNS40MjYsMTIuODUsNS40MjYgICBoMzYuNTQ1djI5Mi4zNThoLTM2LjU0MmMtNC45NTIsMC05LjIzNSwxLjgwOC0xMi44NSw1LjQyMWMtMy42MTcsMy42MjEtNS40MjQsNy45MDUtNS40MjQsMTIuODU0ICAgYzAsNC45NDUsMS44MDcsOS4yMjcsNS40MjQsMTIuODQ3bDczLjA4OSw3My4wODhjMy42MTcsMy42MTcsNy44OTgsNS40MjQsMTIuODQ3LDUuNDI0YzQuOTUsMCw5LjIzNC0xLjgwNywxMi44NDktNS40MjQgICBsNzMuMDg3LTczLjA4OGMzLjYxMy0zLjYyLDUuNDIxLTcuOTAxLDUuNDIxLTEyLjg0N2MwLTQuOTQ4LTEuODA4LTkuMjMyLTUuNDIxLTEyLjg1NCAgIEMzMzguMTQyLDQwMy44MDIsMzMzLjg1Nyw0MDEuOTk0LDMyOC45MDYsNDAxLjk5NHoiIGZpbGw9IiM2NjY2NjYiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K);background-repeat:no-repeat;background-position:center;-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-ms-transform:rotate(45deg);-o-transform:rotate(45deg);transform:rotate(45deg)}.grid-stack>.grid-stack-item>.ui-resizable-se{-webkit-transform:rotate(-45deg);-moz-transform:rotate(-45deg);-ms-transform:rotate(-45deg);-o-transform:rotate(-45deg);transform:rotate(-45deg)}.grid-stack>.grid-stack-item>.ui-resizable-nw{cursor:nw-resize;width:20px;height:20px;top:0}.grid-stack>.grid-stack-item>.ui-resizable-n{cursor:n-resize;height:10px;top:0;left:25px;right:25px}.grid-stack>.grid-stack-item>.ui-resizable-ne{cursor:ne-resize;width:20px;height:20px;top:0}.grid-stack>.grid-stack-item>.ui-resizable-e{cursor:e-resize;width:10px;top:15px;bottom:15px}.grid-stack>.grid-stack-item>.ui-resizable-se{cursor:se-resize;width:20px;height:20px}.grid-stack>.grid-stack-item>.ui-resizable-s{cursor:s-resize;height:10px;left:25px;bottom:0;right:25px}.grid-stack>.grid-stack-item>.ui-resizable-sw{cursor:sw-resize;width:20px;height:20px}.grid-stack>.grid-stack-item>.ui-resizable-w{cursor:w-resize;width:10px;top:15px;bottom:15px}.grid-stack>.grid-stack-item.ui-draggable-dragging>.ui-resizable-handle{display:none!important}.grid-stack>.grid-stack-item[gs-w="0"]{width:0%}.grid-stack>.grid-stack-item[gs-x="0"]{left:0}.grid-stack>.grid-stack-item[gs-min-w="0"]{min-width:0}.grid-stack>.grid-stack-item[gs-max-w="0"]{max-width:0%}.grid-stack>.grid-stack-item[gs-w="1"]{width:8.3333333333%}.grid-stack>.grid-stack-item[gs-x="1"]{left:8.3333333333%}.grid-stack>.grid-stack-item[gs-min-w="1"]{min-width:8.3333333333%}.grid-stack>.grid-stack-item[gs-max-w="1"]{max-width:8.3333333333%}.grid-stack>.grid-stack-item[gs-w="2"]{width:16.6666666667%}.grid-stack>.grid-stack-item[gs-x="2"]{left:16.6666666667%}.grid-stack>.grid-stack-item[gs-min-w="2"]{min-width:16.6666666667%}.grid-stack>.grid-stack-item[gs-max-w="2"]{max-width:16.6666666667%}.grid-stack>.grid-stack-item[gs-w="3"]{width:25%}.grid-stack>.grid-stack-item[gs-x="3"]{left:25%}.grid-stack>.grid-stack-item[gs-min-w="3"]{min-width:25%}.grid-stack>.grid-stack-item[gs-max-w="3"]{max-width:25%}.grid-stack>.grid-stack-item[gs-w="4"]{width:33.3333333333%}.grid-stack>.grid-stack-item[gs-x="4"]{left:33.3333333333%}.grid-stack>.grid-stack-item[gs-min-w="4"]{min-width:33.3333333333%}.grid-stack>.grid-stack-item[gs-max-w="4"]{max-width:33.3333333333%}.grid-stack>.grid-stack-item[gs-w="5"]{width:41.6666666667%}.grid-stack>.grid-stack-item[gs-x="5"]{left:41.6666666667%}.grid-stack>.grid-stack-item[gs-min-w="5"]{min-width:41.6666666667%}.grid-stack>.grid-stack-item[gs-max-w="5"]{max-width:41.6666666667%}.grid-stack>.grid-stack-item[gs-w="6"]{width:50%}.grid-stack>.grid-stack-item[gs-x="6"]{left:50%}.grid-stack>.grid-stack-item[gs-min-w="6"]{min-width:50%}.grid-stack>.grid-stack-item[gs-max-w="6"]{max-width:50%}.grid-stack>.grid-stack-item[gs-w="7"]{width:58.3333333333%}.grid-stack>.grid-stack-item[gs-x="7"]{left:58.3333333333%}.grid-stack>.grid-stack-item[gs-min-w="7"]{min-width:58.3333333333%}.grid-stack>.grid-stack-item[gs-max-w="7"]{max-width:58.3333333333%}.grid-stack>.grid-stack-item[gs-w="8"]{width:66.6666666667%}.grid-stack>.grid-stack-item[gs-x="8"]{left:66.6666666667%}.grid-stack>.grid-stack-item[gs-min-w="8"]{min-width:66.6666666667%}.grid-stack>.grid-stack-item[gs-max-w="8"]{max-width:66.6666666667%}.grid-stack>.grid-stack-item[gs-w="9"]{width:75%}.grid-stack>.grid-stack-item[gs-x="9"]{left:75%}.grid-stack>.grid-stack-item[gs-min-w="9"]{min-width:75%}.grid-stack>.grid-stack-item[gs-max-w="9"]{max-width:75%}.grid-stack>.grid-stack-item[gs-w="10"]{width:83.3333333333%}.grid-stack>.grid-stack-item[gs-x="10"]{left:83.3333333333%}.grid-stack>.grid-stack-item[gs-min-w="10"]{min-width:83.3333333333%}.grid-stack>.grid-stack-item[gs-max-w="10"]{max-width:83.3333333333%}.grid-stack>.grid-stack-item[gs-w="11"]{width:91.6666666667%}.grid-stack>.grid-stack-item[gs-x="11"]{left:91.6666666667%}.grid-stack>.grid-stack-item[gs-min-w="11"]{min-width:91.6666666667%}.grid-stack>.grid-stack-item[gs-max-w="11"]{max-width:91.6666666667%}.grid-stack>.grid-stack-item[gs-w="12"]{width:100%}.grid-stack>.grid-stack-item[gs-x="12"]{left:100%}.grid-stack>.grid-stack-item[gs-min-w="12"]{min-width:100%}.grid-stack>.grid-stack-item[gs-max-w="12"]{max-width:100%}.grid-stack.grid-stack-1>.grid-stack-item{min-width:100%}.grid-stack.grid-stack-1>.grid-stack-item[gs-w="1"]{width:100%}.grid-stack.grid-stack-1>.grid-stack-item[gs-x="1"]{left:100%}.grid-stack.grid-stack-1>.grid-stack-item[gs-min-w="1"]{min-width:100%}.grid-stack.grid-stack-1>.grid-stack-item[gs-max-w="1"]{max-width:100%}.grid-stack.grid-stack-animate,.grid-stack.grid-stack-animate .grid-stack-item{-webkit-transition:left .3s,top .3s,height .3s,width .3s;-moz-transition:left .3s,top .3s,height .3s,width .3s;-ms-transition:left .3s,top .3s,height .3s,width .3s;-o-transition:left .3s,top .3s,height .3s,width .3s;transition:left .3s,top .3s,height .3s,width .3s}.grid-stack.grid-stack-animate .grid-stack-item.grid-stack-placeholder,.grid-stack.grid-stack-animate .grid-stack-item.ui-draggable-dragging,.grid-stack.grid-stack-animate .grid-stack-item.ui-resizable-resizing{-webkit-transition:left 0s,top 0s,height 0s,width 0s;-moz-transition:left 0s,top 0s,height 0s,width 0s;-ms-transition:left 0s,top 0s,height 0s,width 0s;-o-transition:left 0s,top 0s,height 0s,width 0s;transition:left 0s,top 0s,height 0s,width 0s}.grid-stack.grid-stack-2>.grid-stack-item{min-width:50%}.grid-stack.grid-stack-2>.grid-stack-item[gs-w="1"]{width:50%}.grid-stack.grid-stack-2>.grid-stack-item[gs-x="1"]{left:50%}.grid-stack.grid-stack-2>.grid-stack-item[gs-min-w="1"]{min-width:50%}.grid-stack.grid-stack-2>.grid-stack-item[gs-max-w="1"]{max-width:50%}.grid-stack.grid-stack-2>.grid-stack-item[gs-w="2"]{width:100%}.grid-stack.grid-stack-2>.grid-stack-item[gs-x="2"]{left:100%}.grid-stack.grid-stack-2>.grid-stack-item[gs-min-w="2"]{min-width:100%}.grid-stack.grid-stack-2>.grid-stack-item[gs-max-w="2"]{max-width:100%}.grid-stack.grid-stack-3>.grid-stack-item{min-width:33.3333333333%}.grid-stack.grid-stack-3>.grid-stack-item[gs-w="1"]{width:33.3333333333%}.grid-stack.grid-stack-3>.grid-stack-item[gs-x="1"]{left:33.3333333333%}.grid-stack.grid-stack-3>.grid-stack-item[gs-min-w="1"]{min-width:33.3333333333%}.grid-stack.grid-stack-3>.grid-stack-item[gs-max-w="1"]{max-width:33.3333333333%}.grid-stack.grid-stack-3>.grid-stack-item[gs-w="2"]{width:66.6666666667%}.grid-stack.grid-stack-3>.grid-stack-item[gs-x="2"]{left:66.6666666667%}.grid-stack.grid-stack-3>.grid-stack-item[gs-min-w="2"]{min-width:66.6666666667%}.grid-stack.grid-stack-3>.grid-stack-item[gs-max-w="2"]{max-width:66.6666666667%}.grid-stack.grid-stack-3>.grid-stack-item[gs-w="3"]{width:100%}.grid-stack.grid-stack-3>.grid-stack-item[gs-x="3"]{left:100%}.grid-stack.grid-stack-3>.grid-stack-item[gs-min-w="3"]{min-width:100%}.grid-stack.grid-stack-3>.grid-stack-item[gs-max-w="3"]{max-width:100%}.grid-stack.grid-stack-4>.grid-stack-item{min-width:25%}.grid-stack.grid-stack-4>.grid-stack-item[gs-w="1"]{width:25%}.grid-stack.grid-stack-4>.grid-stack-item[gs-x="1"]{left:25%}.grid-stack.grid-stack-4>.grid-stack-item[gs-min-w="1"]{min-width:25%}.grid-stack.grid-stack-4>.grid-stack-item[gs-max-w="1"]{max-width:25%}.grid-stack.grid-stack-4>.grid-stack-item[gs-w="2"]{width:50%}.grid-stack.grid-stack-4>.grid-stack-item[gs-x="2"]{left:50%}.grid-stack.grid-stack-4>.grid-stack-item[gs-min-w="2"]{min-width:50%}.grid-stack.grid-stack-4>.grid-stack-item[gs-max-w="2"]{max-width:50%}.grid-stack.grid-stack-4>.grid-stack-item[gs-w="3"]{width:75%}.grid-stack.grid-stack-4>.grid-stack-item[gs-x="3"]{left:75%}.grid-stack.grid-stack-4>.grid-stack-item[gs-min-w="3"]{min-width:75%}.grid-stack.grid-stack-4>.grid-stack-item[gs-max-w="3"]{max-width:75%}.grid-stack.grid-stack-4>.grid-stack-item[gs-w="4"]{width:100%}.grid-stack.grid-stack-4>.grid-stack-item[gs-x="4"]{left:100%}.grid-stack.grid-stack-4>.grid-stack-item[gs-min-w="4"]{min-width:100%}.grid-stack.grid-stack-4>.grid-stack-item[gs-max-w="4"]{max-width:100%}.grid-stack.grid-stack-5>.grid-stack-item{min-width:20%}.grid-stack.grid-stack-5>.grid-stack-item[gs-w="1"]{width:20%}.grid-stack.grid-stack-5>.grid-stack-item[gs-x="1"]{left:20%}.grid-stack.grid-stack-5>.grid-stack-item[gs-min-w="1"]{min-width:20%}.grid-stack.grid-stack-5>.grid-stack-item[gs-max-w="1"]{max-width:20%}.grid-stack.grid-stack-5>.grid-stack-item[gs-w="2"]{width:40%}.grid-stack.grid-stack-5>.grid-stack-item[gs-x="2"]{left:40%}.grid-stack.grid-stack-5>.grid-stack-item[gs-min-w="2"]{min-width:40%}.grid-stack.grid-stack-5>.grid-stack-item[gs-max-w="2"]{max-width:40%}.grid-stack.grid-stack-5>.grid-stack-item[gs-w="3"]{width:60%}.grid-stack.grid-stack-5>.grid-stack-item[gs-x="3"]{left:60%}.grid-stack.grid-stack-5>.grid-stack-item[gs-min-w="3"]{min-width:60%}.grid-stack.grid-stack-5>.grid-stack-item[gs-max-w="3"]{max-width:60%}.grid-stack.grid-stack-5>.grid-stack-item[gs-w="4"]{width:80%}.grid-stack.grid-stack-5>.grid-stack-item[gs-x="4"]{left:80%}.grid-stack.grid-stack-5>.grid-stack-item[gs-min-w="4"]{min-width:80%}.grid-stack.grid-stack-5>.grid-stack-item[gs-max-w="4"]{max-width:80%}.grid-stack.grid-stack-5>.grid-stack-item[gs-w="5"]{width:100%}.grid-stack.grid-stack-5>.grid-stack-item[gs-x="5"]{left:100%}.grid-stack.grid-stack-5>.grid-stack-item[gs-min-w="5"]{min-width:100%}.grid-stack.grid-stack-5>.grid-stack-item[gs-max-w="5"]{max-width:100%}.grid-stack.grid-stack-6>.grid-stack-item{min-width:16.6666666667%}.grid-stack.grid-stack-6>.grid-stack-item[gs-w="1"]{width:16.6666666667%}.grid-stack.grid-stack-6>.grid-stack-item[gs-x="1"]{left:16.6666666667%}.grid-stack.grid-stack-6>.grid-stack-item[gs-min-w="1"]{min-width:16.6666666667%}.grid-stack.grid-stack-6>.grid-stack-item[gs-max-w="1"]{max-width:16.6666666667%}.grid-stack.grid-stack-6>.grid-stack-item[gs-w="2"]{width:33.3333333333%}.grid-stack.grid-stack-6>.grid-stack-item[gs-x="2"]{left:33.3333333333%}.grid-stack.grid-stack-6>.grid-stack-item[gs-min-w="2"]{min-width:33.3333333333%}.grid-stack.grid-stack-6>.grid-stack-item[gs-max-w="2"]{max-width:33.3333333333%}.grid-stack.grid-stack-6>.grid-stack-item[gs-w="3"]{width:50%}.grid-stack.grid-stack-6>.grid-stack-item[gs-x="3"]{left:50%}.grid-stack.grid-stack-6>.grid-stack-item[gs-min-w="3"]{min-width:50%}.grid-stack.grid-stack-6>.grid-stack-item[gs-max-w="3"]{max-width:50%}.grid-stack.grid-stack-6>.grid-stack-item[gs-w="4"]{width:66.6666666667%}.grid-stack.grid-stack-6>.grid-stack-item[gs-x="4"]{left:66.6666666667%}.grid-stack.grid-stack-6>.grid-stack-item[gs-min-w="4"]{min-width:66.6666666667%}.grid-stack.grid-stack-6>.grid-stack-item[gs-max-w="4"]{max-width:66.6666666667%}.grid-stack.grid-stack-6>.grid-stack-item[gs-w="5"]{width:83.3333333333%}.grid-stack.grid-stack-6>.grid-stack-item[gs-x="5"]{left:83.3333333333%}.grid-stack.grid-stack-6>.grid-stack-item[gs-min-w="5"]{min-width:83.3333333333%}.grid-stack.grid-stack-6>.grid-stack-item[gs-max-w="5"]{max-width:83.3333333333%}.grid-stack.grid-stack-6>.grid-stack-item[gs-w="6"]{width:100%}.grid-stack.grid-stack-6>.grid-stack-item[gs-x="6"]{left:100%}.grid-stack.grid-stack-6>.grid-stack-item[gs-min-w="6"]{min-width:100%}.grid-stack.grid-stack-6>.grid-stack-item[gs-max-w="6"]{max-width:100%}.grid-stack.grid-stack-7>.grid-stack-item{min-width:14.2857142857%}.grid-stack.grid-stack-7>.grid-stack-item[gs-w="1"]{width:14.2857142857%}.grid-stack.grid-stack-7>.grid-stack-item[gs-x="1"]{left:14.2857142857%}.grid-stack.grid-stack-7>.grid-stack-item[gs-min-w="1"]{min-width:14.2857142857%}.grid-stack.grid-stack-7>.grid-stack-item[gs-max-w="1"]{max-width:14.2857142857%}.grid-stack.grid-stack-7>.grid-stack-item[gs-w="2"]{width:28.5714285714%}.grid-stack.grid-stack-7>.grid-stack-item[gs-x="2"]{left:28.5714285714%}.grid-stack.grid-stack-7>.grid-stack-item[gs-min-w="2"]{min-width:28.5714285714%}.grid-stack.grid-stack-7>.grid-stack-item[gs-max-w="2"]{max-width:28.5714285714%}.grid-stack.grid-stack-7>.grid-stack-item[gs-w="3"]{width:42.8571428571%}.grid-stack.grid-stack-7>.grid-stack-item[gs-x="3"]{left:42.8571428571%}.grid-stack.grid-stack-7>.grid-stack-item[gs-min-w="3"]{min-width:42.8571428571%}.grid-stack.grid-stack-7>.grid-stack-item[gs-max-w="3"]{max-width:42.8571428571%}.grid-stack.grid-stack-7>.grid-stack-item[gs-w="4"]{width:57.1428571429%}.grid-stack.grid-stack-7>.grid-stack-item[gs-x="4"]{left:57.1428571429%}.grid-stack.grid-stack-7>.grid-stack-item[gs-min-w="4"]{min-width:57.1428571429%}.grid-stack.grid-stack-7>.grid-stack-item[gs-max-w="4"]{max-width:57.1428571429%}.grid-stack.grid-stack-7>.grid-stack-item[gs-w="5"]{width:71.4285714286%}.grid-stack.grid-stack-7>.grid-stack-item[gs-x="5"]{left:71.4285714286%}.grid-stack.grid-stack-7>.grid-stack-item[gs-min-w="5"]{min-width:71.4285714286%}.grid-stack.grid-stack-7>.grid-stack-item[gs-max-w="5"]{max-width:71.4285714286%}.grid-stack.grid-stack-7>.grid-stack-item[gs-w="6"]{width:85.7142857143%}.grid-stack.grid-stack-7>.grid-stack-item[gs-x="6"]{left:85.7142857143%}.grid-stack.grid-stack-7>.grid-stack-item[gs-min-w="6"]{min-width:85.7142857143%}.grid-stack.grid-stack-7>.grid-stack-item[gs-max-w="6"]{max-width:85.7142857143%}.grid-stack.grid-stack-7>.grid-stack-item[gs-w="7"]{width:100%}.grid-stack.grid-stack-7>.grid-stack-item[gs-x="7"]{left:100%}.grid-stack.grid-stack-7>.grid-stack-item[gs-min-w="7"]{min-width:100%}.grid-stack.grid-stack-7>.grid-stack-item[gs-max-w="7"]{max-width:100%}.grid-stack.grid-stack-8>.grid-stack-item{min-width:12.5%}.grid-stack.grid-stack-8>.grid-stack-item[gs-w="1"]{width:12.5%}.grid-stack.grid-stack-8>.grid-stack-item[gs-x="1"]{left:12.5%}.grid-stack.grid-stack-8>.grid-stack-item[gs-min-w="1"]{min-width:12.5%}.grid-stack.grid-stack-8>.grid-stack-item[gs-max-w="1"]{max-width:12.5%}.grid-stack.grid-stack-8>.grid-stack-item[gs-w="2"]{width:25%}.grid-stack.grid-stack-8>.grid-stack-item[gs-x="2"]{left:25%}.grid-stack.grid-stack-8>.grid-stack-item[gs-min-w="2"]{min-width:25%}.grid-stack.grid-stack-8>.grid-stack-item[gs-max-w="2"]{max-width:25%}.grid-stack.grid-stack-8>.grid-stack-item[gs-w="3"]{width:37.5%}.grid-stack.grid-stack-8>.grid-stack-item[gs-x="3"]{left:37.5%}.grid-stack.grid-stack-8>.grid-stack-item[gs-min-w="3"]{min-width:37.5%}.grid-stack.grid-stack-8>.grid-stack-item[gs-max-w="3"]{max-width:37.5%}.grid-stack.grid-stack-8>.grid-stack-item[gs-w="4"]{width:50%}.grid-stack.grid-stack-8>.grid-stack-item[gs-x="4"]{left:50%}.grid-stack.grid-stack-8>.grid-stack-item[gs-min-w="4"]{min-width:50%}.grid-stack.grid-stack-8>.grid-stack-item[gs-max-w="4"]{max-width:50%}.grid-stack.grid-stack-8>.grid-stack-item[gs-w="5"]{width:62.5%}.grid-stack.grid-stack-8>.grid-stack-item[gs-x="5"]{left:62.5%}.grid-stack.grid-stack-8>.grid-stack-item[gs-min-w="5"]{min-width:62.5%}.grid-stack.grid-stack-8>.grid-stack-item[gs-max-w="5"]{max-width:62.5%}.grid-stack.grid-stack-8>.grid-stack-item[gs-w="6"]{width:75%}.grid-stack.grid-stack-8>.grid-stack-item[gs-x="6"]{left:75%}.grid-stack.grid-stack-8>.grid-stack-item[gs-min-w="6"]{min-width:75%}.grid-stack.grid-stack-8>.grid-stack-item[gs-max-w="6"]{max-width:75%}.grid-stack.grid-stack-8>.grid-stack-item[gs-w="7"]{width:87.5%}.grid-stack.grid-stack-8>.grid-stack-item[gs-x="7"]{left:87.5%}.grid-stack.grid-stack-8>.grid-stack-item[gs-min-w="7"]{min-width:87.5%}.grid-stack.grid-stack-8>.grid-stack-item[gs-max-w="7"]{max-width:87.5%}.grid-stack.grid-stack-8>.grid-stack-item[gs-w="8"]{width:100%}.grid-stack.grid-stack-8>.grid-stack-item[gs-x="8"]{left:100%}.grid-stack.grid-stack-8>.grid-stack-item[gs-min-w="8"]{min-width:100%}.grid-stack.grid-stack-8>.grid-stack-item[gs-max-w="8"]{max-width:100%}.grid-stack.grid-stack-9>.grid-stack-item{min-width:11.1111111111%}.grid-stack.grid-stack-9>.grid-stack-item[gs-w="1"]{width:11.1111111111%}.grid-stack.grid-stack-9>.grid-stack-item[gs-x="1"]{left:11.1111111111%}.grid-stack.grid-stack-9>.grid-stack-item[gs-min-w="1"]{min-width:11.1111111111%}.grid-stack.grid-stack-9>.grid-stack-item[gs-max-w="1"]{max-width:11.1111111111%}.grid-stack.grid-stack-9>.grid-stack-item[gs-w="2"]{width:22.2222222222%}.grid-stack.grid-stack-9>.grid-stack-item[gs-x="2"]{left:22.2222222222%}.grid-stack.grid-stack-9>.grid-stack-item[gs-min-w="2"]{min-width:22.2222222222%}.grid-stack.grid-stack-9>.grid-stack-item[gs-max-w="2"]{max-width:22.2222222222%}.grid-stack.grid-stack-9>.grid-stack-item[gs-w="3"]{width:33.3333333333%}.grid-stack.grid-stack-9>.grid-stack-item[gs-x="3"]{left:33.3333333333%}.grid-stack.grid-stack-9>.grid-stack-item[gs-min-w="3"]{min-width:33.3333333333%}.grid-stack.grid-stack-9>.grid-stack-item[gs-max-w="3"]{max-width:33.3333333333%}.grid-stack.grid-stack-9>.grid-stack-item[gs-w="4"]{width:44.4444444444%}.grid-stack.grid-stack-9>.grid-stack-item[gs-x="4"]{left:44.4444444444%}.grid-stack.grid-stack-9>.grid-stack-item[gs-min-w="4"]{min-width:44.4444444444%}.grid-stack.grid-stack-9>.grid-stack-item[gs-max-w="4"]{max-width:44.4444444444%}.grid-stack.grid-stack-9>.grid-stack-item[gs-w="5"]{width:55.5555555556%}.grid-stack.grid-stack-9>.grid-stack-item[gs-x="5"]{left:55.5555555556%}.grid-stack.grid-stack-9>.grid-stack-item[gs-min-w="5"]{min-width:55.5555555556%}.grid-stack.grid-stack-9>.grid-stack-item[gs-max-w="5"]{max-width:55.5555555556%}.grid-stack.grid-stack-9>.grid-stack-item[gs-w="6"]{width:66.6666666667%}.grid-stack.grid-stack-9>.grid-stack-item[gs-x="6"]{left:66.6666666667%}.grid-stack.grid-stack-9>.grid-stack-item[gs-min-w="6"]{min-width:66.6666666667%}.grid-stack.grid-stack-9>.grid-stack-item[gs-max-w="6"]{max-width:66.6666666667%}.grid-stack.grid-stack-9>.grid-stack-item[gs-w="7"]{width:77.7777777778%}.grid-stack.grid-stack-9>.grid-stack-item[gs-x="7"]{left:77.7777777778%}.grid-stack.grid-stack-9>.grid-stack-item[gs-min-w="7"]{min-width:77.7777777778%}.grid-stack.grid-stack-9>.grid-stack-item[gs-max-w="7"]{max-width:77.7777777778%}.grid-stack.grid-stack-9>.grid-stack-item[gs-w="8"]{width:88.8888888889%}.grid-stack.grid-stack-9>.grid-stack-item[gs-x="8"]{left:88.8888888889%}.grid-stack.grid-stack-9>.grid-stack-item[gs-min-w="8"]{min-width:88.8888888889%}.grid-stack.grid-stack-9>.grid-stack-item[gs-max-w="8"]{max-width:88.8888888889%}.grid-stack.grid-stack-9>.grid-stack-item[gs-w="9"]{width:100%}.grid-stack.grid-stack-9>.grid-stack-item[gs-x="9"]{left:100%}.grid-stack.grid-stack-9>.grid-stack-item[gs-min-w="9"]{min-width:100%}.grid-stack.grid-stack-9>.grid-stack-item[gs-max-w="9"]{max-width:100%}.grid-stack.grid-stack-10>.grid-stack-item{min-width:10%}.grid-stack.grid-stack-10>.grid-stack-item[gs-w="1"]{width:10%}.grid-stack.grid-stack-10>.grid-stack-item[gs-x="1"]{left:10%}.grid-stack.grid-stack-10>.grid-stack-item[gs-min-w="1"]{min-width:10%}.grid-stack.grid-stack-10>.grid-stack-item[gs-max-w="1"]{max-width:10%}.grid-stack.grid-stack-10>.grid-stack-item[gs-w="2"]{width:20%}.grid-stack.grid-stack-10>.grid-stack-item[gs-x="2"]{left:20%}.grid-stack.grid-stack-10>.grid-stack-item[gs-min-w="2"]{min-width:20%}.grid-stack.grid-stack-10>.grid-stack-item[gs-max-w="2"]{max-width:20%}.grid-stack.grid-stack-10>.grid-stack-item[gs-w="3"]{width:30%}.grid-stack.grid-stack-10>.grid-stack-item[gs-x="3"]{left:30%}.grid-stack.grid-stack-10>.grid-stack-item[gs-min-w="3"]{min-width:30%}.grid-stack.grid-stack-10>.grid-stack-item[gs-max-w="3"]{max-width:30%}.grid-stack.grid-stack-10>.grid-stack-item[gs-w="4"]{width:40%}.grid-stack.grid-stack-10>.grid-stack-item[gs-x="4"]{left:40%}.grid-stack.grid-stack-10>.grid-stack-item[gs-min-w="4"]{min-width:40%}.grid-stack.grid-stack-10>.grid-stack-item[gs-max-w="4"]{max-width:40%}.grid-stack.grid-stack-10>.grid-stack-item[gs-w="5"]{width:50%}.grid-stack.grid-stack-10>.grid-stack-item[gs-x="5"]{left:50%}.grid-stack.grid-stack-10>.grid-stack-item[gs-min-w="5"]{min-width:50%}.grid-stack.grid-stack-10>.grid-stack-item[gs-max-w="5"]{max-width:50%}.grid-stack.grid-stack-10>.grid-stack-item[gs-w="6"]{width:60%}.grid-stack.grid-stack-10>.grid-stack-item[gs-x="6"]{left:60%}.grid-stack.grid-stack-10>.grid-stack-item[gs-min-w="6"]{min-width:60%}.grid-stack.grid-stack-10>.grid-stack-item[gs-max-w="6"]{max-width:60%}.grid-stack.grid-stack-10>.grid-stack-item[gs-w="7"]{width:70%}.grid-stack.grid-stack-10>.grid-stack-item[gs-x="7"]{left:70%}.grid-stack.grid-stack-10>.grid-stack-item[gs-min-w="7"]{min-width:70%}.grid-stack.grid-stack-10>.grid-stack-item[gs-max-w="7"]{max-width:70%}.grid-stack.grid-stack-10>.grid-stack-item[gs-w="8"]{width:80%}.grid-stack.grid-stack-10>.grid-stack-item[gs-x="8"]{left:80%}.grid-stack.grid-stack-10>.grid-stack-item[gs-min-w="8"]{min-width:80%}.grid-stack.grid-stack-10>.grid-stack-item[gs-max-w="8"]{max-width:80%}.grid-stack.grid-stack-10>.grid-stack-item[gs-w="9"]{width:90%}.grid-stack.grid-stack-10>.grid-stack-item[gs-x="9"]{left:90%}.grid-stack.grid-stack-10>.grid-stack-item[gs-min-w="9"]{min-width:90%}.grid-stack.grid-stack-10>.grid-stack-item[gs-max-w="9"]{max-width:90%}.grid-stack.grid-stack-10>.grid-stack-item[gs-w="10"]{width:100%}.grid-stack.grid-stack-10>.grid-stack-item[gs-x="10"]{left:100%}.grid-stack.grid-stack-10>.grid-stack-item[gs-min-w="10"]{min-width:100%}.grid-stack.grid-stack-10>.grid-stack-item[gs-max-w="10"]{max-width:100%}.grid-stack.grid-stack-11>.grid-stack-item{min-width:9.0909090909%}.grid-stack.grid-stack-11>.grid-stack-item[gs-w="1"]{width:9.0909090909%}.grid-stack.grid-stack-11>.grid-stack-item[gs-x="1"]{left:9.0909090909%}.grid-stack.grid-stack-11>.grid-stack-item[gs-min-w="1"]{min-width:9.0909090909%}.grid-stack.grid-stack-11>.grid-stack-item[gs-max-w="1"]{max-width:9.0909090909%}.grid-stack.grid-stack-11>.grid-stack-item[gs-w="2"]{width:18.1818181818%}.grid-stack.grid-stack-11>.grid-stack-item[gs-x="2"]{left:18.1818181818%}.grid-stack.grid-stack-11>.grid-stack-item[gs-min-w="2"]{min-width:18.1818181818%}.grid-stack.grid-stack-11>.grid-stack-item[gs-max-w="2"]{max-width:18.1818181818%}.grid-stack.grid-stack-11>.grid-stack-item[gs-w="3"]{width:27.2727272727%}.grid-stack.grid-stack-11>.grid-stack-item[gs-x="3"]{left:27.2727272727%}.grid-stack.grid-stack-11>.grid-stack-item[gs-min-w="3"]{min-width:27.2727272727%}.grid-stack.grid-stack-11>.grid-stack-item[gs-max-w="3"]{max-width:27.2727272727%}.grid-stack.grid-stack-11>.grid-stack-item[gs-w="4"]{width:36.3636363636%}.grid-stack.grid-stack-11>.grid-stack-item[gs-x="4"]{left:36.3636363636%}.grid-stack.grid-stack-11>.grid-stack-item[gs-min-w="4"]{min-width:36.3636363636%}.grid-stack.grid-stack-11>.grid-stack-item[gs-max-w="4"]{max-width:36.3636363636%}.grid-stack.grid-stack-11>.grid-stack-item[gs-w="5"]{width:45.4545454545%}.grid-stack.grid-stack-11>.grid-stack-item[gs-x="5"]{left:45.4545454545%}.grid-stack.grid-stack-11>.grid-stack-item[gs-min-w="5"]{min-width:45.4545454545%}.grid-stack.grid-stack-11>.grid-stack-item[gs-max-w="5"]{max-width:45.4545454545%}.grid-stack.grid-stack-11>.grid-stack-item[gs-w="6"]{width:54.5454545455%}.grid-stack.grid-stack-11>.grid-stack-item[gs-x="6"]{left:54.5454545455%}.grid-stack.grid-stack-11>.grid-stack-item[gs-min-w="6"]{min-width:54.5454545455%}.grid-stack.grid-stack-11>.grid-stack-item[gs-max-w="6"]{max-width:54.5454545455%}.grid-stack.grid-stack-11>.grid-stack-item[gs-w="7"]{width:63.6363636364%}.grid-stack.grid-stack-11>.grid-stack-item[gs-x="7"]{left:63.6363636364%}.grid-stack.grid-stack-11>.grid-stack-item[gs-min-w="7"]{min-width:63.6363636364%}.grid-stack.grid-stack-11>.grid-stack-item[gs-max-w="7"]{max-width:63.6363636364%}.grid-stack.grid-stack-11>.grid-stack-item[gs-w="8"]{width:72.7272727273%}.grid-stack.grid-stack-11>.grid-stack-item[gs-x="8"]{left:72.7272727273%}.grid-stack.grid-stack-11>.grid-stack-item[gs-min-w="8"]{min-width:72.7272727273%}.grid-stack.grid-stack-11>.grid-stack-item[gs-max-w="8"]{max-width:72.7272727273%}.grid-stack.grid-stack-11>.grid-stack-item[gs-w="9"]{width:81.8181818182%}.grid-stack.grid-stack-11>.grid-stack-item[gs-x="9"]{left:81.8181818182%}.grid-stack.grid-stack-11>.grid-stack-item[gs-min-w="9"]{min-width:81.8181818182%}.grid-stack.grid-stack-11>.grid-stack-item[gs-max-w="9"]{max-width:81.8181818182%}.grid-stack.grid-stack-11>.grid-stack-item[gs-w="10"]{width:90.9090909091%}.grid-stack.grid-stack-11>.grid-stack-item[gs-x="10"]{left:90.9090909091%}.grid-stack.grid-stack-11>.grid-stack-item[gs-min-w="10"]{min-width:90.9090909091%}.grid-stack.grid-stack-11>.grid-stack-item[gs-max-w="10"]{max-width:90.9090909091%}.grid-stack.grid-stack-11>.grid-stack-item[gs-w="11"]{width:100%}.grid-stack.grid-stack-11>.grid-stack-item[gs-x="11"]{left:100%}.grid-stack.grid-stack-11>.grid-stack-item[gs-min-w="11"]{min-width:100%}.grid-stack.grid-stack-11>.grid-stack-item[gs-max-w="11"]{max-width:100%}#passage-auth-container,#passage-profile-container{border-radius:20px;--passage-container-background-color-default: #ffffff;--passage-container-max-width-default: 300px;--passage-input-box-background-color-default: #ffffff;--passage-input-box-border-radius-default: 5px;--passage-header-font-family-default: "Helvetica Neue", Helvetica, Arial, sans-serif;--passage-header-text-color-default: #000000;--passage-body-font-family-default: "Helvetica Neue", Helvetica, Arial, sans-serif;--passage-body-text-color-default: #000000;--passage-primary-button-background-color-default: #000000;--passage-primary-button-text-color-default: #ffffff;--passage-primary-button-background-hover-color-default: #4d4d4d;--passage-primary-button-border-radius-default: 5px;--passage-secondary-button-background-color-default: #ffffff;--passage-secondary-button-text-color-default: #000000;--passage-secondary-button-background-hover-color-default: #d7d7d7;--passage-secondary-button-border-radius-default: 5px;--passage-secondary-button-border-color-default: #000000;--passage-otp-input-background-color-default: #d7d7d7;--passage-container-margin-default: auto;--passage-container-padding-default: 24px;--passage-error-color-default: #dd0031;--passage-body-font-size-default: 14px;--passage-body-font-weight-default: 400;--passage-header-font-weight-default: 700;--passage-header-font-size-default: 18px;--passage-header-main-title-font-size-default: 24px;--passage-header-main-title-line-height-default: 31px;--passage-header-secondary-title-font-size-default: 20px;--passage-input-text-color-default: #000000;--passage-control-border-color-default: #d7d7d7;--passage-control-border-active-color-default: #000000;--passage-control-border-radius-default: 5px;--passage-button-font-weight-default: 600;--passage-button-font-size-default: 14px;--passage-button-width-default: 40%;--passage-primary-button-text-hover-color-default: #ffffff;--passage-primary-button-text-active-color-default: #ffffff;--passage-primary-button-background-active-color-default: #6b6b6b;--passage-primary-button-border-width-default: 0px;--passage-primary-button-border-color-default: #000000;--passage-secondary-button-text-hover-color-default: #ffffff;--passage-secondary-button-text-active-color-default: #ffffff;--passage-secondary-button-background-active-color-default: #e0e0e0;--passage-secondary-button-border-width-default: 1px;--passage-secondary-button-border-color-default: #017c14;--passage-checkbox-background-color-default: #000000;--passage-checkbox-text-color-default: #ffffff;--passage-anchor-color-default: $black;--passage-anchor-hover-color-default: #4d4d4d;--passage-anchor-active-color-default: #6b6b6b;--passage-table-header-border-color-default: #d7d7d7;--passage-table-row-hover-color-default: #e0e0e0;--passage-table-row-border-color-default: #e8e8e8;--passage-table-paginator-hover-color-default: #e8e8e8;--passage-table-paginator-selected-color-default: #d7d7d7}#passage-profile-container{--passage-container-max-width-default: 600px}[v-cloak]{display:none;visibility:hidden}strong,b{font-weight:600}a{cursor:pointer}a:not(.button){font-weight:400;transition:color .2s ease-in-out}img{height:none!important;margin:10px 0}.has-text-centered{text-align:center}.has-text-centered .identifier-text{word-break:break-all}select:focus,select:active{outline:none;box-shadow:none!important}.select select{height:40px}.section,.container,.box,.card,.column,.tile{position:relative}.container{z-index:1}.auth-flex-container{display:flex;flex-direction:column;min-height:315px}.flex-row{display:flex;flex-direction:row}.flex-column{display:flex;flex-direction:column}.flex-center{justify-content:center;align-items:center}.flex-end{align-items:flex-end}.flex-wrap{flex-wrap:wrap}.flex-between{justify-content:space-between}.spacer{display:flex;align-items:center;flex-grow:1;min-height:15px}.box,.card,canvas{max-width:100%}.help{margin-top:8px}.help a:not(.button){text-decoration:underline}.help.is-danger{margin-top:0;min-height:29px}.button{transition:all .2s ease-in-out;cursor:pointer}.button.icon-only{background:transparent;border:0;color:inherit}.button.icon-only:focus,.button.icon-only:active{outline:none;border:0;box-shadow:none}.notification{border-radius:5px;padding:5px;margin:5px}.notification.is-danger{background-color:#fef2f5;color:#dd0031}.fade-enter-active,.fade-leave-active{transition:opacity .25s ease}.fade-enter-from,.fade-leave-to{opacity:0}figure{margin-top:8px;margin-bottom:24px}.edit-save-container{display:flex;flex-direction:row;justify-content:flex-end;margin-left:15px}.edit-save-container .edit-save-text{font-size:14px;font-weight:400;color:#6b6b6b;text-decoration:underline;user-select:none;cursor:pointer}.edit-save-container :not(:last-child){margin-right:10px}.login-info-row{display:grid;align-items:center;max-width:600px;grid-template-columns:30% minmax(auto,275px) 100px;grid-template-areas:"title  control editsave" "marginleft message marginright"}.login-info-row .user-info-label{grid-area:title}.login-info-row .login-info-control{grid-area:control}.login-info-row .edit-save-container{grid-area:editsave}.login-info-row .message{grid-area:message}.login-info-row.isCompact{grid-template-columns:auto 100px;grid-template-areas:"title editsave" "control control" "message message"}.login-info-row .user-info-label,.login-info-row .edit-save-container{margin-bottom:5px}.profile-divider{height:32px}.table-container .title{min-height:25px}.metadata-header{display:flex}.component-loading{cursor:wait}.component-loading.loading-overlay{inset:0;position:absolute;display:flex;align-items:center;justify-content:center;overflow:hidden;z-index:10}.component-loading.loading-overlay .loading-background{inset:0;position:absolute;background-color:#ffffff80}.component-loading.loading-overlay .loading-icon{position:relative;opacity:.8}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.component-loading.loading-overlay .loading-icon:after{content:"";display:block;animation:spin .5s infinite linear;border:2px solid #d7d7d7;border-radius:9999px;position:absolute;top:calc(50% - 1.5em);left:calc(50% - 1.5em);width:3em;height:3em;border-width:.25em;border-color:transparent;border-left-color:#d7d7d7;border-bottom-color:#d7d7d7}.spinner-box{width:80px;height:80px;max-width:22em;margin:5px auto 10px;position:relative;box-sizing:border-box;background:var(--passage-container-background-color, var(--passage-container-background-default));background-clip:padding-box;border:solid 10px transparent;border-radius:50%}.spinner-box:after{content:"";position:absolute;inset:0;z-index:-1;margin:-10px;border-radius:inherit;background:conic-gradient(from 180deg at 50% 50%,#3d53f6 0deg,rgba(196,196,196,0) 360deg);animation:spin 1.9s linear infinite}.spinner-content{position:absolute;width:60px;height:60px;display:flex;align-items:center;justify-content:center}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.checkbox-container{display:flex;cursor:pointer}.checkbox-container .checkbox-label{user-select:none;color:var(--passage-body-text-color, var(--passage-body-text-color-default));font-size:var(--passage-body-font-size, var(--passage-body-font-size-default));line-height:20px;margin-left:5px}.checkbox-container .toggle-switch-label{line-height:18px}.checkbox-container.readonly{cursor:default;pointer-events:none}.passage-checkbox[type=checkbox]{-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer;width:20px;height:20px;margin:0;background-color:transparent;border-style:solid;border-color:var(--passage-control-border-color, var(--passage-control-border-color-default));border-width:1px;border-radius:var(--passage-control-border-radius, var(--passage-control-border-radius-default));display:grid;place-content:center}.passage-checkbox[type=checkbox]:checked{background-color:var(--passage-checkbox-background-color, var(--passage-checkbox-background-color-default));border-color:var(--passage-checkbox-background-color, var(--passage-checkbox-background-color-default));transition:.1s ease-in-out}.passage-checkbox[type=checkbox]:before{content:"";width:20px;height:20px;background-color:var(--passage-checkbox-text-color, var(--passage-checkbox-text-color-default));mask:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDExIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik05LjE2MzQ2IDAuMjA3MDExQzkuMjI3NyAwLjE0MTQ2OSA5LjMwNDM2IDAuMDg5NDAwNiA5LjM4ODk3IDAuMDUzODU0N0M5LjQ3MzU4IDAuMDE4MzA4OSA5LjU2NDQzIDAgOS42NTYyIDBDOS43NDc5NyAwIDkuODM4ODIgMC4wMTgzMDg5IDkuOTIzNDMgMC4wNTM4NTQ3QzEwLjAwOCAwLjA4OTQwMDYgMTAuMDg0NyAwLjE0MTQ2OSAxMC4xNDg5IDAuMjA3MDExQzEwLjQxODEgMC40NzkwMyAxMC40MjE5IDAuOTE4NTkxIDEwLjE1ODQgMS4xOTUzMkw0LjU5Mjc5IDcuNzc0NkM0LjUyOTYgNy44NDM5OSA0LjQ1MjkxIDcuODk5NzYgNC4zNjc0MyA3LjkzODQ5QzQuMjgxOTUgNy45NzcyMyA0LjE4OTQ2IDcuOTk4MTIgNC4wOTU2MyA3Ljk5OTg4QzQuMDAxNzkgOC4wMDE2NCAzLjkwODU5IDcuOTg0MjQgMy44MjE3MSA3Ljk0ODc0QzMuNzM0ODMgNy45MTMyNCAzLjY1NjExIDcuODYwMzkgMy41OTAzNiA3Ljc5MzQzTDAuMjAzNzcxIDQuMzYxNjZDMC4wNzMxNjE5IDQuMjI4NDYgMCA0LjA0OTM1IDAgMy44NjI4QzAgMy42NzYyNSAwLjA3MzE2MTkgMy40OTcxNCAwLjIwMzc3MSAzLjM2Mzk0QzAuMjY4MDA3IDMuMjk4NCAwLjM0NDY3NCAzLjI0NjMzIDAuNDI5MjgyIDMuMjEwNzhDMC41MTM4OTEgMy4xNzUyNCAwLjYwNDc0IDMuMTU2OTMgMC42OTY1MTIgMy4xNTY5M0MwLjc4ODI4NCAzLjE1NjkzIDAuODc5MTMzIDMuMTc1MjQgMC45NjM3NDIgMy4yMTA3OEMxLjA0ODM1IDMuMjQ2MzMgMS4xMjUwMiAzLjI5ODQgMS4xODkyNSAzLjM2Mzk0TDQuMDYxOTIgNi4yNzUyTDkuMTQ0NjMgMC4yMjc3MTlDOS4xNTA0OSAwLjIyMDQ0NCA5LjE1Njc3IDAuMjEzNTI5IDkuMTYzNDYgMC4yMDcwMTFaIiBmaWxsPSJjdXJyZW50Q29sb3IiLz4KPC9zdmc+Cg==);mask-position:center;mask-repeat:no-repeat;-webkit-mask:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDExIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik05LjE2MzQ2IDAuMjA3MDExQzkuMjI3NyAwLjE0MTQ2OSA5LjMwNDM2IDAuMDg5NDAwNiA5LjM4ODk3IDAuMDUzODU0N0M5LjQ3MzU4IDAuMDE4MzA4OSA5LjU2NDQzIDAgOS42NTYyIDBDOS43NDc5NyAwIDkuODM4ODIgMC4wMTgzMDg5IDkuOTIzNDMgMC4wNTM4NTQ3QzEwLjAwOCAwLjA4OTQwMDYgMTAuMDg0NyAwLjE0MTQ2OSAxMC4xNDg5IDAuMjA3MDExQzEwLjQxODEgMC40NzkwMyAxMC40MjE5IDAuOTE4NTkxIDEwLjE1ODQgMS4xOTUzMkw0LjU5Mjc5IDcuNzc0NkM0LjUyOTYgNy44NDM5OSA0LjQ1MjkxIDcuODk5NzYgNC4zNjc0MyA3LjkzODQ5QzQuMjgxOTUgNy45NzcyMyA0LjE4OTQ2IDcuOTk4MTIgNC4wOTU2MyA3Ljk5OTg4QzQuMDAxNzkgOC4wMDE2NCAzLjkwODU5IDcuOTg0MjQgMy44MjE3MSA3Ljk0ODc0QzMuNzM0ODMgNy45MTMyNCAzLjY1NjExIDcuODYwMzkgMy41OTAzNiA3Ljc5MzQzTDAuMjAzNzcxIDQuMzYxNjZDMC4wNzMxNjE5IDQuMjI4NDYgMCA0LjA0OTM1IDAgMy44NjI4QzAgMy42NzYyNSAwLjA3MzE2MTkgMy40OTcxNCAwLjIwMzc3MSAzLjM2Mzk0QzAuMjY4MDA3IDMuMjk4NCAwLjM0NDY3NCAzLjI0NjMzIDAuNDI5MjgyIDMuMjEwNzhDMC41MTM4OTEgMy4xNzUyNCAwLjYwNDc0IDMuMTU2OTMgMC42OTY1MTIgMy4xNTY5M0MwLjc4ODI4NCAzLjE1NjkzIDAuODc5MTMzIDMuMTc1MjQgMC45NjM3NDIgMy4yMTA3OEMxLjA0ODM1IDMuMjQ2MzMgMS4xMjUwMiAzLjI5ODQgMS4xODkyNSAzLjM2Mzk0TDQuMDYxOTIgNi4yNzUyTDkuMTQ0NjMgMC4yMjc3MTlDOS4xNTA0OSAwLjIyMDQ0NCA5LjE1Njc3IDAuMjEzNTI5IDkuMTYzNDYgMC4yMDcwMTFaIiBmaWxsPSJjdXJyZW50Q29sb3IiLz4KPC9zdmc+Cg==);-webkit-mask-position:center;-webkit-mask-repeat:no-repeat;transform:scale(0);transition:.2s transform ease-in-out}.passage-checkbox[type=checkbox]:checked:before{transform:scale(1)}.passage-checkbox[type=checkbox]:focus,.passage-toggle-switch[type=checkbox]:focus{box-shadow:0 0 0 1px #000!important;outline:none}.passage-learnmore{position:absolute;height:100%;width:100%;background-color:transparent;display:flex;justify-content:center;align-items:center;color:var(--passage-body-text-color, var(--passage-body-text-color-default));font-family:var(--passage-body-font-family, var(--passage-body-font-family-default));font-size:calc(var(--passage-body-font-size, var(--passage-body-font-size-default)) - 15%);font-weight:var(--passage-body-font-weight, var(--passage-body-font-weight-default));z-index:3}.passage-learnmore-modal{background-color:var(--passage-container-background-color, var(--passage-container-background-color-default));border-radius:5px;border:15px solid transparent;box-shadow:0 4px 4px #00000040}.passage-learnmore-top{display:flex;flex-direction:row;justify-content:flex-end}.passage-learnmore-close-button{font-size:12px;margin-right:4px;opacity:.6}.passage-learnmore-content{display:flex;align-items:center;flex-direction:column}.passage-learnmore-header{font-family:var(--passage-body-font-family, var(--passage-body-font-family-default));font-size:calc(var(--passage-button-font-size, var(--passage-button-font-size-default)) - 15%);font-weight:var(--passage-body-font-weight, var(--passage-body-font-weight-default));display:flex;flex-direction:row;align-items:center;margin-bottom:8px}.passage-learnmore-body{font-size:calc(var(--passage-body-font-size, var(--passage-body-font-size-default)) - 15%);text-align:left;opacity:.6;margin-bottom:16px}.passage-modal{align-items:center;display:none;flex-direction:column;justify-content:center;overflow:hidden;z-index:40;inset:0;position:absolute;font-family:Helvetica,BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif;min-height:400px;margin:0 10px}.passage-modal.is-active{display:flex}.passage-modal .passage-modal-background{inset:0;position:absolute}.passage-modal .passage-modal-card{box-shadow:0 2px 8px 2px #ccc;background-color:var(--passage-container-background-color, var(--passage-container-background-color-default));color:var(--passage-body-text-color, var(--passage-body-text-color-default));font-family:var(--passage-body-font-family, var(--passage-body-font-family-default));font-size:var(--passage-body-font-size, var(--passage-body-font-size-default));font-weight:var(--passage-body-font-weight, var(--passage-body-font-weight-default));margin:0 auto;padding:24px;display:flex;flex-direction:column;max-height:90%;max-width:300px;width:80%;border-radius:5px;overflow:hidden;position:relative}.passage-modal .passage-modal-card .danger-header{color:var(--passage-error-color, var(--passage-error-color-default))}.passage-modal .passage-modal-card .input-box-title{margin-top:15px;font-weight:600}.passage-modal .passage-modal-card .passage-modal-body{padding:20px 0 0}.passage-modal .passage-modal-card .passage-modal-body.centered{padding-top:0}.passage-modal .passage-modal-card .passage-modal-footer{display:flex;justify-content:center;padding-top:20px}.passage-modal .passage-modal-card .passage-modal-footer .cancel-button{margin-left:10px}.passage-modal .passage-modal-card .passage-modal-footer .cancel-only{margin-left:0}#passage-auth-container .iti,#passage-profile-container .iti{width:100%}#passage-auth-container .iti .input,#passage-profile-container .iti .input{padding-left:52px}#passage-auth-container .iti .iti__country-list,#passage-profile-container .iti .iti__country-list{border-radius:6px}#passage-auth-container .iti .iti__country,#passage-profile-container .iti .iti__country{padding:5px 10px}#passage-auth-container .iti .iti__selected-flag,#passage-profile-container .iti .iti__selected-flag{border-top-left-radius:var(--passage-input-box-border-radius, var(--passage-input-box-border-radius-default));border-bottom-left-radius:var(--passage-input-box-border-radius, var(--passage-input-box-border-radius-default))}#passage-auth-container .iti--container,#passage-profile-container .iti--container{top:unset!important;left:unset!important}.grid-stack{margin:0 -10px}.grid-stack-item>*{overflow:visible!important}.grid-stack-item.editable{cursor:grab}.grid-stack-item .grid-stack-item-content>.checkbox-container{margin-top:4px;margin-left:1px}.grid-stack-item .grid-stack-item-content .label{font-size:14px!important;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;user-select:none}.grid-stack-item .grid-stack-item-content .input{font-size:14px!important}.grid-stack-item .grid-stack-item-content .error-message{font-size:11px!important;word-break:break-word}.grid-stack.profile .label{font-weight:600!important}.passage-branding{color:#6b6b6b;margin-top:16px}.passage-table{width:100%;border-spacing:0px;color:var(--passage-body-text-color, var(--passage-body-text-color-default));font-family:var(--passage-body-font-family, var(--passage-body-font-family-default));font-size:var(--passage-body-font-size, var(--passage-body-font-size-default));font-weight:var(--passage-body-font-weight, var(--passage-body-font-weight-default))}.passage-table-header-cell{font-weight:700;text-align:left;border-bottom:1px solid var(--passage-table-header-border-color, var(--passage-table-header-border-color-default));padding:10px 15px}.passage-table-row:hover{background-color:var(--passage-table-row-hover-color, var(--passage-table-row-hover-color-default))}.passage-table-row:hover+.passage-expansion-row{background-color:var(--passage-table-row-hover-color, var(--passage-table-row-hover-color-default))}.passage-table-row.passage-table-row-hover,.passage-expansion-row:hover{background-color:var(--passage-table-row-hover-color, var(--passage-table-row-hover-color-default))}.passage-expansion-row .passage-table-cell{padding-top:0}.passage-table-cell{border-bottom:1px solid var(--passage-table-row-border-color, var(--passage-table-row-border-color-default));padding:15px 12px}.passage-table-cell.expanded{border-color:transparent}.passage-action-menu-cell{width:20px}.passage-expansion-cell{width:16px}.passage-expansion-cell .table-chevron{cursor:pointer;transition:all .3s;transform:rotate(270deg)}.passage-expansion-cell .table-chevron.expanded{transform:rotate(360deg)}.passage-table-empty-cell{padding:20px;text-align:center}.passage-table-paginator{margin-top:32px;display:flex;flex-direction:row;align-items:center;justify-content:space-between;flex-wrap:wrap}.passage-table-paginator>div{margin-bottom:8px}.page-size-selector{display:flex;flex-direction:row;align-items:center}.paginator-button{width:40px;height:40px;display:flex;align-items:center;justify-content:center;cursor:pointer;user-select:none}.paginator-button:hover{background-color:var(--passage-table-paginator-hover-color, var(--passage-table-paginator-hover-color-default))}.paginator-button.selected{background-color:var(--passage-table-paginator-selected-color, var(--passage-table-paginator-selected-color-default))}.paginator-button.disabled{opacity:50%;pointer-events:none}.paginator-index{width:100%;text-align:center}.expanded-content{display:grid;grid-template-columns:auto auto}.expanded-content .expanded-label{font-weight:700;margin-bottom:4px}.dropdown-container{user-select:none;position:relative;color:var(--passage-body-text-color, var(--passage-body-text-color-default));font-family:var(--passage-body-font-family, var(--passage-body-font-family-default));font-size:var(--passage-body-font-size, var(--passage-body-font-size-default));font-weight:var(--passage-body-font-weight, var(--passage-body-font-weight-default));cursor:pointer}.dropdown-container:focus{outline:none}.dropdown-container[readonly]{cursor:default;pointer-events:none}.dropdown-container[readonly] .dropdown-button{border-color:transparent}.dropdown-container[readonly] .dropdown-button .chevron{opacity:0}.dropdown-button{height:30px;padding-left:10px;padding-right:5px;background-color:transparent;border:1px solid;border-color:var(--passage-control-border-color, var(--passage-control-border-color-default));border-radius:var(--passage-control-border-radius, var(--passage-control-border-radius-default));display:flex;flex-direction:row;align-items:center;justify-content:space-between;transition:border-color .3s}.dropdown-button .chevron{margin-left:10px;min-width:10px;transition:.3s ease-in-out}.dropdown-button .dropdown-title{line-height:30px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.dropdown-button.expanded{border-bottom-left-radius:0;border-bottom-right-radius:0}.dropdown-button.expanded .chevron{transform:rotate(-180deg)}.dropdown-button.error{border-color:var(--passage-error-color, var(--passage-error-color-default))}.dropdown-list{background-color:var(--passage-container-background-color, var(--passage-container-background-color-default));position:absolute;overflow:auto;border:1px solid;border-color:var(--passage-control-border-color, var(--passage-control-border-color-default));border-top:transparent;border-bottom-left-radius:var(--passage-control-border-radius, var(--passage-control-border-radius-default));border-bottom-right-radius:var(--passage-control-border-radius, var(--passage-control-border-radius-default));transition:max-height .2s ease-in-out;z-index:3}.dropdown-list.collapsed{max-height:0px!important;border-bottom:transparent;overflow:hidden}.dropdown-list .item{height:30px;padding-left:10px;padding-right:25px;line-height:30px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.dropdown-list .item.bottom-border{border-bottom:1px solid;border-color:var(--passage-control-border-color, var(--passage-control-border-color-default))}.dropdown-list .item .item-text{line-height:14px}.action-menu{position:relative}.action-menu:focus{outline:none}.action-menu .menu-icon{cursor:pointer}.action-menu .menu-dropdown{display:flex;flex-direction:column;align-items:flex-end;max-height:500px;overflow:hidden;position:absolute;right:-12px;top:25px;width:max-content;z-index:3;transition:max-height .4s ease-in-out;border-radius:4px;box-shadow:0 2px 8px 2px #ccc;background-color:var(--passage-container-background-color, var(--passage-container-background-color-default));color:var(--passage-body-text-color, var(--passage-body-text-color-default));font-family:var(--passage-body-font-family, var(--passage-body-font-family-default));font-size:var(--passage-body-font-size, var(--passage-body-font-size-default));font-weight:var(--passage-body-font-weight, var(--passage-body-font-weight-default))}.action-menu .menu-dropdown.collapsed{transition:unset;max-height:0px;overflow:hidden;box-shadow:none}.action-menu .menu-dropdown .menu-item{padding:16px;cursor:pointer;user-select:none;width:calc(100% - 32px)}.action-menu .menu-dropdown .menu-item.danger{color:var(--passage-error-color, var(--passage-error-color-default))}.debug-panel{position:fixed;border-radius:5px;border:1px solid #d7d7d7;background:var(--passage-container-background-color, var(--passage-container-background-color-default));top:50px;left:50px}.debug-panel-header{display:flex;flex-direction:row;align-items:center;padding:8px;cursor:move;border-bottom:1px solid #d7d7d7}.debug-panel-header .header-title{font-size:16px}.debug-panel-header .panel-close{margin-left:90px;font-size:20px;font-weight:100;cursor:pointer}.debug-panel-body{padding:16px}.debug-panel-body .section-label{margin-top:8px;margin-bottom:8px;font-size:16px;font-weight:600}.debug-panel-body .control-label{margin-top:8px;margin-bottom:4px}#passage-auth-container,#passage-profile-container{position:relative;box-sizing:content-box;max-width:var(--passage-container-max-width, var(--passage-container-max-width-default));margin:var(--passage-container-margin, var(--passage-container-margin-default));padding:var(--passage-container-padding, var(--passage-container-padding-default));background:var(--passage-container-background-color, var(--passage-container-background-color-default));color:var(--passage-body-text-color, var(--passage-body-text-color-default));font-family:var(--passage-body-font-family, var(--passage-body-font-family-default));font-size:var(--passage-body-font-size, var(--passage-body-font-size-default));font-weight:var(--passage-body-font-weight, var(--passage-body-font-weight-default));line-height:unset}#passage-auth-container .otp-input.input,#passage-profile-container .otp-input.input{width:40px;height:40px;padding:0;margin-left:4px;margin-right:4px;font-size:24px;font-weight:400;color:var(--passage-input-text-color, var(--passage-body-text-color-default));font-family:var(--passage-body-font-family, var(--passage-body-font-family-default));line-height:29px;border-radius:4px;border:1px solid transparent;text-align:center;background-color:var(--passage-otp-input-background-color, var(--passage-otp-input-background-color-default))}#passage-auth-container .otp-input.input:read-only,#passage-profile-container .otp-input.input:read-only{background-color:var(--passage-otp-input-background-color, var(--passage-otp-input-background-color-default))}#passage-auth-container .otp-input.input::-webkit-inner-spin-button,#passage-auth-container .otp-input.input::-webkit-outer-spin-button,#passage-profile-container .otp-input.input::-webkit-inner-spin-button,#passage-profile-container .otp-input.input::-webkit-outer-spin-button{-webkit-appearance:none;display:none;margin:0}#passage-auth-container.passage-auth,#passage-profile-container.passage-auth{min-height:315px}#passage-auth-container.passage-login,#passage-auth-container.passage-register,#passage-profile-container.passage-login,#passage-profile-container.passage-register{min-height:130px}#passage-auth-container .title,#passage-profile-container .title{color:var(--passage-header-text-color, var(--passage-header-text-color-default));font-family:var(--passage-header-font-family, var(--passage-header-font-family-default));font-weight:var(--passage-header-font-weight, var(--passage-header-font-weight-default));font-size:var(--passage-header-font-size, var(--passage-header-font-size-default));margin-bottom:0}#passage-auth-container .title.main-title,#passage-profile-container .title.main-title{font-size:var(--passage-header-font-size, var(--passage-header-main-title-font-size-default));line-height:var(--passage-header-font-size, var(--passage-header-main-title-line-height-default))}#passage-auth-container .title.secondary-title,#passage-profile-container .title.secondary-title{line-height:var(--passage-header-font-size, var(--passage-header-secondary-title-font-size-default))}#passage-auth-container .link,#passage-profile-container .link{font-size:calc(var(--passage-body-font-size, var(--passage-body-font-size-default)) - 14%)}#passage-auth-container .link a:not(.body-link),#passage-profile-container .link a:not(.body-link){font-weight:600}#passage-auth-container a,#passage-profile-container a{text-decoration:underline;color:var(--passage-anchor-text-color, var(--passage-body-text-color-default))}#passage-auth-container a:hover,#passage-profile-container a:hover{color:var(--passage-anchor-hover-color, var(--passage-body-text-color-default))}#passage-auth-container a:active,#passage-profile-container a:active{color:var(--passage-anchor-active-color, var(--passage-body-text-color-default))}#passage-auth-container .label,#passage-profile-container .label{color:var(--passage-body-text-color, var(--passage-body-text-color-default));font-family:var(--passage-body-font-family, var(--passage-body-font-family-default));font-size:var(--passage-body-font-size, var(--passage-body-font-size-default));font-weight:var(--passage-body-font-weight, var(--passage-body-font-weight-default));margin-bottom:3px!important;width:100%;text-align:left}#passage-auth-container .content,#passage-profile-container .content{font-size:calc(var(--passage-body-font-size, var(--passage-body-font-size-default)) - 15%)}#passage-auth-container .input,#passage-profile-container .input{-webkit-appearance:none;-moz-appearance:none;box-sizing:border-box;color:var(--passage-input-text-color, var(--passage-body-text-color-default));font-family:var(--passage-body-font-family, var(--passage-body-font-family-default));font-size:var(--passage-body-font-size, var(--passage-body-font-size-default));font-weight:var(--passage-body-font-weight, var(--passage-body-font-weight-default));min-height:40px;width:100%;padding-left:10px;padding-right:10px;margin:0;background-color:var(--passage-input-box-background-color, var(--passage-input-box-background-color-default));border-style:solid;border-color:var(--passage-control-border-color, var(--passage-control-border-color-default));border-width:1px;border-radius:var(--passage-input-box-border-radius, var(--passage-input-box-border-radius-default));transition:all .3s;text-overflow:ellipsis}#passage-auth-container .input:focus,#passage-auth-container .input:active,#passage-profile-container .input:focus,#passage-profile-container .input:active{outline:none;box-shadow:none!important;border-color:var(--passage-control-border-active-color, var(--passage-control-border-active-color-default))}#passage-auth-container .input.short,#passage-profile-container .input.short{min-height:30px}#passage-auth-container .input.has-error,#passage-auth-container .input.is-danger,#passage-profile-container .input.has-error,#passage-profile-container .input.is-danger{border-color:var(--passage-error-color, var(--passage-error-color-default))}#passage-auth-container .input:read-only,#passage-profile-container .input:read-only{border-color:transparent!important;pointer-events:none}#passage-auth-container .input:read-only::-webkit-outer-spin-button,#passage-auth-container .input:read-only::-webkit-inner-spin-button,#passage-profile-container .input:read-only::-webkit-outer-spin-button,#passage-profile-container .input:read-only::-webkit-inner-spin-button{-webkit-appearance:none;display:none;margin:0}#passage-auth-container .input:read-only[type=number],#passage-profile-container .input:read-only[type=number]{-moz-appearance:textfield}#passage-auth-container .error-message,#passage-profile-container .error-message{font-size:calc(var(--passage-body-font-size, var(--passage-body-font-size-default)) - 20%);color:var(--passage-error-color, var(--passage-error-color-default));text-align:left}#passage-auth-container .text.is-danger,#passage-profile-container .text.is-danger{color:var(--passage-error-color, var(--passage-error-color-default))}#passage-auth-container .button,#passage-profile-container .button{color:var(--passage-primary-button-text-color, var(--passage-primary-button-text-color-default));background-color:var(--passage-primary-button-background-color, var(--passage-primary-button-background-color-default));font-family:var(--passage-body-font-family, var(--passage-body-font-family-default));font-weight:var(--passage-button-font-weight, var(--passage-button-font-weight-default));font-size:var(--passage-button-font-size, var(--passage-button-font-size-default));min-height:40px;border-style:solid;border-width:var(--passage-primary-button-border-width, var(--passage-primary-button-border-width-default));border-color:var(--passage-primary-button-border-color, var(--passage-primary-button-border-color-default));border-radius:var(--passage-primary-button-border-radius, var(--passage-primary-button-border-radius-default));width:var(--passage-button-width, var(--passage-button-width-default));white-space:normal;min-width:fit-content;padding:12px 24px;margin-top:11px}#passage-auth-container .button.small,#passage-profile-container .button.small{min-height:25px;padding:4px 10px 5px;font-size:var(--passage-body-font-size, var(--passage-body-font-size-default));line-height:var(--passage-body-font-size, var(--passage-body-font-size-default));width:fit-content}#passage-auth-container .button:hover,#passage-profile-container .button:hover{color:var(--passage-primary-button-text-hover-color, var(--passage-primary-button-text-color-default));background-color:var(--passage-primary-button-background-hover-color, var(--passage-primary-button-background-hover-color-default));border-color:var(--passage-primary-button-border-hover-color, var(--passage-primary-button-border-color-default))}#passage-auth-container .button:active,#passage-auth-container .button.is-active,#passage-profile-container .button:active,#passage-profile-container .button.is-active{box-shadow:none!important;color:var(--passage-primary-button-text-active-color, var(--passage-primary-button-text-color-default));background-color:var(--passage-primary-button-background-active-color, var(--passage-primary-button-background-hover-color-default));border-color:var(--passage-primary-button-border-active-color, var(--passage-primary-button-border-color-default))}#passage-auth-container .button:focus,#passage-profile-container .button:focus{color:var(--passage-primary-button-text-color, var(--passage-primary-button-text-color-default));outline:none}#passage-auth-container .button:focus-visible,#passage-profile-container .button:focus-visible{outline:none}#passage-auth-container .button.is-secondary,#passage-profile-container .button.is-secondary{color:var(--passage-secondary-button-text-color, var(--passage-secondary-button-text-color-default));background-color:var(--passage-secondary-button-background-color, var(--passage-secondary-button-background-color-default));border-width:var(--passage-secondary-button-border-width, var(--passage-secondary-button-border-width-default));border-color:var(--passage-secondary-button-border-color, var(--passage-secondary-button-border-color-default));border-radius:var(--passage-secondary-button-border-radius, var(--passage-secondary-button-border-radius-default))}#passage-auth-container .button.is-secondary:hover,#passage-profile-container .button.is-secondary:hover{color:var(--passage-secondary-button-text-hover-color, var(--passage-secondary-button-text-color-default));background-color:var(--passage-secondary-button-background-hover-color, var(--passage-secondary-button-background-hover-color-default));border-color:var(--passage-secondary-button-border-hover-color, var(--passage-secondary-button-border-color-default))}#passage-auth-container .button.is-secondary:active,#passage-profile-container .button.is-secondary:active{color:var(--passage-secondary-button-text-active-color, var(--passage-secondary-button-text-color-default));background-color:var(--passage-secondary-button-background-active-color, var(--passage-secondary-button-background-hover-color-default));border-color:var(--passage-secondary-button-border-active-color, var(--passage-secondary-button-border-color-default))}#passage-auth-container .button.is-modal,#passage-profile-container .button.is-modal{padding:0 10px;width:fit-content}#passage-auth-container .button.is-disabled,#passage-auth-container .button[disabled],fieldset[disabled] #passage-auth-container .button,#passage-profile-container .button.is-disabled,#passage-profile-container .button[disabled],fieldset[disabled] #passage-profile-container .button{pointer-events:none;opacity:.5}#passage-profile-container{max-width:var(--passage-container-max-width, var(--passage-container-max-width-default));min-height:70px}#passage-profile-container .user-info-label{font-size:calc(var(--passage-body-font-size, var(--passage-body-font-size-default)) + 10%);font-weight:600;margin-right:15px}#passage-profile-container .message{font-size:calc(var(--passage-body-font-size, var(--passage-body-font-size-default)) - 20%);text-align:left;min-height:14px;margin-bottom:5px}#passage-profile-container .message.is-danger{color:var(--passage-error-color, var(--passage-error-color-default))}#passage-profile-container .message.is-info{color:#3758a1;padding-left:10px}#passage-profile-container .current-device{margin-left:10px;font-size:calc(var(--passage-body-font-size, var(--passage-body-font-size-default)) - 20%);color:gray}#passage-profile-container .feedback{min-height:20px;line-height:20px;font-size:12px;padding:0 5px;margin-top:1px;margin-bottom:2px;border-radius:5px;text-align:center}#passage-profile-container .feedback.feedback-danger{background-color:#fef2f5;color:var(--passage-error-color, var(--passage-error-color-default))}#passage-profile-container .feedback.feedback-info{background-color:#f1f4fa;color:var(--passage-body-text-color, var(--passage-body-text-color-default))}\n';
function safelyRegisterElement(vueComponent, elementName) {
  const customElement = defineCustomElement(__spreadProps(__spreadValues({}, vueComponent), { styles: [appStyles] }));
  try {
    if (!window.customElements.get(`passage-${elementName}`)) {
      window.customElements.define(`passage-${elementName}`, customElement);
    }
  } catch (e2) {
    throw new Error(
      `Cannot register custom element <passage-${elementName}>. Ensure the import is happening while code is running client-side in the browser. If doing server-side rendering consider moving the import to a lifecycle event. See https://docs.passage.id/ for more information.`
    );
  }
}

// node_modules/@passageidentity/passage-elements/dist/package/customElements.es3.js
var __defProp2 = Object.defineProperty;
var __defProps2 = Object.defineProperties;
var __getOwnPropDescs2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop))
      __defNormalProp2(a, prop, b[prop]);
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b)) {
      if (__propIsEnum2.call(b, prop))
        __defNormalProp2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps2 = (a, b) => __defProps2(a, __getOwnPropDescs2(b));
var intlTelInput$1 = { exports: {} };
(function(module) {
  (function(factory) {
    if (module.exports)
      module.exports = factory();
    else
      window.intlTelInput = factory();
  })(function(undefined$1) {
    return function() {
      var allCountries = [["Afghanistan (‫افغانستان‬‎)", "af", "93"], ["Albania (Shqipëri)", "al", "355"], ["Algeria (‫الجزائر‬‎)", "dz", "213"], ["American Samoa", "as", "1", 5, ["684"]], ["Andorra", "ad", "376"], ["Angola", "ao", "244"], ["Anguilla", "ai", "1", 6, ["264"]], ["Antigua and Barbuda", "ag", "1", 7, ["268"]], ["Argentina", "ar", "54"], ["Armenia (Հայաստան)", "am", "374"], ["Aruba", "aw", "297"], ["Ascension Island", "ac", "247"], ["Australia", "au", "61", 0], ["Austria (Österreich)", "at", "43"], ["Azerbaijan (Azərbaycan)", "az", "994"], ["Bahamas", "bs", "1", 8, ["242"]], ["Bahrain (‫البحرين‬‎)", "bh", "973"], ["Bangladesh (বাংলাদেশ)", "bd", "880"], ["Barbados", "bb", "1", 9, ["246"]], ["Belarus (Беларусь)", "by", "375"], ["Belgium (België)", "be", "32"], ["Belize", "bz", "501"], ["Benin (Bénin)", "bj", "229"], ["Bermuda", "bm", "1", 10, ["441"]], ["Bhutan (འབྲུག)", "bt", "975"], ["Bolivia", "bo", "591"], ["Bosnia and Herzegovina (Босна и Херцеговина)", "ba", "387"], ["Botswana", "bw", "267"], ["Brazil (Brasil)", "br", "55"], ["British Indian Ocean Territory", "io", "246"], ["British Virgin Islands", "vg", "1", 11, ["284"]], ["Brunei", "bn", "673"], ["Bulgaria (България)", "bg", "359"], ["Burkina Faso", "bf", "226"], ["Burundi (Uburundi)", "bi", "257"], ["Cambodia (កម្ពុជា)", "kh", "855"], ["Cameroon (Cameroun)", "cm", "237"], ["Canada", "ca", "1", 1, ["204", "226", "236", "249", "250", "289", "306", "343", "365", "387", "403", "416", "418", "431", "437", "438", "450", "506", "514", "519", "548", "579", "581", "587", "604", "613", "639", "647", "672", "705", "709", "742", "778", "780", "782", "807", "819", "825", "867", "873", "902", "905"]], ["Cape Verde (Kabu Verdi)", "cv", "238"], ["Caribbean Netherlands", "bq", "599", 1, ["3", "4", "7"]], ["Cayman Islands", "ky", "1", 12, ["345"]], ["Central African Republic (République centrafricaine)", "cf", "236"], ["Chad (Tchad)", "td", "235"], ["Chile", "cl", "56"], ["China (中国)", "cn", "86"], ["Christmas Island", "cx", "61", 2, ["89164"]], ["Cocos (Keeling) Islands", "cc", "61", 1, ["89162"]], ["Colombia", "co", "57"], ["Comoros (‫جزر القمر‬‎)", "km", "269"], ["Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)", "cd", "243"], ["Congo (Republic) (Congo-Brazzaville)", "cg", "242"], ["Cook Islands", "ck", "682"], ["Costa Rica", "cr", "506"], ["Côte d’Ivoire", "ci", "225"], ["Croatia (Hrvatska)", "hr", "385"], ["Cuba", "cu", "53"], ["Curaçao", "cw", "599", 0], ["Cyprus (Κύπρος)", "cy", "357"], ["Czech Republic (Česká republika)", "cz", "420"], ["Denmark (Danmark)", "dk", "45"], ["Djibouti", "dj", "253"], ["Dominica", "dm", "1", 13, ["767"]], ["Dominican Republic (República Dominicana)", "do", "1", 2, ["809", "829", "849"]], ["Ecuador", "ec", "593"], ["Egypt (‫مصر‬‎)", "eg", "20"], ["El Salvador", "sv", "503"], ["Equatorial Guinea (Guinea Ecuatorial)", "gq", "240"], ["Eritrea", "er", "291"], ["Estonia (Eesti)", "ee", "372"], ["Eswatini", "sz", "268"], ["Ethiopia", "et", "251"], ["Falkland Islands (Islas Malvinas)", "fk", "500"], ["Faroe Islands (Føroyar)", "fo", "298"], ["Fiji", "fj", "679"], ["Finland (Suomi)", "fi", "358", 0], ["France", "fr", "33"], ["French Guiana (Guyane française)", "gf", "594"], ["French Polynesia (Polynésie française)", "pf", "689"], ["Gabon", "ga", "241"], ["Gambia", "gm", "220"], ["Georgia (საქართველო)", "ge", "995"], ["Germany (Deutschland)", "de", "49"], ["Ghana (Gaana)", "gh", "233"], ["Gibraltar", "gi", "350"], ["Greece (Ελλάδα)", "gr", "30"], ["Greenland (Kalaallit Nunaat)", "gl", "299"], ["Grenada", "gd", "1", 14, ["473"]], ["Guadeloupe", "gp", "590", 0], ["Guam", "gu", "1", 15, ["671"]], ["Guatemala", "gt", "502"], ["Guernsey", "gg", "44", 1, ["1481", "7781", "7839", "7911"]], ["Guinea (Guinée)", "gn", "224"], ["Guinea-Bissau (Guiné Bissau)", "gw", "245"], ["Guyana", "gy", "592"], ["Haiti", "ht", "509"], ["Honduras", "hn", "504"], ["Hong Kong (香港)", "hk", "852"], ["Hungary (Magyarország)", "hu", "36"], ["Iceland (Ísland)", "is", "354"], ["India (भारत)", "in", "91"], ["Indonesia", "id", "62"], ["Iran (‫ایران‬‎)", "ir", "98"], ["Iraq (‫العراق‬‎)", "iq", "964"], ["Ireland", "ie", "353"], ["Isle of Man", "im", "44", 2, ["1624", "74576", "7524", "7924", "7624"]], ["Israel (‫ישראל‬‎)", "il", "972"], ["Italy (Italia)", "it", "39", 0], ["Jamaica", "jm", "1", 4, ["876", "658"]], ["Japan (日本)", "jp", "81"], ["Jersey", "je", "44", 3, ["1534", "7509", "7700", "7797", "7829", "7937"]], ["Jordan (‫الأردن‬‎)", "jo", "962"], ["Kazakhstan (Казахстан)", "kz", "7", 1, ["33", "7"]], ["Kenya", "ke", "254"], ["Kiribati", "ki", "686"], ["Kosovo", "xk", "383"], ["Kuwait (‫الكويت‬‎)", "kw", "965"], ["Kyrgyzstan (Кыргызстан)", "kg", "996"], ["Laos (ລາວ)", "la", "856"], ["Latvia (Latvija)", "lv", "371"], ["Lebanon (‫لبنان‬‎)", "lb", "961"], ["Lesotho", "ls", "266"], ["Liberia", "lr", "231"], ["Libya (‫ليبيا‬‎)", "ly", "218"], ["Liechtenstein", "li", "423"], ["Lithuania (Lietuva)", "lt", "370"], ["Luxembourg", "lu", "352"], ["Macau (澳門)", "mo", "853"], ["Madagascar (Madagasikara)", "mg", "261"], ["Malawi", "mw", "265"], ["Malaysia", "my", "60"], ["Maldives", "mv", "960"], ["Mali", "ml", "223"], ["Malta", "mt", "356"], ["Marshall Islands", "mh", "692"], ["Martinique", "mq", "596"], ["Mauritania (‫موريتانيا‬‎)", "mr", "222"], ["Mauritius (Moris)", "mu", "230"], ["Mayotte", "yt", "262", 1, ["269", "639"]], ["Mexico (México)", "mx", "52"], ["Micronesia", "fm", "691"], ["Moldova (Republica Moldova)", "md", "373"], ["Monaco", "mc", "377"], ["Mongolia (Монгол)", "mn", "976"], ["Montenegro (Crna Gora)", "me", "382"], ["Montserrat", "ms", "1", 16, ["664"]], ["Morocco (‫المغرب‬‎)", "ma", "212", 0], ["Mozambique (Moçambique)", "mz", "258"], ["Myanmar (Burma) (မြန်မာ)", "mm", "95"], ["Namibia (Namibië)", "na", "264"], ["Nauru", "nr", "674"], ["Nepal (नेपाल)", "np", "977"], ["Netherlands (Nederland)", "nl", "31"], ["New Caledonia (Nouvelle-Calédonie)", "nc", "687"], ["New Zealand", "nz", "64"], ["Nicaragua", "ni", "505"], ["Niger (Nijar)", "ne", "227"], ["Nigeria", "ng", "234"], ["Niue", "nu", "683"], ["Norfolk Island", "nf", "672"], ["North Korea (조선 민주주의 인민 공화국)", "kp", "850"], ["North Macedonia (Северна Македонија)", "mk", "389"], ["Northern Mariana Islands", "mp", "1", 17, ["670"]], ["Norway (Norge)", "no", "47", 0], ["Oman (‫عُمان‬‎)", "om", "968"], ["Pakistan (‫پاکستان‬‎)", "pk", "92"], ["Palau", "pw", "680"], ["Palestine (‫فلسطين‬‎)", "ps", "970"], ["Panama (Panamá)", "pa", "507"], ["Papua New Guinea", "pg", "675"], ["Paraguay", "py", "595"], ["Peru (Perú)", "pe", "51"], ["Philippines", "ph", "63"], ["Poland (Polska)", "pl", "48"], ["Portugal", "pt", "351"], ["Puerto Rico", "pr", "1", 3, ["787", "939"]], ["Qatar (‫قطر‬‎)", "qa", "974"], ["Réunion (La Réunion)", "re", "262", 0], ["Romania (România)", "ro", "40"], ["Russia (Россия)", "ru", "7", 0], ["Rwanda", "rw", "250"], ["Saint Barthélemy", "bl", "590", 1], ["Saint Helena", "sh", "290"], ["Saint Kitts and Nevis", "kn", "1", 18, ["869"]], ["Saint Lucia", "lc", "1", 19, ["758"]], ["Saint Martin (Saint-Martin (partie française))", "mf", "590", 2], ["Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)", "pm", "508"], ["Saint Vincent and the Grenadines", "vc", "1", 20, ["784"]], ["Samoa", "ws", "685"], ["San Marino", "sm", "378"], ["São Tomé and Príncipe (São Tomé e Príncipe)", "st", "239"], ["Saudi Arabia (‫المملكة العربية السعودية‬‎)", "sa", "966"], ["Senegal (Sénégal)", "sn", "221"], ["Serbia (Србија)", "rs", "381"], ["Seychelles", "sc", "248"], ["Sierra Leone", "sl", "232"], ["Singapore", "sg", "65"], ["Sint Maarten", "sx", "1", 21, ["721"]], ["Slovakia (Slovensko)", "sk", "421"], ["Slovenia (Slovenija)", "si", "386"], ["Solomon Islands", "sb", "677"], ["Somalia (Soomaaliya)", "so", "252"], ["South Africa", "za", "27"], ["South Korea (대한민국)", "kr", "82"], ["South Sudan (‫جنوب السودان‬‎)", "ss", "211"], ["Spain (España)", "es", "34"], ["Sri Lanka (ශ්‍රී ලංකාව)", "lk", "94"], ["Sudan (‫السودان‬‎)", "sd", "249"], ["Suriname", "sr", "597"], ["Svalbard and Jan Mayen", "sj", "47", 1, ["79"]], ["Sweden (Sverige)", "se", "46"], ["Switzerland (Schweiz)", "ch", "41"], ["Syria (‫سوريا‬‎)", "sy", "963"], ["Taiwan (台灣)", "tw", "886"], ["Tajikistan", "tj", "992"], ["Tanzania", "tz", "255"], ["Thailand (ไทย)", "th", "66"], ["Timor-Leste", "tl", "670"], ["Togo", "tg", "228"], ["Tokelau", "tk", "690"], ["Tonga", "to", "676"], ["Trinidad and Tobago", "tt", "1", 22, ["868"]], ["Tunisia (‫تونس‬‎)", "tn", "216"], ["Turkey (Türkiye)", "tr", "90"], ["Turkmenistan", "tm", "993"], ["Turks and Caicos Islands", "tc", "1", 23, ["649"]], ["Tuvalu", "tv", "688"], ["U.S. Virgin Islands", "vi", "1", 24, ["340"]], ["Uganda", "ug", "256"], ["Ukraine (Україна)", "ua", "380"], ["United Arab Emirates (‫الإمارات العربية المتحدة‬‎)", "ae", "971"], ["United Kingdom", "gb", "44", 0], ["United States", "us", "1", 0], ["Uruguay", "uy", "598"], ["Uzbekistan (Oʻzbekiston)", "uz", "998"], ["Vanuatu", "vu", "678"], ["Vatican City (Città del Vaticano)", "va", "39", 1, ["06698"]], ["Venezuela", "ve", "58"], ["Vietnam (Việt Nam)", "vn", "84"], ["Wallis and Futuna (Wallis-et-Futuna)", "wf", "681"], ["Western Sahara (‫الصحراء الغربية‬‎)", "eh", "212", 1, ["5288", "5289"]], ["Yemen (‫اليمن‬‎)", "ye", "967"], ["Zambia", "zm", "260"], ["Zimbabwe", "zw", "263"], ["Åland Islands", "ax", "358", 1, ["18"]]];
      for (var i = 0; i < allCountries.length; i++) {
        var c2 = allCountries[i];
        allCountries[i] = {
          name: c2[0],
          iso2: c2[1],
          dialCode: c2[2],
          priority: c2[3] || 0,
          areaCodes: c2[4] || null
        };
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i2 = 0; i2 < props.length; i2++) {
          var descriptor = props[i2];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      var intlTelInputGlobals = {
        getInstance: function getInstance(input) {
          var id2 = input.getAttribute("data-intl-tel-input-id");
          return window.intlTelInputGlobals.instances[id2];
        },
        instances: {},
        documentReady: function documentReady() {
          return document.readyState === "complete";
        }
      };
      if (typeof window === "object")
        window.intlTelInputGlobals = intlTelInputGlobals;
      var id = 0;
      var defaults = {
        allowDropdown: true,
        autoHideDialCode: true,
        autoPlaceholder: "polite",
        customContainer: "",
        customPlaceholder: null,
        dropdownContainer: null,
        excludeCountries: [],
        formatOnDisplay: true,
        geoIpLookup: null,
        hiddenInput: "",
        initialCountry: "",
        localizedCountries: null,
        nationalMode: true,
        onlyCountries: [],
        placeholderNumberType: "MOBILE",
        preferredCountries: ["us", "gb"],
        separateDialCode: false,
        utilsScript: ""
      };
      var regionlessNanpNumbers = ["800", "822", "833", "844", "855", "866", "877", "880", "881", "882", "883", "884", "885", "886", "887", "888", "889"];
      var forEachProp = function forEachProp2(obj, callback) {
        var keys = Object.keys(obj);
        for (var i2 = 0; i2 < keys.length; i2++) {
          callback(keys[i2], obj[keys[i2]]);
        }
      };
      var forEachInstance = function forEachInstance2(method) {
        forEachProp(window.intlTelInputGlobals.instances, function(key) {
          window.intlTelInputGlobals.instances[key][method]();
        });
      };
      var Iti = function() {
        function Iti2(input, options) {
          var _this = this;
          _classCallCheck(this, Iti2);
          this.id = id++;
          this.telInput = input;
          this.activeItem = null;
          this.highlightedItem = null;
          var customOptions = options || {};
          this.options = {};
          forEachProp(defaults, function(key, value) {
            _this.options[key] = customOptions.hasOwnProperty(key) ? customOptions[key] : value;
          });
          this.hadInitialPlaceholder = Boolean(input.getAttribute("placeholder"));
        }
        _createClass(Iti2, [{
          key: "_init",
          value: function _init() {
            var _this2 = this;
            if (this.options.nationalMode)
              this.options.autoHideDialCode = false;
            if (this.options.separateDialCode) {
              this.options.autoHideDialCode = this.options.nationalMode = false;
            }
            this.isMobile = /Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            if (this.isMobile) {
              document.body.classList.add("iti-mobile");
              if (!this.options.dropdownContainer)
                this.options.dropdownContainer = document.body;
            }
            if (typeof Promise !== "undefined") {
              var autoCountryPromise = new Promise(function(resolve2, reject) {
                _this2.resolveAutoCountryPromise = resolve2;
                _this2.rejectAutoCountryPromise = reject;
              });
              var utilsScriptPromise = new Promise(function(resolve2, reject) {
                _this2.resolveUtilsScriptPromise = resolve2;
                _this2.rejectUtilsScriptPromise = reject;
              });
              this.promise = Promise.all([autoCountryPromise, utilsScriptPromise]);
            } else {
              this.resolveAutoCountryPromise = this.rejectAutoCountryPromise = function() {
              };
              this.resolveUtilsScriptPromise = this.rejectUtilsScriptPromise = function() {
              };
            }
            this.selectedCountryData = {};
            this._processCountryData();
            this._generateMarkup();
            this._setInitialState();
            this._initListeners();
            this._initRequests();
          }
        }, {
          key: "_processCountryData",
          value: function _processCountryData() {
            this._processAllCountries();
            this._processCountryCodes();
            this._processPreferredCountries();
            if (this.options.localizedCountries)
              this._translateCountriesByLocale();
            if (this.options.onlyCountries.length || this.options.localizedCountries) {
              this.countries.sort(this._countryNameSort);
            }
          }
        }, {
          key: "_addCountryCode",
          value: function _addCountryCode(iso2, countryCode, priority) {
            if (countryCode.length > this.countryCodeMaxLen) {
              this.countryCodeMaxLen = countryCode.length;
            }
            if (!this.countryCodes.hasOwnProperty(countryCode)) {
              this.countryCodes[countryCode] = [];
            }
            for (var i2 = 0; i2 < this.countryCodes[countryCode].length; i2++) {
              if (this.countryCodes[countryCode][i2] === iso2)
                return;
            }
            var index = priority !== undefined$1 ? priority : this.countryCodes[countryCode].length;
            this.countryCodes[countryCode][index] = iso2;
          }
        }, {
          key: "_processAllCountries",
          value: function _processAllCountries() {
            if (this.options.onlyCountries.length) {
              var lowerCaseOnlyCountries = this.options.onlyCountries.map(function(country) {
                return country.toLowerCase();
              });
              this.countries = allCountries.filter(function(country) {
                return lowerCaseOnlyCountries.indexOf(country.iso2) > -1;
              });
            } else if (this.options.excludeCountries.length) {
              var lowerCaseExcludeCountries = this.options.excludeCountries.map(function(country) {
                return country.toLowerCase();
              });
              this.countries = allCountries.filter(function(country) {
                return lowerCaseExcludeCountries.indexOf(country.iso2) === -1;
              });
            } else {
              this.countries = allCountries;
            }
          }
        }, {
          key: "_translateCountriesByLocale",
          value: function _translateCountriesByLocale() {
            for (var i2 = 0; i2 < this.countries.length; i2++) {
              var iso = this.countries[i2].iso2.toLowerCase();
              if (this.options.localizedCountries.hasOwnProperty(iso)) {
                this.countries[i2].name = this.options.localizedCountries[iso];
              }
            }
          }
        }, {
          key: "_countryNameSort",
          value: function _countryNameSort(a, b) {
            return a.name.localeCompare(b.name);
          }
        }, {
          key: "_processCountryCodes",
          value: function _processCountryCodes() {
            this.countryCodeMaxLen = 0;
            this.dialCodes = {};
            this.countryCodes = {};
            for (var i2 = 0; i2 < this.countries.length; i2++) {
              var c22 = this.countries[i2];
              if (!this.dialCodes[c22.dialCode])
                this.dialCodes[c22.dialCode] = true;
              this._addCountryCode(c22.iso2, c22.dialCode, c22.priority);
            }
            for (var _i = 0; _i < this.countries.length; _i++) {
              var _c = this.countries[_i];
              if (_c.areaCodes) {
                var rootCountryCode = this.countryCodes[_c.dialCode][0];
                for (var j2 = 0; j2 < _c.areaCodes.length; j2++) {
                  var areaCode = _c.areaCodes[j2];
                  for (var k2 = 1; k2 < areaCode.length; k2++) {
                    var partialDialCode = _c.dialCode + areaCode.substr(0, k2);
                    this._addCountryCode(rootCountryCode, partialDialCode);
                    this._addCountryCode(_c.iso2, partialDialCode);
                  }
                  this._addCountryCode(_c.iso2, _c.dialCode + areaCode);
                }
              }
            }
          }
        }, {
          key: "_processPreferredCountries",
          value: function _processPreferredCountries() {
            this.preferredCountries = [];
            for (var i2 = 0; i2 < this.options.preferredCountries.length; i2++) {
              var countryCode = this.options.preferredCountries[i2].toLowerCase();
              var countryData = this._getCountryData(countryCode, false, true);
              if (countryData)
                this.preferredCountries.push(countryData);
            }
          }
        }, {
          key: "_createEl",
          value: function _createEl(name, attrs, container) {
            var el = document.createElement(name);
            if (attrs)
              forEachProp(attrs, function(key, value) {
                return el.setAttribute(key, value);
              });
            if (container)
              container.appendChild(el);
            return el;
          }
        }, {
          key: "_generateMarkup",
          value: function _generateMarkup() {
            if (!this.telInput.hasAttribute("autocomplete") && !(this.telInput.form && this.telInput.form.hasAttribute("autocomplete"))) {
              this.telInput.setAttribute("autocomplete", "off");
            }
            var parentClass = "iti";
            if (this.options.allowDropdown)
              parentClass += " iti--allow-dropdown";
            if (this.options.separateDialCode)
              parentClass += " iti--separate-dial-code";
            if (this.options.customContainer) {
              parentClass += " ";
              parentClass += this.options.customContainer;
            }
            var wrapper = this._createEl("div", {
              "class": parentClass
            });
            this.telInput.parentNode.insertBefore(wrapper, this.telInput);
            this.flagsContainer = this._createEl("div", {
              "class": "iti__flag-container"
            }, wrapper);
            wrapper.appendChild(this.telInput);
            this.selectedFlag = this._createEl("div", {
              "class": "iti__selected-flag",
              role: "combobox",
              "aria-controls": "iti-".concat(this.id, "__country-listbox"),
              "aria-owns": "iti-".concat(this.id, "__country-listbox"),
              "aria-expanded": "false"
            }, this.flagsContainer);
            this.selectedFlagInner = this._createEl("div", {
              "class": "iti__flag"
            }, this.selectedFlag);
            if (this.options.separateDialCode) {
              this.selectedDialCode = this._createEl("div", {
                "class": "iti__selected-dial-code"
              }, this.selectedFlag);
            }
            if (this.options.allowDropdown) {
              this.selectedFlag.setAttribute("tabindex", "0");
              this.dropdownArrow = this._createEl("div", {
                "class": "iti__arrow"
              }, this.selectedFlag);
              this.countryList = this._createEl("ul", {
                "class": "iti__country-list iti__hide",
                id: "iti-".concat(this.id, "__country-listbox"),
                role: "listbox",
                "aria-label": "List of countries"
              });
              if (this.preferredCountries.length) {
                this._appendListItems(this.preferredCountries, "iti__preferred", true);
                this._createEl("li", {
                  "class": "iti__divider",
                  role: "separator",
                  "aria-disabled": "true"
                }, this.countryList);
              }
              this._appendListItems(this.countries, "iti__standard");
              if (this.options.dropdownContainer) {
                this.dropdown = this._createEl("div", {
                  "class": "iti iti--container"
                });
                this.dropdown.appendChild(this.countryList);
              } else {
                this.flagsContainer.appendChild(this.countryList);
              }
            }
            if (this.options.hiddenInput) {
              var hiddenInputName = this.options.hiddenInput;
              var name = this.telInput.getAttribute("name");
              if (name) {
                var i2 = name.lastIndexOf("[");
                if (i2 !== -1)
                  hiddenInputName = "".concat(name.substr(0, i2), "[").concat(hiddenInputName, "]");
              }
              this.hiddenInput = this._createEl("input", {
                type: "hidden",
                name: hiddenInputName
              });
              wrapper.appendChild(this.hiddenInput);
            }
          }
        }, {
          key: "_appendListItems",
          value: function _appendListItems(countries, className, preferred) {
            var tmp = "";
            for (var i2 = 0; i2 < countries.length; i2++) {
              var c22 = countries[i2];
              var idSuffix = preferred ? "-preferred" : "";
              tmp += "<li class='iti__country ".concat(className, "' tabIndex='-1' id='iti-").concat(this.id, "__item-").concat(c22.iso2).concat(idSuffix, "' role='option' data-dial-code='").concat(c22.dialCode, "' data-country-code='").concat(c22.iso2, "' aria-selected='false'>");
              tmp += "<div class='iti__flag-box'><div class='iti__flag iti__".concat(c22.iso2, "'></div></div>");
              tmp += "<span class='iti__country-name'>".concat(c22.name, "</span>");
              tmp += "<span class='iti__dial-code'>+".concat(c22.dialCode, "</span>");
              tmp += "</li>";
            }
            this.countryList.insertAdjacentHTML("beforeend", tmp);
          }
        }, {
          key: "_setInitialState",
          value: function _setInitialState() {
            var attributeValue = this.telInput.getAttribute("value");
            var inputValue = this.telInput.value;
            var useAttribute = attributeValue && attributeValue.charAt(0) === "+" && (!inputValue || inputValue.charAt(0) !== "+");
            var val = useAttribute ? attributeValue : inputValue;
            var dialCode = this._getDialCode(val);
            var isRegionlessNanp = this._isRegionlessNanp(val);
            var _this$options = this.options, initialCountry = _this$options.initialCountry, nationalMode = _this$options.nationalMode, autoHideDialCode = _this$options.autoHideDialCode, separateDialCode = _this$options.separateDialCode;
            if (dialCode && !isRegionlessNanp) {
              this._updateFlagFromNumber(val);
            } else if (initialCountry !== "auto") {
              if (initialCountry) {
                this._setFlag(initialCountry.toLowerCase());
              } else {
                if (dialCode && isRegionlessNanp) {
                  this._setFlag("us");
                } else {
                  this.defaultCountry = this.preferredCountries.length ? this.preferredCountries[0].iso2 : this.countries[0].iso2;
                  if (!val) {
                    this._setFlag(this.defaultCountry);
                  }
                }
              }
              if (!val && !nationalMode && !autoHideDialCode && !separateDialCode) {
                this.telInput.value = "+".concat(this.selectedCountryData.dialCode);
              }
            }
            if (val)
              this._updateValFromNumber(val);
          }
        }, {
          key: "_initListeners",
          value: function _initListeners() {
            this._initKeyListeners();
            if (this.options.autoHideDialCode)
              this._initBlurListeners();
            if (this.options.allowDropdown)
              this._initDropdownListeners();
            if (this.hiddenInput)
              this._initHiddenInputListener();
          }
        }, {
          key: "_initHiddenInputListener",
          value: function _initHiddenInputListener() {
            var _this3 = this;
            this._handleHiddenInputSubmit = function() {
              _this3.hiddenInput.value = _this3.getNumber();
            };
            if (this.telInput.form)
              this.telInput.form.addEventListener("submit", this._handleHiddenInputSubmit);
          }
        }, {
          key: "_getClosestLabel",
          value: function _getClosestLabel() {
            var el = this.telInput;
            while (el && el.tagName !== "LABEL") {
              el = el.parentNode;
            }
            return el;
          }
        }, {
          key: "_initDropdownListeners",
          value: function _initDropdownListeners() {
            var _this4 = this;
            this._handleLabelClick = function(e2) {
              if (_this4.countryList.classList.contains("iti__hide"))
                _this4.telInput.focus();
              else
                e2.preventDefault();
            };
            var label = this._getClosestLabel();
            if (label)
              label.addEventListener("click", this._handleLabelClick);
            this._handleClickSelectedFlag = function() {
              if (_this4.countryList.classList.contains("iti__hide") && !_this4.telInput.disabled && !_this4.telInput.readOnly) {
                _this4._showDropdown();
              }
            };
            this.selectedFlag.addEventListener("click", this._handleClickSelectedFlag);
            this._handleFlagsContainerKeydown = function(e2) {
              var isDropdownHidden = _this4.countryList.classList.contains("iti__hide");
              if (isDropdownHidden && ["ArrowUp", "Up", "ArrowDown", "Down", " ", "Enter"].indexOf(e2.key) !== -1) {
                e2.preventDefault();
                e2.stopPropagation();
                _this4._showDropdown();
              }
              if (e2.key === "Tab")
                _this4._closeDropdown();
            };
            this.flagsContainer.addEventListener("keydown", this._handleFlagsContainerKeydown);
          }
        }, {
          key: "_initRequests",
          value: function _initRequests() {
            var _this5 = this;
            if (this.options.utilsScript && !window.intlTelInputUtils) {
              if (window.intlTelInputGlobals.documentReady()) {
                window.intlTelInputGlobals.loadUtils(this.options.utilsScript);
              } else {
                window.addEventListener("load", function() {
                  window.intlTelInputGlobals.loadUtils(_this5.options.utilsScript);
                });
              }
            } else
              this.resolveUtilsScriptPromise();
            if (this.options.initialCountry === "auto")
              this._loadAutoCountry();
            else
              this.resolveAutoCountryPromise();
          }
        }, {
          key: "_loadAutoCountry",
          value: function _loadAutoCountry() {
            if (window.intlTelInputGlobals.autoCountry) {
              this.handleAutoCountry();
            } else if (!window.intlTelInputGlobals.startedLoadingAutoCountry) {
              window.intlTelInputGlobals.startedLoadingAutoCountry = true;
              if (typeof this.options.geoIpLookup === "function") {
                this.options.geoIpLookup(function(countryCode) {
                  window.intlTelInputGlobals.autoCountry = countryCode.toLowerCase();
                  setTimeout(function() {
                    return forEachInstance("handleAutoCountry");
                  });
                }, function() {
                  return forEachInstance("rejectAutoCountryPromise");
                });
              }
            }
          }
        }, {
          key: "_initKeyListeners",
          value: function _initKeyListeners() {
            var _this6 = this;
            this._handleKeyupEvent = function() {
              if (_this6._updateFlagFromNumber(_this6.telInput.value)) {
                _this6._triggerCountryChange();
              }
            };
            this.telInput.addEventListener("keyup", this._handleKeyupEvent);
            this._handleClipboardEvent = function() {
              setTimeout(_this6._handleKeyupEvent);
            };
            this.telInput.addEventListener("cut", this._handleClipboardEvent);
            this.telInput.addEventListener("paste", this._handleClipboardEvent);
          }
        }, {
          key: "_cap",
          value: function _cap(number2) {
            var max = this.telInput.getAttribute("maxlength");
            return max && number2.length > max ? number2.substr(0, max) : number2;
          }
        }, {
          key: "_initBlurListeners",
          value: function _initBlurListeners() {
            var _this7 = this;
            this._handleSubmitOrBlurEvent = function() {
              _this7._removeEmptyDialCode();
            };
            if (this.telInput.form)
              this.telInput.form.addEventListener("submit", this._handleSubmitOrBlurEvent);
            this.telInput.addEventListener("blur", this._handleSubmitOrBlurEvent);
          }
        }, {
          key: "_removeEmptyDialCode",
          value: function _removeEmptyDialCode() {
            if (this.telInput.value.charAt(0) === "+") {
              var numeric = this._getNumeric(this.telInput.value);
              if (!numeric || this.selectedCountryData.dialCode === numeric) {
                this.telInput.value = "";
              }
            }
          }
        }, {
          key: "_getNumeric",
          value: function _getNumeric(s2) {
            return s2.replace(/\D/g, "");
          }
        }, {
          key: "_trigger",
          value: function _trigger(name) {
            var e2 = document.createEvent("Event");
            e2.initEvent(name, true, true);
            this.telInput.dispatchEvent(e2);
          }
        }, {
          key: "_showDropdown",
          value: function _showDropdown() {
            this.countryList.classList.remove("iti__hide");
            this.selectedFlag.setAttribute("aria-expanded", "true");
            this._setDropdownPosition();
            if (this.activeItem) {
              this._highlightListItem(this.activeItem, false);
              this._scrollTo(this.activeItem, true);
            }
            this._bindDropdownListeners();
            this.dropdownArrow.classList.add("iti__arrow--up");
            this._trigger("open:countrydropdown");
          }
        }, {
          key: "_toggleClass",
          value: function _toggleClass(el, className, shouldHaveClass) {
            if (shouldHaveClass && !el.classList.contains(className))
              el.classList.add(className);
            else if (!shouldHaveClass && el.classList.contains(className))
              el.classList.remove(className);
          }
        }, {
          key: "_setDropdownPosition",
          value: function _setDropdownPosition() {
            var _this8 = this;
            if (this.options.dropdownContainer) {
              this.options.dropdownContainer.appendChild(this.dropdown);
            }
            if (!this.isMobile) {
              var pos = this.telInput.getBoundingClientRect();
              var windowTop = window.pageYOffset || document.documentElement.scrollTop;
              var inputTop = pos.top + windowTop;
              var dropdownHeight = this.countryList.offsetHeight;
              var dropdownFitsBelow = inputTop + this.telInput.offsetHeight + dropdownHeight < windowTop + window.innerHeight;
              var dropdownFitsAbove = inputTop - dropdownHeight > windowTop;
              this._toggleClass(this.countryList, "iti__country-list--dropup", !dropdownFitsBelow && dropdownFitsAbove);
              if (this.options.dropdownContainer) {
                var extraTop = !dropdownFitsBelow && dropdownFitsAbove ? 0 : this.telInput.offsetHeight;
                this.dropdown.style.top = "".concat(inputTop + extraTop, "px");
                this.dropdown.style.left = "".concat(pos.left + document.body.scrollLeft, "px");
                this._handleWindowScroll = function() {
                  return _this8._closeDropdown();
                };
                window.addEventListener("scroll", this._handleWindowScroll);
              }
            }
          }
        }, {
          key: "_getClosestListItem",
          value: function _getClosestListItem(target) {
            var el = target;
            while (el && el !== this.countryList && !el.classList.contains("iti__country")) {
              el = el.parentNode;
            }
            return el === this.countryList ? null : el;
          }
        }, {
          key: "_bindDropdownListeners",
          value: function _bindDropdownListeners() {
            var _this9 = this;
            this._handleMouseoverCountryList = function(e2) {
              var listItem = _this9._getClosestListItem(e2.target);
              if (listItem)
                _this9._highlightListItem(listItem, false);
            };
            this.countryList.addEventListener("mouseover", this._handleMouseoverCountryList);
            this._handleClickCountryList = function(e2) {
              var listItem = _this9._getClosestListItem(e2.target);
              if (listItem)
                _this9._selectListItem(listItem);
            };
            this.countryList.addEventListener("click", this._handleClickCountryList);
            var isOpening = true;
            this._handleClickOffToClose = function() {
              if (!isOpening)
                _this9._closeDropdown();
              isOpening = false;
            };
            document.documentElement.addEventListener("click", this._handleClickOffToClose);
            var query = "";
            var queryTimer = null;
            this._handleKeydownOnDropdown = function(e2) {
              e2.preventDefault();
              if (e2.key === "ArrowUp" || e2.key === "Up" || e2.key === "ArrowDown" || e2.key === "Down")
                _this9._handleUpDownKey(e2.key);
              else if (e2.key === "Enter")
                _this9._handleEnterKey();
              else if (e2.key === "Escape")
                _this9._closeDropdown();
              else if (/^[a-zA-ZÀ-ÿа-яА-Я ]$/.test(e2.key)) {
                if (queryTimer)
                  clearTimeout(queryTimer);
                query += e2.key.toLowerCase();
                _this9._searchForCountry(query);
                queryTimer = setTimeout(function() {
                  query = "";
                }, 1e3);
              }
            };
            document.addEventListener("keydown", this._handleKeydownOnDropdown);
          }
        }, {
          key: "_handleUpDownKey",
          value: function _handleUpDownKey(key) {
            var next = key === "ArrowUp" || key === "Up" ? this.highlightedItem.previousElementSibling : this.highlightedItem.nextElementSibling;
            if (next) {
              if (next.classList.contains("iti__divider")) {
                next = key === "ArrowUp" || key === "Up" ? next.previousElementSibling : next.nextElementSibling;
              }
              this._highlightListItem(next, true);
            }
          }
        }, {
          key: "_handleEnterKey",
          value: function _handleEnterKey() {
            if (this.highlightedItem)
              this._selectListItem(this.highlightedItem);
          }
        }, {
          key: "_searchForCountry",
          value: function _searchForCountry(query) {
            for (var i2 = 0; i2 < this.countries.length; i2++) {
              if (this._startsWith(this.countries[i2].name, query)) {
                var listItem = this.countryList.querySelector("#iti-".concat(this.id, "__item-").concat(this.countries[i2].iso2));
                this._highlightListItem(listItem, false);
                this._scrollTo(listItem, true);
                break;
              }
            }
          }
        }, {
          key: "_startsWith",
          value: function _startsWith(a, b) {
            return a.substr(0, b.length).toLowerCase() === b;
          }
        }, {
          key: "_updateValFromNumber",
          value: function _updateValFromNumber(originalNumber) {
            var number2 = originalNumber;
            if (this.options.formatOnDisplay && window.intlTelInputUtils && this.selectedCountryData) {
              var useNational = !this.options.separateDialCode && (this.options.nationalMode || number2.charAt(0) !== "+");
              var _intlTelInputUtils$nu = intlTelInputUtils.numberFormat, NATIONAL = _intlTelInputUtils$nu.NATIONAL, INTERNATIONAL = _intlTelInputUtils$nu.INTERNATIONAL;
              var format2 = useNational ? NATIONAL : INTERNATIONAL;
              number2 = intlTelInputUtils.formatNumber(number2, this.selectedCountryData.iso2, format2);
            }
            number2 = this._beforeSetNumber(number2);
            this.telInput.value = number2;
          }
        }, {
          key: "_updateFlagFromNumber",
          value: function _updateFlagFromNumber(originalNumber) {
            var number2 = originalNumber;
            var selectedDialCode = this.selectedCountryData.dialCode;
            var isNanp = selectedDialCode === "1";
            if (number2 && this.options.nationalMode && isNanp && number2.charAt(0) !== "+") {
              if (number2.charAt(0) !== "1")
                number2 = "1".concat(number2);
              number2 = "+".concat(number2);
            }
            if (this.options.separateDialCode && selectedDialCode && number2.charAt(0) !== "+") {
              number2 = "+".concat(selectedDialCode).concat(number2);
            }
            var dialCode = this._getDialCode(number2, true);
            var numeric = this._getNumeric(number2);
            var countryCode = null;
            if (dialCode) {
              var countryCodes = this.countryCodes[this._getNumeric(dialCode)];
              var alreadySelected = countryCodes.indexOf(this.selectedCountryData.iso2) !== -1 && numeric.length <= dialCode.length - 1;
              var isRegionlessNanpNumber = selectedDialCode === "1" && this._isRegionlessNanp(numeric);
              if (!isRegionlessNanpNumber && !alreadySelected) {
                for (var j2 = 0; j2 < countryCodes.length; j2++) {
                  if (countryCodes[j2]) {
                    countryCode = countryCodes[j2];
                    break;
                  }
                }
              }
            } else if (number2.charAt(0) === "+" && numeric.length) {
              countryCode = "";
            } else if (!number2 || number2 === "+") {
              countryCode = this.defaultCountry;
            }
            if (countryCode !== null) {
              return this._setFlag(countryCode);
            }
            return false;
          }
        }, {
          key: "_isRegionlessNanp",
          value: function _isRegionlessNanp(number2) {
            var numeric = this._getNumeric(number2);
            if (numeric.charAt(0) === "1") {
              var areaCode = numeric.substr(1, 3);
              return regionlessNanpNumbers.indexOf(areaCode) !== -1;
            }
            return false;
          }
        }, {
          key: "_highlightListItem",
          value: function _highlightListItem(listItem, shouldFocus) {
            var prevItem = this.highlightedItem;
            if (prevItem)
              prevItem.classList.remove("iti__highlight");
            this.highlightedItem = listItem;
            this.highlightedItem.classList.add("iti__highlight");
            if (shouldFocus)
              this.highlightedItem.focus();
          }
        }, {
          key: "_getCountryData",
          value: function _getCountryData(countryCode, ignoreOnlyCountriesOption, allowFail) {
            var countryList = ignoreOnlyCountriesOption ? allCountries : this.countries;
            for (var i2 = 0; i2 < countryList.length; i2++) {
              if (countryList[i2].iso2 === countryCode) {
                return countryList[i2];
              }
            }
            if (allowFail) {
              return null;
            }
            throw new Error("No country data for '".concat(countryCode, "'"));
          }
        }, {
          key: "_setFlag",
          value: function _setFlag(countryCode) {
            var prevCountry = this.selectedCountryData.iso2 ? this.selectedCountryData : {};
            this.selectedCountryData = countryCode ? this._getCountryData(countryCode, false, false) : {};
            if (this.selectedCountryData.iso2) {
              this.defaultCountry = this.selectedCountryData.iso2;
            }
            this.selectedFlagInner.setAttribute("class", "iti__flag iti__".concat(countryCode));
            var title = countryCode ? "".concat(this.selectedCountryData.name, ": +").concat(this.selectedCountryData.dialCode) : "Unknown";
            this.selectedFlag.setAttribute("title", title);
            if (this.options.separateDialCode) {
              var dialCode = this.selectedCountryData.dialCode ? "+".concat(this.selectedCountryData.dialCode) : "";
              this.selectedDialCode.innerHTML = dialCode;
              var selectedFlagWidth = this.selectedFlag.offsetWidth || this._getHiddenSelectedFlagWidth();
              this.telInput.style.paddingLeft = "".concat(selectedFlagWidth + 6, "px");
            }
            this._updatePlaceholder();
            if (this.options.allowDropdown) {
              var prevItem = this.activeItem;
              if (prevItem) {
                prevItem.classList.remove("iti__active");
                prevItem.setAttribute("aria-selected", "false");
              }
              if (countryCode) {
                var nextItem = this.countryList.querySelector("#iti-".concat(this.id, "__item-").concat(countryCode, "-preferred")) || this.countryList.querySelector("#iti-".concat(this.id, "__item-").concat(countryCode));
                nextItem.setAttribute("aria-selected", "true");
                nextItem.classList.add("iti__active");
                this.activeItem = nextItem;
                this.selectedFlag.setAttribute("aria-activedescendant", nextItem.getAttribute("id"));
              }
            }
            return prevCountry.iso2 !== countryCode;
          }
        }, {
          key: "_getHiddenSelectedFlagWidth",
          value: function _getHiddenSelectedFlagWidth() {
            var containerClone = this.telInput.parentNode.cloneNode();
            containerClone.style.visibility = "hidden";
            document.body.appendChild(containerClone);
            var flagsContainerClone = this.flagsContainer.cloneNode();
            containerClone.appendChild(flagsContainerClone);
            var selectedFlagClone = this.selectedFlag.cloneNode(true);
            flagsContainerClone.appendChild(selectedFlagClone);
            var width = selectedFlagClone.offsetWidth;
            containerClone.parentNode.removeChild(containerClone);
            return width;
          }
        }, {
          key: "_updatePlaceholder",
          value: function _updatePlaceholder() {
            var shouldSetPlaceholder = this.options.autoPlaceholder === "aggressive" || !this.hadInitialPlaceholder && this.options.autoPlaceholder === "polite";
            if (window.intlTelInputUtils && shouldSetPlaceholder) {
              var numberType = intlTelInputUtils.numberType[this.options.placeholderNumberType];
              var placeholder = this.selectedCountryData.iso2 ? intlTelInputUtils.getExampleNumber(this.selectedCountryData.iso2, this.options.nationalMode, numberType) : "";
              placeholder = this._beforeSetNumber(placeholder);
              if (typeof this.options.customPlaceholder === "function") {
                placeholder = this.options.customPlaceholder(placeholder, this.selectedCountryData);
              }
              this.telInput.setAttribute("placeholder", placeholder);
            }
          }
        }, {
          key: "_selectListItem",
          value: function _selectListItem(listItem) {
            var flagChanged = this._setFlag(listItem.getAttribute("data-country-code"));
            this._closeDropdown();
            this._updateDialCode(listItem.getAttribute("data-dial-code"), true);
            this.telInput.focus();
            var len = this.telInput.value.length;
            this.telInput.setSelectionRange(len, len);
            if (flagChanged) {
              this._triggerCountryChange();
            }
          }
        }, {
          key: "_closeDropdown",
          value: function _closeDropdown() {
            this.countryList.classList.add("iti__hide");
            this.selectedFlag.setAttribute("aria-expanded", "false");
            this.dropdownArrow.classList.remove("iti__arrow--up");
            document.removeEventListener("keydown", this._handleKeydownOnDropdown);
            document.documentElement.removeEventListener("click", this._handleClickOffToClose);
            this.countryList.removeEventListener("mouseover", this._handleMouseoverCountryList);
            this.countryList.removeEventListener("click", this._handleClickCountryList);
            if (this.options.dropdownContainer) {
              if (!this.isMobile)
                window.removeEventListener("scroll", this._handleWindowScroll);
              if (this.dropdown.parentNode)
                this.dropdown.parentNode.removeChild(this.dropdown);
            }
            this._trigger("close:countrydropdown");
          }
        }, {
          key: "_scrollTo",
          value: function _scrollTo(element, middle) {
            var container = this.countryList;
            var windowTop = window.pageYOffset || document.documentElement.scrollTop;
            var containerHeight = container.offsetHeight;
            var containerTop = container.getBoundingClientRect().top + windowTop;
            var containerBottom = containerTop + containerHeight;
            var elementHeight = element.offsetHeight;
            var elementTop = element.getBoundingClientRect().top + windowTop;
            var elementBottom = elementTop + elementHeight;
            var newScrollTop = elementTop - containerTop + container.scrollTop;
            var middleOffset = containerHeight / 2 - elementHeight / 2;
            if (elementTop < containerTop) {
              if (middle)
                newScrollTop -= middleOffset;
              container.scrollTop = newScrollTop;
            } else if (elementBottom > containerBottom) {
              if (middle)
                newScrollTop += middleOffset;
              var heightDifference = containerHeight - elementHeight;
              container.scrollTop = newScrollTop - heightDifference;
            }
          }
        }, {
          key: "_updateDialCode",
          value: function _updateDialCode(newDialCodeBare, hasSelectedListItem) {
            var inputVal = this.telInput.value;
            var newDialCode = "+".concat(newDialCodeBare);
            var newNumber;
            if (inputVal.charAt(0) === "+") {
              var prevDialCode = this._getDialCode(inputVal);
              if (prevDialCode) {
                newNumber = inputVal.replace(prevDialCode, newDialCode);
              } else {
                newNumber = newDialCode;
              }
            } else if (this.options.nationalMode || this.options.separateDialCode) {
              return;
            } else {
              if (inputVal) {
                newNumber = newDialCode + inputVal;
              } else if (hasSelectedListItem || !this.options.autoHideDialCode) {
                newNumber = newDialCode;
              } else {
                return;
              }
            }
            this.telInput.value = newNumber;
          }
        }, {
          key: "_getDialCode",
          value: function _getDialCode(number2, includeAreaCode) {
            var dialCode = "";
            if (number2.charAt(0) === "+") {
              var numericChars = "";
              for (var i2 = 0; i2 < number2.length; i2++) {
                var c22 = number2.charAt(i2);
                if (!isNaN(parseInt(c22, 10))) {
                  numericChars += c22;
                  if (includeAreaCode) {
                    if (this.countryCodes[numericChars]) {
                      dialCode = number2.substr(0, i2 + 1);
                    }
                  } else {
                    if (this.dialCodes[numericChars]) {
                      dialCode = number2.substr(0, i2 + 1);
                      break;
                    }
                  }
                  if (numericChars.length === this.countryCodeMaxLen) {
                    break;
                  }
                }
              }
            }
            return dialCode;
          }
        }, {
          key: "_getFullNumber",
          value: function _getFullNumber() {
            var val = this.telInput.value.trim();
            var dialCode = this.selectedCountryData.dialCode;
            var prefix;
            var numericVal = this._getNumeric(val);
            if (this.options.separateDialCode && val.charAt(0) !== "+" && dialCode && numericVal) {
              prefix = "+".concat(dialCode);
            } else {
              prefix = "";
            }
            return prefix + val;
          }
        }, {
          key: "_beforeSetNumber",
          value: function _beforeSetNumber(originalNumber) {
            var number2 = originalNumber;
            if (this.options.separateDialCode) {
              var dialCode = this._getDialCode(number2);
              if (dialCode) {
                dialCode = "+".concat(this.selectedCountryData.dialCode);
                var start = number2[dialCode.length] === " " || number2[dialCode.length] === "-" ? dialCode.length + 1 : dialCode.length;
                number2 = number2.substr(start);
              }
            }
            return this._cap(number2);
          }
        }, {
          key: "_triggerCountryChange",
          value: function _triggerCountryChange() {
            this._trigger("countrychange");
          }
        }, {
          key: "handleAutoCountry",
          value: function handleAutoCountry() {
            if (this.options.initialCountry === "auto") {
              this.defaultCountry = window.intlTelInputGlobals.autoCountry;
              if (!this.telInput.value) {
                this.setCountry(this.defaultCountry);
              }
              this.resolveAutoCountryPromise();
            }
          }
        }, {
          key: "handleUtils",
          value: function handleUtils() {
            if (window.intlTelInputUtils) {
              if (this.telInput.value) {
                this._updateValFromNumber(this.telInput.value);
              }
              this._updatePlaceholder();
            }
            this.resolveUtilsScriptPromise();
          }
        }, {
          key: "destroy",
          value: function destroy() {
            var form = this.telInput.form;
            if (this.options.allowDropdown) {
              this._closeDropdown();
              this.selectedFlag.removeEventListener("click", this._handleClickSelectedFlag);
              this.flagsContainer.removeEventListener("keydown", this._handleFlagsContainerKeydown);
              var label = this._getClosestLabel();
              if (label)
                label.removeEventListener("click", this._handleLabelClick);
            }
            if (this.hiddenInput && form)
              form.removeEventListener("submit", this._handleHiddenInputSubmit);
            if (this.options.autoHideDialCode) {
              if (form)
                form.removeEventListener("submit", this._handleSubmitOrBlurEvent);
              this.telInput.removeEventListener("blur", this._handleSubmitOrBlurEvent);
            }
            this.telInput.removeEventListener("keyup", this._handleKeyupEvent);
            this.telInput.removeEventListener("cut", this._handleClipboardEvent);
            this.telInput.removeEventListener("paste", this._handleClipboardEvent);
            this.telInput.removeAttribute("data-intl-tel-input-id");
            var wrapper = this.telInput.parentNode;
            wrapper.parentNode.insertBefore(this.telInput, wrapper);
            wrapper.parentNode.removeChild(wrapper);
            delete window.intlTelInputGlobals.instances[this.id];
          }
        }, {
          key: "getExtension",
          value: function getExtension() {
            if (window.intlTelInputUtils) {
              return intlTelInputUtils.getExtension(this._getFullNumber(), this.selectedCountryData.iso2);
            }
            return "";
          }
        }, {
          key: "getNumber",
          value: function getNumber(format2) {
            if (window.intlTelInputUtils) {
              var iso2 = this.selectedCountryData.iso2;
              return intlTelInputUtils.formatNumber(this._getFullNumber(), iso2, format2);
            }
            return "";
          }
        }, {
          key: "getNumberType",
          value: function getNumberType() {
            if (window.intlTelInputUtils) {
              return intlTelInputUtils.getNumberType(this._getFullNumber(), this.selectedCountryData.iso2);
            }
            return -99;
          }
        }, {
          key: "getSelectedCountryData",
          value: function getSelectedCountryData() {
            return this.selectedCountryData;
          }
        }, {
          key: "getValidationError",
          value: function getValidationError() {
            if (window.intlTelInputUtils) {
              var iso2 = this.selectedCountryData.iso2;
              return intlTelInputUtils.getValidationError(this._getFullNumber(), iso2);
            }
            return -99;
          }
        }, {
          key: "isValidNumber",
          value: function isValidNumber() {
            var val = this._getFullNumber().trim();
            var countryCode = this.options.nationalMode ? this.selectedCountryData.iso2 : "";
            return window.intlTelInputUtils ? intlTelInputUtils.isValidNumber(val, countryCode) : null;
          }
        }, {
          key: "setCountry",
          value: function setCountry(originalCountryCode) {
            var countryCode = originalCountryCode.toLowerCase();
            if (!this.selectedFlagInner.classList.contains("iti__".concat(countryCode))) {
              this._setFlag(countryCode);
              this._updateDialCode(this.selectedCountryData.dialCode, false);
              this._triggerCountryChange();
            }
          }
        }, {
          key: "setNumber",
          value: function setNumber(number2) {
            var flagChanged = this._updateFlagFromNumber(number2);
            this._updateValFromNumber(number2);
            if (flagChanged) {
              this._triggerCountryChange();
            }
          }
        }, {
          key: "setPlaceholderNumberType",
          value: function setPlaceholderNumberType(type) {
            this.options.placeholderNumberType = type;
            this._updatePlaceholder();
          }
        }]);
        return Iti2;
      }();
      intlTelInputGlobals.getCountryData = function() {
        return allCountries;
      };
      var injectScript = function injectScript2(path, handleSuccess, handleFailure) {
        var script = document.createElement("script");
        script.onload = function() {
          forEachInstance("handleUtils");
          if (handleSuccess)
            handleSuccess();
        };
        script.onerror = function() {
          forEachInstance("rejectUtilsScriptPromise");
          if (handleFailure)
            handleFailure();
        };
        script.className = "iti-load-utils";
        script.async = true;
        script.src = path;
        document.body.appendChild(script);
      };
      intlTelInputGlobals.loadUtils = function(path) {
        if (!window.intlTelInputUtils && !window.intlTelInputGlobals.startedLoadingUtilsScript) {
          window.intlTelInputGlobals.startedLoadingUtilsScript = true;
          if (typeof Promise !== "undefined") {
            return new Promise(function(resolve2, reject) {
              return injectScript(path, resolve2, reject);
            });
          }
          injectScript(path);
        }
        return null;
      };
      intlTelInputGlobals.defaults = defaults;
      intlTelInputGlobals.version = "17.0.21";
      return function(input, options) {
        var iti = new Iti(input, options);
        iti._init();
        input.setAttribute("data-intl-tel-input-id", iti.id);
        window.intlTelInputGlobals.instances[iti.id] = iti;
        return iti;
      };
    }();
  });
})(intlTelInput$1);
var intlTelInput = intlTelInput$1.exports;
var gridstack = {};
var gridstackEngine = {};
var utils = {};
Object.defineProperty(utils, "__esModule", { value: true });
utils.Utils = utils.obsoleteAttr = utils.obsoleteOptsDel = utils.obsoleteOpts = utils.obsolete = void 0;
function obsolete(self2, f2, oldName, newName, rev) {
  let wrapper = (...args) => {
    console.warn("gridstack.js: Function `" + oldName + "` is deprecated in " + rev + " and has been replaced with `" + newName + "`. It will be **completely** removed in v1.0");
    return f2.apply(self2, args);
  };
  wrapper.prototype = f2.prototype;
  return wrapper;
}
utils.obsolete = obsolete;
function obsoleteOpts(opts, oldName, newName, rev) {
  if (opts[oldName] !== void 0) {
    opts[newName] = opts[oldName];
    console.warn("gridstack.js: Option `" + oldName + "` is deprecated in " + rev + " and has been replaced with `" + newName + "`. It will be **completely** removed in v1.0");
  }
}
utils.obsoleteOpts = obsoleteOpts;
function obsoleteOptsDel(opts, oldName, rev, info) {
  if (opts[oldName] !== void 0) {
    console.warn("gridstack.js: Option `" + oldName + "` is deprecated in " + rev + info);
  }
}
utils.obsoleteOptsDel = obsoleteOptsDel;
function obsoleteAttr(el, oldName, newName, rev) {
  let oldAttr = el.getAttribute(oldName);
  if (oldAttr !== null) {
    el.setAttribute(newName, oldAttr);
    console.warn("gridstack.js: attribute `" + oldName + "`=" + oldAttr + " is deprecated on this object in " + rev + " and has been replaced with `" + newName + "`. It will be **completely** removed in v1.0");
  }
}
utils.obsoleteAttr = obsoleteAttr;
var Utils = class _Utils {
  static getElements(els) {
    if (typeof els === "string") {
      let list = document.querySelectorAll(els);
      if (!list.length && els[0] !== "." && els[0] !== "#") {
        list = document.querySelectorAll("." + els);
        if (!list.length) {
          list = document.querySelectorAll("#" + els);
        }
      }
      return Array.from(list);
    }
    return [els];
  }
  static getElement(els) {
    if (typeof els === "string") {
      if (!els.length)
        return null;
      if (els[0] === "#") {
        return document.getElementById(els.substring(1));
      }
      if (els[0] === "." || els[0] === "[") {
        return document.querySelector(els);
      }
      if (!isNaN(+els[0])) {
        return document.getElementById(els);
      }
      let el = document.querySelector(els);
      if (!el) {
        el = document.getElementById(els);
      }
      if (!el) {
        el = document.querySelector("." + els);
      }
      return el;
    }
    return els;
  }
  static isIntercepted(a, b) {
    return !(a.y >= b.y + b.h || a.y + a.h <= b.y || a.x + a.w <= b.x || a.x >= b.x + b.w);
  }
  static isTouching(a, b) {
    return _Utils.isIntercepted(a, { x: b.x - 0.5, y: b.y - 0.5, w: b.w + 1, h: b.h + 1 });
  }
  static sort(nodes, dir, column) {
    column = column || nodes.reduce((col, n2) => Math.max(n2.x + n2.w, col), 0) || 12;
    if (dir === -1)
      return nodes.sort((a, b) => b.x + b.y * column - (a.x + a.y * column));
    else
      return nodes.sort((b, a) => b.x + b.y * column - (a.x + a.y * column));
  }
  static createStylesheet(id, parent) {
    let style = document.createElement("style");
    style.setAttribute("type", "text/css");
    style.setAttribute("gs-style-id", id);
    if (style.styleSheet) {
      style.styleSheet.cssText = "";
    } else {
      style.appendChild(document.createTextNode(""));
    }
    if (!parent) {
      parent = document.getElementsByTagName("head")[0];
      parent.appendChild(style);
    } else {
      parent.insertBefore(style, parent.firstChild);
    }
    return style.sheet;
  }
  static removeStylesheet(id) {
    let el = document.querySelector("STYLE[gs-style-id=" + id + "]");
    if (el && el.parentNode)
      el.remove();
  }
  static addCSSRule(sheet, selector, rules) {
    if (typeof sheet.addRule === "function") {
      sheet.addRule(selector, rules);
    } else if (typeof sheet.insertRule === "function") {
      sheet.insertRule(`${selector}{${rules}}`);
    }
  }
  static toBool(v2) {
    if (typeof v2 === "boolean") {
      return v2;
    }
    if (typeof v2 === "string") {
      v2 = v2.toLowerCase();
      return !(v2 === "" || v2 === "no" || v2 === "false" || v2 === "0");
    }
    return Boolean(v2);
  }
  static toNumber(value) {
    return value === null || value.length === 0 ? void 0 : Number(value);
  }
  static parseHeight(val) {
    let h2;
    let unit = "px";
    if (typeof val === "string") {
      let match = val.match(/^(-[0-9]+\.[0-9]+|[0-9]*\.[0-9]+|-[0-9]+|[0-9]+)(px|em|rem|vh|vw|%)?$/);
      if (!match) {
        throw new Error("Invalid height");
      }
      unit = match[2] || "px";
      h2 = parseFloat(match[1]);
    } else {
      h2 = val;
    }
    return { h: h2, unit };
  }
  static defaults(target, ...sources) {
    sources.forEach((source) => {
      for (const key in source) {
        if (!source.hasOwnProperty(key))
          return;
        if (target[key] === null || target[key] === void 0) {
          target[key] = source[key];
        } else if (typeof source[key] === "object" && typeof target[key] === "object") {
          this.defaults(target[key], source[key]);
        }
      }
    });
    return target;
  }
  static same(a, b) {
    if (typeof a !== "object")
      return a == b;
    if (typeof a !== typeof b)
      return false;
    if (Object.keys(a).length !== Object.keys(b).length)
      return false;
    for (const key in a) {
      if (a[key] !== b[key])
        return false;
    }
    return true;
  }
  static copyPos(a, b, minMax = false) {
    a.x = b.x;
    a.y = b.y;
    a.w = b.w;
    a.h = b.h;
    if (!minMax)
      return a;
    if (b.minW)
      a.minW = b.minW;
    if (b.minH)
      a.minH = b.minH;
    if (b.maxW)
      a.maxW = b.maxW;
    if (b.maxH)
      a.maxH = b.maxH;
    return a;
  }
  static samePos(a, b) {
    return a && b && a.x === b.x && a.y === b.y && a.w === b.w && a.h === b.h;
  }
  static removeInternalAndSame(a, b) {
    if (typeof a !== "object" || typeof b !== "object")
      return;
    for (let key in a) {
      let val = a[key];
      if (key[0] === "_" || val === b[key]) {
        delete a[key];
      } else if (val && typeof val === "object" && b[key] !== void 0) {
        for (let i in val) {
          if (val[i] === b[key][i] || i[0] === "_") {
            delete val[i];
          }
        }
        if (!Object.keys(val).length) {
          delete a[key];
        }
      }
    }
  }
  static closestByClass(el, name) {
    while (el) {
      if (el.classList.contains(name))
        return el;
      el = el.parentElement;
    }
    return null;
  }
  static throttle(func, delay) {
    let isWaiting = false;
    return (...args) => {
      if (!isWaiting) {
        isWaiting = true;
        setTimeout(() => {
          func(...args);
          isWaiting = false;
        }, delay);
      }
    };
  }
  static removePositioningStyles(el) {
    let style = el.style;
    if (style.position) {
      style.removeProperty("position");
    }
    if (style.left) {
      style.removeProperty("left");
    }
    if (style.top) {
      style.removeProperty("top");
    }
    if (style.width) {
      style.removeProperty("width");
    }
    if (style.height) {
      style.removeProperty("height");
    }
  }
  static getScrollElement(el) {
    if (!el)
      return document.scrollingElement || document.documentElement;
    const style = getComputedStyle(el);
    const overflowRegex = /(auto|scroll)/;
    if (overflowRegex.test(style.overflow + style.overflowY)) {
      return el;
    } else {
      return this.getScrollElement(el.parentElement);
    }
  }
  static updateScrollPosition(el, position, distance) {
    let rect = el.getBoundingClientRect();
    let innerHeightOrClientHeight = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < 0 || rect.bottom > innerHeightOrClientHeight) {
      let offsetDiffDown = rect.bottom - innerHeightOrClientHeight;
      let offsetDiffUp = rect.top;
      let scrollEl = this.getScrollElement(el);
      if (scrollEl !== null) {
        let prevScroll = scrollEl.scrollTop;
        if (rect.top < 0 && distance < 0) {
          if (el.offsetHeight > innerHeightOrClientHeight) {
            scrollEl.scrollTop += distance;
          } else {
            scrollEl.scrollTop += Math.abs(offsetDiffUp) > Math.abs(distance) ? distance : offsetDiffUp;
          }
        } else if (distance > 0) {
          if (el.offsetHeight > innerHeightOrClientHeight) {
            scrollEl.scrollTop += distance;
          } else {
            scrollEl.scrollTop += offsetDiffDown > distance ? distance : offsetDiffDown;
          }
        }
        position.top += scrollEl.scrollTop - prevScroll;
      }
    }
  }
  static updateScrollResize(event, el, distance) {
    const scrollEl = this.getScrollElement(el);
    const height = scrollEl.clientHeight;
    const offsetTop = scrollEl === this.getScrollElement() ? 0 : scrollEl.getBoundingClientRect().top;
    const pointerPosY = event.clientY - offsetTop;
    const top = pointerPosY < distance;
    const bottom = pointerPosY > height - distance;
    if (top) {
      scrollEl.scrollBy({ behavior: "smooth", top: pointerPosY - distance });
    } else if (bottom) {
      scrollEl.scrollBy({ behavior: "smooth", top: distance - (height - pointerPosY) });
    }
  }
  static clone(obj) {
    if (obj === null || obj === void 0 || typeof obj !== "object") {
      return obj;
    }
    if (obj instanceof Array) {
      return [...obj];
    }
    return Object.assign({}, obj);
  }
  static cloneDeep(obj) {
    const ret = _Utils.clone(obj);
    for (const key in ret) {
      if (ret.hasOwnProperty(key) && typeof ret[key] === "object" && key.substring(0, 2) !== "__" && !skipFields.find((k2) => k2 === key)) {
        ret[key] = _Utils.cloneDeep(obj[key]);
      }
    }
    return ret;
  }
};
utils.Utils = Utils;
var skipFields = ["_isNested", "el", "grid", "subGrid", "engine"];
Object.defineProperty(gridstackEngine, "__esModule", { value: true });
gridstackEngine.GridStackEngine = void 0;
var utils_1 = utils;
var GridStackEngine = class _GridStackEngine {
  constructor(opts = {}) {
    this.addedNodes = [];
    this.removedNodes = [];
    this.column = opts.column || 12;
    this.onChange = opts.onChange;
    this._float = opts.float;
    this.maxRow = opts.maxRow;
    this.nodes = opts.nodes || [];
  }
  batchUpdate() {
    if (this.batchMode)
      return this;
    this.batchMode = true;
    this._prevFloat = this._float;
    this._float = true;
    this.saveInitial();
    return this;
  }
  commit() {
    if (!this.batchMode)
      return this;
    this.batchMode = false;
    this._float = this._prevFloat;
    delete this._prevFloat;
    return this._packNodes()._notify();
  }
  _useEntireRowArea(node, nn) {
    return !this.float && !this._hasLocked && (!node._moving || node._skipDown || nn.y <= node.y);
  }
  _fixCollisions(node, nn = node, collide, opt = {}) {
    this._sortNodes(-1);
    collide = collide || this.collide(node, nn);
    if (!collide)
      return false;
    if (node._moving && !opt.nested && !this.float) {
      if (this.swap(node, collide))
        return true;
    }
    let area = nn;
    if (this._useEntireRowArea(node, nn)) {
      area = { x: 0, w: this.column, y: nn.y, h: nn.h };
      collide = this.collide(node, area, opt.skip);
    }
    let didMove = false;
    let newOpt = { nested: true, pack: false };
    while (collide = collide || this.collide(node, area, opt.skip)) {
      let moved;
      if (collide.locked || node._moving && !node._skipDown && nn.y > node.y && !this.float && (!this.collide(collide, Object.assign(Object.assign({}, collide), { y: node.y }), node) || !this.collide(collide, Object.assign(Object.assign({}, collide), { y: nn.y - collide.h }), node))) {
        node._skipDown = node._skipDown || nn.y > node.y;
        moved = this.moveNode(node, Object.assign(Object.assign(Object.assign({}, nn), { y: collide.y + collide.h }), newOpt));
        if (collide.locked && moved) {
          utils_1.Utils.copyPos(nn, node);
        } else if (!collide.locked && moved && opt.pack) {
          this._packNodes();
          nn.y = collide.y + collide.h;
          utils_1.Utils.copyPos(node, nn);
        }
        didMove = didMove || moved;
      } else {
        moved = this.moveNode(collide, Object.assign(Object.assign(Object.assign({}, collide), { y: nn.y + nn.h, skip: node }), newOpt));
      }
      if (!moved) {
        return didMove;
      }
      collide = void 0;
    }
    return didMove;
  }
  collide(skip, area = skip, skip2) {
    return this.nodes.find((n2) => n2 !== skip && n2 !== skip2 && utils_1.Utils.isIntercepted(n2, area));
  }
  collideAll(skip, area = skip, skip2) {
    return this.nodes.filter((n2) => n2 !== skip && n2 !== skip2 && utils_1.Utils.isIntercepted(n2, area));
  }
  collideCoverage(node, o2, collides) {
    if (!o2.rect || !node._rect)
      return;
    let r0 = node._rect;
    let r2 = Object.assign({}, o2.rect);
    if (r2.y > r0.y) {
      r2.h += r2.y - r0.y;
      r2.y = r0.y;
    } else {
      r2.h += r0.y - r2.y;
    }
    if (r2.x > r0.x) {
      r2.w += r2.x - r0.x;
      r2.x = r0.x;
    } else {
      r2.w += r0.x - r2.x;
    }
    let collide;
    collides.forEach((n2) => {
      if (n2.locked || !n2._rect)
        return;
      let r22 = n2._rect;
      let yOver = Number.MAX_VALUE, xOver = Number.MAX_VALUE, overMax = 0.5;
      if (r0.y < r22.y) {
        yOver = (r2.y + r2.h - r22.y) / r22.h;
      } else if (r0.y + r0.h > r22.y + r22.h) {
        yOver = (r22.y + r22.h - r2.y) / r22.h;
      }
      if (r0.x < r22.x) {
        xOver = (r2.x + r2.w - r22.x) / r22.w;
      } else if (r0.x + r0.w > r22.x + r22.w) {
        xOver = (r22.x + r22.w - r2.x) / r22.w;
      }
      let over = Math.min(xOver, yOver);
      if (over > overMax) {
        overMax = over;
        collide = n2;
      }
    });
    return collide;
  }
  cacheRects(w2, h2, top, right, bottom, left) {
    this.nodes.forEach((n2) => n2._rect = {
      y: n2.y * h2 + top,
      x: n2.x * w2 + left,
      w: n2.w * w2 - left - right,
      h: n2.h * h2 - top - bottom
    });
    return this;
  }
  swap(a, b) {
    if (!b || b.locked || !a || a.locked)
      return false;
    function _doSwap() {
      let x2 = b.x, y2 = b.y;
      b.x = a.x;
      b.y = a.y;
      if (a.h != b.h) {
        a.x = x2;
        a.y = b.y + b.h;
      } else if (a.w != b.w) {
        a.x = b.x + b.w;
        a.y = y2;
      } else {
        a.x = x2;
        a.y = y2;
      }
      a._dirty = b._dirty = true;
      return true;
    }
    let touching;
    if (a.w === b.w && a.h === b.h && (a.x === b.x || a.y === b.y) && (touching = utils_1.Utils.isTouching(a, b)))
      return _doSwap();
    if (touching === false)
      return;
    if (a.w === b.w && a.x === b.x && (touching || (touching = utils_1.Utils.isTouching(a, b)))) {
      if (b.y < a.y) {
        let t2 = a;
        a = b;
        b = t2;
      }
      return _doSwap();
    }
    if (touching === false)
      return;
    if (a.h === b.h && a.y === b.y && (touching || (touching = utils_1.Utils.isTouching(a, b)))) {
      if (b.x < a.x) {
        let t2 = a;
        a = b;
        b = t2;
      }
      return _doSwap();
    }
    return false;
  }
  isAreaEmpty(x2, y2, w2, h2) {
    let nn = { x: x2 || 0, y: y2 || 0, w: w2 || 1, h: h2 || 1 };
    return !this.collide(nn);
  }
  compact() {
    if (this.nodes.length === 0)
      return this;
    this.batchUpdate()._sortNodes();
    let copyNodes = this.nodes;
    this.nodes = [];
    copyNodes.forEach((node) => {
      if (!node.locked) {
        node.autoPosition = true;
      }
      this.addNode(node, false);
      node._dirty = true;
    });
    return this.commit();
  }
  set float(val) {
    if (this._float === val)
      return;
    this._float = val || false;
    if (!val) {
      this._packNodes()._notify();
    }
  }
  get float() {
    return this._float || false;
  }
  _sortNodes(dir) {
    this.nodes = utils_1.Utils.sort(this.nodes, dir, this.column);
    return this;
  }
  _packNodes() {
    if (this.batchMode) {
      return this;
    }
    this._sortNodes();
    if (this.float) {
      this.nodes.forEach((n2) => {
        if (n2._updating || n2._orig === void 0 || n2.y === n2._orig.y)
          return;
        let newY = n2.y;
        while (newY > n2._orig.y) {
          --newY;
          let collide = this.collide(n2, { x: n2.x, y: newY, w: n2.w, h: n2.h });
          if (!collide) {
            n2._dirty = true;
            n2.y = newY;
          }
        }
      });
    } else {
      this.nodes.forEach((n2, i) => {
        if (n2.locked)
          return;
        while (n2.y > 0) {
          let newY = i === 0 ? 0 : n2.y - 1;
          let canBeMoved = i === 0 || !this.collide(n2, { x: n2.x, y: newY, w: n2.w, h: n2.h });
          if (!canBeMoved)
            break;
          n2._dirty = n2.y !== newY;
          n2.y = newY;
        }
      });
    }
    return this;
  }
  prepareNode(node, resizing) {
    node = node || {};
    node._id = node._id || _GridStackEngine._idSeq++;
    if (node.x === void 0 || node.y === void 0 || node.x === null || node.y === null) {
      node.autoPosition = true;
    }
    let defaults = { x: 0, y: 0, w: 1, h: 1 };
    utils_1.Utils.defaults(node, defaults);
    if (!node.autoPosition) {
      delete node.autoPosition;
    }
    if (!node.noResize) {
      delete node.noResize;
    }
    if (!node.noMove) {
      delete node.noMove;
    }
    if (typeof node.x == "string") {
      node.x = Number(node.x);
    }
    if (typeof node.y == "string") {
      node.y = Number(node.y);
    }
    if (typeof node.w == "string") {
      node.w = Number(node.w);
    }
    if (typeof node.h == "string") {
      node.h = Number(node.h);
    }
    if (isNaN(node.x)) {
      node.x = defaults.x;
      node.autoPosition = true;
    }
    if (isNaN(node.y)) {
      node.y = defaults.y;
      node.autoPosition = true;
    }
    if (isNaN(node.w)) {
      node.w = defaults.w;
    }
    if (isNaN(node.h)) {
      node.h = defaults.h;
    }
    return this.nodeBoundFix(node, resizing);
  }
  nodeBoundFix(node, resizing) {
    let before = node._orig || utils_1.Utils.copyPos({}, node);
    if (node.maxW) {
      node.w = Math.min(node.w, node.maxW);
    }
    if (node.maxH) {
      node.h = Math.min(node.h, node.maxH);
    }
    if (node.minW && node.minW <= this.column) {
      node.w = Math.max(node.w, node.minW);
    }
    if (node.minH) {
      node.h = Math.max(node.h, node.minH);
    }
    if (node.w > this.column) {
      if (this.column < 12 && !this._inColumnResize) {
        node.w = Math.min(12, node.w);
        this.cacheOneLayout(node, 12);
      }
      node.w = this.column;
    } else if (node.w < 1) {
      node.w = 1;
    }
    if (this.maxRow && node.h > this.maxRow) {
      node.h = this.maxRow;
    } else if (node.h < 1) {
      node.h = 1;
    }
    if (node.x < 0) {
      node.x = 0;
    }
    if (node.y < 0) {
      node.y = 0;
    }
    if (node.x + node.w > this.column) {
      if (resizing) {
        node.w = this.column - node.x;
      } else {
        node.x = this.column - node.w;
      }
    }
    if (this.maxRow && node.y + node.h > this.maxRow) {
      if (resizing) {
        node.h = this.maxRow - node.y;
      } else {
        node.y = this.maxRow - node.h;
      }
    }
    if (!utils_1.Utils.samePos(node, before)) {
      node._dirty = true;
    }
    return node;
  }
  getDirtyNodes(verify) {
    if (verify) {
      return this.nodes.filter((n2) => n2._dirty && !utils_1.Utils.samePos(n2, n2._orig));
    }
    return this.nodes.filter((n2) => n2._dirty);
  }
  _notify(nodes, removeDOM = true) {
    if (this.batchMode)
      return this;
    nodes = nodes === void 0 ? [] : Array.isArray(nodes) ? nodes : [nodes];
    let dirtyNodes = nodes.concat(this.getDirtyNodes());
    this.onChange && this.onChange(dirtyNodes, removeDOM);
    return this;
  }
  cleanNodes() {
    if (this.batchMode)
      return this;
    this.nodes.forEach((n2) => {
      delete n2._dirty;
      delete n2._lastTried;
    });
    return this;
  }
  saveInitial() {
    this.nodes.forEach((n2) => {
      n2._orig = utils_1.Utils.copyPos({}, n2);
      delete n2._dirty;
    });
    this._hasLocked = this.nodes.some((n2) => n2.locked);
    return this;
  }
  restoreInitial() {
    this.nodes.forEach((n2) => {
      if (utils_1.Utils.samePos(n2, n2._orig))
        return;
      utils_1.Utils.copyPos(n2, n2._orig);
      n2._dirty = true;
    });
    this._notify();
    return this;
  }
  addNode(node, triggerAddEvent = false) {
    let dup = this.nodes.find((n2) => n2._id === node._id);
    if (dup)
      return dup;
    node = this._inColumnResize ? this.nodeBoundFix(node) : this.prepareNode(node);
    delete node._temporaryRemoved;
    delete node._removeDOM;
    if (node.autoPosition) {
      this._sortNodes();
      for (let i = 0; ; ++i) {
        let x2 = i % this.column;
        let y2 = Math.floor(i / this.column);
        if (x2 + node.w > this.column) {
          continue;
        }
        let box = { x: x2, y: y2, w: node.w, h: node.h };
        if (!this.nodes.find((n2) => utils_1.Utils.isIntercepted(box, n2))) {
          node.x = x2;
          node.y = y2;
          delete node.autoPosition;
          break;
        }
      }
    }
    this.nodes.push(node);
    if (triggerAddEvent) {
      this.addedNodes.push(node);
    }
    this._fixCollisions(node);
    if (!this.batchMode) {
      this._packNodes()._notify();
    }
    return node;
  }
  removeNode(node, removeDOM = true, triggerEvent = false) {
    if (!this.nodes.find((n2) => n2 === node)) {
      return this;
    }
    if (triggerEvent) {
      this.removedNodes.push(node);
    }
    if (removeDOM)
      node._removeDOM = true;
    this.nodes = this.nodes.filter((n2) => n2 !== node);
    return this._packNodes()._notify(node);
  }
  removeAll(removeDOM = true) {
    delete this._layouts;
    if (this.nodes.length === 0)
      return this;
    removeDOM && this.nodes.forEach((n2) => n2._removeDOM = true);
    this.removedNodes = this.nodes;
    this.nodes = [];
    return this._notify(this.removedNodes);
  }
  moveNodeCheck(node, o2) {
    if (!this.changedPosConstrain(node, o2))
      return false;
    o2.pack = true;
    if (!this.maxRow) {
      return this.moveNode(node, o2);
    }
    let clonedNode;
    let clone = new _GridStackEngine({
      column: this.column,
      float: this.float,
      nodes: this.nodes.map((n2) => {
        if (n2 === node) {
          clonedNode = Object.assign({}, n2);
          return clonedNode;
        }
        return Object.assign({}, n2);
      })
    });
    if (!clonedNode)
      return false;
    let canMove = clone.moveNode(clonedNode, o2);
    if (this.maxRow && canMove) {
      canMove = clone.getRow() <= this.maxRow;
      if (!canMove && !o2.resizing) {
        let collide = this.collide(node, o2);
        if (collide && this.swap(node, collide)) {
          this._notify();
          return true;
        }
      }
    }
    if (!canMove)
      return false;
    clone.nodes.filter((n2) => n2._dirty).forEach((c2) => {
      let n2 = this.nodes.find((a) => a._id === c2._id);
      if (!n2)
        return;
      utils_1.Utils.copyPos(n2, c2);
      n2._dirty = true;
    });
    this._notify();
    return true;
  }
  willItFit(node) {
    delete node._willFitPos;
    if (!this.maxRow)
      return true;
    let clone = new _GridStackEngine({
      column: this.column,
      float: this.float,
      nodes: this.nodes.map((n22) => {
        return Object.assign({}, n22);
      })
    });
    let n2 = Object.assign({}, node);
    this.cleanupNode(n2);
    delete n2.el;
    delete n2._id;
    delete n2.content;
    delete n2.grid;
    clone.addNode(n2);
    if (clone.getRow() <= this.maxRow) {
      node._willFitPos = utils_1.Utils.copyPos({}, n2);
      return true;
    }
    return false;
  }
  changedPosConstrain(node, p2) {
    p2.w = p2.w || node.w;
    p2.h = p2.h || node.h;
    if (node.x !== p2.x || node.y !== p2.y)
      return true;
    if (node.maxW) {
      p2.w = Math.min(p2.w, node.maxW);
    }
    if (node.maxH) {
      p2.h = Math.min(p2.h, node.maxH);
    }
    if (node.minW) {
      p2.w = Math.max(p2.w, node.minW);
    }
    if (node.minH) {
      p2.h = Math.max(p2.h, node.minH);
    }
    return node.w !== p2.w || node.h !== p2.h;
  }
  moveNode(node, o2) {
    if (!node || !o2)
      return false;
    if (o2.pack === void 0)
      o2.pack = true;
    if (typeof o2.x !== "number") {
      o2.x = node.x;
    }
    if (typeof o2.y !== "number") {
      o2.y = node.y;
    }
    if (typeof o2.w !== "number") {
      o2.w = node.w;
    }
    if (typeof o2.h !== "number") {
      o2.h = node.h;
    }
    let resizing = node.w !== o2.w || node.h !== o2.h;
    let nn = utils_1.Utils.copyPos({}, node, true);
    utils_1.Utils.copyPos(nn, o2);
    nn = this.nodeBoundFix(nn, resizing);
    utils_1.Utils.copyPos(o2, nn);
    if (utils_1.Utils.samePos(node, o2))
      return false;
    let prevPos = utils_1.Utils.copyPos({}, node);
    let area = nn;
    let collides = this.collideAll(node, area, o2.skip);
    let needToMove = true;
    if (collides.length) {
      let collide = node._moving && !o2.nested ? this.collideCoverage(node, o2, collides) : collides[0];
      if (collide) {
        needToMove = !this._fixCollisions(node, nn, collide, o2);
      } else {
        needToMove = false;
      }
    }
    if (needToMove) {
      node._dirty = true;
      utils_1.Utils.copyPos(node, nn);
    }
    if (o2.pack) {
      this._packNodes()._notify();
    }
    return !utils_1.Utils.samePos(node, prevPos);
  }
  getRow() {
    return this.nodes.reduce((row, n2) => Math.max(row, n2.y + n2.h), 0);
  }
  beginUpdate(node) {
    if (!node._updating) {
      node._updating = true;
      delete node._skipDown;
      if (!this.batchMode)
        this.saveInitial();
    }
    return this;
  }
  endUpdate() {
    let n2 = this.nodes.find((n22) => n22._updating);
    if (n2) {
      delete n2._updating;
      delete n2._skipDown;
    }
    return this;
  }
  save(saveElement = true) {
    var _a;
    let len = (_a = this._layouts) === null || _a === void 0 ? void 0 : _a.length;
    let layout = len && this.column !== len - 1 ? this._layouts[len - 1] : null;
    let list = [];
    this._sortNodes();
    this.nodes.forEach((n2) => {
      let wl = layout === null || layout === void 0 ? void 0 : layout.find((l) => l._id === n2._id);
      let w2 = Object.assign({}, n2);
      if (wl) {
        w2.x = wl.x;
        w2.y = wl.y;
        w2.w = wl.w;
      }
      for (let key in w2) {
        if (key[0] === "_" || w2[key] === null || w2[key] === void 0)
          delete w2[key];
      }
      delete w2.grid;
      if (!saveElement)
        delete w2.el;
      if (!w2.autoPosition)
        delete w2.autoPosition;
      if (!w2.noResize)
        delete w2.noResize;
      if (!w2.noMove)
        delete w2.noMove;
      if (!w2.locked)
        delete w2.locked;
      list.push(w2);
    });
    return list;
  }
  layoutsNodesChange(nodes) {
    if (!this._layouts || this._inColumnResize)
      return this;
    this._layouts.forEach((layout, column) => {
      if (!layout || column === this.column)
        return this;
      if (column < this.column) {
        this._layouts[column] = void 0;
      } else {
        let ratio = column / this.column;
        nodes.forEach((node) => {
          if (!node._orig)
            return;
          let n2 = layout.find((l) => l._id === node._id);
          if (!n2)
            return;
          if (node.y !== node._orig.y) {
            n2.y += node.y - node._orig.y;
          }
          if (node.x !== node._orig.x) {
            n2.x = Math.round(node.x * ratio);
          }
          if (node.w !== node._orig.w) {
            n2.w = Math.round(node.w * ratio);
          }
        });
      }
    });
    return this;
  }
  updateNodeWidths(prevColumn, column, nodes, layout = "moveScale") {
    var _a;
    if (!this.nodes.length || !column || prevColumn === column)
      return this;
    this.cacheLayout(this.nodes, prevColumn);
    this.batchUpdate();
    let newNodes = [];
    let domOrder = false;
    if (column === 1 && (nodes === null || nodes === void 0 ? void 0 : nodes.length)) {
      domOrder = true;
      let top = 0;
      nodes.forEach((n2) => {
        n2.x = 0;
        n2.w = 1;
        n2.y = Math.max(n2.y, top);
        top = n2.y + n2.h;
      });
      newNodes = nodes;
      nodes = [];
    } else {
      nodes = utils_1.Utils.sort(this.nodes, -1, prevColumn);
    }
    let cacheNodes = [];
    if (column > prevColumn) {
      cacheNodes = this._layouts[column] || [];
      let lastIndex = this._layouts.length - 1;
      if (!cacheNodes.length && prevColumn !== lastIndex && ((_a = this._layouts[lastIndex]) === null || _a === void 0 ? void 0 : _a.length)) {
        prevColumn = lastIndex;
        this._layouts[lastIndex].forEach((cacheNode) => {
          let n2 = nodes.find((n22) => n22._id === cacheNode._id);
          if (n2) {
            n2.x = cacheNode.x;
            n2.y = cacheNode.y;
            n2.w = cacheNode.w;
          }
        });
      }
    }
    cacheNodes.forEach((cacheNode) => {
      let j2 = nodes.findIndex((n2) => n2._id === cacheNode._id);
      if (j2 !== -1) {
        nodes[j2].x = cacheNode.x;
        nodes[j2].y = cacheNode.y;
        nodes[j2].w = cacheNode.w;
        newNodes.push(nodes[j2]);
        nodes.splice(j2, 1);
      }
    });
    if (nodes.length) {
      if (typeof layout === "function") {
        layout(column, prevColumn, newNodes, nodes);
      } else if (!domOrder) {
        let ratio = column / prevColumn;
        let move = layout === "move" || layout === "moveScale";
        let scale = layout === "scale" || layout === "moveScale";
        nodes.forEach((node) => {
          node.x = column === 1 ? 0 : move ? Math.round(node.x * ratio) : Math.min(node.x, column - 1);
          node.w = column === 1 || prevColumn === 1 ? 1 : scale ? Math.round(node.w * ratio) || 1 : Math.min(node.w, column);
          newNodes.push(node);
        });
        nodes = [];
      }
    }
    newNodes = utils_1.Utils.sort(newNodes, -1, column);
    this._inColumnResize = true;
    this.nodes = [];
    newNodes.forEach((node) => {
      this.addNode(node, false);
      delete node._orig;
    });
    this.commit();
    delete this._inColumnResize;
    return this;
  }
  cacheLayout(nodes, column, clear2 = false) {
    let copy = [];
    nodes.forEach((n2, i) => {
      n2._id = n2._id || _GridStackEngine._idSeq++;
      copy[i] = { x: n2.x, y: n2.y, w: n2.w, _id: n2._id };
    });
    this._layouts = clear2 ? [] : this._layouts || [];
    this._layouts[column] = copy;
    return this;
  }
  cacheOneLayout(n2, column) {
    n2._id = n2._id || _GridStackEngine._idSeq++;
    let layout = { x: n2.x, y: n2.y, w: n2.w, _id: n2._id };
    this._layouts = this._layouts || [];
    this._layouts[column] = this._layouts[column] || [];
    let index = this._layouts[column].findIndex((l) => l._id === n2._id);
    index === -1 ? this._layouts[column].push(layout) : this._layouts[column][index] = layout;
    return this;
  }
  cleanupNode(node) {
    for (let prop in node) {
      if (prop[0] === "_" && prop !== "_id")
        delete node[prop];
    }
    return this;
  }
};
gridstackEngine.GridStackEngine = GridStackEngine;
GridStackEngine._idSeq = 1;
var gridstackDdi = {};
Object.defineProperty(gridstackDdi, "__esModule", { value: true });
gridstackDdi.GridStackDDI = void 0;
var GridStackDDI = class _GridStackDDI {
  static registerPlugin(pluginClass) {
    _GridStackDDI.ddi = new pluginClass();
    return _GridStackDDI.ddi;
  }
  static get() {
    return _GridStackDDI.ddi || _GridStackDDI.registerPlugin(_GridStackDDI);
  }
  remove(el) {
    return this;
  }
};
gridstackDdi.GridStackDDI = GridStackDDI;
var types = {};
Object.defineProperty(types, "__esModule", { value: true });
(function(exports) {
  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o2, m2, k2, k22) {
    if (k22 === void 0)
      k22 = k2;
    Object.defineProperty(o2, k22, { enumerable: true, get: function() {
      return m2[k2];
    } });
  } : function(o2, m2, k2, k22) {
    if (k22 === void 0)
      k22 = k2;
    o2[k22] = m2[k2];
  });
  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function(m2, exports2) {
    for (var p2 in m2)
      if (p2 !== "default" && !exports2.hasOwnProperty(p2))
        __createBinding(exports2, m2, p2);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.GridStack = void 0;
  const gridstack_engine_1 = gridstackEngine;
  const utils_12 = utils;
  const gridstack_ddi_1 = gridstackDdi;
  __exportStar(types, exports);
  __exportStar(utils, exports);
  __exportStar(gridstackEngine, exports);
  __exportStar(gridstackDdi, exports);
  const GridDefaults = {
    column: 12,
    minRow: 0,
    maxRow: 0,
    itemClass: "grid-stack-item",
    placeholderClass: "grid-stack-placeholder",
    placeholderText: "",
    handle: ".grid-stack-item-content",
    handleClass: null,
    styleInHead: false,
    cellHeight: "auto",
    cellHeightThrottle: 100,
    margin: 10,
    auto: true,
    minWidth: 768,
    float: false,
    staticGrid: false,
    animate: true,
    alwaysShowResizeHandle: false,
    resizable: {
      autoHide: true,
      handles: "se"
    },
    draggable: {
      handle: ".grid-stack-item-content",
      scroll: false,
      appendTo: "body"
    },
    disableDrag: false,
    disableResize: false,
    rtl: "auto",
    removable: false,
    removableOptions: {
      accept: ".grid-stack-item"
    },
    marginUnit: "px",
    cellHeightUnit: "px",
    disableOneColumnMode: false,
    oneColumnModeDomSort: false
  };
  class GridStack {
    constructor(el, opts = {}) {
      this._gsEventHandler = {};
      this._extraDragRow = 0;
      this.el = el;
      opts = opts || {};
      if (opts.row) {
        opts.minRow = opts.maxRow = opts.row;
        delete opts.row;
      }
      let rowAttr = utils_12.Utils.toNumber(el.getAttribute("gs-row"));
      if (opts.column === "auto") {
        delete opts.column;
      }
      let defaults = Object.assign(Object.assign({}, utils_12.Utils.cloneDeep(GridDefaults)), { column: utils_12.Utils.toNumber(el.getAttribute("gs-column")) || 12, minRow: rowAttr ? rowAttr : utils_12.Utils.toNumber(el.getAttribute("gs-min-row")) || 0, maxRow: rowAttr ? rowAttr : utils_12.Utils.toNumber(el.getAttribute("gs-max-row")) || 0, staticGrid: utils_12.Utils.toBool(el.getAttribute("gs-static")) || false, _styleSheetClass: "grid-stack-instance-" + (Math.random() * 1e4).toFixed(0), alwaysShowResizeHandle: opts.alwaysShowResizeHandle || false, resizable: {
        autoHide: !(opts.alwaysShowResizeHandle || false),
        handles: "se"
      }, draggable: {
        handle: (opts.handleClass ? "." + opts.handleClass : opts.handle ? opts.handle : "") || ".grid-stack-item-content",
        scroll: false,
        appendTo: "body"
      }, removableOptions: {
        accept: "." + (opts.itemClass || "grid-stack-item")
      } });
      if (el.getAttribute("gs-animate")) {
        defaults.animate = utils_12.Utils.toBool(el.getAttribute("gs-animate"));
      }
      this.opts = utils_12.Utils.defaults(opts, defaults);
      opts = null;
      this.initMargin();
      if (this.opts.column !== 1 && !this.opts.disableOneColumnMode && this._widthOrContainer() <= this.opts.minWidth) {
        this._prevColumn = this.getColumn();
        this.opts.column = 1;
      }
      if (this.opts.rtl === "auto") {
        this.opts.rtl = el.style.direction === "rtl";
      }
      if (this.opts.rtl) {
        this.el.classList.add("grid-stack-rtl");
      }
      let parentGridItemEl = utils_12.Utils.closestByClass(this.el, GridDefaults.itemClass);
      if (parentGridItemEl && parentGridItemEl.gridstackNode) {
        this.opts._isNested = parentGridItemEl.gridstackNode;
        this.opts._isNested.subGrid = this;
        parentGridItemEl.classList.add("grid-stack-nested");
        this.el.classList.add("grid-stack-nested");
      }
      this._isAutoCellHeight = this.opts.cellHeight === "auto";
      if (this._isAutoCellHeight || this.opts.cellHeight === "initial") {
        this.cellHeight(void 0, false);
      } else {
        if (typeof this.opts.cellHeight == "number" && this.opts.cellHeightUnit && this.opts.cellHeightUnit !== GridDefaults.cellHeightUnit) {
          this.opts.cellHeight = this.opts.cellHeight + this.opts.cellHeightUnit;
          delete this.opts.cellHeightUnit;
        }
        this.cellHeight(this.opts.cellHeight, false);
      }
      this.el.classList.add(this.opts._styleSheetClass);
      this._setStaticClass();
      this.engine = new gridstack_engine_1.GridStackEngine({
        column: this.getColumn(),
        float: this.opts.float,
        maxRow: this.opts.maxRow,
        onChange: (cbNodes) => {
          let maxH = 0;
          this.engine.nodes.forEach((n2) => {
            maxH = Math.max(maxH, n2.y + n2.h);
          });
          cbNodes.forEach((n2) => {
            let el2 = n2.el;
            if (!el2)
              return;
            if (n2._removeDOM) {
              if (el2)
                el2.remove();
              delete n2._removeDOM;
            } else {
              this._writePosAttr(el2, n2);
            }
          });
          this._updateStyles(false, maxH);
        }
      });
      if (this.opts.auto) {
        this.batchUpdate();
        let elements = [];
        this.getGridItems().forEach((el2) => {
          let x2 = parseInt(el2.getAttribute("gs-x"));
          let y2 = parseInt(el2.getAttribute("gs-y"));
          elements.push({
            el: el2,
            i: (Number.isNaN(x2) ? 1e3 : x2) + (Number.isNaN(y2) ? 1e3 : y2) * this.getColumn()
          });
        });
        elements.sort((a, b) => a.i - b.i).forEach((e2) => this._prepareElement(e2.el));
        this.commit();
      }
      this.setAnimation(this.opts.animate);
      this._updateStyles();
      if (this.opts.column != 12) {
        this.el.classList.add("grid-stack-" + this.opts.column);
      }
      if (this.opts.dragIn)
        GridStack.setupDragIn(this.opts.dragIn, this.opts.dragInOptions);
      delete this.opts.dragIn;
      delete this.opts.dragInOptions;
      this._setupRemoveDrop();
      this._setupAcceptWidget();
      this._updateWindowResizeEvent();
    }
    static init(options = {}, elOrString = ".grid-stack") {
      let el = GridStack.getGridElement(elOrString);
      if (!el) {
        if (typeof elOrString === "string") {
          console.error('GridStack.initAll() no grid was found with selector "' + elOrString + '" - element missing or wrong selector ?\nNote: ".grid-stack" is required for proper CSS styling and drag/drop, and is the default selector.');
        } else {
          console.error("GridStack.init() no grid element was passed.");
        }
        return null;
      }
      if (!el.gridstack) {
        el.gridstack = new GridStack(el, utils_12.Utils.cloneDeep(options));
      }
      return el.gridstack;
    }
    static initAll(options = {}, selector = ".grid-stack") {
      let grids = [];
      GridStack.getGridElements(selector).forEach((el) => {
        if (!el.gridstack) {
          el.gridstack = new GridStack(el, utils_12.Utils.cloneDeep(options));
          delete options.dragIn;
          delete options.dragInOptions;
        }
        grids.push(el.gridstack);
      });
      if (grids.length === 0) {
        console.error('GridStack.initAll() no grid was found with selector "' + selector + '" - element missing or wrong selector ?\nNote: ".grid-stack" is required for proper CSS styling and drag/drop, and is the default selector.');
      }
      return grids;
    }
    static addGrid(parent, opt = {}) {
      if (!parent)
        return null;
      let el = parent;
      if (!parent.classList.contains("grid-stack")) {
        let doc2 = document.implementation.createHTMLDocument("");
        doc2.body.innerHTML = `<div class="grid-stack ${opt.class || ""}"></div>`;
        el = doc2.body.children[0];
        parent.appendChild(el);
      }
      let grid = GridStack.init(opt, el);
      if (grid.opts.children) {
        let children = grid.opts.children;
        delete grid.opts.children;
        grid.load(children);
      }
      return grid;
    }
    get placeholder() {
      if (!this._placeholder) {
        let placeholderChild = document.createElement("div");
        placeholderChild.className = "placeholder-content";
        if (this.opts.placeholderText) {
          placeholderChild.innerHTML = this.opts.placeholderText;
        }
        this._placeholder = document.createElement("div");
        this._placeholder.classList.add(this.opts.placeholderClass, GridDefaults.itemClass, this.opts.itemClass);
        this.placeholder.appendChild(placeholderChild);
      }
      return this._placeholder;
    }
    addWidget(els, options) {
      if (arguments.length > 2) {
        console.warn("gridstack.ts: `addWidget(el, x, y, width...)` is deprecated. Use `addWidget({x, y, w, content, ...})`. It will be removed soon");
        let a = arguments, i = 1, opt = {
          x: a[i++],
          y: a[i++],
          w: a[i++],
          h: a[i++],
          autoPosition: a[i++],
          minW: a[i++],
          maxW: a[i++],
          minH: a[i++],
          maxH: a[i++],
          id: a[i++]
        };
        return this.addWidget(els, opt);
      }
      function isGridStackWidget(w2) {
        return w2.x !== void 0 || w2.y !== void 0 || w2.w !== void 0 || w2.h !== void 0 || w2.content !== void 0 ? true : false;
      }
      let el;
      if (typeof els === "string") {
        let doc2 = document.implementation.createHTMLDocument("");
        doc2.body.innerHTML = els;
        el = doc2.body.children[0];
      } else if (arguments.length === 0 || arguments.length === 1 && isGridStackWidget(els)) {
        let content = els ? els.content || "" : "";
        options = els;
        let doc2 = document.implementation.createHTMLDocument("");
        doc2.body.innerHTML = `<div class="grid-stack-item ${this.opts.itemClass || ""}"><div class="grid-stack-item-content">${content}</div></div>`;
        el = doc2.body.children[0];
      } else {
        el = els;
      }
      let domAttr = this._readAttr(el);
      options = utils_12.Utils.cloneDeep(options) || {};
      utils_12.Utils.defaults(options, domAttr);
      let node = this.engine.prepareNode(options);
      this._writeAttr(el, options);
      if (this._insertNotAppend) {
        this.el.prepend(el);
      } else {
        this.el.appendChild(el);
      }
      this._prepareElement(el, true, options);
      this._updateContainerHeight();
      if (node.subGrid && !node.subGrid.el) {
        let autoColumn;
        let ops = node.subGrid;
        if (ops.column === "auto") {
          ops.column = node.w;
          ops.disableOneColumnMode = true;
          autoColumn = true;
        }
        let content = node.el.querySelector(".grid-stack-item-content");
        node.subGrid = GridStack.addGrid(content, node.subGrid);
        if (autoColumn) {
          node.subGrid._autoColumn = true;
        }
      }
      this._triggerAddEvent();
      this._triggerChangeEvent();
      return el;
    }
    save(saveContent = true, saveGridOpt = false) {
      let list = this.engine.save(saveContent);
      list.forEach((n2) => {
        if (saveContent && n2.el && !n2.subGrid) {
          let sub = n2.el.querySelector(".grid-stack-item-content");
          n2.content = sub ? sub.innerHTML : void 0;
          if (!n2.content)
            delete n2.content;
        } else {
          if (!saveContent) {
            delete n2.content;
          }
          if (n2.subGrid) {
            n2.subGrid = n2.subGrid.save(saveContent, true);
          }
        }
        delete n2.el;
      });
      if (saveGridOpt) {
        let o2 = utils_12.Utils.cloneDeep(this.opts);
        if (o2.marginBottom === o2.marginTop && o2.marginRight === o2.marginLeft && o2.marginTop === o2.marginRight) {
          o2.margin = o2.marginTop;
          delete o2.marginTop;
          delete o2.marginRight;
          delete o2.marginBottom;
          delete o2.marginLeft;
        }
        if (o2.rtl === (this.el.style.direction === "rtl")) {
          o2.rtl = "auto";
        }
        if (this._isAutoCellHeight) {
          o2.cellHeight = "auto";
        }
        if (this._autoColumn) {
          o2.column = "auto";
          delete o2.disableOneColumnMode;
        }
        utils_12.Utils.removeInternalAndSame(o2, GridDefaults);
        o2.children = list;
        return o2;
      }
      return list;
    }
    load(layout, addAndRemove = true) {
      let items = GridStack.Utils.sort([...layout], -1, this._prevColumn || this.getColumn());
      this._insertNotAppend = true;
      if (this._prevColumn && this._prevColumn !== this.opts.column && items.some((n2) => n2.x + n2.w > this.opts.column)) {
        this._ignoreLayoutsNodeChange = true;
        this.engine.cacheLayout(items, this._prevColumn, true);
      }
      let removed = [];
      this.batchUpdate();
      if (addAndRemove) {
        let copyNodes = [...this.engine.nodes];
        copyNodes.forEach((n2) => {
          let item = items.find((w2) => n2.id === w2.id);
          if (!item) {
            if (typeof addAndRemove === "function") {
              addAndRemove(this, n2, false);
            } else {
              removed.push(n2);
              this.removeWidget(n2.el, true, false);
            }
          }
        });
      }
      items.forEach((w2) => {
        let item = w2.id || w2.id === 0 ? this.engine.nodes.find((n2) => n2.id === w2.id) : void 0;
        if (item) {
          this.update(item.el, w2);
          if (w2.subGrid && w2.subGrid.children) {
            let sub = item.el.querySelector(".grid-stack");
            if (sub && sub.gridstack) {
              sub.gridstack.load(w2.subGrid.children);
              this._insertNotAppend = true;
            }
          }
        } else if (addAndRemove) {
          if (typeof addAndRemove === "function") {
            w2 = addAndRemove(this, w2, true).gridstackNode;
          } else {
            w2 = this.addWidget(w2).gridstackNode;
          }
        }
      });
      this.engine.removedNodes = removed;
      this.commit();
      delete this._ignoreLayoutsNodeChange;
      delete this._insertNotAppend;
      return this;
    }
    batchUpdate() {
      this.engine.batchUpdate();
      return this;
    }
    getCellHeight(forcePixel = false) {
      if (this.opts.cellHeight && this.opts.cellHeight !== "auto" && (!forcePixel || !this.opts.cellHeightUnit || this.opts.cellHeightUnit === "px")) {
        return this.opts.cellHeight;
      }
      let el = this.el.querySelector("." + this.opts.itemClass);
      if (el) {
        let height = utils_12.Utils.toNumber(el.getAttribute("gs-h"));
        return Math.round(el.offsetHeight / height);
      }
      let rows = parseInt(this.el.getAttribute("gs-current-row"));
      return rows ? Math.round(this.el.getBoundingClientRect().height / rows) : this.opts.cellHeight;
    }
    cellHeight(val, update = true) {
      if (update && val !== void 0) {
        if (this._isAutoCellHeight !== (val === "auto")) {
          this._isAutoCellHeight = val === "auto";
          this._updateWindowResizeEvent();
        }
      }
      if (val === "initial" || val === "auto") {
        val = void 0;
      }
      if (val === void 0) {
        let marginDiff = -this.opts.marginRight - this.opts.marginLeft + this.opts.marginTop + this.opts.marginBottom;
        val = this.cellWidth() + marginDiff;
      }
      let data = utils_12.Utils.parseHeight(val);
      if (this.opts.cellHeightUnit === data.unit && this.opts.cellHeight === data.h) {
        return this;
      }
      this.opts.cellHeightUnit = data.unit;
      this.opts.cellHeight = data.h;
      if (update) {
        this._updateStyles(true, this.getRow());
      }
      return this;
    }
    cellWidth() {
      return this._widthOrContainer() / this.getColumn();
    }
    _widthOrContainer() {
      return this.el.clientWidth || this.el.parentElement.clientWidth || window.innerWidth;
    }
    commit() {
      this.engine.commit();
      this._triggerRemoveEvent();
      this._triggerAddEvent();
      this._triggerChangeEvent();
      return this;
    }
    compact() {
      this.engine.compact();
      this._triggerChangeEvent();
      return this;
    }
    column(column, layout = "moveScale") {
      if (column < 1 || this.opts.column === column)
        return this;
      let oldColumn = this.getColumn();
      if (column === 1) {
        this._prevColumn = oldColumn;
      } else {
        delete this._prevColumn;
      }
      this.el.classList.remove("grid-stack-" + oldColumn);
      this.el.classList.add("grid-stack-" + column);
      this.opts.column = this.engine.column = column;
      let domNodes;
      if (column === 1 && this.opts.oneColumnModeDomSort) {
        domNodes = [];
        this.getGridItems().forEach((el) => {
          if (el.gridstackNode) {
            domNodes.push(el.gridstackNode);
          }
        });
        if (!domNodes.length) {
          domNodes = void 0;
        }
      }
      this.engine.updateNodeWidths(oldColumn, column, domNodes, layout);
      if (this._isAutoCellHeight)
        this.cellHeight();
      this._ignoreLayoutsNodeChange = true;
      this._triggerChangeEvent();
      delete this._ignoreLayoutsNodeChange;
      return this;
    }
    getColumn() {
      return this.opts.column;
    }
    getGridItems() {
      return Array.from(this.el.children).filter((el) => el.matches("." + this.opts.itemClass) && !el.matches("." + this.opts.placeholderClass));
    }
    destroy(removeDOM = true) {
      if (!this.el)
        return;
      this._updateWindowResizeEvent(true);
      this.setStatic(true, false);
      this.setAnimation(false);
      if (!removeDOM) {
        this.removeAll(removeDOM);
        this.el.classList.remove(this.opts._styleSheetClass);
      } else {
        this.el.parentNode.removeChild(this.el);
      }
      this._removeStylesheet();
      this.el.removeAttribute("gs-current-row");
      delete this.opts._isNested;
      delete this.opts;
      delete this._placeholder;
      delete this.engine;
      delete this.el.gridstack;
      delete this.el;
      return this;
    }
    float(val) {
      this.engine.float = val;
      this._triggerChangeEvent();
      return this;
    }
    getFloat() {
      return this.engine.float;
    }
    getCellFromPixel(position, useDocRelative = false) {
      let box = this.el.getBoundingClientRect();
      let containerPos;
      if (useDocRelative) {
        containerPos = { top: box.top + document.documentElement.scrollTop, left: box.left };
      } else {
        containerPos = { top: this.el.offsetTop, left: this.el.offsetLeft };
      }
      let relativeLeft = position.left - containerPos.left;
      let relativeTop = position.top - containerPos.top;
      let columnWidth = box.width / this.getColumn();
      let rowHeight = box.height / parseInt(this.el.getAttribute("gs-current-row"));
      return { x: Math.floor(relativeLeft / columnWidth), y: Math.floor(relativeTop / rowHeight) };
    }
    getRow() {
      return Math.max(this.engine.getRow(), this.opts.minRow);
    }
    isAreaEmpty(x2, y2, w2, h2) {
      return this.engine.isAreaEmpty(x2, y2, w2, h2);
    }
    makeWidget(els) {
      let el = GridStack.getElement(els);
      this._prepareElement(el, true);
      this._updateContainerHeight();
      this._triggerAddEvent();
      this._triggerChangeEvent();
      return el;
    }
    on(name, callback) {
      if (name.indexOf(" ") !== -1) {
        let names = name.split(" ");
        names.forEach((name2) => this.on(name2, callback));
        return this;
      }
      if (name === "change" || name === "added" || name === "removed" || name === "enable" || name === "disable") {
        let noData = name === "enable" || name === "disable";
        if (noData) {
          this._gsEventHandler[name] = (event) => callback(event);
        } else {
          this._gsEventHandler[name] = (event) => callback(event, event.detail);
        }
        this.el.addEventListener(name, this._gsEventHandler[name]);
      } else if (name === "drag" || name === "dragstart" || name === "dragstop" || name === "resizestart" || name === "resize" || name === "resizestop" || name === "dropped") {
        this._gsEventHandler[name] = callback;
      } else {
        console.log("GridStack.on(" + name + ') event not supported, but you can still use $(".grid-stack").on(...) while jquery-ui is still used internally.');
      }
      return this;
    }
    off(name) {
      if (name.indexOf(" ") !== -1) {
        let names = name.split(" ");
        names.forEach((name2) => this.off(name2));
        return this;
      }
      if (name === "change" || name === "added" || name === "removed" || name === "enable" || name === "disable") {
        if (this._gsEventHandler[name]) {
          this.el.removeEventListener(name, this._gsEventHandler[name]);
        }
      }
      delete this._gsEventHandler[name];
      return this;
    }
    removeWidget(els, removeDOM = true, triggerEvent = true) {
      GridStack.getElements(els).forEach((el) => {
        if (el.parentElement !== this.el)
          return;
        let node = el.gridstackNode;
        if (!node) {
          node = this.engine.nodes.find((n2) => el === n2.el);
        }
        if (!node)
          return;
        delete el.gridstackNode;
        gridstack_ddi_1.GridStackDDI.get().remove(el);
        this.engine.removeNode(node, removeDOM, triggerEvent);
        if (removeDOM && el.parentElement) {
          el.remove();
        }
      });
      if (triggerEvent) {
        this._triggerRemoveEvent();
        this._triggerChangeEvent();
      }
      return this;
    }
    removeAll(removeDOM = true) {
      this.engine.nodes.forEach((n2) => {
        delete n2.el.gridstackNode;
        gridstack_ddi_1.GridStackDDI.get().remove(n2.el);
      });
      this.engine.removeAll(removeDOM);
      this._triggerRemoveEvent();
      return this;
    }
    setAnimation(doAnimate) {
      if (doAnimate) {
        this.el.classList.add("grid-stack-animate");
      } else {
        this.el.classList.remove("grid-stack-animate");
      }
      return this;
    }
    setStatic(val, updateClass = true) {
      if (this.opts.staticGrid === val)
        return this;
      this.opts.staticGrid = val;
      this._setupRemoveDrop();
      this._setupAcceptWidget();
      this.engine.nodes.forEach((n2) => this._prepareDragDropByNode(n2));
      if (updateClass) {
        this._setStaticClass();
      }
      return this;
    }
    update(els, opt) {
      if (arguments.length > 2) {
        console.warn("gridstack.ts: `update(el, x, y, w, h)` is deprecated. Use `update(el, {x, w, content, ...})`. It will be removed soon");
        let a = arguments, i = 1;
        opt = { x: a[i++], y: a[i++], w: a[i++], h: a[i++] };
        return this.update(els, opt);
      }
      GridStack.getElements(els).forEach((el) => {
        if (!el || !el.gridstackNode)
          return;
        let n2 = el.gridstackNode;
        let w2 = utils_12.Utils.cloneDeep(opt);
        delete w2.autoPosition;
        let keys = ["x", "y", "w", "h"];
        let m2;
        if (keys.some((k2) => w2[k2] !== void 0 && w2[k2] !== n2[k2])) {
          m2 = {};
          keys.forEach((k2) => {
            m2[k2] = w2[k2] !== void 0 ? w2[k2] : n2[k2];
            delete w2[k2];
          });
        }
        if (!m2 && (w2.minW || w2.minH || w2.maxW || w2.maxH)) {
          m2 = {};
        }
        if (w2.content) {
          let sub = el.querySelector(".grid-stack-item-content");
          if (sub && sub.innerHTML !== w2.content) {
            sub.innerHTML = w2.content;
          }
          delete w2.content;
        }
        let changed = false;
        let ddChanged = false;
        for (const key in w2) {
          if (key[0] !== "_" && n2[key] !== w2[key]) {
            n2[key] = w2[key];
            changed = true;
            ddChanged = ddChanged || !this.opts.staticGrid && (key === "noResize" || key === "noMove" || key === "locked");
          }
        }
        if (m2) {
          this.engine.cleanNodes().beginUpdate(n2).moveNode(n2, m2);
          this._updateContainerHeight();
          this._triggerChangeEvent();
          this.engine.endUpdate();
        }
        if (changed) {
          this._writeAttr(el, n2);
        }
        if (ddChanged) {
          this._prepareDragDropByNode(n2);
        }
      });
      return this;
    }
    margin(value) {
      let isMultiValue = typeof value === "string" && value.split(" ").length > 1;
      if (!isMultiValue) {
        let data = utils_12.Utils.parseHeight(value);
        if (this.opts.marginUnit === data.unit && this.opts.margin === data.h)
          return;
      }
      this.opts.margin = value;
      this.opts.marginTop = this.opts.marginBottom = this.opts.marginLeft = this.opts.marginRight = void 0;
      this.initMargin();
      this._updateStyles(true);
      return this;
    }
    getMargin() {
      return this.opts.margin;
    }
    willItFit(node) {
      if (arguments.length > 1) {
        console.warn("gridstack.ts: `willItFit(x,y,w,h,autoPosition)` is deprecated. Use `willItFit({x, y,...})`. It will be removed soon");
        let a = arguments, i = 0, w2 = { x: a[i++], y: a[i++], w: a[i++], h: a[i++], autoPosition: a[i++] };
        return this.willItFit(w2);
      }
      return this.engine.willItFit(node);
    }
    _triggerChangeEvent() {
      if (this.engine.batchMode)
        return this;
      let elements = this.engine.getDirtyNodes(true);
      if (elements && elements.length) {
        if (!this._ignoreLayoutsNodeChange) {
          this.engine.layoutsNodesChange(elements);
        }
        this._triggerEvent("change", elements);
      }
      this.engine.saveInitial();
      return this;
    }
    _triggerAddEvent() {
      if (this.engine.batchMode)
        return this;
      if (this.engine.addedNodes && this.engine.addedNodes.length > 0) {
        if (!this._ignoreLayoutsNodeChange) {
          this.engine.layoutsNodesChange(this.engine.addedNodes);
        }
        this.engine.addedNodes.forEach((n2) => {
          delete n2._dirty;
        });
        this._triggerEvent("added", this.engine.addedNodes);
        this.engine.addedNodes = [];
      }
      return this;
    }
    _triggerRemoveEvent() {
      if (this.engine.batchMode)
        return this;
      if (this.engine.removedNodes && this.engine.removedNodes.length > 0) {
        this._triggerEvent("removed", this.engine.removedNodes);
        this.engine.removedNodes = [];
      }
      return this;
    }
    _triggerEvent(name, data) {
      let event = data ? new CustomEvent(name, { bubbles: false, detail: data }) : new Event(name);
      this.el.dispatchEvent(event);
      return this;
    }
    _removeStylesheet() {
      if (this._styles) {
        utils_12.Utils.removeStylesheet(this._styles._id);
        delete this._styles;
      }
      return this;
    }
    _updateStyles(forceUpdate = false, maxH) {
      if (forceUpdate) {
        this._removeStylesheet();
      }
      this._updateContainerHeight();
      if (this.opts.cellHeight === 0) {
        return this;
      }
      let cellHeight = this.opts.cellHeight;
      let cellHeightUnit = this.opts.cellHeightUnit;
      let prefix = `.${this.opts._styleSheetClass} > .${this.opts.itemClass}`;
      if (!this._styles) {
        let id = "gridstack-style-" + (Math.random() * 1e5).toFixed();
        let styleLocation = this.opts.styleInHead ? void 0 : this.el.parentNode;
        this._styles = utils_12.Utils.createStylesheet(id, styleLocation);
        if (!this._styles)
          return this;
        this._styles._id = id;
        this._styles._max = 0;
        utils_12.Utils.addCSSRule(this._styles, prefix, `min-height: ${cellHeight}${cellHeightUnit}`);
        let top = this.opts.marginTop + this.opts.marginUnit;
        let bottom = this.opts.marginBottom + this.opts.marginUnit;
        let right = this.opts.marginRight + this.opts.marginUnit;
        let left = this.opts.marginLeft + this.opts.marginUnit;
        let content = `${prefix} > .grid-stack-item-content`;
        let placeholder = `.${this.opts._styleSheetClass} > .grid-stack-placeholder > .placeholder-content`;
        utils_12.Utils.addCSSRule(this._styles, content, `top: ${top}; right: ${right}; bottom: ${bottom}; left: ${left};`);
        utils_12.Utils.addCSSRule(this._styles, placeholder, `top: ${top}; right: ${right}; bottom: ${bottom}; left: ${left};`);
        utils_12.Utils.addCSSRule(this._styles, `${prefix} > .ui-resizable-ne`, `right: ${right}`);
        utils_12.Utils.addCSSRule(this._styles, `${prefix} > .ui-resizable-e`, `right: ${right}`);
        utils_12.Utils.addCSSRule(this._styles, `${prefix} > .ui-resizable-se`, `right: ${right}; bottom: ${bottom}`);
        utils_12.Utils.addCSSRule(this._styles, `${prefix} > .ui-resizable-nw`, `left: ${left}`);
        utils_12.Utils.addCSSRule(this._styles, `${prefix} > .ui-resizable-w`, `left: ${left}`);
        utils_12.Utils.addCSSRule(this._styles, `${prefix} > .ui-resizable-sw`, `left: ${left}; bottom: ${bottom}`);
      }
      maxH = maxH || this._styles._max;
      if (maxH > this._styles._max) {
        let getHeight = (rows) => cellHeight * rows + cellHeightUnit;
        for (let i = this._styles._max + 1; i <= maxH; i++) {
          let h2 = getHeight(i);
          utils_12.Utils.addCSSRule(this._styles, `${prefix}[gs-y="${i - 1}"]`, `top: ${getHeight(i - 1)}`);
          utils_12.Utils.addCSSRule(this._styles, `${prefix}[gs-h="${i}"]`, `height: ${h2}`);
          utils_12.Utils.addCSSRule(this._styles, `${prefix}[gs-min-h="${i}"]`, `min-height: ${h2}`);
          utils_12.Utils.addCSSRule(this._styles, `${prefix}[gs-max-h="${i}"]`, `max-height: ${h2}`);
        }
        this._styles._max = maxH;
      }
      return this;
    }
    _updateContainerHeight() {
      if (!this.engine || this.engine.batchMode)
        return this;
      let row = this.getRow() + this._extraDragRow;
      this.el.setAttribute("gs-current-row", String(row));
      if (row === 0) {
        this.el.style.removeProperty("height");
        return this;
      }
      let cellHeight = this.opts.cellHeight;
      let unit = this.opts.cellHeightUnit;
      if (!cellHeight)
        return this;
      this.el.style.height = row * cellHeight + unit;
      return this;
    }
    _prepareElement(el, triggerAddEvent = false, node) {
      if (!node) {
        el.classList.add(this.opts.itemClass);
        node = this._readAttr(el);
      }
      el.gridstackNode = node;
      node.el = el;
      node.grid = this;
      let copy = Object.assign({}, node);
      node = this.engine.addNode(node, triggerAddEvent);
      if (!utils_12.Utils.same(node, copy)) {
        this._writeAttr(el, node);
      }
      this._prepareDragDropByNode(node);
      return this;
    }
    _writePosAttr(el, n2) {
      if (n2.x !== void 0 && n2.x !== null) {
        el.setAttribute("gs-x", String(n2.x));
      }
      if (n2.y !== void 0 && n2.y !== null) {
        el.setAttribute("gs-y", String(n2.y));
      }
      if (n2.w) {
        el.setAttribute("gs-w", String(n2.w));
      }
      if (n2.h) {
        el.setAttribute("gs-h", String(n2.h));
      }
      return this;
    }
    _writeAttr(el, node) {
      if (!node)
        return this;
      this._writePosAttr(el, node);
      let attrs = {
        autoPosition: "gs-auto-position",
        minW: "gs-min-w",
        minH: "gs-min-h",
        maxW: "gs-max-w",
        maxH: "gs-max-h",
        noResize: "gs-no-resize",
        noMove: "gs-no-move",
        locked: "gs-locked",
        id: "gs-id",
        resizeHandles: "gs-resize-handles"
      };
      for (const key in attrs) {
        if (node[key]) {
          el.setAttribute(attrs[key], String(node[key]));
        } else {
          el.removeAttribute(attrs[key]);
        }
      }
      return this;
    }
    _readAttr(el) {
      let node = {};
      node.x = utils_12.Utils.toNumber(el.getAttribute("gs-x"));
      node.y = utils_12.Utils.toNumber(el.getAttribute("gs-y"));
      node.w = utils_12.Utils.toNumber(el.getAttribute("gs-w"));
      node.h = utils_12.Utils.toNumber(el.getAttribute("gs-h"));
      node.maxW = utils_12.Utils.toNumber(el.getAttribute("gs-max-w"));
      node.minW = utils_12.Utils.toNumber(el.getAttribute("gs-min-w"));
      node.maxH = utils_12.Utils.toNumber(el.getAttribute("gs-max-h"));
      node.minH = utils_12.Utils.toNumber(el.getAttribute("gs-min-h"));
      node.autoPosition = utils_12.Utils.toBool(el.getAttribute("gs-auto-position"));
      node.noResize = utils_12.Utils.toBool(el.getAttribute("gs-no-resize"));
      node.noMove = utils_12.Utils.toBool(el.getAttribute("gs-no-move"));
      node.locked = utils_12.Utils.toBool(el.getAttribute("gs-locked"));
      node.resizeHandles = el.getAttribute("gs-resize-handles");
      node.id = el.getAttribute("gs-id");
      for (const key in node) {
        if (!node.hasOwnProperty(key))
          return;
        if (!node[key] && node[key] !== 0) {
          delete node[key];
        }
      }
      return node;
    }
    _setStaticClass() {
      let classes = ["grid-stack-static"];
      if (this.opts.staticGrid) {
        this.el.classList.add(...classes);
        this.el.setAttribute("gs-static", "true");
      } else {
        this.el.classList.remove(...classes);
        this.el.removeAttribute("gs-static");
      }
      return this;
    }
    onParentResize() {
      if (!this.el || !this.el.clientWidth)
        return;
      let changedColumn = false;
      if (this._autoColumn && this.opts._isNested) {
        if (this.opts.column !== this.opts._isNested.w) {
          changedColumn = true;
          this.column(this.opts._isNested.w, "none");
        }
      } else {
        let oneColumn = !this.opts.disableOneColumnMode && this.el.clientWidth <= this.opts.minWidth;
        if (this.opts.column === 1 !== oneColumn) {
          changedColumn = true;
          if (this.opts.animate) {
            this.setAnimation(false);
          }
          this.column(oneColumn ? 1 : this._prevColumn);
          if (this.opts.animate) {
            this.setAnimation(true);
          }
        }
      }
      if (this._isAutoCellHeight) {
        if (!changedColumn && this.opts.cellHeightThrottle) {
          if (!this._cellHeightThrottle) {
            this._cellHeightThrottle = utils_12.Utils.throttle(() => this.cellHeight(), this.opts.cellHeightThrottle);
          }
          this._cellHeightThrottle();
        } else {
          this.cellHeight();
        }
      }
      this.engine.nodes.forEach((n2) => {
        if (n2.subGrid) {
          n2.subGrid.onParentResize();
        }
      });
      return this;
    }
    _updateWindowResizeEvent(forceRemove = false) {
      const workTodo = (this._isAutoCellHeight || !this.opts.disableOneColumnMode) && !this.opts._isNested;
      if (!forceRemove && workTodo && !this._windowResizeBind) {
        this._windowResizeBind = this.onParentResize.bind(this);
        window.addEventListener("resize", this._windowResizeBind);
      } else if ((forceRemove || !workTodo) && this._windowResizeBind) {
        window.removeEventListener("resize", this._windowResizeBind);
        delete this._windowResizeBind;
      }
      return this;
    }
    static getElement(els = ".grid-stack-item") {
      return utils_12.Utils.getElement(els);
    }
    static getElements(els = ".grid-stack-item") {
      return utils_12.Utils.getElements(els);
    }
    static getGridElement(els) {
      return GridStack.getElement(els);
    }
    static getGridElements(els) {
      return utils_12.Utils.getElements(els);
    }
    initMargin() {
      let data;
      let margin = 0;
      let margins = [];
      if (typeof this.opts.margin === "string") {
        margins = this.opts.margin.split(" ");
      }
      if (margins.length === 2) {
        this.opts.marginTop = this.opts.marginBottom = margins[0];
        this.opts.marginLeft = this.opts.marginRight = margins[1];
      } else if (margins.length === 4) {
        this.opts.marginTop = margins[0];
        this.opts.marginRight = margins[1];
        this.opts.marginBottom = margins[2];
        this.opts.marginLeft = margins[3];
      } else {
        data = utils_12.Utils.parseHeight(this.opts.margin);
        this.opts.marginUnit = data.unit;
        margin = this.opts.margin = data.h;
      }
      if (this.opts.marginTop === void 0) {
        this.opts.marginTop = margin;
      } else {
        data = utils_12.Utils.parseHeight(this.opts.marginTop);
        this.opts.marginTop = data.h;
        delete this.opts.margin;
      }
      if (this.opts.marginBottom === void 0) {
        this.opts.marginBottom = margin;
      } else {
        data = utils_12.Utils.parseHeight(this.opts.marginBottom);
        this.opts.marginBottom = data.h;
        delete this.opts.margin;
      }
      if (this.opts.marginRight === void 0) {
        this.opts.marginRight = margin;
      } else {
        data = utils_12.Utils.parseHeight(this.opts.marginRight);
        this.opts.marginRight = data.h;
        delete this.opts.margin;
      }
      if (this.opts.marginLeft === void 0) {
        this.opts.marginLeft = margin;
      } else {
        data = utils_12.Utils.parseHeight(this.opts.marginLeft);
        this.opts.marginLeft = data.h;
        delete this.opts.margin;
      }
      this.opts.marginUnit = data.unit;
      if (this.opts.marginTop === this.opts.marginBottom && this.opts.marginLeft === this.opts.marginRight && this.opts.marginTop === this.opts.marginRight) {
        this.opts.margin = this.opts.marginTop;
      }
      return this;
    }
    static setupDragIn(dragIn, dragInOptions) {
    }
    movable(els, val) {
      return this;
    }
    resizable(els, val) {
      return this;
    }
    disable() {
      return this;
    }
    enable() {
      return this;
    }
    enableMove(doEnable) {
      return this;
    }
    enableResize(doEnable) {
      return this;
    }
    _setupAcceptWidget() {
      return this;
    }
    _setupRemoveDrop() {
      return this;
    }
    _prepareDragDropByNode(node) {
      return this;
    }
    _onStartMoving(el, event, ui, node, cellWidth, cellHeight) {
      return;
    }
    _dragOrResize(el, event, ui, node, cellWidth, cellHeight) {
      return;
    }
    _leave(el, helper) {
      return;
    }
  }
  exports.GridStack = GridStack;
  GridStack.Utils = utils_12.Utils;
  GridStack.Engine = gridstack_engine_1.GridStackEngine;
})(gridstack);
var _sfc_main$7 = defineComponent({
  name: "Checkbox",
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ""
    },
    toggleSwitch: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue", "change"],
  setup(props, context) {
    const inputRef = ref(null);
    const inputValue = computed({
      get() {
        return props.modelValue;
      },
      set(newValue) {
        if (props.readonly)
          ;
        context.emit("update:modelValue", newValue);
        claimFocus();
      }
    });
    function claimFocus() {
      if (inputRef.value !== null) {
        inputRef.value.focus();
      }
    }
    function changeEvent(event) {
      if (props.readonly) {
        return;
      }
      const checked = event.target.checked;
      context.emit("change", checked);
    }
    function setValue() {
      if (props.readonly) {
        return;
      }
      inputValue.value = !inputValue.value;
    }
    return {
      inputValue,
      inputRef,
      setValue,
      changeEvent
    };
  }
});
var _hoisted_1$7 = ["readonly"];
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["checkbox-container", { readonly: _ctx.readonly }])
  }, [
    withDirectives(createBaseVNode("input", {
      class: normalizeClass(_ctx.toggleSwitch ? "passage-toggle-switch" : "passage-checkbox"),
      type: "checkbox",
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.inputValue = $event),
      ref: "inputRef",
      onChange: _cache[1] || (_cache[1] = withModifiers((...args) => _ctx.changeEvent && _ctx.changeEvent(...args), ["prevent"])),
      readonly: _ctx.readonly
    }, null, 42, _hoisted_1$7), [
      [vModelCheckbox, _ctx.inputValue]
    ]),
    createBaseVNode("div", {
      class: normalizeClass(["checkbox-label", { "toggle-switch-label": _ctx.toggleSwitch }]),
      onClick: _cache[2] || (_cache[2] = withModifiers((...args) => _ctx.setValue && _ctx.setValue(...args), ["prevent"]))
    }, toDisplayString$1(_ctx.label), 3)
  ], 2);
}
var Checkbox = _export_sfc(_sfc_main$7, [["render", _sfc_render$7]]);
var _sfc_main$6 = defineComponent({
  name: "Validated String",
  props: {
    modelValue: {
      type: String
    },
    placeholder: {
      type: String
    },
    label: {
      type: String
    },
    readonly: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const { t: t2 } = useLocale();
    const reactiveValue = computed({
      get() {
        return props.modelValue;
      },
      set(newValue) {
        context.emit("update:modelValue", newValue);
      }
    });
    const errorMessage = ref("");
    function validate() {
      var _a, _b;
      errorMessage.value = "";
      if (props.required && props.modelValue === void 0) {
        errorMessage.value = t2("required");
        return false;
      }
      const validLength = ((_b = (_a = props.modelValue) == null ? void 0 : _a.length) != null ? _b : 0) < 64;
      if (!validLength) {
        errorMessage.value = t2("64-letters-max");
      }
      return validLength;
    }
    return {
      reactiveValue,
      validate,
      errorMessage
    };
  }
});
var _hoisted_1$6 = { class: "validated-field" };
var _hoisted_2$6 = { class: "label" };
var _hoisted_3$5 = {
  key: 0,
  class: "input",
  part: "input",
  style: { "width": "100%" },
  value: "N/A",
  readonly: ""
};
var _hoisted_4$4 = ["placeholder", "readonly"];
var _hoisted_5$4 = { class: "error-message" };
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$6, [
    createBaseVNode("div", _hoisted_2$6, toDisplayString$1(_ctx.label), 1),
    _ctx.readonly && !_ctx.modelValue ? (openBlock(), createElementBlock("input", _hoisted_3$5)) : withDirectives((openBlock(), createElementBlock("input", {
      key: 1,
      class: normalizeClass(["input", { "is-danger": _ctx.errorMessage }]),
      part: "input",
      style: { "width": "100%" },
      placeholder: _ctx.placeholder,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.reactiveValue = $event),
      onInput: _cache[1] || (_cache[1] = ($event) => _ctx.errorMessage = ""),
      readonly: _ctx.readonly
    }, null, 42, _hoisted_4$4)), [
      [vModelText, _ctx.reactiveValue]
    ]),
    createBaseVNode("div", _hoisted_5$4, toDisplayString$1(_ctx.errorMessage), 1)
  ]);
}
var ValidatedString = _export_sfc(_sfc_main$6, [["render", _sfc_render$6]]);
var _sfc_main$5 = defineComponent({
  name: "Validated String",
  props: {
    modelValue: {
      type: String
    },
    placeholder: {
      type: String
    },
    label: {
      type: String
    },
    readonly: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const { t: t2 } = useLocale();
    const reactiveValue = computed({
      get() {
        return props.modelValue;
      },
      set(newValue) {
        context.emit("update:modelValue", newValue);
      }
    });
    const errorMessage = ref("");
    function validate() {
      var _a;
      errorMessage.value = "";
      if (props.required && props.modelValue === void 0) {
        errorMessage.value = t2("required");
        return false;
      }
      const validDate = !props.modelValue || dayjs((_a = props.modelValue) != null ? _a : "", "YYYY-DD-MM").isValid();
      if (!validDate) {
        errorMessage.value = t2("invalid-date");
      }
      return validDate;
    }
    return {
      reactiveValue,
      validate,
      errorMessage
    };
  }
});
var _hoisted_1$5 = { class: "validated-field" };
var _hoisted_2$5 = { class: "label" };
var _hoisted_3$4 = {
  key: 0,
  class: "input",
  part: "input",
  style: { "width": "100%" },
  value: "N/A",
  readonly: ""
};
var _hoisted_4$3 = ["placeholder", "readonly"];
var _hoisted_5$3 = { class: "error-message" };
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$5, [
    createBaseVNode("div", _hoisted_2$5, toDisplayString$1(_ctx.label), 1),
    _ctx.readonly && !_ctx.modelValue ? (openBlock(), createElementBlock("input", _hoisted_3$4)) : withDirectives((openBlock(), createElementBlock("input", {
      key: 1,
      class: normalizeClass(["input", { "is-danger": _ctx.errorMessage }]),
      part: "input",
      style: { "width": "100%" },
      placeholder: _ctx.placeholder,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.reactiveValue = $event),
      onInput: _cache[1] || (_cache[1] = ($event) => _ctx.errorMessage = ""),
      readonly: _ctx.readonly
    }, null, 42, _hoisted_4$3)), [
      [vModelText, _ctx.reactiveValue]
    ]),
    createBaseVNode("div", _hoisted_5$3, toDisplayString$1(_ctx.errorMessage), 1)
  ]);
}
var ValidatedDate = _export_sfc(_sfc_main$5, [["render", _sfc_render$5]]);
var _sfc_main$4 = defineComponent({
  name: "Validated String",
  components: {
    Checkbox
  },
  props: {
    modelValue: {
      type: Boolean
    },
    placeholder: {
      type: String
    },
    label: {
      type: String
    },
    readonly: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const reactiveValue = computed({
      get() {
        return props.modelValue;
      },
      set(newValue) {
        context.emit("update:modelValue", newValue);
      }
    });
    function validate() {
      return true;
    }
    return {
      reactiveValue,
      validate
    };
  }
});
var _hoisted_1$4 = { class: "validated-field" };
var _hoisted_2$4 = { class: "label" };
var _hoisted_3$3 = createBaseVNode("div", { class: "error-message" }, null, -1);
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_checkbox = resolveComponent("checkbox");
  return openBlock(), createElementBlock("div", _hoisted_1$4, [
    createBaseVNode("div", _hoisted_2$4, toDisplayString$1(_ctx.label), 1),
    createVNode(_component_checkbox, {
      modelValue: _ctx.reactiveValue,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.reactiveValue = $event),
      readonly: _ctx.readonly
    }, null, 8, ["modelValue", "readonly"]),
    _hoisted_3$3
  ]);
}
var ValidatedBoolean = _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
function isEmail(email2) {
  const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegEx.test(email2);
}
var _sfc_main$3 = defineComponent({
  name: "Validated String",
  props: {
    modelValue: {
      type: String
    },
    placeholder: {
      type: String
    },
    label: {
      type: String
    },
    readonly: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const { t: t2 } = useLocale();
    const reactiveValue = computed({
      get() {
        return props.modelValue;
      },
      set(newValue) {
        context.emit("update:modelValue", newValue);
      }
    });
    const errorMessage = ref("");
    function validate() {
      var _a, _b, _c;
      errorMessage.value = "";
      if (props.required && props.modelValue === void 0) {
        errorMessage.value = t2("required");
        return false;
      }
      const validLength = ((_b = (_a = props.modelValue) == null ? void 0 : _a.length) != null ? _b : 0) < 64;
      if (!validLength) {
        errorMessage.value = t2("64-letters-max");
        return false;
      }
      const validEmail = !props.modelValue || isEmail((_c = props.modelValue) != null ? _c : "");
      if (!validEmail) {
        errorMessage.value = t2("invalid-email");
      }
      return validEmail;
    }
    return {
      reactiveValue,
      validate,
      errorMessage
    };
  }
});
var _hoisted_1$3 = { class: "validated-field" };
var _hoisted_2$3 = { class: "label" };
var _hoisted_3$2 = {
  key: 0,
  class: "input",
  part: "input",
  style: { "width": "100%" },
  value: "N/A",
  readonly: ""
};
var _hoisted_4$2 = ["placeholder", "readonly"];
var _hoisted_5$2 = { class: "error-message" };
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$3, [
    createBaseVNode("div", _hoisted_2$3, toDisplayString$1(_ctx.label), 1),
    _ctx.readonly && !_ctx.modelValue ? (openBlock(), createElementBlock("input", _hoisted_3$2)) : withDirectives((openBlock(), createElementBlock("input", {
      key: 1,
      class: normalizeClass(["input", { "is-danger": _ctx.errorMessage }]),
      part: "input",
      style: { "width": "100%" },
      placeholder: _ctx.placeholder,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.reactiveValue = $event),
      onInput: _cache[1] || (_cache[1] = ($event) => _ctx.errorMessage = ""),
      readonly: _ctx.readonly,
      autocomplete: "email",
      inputmode: "email"
    }, null, 42, _hoisted_4$2)), [
      [vModelText, _ctx.reactiveValue]
    ]),
    createBaseVNode("div", _hoisted_5$2, toDisplayString$1(_ctx.errorMessage), 1)
  ]);
}
var ValidatedEmail = _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
var _sfc_main$2 = defineComponent({
  name: "Validated Integer",
  props: {
    modelValue: {
      type: Number
    },
    placeholder: {
      type: String
    },
    label: {
      type: String
    },
    readonly: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const { t: t2 } = useLocale();
    const reactiveValue = computed({
      get() {
        return props.modelValue;
      },
      set(newValue) {
        if (typeof newValue !== "number") {
          context.emit("update:modelValue", 0);
          return;
        }
        context.emit("update:modelValue", newValue);
      }
    });
    const errorMessage = ref("");
    function validate() {
      errorMessage.value = "";
      if (props.required && props.modelValue === void 0) {
        errorMessage.value = t2("required");
        return false;
      }
      const validInt = !props.modelValue || Number.isInteger(props.modelValue);
      if (!validInt) {
        errorMessage.value = t2("no-decimals");
      }
      return validInt;
    }
    function isInteger(event) {
      if (!/\d/.test(event.key) && event.key !== "-") {
        return event.preventDefault();
      }
    }
    return {
      reactiveValue,
      validate,
      errorMessage,
      isInteger
    };
  }
});
var _hoisted_1$2 = { class: "validated-field" };
var _hoisted_2$2 = { class: "label" };
var _hoisted_3$1 = {
  key: 0,
  class: "input",
  part: "input",
  style: { "width": "100%" },
  value: "N/A",
  readonly: ""
};
var _hoisted_4$1 = ["placeholder", "readonly"];
var _hoisted_5$1 = { class: "error-message" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$2, [
    createBaseVNode("div", _hoisted_2$2, toDisplayString$1(_ctx.label), 1),
    _ctx.readonly && !_ctx.modelValue ? (openBlock(), createElementBlock("input", _hoisted_3$1)) : withDirectives((openBlock(), createElementBlock("input", {
      key: 1,
      class: normalizeClass(["input", { "is-danger": _ctx.errorMessage }]),
      part: "input",
      style: { "width": "100%" },
      placeholder: _ctx.placeholder,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.reactiveValue = $event),
      onInput: _cache[1] || (_cache[1] = ($event) => _ctx.errorMessage = ""),
      readonly: _ctx.readonly,
      type: "number",
      inputmode: "decimal",
      autocomplete: "decimal",
      step: "1",
      pattern: "^[-/d]/d*$",
      onKeypress: _cache[2] || (_cache[2] = ($event) => _ctx.isInteger($event))
    }, null, 42, _hoisted_4$1)), [
      [
        vModelText,
        _ctx.reactiveValue,
        void 0,
        { number: true }
      ]
    ]),
    createBaseVNode("div", _hoisted_5$1, toDisplayString$1(_ctx.errorMessage), 1)
  ]);
}
var ValidatedInteger = _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
var _sfc_main$1 = defineComponent({
  name: "Validated String",
  props: {
    modelValue: {
      type: String
    },
    placeholder: {
      type: String
    },
    label: {
      type: String
    },
    readonly: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const { t: t2 } = useLocale();
    const reactiveValue = computed({
      get() {
        return props.modelValue;
      },
      set(newValue) {
        context.emit("update:modelValue", newValue);
      }
    });
    const errorMessage = ref("");
    function validate() {
      var _a;
      errorMessage.value = "";
      if (props.required && props.modelValue === void 0) {
        errorMessage.value = t2("required");
        return false;
      }
      const isValidPhone = !props.modelValue || ((_a = phoneInput == null ? void 0 : phoneInput.isValidNumber()) != null ? _a : false);
      if (!isValidPhone) {
        errorMessage.value = t2("invalid-phone");
      } else {
        const number2 = phoneInput == null ? void 0 : phoneInput.getNumber();
        if (number2) {
          context.emit("update:modelValue", phoneInput == null ? void 0 : phoneInput.getNumber());
        }
      }
      return isValidPhone;
    }
    const phoneInputBox = ref();
    const controlContainer = ref();
    const { defaultCountryCode: defaultCountryCode2 } = useDefaultCountryCode();
    let phoneInput;
    function showCountryCode() {
      var _a;
      phoneInput = intlTelInput(phoneInputBox.value, {
        initialCountry: (_a = phoneInput == null ? void 0 : phoneInput.getSelectedCountryData().iso2) != null ? _a : defaultCountryCode2.value,
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        dropdownContainer: controlContainer.value,
        autoPlaceholder: "aggressive"
      });
    }
    function hideCountryCode() {
      if (phoneInput === void 0) {
        return;
      }
      phoneInput.destroy();
      phoneInput = void 0;
    }
    onMounted(() => {
      if (!props.readonly) {
        showCountryCode();
      }
    });
    watch(
      () => props.readonly,
      () => {
        if (!props.readonly) {
          showCountryCode();
        } else {
          hideCountryCode();
        }
      }
    );
    return {
      reactiveValue,
      validate,
      errorMessage,
      phoneInputBox,
      controlContainer
    };
  }
});
var _hoisted_1$1 = { class: "validated-field" };
var _hoisted_2$1 = { class: "label" };
var _hoisted_3 = {
  class: "input",
  part: "input",
  style: { "width": "100%" },
  value: "N/A",
  readonly: ""
};
var _hoisted_4 = ["placeholder", "readonly"];
var _hoisted_5 = {
  ref: "controlContainer",
  style: { "width": "100%" }
};
var _hoisted_6 = { class: "error-message" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    createBaseVNode("div", _hoisted_2$1, toDisplayString$1(_ctx.label), 1),
    withDirectives(createBaseVNode("input", _hoisted_3, null, 512), [
      [vShow, _ctx.readonly && !_ctx.modelValue]
    ]),
    withDirectives(createBaseVNode("input", {
      class: normalizeClass(["input", { "is-danger": _ctx.errorMessage }]),
      part: "input",
      style: { "width": "100%" },
      placeholder: _ctx.placeholder,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.reactiveValue = $event),
      onInput: _cache[1] || (_cache[1] = ($event) => _ctx.errorMessage = ""),
      readonly: _ctx.readonly,
      autocomplete: "tel",
      inputmode: "tel",
      ref: "phoneInputBox"
    }, null, 42, _hoisted_4), [
      [vShow, !_ctx.readonly || _ctx.modelValue],
      [vModelText, _ctx.reactiveValue]
    ]),
    withDirectives(createBaseVNode("div", _hoisted_5, null, 512), [
      [vShow, !_ctx.readonly || _ctx.modelValue]
    ]),
    createBaseVNode("div", _hoisted_6, toDisplayString$1(_ctx.errorMessage), 1)
  ]);
}
var ValidatedPhone = _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
var LayoutType = ((LayoutType2) => {
  LayoutType2["Registration"] = "registration";
  LayoutType2["Profile"] = "profile";
  return LayoutType2;
})(LayoutType || {});
var _sfc_main2 = defineComponent({
  name: "User Metadata",
  components: {
    Checkbox,
    ValidatedString,
    ValidatedDate,
    ValidatedBoolean,
    ValidatedEmail,
    ValidatedInteger,
    ValidatedPhone
  },
  props: {
    appInfo: {
      type: Object,
      required: true
    },
    layoutType: {
      type: String,
      required: true
    },
    userMetadata: {
      type: Object,
      required: true
    },
    isEditing: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const { t: t2 } = useLocale();
    const layout = computed(() => {
      return props.layoutType === "registration" ? props.appInfo.layouts.registration : props.appInfo.layouts.profile;
    });
    const schema = computed(() => {
      return props.appInfo.user_metadata_schema;
    });
    const items = computed(() => {
      return layout.value.map((layout2) => {
        const foundSchema = schema.value.find((schema2) => schema2.id === layout2.id);
        return __spreadProps2(__spreadValues2(__spreadValues2({}, layout2), foundSchema), {
          placeholder: getPlaceholder(foundSchema),
          component: getComponent(foundSchema)
        });
      });
    });
    function getPlaceholder(schema2) {
      if (schema2 === void 0) {
        return "";
      }
      switch (schema2.type) {
        case le.STRING:
          return t2("enter-schema-friendly_name", [schema2.friendly_name.toLowerCase()]);
        case le.BOOLEAN:
          return "";
        case le.INTEGER:
          return "0";
        case le.DATE:
          return "MM/DD/YYYY";
        case le.PHONE:
          return "(555) 555-5555";
        case le.EMAIL:
          return "example@email.com";
      }
    }
    function getComponent(schema2) {
      if (schema2 === void 0) {
        return "ValidatedString";
      }
      switch (schema2.type) {
        case le.STRING:
          return "ValidatedString";
        case le.BOOLEAN:
          return "ValidatedBoolean";
        case le.INTEGER:
          return "ValidatedInteger";
        case le.DATE:
          return "ValidatedDate";
        case le.PHONE:
          return "ValidatedPhone";
        case le.EMAIL:
          return "ValidatedEmail";
      }
    }
    const resizeObserver = new ResizeObserver(() => {
      grid.onParentResize();
    });
    let grid;
    const gridContainer = ref();
    onMounted(() => {
      if (!gridContainer.value) {
        return;
      }
      grid = gridstack.GridStack.init(
        {
          acceptWidgets: true,
          minRow: 1,
          cellHeight: "75px",
          minWidth: 400,
          column: 6,
          margin: "0px 10px",
          resizable: {
            handles: "e,w"
          },
          staticGrid: true
        },
        gridContainer.value
      );
      resizeObserver.observe(gridContainer.value);
    });
    const inputComponents = [];
    function setRef2(component) {
      if (component) {
        inputComponents.push(component);
      }
    }
    function validate() {
      let allValid = true;
      inputComponents.forEach((component) => {
        const isValid = component.validate();
        if (!isValid) {
          allValid = false;
        }
      });
      return allValid;
    }
    return {
      layout,
      schema,
      items,
      gridContainer,
      setRef: setRef2,
      validate,
      LayoutType
    };
  }
});
var _hoisted_12 = ["id", "gs-id", "gs-x", "gs-y", "gs-w", "gs-h"];
var _hoisted_22 = { class: "grid-stack-item-content" };
function _sfc_render2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["grid-stack", { profile: _ctx.layoutType === _ctx.LayoutType.Profile, register: _ctx.layoutType === _ctx.LayoutType.Registration }]),
    ref: "gridContainer"
  }, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.items, (item) => {
      return openBlock(), createElementBlock("div", {
        id: item.id,
        class: "grid-stack-item",
        key: item.id,
        "gs-id": item.id,
        "gs-x": item.x,
        "gs-y": item.y,
        "gs-w": item.w,
        "gs-h": item.h
      }, [
        createBaseVNode("div", _hoisted_22, [
          (openBlock(), createBlock(resolveDynamicComponent(item.component), {
            label: item.friendly_name,
            placeholder: item.placeholder,
            required: _ctx.layoutType === _ctx.LayoutType.Registration,
            modelValue: _ctx.userMetadata[item.field_name],
            "onUpdate:modelValue": ($event) => _ctx.userMetadata[item.field_name] = $event,
            ref_for: true,
            ref: _ctx.setRef,
            readonly: !_ctx.isEditing
          }, null, 8, ["label", "placeholder", "required", "modelValue", "onUpdate:modelValue", "readonly"]))
        ])
      ], 8, _hoisted_12);
    }), 128))
  ], 2);
}
var UserMetadata = _export_sfc(_sfc_main2, [["render", _sfc_render2]]);
function transformMetadata(metadata, schema, defaultBooleans = false) {
  const transformedMetadata = __spreadValues2({}, metadata);
  schema.forEach((schema2) => {
    const metadataValue = transformedMetadata[schema2.field_name];
    if (schema2.type === le.DATE && metadataValue) {
      transformedMetadata[schema2.field_name] = dayjs(metadataValue).format("YYYY-MM-DD");
    }
    if (defaultBooleans && schema2.type === le.BOOLEAN && metadataValue === void 0) {
      transformedMetadata[schema2.field_name] = false;
    }
  });
  return transformedMetadata;
}

// node_modules/@passageidentity/passage-elements/dist/package/customElements.es2.js
var __defProp3 = Object.defineProperty;
var __defProps3 = Object.defineProperties;
var __getOwnPropDescs3 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols3 = Object.getOwnPropertySymbols;
var __hasOwnProp3 = Object.prototype.hasOwnProperty;
var __propIsEnum3 = Object.prototype.propertyIsEnumerable;
var __defNormalProp3 = (obj, key, value) => key in obj ? __defProp3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues3 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp3.call(b, prop))
      __defNormalProp3(a, prop, b[prop]);
  if (__getOwnPropSymbols3)
    for (var prop of __getOwnPropSymbols3(b)) {
      if (__propIsEnum3.call(b, prop))
        __defNormalProp3(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps3 = (a, b) => __defProps3(a, __getOwnPropDescs3(b));
var __async2 = (__this, __arguments, generator) => {
  return new Promise((resolve2, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e2) {
        reject(e2);
      }
    };
    var step = (x2) => x2.done ? resolve2(x2.value) : Promise.resolve(x2.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
function isStringNullish(value) {
  return value === void 0 || value === null || value === "" || value === " ";
}
var IdentifierType = ((IdentifierType2) => {
  IdentifierType2["phone"] = "PHONE";
  IdentifierType2["email"] = "EMAIL";
  return IdentifierType2;
})(IdentifierType || {});
function useAutofocusButton() {
  const autofocusButton = ref();
  function autofocus() {
    if (autofocusButton.value === void 0 || autofocusButton.value === null) {
      return;
    }
    autofocusButton.value.focus();
  }
  watch(autofocusButton, () => {
    autofocus();
  });
  return {
    autofocusButton
  };
}
function inputStyles() {
  const css = `
      .psg-input{
        -webkit-appearance: none;
        -moz-appearance: none;
        box-sizing: border-box;
        color: var(--passage-input-text-color, var(--passage-body-text-color-default));
        font-family: var(--passage-body-font-family, var(--passage-body-font-family-default));
        font-size: var(--passage-body-font-size, var(--passage-body-font-size-default));
        font-weight: var(--passage-body-font-weight, var(--passage-body-font-weight-default));

        min-height: 40px;
        width: 100%;

        padding-left: 10px;
        padding-right: 10px;
        margin: 0;

        background-color: var(--passage-input-box-background-color, var(--passage-input-box-background-color-default));
        border-style: solid;
        border-color: var(--passage-control-border-color, var(--passage-control-border-color-default));
        border-width: 1px;
        border-radius: var(--passage-input-box-border-radius, var(--passage-input-box-border-radius-default));

        transition: all 0.3s;

        text-overflow: ellipsis;
      }

      .psg-input:focus{
        outline: none;
        box-shadow: none !important;
        border-color: var(--passage-control-border-active-color, var(--passage-control-border-active-color-default));
      }

      .psg-input:active{
        outline: none;
        box-shadow: none !important;
        border-color: var(--passage-control-border-active-color, var(--passage-control-border-active-color-default));
      }

      .psg-input.has-error{
        border-color: var(--passage-error-color, var(--passage-error-color-default));
      }
      .psg-input.is-danger{
        border-color: var(--passage-error-color, var(--passage-error-color-default));
      }
      .iti {
        width: 100%;
      }

        .iti__country-list {
            border-radius: 6px;
        }

        .iti__country {
            padding: 5px 10px;
        }

        .iti__selected-flag {
            border-top-left-radius: var(--passage-control-border-radius, var(--passage-input-box-border-radius-default));
            border-bottom-left-radius: var(--passage-control-border-radius, var(--passage-input-box-border-radius-default));
        }

    .iti--container {
        top: unset !important;
        left: unset !important;
    }`;
  const style = document.createElement("style");
  style.appendChild(document.createTextNode(css));
  return style;
}
function itiStyles() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.16/css/intlTelInput.css";
  return link;
}
function otcStyles() {
  const css = `
      .psg-otp-input-container{
        margin: 0px;
        padding: 0px;
        align-items: center;
        height: auto;
        width: auto;
      }
      .psg-otp-single-input-container{
        margin: 0px;
        padding: 0px;
        height: auto;
        width: auto;
      }
      .psg-otp-input {
        width: 40px;
        height: 40px;
        padding: 0px;
        margin-left: 4px;
        margin-right: 4px;
        font-size: 24px;
        font-weight: 400;
        color: var(--passage-input-text-color, var(--passage-body-text-color-default));
        font-family: var(--passage-body-font-family, var(--passage-body-font-family-default));
        line-height: 29px;
        border-radius: 4px;
        border: 1px solid transparent;
        text-align: center;
        background-color: var(--passage-otp-input-background-color, var(--passage-otp-input-background-color-default));
        -moz-appearance: textfield;
      }
      .psg-otp-input:read-only {
        background-color: var(--passage-otp-input-background-color, var(--passage-otp-input-background-color-default));
      }
      .psg-otp-input::-webkit-inner-spin-button{
        -webkit-appearance: none;
        display: none;
        margin: 0;
      }
      .psg-otp-input::-webkit-outer-spin-button{
        -webkit-appearance: none;
        display: none;
        margin: 0;
      }
      .psg-input.has-error{
        border-color: var(--passage-error-color, var(--passage-error-color-default)) !important;
      }
      .psg-input.is-danger {
        border-color: var(--passage-error-color, var(--passage-error-color-default)) !important;
      }
      .psg-input:focus {
        outline: none;
        box-shadow: none !important;
        border-color: var(--passage-control-border-active-color, var(--passage-control-border-active-color-default));
      }
      .psg-input:active {
        outline: none;
        box-shadow: none !important;
        border-color: var(--passage-control-border-active-color, var(--passage-control-border-active-color-default));
      }`;
  const style = document.createElement("style");
  style.appendChild(document.createTextNode(css));
  return style;
}
var _withScopeId = (n2) => (pushScopeId("data-v-1ea7af8c"), n2 = n2(), popScopeId(), n2);
var _hoisted_1$r = { class: "identifier-form" };
var _hoisted_2$i = { class: "has-text-centered" };
var _hoisted_3$g = _withScopeId(() => createBaseVNode("br", null, null, -1));
var _hoisted_4$e = { class: "identifier-text" };
var _hoisted_5$d = ["onSubmit"];
var _hoisted_6$b = ["autocomplete", "inputmode", "placeholder", "onInput"];
var _hoisted_7$b = { class: "flex-row flex-center" };
var _hoisted_8$9 = ["onClick"];
var _hoisted_9$9 = {
  key: 0,
  style: { "margin-top": "30px" },
  class: "link has-text-centered"
};
var _hoisted_10$6 = ["onClick"];
var _sfc_main$v = defineComponent({
  __name: "ValidatedIdentifierForm",
  props: {
    validationError: { default: "" },
    identifier: {},
    countryCode: {},
    identifierMode: {},
    showWelcomeBack: { type: Boolean, default: false },
    conditionalUI: { type: Boolean, default: false }
  },
  emits: [
    "onSubmit",
    "update:validationError",
    "update:identifier",
    "update:countryCode",
    "update:showWelcomeBack"
  ],
  setup(__props, { emit: emit2 }) {
    const props = __props;
    const { t: t2 } = useLocale();
    const identifierParseError = ref("");
    const identifierInput = ref();
    const controlContainer = ref();
    const { autofocusButton } = useAutofocusButton();
    const { passage } = usePassage();
    const showWelcomeUI = computed(() => {
      return props.showWelcomeBack;
    });
    const label = computed(() => {
      let identifierType;
      switch (props.identifierMode) {
        case ce.phone:
          identifierType = t2("phone-number");
          break;
        case ce.email:
          identifierType = t2("email-address");
          break;
        case ce.both:
          identifierType = t2("email-or-phone-number");
          break;
      }
      return identifierType.charAt(0).toUpperCase() + identifierType.slice(1);
    });
    const placeholder = computed(() => {
      return "example@email.com";
    });
    const inputMode = computed(() => {
      if (props.identifierMode === ce.phone) {
        return "tel";
      }
      return "email";
    });
    const autocomplete = computed(() => {
      var _a;
      if (props.conditionalUI) {
        return `${inputMode.value} webauthn`;
      }
      return (_a = inputMode.value) != null ? _a : "";
    });
    const identifierText = computed({
      get() {
        return props.identifier;
      },
      set(newIdentifier) {
        emit2("update:identifier", newIdentifier);
      }
    });
    function formattedIdentifier() {
      var _a;
      if (!identifierText.value) {
        return "";
      }
      let identifier2 = identifierText.value;
      if (!showWelcomeUI.value) {
        identifier2 = isPhoneNumber() ? (_a = phoneInput == null ? void 0 : phoneInput.getNumber()) != null ? _a : "" : identifierText.value;
      }
      return identifier2.trim().toLowerCase();
    }
    const error = computed(() => {
      if (!isStringNullish(props.validationError)) {
        return props.validationError;
      }
      if (!isStringNullish(identifierParseError.value)) {
        return identifierParseError.value;
      }
      return "";
    });
    function clearErrors() {
      identifierParseError.value = "";
      emit2("update:validationError", "");
    }
    function checkIdentifier() {
      return __async2(this, null, function* () {
        if (!validateInput()) {
          return;
        }
        let identifierExists, emailVerified, phoneVerified = false;
        let webauthnTypes = [];
        let userStatus;
        let userID = "";
        try {
          const userInfo = yield passage.identifierExists(formattedIdentifier());
          if (userInfo !== null) {
            identifierExists = true;
            userStatus = userInfo.status;
            userID = userInfo.id;
            emailVerified = userInfo.email_verified;
            phoneVerified = userInfo.phone_verified;
            webauthnTypes = userInfo.webauthn_types;
          } else {
            identifierExists = false;
            userStatus = re.INACTIVE;
          }
        } catch (e2) {
          let errorMessage;
          switch (props.identifierMode) {
            case ce.email:
              errorMessage = t2("enter-a-valid-email-address");
              break;
            case ce.phone:
              errorMessage = t2("enter-a-valid-phone-number");
              break;
            case ce.both:
              errorMessage = t2("enter-a-valid-email-or-phone-number");
              break;
          }
          identifierParseError.value = errorMessage;
          return;
        }
        emit2("onSubmit", {
          identifier: formattedIdentifier(),
          identifierExists,
          identifierType: isPhoneNumber() ? IdentifierType.phone : IdentifierType.email,
          userStatus,
          userID,
          emailVerified,
          phoneVerified,
          webauthnTypes
        });
      });
    }
    function isEmail2() {
      const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegEx.test(formattedIdentifier());
    }
    function isPhoneNumber() {
      if (showWelcomeUI.value) {
        return isPhoneNumberRegex();
      }
      if (phoneInput === void 0) {
        return false;
      }
      return phoneInput.isValidNumber();
    }
    function validateInput() {
      if (formattedIdentifier() === "") {
        let message = "";
        switch (props.identifierMode) {
          case ce.phone:
            message = t2("enter-a-phone-number");
            break;
          case ce.email:
            message = t2("enter-an-email-address");
            break;
          case ce.both:
            message = t2("enter-an-email-or-phone-number");
            break;
        }
        identifierParseError.value = message;
        return false;
      } else if (props.identifierMode === ce.email && !isEmail2()) {
        identifierParseError.value = t2("enter-a-valid-email-address");
        return false;
      } else if (props.identifierMode === ce.phone && !isPhoneNumber()) {
        identifierParseError.value = t2("enter-a-valid-phone-number");
        return false;
      } else if (props.identifierMode === ce.both && !isPhoneNumber() && !isEmail2()) {
        identifierParseError.value = t2("enter-a-valid-email-or-phone-number");
        return false;
      }
      return true;
    }
    let phoneInput;
    function showCountryCode() {
      if (phoneInput !== void 0) {
        return;
      }
      identifierInput.value.addEventListener("countrychange", () => {
        var _a;
        emit2("update:countryCode", (_a = phoneInput == null ? void 0 : phoneInput.getSelectedCountryData().iso2) != null ? _a : "");
      });
      phoneInput = intlTelInput(identifierInput.value, {
        initialCountry: props.countryCode,
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        dropdownContainer: controlContainer.value,
        autoPlaceholder: "aggressive"
      });
      identifierInput.value.focus();
    }
    function hideCountryCode() {
      if (phoneInput === void 0) {
        return;
      }
      phoneInput.destroy();
      phoneInput = void 0;
      if (identifierInput.value) {
        identifierInput.value.focus();
      }
    }
    onMounted(() => {
      if (props.conditionalUI) {
        moveInput();
      }
      if (props.identifierMode === ce.phone) {
        showCountryCode();
      }
    });
    function isPhoneNumberRegex() {
      const phoneNumberRegex = /^\+$|^\+?[0-9,(,),\-, ]+$/;
      return phoneNumberRegex.test(identifierText.value.trim());
    }
    if (props.identifierMode === ce.both) {
      watch(identifierText, () => {
        if (isPhoneNumberRegex()) {
          showCountryCode();
        } else {
          hideCountryCode();
        }
      });
    }
    const countryCodeText = computed(() => {
      return props.countryCode;
    });
    watch(countryCodeText, (newValue) => {
      phoneInput == null ? void 0 : phoneInput.setCountry(newValue);
    });
    function switchAccount() {
      emit2("update:showWelcomeBack", false);
      identifierText.value = "";
    }
    const identifierForm = ref();
    function moveInput() {
      const parent = identifierForm.value.getRootNode().host;
      if (parent !== void 0) {
        identifierForm.value.appendChild(inputStyles());
        identifierForm.value.appendChild(itiStyles());
        parent.appendChild(identifierForm.value);
      }
    }
    function cleanupInput() {
      identifierForm.value.remove();
    }
    onBeforeUnmount(() => {
      cleanupInput();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$r, [
        withDirectives(createBaseVNode("div", _hoisted_2$i, [
          createTextVNode(toDisplayString$1(unref(t2)("welcome-back-sign-in-as")), 1),
          _hoisted_3$g,
          createBaseVNode("strong", _hoisted_4$e, toDisplayString$1(identifierText.value), 1)
        ], 512), [
          [vShow, _ctx.showWelcomeBack]
        ]),
        withDirectives(createBaseVNode("div", null, [
          createBaseVNode("div", {
            class: "label",
            ref: "labelRef"
          }, toDisplayString$1(label.value), 513),
          createBaseVNode("form", {
            ref_key: "identifierForm",
            ref: identifierForm,
            slot: "loginInput",
            onSubmit: withModifiers(checkIdentifier, ["prevent"])
          }, [
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => identifierText.value = $event),
              type: "text",
              class: normalizeClass(["input psg-input", { "is-danger": error.value }]),
              part: "input",
              autocomplete: autocomplete.value,
              inputmode: inputMode.value,
              id: "identifier",
              placeholder: placeholder.value,
              onInput: withModifiers(clearErrors, ["prevent"]),
              "data-test": "identifier-input",
              ref_key: "identifierInput",
              ref: identifierInput
            }, null, 42, _hoisted_6$b), [
              [vModelText, identifierText.value]
            ])
          ], 40, _hoisted_5$d),
          renderSlot(_ctx.$slots, "loginInput", {}, void 0, true)
        ], 512), [
          [vShow, !_ctx.showWelcomeBack]
        ]),
        createBaseVNode("div", {
          ref_key: "controlContainer",
          ref: controlContainer,
          style: { "width": "100%" }
        }, null, 512),
        createBaseVNode("div", {
          style: normalizeStyle(`text-align: ${showWelcomeUI.value ? "center" : "left"};`),
          class: "help is-danger error-message",
          "data-test": "validation-error"
        }, toDisplayString$1(error.value), 5),
        renderSlot(_ctx.$slots, "metadataFields", {}, void 0, true),
        createBaseVNode("div", _hoisted_7$b, [
          createBaseVNode("button", {
            class: "button is-primary",
            part: "button",
            "data-test": "continue-button",
            ref_key: "autofocusButton",
            ref: autofocusButton,
            onClick: withModifiers(checkIdentifier, ["prevent"])
          }, toDisplayString$1(unref(t2)("continue")), 9, _hoisted_8$9)
        ]),
        showWelcomeUI.value ? (openBlock(), createElementBlock("div", _hoisted_9$9, [
          createBaseVNode("a", {
            onClick: withModifiers(switchAccount, ["prevent"]),
            role: "button",
            class: "body-link",
            "data-test": "register-link"
          }, toDisplayString$1(unref(t2)("switch-account")), 9, _hoisted_10$6)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
var ValidatedIdentifierForm = _export_sfc(_sfc_main$v, [["__scopeId", "data-v-1ea7af8c"]]);
var OnEventType = ((OnEventType2) => {
  OnEventType2["onLoaded"] = "onLoaded";
  OnEventType2["onRegisterDevice"] = "onRegisterDevice";
  OnEventType2["onVerifyIdentity"] = "onVerifyIdentity";
  OnEventType2["onMagicLinkLogin"] = "onMagicLinkLogin";
  OnEventType2["onMagicLinkRegister"] = "onMagicLinkRegister";
  OnEventType2["onMagicLinkActivated"] = "onMagicLinkActivated";
  OnEventType2["onMagicLinkActivateSuccess"] = "onMagicLinkActivateSuccess";
  OnEventType2["onOneTimePasscodeLogin"] = "onOneTimePasscodeLogin";
  OnEventType2["onOneTimePasscodeRegister"] = "onOneTimePasscodeRegister";
  OnEventType2["onOneTimePasscodeActivated"] = "onOneTimePasscodeActivated";
  OnEventType2["onOneTimePasscodeActivateSuccess"] = "onOneTimePasscodeActivateSuccess";
  return OnEventType2;
})(OnEventType || {});
var defaultBeforeAuth = () => {
  return true;
};
var defaultOnSuccess = (authResult2) => {
  window.location.href = authResult2.redirect_url;
};
var defaultOnEvent = () => {
  return;
};
var beforeAuth = ref(defaultBeforeAuth);
var onSuccess = ref(defaultOnSuccess);
var onEvent = ref(defaultOnEvent);
function setBeforeAuth(newBeforeAuth) {
  if (newBeforeAuth === void 0) {
    beforeAuth.value = defaultBeforeAuth;
    return;
  }
  beforeAuth.value = newBeforeAuth;
}
function setOnSuccess(newOnSuccess) {
  if (newOnSuccess === void 0) {
    onSuccess.value = defaultOnSuccess;
    return;
  }
  onSuccess.value = newOnSuccess;
}
function setOnEvent(newOnEvent) {
  if (newOnEvent === void 0) {
    onEvent.value = defaultOnEvent;
    return;
  }
  onEvent.value = newOnEvent;
}
function useCallbacks() {
  return {
    beforeAuth: readonly(beforeAuth),
    onSuccess: readonly(onSuccess),
    onEvent: readonly(onEvent),
    setBeforeAuth,
    setOnSuccess,
    setOnEvent
  };
}
var storageKey = "psg_last_login";
function getLastLogin() {
  return localStorage.getItem(storageKey);
}
function storeLastLogin(appInfo, passage, identiferOrUserInfo) {
  return __async2(this, null, function* () {
    if (identiferOrUserInfo && typeof identiferOrUserInfo === "string") {
      localStorage.setItem(storageKey, identiferOrUserInfo);
      return;
    }
    let currentInfo = identiferOrUserInfo;
    if (identiferOrUserInfo === void 0) {
      try {
        currentInfo = yield passage.getCurrentUser().userInfo();
      } catch (err) {
        console.error("Failed to fetch current user, auth token likely missing or invalid", err);
      }
    }
    if (currentInfo === void 0) {
      return;
    }
    let identifierToStore = "";
    switch (appInfo.allowed_identifier) {
      case ce.email:
        identifierToStore = currentInfo.email;
        break;
      case ce.phone:
        identifierToStore = currentInfo.phone;
        break;
      case ce.both:
        identifierToStore = currentInfo.email ? currentInfo.email : currentInfo.phone;
        break;
    }
    localStorage.setItem(storageKey, identifierToStore);
  });
}
function createdUserEventHandler(payload, eventHandlerState) {
  const { appInfo, router, browserFeatures } = eventHandlerState;
  const { identifier: identifier2, identifierType } = payload;
  const { emitEvent: emitEvent2 } = useAuthEvent();
  if (!browserFeatures.securityKey || appInfo.require_identifier_verification) {
    emitEvent2({
      type: AuthEventType.FallbackAuth,
      payload: {
        identifier: identifier2,
        identifierType,
        identifierVerifying: appInfo.require_identifier_verification,
        userIsRegistering: true,
        userInitiated: false
      }
    });
    return;
  }
  useCallbacks().onEvent.value(OnEventType.onRegisterDevice, { identifier: identifier2 });
  router.push(RegisterDeviceRoute, { identifier: identifier2, identifierType, appInfo, browserFeatures });
}
function changeIdenfitierEventHandler(eventHandlerState) {
  const { appInfo, router, browserFeatures } = eventHandlerState;
  router.push(router.homeRoute, { appInfo, conditionalUI: browserFeatures.conditionalUI, changeEmail: true });
}
function isWebauthnGetMonkeypatched() {
  const isGetNative = navigator.credentials.get.toString().includes("[native code]");
  return !isGetNative;
}
function loginUserEventHandler(payload, eventHandlerState, passage) {
  return __async2(this, null, function* () {
    const { browserFeatures, appInfo, router } = eventHandlerState;
    const { emitEvent: emitEvent2 } = useAuthEvent();
    const { identifier: identifier2, identifierType, webauthnTypes, emailVerified, phoneVerified, userID } = payload;
    const noFallback = appInfo.auth_fallback_method === he.None;
    if (webauthnTypes.length === 0 && noFallback) {
      router.push(LoginNotSupportedRoute);
      return;
    }
    const userHasPasskey = webauthnTypes.includes(W.Passkey);
    const userHasPlatform = webauthnTypes.includes(W.Platform);
    const userHasSecurityKey = webauthnTypes.includes(W.SecurityKey);
    const verificationRequired = userNeedsToVerify(appInfo, emailVerified, phoneVerified, identifierType);
    const canTryPlaform = browserFeatures.platform && userHasPlatform && passage.credIDExists(userID);
    const canTryPasskey = (browserFeatures.syncedCredential || browserFeatures.crossDeviceCredential) && userHasPasskey;
    const canTrySecurityKey = browserFeatures.securityKey && userHasSecurityKey;
    const tryWebauthnWithNoFallback = browserFeatures.platform && noFallback;
    const tryNonNativeWebauthn = userHasPasskey && browserFeatures.platform && isWebauthnGetMonkeypatched();
    const canTryWebAuthn = !verificationRequired && (canTryPasskey || canTryPlaform || canTrySecurityKey || tryWebauthnWithNoFallback || tryNonNativeWebauthn);
    if (canTryWebAuthn) {
      useCallbacks().onEvent.value(OnEventType.onVerifyIdentity);
      router.push(WebauthnSignInRoute, { identifier: identifier2, identifierType, appInfo });
    } else {
      emitEvent2({
        type: AuthEventType.FallbackAuth,
        payload: {
          identifier: identifier2,
          identifierType,
          userInitiated: false,
          identifierVerifying: verificationRequired,
          setupNewDevice: browserFeatures.platform
        }
      });
    }
  });
}
function userNeedsToVerify(appInfo, emailVerified, phoneVerified, identifierType) {
  if (appInfo.require_identifier_verification) {
    if (identifierType === IdentifierType.email && !emailVerified || identifierType === IdentifierType.phone && !phoneVerified) {
      return true;
    }
  }
  return false;
}
function fallbackAuthEventHandler(payload, eventHandlerState) {
  const { authState, appInfo, router } = eventHandlerState;
  authState.userInitiatedFallback = payload.userInitiated;
  switch (appInfo.auth_fallback_method) {
    case he.LoginCode:
      otpCallback(payload);
      router.push(OneTimePasscodeRoute, payload);
      break;
    case he.MagicLink:
      magicLinkCallback(payload);
      router.push(MagicLinkRoute, payload);
      break;
    case he.None:
      router.push(DisableFallbacksRoute);
      break;
  }
}
function magicLinkCallback(payload) {
  const { identifier: identifier2, userIsRegistering } = payload;
  if (userIsRegistering) {
    useCallbacks().onEvent.value(OnEventType.onMagicLinkRegister, { identifier: identifier2 });
  } else {
    useCallbacks().onEvent.value(OnEventType.onMagicLinkLogin);
  }
}
function otpCallback(payload) {
  const { identifier: identifier2, userIsRegistering } = payload;
  if (userIsRegistering) {
    useCallbacks().onEvent.value(OnEventType.onOneTimePasscodeRegister, { identifier: identifier2 });
  } else {
    useCallbacks().onEvent.value(OnEventType.onOneTimePasscodeLogin);
  }
}
function authSuccessEventHandler(payload, eventHandlerState, passage) {
  return __async2(this, null, function* () {
    if (isStringNullish(payload.authResult.auth_token) || isStringNullish(payload.authResult.redirect_url)) {
      return;
    }
    yield storeLastLogin(eventHandlerState.appInfo, passage, payload.identifier);
    useCallbacks().onSuccess.value(payload.authResult);
  });
}
function fallbackAuthSuccessEventHandler(payload, eventHandlerState) {
  const { webauthnAllowed, authState, router } = eventHandlerState;
  if (webauthnAllowed && !authState.userInitiatedFallback) {
    router.push(AddDeviceRoute, payload);
    return;
  }
  useAuthEvent().emitEvent({
    type: AuthEventType.AuthSuccess,
    payload
  });
}
function isSafariVersionLessThan164() {
  var _a;
  const userAgent = new UAParser();
  return ((_a = userAgent.getBrowser().name) == null ? void 0 : _a.toLowerCase().includes("safari")) && parseFloat(userAgent.getBrowser().version || "") < 16.4;
}
var AuthEventType = ((AuthEventType2) => {
  AuthEventType2["CreatedUser"] = "CreatedUser";
  AuthEventType2["ChangeIdentifier"] = "ChangeIdentifier";
  AuthEventType2["LoginUser"] = "LoginUser";
  AuthEventType2["FallbackAuth"] = "FallbackAuth";
  AuthEventType2["AuthSuccess"] = "AuthSuccess";
  AuthEventType2["FallbackAuthSuccess"] = "FallbackAuthSuccess";
  return AuthEventType2;
})(AuthEventType || {});
var EventHandler = class {
  constructor(appInfo, router, passage) {
    this.appInfo = appInfo;
    this.router = router;
    this.passage = passage;
    this.authState = {
      userInitiatedFallback: false
    };
    this.authOriginValid = false;
    this.browserFeatures = {
      securityKey: false,
      platform: false,
      syncedCredential: false,
      crossDeviceCredential: false,
      conditionalUI: false,
      isAvailable: false
    };
  }
  initializeEventHandler() {
    return __async2(this, null, function* () {
      this.authOriginValid = this.passage.checkWebauthnConfig(this.appInfo);
      if (this.authOriginValid) {
        this.browserFeatures = yield this.passage.getCredentialAvailable();
        if (isSafariVersionLessThan164()) {
          this.browserFeatures.conditionalUI = false;
        }
      }
      if (!this.checkMagicLink()) {
        this.router.push(this.router.homeRoute, {
          appInfo: this.appInfo,
          conditionalUI: this.browserFeatures.conditionalUI
        });
      }
    });
  }
  handleEvent(event) {
    return __async2(this, null, function* () {
      switch (event.type) {
        case "CreatedUser":
          createdUserEventHandler(event.payload, this.eventHandlerState);
          break;
        case "ChangeIdentifier":
          changeIdenfitierEventHandler(this.eventHandlerState);
          break;
        case "LoginUser":
          loginUserEventHandler(event.payload, this.eventHandlerState, this.passage);
          break;
        case "FallbackAuth":
          fallbackAuthEventHandler(event.payload, this.eventHandlerState);
          break;
        case "AuthSuccess":
          authSuccessEventHandler(event.payload, this.eventHandlerState, this.passage);
          break;
        case "FallbackAuthSuccess":
          fallbackAuthSuccessEventHandler(event.payload, this.eventHandlerState);
          break;
      }
    });
  }
  get eventHandlerState() {
    return {
      appInfo: this.appInfo,
      webauthnAllowed: this.browserFeatures.platform,
      router: this.router,
      authState: this.authState,
      browserFeatures: this.browserFeatures
    };
  }
  checkMagicLink() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let magicLink = null;
    if (urlParams.has("psg_magic_link")) {
      magicLink = urlParams.get("psg_magic_link");
    } else if (urlParams.has("psg_verify_link")) {
      magicLink = urlParams.get("psg_verify_link");
    }
    if (magicLink !== null) {
      this.router.push(ActivateMagicLinkRoute, { magicLink, webauthnAllowed: this.browserFeatures.platform });
      return true;
    }
    return false;
  }
};
var eventHandler = void 0;
function initEventHandler(appInfo, router, passage) {
  return __async2(this, null, function* () {
    eventHandler = new EventHandler(appInfo, router, passage);
    yield eventHandler.initializeEventHandler();
  });
}
function getEventHandler() {
  return eventHandler;
}
function emitEvent(event) {
  return __async2(this, null, function* () {
    return eventHandler == null ? void 0 : eventHandler.handleEvent(event);
  });
}
function useAuthEvent() {
  return {
    initEventHandler,
    getEventHandler,
    emitEvent
  };
}
var _sfc_main$u = defineComponent({
  __name: "Login",
  props: {
    canToggleLoginRegister: { type: Boolean },
    identifier: {},
    countryCode: {},
    appInfo: {},
    visible: { type: Boolean },
    conditionalUI: { type: Boolean },
    changeEmail: { type: Boolean }
  },
  emits: ["update:identifier", "update:countryCode"],
  setup(__props, { emit: emit2 }) {
    const props = __props;
    const { t: t2 } = useLocale();
    const { passage } = usePassage();
    const error = ref("");
    const identifierText = computed({
      get() {
        return props.identifier;
      },
      set(newIdentifier) {
        emit2("update:identifier", newIdentifier);
      }
    });
    const countryCodeText = computed({
      get() {
        return props.countryCode;
      },
      set(newCountryCode) {
        emit2("update:countryCode", newCountryCode);
      }
    });
    const inputForm = ref();
    watch(inputForm, () => __async2(this, null, function* () {
      useCallbacks().onEvent.value(OnEventType.onLoaded);
      triggerConditionalUI();
    }));
    const identifierMode = computed(() => {
      var _a;
      return (_a = props.appInfo.allowed_identifier) != null ? _a : ce.email;
    });
    function onSubmit(event) {
      return __async2(this, null, function* () {
        const {
          identifier: identifier2,
          identifierExists,
          userStatus,
          userID,
          identifierType,
          emailVerified,
          phoneVerified,
          webauthnTypes
        } = event;
        const beforeAuthResult = useCallbacks().beforeAuth.value(identifier2);
        if (!beforeAuthResult) {
          return;
        }
        const errorString = checkIdentifierExistsAndStatus(identifierExists, identifierType, userStatus);
        if (errorString !== "") {
          error.value = errorString;
          return;
        }
        useAuthEvent().emitEvent({
          type: AuthEventType.LoginUser,
          payload: {
            identifier: identifier2,
            identifierType,
            userID,
            emailVerified,
            phoneVerified,
            webauthnTypes
          }
        });
      });
    }
    function checkIdentifierExistsAndStatus(identifierExists, identifierType, userStatus) {
      if (!identifierExists) {
        let identiferString = identifierType === IdentifierType.email ? t2("email") : t2("phone");
        identiferString = `${identiferString.charAt(0).toUpperCase()}${identiferString.slice(1)}`;
        let message = `${t2("not-recognized", [identiferString])}.`;
        if (props.canToggleLoginRegister && props.appInfo.public_signup) {
          message = `${message} ${t2("toggle-register")}`;
        }
        return message;
      }
      if (identifierExists && userStatus === re.INACTIVE) {
        return t2("account-no-longer-active");
      }
      return "";
    }
    const showWelcomeBack = ref(false);
    let abortController;
    onMounted(() => {
      const lastLogin = getLastLogin();
      if (lastLogin && !props.changeEmail) {
        identifierText.value = lastLogin;
        showWelcomeBack.value = true;
      }
    });
    function triggerConditionalUI() {
      return __async2(this, null, function* () {
        if (props.conditionalUI) {
          abortController = new AbortController();
          passage.loginConditional(abortController.signal).then((authResult) => {
            useAuthEvent().emitEvent({
              type: AuthEventType.AuthSuccess,
              payload: {
                authResult
              }
            });
          }).catch(() => {
          });
        }
      });
    }
    function cancelConditionalUI() {
      abortController == null ? void 0 : abortController.abort();
    }
    onBeforeUnmount(() => {
      cancelConditionalUI();
    });
    watch(
      () => props.visible,
      () => {
        if (showWelcomeBack.value === true) {
          identifierText.value = "";
        }
        showWelcomeBack.value = false;
        if (props.visible) {
          triggerConditionalUI();
        } else {
          cancelConditionalUI();
        }
      }
    );
    return (_ctx, _cache) => {
      return openBlock(), createBlock(ValidatedIdentifierForm, {
        identifierMode: identifierMode.value,
        conditionalUI: _ctx.conditionalUI,
        showWelcomeBack: showWelcomeBack.value,
        "onUpdate:showWelcomeBack": _cache[0] || (_cache[0] = ($event) => showWelcomeBack.value = $event),
        identifier: identifierText.value,
        "onUpdate:identifier": _cache[1] || (_cache[1] = ($event) => identifierText.value = $event),
        validationError: error.value,
        "onUpdate:validationError": _cache[2] || (_cache[2] = ($event) => error.value = $event),
        countryCode: countryCodeText.value,
        "onUpdate:countryCode": _cache[3] || (_cache[3] = ($event) => countryCodeText.value = $event),
        onOnSubmit: _cache[4] || (_cache[4] = ($event) => onSubmit($event)),
        ref_key: "inputForm",
        ref: inputForm
      }, {
        loginInput: withCtx(() => [
          renderSlot(_ctx.$slots, "loginInput")
        ]),
        _: 3
      }, 8, ["identifierMode", "conditionalUI", "showWelcomeBack", "identifier", "validationError", "countryCode"]);
    };
  }
});
var _hoisted_1$q = {
  key: 0,
  class: "notification is-danger has-text-centered",
  "data-test": "invalid-app-id"
};
var _sfc_main$t = defineComponent({
  __name: "Register",
  props: {
    canToggleLoginRegister: { type: Boolean },
    identifier: {},
    countryCode: {},
    appInfo: {}
  },
  emits: ["update:identifier", "update:countryCode", "authEvent"],
  setup(__props, { emit: emit2 }) {
    const props = __props;
    const { t: t2 } = useLocale();
    const { passage } = usePassage();
    const { emitEvent: emitEvent2 } = useAuthEvent();
    const error = ref("");
    const identifierText = computed({
      get() {
        return props.identifier;
      },
      set(newIdentifier) {
        emit2("update:identifier", newIdentifier);
      }
    });
    const countryCodeText = computed({
      get() {
        return props.countryCode;
      },
      set(newCountryCode) {
        emit2("update:countryCode", newCountryCode);
      }
    });
    const publicSignup = computed(() => {
      return props.appInfo.public_signup;
    });
    const identifierMode = computed(() => {
      return props.appInfo.allowed_identifier;
    });
    function onSubmit(event) {
      return __async2(this, null, function* () {
        const { identifier: identifier2, identifierExists, userStatus, identifierType } = event;
        const beforeAuthResult = useCallbacks().beforeAuth.value(identifier2);
        if (!beforeAuthResult) {
          return;
        }
        let validMetadata = true;
        if (metadataComponent.value) {
          validMetadata = metadataComponent.value.validate();
        }
        if (identifierExists) {
          if (userStatus === re.ACTIVE) {
            let message = t2("account-already-exists", [
              identifierType === IdentifierType.email ? t2("email") : t2("phone-number")
            ]);
            if (props.canToggleLoginRegister) {
              message = message + " " + t2("toggle-login");
            }
            error.value = message;
            return;
          } else if (userStatus === re.INACTIVE) {
            error.value = t2("account-no-longer-active");
            return;
          }
        }
        if (!validMetadata) {
          return;
        }
        try {
          yield passage.createUser({
            identifier: identifier2,
            user_metadata: transformMetadata(metadata.value, props.appInfo.user_metadata_schema, true)
          });
        } catch (err) {
          if (err instanceof h && err.message.startsWith("Public signup")) {
            error.value = err.message;
          } else {
            error.value = t2("unexpected-error");
          }
          return;
        }
        emitEvent2({
          type: AuthEventType.CreatedUser,
          payload: {
            identifier: identifier2,
            identifierType
          }
        });
      });
    }
    const metadata = ref({});
    const metadataComponent = ref();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(ValidatedIdentifierForm, {
          identifierMode: identifierMode.value,
          identifier: identifierText.value,
          "onUpdate:identifier": _cache[0] || (_cache[0] = ($event) => identifierText.value = $event),
          validationError: error.value,
          "onUpdate:validationError": _cache[1] || (_cache[1] = ($event) => error.value = $event),
          countryCode: countryCodeText.value,
          "onUpdate:countryCode": _cache[2] || (_cache[2] = ($event) => countryCodeText.value = $event),
          onOnSubmit: _cache[3] || (_cache[3] = ($event) => onSubmit($event))
        }, {
          metadataFields: withCtx(() => [
            _ctx.appInfo && _ctx.appInfo.layouts.registration.length > 0 ? (openBlock(), createBlock(UserMetadata, {
              key: 0,
              isEditing: true,
              appInfo: _ctx.appInfo,
              layoutType: unref(LayoutType).Registration,
              userMetadata: metadata.value,
              ref_key: "metadataComponent",
              ref: metadataComponent
            }, null, 8, ["appInfo", "layoutType", "userMetadata"])) : createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["identifierMode", "identifier", "validationError", "countryCode"]),
        !publicSignup.value ? (openBlock(), createElementBlock("div", _hoisted_1$q, toDisplayString$1(unref(t2)("public-registration-not-allowed")), 1)) : createCommentVNode("", true)
      ]);
    };
  }
});
var _hoisted_1$p = {
  key: 0,
  class: "link has-text-centered"
};
var _hoisted_2$h = { class: "passage-branding" };
var _hoisted_3$f = {
  href: "https://passage.1password.com/",
  target: "_new_tab"
};
var _sfc_main$s = defineComponent({
  __name: "PassageBranding",
  props: {
    appInfo: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return _ctx.appInfo.passage_branding ? (openBlock(), createElementBlock("div", _hoisted_1$p, [
        createBaseVNode("div", _hoisted_2$h, [
          createBaseVNode("a", _hoisted_3$f, [
            createVNode(unref(InlineSvg), {
              src: unref(Icons).poweredByPassage,
              alt: "Powered by Passage Icon"
            }, null, 8, ["src"])
          ])
        ])
      ])) : createCommentVNode("", true);
    };
  }
});
var _hoisted_1$o = { class: "view-email-input" };
var _hoisted_2$g = { class: "auth-flex-container" };
var _hoisted_3$e = { class: "title main-title has-text-centered" };
var _hoisted_4$d = createBaseVNode("div", { style: { "height": "20px" } }, null, -1);
var _hoisted_5$c = createBaseVNode("div", { class: "spacer" }, null, -1);
var _hoisted_6$a = { class: "link has-text-centered" };
var _hoisted_7$a = { key: 0 };
var _hoisted_8$8 = ["onClick"];
var _hoisted_9$8 = { key: 1 };
var _hoisted_10$5 = ["onClick"];
var _sfc_main$r = defineComponent({
  __name: "AuthView",
  props: {
    register: { type: Boolean },
    appInfo: {},
    conditionalUI: { type: Boolean },
    changeEmail: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const { t: t2 } = useLocale();
    const showLogin = ref(!props.register);
    const identifier2 = ref("");
    const { defaultCountryCode: defaultCountryCode2 } = useDefaultCountryCode();
    const countryCode = defaultCountryCode2;
    const publicSignup = computed(() => {
      return props.appInfo.public_signup;
    });
    function changeInputPage() {
      showLogin.value = !showLogin.value;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$o, [
        createBaseVNode("div", _hoisted_2$g, [
          createBaseVNode("div", _hoisted_3$e, toDisplayString$1(showLogin.value ? unref(t2)("login-title") : unref(t2)("register-title")), 1),
          _hoisted_4$d,
          withDirectives(createVNode(_sfc_main$u, {
            identifier: identifier2.value,
            "onUpdate:identifier": _cache[0] || (_cache[0] = ($event) => identifier2.value = $event),
            canToggleLoginRegister: true,
            countryCode: unref(countryCode),
            "onUpdate:countryCode": _cache[1] || (_cache[1] = ($event) => isRef(countryCode) ? countryCode.value = $event : null),
            appInfo: _ctx.appInfo,
            visible: showLogin.value,
            conditionalUI: _ctx.conditionalUI,
            changeEmail: _ctx.changeEmail
          }, {
            loginInput: withCtx(() => [
              renderSlot(_ctx.$slots, "loginInput")
            ]),
            _: 3
          }, 8, ["identifier", "countryCode", "appInfo", "visible", "conditionalUI", "changeEmail"]), [
            [vShow, showLogin.value]
          ]),
          withDirectives(createVNode(_sfc_main$t, {
            identifier: identifier2.value,
            "onUpdate:identifier": _cache[2] || (_cache[2] = ($event) => identifier2.value = $event),
            canToggleLoginRegister: true,
            countryCode: unref(countryCode),
            "onUpdate:countryCode": _cache[3] || (_cache[3] = ($event) => isRef(countryCode) ? countryCode.value = $event : null),
            appInfo: _ctx.appInfo
          }, null, 8, ["identifier", "countryCode", "appInfo"]), [
            [vShow, !showLogin.value]
          ]),
          _hoisted_5$c,
          createBaseVNode("div", _hoisted_6$a, [
            showLogin.value && publicSignup.value ? (openBlock(), createElementBlock("div", _hoisted_7$a, [
              createTextVNode(toDisplayString$1(unref(t2)("dont-have-an-account")) + " ", 1),
              createBaseVNode("a", {
                onClick: withModifiers(changeInputPage, ["prevent"]),
                role: "button",
                class: "body-link",
                "data-test": "register-link"
              }, toDisplayString$1(unref(t2)("register-here")), 9, _hoisted_8$8)
            ])) : !showLogin.value ? (openBlock(), createElementBlock("div", _hoisted_9$8, [
              createTextVNode(toDisplayString$1(unref(t2)("already-have-an-account")) + " ", 1),
              createBaseVNode("a", {
                onClick: withModifiers(changeInputPage, ["prevent"]),
                role: "button",
                class: "body-link",
                "data-test": "login-link"
              }, toDisplayString$1(unref(t2)("login-here")), 9, _hoisted_10$5)
            ])) : createCommentVNode("", true)
          ])
        ]),
        createVNode(_sfc_main$s, { "app-info": _ctx.appInfo }, null, 8, ["app-info"])
      ]);
    };
  }
});
function useUIState() {
  const showFailure = ref(false);
  const showSuccess = ref(false);
  const loading = ref(false);
  const pageLoading = ref(true);
  const { t: t2 } = useLocale();
  const title = computed(() => {
    if (showSuccess.value) {
      return t2("success");
    }
    if (showFailure.value) {
      return t2("something-went-wrong");
    }
    return t2("log-in-with-a-passkey");
  });
  const uiSuccess = () => {
    showSuccess.value = true;
    showFailure.value = false;
    loading.value = false;
  };
  const uiError = () => {
    showSuccess.value = false;
    showFailure.value = true;
    loading.value = false;
  };
  const uiLoading = () => {
    showSuccess.value = false;
    showFailure.value = false;
    loading.value = true;
  };
  return {
    showFailure,
    showSuccess,
    loading,
    pageLoading,
    title,
    uiSuccess,
    uiError,
    uiLoading
  };
}
var MagicLinkActionEnum = ((MagicLinkActionEnum2) => {
  MagicLinkActionEnum2["LOGIN"] = "psg_magic_link";
  MagicLinkActionEnum2["VERIFY"] = "psg_verify_link";
  return MagicLinkActionEnum2;
})(MagicLinkActionEnum || {});
var useMagicLinkUtils = (magicLink) => {
  const magicLinkAction = ref();
  const invalidMagicLink = ref(false);
  const isMagicLinkValid = () => {
    const searchParams = new URLSearchParams(window.location.href.split("?")[1]);
    if (searchParams.has("psg_magic_link")) {
      magicLinkAction.value = "psg_magic_link";
    } else if (searchParams.has("psg_verify_link")) {
      magicLinkAction.value = "psg_verify_link";
    }
    if (!magicLinkAction.value || !magicLink) {
      invalidMagicLink.value = true;
    }
    return !invalidMagicLink.value;
  };
  return {
    magicLinkAction,
    invalidMagicLink,
    isMagicLinkValid
  };
};
var useMagicLinkActivation = ({ magicLink, uiState, magicLinkUtils, passage }) => {
  const authResult2 = ref(null);
  const onBeforeActivate = () => {
    uiState.uiLoading();
    authResult2.value = { auth_token: "", redirect_url: "" };
  };
  const onActivateError = () => {
    uiState.uiError();
  };
  const onActivateErrorInvalidMagicLink = () => {
    magicLinkUtils.invalidMagicLink.value = true;
    uiState.uiError();
  };
  const onActivateSuccess = (_0) => __async2(void 0, [_0], function* ({
    webauthnAllowed,
    magicLinkAction,
    result
  }) {
    authResult2.value = result;
    if (!webauthnAllowed || magicLinkAction === MagicLinkActionEnum.VERIFY) {
      uiState.uiSuccess();
      yield new Promise((resolve2) => {
        setTimeout(resolve2, 2e3);
      });
    }
    if (authResult2.value.redirect_url) {
      useAuthEvent().emitEvent({
        type: magicLinkAction === MagicLinkActionEnum.VERIFY ? AuthEventType.AuthSuccess : AuthEventType.FallbackAuthSuccess,
        payload: {
          authResult: result
        }
      });
    }
  });
  const activateWithoutBiometrics = (webauthnAllowed, magicLinkAction) => __async2(void 0, null, function* () {
    onBeforeActivate();
    try {
      const result = yield passage.magicLinkActivate(magicLink);
      onActivateSuccess({ webauthnAllowed, magicLinkAction, result });
    } catch (err) {
      if (err.statusCode === P.NotFound) {
        onActivateErrorInvalidMagicLink();
      } else {
        onActivateError();
      }
    }
  });
  return {
    authResult: authResult2,
    onBeforeActivate,
    onActivateError,
    onActivateErrorInvalidMagicLink,
    onActivateSuccess,
    activateWithoutBiometrics
  };
};
var _hoisted_1$n = { class: "auth-flex-container" };
var _hoisted_2$f = { class: "image has-text-centered" };
var _hoisted_3$d = {
  class: "content has-text-centered",
  "data-test": "activate-magic-link-message"
};
var _hoisted_4$c = { key: 0 };
var _hoisted_5$b = { key: 1 };
var _hoisted_6$9 = { key: 2 };
var _hoisted_7$9 = { key: 3 };
var _hoisted_8$7 = { key: 4 };
var _hoisted_9$7 = {
  key: 0,
  class: "flex-row flex-center",
  style: { "padding": "20px 0px" }
};
var _hoisted_10$4 = ["onClick", "disabled"];
var _hoisted_11$4 = { key: 0 };
var _hoisted_12$4 = { key: 1 };
var _hoisted_13$4 = { key: 2 };
var _sfc_main$q = defineComponent({
  __name: "ActivateMagicLink",
  props: {
    magicLink: {},
    webauthnAllowed: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const { t: t2 } = useLocale();
    const { passage } = usePassage();
    const uiState = useUIState();
    const { showFailure, showSuccess, loading, pageLoading, title } = uiState;
    const magicLinkUtils = useMagicLinkUtils(props.magicLink);
    const { isMagicLinkValid, invalidMagicLink, magicLinkAction } = magicLinkUtils;
    const activation = useMagicLinkActivation({
      uiState,
      magicLinkUtils,
      passage,
      magicLink: props.magicLink
    });
    function onButtonClick() {
      if (invalidMagicLink.value) {
        window.location.href = window.location.href.split("?")[0];
      } else {
        activation.activateWithoutBiometrics(props.webauthnAllowed, magicLinkAction.value);
      }
    }
    onMounted(() => __async2(this, null, function* () {
      if (isMagicLinkValid()) {
        yield activation.activateWithoutBiometrics(props.webauthnAllowed, magicLinkAction.value);
        useCallbacks().onEvent.value(OnEventType.onMagicLinkActivateSuccess);
      } else {
        uiState.uiError();
      }
      pageLoading.value = false;
    }));
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, {
        name: "fade",
        mode: "out-in",
        appear: ""
      }, {
        default: withCtx(() => [
          withDirectives(createBaseVNode("div", _hoisted_1$n, [
            createBaseVNode("div", {
              class: normalizeClass(["title has-text-centered", [unref(showSuccess) ? "main-title" : "secondary-title"]])
            }, toDisplayString$1(unref(showFailure) ? unref(invalidMagicLink) ? unref(t2)("invalid-link") : unref(t2)("device-login-failed-title") : unref(title)), 3),
            createBaseVNode("figure", _hoisted_2$f, [
              unref(showSuccess) ? (openBlock(), createBlock(unref(InlineSvg), {
                key: 0,
                src: unref(Icons).success,
                alt: "Magic link success"
              }, null, 8, ["src"])) : unref(showFailure) ? (openBlock(), createBlock(unref(InlineSvg), {
                key: 1,
                src: unref(Icons).failure,
                alt: "Magic link failure"
              }, null, 8, ["src"])) : createCommentVNode("", true)
            ]),
            createBaseVNode("div", _hoisted_3$d, [
              unref(showSuccess) && unref(magicLinkAction) === unref(MagicLinkActionEnum).LOGIN ? (openBlock(), createElementBlock("div", _hoisted_4$c, toDisplayString$1(unref(t2)("successfully-logged-in-redirect")), 1)) : unref(showSuccess) && unref(magicLinkAction) === unref(MagicLinkActionEnum).VERIFY ? (openBlock(), createElementBlock("div", _hoisted_5$b, toDisplayString$1(unref(t2)("successfully-changed-email")), 1)) : unref(showFailure) && unref(invalidMagicLink) && unref(magicLinkAction) === unref(MagicLinkActionEnum).VERIFY ? (openBlock(), createElementBlock("div", _hoisted_6$9, toDisplayString$1(unref(t2)("link-invalid")), 1)) : unref(showFailure) && unref(invalidMagicLink) ? (openBlock(), createElementBlock("div", _hoisted_7$9, toDisplayString$1(unref(t2)("login-link-invalid")), 1)) : unref(showFailure) && unref(magicLinkAction) === unref(MagicLinkActionEnum).VERIFY ? (openBlock(), createElementBlock("div", _hoisted_8$7, toDisplayString$1(unref(t2)("verification-failed-please-try-again")), 1)) : createCommentVNode("", true)
            ]),
            unref(showFailure) || unref(showSuccess) ? (openBlock(), createElementBlock("div", _hoisted_9$7, [
              createBaseVNode("button", {
                onClick: withModifiers(onButtonClick, ["prevent"]),
                type: "button",
                class: normalizeClass(["button is-primary", { "is-loading": unref(loading) }]),
                part: "button",
                disabled: unref(loading),
                "data-test": "activate-magic-link-button"
              }, [
                unref(showFailure) && unref(invalidMagicLink) ? (openBlock(), createElementBlock("span", _hoisted_11$4, toDisplayString$1(unref(t2)("request-new-link")), 1)) : unref(showFailure) ? (openBlock(), createElementBlock("span", _hoisted_12$4, toDisplayString$1(unref(t2)("try-again")), 1)) : unref(showSuccess) ? (openBlock(), createElementBlock("span", _hoisted_13$4, toDisplayString$1(unref(t2)("redirect-now")), 1)) : createCommentVNode("", true)
              ], 10, _hoisted_10$4)
            ])) : createCommentVNode("", true)
          ], 512), [
            [vShow, !unref(pageLoading)]
          ])
        ]),
        _: 1
      });
    };
  }
});
var _hoisted_1$m = { class: "view-verify-token" };
var _sfc_main$p = defineComponent({
  __name: "ActivateMagicLinkView",
  props: {
    magicLink: {},
    webauthnAllowed: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$m, [
        createVNode(_sfc_main$q, {
          magicLink: _ctx.magicLink,
          webauthnAllowed: _ctx.webauthnAllowed
        }, null, 8, ["magicLink", "webauthnAllowed"])
      ]);
    };
  }
});
var _hoisted_1$l = { class: "view-email-input" };
var _sfc_main$o = defineComponent({
  __name: "LoginView",
  props: {
    register: { type: Boolean },
    appInfo: {},
    conditionalUI: { type: Boolean },
    changeEmail: { type: Boolean }
  },
  setup(__props) {
    const identifier2 = ref("");
    const { defaultCountryCode: defaultCountryCode2 } = useDefaultCountryCode();
    const countryCode = defaultCountryCode2;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$l, [
        createVNode(_sfc_main$u, {
          identifier: identifier2.value,
          "onUpdate:identifier": _cache[0] || (_cache[0] = ($event) => identifier2.value = $event),
          countryCode: unref(countryCode),
          "onUpdate:countryCode": _cache[1] || (_cache[1] = ($event) => isRef(countryCode) ? countryCode.value = $event : null),
          canToggleLoginRegister: false,
          appInfo: _ctx.appInfo,
          conditionalUI: _ctx.conditionalUI,
          changeEmail: _ctx.changeEmail
        }, {
          loginInput: withCtx(() => [
            renderSlot(_ctx.$slots, "loginInput")
          ]),
          _: 3
        }, 8, ["identifier", "countryCode", "appInfo", "conditionalUI", "changeEmail"]),
        createVNode(_sfc_main$s, { "app-info": _ctx.appInfo }, null, 8, ["app-info"])
      ]);
    };
  }
});
var _hoisted_1$k = { class: "view-email-input" };
var _sfc_main$n = defineComponent({
  __name: "RegisterView",
  props: {
    register: { type: Boolean },
    appInfo: {}
  },
  setup(__props) {
    const identifier2 = ref("");
    const { defaultCountryCode: defaultCountryCode2 } = useDefaultCountryCode();
    const countryCode = defaultCountryCode2;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$k, [
        createVNode(_sfc_main$t, {
          identifier: identifier2.value,
          "onUpdate:identifier": _cache[0] || (_cache[0] = ($event) => identifier2.value = $event),
          countryCode: unref(countryCode),
          "onUpdate:countryCode": _cache[1] || (_cache[1] = ($event) => isRef(countryCode) ? countryCode.value = $event : null),
          canToggleLoginRegister: false,
          appInfo: _ctx.appInfo
        }, null, 8, ["identifier", "countryCode", "appInfo"]),
        createVNode(_sfc_main$s, { "app-info": _ctx.appInfo }, null, 8, ["app-info"])
      ]);
    };
  }
});
var _sfc_main$m = defineComponent({
  name: "Spinner"
});
var _hoisted_1$j = { class: "spinner-box" };
var _hoisted_2$e = { class: "spinner-content" };
function _sfc_render3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$j, [
    createBaseVNode("div", _hoisted_2$e, [
      renderSlot(_ctx.$slots, "default")
    ])
  ]);
}
var Spinner = _export_sfc(_sfc_main$m, [["render", _sfc_render3]]);
var _hoisted_1$i = { class: "auth-flex-container" };
var _hoisted_2$d = { class: "title has-text-centered" };
var _hoisted_3$c = {
  key: 0,
  class: "content has-text-centered",
  style: { "margin-bottom": "15px !important" }
};
var _hoisted_4$b = ["innerHTML"];
var _hoisted_5$a = { class: "flex-row flex-center" };
var _hoisted_6$8 = ["onClick", "disabled"];
var _hoisted_7$8 = createBaseVNode("div", { class: "spacer" }, null, -1);
var _hoisted_8$6 = { class: "link has-text-centered" };
var _hoisted_9$6 = ["onClick"];
var _sfc_main$l = defineComponent({
  __name: "MagicLink",
  props: {
    identifier: {},
    userIsRegistering: { type: Boolean },
    identifierVerifying: { type: Boolean },
    setupNewDevice: { type: Boolean },
    identifierType: {}
  },
  setup(__props) {
    const props = __props;
    const { t: t2, locale } = useLocale();
    const { passage } = usePassage();
    const { emitEvent: emitEvent2 } = useAuthEvent();
    const isEmail2 = computed(() => {
      return props.identifierType === IdentifierType.email;
    });
    const title = computed(() => {
      if (props.identifierVerifying) {
        if (isEmail2.value) {
          if (props.userIsRegistering) {
            return t2("verify-email-to-register");
          } else {
            return t2("verify-email-to-login");
          }
        } else {
          if (props.userIsRegistering) {
            return t2("verify-phone-to-register");
          } else {
            return t2("verify-phone-to-login");
          }
        }
      } else {
        if (isEmail2.value) {
          if (props.userIsRegistering) {
            return t2("check-email-to-register");
          } else {
            return t2("check-email-to-login");
          }
        } else {
          if (props.userIsRegistering) {
            return t2("check-phone-to-register");
          } else {
            return t2("check-phone-to-login");
          }
        }
      }
    });
    const message = computed(() => {
      let messageValue = "";
      const messageType = props.identifierType === IdentifierType.email ? t2("messagetype-email") : t2("messagetype-sms");
      const messageMedium = props.identifierType === IdentifierType.email ? t2("email") : t2("phone-number");
      const registrationType = props.userIsRegistering ? t2("registration") : t2("login");
      const loginMessage = props.identifierVerifying ? t2("please-verify-identifier", [messageMedium, registrationType]) : t2("you-will-be-automatically-signed-in");
      messageValue = t2("weve-sent-messagetype", [messageType, props.identifier, loginMessage]);
      if (props.setupNewDevice && !props.userIsRegistering) {
        messageValue = t2("we-dont-recognize-this-device") + " " + messageValue;
      }
      return messageValue;
    });
    onMounted(() => {
      if (props.userIsRegistering) {
        magicLinkSendRegister();
      } else {
        magicLinkSendLogin();
      }
    });
    function changeEmail() {
      localStorage.removeItem("email");
      localStorage.removeItem("magic_link_id");
      localStorage.removeItem("wait_count");
      waitForActivatedMagicLink(721);
      emitEvent2({ type: AuthEventType.ChangeIdentifier, payload: void 0 });
    }
    function resendMagicLink() {
      return __async2(this, null, function* () {
        yield magicLinkSendLogin();
      });
    }
    const showWaiting = ref(false);
    const loading = ref(true);
    function magicLinkSendRegister() {
      return __async2(this, null, function* () {
        showWaiting.value = false;
        loading.value = true;
        yield new Promise((resolve2) => {
          setTimeout(resolve2, 2e3);
        });
        try {
          const res = yield passage.newRegisterMagicLink(props.identifier, locale.value.split("-")[0]);
          if (res.id != "") {
            localStorage.setItem("magic_link_id", res.id);
            waitForActivatedMagicLink(0);
          }
        } catch (err) {
          console.log("magicLinkSend error", err);
        } finally {
          loading.value = false;
        }
      });
    }
    function magicLinkSendLogin() {
      return __async2(this, null, function* () {
        showWaiting.value = false;
        loading.value = true;
        try {
          const res = yield passage.newLoginMagicLink(props.identifier, locale.value.split("-")[0]);
          if (res.id != "") {
            localStorage.setItem("magic_link_id", res.id);
            waitForActivatedMagicLink(0);
          }
        } catch (err) {
          console.log("magicLinkSend error", err);
        } finally {
          yield new Promise((resolve2) => {
            setTimeout(resolve2, 3e3);
          });
          loading.value = false;
        }
      });
    }
    let authResult = void 0;
    function lookupMagicLink() {
      return __async2(this, null, function* () {
        const id = localStorage.getItem("magic_link_id");
        yield lookupMagicLinkActivated(id).then(() => __async2(this, null, function* () {
          if (authResult && authResult.redirect_url != "") {
            localStorage.removeItem("magic_link_id");
            localStorage.removeItem("wait_count");
            useCallbacks().onEvent.value(OnEventType.onMagicLinkActivated);
            emitEvent2({
              type: AuthEventType.FallbackAuthSuccess,
              payload: {
                identifier: props.identifier,
                authResult
              }
            });
          }
        }));
      });
    }
    function lookupMagicLinkActivated(id) {
      return __async2(this, null, function* () {
        yield passage.getMagicLinkStatus(id).then((res) => {
          waitForActivatedMagicLink(721);
          authResult = res;
        }).catch(() => {
        });
        return;
      });
    }
    let timer;
    function waitForActivatedMagicLink(count) {
      let i = count;
      if (i < 720) {
        showWaiting.value = true;
        timer = setTimeout(() => __async2(this, null, function* () {
          delay(i);
          i++;
          waitForActivatedMagicLink(i);
        }), 5e3);
      } else {
        clearTimeout(timer);
        showWaiting.value = false;
        return;
      }
    }
    function delay(i) {
      lookupMagicLink();
      localStorage.setItem("wait_count", i.toString());
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$i, [
        createBaseVNode("div", _hoisted_2$d, [
          createBaseVNode("span", null, toDisplayString$1(title.value), 1)
        ]),
        createVNode(Spinner, null, {
          default: withCtx(() => [
            isEmail2.value ? (openBlock(), createBlock(unref(InlineSvg), {
              key: 0,
              src: unref(Icons).email,
              alt: "Email envelope"
            }, null, 8, ["src"])) : (openBlock(), createBlock(unref(InlineSvg), {
              key: 1,
              src: unref(Icons).phone,
              alt: "Message bubbles"
            }, null, 8, ["src"]))
          ]),
          _: 1
        }),
        message.value ? (openBlock(), createElementBlock("div", _hoisted_3$c, [
          createBaseVNode("span", { innerHTML: message.value }, null, 8, _hoisted_4$b)
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_5$a, [
          createBaseVNode("button", {
            onClick: withModifiers(resendMagicLink, ["prevent"]),
            type: "button",
            class: "button is-primary",
            part: "button",
            disabled: loading.value
          }, toDisplayString$1(unref(t2)("resend-isemail-email-message", [isEmail2.value ? unref(t2)("email") : unref(t2)("message")])), 9, _hoisted_6$8)
        ]),
        _hoisted_7$8,
        createBaseVNode("div", _hoisted_8$6, [
          createBaseVNode("a", {
            onClick: withModifiers(changeEmail, ["prevent"]),
            role: "button",
            "data-test": "change-email-button"
          }, toDisplayString$1(unref(t2)("change-isemail-email-phone", [isEmail2.value ? unref(t2)("email") : unref(t2)("phone")])), 9, _hoisted_9$6)
        ])
      ]);
    };
  }
});
var _hoisted_1$h = { class: "view-access-token" };
var _sfc_main$k = defineComponent({
  __name: "MagicLinkView",
  props: {
    identifier: {},
    userIsRegistering: { type: Boolean },
    identifierVerifying: { type: Boolean },
    setupNewDevice: { type: Boolean },
    identifierType: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$h, [
        createVNode(_sfc_main$l, {
          identifier: _ctx.identifier,
          userIsRegistering: _ctx.userIsRegistering,
          identifierVerifying: _ctx.identifierVerifying,
          setupNewDevice: _ctx.setupNewDevice,
          identifierType: _ctx.identifierType
        }, null, 8, ["identifier", "userIsRegistering", "identifierVerifying", "setupNewDevice", "identifierType"])
      ]);
    };
  }
});
var _hoisted_1$g = { class: "passage-learnmore-modal" };
var _hoisted_2$c = { class: "passage-learnmore-top" };
var _hoisted_3$b = { class: "passage-learnmore-close-button" };
var _hoisted_4$a = { class: "passage-learnmore-content" };
var _hoisted_5$9 = { style: { "margin-bottom": "32px" } };
var _sfc_main$j = defineComponent({
  __name: "LearnMoreLayout",
  setup(__props) {
    const { t: t2 } = useLocale();
    const showModal = ref(false);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        showModal.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "passage-learnmore",
          onClick: _cache[1] || (_cache[1] = ($event) => showModal.value = false)
        }, [
          createBaseVNode("div", _hoisted_1$g, [
            createBaseVNode("div", _hoisted_2$c, [
              createBaseVNode("div", {
                style: { "cursor": "pointer" },
                onClick: _cache[0] || (_cache[0] = ($event) => showModal.value = false)
              }, [
                createBaseVNode("span", _hoisted_3$b, toDisplayString$1(unref(t2)("close")), 1),
                createVNode(unref(InlineSvg), {
                  src: unref(Icons).close
                }, null, 8, ["src"])
              ])
            ]),
            createBaseVNode("div", _hoisted_4$a, [
              renderSlot(_ctx.$slots, "body")
            ])
          ])
        ])) : createCommentVNode("", true),
        createBaseVNode("div", null, [
          createBaseVNode("div", _hoisted_5$9, [
            createBaseVNode("span", null, [
              renderSlot(_ctx.$slots, "cta"),
              createTextVNode("   ")
            ]),
            createBaseVNode("a", {
              style: { "text-decoration": "underline" },
              onClick: _cache[2] || (_cache[2] = ($event) => showModal.value = true),
              role: "button"
            }, toDisplayString$1(unref(t2)("learn-more")), 1),
            createTextVNode(" → ")
          ])
        ])
      ], 64);
    };
  }
});
var _hoisted_1$f = { style: { "margin-bottom": "12px" } };
var _hoisted_2$b = { class: "passage-learnmore-header" };
var _hoisted_3$a = { class: "passage-learnmore-body" };
var _hoisted_4$9 = { class: "passage-learnmore-header" };
var _hoisted_5$8 = { class: "passage-learnmore-body" };
var _hoisted_6$7 = { class: "passage-learnmore-header" };
var _hoisted_7$7 = { class: "passage-learnmore-body" };
var _sfc_main$i = defineComponent({
  __name: "LearnMorePasskey",
  props: {
    cta: {}
  },
  setup(__props) {
    const { t: t2 } = useLocale();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$j, null, {
        cta: withCtx(() => [
          createBaseVNode("div", _hoisted_1$f, toDisplayString$1(unref(t2)("passkeys-are-a-simple")), 1),
          createTextVNode(" " + toDisplayString$1(_ctx.cta), 1)
        ]),
        body: withCtx(() => [
          createBaseVNode("div", _hoisted_2$b, [
            createVNode(unref(InlineSvg), {
              src: unref(Icons).privateIcon,
              style: { "margin-right": "8px" }
            }, null, 8, ["src"]),
            createTextVNode(" " + toDisplayString$1(unref(t2)("private")), 1)
          ]),
          createBaseVNode("div", _hoisted_3$a, toDisplayString$1(unref(t2)("unlock-your-passkey")), 1),
          createBaseVNode("div", _hoisted_4$9, [
            createVNode(unref(InlineSvg), {
              src: unref(Icons).secure,
              style: { "margin-right": "8px" }
            }, null, 8, ["src"]),
            createTextVNode(" " + toDisplayString$1(unref(t2)("secure")), 1)
          ]),
          createBaseVNode("div", _hoisted_5$8, toDisplayString$1(unref(t2)("passkey-is-unique")), 1),
          createBaseVNode("div", _hoisted_6$7, [
            createVNode(unref(InlineSvg), {
              src: unref(Icons).simple,
              style: { "margin-right": "8px" }
            }, null, 8, ["src"]),
            createTextVNode(" " + toDisplayString$1(unref(t2)("simple")), 1)
          ]),
          createBaseVNode("div", _hoisted_7$7, toDisplayString$1(unref(t2)("easy-to-use")), 1)
        ]),
        _: 1
      });
    };
  }
});
var _hoisted_1$e = {
  class: "auth-flex-container",
  "data-tag": "register-device-message"
};
var _hoisted_2$a = { class: "title secondary-title has-text-centered" };
var _hoisted_3$9 = { class: "image has-text-centered" };
var _hoisted_4$8 = { key: 0 };
var _hoisted_5$7 = { key: 1 };
var _hoisted_6$6 = { key: 1 };
var _hoisted_7$6 = { style: { "margin-bottom": "12px" } };
var _hoisted_8$5 = { style: { "margin-bottom": "22px" } };
var _hoisted_9$5 = { key: 2 };
var _hoisted_10$3 = { style: { "margin-bottom": "32px" } };
var _hoisted_11$3 = {
  key: 2,
  class: "flex-row flex-center"
};
var _hoisted_12$3 = ["onClick", "disabled"];
var _hoisted_13$3 = ["onClick", "disabled"];
var _hoisted_14$3 = {
  key: 3,
  class: "flex-column flex-center",
  style: { "margin": "auto" }
};
var _hoisted_15$3 = ["onClick", "disabled"];
var _hoisted_16$3 = ["onClick", "disabled"];
var _hoisted_17$2 = createBaseVNode("div", { class: "spacer" }, null, -1);
var _hoisted_18$1 = {
  key: 4,
  class: "content has-text-centered",
  style: { "margin-top": "20px !important" }
};
var _hoisted_19$1 = { class: "link" };
var _hoisted_20$1 = ["onClick"];
var _hoisted_21$1 = { class: "link" };
var _hoisted_22$1 = ["onClick"];
var _hoisted_23$1 = {
  key: 0,
  class: "link"
};
var _hoisted_24$1 = ["onClick"];
var _sfc_main$h = defineComponent({
  __name: "RegisterDevice",
  props: {
    identifier: {},
    identifierType: {},
    appInfo: {},
    browserFeatures: {}
  },
  setup(__props) {
    const props = __props;
    const showFailure = ref(false);
    const loading = ref(false);
    const { t: t2, te: te2 } = useLocale();
    const { passage } = usePassage();
    const { emitEvent: emitEvent2 } = useAuthEvent();
    const { autofocusButton } = useAutofocusButton();
    const supportsPlatform = computed(() => {
      return props.browserFeatures.platform;
    });
    const supportsCrossPlatform = computed(() => {
      return props.browserFeatures.securityKey;
    });
    const isEmail2 = computed(() => {
      return props.identifierType === IdentifierType.email;
    });
    const fallbackAuth = computed(() => {
      var _a;
      return (_a = props.appInfo.auth_fallback_method) != null ? _a : he.MagicLink;
    });
    const supportsFallback = computed(() => {
      return props.appInfo.auth_fallback_method !== he.None;
    });
    const fallbackRegisterWithCodeEmailOrTextBtnCopy = computed(() => {
      if (fallbackAuth.value === he.LoginCode) {
        return te2("register-with-code") ? t2("register-with-code") : "Register with a code";
      } else {
        return t2("register-with-link", [isEmail2.value ? t2("email") : t2("sms-text")]);
      }
    });
    const fallbackSendCodeEmailOrTextBtnCopy = computed(() => {
      if (fallbackAuth.value === he.LoginCode) {
        return te2("send-code") ? t2("send-code") : "Send code";
      } else {
        return t2("send-email-or-text-link", [isEmail2.value ? t2("email") : t2("sms-text")]);
      }
    });
    const failureCreateText = computed(() => {
      switch (props.appInfo.auth_fallback_method) {
        case he.LoginCode:
          return te2("passkey-create-fail-try-code") ? t2("passkey-create-fail-try-code") : "Unable to create a passkey. Try again or register with a one-time code.";
        case he.MagicLink:
          return t2("passkey-create-fail-try-link");
        case he.None:
          return t2("passkey-create-fail-no-fallback");
      }
    });
    let previousAttachment = E.Platform;
    function signUpWebAuthn(identifier2, authenticatorAttachment) {
      return __async2(this, null, function* () {
        loading.value = true;
        try {
          previousAttachment = authenticatorAttachment;
          const authResult = yield passage.register(identifier2, { authenticatorAttachment });
          loading.value = false;
          emitEvent2({
            type: AuthEventType.AuthSuccess,
            payload: {
              authResult,
              identifier: props.identifier
            }
          });
        } catch (err) {
          showFailure.value = true;
          loading.value = false;
        }
      });
    }
    function registerWithFallback() {
      emitEvent2({
        type: AuthEventType.FallbackAuth,
        payload: {
          identifier: props.identifier,
          identifierType: props.identifierType,
          userIsRegistering: true,
          userInitiated: true
        }
      });
    }
    function changeEmail() {
      localStorage.removeItem("email");
      useAuthEvent().emitEvent({ type: AuthEventType.ChangeIdentifier, payload: void 0 });
    }
    function primaryRegister() {
      if (supportsPlatform.value === true) {
        signUpWebAuthn(props.identifier, E.Platform);
      } else {
        signUpWebAuthn(props.identifier, E.CrossPlatform);
      }
    }
    function secondaryRegister() {
      signUpWebAuthn(props.identifier, E.CrossPlatform);
    }
    function tryAgain() {
      signUpWebAuthn(props.identifier, previousAttachment);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$e, [
        createBaseVNode("div", _hoisted_2$a, toDisplayString$1(supportsPlatform.value ? unref(t2)("register-with-a-passkey") : unref(t2)("register-passkey-another-device")), 1),
        createBaseVNode("figure", _hoisted_3$9, [
          createVNode(unref(InlineSvg), {
            src: unref(Icons).passkey,
            alt: "Register with a passkey"
          }, null, 8, ["src"])
        ]),
        showFailure.value ? (openBlock(), createElementBlock("div", _hoisted_4$8, [
          createBaseVNode("p", null, toDisplayString$1(failureCreateText.value), 1)
        ])) : (openBlock(), createElementBlock("div", _hoisted_5$7, [
          supportsPlatform.value && !supportsCrossPlatform.value ? (openBlock(), createBlock(_sfc_main$i, {
            key: 0,
            cta: unref(t2)("register-your-account")
          }, null, 8, ["cta"])) : createCommentVNode("", true),
          supportsPlatform.value && supportsCrossPlatform.value ? (openBlock(), createElementBlock("div", _hoisted_6$6, [
            createBaseVNode("div", _hoisted_7$6, toDisplayString$1(unref(t2)("passkeys-are-a-simple")), 1),
            createBaseVNode("div", _hoisted_8$5, toDisplayString$1(unref(t2)("passkey-register-options")), 1)
          ])) : createCommentVNode("", true),
          !supportsPlatform.value && supportsCrossPlatform.value ? (openBlock(), createElementBlock("div", _hoisted_9$5, [
            createBaseVNode("div", _hoisted_10$3, toDisplayString$1(unref(t2)("passkeys-not-supported-try-another-device")), 1)
          ])) : createCommentVNode("", true)
        ])),
        showFailure.value ? (openBlock(), createElementBlock("div", _hoisted_11$3, [
          createBaseVNode("button", {
            onClick: withModifiers(tryAgain, ["prevent"]),
            type: "button",
            part: "button",
            class: "button is-primary",
            disabled: loading.value,
            style: { "margin-right": "5px" }
          }, toDisplayString$1(unref(t2)("try-again")), 9, _hoisted_12$3),
          _ctx.appInfo.auth_fallback_method !== unref(he).None ? (openBlock(), createElementBlock("button", {
            key: 0,
            onClick: withModifiers(registerWithFallback, ["prevent"]),
            type: "button",
            part: "button button-secondary",
            class: "button is-secondary",
            disabled: loading.value,
            style: { "margin-left": "5px" },
            "data-test": "login-with-email-button",
            ref_key: "autofocusButton",
            ref: autofocusButton
          }, toDisplayString$1(fallbackSendCodeEmailOrTextBtnCopy.value), 9, _hoisted_13$3)) : createCommentVNode("", true)
        ])) : (openBlock(), createElementBlock("div", _hoisted_14$3, [
          createBaseVNode("button", {
            onClick: withModifiers(primaryRegister, ["prevent"]),
            type: "button",
            class: normalizeClass(["button", [{ "is-loading": loading.value }]]),
            part: "button",
            disabled: loading.value,
            "data-test": "register-main-button",
            tabindex: "0",
            ref_key: "autofocusButton",
            ref: autofocusButton,
            style: { "margin-top": "0px" }
          }, [
            createBaseVNode("span", null, toDisplayString$1(supportsPlatform.value ? unref(t2)("register-with-passkey") : unref(t2)("use-another-device")), 1)
          ], 10, _hoisted_15$3),
          supportsPlatform.value && supportsCrossPlatform.value ? (openBlock(), createElementBlock("button", {
            key: 0,
            onClick: withModifiers(secondaryRegister, ["prevent"]),
            type: "button",
            class: normalizeClass(["button is-secondary", [{ "is-loading": loading.value }]]),
            part: "button button-secondary",
            style: { "width": "100%" },
            disabled: loading.value,
            "data-test": "register-secondary-button",
            tabindex: "0",
            ref_key: "autofocusButton",
            ref: autofocusButton
          }, [
            createBaseVNode("span", null, toDisplayString$1(unref(t2)("use-another-device")), 1)
          ], 10, _hoisted_16$3)) : createCommentVNode("", true)
        ])),
        _hoisted_17$2,
        showFailure.value ? (openBlock(), createElementBlock("div", _hoisted_18$1, [
          createBaseVNode("div", _hoisted_19$1, [
            createBaseVNode("a", {
              onClick: withModifiers(changeEmail, ["prevent"]),
              role: "button",
              "data-test": "change-email-button"
            }, toDisplayString$1(unref(t2)("change-isemail-email-phone", [isEmail2.value ? unref(t2)("email") : unref(t2)("phone")])), 9, _hoisted_20$1)
          ])
        ])) : createCommentVNode("", true),
        !showFailure.value ? (openBlock(), createElementBlock("div", {
          key: 5,
          class: normalizeClass(["flex-row flex-wrap", supportsFallback.value ? "flex-between" : "flex-center"])
        }, [
          createBaseVNode("div", _hoisted_21$1, [
            createBaseVNode("a", {
              onClick: withModifiers(changeEmail, ["prevent"]),
              role: "button",
              "data-test": "change-email-button"
            }, toDisplayString$1(unref(t2)("back")), 9, _hoisted_22$1)
          ]),
          supportsFallback.value ? (openBlock(), createElementBlock("div", _hoisted_23$1, [
            createBaseVNode("a", {
              onClick: withModifiers(registerWithFallback, ["prevent"]),
              role: "button",
              "data-test": "register-email-button"
            }, toDisplayString$1(fallbackRegisterWithCodeEmailOrTextBtnCopy.value), 9, _hoisted_24$1)
          ])) : createCommentVNode("", true)
        ], 2)) : createCommentVNode("", true)
      ]);
    };
  }
});
var _sfc_main$g = defineComponent({
  __name: "RegisterDeviceView",
  props: {
    identifier: {},
    identifierType: {},
    appInfo: {},
    browserFeatures: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$h, normalizeProps(guardReactiveProps(props)), null, 16);
    };
  }
});
var _hoisted_1$d = { class: "auth-flex-container" };
var _hoisted_2$9 = { class: "title has-text-centered" };
var _hoisted_3$8 = {
  class: "image has-text-centered",
  style: { "margin": "5px auto" }
};
var _hoisted_4$7 = {
  key: 1,
  class: "wrap-text",
  style: { "margin-bottom": "5px !important" }
};
var _hoisted_5$6 = { "data-test": "failure-message" };
var _hoisted_6$5 = {
  key: 2,
  class: "flex-row flex-center"
};
var _hoisted_7$5 = ["onClick", "disabled"];
var _hoisted_8$4 = ["onClick", "disabled"];
var _hoisted_9$4 = createBaseVNode("div", { class: "spacer" }, null, -1);
var _hoisted_10$2 = {
  key: 3,
  class: "content has-text-centered",
  style: { "margin-top": "20px !important" }
};
var _hoisted_11$2 = { class: "link" };
var _hoisted_12$2 = ["onClick"];
var _hoisted_13$2 = { class: "link" };
var _hoisted_14$2 = ["onClick"];
var _hoisted_15$2 = {
  key: 0,
  class: "link"
};
var _hoisted_16$2 = ["onClick"];
var _sfc_main$f = defineComponent({
  __name: "WebauthnSignIn",
  props: {
    identifier: {},
    identifierType: {},
    appInfo: {}
  },
  setup(__props) {
    const props = __props;
    const showFailure = ref(false);
    const loading = ref(false);
    const { t: t2, te: te2 } = useLocale();
    const { passage } = usePassage();
    const { emitEvent: emitEvent2 } = useAuthEvent();
    const isEmail2 = computed(() => {
      return props.identifierType === IdentifierType.email;
    });
    const { autofocusButton } = useAutofocusButton();
    const fallbackAuth = computed(() => {
      var _a;
      return (_a = props.appInfo.auth_fallback_method) != null ? _a : he.MagicLink;
    });
    const supportsFallback = computed(() => {
      return props.appInfo.auth_fallback_method !== he.None;
    });
    const fallbackSendCodeEmailOrTextBtnCopy = computed(() => {
      if (fallbackAuth.value === he.LoginCode) {
        return te2("send-code") ? t2("send-code") : "Send code";
      } else {
        return t2("send-email-or-text-link", [isEmail2.value ? t2("email") : t2("sms-text")]);
      }
    });
    const loginWithCodeEmailOrTextBtnCopy = computed(() => {
      if (fallbackAuth.value === he.LoginCode) {
        return te2("login-with-code") ? t2("login-with-code") : "Login with a code";
      } else {
        return t2("login-with-link", [isEmail2.value ? t2("email") : t2("sms-text")]);
      }
    });
    const failureLoginText = computed(() => {
      switch (props.appInfo.auth_fallback_method) {
        case he.LoginCode:
          return te2("passkey-login-fail-try-code") ? t2("passkey-login-fail-try-code") : "Unable to log in with a passkey. Try again or log in with a one-time code.";
        case he.MagicLink:
          return t2("passkey-login-fail-try-link");
        case he.None:
          return t2("passkey-login-fail-no-fallback");
      }
    });
    function signInWebAuthn() {
      return __async2(this, null, function* () {
        showFailure.value = false;
        if (!props.identifier) {
          return;
        }
        loading.value = true;
        try {
          const authResult = yield passage.login(props.identifier);
          emitEvent2({
            type: AuthEventType.AuthSuccess,
            payload: {
              authResult,
              identifier: props.identifier
            }
          });
          loading.value = false;
        } catch (err) {
          const error = err;
          showFailure.value = true;
          loading.value = false;
          if (error.statusCode === P.PSGParsePublicKeyForLoginFailed) {
            showFailure.value = true;
          } else {
            emitEvent2({
              type: AuthEventType.FallbackAuth,
              payload: {
                identifier: props.identifier,
                identifierType: props.identifierType,
                userInitiated: false
              }
            });
          }
        }
      });
    }
    function loginWithFallback() {
      emitEvent2({
        type: AuthEventType.FallbackAuth,
        payload: {
          identifier: props.identifier,
          identifierType: props.identifierType,
          userInitiated: true
        }
      });
    }
    function changeEmail() {
      localStorage.removeItem("email");
      emitEvent2({
        type: AuthEventType.ChangeIdentifier,
        payload: void 0
      });
    }
    onMounted(() => {
      signInWebAuthn();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$d, [
        createBaseVNode("div", _hoisted_2$9, toDisplayString$1(unref(t2)("log-in-with-a-passkey")), 1),
        createBaseVNode("figure", _hoisted_3$8, [
          createVNode(unref(InlineSvg), {
            src: unref(Icons).passkey,
            alt: "Log in with a passkey",
            style: { "margin": "5px" }
          }, null, 8, ["src"])
        ]),
        !showFailure.value ? (openBlock(), createBlock(_sfc_main$i, {
          key: 0,
          cta: unref(t2)("log-into-your-account")
        }, null, 8, ["cta"])) : showFailure.value ? (openBlock(), createElementBlock("div", _hoisted_4$7, [
          createBaseVNode("div", _hoisted_5$6, [
            createBaseVNode("p", null, toDisplayString$1(failureLoginText.value), 1)
          ])
        ])) : createCommentVNode("", true),
        showFailure.value ? (openBlock(), createElementBlock("div", _hoisted_6$5, [
          createBaseVNode("button", {
            onClick: withModifiers(signInWebAuthn, ["prevent"]),
            type: "button",
            part: "button",
            class: "button is-primary",
            disabled: loading.value,
            style: { "margin-right": "5px" }
          }, toDisplayString$1(unref(t2)("try-again")), 9, _hoisted_7$5),
          _ctx.appInfo.auth_fallback_method !== unref(he).None ? (openBlock(), createElementBlock("button", {
            key: 0,
            onClick: withModifiers(loginWithFallback, ["prevent"]),
            type: "button",
            part: "button button-secondary",
            class: "button is-secondary",
            disabled: loading.value,
            style: { "margin-left": "5px" },
            "data-test": "login-with-email-button",
            ref_key: "autofocusButton",
            ref: autofocusButton
          }, toDisplayString$1(fallbackSendCodeEmailOrTextBtnCopy.value), 9, _hoisted_8$4)) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        _hoisted_9$4,
        showFailure.value ? (openBlock(), createElementBlock("div", _hoisted_10$2, [
          createBaseVNode("div", _hoisted_11$2, [
            createBaseVNode("a", {
              onClick: withModifiers(changeEmail, ["prevent"]),
              role: "button",
              "data-test": "change-email-button"
            }, toDisplayString$1(unref(t2)("change-isemail-email-phone", [isEmail2.value ? unref(t2)("email") : unref(t2)("phone")])), 9, _hoisted_12$2)
          ])
        ])) : createCommentVNode("", true),
        !showFailure.value ? (openBlock(), createElementBlock("div", {
          key: 4,
          class: normalizeClass(["flex-row flex-wrap", supportsFallback.value ? "flex-between" : "flex-center"])
        }, [
          createBaseVNode("div", _hoisted_13$2, [
            createBaseVNode("a", {
              onClick: withModifiers(changeEmail, ["prevent"]),
              role: "button",
              "data-test": "change-email-button"
            }, toDisplayString$1(unref(t2)("back")), 9, _hoisted_14$2)
          ]),
          supportsFallback.value ? (openBlock(), createElementBlock("div", _hoisted_15$2, [
            createBaseVNode("a", {
              onClick: withModifiers(loginWithFallback, ["prevent"]),
              role: "button",
              "data-test": "register-email-button"
            }, toDisplayString$1(loginWithCodeEmailOrTextBtnCopy.value), 9, _hoisted_16$2)
          ])) : createCommentVNode("", true)
        ], 2)) : createCommentVNode("", true)
      ]);
    };
  }
});
var _hoisted_1$c = { class: "view-webauthn-sign-in" };
var _sfc_main$e = defineComponent({
  __name: "WebauthnSignInView",
  props: {
    identifier: {},
    identifierType: {},
    appInfo: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$c, [
        createVNode(_sfc_main$f, {
          identifier: _ctx.identifier,
          identifierType: _ctx.identifierType,
          appInfo: _ctx.appInfo
        }, null, 8, ["identifier", "identifierType", "appInfo"])
      ]);
    };
  }
});
var _hoisted_1$b = {
  style: { "display": "flex", "align-items": "center" },
  class: "psg-otp-single-input-container"
};
var _hoisted_2$8 = ["data-test", "type", "inputtype", "placeholder", "inputmode", "disabled", "maxlength", "autocomplete"];
var _hoisted_3$7 = { key: 0 };
var _hoisted_4$6 = ["innerHTML"];
var _sfc_main$d = defineComponent({
  __name: "OneTimePasscodeSingleInput",
  props: {
    conditionalClass: {},
    focus: { type: Boolean },
    inputClasses: { default: () => [] },
    inputmode: { default: "numeric" },
    inputType: { default: "number" },
    isDisabled: { type: Boolean },
    isLastChild: { type: Boolean },
    placeholder: {},
    separator: { default: "" },
    shouldAutoFocus: { type: Boolean, default: false },
    value: { default: "" },
    isFirstChild: { type: Boolean },
    inputIdx: {},
    inputCount: {}
  },
  emits: ["on-change", "on-keydown", "on-paste", "on-focus", "on-blur"],
  setup(__props, { emit: emit2 }) {
    const props = __props;
    const model = ref(props.value || "");
    const input = ref(null);
    const inputTypeValue = computed(() => {
      return props.inputType === "letter-numeric" ? "text" : props.inputType;
    });
    const handleOnChange = () => {
      model.value = model.value.toString();
      if (model.value.length > 1) {
        model.value = model.value.slice(0, 1);
      }
      return emit2("on-change", model.value);
    };
    const isCodeLetter = (charCode) => charCode >= 65 && charCode <= 90;
    const isCodeNumeric = (charCode) => charCode >= 48 && charCode <= 57 || charCode >= 96 && charCode <= 105;
    const handleOnKeyDown = (event) => {
      if (props.isDisabled) {
        event.preventDefault();
      }
      const keyEvent = event || window.event;
      const charCode = keyEvent.which ? keyEvent.which : keyEvent.keyCode;
      if (isCodeNumeric(charCode) || props.inputType === "letter-numeric" && isCodeLetter(charCode) || [8, 9, 13, 37, 39, 46, 86].includes(charCode)) {
        emit2("on-keydown", event);
      } else {
        keyEvent.preventDefault();
      }
    };
    const handleOnPaste = (event) => emit2("on-paste", event);
    const handleOnFocus = () => {
      input.value.select();
      return emit2("on-focus");
    };
    const handleOnBlur = () => emit2("on-blur");
    watch(
      () => props.value,
      (newValue, oldValue) => {
        if (newValue !== oldValue) {
          model.value = newValue;
        }
      }
    );
    watch(
      () => props.focus,
      (newFocusValue, oldFocusValue) => {
        if (oldFocusValue !== newFocusValue && input.value && props.focus) {
          input.value.focus();
          input.value.select();
        }
      }
    );
    onMounted(() => {
      if (input.value && props.focus && props.shouldAutoFocus) {
        input.value.focus();
        input.value.select();
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$b, [
        withDirectives(createBaseVNode("input", {
          "data-test": `otp-single-input-${_ctx.inputIdx}`,
          type: inputTypeValue.value,
          inputtype: inputTypeValue.value,
          placeholder: _ctx.placeholder,
          inputmode: _ctx.inputmode,
          disabled: _ctx.isDisabled,
          ref_key: "input",
          ref: input,
          pattern: "[0-9]*",
          maxlength: _ctx.isFirstChild ? _ctx.inputCount : 1,
          min: "0",
          max: "9",
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => model.value = $event),
          class: normalizeClass(["psg-input", "psg-otp-input", [..._ctx.inputClasses || []]]),
          onInput: handleOnChange,
          onKeydown: handleOnKeyDown,
          onPaste: handleOnPaste,
          onFocus: handleOnFocus,
          onBlur: handleOnBlur,
          autocomplete: _ctx.isFirstChild ? "one-time-code" : "off"
        }, null, 42, _hoisted_2$8), [
          [vModelDynamic, model.value]
        ]),
        !_ctx.isLastChild && _ctx.separator ? (openBlock(), createElementBlock("span", _hoisted_3$7, [
          createBaseVNode("span", { innerHTML: _ctx.separator }, null, 8, _hoisted_4$6)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
var _hoisted_1$a = {
  style: { "display": "flex", "justify-content": "space-between" },
  class: "psg-otp-input-container"
};
var _hoisted_2$7 = {
  key: 0,
  autocomplete: "off",
  name: "hidden",
  type: "text",
  style: { "display": "none" }
};
var _sfc_main$c = defineComponent({
  __name: "OneTimePasscodeInput",
  props: {
    value: { default: "" },
    numInputs: { default: 6 },
    separator: { default: "" },
    inputClasses: {},
    conditionalClass: { default: () => [] },
    inputType: { default: "number" },
    inputmode: { default: "numeric" },
    shouldAutoFocus: { type: Boolean, default: false },
    placeholder: { default: () => [] },
    isDisabled: { type: Boolean, default: false },
    disableNonCurrent: { type: Boolean, default: false }
  },
  emits: ["update:value", "on-complete", "on-change"],
  setup(__props, { emit: emit2 }) {
    const props = __props;
    const activeInput = ref(0);
    const otp = ref([]);
    const oldOtp = ref([]);
    watch(
      () => props.value,
      (val) => {
        const fill = (unref(val) || "").padEnd(props.numInputs, " ").split("");
        otp.value = fill;
      },
      { immediate: true }
    );
    const handleOnFocus = (index) => {
      activeInput.value = index;
    };
    const handleOnBlur = () => {
      activeInput.value = -1;
    };
    const checkFilledAllInputs = () => {
      if (otp.value.join("").length === props.numInputs) {
        emit2("update:value", otp.value.join(""));
        return emit2("on-complete", otp.value.join(""));
      }
      return "Wait until the user enters the required number of characters";
    };
    const focusInput = (input) => {
      activeInput.value = Math.max(Math.min(props.numInputs - 1, input), 0);
    };
    const focusNextInput = () => {
      if (props.disableNonCurrent) {
        setTimeout(() => {
          focusInput(activeInput.value + 1);
        }, 200);
      } else {
        focusInput(activeInput.value + 1);
      }
    };
    const focusPrevInput = () => {
      focusInput(activeInput.value - 1);
    };
    const changeCodeAtFocus = (value) => {
      oldOtp.value = Object.assign([], otp.value);
      otp.value[activeInput.value] = value;
      if (oldOtp.value.join("") !== otp.value.join("")) {
        emit2("update:value", otp.value.join(""));
        emit2("on-change", otp.value.join(""));
      }
    };
    const handleOnPaste = (event) => {
      var _a;
      event.preventDefault();
      const pastedData = (_a = event.clipboardData) == null ? void 0 : _a.getData("text/plain").slice(0, props.numInputs - activeInput.value).split("");
      if (props.inputType === "number" && !(pastedData == null ? void 0 : pastedData.join("").match(/^\d+$/))) {
        return "Invalid pasted data";
      }
      if (props.inputType === "letter-numeric" && !(pastedData == null ? void 0 : pastedData.join("").match(/^\w+$/))) {
        return "Invalid pasted data";
      }
      const currentCharsInOTP = otp.value.slice(0, activeInput.value);
      const combinedWithPastedData = currentCharsInOTP.concat(pastedData || "");
      combinedWithPastedData.slice(0, props.numInputs).forEach((value, i) => {
        otp.value[i] = value;
      });
      focusInput(combinedWithPastedData.slice(0, props.numInputs).length);
      return checkFilledAllInputs();
    };
    const handleOnChange = (value) => {
      changeCodeAtFocus(value);
      focusNextInput();
    };
    const handleOnKeyDown = (event) => {
      switch (event.keyCode) {
        case 8:
          event.preventDefault();
          changeCodeAtFocus("");
          focusPrevInput();
          break;
        case 46:
          event.preventDefault();
          changeCodeAtFocus("");
          break;
        case 37:
          event.preventDefault();
          focusPrevInput();
          break;
        case 39:
          event.preventDefault();
          focusNextInput();
          break;
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$a, [
        _ctx.inputType === "password" ? (openBlock(), createElementBlock("input", _hoisted_2$7)) : createCommentVNode("", true),
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.numInputs, (_2, i) => {
          return openBlock(), createBlock(_sfc_main$d, {
            key: i,
            focus: activeInput.value === i,
            value: otp.value[i],
            separator: _ctx.separator,
            "input-type": _ctx.inputType,
            inputmode: _ctx.inputmode,
            "input-classes": _ctx.inputClasses,
            conditionalClass: _ctx.conditionalClass[i],
            "is-last-child": i === _ctx.numInputs - 1,
            "is-first-child": i === 0,
            "should-auto-focus": _ctx.shouldAutoFocus,
            placeholder: _ctx.placeholder[i],
            "is-disabled": _ctx.isDisabled || _ctx.disableNonCurrent && i > otp.value.join("").trim().length,
            "input-idx": i,
            "input-count": _ctx.numInputs,
            onOnChange: handleOnChange,
            onOnKeydown: handleOnKeyDown,
            onOnPaste: handleOnPaste,
            onOnFocus: ($event) => handleOnFocus(i),
            onOnBlur: handleOnBlur
          }, null, 8, ["focus", "value", "separator", "input-type", "inputmode", "input-classes", "conditionalClass", "is-last-child", "is-first-child", "should-auto-focus", "placeholder", "is-disabled", "input-idx", "input-count", "onOnFocus"]);
        }), 128))
      ]);
    };
  }
});
var _hoisted_1$9 = { class: "auth-flex-container" };
var _hoisted_2$62 = {
  class: "flex flex-column",
  style: { "flex-grow": "1" }
};
var _hoisted_3$6 = { class: "title has-text-centered" };
var _hoisted_4$5 = { class: "content wrap-text" };
var _hoisted_5$5 = { style: { "margin-top": "32px", "margin-bottom": "40px" } };
var _hoisted_6$4 = ["innerHTML"];
var _hoisted_7$4 = { class: "flex flex-row flex-center" };
var _hoisted_8$3 = {
  class: "flex-row",
  style: { "margin-top": "8px" }
};
var _hoisted_9$3 = {
  class: "error-message",
  style: { "min-height": "17px" }
};
var _hoisted_10$1 = {
  class: "flex-row flex-center",
  style: { "margin-top": "16px" }
};
var _hoisted_11$1 = ["onClick", "disabled"];
var _hoisted_12$1 = createBaseVNode("div", { class: "spacer" }, null, -1);
var _hoisted_13$1 = { class: "flex-row flex-wrap flex-between" };
var _hoisted_14$1 = { class: "link" };
var _hoisted_15$1 = ["onClick"];
var _hoisted_16$1 = { class: "link" };
var _hoisted_17$1 = ["onClick"];
var numInputs = 6;
var disableInputsOnSendCodeError = false;
var _sfc_main$b = defineComponent({
  __name: "OneTimePasscode",
  props: {
    identifier: {},
    userIsRegistering: { type: Boolean },
    identifierVerifying: { type: Boolean },
    setupNewDevice: { type: Boolean },
    identifierType: {}
  },
  setup(__props) {
    const props = __props;
    const { t: t2, te: te2, locale } = useLocale();
    const loading = ref(true);
    const oneTimePasscode = ref(void 0);
    const errorWithOneTimePasscode = ref(false);
    const errorSendingOneTimePasscode = ref(false);
    const errorMessage = ref(void 0);
    const otpId = ref(void 0);
    const title = computed(() => {
      return te2("enter-code") ? t2("enter-code", {}) : "Enter code";
    });
    const message = computed(() => {
      return te2("enter-code-sent") ? t2("enter-code-sent", [props.identifier]) : `A one-time code has been sent to <span style="font-weight: 700;">${props.identifier}</span>. Enter the code here to log in.`;
    });
    const btnGoBackText = computed(() => {
      return te2("back") ? t2("back") : "Back";
    });
    const btnResendText = computed(() => {
      return te2("resend-code") ? t2("resend-code") : "Resend code";
    });
    const oneTimePasscodeInputClasses = computed(() => {
      return errorWithOneTimePasscode.value ? ["has-error"] : [];
    });
    const oneTimePasscodeInputsDisabled = computed(() => {
      return disableInputsOnSendCodeError;
    });
    const continueBtnDisabled = computed(() => {
      return loading.value;
    });
    watch(oneTimePasscode, () => {
      var _a;
      _resetErrorState();
      if (((_a = oneTimePasscode.value) == null ? void 0 : _a.trim().length) === numInputs) {
        activateOneTimePasscode();
      }
    });
    const { passage } = usePassage();
    const sendOneTimePasscode = (isRegistering = false) => __async2(this, null, function* () {
      _resetLoadingState();
      _resetErrorState();
      _resetOneTimePasscode();
      loading.value = true;
      try {
        const res = isRegistering ? yield passage.newRegisterOneTimePasscode(props.identifier, locale.value.split("-")[0]) : yield passage.newLoginOneTimePasscode(props.identifier, locale.value.split("-")[0]);
        if (res.otp_id != "") {
          localStorage.setItem("otp_id", res.otp_id);
          otpId.value = res.otp_id;
        }
      } catch (err) {
        setError(te2("code-send-error") ? t2("code-send-error") : "An error occurred sending the code.", true);
      } finally {
        loading.value = false;
      }
    });
    const activateOneTimePasscode = () => __async2(this, null, function* () {
      _resetLoadingState();
      _resetErrorState();
      loading.value = true;
      try {
        if (!oneTimePasscode.value) {
          throw new Error("Login code is undefined.");
        }
        if (oneTimePasscode.value.length !== numInputs) {
          throw new Error("Login code is invalid length.");
        }
        if (!otpId.value) {
          throw new Error("Login code id is undefined.");
        }
        const result = yield passage.oneTimePasscodeActivate(oneTimePasscode.value, otpId.value);
        if (result && result.redirect_url != "") {
          localStorage.removeItem("otp_id");
          useCallbacks().onEvent.value(OnEventType.onOneTimePasscodeActivated);
          useAuthEvent().emitEvent({
            type: AuthEventType.FallbackAuthSuccess,
            payload: {
              identifier: props.identifier,
              authResult: result
            }
          });
        }
      } catch (err) {
        setError(
          te2("code-invalid-or-expired") ? t2("code-invalid-or-expired") : "Code is invalid or expired. Please try again."
        );
      } finally {
        loading.value = false;
      }
    });
    const onGoBackClicked = () => {
      useAuthEvent().emitEvent({ type: AuthEventType.ChangeIdentifier, payload: void 0 });
    };
    const onResendCodeClicked = () => {
      sendOneTimePasscode();
    };
    const onSubmitClicked = () => {
      activateOneTimePasscode();
    };
    onMounted(() => {
      sendOneTimePasscode(props.userIsRegistering);
      moveInput();
    });
    onBeforeUnmount(() => {
      cleanupInput();
    });
    const _resetLoadingState = () => {
      loading.value = true;
    };
    const _resetErrorState = () => {
      errorMessage.value = void 0;
      errorWithOneTimePasscode.value = false;
      errorSendingOneTimePasscode.value = false;
    };
    const _resetOneTimePasscode = () => {
      oneTimePasscode.value = void 0;
    };
    const setError = (message2, sending = false) => {
      errorMessage.value = message2;
      errorWithOneTimePasscode.value = !sending;
      errorSendingOneTimePasscode.value = sending;
    };
    const otpInput = ref();
    function moveInput() {
      const parent = otpInput.value.getRootNode().host;
      otpInput.value.appendChild(otcStyles());
      parent.appendChild(otpInput.value);
    }
    function cleanupInput() {
      otpInput.value.remove();
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$9, [
        createBaseVNode("form", _hoisted_2$62, [
          createBaseVNode("div", _hoisted_3$6, [
            createBaseVNode("span", null, toDisplayString$1(title.value), 1)
          ]),
          createBaseVNode("div", _hoisted_4$5, [
            createBaseVNode("div", _hoisted_5$5, [
              createBaseVNode("p", { innerHTML: message.value }, null, 8, _hoisted_6$4)
            ])
          ]),
          createBaseVNode("div", _hoisted_7$4, [
            createBaseVNode("div", {
              ref_key: "otpInput",
              ref: otpInput,
              slot: "otpInput"
            }, [
              createVNode(_sfc_main$c, {
                "num-inputs": numInputs,
                "is-disabled": oneTimePasscodeInputsDisabled.value,
                value: oneTimePasscode.value,
                "onUpdate:value": _cache[0] || (_cache[0] = ($event) => oneTimePasscode.value = $event),
                "input-classes": oneTimePasscodeInputClasses.value,
                "disable-non-current": false
              }, null, 8, ["is-disabled", "value", "input-classes"])
            ], 512),
            renderSlot(_ctx.$slots, "otpInput")
          ]),
          createBaseVNode("div", _hoisted_8$3, [
            createBaseVNode("div", _hoisted_9$3, toDisplayString$1(errorMessage.value ? errorMessage.value : " "), 1)
          ]),
          createBaseVNode("div", _hoisted_10$1, [
            createBaseVNode("button", {
              type: "submit",
              class: "button is-primary",
              part: "button",
              "data-test": "continue-button",
              onClick: withModifiers(onSubmitClicked, ["prevent"]),
              disabled: continueBtnDisabled.value
            }, toDisplayString$1(unref(t2)("continue")), 9, _hoisted_11$1)
          ]),
          _hoisted_12$1,
          createBaseVNode("div", _hoisted_13$1, [
            createBaseVNode("div", _hoisted_14$1, [
              createBaseVNode("a", {
                onClick: withModifiers(onGoBackClicked, ["prevent"]),
                role: "button",
                "data-test": "one-time-passcode-goback-button"
              }, toDisplayString$1(btnGoBackText.value), 9, _hoisted_15$1)
            ]),
            createBaseVNode("div", _hoisted_16$1, [
              createBaseVNode("a", {
                onClick: withModifiers(onResendCodeClicked, ["prevent"]),
                role: "button",
                "data-test": "one-time-passcode-resend-button"
              }, toDisplayString$1(btnResendText.value), 9, _hoisted_17$1)
            ])
          ])
        ])
      ]);
    };
  }
});
var _hoisted_1$8 = { class: "view-access-token" };
var _sfc_main$a = defineComponent({
  __name: "OneTimePasscodeView",
  props: {
    identifier: {},
    userIsRegistering: { type: Boolean },
    identifierVerifying: { type: Boolean },
    setupNewDevice: { type: Boolean },
    identifierType: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$8, [
        createVNode(_sfc_main$b, {
          identifier: _ctx.identifier,
          userIsRegistering: _ctx.userIsRegistering,
          identifierVerifying: _ctx.identifierVerifying,
          setupNewDevice: _ctx.setupNewDevice,
          identifierType: _ctx.identifierType
        }, {
          otpInput: withCtx(() => [
            renderSlot(_ctx.$slots, "otpInput")
          ]),
          _: 3
        }, 8, ["identifier", "userIsRegistering", "identifierVerifying", "setupNewDevice", "identifierType"])
      ]);
    };
  }
});
var _hoisted_1$72 = {
  class: "title has-text-centered secondary-title",
  "data-test": "activate-magic-link-message"
};
var _hoisted_2$52 = { class: "image has-text-centered" };
var _hoisted_3$52 = { key: 0 };
var _hoisted_4$42 = {
  class: "flex-row flex-center",
  style: { "padding": "20px 0px" }
};
var _hoisted_5$42 = ["onClick", "disabled"];
var _hoisted_6$3 = { key: 0 };
var _hoisted_7$3 = { key: 1 };
var _hoisted_8$2 = {
  key: 2,
  class: "link has-text-centered"
};
var _hoisted_9$2 = ["onClick"];
var _sfc_main$9 = defineComponent({
  __name: "AddDevice",
  props: {
    authResult: {},
    identifier: {}
  },
  setup(__props) {
    const props = __props;
    const { t: t2 } = useLocale();
    const showFailure = ref(false);
    const showSuccess = ref(false);
    const newDevice = ref();
    const { addDevice, addPending } = useAddDevice();
    const { autofocusButton } = useAutofocusButton();
    const title = computed(() => {
      if (showFailure.value) {
        return t2("something-went-wrong");
      } else {
        return t2("add-passkey");
      }
    });
    function onButtonClick() {
      return __async2(this, null, function* () {
        var _a;
        newDevice.value = yield addDevice();
        if ((_a = newDevice.value) == null ? void 0 : _a.id) {
          showSuccess.value = true;
          showFailure.value = false;
          finishAuth();
        } else {
          showFailure.value = true;
          showSuccess.value = false;
        }
      });
    }
    const finishAuth = () => {
      useAuthEvent().emitEvent({
        type: AuthEventType.AuthSuccess,
        payload: {
          identifier: props.identifier,
          authResult: props.authResult
        }
      });
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1$72, toDisplayString$1(title.value), 1),
        createBaseVNode("figure", _hoisted_2$52, [
          showFailure.value ? (openBlock(), createBlock(unref(InlineSvg), {
            key: 0,
            src: unref(Icons).fingerprintFailed,
            alt: "Device failure"
          }, null, 8, ["src"])) : (openBlock(), createBlock(unref(InlineSvg), {
            key: 1,
            src: unref(Icons).passkey,
            alt: "Add a passkey",
            style: { "margin": "5px" }
          }, null, 8, ["src"]))
        ]),
        showFailure.value ? (openBlock(), createElementBlock("div", _hoisted_3$52, toDisplayString$1(unref(t2)("failed-to-add-this-device")), 1)) : (openBlock(), createBlock(_sfc_main$i, {
          key: 1,
          cta: unref(t2)("log-into-your-account")
        }, null, 8, ["cta"])),
        createBaseVNode("div", _hoisted_4$42, [
          createBaseVNode("button", {
            onClick: withModifiers(onButtonClick, ["prevent"]),
            type: "button",
            class: normalizeClass(["button is-primary", { "is-loading": unref(addPending) }]),
            part: "button",
            disabled: unref(addPending),
            "data-test": "save-device-button",
            ref_key: "autofocusButton",
            ref: autofocusButton
          }, [
            showFailure.value ? (openBlock(), createElementBlock("span", _hoisted_6$3, toDisplayString$1(unref(t2)("try-again")), 1)) : (openBlock(), createElementBlock("span", _hoisted_7$3, toDisplayString$1(unref(t2)("add-passkey")), 1))
          ], 10, _hoisted_5$42)
        ]),
        !showSuccess.value ? (openBlock(), createElementBlock("div", _hoisted_8$2, [
          createBaseVNode("div", null, [
            createBaseVNode("a", {
              onClick: withModifiers(finishAuth, ["prevent"]),
              role: "button",
              "data-test": "add-device-skip"
            }, toDisplayString$1(unref(t2)("skip")), 9, _hoisted_9$2)
          ])
        ])) : createCommentVNode("", true)
      ], 64);
    };
  }
});
var _hoisted_1$62 = { class: "view-add-device" };
var _sfc_main$8 = defineComponent({
  __name: "AddDeviceView",
  props: {
    authResult: {},
    identifier: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$62, [
        createVNode(_sfc_main$9, {
          authResult: _ctx.authResult,
          identifier: _ctx.identifier
        }, null, 8, ["authResult", "identifier"])
      ]);
    };
  }
});
var _hoisted_1$52 = {
  class: "wrap-text",
  style: { "margin-bottom": "12px !important" }
};
var _hoisted_2$42 = { class: "passage-learnmore-header" };
var _hoisted_3$42 = { class: "passage-learnmore-body" };
var _hoisted_4$32 = { class: "passage-learnmore-header" };
var _hoisted_5$32 = { class: "passage-learnmore-body" };
var _sfc_main$72 = defineComponent({
  __name: "LearnMoreDisabledFallbacks",
  setup(__props) {
    const { t: t2 } = useLocale();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$j, null, {
        cta: withCtx(() => [
          createBaseVNode("div", _hoisted_1$52, toDisplayString$1(unref(t2)("passkeys-are-required")) + toDisplayString$1(" "), 1),
          createTextVNode(" " + toDisplayString$1(unref(t2)("try-again-on-device-with-passkeys")), 1)
        ]),
        body: withCtx(() => [
          createBaseVNode("div", _hoisted_2$42, toDisplayString$1(unref(t2)("what-are-passkeys")), 1),
          createBaseVNode("div", _hoisted_3$42, toDisplayString$1(unref(t2)("passkeys-are-a-simpler-and-more-secure-alternative")), 1),
          createBaseVNode("div", _hoisted_4$32, toDisplayString$1(unref(t2)("devices-that-support-passkeys")), 1),
          createBaseVNode("div", _hoisted_5$32, toDisplayString$1(unref(t2)("devices-with-a-biometric-sensor-are-likely-to-support-passkeys")), 1)
        ]),
        _: 1
      });
    };
  }
});
var _hoisted_1$42 = { class: "auth-flex-container" };
var _hoisted_2$32 = { class: "title has-text-centered" };
var _hoisted_3$32 = {
  class: "image has-text-centered",
  style: { "margin": "5px auto" }
};
var _hoisted_4$22 = createBaseVNode("div", { class: "spacer" }, null, -1);
var _hoisted_5$22 = { class: "flex-row flex-wrap flex-center" };
var _hoisted_6$2 = { class: "link" };
var _hoisted_7$2 = ["onClick"];
var _sfc_main$62 = defineComponent({
  __name: "DisableFallbacks",
  setup(__props) {
    const { t: t2 } = useLocale();
    const { emitEvent: emitEvent2 } = useAuthEvent();
    function changeEmail() {
      localStorage.removeItem("email");
      emitEvent2({
        type: AuthEventType.ChangeIdentifier,
        payload: void 0
      });
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$42, [
        createBaseVNode("div", _hoisted_2$32, toDisplayString$1(unref(t2)("device-not-supported")), 1),
        createBaseVNode("figure", _hoisted_3$32, [
          createVNode(unref(InlineSvg), {
            src: unref(Icons).passkeyArrow,
            alt: "Device not supported",
            style: { "margin": "5px" }
          }, null, 8, ["src"])
        ]),
        createVNode(_sfc_main$72),
        _hoisted_4$22,
        createBaseVNode("div", _hoisted_5$22, [
          createBaseVNode("div", _hoisted_6$2, [
            createBaseVNode("a", {
              onClick: withModifiers(changeEmail, ["prevent"]),
              role: "button",
              "data-test": "change-email-button"
            }, toDisplayString$1(unref(t2)("back")), 9, _hoisted_7$2)
          ])
        ])
      ]);
    };
  }
});
var _sfc_main$52 = defineComponent({
  __name: "DisableFallbackView",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$62);
    };
  }
});
var _hoisted_1$32 = { class: "auth-flex-container" };
var _hoisted_2$22 = { class: "title has-text-centered" };
var _hoisted_3$22 = {
  class: "image has-text-centered",
  style: { "margin": "5px auto" }
};
var _hoisted_4$12 = {
  class: "wrap-text",
  style: { "margin-bottom": "12px !important" }
};
var _hoisted_5$12 = { class: "wrap-text" };
var _hoisted_6$1 = createBaseVNode("div", { class: "spacer" }, null, -1);
var _hoisted_7$1 = { class: "flex-row flex-wrap flex-center" };
var _hoisted_8$1 = { class: "link" };
var _hoisted_9$1 = ["onClick"];
var _sfc_main$42 = defineComponent({
  __name: "LoginNotSupported",
  setup(__props) {
    const { t: t2 } = useLocale();
    const { emitEvent: emitEvent2 } = useAuthEvent();
    function changeEmail() {
      localStorage.removeItem("email");
      emitEvent2({
        type: AuthEventType.ChangeIdentifier,
        payload: void 0
      });
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$32, [
        createBaseVNode("div", _hoisted_2$22, toDisplayString$1(unref(t2)("login-not-supported")), 1),
        createBaseVNode("figure", _hoisted_3$22, [
          createVNode(unref(InlineSvg), {
            src: unref(Icons).passkeyArrow,
            alt: "Device not supported",
            style: { "margin": "5px" }
          }, null, 8, ["src"])
        ]),
        createBaseVNode("div", _hoisted_4$12, toDisplayString$1(unref(t2)("passkeys-are-now-required")), 1),
        createBaseVNode("div", _hoisted_5$12, toDisplayString$1(unref(t2)("please-contact-support-to-regain-access")), 1),
        _hoisted_6$1,
        createBaseVNode("div", _hoisted_7$1, [
          createBaseVNode("div", _hoisted_8$1, [
            createBaseVNode("a", {
              onClick: withModifiers(changeEmail, ["prevent"]),
              role: "button",
              "data-test": "change-email-button"
            }, toDisplayString$1(unref(t2)("back")), 9, _hoisted_9$1)
          ])
        ])
      ]);
    };
  }
});
var _sfc_main$32 = defineComponent({
  __name: "LoginNotSupportedView",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$42);
    };
  }
});
var AuthRoute = {
  component: _sfc_main$r
};
var RegisterRoute = {
  component: _sfc_main$n
};
var RegisterDeviceRoute = {
  component: _sfc_main$g
};
var MagicLinkRoute = {
  component: _sfc_main$k
};
var WebauthnSignInRoute = {
  component: _sfc_main$e
};
var ActivateMagicLinkRoute = {
  component: _sfc_main$p
};
var OneTimePasscodeRoute = {
  component: _sfc_main$a
};
var AddDeviceRoute = {
  component: _sfc_main$8
};
var DisableFallbacksRoute = {
  component: _sfc_main$52
};
var LoginNotSupportedRoute = {
  component: _sfc_main$32
};
var ELEMENT_CUSTOMIZATION_FIELD_TO_CSS_VAR_NAME = {
  passage_container_background_color: "--passage-container-background-color-default",
  passage_container_max_width: "--passage-container-max-width-default",
  passage_input_box_background_color: "--passage-input-box-background-color-default",
  passage_input_box_border_radius: "--passage-input-box-border-radius-default",
  passage_header_font_family: "--passage-header-font-family-default",
  passage_body_font_family: "--passage-body-font-family-default",
  passage_header_text_color: "--passage-header-text-color-default",
  passage_body_text_color: "--passage-body-text-color-default",
  passage_primary_button_background_color: "--passage-primary-button-background-color-default",
  passage_primary_button_text_color: "--passage-primary-button-text-color-default",
  passage_primary_button_hover_color: "--passage-primary-button-background-hover-color-default",
  passage_primary_button_border_radius: "--passage-primary-button-border-radius-default",
  passage_primary_button_border_color: "--passage-primary-button-border-color-default",
  passage_primary_button_border_width: "--passage-primary-button-border-width-default",
  passage_secondary_button_background_color: "--passage-secondary-button-background-color-default",
  passage_secondary_button_text_color: "-passage-secondary-button-text-color-default",
  passage_secondary_button_hover_color: "--passage-secondary-button-background-hover-color-default",
  passage_secondary_button_border_radius: "--passage-secondary-button-border-radius-default",
  passage_secondary_button_border_color: "--passage-secondary-button-border-color-default",
  passage_secondary_button_border_width: "--passage-secondary-button-border-width-default"
};
var PIXEL_ELEMENT_CUSTOMIZATION_FIELDS = {
  passage_container_max_width: "passage_container_max_width",
  passage_input_box_border_radius: "passage_input_box_border_radius",
  passage_primary_button_border_radius: "passage_primary_button_border_radius",
  passage_primary_button_border_width: "passage_primary_button_border_width",
  passage_secondary_button_border_radius: "passage_secondary_button_border_radius",
  passage_secondary_button_border_width: "passage_secondary_button_border_width"
};
function transformToPixelString(cssValue) {
  return `${cssValue}px`;
}
function useElementCustomization() {
  const setCustomElementStyles = (authContainerRef, elementCustomization) => {
    Object.entries(elementCustomization).forEach((entry) => {
      const [cssAttribute, cssValue] = entry;
      let transformedCssValue = cssValue;
      if (Object.values(PIXEL_ELEMENT_CUSTOMIZATION_FIELDS).includes(cssAttribute)) {
        transformedCssValue = transformToPixelString(cssValue);
      }
      authContainerRef.style.setProperty(
        ELEMENT_CUSTOMIZATION_FIELD_TO_CSS_VAR_NAME[cssAttribute],
        transformedCssValue
      );
    });
  };
  return {
    setCustomElementStyles
  };
}
var Router = class {
  constructor(homeRoute) {
    this._homeRoute = AuthRoute;
    this._history = [];
    if (homeRoute !== void 0) {
      this._homeRoute = homeRoute;
    }
  }
  get homeRoute() {
    return this._homeRoute;
  }
  set homeRoute(homeRoute) {
    this._homeRoute = homeRoute;
  }
  get currentRoute() {
    if (this._history.length === 0) {
      return void 0;
    }
    return this._history[this._history.length - 1];
  }
  push(route, props) {
    this._history.push(__spreadProps3(__spreadValues3({}, route), { props }));
  }
  resetRouter() {
    this._history = [];
  }
};
var _hoisted_1$22 = { class: "debug-router" };
var _hoisted_2$12 = createBaseVNode("div", { class: "section-label" }, "View", -1);
var _hoisted_3$12 = createBaseVNode("div", { class: "section-label" }, "Props", -1);
var _hoisted_42 = { key: 0 };
var _hoisted_52 = createBaseVNode("div", { class: "control-label" }, "Identifier", -1);
var _hoisted_62 = createBaseVNode("div", { class: "control-label" }, "Identifier Type", -1);
var _hoisted_7 = { key: 1 };
var _hoisted_8 = createBaseVNode("div", { class: "control-label" }, "Identifier", -1);
var _hoisted_9 = createBaseVNode("div", { class: "control-label" }, "Identifier Type", -1);
var _hoisted_10 = { key: 2 };
var _hoisted_11 = createBaseVNode("div", { class: "control-label" }, "Identifier", -1);
var _hoisted_122 = createBaseVNode("div", { class: "control-label" }, "Identifier Type", -1);
var _hoisted_13 = createBaseVNode("div", { class: "control-label" }, "Setup New Device", -1);
var _hoisted_14 = createBaseVNode("div", { class: "control-label" }, "User Is Registering", -1);
var _hoisted_15 = createBaseVNode("div", { class: "control-label" }, "Verifying Identifier", -1);
var _hoisted_16 = { key: 3 };
var _hoisted_17 = createBaseVNode("div", { class: "control-label" }, "Identifier", -1);
var _hoisted_18 = createBaseVNode("div", { class: "control-label" }, "Identifier Type", -1);
var _hoisted_19 = createBaseVNode("div", { class: "control-label" }, "Setup New Device", -1);
var _hoisted_20 = createBaseVNode("div", { class: "control-label" }, "User Is Registering", -1);
var _hoisted_21 = createBaseVNode("div", { class: "control-label" }, "Verifying Identifier", -1);
var _hoisted_222 = { key: 4 };
var _hoisted_23 = createBaseVNode("div", { class: "control-label" }, "Magic Link", -1);
var _hoisted_24 = { key: 5 };
var _hoisted_25 = ["onClick"];
var identifier = `authenticator@passage.id`;
var _sfc_main$22 = defineComponent({
  __name: "DebugRouter",
  props: {
    router: {},
    appInfo: {}
  },
  setup(__props) {
    const props = __props;
    const views = ref([
      {
        name: "Main View",
        value: {
          route: props.router.homeRoute,
          key: "MAINVIEW"
        }
      },
      {
        name: "Register Device",
        value: {
          route: RegisterDeviceRoute,
          key: "REGISTERDEVICE"
        }
      },
      {
        name: "Webauthnn Login",
        value: {
          route: WebauthnSignInRoute,
          key: "WEBAUTHNSIGNIN"
        }
      },
      {
        name: "One Time Passcode",
        value: {
          route: OneTimePasscodeRoute,
          key: "OTP"
        }
      },
      {
        name: "Maigc Link",
        value: {
          route: MagicLinkRoute,
          key: "MAGICLINK"
        }
      },
      {
        name: "Activate Magic Link",
        value: {
          route: ActivateMagicLinkRoute,
          key: "ACTIVATEMAGICLINK"
        }
      },
      {
        name: "Add Device",
        value: {
          route: AddDeviceRoute,
          key: "ADDDEVICE"
        }
      },
      {
        name: "Device Not Supported",
        value: {
          route: DisableFallbacksRoute,
          key: "DEVICENOTSUPPORTED"
        }
      },
      {
        name: "Login Not Supported",
        value: {
          route: LoginNotSupportedRoute,
          key: "LOGINNOTSUPPORTED"
        }
      }
    ]);
    const selectedRoute = ref(views.value[0].value);
    const browserFeatures = {
      securityKey: true,
      platform: true,
      syncedCredential: true,
      crossDeviceCredential: true,
      conditionalUI: true,
      isAvailable: true
    };
    const { passage } = usePassage();
    passage.getCredentialAvailable().then((browserFeatures2) => registerDeviceProps.browserFeatures = browserFeatures2);
    passage.getCurrentSession().getAuthToken().then((authToken) => {
      addDeviceProps.authResult.auth_token = authToken;
    }).catch(() => {
    });
    const identifierTypes = [
      {
        name: "Email",
        value: IdentifierType.email
      },
      {
        name: "Phone",
        value: IdentifierType.phone
      }
    ];
    const mainViewProps = reactive({
      register: false,
      appInfo: props.appInfo
    });
    const registerDeviceProps = reactive({
      identifier,
      identifierType: IdentifierType.email,
      appInfo: props.appInfo,
      browserFeatures
    });
    const webauthnSignInProps = reactive({
      identifier,
      identifierType: IdentifierType.email,
      appInfo: props.appInfo
    });
    const otpProps = reactive({
      identifier,
      identifierType: IdentifierType.email,
      setupNewDevice: false,
      userIsRegistering: false,
      identifierVerifying: false
    });
    const magicLinkProps = reactive({
      identifier,
      identifierType: IdentifierType.email,
      setupNewDevice: false,
      userIsRegistering: false,
      identifierVerifying: false
    });
    const activateMagicLinkProps = reactive({
      magicLink: "",
      webauthnAllowed: true
    });
    const addDeviceProps = reactive({
      authResult: {
        redirect_url: props.appInfo.redirect_url,
        auth_token: ""
      }
    });
    function goToView() {
      let viewProps = void 0;
      switch (selectedRoute.value.key) {
        case "MAINVIEW":
          viewProps = mainViewProps;
          break;
        case "REGISTERDEVICE":
          viewProps = registerDeviceProps;
          break;
        case "WEBAUTHNSIGNIN":
          viewProps = webauthnSignInProps;
          break;
        case "OTP":
          viewProps = otpProps;
          break;
        case "MAGICLINK":
          viewProps = magicLinkProps;
          break;
        case "ACTIVATEMAGICLINK":
          viewProps = activateMagicLinkProps;
          break;
        case "ADDDEVICE":
          viewProps = addDeviceProps;
          break;
        case "DEVICENOTSUPPORTED":
        case "LOGINNOTSUPPORTED":
          viewProps = void 0;
          break;
      }
      props.router.push(selectedRoute.value.route, viewProps);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$22, [
        _hoisted_2$12,
        createVNode(Dropdown, {
          modelValue: selectedRoute.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectedRoute.value = $event),
          items: views.value
        }, null, 8, ["modelValue", "items"]),
        _hoisted_3$12,
        selectedRoute.value.key === "REGISTERDEVICE" ? (openBlock(), createElementBlock("div", _hoisted_42, [
          _hoisted_52,
          withDirectives(createBaseVNode("input", {
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => registerDeviceProps.identifier = $event),
            type: "text",
            class: "input psg-input"
          }, null, 512), [
            [vModelText, registerDeviceProps.identifier]
          ]),
          _hoisted_62,
          createVNode(Dropdown, {
            modelValue: registerDeviceProps.identifierType,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => registerDeviceProps.identifierType = $event),
            items: identifierTypes
          }, null, 8, ["modelValue"])
        ])) : selectedRoute.value.key === "WEBAUTHNSIGNIN" ? (openBlock(), createElementBlock("div", _hoisted_7, [
          _hoisted_8,
          withDirectives(createBaseVNode("input", {
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => webauthnSignInProps.identifier = $event),
            type: "text",
            class: "input psg-input"
          }, null, 512), [
            [vModelText, webauthnSignInProps.identifier]
          ]),
          _hoisted_9,
          createVNode(Dropdown, {
            modelValue: webauthnSignInProps.identifierType,
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => webauthnSignInProps.identifierType = $event),
            items: identifierTypes
          }, null, 8, ["modelValue"])
        ])) : selectedRoute.value.key === "OTP" ? (openBlock(), createElementBlock("div", _hoisted_10, [
          _hoisted_11,
          withDirectives(createBaseVNode("input", {
            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => otpProps.identifier = $event),
            type: "text",
            class: "input psg-input"
          }, null, 512), [
            [vModelText, otpProps.identifier]
          ]),
          _hoisted_122,
          createVNode(Dropdown, {
            modelValue: otpProps.identifierType,
            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => otpProps.identifierType = $event),
            items: identifierTypes
          }, null, 8, ["modelValue"]),
          _hoisted_13,
          createVNode(Checkbox, {
            modelValue: otpProps.setupNewDevice,
            "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => otpProps.setupNewDevice = $event)
          }, null, 8, ["modelValue"]),
          _hoisted_14,
          createVNode(Checkbox, {
            modelValue: otpProps.userIsRegistering,
            "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => otpProps.userIsRegistering = $event)
          }, null, 8, ["modelValue"]),
          _hoisted_15,
          createVNode(Checkbox, {
            modelValue: otpProps.identifierVerifying,
            "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => otpProps.identifierVerifying = $event)
          }, null, 8, ["modelValue"])
        ])) : selectedRoute.value.key === "MAGICLINK" ? (openBlock(), createElementBlock("div", _hoisted_16, [
          _hoisted_17,
          withDirectives(createBaseVNode("input", {
            "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => magicLinkProps.identifier = $event),
            type: "text",
            class: "input psg-input"
          }, null, 512), [
            [vModelText, magicLinkProps.identifier]
          ]),
          _hoisted_18,
          createVNode(Dropdown, {
            modelValue: magicLinkProps.identifierType,
            "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => magicLinkProps.identifierType = $event),
            items: identifierTypes
          }, null, 8, ["modelValue"]),
          _hoisted_19,
          createVNode(Checkbox, {
            modelValue: magicLinkProps.setupNewDevice,
            "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => magicLinkProps.setupNewDevice = $event)
          }, null, 8, ["modelValue"]),
          _hoisted_20,
          createVNode(Checkbox, {
            modelValue: magicLinkProps.userIsRegistering,
            "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => magicLinkProps.userIsRegistering = $event)
          }, null, 8, ["modelValue"]),
          _hoisted_21,
          createVNode(Checkbox, {
            modelValue: magicLinkProps.identifierVerifying,
            "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => magicLinkProps.identifierVerifying = $event)
          }, null, 8, ["modelValue"])
        ])) : selectedRoute.value.key === "ACTIVATEMAGICLINK" ? (openBlock(), createElementBlock("div", _hoisted_222, [
          _hoisted_23,
          withDirectives(createBaseVNode("input", {
            "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => activateMagicLinkProps.magicLink = $event),
            type: "text",
            class: "input psg-input"
          }, null, 512), [
            [vModelText, activateMagicLinkProps.magicLink]
          ])
        ])) : (openBlock(), createElementBlock("div", _hoisted_24, "None")),
        createBaseVNode("button", {
          class: "button",
          onClick: withModifiers(goToView, ["prevent"])
        }, "Go To View", 8, _hoisted_25)
      ]);
    };
  }
});
var _hoisted_1$12 = createBaseVNode("div", { class: "header-title" }, "Passage Element Debug", -1);
var _hoisted_26 = ["onClick"];
var _hoisted_32 = { class: "debug-panel-body" };
var _sfc_main$12 = defineComponent({
  __name: "DebugPanel",
  props: {
    router: {},
    appInfo: {}
  },
  setup(__props) {
    const debugBuild = false;
    const debugPanel = ref();
    const panelVisible = ref(false);
    function closeDebugPanel() {
      panelVisible.value = false;
    }
    let pos1 = 0;
    let pos2 = 0;
    let pos3 = 0;
    let pos4 = 0;
    function dragMouseDown(e2) {
      e2 = e2 || window.event;
      e2.preventDefault();
      pos3 = e2.clientX;
      pos4 = e2.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
    function elementDrag(e2) {
      e2 = e2 || window.event;
      e2.preventDefault();
      pos1 = pos3 - e2.clientX;
      pos2 = pos4 - e2.clientY;
      pos3 = e2.clientX;
      pos4 = e2.clientY;
      if (debugPanel.value) {
        debugPanel.value.style.top = debugPanel.value.offsetTop - pos2 + "px";
        debugPanel.value.style.left = debugPanel.value.offsetLeft - pos1 + "px";
      }
    }
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
    return (_ctx, _cache) => {
      return debugBuild && panelVisible.value ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "debug-panel",
        ref_key: "debugPanel",
        ref: debugPanel
      }, [
        createBaseVNode("div", {
          class: "debug-panel-header",
          onMousedown: dragMouseDown
        }, [
          _hoisted_1$12,
          createBaseVNode("div", {
            class: "panel-close",
            onClick: withModifiers(closeDebugPanel, ["prevent"])
          }, "×", 8, _hoisted_26)
        ], 32),
        createBaseVNode("div", _hoisted_32, [
          createVNode(_sfc_main$22, {
            "app-info": _ctx.appInfo,
            router: _ctx.router
          }, null, 8, ["app-info", "router"])
        ])
      ], 512)) : createCommentVNode("", true);
    };
  }
});
var _hoisted_110 = {
  key: 1,
  class: "notification is-danger has-text-centered",
  "data-test": "invalid-app-id"
};
var _sfc_main3 = defineComponent({
  __name: "SmartRouter",
  props: {
    homeRoute: {},
    authContainerRef: {}
  },
  setup(__props) {
    const props = __props;
    const router = reactive(new Router(props.homeRoute));
    const currentRoute = computed(() => router.currentRoute);
    const { t: t2 } = useLocale();
    const { appInfo, loading, invalidAppId, passage } = useAppInfo();
    const { initEventHandler: initEventHandler2 } = useAuthEvent();
    const { setCustomElementStyles } = useElementCustomization();
    const currentComponent = computed(() => {
      var _a;
      return (_a = currentRoute.value) == null ? void 0 : _a.component;
    });
    const currentProps = computed(() => {
      var _a;
      const props2 = (_a = currentRoute.value) == null ? void 0 : _a.props;
      if (props2 === void 0) {
        return {};
      }
      return props2;
    });
    const initialized = ref(false);
    watch(appInfo, () => __async2(this, null, function* () {
      initialized.value = false;
      if (appInfo.value === void 0 || passage.value === void 0) {
        return;
      }
      yield initEventHandler2(appInfo.value, router, passage.value);
      initialized.value = true;
      if (props.authContainerRef) {
        setCustomElementStyles(props.authContainerRef, appInfo.value.element_customization);
      }
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(Transition, {
          name: "fade",
          mode: "out-in",
          appear: ""
        }, {
          default: withCtx(() => [
            !unref(loading) && initialized.value ? (openBlock(), createBlock(resolveDynamicComponent(currentComponent.value), normalizeProps(mergeProps({ key: 0 }, currentProps.value)), {
              otpInput: withCtx(() => [
                renderSlot(_ctx.$slots, "otpInput")
              ]),
              loginInput: withCtx(() => [
                renderSlot(_ctx.$slots, "loginInput")
              ]),
              _: 3
            }, 16)) : createCommentVNode("", true)
          ]),
          _: 3
        }),
        unref(appInfo) && initialized.value ? (openBlock(), createBlock(_sfc_main$12, {
          key: 0,
          router,
          "app-info": unref(appInfo)
        }, null, 8, ["router", "app-info"])) : createCommentVNode("", true),
        unref(invalidAppId) ? (openBlock(), createElementBlock("div", _hoisted_110, toDisplayString$1(unref(t2)("invalid-app-id")), 1)) : createCommentVNode("", true)
      ], 64);
    };
  }
});
function useElementSetup(props) {
  function storeProps() {
    if (props.appId) {
      createPassageInstance(props.appId, props.tokenStore);
    }
    const { updateDefaultCountryCode: updateDefaultCountryCode2 } = useDefaultCountryCode();
    updateDefaultCountryCode2(props.defaultCountryCode);
    const { setBeforeAuth: setBeforeAuth2, setOnSuccess: setOnSuccess2, setOnEvent: setOnEvent2 } = useCallbacks();
    setBeforeAuth2(props.beforeAuth);
    setOnSuccess2(props.onSuccess);
    setOnEvent2(props.onEvent);
  }
  storeProps();
  onBeforeUpdate(() => {
    storeProps();
  });
  const { languageLoading } = useStoreLocale(props);
  const containerRef = ref();
  useIntlTelInput(containerRef);
  return {
    languageLoading,
    containerRef
  };
}

export {
  unref,
  withCtx,
  withDirectives,
  defineComponent,
  renderSlot,
  openBlock,
  createElementBlock,
  createBlock,
  createBaseVNode,
  vShow,
  safelyRegisterElement,
  AuthRoute,
  RegisterRoute,
  _sfc_main3 as _sfc_main,
  useElementSetup
};
/*! Bundled license information:

@passageidentity/passage-elements/dist/package/customElements.es.js:
  (*! js-cookie v3.0.5 | MIT *)
  (*!
    * shared v9.4.1
    * (c) 2023 kazuya kawaguchi
    * Released under the MIT License.
    *)
  (*!
   * message-compiler v9.4.1
   * (c) 2023 kazuya kawaguchi
   * Released under the MIT License.
   *)
  (*!
   * core-base v9.4.1
   * (c) 2023 kazuya kawaguchi
   * Released under the MIT License.
   *)
  (*!
   * vue-i18n v9.4.1
   * (c) 2023 kazuya kawaguchi
   * Released under the MIT License.
   *)

@passageidentity/passage-elements/dist/package/customElements.es3.js:
  (*!
   * GridStack 5.0
   * https://gridstackjs.com/
   *
   * Copyright (c) 2021 Alain Dumesny
   * see root license https://github.com/gridstack/gridstack.js/tree/master/LICENSE
   *)
*/
//# sourceMappingURL=chunk-I37OHD4N.js.map
