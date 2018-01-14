const fs = require('fs')
const Discord = require("discord.js");
const client = new Discord.Client();

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

secretPromise.then(_ => {

  // make calls or something, idk
  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  let hangManInstance = null
  client.on('message', msg => {
    if (msg.content === 'hangNep')
    {
      hangManInstance = new BetterHangMan()
      msg.reply('New hang Nep session!');
    }

    if (msg.content === 'end me')
    {
      msg.reply('Ending the hang Nep session')
      hangManInstance = null
    }

    if (hangManInstance !== null && msg.content.length === 1)
    {
      hangManInstance.guessLetter(msg.content)
      msg.reply(`Guessed letter ${msg.content} you ${hangManInstance.tries} tries left`)
    }

  });

})
