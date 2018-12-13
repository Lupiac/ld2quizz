<template>
  <div :to="`/quizz/${quizz.id}`" class="tile is-ancestor">
    <a class="card-link tile is-child box">
      <article class="tile is-child box image">
        <div class="is-centered">
          <h4 class="post-category is-size-3">{{quizz.name}}</h4>
        </div>
        <div class="level-right">
          <p class="is-size-5">{{quizz.nbQuestion}} Questions</p>
        </div>
        <div></div>
      </article>
    </a>
  </div>
</template>

<script>
export default {
  name: "quizz-item",
  route: "/quizz/",
  props: {
    quizz: Object
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

.bg {
  background-color: $bg;
}

article {
}

body {
  display: flex;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  color: $text;
  background: $bg;
  font-size: 0.9375rem;
  min-height: 100vh;
  margin: 0;
  line-height: 1.6;
  align-items: center;
  justify-content: center;
  text-rendering: optimizeLegibility;
}

#container {
  width: 30rem;
  height: 13.625rem;
}

.blog-card {
  display: flex;
  flex-direction: row;
  background: $white;
  box-shadow: 0 0.1875rem 1.5rem $shadow;
  border-radius: 0.375rem;
  overflow: hidden;
}

.card-link {
  position: relative;
  display: block;
  color: inherit;
  text-decoration: none;

  &:hover .post-title {
    @include transition(color 0.3s ease);
    color: $red;
  }

  &:hover .post-image {
    @include transition(opacity 0.3s ease);
    opacity: 0.9;
  }
}

.post-image {
  @include transition(opacity 0.3s ease);
  display: block;
  height: 10vw;
  max-width: 10vw;
  width: auto;
  margin-left: auto;
  margin-right: auto;
  object-fit: cover;
  box-shadow: 0rem 0rem 0rem 0.1rem;
}

.article-details {
  margin: 5%;
}

.post-category {
  display: inline-block;
  text-transform: uppercase;
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: 0.0625rem;
  margin: 0 0 0.75rem 0;
  padding: 0 0 0.25rem 0;
}

.post-title {
  @include transition(color 0.3s ease);
  font-size: 1.125rem;
  line-height: 1.4;
  color: $black;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.post-author {
  font-size: 0.875rem;
  line-height: 1;
  margin: 1.125rem 0 0 0;
  padding: 1.125rem 0 0 0;
  border-top: 0.0625rem solid $border;
}

@media (max-width: 40rem) {
  #container {
    width: 18rem;
    height: 27.25rem;
  }

  .blog-card {
    flex-wrap: wrap;
  }
}

@supports (display: grid) {
  body {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 0.625rem;
    grid-template-areas: ". main main ." ". main main .";
  }

  #container {
    grid-area: main;
    align-self: center;
    justify-self: center;
  }

  .blog-card {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
  }

  @media (max-width: 40rem) {
    .blog-card {
      grid-template-columns: auto;
      grid-template-rows: 12rem 1fr;
    }
  }
}
</style>
