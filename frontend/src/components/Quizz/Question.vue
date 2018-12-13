<template>
  <div class="container content is-fluid is-family-secondary has-nav">
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
          <router-link to="/">Quitter Quiz</router-link>
        </div>
        <div class="column is-4">{{question_id +1 }} / {{$parent.quizz.nbQuestion}}</div>
        <div class="column is-4 hvr-grow" v-on:click="launch">
          <span class="icon is-large">
            <i class="fa fa-question-circle"></i>
          </span>
        </div>
      </div>
      <div>
        <button class="button is-large" v-on:click="postAnswer()">Suivante</button>
      </div>
      <div class="modal" v-bind:class="{'is-active':isActive}">
        <div class="modal-background"></div>
        <div class="modal-content">
          <div class="box">
            <div class="content has-text-centered">
              <div class="control">
                <h3>{{question.clue}}</h3>
              </div>
              <button @click="close" class="button">Fermer</button>
              <span>&nbsp;</span>
            </div>
            <button @click="close" class="modal-close"></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
// @ is an alias to /src
import axios from "axios";
import { Modal, ImageModal, CardModal } from "vue-bulma-modal";

let server = "localhost:3000";
export default {
  name: "question",
  props: {
    quizz: Object
  },
  components: {
    Modal,
    ImageModal,
    CardModal
  },
  data: () => ({
    question: {},
    errors: [],
    question_id: 0,
    userAnswer: [],
    isActive: false
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
    postAnswer: function() {
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
    },
    launch: function() {
      this.isActive = true;
    },
    close: function() {
      this.isActive = false;
    }
  }
};
</script>


<style scoped>
.question {
  font-size: 2vw;
}

.answer {
  font-size: 1.5vw;
  margin-left: 5%;
}

.informations {
  font-size: 2.5rem;
  margin-top: 5%;
}
.hero {
  height: 80vh;
  max-height: 80vh;
}

.has-nav {
  padding-top: 3.5rem;
}
.hvr-grow {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: transform;
}
.hvr-grow:hover,
.hvr-grow:focus,
.hvr-grow:active {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
