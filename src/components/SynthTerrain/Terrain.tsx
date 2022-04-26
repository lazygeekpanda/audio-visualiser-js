import React, { forwardRef, memo } from 'react'

import * as THREE from 'three'
import { useTexture } from '@react-three/drei'
import CustomShaderMaterial from 'three-custom-shader-material'

const fragmentShader = `
float aastep(in float threshold, in float value) {
  float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
  return 1.0 - smoothstep(threshold-afwidth, threshold+afwidth, value);
}
void main() {
  float lw = 1.0;
  float w;
  float gx = 1.0 + cos(vUv.x * 24.0 * 2.0 * PI - PI);
  w = fwidth(vUv.x) * lw;
  gx = aastep(w, gx);
  float gy = 1.0 + cos(vUv.y * 24.0 * 2.0 * PI - PI);
  w = fwidth(vUv.y) * lw;
  gy = aastep(w, gy);
  float grid = gx + gy;

  csm_DiffuseColor = vec4(grid, grid * 0.3, grid * 0.5, 1.0);
}
`

interface Props {
  z: number
}

const Terrain: React.FC<Props> = forwardRef<THREE.Mesh, Props>(
  ({ z }, ref) => {
    const [heightTexture, metalnessTexture] = useTexture([
      require('assets/images/materials/synth/displacement-6.jpg'),
      require('assets/images/materials/synth/metalness-2.png'),
    ])

    return (
      <mesh
        ref={ref}
        position={[0, 0, z * 0.05]}
        rotation={[-Math.PI / 2, 0, 0]}
        castShadow
        receiveShadow
      >
        <planeBufferGeometry attach="geometry" args={[1, 2, 48, 48]} />
        <CustomShaderMaterial
          baseMaterial={THREE.MeshPhongMaterial}
          side={THREE.DoubleSide}
          displacementMap={heightTexture}
          displacementScale={0.1}
          metalnessMap={metalnessTexture}
          metalness={0.95}
          roughness={0.25}
          fragmentShader={fragmentShader}
        />
      </mesh>
    )
  }
)

export default memo(Terrain)
