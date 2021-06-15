
  <template>

  <v-app>
    <v-img
    src="https://images.pexels.com/photos/2226458/pexels-photo-2226458.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" 
    >
    <div >
      <v-container class="search" fill-height pa-16>
      <v-row>
      <v-text-field
              v-model="orderID"
              solo
              label="Track Here"
              prepend-inner-icon="mdi-map-marker"
              clearable
            ></v-text-field>

      <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            v-bind="attrs"
            v-on="on"
            v-on:click="searchOrder(orderID)"
          >Search</v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >Order Details</v-toolbar>

    <v-card-title>
      Order No: {{ordID}}
    </v-card-title>

    <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
      >
        Detailed Order
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider> 

        <v-card-text>


          <v-timeline
            align-top
            dense
          >
            <v-timeline-item
              v-for="message in messages"
              :key="message.time"
              small
            >
              <div>
                <div class="font-weight-normal">
                  <strong>Arrived {{ message.place }}</strong>
                </div>
                <div>@ {{ message.time }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </div>
    </v-expand-transition>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="dialog.value = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
      </v-row>

  </v-container>
  <router-view></router-view>

    </div>
    </v-img>
    </v-app>
    
  </template>

  <style>

  .search {
    position:relative;
    top:20vh;
  }

  #bg{
background-image: linear-gradient(to left top, #1fccd7, #58d9db, #7be6e1, #9af2e8, #b6fff0);  }


</style>

<script>
import {db} from "@/db.js";
export default {
  name: "Index",
  data: () => ({
    show: false,
    platform: null,
    orderID:"",
    ordID:"",
    src:"",
    waypoints:[],
      apikey: "UndrPfgxVRfeeL0lM6oEuHYJIdngdG7D9jYXLrKr7Q8",
       messages: [
        // {
        //   place: 'Delhi',
        //   time: '10:42am',
        //   color: 'deep-purple lighten-1',
        // },
        // {
        //   place: 'Mumbai',
        //   time: '2:37pm',
        //   color: 'green',
        // },
        // {
        //   place: 'Bangalore',
        //   time: '5:47pm',
        //   color: 'deep-purple lighten-1',
        // },
      ],
      // platform: {},
      map: {}


    }),

        async mounted() {
    const H = window.H;
    this.platform = new H.service.Platform({
  'apikey': this.apikey
});

  },

    methods:{
      searchOrder(oid){
        let orderPromise=db.collection("order").where('id','==',oid).get().then((docs)=>{
          docs.forEach((doc)=>{
            this.ordID=oid
            console.log(doc.data())
          })
        })
        .catch(()=>{
            console.log("not found")
        })

    let fetchSrc=db.collection("location").doc("device").collection("snaman").orderBy("time").limit(1).get().then((docs)=>{
  docs.forEach((doc)=> {
  if(doc.exists){
    this.src=String(doc.data().latitude)+","+String(doc.data().longitude);

    var service = this.platform.getSearchService();
      service.reverseGeocode({
      at: this.src
    }, (result) => {
      result.items.forEach((item) => {
        var date = new Date(doc.data().time);
        var dateTime=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
        this.messages.push({"place":item.address.city,"time":dateTime})
      })
    }
      )
  }
  })
});

let fetchWaypoints=db.collection("location").doc("device").collection("snaman").orderBy("time").get().then((docs)=>{
    docs.forEach((doc)=>{
    if(doc.exists){
      this.waypoints.push(String(doc.data().latitude)+","+String(doc.data().longitude));
var service = this.platform.getSearchService();
      service.reverseGeocode({
      at: this.waypoints[0]
    }, (result) => {
      result.items.forEach((item) => {
        console.log(item.address.city)

        this.messages.forEach((i)=>{
        if(i.place==item.address.city){
          var date = new Date(doc.data().time);
        var dateTime=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
          i.time=dateTime
        }
        else{
          this.messages.push({'place':item.address.city,'time':doc.data().time})
        }
      })
        
      })

    }
      )
    }
    })
  });

        Promise.all([orderPromise,fetchWaypoints,fetchSrc]).then(()=>{
          console.log(oid)
        if(this.ordID==''){
          this.ordID="Order Not Found"
        }
      console.log(this.ordID)
        });

        
      }
    }
    
};
</script>


