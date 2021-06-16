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
          v-on:click="customer(order.orderID)"
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
import {db} from "@/db.js";
export default {
  name: "CustomerDashboard",

  data: () => ({
      orders: [],

    }),

    created(){
      db.collection("order").orderBy("date").get().then((docs)=>{
        docs.forEach((doc)=>{
          this.orders.push({"orderID":doc.id,"date":doc.data().date})
        })
      })

    },

  methods: {
      customer(orderid) {
          this.$router.push({ path: `/customer/${orderid}` })  
      }
    
  }

    
};
</script>
