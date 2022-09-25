import Vue from 'vue'
import Router from 'vue-router'
import Navigation from '../components/Navigation.vue'
import Watermark from '../components/Watermark.vue'
import Home from '../components/Home.vue'
import Archive from '../components/Archive.vue'
import BaoTa from '../components/BaoTa.vue'
import Racknerd from '../components/Racknerd.vue'


Vue.use(Router)

export default new Router({
  routes: [
    // 重定向
    { path: '/', redirect:'/navigation'},
    // { path: '/dicom', component: Dicom},
    { 
      path: '/home',
      component: Home,
      redirect: '/navigation',
      children: [{ path: '/navigation', component: Navigation}]
    },
    { 
      path: '/home',
      component: Home,
      children: [{ path: '/baota', component: BaoTa}]
    },
    { 
      path: '/home',
      component: Home,
      children: [{ path: '/archive', component: Archive}]
    },
    { 
      path: '/home',
      component: Home,
      children: [{ path: '/racknerd', component: Racknerd}]
    },
    { 
      path: '/home',
      component: Home,
      children: [{ path: '/watermark', component: Watermark}]
    },
  ]
})