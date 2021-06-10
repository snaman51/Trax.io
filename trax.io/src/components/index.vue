  <template>
  <v-app>
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

  .search {
    position:relative;
    top:20vh;
  }

</style>

<script>

export default {
  name: "Index",

  data: () => ({

    }),


    
};
</script>
