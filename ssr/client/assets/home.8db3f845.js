var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { _ as _export_sfc, a as defineComponent, e as ref, r as reactive, g as onMounted, o as openBlock, c as createElementBlock, b as createBaseVNode, n as normalizeStyle, t as toDisplayString, i as createCommentVNode, p as pushScopeId, h as popScopeId, j as createTextVNode } from "./index.aa43210e.js";
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
var home_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".image-cropping .sub-title[data-v-1d159091] {\n  font-size: 18px;\n  font-weight: 700;\n  line-height: 30px;\n  margin: 20px 0 10px;\n}\n.image-cropping .upload-box[data-v-1d159091] {\n  width: 100%;\n  height: 200px;\n  border: 1px solid #cdcdcd;\n  border-radius: 1px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.image-cropping .upload-box .tip[data-v-1d159091] {\n  color: #999;\n  font-size: 14px;\n  text-align: center;\n}\n.image-cropping .upload-box .tip i[data-v-1d159091] {\n  color: #409eff;\n  font-style: normal;\n  cursor: pointer;\n}\n.image-cropping .tool-bar[data-v-1d159091] {\n  display: flex;\n  align-items: center;\n  margin-top: 10px;\n}\n.image-cropping .tool-bar .progress-bar[data-v-1d159091] {\n  margin: 0 20px;\n  border: 1px solid #cdcdcd;\n  border-radius: 3px;\n  display: flex;\n  box-sizing: border-box;\n  height: 30px;\n}\n.image-cropping .tool-bar .progress-bar .start-flag[data-v-1d159091],\n.image-cropping .tool-bar .progress-bar .end-flag[data-v-1d159091] {\n  background-color: #cccccc;\n  color: #222;\n  width: 50px;\n  font-size: 12px;\n  text-align: center;\n  line-height: 28px;\n}\n.image-cropping .tool-bar .progress-bar .progress-flag[data-v-1d159091] {\n  width: 500px;\n  display: flex;\n  align-items: center;\n  position: relative;\n}\n.image-cropping .tool-bar .progress-bar .progress-flag .progress[data-v-1d159091] {\n  width: 100%;\n  height: 8px;\n  border: 1px solid #cdcdcd;\n  box-sizing: border-box;\n  border-radius: 5px;\n  overflow: hidden;\n  margin: 0 20px;\n}\n.image-cropping .tool-bar .progress-bar .progress-flag .progress .rate[data-v-1d159091] {\n  height: 100%;\n  background-color: #3280fc;\n}\n.image-cropping .tool-bar .progress-bar .progress-flag .flag[data-v-1d159091] {\n  position: absolute;\n  top: 4px;\n  width: 20px;\n  height: 20px;\n  background-color: #3280fc;\n  border-radius: 4px;\n  cursor: pointer;\n}\n.image-cropping .tool-bar .rate-txt[data-v-1d159091] {\n  border: 1px solid #cecece;\n  box-sizing: border-box;\n  height: 30px;\n  padding: 0 10px;\n  line-height: 28px;\n  border-radius: 3px;\n  font-size: 14px;\n  margin-right: 20px;\n}\n.image-cropping .tool-bar .tip[data-v-1d159091] {\n  color: #999;\n  margin-left: 20px;\n  font-size: 14px;\n}\n.image-cropping .origin-bar[data-v-1d159091] {\n  margin-top: 20px;\n}\n.image-cropping #file[data-v-1d159091] {\n  opacity: 0;\n  width: 0;\n  height: 0;\n  display: none;\n}\n.image-cropping .image-box[data-v-1d159091] {\n  width: 100%;\n  border: 1px solid #cecece;\n  margin-top: 10px;\n}\n.image-cropping .image-box #image[data-v-1d159091] {\n  width: calc(100% - 30px);\n  margin: 15px;\n}\nbutton[data-v-1d159091] {\n  height: 30px;\n  line-height: 30px;\n  text-align: center;\n  min-width: 100px;\n  border: none;\n  cursor: pointer;\n  border-radius: 2px;\n  font-size: 14px;\n}\nbutton.primary[data-v-1d159091] {\n  color: #fff;\n  background-color: #3280fc;\n}\nbutton.primary[data-v-1d159091]:hover {\n  background-color: #005dbe;\n}\n")();
const _sfc_main = defineComponent({
  name: "Welcome",
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
const _withScopeId = (n) => (pushScopeId("data-v-1d159091"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "image-cropping" };
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "sub-title" }, "\u56FE\u7247\u5728\u7EBF\u538B\u7F29", -1));
const _hoisted_3 = {
  class: "upload-box",
  ref: "fileBox"
};
const _hoisted_4 = { class: "tip" };
const _hoisted_5 = /* @__PURE__ */ createTextVNode("\u5C06\u56FE\u7247\u62D6\u5230\u6B64\u5904\uFF0C\u6216");
const _hoisted_6 = { class: "tool-bar" };
const _hoisted_7 = { class: "progress-bar" };
const _hoisted_8 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "start-flag" }, "0%", -1));
const _hoisted_9 = { class: "progress-flag" };
const _hoisted_10 = { class: "progress" };
const _hoisted_11 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", {
  class: "flag",
  id: "flag",
  style: { "left": "240px" }
}, null, -1));
const _hoisted_12 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "end-flag" }, "100%", -1));
const _hoisted_13 = { class: "rate-txt" };
const _hoisted_14 = {
  key: 0,
  class: "tool-bar origin-bar"
};
const _hoisted_15 = { class: "rate-txt" };
const _hoisted_16 = /* @__PURE__ */ createTextVNode(" \u6E90\u6587\u4EF6: ");
const _hoisted_17 = { style: { "color": "#f56c6c" } };
const _hoisted_18 = { class: "rate-txt" };
const _hoisted_19 = /* @__PURE__ */ createTextVNode(" \u538B\u7F29\u540E\u56FE\u7247\u5927\u5C0F: ");
const _hoisted_20 = { style: { "color": "#67c23a" } };
const _hoisted_21 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "tip" }, "tip: \u9ED8\u8BA4\u538B\u7F29\u7387\u4E3A50%\uFF0C\u8BF7\u81EA\u884C\u8C03\u6574\u6807\u5C3A\u4FEE\u6539\u56FE\u7247\u538B\u7F29\u7387", -1));
const _hoisted_22 = {
  key: 1,
  class: "image-box"
};
const _hoisted_23 = ["src"];
const _hoisted_24 = {
  type: "file",
  ref: "file",
  id: "file"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    _hoisted_2,
    createBaseVNode("div", _hoisted_3, [
      createBaseVNode("span", _hoisted_4, [
        _hoisted_5,
        createBaseVNode("i", {
          onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleSelect && _ctx.handleSelect(...args))
        }, "\u70B9\u51FB\u4E0A\u4F20")
      ])
    ], 512),
    createBaseVNode("div", _hoisted_6, [
      createBaseVNode("button", {
        class: "primary",
        onClick: _cache[1] || (_cache[1] = (...args) => _ctx.handleSelect && _ctx.handleSelect(...args))
      }, "\u9009\u62E9\u56FE\u7247"),
      createBaseVNode("div", _hoisted_7, [
        _hoisted_8,
        createBaseVNode("div", _hoisted_9, [
          createBaseVNode("div", _hoisted_10, [
            createBaseVNode("div", {
              class: "rate",
              style: normalizeStyle({ width: _ctx.width + "px" })
            }, null, 4)
          ]),
          _hoisted_11
        ]),
        _hoisted_12
      ]),
      createBaseVNode("div", _hoisted_13, "\u538B\u7F29\u7387" + toDisplayString(_ctx.rate) + "%", 1)
    ]),
    _ctx.imgSrc ? (openBlock(), createElementBlock("div", _hoisted_14, [
      createBaseVNode("div", _hoisted_15, [
        _hoisted_16,
        createBaseVNode("span", _hoisted_17, toDisplayString(_ctx.currentFile.size) + "KB", 1)
      ]),
      createBaseVNode("div", _hoisted_18, [
        _hoisted_19,
        createBaseVNode("span", _hoisted_20, toDisplayString(_ctx.currentFile.last_size) + "KB(\u8282\u7EA6" + toDisplayString(Number((_ctx.currentFile.size - _ctx.currentFile.last_size) / _ctx.currentFile.size * 100).toFixed(0)) + "%) ", 1)
      ]),
      createBaseVNode("button", {
        class: "primary",
        onClick: _cache[2] || (_cache[2] = (...args) => _ctx.handleSave && _ctx.handleSave(...args))
      }, "\u4FDD\u5B58\u56FE\u7247"),
      _hoisted_21
    ])) : createCommentVNode("", true),
    _ctx.imgSrc ? (openBlock(), createElementBlock("div", _hoisted_22, [
      createBaseVNode("img", {
        ref: "image",
        id: "image",
        src: _ctx.imgSrc,
        alt: ""
      }, null, 8, _hoisted_23)
    ])) : createCommentVNode("", true),
    createBaseVNode("input", _hoisted_24, null, 512)
  ]);
}
var home = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1d159091"]]);
export { home as default };
