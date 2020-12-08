<template>
  <div class="todo">
     <modal-window v-if="showModalAddTodo">
      <div slot="header">
       <div class="modal__header">
         <h2 class="title-sm modal__title">Create file</h2>
         <font-awesome-icon 
            icon="times" 
            @click="$modalState('showModalAddTodo', false, clearFields)" 
            class="modal__icon" />
       </div>
      </div>
      <div slot="body">
       <div class="modal__body">
         <div class="modal__input-container">
          <custom-input v-model="todoName" :custom-label="'Name of your file'" />
         </div>
       </div>
      </div>
      <div slot="footer">
       <div class="modal__footer">
         <button v-if="!isEdit" @click="saveTodo" class="modal__button">Save</button> 
         <button v-else @click="editTodo(todoId)" class="modal__button">Save</button> 
         <button @click="$modalState('showModalAddTodo', false, clearFields)" class="modal__button">Cancel</button> 
       </div>
      </div>
    </modal-window>    
    <!-- <div class="todo__header">
      <h2>{{spaceName}}</h2>
    </div>  -->
    <todo-item v-if="!!spaceId"
               :todo="$defaultTodo" 
               @show-modal="showModalAddTodo = true" 
               :default-value="true" />
     <template v-if="todoItems.length > 0">
        <todo-item v-for="item in todoItems"
                  @edit="tempTodo($event)" 
                  @click.native="currentTodo = item._id"
                  :current-item="currentTodo === item._id" 
                  :key="item.id" 
                  :todo="item" />
     </template>
     <template v-else>
        <todo-empty-state />   
     </template>
  </div>
</template>

<script>
import TodoItem from './TodoItem'
import TodoEmptyState from '@/components/emptyStates/TodoEmptyState'
import ModalWindow from "@/components/common/ModalWindow"
import logInfo from '@/utils/ErrorMessage'
import { createTodo, editTodo } from "@/api/todoLists"
export default {
  name: "Todo",
  components: { TodoItem, ModalWindow, TodoEmptyState },
  data() {
    return {
      showModalAddTodo: false,
      defaultTodo: null,
      isEdit: false,
      todoId: '',
      currentTodo: null,
      todoName: '',
      todoContent: '',
    }
  },
  computed: {
    todoItems() {
      return this.$store.getters.todoLists || []
    },
    spaceId() {
      return this.$store.getters.currentSpace?.id || ''
    },
    spaceDescription() {
      return this.$store.getters.currentSpace?.description || ''
    },
    spaceName() {
      return this.$store.getters.currentSpace?.name || ''
    },
  },
  methods: {
    tempTodo(todo) {
      this.isEdit = true;
      this.showModalAddTodo = true;
      this.todoId = todo._id
      this.todoName = todo.name
      this.todoContent = todo.content
    },
    editTodo(id) {
      editTodo(id, this.todoName, this.todoContent).then(response => {
         this.$modalState('showModalAddTodo', false, this.clearFields);
         this.isEdit = false;
         this.$store.dispatch("updateTodo", response.data)
         this.$store.dispatch('setTodoContent', response.data)
      }).catch(err => {
         logInfo(err)
      })
    },
    clearFields() {
      this.todoName = '';
    },
    saveTodo() {
      createTodo(this.spaceId , this.todoName).then(response => {
          this.$modalState('showModalAddTodo', false, this.clearFields);
          this.$store.dispatch('addTodoList', response.data)
     }).catch(err => {
        logInfo(err)
     })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/global/variables.scss";
@import "~@/styles/global/mixins.scss";

.todo {
  display: block;
  grid-auto-columns: 1fr;
  position: relative;
  width:100%;
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
  background: rgb(231, 231, 243);

 &__header{
   margin-bottom: 40px;
   width: 100%;
 }

 &__title {
   margin: 20px 0;
   text-align: center;
   padding:5%;
   font-size: 12px;
   text-align: left;
   line-height: 1.3;
   text-transform: lowercase;
   color: darken($color-gray, 20%);
 }
}

.modal {
  &__header, &__body, &__footer {
    box-sizing: border-box;
    padding: 2% 5%; 
  }


  &__header {
    width: 100%;
    height: auto;
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;  
  }
  
  &__title {
    text-transform: uppercase;
    margin-left: 10px; 
  }

  &__icon {
    color:  #666666;
    font-size: 1.2em;
    cursor: pointer; 
  }

  &__footer {
    margin-top: 20px;
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
  }

  &__button {
    @include button(transparent, $color-main , md, $color-main);
    border-radius: 0;
    font-size: 1em;
    font-weight: 400;
    transition: 0.3 s linear;
    width: 120px;
    margin-left: 10px;

    &:hover {
      background: $color-main;
      color: white;
      border-color: transparent;
    }
  }

  &__input-container {
    max-width: 600px;
  }
}
</style>