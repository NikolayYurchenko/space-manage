import vue from 'vue'

// default todo - add new
const defaultTodo = { 
    name: "add new file",
    content: ""
}

// available fonts for set as default
const fonts = [
    "Roboto",
    "Some font 2"
]

// truncate text
const filter = (text, length, clamp) => {
    clamp = clamp || '...';
    return text.length > length ? text.slice(0, length) + clamp : text;
};

const successMessage = (msg) => 
    vue.prototype.$message({
        showClose: true,
        message: msg,
        type: 'success'
    });

const errorMessage = (msg) => 
    vue.prototype.$message({
        showClose: true,
        message: msg,
        type: 'error'
    });    

vue.filter('truncate', filter);

vue.prototype.$defaultTodo = defaultTodo
vue.prototype.$fonts = fonts
vue.prototype.$successMessage = successMessage
vue.prototype.$errorMessage = errorMessage