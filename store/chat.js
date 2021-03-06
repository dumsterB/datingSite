import ws from '../plugins/ws'
import {load} from '@/plugins/api'

export const state = () => ({
  chats: [],
  contactList: [],
  chatMessages:[],
  chatRoute:{
    params:{
      id:''
    },
    query:{
      chat_id:''
    }
  },
  blockModal: false
})

export const actions = {
  async sendMessage(ctx, payload){
    const token = localStorage.getItem('token') ;

    const formData = new FormData();
    formData.append('receiver_id',`${payload.receiver_id}`);
    if(payload.message_text) formData.append('message_text',`${payload.message_text}`);
    if(payload.images) formData.append('images', JSON.stringify(payload.images));
    if(payload.message_audio) formData.append('message_audio', payload.message_audio);

    await fetch(`https://${process.env.API_HOST}/v2/chat/${payload.chat_id}/message`, {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData
    }).then(res => {
      return res.json()
    }).then(data => {
      ctx.commit('chat/setAddNewMessage', data, {root: true})
    })
  },

  async createChat(ctx, payload){
    const token = localStorage.getItem('token') ;
    await fetch(`https://${process.env.API_HOST}/v2/chat/${payload}`, {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${token}`
      },

    }).then(res => {
      return res.json()
    })
  },

  async chatCreateGet(ctx, payload) {
    return await load(`/v2/chat/get-or-create/${payload}`,'post', '' ,true).then(data => data)
    .catch(e => {
      throw e;
    })
  },

  async allChat(ctx){
    const token = localStorage.getItem('token') ;
    await fetch(`https://${process.env.API_HOST}/v2/chat/all`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then(res => {
      return res.json()
    }).then(data => {
      ctx.commit('chat/setContacts', data, {root: true})
    })
  },

  async allMessages(ctx, payload){
    const token = localStorage.getItem('token') ;
    await fetch(`https://${process.env.API_HOST}/v2/chat/${payload}/messages/all`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then(res => {
      return res.json()
    }).then(data => {
      ctx.commit('chat/setChatMessages', data, {root: true})
    })
  },

  async readAllMessages(ctx, payload){
    const token = localStorage.getItem('token') ;
    await fetch(`https://${process.env.API_HOST}/v2/chat/${payload}/read/all`, {
      method: 'put',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
  },

  async deleteChat(ctx, payload) {
    return await load(`/v2/chat/${payload}`,'delete', '' , true).then(async data =>{
      await ctx.dispatch("allChat");
    })
    .catch(e => {
      throw e;
    })
  },

  async complainUser(ctx, payload) {
    return await load(`/v2/complain/${payload.user}`,'post', payload , true).then(data => data)
    .catch(e => {
      throw e;
    })
  },

  async blockUser(ctx, payload) {
    return await load(`/v2/complain/${payload.user}/block`,'post', payload , true).then(async data => {
      await ctx.dispatch("allChat");
    })
    .catch(e => {
      throw e;
    })
  },

}

export const mutations = {
  setContacts(state, payload){
    state.contactList = payload
  },
  setChatMessages(state, payload){
    // state.chatMessages = payload.reverse();
    // ws.store.chats = payload.reverse()
    ws.store.messages = payload
    ws.store.chats[payload[0].chat_id] = payload.reverse()

  },
  setAddNewMessage(state, payload){
    // state.chatMessages.push(payload)
    console.log(payload)
    // ws.store.messages.push(payload)
  },
  setChatRoute(state, payload){
    console.log(payload)
    state.chatRoute = payload
    console.log(state.chatRoute)
  },
  setBlockModal(state){
    state.blockModal = !state.blockModal;
  },
}

export const getters = {
  getContacts(state){
    return state.contactList ? state.contactList.filter(item => item.opponent) : [];
  },
  getChatMessages(state){
    return state.chatMessages
  },
}

export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state,
};

