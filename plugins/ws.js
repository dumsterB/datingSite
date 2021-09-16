import Vue from 'vue';
import Vuex from 'vuex'
class WS {
  socket = null;
  store = {
    chats: [],
    messages: [],
    contacts: [],
    forums:[],
    forumMessages:[],
    qDate: null,
    qDateOff: ""
  };

  constructor() {
    const vm = new Vue({
      data: {
        store: this.store,
        connect: this.connect,
        send: this.send,
        newMessage: this.newMessage,
      }
    })

    this.store = vm.store;
    this.connect = vm.connect;
    this.send = vm.send;
    this.newMessage = vm.newMessage;
  }

  connect() {
    this.socket = new WebSocket('wss://' + process.env.API_HOST + ':8000');

    this.socket.onopen = () => {
      console.log('ws connected');
      this.send(localStorage.getItem('token'))
    }
    this.socket.onclose = () => {
      this.socket = null
    }


    this.socket.onmessage = (evt) => {
      const data = JSON.parse(evt.data)
      switch (data.type) {
        case 'new-message':
          this.newMessage(data);
          break;
        case 'chat-updated':
          console.log('chat-updated', data);

          break;
        case 'chat-typing':
          console.log('chat-typing', data);
          break;
        case 'read-messages':
          console.log('read-messages', data);
          break;
        case 'new-chat':
          console.log('new-chat', data);
          break;
        case 'update-online':
          // console.log('update-online',data);
          break;
        case 'balance-updated':
          console.log('balance-updated', data);
          break;
        case 'forum-new-message':
          this.newForumMessage(data);
          console.log('forum-new-message', data);
          break;
        case 'forum-updated':
          console.log('forum-updated', data);
          break;
        case 'forum-new-pin':
          console.log('forum-new-pin', data);
          break;
        case 'want-qdate-off':
          this.wantQdateOff(data);
          console.log('want-qdate-off', data);
          break;
        case 'reward-achived':
          console.log('new-chat', data);
          break;
      }
    }

    this.socket.onclose = (e) => {
      console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
      this.socket = null
      setTimeout(() => {
        this.connect();
      }, 1000);
    };
    this.socket.onerror = function (evt) {
      console.error('Socket error observed:', evt)
    }
  };

  newMessage(data) {
    const chat = this.store.chats[data.data.chat_id]
    chat.push(data.data);
  }

  newForumMessage(){
    const forum = this.store.forums[data.data.id]
    forum.push(data.data);
  }

  send(event) {
    this.socket.send(event)
  }

  wantQdateOff(data) {
    if (this.store.qDate) {
      this.store.qDateOff = data.type;
    }
  }


}


export default new WS();
