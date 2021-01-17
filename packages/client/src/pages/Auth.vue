<template lang="pug">
q-page.flex.flex-center.column
  q-input(filled, bg-color="white", label="Email", v-model="email")
  q-input(filled, bg-color="white", label="Password", v-model="password")
  q-btn(color="green", label="Sign in", @click="signIn")
  q-btn(color="green", label="Sign up", @click="signUp")
</template>

<script>
export default {
  name: "Auth.vue",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async signIn() {
      try {
        const response = await this.$axios.post(
          "https://driftrserver.herokuapp.com/addUser",
          {
            username: this.email,
            password: this.password,
          },
        );
        if (response.status === 200) {
          this.$store.state.signedIn = this.email;
          await this.$router.replace("/dashboard");
        }
      } catch (error) {
        console.error(error);
      }
    },
    async signUp() {
      try {
        const response = await this.$axios.post(
          "https://driftrserver.herokuapp.com/addUser",
          {
            username: this.email,
            password: this.password,
          }
        );
        if (response.status === 200) {
          this.$store.state.signedIn = this.email;
          await this.$router.replace("/dashboard");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped></style>
