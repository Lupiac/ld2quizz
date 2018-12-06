<template>
  <div class="hero is-fullheight has-nav">
    <div class="columns is-centered">
      <div class="column is-6 is-centered box">
        <div class="field">
          <input
            v-model="keywords"
            class="input is-size-5"
            type="text"
            placeholder="What to learn?"
            v-on:keyup.enter="searchQuizz()"
          >
          <div class="button is-link" v-on:click="searchQuizz()">Search</div>
        </div>
      </div>
    </div>
    <div class="hero-body columns is-desktop is-multiline is-centered">
      <div class="column is-narrow-desktop is-4" v-for="(quizz, index)  in quizzList" :key="index">
        <quizz-item :quizz="quizz" :index="index"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import QuizzItem from "@/components/Home/QuizzItem.vue";
import axios from "axios";

let server = "localhost:3000";
export default {
  name: "home",
  components: {
    "quizz-item": QuizzItem
  },
  data: () => ({
    quizzList: [],
    errors: [],
    keywords: ""
  }),

  created() {
    console.log(this.$parent);

    axios
      .get("http://" + server + "/quizzes")
      .then(response => {
        console.log(response.data);
        this.quizzList = response.data;
      })
      .catch(e => {
        this.errors.push(e);
      });
  },
  methods: {
    searchQuizz: function() {
      axios
        .get("http://" + server + "/quizzes?keywords=" + this.keywords)
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
.has-nav {
  padding-top: 3.25rem;
}
</style>

