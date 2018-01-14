module.exports = class Router
{

  constructor()
  {
    this.routes = []
  }

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

  setRequest(request)
  {
    this.request = request
    return this
  }

  execute()
  {
    if (this.request.author.bot)
    {
      return
    }

    for (let route in this.routes)
    {
      let callback = this.routes[route]
      if (this.request.content.includes(route))
      {
        callback(this.request)
      }
    }
  }

}