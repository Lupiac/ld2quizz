<template>
  <div>
    <div class="columns">
      <div class="column is-8 box has-text -centered" style="overflow: auto;">
        <h1 class="title is-1">
          <strong>{{this.$parent.quizz_infos.quizzName}}</strong>
        </h1>
        <h3 class="subtitle is-2">has been saved</h3>
        <div class="icon is-large">
          <i class="far fa-check-circle fa-3x"/>
        </div>
        <button
          class="button is-link"
          v-on:click="$emit('change-step', {currentStep:'hello-creator', createdQuizz: {}})"
        >Menu</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "created-quizz",
  components: {},
  data: () => ({}),
  created() {}
};
</script>

<style scoped>
.item {
  margin-top: 2%;
  margin-bottom: 5%;
}
.icon {
  padding-right: 5%;
}
.is-vertical-center {
  display: flex;
  align-items: center;
}
</style>
