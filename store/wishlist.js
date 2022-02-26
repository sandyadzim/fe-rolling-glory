export const state = () => ({
  wishlist: {}
})

export const mutations = {
  setWishlist (state, data) {
    state.wishlist = data
  }
}
export const actions = {
  async wishlist ({ commit }, value) {
    try {
      const url = `/gifts/${value}/wishlist`
      const response = await this.$axios.post(url)
      if (response.status === 200) {
        commit('setWishlist', response.data)
      }
      return response
    } catch (error) {
      return error
    }
  }
}
export const getters = {
  wishlist: (state) => {
    return state.wishlist
  }
}
