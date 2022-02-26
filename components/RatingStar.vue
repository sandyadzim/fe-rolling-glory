<template>
  <div class="flex items-center space-x-1">
    <div v-for="(i, index) in generateStars(item.attributes.rating)" :key="index">
      <img v-if="i === 'full'" src="~/assets/images/icons/full-star.svg" alt="full-star">
      <img v-else-if="i === 'half'" src="~/assets/images/icons/half-star.svg" alt="half-star">
      <img v-else-if="i === 'empty'" src="~/assets/images/icons/star.svg" alt="star">
    </div>
    <span class="text-[#838EAB] text-xs">{{ item.attributes.numOfReviews }} reviews</span>
  </div>
</template>

<script>
export default {
  name: 'RatingStar',
  props: {
    item: {
      type: [Array, Object],
      required: true
    }
  }
}
</script>
