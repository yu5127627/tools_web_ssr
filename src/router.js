import {
  createRouter as _createRouter,
  createMemoryHistory,
  createWebHistory
} from 'vue-router'

// Auto generates routes from vue files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
const pages = import.meta.glob('./pages/*.vue')
const routes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\/pages(.*)\.vue$/)[1].toLowerCase()
  console.log(name);
  return {
    path: name,
    component: pages[path] // () => import('./pages/*.vue')
  }
})
const layoutPage = import.meta.glob('./layout/*.vue');
const layout = [
  {
    path: '/',
    component: layoutPage['./layout/index.vue'],
    children: routes
  }
]
export function createRouter() {
  return _createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    history: import.meta.env.SSR
      ? createMemoryHistory('/')
      : createWebHistory('/'),
    routes: layout
  })
}