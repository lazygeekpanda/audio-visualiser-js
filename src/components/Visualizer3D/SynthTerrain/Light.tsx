import { useRef, memo } from 'react'

import colors from 'styles/colors'

const Light: React.FC = () => {
  const spotlight1Ref = useRef<THREE.SpotLight>()
  const spotlight2Ref = useRef<THREE.SpotLight>()
  const spotlight3Ref = useRef<THREE.SpotLight>()

  spotlight1Ref.current?.target.position.set(-0.25, 0.25, 0.25)
  spotlight2Ref.current?.target.position.set(0.25, 0.25, 0.25)
  spotlight3Ref.current?.target.position.set(0.25, 0.5, 0.25)

  return (
    <>
      <spotLight
        // @ts-ignore
        ref={spotlight1Ref}
        color={colors.orange}
        intensity={50}
        position={[1, 0.75, 1.0]}
        distance={10}
        angle={Math.PI * 0.15}
        penumbra={0.25}
        decay={10}
      />
      <spotLight
        // @ts-ignore
        ref={spotlight2Ref}
        color={colors.purple}
        intensity={75}
        position={[-0.5, 0.5, 1.1]}
        distance={25}
        angle={Math.PI * 0.65}
        penumbra={0.25}
        decay={5}
      />
      <ambientLight intensity={0.25} />
      <spotLight
      // @ts-ignore
        ref={spotlight3Ref}
        color="#FFBF69"
        intensity={2}
        position={[0, 1, 2.0]}
        distance={25}
        angle={Math.PI * 0.9}
        penumbra={0.5}
        decay={5}
      />
    </>
  )
}

export default memo(Light)
