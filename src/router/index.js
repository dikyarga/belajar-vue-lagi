import Vue from 'vue'
import Router from 'vue-router'

import Hello from '../components/Hello.vue'
import LaporanPenjualan from '../components/LaporanPenjualan.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello ',
      component: Hello
    },
    {
      path: '/laporan-penjualan',
      name: 'LaporanPenjualan',
      component: LaporanPenjualan
    }
  ]
})
