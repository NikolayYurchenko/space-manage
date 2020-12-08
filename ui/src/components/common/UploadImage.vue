<template>
    <div class="upload-image"
        :class="{'upload-image--dragover': isDragOver,
                 'upload-image--circle-mode': modes.includes(mode) && (mode === 'circle')}"
        @dragover="isDragOver = true"
        @dragleave="isDragOver = false"
        @drop="onImageDrop($event)">
        <div v-if="!path && mode !== 'circle'" class="upload-image__content"> 
            <font-awesome-icon icon="cloud-upload-alt"
            class="upload-image__icon" />
            <label for="uploadImage" class="upload-image__text">Select or drop your image</label>
            <input  class="upload-image__input"
                    @change="selectFile($event.target.files[0])"
                    type="file" 
                    accept="image/png, image/jpeg" />
            <span v-if="errorMessage" class="upload-image__error">{{errorMessage}}</span>        
        </div>
        <div v-else class="upload-image__image-view">
           <img class="upload-image__image"  :src="path" alt="SPACE IMAGE">
           <div class="upload-image__edit-bar">
             <button class="upload-image__clear-button" @click.prevent="clearImage">
                 <font-awesome-icon icon="trash-alt"
                 class="upload-image__icon upload-image__icon--trash" />
                 clear
             </button>
              <button v-if="!isImageUploaded" class="upload-image__clear-button" @click.prevent="saveImage">
                 <font-awesome-icon icon="cloud-upload-alt"
                 class="upload-image__icon upload-image__icon--trash" />
                 save
             </button>
           </div>   
        </div>
    </div>
</template>
<script>
import { uploadImage } from '@/api/media'
export default {
    name: "UploadImage",
    props: ["imageSource", "mode"],
    data() {
        return {
            file: null,
            modes: ["normal", "circle"],
            availableTypes: ['jpg', 'jpeg' , 'png'],
            maxSize: 3,
            isDragOver: false,
            isImageUploaded: false,
            errorMessage: '',
            path: '',
        }
    },
    created() {
      this.imageSource && (this.path = this.imageSource)
    },
    methods: {
        clearImage() {
            this.path = '';
            this.file = '';
            this.isDragOver = false;
        },
        onImageDrop(e) {
            e.preventDefault();
            e.stopPropagation()

            this.selectFile(e.dataTransfer.files[0])
        },

        selectFile(file) {
           this.isImageUploaded = false;
           file && this.validateImage(file)
           .then(() => {
              this.file = file;
              this.previewImage(file)
           }).catch(err => {
              this.errorMessage = err
           })
        },

        saveImage() {
          this.validateImage(this.file).then(formData => {
             uploadImage(formData).then(response => { 
                this.path = response.data.file
                this.isImageUploaded = true;
                this.$emit('image-path', this.path) 
             })
          }).catch(err => {
              this.errorMessage = err
              this.isDragOver = false
          })
        },

        previewImage(image) {
           const fileReader = new FileReader()
           fileReader.onload = () => {
               this.path = fileReader.result
           } 
           fileReader.readAsDataURL(image)
        },

        async validateImage(image) {
           return new Promise((resolve, reject) => {

               const imageExst = image.name.split('.').pop();
               !this.availableTypes.includes(imageExst) && reject('Wrong type of File');

               (image.size / 1024 / 1024) > this.maxSize && reject('To large image')

               this.file = image
               let data = new FormData()
               data.append('file', this.file) 

               resolve(data)
           }) 
        },
    }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/global/variables.scss";
@import "~@/styles/global/mixins.scss";

.upload-image {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border: 3px dashed $color-gray;
  transition: all 0.3s linear;
  box-sizing: border-box;
  padding: 10px;

  &--circle-mode {
    border-radius: 50%;
  }

  &--dragover {
     border-color: $color-blue;  
  }

  &__content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }  

  &__image-view {
    width: 100%;
    height: 100%;
    position: relative;
    
    &:hover {
      .upload-image__edit-bar {
        opacity: 1;     
      }    
    }
  }

  &__edit-bar {
    width: 100%;
    height: 60px;
    z-index: 10;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    transition: all 0.3s linear;
    opacity: 0;    
  }

  &__clear-button {
    @include button(rgba(255,255,255,0.8), $color-main, md, transparent); 
    border-radius: 0;
    box-shadow: 1px 2px 5px rgba(0,0,0,0.3);
    margin-left: 10px;
  }

  &__icon {
    font-size: 3em;
    opacity: 0.8;
    color: $color-blue;  

    &--trash {
      font-size: 1em;
      color: $color-main;    
    }  
  }

  &__text {
    margin-top: 10px;
    color: $color-blue;
    font-family: $font-main;
    font-size: 1em;      
  }

  &__error {
    transition: all 0.3s linear;
    display: block;  
    margin-top: 10px;
    color: $red;
    font-family: $font-main;
    font-size: 1em;
    border-left: 2px solid $red; 
    font-weight: 600;
    padding-left: 15px;  
  }

  &__input {
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   opacity: 0;
   cursor: pointer;
  } 

  &__image {
    width: 100%;
    object-fit: cover;
    max-height: 100%;
  }       
}    
</style>