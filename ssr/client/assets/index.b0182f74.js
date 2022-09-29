import { _ as _export_sfc, a as defineComponent, k as resolveComponent, o as openBlock, c as createElementBlock, l as createVNode, b as createBaseVNode, t as toDisplayString, p as pushScopeId, h as popScopeId } from "./index.aa43210e.js";
var index_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".layout[data-v-1626efcc] {\n  width: 1160px;\n  min-height: 100vh;\n}\n.layout .main-container[data-v-1626efcc] {\n  min-height: 100vh;\n}\n.layout .page-footer[data-v-1626efcc] {\n  width: 1160px;\n  margin: 100px 0 20px;\n}\n.layout .page-footer p[data-v-1626efcc],\n.layout .page-footer a[data-v-1626efcc] {\n  font-size: 14px;\n  line-height: 24px;\n  text-align: center;\n}\n")();
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
