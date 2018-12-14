<template>
  <div class="container has-nav">
    <div class="results">
      <div class="buttons level">
        <router-link to="/" class="button is-size-10 is-link level-left">
          <span class="icon is-large" style="margin-right: 2%;">
            <i class="fas fa-angle-left"></i>
          </span>
          Catalogue
        </router-link>
        <div class="level-center level-item">
        <p class="column is-centered is-size-2" style="margin-bottom: 2%;">
          <strong>Vous avez obtenu {{getScore}}/{{this.$parent.quizz.nbQuestion}}</strong>
        </p>
      </div>
        <a
          class="button is-size-6 is-link is-large level-right"
          @click="$emit('change-step', {step:'quizz-description', quizz: $parent.quizz}); $parent.userAnswers=[]"
        >
          <span class="icon is-large" style="margin-right: 2%;">
            <i class="fas fa-redo-alt"></i>
          </span>
          Réessayer
        </a>
      </div>
 
      <progress
        class="progress is-primary"
        style="margin-bottom: 3%;"
        :value="getScore"
        :max="this.$parent.quizz.nbQuestion"
      >{{getScore}}</progress>
    </div>
    <ul class="steps is-vertical">
      <li v-for="(answer, index) in $parent.userAnswers" :key="index" class="steps-segment">
        <div v-if="answer.correction === 'correct'">
          <span href="#" class="steps-marker"/>
          <div class="steps-content has-text-left">
            <p class="is-size-4 has-text-success">Question: {{answer.question}}</p>
            <p class="is-italic">
              <strong>Correct Answer: {{answer.correctAnswer}}</strong>
            </p>
            <p class="is-green">
              <strong>Your Answer:</strong>
              {{answer.userAnswer}}
            </p>
          </div>
        </div>
        <div v-else>
          <span href="#" class="steps-marker is-danger"/>
          <div class="steps-content has-text-left">
            <p class="is-size-4 has-text-danger">Question: {{answer.question}}</p>
            <p class="is-italic">
              <strong>Correct Answer: {{answer.correctAnswer}}</strong>
            </p>
            <p class>
              <strong>Your Answer:</strong>
              {{answer.userAnswer}}
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "results",
  components: {},
  data: () => ({}),
  computed: {
    getScore: function() {
      let score = 0;
      console.log(this.$parent.userAnswers);
      for (let key in this.$parent.userAnswers) {
        console.log(this.$parent.userAnswers[key].correction);
        if (this.$parent.userAnswers[key].correction === "correct") score++;
      }
      console.log("score = " + score);
      return score;
    },
    tryAgain: function() {
      return "/quizz/" + this.$parent.quizz.id + " ";
    }
  }
};
</script>

<style scoped>
.fullsize {
  height: 100vh;
}
.has-nav {
}
.results {
  margin: 6rem 0 3.5rem 0;
}
.button {
  margin-bottom: 3.5rem;
}
.my-step {
  padding-top: 1%;
  padding-bottom: 1%;
}
</style>
