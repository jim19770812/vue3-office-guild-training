import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Training01 from '../views/Training01-开始.vue'
import Training02 from '../views/Training02-基础.vue'
import Training0101 from '../views/Training01-开始-错误处理器.vue'
import Training0102 from '../views/Training01-开始-setup语法糖.vue'
import Training03 from '../views/Training03-深入组件.vue'
import Training04 from '../views/Training04-逻辑复用.vue'
import Training05 from '../views/Training05-内置组件.vue'
import Training06 from '../views/Training06-应用规模化.vue'
import Training07 from '../views/Training07-最佳实践.vue'
import Training08 from '../views/Training08-TypeScript.vue'
import Training09 from '../views/Training09-进阶主题.vue'
import Training10_01 from '../views/Training10-01-API练习.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/training-01',
      name: '01.开始',
      component: Training01
    },
    {
      path: '/training-01-1',
      name: '01.1.开始-错误处理',
      component: Training0101
    },
    {
      path: '/training01-01-2',
      name: '01.2-开始-setup语法糖.vue',
      component: Training0102
    },
    {
      path: '/training-02',
      name: '02.基础',
      component: Training02
    },
    {
      path: '/training-03',
      name: '03.深入组件',
      component: Training03
    },
    {
      path: '/training-04',
      name: '04.逻辑复用',
      component: Training04
    },
    {
      path: '/training-05',
      name: '05.内置组件',
      component: Training05
    },
    {
      path: '/training-06',
      name: '06.应用规模化',
      component: Training06
    },
    {
      path: '/training-07',
      name: '07.最佳实践',
      component: Training07
    },
    {
      path: '/training-08',
      name: '08.TypeScript',
      component: Training08
    },
    {
      path: '/training-09',
      name: '09.进阶主题',
      component: Training09
    },
    {
      path: '/training-10-01',
      name: "10.1.API练习",
      component: Training10_01
    }
  ]
})

export default router
