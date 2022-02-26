<template>
  <nav class="flex items-center space-x-2 text-black-2 text-sm mb-5 cursor-pointer">
    <div @click="_actionBack">
      List Product
    </div>
    <div>></div>
    <div>{{ itemName }}</div>
  </nav>
</template>

<script>
export default {
  name: 'BreadCrumb',
  props: {
    itemName: {
      type: String,
      required: true
    }
  },
  methods: {
    _actionBack () {
      this.$router.push('/')
    }
  }
}
</script>
