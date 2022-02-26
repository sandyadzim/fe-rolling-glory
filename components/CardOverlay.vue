<template>
  <div class="card-overlay group-hover:top-0">
    <span class="text-xs font-semibold text-white">
      {{ checkStock(item.attributes) }}
    </span>
    <div class="flex flex-col space-y-5">
      <div class="text-white ">
        {{ item.attributes.name }}
      </div>
      <button
        class="w-full flex justify-center border border-white rounded-full py-2 text-sm text-white hover:text-black hover:bg-white"
        @click="_actionDetail(item.attributes.id)"
      >
        View Detail
      </button>
    </div>
    <button class="self-end" @click="_actionWishlist(item.attributes.id)">
      <img v-if="item.attributes.isWishlist === 0" src="~/assets/images/icons/wishlist.svg" alt="wishlist">
      <img v-else src="~/assets/images/icons/wishlist-pink.svg" alt="wishlist-pink">
    </button>
  </div>
</template>

<script>
export default {
  name: 'CardOverlay',
  props: {
    item: {
      type: [Array, Object],
      required: true
    }
  },
  methods: {
    // Go to Detail Page
    _actionDetail (itemId) {
      this.$router.push(`/product/${itemId}`)
    },

    // Post Wishlist
    async _actionWishlist (itemId) {
      const response = await this.$store.dispatch('wishlist/wishlist', itemId)
      if (response.status === 200) {
        this.$emit('wishlist', true)
      }
    }
  }
}
</script>
