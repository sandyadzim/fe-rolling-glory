import Vue from 'vue'

Vue.mixin({
  methods: {
    // Helper Stock
    checkStock (item) {
      if (item.stock >= 5) {
        return 'In Stock'
      } else if (item.stock < 5 && item.stock >= 1) {
        return 'Stock < 5'
      } else if (item.stock === 0) {
        return 'Sold Out'
      }
    },
    // Helper Ribbon
    isNew (item) {
      return item.isNew === 1
    },
    isBestSeller (item) {
      return item.rating >= 4 && item.numOfReviews > 25
    },
    isNewAndBest (item) {
      return this.isNew(item) && this.isBestSeller(item)
    },
    // Helper Round Rating
    roundRating (rating) {
      return Math.round(rating * 2) / 2
    },

    // Create Stars
    generateStars (rating) {
      const stars = []
      const roundRating = this.roundRating(rating)
      for (let i = 0; i < 5; i++) {
        if (roundRating - i === 0.5) {
          stars.push('half')
        } else if (i <= roundRating - 1) {
          stars.push('full')
        } else {
          stars.push('empty')
        }
      }
      return stars
    },
    withComma (value) {
      if (typeof value === 'undefined') {
        return ''
      } else {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      }
    }
  }
})
