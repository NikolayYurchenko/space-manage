<template>
  <div v-if="!defaultValue" 
       class="todo-item"
       :class="currentItem && 'todo-item--active'"
       @click.prevent="setTodoContent(todo)">
   <div class="todo-item__edit-bar">
    <font-awesome-icon @click="deleteTodo" class="todo-item__icon" icon="times" />
    <font-awesome-icon @click="editTodo" class="todo-item__icon" icon="edit" />
   </div>
   <p class="todo-item__name">{{todo.name | truncate(13, '...') }}</p>
  </div> 
  <div v-else @click="$emit('show-modal')" class="todo-item todo-item--default">
    <font-awesome-icon class="todo-item__default-icon" icon="plus-circle" />
    <p class="todo-item__name todo-item__name--default">{{todo.name}}</p>
  </div>
</template>

<script>
import { deleteTodo } from "@/api/todoLists"
import logInfo from "@/utils/ErrorMessage"
export default {
  name: "TodoItem",
  props: {
     todo: {
        type: Object,
        required: true 
     },
     currentItem: {
       required: false,
       type: Boolean,
       default() {
         return false
       },
     },
     defaultValue: {
       required: false,
       type: Boolean,
       default() {
         return false
       },
     },
  },
  data() {
    return { 
      showModalAddTodo: false,
    }
  },
  methods: {
    editTodo() {
      this.$emit("edit", this.todo)
    },
    setTodoContent(todo) {
      this.$store.dispatch('setTodoContent', todo)
    },
    deleteTodo() {
      deleteTodo(this.todo._id).then(response =>  {
        response.status === 200 && this.$store.dispatch('deleteTodoList', this.todo._id)
        this.$message({
          showClose: true,
          message: 'Success delete',
          type: 'success'
        });
        this.$store.dispatch("setTodoContent", null)
      }).catch(err => {
          logInfo(err)
          this.$message({
            showClose: true,
            message: 'Something went wrong',
            type: 'error'
          });
      })
    },
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/global/variables.scss";
@import "~@/styles/global/mixins.scss";

.todo-item {
  margin: 3% auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
  max-width: 300px;
  height: 50px;
  border-radius: 5px;
  border: 2px solid transparent;
  box-sizing: border-box;
  background: white;
  position: relative;
  padding: 3%;
  cursor: pointer;
  position: relative;

  &--active {
    border-color:rgba(144, 109, 244, 0.5);
    transition: all 0.3s linear;
  }


  &__edit-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;  
  }

  &__icon {
    width: 1.1em;
    height: 1.1em;
    display: inline-block;
    vertical-align: middle;
    color:#666666;  
    margin: 1px 0 0 10px;
  }

  &--default {
    margin-top: 40px;
    opacity: 0.8;
    background: $color-main;
  }

  &:hover {
    box-shadow: 1px 1px 10px rgba(144, 109, 244, 0.5);
    transition: all 0.3s linear;
  }

  &__default-icon {
    width: 1.1em;
    height: 1.1em;
    margin-left: 10px;
    color: white;
  }

  &__name {
      margin-left: 1rem;
      font-size: 1.2rem;
      margin-left: 15px;
      text-align: left;
      font-family: $font-main;
      color: #666666;
      font-weight: 300;

      &--default {
        color: white;
      }
  }
}
</style>