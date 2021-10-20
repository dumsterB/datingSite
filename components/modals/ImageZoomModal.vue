<template>
    <div id="myModal" class="image-modal" :style="src ? 'display: block;' : 'display: none;' ">
      <span class="close" @click="$emit('closeImage')">&times;</span>
      <img class="modal-content" id="img01" :src="src">
    </div>
</template>

<script>

export default {
  props:{
    src:{
      type: String,
    }
  },

}
</script>
