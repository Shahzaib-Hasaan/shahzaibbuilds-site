'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function NeuralField({ count = 220 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouse = useRef<[number, number]>([0, 0]);

  const { positions, baseRadii } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const baseRadii = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const t = i / count;
      // distribute between two clusters — biology (left) and AI (right)
      const cluster = i % 2;
      const side = cluster === 0 ? -1.4 : 1.4;
      const r = 1.0 + Math.random() * 0.7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = side + r * Math.sin(phi) * Math.cos(theta) * 0.55;
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.9;
      positions[i * 3 + 2] = r * Math.cos(phi) * 0.5;
      baseRadii[i] = r;
      void t;
    }
    return { positions, baseRadii };
  }, [count]);

  const linePositions = useMemo(() => new Float32Array(count * 6), [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const geom = pointsRef.current?.geometry as THREE.BufferGeometry | undefined;
    if (!geom) return;
    const arr = geom.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const base = i * 3;
      const r = baseRadii[i];
      const wobble = Math.sin(t * 0.6 + i * 0.15) * 0.08;
      // gentle pivot: left cluster drifts toward right over time, then resets
      const pivot = (Math.sin(t * 0.18 + i * 0.01) + 1) * 0.5; // 0..1
      const side = i % 2 === 0 ? -1.4 : 1.4;
      const targetSide = i % 2 === 0 ? -1.4 + pivot * 0.6 : 1.4 - pivot * 0.4;
      arr[base] = THREE.MathUtils.lerp(side, targetSide, 1) + Math.sin(t * 0.4 + i) * 0.03;
      arr[base + 1] += wobble * 0.01;
      // keep within bounds
      arr[base + 2] = Math.cos(t * 0.3 + i * 0.07) * 0.3 * r;
    }
    geom.attributes.position.needsUpdate = true;

    // build a sparse line set between near neighbors
    const lgeom = linesRef.current?.geometry as THREE.BufferGeometry | undefined;
    if (lgeom) {
      const lp = lgeom.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const a = i;
        const b = (i + 7) % count; // arbitrary stride for variety
        lp[i * 6] = arr[a * 3];
        lp[i * 6 + 1] = arr[a * 3 + 1];
        lp[i * 6 + 2] = arr[a * 3 + 2];
        lp[i * 6 + 3] = arr[b * 3];
        lp[i * 6 + 4] = arr[b * 3 + 1];
        lp[i * 6 + 5] = arr[b * 3 + 2];
      }
      lgeom.attributes.position.needsUpdate = true;
    }

    // gentle camera parallax with mouse
    const [mx, my] = mouse.current;
    state.camera.position.x += (mx * 0.35 - state.camera.position.x) * 0.04;
    state.camera.position.y += (-my * 0.25 - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group
      onPointerMove={(e) => {
        mouse.current = [e.pointer.x, e.pointer.y];
      }}
    >
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={count}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#D97706"
          sizeAttenuation
          transparent
          opacity={0.85}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={count * 2}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#0F766E"
          transparent
          opacity={0.22}
        />
      </lineSegments>
    </group>
  );
}

export default function Hero3DScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.6], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.6} />
      <NeuralField count={240} />
    </Canvas>
  );
}
