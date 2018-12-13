<template>
  <div>
    <ul class="steps is-small my-step-style has-content-centered">
      <li
        class="steps-segment is-passed"
        v-on:click="$emit('change-step', {currentStep: 'modify-info',quizz:$parent.quizz})"
      >
        <span class="steps-marker">1</span>
        <div class="steps-content">
          <p class="is-size-5">Infos Quiz</p>
        </div>
      </li>
      <li class="steps-segment is-active">
        <span class="steps-marker">2</span>
        <div class="steps-content">
          <p class="is-size-5">Questions</p>
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
                v-for="(category, index) of this.$parent.quizz_infos.categories"
                :key="index"
              >
                <div v-on:click="pickTopic(category, index)">
                  <input
                    type="checkbox"
                    :id="category.name"
                    :value="category.name"
                    v-model="pickedTopics"
                  >
                  <label class>{{category.name}}</label>
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
            v-for="(question, index) of this.questions"
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
        <button class="button update is-link is-flex" v-on:click="updateQuizz()">
          <p>METTRE A JOUR</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionItem from "@/components/Creator/ModifyQuestionItem.vue";
import Vue from "vue";
import VueToasted from "vue-toasted";
import virtualList from "vue-virtual-scroll-list";
import axios from "axios";
let server = "localhost:3000";

export default {
  name: "modify-questions",
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
    Vue.use(VueToasted, {});
    this.actualisePickedTopics();

    axios
      .get(
        "http://" +
          server +
          "/users/" +
          this.$parent.$parent.$parent.username +
          "/quizzes/" +
          this.$parent.quizz_infos.id +
          "/questions?token=" +
          this.$parent.$parent.$parent.token
      )
      .then(response => {
        console.log(response.data);
        this.questions = response.data.questions;
      })
      .catch(e => {
        console.log("Error");
        this.errors.push(e);
      });
  },
  computed: {},
  methods: {
    actualisePickedTopics() {
      this.pickedTopics = [];
      for (let category of this.$parent.quizz_infos.categories) {
        if (category.enabled) {
          this.pickedTopics.push(category.name);
        }
      }
    },
    pickNone: function() {
      for (let category of this.$parent.quizz_infos.categories) {
        /* if (category.enabled) { */
        category.enabled = false;
        /* } */
      }
      this.actualisePickedTopics();
    },
    pickAll: function() {
      for (let category of this.$parent.quizz_infos.categories) {
        /* if (category.enabled) { */
        //this.pickedTopics.push(category.name);
        category.enabled = true;
        /* } */
      }
      this.actualisePickedTopics();
    },
    pickTopic: function(category, index) {
      console.log("Avant");
      console.log(index);
      console.log(this.$parent.quizz_infos.categories[index].enabled);
      console.log(category);
      if (!this.$parent.quizz_infos.categories[index].enabled) {
        //this.pickedTopics.push(category.name);
        // this.$parent.quizz_infos.categories[index].enabled = true;
        this.$parent.quizz_infos.categories[index].enabled = true;
      } else {
        //this.pickedTopics.splice(this.pickedTopics.indexOf(category.name), 1);
        //this.$parent.quizz_infos.categories[index].enabled = false;
        this.$parent.quizz_infos.categories[index].enabled = false;
      }
      console.log("Apreès");

      console.log(this.$parent.quizz_infos.categories[index].enabled);
      console.log(category);
      this.actualisePickedTopics();

      this.actualiseQuestions();
      console.log("---------------------");
    },
    actualiseQuestions: function() {
      //      console.log("------- ACTUALISATION -------");
      for (let question of this.questions) {
        //      console.log(question);
        let toDelete = true;
        for (let category of question.categories) {
          //      console.log(this.pickedTopics.includes(category));
          if (this.pickedTopics.includes(category)) {
            toDelete = false;
            break;
          }
        }
        //      console.log("toDelete: " + toDelete);
        if (toDelete) {
          question.enabled = false;
        } else {
          question.enabled = true;
        }
        //   console.log(question);

        //   console.log("****************");
      }
      //    console.log("------- Fin -------");
    },
    updateQuizz: function() {
      this.$emit("change-step", { currentStep: "modify-info" });
      console.log(this.questions);
      this.$parent.quizz_infos = {
        name: this.$parent.quizz_infos.name,
        image_url: this.$parent.quizz_infos.image_url,
        questions: this.questions,
        taxBloom: this.$parent.quizz_infos.taxBloom,
        description: this.$parent.quizz_infos.description,
        username: this.$parent.$parent.$parent.username,
        token: this.$parent.$parent.$parent.token,
        categories: this.$parent.quizz_infos.categories
      };

      axios
        .put("http://" + server + "/quizzes/" + this.$parent.quizz.id, {
          name: this.$parent.quizz_infos.name,
          image_url: this.$parent.quizz_infos.image_url,
          questions: JSON.stringify(this.$parent.quizz_infos.questions),
          taxBloom: JSON.stringify(this.$parent.quizz_infos.taxBloom),
          description: this.$parent.quizz_infos.description,
          username: this.$parent.quizz_infos.username,
          token: this.$parent.quizz_infos.token,
          categories: JSON.stringify(this.$parent.quizz_infos.categories)
        })
        .then(response => {
          this.$emit("change-step", {
            currentStep: "modify-info"
          });
          this.$parent.$parent.isActive = false;
          let toast = this.$toasted.show(
          "Le quiz a été mis à jour",
          {
            theme: "primary",
            position: "top-right",
            duration: 2000
          }
        );
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
.update {
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
