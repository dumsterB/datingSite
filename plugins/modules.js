import Vue from 'vue';
import InlineSvg from 'vue-inline-svg';
import vSelect from 'vue-select'
import Carousel from 'vue-carousel';
import VueSlickCarousel from 'vue-slick-carousel'
import $ws from './ws'
import $glob from './glob'
import * as VueGoogleMaps from 'vue2-google-maps'

import "vue-select/src/scss/vue-select.scss";
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

Vue.use(Carousel);

Vue.component('inline-svg', InlineSvg);
Vue.component('v-select', vSelect)
Vue.component('vue-slick-carousel', VueSlickCarousel)


Vue.filter('time', (value) =>{
  let time = new Date(value);
  return time.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: false})
})

Vue.filter('timeDate', (value) => {
  const time = new Date(value );
  const timeNow = new Date();
  if (timeNow.toDateString() >= time.toDateString()) {
    return time.toLocaleString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true})
  } else {
    return time.toLocaleString('en-US', {day:'numeric',month: 'short', })
  }
})
Vue.filter('birthday', (value) => {
  let now = new Date();
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let dob = new Date(value);
  let dobnow = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
  let age;

  age = today.getFullYear() - dob.getFullYear();
  if (today < dobnow) {
    age = age - 1;
  }
  return age
})


export default function Core() {
  Vue.prototype.$ws = $ws;
  Vue.prototype.$glob = $glob;
}

Vue.use(Core);


Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAsnLEOI5WAr6rpkBzsP8UVw3o4rRvx-70',
    libraries: 'places', 
    region: 'UA',
    language: 'ua',
    // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
  }
})
