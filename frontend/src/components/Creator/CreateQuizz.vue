<template>
  <div class="container content is-fluid is-family-secondary has-navbar-fixed-top">
    <div class="tile is-ancestor box hero">
      <div class="tile is-vertical hero-body">
        <div class="tile is-child box">
          <div class="field is-horizontal level columns">
            <div class="label is-child is-normal level-item column is-one-seventh">
              <label class="title is-size-1">Name:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded">
                  <input
                    v-model="createdQuizz.name"
                    class="input is-size-2"
                    type="text"
                    placeholder="Enter Quizz Name"
                  >
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="tile is-child box">
          <div class="field is-horizontal level columns">
            <div class="label is-child is-normal level-item column is-one-seventh">
              <label class="title is-size-4">Image:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded">
                  <input
                    v-model="createdQuizz.image_url"
                    class="input"
                    type="text"
                    placeholder="Enter an image URL"
                  >
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="tile is-child box">
          <div class="field is-horizontal level columns">
            <div class="label is-child is-normal level-item column is-one-seventh">
              <label class="title is-size-4">Search:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded">
                  <textarea
                    v-model="createdQuizz.search"
                    class="textarea"
                    placeholder="Enter what you whant to search..."
                  ></textarea>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="tile is-child box">
          <div class="field is-horizontal level columns">
            <div class="label is-child is-normal level-item column is-one-seventh">
              <label class="title is-size-4">Description:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded">
                  <textarea
                    v-model="createdQuizz.description"
                    class="textarea"
                    placeholder="Enter a description of your quizz..."
                  ></textarea>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="tile is-child box">
          <div class="field is-horizontal level columns">
            <div class="label is-child is-normal level-item column is-one-seventh">
              <label class="title is-size-4">Bloom's Taxonomy:</label>
            </div>
            <div class="field-body">
              <div class="field has-text-left">
                <input
                  type="checkbox"
                  id="Connaissance"
                  value="Connaissance"
                  v-model="createdQuizz.taxBloom"
                >
                <label class="checkbox" for="Connaissance">Connaissance</label>
                <input
                  type="checkbox"
                  id="Compréhension"
                  value="Compréhension"
                  v-model="createdQuizz.taxBloom"
                >
                <label class="checkbox" for="Compréhension">Compréhension</label>
                <input
                  type="checkbox"
                  id="Application"
                  value="Application"
                  v-model="createdQuizz.taxBloom"
                >
                <label class="checkbox" for="Application">Application</label>
                <input type="checkbox" id="Analyse" value="Analyse" v-model="createdQuizz.taxBloom">
                <label class="checkbox" for="Analyse">Analyse</label>
                <input
                  type="checkbox"
                  id="Synthèse"
                  value="Synthèse"
                  v-model="createdQuizz.taxBloom"
                >
                <label class="checkbox" for="Synthèse">Synthèse</label>
                <input
                  type="checkbox"
                  id="Évaluation"
                  value="Évaluation"
                  v-model="createdQuizz.taxBloom"
                >
                <label class="checkbox" for="Évaluation">Évaluation</label>
              </div>
            </div>
          </div>
        </div>

        <div class="tile is-child">
          <button
            class="button is-link"
            v-on:click="$emit('change-step', {currentStep:'generate-questions', createdQuizz: createdQuizz});
            this.$parent.quizz_infos = createdQuizz"
          >
            <p>GENERATE
              <br>QUESTIONS
            </p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { VueTags } from "vue-tags-component";

export default {
  name: "create-quizz",
  components: {
    "vue-tags": VueTags
  },
  data() {
    return {
      createdQuizz: {
        name: "",
        description: "",
        search: "",
        taxBloom: [],
        image_url: ""
      }
    };
  },
  created() {},
  methods: {}
};
</script>

<style scoped>
.bordered {
  border-style: solid;
}

.quizzName {
  font: 2.5em sans-serif;
}

.checkbox {
  margin-right: 3%;
  margin-left: 0%;
}

.button {
  height: 10vh;
  width: 20vh;
}
.hero {
  margin-top: 5%;
}
</style>
