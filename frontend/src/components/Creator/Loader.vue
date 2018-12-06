<template>
  <div>
    <spinner
      :status="spinner.status"
      :color="spinner.color"
      :size="spinner.size"
      :depth="spinner.depth"
      :rotation="spinner.rotation"
      :speed="spinner.speed"
      class="spinner"
    ></spinner>
    <h1 class="title is-1">Please Wait</h1>
    <h3 class="subtitle is-3">Our algorithm is generating questions</h3>
  </div>
</template>

<script>
import Spinner from "@/components/Creator/Spinner.vue";
import axios from "axios";
let server = "localhost:3000";

export default {
  name: "generate-questions",
  components: {
    spinner: Spinner
  },
  data() {
    return {
      spinner: {
        size: 250,
        status: true,
        color: "#4fc08d",
        depth: 8,
        rotation: true,
        speed: 1.5
      }
    };
  },
  created() {
    axios
      .post("http://" + server + "/generator", {
        domain_description: this.$parent.quizz_infos.search,
        username: this.$parent.$parent._data.username,
        token: this.$parent.$parent._data.token
      })
      .then(response => {
        this.$parent.questions = response.data;
        console.log(response.data);
        this.$emit("change-step", {
          currentStep: "detail-questions",
          createdQuizz: this.$parent.quizz_infos
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>

<style lang="scss" scoped>
.spinner {
  margin-bottom: 5%;
  margin-top: 5%;
  margin-left: auto;
  margin-right: auto;
}
</style>
