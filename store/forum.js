import ws from '../plugins/ws'

export const state = () => ({
  forums: [],
  forumMessages: [],

})

export const actions = {
  async sendMessage(ctx, payload) {
    const token = localStorage.getItem('token');

    // const formData = new FormData();
    // formData.append('receiver_id', `${payload.receiver_id}`);
    // formData.append('message_text', `${payload.message_text}`);

    await fetch(`https://${process.env.API_HOST}/v2/forum/${payload.forum_id}/message`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({'message_text': payload.message_text})
    }).then(res => {
      return res.json()
    }).then(data => {
      ctx.commit('chat/setAddNewMessage', data, {root: true})
    })
  },

  async createChat(ctx, payload) {
    const token = localStorage.getItem('token');
    await fetch(`https://${process.env.API_HOST}/v2/chat/${payload}`, {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${token}`
      },

    }).then(res => {
      return res.json()
    })
  },

  async allForums(ctx) {
    const token = localStorage.getItem('token');
    await fetch(`https://${process.env.API_HOST}/v2/forum/all`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then(res => {
      return res.json()
    }).then(data => {
      ctx.commit('forum/setForums', data, {root: true})
    })
  },

  async allMessages(ctx, payload) {
    const token = localStorage.getItem('token');
    await fetch(`https://${process.env.API_HOST}/v2/forum/${payload}/message/all`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then(res => {
      return res.json()
    }).then(data => {
      ctx.commit('forum/setForumMessages', data, {root: true})
    })
  },

  async readAllMessages(ctx, payload) {
    const token = localStorage.getItem('token');
    await fetch(`https://${process.env.API_HOST}/v2/chat/${payload}/read/all`, {
      method: 'put',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
  },

}

export const mutations = {
  setForums(state, payload) {
    state.forums = payload
  },
  setForumMessages(state, payload) {
    // state.chatMessages = payload.reverse();
    // ws.store.chats = payload.reverse()
    console.log(payload)
    if (payload.length) {
      ws.store.forumMessages = payload
      ws.store.forums[payload[0].id] = payload.reverse()
    } else {
      ws.store.forumMessages = []
      // ws.store.forums[payload[0].id] = []
    }

  },

}

export const getters = {
  getForums(state) {
    // let forums = state.contactList.filter(item => item.opponent)
    return state.forums;
  },
  getForumMessages(state) {
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

