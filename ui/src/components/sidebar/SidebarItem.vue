<template>
  <div class="sidebar-item" 
      :class="currentItem && 'sidebar-item--current-item'"
      @click="findTodoListsBySpace(space.id)">  
    <img class="sidebar-item__img" :src="space.coverPath" />
    <div class="sidebar-item__info">
       <p class="sidebar-item__name">{{space.name | truncate(20)}}</p>
    </div>
    <div class="sidebar-item__dropdown">
      <dropdown :items="actions" />
    </div>
  </div>
</template>

<script>
import Dropdown from '@/components/common/Dropdown'
export default {
  name: 'SidebarItem',
  components: { Dropdown },
  props: {
    space: {
      type: Object,
      required: true,
    },
    currentItem: {
      required: false,
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      actions: [
        { value: "edit", callback: this.editSpace },
        { value: "delete", callback: this.deleteSpace }
      ]
    }
  },
  computed: {
    currentSpace() {
      return this.$store.getters?.currentSpace
    }
  },
  methods: {
    deleteSpace() {
      this.$emit('delete-space', this.space?.id)
    },
    editSpace() {
      this.$emit('edit-space', this.space)  
    },
    findTodoListsBySpace(id) {
       if (this.currentSpace?.id !== id) {
        this.$store.dispatch('setTodoContent', null)
      }
      this.$store.dispatch('setCurrentSpace', this.space);
      this.$store.dispatch('getTodoLists', id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/global/variables.scss";

.sidebar-item {
  display: flex;
  padding: .8rem 1rem .8rem 1.5rem;
  align-items: center;
  outline: none;
  user-select: none;
  cursor: pointer;
  position: relative;
  border-right: 3px solid transparent;
  transition: all .3s ease-in-out;

  &--current-item {
    transition: all .3s ease-in-out;  
    border-color: $color-main;  
  }

  &:hover {
    transition: all .3s ease-in-out;  
    background: $color-gray;
  }

  &__info {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }

  &__img {
    width: 4em;
    height: 4em;
    object-fit: cover;
    border-radius: 50%;
  }

  &__name {
    margin-left: 1rem;
    text-transform: uppercase;
    font: 1rem $font-main;
    color: #000;
    font-weight: 400;
    transition: all .3s ease-in-out;
  }

  &__description {
    font-size: 13px;
    margin-left: 1rem;
    margin-top: 5px;
    color: #464646;
    transition: all .3s ease-in-out;
  }

  &__dropdown {
   position: absolute;
   right: 5%;  
  }
}
</style>