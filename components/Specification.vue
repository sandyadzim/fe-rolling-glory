<template>
  <div class="w-full mb-10">
    <div class="flex items-center space-x-3 border-b border-[#E6E8EE]">
      <div class="text-green-light font-medium pb-3 border-b-[3px] border-green-light">
        Info Produk
      </div>
    </div>
    <div>
      <h4 class="text-xl text-green-dark my-8">
        Rincian
      </h4>
      <div class="description" v-html="description" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpecificationProduct',
  props: {
    description: {
      type: String,
      required: true
    }
  }
}
</script>
