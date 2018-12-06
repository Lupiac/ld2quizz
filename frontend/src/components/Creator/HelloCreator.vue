<template>
  <!-- <div class="columns is-horizontal">
    <div class="column box">
      <p class="is-centered is-size-3">My quizzes</p>

      <div class="column is-narrow-desktop" v-for="quizz in quizzList" :key="quizz.id">
        <quizz-item :quizz="quizz" />
      </div>
    </div>
    <div class="column is-8 box">
      <h1 class="title is-1">Bienvenue</h1>
      <h3 class="subtitle is-3">Vous pouvez modifier un quizz existant ou en créer un nouveau</h3>
      <button class="button is-link" v-on:click="$emit('change-step', 'create-quizz')">Créer un Quizz</button>
    </div>
  </div>-->
  <div>
    <div class="columns">
      <div
        class="column is-4 box"
        style="height: 100%; margin-top: 0; margin-bottom: 0; max-height: 100%;"
      >
        <div class="box">
          <div class="is-centered is-size-3">
            <div
              class="icon add"
              v-on:click="$emit('change-step', {currentStep:'create-quizz', createdQuizz: {}})"
            >
              <i class="fa fa-plus-square fa-lg"/>
            </div>
            <strong>My Quizzes</strong>
          </div>
          <div>
            <virtual-list class="box" :size="95" :remain="8">
              <div
                v-on:click="preview = true; quizz_preview = quizz;"
                class="column is-narrow-desktop item"
                v-for="(quizz, index) in quizzList"
                :key="index"
              >
                <quizz-item :quizz="quizz"/>
              </div>
            </virtual-list>
          </div>
        </div>
      </div>

      <div v-if="!preview" class="column is-8 box" style="overflow: auto;">
        <h1 class="title is-1">Bienvenue</h1>
        <h3 class="subtitle is-3">Vous pouvez modifier un quizz existant ou en créer un nouveau</h3>
        <button
          class="button is-link"
          v-on:click="$emit('change-step', {currentStep:'create-quizz', createdQuizz: {}})"
        >Créer un Quizz</button>
      </div>
      <div v-else class="column is-8 level box is-flex">
        <quizz-description class="level-item is-vertical-center is-flex" :quizz="quizz_preview"/>
      </div>
    </div>
  </div>

  <!-- 
  <div class="columns is-gapless">
    <div
      class="column is-4"
      style="height: 100%; margin-top: 0; margin-bottom: 0; min-height: 500px;"
    >
      <div class="box">
        <p class="is-centered is-size-3">My quizzes</p>

        <div class="column is-narrow-desktop" v-for="quizz in quizzList" :key="quizz.id">
          <quizz-item :quizz="quizz"/>
        </div>
      </div>
    </div>

    <div class="column is-8 box" style="overflow: auto;">
      <h1 class="title is-1">Bienvenue</h1>
      <h3 class="subtitle is-3">Vous pouvez modifier un quizz existant ou en créer un nouveau</h3>
      <button
        class="button is-link"
        v-on:click="$emit('change-step', 'create-quizz')"
      >Créer un Quizz</button>
    </div>
  </div>-->
</template>

<script>
import QuizzItem from "@/components/Creator/QuizzItem.vue";
import QuizzDescription from "@/components/Creator/QuizzDescription.vue";
import virtualList from "vue-virtual-scroll-list";

import axios from "axios";
let server = "localhost:3000";

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
    console.log(this.$parent.$parent._data);
    this.username = this.$parent.$parent._data.username;
    this.token = this.$parent.$parent._data.token;
    if (this.username != "" && this.token != "") {
      axios
        .get(
          "http://" +
            server +
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
