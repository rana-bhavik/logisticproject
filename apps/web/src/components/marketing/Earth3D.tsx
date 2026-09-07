import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, useTexture, QuadraticBezierLine, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { LineMaterial } from 'three-stdlib';

// Helper to convert Lat/Lon to 3D spherical coordinates
const latLongToVector3 = (lat: number, lon: number, radius: number): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = (radius * Math.cos(phi));

  return new THREE.Vector3(x, y, z);
};

// Define some global shipping routes (Lat, Lon pairs)
const routes = [
  // New York to London
  { start: { lat: 40.7128, lon: -74.0060 }, end: { lat: 51.5074, lon: -0.1278 } },
  // London to Tokyo
  { start: { lat: 51.5074, lon: -0.1278 }, end: { lat: 35.6762, lon: 139.6503 } },
  // Tokyo to Sydney
  { start: { lat: 35.6762, lon: 139.6503 }, end: { lat: -33.8688, lon: 151.2093 } },
  // Sydney to Los Angeles
  { start: { lat: -33.8688, lon: 151.2093 }, end: { lat: 34.0522, lon: -118.2437 } },
  // Los Angeles to New York
  { start: { lat: 34.0522, lon: -118.2437 }, end: { lat: 40.7128, lon: -74.0060 } },
  // Dubai to Singapore
  { start: { lat: 25.2048, lon: 55.2708 }, end: { lat: 1.3521, lon: 103.8198 } },
  // Singapore to Shanghai
  { start: { lat: 1.3521, lon: 103.8198 }, end: { lat: 31.2304, lon: 121.4737 } },
  // Shanghai to Rotterdam
  { start: { lat: 31.2304, lon: 121.4737 }, end: { lat: 51.9225, lon: 4.4791 } },
  // Frankfurt to New York
  { start: { lat: 50.1109, lon: 8.6821 }, end: { lat: 40.7128, lon: -74.0060 } },
  // Hong Kong to LA
  { start: { lat: 22.3193, lon: 114.1694 }, end: { lat: 34.0522, lon: -118.2437 } },
  // Cape Town to London
  { start: { lat: -33.9249, lon: 18.4241 }, end: { lat: 51.5074, lon: -0.1278 } },
  // Rio to Miami
  { start: { lat: -22.9068, lon: -43.1729 }, end: { lat: 25.7617, lon: -80.1918 } },
  // Mumbai to Dubai
  { start: { lat: 19.0760, lon: 72.8777 }, end: { lat: 25.2048, lon: 55.2708 } },
  // Singapore to Sydney
  { start: { lat: 1.3521, lon: 103.8198 }, end: { lat: -33.8688, lon: 151.2093 } },
  // Shanghai to Tokyo
  { start: { lat: 31.2304, lon: 121.4737 }, end: { lat: 35.6762, lon: 139.6503 } },
  // New York to Rio
  { start: { lat: 40.7128, lon: -74.0060 }, end: { lat: -22.9068, lon: -43.1729 } },
];

const AnimatedRoute = ({ arc }: { arc: any }) => {
  const lineRef = useRef<any>(null);

  useFrame((_, delta) => {
    if (lineRef.current?.material) {
      // Animate the dash offset to simulate continuous movement along the wave
      lineRef.current.material.dashOffset -= delta * 1.5;
    }
  });

  return (
    <>
      <QuadraticBezierLine
        ref={lineRef}
        start={arc.start}
        end={arc.end}
        mid={arc.mid}
        color="#a6bc36"
        lineWidth={0.8} // Slimmer lines
        dashed={true}
        dashScale={10}
        dashSize={1}
        dashOffset={0}
        transparent
        opacity={0.6}
      />
      {/* Endpoint dots */}
      <mesh position={arc.start}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshStandardMaterial color="#a6bc36" emissive="#a6bc36" emissiveIntensity={3} toneMapped={false} />
      </mesh>
      <mesh position={arc.end}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshStandardMaterial color="#a6bc36" emissive="#a6bc36" emissiveIntensity={3} toneMapped={false} />
      </mesh>
    </>
  );
};

export const Earth3D: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Load high-res Earth textures for a premium look
  const [colorMap, specularMap, bumpMap, emissiveMap] = useTexture([
    'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
    'https://unpkg.com/three-globe/example/img/earth-water.png',
    'https://unpkg.com/three-globe/example/img/earth-topology.png',
    'https://unpkg.com/three-globe/example/img/earth-night.jpg'
  ]);

  // Slowly rotate the globe continuously
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  const radius = 2.2; // Full, clear view of the globe

  // Pre-calculate arcs for performance
  const arcs = useMemo(() => {
    return routes.map(route => {
      const start = latLongToVector3(route.start.lat, route.start.lon, radius);
      const end = latLongToVector3(route.end.lat, route.end.lon, radius);
      
      const distance = start.distanceTo(end);
      const elevation = distance * 0.2;
      const mid = start.clone().lerp(end, 0.5).normalize().multiplyScalar(radius + elevation);

      return { start, end, mid };
    });
  }, [radius]);

  return (
    // Centered, full globe view with a slight tilt
    <group ref={groupRef} rotation={[0.2, -Math.PI / 2, 0]}>
      
      {/* Starfield Background */}
      <Stars radius={100} depth={50} count={4000} factor={4} saturation={0} fade speed={1} />

      {/* Real Earth Sphere with Half-Day / Half-Night */}
      <Sphere args={[radius, 64, 64]}>
        <meshStandardMaterial 
          map={colorMap} 
          roughnessMap={specularMap}
          bumpMap={bumpMap}
          bumpScale={0.05}
          emissiveMap={emissiveMap}
          emissive={new THREE.Color(0xffffee)} // slightly warm city lights
          emissiveIntensity={2.5} // very bright city lights
          metalness={0.1}
          roughness={0.8}
        />
      </Sphere>

      {/* Connection Arcs (Waves) */}
      {arcs.map((arc, i) => (
        <AnimatedRoute key={i} arc={arc} />
      ))}
    </group>
  );
};
