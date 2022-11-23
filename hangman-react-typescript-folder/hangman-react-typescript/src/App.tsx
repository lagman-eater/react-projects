import { useCallback, useEffect, useState } from 'react'
import { Hangman } from './Components/Hangman'
import { HangmanWord } from './Components/HangmanWord'
import { Keyboard } from './Components/Keyboard'
import words from './words.json'

function getWord(){
  return words[Math.floor(Math.random() * words.length)]
}

function App() {
  const [word, setWord] = useState(() => {
    return words[Math.floor(Math.random() * words.length)]
  })
  // for(let i = 0;i < words.length; i++){
  //   if(words[i].length === 8 && words[i][1] === 'h' && words[i][5] === 'a' && words[i][7] === 'd'){
  //     console.log(words[i]);
  //   }
  // }
  
  console.log(word);
  
  const [letters, setLetters] = useState<string[]>([])

  const incorrectLetters = letters.filter(letter => !word.includes(letter))

  const isLoser = incorrectLetters.length >= 6
  const isWinner = word.split('').every(letter => letters.includes(letter))

  const addGuessedLetter = useCallback((letter: string) => {
    if (letters.includes(letter) || isLoser || isWinner) return

    setLetters(currentLetters => [...currentLetters, letter])
  }, [letters, isWinner, isLoser])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if (!key.match(/^[a-z]$/)) return
      e.preventDefault()

      addGuessedLetter(key)
    }

    document.addEventListener("keypress", handler)
    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [letters])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if(key !== "Enter") return 

      e.preventDefault()
      setLetters([])
      setWord(getWord())
    }

    document.addEventListener("keypress", handler)
    return () => {
      document.removeEventListener("keypress", handler)
    }
  })

  return (
    <div
      style={{
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        margin: '0 auto',
        alignItems: 'center'
      }} className="App">
      <div style={{ fontSize: '2rem', textAlign: 'center' }}>{isWinner && "Winner! - refresh to try again"}{isLoser && 'You have lost, refresh and try again'}</div>
      <Hangman guessNumber={incorrectLetters.length} />
      <HangmanWord reveal={isLoser} letters={letters} word={word} />
      <div style={{ alignSelf: 'stretch' }}>
        <Keyboard 
        disabled={isWinner || isLoser}
        activeLetters={letters.filter(letter => word.includes(letter))} 
        inactiveLetters={incorrectLetters}
        addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  )
}

export default App

