<template>
  <div class="register-photo" v-if="isRegisterPhoto">
    <span class="back" @click="$emit('setRegisterPhoto')">
      <inline-svg src="/icons/arrow-left.svg" />
    </span>
    <h2 class="title">Add photo</h2>
    <div class="row jc-center">
      <div style="width: 300px; height:300px;" v-if="imgSrc">
        <vue-cropper
          ref="cropper"
          :guides="true"
          :view-mode="0"
          drag-mode="crop"
          :min-container-width="300"
          :min-container-height="300"
          :background="false"
          :rotatable="false"
          :src="imgSrc"
          alt="Source Image"
          :img-style="{ width: '300px', height: '300px' }"
          :aspect-ratio="1"
        ></vue-cropper>
      </div>
      <inline-svg v-else src="icons/register-photo.svg" />
    </div>
    <form @submit.prevent="send" @keypress.enter="send">
      <div class="row jc-center">
        <!--input type="file" class="input-default"-->
      </div>
      <p class="text text__important">One step left</p>
      <p class="text">Add photo</p>
      <!--button class="button button__full" >Complete registration</button-->
      <div v-if="imgSrc" class="controls">
        <button type="button" @click="cropImage" class="button button__control">
          {{ $t("Next") }}
        </button>
        <button type="button" @click="reset" class="button button__cancel">
          Отменить
        </button>
      </div>
      <button
        v-else
        @click="selectFile"
        type="button"
        class="button button__full"
      >
        Upload photo
      </button>
      <input
        id="img"
        type="file"
        name="image"
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
    selectFile() {
      document.getElementById("img").click();
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
      console.log(this.cropImg);
    },
    reset() {
      this.imgSrc = null;
      this.cropImg = null;
    }
  }
};
</script>
<style scoped>
.cropper-container {
  height: 300px;
  width: 300px;
  background: #ddd;
}
.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-file-input::before {
  content: "Select some files";
  display: inline-block;

  border: 1px solid #999;
  border-radius: 3px;
  padding: 5px 8px;
  outline: none;
  white-space: nowrap;

  cursor: pointer;
  text-shadow: 1px 1px #fff;
  font-weight: 700;
  font-size: 10pt;
}
.custom-file-input:hover::before {
  border-color: black;
}
</style>
