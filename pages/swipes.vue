<template>
  <div class="swipes">
    <div class="content">
     <template v-if="!isFilter">
       <div class="row">
        <span class="swipes__filters" @click="isFilter = true">
          <inline-svg src="/icons/filters.svg"/>
          Filters
        </span>
       </div>
       <div class="row no-wrap">
         <SwipesCarousel :peoples="peoples"/>
         <div class="swipes__about">
           <h2 class="swipes__about-name online" @click="openProfile">Rachel, <span>25</span></h2>
           <p class="swipes__about-city">Odessa <span>32km</span></p>
           <p class="swipes__about-text">Lorem Lorem labore exercitation mollit magna qui amet aute elit id occaecat
             culpa
             velit...</p>
         </div>
       </div>
       <div class="row">
         <div class="title">Сделайте Рейчел предложение:</div>
       </div>
       <div class="row ai-center jc-start">
         <div class="swipes__offer-block">
           <Offer icon="theater" text="Пригласить в театр"/>
           <Offer icon="dinner" text="Поужинаем?"/>
           <Offer icon="mac" text="Позвать в мак"/>
           <Offer icon="coffee" text="Кофе в постель "/>
         </div>
         <div class="swipes__offer-reload">
           <inline-svg src="/icons/reload.svg"/>
         </div>
       </div>
       <div class="row">
         <form @submit.prevent="">
           <inline-svg src="/icons/chat.svg"/>
           <input type="text" placeholder="Начать знакомство" class="input-swipes">
         </form>
         <span class="swipes__skip">
          Пропустить
        </span>
       </div>
     </template>
      <template v-else>
        <FilterList @setFilter="setFilter"/>
      </template>
    </div>
  </div>
</template>


<script>
import SwipesCarousel from '@/components/carousel/SwipesCarousel';
import Offer from '@/components/Offer.vue'
import FilterList from '@/components/Filters/FilterList'
export default {
  components: {
    SwipesCarousel,
    Offer,
    FilterList
  },
  data() {
    return {
      isFilter: false,
      peoples: [
        {
          id: 1,
          name: 'Rachel',
          age: 25,
          photo: {
            id: 1,
            name: 'photo'
          },
          photos: [
            {
              id: 1,
              name: 'photo'
            },
            {
              id: 2,
              name: 'photo'
            },
            {
              id: 3,
              name: 'photo'
            },
            {
              id: 4,
              name: 'photo'
            },
            {
              id: 5,
              name: 'photo'
            },
            {
              id: 6,
              name: 'photo'
            },
            {
              id: 7,
              name: 'photo'
            },
            {
              id: 8,
              name: 'photo'
            },
          ],
          city: 'Odessa',
          distance: '32',
          about_text: 'Lorem Lorem labore exercitation mollit magna qui amet aute elit id occaecat culpa velit',
          about: [
            {
              id: 1,
              title: 'height',
              text: 165
            },
            {
              id: 2,
              title: 'weight',
              text: 65
            },
            {
              id: 3,
              title: 'Work',
              text: 'designer'
            },
            {
              id: 4,
              title: 'body type',
              text: 'slim'
            },
          ],
          interests: [
            {
              id: 1,
              title: 'Fitness'
            },
            {
              id: 2,
              title: 'Menegment'
            },
            {
              id: 3,
              title: 'Wine'
            },
            {
              id: 4,
              title: 'Shopping'
            },
            {
              id: 5,
              title: 'Cooking'
            },
            {
              id: 6,
              title: 'Fitness'
            },
          ]
        },
        {
          id: 2,
          name: 'Rachel',
          age: 25,
          photo: {
            id: 1,
            name: 'photo'
          },
          photos: [
            {
              id: 1,
              name: 'photo'
            },
            {
              id: 2,
              name: 'photo'
            },
            {
              id: 3,
              name: 'photo'
            },
            {
              id: 4,
              name: 'photo'
            },
            {
              id: 5,
              name: 'photo'
            },
            {
              id: 6,
              name: 'photo'
            },
            {
              id: 7,
              name: 'photo'
            },
            {
              id: 8,
              name: 'photo'
            },
          ],
          city: 'Odessa',
          distance: '32',
          about_text: 'Lorem Lorem labore exercitation mollit magna qui amet aute elit id occaecat culpa velit',
          about: [
            {
              id: 1,
              title: 'height',
              text: 165
            },
            {
              id: 2,
              title: 'weight',
              text: 65
            },
            {
              id: 3,
              title: 'Work',
              text: 'designer'
            },
            {
              id: 4,
              title: 'body type',
              text: 'slim'
            },
          ],
          interests: [
            {
              id: 1,
              title: 'Fitness'
            },
            {
              id: 2,
              title: 'Menegment'
            },
            {
              id: 3,
              title: 'Wine'
            },
            {
              id: 4,
              title: 'Shopping'
            },
            {
              id: 5,
              title: 'Cooking'
            },
            {
              id: 6,
              title: 'Fitness'
            },
          ]
        },
        {
          id: 3,
          name: 'Rachel',
          age: 25,
          photo: {
            id: 1,
            name: 'photo'
          },
          photos: [
            {
              id: 1,
              name: 'photo'
            },
            {
              id: 2,
              name: 'photo'
            },
            {
              id: 3,
              name: 'photo'
            },
            {
              id: 4,
              name: 'photo'
            },
            {
              id: 5,
              name: 'photo'
            },
            {
              id: 6,
              name: 'photo'
            },
            {
              id: 7,
              name: 'photo'
            },
            {
              id: 8,
              name: 'photo'
            },
          ],
          city: 'Odessa',
          distance: '32',
          about_text: 'Lorem Lorem labore exercitation mollit magna qui amet aute elit id occaecat culpa velit',
          about: [
            {
              id: 1,
              title: 'height',
              text: 165
            },
            {
              id: 2,
              title: 'weight',
              text: 65
            },
            {
              id: 3,
              title: 'Work',
              text: 'designer'
            },
            {
              id: 4,
              title: 'body type',
              text: 'slim'
            },
          ],
          interests: [
            {
              id: 1,
              title: 'Fitness'
            },
            {
              id: 2,
              title: 'Menegment'
            },
            {
              id: 3,
              title: 'Wine'
            },
            {
              id: 4,
              title: 'Shopping'
            },
            {
              id: 5,
              title: 'Cooking'
            },
            {
              id: 6,
              title: 'Fitness'
            },
          ]
        },
        {
          id: 4,
          name: 'Rachel',
          age: 25,
          photo: {
            id: 1,
            name: 'photo'
          },
          photos: [
            {
              id: 1,
              name: 'photo'
            },
            {
              id: 2,
              name: 'photo'
            },
            {
              id: 3,
              name: 'photo'
            },
            {
              id: 4,
              name: 'photo'
            },
            {
              id: 5,
              name: 'photo'
            },
            {
              id: 6,
              name: 'photo'
            },
            {
              id: 7,
              name: 'photo'
            },
            {
              id: 8,
              name: 'photo'
            },
          ],
          city: 'Odessa',
          distance: '32',
          about_text: 'Lorem Lorem labore exercitation mollit magna qui amet aute elit id occaecat culpa velit',
          about: [
            {
              id: 1,
              title: 'height',
              text: 165
            },
            {
              id: 2,
              title: 'weight',
              text: 65
            },
            {
              id: 3,
              title: 'Work',
              text: 'designer'
            },
            {
              id: 4,
              title: 'body type',
              text: 'slim'
            },
          ],
          interests: [
            {
              id: 1,
              title: 'Fitness'
            },
            {
              id: 2,
              title: 'Menegment'
            },
            {
              id: 3,
              title: 'Wine'
            },
            {
              id: 4,
              title: 'Shopping'
            },
            {
              id: 5,
              title: 'Cooking'
            },
            {
              id: 6,
              title: 'Fitness'
            },
          ]
        },
        {
          id: 5,
          name: 'Rachel',
          age: 25,
          photo: {
            id: 1,
            name: 'photo'
          },
          photos: [
            {
              id: 1,
              name: 'photo'
            },
            {
              id: 2,
              name: 'photo'
            },
            {
              id: 3,
              name: 'photo'
            },
            {
              id: 4,
              name: 'photo'
            },
            {
              id: 5,
              name: 'photo'
            },
            {
              id: 6,
              name: 'photo'
            },
            {
              id: 7,
              name: 'photo'
            },
            {
              id: 8,
              name: 'photo'
            },
          ],
          city: 'Odessa',
          distance: '32',
          about_text: 'Lorem Lorem labore exercitation mollit magna qui amet aute elit id occaecat culpa velit',
          about: [
            {
              id: 1,
              title: 'height',
              text: 165
            },
            {
              id: 2,
              title: 'weight',
              text: 65
            },
            {
              id: 3,
              title: 'Work',
              text: 'designer'
            },
            {
              id: 4,
              title: 'body type',
              text: 'slim'
            },
          ],
          interests: [
            {
              id: 1,
              title: 'Fitness'
            },
            {
              id: 2,
              title: 'Menegment'
            },
            {
              id: 3,
              title: 'Wine'
            },
            {
              id: 4,
              title: 'Shopping'
            },
            {
              id: 5,
              title: 'Cooking'
            },
            {
              id: 6,
              title: 'Fitness'
            },
          ]
        },
        {
          id: 6,
          name: 'Rachel',
          age: 25,
          photo: {
            id: 1,
            name: 'photo'
          },
          photos: [
            {
              id: 1,
              name: 'photo'
            },
            {
              id: 2,
              name: 'photo'
            },
            {
              id: 3,
              name: 'photo'
            },
            {
              id: 4,
              name: 'photo'
            },
            {
              id: 5,
              name: 'photo'
            },
            {
              id: 6,
              name: 'photo'
            },
            {
              id: 7,
              name: 'photo'
            },
            {
              id: 8,
              name: 'photo'
            },
          ],
          city: 'Odessa',
          distance: '32',
          about_text: 'Lorem Lorem labore exercitation mollit magna qui amet aute elit id occaecat culpa velit',
          about: [
            {
              id: 1,
              title: 'height',
              text: 165
            },
            {
              id: 2,
              title: 'weight',
              text: 65
            },
            {
              id: 3,
              title: 'Work',
              text: 'designer'
            },
            {
              id: 4,
              title: 'body type',
              text: 'slim'
            },
          ],
          interests: [
            {
              id: 1,
              title: 'Fitness'
            },
            {
              id: 2,
              title: 'Menegment'
            },
            {
              id: 3,
              title: 'Wine'
            },
            {
              id: 4,
              title: 'Shopping'
            },
            {
              id: 5,
              title: 'Cooking'
            },
            {
              id: 6,
              title: 'Fitness'
            },
          ]
        },
      ]
    }
  },
  methods:{
    setFilter(){
      this.isFilter = !this.isFilter
    },
    openProfile(){
      this.$router.push('/id/' + 22)
    }
  }
}
</script>
