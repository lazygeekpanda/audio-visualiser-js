import React, { useState, useEffect } from 'react'

import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stats, Html, Text } from '@react-three/drei'

import createAudio from 'utils/createAudio'
import { suspend } from 'suspend-react'

import SynthTerrain from 'components/SynthTerrain/Scene'

import colors from 'styles/colors'

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
        }}
      >
        <Canvas
          camera={{
            position: [0.025, 0.25, 0.4],
            fov: 27,
            near: 0.02,
            far: 10,
          }}
          linear
          dpr={[1, 2]}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.NoToneMapping
          }}
        >
          <Stats showPanel={0} />
          <React.Suspense fallback="Loading">
            <Text position={[0, 0.015, 0.75]} rotation={[-Math.PI / 2, 0, 0]} scale={[0.5, 0.5, 0.5]} >
              Royalty
            </Text>
            <color attach="background" args={[colors.black]} />
            <fog attach="fog" args={[colors.black, 0.5, 2.5]} />
            <Html position={[0, 0, -4]}>
              <div style={{ color: 'white' }}>Egzod</div>
            </Html>

            <Track
              position={[-0.175, 0.01, 0.75]}
              rotation={[-Math.PI / 2, -Math.PI / 2, -Math.PI / 2]}
              update={update}
              data={data}
            />
            <Track
              position={[0.175, 0.01, 0.75]}
              rotation={[-Math.PI / 2, -Math.PI / 2, -Math.PI / 2]}
              update={update}
              data={data}
            />

            <SynthTerrain
              isPlaying={isPlaying}
              gain={gain}
              context={context}
              update={update}
              data={data}
            />

            <OrbitControls
              minPolarAngle={Math.PI / 2.15}
              maxPolarAngle={Math.PI / 2.2}
              minAzimuthAngle={-Math.PI / 8}
              maxAzimuthAngle={Math.PI / 8}
              minDistance={1}
              maxDistance={1.75}
              rotateSpeed={0.15}
            />
          </React.Suspense>
        </Canvas>
      </div>
    </div>
  )
}

export default App
