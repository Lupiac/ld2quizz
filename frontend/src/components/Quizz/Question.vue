<template>
  <div class="container content is-fluid is-family-secondary">
    <div class="tile is-ancestor box hero fullsize">
      <div class="tile is-vertical hero-body">
        <div class="question">
          <strong>{{question.question}}</strong>
        </div>
      </div>

      <div v-for="answer in question.answers" :key="answer" class="control level">
        <label class="radio level-item level-left">
          <input v-model="userAnswer" :value="answer" type="radio" name="answer">
          <p class="answer">{{answer}}</p>
        </label>
      </div>

      <div class="columns informations">
        <div class="column is-4">
          <router-link to="/">Exit Quizz</router-link>|
        </div>
        <div class="column is-4">{{question_id +1 }} / {{$parent.quizz.nbQuestion}}</div>
        <div class="column is-4">
          <span class="icon is-large">
            <i class="fa fa-question-circle"></i>
          </span>
        </div>
      </div>
      <div>
        <button class="button is-large" v-on:click="postAnswer()">Answer</button>
      </div>
    </div>
  </div>
</template>


<script>
// @ is an alias to /src
import axios from "axios";

let server = "localhost:3000";
export default {
  name: "question",
  props: {
    quizz: Object
  },
  data: () => ({
    question: {},
    errors: [],
    question_id: 0,
    userAnswer: []
  }),

  created() {
    this.getQuestion();
  },
  methods: {
    getQuestion: function() {
      axios
        .get(
          "http://" +
            server +
            "/quizzes/" +
            this.$route.params.id +
            "/questions/" +
            this.question_id
        )
        .then(response => {
          console.log(response.data);
          this.question = response.data;
        })
        .catch(e => {
          console.log("Error");
          this.errors.push(e);
        });
    },
    postAnswer() {
      console.log(this.userAnswer.length > 0);
      if (this.userAnswer.length > 0) {
        axios
          .post(
            "http://" +
              server +
              "/quizzes/" +
              this.$route.params.id +
              "/questions/" +
              this.question_id,
            {
              answer: this.userAnswer
            }
          )
          .then(response => {
            this.question_id++;
            console.log("this.question.id = " + this.question_id);
            console.log(response.data);
            console.log(this.$parent.userAnswers);
            this.$parent.userAnswers.push(response.data);
            console.log(this.$parent.userAnswers);
            this.userAnswer = [];
            if (this.question_id >= this.$parent.quizz.nbQuestion) {
              this.$emit("change-step", {
                step: "results",
                quizz: this.$parent.quizz
              });
            }
            this.getQuestion();
            console.log(response);
          })
          .catch(e => {
            console.log(e);
            this.errors.push(e);
          });
      }
    }
  }
};
</script>


<style scoped>
.question {
  font-size: 3.5rem;
}

.answer {
  font-size: 2.5rem;
  margin-left: 5%;
}

.informations {
  font-size: 2.5rem;
  margin-top: 5%;
}
</style>
