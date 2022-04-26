import { useEffect, useRef, useMemo, memo } from 'react'

import * as THREE from 'three'
import { useThree, extend, useFrame, Object3DNode } from '@react-three/fiber'
import { Effects as EffectsComposer } from '@react-three/drei'
import {
  RGBShiftShader,
  RenderPass,
  ShaderPass,
  UnrealBloomPass,
  // GlitchPass,
} from 'three-stdlib'

extend({ RenderPass, ShaderPass, UnrealBloomPass })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      unrealBloomPass: Object3DNode<UnrealBloomPass, typeof UnrealBloomPass>
    }
  }
}

interface Props {
  update: any
}

const Effects: React.FC<Props> = ({ update }) => {
  const rgbShiftRef = useRef<typeof RGBShiftShader>()

  const { gl, scene, camera, size } = useThree()

  useFrame((_, delta) => {
    if (!rgbShiftRef.current) {
      return
    }
    const avg = update()
    rgbShiftRef.current.uniforms['amount'].value = avg / 50000
  })

  const aspect = useMemo(
    () => new THREE.Vector2(size.width, size.height),
    [size]
  )

  return (
    <EffectsComposer args={[gl]} disableGamma>
      <renderPass
        // @ts-ignore
        attachArray="passes"
        scene={scene}
        camera={camera}
      />
      <shaderPass
        // @ts-ignore
        ref={rgbShiftRef}
        attachArray="passes"
        args={[RGBShiftShader]}
      />
      <unrealBloomPass
        // @ts-ignore
        attachArray="passes"
        args={[aspect, 1.2, 1, 0]}
      />
    </EffectsComposer>
  )
}

export default memo(Effects)
