<template>
  <div class="layout">
    <router-view class="main-container"></router-view>
    <div class="page-footer">
      <p>Copyright © 2021-{{new Date().getFullYear()}} All rights reserved.</p>
      <p><a href="https://beian.miit.gov.cn" target="_blank">晋ICP备19004552号</a></p>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Layout',
  setup() {

    return {};
  }
});
</script>

<style lang='less' scoped>
.layout {
  width: 1160px;
  min-height: 100vh;

  .main-container {
    min-height: 100vh;
  }

  .page-footer {
    width: 1160px;
    margin: 100px 0 20px;

    p,
    a {
      font-size: 14px;
      line-height: 24px;
      text-align: center;
    }
  }
}
</style>