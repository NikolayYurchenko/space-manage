<template>
    <div class="dropdown">
        <div class="dropdown__layout" @click.prevent="showListOverlay = !showListOverlay">
            <span class="dropdown__circle"></span>
            <span class="dropdown__circle"></span>
            <span class="dropdown__circle"></span>
        </div>
        <div v-if="showListOverlay" class="dropdown__list-overlay" v-on-clickaway="hideListOverlay">
            <ul class="dropdown__list">
                <li v-for="item in items" 
                :key="item.value" 
                class="dropdown__list-item" 
                @click.prevent="startItemAction(item.callback)">{{item.value}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
import { mixin as clickaway } from 'vue-clickaway';
export default {
    name: "Dropdown",
    mixins: [clickaway],
    props: {
        items: {
            required: true,
            type:Array
        }
    },
    data() {
        return {
          showListOverlay: false
        }
    },
    methods: {
        startItemAction(callback) {
          this.showListOverlay = false;
          callback();  
        },
        hideListOverlay() {
            this.showListOverlay = false
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/global/variables.scss";
@import "~@/styles/global/mixins.scss";    

.dropdown {
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  &__circle {
    display: block;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    border: 1px solid darken($color-gray, 20%);

    &:not(:first-child) {
      margin-top: 3px;    
    }    
  } 

  &__layout {
    width: 35px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }  

  &__list-overlay {
    border-radius: 4px;
    width: 100px;
    height: auto;
    background:white;
    box-shadow: 2px 2px 15px 2px rgba(0,0,0,0.3);
    padding: 1em;
    z-index: 101;
    right: 0%;
    position: absolute;
    top: 50%;

    &::after{
      content: '';
      position: absolute;
      background: white;
      top: -5px;
      left : 70%;
      width: 15px;
      transform: rotate(45deg);
      height: 15px;
      display: block;    
    }
  }

  &__list {
    list-style: none;
    width: 100%;    
  }

  &__list-item {
    font-size: 1.2rem;
    font-family: $font-main;
    margin: 10% auto;
    transition: all 0.3s ease-in-out;

    &:hover {
      color: $color-main;  
    }    

    &:last-child {
      color: $red;  
    }
  }
}

</style>