<template>
  <div>
    <div>
      <ul class="steps is-small my-step-style has-content-centered">
        <li class="steps-segment is-active">
          <span class="steps-marker">1</span>
          <div class="steps-content">
            <p class="is-size-5">Infos Quiz</p>
          </div>
        </li>
        <li class="steps-segment not-active">
          <span class="steps-marker">2</span>
          <div class="steps-content">
            <p class="is-size-5">Questions</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="container is-fluid is-family-secondary has-navbar-fixed-top">
      <div class="content tile is-ancestor box hero">
        <div class="tile is-vertical hero-body">
          <div class="box infos">
            <div class="tile is-child box">
              <div class="field is-horizontal level columns">
                <div class="label is-child is-normal level-item column is-one-seventh">
                  <label class="title is-size-1-desktop">Nom:</label>
                </div>
                <div class="field-body">
                  <div class="field">
                    <p class="control is-expanded">
                      <input
                        v-model="quizz.name"
                        class="input is-size-2"
                        type="text"
                        placeholder="Entrez le nom du quiz  Ex: 'Big Data'"
                      >
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="tile is-child box">
              <div class="field is-horizontal level columns">
                <div class="label is-child is-normal level-item column is-one-seventh">
                  <label class="title is-size-4">Image :</label>
                </div>
                <div class="field-body">
                  <div class="field">
                    <p class="control is-expanded">
                      <input
                        v-model="quizz.image_url"
                        class="input"
                        type="text"
                        placeholder="Entrez l'URL d'une image"
                      >
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="tile is-child box">
              <div class="field is-horizontal level columns">
                <div class="label is-child is-normal level-item column is-one-seventh">
                  <label class="title is-size-4-desktop">Description du quiz:</label>
                </div>
                <div class="field-body">
                  <div class="field">
                    <p class="control is-expanded">
                      <textarea
                        v-model="quizz.description"
                        class="textarea"
                        placeholder="Entrez la description de votre quiz...  
Ex: 'Voici un quiz sur le Big Data'"
                      ></textarea>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="tile is-child box">
              <div class="field is-horizontal level columns">
                <div class="label is-child is-normal level-item column is-one-seventh">
                  <label class="title is-size-4">Objectifs pédagogiques:</label>
                </div>
                <div class="field-body">
                  <div class="field has-text-left">
                    <input
                      type="checkbox"
                      id="Connaissance"
                      value="Connaissance"
                      v-model="quizz.taxBloom"
                    >
                    <label class="checkbox" for="Connaissance">Connaissance</label>
                    <input
                      type="checkbox"
                      id="Compréhension"
                      value="Compréhension"
                      v-model="quizz.taxBloom"
                    >
                    <label class="checkbox" for="Compréhension">Compréhension</label>
                    <input
                      type="checkbox"
                      id="Application"
                      value="Application"
                      v-model="quizz.taxBloom"
                    >
                    <label class="checkbox" for="Application">Application</label>
                    <input type="checkbox" id="Analyse" value="Analyse" v-model="quizz.taxBloom">
                    <label class="checkbox" for="Analyse">Analyse</label>
                    <input type="checkbox" id="Synthèse" value="Synthèse" v-model="quizz.taxBloom">
                    <label class="checkbox" for="Synthèse">Synthèse</label>
                    <input
                      type="checkbox"
                      id="Évaluation"
                      value="Évaluation"
                      v-model="quizz.taxBloom"
                    >
                    <label class="checkbox" for="Évaluation">Évaluation</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="tile is-child has-content-centered">
            <button class="button is-link" v-on:click="next()">
              <p>SUIVANTS</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueToasted from "vue-toasted";

export default {
  name: "modify-info",
  props: {
    quizz: Object
  },
  components: {
  },
  data() {
    return {
      createdQuizz: {
        name: "",
        description: "",
        taxBloom: [],
        image_url: ""
      }
    };
  },
  created() {
    Vue.use(VueToasted, {});

    this.createdQuizz = this.quizz;
  },
  methods: {
    next: function() {
      if (this.quizz.name === "") {
        let toast = this.$toasted.error("Votre quiz n'a pas de nom", {
          theme: "primary",
          position: "top-right",
          duration: 2000,
          type: "error"
        });
      } else {
        this.$parent.quizz_infos = this.quizz;
        this.$emit("change-step", { currentStep: "modify-questions" });
        
      }
    }
  }
};
</script>


<style scoped>
.infos {
  background-color: white;
  margin-top: 0%;
}
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
  margin-left: 40%;
  margin-right: 40%;
}
.hero-body {
  margin-top: 1.5rem;
}
.hero {
  margin-top: 0.5rem;
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
