import { _ as _export_sfc, d as defineComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createTextVNode, e as createCommentVNode, r as ref, f as reactive, g as onMounted, p as pushScopeId, h as popScopeId } from "./index.ca961b15.js";
const getBgColor = (imageArray) => {
  let result = [];
  let str1, str2;
  for (let i = 0; i < imageArray.length; i += 4) {
    str1 = [imageArray[i], imageArray[i + 1], imageArray[i + 2], imageArray[i + 3]].join(",");
    str2 = [imageArray[i + 4], imageArray[i + 5], imageArray[i + 6], imageArray[i + 7]].join(",");
    if (str1 === str2) {
      result = [imageArray[i], imageArray[i + 1], imageArray[i + 2], imageArray[i + 3]];
      break;
    }
  }
  return result;
};
const colorDistance = function(arrRGB1, arrRGB2) {
  let [r1, g1, b1] = arrRGB1;
  let [r2, g2, b2] = arrRGB2;
  let r = (r1 - r2) / 256;
  let g = (g1 - g2) / 256;
  let b = (b1 - b2) / 256;
  return Math.sqrt(r * r + g * g + b * b);
};
const changeBgColor = (imageArray, colorArray, targetColor) => {
  for (let i = 0; i < imageArray.length; i += 4) {
    const diff = colorDistance([imageArray[i], imageArray[i + 1], imageArray[i + 2]], colorArray);
    if (diff < 0.1) {
      imageArray[i] = targetColor[0];
      imageArray[i + 1] = targetColor[1];
      imageArray[i + 2] = targetColor[2];
    }
  }
};
const updateBgColor = (imageData, targetColor) => {
  const bgcolor2 = getBgColor(imageData.data);
  changeBgColor(imageData.data, bgcolor2, targetColor);
  return imageData;
};
var bgcolor_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = defineComponent({
  name: "Bgcolor",
  setup() {
    let file = ref(null);
    let fileBox = ref(null);
    let image = reactive({
      source: "",
      red: "",
      white: "",
      blue: ""
    });
    let currentFile = reactive({
      file: null
    });
    const readImage = () => {
      const reader = new FileReader();
      reader.readAsDataURL(currentFile.file);
      reader.onload = function(event) {
        var _a;
        drawImage((_a = event.target) == null ? void 0 : _a.result);
      };
    };
    const eventFile = (event) => {
      const file2 = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
      currentFile.file = file2;
      readImage();
    };
    const handleSelect = () => {
      file.value.click();
    };
    const drawImage = (url) => {
      var img = new Image();
      img.src = url;
      image.source = url;
      var canvas;
      img.onload = async function(param) {
        canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        let imageDate = updateBgColor(ctx.getImageData(0, 0, img.width, img.height), [255, 0, 0]);
        ctx.putImageData(imageDate, 0, 0);
        await new Promise((res) => {
          canvas.toBlob((blob) => {
            const windowUrl = window.URL || window.webkitURL;
            image.red = windowUrl.createObjectURL(blob);
            res("");
          });
        });
        imageDate = updateBgColor(ctx.getImageData(0, 0, img.width, img.height), [255, 255, 255]);
        ctx.putImageData(imageDate, 0, 0);
        await new Promise((res) => {
          canvas.toBlob((blob) => {
            const windowUrl = window.URL || window.webkitURL;
            image.white = windowUrl.createObjectURL(blob);
            res("");
          });
        });
        imageDate = updateBgColor(ctx.getImageData(0, 0, img.width, img.height), [0, 125, 255]);
        ctx.putImageData(imageDate, 0, 0);
        await new Promise((res) => {
          canvas.toBlob((blob) => {
            const windowUrl = window.URL || window.webkitURL;
            image.blue = windowUrl.createObjectURL(blob);
            res("");
          });
        });
      };
      img.onerror = function(error) {
        console.log(error);
      };
    };
    onMounted(() => {
      file.value.addEventListener("change", eventFile);
    });
    const handleSave = (color, blobUrl) => {
      const aEle = document.createElement("a");
      aEle.href = blobUrl;
      aEle.download = color + "_" + Date.now();
      aEle.click();
    };
    return {
      file,
      fileBox,
      currentFile,
      image,
      handleSelect,
      handleSave
    };
  }
});
const _withScopeId = (n) => (pushScopeId("data-v-1f18d9f2"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "image-cropping" };
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "sub-title" }, "\u8BC1\u4EF6\u7167\u5728\u7EBF\u4FEE\u6539\u80CC\u666F\u8272", -1));
const _hoisted_3 = {
  class: "upload-box",
  ref: "fileBox"
};
const _hoisted_4 = { class: "tip" };
const _hoisted_5 = {
  key: 0,
  class: "image-box"
};
const _hoisted_6 = {
  key: 0,
  class: "image-item"
};
const _hoisted_7 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "image-title" }, "\u539F\u56FE", -1));
const _hoisted_8 = ["src"];
const _hoisted_9 = {
  key: 1,
  class: "image-item"
};
const _hoisted_10 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "image-title" }, "\u7EA2\u8272\u80CC\u666F", -1));
const _hoisted_11 = ["src"];
const _hoisted_12 = {
  key: 2,
  class: "image-item"
};
const _hoisted_13 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "image-title" }, "\u767D\u8272\u80CC\u666F", -1));
const _hoisted_14 = ["src"];
const _hoisted_15 = {
  key: 3,
  class: "image-item"
};
const _hoisted_16 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "image-title" }, "\u84DD\u8272\u80CC\u666F", -1));
const _hoisted_17 = ["src"];
const _hoisted_18 = {
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
    _ctx.image.source ? (openBlock(), createElementBlock("div", _hoisted_5, [
      _ctx.image.source ? (openBlock(), createElementBlock("div", _hoisted_6, [
        _hoisted_7,
        createBaseVNode("img", {
          src: _ctx.image.source,
          alt: ""
        }, null, 8, _hoisted_8)
      ])) : createCommentVNode("", true),
      _ctx.image.red ? (openBlock(), createElementBlock("div", _hoisted_9, [
        _hoisted_10,
        createBaseVNode("img", {
          src: _ctx.image.red,
          alt: ""
        }, null, 8, _hoisted_11),
        createBaseVNode("button", {
          class: "primary",
          onClick: _cache[1] || (_cache[1] = ($event) => _ctx.handleSave("red", _ctx.image.red))
        }, "\u4FDD\u5B58\u56FE\u7247")
      ])) : createCommentVNode("", true),
      _ctx.image.white ? (openBlock(), createElementBlock("div", _hoisted_12, [
        _hoisted_13,
        createBaseVNode("img", {
          src: _ctx.image.white,
          alt: ""
        }, null, 8, _hoisted_14),
        createBaseVNode("button", {
          class: "primary",
          onClick: _cache[2] || (_cache[2] = ($event) => _ctx.handleSave("white", _ctx.image.white))
        }, "\u4FDD\u5B58\u56FE\u7247")
      ])) : createCommentVNode("", true),
      _ctx.image.blue ? (openBlock(), createElementBlock("div", _hoisted_15, [
        _hoisted_16,
        createBaseVNode("img", {
          src: _ctx.image.blue,
          alt: ""
        }, null, 8, _hoisted_17),
        createBaseVNode("button", {
          class: "primary",
          onClick: _cache[3] || (_cache[3] = ($event) => _ctx.handleSave("blue", _ctx.image.blue))
        }, "\u4FDD\u5B58\u56FE\u7247")
      ])) : createCommentVNode("", true)
    ])) : createCommentVNode("", true),
    createBaseVNode("input", _hoisted_18, null, 512)
  ]);
}
var bgcolor = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1f18d9f2"]]);
export { bgcolor as default };
