<template>
   <div class="modal-wrapper">
       <div class="modal-mask">
           <div class="modal-container" v-on-clickaway="closeModal">
               <slot class="modal-container__header" name="header"></slot>
               <slot class="modal-container__body" name="body"></slot>
               <slot class="modal-container__footer" name="footer"></slot>
           </div>
       </div>
   </div> 
</template>
<script>
import { mixin as clickaway } from 'vue-clickaway';
export default {
    name:"ModalWindow",
    mixins: [clickaway],
    methods: {
        closeModal() {
            this.$emit('close')
        }
    }
}
</script>
<style lang="scss" scoped>

 .modal-wrapper {
   width: 100%;
   height: 100%;
   position: fixed;
   left: 0;
   top: 0;
   background: rgba(0,0,0,0.6);
   z-index: 101;    
   display: flex;
   align-items: center;
   justify-content: center;
 }
   
   
 .modal-mask {
   width: 100%;
   max-height: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
   flex-wrap: wrap;      
 }

 
 .modal-container {
   width: 600px;
   height: auto;
   display: block;
   border-radius: 5px;
   background: white; 
 }

 
</style>