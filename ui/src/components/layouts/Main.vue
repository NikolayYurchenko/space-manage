<template>
  <main class="main">
    <sidebar />
    <todo />
    <editable-content />
  </main>
</template>

<script>
import Sidebar from "@/components/sidebar/Sidebar"
import Todo from "@/components/todo/Todo"
import EditableContent from '@/components/todoContent/EditableContent'

export default {
  name: "Main",
  components: { Sidebar, Todo, EditableContent },
  computed: {
    currentTodo() {
      return !!this.$store.getters.todoContent
    },
  },
  mounted () {
  },
}
</script>

<style lang="scss" scoped>
@import "~@/styles/global/variables.scss";
@import "~@/styles/global/layout.scss";

.main {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 1.2fr 1fr 5fr;
  align-items: stretch;
  background: rgb(231, 231, 243);
}
</style>