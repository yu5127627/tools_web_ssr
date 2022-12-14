import {
  createRouter as _createRouter,
  createMemoryHistory,
  createWebHistory
} from 'vue-router'

// Auto generates routes from vue files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
const pages = import.meta.glob('./pages/*/*.vue')
const routes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\/pages(.*)\.vue$/)[1].toLowerCase();
  return {
    path: name === '/' ? '/image/home' : name,
    component: pages[path] // () => import('./pages/*.vue')
  }
})

// 设置首页默认内容
let home = routes.find(v => v.path === '/image/home');
routes.push({
  path: '/',
  component: home.component
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