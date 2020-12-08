<template>
  <div class="sidebar">
    <modal-window v-if="showModalAddSpace">
      <div slot="header">
       <div class="modal__header">
         <h2 class="title-sm modal__title">Create space</h2>
         <font-awesome-icon 
              icon="times" 
              @click="$modalState('showModalAddSpace', false, clearlFields) && (isEdit = false)" 
              class="modal__icon" />
       </div>
      </div>
      <div slot="body">
       <div class="modal__body">
         <div class="modal__input-container">
          <custom-input v-model="spaceName" :custom-label="'Name of your space'" />
          <custom-input v-model="spaceDescription" :description="true" :custom-label="'Description of your space'" />
         </div>
         <div class="modal__upload-image">
           <upload-image 
           @image-path="coverPath = $event" 
           :image-source="coverPath"
            mode="normal" />
         </div>
       </div>
      </div>
      <div slot="footer">
       <div class="modal__footer">
         <button v-if="!isEdit" @click="saveSpace" class="modal__button">Save</button>
         <button v-else class="modal__button" @click="editSpace">Save</button> 
         <button @click="$modalState('showModalAddSpace', false, clearlFields) && (isEdit = false)" class="modal__button">Cancel</button> 
       </div>
      </div>
    </modal-window>
    <div class="sidebar__header">
      <button class="sidebar__button"
          @click="$modalState('showModalAddSpace', true, clearlFields)">
          + add new space
      </button>
      <user-profile v-if="user !== null" :path="user.path ? user.path : defaultAvatar " :user-name="user.username"/>
    </div>
    <sidebar-item
     v-for="(userSpace, index) in userSpaces"
     @click.native="activeItem = index"
     @edit-space="setTempSpace($event)"
     @delete-space="deleteSpace($event)"
     :key="userSpace.id"
     :current-item="index === activeItem"
     :space="userSpace" />
     <div v-if="isLoading" >
       <skeleton-sidebar-item  v-for="item in 5" :key="item" />
     </div>
  </div>
</template>

<script>
import SidebarItem from "@/components/sidebar/SidebarItem";
import UserProfile from "@/components/user/UserProfile"
import ModalWindow from "@/components/common/ModalWindow"
import UploadImage from "@/components/common/UploadImage"
import SkeletonSidebarItem from "@/components/skeleton/SkeletonSidebarItem"
import logInfo from "@/utils/ErrorMessage"
import { getUserSpaces, createSpace, editSpace, deleteSpace } from '@/api/space'
export default {
  name: "sidebar",
  components: { SidebarItem , UserProfile, ModalWindow, UploadImage, SkeletonSidebarItem },
  data() {
    return {
      userSpaces: null,
      user:null,
      activeItem: null,
      showModalAddSpace: false,
      isEdit: false,
      spaceId: "",
      spaceName: '',
      defaultAvatar: require("@/assets/images/default-avatar.png"),
      spaceDescription: '',
      isLoading: false,
      coverPath: ''
    }
  },
  computed: {
    currentSpace() {
      return this.$store.getters?.currentSpace
    }
  },
  mounted () { 
    this.getUser()
    this.getUserSpaces()
   },
  methods: {
    setTempSpace(space) {
      this.showModalAddSpace = true;
      this.isEdit = true;
      this.spaceId = space.id;
      this.spaceName = space.name;
      this.spaceDescription = space.description;
      this.coverPath = space.coverPath;
    },
    deleteSpace(id) {
      deleteSpace(id).then(() =>{
        this.currentSpace?.id === id && this.$store.dispatch('setCurrentSpace', null)

        this.userSpaces
        .find((space, index) => space.id === id && this.userSpaces.splice(index, 1))

        this.$successMessage('Success delete')
      }).catch(err => {
           logInfo(err)
           this.$errorMessage('Failed delete space')
        })
    },
    editSpace() {
      editSpace(this.spaceId, this.spaceName, this.spaceDescription, this.coverPath)
        .then(response => {
          if (response.status === 200) {
            this.showModalAddSpace = false;
            this.userSpaces.filter((space, index) => space.id === response.data.id && (this.userSpaces[index] = response.data))
            this.currentSpace.id === response.data.id && this.$store.dispatch('setCurrentSpace', response.data)
          }
        }).catch(err => {
          this.showModalAddSpace = false;
          logInfo(err)
          this.$errorMessage('Something went wrong')
        })
    },
    clearlFields() {
      this.spaceName = '';
      this.spaceDescription = '';
      this.coverPath = ""
    },
    setCurrentSpace(index) {
      this.activeItem = index
    },
    saveSpace() {
      createSpace(this.spaceName, this.spaceDescription, this.coverPath)
      .then(response => {
        if (response.status === 200) {
           this.showModalAddSpace = false
           this.getUserSpaces() 
           this.clearlFields(); 
        }
      })
    },
    getUserSpaces () {
      this.isLoading = true;
      getUserSpaces().then(response => {
        this.userSpaces = response.data
        this.isLoading = false;
      }).catch(err => {
        logInfo(err)
        this.isLoading = false;
      })
    },
    getUser() {
      this.user = { ... JSON.parse(localStorage.getItem('user')) }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/global/variables.scss";
@import "~@/styles/global/mixins.scss";

.sidebar {
  position: relative;
  width:100%;
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  z-index: 8;
  background: #fff;


  &__title {
    padding: 2% 10%;
    text-transform: uppercase;
    font-weight: 500;
    margin-bottom: 5%;
    color: $color-blue;
  }

  &__header {
    background: transparent;
    padding: 1rem;
    position: sticky;
    display:flex;
    justify-content: space-evenly;
    border-bottom:1px solid #dcdcdc;
    margin-bottom: 10%;
    align-items: center;
    flex-wrap: wrap;
    z-index: 9;
    top: 0;
    height:70px;
  }


  &__button {
    @include button(transparent, $color-main, sm, $color-main);
    font-size: 1rem;
    padding: 0.7em 1.5em;

    &:hover {
      transition: all 0.3s ease-in-out;
      background: $color-main;
      color:white;
      border-color: transparent;
    }
  }
}

.modal {
  &__header, &__body, &__footer {
    box-sizing: border-box;
    padding: 2% 5%; 
  }


  &__header {
    width: 100%;
    height: auto;
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;  
  }
  
  &__title {
    text-transform: uppercase;
    margin-left: 10px; 
  }

  &__icon {
    color:  #666666;
    font-size: 1.2em;
    cursor: pointer; 
  }

  &__footer {
    margin-top: 20px;
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
  }

  &__button {
    @include button(transparent, $color-main , md, $color-main);
    border-radius: 0;
    font-size: 1em;
    font-weight: 400;
    transition: 0.3 s linear;
    width: 120px;
    margin-left: 10px;

    &:hover {
      background: $color-main;
      color: white;
      border-color: transparent;
    }
  }

  &__input-container {
    max-width: 600px;
  }

  &__upload-image {
    width: 100%;
    height: 200px;  
  }
}
</style>