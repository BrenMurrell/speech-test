import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchFruits } from '../actions'

const App = (props) => {
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
  var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
  var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

  const [ fruits, setFruits ] = useState([])
  const [ recog, setRecog ] = useState()
  const recognition = new SpeechRecognition()
  recognition.continuous = true
  const synth = window.speechSynthesis

  useEffect(() => {
    // props.dispatch(fetchFruits())
  },[])

  const readThePara = () => {
    const speechText = document.getElementById('speech').textContent
    const utterThis = new SpeechSynthesisUtterance(speechText)
    synth.speak(utterThis)
  }
  const startRecog = () => {
    setRecog()
    console.log('start recog')
    recognition.start()
  }

  const stopRecog = () => {
    console.log('stop recog')
    recognition.stop()
  }

  recognition.onresult = function(event) {
    console.log(event.results[0][0].transcript)
    setRecog(event.results[0][0].transcript)
  }

  return (
    <div className='app'>
      <h1>Fullstack Boilerplate - with Fruits!</h1>
      <ul>
        {/* {props.fruits.map(fruit => (
          <li key={fruit}>{fruit}</li>
        ))} */}
        <p id="speech">
          This is the thing that my app will say
        </p>
        <button onClick={() => readThePara()}>Read paragraph</button>
        <p>And I replied with:<br/>
          {recog}
        </p>
        {/* <input type="text" id="recog" placeholder="your voice here..." value={recog}></input> */}
        <button onClick={() => startRecog()}>Start recog</button>
        <button onClick={() => stopRecog()}>Stop recog</button>
      </ul>
    </div>
  )
}

function mapStateToProps (globalState) {
  return {
    fruits: globalState.fruits
  }
}

export default connect(mapStateToProps)(App)
