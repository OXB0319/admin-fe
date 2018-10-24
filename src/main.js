// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from './router'
import App from './app';
// 需要加babel-polyfill

import './icons' // icon
//引用element-ui
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

//国际化
import i18n from './lang' // Internationalization
import Cookies from 'js-cookie'

import service from './api/index'
import store from './store'
import './permission' // permission control

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import 'font-awesome/css/font-awesome.min.css'

Vue.use(Element, {
    size: Cookies.get('size') || 'medium', // set element-ui default size
    i18n: (key, value) => i18n.t(key, value)
})

// use
Vue.use(VueQuillEditor)

Vue.prototype.api = service.apis

window.$app = new Vue({
  el: '#app',
    router,
    store,
    i18n,
   render: h => h(App)
});