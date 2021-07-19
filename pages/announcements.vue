<template>
  <div class="announcements">
   <div class="content">
     <template v-if="!isAdded">
       <div class="row jc-space-between ai-center">
         <div class="row ai-center">
        <span class="back">
          <Icon name="arrow-left"/>
        </span>
           <h1 class="title">Объявления</h1>
           <p class="my-announcements">Мои объявления</p>
         </div>
         <button class="button button__full" @click="isAdded = true">+ Добавить объявление</button>
       </div>
       <div class="column">
         <AnnouncementList/>
       </div>
     </template>
     <template v-else>
       <div class="row jc-space-between ai-center">
         <div class="row ai-center">
        <span class="back" @click="isAdded = false">
          <Icon name="arrow-left"/>
        </span>
           <h1 class="title">Новое объявления</h1>
         </div>
         <button class="button button__full">Опубликовать</button>
       </div>
       <div class="row">
         <form @submit.prevent="addAds">
           <input type="text" class="input input-default" placeholder="Название объявления"/>
           <input type="text" class="input input-default" placeholder="Текст объявления"/>
           <button class="button button__empty">+ Добавить фото</button>
         </form>
         <div class="row">
           <div class="added-imgs">
             <div>
               <img src="/img/avatar.jpg" alt="">
              <span>
                 <Icon name="close" class="delete-img"/>
              </span>
             </div>
           </div>
         </div>
       </div>
     </template>
   </div>
  </div>
</template>

<script>
import AnnouncementList from "@/components/AnnouncementList";
import Icon from "@/components/Icon";
export default {
  components: {Icon, AnnouncementList},
  data(){
    return {
      isAdded: false
    }
  },
  methods:{
    addAds(){

    }
  },
  mounted() {
    this.$store.dispatch('market/fetchAllAnnouncements')
  }
}
</script>

<style scoped>

</style>
