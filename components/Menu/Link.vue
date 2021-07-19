<template>
  <nuxt-link :to="localePath(`${link.href}`)"  active-class="link__active" class="link" >
   <i class="link-icon" >
     <Component
       :is="require(`@/static/icons/${link.icon}.svg`).default"
       class="BaseIcon"
       v-bind="$attrs"
       @v-on="$listeners"
     />
   </i>
    <span >{{ link.title }}</span>
    <span class="link__vip" v-if="link.vip">VIP</span>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    link: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  methods:{
    src(icon) {
      return () => import(`@/static/icons/${icon}.svg`);
    },
  }
}
</script>
