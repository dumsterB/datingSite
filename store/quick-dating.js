import {load} from '@/plugins/api';
import ws from '../plugins/ws'

export const state = () => ({
  quickMeetingsPeoples:[],
  quickMeetingsLiqPay: {},
  wantDate: null
})

export const actions = {
  async fetchAllQuickMeetingsPeoples(ctx, payload){
    const token = localStorage.getItem('token');
    //await fetch(`https://${process.env.API_HOST}/v2/quick-dating/select/want-qdate/near/all`, {
    await fetch(`https://${process.env.API_HOST}/v2/user/select/near/all`, {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${token}`,
        'geo-location': payload,
        'geo-reversed': true
      },
    }).then(res => {
      return res.json()
    }).then(data => {
      if(!data.err){
        ctx.commit('quick-dating/setQuickMeetingsPeoples', data, {root: true})
      }      
    }).catch((e) => {
      console.log('error', e);
    })
  },

  async wantQdate({ commit }, payload) {
    await load("/v2/quick-dating/want-qdate", "put", payload, true)
      .then(data => {
        commit("quick-dating/setQDate", data.status, { root: true })
      }).catch(err => {
        console.error(err)
      })
  },

  async generateLiqpay(ctx, payload) {
    await load('/v2/coin/liqpay','put', payload, true)
    .then(data => {
      ctx.commit('quick-dating/setQuickMeetingsLiqpay', data, {root: true})
    }).catch(e => {
      throw e;
    })
  },
}

export const mutations = {
  setQuickMeetingsPeoples(state, payload){
    state.quickMeetingsPeoples = payload
  },
  setQuickMeetingsLiqpay(state, payload){
    state.quickMeetingsLiqPay = payload
  },
  setQDate(state, payload) {
    ws.store.qDate = payload
  }
}

export const getters = {
  getQuickMeetingsPeoples(state){
    return state.quickMeetingsPeoples
  },
  getQuickMeetingsLiqpay(state){
    return state.quickMeetingsLiqPay
  }
}
