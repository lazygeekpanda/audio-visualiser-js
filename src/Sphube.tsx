import React, {
  useMemo,
  useState,
  useRef,
  useLayoutEffect
} from 'react'

import * as THREE from 'three'
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry.js'
import { extend, useLoader, useFrame } from '@react-three/fiber'
import { useSpring, animated, config } from "@react-spring/three";

// Shaders
import vertexShader from './shader/vertex.js'
import fragmentShader from './shader/fragment.js'

import store from './store'

extend({ ParametricGeometry })

interface Props {
  size: number
  position: number[]
  rotation: number[]
  scale: number
  speed: number
  roundness?: number
  progress?: number
  animate: boolean
  playing: boolean
}
const Sphube: React.FC<Props> = ({
  size,
  scale,
  position,
  rotation,
  speed,
  animate,
  roundness,
  progress,
  playing
}) => {
  const ref = useRef<any>()

  const matcapTexture = useLoader(
    THREE.TextureLoader,
    require(`assets/images/materials/nature_amber.jpg`)
  )

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.geometry.computeVertexNormals()
      ref.current.position.set(...position)
      ref.current.rotation.set(...rotation)
    }
  }, [])

  const material = useMemo(
    () => ({
      side: THREE.DoubleSide,
      uniforms: {
        time: { value: progress || 0 }, // Changing can start from current position
        progress: { value: progress || 0 },
        lowerMaxFr: { value: 0},
        lowerAvgFr: { value: 0},
        upperAvgFr: { value: 0},
        flatNormals: { value: 0 },
        distortion: { value: 4 },
        scale: { value: scale },
        speed: { value: speed }, // How fast animation goes
        axis: { value: new THREE.Vector3(1, 0, 0) },
        axis2: { value: new THREE.Vector3(1, 0, 0) },
        resolution: { value: new THREE.Vector4() },
        matcaptexture: { value: matcapTexture },
      },
      // transparent: true,
      vertexShader,
      // fragmentShader,
    }),
    []
  )

  useFrame(({ mouse }, delta) => {
    // ref.current.rotation.x = -mouse.y / 2.5
    // ref.current.rotation.y = mouse.x / 2.5

    // console.log('LowerMaxFr', store.lowerMaxFr.current)
    // console.log('LowerAvgFr', store.lowerAvgFr.current)
    // console.log('UpperAvgFr', store.upperAvgFr.current)

    if (animate && playing) {
      // Animation
      // ref.current.material.uniforms.time.value += delta
      ref.current.material.uniforms.lowerMaxFr.value = store.lowerMaxFr.current
      ref.current.material.uniforms.lowerAvgFr.value = store.lowerAvgFr.current
      ref.current.material.uniforms.upperAvgFr.value = store.upperAvgFr.current
      ref.current.position.y = (store.upperAvgFr.current as number) / 1
      // ref.current.scale.set(store.lowerMaxFr.current, store.lowerMaxFr.current, store.lowerMaxFr.current)
    }
  })

  const sphube = (u1: number, v1: number, target: any) => {
    let s = roundness || 0.6 // 0-1, 0 - circle, 1 - square
    // let r = 1.25
    let r = size * (store.lowerMaxFr.current as number)
    let theta = 2 * u1 * Math.PI
    let phi = v1 * 2 * Math.PI

    let u = Math.cos(theta) * Math.cos(phi)
    let v = Math.cos(theta) * Math.sin(phi)
    let w = Math.sin(theta)

    let z = ((r * u) / Math.sqrt(1 - s * v ** 2 - s * w ** 2))
    let x = ((r * v) / Math.sqrt(1 - s * u ** 2 - s * w ** 2))
    let y = ((r * w) / Math.sqrt(1 - s * Math.cos(theta) ** 2))

    target.set(x, y, z)
  }

  return (
    <group>
      <animated.mesh ref={ref}>
        {/* @ts-ignore */}
        <parametricGeometry args={[sphube, 400, 400]} attach="geometry" />
        <shaderMaterial attach="material" {...material} />
      </animated.mesh>
    </group>
  )
}

export default React.memo(Sphube)
