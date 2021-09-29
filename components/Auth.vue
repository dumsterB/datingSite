<template>
  <div class="auth" v-if="user">
    <img :src="user.pic && user.pic.url || null" alt="" class="auth__avatar">
    <div class="auth__wrapper">
      <router-link to="/profile" class="auth__name">{{ user && user.name }}</router-link>
      <div class="row ai-center jc-start">
        <!--Icon name="gold"/-->
        <img :src="'/icons/Gold.png'" alt="Gold">
        <span class="auth__golds">{{ coins }} golds</span>
      </div>
    </div>
  </div>
</template>
<script>
import Icon from "@/components/Icon";

export default {
  components: {Icon},
  props: {
    user: {
      type:  Object,
    },
    coins: {
      type: Number,
    }
  },
  data() {
    return {}
  },
  mounted() {
  }
}
</script>
