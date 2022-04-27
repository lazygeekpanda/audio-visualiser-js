import { Suspense } from 'react'

import Light from './Light'
import Landscape from './Landscape'
import Effects from './Effects'

import { useFrame } from '@react-three/fiber'

interface Props {
  playing: boolean
  update: any
  useBloom: boolean
}

const Scene: React.FC<Props> = ({
  useBloom,
  playing,
  update,
}) => {
  useFrame((state) => {
    const avg = update()
    if (avg > 155) {
      console.log(avg)
      state.camera.position.z = 1.0
    } else {
      state.camera.position.z = 1.15
    }
    state.camera.position.x = Math.sin(state.clock.getElapsedTime()) / 150 * (avg / 50 || 1)
    state.camera.position.y = Math.abs(Math.sin(state.clock.getElapsedTime()) / (playing ? 150: 300)) + 0.05
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
