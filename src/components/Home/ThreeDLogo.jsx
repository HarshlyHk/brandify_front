"use client";
import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";
import { PiHandTapFill } from "react-icons/pi";
import "./Three.css";

const LogoModel = () => {
  const ref = useRef();
  const gltf = useGLTF("/threeD/logo3dmin.glb");

  return (
    <primitive
      ref={ref}
      object={gltf.scene}
      scale={1.5}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
    />
  );
};

const ThreeDLogo = () => {
  const [showPointer, setShowPointer] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);

  // Blink animation every 2s until interaction
  useEffect(() => {
    if (userInteracted) return;

    const interval = setInterval(() => {
      setShowPointer((prev) => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, [userInteracted]);

  // Stop showing pointer after any interaction
  const handleUserInteraction = () => {
    if (!userInteracted) {
      setUserInteracted(true);
      setShowPointer(false);
    }
  };

  return (
    <div className="relative w-full h-full">
      {!userInteracted && (
        <div className="absolute z-[1] inset-0 flex items-center justify-center pointer-events-none animate-tap">
          <PiHandTapFill className="text-white text-4xl " />
        </div>
      )}

      <Canvas
        camera={{ position: [0, 0, 5], fov: 80 }}
        onPointerDown={handleUserInteraction}
        onTouchStart={handleUserInteraction}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[0, 0, 5]} intensity={2} />
        <Suspense fallback={null}>
          <LogoModel />
          <Environment preset="dawn" background={false} />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={2}
          autoRotate={true}
          maxPolarAngle={Math.PI * 2}
          minPolarAngle={-Math.PI * 2}
          touches={{
            ONE: THREE.TOUCH.ROTATE,
            TWO: THREE.TOUCH.NONE,
          }}
        />
      </Canvas>
    </div>
  );
};

export default ThreeDLogo;
