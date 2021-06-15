<template>
  <v-app id="inspire">
    <v-toolbar>
    <v-btn-toggle v-model="toggle">  
    <v-btn
      text
      value="customer"
      color="primary"
      @click="listDetails('customer')"
    >Customer
    </v-btn>
    <v-btn
      text
      value="seller"
      color="primary"
      @click="listDetails('seller')"
    >Seller
    </v-btn>
    <v-btn
      text
      value="courier"
      color="primary"
      @click="listDetails(value)"
    >Courier
    </v-btn></v-btn-toggle>
</v-toolbar>
  <v-card height="100%">
    <v-toolbar v-if="toggle==='customer'" style="flex: 0 0 auto;" dark class="primary">
     
      <v-toolbar-title >{{toggle}}</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn
      class="ma-2"
      outlined
      color="white"
      to="/custDetails"
    >
      Add Customer
    </v-btn>
      
    </v-toolbar>
    <v-toolbar v-if="toggle==='seller'" style="flex: 0 0 auto;" dark class="primary">
     
      <v-toolbar-title >{{toggle}}</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn
      class="ma-2"
      outlined
      color="white"
      to="/sellerDetails"
    >
      Add Seller
    </v-btn>
      
    </v-toolbar>
        <v-card-text>
          <v-card-title>
      
        <v-spacer></v-spacer>
        <v-text-field
          :append-icon="search?'close':'search'"
          :append-icon-cb="() => (search = '')"
          @keydown.native.escape="search=''"
          label="Search"
          single-line
          hide-details
          v-model="search"
        ></v-text-field>
      </v-card-title>
      <!-- <v-pagination v-model="pagination.page" :length="pages"></v-pagination> -->
      <v-data-table v-if="toggle==='customer'"
        v-bind:headers="headers"
        v-bind:items="customerArr"
        v-bind:search="search"
        :items-per-page="10"
        :footer-props="footerProps"       
        :header-props="{ sortIcon: null }"
        @click:row="viewCustomer"
        class="elevation-3"
      >
        <template slot="headerCell" scope="props">
          <v-tooltip bottom>
            <span>
              {{ props.header.text }}
            </span>
          </v-tooltip>
        </template>
        <template slot="customerArr" scope="props">
          <td v-for="header in headers" :key="header">{{ props.item[header.value] }}</td>
        </template>
      </v-data-table>
      <v-data-table v-if="toggle==='seller'"
        v-bind:headers="headers"
        v-bind:items="sellerArr"
        v-bind:search="search"
        :items-per-page="10"
        :footer-props="footerProps"       
        :header-props="{ sortIcon: null }"
        class="elevation-1"
      >
        <template slot="headerCell" scope="props">
          <v-tooltip bottom>
            <span>
              {{ props.header.text }}
            </span>
          </v-tooltip>
        </template>
        <template slot="sellerArr" scope="props">
          <td v-for="header in headers" :key="header">{{ props.item[header.value] }}</td>
        </template>
      </v-data-table>
      <v-data-table v-if="toggle==='courier'"
        v-bind:headers="courierheaders"
        v-bind:items="courierArr"
        v-bind:search="search"
        :items-per-page="10"
        :footer-props="footerProps"       
        :header-props="{ sortIcon: null }"
        class="elevation-1"
      >
        <template slot="headerCell" scope="props">
          <v-tooltip bottom>
            <span>
              {{ props.header.text }}
            </span>
          </v-tooltip>
        </template>
        <template slot="courierArr" scope="props">
          <td v-for="header in courierheaders" :key="header">{{ props.item[header.value] }}</td>
        </template>
      </v-data-table>
      </v-card-text>
      <div style="flex: 1 1 auto;"></div>
      </v-card>
  </v-app>
</template>
<script>
import {db} from "@/db.js"
export default {
  name: "CustList",

  data: () => ({
      search: '',
      footerProps: {},
      customerArr:[],
      sellerArr:[],
      courierArr:[],
      headers: [
        {
          text: ' ID',
          align: 'left',
          value: 'id'
        },
        { text: ' Name', value: 'name' },
        { text: 'Email', value: 'uname' },
        { text: 'Phone NO', value: 'phoneno' },
        { text: 'Address', value: 'address' }
      ],
      courierheaders: [
        {
          text: ' ID',
          align: 'left',
          value: 'id'
        },
        { text: 'Email', value: 'uname' },
        { text: 'Phone NO', value: 'phoneno' },
        { text: 'Warehouse Address', value: 'address' }
      ],
      toggle:"customer"
     
  }),
  created:function(){
    db.collection('customer').get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let customer = doc.data()
          customer.id = doc.id
          this.customerArr.push(customer)
        })
      })
    
  },
  computed: {
    pages () {
      return this.footerProps.rowsPerPage ? Math.ceil(this.items.length / this.pagination.rowsPerPage) : 0
    }
  },
  methods: {
    listDetails (value){
      this.toggle=value
      if(this.toggle!=''){
      this.sellerArr=[]
      this.customerArr=[]
      db.collection(this.toggle).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          if(this.toggle=='customer'){
          let customer = doc.data()
          customer.id = doc.id
          this.customerArr.push(customer)
          }
          else if(this.toggle=="seller"){
            let seller = doc.data()
            seller.id = doc.id
            this.sellerArr.push(seller)
            console.log(this.sellerArr)
          }
          else if(this.toggle=="courier"){
            let courier = doc.data()
            courier.id = doc.id
            this.courierArr.push(courier)

          }          
        })
      })
      }
    }

  }
}
</script>