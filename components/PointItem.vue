<template>
  <div class="flex items-center space-x-2">
    <img src="~/assets/images/icons/point-detail.svg" alt="point">
    <div class="text-green-light text-sm">
      {{ withComma(point) }} points
    </div>
  </div>
</template>

<script>
export default {
  name: 'PointItem',
  props: {
    point: {
      type: Number,
      required: true
    }
  }
}
</script>
