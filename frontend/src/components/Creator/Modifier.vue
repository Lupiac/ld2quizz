<template>
  <section class="fullsize ">
    <component
      :quizz="quizz"
      v-bind:is="currentStep"
      v-on:change-step="currentStep = $event.currentStep;"
    ></component>
  </section>
</template>


<script>
// @ is an alias to /src
import ModifyQuestionList from "@/components/Creator/ModifyQuestionList.vue";
import ModifyQuizzInfos from "@/components/Creator/ModifyQuizzInfos.vue";

export default {
  name: "modifier",
  props: {
    quizz: Object
  },
  components: {
    "modify-questions": ModifyQuestionList,
    "modify-info": ModifyQuizzInfos
  },
  data() {
    return {
      currentStep: "modify-info",
      quizz_infos: {}
    };
  },
  methods: {
    close: function() {
      this.$parent.isActive = false;
    }
  }
};
</script>

<style scoped>
</style>