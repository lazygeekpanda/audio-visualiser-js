import { useRef, useState } from 'react'

import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

import Terrain from './Terrain'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'

interface Props {
  isPlaying: boolean
  update: any
}

const Landscape: React.FC<Props> = ({ isPlaying, update }) => {
  const terrain1ref = useRef<THREE.Mesh>()
  const terrain2ref = useRef<THREE.Mesh>()

  // const [speed, setSpeed] = useState(0.015)

  // console.log(speed)

  useFrame((state) => {
    if (!terrain1ref.current || !terrain2ref.current) {
      return
    }

    // const speed = isPlaying ? 0.25 : 0.05
    const avg = update()

    // Update plane position
    terrain1ref.current.position.z = (state.clock.elapsedTime * 0.25) % 2
    /* @ts-ignore */
    terrain1ref.current.material.displacementScale = avg / 500 || 0.05
    /* @ts-ignore */
    terrain2ref.current.material.displacementScale = avg / 500 || 0.075
    // console.log(avg)
    terrain2ref.current.position.z = ((state.clock.elapsedTime * 0.25) % 2) - 2

    // if (isPlaying && speed < 0.2) {
    //   setSpeed(speed + 0.00075)
    // }
  })

  return (
    <>
      {/* @ts-ignore */}
      <Terrain ref={terrain1ref} z={0} update={update} />
      {/* @ts-ignore */}
      <Terrain ref={terrain2ref} z={-2} update={update} />
    </>
  )
}

export default Landscape
