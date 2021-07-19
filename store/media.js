
export const state = () => ({
  images: [],

})

export const actions = {
  async uploadImage(ctx, payload) {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file',payload);

   return await fetch(`https://${process.env.API_HOST}/v2/temp-file`, {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData
    })
  },

}

export const mutations = {
  setImages(state, payload) {
    state.images.push(payload)
  },
}

export const getters = {

}

export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state,
};

