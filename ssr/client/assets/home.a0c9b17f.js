var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { _ as _export_sfc, d as defineComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createTextVNode, n as normalizeStyle, t as toDisplayString, e as createCommentVNode, r as ref, f as reactive, g as onMounted, p as pushScopeId, h as popScopeId } from "./index.ca961b15.js";
function mitt(n) {
  return { all: n = n || /* @__PURE__ */ new Map(), on: function(t, e) {
    var i = n.get(t);
    i ? i.push(e) : n.set(t, [e]);
  }, off: function(t, e) {
    var i = n.get(t);
    i && (e ? i.splice(i.indexOf(e) >>> 0, 1) : n.set(t, []));
  }, emit: function(t, e) {
    var i = n.get(t);
    i && i.slice().map(function(n2) {
      n2(e);
    }), (i = n.get("*")) && i.slice().map(function(n2) {
      n2(t, e);
    });
  } };
}
const emitter = mitt();
class DragElement {
  constructor(ele) {
    __publicField(this, "handleMove", (e) => {
      if (!this.isMove)
        return;
      const event = e || window.event;
      const diffX = event.clientX - this.startDis[0];
      const offsetX = this.disLeft + diffX;
      if (offsetX > 470 || offsetX < 10)
        return;
      this.ele.style.left = offsetX + "px";
      emitter.emit("move-left", { left: offsetX - 10 });
    });
    this.ele = document.querySelector(ele);
    this.parentEle = this.ele.parentElement;
    this.isMove = false;
    this.startDis = [];
    this.disTop = 0;
    this.disLeft = 0;
    this.initConfig();
    this.eventFn();
  }
  initConfig() {
    this.parentEle.style.position = "relative";
    this.ele.style.position = "absolute";
  }
  eventFn() {
    this.ele.addEventListener("mousedown", (e) => {
      const event = e || window.event;
      this.startDis = [event.clientX, event.clientY];
      this.disTop = this.ele.offsetTop;
      this.disLeft = this.ele.offsetLeft;
      this.ele.style.cursor = "move";
      this.isMove = true;
      this.ele.addEventListener("mousemove", this.handleMove);
    });
    this.ele.addEventListener("mouseup", (e) => {
      this.isMove = false;
      this.ele.removeEventListener("mousemove", this.handleMove);
    });
    this.ele.addEventListener("mouseleave", (e) => {
      if (!this.isMove)
        return;
      const event = e || window.event;
      const diffX = event.clientX - this.startDis[0];
      const offsetX = this.disLeft + diffX;
      if (offsetX > 470 || offsetX < 10)
        return;
      this.ele.style.left = this.disLeft + diffX + "px";
      emitter.emit("move-left", { left: offsetX - 10 });
      this.isMove = false;
      this.ele.removeEventListener("mousemove", this.handleMove);
    });
  }
}
var home_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = defineComponent({
  name: "Home",
  setup() {
    let width = ref(230);
    let rate = ref(50);
    let file = ref(null);
    let fileBox = ref(null);
    let imgSrc = ref("");
    let currentFile = reactive({
      size: 0,
      last_size: 0,
      blobUrl: "",
      name: "",
      file: null
    });
    let timer = ref(null);
    const readImage = () => {
      const reader = new FileReader();
      reader.readAsDataURL(currentFile.file);
      reader.onload = function(event) {
        var _a;
        drawImage((_a = event.target) == null ? void 0 : _a.result, 1 - rate.value / 100);
      };
    };
    function debounceFn(fn, wait) {
      if (timer.value)
        clearTimeout(timer.value);
      timer.value = setTimeout(() => {
        if (!fn)
          return;
        fn();
        timer.value = null;
      }, wait);
    }
    const eventFile = (event) => {
      const file2 = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
      currentFile.size = Number((file2.size / 1024).toFixed(2));
      currentFile.name = file2.name;
      currentFile.file = file2;
      readImage();
    };
    const handleSelect = () => {
      file.value.click();
    };
    const drawImage = (url, rate2) => {
      var img = new Image();
      img.src = url;
      var canvas;
      img.onload = function(param) {
        canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          currentFile.last_size = Number((blob.size / 1024).toFixed(2));
          const windowUrl = window.URL || window.webkitURL;
          currentFile.blobUrl = windowUrl.createObjectURL(blob);
          imgSrc.value = currentFile.blobUrl;
        }, "image/jpeg", rate2);
      };
      img.onerror = function(error) {
        console.log(error);
      };
    };
    onMounted(() => {
      new DragElement("#flag");
      file.value.addEventListener("change", eventFile);
      fileBox.value.addEventListener("dragover", function(event) {
        event.preventDefault();
      });
      fileBox.value.addEventListener("drop", function(event) {
        event.preventDefault();
        if (event.target.className == "upload-box") {
          eventFile(event);
        }
      });
    });
    emitter.on("move-left", (query) => {
      width.value = query.left;
      rate.value = Math.round(query.left / 460 * 100);
      debounceFn(readImage, 300);
    });
    const handleSave = () => {
      const aEle = document.createElement("a");
      aEle.href = currentFile.blobUrl;
      aEle.download = currentFile.name;
      aEle.click();
    };
    return {
      width,
      rate,
      file,
      fileBox,
      imgSrc,
      currentFile,
      handleSelect,
      handleSave
    };
  }
});
const _withScopeId = (n) => (pushScopeId("data-v-136e8138"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "image-cropping" };
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "sub-title" }, "\u56FE\u7247\u5728\u7EBF\u538B\u7F29", -1));
const _hoisted_3 = {
  class: "upload-box",
  ref: "fileBox"
};
const _hoisted_4 = { class: "tip" };
const _hoisted_5 = { class: "tool-bar" };
const _hoisted_6 = { class: "progress-bar" };
const _hoisted_7 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "start-flag" }, "0%", -1));
const _hoisted_8 = { class: "progress-flag" };
const _hoisted_9 = { class: "progress" };
const _hoisted_10 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", {
  class: "flag",
  id: "flag",
  style: { "left": "240px" }
}, null, -1));
const _hoisted_11 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "end-flag" }, "100%", -1));
const _hoisted_12 = { class: "rate-txt" };
const _hoisted_13 = {
  key: 0,
  class: "tool-bar origin-bar"
};
const _hoisted_14 = { class: "rate-txt" };
const _hoisted_15 = { style: { "color": "#f56c6c" } };
const _hoisted_16 = { class: "rate-txt" };
const _hoisted_17 = { style: { "color": "#67c23a" } };
const _hoisted_18 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "tip" }, "tip: \u9ED8\u8BA4\u538B\u7F29\u7387\u4E3A50%\uFF0C\u8BF7\u81EA\u884C\u8C03\u6574\u6807\u5C3A\u4FEE\u6539\u56FE\u7247\u538B\u7F29\u7387", -1));
const _hoisted_19 = {
  key: 1,
  class: "image-box"
};
const _hoisted_20 = ["src"];
const _hoisted_21 = {
  type: "file",
  ref: "file",
  id: "file"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    _hoisted_2,
    createBaseVNode("div", _hoisted_3, [
      createBaseVNode("span", _hoisted_4, [
        createTextVNode("\u5C06\u56FE\u7247\u62D6\u5230\u6B64\u5904\uFF0C\u6216"),
        createBaseVNode("i", {
          onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleSelect && _ctx.handleSelect(...args))
        }, "\u70B9\u51FB\u4E0A\u4F20")
      ])
    ], 512),
    createBaseVNode("div", _hoisted_5, [
      createBaseVNode("button", {
        class: "primary",
        onClick: _cache[1] || (_cache[1] = (...args) => _ctx.handleSelect && _ctx.handleSelect(...args))
      }, "\u9009\u62E9\u56FE\u7247"),
      createBaseVNode("div", _hoisted_6, [
        _hoisted_7,
        createBaseVNode("div", _hoisted_8, [
          createBaseVNode("div", _hoisted_9, [
            createBaseVNode("div", {
              class: "rate",
              style: normalizeStyle({ width: _ctx.width + "px" })
            }, null, 4)
          ]),
          _hoisted_10
        ]),
        _hoisted_11
      ]),
      createBaseVNode("div", _hoisted_12, "\u538B\u7F29\u7387" + toDisplayString(_ctx.rate) + "%", 1)
    ]),
    _ctx.imgSrc ? (openBlock(), createElementBlock("div", _hoisted_13, [
      createBaseVNode("div", _hoisted_14, [
        createTextVNode(" \u6E90\u6587\u4EF6: "),
        createBaseVNode("span", _hoisted_15, toDisplayString(_ctx.currentFile.size) + "KB", 1)
      ]),
      createBaseVNode("div", _hoisted_16, [
        createTextVNode(" \u538B\u7F29\u540E\u56FE\u7247\u5927\u5C0F: "),
        createBaseVNode("span", _hoisted_17, toDisplayString(_ctx.currentFile.last_size) + "KB(\u8282\u7EA6" + toDisplayString(Number((_ctx.currentFile.size - _ctx.currentFile.last_size) / _ctx.currentFile.size * 100).toFixed(0)) + "%) ", 1)
      ]),
      createBaseVNode("button", {
        class: "primary",
        onClick: _cache[2] || (_cache[2] = (...args) => _ctx.handleSave && _ctx.handleSave(...args))
      }, "\u4FDD\u5B58\u56FE\u7247"),
      _hoisted_18
    ])) : createCommentVNode("", true),
    _ctx.imgSrc ? (openBlock(), createElementBlock("div", _hoisted_19, [
      createBaseVNode("img", {
        ref: "image",
        id: "image",
        src: _ctx.imgSrc,
        alt: ""
      }, null, 8, _hoisted_20)
    ])) : createCommentVNode("", true),
    createBaseVNode("input", _hoisted_21, null, 512)
  ]);
}
var home = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-136e8138"]]);
export { home as default };
