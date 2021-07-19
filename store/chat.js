import ws from '../plugins/ws'

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
  }
})

export const actions = {
  async sendMessage(ctx, payload){
    const token = localStorage.getItem('token') ;

    const formData = new FormData();
    formData.append('receiver_id',`${payload.receiver_id}`);
    formData.append('message_text',`${payload.message_text}`);

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
  }
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

