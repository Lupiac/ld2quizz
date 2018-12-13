<template>
  <section class="has-nav">
    <component
      v-bind:is="currentStep"
      v-on:change-step="currentStep = $event.currentStep; quizz_infos = quizz_infos= $event.createdQuizz"
    ></component>
  </section>
</template>


<script>
// @ is an alias to /src
import HelloCreator from "@/components/Creator/HelloCreator.vue";
import CreateQuizz from "@/components/Creator/CreateQuizz.vue";
import QuestionList from "@/components/Creator/QuestionList.vue";
import CreatedQuizz from "@/components/Creator/CreatedQuizz.vue";
import Loader from "@/components/Creator/Loader.vue";

export default {
  name: "creator",
  components: {
    "hello-creator": HelloCreator,
    "create-quizz": CreateQuizz,
    "generate-questions": Loader,
    "detail-questions": QuestionList,
    "created-quizz": CreatedQuizz
  },
  data() {
    return {
      currentStep: "hello-creator",
      quizz_infos: {
        name: "",
        description: "",
        search: "",
        taxBloom: [],
        image_url: ""
      },
      questions: {}
    };
  }
};
</script>

<style scoped>
.has-nav {
  padding-top: 1.5rem;
}
</style>