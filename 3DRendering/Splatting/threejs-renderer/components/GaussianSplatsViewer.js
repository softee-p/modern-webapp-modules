import { useEffect, useRef, useState } from 'react';
import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d';

const GaussianSplatsViewer = () => {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current || viewerRef.current) return;

    const viewer = new GaussianSplats3D.Viewer({
      'cameraUp': [0, -1, -0.6],
      'initialCameraPosition': [-1, -4, 6],
      'initialCameraLookAt': [0, 4, 0]
    });

    viewerRef.current = viewer;
    containerRef.current.appendChild(viewer.rootElement);

    // fullscreen
    viewer.rootElement.style.width = '100%';
    viewer.rootElement.style.height = '100%';

    viewer.addSplatScene('/splats/mkw-rock0.splat', {
      'splatAlphaRemovalThreshold': 5,
      'showLoadingUI': true,
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