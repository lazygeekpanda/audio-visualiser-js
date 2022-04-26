import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface Props {
  gain: any
  context: any
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
  gain,
  context,
  update,
  data,
  scale = 1,
  y = 2000,
  space = 4.5,
  width = 0.01,
  height = 0.0075,
  obj = new THREE.Object3D(),
  position = [0, 0, 0],
  rotation = [0, 0, 0]
}) => {
  const ref = useRef<THREE.InstancedMesh>()
  // suspend-react is the library that r3f uses internally for useLoader. It caches promises and
  // integrates them with React suspense. You can use it as-is with or without r3f.

  useFrame((state) => {
    if (!ref.current) {
      return
    }

    let avg = update()
    // Distribute the instanced planes according to the frequency daza
    for (let i = 0; i < data.length; i++) {
      // obj.position.set((i * width * space - (data.length * width * space) / 2), data[i] / y, 0)
      obj.position.set(
        i * width * space - (data.length * width  * space) / 2,
        (data[i] * scale) / y,
        0
      )
      obj.updateMatrix()
      ref.current.setMatrixAt(i, obj.matrix)
    }

    // console.log(obj)

    // Set the hue according to the frequency average
    // @ts-ignore | Weird, but it actually has color property
    ref.current.material.color.setHSL(avg / 200, 0.75, 0.75)
    ref.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh
      // @ts-ignore
      ref={ref}
      args={[undefined, undefined, data.length]}
      castShadow
      position={position}
      rotation={rotation}
    >
      <boxBufferGeometry args={[0.005, 0.005, 0.1]} />
      {/* <planeGeometry args={[width, height]} /> */}
      <meshBasicMaterial  side={THREE.DoubleSide} transparent opacity={0.5} />
    </instancedMesh>
  )
}

export default Track
