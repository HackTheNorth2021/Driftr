<template lang="pug">
q-page.flex.flex-center.column
  p.landing-title A digital tool to monitor sleepiness
  h1.landing-title Driftr
  q-carousel.text-white.rounded-borders.carousel(
    v-model="currentSlideName",
    transition-prev="scale",
    transition-next="scale",
    swipeable,
    animated,
    control-color="white",
    height="550px",
    navigation,
    padding,
    arrows
  )
    q-carousel-slide.column.no-wrap.flex-center(name="art")
      img(:src="require('assets/sleeping-art.jpg')", height="400px")
    q-carousel-slide.column.no-wrap.flex-center(name="graph")
      img(:src="require('assets/sleeping-art.jpg')", height="400px")
    q-carousel-slide.column.no-wrap.flex-center(name="screenshot")
      img(:src="require('assets/sleeping-art.jpg')", height="400px")
  q-btn.start-button(label="Get started", :to="{ path: '/tracker' }")
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {
      currentSlideName: "art",
    };
  },
};
</script>

<style>
.carousel {
  background-color: transparent;
  border-color: transparent;
}
.start-button {
  background-color: #72ffd7;
  color: #ffffff;
  padding: 10px 80px 10px 80px;
}
.landing-title {
  line-height: 0;
}
</style>
