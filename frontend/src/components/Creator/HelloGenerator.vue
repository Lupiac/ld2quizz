<template>
  <div>
    <div class="columns">


      </div>

      <div v-if="!preview" class="column box" style="height: 90vh; margin-top: 0; margin-bottom: 0; padding-top: 17%;">
        <h1 class="title is-1">Bienvenue</h1>
        <h3
          class="subtitle is-3"
        >Vous pouvez modifier un de vos quiz existant ou en créer un nouveau</h3>
        <button class="button is-link hvr-grow" v-on:click="createQuizz()">Créer un Quizz</button>
      </div>
      <div v-else class="column is-8 level box is-flex">
        <quizz-description class="level-item is-vertical-center is-flex" :quizz="quizz_preview"/>
      </div>
    </div>
  </div>
</template>

<script>
import QuizzItem from "@/components/Creator/QuizzItem.vue";
import QuizzDescription from "@/components/Creator/QuizzDescription.vue";
import virtualList from "vue-virtual-scroll-list";
import Vue from "vue";
import VueToasted from "vue-toasted";

import axios from "axios";

export default {
  name: "hello-creator",
  components: {
    "quizz-item": QuizzItem,
    "virtual-list": virtualList,
    "quizz-description": QuizzDescription
  },
  data: () => ({
    quizzList: [],
    errors: [],
    username: "",
    token: "",
    quizz_preview: {},
    preview: false
  }),
  created() {
    Vue.use(VueToasted, {});

    console.log(this.$parent.$parent._data);
    this.username = this.$parent.$parent._data.username;
    this.token = this.$parent.$parent._data.token;
    if (this.username != "" && this.token != "") {
      axios
        .get(
            "/users/" +
            this.username +
            "/quizzes?token=" +
            this.token
        )
        .then(response => {
          console.log(response.data);
          this.quizzList = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  },
  methods: {
    createQuizz: function() {
      if (this.token !== "") {
        this.$emit("change-step", {
          currentStep: "create-quizz",
          createdQuizz: {
            name: "",
            description: "",
            search: "",
            taxBloom: [],
            image_url: ""
          }
        });
      } else {
        let toast = this.$toasted.error(
          "Vous devez être connecté pour créer un quiz",
          {
            theme: "primary",
            position: "top-right",
            duration: 2000,
            type: "error"
          }
        );
      }
    }
  }
};
</script>

<style scoped>
.item {
  margin-top: 2%;
  margin-bottom: 5%;
}

.is-vertical-center {
  display: flex;
  align-items: center;
}
.add {
  padding-right: 5%;
}
</style>
