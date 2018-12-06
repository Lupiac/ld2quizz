<template>
  <div>
    <component
      v-bind:is="currentStep"
      :nbQuestion="quizz"
      v-on:change-step="currentStep = $event.step; quizz=$event.quizz"
    ></component>
  </div>
</template>

<script>
// @ is an alias to /src
import QuizzDescription from "@/components/Quizz/QuizzDescription.vue";
import Question from "@/components/Quizz/Question.vue";
import Results from "@/components/Quizz/Results.vue";

export default {
  name: "quizz",
  components: {
    question: Question,
    results: Results,
    "quizz-description": QuizzDescription
  },
  data() {
    return {
      currentStep: "quizz-description",
      quizz: {},
      errors: [],
      userAnswers: []
    };
  }
};
</script>

<style scoped>
.fullsize {
  height: 1000px;
}
</style>
