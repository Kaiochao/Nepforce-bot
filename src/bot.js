const fs = require('fs')
const Discord = require("discord.js");
const client = new Discord.Client();

// Components
const Router = require('./components/Router')
const Profile = require('./components/Profile')
const BetterHangMan = require('./components/BetterHangMan')
const State = require('./components/State')


// get api code from .secret file
let pathToSecret = './.secret'
let secretPromise = new Promise((resolve, reject) => {
  fs.readFile(pathToSecret, "utf8", (err, secret) => {
    if (err) reject(err)
    client.login(secret)    
    resolve()
  })
})

// make sure no new session gets created
// when a session already has started
let sessions = new State('Sessions', {
  hangMan: null,
  profile: null
})
.actions(self => {
  return {
    startHangMan ()
    {
      self.$data.hangMan = new BetterHangMan()
    },
    stopHangMan ()
    {
      self.$data.hangMan = null
    },
    checkHangMan ()
    {
      if (self.$data.hangMan === null)
      {
        return false
      }
      return true
    },
    getHangMan ()
    {
      return self.$data.hangMan
    }
  }
})

// Add routes
let router = new Router()

router.add(['hangman', 'hangboi'], message => {
  sessions.$actions.startHangMan()
  message.reply('New hang Nep session!');
})

router.add('end me', message => {
  sessions.$actions.stopHangMan()
  message.reply('Ending the hang Nep session')
})

router.add('guess', message => {
  if (!sessions.$actions.checkHangMan())
  {
    return;
  }

  let letter = message.content.split(' ')[1]
  let hm = sessions.$actions.getHangMan()
  hm.guessLetter(letter)
  message.reply(`${message.author.username} guessed the letter ${letter}`)
})

secretPromise.then(_ => {

  // make calls or something, idk
  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on('message', message => {
    // set request and execute router
    router.setRequest(message)
    router.execute()
  });

})
