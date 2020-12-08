<template>
  <div class="input-container" :class="description && 'input-container--description'">  
   <input :id="'input'+customLabel" 
          v-bind="$attrs"
          v-bind:value="value"
          v-on:input="$emit('input', $event.target.value)"
          class="input-container__input" 
          type="text" 
          required /> 
   <label class="input-container__label" 
          :for="'input'+customLabel">{{customLabel}}</label> 
  </div>   
</template>
<script>
export default {
    name:"ModalWindow",
    props: {
        customLabel: {
            required: true,
            type: String
        },
        value: {
          required: true,
          type: String
        },
        description: {
            required: false,
            type: Boolean,
            default() {
                return false
            }
        }
    },
    data() {
      return {
          isFocused: false,
      }    
    }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/global/variables.scss";
@import "~@/styles/global/mixins.scss";

  .input-container{
    width: 100%;
    height: 45px;
    margin: 30px auto;
    position: relative;

   &--description {
     height: 70px;
   }
    
    &__label{
      padding: 1%;  
      position: absolute;
      top: 10px;
      left: 10px;
      height: auto;
      font-size: 1em;
      font-family: $font-main;
      transition: all 0.3s ease-in-out;
      color: #333333;  

      &--focused {
        top: 0;    
      }
    }

    &__input {
      width: 100%;
      box-sizing: border-box;
      font-size: 1.2em;
      font-family: $font-main;
      padding: 1% 3%;
      border: none;
      border-bottom: 1px solid $color-gray;
      height: 100%;
      outline: none;
      background: transparent;

      &:focus {
       border-color: $color-blue;    
      }
    }
  }

 .input-container .input-container__input:focus + .input-container__label,
 .input-container .input-container__input:valid + .input-container__label {
    top: - 25px;
    font-size: 0.9em;
    color: $color-blue;
 }
</style>