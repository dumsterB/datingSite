<template>
  <div class="people-nearby">
    <div class="content">
      <div class="row ai-center jc-space-between">
        <h1 class="people-nearby__title">Люди рядом</h1>
        <div class="row ai-center">
          <Icon name="search" class="people-nearby__search"/>
          <Icon name="people-nearby-row" class="people-nearby__grid-row"/>
        </div>
      </div>
      <div class="row">
        <SearchPeople/>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
import SearchPeople from "@/components/SearchPeople";
export default {
  components: {Icon, SearchPeople}
}
</script>

<style scoped>

</style>
