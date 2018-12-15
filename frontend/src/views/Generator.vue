<template>
  <section class="has-nav">
    <component
      v-bind:is="currentStep"
      v-on:change-step="currentStep = $event.currentStep;quizz_infos= $event.createdQuizz"
    ></component>
  </section>
</template>


<script>
// @ is an alias to /src
import HelloGenerator from "@/components/Creator/HelloGenerator.vue";
import CreateQuizz from "@/components/Creator/CreateQuizz.vue";
import QuestionList from "@/components/Creator/QuestionList.vue";
import CreatedQuizz from "@/components/Creator/CreatedQuizz.vue";
import Loader from "@/components/Creator/Loader.vue";

export default {
  name: "generator",
  components: {
    "hello-generator": HelloGenerator,
    "create-quizz": CreateQuizz,
    "generate-questions": Loader,
    "detail-questions": QuestionList,
    "created-quizz": CreatedQuizz
  },
  data() {
    return {
      currentStep: "hello-generator",
      quizz_infos: {
        name: "",
        description: "",
        search: "",
        taxBloom: [],
        image_url: ""
      },
      questions: {},
      errors:[]
    };
  }
};
</script>

<style scoped>
.has-nav {
  padding-top: 1.5rem;
}
</style>