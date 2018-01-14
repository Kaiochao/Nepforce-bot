
const fs = require('fs')
const Discord = require("discord.js");
const client = new Discord.Client();


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

  client.on('message', msg => {
    if (msg.content === 'ping') {
      msg.reply('Pong!');
    }
  });

})
