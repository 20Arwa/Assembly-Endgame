import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/header'
import Language from './components/Language'
import Keyboard from './components/Keyboard'
import {languagesData} from './data/languagesData'
import { getLostPhrase } from './data/lostPhrases'
import { generate } from "random-words";
import ReactConfetti from 'react-confetti'

function App() {
  // Pressed Letters
  const [pressedRight, setPressedRight] = useState([]) 
  const [pressedWrong, setPressedWrong] = useState([])

  // Answer Word
  const [AnsWord, setAnsWord] = useState(() => generate({ exactly: 1, minLength: 3, maxLength: 6})[0].toUpperCase())

  // Game Status
  const [gameStatus, setGameStatus] = useState("none")

  // Win Status
  useEffect(() => {
    if (AnsWord.split("").every((letter) => pressedRight.includes(letter))) 
      setGameStatus("win")
  }, [pressedRight])
  
  // Lost Status
  useEffect(() => {
    if (pressedWrong.length == languagesData.length) {
      setGameStatus("lost")
    }
    else if (pressedWrong.length > 0) {
      setGameStatus("wrong")
    }
    else {
      setGameStatus("none")
    }
  }, [pressedWrong])

  // Programming Languages Elements
  const langELements = languagesData.map((lang, index) => {
    return <Language 
      key={lang.id}   
      name={lang.name} 
      bgColor={lang.bgColor} 
      color={lang.color} 
      isLost={pressedWrong.length > index ? true : false} />
  })

  // Answer Letters Elements
  const AnswLetterEles =  AnsWord.split("").map((letter, index) => {
    return <span 
      className= {`answer-letters me-1 p-2 px-3 fs-5 ${pressedRight.includes(letter) ? "text-white" : "text-danger"}`}
      key={index}
      >
        { gameStatus == "lost" ? letter :
          pressedRight.includes(letter) ? letter : ""
        }
    </span>
  })

  // Click On Keyboard Letters
  function checkLetter(letter) {
    if (AnsWord.includes(letter)) {
      setPressedRight(prev => [...prev, letter]) 
      setGameStatus("none")
    }
    else {
      setPressedWrong(prev => [...prev, letter])
    }
  }

  // Click On New Game Button
  function newGame() {
    setPressedRight([])
    setPressedWrong([])
    setGameStatus("none")
    setAnsWord(generate({ exactly: 1, minLength: 3, maxLength: 6})[0].toUpperCase())
  }

  return (
    <>
    <div className="container-div mx-auto">
      <Header />
      <main>
        {/* Confetti */}
        {gameStatus == "win" && <ReactConfetti/> }

        {/* Game Status */}
        <div aria-live='polite' role='status'
          className={` game-status mx-auto my-4 d-flex flex-column justify-content-center rounded 
            ${gameStatus == "win" ? "bg-success" :
            gameStatus == "lost" ? "bg-danger" :
            gameStatus == "wrong" ? "bg-wrong" : ""
            }`}
          style={{opacity: gameStatus == "none" ? 0 : 1}}
          >
          <h5 className='mb-0'>{
            gameStatus == "win" ? "You Win!" :
            gameStatus == "lost" ? "Game Over!" :
            gameStatus == "wrong" ? getLostPhrase(languagesData[pressedWrong.length - 1]?.name) : ""
          }</h5>

          {gameStatus == "win" && <p className='mb-0'>Well Done!🎉</p>}
          {gameStatus == "lost" && <p className='mb-0'>You Lost!😭 Try again</p>}
        </div>

        {/* Programming Languages */}
        <div className="prog-langs mx-auto">
          {langELements}
        </div>
        
        {/* The Word */}
        <div className="word my-5 d-flex justify-content-center">
          {AnswLetterEles}
        </div>

        {/* Keyboard */}
        <div className="keyboard mx-auto d-flex flex-wrap justify-content-center">
            <Keyboard pressedRight={pressedRight} pressedWrong={pressedWrong} checkLetter={checkLetter} gameStatus={gameStatus} />
        </div>

        {/* New Game Button */}
        { (gameStatus == "win" || gameStatus == "lost") &&
          <button className='new-game-btn py-2 px-5 mt-4 rounded' onClick={() => newGame()}>New Game</button>      
        }

        {/* visually-hidden aria-live */}
        <div className="visually-hidden" role="status" aria-live="polite">
          <p>You have {languagesData.length - pressedWrong.length} attempts left</p>
        </div>

      </main>
    </div>
    </>
  )
}
export default App
