<template>
  <div class="chat">
    <div class="content">
      <div class="row jc-start no-wrap">
        <div class="chat__contacts-block" v-if="!isMobileDialog">
          <div class="chat__new-answers" @click="openNewAnswers">12 new answers</div>
          <ContactList :contacts="contacts" @getOpponent="getOpponent" v-if="!isContactList"/>
        </div>
        <div class="chat__answers-block" v-if="!isChat && !isNewAnswers && !isMobile && !isMobileDialog ">
          <AnswerList/>
        </div>
        <template v-if="isChat">
          <div class="column jc-space-between w-100 chat__dialogue"
               :style="{'display':!isChat && !isMobile && !isMobileDialog ? 'none' : 'flex'}">
            <div class="chat__header">
              <div class="row jc-start ai-center">
            <span class="back" @click="returnToChat">
              <Icon name="arrow-chat-back"/>
            </span>
                <template v-if="companion">
                  <img :src="companion.pic" alt="">
                  <div class="column">
                    <p class="chat__header-name" @click="openProfile">{{ companion.name }},
                      <span>{{ companion.age | birthday }}</span></p>
                    <span class="chat__header-online">{{ companion.status }}</span>
                  </div>
                </template>
              </div>
            </div>
            <div class="chat__content" ref="chat-content">
              <template v-if="!wsMessages">
                <Loader/>
              </template>
              <div class="messages" v-else>
                <div v-for="(messageArr, index) in wsMessages" :key="index">
                  <div class="messages-data">{{ index }}</div>
                  <div v-for="message in messageArr" :key="message._id">
                    <div class="message-block "
                         :class="{
                           'message-block__left': message.sender_id !== user._id,
                           'message-block__right': message.sender_id == user._id,
                         }"
                    >
                      <div class="message">
                        <span class="text" v-if="message.message_text" v-html="message.message_text"></span>
                        <span class="text audio" v-if="message.message_audio">
                        {{ audioSound(message.message_audio) }}
                           <span @click="$refs[`audio_${message.message_audio._id}`][0].play()">
                              <Icon name="play" class="play"/>
                            </span>
                          <Icon name="audio_waves" class="audio-waves"/>
                           <audio id="player" :ref="'audio_'+message.message_audio._id">
                            <source
                              :src="message.message_audio.url"
                              type="audio/mp3">
                          </audio>
                      </span>
                        <span class="text images" v-if="message.images">
                        <img v-for="(image, index) in message.images" :key="index" :src="image.url" alt="">
                      </span>
                        <span class="time">{{ message.createdAt | time }}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div class="chat__footer">
              <div class="row ai-center jc-center">
                <div class="row no-wrap ai-center w-100">
                  <div class="chat__footer-government">
                    <Component
                      :is="require(`@/static/icons/add-photo.svg`).default"
                      class="BaseIcon"
                      v-bind="$attrs"
                      @v-on="$listeners"
                    />
                    <Component
                      :is="require(`@/static/icons/present.svg`).default"
                      class="BaseIcon"
                      v-bind="$attrs"
                      @v-on="$listeners"
                    />
                  </div>
                  <div class="chat__footer-textarea">
                    <form @submit.prevent="send">
                      <input type="text" placeholder="Your message..." v-model="message">
                      <span class="icon-send">
                      <Component
                        :is="require(`@/static/icons/chats.svg`).default"
                        class="BaseIcon"
                        v-bind="$attrs"
                        @v-on="$listeners"
                      />
                   </span>
                    </form>
                  </div>
                  <div class="chat__footer-actions">
                    <inline-svg src="/icons/smile.svg"/>
                    <inline-svg @mousedown="startRecord" @mouseup="sendRecord"  src="/icons/voice.svg"/>
                    <audio ref="recordPlayer" controls src="" style="visibility:hidden;width:0.1px;height:0.1px"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import ContactList from "@/components/Chat/ContactList";
import AnswerList from "@/components/NewAnswers/Answer-list";
import * as _ from 'lodash'
import Icon from "@/components/Icon";
import Loader from "@/components/Loader";

export default {
  components: {Icon, AnswerList, ContactList, Loader},
  data() {
    return {
      isChat: false,
      message: '',
      newMessage: {},
      audio: null,
      companion: {
        name: '',
        pic: '',
        age: 0,
        status: ''
      },
      isMobile: false,
      isMobileDialog: false,
      isContactList: false,
      isNewAnswers: false,
    }
  },
  watch: {
    '$route.params.id'() {
      this.routeParamsId();
      this.checkCompanion();
      setTimeout(() => {
        this.scroll();
      }, 100)
    },
    'wsMessages'() {
      this.$store.dispatch('chat/allChat')
      setTimeout(() => {
        this.scroll();
      }, 100)
    },
    'contacts'() {
      this.checkCompanion();
    }
  },
  mounted() {
    this.routeParamsId();
    if (this.$route.query.chat_id) {
      this.$store.dispatch('chat/allMessages', this.$route.query.chat_id)
      if (this.isMobile) {
        this.isMobileDialog = true
        console.log(1)
      }
    }

    setTimeout(() => {
      this.checkCompanion();
      this.scroll();
    }, 100)

    if (window.innerWidth <= 840) {
      this.isMobile = true
    }
    console.log(this.isMobile)
  },
  computed: {
    contacts() {
      let contacts = this.$store.getters['chat/getContacts'];

      return contacts.sort(function (a, b) {
        if ((!b.latest_message && a.latest_message)) {
          return 1;
        } else if (!a.latest_message && b.latest_message) {
          return -1;
        }
        return 0;
      });
      // return this.$store.getters['chat/getContacts'];
    },
    // chatMessages() {
    //   console.log(this.$ws.store.messages)
    //   return this.$ws.store.messages
    // },
    wsMessages() {
      if (this.$ws.store.messages.length) {
        let messagesHistory = this.$ws.store.messages;
        let messages = [];
        messagesHistory.map((item, index) => {
          let time = new Date(item.createdAt).toLocaleString('en-US', {day: 'numeric', month: 'short',});
          messagesHistory[index].day = time;
        })
        messages = _.groupBy(messagesHistory, "day");

        return messages;
      }
    },
    user() {
      return this.$store.getters['user/user']
    }
  },
  methods: {
    sendRecord(){
      this.mediaRecorder.stop()
      setTimeout(() => this.send());
      
    },
    startRecord() {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        let audioChunks = [];
        this.mediaRecorder = new MediaRecorder(stream)
        this.mediaRecorder.addEventListener('dataavailable', (event) => {
          audioChunks.push(event.data)
          this.$refs.recordPlayer.src = URL.createObjectURL(event.data)
          const audioBlob = new Blob(audioChunks, {
                  type: 'audio/mp3'
                });
          //this.audio =URL.createObjectURL(event.data)
          this.audio = new File([audioBlob], "audio");
        })
        this.mediaRecorder.start()

      }).catch((error) => {
        alert('Чтобы записать аудио, разрешите использование микрофона')
      })
    },
    audioSound(audio) {
      //  console.log(this.$refs[`audio_${audio._id}`])
      // if (this.$refs[`audio_${audio._id}`] !== undefined){
      //   console.log(this.$refs[`audio_${audio._id}`][0].duration)
      //
      //   this.$refs[`audio_${audio._id}`][0].onloadedmetadata = () => {
      //   }
    },
    play() {
      console.log(this.$refs.player)
      this.$refs.player[0].play().then(data => {
        console.log(data)
      }).catch(e => console.log(e))
    },
    openProfile() {
      this.$store.dispatch('user/userById', this.$route.params.id)
      this.$store.commit('chat/setChatRoute', {
        params: {id: this.$route.params.id},
        query: {chat_id: this.$route.query.chat_id}
      })
      localStorage.setItem('chatRoute', JSON.stringify({
        params: {id: this.$route.params.id},
        query: {chat_id: this.$route.query.chat_id}
      }))
      this.$router.push('/id/' + this.$route.params.id)
    },
    getOpponent(contact) {
      if (contact) {
        this.companion = {
          name: contact.opponent.profile.name,
          pic: contact.opponent.pic && contact.opponent.pic.url,
          age: contact.opponent.profile.birth_date,
          status: contact.opponent.is_online ? 'online' : 'offline'
        }
        this.isMobile && this.openMobileDialog()
        this.isChat = true;
      }
    },
    openNewAnswers() {
      //this.isNewAnswers = true
      // this.isMobileDialog = true
      this.isChat = false;
      
    },
    openMobileDialog() {
      this.isMobileDialog = true
    },
    returnToChat() {
      if (this.isMobile) {
        this.isMobileDialog = false
      }
      this.$router.push(this.localePath('/chat'))
    },
    checkCompanion() {
      if (!this.$route.params.id) {
        return
      }
      this.isMobile && this.openMobileDialog()

      let companion = this.contacts.find(item => {
        return item.users.find(item => item == this.$route.params.id)
      })
      this.getOpponent(companion)
    },
    async send() {
      if (!this.message && !this.audio) {
        return
      }
      let id = this.$route.params.id;
      let chat_id = this.$route.query.chat_id;

      // this.$store.dispatch('chat/createChat', id)
      if (chat_id) {
        let companion = this.contacts.find(item => item.users.find(item => item == this.$route.params.id))
        if (companion.new_messages_count) {
          await this.$store.dispatch('chat/readAllMessages', companion.latest_message.chat_id)
        }

        const payload = {
          chat_id: chat_id,
          receiver_id: id,
          /*message_text: this.message.trim()*/
        }
        if(this.message) payload.message_text = this.message.trim();
        if(this.audio) payload.message_audio = this.audio
          
        await this.$store.dispatch('chat/sendMessage', payload)
        await this.$store.dispatch('chat/allChat')
        this.message = '';
        this.audio = null;
        this.scroll();
      }
    },
    routeParamsId() {
      if (this.$route.params.id) {
        return this.isChat = true
      }
      this.isChat = false

    },
    scroll() {
      this.$nextTick(() => {
        const el = document.querySelector('.chat__content');
        if (el) {
          el.scrollTop = el.scrollHeight;
        }
      })
    },
    openAnswers() {
      this.isNewAnswers = true
    }
  },
  fetch() {
  }
}
</script>
