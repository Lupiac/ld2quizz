<template>
  <div class="container has-nav">
    <div class="results">
      <p class="is-size-2" style="margin-bottom: 2%;">
        <strong>Vous avez obtnenu {{getScore}}/{{this.$parent.quizz.nbQuestion}}</strong>
      </p>
      <progress
        class="progress is-primary"
        style="margin-bottom: 3%;"
        :value="getScore"
        :max="this.$parent.quizz.nbQuestion"
      >{{getScore}}</progress>
    </div>
    <ul class="steps is-vertical">
      <li v-for="answer in $parent.userAnswers" :key="answer" class="steps-segment">
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
    <router-link to="/" class="is-size-2 button is-link is-rounded">Jouer à un autre quizz</router-link>
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
