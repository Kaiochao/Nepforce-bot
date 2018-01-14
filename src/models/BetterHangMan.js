const BetterHangMan = require('./../components/BetterHangMan')

module.exports = self => {
  return {
    startHangMan() {
      self.$data.hangMan = new BetterHangMan()
    },
    stopHangMan() {
      self.$data.hangMan = null
    },
    checkHangMan() {
      if (self.$data.hangMan === null) {
        return false
      }
      return true
    },
    getHangMan() {
      return self.$data.hangMan
    }
  }
}
