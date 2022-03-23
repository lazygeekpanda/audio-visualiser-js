// @ts-nocheck
import React, { useEffect, useState, createRef } from 'react'

const useAudio = (url: string) => {
  const [audio] = useState<HTMLAudioElement>(new Audio(url))
  const [playing, setPlaying] = useState(false)

  const toggle = () => setPlaying(!playing)

  useEffect(() => {
    playing ? audio.play() : audio.pause()
  }, [playing])

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false))
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false))
    }
  }, [])

  return [audio, playing, toggle]
}

const App: React.FC = () => {
  const [audio, playing, toggle]: any = useAudio(require('assets/audio/Egzod_Royalty.mp3'))
  const canvasRef = createRef<any>()
  const ctx = createRef<any>()
  const audioContext = createRef<AudioContext>()
  const analyser = createRef<AnalyserNode>()

  const data = createRef<any[]>()

  const requestRef = React.createRef()

  useEffect(() => {
    createAudioContext()
    return () => cancelAnimationFrame(requestRef.current)
  }, [])

  const animate = (time) => {
    requestAnimationFrame(animate)
    analyser.current.getByteFrequencyData(data.current)
    draw(data.current)
  }

  function draw(dt) {
    const dataArray = dt
    ctx.current.clearRect(
      0,
      0,
      500,
      500
    )
    let space = 500 / data.current.length
    dataArray.forEach((value, i) => {
      ctx.current.beginPath()
      ctx.current.moveTo(space * i, 500) //x,y
      ctx.current.lineTo(space * i, 500 - value) //x,y
      ctx.current.stroke()
    })
  }

  const createAudioContext = () => {
    audioContext.current = new AudioContext()
    analyser.current = audioContext.current.createAnalyser()

    analyser.current.fftSize = 2048

    const source: MediaElementAudioSourceNode =
    audioContext.current.createMediaElementSource(audio as HTMLAudioElement)
    source.connect(analyser.current)
    source.connect(audioContext.current.destination)

    data.current = new Uint8Array(analyser.current.frequencyBinCount)

    ctx.current = canvasRef.current.getContext('2d')
  }

  const onClick = () => {
    if (audioContext && audioContext.current) {
      audioContext.current.resume()
    }

    if (!playing) {
      requestRef.current = requestAnimationFrame(animate)
    } else {
      cancelAnimationFrame(requestRef.current)
    }
    toggle()
  }

  return (
    <div>
      <button onClick={onClick}>{playing ? 'Pause' : 'Play'}</button>
      <canvas ref={canvasRef} width="500px" height="500px"></canvas>
    </div>
  )
}

export default App
