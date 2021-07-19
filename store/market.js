export const state = () => ({
  announcements:[],
  announcement:{}
})

export const actions = {
  async fetchAllAnnouncements(ctx){
    const token = localStorage.getItem('token');
    await fetch(`https://${process.env.API_HOST}/v2/market/select/all`, {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then(res => {
      return res.json()
    }).then(data => {
      ctx.commit('market/setAnnouncements', data, {root: true})
    })
  }
}

export const mutations = {
  setAnnouncements(state, payload){
    state.leaders = payload
  }
}

export const getters = {
  getAnnouncements(state){
    return state.leaders
  }
}
