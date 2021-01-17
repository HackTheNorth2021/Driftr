<template lang="pug">
q-layout(view="lHh Lpr lFf")
  q-page-container.container.column
    q-header.mobile-bar(v-if="isMobile && signedIn", elevated)
      q-toolbar
        q-toolbar-title Driftr
    .tab-bar.flex(v-if="!isMobile && signedIn")
      q-btn.tab-bar__button(
        v-for="tab in tabs",
        :key="tab.title",
        :to="tab.to",
        color="green"
      ) {{ tab.title }}
    router-view
    q-footer.mobile-bar(v-if="isMobile && signedIn", elevated)
      q-tabs
        q-route-tab(
          name="home",
          icon="timeline",
          label="Dash",
          to="/dashboard",
          exact
        )
        q-route-tab(
          name="tracker",
          icon="home",
          label="Tracker",
          to="/tracker",
          exact
        )
        q-route-tab(
          name="about",
          icon="info",
          label="About",
          to="/about",
          exact
        )
</template>

<script>
export default {
  name: "MainLayout",
  data() {
    return {
      tabs: [
        { title: "Dash", to: { path: "/dashboard" } },
        { title: "About", to: { path: "/about" } },
        { title: "Login", to: { path: "/login" } },
        { title: "Sign up", to: { path: "/signup" } },
      ],
    };
  },
  computed: {
    isMobile() {
      return this.$q.platform.is.mobile;
    },
    signedIn() {
      return this.$store.state.signedIn;
    }
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
.mobile-bar {
  background-color: #4b33b7;
}
.mobile-bar-item__active {
  color: #72ffd7;
}
</style>
