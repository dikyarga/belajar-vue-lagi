<template>
  <v-card>
    <v-alert success dismissible v-model="successFetchServer1">
      Sukses mengambil data dari server 1
    </v-alert>
    <v-alert success dismissible v-model="successFetchServer2">
      Sukses mengambil data dari server 2
    </v-alert>
    <v-spacer></v-spacer>
    <div id="example-1">
        <v-layout row wrap class="pt-5 pb-2 darker">
          <v-flex xs12 md4 offset-xs1>
            <span>Dari tanggal ：</span>
            <date-picker :date="startTime" :option="dateOptions"></date-picker>
          </v-flex>
          <v-flex xs12 md4 offset-xs1>
            <span>sampai tanggal ：</span>
            <date-picker :date="endTime" :option="dateOptions"></date-picker>
          </v-flex>
          <v-flex xs12 md1>
            <v-btn outline class="indigo--text" @click.native="filterByDate()">Tampilkan</v-btn>
          </v-flex>
        </v-layout>
    </div>
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
import myDatepicker from 'vue-datepicker'
import moment from 'moment'

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
      pageTitle: 'Laporan Canvaser',
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
      startTime: {
        time: ''
      },
      endTime: {
        time: ''
      },
      dateOptions: {
        type: 'day',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY-MM-DD',
        placeholder: 'pilih tanggal',
        inputStyle: {
          'display': 'inline-block',
          'padding': '6px',
          'line-height': '22px',
          'font-size': '16px',
          'border': '2px solid #fff',
          'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
          'border-radius': '2px',
          'color': '#5F5F5F'
        },
        buttons: {
          ok: 'Ok',
          cancel: 'Cancel'
        },
        overlayOpacity: 0.5, // 0.5 as default
        dismissible: true // as true as default
      }
    }
  },
  methods: {
    loadData(hostAPI) {
      let self = this
      return new Promise((resolve, reject) => {
        console.log('fetching data from : ', hostAPI);
        axios({
          method: 'get',
          url: hostAPI + '/laporcanvaser_rest'
        }).then(res => {

          if (this.items.length === 0) {
            this.items = res.data.datalaporancanvaser
            this.successFetchServer1 = true
          } else {
            self.items = self.items.concat(res.data.datalaporancanvaser)

            this.successFetchServer2 = true
          }
          resolve(true)

          this.loading = false
        }).catch(err => {
          console.log('error saat ambil data dari server');
        })
      })
    },
    filterByDate() {
      console.log('jalan filter date');
      // console.log('------ ', moment('2010-10-19').isBetween('2010-10-19', '2010-10-25', null, '[]')); // true

      let filteredDataByDate = this.items.filter(data => {
        // console.log('isi tanggal : ', data.tanggal, ' ---- ', this.startTime.time, this.endTime.time);
        return moment(data.tanggal, "YYYY-MM-DD").isBetween(this.startTime.time, this.endTime.time, null, '[]')
      })

      this.items = filteredDataByDate
      // console.log('jumlah akhir setelah di filter : ', filteredDataByDate.length);

    }
  },
  components: {
    'date-picker': myDatepicker
  }
}
</script>

<style lang="css">
.darker {
  background-color: #eee;
}
</style>
