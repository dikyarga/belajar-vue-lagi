<template>
<v-app id="example-3" standalone>
  <v-navigation-drawer temporary clipped light v-model="drawer" overflow>
    <v-list dense class="pt-0">
      <v-list-tile v-for="menu in menus" :key="menu.title">
        <v-list-tile-action>
          <v-icon>{{ menu.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <router-link :to="{ name: menu.name}">
            <v-list-tile-title>{{ menu.title }}</v-list-tile-title>
          </router-link>
        </v-list-tile-content>

      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <v-toolbar class="teal" dark>
     <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title v-on:click.native="gotoHome">Sistem Pusat MPS</v-toolbar-title>
  </v-toolbar>
  <main>

    <v-container fluid>

      <router-view></router-view>
      <!--v-router-->
    </v-container>
  </main>
</v-app>
</template>

<script>

export default {
  data() {
    return {
      drawer: false,
      menus: [{
          title: 'Penjualan',
          icon: 'dashboard',
          name: 'LaporanPenjualan'
        },
        {
          title: 'Pembelian',
          icon: 'question_answer',
          name: 'LaporanPembelian'
        }
      ],
      right: null
    }
  },
  methods: {
    gotoHome() {
      console.log('go back to home dude!');
      // this.$router.push('/')
    }
  }
}
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
