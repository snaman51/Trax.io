<template>
  <div>
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
            <v-list-item-title><router-link style="text-decoration: none;" :to="{ name: 'login' }">Seller Login</router-link></v-list-item-title>
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

    
    <router-view ></router-view>


<v-container fill-height fluid>
    <v-text-field
            solo
            label="Prepend inner"
            prepend-inner-icon="mdi-map-marker"
          ></v-text-field>
          
</v-container>
  </div>

</template>

<script>
export default {
  name: "Index",

  data: () => ({
      drawer:false,
      group: null,
      items: [
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' },
      ],
    }),


    watch: {
      group () {
        this.drawer = false
      },
    },
};
</script>
