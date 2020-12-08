<template>
   <div class="wrapper"> 
        <div class="user-settings">
            <div class="user-settings__header">
                <div class="user-settings__edit-bar">
                    <h2 class="title-sm user-settings__title">Settings</h2>
                     <p>
                      <span class="user-settings__text">edit</span>
                      <span class="user-settings__text" @click="$emit('close')">close</span>   
                     </p>
                </div>
                <img :src="avatar" alt="" class="user-settings__image">
                <div class="user-settings__user-info">
                  <p class="user-settings__username">{{username}}</p>
                  <p class="user-settings__user-state">Online</p>
                </div>
            </div>   
            <div class="user-settings__font">
              <select-custom label="Select main font" :items="$fonts" />
            </div>
        </div>
   </div>
</template>
<script>
import Select from '@/components/common/Select'
export default {
    name: "UserSettings",
    components: {
      "select-custom": Select 
    },
    data() {
      return {
        user: null
      }
    },
    created() {
      this.user = {... JSON.parse(localStorage.getItem("user")) }
    },
    computed: {
       avatar() {
           return this.user.path
       },
       username() {
           return this.user.username
       }
    },
}
</script>
<style lang="scss" scoped>
@import "~@/styles/global/variables.scss";
@import "~@/styles/global/mixins.scss";

.wrapper {
   position: fixed;
   width: 100%;
   height: 100%;
   top: 0;
   bottom: 0;
   left: 0;
   display: flex;
   justify-content: center;
   z-index: 10;
   align-items: center;
   background: rgba(0,0,0,0.5); 
}
.user-settings {
  width: 20%;
  border-radius: 3px;
  height: auto;
  margin: auto;
  display: flex;
  justify-content: center;
  background: darken(white, 10%);
  align-items: center;
  flex-wrap: wrap;

    &__header {
      width: 100%;
      height: 150px;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      align-items: center;
      background: $color-main;
      padding: 5px;
    }

    &__edit-bar {
      width: 100%;
      padding: 5px;
      margin-bottom: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;  
    }

    &__title {
      color: white;
      margin-left: 1em;
      font-family: $font-main;
      font-size: 1.4em;  
    }

    &__text {
      margin-left: 1em;
      font-size: 1.4em;
      padding: 0 5px;
      color: white;    
    }

    &__user-info {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;    
    }

    &__image {
      width: 70px;
      height: 70px;
      margin-left: 1.5em;
      border-radius: 50%;
      object-fit: cover;
    }

    &__username {
      font-size: 2em;
      margin-left: 15px;
      color: white;
      font-family: monospace;
    }

    &__user-state {
      @extend .user-settings__username;
      font-size: 1.2em;
      margin-top: 5px;
    }

    &__font {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;  
    }
}
    
</style>