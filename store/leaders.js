export const state = () => ({
  leaders:[]
})

export const actions = {
  async fetchAllLeaders(ctx){
    const token = localStorage.getItem('token');
    await fetch(`https://${process.env.API_HOST}/v2/leaders-list`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then(res => {
      return res.json()
    }).then(data => {
      ctx.commit('leaders/setLeader', data.leaders, {root: true})
    })
  },
  async becomeLeader(ctx,payload){
    const token = localStorage.getItem('token');
    await fetch(`https://${process.env.API_HOST}/v2/leaders-list/buy`, {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    }).then(res => {
      return res.json()
    }).then(data => {
      ctx.commit('leaders/setLeader', data.leaders, {root: true})
    })
  }
}

export const mutations = {
  setLeader(state, payload){
    state.leaders = payload
  }
}

export const getters = {
  getLeaders(state){
    return state.leaders
  }
}
