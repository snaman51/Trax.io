<template>
<v-container id="bgimg">
<v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
    >
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="uname"
      :counter="10"
      :rules="nameRules"
      label="Username"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :rules="passRules"
      label="Password"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Sign In
    </v-btn>
    
  </v-form>
  </v-card>
  </v-container>
</template>

<style>
#bgimg {
    background: url("https://st3.depositphotos.com/8343336/16085/i/1600/depositphotos_160850202-stock-photo-cargo-transportation-unloading-container-trucks.jpg") fill no-repeat center center;
}
</style>


<script>

export default {
  name: "Login",

  data: () => ({
  valid: true,
      uname: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      password: '',
      passRules: [
        v => !!v || 'Password is required',
        v => v.length >= 8  || 'Password must be more than 8 characters',
      ],
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },
    },
};
</script>
