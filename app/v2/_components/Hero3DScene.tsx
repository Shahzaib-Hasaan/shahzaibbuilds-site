'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const COUNT = 320;

function buildHelix(count: number) {
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const strand = i % 2 === 0 ? 1 : -1;
    const t = (i / count) * Math.PI * 6;
    const r = 0.55;
    out[i * 3] = strand * r * Math.cos(t);
    out[i * 3 + 1] = (i / count - 0.5) * 3.0;
    out[i * 3 + 2] = strand * r * Math.sin(t);
  }
  return out;
}

function buildLattice(count: number) {
  const out = new Float32Array(count * 3);
  const side = Math.ceil(Math.sqrt(count));
  for (let i = 0; i < count; i++) {
    const col = i % side;
    const row = Math.floor(i / side) % side;
    out[i * 3] = (col / (side - 1) - 0.5) * 2.2;
    out[i * 3 + 1] = (row / (side - 1) - 0.5) * 2.2;
    out[i * 3 + 2] = Math.sin(col * 0.9 + row * 0.7) * 0.4;
  }
  return out;
}

type ProgressRef = { value: number };

function MorphCloud({ progress }: { progress: ProgressRef }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouse = useRef<[number, number]>([0, 0]);

  const helix = useMemo(() => buildHelix(COUNT), []);
  const lattice = useMemo(() => buildLattice(COUNT), []);
  const positions = useMemo(() => new Float32Array(COUNT * 3), []);
  const linePositions = useMemo(() => new Float32Array(COUNT * 6), []);
  const colorBuf = useMemo(() => new Float32Array(COUNT * 3), []);

  const tealColor = useMemo(() => new THREE.Color('#0F766E'), []);
  const amberColor = useMemo(() => new THREE.Color('#D97706'), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = progress.value; // 0..1 helix → lattice
    const eased = p * p * (3 - 2 * p);

    const arr = positions;
    for (let i = 0; i < COUNT; i++) {
      const base = i * 3;
      const wobble = Math.sin(t * 0.7 + i * 0.13) * 0.04;
      const wobbleY = Math.cos(t * 0.5 + i * 0.21) * 0.04;
      arr[base] = THREE.MathUtils.lerp(helix[base], lattice[base], eased) + wobble;
      arr[base + 1] = THREE.MathUtils.lerp(helix[base + 1], lattice[base + 1], eased) + wobbleY;
      arr[base + 2] = THREE.MathUtils.lerp(helix[base + 2], lattice[base + 2], eased);

      // color shift teal→amber with same factor
      const c = i * 3;
      const r = THREE.MathUtils.lerp(tealColor.r, amberColor.r, eased);
      const g = THREE.MathUtils.lerp(tealColor.g, amberColor.g, eased);
      const b = THREE.MathUtils.lerp(tealColor.b, amberColor.b, eased);
      colorBuf[c] = r;
      colorBuf[c + 1] = g;
      colorBuf[c + 2] = b;
    }

    const geom = pointsRef.current?.geometry as THREE.BufferGeometry | undefined;
    if (geom) {
      const pos = geom.attributes.position.array as Float32Array;
      pos.set(arr);
      geom.attributes.position.needsUpdate = true;
      const col = geom.attributes.color.array as Float32Array;
      col.set(colorBuf);
      geom.attributes.color.needsUpdate = true;
    }

    // build line segments — pair each point with its k+stride neighbor
    const lgeom = linesRef.current?.geometry as THREE.BufferGeometry | undefined;
    if (lgeom) {
      const lp = lgeom.attributes.position.array as Float32Array;
      const stride = eased < 0.5 ? 1 : 7; // helix: adjacent strand; lattice: skip
      for (let i = 0; i < COUNT; i++) {
        const a = i;
        const b = (i + stride) % COUNT;
        lp[i * 6] = arr[a * 3];
        lp[i * 6 + 1] = arr[a * 3 + 1];
        lp[i * 6 + 2] = arr[a * 3 + 2];
        lp[i * 6 + 3] = arr[b * 3];
        lp[i * 6 + 4] = arr[b * 3 + 1];
        lp[i * 6 + 5] = arr[b * 3 + 2];
      }
      lgeom.attributes.position.needsUpdate = true;
    }

    // mouse parallax
    const [mx, my] = mouse.current;
    state.camera.position.x += (mx * 0.45 - state.camera.position.x) * 0.04;
    state.camera.position.y += (-my * 0.3 - state.camera.position.y) * 0.04;
    // gentle rotation
    if (pointsRef.current) {
      pointsRef.current.rotation.y = Math.sin(t * 0.15) * 0.15 + eased * Math.PI * 0.1;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = pointsRef.current?.rotation.y ?? 0;
    }
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
          <bufferAttribute attach="attributes-position" args={[positions, 3]} count={COUNT} />
          <bufferAttribute attach="attributes-color" args={[colorBuf, 3]} count={COUNT} />
        </bufferGeometry>
        <pointsMaterial
          size={0.055}
          sizeAttenuation
          transparent
          opacity={0.92}
          vertexColors
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} count={COUNT * 2} />
        </bufferGeometry>
        <lineBasicMaterial color="#9CA3AF" transparent opacity={0.18} />
      </lineSegments>
    </group>
  );
}

function ResponsiveCamera() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 0, 4.4);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  return null;
}

export default function Hero3DScene() {
  const progressRef = useRef<ProgressRef>({ value: 0 });
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    if (mq.matches) {
      progressRef.current.value = 1;
      return;
    }

    let raf = 0;
    const update = () => {
      const winH = window.innerHeight || 1;
      const y = window.scrollY;
      const p = Math.max(0, Math.min(1, y / (winH * 0.9)));
      progressRef.current.value = p;
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 4.4], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
      frameloop={reduced ? 'demand' : 'always'}
    >
      <ResponsiveCamera />
      <ambientLight intensity={0.7} />
      <MorphCloud progress={progressRef.current} />
    </Canvas>
  );
}
