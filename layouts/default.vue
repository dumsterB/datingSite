<template>
  <div class="main">
    <Loader v-if="!user"/>
    <template v-else>
      <div class="sidebar-left">
        <div class="sidebar-left__header">
          <router-link to="/profile" class="logo">
            <inline-svg src="/icons/logo.svg"/>
          </router-link>
        </div>
        <div class="sidebar-left__content">
          <Auth v-if="userData" :user="userData" :coins="coins.coins"/>
          <LinksList :links="links"/>
        </div>
        <div class="sidebar-left__footer">
        <span class="log-out" @click="logout">
        <inline-svg src="/icons/logout.svg"/>
          Log out
        </span>
        </div>
      </div>
      <div class="header-mobile">
        <div class="header-mobile__burger" :class="{'header-mobile__burger-active': isActiveMenu}" @click="isActiveMenu = !isActiveMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="header-mobile__menu " :class="{'header-mobile__menu-active': isActiveMenu}">
          <Auth v-if="userData" :user="userData" :coins="coins.coins"/>
          <LinksList :links="links" @closeMenu="closeMenu" />
        </div>
        <div class="header-mobile__logo" @click="$router.push('/'), isActiveMenu = false">
          <Icon name="logo"/>
        </div>
        <div class="header-mobile__account" @click="$router.push('/profile'), isActiveMenu = false">
          <Icon name="account"/>
        </div>

      </div>
    <div class="main__content">
      <Nuxt/>
    </div>

    </template>
  </div>
</template>

<script>
import Auth from '@/components/Auth';
import LinksList from '@/components/Menu/LinksList';
import Loader from "~/components/Loader";
import Icon from "@/components/Icon";

export default {
  middleware: ['auth'],
  components: {
    Icon,
    LinksList,
    Auth,
    Loader
  },
  data() {
    return {
      edit: false,
      links: [
        {id: 1, href: '/swipes', icon: 'swipe', title: 'Swipes', vip: false},
        {id: 2, href: '/profile', icon: 'profile', title: 'My account', vip: false},
        {id: 3, href: '/people-nearby', icon: 'people-nearby', title: 'People nearby', vip: false},
        {id: 4, href: '/forums', icon: 'forums', title: 'Forums', vip: true},
        {id: 5, href: '/quick-meetings', icon: 'quick-meetings', title: 'Quick meetings', vip: true},
        {id: 6, href: '/chat', icon: 'chats', title: 'Chats', vip: false},
        {id: 7, href: '/top-users', icon: 'top-users', title: 'TOP Users', vip: false},
        {id: 8, href: '/announcements', icon: 'ads', title: 'Ads', vip: false},
        {id: 9, href: '/entertainment', icon: 'entertainment', title: 'Entertainment', vip: false},
      ],
      isActiveMenu: false
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout');
      this.$router.push('/')
    },
    uploadPhoto() {
      this.edit = !!this.$route.params.id;
    },
    closeMenu(){
      this.isActiveMenu = false
    }
  },
  created() {

  },
  watch: {
    '$route'() {
      this.uploadPhoto()
    }
  },
  computed: {
    user() {
      return this.$store.getters["user/user"];
    },
    userData() {
      return this.$store.getters["user/getUserData"];
    },
    coins() {
      return this.$store.getters["user/coins"];
    },
  },
  mounted() {
    this.uploadPhoto()
    this.$ws.connect();
  },
  async fetch() {
    await this.$store.dispatch('user/init')
    await this.$store.dispatch('user/userData')
    await this.$store.dispatch('user/userFullData')
    await this.$store.dispatch('user/userCoins')
    await this.$store.dispatch('chat/allChat')
    await this.$store.dispatch('forum/allForums')

  }
}
</script>

<style>
html,
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
