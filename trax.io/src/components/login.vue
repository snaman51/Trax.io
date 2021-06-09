<template>
<v-app id="bg">
<v-container>
<v-card
    class="mx-auto my-12"
    max-width="500"
    >
     
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
      <v-row 
        align="center"
        justify="center"
        >

        <v-btn-toggle
          v-model="utype"
          v-on:click="userType(utype)"
          
        >
          <v-btn 
          id="togbutton" 
          value="Seller">
            Seller
          </v-btn >

          <v-btn
          id="togbutton" 
          value="Customer">
            Customer
          </v-btn>

          <v-btn
           id="togbutton"
           value="Courier">
            Courier
          </v-btn >

          <v-btn 
          id="togbutton"
          value="Admin" >
            Admin
          </v-btn>
        </v-btn-toggle>
      </v-row>

  <h3 class="card-header text-center">Login as {{utype}} </h3>

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

    <v-card-actions>
    <v-btn id="button"
      :disabled="!valid"
      color="primary"
      class="mr-4"
      @click="validate"
      v-on:click="openplaceorder(uname,password)"
    >
      Sign In
    </v-btn>
    </v-card-actions>

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
background-image: linear-gradient(to left top, #1fccd7, #58d9db, #7be6e1, #9af2e8, #b6fff0);  
}
</style>


<script>
export default {
  name: "Login",

  data: () => ({
  valid: true,
      utype:String,
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

       openplaceorder (uname,password) {  
        {
        if(uname == "rachel" && password == "rachel25"){
          this.$router.push("/placeorder")
        }
        'Invalid username or password'
        }
      }
    },

  //  computed: {
  //   nextpage() {
  //     return () => (this.uname == "rachel") && (this.password == "rachel25") || 'Invalid username or password'
  //   }
  //  }
    
};
</script>
