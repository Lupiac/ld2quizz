<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Sign Up</h3>
          <p class="subtitle has-text-grey">Please enter your informations to proceed.</p>
          <div class="box">
            <figure class="avatar">
              <img src="..\assets\information.svg" class="icon-info">
            </figure>
            <div>
              <div class="field">
                <div class="control">
                  <input
                    v-model="username"
                    class="input is-large"
                    type="text"
                    placeholder="Your Username"
                  >
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input
                    v-model="password"
                    class="input is-large"
                    type="password"
                    placeholder="Your Password"
                    v-on:keyup.enter="register()"
                  >
                </div>
              </div>
              <button
                class="button is-block is-info is-large is-fullwidth"
                v-on:click="register()"
              >Login</button>
            </div>
          </div>
          <p class="has-text-grey">
            <a>Log In</a> &nbsp;·&nbsp;
            <a>Forgot Password</a> &nbsp;·&nbsp;
            <a>Need Help?</a>
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
    password: "",
    errors: []
  }),
  created() {
    Vue.use(VueToasted, {});
  },
  methods: {
    register() {
      if (this.username != "" && this.password != "") {
        axios
          .post("http://" + server + "/users", {
            username: this.username,
            password: this.password
          })
          .then(response => {
            console.log(response.data.message);
            let toast = this.$toasted.show(response.data.message, {
              theme: "primary",
              position: "top-right",
              duration: 2000
            });
            this.$router.push("login");
          })
          .catch(e => {
            console.log(e.response.data.message);
            let toast = this.$toasted.show(e.response.data.message, {
              theme: "primary",
              position: "top-right",
              duration: 2000
            });
            this.errors.push(e);
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
