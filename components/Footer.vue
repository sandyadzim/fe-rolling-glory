<template>
  <footer class="bg-[#232323]">
    <div class="max-w-screen-lg mx-auto py-10">
      <div class="flex items-center justify-between flex-col lg:flex-row space-y-6 lg:space-y-0">
        <div class="flex space-x-6">
          <img src="~/assets/images/icons/ig.svg" alt="ig">
          <img src="~/assets/images/icons/fb.svg" alt="fb">
          <img src="~/assets/images/icons/twt.svg" alt="twt">
        </div>
        <div>
          <div class="flex lg:flex-row flex-col text-center lg:space-x-6 text-white text-sm">
            <p>Terms & Condition</p>
            <p class="lg:block hidden">
              |
            </p>
            <p>Copyright © 2018. All rights reserved. PT Radya Gita Bahagi</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterSection'
}
</script>
