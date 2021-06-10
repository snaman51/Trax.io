import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import Login from './components/login.vue';
import Index from './components/index.vue';
import Customer from './components/customer.vue';
import CustomerDashboard from './components/customerDashboard.vue';
import CustDetails from './components/custDetails.vue'
import CustList from './components/custList.vue'


Vue.use(VueRouter)


const router = new VueRouter({
  // mode: 'history',
  // base: __dirname,
  routes: [
  { path: '/', name: 'index', component: Index },
    { path: '/login', name: 'login', component: Login },
    {path: '/customer',name: 'customer', component: Customer},
    { path: '/customerDashboard', name: 'customerDashboard', component: CustomerDashboard },
    {path:'/custDetails',name:'CustDetails',component:CustDetails},
  {path:'/custList',name:'CustList',component:CustList}
  ]
})

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')


export default router;