<template>
  <div>
    <!-- Sorting Type -->
    <div class="group flex items-center relative">
      <span class="text-gray-8 text-xs font-medium mr-5 hidden lg:block">Urutkan</span>
      <div class="w-40 flex items-center justify-center border border-gray-9 rounded-full py-2 cursor-pointer">
        <span class="text-xs text-[#838383] mr-6">{{ selected.text }}</span>
        <img src="~/assets/images/icons/sort.svg" alt="sort">
      </div>
      <!-- List Sorting -->
      <div class="bg-white border rounded-lg border-gray-9 absolute right-0 top-9 w-40 z-10 px-4 transform scale-0 group-hover:scale-100 transition duration-150 ease-in-out">
        <div
          v-for="sort in list"
          :key="sort.value"
          class="flex items-center justify-between py-4 cursor-pointer border-b-[0.5px] last:border-b-0"
          @click="_actionChangeSort(sort)"
        >
          <span
            class="text-xs text-gray-8 hover:text-black-3"
            :class="{'font-bold': sort.text === selected.text}"
          >
            {{ sort.text }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterSort',
  props: {
    selected: {
      type: [Array, Object],
      required: true
    },
    list: {
      type: [Array, Object],
      required: true
    }
  },
  methods: {
    _actionChangeSort (selected) {
      const data = {
        text: selected.text,
        value: selected.value
      }
      this.$emit('selected', data)
    }
  }
}
</script>
