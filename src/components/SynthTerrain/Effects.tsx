import { useEffect, useRef, useMemo } from 'react'

import * as THREE from 'three'
import { useThree, extend, useFrame, Object3DNode } from '@react-three/fiber'
import {
  EffectComposer,
  GammaCorrectionShader,
  RGBShiftShader,
  RenderPass,
  ShaderPass,
  UnrealBloomPass,
} from 'three-stdlib'

extend({ EffectComposer, RenderPass, ShaderPass, UnrealBloomPass })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      unrealBloomPass: Object3DNode<UnrealBloomPass, typeof UnrealBloomPass>
    }
  }
}

const Effects: React.FC = () => {
  const composerRef = useRef<EffectComposer>()
  const rgbShiftRef = useRef<typeof RGBShiftShader>()

  const { gl, scene, camera, size } = useThree()

  useEffect(() => {
    if (!composerRef.current) {
      return
    }

    composerRef.current.setSize(size.width, size.height)
  }, [size])

  useFrame((_, delta) => {
    if (!rgbShiftRef.current || !composerRef.current) {
      return
    }

    rgbShiftRef.current.uniforms['amount'].value = delta
    // rgbShiftRef.current.uniforms['amount'].value = 0.0012
    console.log(composerRef)
    composerRef.current.render()
  })

  const aspect = useMemo(
    () => new THREE.Vector2(size.width, size.height),
    [size]
  )

  return (
    <effectComposer
      // @ts-ignore
      ref={composerRef}
      args={[gl]}
    >
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
      <shaderPass
         // @ts-ignore
        attachArray="passes"
        args={[GammaCorrectionShader]}
      />
      <unrealBloomPass
        // @ts-ignore
        attachArray="passes"
        args={[aspect, 1, 0.8, 0]}
      />
    </effectComposer>
  )
}

export default Effects
