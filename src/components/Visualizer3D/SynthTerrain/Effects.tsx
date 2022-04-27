import { useState, useEffect, useRef, useMemo, memo } from 'react'

import * as THREE from 'three'
import { useThree, extend, useFrame, Object3DNode } from '@react-three/fiber'
import { Effects as EffectsComposer } from '@react-three/drei'
import {
  RGBShiftShader,
  RenderPass,
  ShaderPass,
  UnrealBloomPass,
} from 'three-stdlib'

import isMobile from 'utils/isMobile'

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
  useBloom: boolean
}

const Effects: React.FC<Props> = ({ update, useBloom }) => {
  const composerRef = useRef<typeof EffectsComposer>()
  const rgbShiftRef = useRef<typeof RGBShiftShader>()

  const { gl, scene, camera, size } = useThree()

  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    setMobile(isMobile())
  }, [])

  useEffect(() => {
    if (!composerRef.current) {
      return
    }
    const bloom =
      // @ts-ignore
      composerRef.current.passes[composerRef.current.passes.length - 1]

    if (useBloom) {
      bloom.enabled = true
    } else {
      bloom.enabled = false
    }
  }, [useBloom])

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
    <>
      {!mobile ? (
        <EffectsComposer ref={composerRef} args={[gl]} disableGamma>
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
      ) : null}
    </>
  )
}

export default memo(Effects)
