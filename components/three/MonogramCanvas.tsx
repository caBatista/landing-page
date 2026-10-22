"use client";

import { Environment, Lightformer } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { ExtrudeGeometry, MathUtils, type Group } from "three";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
import { monogramSvg } from "@/components/brand/monogram";
import { site } from "@/content/site";

type Input = { x: number; y: number };

/** Phones and tablets get a lighter scene: lower resolution, simpler bevel, no clearcoat pass. */
const TOUCH = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

/** Extruded CB monogram from the same path data as the SVG logo. */
function useMonogramGeometry() {
  return useMemo(() => {
    const data = new SVGLoader().parse(monogramSvg(site.logo, "#000"));
    const shapes = data.paths.flatMap((path) => path.toShapes());
    const geometry = new ExtrudeGeometry(shapes, {
      depth: 26,
      bevelEnabled: true,
      bevelThickness: 5,
      bevelSize: 3,
      bevelSegments: TOUCH ? 3 : 8,
      curveSegments: TOUCH ? 14 : 32,
    });
    geometry.center();
    return geometry;
  }, []);
}

function Monogram({ input }: { input: React.RefObject<Input> }) {
  const group = useRef<Group>(null);
  const geometry = useMonogramGeometry();
  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const { x, y } = input.current;
    g.rotation.y = MathUtils.damp(g.rotation.y, x * 0.45 + Math.sin(t * 0.6) * 0.06, 3, delta);
    g.rotation.x = MathUtils.damp(g.rotation.x, -y * 0.3 + Math.cos(t * 0.5) * 0.04, 3, delta);
    g.position.y = Math.sin(t * 0.8) * 0.06;
  });

  return (
    <group ref={group}>
      {/* SVG space is y-down: flip and scale to world units. */}
      <mesh geometry={geometry} scale={[0.024, -0.024, 0.024]}>
        <meshPhysicalMaterial
          color="#f4b400"
          metalness={0.75}
          roughness={0.22}
          clearcoat={TOUCH ? 0 : 1}
          clearcoatRoughness={0.15}
          envMapIntensity={0.9}
        />
      </mesh>
    </group>
  );
}

type MonogramCanvasProps = {
  /** Normalised pointer/scroll input in [-1, 1], written by the parent. */
  input: React.RefObject<Input>;
  active: boolean;
  onReady: () => void;
};

export default function MonogramCanvas({ input, active, onReady }: MonogramCanvasProps) {
  return (
    <Canvas
      dpr={TOUCH ? [1, 1.5] : [1, 1.75]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 9], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={() => requestAnimationFrame(onReady)}
      aria-hidden
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} />
      <Monogram input={input} />
      {/* Studio lighting rendered locally: no HDR download. */}
      <Environment resolution={TOUCH ? 128 : 256} frames={1}>
        <Lightformer form="rect" intensity={1.4} position={[-4, 3, 8]} scale={[7, 4, 1]} />
        <Lightformer
          form="rect"
          color="#e08a00"
          intensity={0.6}
          position={[4, -3, 8]}
          scale={[8, 3, 1]}
        />
        <Lightformer form="rect" intensity={1.6} position={[0, 4, 4]} scale={[10, 2, 1]} />
        <Lightformer
          form="rect"
          intensity={1.2}
          position={[-5, 0, 2]}
          rotation-y={Math.PI / 2}
          scale={[8, 3, 1]}
        />
        <Lightformer
          form="rect"
          intensity={0.9}
          position={[5, -1, 2]}
          rotation-y={-Math.PI / 2}
          scale={[8, 3, 1]}
        />
        <Lightformer form="ring" color="#e08a00" intensity={2} position={[0, -3, -4]} scale={4} />
      </Environment>
    </Canvas>
  );
}
