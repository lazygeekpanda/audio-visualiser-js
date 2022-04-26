import { useRef, memo } from 'react'

import colors from 'styles/colors'

const Light: React.FC = () => {
  const spotlight1Ref = useRef<THREE.SpotLight>()
  const spotlight2Ref = useRef<THREE.SpotLight>()

  spotlight1Ref.current?.target.position.set(-0.25, 0.25, 0.25)
  spotlight2Ref.current?.target.position.set(0.25, 0.25, 0.25)

  return (
    <>
      <spotLight
        // @ts-ignore
        ref={spotlight1Ref}
        color={colors.orange}
        intensity={100}
        position={[0.5, 0.75, 2.1]}
        distance={10}
        angle={Math.PI * 0.1}
        penumbra={0.25}
        decay={10}
      />
      <spotLight
        // @ts-ignore
        ref={spotlight2Ref}
        color={colors.purple}
        intensity={100}
        position={[-0.5, 0.75, 2.1]}
        distance={25}
        angle={Math.PI * 0.1}
        penumbra={0.25}
        decay={10}
      />
      <rectAreaLight width={10} height={10} position={[0, 3, -2]} intensity={0.5} color='yellow' />
      <ambientLight intensity={0.25} />
      {/* <spotLight
        color="#3FA34D"
        intensity={20}
        position={[1.75, 3, 1.75]}
        distance={25}
        angle={Math.PI * 0.1}
        penumbra={0.25}
        decay={10}
      /> */}
    </>
  )
}

export default memo(Light)
