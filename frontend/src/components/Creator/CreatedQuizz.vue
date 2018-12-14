<template>
  <div>
    <div class="container is-centered has-navbar-fixed-top">
      <ul class="steps is-small my-step-style has-content-centered">
        <li class="steps-segment is-passed">
          <span class="steps-marker">1</span>
          <div class="steps-content">
            <p class="is-size-5">Infos Quiz</p>
          </div>
        </li>
        <li class="steps-segment is-passed">
          <span class="steps-marker">2</span>
          <div class="steps-content">
            <p class="is-size-5">Génération</p>
          </div>
        </li>
        <li class="steps-segment is-passed">
          <span class="steps-marker">3</span>
          <div class="steps-content">
            <p class="is-size-5">Choix Questions</p>
          </div>
        </li>
        <li class="steps-segment is-active">
          <span class="steps-marker">4</span>
          <div class="steps-content">
            <p class="is-size-5">Sauvegarde</p>
          </div>
        </li>
      </ul>
      <div class="columns is-centered" style="margin-top: 5%;">
        <div class="column is-8 box has-text-centered">
          <h1 class="title is-1">
            <strong>{{this.$parent.quizz_infos.name}}</strong>
          </h1>
          <h3 class="subtitle is-2">a été sauvegardé</h3>
          <div class="icon is-centered" style="font-size: 10em;">
            <i class="far fa-check-circle"/>
          </div>
          <div>
            <button
              class="button is-link"
              v-on:click="$emit('change-step', {currentStep:'hello-creator', createdQuizz: {}})"
            >Menu</button>
          </div>
        </div>
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
.icon {
  margin-top: 5%;
  margin-bottom: 10%;
  height: 6rem;
  width: 6rem;
}
.has-navbar-fixed-top {
  margin-top: 3.5rem;
}
.my-step-style .is-active .steps-content {
  font-weight: bold;
  color: black;
}
.my-step-style .is-passed .steps-content {
  color: black;
}
.not-active .steps-content {
  color: hsl(0, 0%, 86%);
}

.steps {
  color: rgba(255, 255, 255, 01);
}
</style>
