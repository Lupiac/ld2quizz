<template>
  <div>
    <ul class="steps is-small my-step-style has-content-centered">
      <li
        class="steps-segment is-passed hvr-grow"
        v-on:click="$emit('change-step', {currentStep: 'create-quizz',createdQuizz:$parent.quizz_infos})"
      >
        <span class="steps-marker">1</span>
        <div class="steps-content">
          <p class="is-size-5">Infos Quiz</p>
        </div>
      </li>
      <li
        class="steps-segment is-passed hvr-grow"
        v-on:click="$emit('change-step', {currentStep: 'generate-questions',createdQuizz:$parent.quizz_infos})"
      >
        <span class="steps-marker ">2</span>
        <div class="steps-content">
          <p class="is-size-5">Génération</p>
        </div>
      </li>
      <li class="steps-segment is-active">
        <span class="steps-marker">3</span>
        <div class="steps-content">
          <p class="is-size-5">Choix Questions</p>
        </div>
      </li>
      <li class="steps-segment not-active">
        <span class="steps-marker">4</span>
        <div class="steps-content">
          <p class="is-size-5">Sauvegarde</p>
        </div>
      </li>
    </ul>
    <div class="columns content">
      <div
        class="column is-4"
        style="height: 100%; margin-top: 0; margin-bottom: 0; max-height: 100%;"
      >
        <div class>
          <p class="is-centered is-size-3">
            <strong>Sujets relatifs aux questions</strong>
          </p>
          <div class="box level-right column has-text-right">
            <div class="columnsis-pulled-right has-text-info">
              <div
                class="button is-light"
                v-on:click="pickNone(); actualiseQuestions()"
              >Choisir Aucun</div>
              <div
                class="has-text-right button is-info"
                v-on:click="pickAll(); actualiseQuestions()"
              >Choisir Tous</div>
            </div>
            <virtual-list class="box has-text-right" :size="80" :remain="8">
              <div
                class="column item has-text-left"
                v-for="(category, index) of this.$parent.questions.categories"
                :key="index"
              >
                <div v-on:click="pickTopic(category)">
                  <input
                    type="checkbox"
                    :id="category.name"
                    :value="category.name"
                    v-model="pickedTopics"
                  >
                  <label
                    class="checkbox"
                    :for="category.name"
                    v-on:click="pickTopic(category)"
                  >{{category.name}}</label>
                </div>
              </div>
            </virtual-list>
          </div>
        </div>
      </div>

      <div class="column is-8">
        <p class="is-size-3">
          <strong>Questions</strong>
        </p>
        <virtual-list class="box" :size="80" :remain="8">
          <div
            class="column is-narrow-desktop item"
            v-for="(question, index) of this.$parent.questions.questions"
            :key="index"
          >
            <question-item
              :item="question"
              :id="index"
              :pickedTopics="pickedTopics"
              :enabled="question.enabled"
            />
          </div>
        </virtual-list>
        <div class="columns">
          <button class="button is-link is-flex save  is-centered" v-on:click="saveQuizz()">
            <p>SAUVEGARDER QUIZ</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionItem from "@/components/Creator/QuestionItem.vue";

import virtualList from "vue-virtual-scroll-list";
import axios from "axios";

export default {
  name: "detail-questions",
  components: {
    "virtual-list": virtualList,
    "question-item": QuestionItem
  },
  data() {
    return {
      questions: [],
      pickedTopics: []
    };
  },
  created() {
    this.questions = this.$parent.questions.questions;
    this.pickAll();
  },
  computed: {},
  methods: {
    pickNone: function() {
      this.pickedTopics = [];
      for (let category of this.$parent.questions.categories) {
        /* if (category.enabled) { */
        category.enabled = false;
        /* } */
      }
    },
    pickAll: function() {
      this.pickedTopics = [];
      for (let category of this.$parent.questions.categories) {
        /* if (category.enabled) { */
        this.pickedTopics.push(category.name);
        category.enabled = true;
        /* } */
      }
    },
    pickTopic: function(category) {
      if (!this.pickedTopics.includes(category.name)) {
        this.pickedTopics.push(category.name);
        category.enabled = true;
      } else if (
        this.pickedTopics.length !== this.$parent.questions.categories.length
      ) {
        console.log(this.$parent.questions.categories.indexOf(category));
        this.pickedTopics.splice(this.pickedTopics.indexOf(category.name), 1);
        category.enabled = false;
      }
      this.actualiseQuestions();
    },
    actualiseQuestions: function() {
      // console.log("------- ACTUALISATION -------");
      for (let question of this.$parent.questions.questions) {
        //  console.log(question);
        let toDelete = true;
        for (let category of question.categories) {
          //  console.log(this.pickedTopics.includes(category));
          if (this.pickedTopics.includes(category)) {
            toDelete = false;
            break;
          }
        }
        //   console.log("toDelete: " + toDelete);
        if (toDelete) {
          question.enabled = false;
        } else {
          question.enabled = true;
        }
        // console.log(question);

        // console.log("****************");
      }
      // console.log("------- Fin -------");
      this.questions = this.$parent.questions.questions;
    },
    saveQuizz: function() {
      console.log(this.questions);
      this.$parent.quizz_infos = {
        name: this.$parent.quizz_infos.name,
        image_url: this.$parent.quizz_infos.image_url,
        questions: this.questions,
        taxBloom: this.$parent.quizz_infos.taxBloom,
        description: this.$parent.quizz_infos.description,
        search: this.$parent.quizz_infos.search,
        categories: this.$parent.questions.categories
      };

      axios
        .post("/quizzes", {
          name: this.$parent.quizz_infos.name,
          image_url: this.$parent.quizz_infos.image_url,
          questions: JSON.stringify(this.$parent.quizz_infos.questions),
          taxBloom: JSON.stringify(this.$parent.quizz_infos.taxBloom),
          description: this.$parent.quizz_infos.description,
          username: this.$parent.$parent._data.username,
          token: this.$parent.$parent._data.token,
          categories: JSON.stringify(this.$parent.questions.categories)
        })
        .then(response => {
          this.$emit("change-step", {
            currentStep: "created-quizz",
            createdQuizz: {
              name: this.$parent.quizz_infos.name,
              image_url: this.$parent.quizz_infos.image_url,
              questions: this.questions,
              taxBloom: this.$parent.quizz_infos.taxBloom,
              description: this.$parent.quizz_infos.description,
              search: this.$parent.quizz_infos.search
            }
          });
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.spinner {
  margin-bottom: 5%;
  margin-top: 5%;
  margin-left: auto;
  margin-right: auto;
}
.save{
  margin-left: 40%;
}
.red-quote {
  border-left: 4px solid red;
}
.green-quote {
  border-left: 4px solid #42b983;
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
