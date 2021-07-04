<template>
<v-card shaped class="rounded-card mx-auto my-12"
    max-width="350"
    >
<v-container 
style= "display: flex; justify-content: center; text-align: center; margin-top: 100 px" id="app">
 <div id="app">
    <vue-qr-reader
      v-if="show"
      v-on:code-scanned="codeScanned"
      v-on:error-captured="errorCaptured"
      :stop-on-scanned="true"
      :draw-on-found="true"
      :responsive="false"
    />
    {{ scanned }}
   
  </div>
  </v-container>
  </v-card>
</template>

<style type="text/css">
.rounded-card{
  border-radius: 24px;
}
</style>

<script>
import {db} from "@/db.js";
import VueQrReader from "./vueqrreader.vue";

export default {
  name: "CourierDashboard",
  components: {
    VueQrReader
  },
  data() {
    return {
      errorMessage: "",
      scanned: "",
      latitude:'',
      longitude:'',
      time:'',
      show: true
    };
  },
  methods: {
    codeScanned(code) {
      this.scanned = code;
      console.log(this.scanned,Date.now(),this.longitude,this.latitude);
      var locobj={
        orderid: this.scanned,
        time: Date.now(),
        longitude: this.longitude,
        latitude:this.latitude
      }
      var locpromise=db.collection("location").doc("device").collection("snaman").add(locobj)
        .then(() => {
        console.log("Document written with ID: ");
      })
      Promise.all([locpromise]).then(()=>{
      this.$router.go();
    })
    },

    errorCaptured(error) {
      switch (error.name) {
        case "NotAllowedError":
          this.errorMessage = "Camera permission denied.";
          break;
        case "NotFoundError":
          this.errorMessage = "There is no connected camera.";
          break;
        case "NotSupportedError":
          this.errorMessage =
            "Seems like this page is served in non-secure context.";
          break;
        case "NotReadableError":
          this.errorMessage =
            "Couldn't access your camera. Is it already in use?";
          break;
        case "OverconstrainedError":
          this.errorMessage = "Constraints don't match any installed camera.";
          break;
        default:
          this.errorMessage = "UNKNOWN ERROR: " + error.message;
      }
      console.error(this.errorMessage);
    },
   
  }
};
</script>
