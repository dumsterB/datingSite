<template>
  <div ref="app_container" class="main">
    <Loader v-if="!user" />
    <template v-else>
      <div class="sidebar-left">
        <div class="sidebar-left__header">
          <router-link to="/profile" class="logo">
            <inline-svg src="/icons/logo.svg" />
          </router-link>
        </div>
        <div class="sidebar-left__content">
          <Auth v-if="userData" :user="userData" :coins="coins.coins" />
          <LinksList :links="links" />
          <div class="links-list">
            <nuxt-link :to="localePath('/chat')"  active-class="link__active" class="link">
              <img src="/icons/chats.png" alt="Chat">
              <span >{{ $t('Chats') }}</span>
              <span class="link__chat" v-if="unreadChatsCount() > 0">{{unreadChatsCount()}}</span>
            </nuxt-link>
          </div>

          <!--v-select
            class="select-block__year"
            v-model="currentLocale"
            :clearable="false"
            :options="localesList"
            @input="changeLocale"
          >
            <template v-slot:selected-option="currentLocale">
              <inline-svg :src="currentLocale.src" />
              <span>{{ currentLocale.label }}</span>
            </template>
            <template v-slot:option="option">
              <span :class="option.icon"></span>
              <inline-svg :src="option.src" />
              <span>{{ option.label }}</span>
            </template>
            <template #open-indicator="{ attributes }">
              <span v-bind="attributes"
                ><inline-svg src="/icons/arrow-dwn.svg"
              /></span>
            </template>
          </v-select-->
        </div>
        <div class="sidebar-left__footer">
          <span class="log-out" @click="logout">
            <inline-svg src="/icons/logout.svg" />
            {{$t('Log out')}}
          </span>
        </div>
      </div>
      <div class="header-mobile">
        <div
          class="header-mobile__burger"
          :class="{ 'header-mobile__burger-active': isActiveMenu }"
          @click="isActiveMenu = !isActiveMenu"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div
          class="header-mobile__menu "
          :class="{ 'header-mobile__menu-active': isActiveMenu }"
        >
          <Auth v-if="userData" :user="userData" :coins="coins.coins" />
          <LinksList :links="links" @closeMenu="closeMenu" />
          <div class="links-list" @click="closeMenu">
            <nuxt-link :to="localePath('/chat')"  active-class="link__active" class="link">
              <img src="/icons/chats.png" alt="Chat">
              <span >{{ $t('Chats') }}</span>
              <span class="link__chat" v-if="unreadChatsCount() > 0">{{unreadChatsCount()}}</span>
            </nuxt-link>
          </div>
          <!--v-select
            class="select-block__year"
            v-model="currentLocale"
            :clearable="false"
            :options="localesList"
            @input="changeLocale"
          >
            <template v-slot:selected-option="currentLocale">
              <inline-svg :src="currentLocale.src" /> 
              <span>{{ currentLocale.label }}</span>
            </template>
            <template v-slot:option="option">
              <span :class="option.icon"></span>
               <inline-svg :src="option.src" />  
              <span>{{ option.label }}</span>
            </template>
            <template #open-indicator="{ attributes }">
              <span v-bind="attributes"
                ><inline-svg src="/icons/arrow-dwn.svg"
              /></span>
            </template>
          </v-select-->
          <div class="mobile-footer">
            <span class="log-out" @click="logout">
            <inline-svg src="/icons/logout.svg" />
              {{$t('Log out')}}
            </span>
          </div>
        </div>
        
        <div
          class="header-mobile__logo"
          @click="$router.push('/'), (isActiveMenu = false)"
        >
          <Icon name="logo" />
        </div>
        <div
          class="header-mobile__account"
          @click="$router.push('/profile'), (isActiveMenu = false)"
        >
          <Icon name="account" />
        </div>
      </div>
      <div class="main__content">
        <Nuxt />
      </div>
    </template>
  </div>
</template>

<script>
import Auth from "@/components/Auth";
import LinksList from "@/components/Menu/LinksList";
import Loader from "~/components/Loader";
import Icon from "@/components/Icon";

export default {
  middleware: ["auth"],
  components: {
    Icon,
    LinksList,
    Auth,
    Loader
  },
  data() {
    return {
      edit: false,
      isActiveMenu: false,
      locales: [
        { label: "Русский", code: "ru", src: "/icons/ru-flag.svg" },
        { label: "English", code: "en", src: "/icons/en-flag.svg" }
      ]
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("user/logout");
      this.$router.push(this.localePath("/"));
    },
    uploadPhoto() {
      this.edit = !!this.$route.params.id;
    },
    closeMenu() {
      this.isActiveMenu = false;
      this.$refs.app_container.requestFullscreen();
    },
    changeLocale(value) {
      const route = $nuxt.$route.path.match(/\/en\//);
      if (route) {
        this.$router.push($nuxt.$route.path.replace(/\/en/, ""));
      } else {
        this.$router.push("/en" + $nuxt.$route.path);
      }
    },
    unreadChatsCount() {
      let contacts = this.$store.getters['chat/getContacts'];
      let count = 0;
      for(let contact of contacts){
        if(contact.new_messages_count > 0){
          //count += contact.new_messages_count;
          count ++;
        }
      }
      return count
    },
  },
  created() {},
  watch: {
    $route() {
      this.uploadPhoto();
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
    localesList() {
      return this.locales.filter(loc => loc.code !== this.$i18n.locale);
    },
    links() {
      return [
        {
          id: 1,
          href: "/swipes",
          icon: "swipe",
          title: this.$t("Swipes"),
          vip: false
        },
        {
          id: 2,
          href: "/profile",
          icon: "profile",
          title: this.$t("My account"),
          vip: false
        },
        {
          id: 3,
          href: "/people-nearby",
          icon: "people-nearby",
          title: this.$t("People nearby"),
          vip: false
        },
        {
          id: 4,
          href: "/forums",
          icon: "forums",
          title: this.$t("Forums"),
          vip: true
        },
        {
          id: 5,
          href: "/quick-meetings",
          icon: "quick-meetings",
          title: this.$t("Quick meetings"),
          vip: true
        },
        /*{
          id: 6,
          href: "/chat",
          icon: "chats",
          title: this.$t("Chats"),
          vip: false
        },*/
        {
          id: 7,
          href: "/top-users",
          icon: "top-users",
          title: this.$t("TOP Users"),
          vip: false
        },
        {
          id: 8,
          href: "/announcements",
          icon: "ads",
          title: this.$t("Ads"),
          vip: false
        },
        {
          id: 9,
          href: "/entertainment",
          icon: "entertainment",
          title: this.$t("Entertainment"),
          vip: false
        }
      ];
    },
    currentLocale: {
      get() {
        return this.locales.filter(loc => loc.code === this.$i18n.locale);
      },
      set(newName) {
        return newName;
      }
    }
  },
  mounted() {
    this.uploadPhoto();
    this.$ws.connect();
  },
  async fetch() {
    await this.$store.dispatch("user/init");
    await this.$store.dispatch("user/userData");
    await this.$store.dispatch("user/userFullData");
    await this.$store.dispatch("user/userCoins");
    await this.$store.dispatch("chat/allChat");
    //await this.$store.dispatch("forum/allForums");
    await this.$store.dispatch("user/userPreference");
  }
};
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
