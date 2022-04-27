import { useRef, memo } from 'react'

import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

import Terrain from './Terrain'

interface Props {
  update: any
}

const Landscape: React.FC<Props> = ({ update }) => {
  const terrain1ref = useRef<THREE.Mesh>()
  const terrain2ref = useRef<THREE.Mesh>()

  useFrame((state) => {
    if (!terrain1ref.current || !terrain2ref.current) {
      return
    }

    const avg = update()

    // Update plane position
    terrain1ref.current.position.z = (state.clock.elapsedTime * 0.2) % 2
    /* @ts-ignore */
    terrain1ref.current.material.displacementScale = avg / 500 || 0.05
    /* @ts-ignore */
    terrain2ref.current.material.displacementScale = avg / 500 || 0.05
    terrain2ref.current.position.z = ((state.clock.elapsedTime * 0.2) % 2) - 2
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

export default memo(Landscape)
