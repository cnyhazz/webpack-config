import Vue from 'vue'
import VueRouter from 'vue-router';
import store from './store';
import router from './app.router'

import './styles/reset.css'

Vue.use(VueRouter);

new Vue({
	el:'#app',
    router,
    store,
})