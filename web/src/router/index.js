import Vue from 'vue'
import Router from 'vue-router'
import Navigation from '../components/Navigation.vue'
import Dicom from '../components/dwv.vue'
import Home from '../components/Home.vue'
import Organ from '../components/Organ.vue'
import Archive from '../components/Archive.vue'
import dwv_1 from '../components/dwv_1.vue'
import BaoTa from '../components/BaoTa.vue'

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
      path: '/dicom',
      component: Home,
      children: [{ path: '/dicom', component: Dicom}]
    },
    { 
      path: '/home',
      component: Home,
      children: [{ path: '/organ', component: Organ}]
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
      children: [{ path: '/dwv_1', component: dwv_1}]
    },
  ]
})