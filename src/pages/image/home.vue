<template>
  <div class="image-cropping">
    <!-- https://www.bejson.com/ui/compress_img/ -->
    <div class="sub-title">图片在线压缩</div>
    <div class="upload-box" ref="fileBox">
      <span class="tip">将图片拖到此处，或<i @click="handleSelect">点击上传</i></span>
    </div>

    <div class="tool-bar">
      <button class="primary" @click="handleSelect">选择图片</button>
      <div class="progress-bar">
        <div class="start-flag">0%</div>
        <div class="progress-flag">
          <div class="progress">
            <div class="rate" :style="{width: width+'px'}"></div>
          </div>
          <div class="flag" id="flag" style="left: 240px;"></div>
        </div>
        <div class="end-flag">100%</div>
      </div>
      <div class="rate-txt">压缩率{{rate}}%</div>
    </div>

    <div class="tool-bar origin-bar" v-if="imgSrc">
      <div class="rate-txt">
        源文件: <span style="color: #f56c6c;">{{currentFile.size}}KB</span>
      </div>
      <div class="rate-txt">
        压缩后图片大小:
        <span style="color: #67c23a;">
          {{currentFile.last_size}}KB(节约{{Number(((currentFile.size-currentFile.last_size)/currentFile.size)*100).toFixed(0)}}%)
        </span>
      </div>
      <button class="primary" @click="handleSave">保存图片</button>
      <div class="tip">tip: 默认压缩率为50%，请自行调整标尺修改图片压缩率</div>
    </div>
    <div class="image-box" v-if="imgSrc">
      <img ref="image" id="image" :src="imgSrc" alt="">
    </div>
    <input type="file" ref="file" id="file">
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, ref } from 'vue';
import DragElement from '../../assets/js/dragElement.js';
import { emitter } from '../../assets/js/mitt.js';

export default defineComponent({
  name: 'Home',
  setup() {
    let width = ref<number>(230);
    let rate = ref<number>(50);
    let file = ref<any>(null);
    let fileBox = ref<any>(null);
    let imgSrc = ref<string>('');
    let currentFile = reactive({
      size: 0,
      last_size: 0,
      blobUrl: '',
      name: '',
      file: null
    });
    let timer = ref<any>(null);

    const readImage = () => {
      const reader = new FileReader();
      reader.readAsDataURL(currentFile.file as any);
      reader.onload = function (event) {
        drawImage(event.target?.result, 1 - (rate.value / 100))
      }
    }

    function debounceFn(fn, wait) {
      if (timer.value) clearTimeout(timer.value);
      timer.value = setTimeout(() => {
        if (!fn) return
        fn();
        timer.value = null;
      }, wait)
    }

    const eventFile = (event) => {
      const file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
      currentFile.size = Number((file.size / 1024).toFixed(2));
      currentFile.name = file.name;
      currentFile.file = file;
      readImage();
    }

    const handleSelect = () => {
      file.value.click();
    }

    const drawImage = (url, rate) => {
      var img = new Image();
      img.src = url;
      var canvas;
      img.onload = function (param) {
        canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        // const base64 = canvas.toDataURL("image/jpeg", rate);
        // imgSrc.value = base64;
        canvas.toBlob((blob) => {
          currentFile.last_size = Number((blob.size / 1024).toFixed(2));
          const windowUrl = window.URL || window.webkitURL;
          currentFile.blobUrl = windowUrl.createObjectURL(blob)
          imgSrc.value = currentFile.blobUrl;
        }, "image/jpeg", rate);
      }
      img.onerror = function (error) {
        console.log(error);
      }
    }

    onMounted(() => {
      const drag = new DragElement('#flag');
      file.value.addEventListener('change', eventFile);

      fileBox.value.addEventListener("dragover", function (event) {
        event.preventDefault();
      });

      fileBox.value.addEventListener("drop", function (event) {
        event.preventDefault();
        if (event.target.className == "upload-box") {
          eventFile(event)
        }
      });
    })

    emitter.on('move-left', (query) => {
      width.value = query.left;
      rate.value = Math.round(query.left / 460 * 100);
      // console.log(width.value, rate.value + '%');
      debounceFn(readImage, 300);
    })

    const handleSave = () => {
      const aEle = document.createElement('a');
      aEle.href = currentFile.blobUrl;
      aEle.download = currentFile.name;
      aEle.click();
    }

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
</script>

<style lang='less' scoped>
.image-cropping {
  .sub-title {
    font-size: 18px;
    font-weight: 700;
    line-height: 30px;
    margin: 20px 0 10px;
  }

  .upload-box {
    width: 100%;
    height: 200px;
    border: 1px solid #cdcdcd;
    border-radius: 1px;
    display: flex;
    align-items: center;
    justify-content: center;

    .tip {
      color: #999;
      font-size: 14px;
      text-align: center;

      i {
        color: #409eff;
        font-style: normal;
        cursor: pointer;
      }
    }
  }

  .tool-bar {
    display: flex;
    align-items: center;
    margin-top: 10px;

    .progress-bar {
      margin: 0 20px;
      border: 1px solid #cdcdcd;
      border-radius: 3px;
      display: flex;
      box-sizing: border-box;
      height: 30px;

      .start-flag,
      .end-flag {
        background-color: #cccccc;
        color: #222;
        width: 50px;
        font-size: 12px;
        text-align: center;
        line-height: 28px;
      }

      .progress-flag {
        width: 500px;
        display: flex;
        align-items: center;
        position: relative;

        .progress {
          width: 100%;
          height: 8px;
          border: 1px solid #cdcdcd;
          box-sizing: border-box;
          border-radius: 5px;
          overflow: hidden;
          margin: 0 20px;

          .rate {
            height: 100%;
            background-color: #3280fc;
          }
        }

        .flag {
          position: absolute;
          top: 4px;
          width: 20px;
          height: 20px;
          background-color: #3280fc;
          border-radius: 4px;
          cursor: pointer;
        }
      }
    }

    .rate-txt {
      border: 1px solid #cecece;
      box-sizing: border-box;
      height: 30px;
      padding: 0 10px;
      line-height: 28px;
      border-radius: 3px;
      font-size: 14px;
      margin-right: 20px;
    }

    .tip {
      color: #999;
      margin-left: 20px;
      font-size: 14px;
    }
  }

  .origin-bar {
    margin-top: 20px;
  }

  #file {
    opacity: 0;
    width: 0;
    height: 0;
    display: none;
  }

  .image-box {
    width: 100%;
    border: 1px solid #cecece;
    margin-top: 10px;

    #image {
      width: calc(100% - 30px);
      margin: 15px;
    }
  }
}

button {
  height: 30px;
  line-height: 30px;
  text-align: center;
  min-width: 100px;
  border: none;
  cursor: pointer;
  border-radius: 2px;
  font-size: 14px;
}

button.primary {
  color: #fff;
  background-color: #3280fc;
}

button.primary:hover {
  background-color: #005dbe;
}
</style>