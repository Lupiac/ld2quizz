<template>
  <div class="container content is-fluid is-family-secondary column is-8">
    <div class="tile is-ancestor box columns column">
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
            <div class="is-child is-normal level-item column is-one-fifth has-text-left">
              <label class="title is-size-4">Description:</label>
              <div class="field-body has-text-left">
                <div class="field">
                  <p class="control">{{quizz.description}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="columns is-horizontal level">
          <div class="column is-5 is-flex">
            <div class="tile is-child box">
              <div class="level">
                <div class="is-child is-normal level-item column is-one-seventh">
                  <p class="title is-size-4">Sujets Relatifs:</p>
                  <virtual-list class="box" :size="45" :remain="8 ">
                    <div
                      class="is-large level-left"
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
          <div class="column is-2 level-left">
            <button class="button is-link is-large start-button" v-on:click="launch()">
              <p>MODIFIER QUIZZ</p>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" v-bind:class="{'is-active':isActive}">
      <div class="modal-background" @click="close"></div>
      <div class="modal-content">
        <div class="box">
          <div class="content has-text-centered fullsize">
            <div class="control">
              <modifier-quizz :quizz="quizz"/>
            </div>
            <button @click="close" class="button">Fermer</button>
            <span>&nbsp;</span>
          </div>
          <button @click="close" class="modal-close"></button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
// @ is an alias to /src
import virtualList from "vue-virtual-scroll-list";
import { Modal, ImageModal, CardModal } from "vue-bulma-modal";
import Modifier from "@/components/Creator/Modifier.vue";

import axios from "axios";

let server = "localhost:3000";
export default {
  name: "quizz-description",
  props: {
    quizz: Object
  },
  components: {
    "virtual-list": virtualList,
    Modal,
    ImageModal,
    CardModal,
    "modifier-quizz": Modifier
  },
  data: () => ({
    isActive: false
  }),
  methods: {
    launch: function() {
      this.isActive = true;
    },
    close: function() {
      this.isActive = false;
    }
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

.start-button {
  font-size: 1.125em;
}
.center-vert {
}
.modal-content {
  width: calc(95vw - 40px);
}
</style>
