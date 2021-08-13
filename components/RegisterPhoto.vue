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
      cropImg: "",
      originalFilename : ""
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
        alert("Выберите изображение");
        return;
      }
      if (typeof FileReader === "function") {
        const reader = new FileReader();
        reader.onload = event => {
        this.imgSrc = event.target.result;
        //this.$refs.cropper.replace(event.target.result);
        this.originalFilename = file.name;          
        };
        reader.readAsDataURL(file);
      } else {
        alert("Sorry, FileReader API not supported");
      }
    },
    async cropImage() {
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      const cropped = this.dataURLtoFile(this.cropImg, this.originalFilename);
      this.$emit('getRegisterPhoto', cropped)
    },
    reset() {
      this.imgSrc = null;
      this.cropImg = null;
    },
    dataURLtoFile(dataurl, filename) {
      let arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), 
          n = bstr.length, 
          u8arr = new Uint8Array(n);

      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
    
      return new File([u8arr], filename, {type:mime});
    }
  }
};
</script>
