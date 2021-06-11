<template>
<v-app id="bg">
<v-container>
<v-card
    class="mx-auto my-12"
    max-width="500"
    >
     
  <v-form
  class="pa-9"
    ref="form"
    v-model="valid"
    lazy-validation
  >
      <v-row 
        align="center"
        justify="center"
        >
        <v-chip-group
        v-model="utype"
        active-class="deep-purple--text text--accent-4"
        mandatory
      >
        <v-chip value="seller">Seller</v-chip>
        <v-chip value="customer">Customer</v-chip>
        <v-chip value="courier">Courier</v-chip>
        <v-chip value="admin">Admin</v-chip>
      </v-chip-group>

      </v-row>

  <h3 class="card-header text-center" v-if="utype">Login as {{utype}} </h3>
  <h3 class="card-header text-center" v-if="!utype">Login </h3>

  <v-card-text 
  class="pb-0"
   width="300">
    <v-text-field 
      v-model="uname"
      :rules="nameRules"
      label="Username"
      required
    ></v-text-field>
    </v-card-text>

    <v-card-text>
    <v-text-field 
      v-model="password"
      :rules="passRules"
      label="Password"
      :append-icon="value ? 'visibility_off' : 'visibility'"
      @click:append="() => (value = !value)"
      :type="value ? 'password' : 'text'"
      required
    ></v-text-field>
    </v-card-text>

    <div class="text-center">
    <v-btn
      :disabled="!valid"
      color="primary"
      @click="validate"
      v-on:click="openplaceorder(uname,password,utype)"
    >
      Sign In
    </v-btn>
    </div>

  </v-form>
  </v-card>
  </v-container>
  </v-app>
</template>

<style>
#togbutton{
  font-size: 8px;
}
p{
  margin-top: 10px;
  margin-right: 5px;
}
h3{
  margin-top: 20px;
  margin-bottom: 10px;
  margin-right: 10px;
  margin-left: 10px;
}
#button{
margin-left: 200px;
text-align: center;
font-size: 14px;
}

#bg{
background-image: linear-gradient(to left top, #1fccd7, #58d9db, #7be6e1, #9af2e8, #b6fff0);  }

</style>


<script>
import { db } from "@/db.js";
export default {
  name: "Login",

  data: () => ({
  valid: true,
      utype:"",
      uname: '',
      password: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      passRules: [
        v => !!v || 'Password is required',
        v => v.length >= 8  || 'Password must be more than 8 characters',
      ],
      value: String,
      toggle_exclusive: undefined,
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },

       openplaceorder(uname,password,utype) { 
         if(utype) {
         console.log("utype",utype)

        db.collection(utype).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        if(uname == doc.data().uname && password == doc.data().password){
          this.$router.push("/customerDashboard")
        }
    });
});
       }
      }
    },
    
};
</script>
