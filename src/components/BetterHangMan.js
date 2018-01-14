module.exports = class BetterHangMan
{

  constructor(tries = 7)
  {
    this.tries = tries
    this.word = this.setWord()
    this.guessedLetters = []
    this.correctLetters = []
    this.notCorrectLetters = []
    this.template = ''

    for (let i = 0; i < this.word.length; i++)
    {
      this.template += '_'
    }

  }

  setWord ()
  {
    return 'test-word'
  }

  guessLetter(letter)
  {
    let index = this.word.indexOf(letter)
    if (index !== -1)
    {
      this.guessedLetters.push(letter)
      this.correctLetters.push(letter)
    }
    else
    {
      this.guessedLetters.push(letter)
      this.notCorrectLetters.push(letter)
      this.tries--
    }

  }

}