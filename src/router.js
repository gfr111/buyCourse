/*global Vue*/
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import payOrder from '@/payOrder/payOrder'
Vue.use(Router)

module.exports = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/payOrder/:id',
      name: 'payOrder',
      component: payOrder
    }
  ]
})
