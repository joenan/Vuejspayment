import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import RequestComponent from '@/components/views/request/request'
import PaymentRegisterComponent from '@/components/views/payment/paymentregister'
import RequestRegisterComponent from '@/components/views/requestregister/requestregister'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/request',
      name: 'request',
      component: RequestComponent
    },
    {
      path: '/requestregister',
      name: 'requestregister',
      component: RequestRegisterComponent
    },
    {
      path: '/payment',
      name: 'paymentregister',
      component: PaymentRegisterComponent
    }
  ],
  mode: 'history'

})
