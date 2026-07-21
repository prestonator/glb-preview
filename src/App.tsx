import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Suspense } from 'react'
import { Model } from './components/HomesteadMain'
import './index.css' // Import the global styles we updated

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Canvas camera={{ position: [50, 50, 50], fov: 50 }}>
        
        <Suspense fallback={null}>
          <Model />
          {/* Environment map for realistic PBR reflections based on grill-me choice */}
          <Environment preset="forest" />
        </Suspense>

        {/* Free orbit controls based on grill-me choice */}
        <OrbitControls makeDefault />
      </Canvas>
      <div style={{ position: 'absolute', top: 20, left: 20, color: 'white', fontFamily: 'sans-serif', zIndex: 10, pointerEvents: 'none', textShadow: '1px 1px 2px black' }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>Homestead Model Preview</h1>
        <p style={{ margin: '5px 0', fontSize: '14px', opacity: 0.8 }}>Drag to rotate, scroll to zoom.</p>
      </div>
    </div>
  )
}

export default App
