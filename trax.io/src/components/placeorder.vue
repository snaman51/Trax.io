<template>
  <v-app id="inspire">
    <template >
    <v-img
    src="https://media.istockphoto.com/vectors/paper-layer-blue-abstract-background-use-for-banner-cover-poster-vector-id1189542390?k=6&m=1189542390&s=612x612&w=0&h=RMyxeCYFN4JyzNFNL9MqQR5402p3Nj390Gh1t8fXN-E=">
    <!-- src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" -->
    <v-container class="pt-16">
    <v-card 
    max-width="800px">
    <v-img
          height="75px"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmyyKFktIaaRswuuIzPQRFwcqch3y6SzTZow&usqp=CAU"
        >
    <v-card-title class="fantasy white--text ">
    <h3 class="ml-3 " >Add Details</h3><v-spacer></v-spacer>
        <v-btn icon dark @click="navigation">
            <v-icon >mdi-arrow-right</v-icon>
          </v-btn></v-card-title></v-img><v-divider></v-divider>
        <v-form ref="form" class="pa-2" v-model="valid">
            <v-container>
            <v-row>
                <v-col
                cols="12"
                sm="6" >
                    <v-text-field
                              outlined
                              shaped
                              :rules="[(v) => !!v || 'Name is required']"
                              label="Name"
                              type="text"
                              v-model="name">
                    </v-text-field>
                </v-col>
            
            
                
            </v-row>
           <v-row>
        <v-col
        cols="12"
      >
        <v-text-field
          shaped
          outlined
          :rules="[(v) => !!v || 'Address is required']"
          name="input-7-4"
          label="Permanent Address"
          v-model="address"
        ></v-text-field>
      </v-col></v-row>
      <v-row class="pb-3"><v-col
                cols="12"
                md="6">
                <v-text-field
                outlined
                              shaped
                              :rules="[(v) => !!v || 'Product name is required']"
                              label="Product Name"
                              type="text"
                              v-model="pname">
                              
                              </v-text-field>
                              </v-col>
                              <v-col
                cols="12"
                md="6">
                <v-text-field
                              shaped
                              outlined
                              hide-details
                              :rules="[(v) =>!!v || 'Price is required']"
                              label="Price"
                              type="text"
                              v-model="price"></v-text-field>
                              </v-col>
                              </v-row>
             <v-card-text>
          
          <v-row>
          <v-col>

      <p>Smart Contract</p>
    <v-switch
      v-model="switch1"
      :label="`${switch1 ? 'Yes' : 'No'}`"
    ></v-switch>
    </v-col>
    </v-row>

    
  
  </v-card-text>
                              <v-divider></v-divider>
            <div class="text-center pa-3">
                <v-btn
                    class="ma-2"
                    color="primary"
                    dark
                    v-on:click="addOrder"
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
                        v-on:click="reset"
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
import {db} from "@/db.js";
export default {
 

    name: "Placeorder",
  data: () => ({
      name:'',
      address:'',
      pname:'',
      price:'',
      switch1: false,
      orderObj:{
      name:'',
      id:'',
      date:'',
      address:'',
      pname:'',
      price:'',
      switch1: null
      },
      valid:true,
  }),
  methods: {
      change(){
      this.switch1=!this.switch1;
      console.log(this.switch1);
    },
      reset(){
          this.$refs.form.reset()
      },
      navigation(){
        this.$router.go(-1)
      },
      addOrder(){
        var Docref=db.collection("order").doc()
        Docref.set({
          date:Date.now(),
          name:this.name,
          address:this.address,
          pname:this.pname,
          price:this.price,
          switch1:this.switch1,
          id: Docref.id
        })
        .then(() => {
        console.log("Document written with ID: ");
 })
      this.$refs.form.reset()
  },
  },
  
}
</script>
var newDocRef = db.collection('collectionname').doc();
newDocRef.set({
                 name:'Jhon Doe',
                 job:'Programmer',
                 id: newDocRef.id
          })