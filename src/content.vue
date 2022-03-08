<template>
  <section>
    <h1>{{ $t("TEST_EXAMPLE") }}</h1>
  </section>
</template>

<script>

export default {
  components: {},
  props: {
  },
  created() {
  },
  activated() {
  },
  methods: {
  },
};
</script>

<style scoped lang="scss">
section {
  background: red;
}
</style>

<i18n>
{
  "en": {
    "TEST_EXAMPLE": "Test example [EN]"
  },
  "nl": {
    "TEST_EXAMPLE": "Test example [NL]"
  },
  "es": {
    "TEST_EXAMPLE": "Test example [ES]"
  }
}
</i18n>
