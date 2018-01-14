const BetterHangMan = require('./../components/BetterHangMan')

module.exports = self => {
  return {
    startSession()
    {
      self.$data.hangMan = new BetterHangMan()
    },
    stopSession()
    {
      self.$data.hangMan = null
    },
    checkSession()
    {
      if (self.$data.hangMan === null) {
        return false
      }
      return true
    },
    getSession()
    {
      return self.$data.hangMan
    }
  }
}
