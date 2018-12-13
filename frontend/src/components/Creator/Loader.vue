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
      <li class="steps-segment is-active">
        <span class="steps-marker">2</span>
        <div class="steps-content">
          <p class="is-size-5">Génération</p>
        </div>
      </li>
      <li class="steps-segment not-active">
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

    <spinner
      :status="spinner.status"
      :color="spinner.color"
      :size="spinner.size"
      :depth="spinner.depth"
      :rotation="spinner.rotation"
      :speed="spinner.speed"
      class="spinner"
    ></spinner>
    <h1 class="title is-1">Veuillez patienter</h1>
    <h3 class="subtitle is-3">Notre algorithme est en train de générer les questions</h3>
    <h3 class="subtitle is-3">Ceci prend en moyenne 2 à 3 min</h3>
  </div>
</template>

<script>
import Spinner from "@/components/Creator/Spinner.vue";
import Vue from "vue";
import VueToasted from "vue-toasted";
import axios from "axios";
let server = "localhost:3000";

export default {
  name: "generate-questions",
  components: {
    spinner: Spinner
  },
  data() {
    return {
      spinner: {
        size: 250,
        status: true,
        color: "#4fc08d",
        depth: 8,
        rotation: true,
        speed: 1.5
      }
    };
  },
  created() {
    Vue.use(VueToasted, {});
    axios
      .post("http://" + server + "/generator", {
        domain_description: this.$parent.quizz_infos.search,
        username: this.$parent.$parent._data.username,
        token: this.$parent.$parent._data.token
      })
      .then(response => {
        this.$parent.questions = response.data;
        console.log(response.data);
        this.$emit("change-step", {
          currentStep: "detail-questions",
          createdQuizz: this.$parent.quizz_infos
        });
      })
      .catch(e => {
        this.$emit("change-step", {
          currentStep: "create-quizz",
          createdQuizz: this.$parent.quizz_infos
        });
        console.log(e);
      });
  },
  methods: {
    back: function() {
      let toast = this.$toasted.show(
        "Une erreura eu lieu avec le server.\nVeuillez réessayer...",
        {
          theme: "primary",
          position: "top-right",
          duration: 2000
        }
      );
      this.$emit("create-quizz", {
        currentStep: "detail-questions",
        createdQuizz: this.$parent.quizz_infos
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
