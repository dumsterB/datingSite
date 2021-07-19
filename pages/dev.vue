<template>
  <div>
    <div class="content">
      <div class="audio-waves">
      <span @click="$refs.recordPlayer.play()">
          <Icon name="play" class="play"/>
      </span>
        <Icon name="audio_waves"/>
      </div>
      <div ref="cont">
        <audio ref="recordPlayer" controls src="" />
        <button  @click="startRecord">start recording</button>
        <button @click="endRecord">I'm done</button>
      </div>
      <div @click="startRecord"></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Icon from "@/components/Icon";

export default {
  components: {Icon},
  data() {
    return {
      audio: null,
    }
  },
  computed: {
    audioUrl() {
      console.log(this.audio, "!!!!!!!!!!!!")
      return this.audio
    }
  },
  methods: {
    startRecord() {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        let audioChunks = [];
        this.mediaRecorder = new MediaRecorder(stream)
        this.mediaRecorder.addEventListener('dataavailable', (event) => {
          console.log(event)
          audioChunks.push(event.data)
          this.$refs.recordPlayer.src = URL.createObjectURL(event.data)
          console.log(this.$refs)
          const audioBlob = new Blob(audioChunks, {
                  type: 'audio/mp3'
                });
          console.log(audioBlob)
          this.audio =URL.createObjectURL(event.data)
        })
        this.mediaRecorder.start()

      }).catch((error) => {
        alert('Чтобы записать аудио, разрешите использование микрофона')
      })
    },
    endRecord() {
      this.mediaRecorder.stop()

      // let fd = new FormData();
      // fd.append('voice', audioBlob);
      // sendVoice(fd);
      // audioChunks = [];
    }
  },
  async mounted() {
    // const stream = await navigator.mediaDevices.getUserMedia({audio: true})
    // this.mediaRecorder = new MediaRecorder(stream);
    // console.log(stream)
    // console.log(this.mediaRecorder)
    // .then(stream => {

    //
    //   this.$refs.start.addEventListener('click', function(){
    //     console.log('start')
    //     mediaRecorder.start();
    //   });
    //   let audioChunks = [];
    //   mediaRecorder.addEventListener("dataavailable",function(event) {
    //     audioChunks.push(event.data);
    //   });
    //
    //   this.$refs.stop.addEventListener('click', function(){
    //     console.log('stop')
    //     mediaRecorder.stop();
    //   });
    //
    //   mediaRecorder.addEventListener("stop", function() {
    //     const audioBlob = new Blob(audioChunks, {
    //       type: 'audio/mp3'
    //     });
    //     this.audio = URL.createObjectURL(audioBlob)
    //     const audioElem = document.createElement('audio')
    //     audioElem.src = this.audio
    //     console.log(audioElem)
    //     this.$refs.cont.prepend(audioElem)
    //     // console.log( this.audio)
    //   });
    // });
  }
}
</script>

<style scoped lang="scss">
  .audio-waves {
    max-width: 200px;
    padding: 10px;
    display: flex;
    align-items: center;
    padding-right: 8px;
    padding-left: 17px;
    background: linear-gradient(
        94deg
      , #133983 -12.18%, #71BC6F 134.71%);
    border-radius: 24px 24px 0px 24px;

    .play {
      margin-right: 10px;
      cursor: pointer;
    }
  }
</style>
