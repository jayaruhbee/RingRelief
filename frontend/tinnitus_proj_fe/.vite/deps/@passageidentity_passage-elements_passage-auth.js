import {
  AuthRoute,
  _sfc_main,
  createBaseVNode,
  createBlock,
  createElementBlock,
  defineComponent,
  openBlock,
  renderSlot,
  safelyRegisterElement,
  unref,
  useElementSetup,
  vShow,
  withCtx,
  withDirectives
} from "./chunk-I37OHD4N.js";
import "./chunk-76J2PTFD.js";

// node_modules/@passageidentity/passage-elements/dist/package/passage-auth/index.es.js
var _hoisted_1 = { class: "container" };
var _sfc_main2 = defineComponent({
  __name: "AuthApp.ce",
  props: {
    appId: {},
    beforeAuth: { type: Function },
    onSuccess: { type: Function },
    onEvent: { type: Function },
    tokenStore: {},
    lang: {},
    defaultCountryCode: {}
  },
  setup(__props) {
    const props = __props;
    const { languageLoading, containerRef } = useElementSetup(props);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        id: "passage-auth-container",
        class: "passage-auth",
        ref_key: "containerRef",
        ref: containerRef
      }, [
        withDirectives(createBaseVNode("div", _hoisted_1, [
          (openBlock(), createBlock(_sfc_main, {
            key: _ctx.appId,
            homeRoute: unref(AuthRoute),
            authContainerRef: unref(containerRef)
          }, {
            otpInput: withCtx(() => [
              renderSlot(_ctx.$slots, "otpInput")
            ]),
            loginInput: withCtx(() => [
              renderSlot(_ctx.$slots, "loginInput")
            ]),
            _: 3
          }, 8, ["homeRoute", "authContainerRef"]))
        ], 512), [
          [vShow, !unref(languageLoading)]
        ])
      ], 512);
    };
  }
});
function registerPassageAuthElement() {
  safelyRegisterElement(_sfc_main2, "auth");
}
registerPassageAuthElement();
export {
  registerPassageAuthElement
};
//# sourceMappingURL=@passageidentity_passage-elements_passage-auth.js.map
