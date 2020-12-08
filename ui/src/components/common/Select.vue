<template>
    <div class="wrapper-select">
       <h2 for="select" class="wrapper-select__title">{{label}}</h2>
       <select class="wrapper-select__select" id="select" required>
          <option v-for="(item, index) in items" :key="item" :value="item" :selected="index === 0">{{item}}</option>  
       </select>   
    </div>
</template>
<script>
export default {
    name: "Select",
    props: {
        label:{
            type: String,
            required: true
        },
        items: {
            type: Array,
            required: true
        }
    }
}
</script>
<style lang="scss" scoped>
 @import "~@/styles/global/variables.scss";
 @import "~@/styles/global/mixins.scss"; 

 .wrapper-select {
   width: 100%;
   display: flex;
   position: relative;
   justify-content: flex-start;
   align-items: flex-start; 

   &::after {
     content: '';
     position: absolute;
     bottom: 20px;
     right: 5%;
     display: block;
     width: 7px;
     height: 7px;
     border-right: 1px solid $dark-light;
     border-top: 1px solid $dark-light;
     transform: rotate(135deg); 
   }

  &__select {
   width: 100%;
   height: 50%;
   margin-top: 45px;
   font-size: 1.3em;
   font-family: $font-main;
   padding: 2% 5% 2% 20px;
   box-sizing: border-box;
   border:none;
   outline: none;
   color: $dark-light;
   background: transparent;
   appearance: none;
 }

 &__title {
   padding: 1% 1% 1% 20px;  
   margin-top: 2%;
   font-weight: 300;
   box-sizing: border-box;
   position: absolute;
   width: 100%; 
   height: auto;
   font-size: 1.4em;
   font-family: $font-main;
   transition: all 0.3s ease-in-out;
   color: $color-main;      
 }
}  
</style>