<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <!--         v-bind:style="{ backgroundImage: 'url(' + require('../assets/sign-up.jpg') + ')' }"
      -->
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Connexion</h3>
          <p class="subtitle has-text-grey">Veuillez entrer vos informations pour vous connecter.</p>
          <div class="box">
            <figure class="avatar">
              <img src="..\assets\login.svg" class="icon-info">
            </figure>
            <div>
              <div class="field">
                <div class="control">
                  <input
                    v-model="username"
                    class="input is-large"
                    type="text"
                    placeholder="Pseudo"
                    autofocus
                  >
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input
                    v-model="password"
                    class="input is-large"
                    type="password"
                    placeholder="Mot De Passe"
                    v-on:keyup.enter="login()"
                  >
                </div>
              </div>
              <button
                class="button is-block is-info is-large is-fullwidth"
                v-on:click="login()"
              >Connexion</button>
            </div>
          </div>
          <p class="has-text-grey">
            <a href>Connexion</a> &nbsp;·&nbsp;
            <a href>Mot de passe oublié</a> &nbsp;·&nbsp;
            <a href>Besoin d'aide?</a>
          </p>
        </div>
      </div>
    </div>
    <!--     <div>
      Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"
        title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"
        title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
    </div>-->
  </section>
</template>


<script>
// @ is an alias to /src
import axios from "axios";
import Vue from "vue";
import VueToasted from "vue-toasted";
let server = "localhost:3000";
export default {
  name: "question",
  data: () => ({
    username: "",
    password: ""
  }),

  created() {
    Vue.use(VueToasted, {});
  },
  methods: {
    login() {
      if (this.username != "" && this.password != "") {
        axios
          .post("http://" + server + "/authentication", {
            username: this.username,
            password: this.password
          })
          .then(response => {
            console.log(response);
            let toast = this.$toasted.show(response.data.message, {
              theme: "primary",
              position: "top-right",
              duration: 2000
            });
            this.$emit("token", {
              token: response.data.token,
              username: this.username
            });
            this.$router.push("creator");
          })
          .catch(e => {
            console.log(e);
            let toast = this.$toasted.show(e, {
              theme: "primary",
              position: "top-right",
              duration: 2000
            });
          });
      }
    }
  }
};
</script>

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

section:before {
  content: "";
  position: fixed;
  left: 0;
  right: 0;
  z-index: -1;

  display: block;
  background-image: url("../assets/sign-up.jpg");
  width: 100%;
  height: 100%;

  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px) grayscale(50%) brightness(125%);
}

.icon-info {
  @include transition(opacity 0.3s ease);
  display: block;
  height: auto;
  width: auto;
  margin-left: auto;
  margin-right: auto;
  object-fit: cover;
  margin-bottom: 5%;
}
</style>
