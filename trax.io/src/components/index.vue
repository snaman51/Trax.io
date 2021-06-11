      <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            v-bind="attrs"
            v-on="on"
          >From the bottom</v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >Opening from the bottom</v-toolbar>
            <v-card-text>
              <div class="text-h2 pa-12">Hello world!</div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="dialog.value = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
  
  
  <template>

  <v-app>
    <v-img
    src="https://images.pexels.com/photos/2226458/pexels-photo-2226458.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" 
    >
    <div >
      <v-container class="search" fill-height pa-16>
      <v-row>
      <v-text-field
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
          >Search</v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >Order Details</v-toolbar>


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
        <v-divider></v-divider>  -->

        <v-card-text>
          <div class="font-weight-bold ml-8 mb-2">
            Today
          </div>

          <v-timeline
            align-top
            dense
          >
            <v-timeline-item
              v-for="message in messages"
              :key="message.time"
              :color="message.color"
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
export default {
  name: "Index",
  data: () => ({
    show: false,
      apikey: "UndrPfgxVRfeeL0lM6oEuHYJIdngdG7D9jYXLrKr7Q8",
       messages: [
        {
          place: 'Delhi',
          time: '10:42am',
          color: 'deep-purple lighten-1',
        },
        {
          place: 'Mumbai',
          time: '2:37pm',
          color: 'green',
        },
        {
          place: 'Bangalore',
          time: '5:47pm',
          color: 'deep-purple lighten-1',
        },
      ],
      platform: {},
      map: {}


    }),

    
};
</script>


