<template>
  <v-app id="inspire" style="background-color: #9e97db">
    <template>
      <v-container class="pt-10" width="100%">
        <v-row no-gutters width="100%">
          <v-col>
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
                  <h3 class="ml-3">Customer Details</h3>
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
                        v-model="customerObj.uname"
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
                        v-model="customerObj.password"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="12">
                      <v-text-field
                        shaped
                        outlined
                        label="Ethereum Address"
                        type="text"
                        :rules="etherRules"
                        v-model="customerObj.etheraddress"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-textarea
                        shaped
                        outlined
                        :rules="[(v) => !!v || 'Address is required']"
                        name="input-7-4"
                        label="Permanent Address"
                        v-model="paddress"
                      ></v-textarea> </v-col
                  ></v-row>
                  <v-row class="pb-3"
                    ><v-col cols="12" sm="6"
                      ><v-text-field
                        shaped
                        outlined
                        :rules="phoneRules"
                        label="Phone No."
                        type="text"
                        v-model="customerObj.phoneno"
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
                      v-on:click="addCustomer"
                    >
                      <v-icon dark left> mdi-checkbox-marked-circle </v-icon
                      >Submit
                    </v-btn>
                    <v-btn class="ma-2" dark @click="reset">
                      <v-icon dark left> mdi-minus-circle </v-icon>Reset
                    </v-btn>
                    <v-btn class="ma-2" color="error" @click="deleteCustomer">
                      <v-icon dark left> mdi-delete </v-icon>Delete
                    </v-btn>
                  </div>
                </v-container>
              </v-form>
            </v-card>
          </v-col>
          <v-col>
            <v-img
              width="550"
              height="715"
              src="https://cdn.dribbble.com/users/856306/screenshots/6143326/signform_loop-output_800x600.gif"
            ></v-img>
          </v-col>
        </v-row>
      </v-container>
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
init("user_rjgSZyEgaFIJHNzi4znSn");
export default {
  name: "CustDetails",
  data: () => ({
    fname: "",
    lname: "",
    paddress: "",
    pincode: "",
    customerObj: {
      name: "",
      uname: "",
      password: "",
      phoneno: "",
      address: "",
      etheraddress: "",
    },
    valid: true,
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    etherRules: [
      (v) => !!v || "Ethereum Address is required",
      (v) => /^0x[a-fA-F0-9]{40}$/.test(v) || "Ethereum Address must be valid",
    ],
    phoneRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length == 10) || "Enter valid phone number",
    ],
  }),

  created() {
    console.log(this.$route.params.id);
    if (this.$route.name == "CustDetails") {
      this.flag = 1;
      db.collection("customer")
        .doc(this.$route.params.id)
        .get()
        .then((docs) => {
          console.log("doc data", docs.data());
          this.customerObj = docs.data();
          var a = this.customerObj.name.split(" ");
          console.log(a);
          this.fname = a[0];
          delete a[0];
          console.log(a);
          this.lname = a.join(" ");
          var addr = this.customerObj.address.split(" ");
          this.pincode = addr[addr.length - 1];
          delete addr[addr.length - 1];
          this.paddress = addr.join(" ");
        });
    }
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    navigation() {
      this.$router.push("/custList");
    },
    addCustomer() {
      if (this.$route.name == "CustCreate") {
        this.customerObj.name = this.fname + " " + this.lname;
        this.customerObj.address = this.paddress + " " + this.pincode;
        db.collection("customer")
          .add(this.customerObj)
          .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            emailjs
              .send("service_x9gq28i", "template_pegalqg", {
                name: this.customerObj.name,
                uname: this.customerObj.uname,
                password: this.customerObj.password,
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
      } else {
        this.customerObj.name = this.fname + " " + this.lname;
        this.customerObj.address = this.paddress + " " + this.pincode;
        db.collection("customer")
          .doc(this.$route.params.id)
          .update(this.customerObj)
          .then(() => {
            console.log("Updated successfully");
          });
      }
    },
    deleteCustomer() {
      db.collection("customer")
        .doc(this.$route.params.id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
          this.$router.push("/custList");
        });
    },
  },
};
</script>
   