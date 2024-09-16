import { useEffect, useRef, useState } from 'react';
import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d';

const GaussianSplatsViewer = () => {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current || viewerRef.current) return;

    const viewer = new GaussianSplats3D.Viewer({
      'sceneRevealMode': 'Gradual',
      'cameraUp': [0, 1, 0], // Adjust this if needed
      'initialCameraPosition': [0, 0, 5], // Adjust these values
      'initialCameraLookAt': [0, 0, 0], // This should be the center of your model
      // 'fov': 70, // Adjust field of view if needed
      'sphericalHarmonicsDegree': 2
    });

    viewerRef.current = viewer;
    containerRef.current.appendChild(viewer.rootElement);

    // fullscreen
    viewer.rootElement.style.width = '100%';
    viewer.rootElement.style.height = '100%';

    viewer.addSplatScene('/splats/rock_splatfacto.ksplat', {
      'progressiveLoad': true,
      'splatAlphaRemovalThreshold': 5,
      'position': [0, 0, 0], // Adjust if needed to center your model
      'rotation': [1, 0, 0, 0], // Adjust rotation if model is tilted (x, y, z, w quaternion)
      'scale': [1, 1, 1] // Adjust scale if needed
    })
    .then(() => {
      viewer.start();
      setIsLoaded(true);
    })
    .catch((error) => {
      console.error("Error loading splat scene:", error);
    });

    return () => {
      if (viewerRef.current) {
        if (viewerRef.current.stopRendering) {
          viewerRef.current.stopRendering();
        }
        
        if (viewerRef.current.rootElement && viewerRef.current.rootElement.parentNode) {
          viewerRef.current.rootElement.parentNode.removeChild(viewerRef.current.rootElement);
        }

        viewerRef.current = null;
      }

      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="absolute inset-0" />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 text-white text-2xl">
          Loading...
        </div>
      )}
    </div>
  );
};

export default GaussianSplatsViewer;