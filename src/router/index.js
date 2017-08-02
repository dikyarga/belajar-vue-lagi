import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home.vue'
import LaporanPenjualan from '../components/LaporanPenjualan.vue'
import LaporanPembelian from '../components/LaporanPembelian.vue'
import LaporanCanvaser from '../components/LaporanCanvaser.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/laporan-penjualan',
      name: 'LaporanPenjualan',
      component: LaporanPenjualan
    },
    {
      path: '/laporan-pembelian',
      name: 'LaporanPembelian',
      component: LaporanPembelian
    },
    {
      path: '/laporan-canvaser',
      name: 'LaporanCanvaser',
      component: LaporanCanvaser
    }
  ]
})
