<template>
  <div id="app">
    <div>
      <nav class="navbar is-fixed-top is-dark" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <router-link to="/" class="navbar-item">
            <p class="is-size-3">LOD2QUIZ</p>
          </router-link>

          <a
            role="button"
            class="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <router-link to="/" class="navbar-item">Catalogue</router-link>

            <router-link to="/creator" class="navbar-item">Générateur de Quiz</router-link>
            <router-link to="/about" class="navbar-item">A Propos</router-link>
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <div v-if="token===''" class="buttons">
                <!-- <router-link to="/signup" class="button is-primary">
                  <strong>S'inscrire</strong>
                </router-link> -->
                <router-link to="/login" class="button is-light">Connexion</router-link>
              </div>
              <div v-else-if="token!==''" class="buttons" v-on:click="disconnect()">
                <router-link to="/" class="button is-primary">
                  <div class="icon" style="font-size: 1.5em;">
                    <i class="fas fa-sign-out-alt"></i>
                  </div>
                  <strong>Déconnexion</strong>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <div>
      <router-view class="has-nav" v-on:token="token = $event.token; username = $event.username"/>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueToasted from "vue-toasted";
import axios from "axios";
let server = "localhost:3000";

export default {
  data: () => ({
    token: "",
    username: ""
  }),
  created() {
    Vue.use(VueToasted, {});
  },
  methods: {
    disconnect: function() {
      axios
        .delete(
          "http://" +
            server +
            "/authentication?username=" +
            this.username +
            "&token=" +
            this.token
        )
        .then(response => {
          console.log(response);
          let toast = this.$toasted.show("Vous êtes déconnecté.", {
            theme: "primary",
            position: "top-right",
            duration: 2000
          });
          this.token = "";
          this.username = "";
        })
        .catch(e => {
          let toast = this.$toasted.error(e, {
            theme: "primary",
            position: "top-right",
            duration: 2000
          });
        });
    }
  }
};
</script>

<style lang="sass">
  @import '../node_modules/bulma/bulma.sass'
  @import 'mq'
  

</style>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.has-nav {
  margin-top: 3.25rem;
}
.hvr-grow {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: transform;
}
.hvr-grow:hover,
.hvr-grow:focus,
.hvr-grow:active {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
