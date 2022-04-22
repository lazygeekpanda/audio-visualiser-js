// @ts-nocheck
import React, { useEffect, useState, createRef, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Sphube from './Sphube'

import { suspend } from 'suspend-react'

import * as THREE from 'three'

import store from './store'
import {Particles} from './Particles'
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

const max = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length
const avg = (arr) => arr.reduce((a, b) => Math.max(a, b), 0)

const App: React.FC = () => {
  // const [audio, playing, toggle]: any = useAudio(
  //   require('assets/audio/Egzod_Royalty.mp3')
  // )

  const { gain, context, update, data } = suspend(() => createAudio(require('assets/audio/Egzod_Royalty.mp3')), [])
  // const canvasRef = createRef<any>()
  // const ctx = createRef<any>()
  // const audioContext = createRef<AudioContext>()
  // const analyser = createRef<AnalyserNode>()

  // // const data = createRef<any[]>()

  //  const [data, setData] = useState([])

  // const requestRef = React.createRef()

  // useEffect(() => {
  //   // createAudioContext()

  //   return () => {
  //     analyser.current = undefined
  //     audioContext.current = undefined
  //     cancelAnimationFrame(requestRef.current)
  //   }
  // }, [])

  // const animate = (time) => {
  //   if (analyser.current) {
  //     analyser.current.getByteFrequencyData(data.current)
  //     draw(data.current)
  //   }

  //   requestAnimationFrame(animate)
  // }

  // const draw = (dt) => {
  //   const dataArray = dt
  //   ctx.current.clearRect(0, 0, 500, 500)

  //   const lowerHalfArray = dataArray.slice(0, dataArray.length / 2 - 1)
  //   const upperHalfArray = dataArray.slice(
  //     dataArray.length / 2 - 1,
  //     dataArray.length - 1
  //   )

  //   const lowerMax = max(lowerHalfArray)
  //   const lowerAvg = avg(lowerHalfArray)
  //   const upperAvg = avg(upperHalfArray)

  //   const lowerMaxFr = lowerMax / lowerHalfArray.length
  //   const lowerAvgFr = lowerAvg / lowerHalfArray.length
  //   const upperAvgFr = upperAvg / upperHalfArray.length

  //   store.lowerMaxFr.current = lowerMaxFr
  //   store.lowerAvgFr.current = lowerAvgFr
  //   store.upperAvgFr.current = upperAvgFr

  //   let space = 500 / data.current.length
  //   upperHalfArray.forEach((value, i) => {
  //     const barHeight = data.current.length
  //     // ctx.current.beginPath()
  //     // ctx.current.moveTo(space * i, 500) //x,y
  //     // ctx.current.lineTo(space * i, 500 - value) //x,y
  //     // ctx.current.stroke()
  //     // ctx.current.fillRect(value, barHeight/2, 10, barHeight)
  //     // ctx.current.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
  //   })
  // }

  // const createAudioContext = () => {
  //   audioContext.current = new AudioContext()
  //   analyser.current = audioContext.current.createAnalyser()

  //   analyser.current.fftSize = 512

  //   const source: MediaElementAudioSourceNode =
  //     audioContext.current.createMediaElementSource(audio as HTMLAudioElement)
  //   source.connect(analyser.current)
  //   source.connect(audioContext.current.destination)

  //   setData(new Uint8Array(analyser.current.frequencyBinCount))

  //   // ctx.current = canvasRef.current.getContext('2d')
  // }

  const onClick = () => {
    // if (audioContext && audioContext.current) {
    //   audioContext.current.resume()
    // }

    // if (!playing) {
    //   requestRef.current = requestAnimationFrame(animate)
    // } else {
    //   cancelAnimationFrame(requestRef.current)
    //   cancelAnimationFrame(animate)
    // }
    // toggle()
    console.log('click')
    context.resume()
  }

  return (
    <div>
    //   <button onClick={onClick}>Play</button>

      {/* <canvas ref={canvasRef} width="500px" height="500px"></canvas> */}

      <div style={{ width: '100vw', height: '90vh', backgroundColor: '#000' }}>
         <Canvas camera={{ position: [-1, 1.5, 2], fov: 25 }}>
          <React.Suspense fallback="Loading">
            {/* <Track position-z={-0.25} gain={gain} context={context} update={update} data={data} /> */}
            <Track position-z={0.25} gain={gain} context={context} update={update} data={data} />
            {/* <Track position-z={0} gain={gain} context={context} update={update} data={data} scale={2} /> */}

            {/* <Particles focus={5} speed={50} aperture={2.5} fov={30} curl={0.25} /> */}
            {/* <OrbitControls /> */}
            {/* <Sphube size={1} speed={0.5} scale={0.01} rotation={[0, 0, 0]} position={[0, 0, 0]} animate playing={playing} /> */}
          </React.Suspense>
         </Canvas>
      </div>
    </div>
  )
}

function Track({ gain, context, update, data, scale = 1, y = 2500, space = 1.8, width = 0.01, height = 0.05, obj = new THREE.Object3D(), ...props }) {
  const ref = useRef()
  // suspend-react is the library that r3f uses internally for useLoader. It caches promises and
  // integrates them with React suspense. You can use it as-is with or without r3f.

  useEffect(() => {
    // Connect the gain node, which plays the audio
    gain.connect(context.destination)

    // Disconnect it on unmount
    return () => gain.disconnect()
  }, [gain, context])

  useFrame((state) => {
    let avg = update()
    // Distribute the instanced planes according to the frequency daza
    for (let i = 0; i < data.length; i++) {
      // obj.position.set((i * width * space - (data.length * width * space) / 2), data[i] / y, 0)
      obj.position.set((i * width * space - (data.length * width * space) / 2), data[i] * scale /y, 0)
      obj.updateMatrix()
      ref.current.setMatrixAt(i, obj.matrix)
    }
    // Set the hue according to the frequency average
    ref.current.material.color.setHSL(avg / 500, 0.75, 0.75)
    ref.current.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh castShadow ref={ref} args={[null, null, data.length]} {...props}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  )
}

async function createAudio(url) {
  // Fetch audio data and create a buffer source
  const res = await fetch(url)
  const buffer = await res.arrayBuffer()
  const context = new (window.AudioContext || window.webkitAudioContext)()

  const source = context.createBufferSource()
  source.buffer = await new Promise((res) => context.decodeAudioData(buffer, res))
  source.loop = true
  // This is why it doesn't run in Safari 🍏🐛. Start has to be called in an onClick event
  // which makes it too awkward for a little demo since you need to load the async data first
  source.start(0)
  // Create gain node and an analyser
  const gain = context.createGain()
  const analyser = context.createAnalyser()
  analyser.fftSize = 128
  source.connect(analyser)
  analyser.connect(gain)
  // The data array receive the audio frequencies
  const data = new Uint8Array(analyser.frequencyBinCount)

  return {
    context,
    source,
    gain,
    data,
    // This function gets called every frame per audio source
    update: () => {
      analyser.getByteFrequencyData(data)
      // Calculate a frequency average
      return (data.avg = data.reduce((prev, cur) => prev + cur / data.length, 0))
    },
  }
}

export default App
