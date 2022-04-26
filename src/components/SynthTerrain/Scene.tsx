import { Suspense } from 'react'

import Light from './Light'
import Landscape from './Landscape'
import Effects from './Effects'

import { useFrame, useThree } from '@react-three/fiber'

interface Props {
  isPlaying: boolean
  gain: any
  context: any
  update: any
  data: any
  useEffects: boolean
}

const Scene: React.FC<Props> = ({ useEffects, isPlaying, gain, context, update, data }) => {

  useFrame((state) => {
    const avg = update()
    if (avg > 155) {
      console.log(avg)
      state.camera.position.z = 0.45
    } else {
      state.camera.position.z = 0.4
    }
      state.camera.position.x = Math.sin(state.clock.getElapsedTime()) / 500
      state.camera.updateProjectionMatrix()
  })

  return (
    <Suspense fallback={null}>
        <Landscape update={update} />
        <Light />
        {useEffects && <Effects update={update} />}
    </Suspense>
  )
}

export default Scene
