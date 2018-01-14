const fs = require('fs')
const os = require("os")

const Discord = require("discord.js")
const client = new Discord.Client()

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

// New hangman instance
router.add(['hangman', 'hangboi'], message => {
  sessions.$actions.hangMan.startSession()

  // Reactive callbacks
  let instance = sessions.$actions.hangMan.getSession()

  instance.on('win', word => {
    message.reply(`You guessed the word ${word}`)
  })
  
  instance.on('lose', word => {
    message.reply(`You lost, the word was ${word}`)
  })

  instance.on('guess', (isRight, letter) => {
    if (isRight)
    {
      message.reply(`The letter ${letter} is in the word`)
    }
    else
    {
      message.reply(`The letter ${letter} is not in the word`)
    }
  })

  message.reply('New hang Nep session!');
})

// Stop hangman instance
router.add('end me', message => {
  sessions.$actions.hangMan.stopSession()
  message.reply('Ending the hang Nep session')
})

// add a word to hangman
router.add('add word', message => {
  let content = message.content.split(' ')
  let word = content[2]
  let path = './src/data/words.csv'
  let attachments = message.attachments.array()
  let img = ''

  if (attachments.length > 0)
  {
    img = attachments[0]['url']
  }

  if (word === '' || typeof word === 'undefined')
  {
    return
  }

  // make sure its a image from cdn
  if (img.indexOf('https://') === -1)
  {
    img = ''
  }

  // append to csv file
  fs.appendFile(path, `${os.EOL}${word},${img}`, 'utf8', err => {
    if (err) throw err
    message.reply(`Added ${word} to the list`)
  })
})

// Guess a letter or word
router.add('guess', message => {
  if (!sessions.$actions.hangMan.checkSession())
  {
    return;
  }

  let letter = message.content.split(' ')[1]
  let hangman = sessions.$actions.hangMan.getSession()
  
  hangman.guessLetter(letter, _ => {})
})

// Watch Discord messages
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
