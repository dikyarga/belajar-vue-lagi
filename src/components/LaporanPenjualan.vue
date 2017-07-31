<template>

  <v-card>
    <v-alert success dismissible v-model="successFetchServer1">
      Sukses mengambil data dari server 1
    </v-alert>
    <v-alert success dismissible v-model="successFetchServer2">
      Sukses mengambil data dari server 2
    </v-alert>
    <v-card-title>
      <h4>{{ pageTitle }}</h4>
      <v-spacer></v-spacer>
      <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
    </v-card-title>
    <v-data-table v-bind:headers="headers" v-bind:items="items" v-bind:search="search" :loading="loading">
      <template slot='items' scope='props'>
      <td class="text-xs-right">{{ props.item.invoiceno }}</td>
      <td class="text-xs-right">{{ props.item.nm_cabang }}</td>
      <td class="text-xs-right">{{ props.item.productname }}</td>
      <td class="text-xs-right">{{ props.item.hpp }}</td>
      <td class="text-xs-right">{{ props.item.jumlah }}</td>
      <td class="text-xs-right">{{ props.item.totjual }}</td>
      <td class="text-xs-right">{{ props.item.tanggaljual }}</td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>

import axios from 'axios'

let host1 = 'http://udin.us/deniya/api'
let host2 = 'http://udin.us/deniya2/api'

export default {
  created() {
    let self = this
    console.log('ready');
    self.loadData(host1).then((isSuccess) => {

      if (isSuccess) {
        self.loadData(host2)
      }
    })
  },
  data() {
    return {
      loading: true,
      pageTitle: 'Laporan Penjualan',
      successFetchServer1: false,
      successFetchServer2: false,
      search: '',
      pagination: {},
      headers: [{
          text: 'Invoice Number',
          value: 'invoiceno'
        },
        {
          text: 'Nama Cabang',
          value: 'nm_cabang'
        },
        {
          text: 'Nama Produk',
          value: 'productname'
        },
        {
          text: 'Jumlah',
          value: 'jumlah'
        },
        {
          text: 'Harga PP',
          value: 'hpp'
        },
        {
          text: 'Total',
          value: 'totjual'
        },
        {
          text: 'Tanggal Jual',
          value: 'tanggaljual'
        }
      ],
      items: [],
    }
  },
  methods: {
    loadData(hostAPI) {
      let self = this
      return new Promise((resolve, reject) => {
        console.log('fetching data from : ', hostAPI);
        axios({
          method: 'get',
          url: hostAPI + '/laporjual_rest'
        }).then(res => {

          if (this.items.length === 0) {
            this.items = res.data.datalaporanpenjualan
            this.successFetchServer1 = true
          } else {
            self.items = self.items.concat(res.data.datalaporanpenjualan)

            this.successFetchServer2 = true
          }
          resolve(true)

          this.loading = false
        }).catch(err => {
          console.log('error saat ambil data dari server');
        })
      })
    }
  }
}
</script>

<style lang="css">
</style>
