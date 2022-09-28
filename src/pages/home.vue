<template>
  <div class="image-cropping">
    <!-- https://www.bejson.com/ui/compress_img/ -->
    <div class="sub-title">图片在线压缩</div>
    <div class="upload-box"></div>
    <div class="tool-bar">
      <button class="primary">选择图片</button>
      <div class="progress-bar">
        <div class="start-flag">0%</div>
        <div class="progress-flag"></div>
        <div class="end-flag">100%</div>
      </div>
      <div class="btn">压缩率60%</div>
      <button class="btn">批量压缩</button>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Welcome',
  setup() {
    return {};
  }
});
</script>

<style lang='less' scoped>
.image-cropping {
  .sub-title {
    font-size: 18px;
    font-weight: 700;
    line-height: 30px;
  }

  .upload-box {
    width: 100%;
    height: 200px;
    border: 1px solid #cdcdcd;
    border-radius: 1px;
  }

  .tool-bar {
    display: flex;
    align-items: center;
  }

  .progress-bar {
    margin: 0 20px;
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
}

button.primary {
  color: #fff;
  background-color: #3280fc;
}
</style>