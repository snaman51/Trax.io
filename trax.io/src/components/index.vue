  <template>
  <v-app id="bg">
    <div >
      <v-container class="search" fill-height pa-16>
      <v-text-field
              solo
              label="Track Here"
              prepend-inner-icon="mdi-map-marker"
              clearable
            ></v-text-field>

  </v-container>
  <router-view></router-view>

    </div>
    </v-app>
  </template>

  <style>
  #bg{
background-image: linear-gradient(to left top, #1fccd7, #58d9db, #7be6e1, #9af2e8, #b6fff0);  }

  .search {
    position:relative;
    top:20vh;
  }

</style>

<script>

export default {
  name: "Index",

  data: () => ({
      drawer:false,
      group: null
    }),


    watch: {
      group () {
        this.drawer = false
      },
    },

    
};
</script>
