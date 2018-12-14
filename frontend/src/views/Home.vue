<template>
  <div class="hero is-fullheight has-nav">
    <div class="columns is-centered">
      <div class="column is-8 is-centered box">
        <div class>
          <div class="is-flex is-vcentered column">
            <input
              v-model="keywords"
              class="input is-size-5 column is-6"
              type="text"
              placeholder="Que voulez-vous apprendre? Ex: 'Big Data' "
              v-on:keyup.enter="searchQuizz()"
            >
            <div class="column is-4" style="padding-top:0.5%;">
              <dropdown>
                <template slot="btn">Objectifs pédagogiques</template>
                <template slot="body" class="has-text-left">
                  <ul>
                    <div v-for="(tax, index)  in options" :key="index" class="has-text-left">
                      <label>
                        <input
                          :id="tax"
                          :value="tax"
                          type="checkbox"
                          v-model="taxBloom"
                        >
                        {{ tax }}
                      </label>
                    </div>
                  </ul>
                </template>
              </dropdown>
            </div>
            <div
              class="button is-link is-vertical-center is-medium"
              style
              v-on:click="searchQuizz()"
            >Chercher</div>
          </div>
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
import Vue from "vue";
import Dropdown from "bp-vuejs-dropdown";

import axios from "axios";

let server = "localhost:3000";
export default {
  name: "home",
  components: {
    "quizz-item": QuizzItem,
    Dropdown
  },
  data: () => ({
    quizzList: [],
    errors: [],
    keywords: "",
    taxBloom: [],
    options: [
      "Connaissance",
      "Compréhension",
      "Application",
      "Analyse",
      "Synthèse",
      "Évaluation"
    ]
  }),

  created() {
    console.log(this.$parent);
    Vue.use(Dropdown);

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
  computed: {
    bloomFilter: function(){
      let res ="";
      for(let tax of this.taxBloom){
        res+= tax +" ";
      }
      return res;
    }
  },
  methods: {
    searchQuizz: function() {
      axios
        .get("http://" + server + "/quizzes?keywords=" + this.keywords+"&taxBloom="+bloomFilter)
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
.is-vertical-center {
  display: flex;
  align-items: center;
}
</style>

