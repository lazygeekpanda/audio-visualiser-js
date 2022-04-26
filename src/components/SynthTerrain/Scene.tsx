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
      <Landscape isPlaying={isPlaying} update={update} />
      <Light />
      {/* <Effects /> */}
  </Suspense>
)

export default Scene
