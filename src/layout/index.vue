<template>
  <div class="layout">
    <router-view></router-view>
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
* {
  margin: 0;
  padding: 0;
}

.layout {
  width: 1160px;
}
</style>