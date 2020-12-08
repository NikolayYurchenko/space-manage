<template>
    <div class="empty-container">
        <font-awesome-icon icon="newspaper" class="empty-container__icon" />
        <p class="empty-container__text">Choose or create your file to show content. You can add images, text, tables, lists to your files, also you can format text</p>
    </div>
</template>
<script>
export default {
    name: "EditableContentEmptyState"
}
</script>
<style lang="scss" scoped>
   @import "~@/styles/global/variables.scss";
   @import "~@/styles/global/mixins.scss";

   .empty-container {
     width: 100%;
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;

     &__icon {
       font-size: 150px;
       color: $color-main;    
     }

     &__text {
       font-family: $font-main;
       color: $color-main;
       text-align: center;
       width: 50%;
       font-size: 1.5rem;    
     }       
   } 
</style>