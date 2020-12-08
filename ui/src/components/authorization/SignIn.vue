<template>
<div class="sign-in-container">
    <form class="sign-in-container__form">
      <div class="sign-in-container__header">
        <h2 class="title-lg sign-in-container__title">Sign in or register</h2>
        <p class="sign-in-container__hint">Quick sign in with Google</p>  
        <button 
          type="button"
          class="sign-in-container__button sign-in-container__button--google"
          @click.prevent="googleAuth">
             <img class="sign-in-container__button-icon" src="@/assets/images/google-brand.png" />
            Sign in with google
        </button>  
      </div>
      <div class="sign-in-container__content">
        <div class="sign-in-container__auth-type">
          <button 
          v-for="authType in authTypes"
          class="sign-in-container__auth-type-button"
          :class="authType === currentAuthType && 'sign-in-container__auth-type-button--active'"
          :key="authType"
          type="button"
          @click.prevent="currentAuthType = authType">
          {{authType}}
          </button>
        </div>
        <input id="username" v-model="username" type="text" placeholder="name" class="sign-in-container__input">
        <p v-if="username && !isNameValid" class="sign-in-container__error">Name must be longer</p>  
        <input id="password" v-model="password" type="password" placeholder="password" class="sign-in-container__input">
        <p v-if="password && !isPasswordValid" class="sign-in-container__error">Password must be longer</p>
        <button 
        class="sign-in-container__button"
        @click.prevent="defineAction"
        :disabled="!isFormValid">
           {{currentAuthType}}
         </button> 
    </div>
   </form>
 </div>
</template>

<script>
import logError from '@/utils/ErrorMessage'
// import { localLogin, loginGoogle, register }  from '@/api/user'
export default {
  name: "Auth",
   data() {
    return {
      authData:null,
      username: '',
      password:'',
      user:null,
      authTypes: ['sign in', 'register'] ,
      currentAuthType: 'sign in',
    }
  },
  computed: {
    isNameValid () {
      return this.username.length > 3
    }, 
    isPasswordValid () {
      return this.password.length > 3
    },
    isFormValid () {
     return this.isNameValid && this.isPasswordValid
    },
  },
  methods: {
  setUser(user) {
    this.$store.dispatch("setUser", user)
  } , 
  defineAction() {
    this.$store.dispatch("clearStore")
    this.currentAuthType === 'sign in' ? this.loginLocal() : this.register()
  },  
  async loginLocal () {
    const {localLogin} = await import("@/api/user");
    localLogin(this.username.trim(), this.password.trim()) 
      .then (response =>  {
        (response.data && response.status === 200) && 
          this.setUser(response.data)
          this.$router.push('/') 
      })
      .catch (err => {
          logError(`login failed cause - [${err.message}]`) 
      })
  },
  async register() {
    const {register} = await import("@/api/user")   
    register(this.username.trim(), this.password.trim()) 
      .then (response =>  {
        if (response.data && response.status === 200) {
            this.setUser(response.data) 
            this.$router.push('/') 
        } 
      }).catch (err => {
          logError(`register failed cause - [${err.message}]`) 
      })
  },
  async loginGoogle(id, accessToken) {
    this.$store.dispatch("clearStore")
    const {loginGoogle} = await import("@/api/user");
    loginGoogle(id,accessToken).then(response =>  {
       this.user = response.data;
       this.user && this.setUser(response.data)
       this.$router.push("/")
   }) .catch(err => {
          logError(`login failed cause - [${err} - ${err.message}]`)
      }) 
  },

    googleAuth() {
     let that = this;
     that.$gAuth
         .signIn()
         .then(auth => {
           that.authData = auth.getAuthResponse();
           this.loginGoogle(that.authData.id_token, that.authData.access_token)
         }).catch(err => {
           logError(`google auth failed cause - [${err.message}]`)
         })  
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/global/variables.scss";
@import "~@/styles/global/mixins.scss";

.sign-in-container {
  width:100%;
  height:100vh;
  display:flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  box-shadow: 5px 5px 5px rgba(126,134,148,0.3);
  background:url('../../assets/images/sign-in-bg.jpg');
  background-size: cover;

  &:after {
    content:'';
    position: absolute;
    width:100%;
    height: 100%;
    display: block;
    background: $color-blue;
    opacity: 0.5;
    top:0;
    left:0;
  }

  &__form {
    width:50%;
    max-width: 1000px;
    min-width: 350px;
    z-index:99;
    height:85%;
    max-height: 750px;
    padding:2%;
    box-shadow: 1px 2px 20px rgba(0,0,0,0.3);
    background: rgba(72, 61, 139,.95);
  }

  &__header {
    width:100%;
    height:auto;
  }

  &__title {
    width:100%;
    text-align: center;
    color: $color-gray;
  }

  &__hint {
    color: $color-gray;
    text-align: center;
    margin: 10px auto;
    font-size: 1.3em;
  }

  &__content {
    width: 60%;
    margin: 5% auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
  }

  &__auth-type {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom:5%;
  }

  &__auth-type-button {
    width: 50%;
    height: 40px;
    border: none;
    background: transparent;
    color: white;
    font-family: $font-main;
    font-size: 1.6rem;
    outline: none;
    position: relative;
    transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    cursor: pointer;
    
    &--active {
      background: $color-yellow	;
    }
  }

  &__input {
    width:100%;
    min-width:150px;
    text-align: left;
    font-size: 1.6rem;
    color: $color-gray;
    outline:none;
    height:50px;
    padding:5%;
    box-sizing: border-box;
    border:none;
    background: transparent;
    border-bottom:1px solid rgb(77, 128, 218);
    margin-bottom:30px;

    &:focus {
      border-color: white;
    }

    &::placeholder {
      color: $color-gray;
    }
  }

  &__error {
    color: $red;
    width:100%;
    text-align: left;
    font-size: 13px;
    margin-bottom: 15px;
  }

  &__button {
    width:50%;
    max-width: 220px;
    height:50px;
    border-radius:30px;
    outline:none;
    border:none;
    background:rgb(77, 128, 218);
    margin:1%;
    color:white;
    position: relative;
    font-size: 1.5rem;
    font-family: $font-main;
    transition: all 0.5s ease-in-out;
    cursor: pointer;

    &:disabled {
      background: $disabled;
    }

    &:hover {
     box-shadow: 3px 3px 15px rgba(0,0,0,0.3);
    }

    &--google {
      width: 40%;
      display:block;
      max-width: unset;
      margin:30px auto;
      color: $dark-light;
      background: rgba(255,255,255,0.75);
      border-radius:5px;
      height: 55px;
    }
  }
  
  &__button-icon {
    padding:0 5px;
    vertical-align: middle;
    width:20px;
    height:20px;
  }

  &__register-link {
    color: $color-gray;
    text-decoration: underline;
  }
}
</style>