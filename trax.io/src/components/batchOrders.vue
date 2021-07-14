<template>
  <v-continer>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="orders"
      item-key="id"
      :single-select="singleSelect"
      show-select
      class="elevation-1"
    >
    </v-data-table>
    <v-card>
      <v-text-field
        v-model="batchname"
        placeholder="Enter Batch Number"
      ></v-text-field
      ><v-btn color="primary" v-on:click="updateBatch()">Submit</v-btn></v-card
    >
  </v-continer>
</template>

  <style>
.search {
  position: relative;
  top: 20vh;
}
</style>

<script>
import { db } from "@/db.js";
export default {
  name: "BatchOrders",

  data: () => ({
    orders: [],
    batchname: "",
    selected: [],
    singleSelect: false,
    headers: [
      {
        text: " ID",
        align: "left",
        value: "id",
      },
      { text: "Date", value: "date" },
      { text: "Name", value: "name" },
      { text: "Product", value: "pname" },
      { text: "Address", value: "address" },
    ],
  }),

  created() {
    db.collection("order")
      .orderBy("date")
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          if (doc.data().batch == "") {
            this.orders.push({
              id: doc.id,
              date: doc.data().date,
              name: doc.data().name,
              pname: doc.data().pname,
              address: doc.data().address,
            });
          }
        });
      });
  },
  methods: {
    updateBatch() {
      console.log(this.selected);
      this.selected.forEach((doc) => {
        db.collection("order").doc(doc.id).update({ batch: this.batchname });
      });
    },
  },
};
</script>
