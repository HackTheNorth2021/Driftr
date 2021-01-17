<template lang="pug">
q-layout(view="lHh Lpr lFf")
  q-page-container.container.column
    .tab-bar.flex
      q-btn.tab-bar__button(
        v-for="tab in tabs",
        :key="tab.title",
        :to="tab.to",
        color="green"
      ) {{ tab.title }}
    router-view
</template>

<script>
export default {
  name: "MainLayout",
  data() {
    return {
      tabs: [
        { title: "Home", to: { path: "/" } },
        { title: "About", to: { path: "/about" } },
        { title: "Login", to: { path: "/login" } },
        { title: "Sign up", to: { path: "/signup" } },
      ],
    };
  },
};
</script>

<style>
@import "~@fontsource/saira/index.css";
.container {
  background-color: #211260;
}
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "saira", "sans-serif";
  color: white;
}
.tab-bar {
  align-items: end;
  justify-content: end;
}
.tab-bar__button {
  margin: 10px 10px 0 15px;
}
</style>
