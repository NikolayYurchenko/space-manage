<template>
    <div class="skeleton-sidebar-item">
    <img class="skeleton-sidebar-item__img" :src="defaltImage" />
    <div class="skeleton-sidebar-item__info">
       <p class="skeleton-sidebar-item__name"></p>
       <p class="skeleton-sidebar-item__description"></p>
    </div>
    </div>
</template>
<script>
export default {
    name: "SkeletonSidebarItem",
    computed: {
        defaltImage() {
            return require("../../assets/images/default.png")
        }
    }
}
</script>
<style lang="scss" scoped>
 @import "~@/styles/global/variables.scss";

 .skeleton-sidebar-item {
  display: flex;
  padding: .8rem 1rem .8rem 1.5rem;
  align-items: center;
  outline: none;
  user-select: none;
  cursor: pointer;
  position: relative;
  border-right: 3px solid transparent;
  transition: all .3s ease-in-out;
  
  &__info {
    display: flex;
    width: 180px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }

  &__img {
    border: 1px solid $color-gray;
    width: 65px;
    height: 65px;
    border-radius: 50%;
  }

  &__name {
    margin-left: 1rem;
    animation: shine 3s linear infinite;
    text-transform: uppercase;
    background: $color-gray;
    width:100%;
    height: 14px;
  }

  &__description {
    animation: shine 3s linear infinite;
    margin-left: 1rem;
    margin-top: 5px;
    background: $color-gray;
    width: 100px;
    height: 11px;
  }
}   

@keyframes shine {
   20% {
    opacity: 0.35;
  }
   30% {
    opacity: 0.35;
  }
   40% {
    opacity: 0.4;
  }
   50% {
    opacity: 0.5;
  }
   60% {
    opacity: 0.6;
  }
   70% {
    opacity: 0.7;
  }
   80% {
    opacity: 0.8;
  }
   90% {
    opacity: 0.9;
  }
  100% {
    opacity: 1;
  }
}
</style>