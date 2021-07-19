<template>
  <div class="top-users">
    <div class="content">
      <template v-if="!isLeader">
        <div class="row jc-space-between">
          <h1 class="title">Лидеры</h1>
          <button class="button button__full" @click="isLeader = true">Стать лидером</button>
        </div>
        <div class="row">
          <TopUsersList :leaders="leaders"/>
        </div>
      </template>
      <template v-else>
        <div class="row ai-center jc-start">
           <span class="back" @click="isLeader = false">
              <Icon name="arrow-left"/>
            </span>
          <h1 class="title">Стать лидером</h1>
        </div>
        <div class="row jc-center">
          <LeaderLine
            title="Лидеры 1 линии"
            :price="5"
            @payLeader="payLeader('first')"
          />
          <LeaderLine
            title="Лидеры 2 линии"
            :price="3"
            description="Закреп держится 30 минут"
            @payLeader="payLeader('second')"
          />
          <LeaderLine
            title="Лидеры 3 линии"
            :price="1"
            @payLeader="payLeader('last')"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import TopUsersList from "@/components/TopUsers/TopUsersList";
import Icon from "@/components/Icon";
import LeaderLine from "@/components/TopUsers/LeaderLine";

export default {
  components: {TopUsersList, Icon, LeaderLine},
  data() {
    return {
      isLeader: false
    }
  },
  methods: {
  async  payLeader(type) {
      console.log(type)
    await this.$store.dispatch('leaders/becomeLeader', )
    }
  },
  computed: {
    leaders() {
      return this.$store.getters['leaders/getLeaders']
    }
  },
  async mounted() {
    await this.$store.dispatch('leaders/fetchAllLeaders')
  }
}
</script>

<style scoped>

</style>
