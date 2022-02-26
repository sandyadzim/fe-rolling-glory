<template>
  <div>
    <div v-if="$fetchState.pending">
      Loading ...
    </div>

    <div v-else-if="$fetchState.error">
      An error occurred :(
    </div>

    <div v-else class="px-3 lg:px-0">
      <!-- Alert -->
      <WishList v-if="wishlist" />

      <!-- Breadcrumb -->
      <BreadCrumb :item-name="items.attributes.name" />

      <!-- Main Content -->
      <div class="flex flex-col lg:flex-row gap-10 mb-5">
        <div class="w-full lg:w-1/2 relative">
          <!-- Ribbon -->
          <RibbonCard :item="items" />
          <div class="p-10">
            <img :src="items.attributes.images[0]" :alt="items.attributes.slug" class="object-contain">
          </div>
        </div>

        <div class="w-full lg:w-1/2">
          <div class="flex flex-col space-y-3">
            <h3 class="text-black-2 font-bold text-2xl">
              {{ items.attributes.name }}
            </h3>
            <!-- Rating -->
            <RatingStar :item="items" />

            <div class="flex items-center space-x-3">
              <!-- Points -->
              <PointItem :point="items.attributes.points" />
              <!-- Stock -->
              <div
                class="text-sm font-semibold"
                :class="[items.attributes.stock >= 5 ? 'text-green-dark' : 'text-[#E7246B]']"
              >
                {{ checkStock(items.attributes) }}
              </div>
            </div>

            <!-- Info -->
            <div class="info" v-html="items.attributes.info" />

            <!-- Quantity -->
            <div class="flex flex-col pb-5">
              <div class="text-sm text-[#838EAB] mb-3">
                Jumlah
              </div>
              <div class="flex items-center font-medium text-[#525F7F]">
                <button class="bg-white-2 w-8 h-9 text-2xl" :disabled="quantity <= 1" @click="quantity = quantity - 1">
                  -
                </button>
                <span class="px-4">{{ quantity }}</span>
                <button class="bg-white-2 w-8 h-9 text-2xl" :disabled="quantity >= items.attributes.stock" @click="quantity = quantity + 1">
                  +
                </button>
              </div>
            </div>

            <!-- Button -->
            <div class="w-full flex items-center space-x-3">
              <button @click="_actionWishlist">
                <img src="~/assets/images/icons/wishlist-detail.svg" alt="wishlist-detail">
              </button>
              <button class="bg-[#006b4f] text-sm rounded-full w-40 h-11 text-white">
                Redeem
              </button>
              <button class="border border-green-light rounded-full w-40 h-11 text-green-light">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Specification -->
      <Specification :description="items.attributes.description" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  data () {
    return {
      items: [],
      isLoading: false,
      isLoadingWishlist: false,
      wishlist: false,
      quantity: 1
    }
  },
  async fetch () {
    await this._actionGetDetail()
  },
  head () {
    return {
      title: this.items?.attributes?.name + ' | Catalog Phone',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.items?.attributes?.description
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.items?.attributes?.name
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `/${this.items?.attributes?.images[0]}`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.items?.attributes?.description
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://fe-test-phone.netlify.app/${this.items?.attributes?.id}`
        }
      ]
    }
  },
  computed: {
    itemId () {
      return this.$route.params.id
    }
  },
  methods: {
    // Get Data
    async _actionGetDetail () {
      try {
        this.isLoading = true
        const url = `/gifts/${this.itemId}`
        const response = await this.$axios.get(url)
        this.isLoading = false
        if (response.status === 200) {
          const { data } = response.data
          this.items = data
        }
      } catch (error) {
        this.isLoading = false
        return error
      }
    },
    // Post Wishlist
    async _actionWishlist () {
      const response = await this.$store.dispatch('wishlist/wishlist', this.itemId)
      if (response.status === 200) {
        this.wishlist = true
        setTimeout(() => {
          this.wishlist = false
        }, 3000)
      }
    }
  }
}
</script>

<style lang="scss">
.info {
  p {
    color: #262626;
    font-size: 14px;
    text-align: justify;
  }
}
.description {
  p {
    font-size: 14px;
    color: #262626;
    line-height: 40px;
  }
}
</style>
