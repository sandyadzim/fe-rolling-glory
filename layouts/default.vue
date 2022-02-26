<template>
  <section class="w-full font-base">
    <!-- Header -->
    <Header />
    <!-- Content -->
    <div class="relative min-h-screen mt-10">
      <div class="max-w-screen-lg mx-auto">
        <Nuxt />
      </div>
      <div class="overlay w-full h-[690px] bg-center bg-cover absolute bottom-0 z-[-10]" />
    </div>
    <!-- Footer -->
    <Footer />
  </section>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
.overlay {
  background: url('~/assets/images/overlay.svg');
}
</style>
