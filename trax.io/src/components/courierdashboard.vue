<template >
  <v-app id="inspire" style="background-color: black">
    <div class="ma-8">
      <v-card max-width="100%" color="grey" class="px-2 py-1">
        <v-row>
          <v-col>
            <v-card
              shaped
              class="rounded-card"
              style="margin: 20px 0px 0px 30px"
              width="700"
              height="530"
            >
              <v-container
                style="
                  display: flex;
                  justify-content: center;
                  text-align: center;
                  margin-top: 100 px;
                "
                id="app"
              >
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
          </v-col>
          <v-col>
            <v-card
              shaped
              class="rounded-lg"
              max-width="380"
              style="margin: 20px 0px 0px 15px"
            >
              <v-img
                height="285"
                src="https://image.freepik.com/free-vector/warehouse-storage-shipping-logistics-vector-concept-storage-transportation-cargo-delivery-shipping-illustration_53562-4658.jpg"
              ></v-img>

              <v-card-title>Welcome To Trax.io</v-card-title>

              <v-card-text>
                <div class="my-3 text-subtitle-3">
                  Kindly update your warehouse Location
                </div>
              </v-card-text>
              <v-card-text>
                <div class="mt-3 text-subtitle-3">Click below !!!</div>
              </v-card-text>
              <v-card-actions>
                <v-btn rounded color="primary" dark> Warehouse Location </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </v-app>
</template>

<style type="text/css">
.rounded-card {
  border-radius: 24px;
}
</style>

<script>
import { db } from "@/db.js";
import VueQrReader from "./vueqrreader.vue";

export default {
  name: "CourierDashboard",
  components: {
    VueQrReader,
  },
  data() {
    return {
      errorMessage: "",
      scanned: "",
      latitude: "",
      longitude: "",
      time: "",
      show: true,
    };
  },
  methods: {
    codeScanned(code) {
      this.scanned = code;
      console.log(this.scanned, Date.now(), this.longitude, this.latitude);
      var locobj = {
        orderid: this.scanned,
        time: Date.now(),
        longitude: this.longitude,
        latitude: this.latitude,
      };
      var locpromise = db
        .collection("location")
        .doc("device")
        .collection("snaman")
        .add(locobj)
        .then(() => {
          console.log("Document written with ID: ");
        });
      Promise.all([locpromise]).then(() => {
        this.$router.go();
      });
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
  },
};
</script>
