<template>
  <div class="container content is-fluid is-family-secondary">
    <div class="tile is-ancestor box hero">
      <div class="tile is-vertical hero-body">
        <div class="tile is-child box">
          <div class="field is-horizontal level columns">
            <div class=" level-item" >
                <a class=" button is-link" style="margin-top: 0%; margin-bottom: 0%" href="/">Retour</a>
              </div>
            <div class="label is-child is-normal level-item column is-one-seventh">
              <label class="title is-size-1">Nom:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded is-size-1 has-text-centered is-italic">
                  <strong>{{quizz.name}}</strong>
                  ({{quizz.nbQuestion}} questions)
                </p>
              </div>
            </div>
          </div>
        </div>
        <article class="tile is-child box">
          <img class="post-image level-item" :src="quizz.image_url">
        </article>
        <div class="columns is-horizontal is-flex">
          <div class="column is-5 is-flex">
            <div class="tile is-child box">
              <div class="level">
                <div class="is-child is-normal level-item column is-one-seventh">
                  <p class="title is-size-4">Description:</p>
                  {{quizz.description}}
                </div>
              </div>
            </div>
          </div>
          <div class="column is-5 is-flex">
            <div class="tile is-child box">
              <div class="level">
                <div class="is-child is-normal level-item column is-one-seventh">
                  <p class="title is-size-4">Sujets Relatifs:</p>
                  <div>
                    <virtual-list class="box" :size="30" :remain="8 ">
                      <div
                        class="is-large level-left has-text-left"
                        v-for="(category, index) in quizz.categories"
                        :key="index"
                      >
                        <div v-if="category.enabled">
                          <i class="fa fa-circle"/>
                          {{category.name}}
                        </div>
                      </div>
                    </virtual-list>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-2 is-flex">
            <button
              class="button is-link is-large start-button"
              v-on:click="$emit('change-step', {step:'question', quizz: quizz})"
            >
              <p>COMMENCER QUIZ</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
// @ is an alias to /src
import virtualList from "vue-virtual-scroll-list";
import axios from "axios";

export default {
  name: "quizz-description",
  data: () => ({
    quizz: {},
    errors: []
  }),
  components: {
    "virtual-list": virtualList
  },
  created() {
    axios
      .get("/quizzes/" + this.$route.params.id)
      .then(response => {
        console.log(response.data);
        this.quizz = response.data;
      })
      .catch(e => {
        console.log("Error");
        this.errors.push(e);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:400,700");

$bg: #eedfcc;
$text: #777;
$black: #121212;
$white: #fff;
$red: #e04f62;
$border: #ebebeb;
$shadow: rgba(0, 0, 0, 1.5);

@mixin transition($args...) {
  transition: $args;
}

* {
  box-sizing: border-box;

  &::before,
  &::after {
    box-sizing: border-box;
  }
}
.button {
  margin-top: 50%;
  margin-bottom: 50%;
}

.post-image {
  @include transition(opacity 0.3s ease);
  display: block;
  height: auto;
  width: 25%;
  margin-left: auto;
  margin-right: auto;
  object-fit: cover;
}

.hero {
  height: 50vh;
}
.start-button {
  font-size: 1.125em;
}
</style>
