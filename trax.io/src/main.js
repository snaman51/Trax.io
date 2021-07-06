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
import Placeorder from './components/placeorder.vue';
import Orderlist from './components/orderlist.vue';
import SellerDetails from './components/sellerDetails.vue'
import CourierDetails from './components/courierDetails.vue'

import CourierDashboard from './components/courierdashboard.vue'


import gmap from './components/map.vue'


Vue.use(VueRouter)


const router = new VueRouter({
  // mode: 'history',
  // base: __dirname,
  routes: [
  { path: '/', name: 'index', component: Index },
    { path: '/login', name: 'login', component: Login },
    { path: '/map', name: 'gmap', component: gmap },
    {path: '/customer/:orderid',name: 'customer', component: Customer, params:true},
    { path: '/customerDashboard', name: 'customerDashboard', component: CustomerDashboard },
    {path:'/custDetails/:id',name:'CustDetails',component:CustDetails},
    {path:'/custCreate',name:'CustCreate',component:CustDetails},
    {path:'/sellerDetails/:id',name:'SellerDetails',component:SellerDetails},
    {path:'/sellerCreate',name:'SellerCreate',component:SellerDetails},
    {path:'/courierDetails/:id',name:'CourierDetails',component:CourierDetails},
    {path:'/courierCreate',name:'CourierCreate',component:CourierDetails},
    {path:'/custList',name:'CustList',component:CustList},

    {path: '/courierdashboard', name:'courierpage', component: CourierDashboard},
    { path: '/placeorder/:id', name: 'placeorder', component: Placeorder},
    { path: '/orderlist/:id', name: 'orderlist', component: Orderlist},
    { path: '/hmap', name: 'hmap', component: hmap},
    
  ]
})

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')


export default router;