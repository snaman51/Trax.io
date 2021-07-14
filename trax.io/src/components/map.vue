<template>
  <div>
    <h1>Kindly pin point your position or near by position</h1>
    <div id="Mymap" ref="Mymap" @click="passEvent"></div>
  </div>
</template>
<script>
export default {
  name: "gmap",
  props: {},

  data: () => ({
    map: null,
    myLatlng: {
      lat: 13.0518166,
      lng: 77.607755,
    },
  }),
  mounted() {
    // this.myLatlng = { lat: 13.0518166, lng: 77.607755 };

    this.map = new window.google.maps.Map(this.$refs["Mymap"], {
      zoom: 15,
      center: this.myLatlng,
    });
    let infoWindow = new window.google.maps.InfoWindow();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.myLatlng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        infoWindow.setPosition(this.myLatlng);
        infoWindow.setContent("Location found.");
        infoWindow.open(this.map);
        this.map.setCenter(this.myLatlng);
      },
      (error) => {
        console.log(error.message);
      }
    );
    // Create the initial InfoWindow.
    console.log("map: ", window.google.maps);
    // let infoWindow = new window.google.maps.InfoWindow({
    //   content: "Click the map to get Lat/Lng!",
    //   position: myLatlng,
    // });
    infoWindow.open(this.map);
    // Configure the click listener.
    this.map.addListener("click", (mapsMouseEvent) => {
      // Close the current InfoWindow.
      infoWindow.close();
      // Create a new InfoWindow.
      infoWindow = new window.google.maps.InfoWindow({
        position: mapsMouseEvent.latLng,
      });
      infoWindow.setContent(
        JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
      );
      infoWindow.open(this.map);
      // console.log(JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2));

      this.myLatlng = mapsMouseEvent.latLng.toJSON();
      console.log(this.myLatlng.lat);
      this.$emit("changeLatLng", this.myLatlng);
    });
  },
  method: {
    passEvent() {
      this.$emit("changeLatLng", this.myLatlng);
    },
  },
};
</script>
<style scoped>
#Mymap {
  height: 500px;
}
</style>