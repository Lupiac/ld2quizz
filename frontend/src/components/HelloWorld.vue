<template>

  <div class="hello columns" >
      <div class="column is-one-third">
            <h1 class="title is-1">{{ msg }}</h1>
      </div>
      <div class="column is-two-thirds">
        <h1> qsuhsqfiuhqfsih</h1>
      </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font: 1.5em sans-serif;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
