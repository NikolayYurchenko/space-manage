<template>
  <div class="wrapper">
    <editor class="wrapper__editor"
          height="80%"  
          mode="wysiwyg" 
          v-bind="$attrs"
          v-bind:value="value"
          v-on:input="$emit('input', $event)" />
  </div>
</template>
<script>
import { Editor } from '@toast-ui/vue-editor'
export default {
    name:"TextEditor",
    components: { Editor },
    props: {
       content: {
           type: String,
           required: false,
       },
        value: {
          required: true,
          type: String
        },
    },
    data() {
        return {
            text: '',
            html: '',
        }
    },
     mounted() {
       this.initContent() 
    },
    methods: {
        initContent() {
            this.text = this.content ? this.content : ""
        }
    }
}
</script>
<style lang="scss" scoped>
  @import "~@/styles/global/variables.scss";
  @import "~@/styles/global/mixins.scss";
 .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    
    &__editor {
       width: 100%; 
       /deep/ div {
           border: none;
           background-color: transparent!important;
       }   

        /deep/ button {
          border: none!important;
          background-color: transparent!important;
       }   

       /deep/ .CodeMirror { background: transparent; } 
       /deep/ .te-markdown-tab-section {
            background-color: white!important;
            padding-right: 20px;
        }

        /deep/ .tui-popup-body {
           background: white!important; 

           button {
             background: white;
             color: $color-main;   
           }
        }

        /deep/ .tui-editor-contents {
          h1,h2,h3,h4,h5,p,span,table,div,ul,li,pre {
            font-family: $font-content!important;
            font-size: calc(1vw - 0.1rem);
            line-height: 1.7!important;
          }
        }

        /deep/ .tui-editor-defaultUI-toolbar {
                 padding-left: 0!important;
               } 
       /deep/  .tui-editor-contents {
                 padding-left: 0!important;
               }         
    }
 }
 
</style>