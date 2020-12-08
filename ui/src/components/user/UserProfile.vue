<template>
  <main class="user-profile">
        <user-settings @close="showUserSettings = false" v-if="showUserSettings"/> 
        <img class="user-profile__avatar" :src="path" alt="avatar"
         @click="showUserDetails = !showUserDetails">
        <div v-if="showUserDetails" 
          class="user-profile__details-overlay"
          v-on-clickaway="closeOverlay">
          <ul class="user-profile__list">
            <li class="user-profile__list-item user-profile__name">
              {{userName}}
            </li>
            <li class="user-profile__list-item"
              @click="(showUserSettings = true) && (showUserDetails = false)">
              Settings
             </li>
            <li class="user-profile__list-item" @click="destroySession">Log out</li>
          </ul>
        </div> 
  </main> 
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';
import UserSettings from '@/components/user/UserSettings'
export default {
  name: "UserProfile",
  mixins: [clickaway],
  components: { UserSettings },
  props:['userName', 'path'],
  data() {
    return {
      showUserDetails: false,
      showUserSettings: false,
    }
  },
  methods: {
    closeOverlay() {
      this.showUserDetails = false
    },
    destroySession() {
      this.$store.dispatch('clearStore')
      this.$router.push('/login')
    },
  }
};
</script>
<style lang="scss" scoped>
@import "~@/styles/global/variables.scss";
@import "~@/styles/global/mixins.scss";

.user-profile {
  width: 3em;
  display: flex;
  position: relative;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  height: 3em;

  &__avatar {
    width:100%;
    height:100%;
    object-fit: cover;
    display:block;
    margin: auto;
    border-radius:50%;
    border:2px solid #dcdcdc;
    padding:2%;
  }

  &__details-overlay {
    width: 250px;
    box-sizing: border-box;
    padding: 10px;
    height: auto;
    margin-top: 10px;
    position: absolute;
    top: 100%;
    right: -50%;
    background: white;
    box-shadow: 2px 2px 15px 2px rgba(0,0,0,0.3);
    border-radius: 4px;

    :after{
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
    height: 100%;
    padding: 10px 0;
  }

  &__list-item {
    font-size: 1.5rem;
    position: relative;
    padding: 10px 15px;
    color: #666666;
    font-family: $font-second;
    cursor: pointer;
    transition: all 0.3s linear;
    border-bottom: 1px solid transparent;

    &:not(:first-child) {
      &:hover {
        color: $color-main;
      }
    }
  }

  &__name {
    font-size: 2rem;
    word-break: break-word;
    border-bottom: 1px solid $color-gray;
    margin-bottom: 10px;
    font-weight: 500;
    text-align: left;
  }
}
</style>