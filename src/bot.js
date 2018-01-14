const fs = require('fs')
const Discord = require("discord.js");
const client = new Discord.Client();

// Components
const Router = require('./components/Router')
const Profile = require('./components/Profile')
const State = require('./components/State')

// get api code from .secret file
let pathToSecret = './.secret'
let secretPromise = new Promise((resolve, reject) => {
  fs.readFile(pathToSecret, 'utf8', (err, secret) => {
    if (err) reject(err)
    client.login(secret)    
    resolve()
  })
})

// Manage session via state class
let sessions = new State('Sessions', {
  hangMan: null,
  profile: null
})
.actions(self => {
  return {
    hangMan: require('./models/BetterHangMan')(self),
    profile: require('./models/Profile')(self)
  }
})

// Add routes
let router = new Router()

router.add(['hangman', 'hangboi'], message => {
  sessions.$actions.hangMan.startSession()
  message.reply('New hang Nep session!');
})

router.add('end me', message => {
  sessions.$actions.hangMan.stopSession()
  message.reply('Ending the hang Nep session')
})

router.add('guess', message => {
  if (!sessions.$actions.hangMan.checkSession())
  {
    return;
  }

  let letter = message.content.split(' ')[1]
  let hangman = sessions.$actions.hangMan.getSession()
  
  hangman.guessLetter(letter, result => {
    message.reply(`${message.author.username} guessed a letter, \n ${result}`)
  })

})

secretPromise.then(_ => {

  // make calls or something, idk
  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setGame('Whatever bot\'s play lole')
  });


  client.on('message', message => {
    // set request and execute router
    router.setRequest(message)
    router.execute()
  });

})
