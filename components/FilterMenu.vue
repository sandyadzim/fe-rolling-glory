<template>
  <div class="w-full lg:w-1/4 lg:pr-10 mb-5">
    <div class="border-b border-gray-5 pb-[18px]">
      <h3 class="text-lg font-bold text-black-3">
        Filter
      </h3>
    </div>
    <div class="border border-gray-d-8 rounded mt-5 px-4 py-6 space-y-3">
      <div
        v-for="filter in options"
        :key="filter.value"
      >
        <div class="flex items-center justify-between">
          <div>
            <span class="text-sm text-gray-8">{{ filter.text }}</span>
          </div>
          <input
            v-model="selectFilter"
            type="checkbox"
            :value="filter.value"
            class="scale-125"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterMenu',
  props: {
    options: {
      type: [Array, Object],
      required: true
    }
  },
  data () {
    return {
      selectFilter: []
    }
  },
  watch: {
    selectFilter (newVal) {
      this.$emit('selected', newVal)
    }
  }
}
</script>
