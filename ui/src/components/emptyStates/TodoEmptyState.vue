<template>
    <div class="empty-container">
        <font-awesome-icon icon="folder-open" class="empty-container__icon" />
        <p class="empty-container__text">Choose space with files or create your first file in this space</p>
         
        <div class="empty-container__example-wrapper">
          <h2 class="empty-container__example-title">
            For example you can create files like this
          </h2>
        </div> 
        <ul class="empty-container__example-list">
          <li class="empty-container__example-item"> - Home work biology</li>
          <li class="empty-container__example-item"> - List of products</li>
          <li class="empty-container__example-item"> - Important notates</li>
        </ul>
    </div>
</template>
<script>
export default {
    name: "TodoEmptyState"
}
</script>
<style lang="scss" scoped>
   @import "~@/styles/global/variables.scss";
   @import "~@/styles/global/mixins.scss";

  .empty-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    &__icon {
      font-size: 50px;
      margin-top: 20%;
      color: $color-main;    
    }

    &__text {
      font-family: $font-main;
      color: $color-main;
      text-align: center;
      width: 70%;
      font-size: 1.2rem;   
      line-height: 1.1; 
    } 

    &__example-wrapper {
      margin-top: 5%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap; 
    }      

    &__example-title {
      margin: 5% 0 5% 1%;
      width: 75%;
      font-size: 1.3rem;
      color: $color-main;
      text-align: center;
      font-weight: 500;
      font-family: $font-main;
    }

    &__example-list {
      list-style: none;
      width: 100%;
      box-sizing: border-box;
      padding: 2% 10%;  
    }

    &__example-item {
      margin-bottom: 2%;
      font-size: 1.2rem;
      text-align: center;
      color: $color-main;
      font-family: $font-main;    
    }
  }  
</style>