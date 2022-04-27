import React, { useEffect } from 'react'

import createAudio from 'utils/createAudio'
import { suspend } from 'suspend-react'

import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
// TODO: Remove when done
import { OrbitControls, Stats } from '@react-three/drei'

import SynthScene from './SynthTerrain'
import Track from './Track/Track'

import TrackModel from 'models/track.model'

// import * as S from './Visualizer3D.styled'
import colors from 'styles/colors'

interface Props {
  url: string
  playing: boolean
  useBloom: boolean
  track: TrackModel
}

const Visualizer3D: React.FC<Props> = ({
  playing = false,
  useBloom = true,
  track = null,
  url,
}) => {
  const { gain, context, data, play, stop, update } = suspend(
    () => createAudio(require(`assets/audio/${url}`)),
    [url]
  )

  useEffect(() => {
    // Connect the gain node, which plays the audio
    gain.connect(context.destination)

    // Disconnect it on unmount
    return () => gain.disconnect()
  }, [gain, context])

  useEffect(() => {
    if (playing) {
      play()
    } else {
      stop()
    }
  }, [playing])

  return (
    <Canvas
      camera={{
        position: [0.015, 0.05, 1.15],
        fov: 35,
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
        <fog attach="fog" args={[colors.black, 0.5, 3.5]} />

        <Track
          position={[-0.15, 0.005, 1]}
          rotation={[-Math.PI / 2, -Math.PI / 2, -Math.PI / 2]}
          update={update}
          data={data}
        />
        <Track
          position={[0.15, 0.005, 1]}
          rotation={[-Math.PI / 2, -Math.PI / 2, -Math.PI / 2]}
          update={update}
          data={data}
        />

        <SynthScene playing={playing} update={update} useBloom={useBloom} />

        {/* TODO: Add Track Card:
          Image of the track, name, artist, time?
        */}

        {/* <OrbitControls rotateSpeed={0.15} /> */}
      </React.Suspense>
    </Canvas>
  )
}

export default Visualizer3D
