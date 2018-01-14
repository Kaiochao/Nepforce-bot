module.exports = class Router
{

  /**
   * @return {self}
   */
  constructor()
  {
    this.routes = []
  }

  /**
   * Add a path to router
   * @param {string} path
   * @param {array} path 
   * @param {callable} callback
   * @return {self} 
   */
  add(path, callback)
  {
    if (typeof path === 'object')
    {
      path.forEach(item => {
        this.routes[item] = callback
      });
    }
    else
    {
      this.routes[path] = callback
    }
    return this
  }

  /**
   * Set request property
   * @param {object} request 
   * @return {self}
   */
  setRequest(request)
  {
    this.request = request
    return this
  }

  /**
   * Execute routes
   * @return {callable}
   */
  execute()
  {
    if (this.request.author.bot)
    {
      return
    }

    for (let route in this.routes)
    {
      let callback = this.routes[route]
      if (this.request.content.indexOf(route) !== -1)
      {
        return callback(this.request)
      }
    }
  }

}