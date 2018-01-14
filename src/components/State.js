/**
 * Use like this:
 * 
 * new State('state1', {
 *  name: 'xxx',
 *  isActive: false
 * })
 * .actions(self => {
 *  return {
 *    toggleActive()
 *    {
 *      self.$data.isActive = !self.$data.isActive
 *    }
 *  }
 * })
 * 
 */
module.exports = class State
{

  /**
   * Generic state management class
   * @param {string} name
   * @param {object} data
   * @param {State} parent
   * @return {self}
   */
  constructor(name, data, parent = null)
  {
    this.$name = name || this._randomName()
    this.$data = data || {}
    this.$actions = {}
    this.$parent = parent || null
    this.$childs = {}
  }

  /**
   * Set actions for state manager
   * @param {callable} actions 
   * @return {self}
   */
  actions (actions)
  {
    this.$actions = actions(this)
    return this
  }

  /**
   * Clone this state
   * @param {string} name
   * @return {State}
   */
  clone (name)
  {
    name = name || this._randomName()
    let state = new State(name, this.$data, this)
    state.$actions = this.$actions
    this.$childs[name] = state
    return state
  }

  /**
   * Get random integer between min and max
   * @param {int} min 
   * @param {int} max 
   * @return {int}
   */
  _randomInt (min = 0, max)
  {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Create random name for state
   * @param {int} len
   * @return {string}
   */
  _randomName (len = 7)
  {
    let possibilities = 'qwertyuiopasdfghjklzxcvbnm'
    possibilities = possibilities.split('')
    let result = ''

    for (let i = 1; i <= len; i++)
    {
      result += possibilities[this._randomInt(0, possibilities.length)]
    }

    return result
  }

}