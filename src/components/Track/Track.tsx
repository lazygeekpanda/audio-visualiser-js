import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface Props {
  update: any
  data: any
  scale?: number
  y?: number
  space?: number
  width?: number
  height?: number
  obj?: THREE.Object3D
  position: any
  rotation: any
}

const Track: React.FC<Props> = ({
  update,
  data,
  scale = 1,
  y = 2000,
  space = 4.5,
  width = 0.01,
  height = 0.0075,
  obj = new THREE.Object3D(),
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}) => {
  const ref = useRef<THREE.InstancedMesh>()

  useFrame(() => {
    if (!ref.current) {
      return
    }

    let avg = update()
    // Distribute the instanced planes according to the frequency daza
    for (let i = 0; i < data.length; i++) {
      obj.position.set(
        i * width * space - (data.length * width * space) / 2,
        ((data[i] / y) * avg) / 200,
        0
      )
      obj.updateMatrix()
      ref.current.setMatrixAt(i, obj.matrix)
    }

    // Set the hue according to the frequency average
    // @ts-ignore | Weird, but it actually has color property
    ref.current.material.color.setHSL(avg / 100, 0.95, 0.5)
    // @ts-ignore
    ref.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh
      // @ts-ignore
      ref={ref}
      args={[undefined, undefined, data.length]}
      position={position}
      rotation={rotation}
      castShadow
      receiveShadow
    >
      <boxBufferGeometry args={[0.0025, 0.0025, 0.05]} />
      <meshBasicMaterial />
    </instancedMesh>
  )
}

export default Track
