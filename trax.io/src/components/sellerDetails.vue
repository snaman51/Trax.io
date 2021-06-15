<template>
  <v-app id="inspire">
    <template >
    <v-img
    src="https://media.istockphoto.com/vectors/paper-layer-blue-abstract-background-use-for-banner-cover-poster-vector-id1189542390?k=6&m=1189542390&s=612x612&w=0&h=RMyxeCYFN4JyzNFNL9MqQR5402p3Nj390Gh1t8fXN-E=">
    <v-container class="pt-16">
    <v-card 
    max-width="800px">
    <v-img
          height="75px"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmyyKFktIaaRswuuIzPQRFwcqch3y6SzTZow&usqp=CAU"
        >
    <v-card-title class="fantasy white--text "><v-avatar size="56">
              <img 
                alt="user"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvCnJeNwddh9sJ7lfZbAWsxhYS5Oq6_vWpqQ&usqp=CAU"
              >
            </v-avatar><h3 class="ml-3"> Seller Details</h3><v-spacer></v-spacer>
        <v-btn icon dark to="/custList">
            <v-icon >mdi-arrow-right</v-icon>
          </v-btn></v-card-title></v-img><v-divider></v-divider>
        <v-form id="myform" ref="form" class="pa-2" v-model="valid">
            <v-container>
            <v-row>
                <v-col
                cols="12"
                sm="6" >
                    <v-text-field
                              outlined
                              shaped
                              :rules="[(v) => !!v || 'First Name is required']"
                              label="First Name"
                              type="text"
                              v-model="fname">
                    </v-text-field>
                </v-col>
                <v-col
                cols="12"
                sm="6">
                <v-text-field
                              outlined
                              shaped
                              :rules="[(v) => !!v || 'Last Name is required']"
                              label="Last Name"
                              type="text"
                              v-model="lname">
                              </v-text-field>
                    </v-col>
            </v-row>
            <v-row>
                <v-col
                cols="12"
                sm="6" >
                    <v-text-field
                              shaped
                              required
                              outlined
                              :rules="emailRules"
                              label="Email"
                              type="email"
                              v-model="sellerObj.uname">
                    </v-text-field>
                </v-col>
                <v-col
                cols="12"
                sm="6">
                <v-text-field
                              shaped
                              outlined
                              hide-details
                              :rules="[(v) => !!v || 'Password is required']"
                              label="Password"
                              type="password"
                              v-model="sellerObj.password"></v-text-field>
                    </v-col>
            </v-row>
           <v-row>
        <v-col
        cols="12"
      >
        <v-textarea
          shaped
          outlined
          :rules="[(v) => !!v || 'Address is required']"
          name="input-7-4"
          label="Permanent Address"
          v-model="paddress"
        ></v-textarea>
      </v-col></v-row>
      <v-row class="pb-3"><v-col
                cols="12"
                sm="6"><v-text-field
                              shaped
                              outlined
                              hide-details
                              :rules="[(v) => !!v || 'Phone No. is required']"
                              label="Phone No."
                              type="text"
                              v-model="sellerObj.phoneno"></v-text-field></v-col>
                              <v-col
                cols="12"
                sm="6"><v-text-field
                              shaped
                              outlined
                              hide-details
                              :rules="[(v) =>!!v || 'PinCode is required']"
                              label="PinCode"
                              type="text"
                              v-model="pincode"></v-text-field></v-col>
                              </v-row><v-divider></v-divider>
            <div class="text-center pa-3">
                <v-btn
                    class="ma-2"
                    color="primary"
                    dark
                    type="submit"
                    value="Send"
                    v-on:click="addSeller"
                >
                    <v-icon
                    dark
                    left
                    >
                    mdi-checkbox-marked-circle
                    </v-icon>Submit
                </v-btn>
                <v-btn
                        class="ma-2"
                        dark
                        @click="reset"
                    >
                        <v-icon
                        dark
                        left
                        >
                        mdi-minus-circle
                        </v-icon>Reset
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
font-family: cursive;}
</style>
<script>
import emailjs from 'emailjs-com';
import {db} from "@/db.js";
import{ init } from 'emailjs-com';
init("user_rjgSZyEgaFIJHNzi4znSn");
export default {
  name: "SellerDetails",
  data: () => ({
      fname:'',
      lname:'',
      paddress:'',
      pincode:'',
      sellerObj:{
      name:'',
      uname:'',
      password:'',
      phoneno:'',
      address:''
      },
      valid:true,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
  }),
  methods: {
      reset(){
          this.$refs.form.reset()
      },
      addSeller(){
        this.sellerObj.name=this.fname+" "+this.lname;
        this.sellerObj.address=this.paddress+" "+this.pincode
        db.collection("seller").add(this.sellerObj)
        .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
emailjs.send("service_x9gq28i","template_pegalqg",
             {
            name: this.sellerObj.name,
            uname: this.sellerObj.uname,
            password:this.sellerObj.password
            })
	.then(function(response) {
    console.log('SUCCESS!', response.status, response.text);
      },function(err) {
        console.log('FAILED...', err);
      })
      })
      this.$refs.form.reset()
  }
  }
  
}
</script>
   