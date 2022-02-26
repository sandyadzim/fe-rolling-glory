<template>
  <div>
    <div class="flex flex-col lg:flex-row px-3">
      <!-- Alert -->
      <WishList v-if="wishlist" />
      <!-- Content -->
      <FilterMenu :options="optionsFilter" @selected="handleSelect" />
      <div class="w-full lg:w-3/4">
        <div class="flex items-center justify-between border-b border-gray-5 pb-3 mb-5">
          <h3 class="text-lg font-bold text-black-3">
            Product List
          </h3>
          <FilterSort :selected="selectedSort" :list="listSorting" @selected="handleSort" />
        </div>
        <div v-if="!isLoading">
          <div class="grid gap-4 grid-cols-2 lg:grid-cols-3">
            <div
              v-for="item in filteredData"
              :key="item.id"
              class="group bg-white relative overflow-hidden h-full border border-gray-d-8 rounded-md p-6"
            >
              <!-- Ribbon -->
              <RibbonCard :item="item" />
              <div>
                <!-- Stock -->
                <div
                  class="text-xs font-semibold"
                  :class="[item.attributes.stock >= 5 ? 'text-[#79B625]' : 'text-[#E64580]']"
                >
                  {{ checkStock(item.attributes) }}
                </div>
                <!-- Image -->
                <div class="flex h-60 my-2">
                  <img :src="item.attributes.images[0]" :alt="item.attributes.slug" class="object-contain">
                </div>
                <!-- Name -->
                <h3 class="text-black-3">
                  {{ item.attributes.name }}
                </h3>
                <!-- Info -->
                <div class="flex flex-col lg:flex-row justify-between">
                  <div class="flex flex-col">
                    <!-- Points -->
                    <PointItem :point="item.attributes.points" />
                    <!-- Rating -->
                    <RatingStar :item="item" />
                  </div>
                  <!-- Wishlist -->
                  <div class="flex justify-center mt-5 lg:mt-0 lg:items-end">
                    <img v-if="item.attributes.isWishlist === 0" src="~/assets/images/icons/wishlist.svg" alt="wishlist">
                    <img v-else src="~/assets/images/icons/wishlist-pink.svg" alt="wishlist-pink">
                  </div>
                </div>
              </div>
              <CardOverlay v-if="item.attributes.stock > 0" :item="item" @wishlist="handleWishlist" />
              <div v-else class="card-stock" />
            </div>
          </div>
          <!-- Pagination -->
          <Pagination :page-number="pageNumber" :total-pages="totalPages" @page="handlePage" />
        </div>
        <div v-else>
          Loading ...
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      listSorting: [
        {
          text: 'Terbaru',
          value: 'isNew'
        },
        {
          text: 'Ulasan',
          value: 'rating'
        }
      ],
      selectedSort: {
        text: 'Terbaru',
        value: 'isNew'
      },
      optionsFilter: [
        {
          text: 'Rating 4 ke atas',
          value: 'review'
        },
        {
          text: 'Stock tersedia',
          value: 'stock'
        }
      ],
      selectFilter: [],
      items: [],
      isLoading: false,
      totalEntity: 0,
      totalPages: 0,
      innerPage: Number(this.$route.query.page) || 1,
      innerSize: Number(this.$route.query.per_page) || 10,
      wishlist: false
    }
  },
  head () {
    return {
      title: 'Product List | Catalog Phone'
    }
  },
  computed: {
    pageNumber: {
      get () {
        return this.innerPage
      },
      set (newVal) {
        if (newVal !== this.pageNumber) {
          this.innerPage = newVal
          this.helperPath()
        }
      }
    },
    pageSize: {
      get () {
        return this.innerSize
      },
      set (newVal) {
        if (newVal !== this.pageSize) {
          this.innerSize = newVal
          this.helperPath()
        }
      }
    },
    sortedData () {
      const isSelect = this.selectedSort.value
      const items = this.items
      if (isSelect === 'isNew') {
        return items.sort((a, b) => b.attributes.isNew - a.attributes.isNew)
      } else if (isSelect === 'rating') {
        return items.sort((a, b) => b.attributes.rating - a.attributes.rating)
      } else {
        return items
      }
    },
    filteredData () {
      const items = this.sortedData
      if (this.selectFilter.length) {
        if (this.selectFilter.length === 2) {
          return items.filter(e => e.attributes.stock > 0 && e.attributes.rating >= 4)
        } else if (this.selectFilter[0] === 'stock') {
          return items.filter(e => e.attributes.stock > 0)
        } else {
          return items.filter(e => e.attributes.rating >= 4)
        }
      } else {
        return items
      }
    }
  },
  mounted () {
    this._actionGetProduct()
  },
  methods: {
    // Get Data
    async _actionGetProduct () {
      try {
        this.isLoading = true
        const params = String(`page[number]=${this.pageNumber}&page[size]=${this.pageSize}`)
        const url = '/gifts?' + params
        const response = await this.$axios.get(url)
        this.isLoading = false
        if (response.status === 200) {
          const data = response.data
          this.items = data.data

          const meta = data.meta
          this.totalEntity = meta.totalItems
          this.totalPages = Math.ceil(this.totalEntity / this.pageSize)
          if (this.pageNumber > this.totalPages) {
            this.pageNumber = 1
          }
        }
      } catch (error) {
        this.isLoading = false
        return error
      }
    },

    // Helper for Query
    helperPath () {
      this.$router.push({
        path: '/',
        query: {
          page: String(this.pageNumber),
          per_page: String(this.pageSize)
        }
      })

      this._actionGetProduct()
    },

    handleSelect (value) {
      this.selectFilter = value
    },

    handleSort (value) {
      this.selectedSort = {
        text: value.text,
        value: value.value
      }
    },

    handlePage (value) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      this.pageNumber = value
    },

    handleWishlist (value) {
      this.wishlist = value
      setTimeout(() => {
        this.wishlist = false
      }, 3000)
    }
  }
}
</script>

<style lang="scss" scoped>
.card-overlay {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width:100%;
  height:100%;
  background: linear-gradient(180deg, #74b71b, #649c1a);
  padding: 20px;
  position:absolute;
  left:0;
  top: 100%;
  z-index: 1;
  transition:all 350ms cubic-bezier(0, 0, 0.2, 1);
}

.card-stock {
  display: flex;
  // align-items: center;
  width:100%;
  height:100%;
  background: #E1E8EE;
  padding: 20px;
  position:absolute;
  left:0;
  top: 0;
  z-index: 1;
  opacity: 0.73;
}
</style>
