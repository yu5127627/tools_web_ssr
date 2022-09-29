<template>
  <div>
    <router-view v-slot="{ Component }">
      <Suspense>
        <component :is="Component" />
      </Suspense>
    </router-view>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100vh;
  width: 100%;
}

#app {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>