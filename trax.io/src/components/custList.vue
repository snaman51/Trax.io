<template>
  <v-app id="inspire">
    <v-toolbar>
    <v-btn-toggle v-model="toggle">  
    <v-btn
      text
      value="Customer"
      color="primary"
    >Customer
    </v-btn>
    <v-btn
      text
      value="Seller"
      color="primary"
    >Seller
    </v-btn>
    <v-btn
      text
      value="Courier"
      color="primary"
    >Courier
    </v-btn></v-btn-toggle>
</v-toolbar>
      <v-card class="mt-0">
    <v-toolbar style="flex: 0 0 auto;" dark class="primary">
     
      <v-toolbar-title>Customer</v-toolbar-title>

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
          <td>{{ props.item.customerid }}</td>
          <td  class="text-xs-right">{{ props.item.customername }}</td>
          <td  class="text-xs-right">{{ props.item.email }}</td>
          <td  class="text-xs-right">{{ props.item.phoneno }}</td>
          <td  class="text-xs-right">{{ props.item.address }}</td>
        </template>
      </v-data-table>
      </v-card-text>
      <div style="flex: 1 1 auto;"></div>
      </v-card>
  </v-app>
</template>
<script>
export default {
  name: "CustList",

  data: () => ({
      search: '',
      pagination: {},
      selected: [],
      headers: [
        {
          text: 'Customer ID',
          align: 'left',
          value: 'customerid'
        },
        { text: 'Customer Name', value: 'customername' },
        { text: 'Email', value: 'email' },
        { text: 'Phone NO', value: 'phoneno' },
        { text: 'Address', value: 'address' }
      ],
      items: [
        {
            customerid: 123,
            customername: "Treesa Antony",
            email: "tresatritto28@gmail.com",
            phoneno: 9148760505,
            address: "KoperKhairne Navi mumbai 400709"

          },
          {
            customerid: 102,
            customername: "Samson Naman",
            email: "snaman@gmail.com",
            phoneno: 9663742451,
            address: "Hebbal Kempapura Bangalore 560024"
          },
          {
            customerid: 103,
            customername: "Santhanu Ashok",
            email: "santhanu@gmail.com",
            phoneno: 9677562045,
            address: "Kempapura Bangalore 560021"
          },
          // {
          //   customerid: 121,
          //   customername: "Rachel Mendonsa",
          //   email: "Rachelg@gmail.com",
          //   phoneno: 7521463892,
          //   address: "Udupi Mangalore 560021"
          // },
          // {
          //   customerid: 100,
          //   customername: "Rachel C",
          //   email: "rachelcg@gmail.com",
          //   phoneno: 8088463892,
          //   address: "Udupi Mangalore 560001"
          // },
          // {
          //   customerid: 111,
          //   customername: "Pearl Alfanso",
          //   email: "pearlalfanso@gmail.com",
          //   phoneno: 4561463892,
          //   address: "kaiga Karnataka 560041"
          // },
          // {
          //   customerid: 321,
          //   customername: "Valesh M",
          //   email: "valeshm@gmail.com",
          //   phoneno: 9635287412,
          //   address: "Mangalore Karnataka 560705"
          // },
          // {
          //   customerid: 568,
          //   customername: "Rajesh Rao",
          //   email: "prajeshrao@gmail.com",
          //   phoneno: 8054638921,
          //   address: "Kudpu Karnataka 401231"
          // },
          // {
          //   customerid: 141,
          //   customername: "Rajath Rao",
          //   email: "rajathr@gmail.com",
          //   phoneno: 7896541235,
          //   address: "Attavar Karnataka 222121"
          // },
          // {
          //   customerid: 151,
          //   customername: "Parashant Matho",
          //   email: "prashantmatho.com",
          //   phoneno: 9965541235,
          //   address: "Vashi Mumbai 400705"
          // }
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