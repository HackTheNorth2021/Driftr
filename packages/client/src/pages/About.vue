<template lang="pug">
q-page.flex.flex-center.row.container
  .container(style="flex: 1")
    h2 Quick Facts: The Importance Of Sleep
  .container(style="flex: 1")
    p.quote(v-for="quote in quotes" :key="quote") {{ quote }}
</template>

<script>
export default {
  name: "About.vue",
  data() {
    return {
      quotes: [
        "Each hour of sleeplessness lead to increased feelings of depression by 38% in teenagers",
        "Almost 20% of all car crash accidents and injuries are associated with sleepiness",
        "82% of college students report that lack of sleep affects their scholarly performance negatively",
      ],
    };
  },
};
</script>

<style scoped>
.container {
  padding: 5%;
}
.quote {
  font-size: 18px;
}
</style>
