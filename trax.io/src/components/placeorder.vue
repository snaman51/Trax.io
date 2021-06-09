<template>
</template>

<script>

export default {
  name: "App",

  components: {
    // Index,
  },

  data: () => ({
    drawer:false,
      group: null
    
  }),

  watch: {
      group () {
        this.drawer = false
      },
    },

    methods: {
      sLogin() {
        this.$router.push("/login")
      }
    }
};
</script>