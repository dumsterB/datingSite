<template>
  <div class="register-photo" v-if="isRegisterPhoto">
    <span class="back" @click="$emit('setRegisterPhoto')">
      <inline-svg src="/icons/arrow-left.svg" />
    </span>
    <h2 class="title">{{ $t("Add photo") }}</h2>
    <div class="row jc-center">
      <div style="width: 300px; height:300px;" v-if="imgSrc">
        <vue-cropper
          ref="cropper"
          :guides="true"
          :view-mode="0"
          drag-mode="crop"
          :src="imgSrc"
          alt="Source Image"
          :img-style="{ width: '300px', height: '300px' }"
          :aspect-ratio="1"
        ></vue-cropper>
      </div>
      <inline-svg v-else src="icons/register-photo.svg" />
    </div>
    <form @submit.prevent="send" @keypress.enter="send">
      <div class="info" v-if="imgSrc">
        <p class="text text__info">{{ $t("Select the area to be displayed") }}</p>
      </div>
      <div v-else>
        <p class="text text__important">{{ $t("One step left") }}</p>
        <p class="text">{{ $t("Add one photo") }}</p>
      </div>
      <!--button class="button button__full" >Complete registration</button-->
      <div v-if="imgSrc" class="controls">
        <button type="button" @click="cropImage" class="button button__control">
          {{ $t("Next") }}
        </button>
        <button type="button" @click="reset" class="button button__cancel">
          {{ $t("Cancel") }}
        </button>
      </div>
      <label v-else for="img" class="button button__full">{{
        $t("Upload photo")
      }}</label>
      <input
        id="img"
        type="file"
        accept="image/*"
        name="image"
        class="inputfile"
        @change="setImage"
      />
    </form>
  </div>
</template>

<script>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
export default {
  components: { VueCropper },
  props: {
    isRegisterPhoto: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      imgSrc: "",
      cropImg: ""
    };
  },
  methods: {
    send() {
      this.$emit("sendVerificCode", this.phoneNumber);
      console.log(1);
    },
    setImage(e) {
      const file = e.target.files[0];
      if (!file.type.includes("image/")) {
        alert("Please select an image file");
        return;
      }
      if (typeof FileReader === "function") {
        const reader = new FileReader();
        reader.onload = event => {
          this.imgSrc = event.target.result;
          // rebuild cropperjs with the updated source
          //this.$refs.cropper.replace(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Sorry, FileReader API not supported");
      }
    },
    cropImage() {
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      //add file to form
      this.$emit('getRegisterPhoto', this.cropImg)
    },
    reset() {
      this.imgSrc = null;
      this.cropImg = null;
    }
  }
};
</script>
