<template>
  <v-app id="bg">
<v-container class="mt-3">
<v-card
    class="mx-auto"
    max-width="600"
  >
    <v-img >
  <!--In the following div the HERE Map will render-->
    <div id="mapContainer" style="height:400px;width:100%" ref="hereMap"></div></v-img>

    <v-card-title>
      Order No: 82736382
    </v-card-title>

    <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
      >
        Detailed Order
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          <div class="font-weight-bold ml-8 mb-2">
            Today
          </div>

          <v-timeline
            align-top
            dense
          >
            <v-timeline-item
              v-for="message in messages"
              :key="message.time"
              :color="message.color"
              small
            >
              <div>
                <div class="font-weight-normal">
                  <strong>Arrived {{ message.place }}</strong>
                </div>
                <div>@ {{ message.time }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</v-container>
    </v-app>
  </template>

  <style>

  .search {
    position:relative;
    top:20vh;
  }

  #bg{
background-image: linear-gradient(to left top, #1fccd7, #58d9db, #7be6e1, #9af2e8, #b6fff0);  }


</style>

<script>

export default {
  name: "Customer",
   props: {
    center: {lat: 40.730610, lng: -73.935242}
    // center object { lat: 40.730610, lng: -73.935242 }
  },

  data: () => ({
       show: false,
      platform: null,
      apikey: "UndrPfgxVRfeeL0lM6oEuHYJIdngdG7D9jYXLrKr7Q8",
       messages: [
        {
          place: 'Delhi',
          time: '10:42am',
          color: 'deep-purple lighten-1',
        },
        {
          place: 'Mumbai',
          time: '2:37pm',
          color: 'green',
        },
        {
          place: 'Bangalore',
          time: '5:47pm',
          color: 'deep-purple lighten-1',
        },
      ],

    }),
    async mounted() {
    // Initialize the platform object:
    const platform = new window.H.service.Platform({
      apikey: this.apikey
    });
    this.platform = platform;
    this.initializeHereMap();
    console.log("Inside mounted")
  },

  methods: {
      initializeHereMap() { // rendering map

      const mapContainer = this.$refs.hereMap;
      console.log(mapContainer)
      const H = window.H;
      // Obtain the default map types from the platform object
      var maptypes = this.platform.createDefaultLayers();
      console.log("Inside Heremap")

      // Instantiate (and display) a map object:
      var map = new H.Map(mapContainer, maptypes.vector.normal.map, {
        zoom: 15,
        center: {lat: 28.6129, lng: 77.2295}
        // center object { lat: 40.730610, lng: -73.935242 }
      });

      addEventListener("resize", () => map.getViewPort().resize());

      // add behavior control
      new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      // add UI
      H.ui.UI.createDefault(map, maptypes);
      // End rendering the initial map
    }
  }

    
};
</script>

<style scoped>
#map {
  width: 60vw;
  min-width: 360px;
  text-align: center;
  margin: 5% auto;
  background-color: #ccc;
}
</style>
