import {load} from '@/plugins/api'


export const state = () => ({
  user: {},
  userData: {},
  selectedUser:[],
  coins:{},
  token: '',
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
    await load('/users/register','post',  user).then(data => {
      localStorage.setItem('token', data.accessToken)
        ctx.commit('user/setToken', {
          token: data.accessToken
        }, {root: true})
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
      return data
    }).catch(e => {
      throw e;
    })
  },

  async removeProfilePhoto(ctx, payload) {
    await fetch(`https://${process.env.API_HOST}/v2/user/profile/image`, {
      method: 'delete',
      headers: {
        'Authorization': `Bearer ${ctx.state.token}`
      },
      body: JSON.stringify(payload)
    }).then(res => {
      return res.json()
    })
      .then(data => {
        console.log(data)
        // ctx.commit('user/setCoins', {
        //   coins: data
        // }, {root: true})
      })
  },

  async makeProfilePhotoMain(ctx, payload) {
    await load('/v2/user/profile/image/main','put', payload, true).then(data => {
      return data.json()
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
}

export const mutations = {
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
      state.user.profile.key = payload[key];
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
  }
}

export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state,
};

