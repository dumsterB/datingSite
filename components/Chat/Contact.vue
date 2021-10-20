<template>
  <div class="contact"  v-if="contact">
    <div class="row jc-start ai-center">
      <div class="contact__col ai-center">
        <img :src="contact.opponent && contact.opponent.pic && contact.opponent.pic.url"/>
      </div>
      <div class="contact__col row jc-start  no-wrap">
        <div class="row column w-100" @click="openChat(contact)">
          <div class="row">
            <p
              class="contact__name"
              :class="{'online': contact.opponent.is_online}"
              v-if="contact.opponent"
            >
              {{ contact.opponent.profile.name }}
              <span v-if="contact.opponent.role !== 'moderator'">
                , {{ birthday(contact.opponent.profile.birth_date) }}
              </span>
            </p>
            <div class="contact__unread-message" v-if="contact.new_messages_count">{{
                contact.new_messages_count
              }}
            </div>
          </div>
          <div class="row">
            <span class="contact__last-message">
              {{ trimMessage(contact.latest_message.message_text) }}
            <span
              v-if="contact.latest_message.sender_id == getCurrentUserId(contact) && contact.latest_message.is_read  ">
              <Icon name="check"/>
              <Icon name="check" class=" icon-read"/>
            </span>
              <span v-else>
                 <Icon name="check"/>
              </span>
          </span>
            <span class="contact__timestamp">{{ contact.latest_message.createdAt | time }}</span>
          </div>
        </div>
        <div class="row column p-0">
          <span v-if="contact.opponent.role !== 'moderator'" class="options" ref="dots" @click="showOptions(contact.id)">
            <!--Icon  name="options"/-->
          </span>
        </div>
      </div>
    </div>
    <OptionSettings v-if="show" :itemId="contact.id" :reportType="reportType" @closeOptions="close" v-click-outside="closeEvent" @deleteChat="deleteChat" @reportUser="reportUser"/>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
import OptionSettings from "@/components/OptionSettings";

export default {
  components: {Icon, OptionSettings},
  props: {
    contact: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      show: false,
      reportType : 'block'
    }
  },
  mounted() {

  },
  methods: {
    closeEvent(e) {
      if (this.$refs.dots !== e.target) {  
       this.show = false;
      }
    },
    async showOptions(id){
      if (this.contact.id === id) {
        this.show = true
        await this.$store.dispatch('user/userById', this.contact.opponent._id)
      }
    },
    openChat(contact) {
      this.$emit('getUser', contact)

      let user = this.getCurrentUserId(contact)
      //console.log(user)
      this.$store.dispatch('chat/allMessages', contact.latest_message.chat_id);
      if (contact.new_messages_count) {
        this.readAllMessages(contact);
      }
      this.$router.push({path: this.localePath(`/chat/${user}`), query: {chat_id: contact.latest_message.chat_id}});
    },

    getCurrentUserId(contact) {
      return contact.users.filter(item => item !== this.$store.state.user.user._id);
    },

    readAllMessages(contact) {
      this.$store.dispatch('chat/readAllMessages', contact.latest_message.chat_id)
    },

    birthday(date) {
      let now = new Date();
      let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      let dob = new Date(date);
      let dobnow = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
      let age;

      age = today.getFullYear() - dob.getFullYear();
      if (today < dobnow) {
        age = age - 1;
      }
      return age
    },

    trimMessage(message) {
      if (message && message.length > 25) {
        return message.substr(0, 25) + '...'
      } else {
        return message
      }
    },
    close(){
      this.show = false
    },
    async deleteChat(){
      await this.$store.dispatch('chat/deleteChat', this.contact.latest_message.chat_id)
      this.$router.push(this.localePath('/chat'))
      this.close()
    },
    async reportUser(type){
      this.$parent.$emit('reportUser', type)
    }
  }
}
</script>
