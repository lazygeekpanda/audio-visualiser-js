import { Suspense } from 'react'

import Light from './Light'
import Landscape from './Landscape'
import Effects from './Effects'

interface Props {
  isPlaying: boolean
  gain: any
  context: any
  update: any
  data: any
}

const Scene: React.FC<Props> = ({ isPlaying, gain, context, update, data }) => (
  <Suspense fallback={null}>
      <Landscape update={update} />
      <Light />
      <Effects update={update} />
  </Suspense>
)

export default Scene
