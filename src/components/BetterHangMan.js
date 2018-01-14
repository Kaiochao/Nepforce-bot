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
  }

  /**
   * Set word to be guessed
   * @param {string} word 
   * @return {self}
   */
  setWord (word)
  {
    this.word = word.split('') || 'test-word'.split('')
    return this
  }

  /**
   * Guess a letter
   * @param {string} letter 
   * @return {string} message
   */
  guessLetter(letter)
  {
    let str = ''
    if (this.guessedLetters.includes(letter))
    {
      str = `Letter ${letter} has already been guessed`
    }

    if (this.word.indexOf(letter) !== -1)
    {
      str = `Letter ${letter} is in the word`
    }
    else
    {
      this.tries--
      str = `Letter ${letter} is not in the word`
    }
    this.guessedLetters.push(letter)
    return str
  }

}