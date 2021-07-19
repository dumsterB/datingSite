<template>
  <div class="chat forum">
    <div class="content">
      <div class="row jc-start no-wrap">
        <div class="chat__contacts-block">
          <ForumList :forums="forums" @getOpponent="getOpponent"/>
        </div>
        <div class="chat__answers-block" v-if="!isChat">
        </div>
        <template v-if="isChat">
          <div class="column jc-space-between w-100">
            <div class="chat__header">
              <div class="row jc-start ai-center">
            <span class="back" @click="$router.push('/forums')">
              <Icon name="arrow-chat-back"/>
            </span>
                <template v-if="companion">
                  <img :src="companion.pic" v-if="companion.pic">
                  <div class="column">
                    <p class="chat__header-name" >{{ companion.name }} </p>
                  </div>
                </template>
              </div>
            </div>
            <div class="chat__content" ref="chat-content">
              <template v-if="wsMessages === undefined">
                <Loader/>
              </template>
              <div class="messages" v-else-if="wsMessages">
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
                           <audio controls="true" id="myplayer">
                            <source
                              src="https://alanica-api.s3.amazonaws.com/chat/60031c1e9f730e00077179a4/602260f546dc5c00075c10c8/audio_fa5ffeeb0ae52b3d014735374b7c9176f75fb379.mp3"
                              type="audio/mpeg">
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
              <template v-else>

              </template>
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
                    <inline-svg src="/icons/voice.svg"/>
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
import ForumList from "@/components/Forums/ForumList";

export default {
  components: {ForumList, Icon, AnswerList, ContactList, Loader},
  data() {
    return {
      isChat: false,
      message: '',
      newMessage: {},
      companion: {
        name: '',
        pic: '',
        age: 0,
        status: ''
      }
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
    'forums'(){
      this.checkCompanion();
    }
  },
  mounted() {
    this.routeParamsId();
    if (this.$route.query.forum_id) {
      this.$store.dispatch('forum/allMessages', this.$route.query.forum_id)
    }

    setTimeout(() => {
      this.checkCompanion();
      this.scroll();
    }, 100)
  },
  computed: {
    forums() {
      return this.$store.getters['forum/getForums'];
    },
    wsMessages() {
      if (this.$ws.store.forumMessages.length) {
        let messagesHistory = this.$ws.store.forumMessages;
        let messages = [];
        messagesHistory.map((item, index) => {
          messagesHistory[index].day = new Date(item.createdAt).toLocaleString('en-US', {
            day: 'numeric',
            month: 'short',
          });
        })
        messages = _.groupBy(messagesHistory, "day");
        return messages;
      } else {
        return []
      }
    },
    user() {
      return this.$store.getters['user/user']
    }
  },
  methods: {
    getOpponent(forum){
      if (forum) {
       setTimeout(() => {
         this.companion = {
           name: forum.name,
           pic: forum.pic_url,
         }
       }, 0)
      }
    },
    checkCompanion() {
      if (!this.$route.params.id) {
        return
      }
      let companion = this.forums.find(item => item.id == this.$route.params.id)
      this.getOpponent(companion)
    },
    async send() {
      if (!this.message) {
        return
      }
      let id = this.$route.params.id;
      let forum_id = this.$route.query.forum_id;

      if (forum_id) {

        // let companion = this.contacts.find(item => item.users.find(item => item == this.$route.params.id))
        // if (companion.new_messages_count) {
        //   await this.$store.dispatch('chat/readAllMessages', companion.latest_message.chat_id)
        // }

        const payload = {
          forum_id: forum_id,
          message_text: this.message.trim()
        }

        await this.$store.dispatch('forum/sendMessage', payload)
        await this.$store.dispatch('forum/allMessages', forum_id)
        await this.$store.dispatch('forum/allForums')
        this.message = '';
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
  },
  fetch() {
  }
}
</script>
