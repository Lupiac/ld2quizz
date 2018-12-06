<template>
  <div class="container">
    <div class="results">
      <p class="is-size-2"><strong> You have {{getScore}}/{{this.$parent.quizz.nbQuestion}}</strong></p>
      <progress class="progress is-primary" :value=getScore :max="this.$parent.quizz.nbQuestion">{{getScore}}</progress>
    </div>
    <ul class="steps is-vertical">
      <li v-for="answer in $parent.userAnswers" :key="answer" class="steps-segment ">
        <div v-if="answer.correction === 'correct'">
          <span href="#" class="steps-marker" />
          <div class="steps-content has-text-left">
            <p class="is-size-4 has-text-success">Question: {{answer.question}}</p>
            <p class="is-italic"><strong>Correct Answer: {{answer.correctAnswer}}</strong></p>
            <p class="is-green "><strong>Your Answer: </strong>{{answer.userAnswer}}</p>
          </div>
        </div>
        <div v-else>
          <span href="#" class="steps-marker is-danger" />
          <div class="steps-content has-text-left">
            <p class="is-size-4 has-text-danger">Question: {{answer.question}}</p>
            <p class="is-italic"><strong>Correct Answer: {{answer.correctAnswer}}</strong></p>
            <p class=""><strong>Your Answer: </strong>{{answer.userAnswer}}</p>
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
    }
  }
};
</script>

<style scoped>
.fullsize {
  height: 1000px;
}

.results {
  margin: 2% 0 5% 0;
}

.my-step {
  padding-top: 1%;
  padding-bottom: 1%;
}
</style>
