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
    this.setWord()
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
        if (err) { console.log(err) }
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
    }

    this.checkLetterIsInWord(letter, isInWord => {
      if (this.hasWon)
      {
        callback(`The word has been guessed, it was "${this.word.join('')}"`)
      }
      else if (isInWord)
      {
        callback(`The letter "${letter}" is in the word`)
      }
      else
      {
        callback(`The letter "${letter}" is not in the word`)
      }
    })

  }

}