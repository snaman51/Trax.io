<template>
  <v-app id="bgimg">
    <v-main>
    <v-toolbar dark dense src="https://wallpapercave.com/wp/wp7309638.jpg">

    

<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Trax.io</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-toolbar>

<v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
      class="teal lighten-4"
    >

    <v-list shaped>
      <v-list-item-group
        color="primary"
      >
        <v-list-item>
          <v-list-item-icon>
          <v-icon>
            mdi-map-marker
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> Real-Time Map </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-account-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-on:click="sLogin">Seller Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-account-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> Customer Login </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        
      </v-list-item-group>
    </v-list>


    </v-navigation-drawer>



      <router-view />
    </v-main>
  </v-app>
</template>


<style>
#bgimg {
    background: url("https://st3.depositphotos.com/8343336/16085/i/1600/depositphotos_160850202-stock-photo-cargo-transportation-unloading-container-trucks.jpg") fill no-repeat center center;
}
</style>


<script>

export default {
  name: "App",

  components: {
    // Index,
  },

  data: () => ({
    drawer:false,
      group: null
    
  }),

  watch: {
      group () {
        this.drawer = false
      },
    },

    methods: {
      sLogin() {
        this.$router.push("/login")
      }
    }
};
</script>
