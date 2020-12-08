import Vue from 'vue'
import MediumEditor from 'vuejs-medium-editor'

//css libs
import 'medium-editor/dist/css/medium-editor.css'
import 'vuejs-medium-editor/src/themes/default.css'
import 'tui-editor/dist/tui-editor.css';
import 'tui-editor/dist/tui-editor-contents.css';
import 'codemirror/lib/codemirror.css';

const editorOptions = {
    hasContent: true,
    uploadUrl: "http://localhost:3000/api/v1/upload/image",
    placeholder: { 
        text:'Any usefull things' 
    },
    toolbar: {
        buttons: ["bold", "italic", "underline", "quote", "h1", "h2", "h3", "h4", "h5", 'unorderedlist','Calibry']
    }
}


Vue.prototype.$editorOptions = editorOptions 
Vue.component('editor', MediumEditor)