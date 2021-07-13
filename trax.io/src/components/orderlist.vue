<template>
  <v-app id="inspire">
      <v-card class="mt-0">
    
    <v-toolbar style="flex: 0 0 auto;" dark class="primary">
      <v-toolbar-title>Order Details</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn
      class="ma-2"
      outlined
      color="white"
      v-on:click="placeOrder"
    >
      Add Order
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
      <v-data-table
        v-bind:headers="headers"
        v-bind:items="orderArr"
        v-bind:search="search"
        v-bind:pagination.sync="pagination"
        hide-actions
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
        <template slot="OrderArr" scope="props">
          <td v-for="header in headers" :key="header">{{ props.item[header.value] }}</td>
          </template>
          
      </v-data-table>
      </v-card-text>
      <div style="flex: 1 1 auto;"></div>
      </v-card>
  </v-app>
</template>
<script>
import {db} from "@/db.js";
export default {
  
  name: "Orderlist",

  data: () => ({
      search: '',
      pagination: {},
      selected: [],
      orderArr: [],
      headers: [
        {
          text: 'Seller Name',
          align: 'left',
          value: 'name'
        },
        { text: 'Order ID', value: 'id' },
        { text: 'Date/Time', value: 'date' },
        { text: 'Address', value: 'address' },
        { text: 'Product Name', value: 'pname' },
        { text: 'Price', value: 'price' },
        { text: 'Smart Contract Status', value: 'switch1' }
      ],
      
  }),
  created:function(){
    db.collection('order').get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let order = doc.data()
          var date = new Date(doc.data().date);  
        var dateDate=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
          order.date=dateDate
          this.orderArr.push(order)
        })
      })
},
  computed: {
    pages () {
      return this.pagination.rowsPerPage ? Math.ceil(this.orderArr.length / this.pagination.rowsPerPage) : 0
    }
  },
  methods: {
    placeOrder(){
      console.log(this.$route.params.id)
      this.$router.push("/placeorder/"+this.$route.params.id)
    }
  }
}
</script>