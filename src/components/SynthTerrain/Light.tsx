import { useRef } from 'react'

const Light: React.FC = () => {
  const spotlight1Ref = useRef<THREE.SpotLight>()
  const spotlight2Ref = useRef<THREE.SpotLight>()

  spotlight1Ref.current?.target.position.set(-0.25, 0.25, 0.25);
  spotlight2Ref.current?.target.position.set(0.25, 0.25, 0.25);

  return (
    <>
      <spotLight
        // @ts-ignore
        ref={spotlight1Ref}
        color="#d53c3d"
        intensity={40}
        position={[0.5, 0.75, 2.1]}
        distance={25}
        angle={Math.PI * 0.1}
        penumbra={0.25}
        decay={10}
      />
      <spotLight
        // @ts-ignore
        ref={spotlight2Ref}
        color="#d53c3d"
        intensity={40}
        position={[-0.5, 0.75, 2.1]}
        distance={25}
        angle={Math.PI * 0.1}
        penumbra={0.25}
        decay={10}
      />
        <spotLight
        color="#3FA34D"
        intensity={40}
        position={[1.75, 1.75, 1.75]}
        distance={25}
        angle={Math.PI * 0.1}
        penumbra={0.25}
        decay={10}
      />
    </>
  )
}

export default Light
