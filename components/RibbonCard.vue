<template>
  <div class="absolute top-[-6px] right-[-6px]">
    <img v-if="isNewAndBest(item.attributes)" src="~/assets/images/hot-item.png" alt="hot-item">
    <img v-else-if="isNew(item.attributes)" src="~/assets/images/new-item.png" alt="new-item">
    <img v-else-if="isBestSeller(item.attributes)" src="~/assets/images/best-seller.png" alt="best-seller">
  </div>
</template>

<script>
export default {
  name: 'RibbonCard',
  props: {
    item: {
      type: [Array, Object],
      required: true
    }
  }
}
</script>
