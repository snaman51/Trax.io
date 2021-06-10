  <template>
  <v-container >
  <v-simple-table dark >
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Order ID
          </th>
          <th class="text-left">
            Date
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="order in orders"
          :key="order.orderID"
          v-on:click="customer"
        >
          <td>{{ order.orderID }}</td>
          <td>{{ order.date }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  </v-container>
  </template>

  <style>

  .search {
    position:relative;
    top:20vh;
  }

</style>

<script>

export default {
  name: "CustomerDashboard",

  data: () => ({
      orders: [
          {
            orderID: '82736382',
            date: "12-05-2021",
          },
          {
            orderID: '83624367',
            date: "19-04-2021",
          },
          {
            orderID: '85635278',
            date: "21-03-2021",
          },
          {
            orderID: '93746378',
            date: "19-03-2021",
          },
          {
            orderID: '53628467',
            date: "15-02-2021",
          },
        ],

    }),

  methods: {
      customer() {
          this.$router.push("customer")
      }
    
  }

    
};
</script>
