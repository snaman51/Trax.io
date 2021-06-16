<template>
  <v-app id="bg">
    <v-main>
    <v-toolbar dark dense src="https://wallpapercave.com/wp/wp7309638.jpg">

    

<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Trax.io</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon v-on:click="logout">
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
            <v-list-item-title v-on:click="home"> Track Order </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-account-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-on:click="sLogin">Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

<!--        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-account-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> Customer Login </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        -->
        
        
      </v-list-item-group>
    </v-list>


    </v-navigation-drawer>



      <router-view />
    </v-main>
  </v-app>
</template>


<style>
#bg{
background-image: linear-gradient(to left top, #1fccd7, #58d9db, #7be6e1, #9af2e8, #b6fff0);  }
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
      },
      home() {
        this.$router.push("/")
      },
      logout(){
        this.$router.push("/")
      }

    }
};
</script>
