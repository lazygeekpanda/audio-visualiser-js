import { Suspense, useEffect } from 'react'

import Light from './Light'
import Landscape from './Landscape'
import Effects from './Effects'

import { useFrame, useThree, Viewport, Size } from '@react-three/fiber'

interface Props {
  playing: boolean
  update: any
  useBloom: boolean
}

const Scene: React.FC<Props> = ({ useBloom, playing, update }) => {
  const {
    viewport,
    size,
    camera,
  }: { viewport: Viewport; size: Size; camera: THREE.PerspectiveCamera } =
    useThree()

  useEffect(() => {
    if (size.width <= 992) {
      camera.fov = 55
      camera.position.y = 0.15
      camera.updateProjectionMatrix()
    }
  }, [size])


  useFrame((state) => {
    const avg = update()
    if (avg > 155) {
      state.camera.position.z = 1.0
    } else {
      state.camera.position.z = 1.15
    }

    state.camera.position.x =
      (Math.sin(state.clock.getElapsedTime()) / 150) * (avg / 50 || 1)
    if (size.width > 992) {
      state.camera.position.y =
        Math.abs(
          Math.sin(state.clock.getElapsedTime()) / (playing ? 150 : 300)
        ) + 0.05
    }
    state.camera.updateProjectionMatrix()
  })

  return (
    <Suspense fallback={null}>
      <Landscape update={update} />
      <Light />
      <Effects update={update} useBloom={useBloom} />
    </Suspense>
  )
}

export default Scene
