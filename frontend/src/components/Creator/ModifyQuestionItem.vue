<template>
  <div class="content">
    <blockquote class="blockquote-picked" v-if="item.enabled">
      <div class="columns is-expanded level box">
        <div v-if="!item.modifiedQuestion" class="column is-10 has-text-left">
          <p>{{item.question}}</p>
        </div>
        <div v-else class="column is-10 has-text-left">
          <p>{{item.modifiedQuestion}}</p>
        </div>
        <div>
          <div class="icon is-spaced is-large level-item" style="font-size: 1.4em;">
            <div class="hvr-grow" v-on:click="edit=!edit;">
              <i class="far fa-edit is-spaced fa-lg space"></i>
            </div>
            <div class="hvr-grow" v-on:click="deleteQuestion()">
              <i class="is-spaced fa fa-trash fa-lg space"/>
            </div>
            <div class="is-spaced hvr-grow" v-on:click="expand=!expand; ">
              <div v-if="!expand">
                <i class="is-spaced fa fa-caret-square-right fa-lg"></i>
              </div>
              <div v-else class="bloc">
                <i class="is-spaced fa fa-caret-square-down fa-lg"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="edit" class="has-text-left detail box">
        <p class="answer is-italic">
          <input
            class="input"
            type="text"
            placeholder="Reformuler la question"
            v-model="modifiedQuestion"
          >
          <button class="button is-link" @click="confirm()">Modifier</button>
          <button class="button is-primary" @click="restore()">Garder Originale</button>
        </p>
      </div>
      <div v-if="expand" class="has-text-left detail box">
        <p class="answer is-italic">
          <strong>Bonne réponse:</strong>
          {{item.answer}}
        </p>
        <div v-for="distractor in item.distractors" :key="distractor">
          <p>
            <strong>Distracteur {{distractor.id}}:</strong>
            {{distractor}}
          </p>
        </div>
      </div>
    </blockquote>
    <blockquote class="blockquote-not" v-else>
      <div class="columns is-expanded level box">
        <div class="column is-10 has-text-left blurred">
          <p>{{item.question}}</p>
        </div>
        <div class>
          <div class="icon is-spaced is-large level-item space" style="font-size: 1.4em;">
            <div class="hvr-grow" v-on:click="putBack()">
              <i class="is-spaced fas fa-redo-alt fa-lg"/>
            </div>
            <div class="is-spaced hvr-grow">
              <i class="is-spaced fa fa-caret-square-right fa-lg"/>
            </div>
          </div>
        </div>
      </div>
    </blockquote>
  </div>
</template>


<script>
export default {
  name: "question-item",
  props: {
    item: Object,
    id: Number,
    pickedTopics: Array,
    enabled: Boolean
  },
  components: {},
  data: function() {
    return {
      expand: false,
      deleted: false,
      edit: false,
      modifiedQuestion: ""
    };
  },
  created() {},
  ready() {
    this.toDelete();
  },
  computed: {
    isEnabled: function() {
      return this.$parent.$parent.questions[this.id].enabled;
    }
  },
  methods: {
    deleteQuestion: function() {
      this.expanded = false;
      this.deleted = true;
      this.$parent.$parent.questions[this.id].enabled = false;
      //console.log(this.$parent.$parent.questions[this.id]);
      /*       this.$parent.$parent.questions.splice(id, 1);
       */
    },
    putBack: function() {
      this.deleted = false;
      this.expanded = false;
      this.$parent.$parent.questions[this.id].enabled = true;
      for (let category of this.item.categories) {
        if (!this.$parent.$parent.pickedTopics.includes(category))
          this.$parent.$parent.pickedTopics.push(category);
      }
      // console.log(this.$parent.$parent.questions[this.id]);
    },
    confirm: function() {
      this.item.modifiedQuestion = this.modifiedQuestion;
      this.edit = false;
    },
    restore: function() {
      delete this.item.modifiedQuestion;
      this.edit = false;
      this.modifiedQuestion = "";
    }
  }
};
</script>

<style scoped>
.blurred {
  -webkit-filter: blur(0.5px);
  -moz-filter: blur(0.5px);
  -o-filter: blur(0.5px);
  -ms-filter: blur(0.5px);
  filter: blur(0.5px);
}
.is-spaced {
  margin-right: 10%;
  margin-left: 10%;
}
.detail {
  background-color: hsl(0, 0%, 96%);
}
.blockquote-picked {
  border-left: 4px solid #42b983;
}
.blockquote-not {
  border-left: 4px solid red;
}
</style>

