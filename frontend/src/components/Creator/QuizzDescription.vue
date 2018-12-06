<template>
  <div class="container content is-fluid is-family-secondary">
    <div class="tile is-ancestor box">
      <div class="tile is-vertical hero center-vert">
        <div class="tile is-child box">
          <div class="field is-horizontal level columns">
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
        <div class="tile is-child box">
          <div class="field is-horizontal level columns">
            <div class="label is-child is-normal level-item column is-one-seventh">
              <label class="title is-size-4">Description:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded">{{quizz.description}}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="columns is-horizontal is-flex">
          <div class="column is-5 is-flex">
            <div class="tile is-child box">
              <div class="level">
                <div class="is-child is-normal level-item column is-one-seventh">
                  <p class="title is-size-4">Domains:</p>
                  <div>
                    <p v-for="domain in quizz.domains" :key="domain" class="is-large level-left">
                      <i class="fa fa-circle"></i>
                      {{domain}}
                    </p>
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
              <p>MANAGE QUIZZ</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
// @ is an alias to /src
import axios from "axios";

let server = "localhost:3000";
export default {
  name: "quizz-description",
  props: {
    quizz: Object
  },
  data: () => ({})
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

.start-button {
  font-size: 1.125em;
}
.center-vert {
  margin-top: 10%;
}
</style>
