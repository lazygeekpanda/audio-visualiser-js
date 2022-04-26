interface Window {
  webkitAudioContext: typeof AudioContext
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      unrealBloomPass: Object3DNode<UnrealBloomPass, typeof UnrealBloomPass>
    }
  }
}