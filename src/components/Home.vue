<template>
  <div id="main-menu">
    <v-layout row wrap>
      <v-flex xs12 sm12 md2 v-for="i in menus" :key="i.name" @click="gotoPage(i.pageComponentName)">
          <v-card >
            <v-card-media
                       :src="i.icon"
                       height="100px"
                       contain
                     ></v-card-media>
            <h6 class="pa-4 text-xs-center">{{ i.name }}</h6>
          </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menus: [
        {
          name: 'Stok',
          icon: '/src/assets/images/stok.png',
          pageComponentName: 'Stok'
        },
        {
          name: 'Laporan Penjualan',
          icon: '/src/assets/images/penjualan.png',
          pageComponentName: 'LaporanPenjualan'
        },
        {
          name: 'Laporan Pembelian',
          icon: '/src/assets/images/pembelian.png',
          pageComponentName: 'LaporanPembelian'
        },
        {
          name: 'Rekap Produk',
          icon: '/src/assets/images/rekap-produk.png',
          pageComponentName: 'LaporRekap'
        },
        {
          name: 'Laporan Per Canvaser',
          icon: '/src/assets/images/canvaser.png',
          pageComponentName: 'LaporanCanvaser'
        }
      ]
    }

  },
  methods: {
    gotoPage(componentName) {
      console.log('yeay! ', componentName);
      this.$router.push({ name: componentName})
    }
  }

}
</script>

<style lang="css">
.main-menu {
  text-align: center;
}
</style>
