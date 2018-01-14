const fs = require('fs')
const Discord = require("discord.js");
const client = new Discord.Client();
const Router = require('./components/Router')

// Bot functionality
const BetterHangMan = require('./components/BetterHangMan')

let pathToSecret = './.secret'

// get api code from .secret file
let secretPromise = new Promise((resolve, reject) => {
  fs.readFile(pathToSecret, "utf8", (err, secret) => {
    if (err) reject(err)
    client.login(secret)    
    resolve()
  })
})

// make sure no new session gets created
// when a session already has started
let sessions = {
  hangMan: null
}

/**
 * Add routes
 */
let router = new Router()
router.add(['hangman', 'hangboi'], message => {
  sessions.hangMan = new BetterHangMan()
  message.reply('New hang Nep session!');
})

router.add('end me', message => {
  sessions.hangMan = null
  message.reply('Ending the hang Nep session')
})

router.add('guess', message => {
  if (sessions.hangMan === null)
  {
    return;
  }

  let letter = message.content.split(' ')[1]
  sessions.hangMan.guessLetter(letter)
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
