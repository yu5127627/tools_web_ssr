<template>
  <div class="image-cropping">
    <!-- https://www.bejson.com/ui/compress_img/ -->
    <div class="sub-title">证件照在线修改背景色</div>
    <div class="upload-box" ref="fileBox">
      <span class="tip">将图片拖到此处，或<i @click="handleSelect">点击上传</i></span>
    </div>
    <div class="image-box" v-if="image.source">
      <div class="image-item" v-if="image.source">
        <div class="image-title">原图</div>
        <img :src="image.source" alt="">
      </div>
      <div class="image-item" v-if="image.red">
        <div class="image-title">红色背景</div>
        <img :src="image.red" alt="">
        <button class="primary" @click="handleSave('red',image.red)">保存图片</button>
      </div>
      <div class="image-item" v-if="image.white">
        <div class="image-title">白色背景</div>
        <img :src="image.white" alt="">
        <button class="primary" @click="handleSave('white',image.white)">保存图片</button>
      </div>
      <div class="image-item" v-if="image.blue">
        <div class="image-title">蓝色背景</div>
        <img :src="image.blue" alt="">
        <button class="primary" @click="handleSave('blue',image.blue)">保存图片</button>
      </div>
    </div>
    <input type="file" ref="file" id="file">
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, ref } from 'vue';
import updateBgColor from '../../assets/js/updateBgcolor.js';

export default defineComponent({
  name: 'Bgcolor',
  setup() {
    let file = ref<any>(null);
    let fileBox = ref<any>(null);
    let image = reactive({
      source: '',
      red: '',
      white: '',
      blue: ''
    });
    let currentFile = reactive({
      file: null
    });

    const readImage = () => {
      const reader = new FileReader();
      reader.readAsDataURL(currentFile.file as any);
      reader.onload = function (event) {
        drawImage(event.target?.result)
      }
    }

    const eventFile = (event) => {
      const file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
      currentFile.file = file;
      readImage();
    }

    const handleSelect = () => {
      file.value.click();
    }

    const drawImage = (url) => {
      var img = new Image();
      img.src = url;
      image.source = url;
      var canvas;
      img.onload = async function (param) {
        canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        let imageDate = updateBgColor(ctx.getImageData(0, 0, img.width, img.height), [255, 0, 0]);
        ctx.putImageData(imageDate, 0, 0);
        await new Promise(res => {
          canvas.toBlob((blob) => {
            const windowUrl = window.URL || window.webkitURL;
            image.red = windowUrl.createObjectURL(blob);
            res('')
          });
        })
        imageDate = updateBgColor(ctx.getImageData(0, 0, img.width, img.height), [255, 255, 255]);
        ctx.putImageData(imageDate, 0, 0);
        await new Promise(res => {
          canvas.toBlob((blob) => {
            const windowUrl = window.URL || window.webkitURL;
            image.white = windowUrl.createObjectURL(blob);
            res('')
          });
        })
        imageDate = updateBgColor(ctx.getImageData(0, 0, img.width, img.height), [0, 125, 255]);
        ctx.putImageData(imageDate, 0, 0);
        await new Promise(res => {
          canvas.toBlob((blob) => {
            const windowUrl = window.URL || window.webkitURL;
            image.blue = windowUrl.createObjectURL(blob);
            res('')
          });
        })
      }
      img.onerror = function (error) {
        console.log(error);
      }
    }

    onMounted(() => {
      file.value.addEventListener('change', eventFile);
    })

    const handleSave = (color, blobUrl) => {
      const aEle = document.createElement('a');
      aEle.href = blobUrl;
      aEle.download = color + '_' + Date.now();
      aEle.click();
    }

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

  #file {
    opacity: 0;
    width: 0;
    height: 0;
    display: none;
  }

  .image-box {
    width: 100%;
    margin-top: 30px;
    display: flex;

    .image-item {
      width: 150px;
      border: 1px solid #cecece;
      padding: 10px;
      margin-right: 20px;

      .image-title {
        line-height: 20px;
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 10px;
      }

      img {
        width: 100%;
      }

      button {
        margin-top: 10px;
        width: 100%;
      }
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