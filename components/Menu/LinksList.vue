<template>
  <div class="links-list" @click="$emit('closeMenu')">
    <Link v-for="link in filteredLinks" :link="link" :key="link.id" />
  </div>
</template>

<script>
import Link from "@/components/Menu/Link";

export default {
  components: { Link },
  props: {
    links: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    filteredLinks() {
      const filtered = [];
      this.links.forEach(el => {
        if (
          el.href === "/swipes" ||
          el.href === "/people-nearby" ||
          el.href === "/forums" ||
          el.href === "/top-users" ||
          el.href === "/announcements" ||
          el.href === "/entertainment"
        ) {
          return;
        } else {
          filtered.push(el);
        }
      });
      return filtered;
    }
  },
};
</script>
