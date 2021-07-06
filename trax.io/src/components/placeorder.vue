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
      phoneno:"9663742451",
      valid:true,
  }),
  mounted(){
  this.load();
  },
  methods: {
    async load(){
      await this.loadWeb3();
    window.contract = await this.loadContract();
    },
    async loadWeb3() {
    if (window.ethereum) {
        window.web3 = new window.Web3("ws://localhost:7545");
        window.ethereum.enable();
    }
},

async loadContract() {
    return await new window.web3.eth.Contract(
        [
	{
		"constant": false,
		"inputs": [
			{
				"name": "id",
				"type": "string"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "pay",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "sendet",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Pay",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "buyer",
				"type": "address"
			},
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "paymentOfAt",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "amount",
				"type": "uint256"
			},
			{
				"name": "date",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "buyer",
				"type": "address"
			}
		],
		"name": "paymentsOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
], '0xF9e8F063B041135D2f4fCaacE247FE118F05dF4c');
},
async smartc(){
  console.log("in");
  const account = "0xD2Ef36EC8088E22e3a13Afb1f3E387A51D678988";
  console.log(account)
  
window.contract.methods.sendet("0x0ceD0792207F2655b2D5a6B5269a2acE512785C3").send({ from: account,value:window.web3.utils.toWei("1", "ether")});
},
      reset(){
          this.$refs.form.reset()
      },
      navigation(){
        this.$router.go(-1)
      },
      addOrder(){

        var sellerEth,customerEth=null

        var sellerPromise=db.collection("seller").doc(this.$route.params.id).get().then((docs)=>
        {
          console.log(docs.data().eid)
            sellerEth=docs.data().eid
        })

        var customerPromise=db.collection("customer").where("phoneno","==",this.phoneno).get().then((docs)=>
        {
          docs.forEach((doc)=>{
            console.log(doc.data().eid)
            customerEth=doc.data().eid
          })
            
        })

        Promise.all([sellerPromise,customerPromise]).then(()=>{
          console.log(sellerEth,customerEth)
        })


        var Docref=db.collection("order").doc()
        Docref.set({
          date:Date.now(),
          name:this.name,
          address:this.address,
          pname:this.pname,
          price:this.price,
          switch1:this.switch1,
          id: Docref.id,
        })
        .then(() => {
        console.log("Document written with ID: ");

 })

if(this.switch1){
    this.smartc();
    }
      this.$refs.form.reset()
  },
  },
  
}
</script>
