<template>
  <div>
    <div v-if="!deleted">
      <div class="columns is-expanded level box">
        <div class="column is-10 has-text-left">
          <p>{{item.question}}</p>
        </div>
        <div class>
          <div class="icon is-large level-item">
            <div v-on:click="deleteQuestion()">
              <i class="fa fa-trash fa-lg space"/>
            </div>
            <div v-on:click="expand=!expand; ">
              <div v-if="!expand">
                <i class="fa fa-caret-square-right fa-lg"></i>
              </div>
              <div v-else class="bloc">
                <i class="fa fa-caret-square-down fa-lg"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="expand" class="has-text-left">
        <p class="answer is-italic">
          <strong>Real Answer:</strong>
          {{item.answer}}
        </p>
        <div v-for="distractor in item.distractors" :key="distractor">
          <p>
            <strong>Choice {{distractor.id}}:</strong>
            {{distractor}}
          </p>
        </div>
      </div>
    </div>
    <div v-if="deleted">
      <div class="columns is-expanded level box" v-on:click="expand=!expand">
        <div class="column is-10 has-text-left blurred">
          <p>{{item.question}}</p>
        </div>
        <div class>
          <div class="icon is-large level-item space">
            <div v-on:click="putBack()">
              <i class="fas fa-redo-alt fa-lg"/>
            </div>
            <div>
              <i class="fa fa-caret-square-right fa-lg"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "question-item",
  props: {
    item: Object,
    id: Number
  },
  components: {},
  data() {
    return {
      expand: false,
      deleted: false
    };
  },
  created() {
    console.log(this.$parent.$parent);
  },
  computed: {
    toDelete: function() {
      let toDelete = true;
      for (let category in this.item.categories) {
        console.log(this.$parent.$parent.pickedTopics.includes(category));
        if (this.$parent.$parent.pickedTopics.includes(category))
          toDelete = false;
      }
      if (toDelete) this.deleteQuestion();
    }
  },
  methods: {
    deleteQuestion: function() {
      this.expanded = false;
      this.deleted = true;
      this.$parent.$parent.questions[this.id].enabled = false;
      console.log(this.$parent.$parent.questions[this.id]);
      /*       this.$parent.$parent.questions.splice(id, 1);
       */
    },
    putBack: function() {
      this.deleted = false;
      this.$parent.$parent.questions[this.id].enabled = true;
      console.log(this.$parent.$parent.questions[this.id]);
    }
  }
};
</script>

<style scoped>
.blurred {
  -webkit-filter: blur(1px);
  -moz-filter: blur(1px);
  -o-filter: blur(1px);
  -ms-filter: blur(1px);
  filter: blur(1px);
}
.space {
  padding-right: 10%;
}
</style>

