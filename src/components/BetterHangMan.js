const async = require('async')
/**
 * The word is split into an array
 * Checks if letter is in that array
 * if so push the letter on the right index
 */
module.exports = class BetterHangMan
{

  /**
   * @param {int} tries 
   * @return {self}
   */
  constructor(tries = 7)
  {
    this.tries = tries
    this.guessedLetters = []
    this.word = []
    this.result = []
    this.hasWon = null
    this.reactions = {
      win: word => {},
      lose: word => {},
      guess: letter => {}
    }
    this.setWord()
  }

  on (type, callback)
  {
    this.reactions[type] = callback
    return this
  }

  /**
   * Set word to be guessed
   * @param {string} word 
   * @return {self}
   */
  setWord(word = 'test-word')
  {
    this.word = word.split('')
    return this
  }

  /**
   * Check the letter has already been guessed
   * @param {string} letter 
   * @return {bool}
   */
  checkLetterHasBeenGuessed(letter)
  {
    if (this.guessedLetters.includes(letter))
    {
      return true
    }
    else
    {
      this.guessedLetters.push(letter)
      return false
    }
  }

  /**
   * Check letter is in word
   * @param {string} letter
   * @return {bool}
   */
  checkLetterIsInWord(letter, callback)
  {
    let isInWord = false
    let index = 0

    // Check if guessing 1 letter or a word
    if (letter.length === 1)
    {
      // loop through word
      async.each(this.word, (current, _callback) => {

        if (current === letter)
        {
          isInWord = true
          this.result[index] = letter
          // Check word is complete
          if (this.result.join('') === this.word.join(''))
          {
            this.hasWon = true
          }
        }

        index++
        _callback()
      }, err => {
        if (err) throw err
        callback(isInWord)
      })
    }
    else
    {
      // Trying to guess word
      if (this.word.join('') === letter)
      {
        this.hasWon = true
        callback(true)
      }
    }
  }

  /**
   * Guess a letter
   * @param {string} letter 
   * @return {string} message
   */
  guessLetter(letter, callback)
  {

    if (this.checkLetterHasBeenGuessed(letter))
    {
      callback('Letter has already been guessed')
      return
    }

    this.checkLetterIsInWord(letter, isInWord => {
      if (this.hasWon)
      {
        this.reactions.win(this.word.join(''))
        callback(`The word has been guessed, it was "${this.word.join('')}"`)
        return
      }
      else if (isInWord)
      {
        this.reactions.guess(true, letter)
        callback(`The letter "${letter}" is in the word`)
        return
      }
      else
      {
        this.tries--
        if (this.tries === 0)
        {
          this.reactions.lose(this.word.join(''))
          callback(`You have lost, the word was "${this.word.join('')}"`)
        }
        else
        {
          this.reactions.guess(false, letter)
          callback(`The letter "${letter}" is not in the word`)
        }
        return
      }
    })

  }

}