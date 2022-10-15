import { _ as _export_sfc, d as defineComponent, o as openBlock, c as createElementBlock, i as createVNode, a as createBaseVNode, t as toDisplayString, j as resolveComponent, p as pushScopeId, h as popScopeId } from "./index.ca961b15.js";
var index_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = defineComponent({
  name: "Layout",
  setup() {
    return {};
  }
});
const _withScopeId = (n) => (pushScopeId("data-v-1626efcc"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "layout" };
const _hoisted_2 = { class: "page-footer" };
const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("p", null, [
  /* @__PURE__ */ createBaseVNode("a", {
    href: "https://beian.miit.gov.cn",
    target: "_blank"
  }, "\u664BICP\u590719004552\u53F7")
], -1));
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_view = resolveComponent("router-view");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_router_view, { class: "main-container" }),
    createBaseVNode("div", _hoisted_2, [
      createBaseVNode("p", null, "Copyright \xA9 2021-" + toDisplayString(new Date().getFullYear()) + " All rights reserved.", 1),
      _hoisted_3
    ])
  ]);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1626efcc"]]);
export { index as default };
