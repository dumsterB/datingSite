<template>
  <div class="contact" @click="openForum(forum)" v-if="forum">
    <div class="row jc-start ai-center">
      <div class="contact__col ai-center">
        <img :src="forum.pic_url && forum.pic_url"/>
      </div>
      <div class="contact__col row jc-start  no-wrap">
        <div class="row column w-100">
          <div class="row">
            <p
              class="contact__name"
            >
              {{ forum.name }}
              <span>

              </span>
            </p>
<!--            <div class="contact__unread-message" v-if="forum.messages_count">{{-->
<!--                forum.messages_count-->
<!--              }}-->
<!--            </div>-->
          </div>
          <div class="row">
            <span class="contact__last-message">
              {{   forum.messages_count }} сообщения
          </span>
<!--            <span class="contact__timestamp">{{ contact.latest_message.createdAt | time }}</span>-->
          </div>
        </div>
        <div class="row column p-0">
          <span>
            <Icon name="options"/>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon";

export default {
  components: {Icon},
  props: {
    forum: {
      type: Object,
    }
  },
  data() {
    return {}
  },
  mounted() {

  },
  methods: {
    openForum(forum) {
      this.$emit('getUser', forum)

       // let forum = this.getCurrentForumId(contact)
        this.$store.dispatch('forum/allMessages', forum.id);
      // if (contact.new_messages_count) {
      //   this.readAllMessages(contact);
      // }
      this.$router.push({path: `/forums/${forum.id}`, query: {forum_id: forum.id}});
    },
    //
    getCurrentForumId(contact) {
      console.log(contact)
       return contact.find(item => item.id == this.$store.state.user.user._id);
    },
    //
    // readAllMessages(contact) {
    //   this.$store.dispatch('chat/readAllMessages', contact.latest_message.chat_id)
    // },
    //
    // birthday(date) {
    //   let now = new Date();
    //   let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    //   let dob = new Date(date);
    //   let dobnow = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
    //   let age;
    //
    //   age = today.getFullYear() - dob.getFullYear();
    //   if (today < dobnow) {
    //     age = age - 1;
    //   }
    //   return age
    // },
    //
    // trimMessage(message) {
    //   if (message && message.length > 25) {
    //     return message.substr(0, 25) + '...'
    //   } else {
    //     return message
    //   }
    // }
  }
}
</script>
