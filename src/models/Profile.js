const Profile = require('./../components/Profile')

module.exports = self => {
  return {
    startSession()
    {
      self.$data.profile = new Profile()
    },
    stopSession()
    {
      self.$data.profile = null
    },
    checkSession()
    {
      if (self.$data.profile === null)
      {
        return false
      }
      return true
    },
    getSession()
    {
      return self.$data.profile
    }
  }
}