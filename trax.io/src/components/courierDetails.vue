<template>
  <v-app id="inspire">
    <template>
      <v-img
        src="https://media.istockphoto.com/vectors/paper-layer-blue-abstract-background-use-for-banner-cover-poster-vector-id1189542390?k=6&m=1189542390&s=612x612&w=0&h=RMyxeCYFN4JyzNFNL9MqQR5402p3Nj390Gh1t8fXN-E="
      >
        <v-container class="pt-16">
          <v-card max-width="800px">
            <v-img
              height="75px"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmyyKFktIaaRswuuIzPQRFwcqch3y6SzTZow&usqp=CAU"
            >
              <v-card-title class="fantasy white--text"
                ><v-avatar size="56">
                  <img
                    alt="user"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvCnJeNwddh9sJ7lfZbAWsxhYS5Oq6_vWpqQ&usqp=CAU"
                  />
                </v-avatar>
                <h3 class="ml-3">Courier Details</h3>
                <v-spacer></v-spacer>
                <v-btn icon dark @click="navigation">
                  <v-icon>mdi-arrow-right</v-icon>
                </v-btn></v-card-title
              ></v-img
            ><v-divider></v-divider>
            <v-form id="myform" ref="form" class="pa-2" v-model="valid">
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      outlined
                      shaped
                      :rules="[(v) => !!v || 'First Name is required']"
                      label="First Name"
                      type="text"
                      v-model="fname"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      outlined
                      shaped
                      :rules="[(v) => !!v || 'Last Name is required']"
                      label="Last Name"
                      type="text"
                      v-model="lname"
                    >
                    </v-text-field>

                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      shaped
                      required
                      outlined
                      :rules="emailRules"
                      label="Email"
                      type="email"
                      v-model="CourierObj.uname"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      shaped
                      outlined
                      hide-details
                      :rules="[(v) => !!v || 'Password is required']"
                      label="Password"
                      type="password"
                      v-model="CourierObj.password"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <gmap></gmap>
                  <!-- <div>
                    <h1>Kindly pin point your position or near by position</h1>
                    <div id="Mymap" ref="Mymap"></div>
                  </div> -->
                </v-row>
                <v-row class="mt-10 pb-2"
                  ><v-col cols="12" sm="6"
                    ><v-text-field
                      shaped
                      outlined
                      :rules="phoneRules"
                      label="Phone No."
                      type="text"
                      v-model="CourierObj.phoneno"
                    ></v-text-field
                  ></v-col>
                  <v-col cols="12" sm="6"
                    ><v-text-field
                      shaped
                      outlined
                      :rules="[(v) => !!v || 'PinCode is required']"
                      label="PinCode"
                      type="text"
                      v-model="pincode"
                    ></v-text-field
                  ></v-col> </v-row
                ><v-divider></v-divider>
                <div class="text-center pa-3">
                  <v-btn

                    class="ma-2"
                    color="primary"
                    dark
                    v-on:click="addCourier"
                  >
                    <v-icon dark left> mdi-checkbox-marked-circle </v-icon
                    >Submit
                  </v-btn>
                  <v-btn class="ma-2" dark @click="reset">
                    <v-icon dark left> mdi-minus-circle </v-icon>Reset
                  </v-btn>
                </div>
              </v-container>
            </v-form>
          </v-card>
        </v-container>
      </v-img>
    </template>
  </v-app>
</template>  
<style>
.fantasy {
  font-family: cursive;
}
</style>
<script>
import { db } from "@/db.js";
import emailjs from "emailjs-com";
import { init } from "emailjs-com";
import gmap from "./map.vue";
init("user_rjgSZyEgaFIJHNzi4znSn");
export default {
  name: "CourierDetails",
  components: {
    gmap,
  },
  data: () => ({
    fname: "",
    lname: "",
    // map: null,
    pincode: "",
    CourierObj: {
      name: "",
      uname: "",
      password: "",
      phoneno: "",
    },
    valid: true,
    apikey: "UndrPfgxVRfeeL0lM6oEuHYJIdngdG7D9jYXLrKr7Q8",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    phoneRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length == 10) || "Enter valid phone number",
    ],

  }),
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    navigation() {
      this.$router.go(-1);
    },
    addCourier() {
      this.CourierObj.name = this.fname + " " + this.lname;

      db.collection("Courier")
        .add(this.CourierObj)
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          emailjs
            .send("service_x9gq28i", "template_pegalqg", {
              name: this.CourierObj.name,
              uname: this.CourierObj.uname,
              password: this.CourierObj.password,
            })
            .then(
              function (response) {
                console.log("SUCCESS!", response.status, response.text);
              },
              function (err) {
                console.log("FAILED...", err);
              }
            );
        });
      this.$refs.form.reset();
    },
  },
};
</script>