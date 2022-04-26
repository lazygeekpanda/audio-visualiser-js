import React, { useState, useEffect } from 'react'

import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stats, Html } from '@react-three/drei'

import createAudio from 'utils/createAudio'
import { suspend } from 'suspend-react'

import SynthTerrain from 'components/SynthTerrain/Scene'

import colors from 'styles/colors'

import Track from 'components/Track'

const playlist = [
  {
    artist: 'Egzod',
    trackName: 'Royalty',
    url: 'Egzod_Royalty.mp3',
  },
  {
    artist: 'Abstrakt',
    trackName: 'Nobody Else',
    url: 'Abstrakt_Nobody_Else.mp3',
  },
  {
    artist: 'QR',
    trackName: 'XXI',
    url: 'QR_XXI.mp3',
  },
  {
    artist: 'Facading',
    trackName: 'Feelings',
    url: 'Facading_Feelings.mp3',
  },
  {
    artist: 'Abandoned',
    trackName: 'Out of the Grave',
    url: 'Abandoned_Out_of_the_Grave.mp3',
  },
  {
    artist: 'Hoober',
    trackName: 'Higher',
    url: 'Hoober_Higher.mp3',
  },
]

const App: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState(0)

  const { gain, context, data, play, stop, update } = suspend(
    () => createAudio(require(`assets/audio/${playlist[currentTrack].url}`)),
    [currentTrack]
  )

const [useEffects, setUseEffects] = useState(false)

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
      <button onClick={onClick}>{isPlaying ? 'Pause' : 'Play'}</button>
      <button onClick={() => setCurrentTrack(currentTrack < playlist.length - 1? currentTrack + 1 : 0)}>Next Song</button>
      <button onClick={() => setUseEffects(!useEffects)}>{useEffects ? 'Disable' : 'Enable'} effects</button>

      <div
        style={{
          width: '100vw',
          height: 'calc(100vh - 22px)',
          fontFamily: '"Cormorant Garamond", serif'
        }}
      >
        <Canvas
          camera={{
            position: [0.01, 0.25, 0.4],
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
            <color attach="background" args={[colors.black]} />
            <fog attach="fog" args={[colors.black, 0.5, 2.5]} />
            <Html position={[0, 0, -4]}>
              <div style={{ minWidth: 300, color: 'white', textAlign: 'center', transform: 'translate3D(-50%, -100%, 0)' }}>
                <h1 style={{ fontSize: '48px' }}>{playlist[currentTrack].trackName}</h1>
                <p style={{ color: '#ccc', marginTop: 20 }}>
                {playlist[currentTrack].artist}
                </p>
              </div>
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
              useEffects={useEffects}
            />

            <OrbitControls
              minPolarAngle={Math.PI / 2.15}
              maxPolarAngle={Math.PI / 2.2}
              minAzimuthAngle={-Math.PI / 8}
              maxAzimuthAngle={Math.PI / 8}
              minDistance={1.5}
              maxDistance={2.75}
              rotateSpeed={0.15}
            />
          </React.Suspense>
        </Canvas>
        <div style={{ position: 'fixed', bottom: 0, right: 0, left: 0, textAlign: 'center', zIndex: 999, color: '#fff' }}>
          Credits
        </div>
      </div>
    </div>
  )
}

export default App
