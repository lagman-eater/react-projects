import React, { useEffect, useState } from 'react'
import './styles.css'

const arr = ['APPLEA', 'ANONOSL', 'AROMEL', 'ALOHU', 'ALKEN']

function App() {
  const [word, setWord] = useState()
  const [attempt, setAttempt] = useState(5)

  useEffect(() => {
    setWord([...arr[Math.floor(Math.random() * arr.length)]])
    if (attempt === 0) setAttempt(5)
  }, [attempt === 0])

  function handleClick(e) {
    let check = false
    e.target.disabled = true
    for (let i = word.length - 1; i >= 0; i--) {
      if (word[i] === e.target.value) {
        console.log(word[i]);
        word.splice(i, 1)
        check = true
      }
      check ? setAttempt(attempt + 1) : setAttempt(attempt - 1)
    }
  }




  return (
    <div className='cont'>
      <div className="App">You have {attempt} attempts left</div>
      <div className='word'>
        {word && word.map((letter) => {
          return (
            <div
            style={{color: '#FFF'}}
            // style={hidden ? { color: '#fff' } : { color: '#000' }}
            >{letter}</div>
          )
        })}
      </div>
      <div className='buttons'>
        <button onClick={handleClick} value="A">A</button>
        <button onClick={handleClick} value="B">B</button>
        <button onClick={handleClick} value="C">C</button>
        <button onClick={handleClick} value="D">D</button>
        <button onClick={handleClick} value="E">E</button>
        <button onClick={handleClick} value="F">F</button>
        <button onClick={handleClick} value="G">G</button>
        <button onClick={handleClick} value="H">H</button>
        <button onClick={handleClick} value="I">I</button>
        <button onClick={handleClick} value="J">J</button>
        <button onClick={handleClick} value="K">K</button>
        <button onClick={handleClick} value="L">L</button>
        <button onClick={handleClick} value="M">M</button>
        <button onClick={handleClick} value="N">N</button>
        <button onClick={handleClick} value="O">O</button>
        <button onClick={handleClick} value="P">P</button>
        <button onClick={handleClick} value="Q">Q</button>
        <button onClick={handleClick} value="R">R</button>
        <button onClick={handleClick} value="S">S</button>
        <button onClick={handleClick} value="T">T</button>
        <button onClick={handleClick} value="U">U</button>
        <button onClick={handleClick} value="V">V</button>
        <button onClick={handleClick} value="W">W</button>
        <button onClick={handleClick} value="X">X</button>
        <button onClick={handleClick} value="Y">Y</button>
        <button onClick={handleClick} value="Z">Z</button>
        <button onClick={handleClick} value="V">V</button>
      </div>
    </div>
  );
}

export default App;
