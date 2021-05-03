import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import Login from './components/login.vue';
// import Index from './components/index.vue';


Vue.use(VueRouter)


const router = new VueRouter({
  // mode: 'history',
  // base: __dirname,
  routes: [
  //  { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
    // { path: '/bar/:id', name: 'bar', component: Bar }
  ]
})

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
