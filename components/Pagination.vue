<template>
  <div class="flex justify-center space-x-3 my-5">
    <button :disabled="canPrev === false" @click="goPrev">
      <img src="~/assets/images/icons/chevron-left.svg" alt="chevron-left">
    </button>
    <div class="border border-gray-9 rounded text-black-3 font-semibold px-3">
      {{ pageNumber }}
    </div>
    <button :disabled="canNext === false" @click="goNext">
      <img src="~/assets/images/icons/chevron-right.svg" alt="chevron-right">
    </button>
  </div>
</template>

<script>
export default {
  name: 'PaginationPage',
  props: {
    pageNumber: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      default: 0
    }
  },
  computed: {
    canNext () {
      return this.pageNumber < this.totalPages
    },
    canPrev () {
      return this.pageNumber > 1
    }
  },
  methods: {
    goNext () {
      const page = this.pageNumber + 1
      this.$emit('page', page)
    },
    goPrev () {
      const page = this.pageNumber - 1
      this.$emit('page', page)
    }
  }
}
</script>
