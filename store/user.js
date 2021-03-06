import {load} from '@/plugins/api'


export const state = () => ({
  user: {},
  userData: {},
  selectedUser:[],
  coins:{},
  token: '',
  preference : {}
})

export const actions = {
  async init(ctx) {
    const token = localStorage.getItem('token') ;
    if (!token) {
      ctx.commit('user/clearUser', {root: true})
      return
    }
    await load('/v2/auth/token/check','post', '', true).then(data => {
      //todo set token from data object
      localStorage.setItem('token', token)
      ctx.commit('user/setToken', {
        token: token
      }, {root: true})
    }).catch(e => {
      console.log(e)
    })

    // await fetch(`https://${process.env.API_HOST}/v2/auth/token/check`, {
    //   method: 'post',
    //   headers: {
    //     'Authorization': `Bearer ${token}`
    //   },
    // }).then(res => {
    //   return res.json()
    // })
    //   .then(data => {
    //     ctx.commit('user/setToken', {
    //       token: token
    //     }, {root: true})
    //   })
  },

  async login(ctx, user) {
    // export async function load(uri, method, data, auth = false){
    //   const token = localStorage.getItem('token');
    //   let headers = {};
    //   const params = {method, headers}
    //
    //   if (data instanceof FormData) {
    //     params.body = data;
    //   } else {
    //     params.headers = {'Content-Type': 'application/json'};
    //     params.headers = {'Accept': 'application/json'};
    //     params.body = Object.keys(data).length ? JSON.stringify(data) : null;
    //   }
    //
    //   if (auth && token) {
    //     params.headers['Authorization'] = 'Bearer ' + token;
    //   }
    //
    //   return fetch(`https://${process.env.API_HOST}${uri}`, params).then(res => {
    //     return res.json()
    //   })
    // }
      await load('/v2/auth/login','post', user).then(data => {
        localStorage.setItem('token', data.accessToken)
        ctx.commit('user/setToken', {
          token: data.accessToken
        }, {root: true})
      }).catch(e => {
        throw e;
      })
    // await fetch(`https://${process.env.API_HOST}/v2/auth/login`, {
    //   method: 'post',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(user)
    // }).then(res => {
    //   return res.json()
    // })
    //   .then(data => {
    //     console.log(data)
    //     if (data.err) {
    //       alert('Error')
    //     } else {
    //       localStorage.setItem('token', data.accessToken)
    //       ctx.commit('user/setToken', {
    //         token: data.accessToken
    //       }, {root: true})
    //     }
    //
    //   }).catch(e => {
    //     console.log(e)
    //   })
  },
  logout(ctx) {
    ctx.commit('user/clearUser', {root: true})
    localStorage.removeItem('token')
  },
  async register(ctx, user) {
    return await load('/users/register','post',  user).then(data => {
      return data;
      /*localStorage.setItem('token', data.accessToken)
        ctx.commit('user/setToken', {
          token: data.accessToken
        }, {root: true})*/
    }).catch(e => {
      throw e;
    })
    // await fetch(`https://${process.env.API_HOST}/users/register`, {
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify(user)
    // }).then(res => {
    //   return res.json()
    // })
    //   .then(data => {
    //     console.log('DATA', data)
    //   })
  },
  async verifySMS(ctx, payload) {
    await load('/users/verify_sms','post', payload).then(data => {
      /*localStorage.setItem('token', data.accessToken)
      ctx.commit('user/setToken', {
        token: data.accessToken
      }, {root: true})*/
    }).catch(e => {
      throw e;
    })
  },
  async recover(ctx, phone) {
    await load('/v2/auth/recover','post',  {phone}).then(data => {

    }).catch(e => {
      throw e;
    })
  },
  async submitRecover(ctx, payload) {
    await load('/v2/auth/recover/code','post',  payload).then(data => {
      localStorage.setItem('token', data.accessToken)
      ctx.commit('user/setToken', {
        token: data.accessToken
      }, {root: true})
    }).catch(e => {
      throw e;
    })
  },
  async updatePassword(ctx, payload) {
    await load('/v2/user/profile/pass','put',  payload, true).then(data => {
    }).catch(e => {
      throw e;
    })
  },
  async userData(ctx) {
    await load('/v2/user/data','get', '',  true).then(data => {
      ctx.commit('user/setDataUser', {
        user: data
      }, {root: true})
    })
  },
  async userFullData(ctx) {
    await load('/v2/user/data/full','get', '',  true).then(data => {
      ctx.commit('user/setUser', {
        user: data
      }, {root: true})
    })
  },

  async userCoins(ctx) {
    await load('/v2/user/balance','get', '',  true).then(data => {
      ctx.commit('user/setCoins', {
        coins: data
      }, {root: true})
    })
  },

  async updateProfile(ctx, payload) {
    await load('/profile/update','patch', payload, true).then(data => {
      return data.json()
    }).catch(e => {
      throw e;
    })
  },

  async addProfilePhoto(ctx, payload) {
    await load('/v2/user/profile/image','put', payload, true).then(data => {
      ctx.commit('user/setProfilePictures', data, {root: true})
      return data
    }).catch(e => {
      throw e;
    })
  },

  async removeAccount(ctx) {
    const myData = {reason: 'wqe qweqwe'}
    await fetch(`https://${process.env.API_HOST}/v2/user`, {
      method: 'delete',
      headers: {
        'Authorization': `Bearer ${ctx.state.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myData)
    }).then(res => {
      ctx.commit("removeToken")
    })
  },

  async removeProfilePhoto(ctx, payload) {
    await load('/v2/user/profile/image','delete', payload, true).then(res => {
      ctx.commit('user/setProfilePictures', res, {root: true})
    })
    .catch(e => {
      throw e;
    })
  },

  async makeProfilePhotoMain(ctx, payload) {
    await load('/v2/user/profile/image/main','put', payload, true).then(data => {
      ctx.commit('user/setProfilePictures', data, {root: true})
    }).catch(e => {
      throw e;
    })
  },

  async userById(ctx, payload) {
    const token = localStorage.getItem('token')
    await fetch(`https://${process.env.API_HOST}/v2/user/${payload}`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then(res => {
      return res.json()
    })
      .then(data => {
        ctx.commit('user/setSelectedUser', data, {root: true})
      })
  },

  async userPreference(ctx) {
    await load('/v2/user/preference','get', '',  true).then(data => {
      ctx.commit('user/setUserPreference', data, {root: true})
    })
  },

  async setUserPreference(ctx, payload) {
    await load('/v2/user/preference','put', payload,  true).then(data => {
      ctx.commit('user/setUserPreference', data, {root: true})
    })
  },
}

export const mutations = {
  removeToken(state) {
    localStorage.removeItem("token")
    state.token = "";
  },
  setInit(state, payload) {
    state.token = payload.token
    state.user = payload.user
  },
  setUser(state, payload) {
    state.user = payload.user;
  },
  setDataUser(state, payload){
    state.userData = payload.user;
  },
  setCoins(state, payload) {
    state.coins = payload.coins;
  },
  setToken(state, payload) {
    state.token = payload.token;
  },
  setSelectedUser(state, payload){
    state.selectedUser = payload
  },
  setProfileField(state, payload){
    for (let key in payload) {
      this._vm.$set(state.user.profile, key, payload[key]);
    }
  },
  setProfilePictures(state, payload){
    state.user.profile.pictures = payload
  },
  setUserPreference(state, payload){
    for (let key in payload) {
      this._vm.$set(state.preference, key, payload[key]);
    }
  },
  clearUser(state) {
    state.user = {}
    state.token = ''
    localStorage.removeItem('token')
  },
}

export const getters = {
  user(state) {
    return state.user
  },
  getUserData(state) {
    return state.userData
  },
  getSelectedUser(state){
    return state.selectedUser
  },
  coins(state){
    return state.coins
  },
  hasToken(state) {
    console.log(state.token)
    return state.token
  },
  getUserPreference(state) {
    return state.preference
  }
}

export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state,
};

