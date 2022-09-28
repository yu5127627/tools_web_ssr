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
#app {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>