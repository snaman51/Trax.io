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
      to="/placeorder"
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
        v-bind:items="items"
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
            <span>
              {{ props.header.text }}
            </span>
          </v-tooltip>
        </template>
        <template slot="items" scope="props">
          <td>{{ props.item.name }}</td>
          <td  class="text-xs-right">{{ props.item.orderid }}</td>
          <td  class="text-xs-right">{{ props.item.address }}</td>
          <td  class="text-xs-right">{{ props.item.pname }}</td>
          <td  class="text-xs-right">{{ props.item.price }}</td>
          <td  class="text-xs-right">{{ props.item.scstatus }}</td>
        </template>
      </v-data-table>
      </v-card-text>
      <div style="flex: 1 1 auto;"></div>
      </v-card>
  </v-app>
</template>
<script>
export default {
  name: "Orderlist",

  data: () => ({
      search: '',
      pagination: {},
      selected: [],
      headers: [
        {
          text: 'Seller Name',
          align: 'left',
          value: 'name'
        },
        { text: 'Order ID', value: 'orderid' },
        { text: 'Address', value: 'address' },
        { text: 'Product Name', value: 'pname' },
        { text: 'Price', value: 'price' },
        { text: 'Smart Contract Status', value: 'scstatus' }
      ],
      items: [
{
            value: false,
            name: 'Pearl A Alfanso',
            orderid: 159,
            address: 'Kaiga T/S',
            pname: 'Pen',
            price: 20,
            scstatus: 'ON'
          },
          {
            value: false,
            name: 'Rachel G Mendonsa',
            orderid: 160,
            address: 'Udupi',
            pname: 'Book',
            price: 300,
            scstatus: 'ON'
          },
          {
            value: false,
            name: 'Tressa M Antony',
            orderid: 161,
            address: 'Mumbai',
            pname: 'Headphones',
            price: 2000,
            scstatus: 'ON'
          },
          {
            value: false,
            name: 'Samson N',
            orderid: 162,
            address: 'Bangalore',
            pname: 'Arduino',
            price: 599,
            scstatus: 'ON'
          },
          {
            value: false,
            name: 'Panchami D Nayak',
            orderid: 163,
            address: 'Karwar',
            pname: 'Hard disk',
            price: 750,
            scstatus: 'OFF'
          },
          {
            value: false,
            name: 'Ancita P',
            orderid: 164,
            address: 'Belgaum',
            pname: 'Basket Ball',
            price: 300,
            scstatus: 'ON'
          },
          {
            value: false,
            name: 'Kratika K',
            orderid: 165,
            address: 'Karwar',
            pname: 'Painting',
            price: 500,
            scstatus: 'OFF'
          },
          {
            value: false,
            name: 'Pratibha PB',
            orderid: 166,
            address: 'Kaiga T/S',
            pname: 'Computer Desktop',
            price: 80000,
            scstatus: 'ON'
          },
          {
            value: false,
            name: 'Twinkle A Alfanso',
            orderid: 167,
            address: 'Kaiga T/S',
            pname: 'NATA Text Book',
            price: 1500,
            scstatus: 'OFF'
          },
          {
            value: false,
            name: 'Swizal A Alfanso',
            orderid: 168,
            address: 'Mallapur',
            pname: 'Coffee Maker',
            price: 4500,
            scstatus: 'ON'
          }
      ],
  }),
  computed: {
    pages () {
      return this.pagination.rowsPerPage ? Math.ceil(this.items.length / this.pagination.rowsPerPage) : 0
    }
  },
  methods: {
  }
}
</script>