<template lang="pug">
q-page.flex.flex-center.column
  p A digital tool to monitor sleepiness
  h1 Sleepwatch
  q-btn(
    color="orange",
    type="pill",
    label="Get started",
    :to="{ path: '/dashboard' }"
  )
</template>

<script>
export default {
  name: "PageIndex",
};
</script>
