import React, { useState, useEffect } from 'react'

import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stats } from '@react-three/drei'

import createAudio from 'utils/createAudio'
import { suspend } from 'suspend-react'

import SynthTerrain from 'components/SynthTerrain/Scene'
import Effects from 'components/SynthTerrain/Effects'

import Track from 'components/Track'

const App: React.FC = () => {
  const { gain, context, data, play, stop, update } = suspend(
    () => createAudio(require('assets/audio/Egzod_Royalty.mp3')),
    []
  )

  useEffect(() => {
    // Connect the gain node, which plays the audio
    gain.connect(context.destination)

    // Disconnect it on unmount
    return () => gain.disconnect()
  }, [gain, context])

  const [isPlaying, setIsPlaying] = useState(false)

  const onClick = () => {
    console.log('click')
    if (isPlaying) {
      setIsPlaying(false)
      stop()
    } else {
      setIsPlaying(true)
      play()
    }
  }

  return (
    <div>
      <div style={{ display: 'inline-block', paddingRight: 100 }}></div>
      <button onClick={onClick}>Play</button>

      <div
        style={{
          width: '100vw',
          height: 'calc(100vh - 22px)',
          backgroundColor: '#000',
        }}
      >
        <Canvas
          camera={{ position: [0, 0.15, 0.25], fov: 25, near: 0.01, far: 10 }}
          dpr={[1, 2]}
          linear
          shadows
        >
          <Stats showPanel={0} />
          <React.Suspense fallback="Loading">
            <color attach="background" args={['#000000']} />
            <fog attach="fog" args={['#000', 1, 3.5]} />
            {/* <Track position-z={-0.25} gain={gain} context={context} update={update} data={data} /> */}
            <Effects />
            {/* <Track
              position={[0, 0.01, -0.5]}
              rotation={[-Math.PI / 2, -Math.PI / 2, -Math.PI / 2]}
              gain={gain}
              context={context}
              update={update}
              data={data}
            /> */}
            {/* <Track
              position={[0.2, 0.15, 0.15]}
              rotation={[-Math.PI / 2, Math.PI * 0.5, -Math.PI / 2.1]}
              gain={gain}
              context={context}
              update={update}
              data={data}
            /> */}

            <SynthTerrain
              isPlaying={isPlaying}
              gain={gain}
              context={context}
              update={update}
              data={data}
            />
            {/* <Track position-z={0} gain={gain} context={context} update={update} data={data} scale={2} /> */}

            {/* <Particles focus={5} speed={50} aperture={2.5} fov={30} curl={0.25} /> */}
            <OrbitControls
              minPolarAngle={Math.PI / 2.3}
              maxPolarAngle={Math.PI / 2.2}
              minAzimuthAngle={-Math.PI / 8}
              maxAzimuthAngle={Math.PI / 8}
              minDistance={0.75}
              maxDistance={1.75}
              rotateSpeed={0.15}
            />
            {/* <Sphube size={1} speed={0.5} scale={0.01} rotation={[0, 0, 0]} position={[0, 0, 0]} animate playing={playing} /> */}
          </React.Suspense>
        </Canvas>
      </div>
    </div>
  )
}

export default App
