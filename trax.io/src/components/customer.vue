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
      Order No: {{orderid}}
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
              small
            >
              <div>
                <div class="font-weight-normal">
                  <strong>In {{ message.place }}</strong>
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
import {db} from "@/db.js";
var platform,defaultLayers=null

export default {
  name: "Customer",
  
   props: {
    center: {lat: 40.730610, lng: -73.935242}
    // center object { lat: 40.730610, lng: -73.935242 }
  },

  data: () => ({
       show: false,
      waypoints:[],
      orderid:"",
      platform: null,
      dest:"",
      src:"",
      defaultLayers: null,
      apikey: "UndrPfgxVRfeeL0lM6oEuHYJIdngdG7D9jYXLrKr7Q8",
       messages: [
        // {
        //   place: 'Delhi',
        //   time: '10:42am',
        //   color: 'deep-purple lighten-1',
        // },
        // {
        //   place: 'Mumbai',
        //   time: '2:37pm',
        //   color: 'green',
        // },
        // {
        //   place: 'Bangalore',
        //   time: '5:47pm',
        //   color: 'deep-purple lighten-1',
        // },
      ],

    }),
    async mounted() {
      this.orderid=this.$route.params.orderid
    const H = window.H;
    platform = new H.service.Platform({
  'apikey': this.apikey
});
this.initializeHereMap();

  },

  methods: {
      initializeHereMap() { // rendering map

      const H = window.H;
      defaultLayers = platform.createDefaultLayers();

      var map = new H.Map(
  document.getElementById('mapContainer'),
  defaultLayers.vector.normal.map,
  {
    zoom: 5,
    center: { lat: 52.51, lng: 13.4 }
  });

this.src = null;
this.fetchSrc = function() {
  return db.collection("location").doc("device").collection("snaman").orderBy("time").limit(1).get().then((docs)=>{
  docs.forEach((doc)=> {
  if(doc.exists){
    this.src=String(doc.data().latitude)+","+String(doc.data().longitude);

    var service = platform.getSearchService();
      service.reverseGeocode({
      at: this.src
    }, (result) => {
      result.items.forEach((item) => {
        var date = new Date(doc.data().time);
        var dateTime=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
        this.messages.push({"place":item.address.city,"time":dateTime})
      })
    }
      )
  }
  })
});
}

this.dest= null;
this.fetchDest = function() {
  return db.collection("location").doc("device").collection("snaman").orderBy("time","desc").limit(1).get().then((docs)=>{
    docs.forEach((doc)=>{
      this.dest= String(doc.data().latitude)+","+String(doc.data().longitude);
      
    })
    
  });
}


this.fetchWaypoints = function() {
  return db.collection("location").doc("device").collection("snaman").orderBy("time").get().then((docs)=>{
    docs.forEach((doc)=>{
    if(doc.exists){
      this.waypoints.push(String(doc.data().latitude)+","+String(doc.data().longitude));
var service = platform.getSearchService();
      service.reverseGeocode({
      at: this.waypoints[0]
    }, (result) => {
      result.items.forEach((item) => {
        console.log(item.address.city)

        this.messages.forEach((i)=>{
        if(i.place==item.address.city){
          var date = new Date(doc.data().time);
        var dateTime=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
          i.time=dateTime
        }
        else{
          this.messages.push({'place':item.address.city,'time':doc.data().time})
        }
      })
        
      })

    }
      )
    }
    })
  });
}


// console.log(this.dest)

this.fetchSrc()
.then(this.fetchDest.bind(this))
.then(this.fetchWaypoints.bind(this))
.then(() => {
  console.log(this.src, this.dest, this.waypoints);

  var routingParameters = {
  'routingMode': 'fast',
  'transportMode': 'car',
  // The start point of the route:
  'origin': this.src,
  // The end point of the route:
  'destination': this.dest,
  'via': new H.service.Url.MultiValueQueryParameter( this.waypoints ),
  // Include the route shape in the response
  'return': 'polyline'
};

// Define a callback function to process the routing response:
var onResult = function(result) {
  // ensure that at least one route was found
  if (result.routes.length) {
    result.routes[0].sections.forEach((section) => {
         // Create a linestring to use as a point source for the route line
        let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

        // Create a polyline to display the route:
        let routeLine = new H.map.Polyline(linestring, {
          style: { strokeColor: 'black', lineWidth: 3 }
        });

        var svgMarkup='<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">'+
   '<circle cx="12" cy="12" r="10" stroke="black" stroke-width="1" fill="aqua" />'+
   'Sorry, your browser does not support inline SVG.'+
'</svg> '


        var icon = new H.map.Icon(svgMarkup)

        // Create a marker for the start point:
        let startMarker = new H.map.Marker(section.departure.place.location,{icon:icon});

        // Create a marker for the end point:
        let endMarker = new H.map.Marker(section.arrival.place.location,{icon:icon});

        // Add the route polyline and the two markers to the map:
        map.addObjects([routeLine, startMarker, endMarker]);

        // Set the map's viewport to make the whole route visible:
        map.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()});
    });
  }
};

// Get an instance of the routing service version 8:
var router = platform.getRoutingService(null, 8);

// Call calculateRoute() with the routing parameters,
// the callback and an error callback function (called if a
// communication error occurs):
router.calculateRoute(routingParameters, onResult,
  function(error) {
    alert(error.message);
  });

        addEventListener("resize", () => map.getViewPort().resize());

      // add behavior control
      new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
      




})

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




// Instantiate a map and platform object:


// Instantiate the map:
