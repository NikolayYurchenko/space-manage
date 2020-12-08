<template>
  <div class="editable-container" v-if="!!todo">
      <div class="editable-container__header">
          <h2 class="title-large editable-container__title">{{todoName}}</h2>
          <button @click="editTodo" class="editable-container__button">Save</button>
      </div>
        <text-editor 
        v-model="content"/> 
  </div>
  <editable-content-empty-state v-else />
</template>

<script>
import TextEditor from '@/components/common/TextEditor'
import EditableContentEmptyState from '@/components/emptyStates/EditableContentEmptyState'
import { editTodo } from '@/api/todoLists'
export default {
  name: "EditableContent",
  components: { TextEditor, EditableContentEmptyState },
  data() {
      return {
          content: this.todoContent || "",
      }
  },
  watch: {
    todoContent(val) {
      this.content = val
    }
  },
  computed: {
      space() {
        return this.$store.getters?.currentSpace
      },
      todo() {
          return this.$store.getters?.todoContent 
      },
      todoContent: {
           get(){
             return this.$store.getters.todoContent?.content
           },
           set(newVal){
             this.content = newVal
           } 
      },
      todoName() {
          return this.$store.getters.todoContent?.name
      }
  },
  methods: {
    editTodo() {
      editTodo(this.todo._id, this.todo.name, this.content)
        .then(() => {
           this.$message({
             type:'success',
             message:'Success save',
             showClose: true,
           })
           this.$store.dispatch('getTodoLists', this.space.id)
        })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/global/variables.scss";
@import "~@/styles/global/mixins.scss";

/deep/ .btn-toggle {
  visibility: hidden;
}

.editable-container {
    width:100%;
    height: 100%;
    padding: 0 2%;
    box-sizing: border-box;
    position: relative;

    &__toolbar {
      width:100%;
      height: 50px;       
    }

    &__header {
      width:100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      margin: 40px auto;
      height: auto;
    }

    &__title {
      color: $dark-light;
      opacity: 0.7;
      font-weight: 300;
      font-size: 5rem;
    }

    &__button {
      @include button(transparent, $color-main, sm, $color-main); 
      border-radius: 0;
      margin-left: 3em;
      font-size: calc(1vw - 0.1rem);
      padding: 1em 2em;
      transition: all 0.3s linear;
  
      &:hover {
        background: $color-main;
        color: white;
      }
    }

    &__text {
      width: 90%;
      height: 100%;
      font-size: 20px;
      margin: auto;
      font-family: $font-main;
      color: $dark-light;
      border: none;
      outline: 0;
      background:  transparent;
      line-height: 1.4;
      word-break: break-word;
      text-align: left;
      max-height: 500px;
      resize: none;

      &::placeholder {
        color: rgb(185, 180, 180);
        font-style: normal;
      }
    }
}
</style>