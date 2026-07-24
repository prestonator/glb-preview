import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

export function CameraLogger() {
  const { camera } = useThree()

  useEffect(() => {
    const logCameraInfo = (e) => {
      // Press 'c' to log the camera position
      if (e.key === 'c') {
        console.log('Camera Position:', [
          Number(camera.position.x.toFixed(2)),
          Number(camera.position.y.toFixed(2)),
          Number(camera.position.z.toFixed(2))
        ])
        
        // Note: If using OrbitControls, the rotation is often overridden 
        // by the OrbitControls target, but it's still useful to see.
        console.log('Camera Rotation:', [
          Number(camera.rotation.x.toFixed(2)),
          Number(camera.rotation.y.toFixed(2)),
          Number(camera.rotation.z.toFixed(2))
        ])
      }
    }

    window.addEventListener('keydown', logCameraInfo)
    
    // Cleanup the event listener on unmount
    return () => window.removeEventListener('keydown', logCameraInfo)
  }, [camera])

  return null // This component doesn't render anything visually
}