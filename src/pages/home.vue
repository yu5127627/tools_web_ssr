<template>
  <div class="image-cropping">
    <!-- https://www.bejson.com/ui/compress_img/ -->
    <div class="sub-title">图片在线压缩</div>
    <div class="upload-box"></div>
    <div class="tool-bar">
      <button class="primary">选择图片</button>
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
      <button class="btn">批量压缩</button>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref } from 'vue';
import DragElement from '../assets/js/dragElement.js';
import { emitter } from '../assets/js/mitt.js';

export default defineComponent({
  name: 'Welcome',
  setup() {
    let width = ref<number>(230);
    let rate = ref<number>(50);

    onMounted(() => {
      const drag = new DragElement('#flag');
    })

    emitter.on('move-left', (query) => {
      width.value = query.left;
      rate.value = Math.round(query.left / 460 * 100);
      console.log(width.value, rate.value + '%');

    })

    return {
      width,
      rate
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
  }

  .upload-box {
    width: 100%;
    height: 200px;
    border: 1px solid #cdcdcd;
    border-radius: 1px;
    margin-bottom: 10px;
  }

  .tool-bar {
    display: flex;
    align-items: center;

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