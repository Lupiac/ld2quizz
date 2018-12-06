<template>
  <div>
    <div class="columns">
      <div
        class="column is-4"
        style="height: 100%; margin-top: 0; margin-bottom: 0; max-height: 100%;"
      >
        <div class>
          <p class="is-centered is-size-3">
            <strong>Related Topics</strong>
          </p>
          <virtual-list class="box flex has-text-right" :size="90" :remain="8">
            <div class="is-flex is-pulled-right">
              <div class v-on:click="pickedTopics = []">Clear All &nbsp</div>
              <div
                class="has-text-right"
                v-on:click="pickedTopics = $parent.questions.categories"
              >Pick All</div>
            </div>

            <div
              class="column item has-text-left"
              v-for="(category, index) of this.$parent.questions.categories"
              :key="index"
            >
              <input
                type="checkbox"
                :id="category"
                :value="category"
                v-on:click="actualiseQuestions()"
                v-model="pickedTopics"
              >
              <label class="checkbox" :for="category">{{category}}</label>
            </div>
          </virtual-list>
        </div>
      </div>

      <div class="column is-8">
        <p class="is-size-3">
          <strong>Questions</strong>
        </p>
        <virtual-list class="box" :size="90" :remain="8">
          <div
            class="column is-narrow-desktop item"
            v-for="(question, index) of this.$parent.questions.questions"
            :key="index"
          >
            <question-item :item="question" :id="index"/>
          </div>
        </virtual-list>
        <button class="button is-link is-flex" v-on:click="saveQuizz()">
          <p>SAVE</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionItem from "@/components/Creator/QuestionItem.vue";

import virtualList from "vue-virtual-scroll-list";
import axios from "axios";
let server = "localhost:3000";

export default {
  name: "detail-questions",
  components: {
    "virtual-list": virtualList,
    "question-item": QuestionItem
  },
  data() {
    return {
      questions: [],
      pickedTopics: this.$parent.questions.categories
    };
  },
  created() {
    this.questions = this.$parent.questions.questions;
    console.log(this.questions);
    /*  axios
      .post("http://" + server + "/generator", {
        domain_description: this.$parent.quizz_infos.search,
        username: this.$parent.$parent._data.username,
        token: this.$parent.$parent._data.token
      })
      .then(response => {
        this.$parent.questions = response.data;
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      }); */
  },
  methods: {
    actualiseQuestions: function() {
      for (let question in this.questions) {
        let toDelete = true;
        for (let category in question.categories) {
          console.log(this.pickedTopics.includes(category));
          if (this.pickedTopics.includes(category)) toDelete = false;
        }
        if (toDelete) {
          questions.enabled = false;
        }
      }
    },
    saveQuizz: function() {
      console.log(this.questions);
      this.$parent.quizz_infos = {
        name: this.$parent.quizz_infos.name,
        image_url: this.$parent.quizz_infos.image_url,
        questions: this.questions,
        taxBloom: this.$parent.quizz_infos.taxBloom,
        description: this.$parent.quizz_infos.description,
        search: this.$parent.quizz_infos.search
      };

      console.log(this.$parent.quizz_infos.name);
      console.log(this.$parent.quizz_infos.image_url);
      console.log(this.$parent.quizz_infos.questions);
      console.log(this.$parent.quizz_infos.taxBloom);
      console.log(this.$parent.quizz_infos.description);
      console.log(this.$parent.$parent._data.username);
      console.log(this.$parent.$parent._data.token);

      axios
        .post("http://" + server + "/quizzes", {
          name: this.$parent.quizz_infos.name,
          image_url: this.$parent.quizz_infos.image_url,
          questions: JSON.stringify(this.$parent.quizz_infos.questions),
          taxBloom: JSON.stringify(this.$parent.quizz_infos.taxBloom),
          description: this.$parent.quizz_infos.description,
          username: this.$parent.$parent._data.username,
          token: this.$parent.$parent._data.token
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
</style>
