export const state = () => ({
  quickMeetingsPeoples:[]
})

export const actions = {
  async fetchAllQuickMeetingsPeoples(ctx, payload){
    const token = localStorage.getItem('token');
    await fetch(`https://${process.env.API_HOST}/v2/quick-dating/select/near/all`, {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${token}`,
        'geo-location': payload,
        'geo-reversed': true
      },
    }).then(res => {
      return res.json()
    }).then(data => {
      ctx.commit('quick-dating/setQuickMeetingsPeoples', data, {root: true})
    })
  }
}

export const mutations = {
  setQuickMeetingsPeoples(state, payload){
    state.quickMeetingsPeoples = payload
  }
}

export const getters = {
  getQuickMeetingsPeoples(state){
    return state.quickMeetingsPeoples
  }
}
