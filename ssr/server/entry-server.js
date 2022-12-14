"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
var path = require("path");
var serverRenderer = require("vue/server-renderer");
var vue = require("vue");
var vueRouter = require("vue-router");
var pinia = require("pinia");
var mitt = require("mitt");
function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : { "default": e };
}
function _interopNamespace(e) {
  if (e && e.__esModule)
    return e;
  var n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    Object.keys(e).forEach(function(k) {
      if (k !== "default") {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function() {
            return e[k];
          }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}
var path__namespace = /* @__PURE__ */ _interopNamespace(path);
var mitt__default = /* @__PURE__ */ _interopDefaultLegacy(mitt);
var App_vue_vue_type_style_index_0_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$3 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  const _component_router_view = vue.resolveComponent("router-view");
  _push(`<div${serverRenderer.ssrRenderAttrs(_attrs)}>`);
  _push(serverRenderer.ssrRenderComponent(_component_router_view, null, {
    default: vue.withCtx(({ Component }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        serverRenderer.ssrRenderSuspense(_push2, {
          default: () => {
            serverRenderer.ssrRenderVNode(_push2, vue.createVNode(vue.resolveDynamicComponent(Component), null, null), _parent2, _scopeId);
          },
          _: 2
        });
      } else {
        return [
          (vue.openBlock(), vue.createBlock(vue.Suspense, null, {
            default: vue.withCtx(() => [
              (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(Component)))
            ]),
            _: 2
          }, 1024))
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/App.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var App = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3]]);
const pages = { "./pages/image/bgcolor.vue": () => Promise.resolve().then(function() {
  return bgcolor$1;
}), "./pages/image/home.vue": () => Promise.resolve().then(function() {
  return home$1;
}) };
const routes = Object.keys(pages).map((path2) => {
  const name = path2.match(/\.\/pages(.*)\.vue$/)[1].toLowerCase();
  return {
    path: name === "/" ? "/image/home" : name,
    component: pages[path2]
  };
});
let home$2 = routes.find((v) => v.path === "/image/home");
routes.push({
  path: "/",
  component: home$2.component
});
const layoutPage = { "./layout/index.vue": () => Promise.resolve().then(function() {
  return index$1;
}) };
const layout = [
  {
    path: "/",
    component: layoutPage["./layout/index.vue"],
    children: routes
  }
];
function createRouter() {
  return vueRouter.createRouter({
    history: vueRouter.createMemoryHistory("/"),
    routes: layout
  });
}
const store = pinia.createPinia();
function setupStore(app) {
  app.use(store);
}
function createApp() {
  const app = vue.createSSRApp(App);
  const router = createRouter();
  setupStore(app);
  app.use(router);
  return { app, router, store };
}
const { basename } = path__namespace;
async function render(url, manifest) {
  const { app, router, store: store2 } = createApp();
  router.push(url);
  await router.isReady();
  const ctx = {};
  const html = await serverRenderer.renderToString(app, ctx);
  const preloadLinks = renderPreloadLinks(ctx.modules, manifest);
  return [html, preloadLinks, store2];
}
function renderPreloadLinks(modules, manifest) {
  let links = "";
  const seen = /* @__PURE__ */ new Set();
  modules.forEach((id) => {
    const files = manifest[id];
    if (files) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file);
          const filename = basename(file);
          if (manifest[filename]) {
            for (const depFile of manifest[filename]) {
              links += renderPreloadLink(depFile);
              seen.add(depFile);
            }
          }
          links += renderPreloadLink(file);
        }
      });
    }
  });
  return links;
}
function renderPreloadLink(file) {
  if (file.endsWith(".js")) {
    return `<link rel="modulepreload" crossorigin href="${file}">`;
  } else if (file.endsWith(".css")) {
    return `<link rel="stylesheet" href="${file}">`;
  } else if (file.endsWith(".woff")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
  } else if (file.endsWith(".woff2")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
  } else if (file.endsWith(".gif")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/gif">`;
  } else if (file.endsWith(".jpg") || file.endsWith(".jpeg")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`;
  } else if (file.endsWith(".png")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/png">`;
  } else {
    return "";
  }
}
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
const _sfc_main$2 = vue.defineComponent({
  name: "Bgcolor",
  setup() {
    let file = vue.ref(null);
    let fileBox = vue.ref(null);
    let image = vue.reactive({
      source: "",
      red: "",
      white: "",
      blue: ""
    });
    let currentFile = vue.reactive({
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
    vue.onMounted(() => {
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
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "image-cropping" }, _attrs))} data-v-1f18d9f2><div class="sub-title" data-v-1f18d9f2>\u8BC1\u4EF6\u7167\u5728\u7EBF\u4FEE\u6539\u80CC\u666F\u8272</div><div class="upload-box" data-v-1f18d9f2><span class="tip" data-v-1f18d9f2>\u5C06\u56FE\u7247\u62D6\u5230\u6B64\u5904\uFF0C\u6216<i data-v-1f18d9f2>\u70B9\u51FB\u4E0A\u4F20</i></span></div>`);
  if (_ctx.image.source) {
    _push(`<div class="image-box" data-v-1f18d9f2>`);
    if (_ctx.image.source) {
      _push(`<div class="image-item" data-v-1f18d9f2><div class="image-title" data-v-1f18d9f2>\u539F\u56FE</div><img${serverRenderer.ssrRenderAttr("src", _ctx.image.source)} alt="" data-v-1f18d9f2></div>`);
    } else {
      _push(`<!---->`);
    }
    if (_ctx.image.red) {
      _push(`<div class="image-item" data-v-1f18d9f2><div class="image-title" data-v-1f18d9f2>\u7EA2\u8272\u80CC\u666F</div><img${serverRenderer.ssrRenderAttr("src", _ctx.image.red)} alt="" data-v-1f18d9f2><button class="primary" data-v-1f18d9f2>\u4FDD\u5B58\u56FE\u7247</button></div>`);
    } else {
      _push(`<!---->`);
    }
    if (_ctx.image.white) {
      _push(`<div class="image-item" data-v-1f18d9f2><div class="image-title" data-v-1f18d9f2>\u767D\u8272\u80CC\u666F</div><img${serverRenderer.ssrRenderAttr("src", _ctx.image.white)} alt="" data-v-1f18d9f2><button class="primary" data-v-1f18d9f2>\u4FDD\u5B58\u56FE\u7247</button></div>`);
    } else {
      _push(`<!---->`);
    }
    if (_ctx.image.blue) {
      _push(`<div class="image-item" data-v-1f18d9f2><div class="image-title" data-v-1f18d9f2>\u84DD\u8272\u80CC\u666F</div><img${serverRenderer.ssrRenderAttr("src", _ctx.image.blue)} alt="" data-v-1f18d9f2><button class="primary" data-v-1f18d9f2>\u4FDD\u5B58\u56FE\u7247</button></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<input type="file" id="file" data-v-1f18d9f2></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/image/bgcolor.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var bgcolor = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-1f18d9f2"]]);
var bgcolor$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": bgcolor
}, Symbol.toStringTag, { value: "Module" }));
const emitter = mitt__default["default"]();
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
const _sfc_main$1 = vue.defineComponent({
  name: "Home",
  setup() {
    let width = vue.ref(230);
    let rate = vue.ref(50);
    let file = vue.ref(null);
    let fileBox = vue.ref(null);
    let imgSrc = vue.ref("");
    let currentFile = vue.reactive({
      size: 0,
      last_size: 0,
      blobUrl: "",
      name: "",
      file: null
    });
    let timer = vue.ref(null);
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
    vue.onMounted(() => {
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
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "image-cropping" }, _attrs))} data-v-136e8138><div class="sub-title" data-v-136e8138>\u56FE\u7247\u5728\u7EBF\u538B\u7F29</div><div class="upload-box" data-v-136e8138><span class="tip" data-v-136e8138>\u5C06\u56FE\u7247\u62D6\u5230\u6B64\u5904\uFF0C\u6216<i data-v-136e8138>\u70B9\u51FB\u4E0A\u4F20</i></span></div><div class="tool-bar" data-v-136e8138><button class="primary" data-v-136e8138>\u9009\u62E9\u56FE\u7247</button><div class="progress-bar" data-v-136e8138><div class="start-flag" data-v-136e8138>0%</div><div class="progress-flag" data-v-136e8138><div class="progress" data-v-136e8138><div class="rate" style="${serverRenderer.ssrRenderStyle({ width: _ctx.width + "px" })}" data-v-136e8138></div></div><div class="flag" id="flag" style="${serverRenderer.ssrRenderStyle({ "left": "240px" })}" data-v-136e8138></div></div><div class="end-flag" data-v-136e8138>100%</div></div><div class="rate-txt" data-v-136e8138>\u538B\u7F29\u7387${serverRenderer.ssrInterpolate(_ctx.rate)}%</div></div>`);
  if (_ctx.imgSrc) {
    _push(`<div class="tool-bar origin-bar" data-v-136e8138><div class="rate-txt" data-v-136e8138> \u6E90\u6587\u4EF6: <span style="${serverRenderer.ssrRenderStyle({ "color": "#f56c6c" })}" data-v-136e8138>${serverRenderer.ssrInterpolate(_ctx.currentFile.size)}KB</span></div><div class="rate-txt" data-v-136e8138> \u538B\u7F29\u540E\u56FE\u7247\u5927\u5C0F: <span style="${serverRenderer.ssrRenderStyle({ "color": "#67c23a" })}" data-v-136e8138>${serverRenderer.ssrInterpolate(_ctx.currentFile.last_size)}KB(\u8282\u7EA6${serverRenderer.ssrInterpolate(Number((_ctx.currentFile.size - _ctx.currentFile.last_size) / _ctx.currentFile.size * 100).toFixed(0))}%) </span></div><button class="primary" data-v-136e8138>\u4FDD\u5B58\u56FE\u7247</button><div class="tip" data-v-136e8138>tip: \u9ED8\u8BA4\u538B\u7F29\u7387\u4E3A50%\uFF0C\u8BF7\u81EA\u884C\u8C03\u6574\u6807\u5C3A\u4FEE\u6539\u56FE\u7247\u538B\u7F29\u7387</div></div>`);
  } else {
    _push(`<!---->`);
  }
  if (_ctx.imgSrc) {
    _push(`<div class="image-box" data-v-136e8138><img id="image"${serverRenderer.ssrRenderAttr("src", _ctx.imgSrc)} alt="" data-v-136e8138></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<input type="file" id="file" data-v-136e8138></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/image/home.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var home = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-136e8138"]]);
var home$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": home
}, Symbol.toStringTag, { value: "Module" }));
var index_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = vue.defineComponent({
  name: "Layout",
  setup() {
    return {};
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_router_view = vue.resolveComponent("router-view");
  _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "layout" }, _attrs))} data-v-1626efcc>`);
  _push(serverRenderer.ssrRenderComponent(_component_router_view, { class: "main-container" }, null, _parent));
  _push(`<div class="page-footer" data-v-1626efcc><p data-v-1626efcc>Copyright \xA9 2021-${serverRenderer.ssrInterpolate(new Date().getFullYear())} All rights reserved.</p><p data-v-1626efcc><a href="https://beian.miit.gov.cn" target="_blank" data-v-1626efcc>\u664BICP\u590719004552\u53F7</a></p></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/layout/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-1626efcc"]]);
var index$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": index
}, Symbol.toStringTag, { value: "Module" }));
exports.render = render;
