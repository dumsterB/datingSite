<template>
  <div class="links-list" @click="$emit('closeMenu')">
    <Link v-for="link in links" :link="link" :key="link.id" />
  </div>
</template>

<script>
import Link from '@/components/Menu/Link';

export default {
  components: {Link},
  props: {
    links: {
      type: Array,
      required: true
    }
  },
  data() {
    return {}
  }
}
</script>
