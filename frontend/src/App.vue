<template>
  <div id="app">
    <div>
      <nav class="navbar is-fixed-top is-dark" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <router-link to="/" class="navbar-item">
            <p class="is-size-3">LD2QUIZ</p>
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
            <router-link to="/" class="navbar-item">Catalog</router-link>

            <router-link to="/creator" class="navbar-item">Create Quizz</router-link>
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <router-link to="/signup" class="button is-primary">
                  <strong>Sign up</strong>
                </router-link>
                <router-link to="/login" class="button is-light">Log in</router-link>
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
export default {
  data: () => ({
    token: "",
    username: ""
  })
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
</style>
