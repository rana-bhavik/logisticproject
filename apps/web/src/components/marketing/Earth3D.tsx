import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Line } from '@react-three/drei';

// -- PROCEDURAL VEHICLE COMPONENTS --

const Airplane = () => {
  return (
    <group scale={0.3}>
      {/* Fuselage */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry args={[0.4, 0.4, 3.5, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
      </mesh>
      {/* Wings */}
      <mesh position={[0.2, 0, 0]}>
        <boxGeometry args={[1.5, 0.1, 4]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Tail */}
      <mesh position={[-1.4, 0.5, 0]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.5, 1, 0.1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
};

const Truck = () => {
  return (
    <group scale={0.25}>
      {/* Cab */}
      <mesh position={[1.5, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#e63946" roughness={0.4} />
      </mesh>
      {/* Trailer */}
      <mesh position={[-0.5, 0.6, 0]}>
        <boxGeometry args={[2.8, 1.2, 1.1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Wheels */}
      {[-1.5, 0, 1.5].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.6]} rotation={[Math.PI/2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
      ))}
      {[-1.5, 0, 1.5].map((x, i) => (
        <mesh key={`l-${i}`} position={[x, 0, -0.6]} rotation={[Math.PI/2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
      ))}
    </group>
  );
};

const Ship = () => {
  return (
    <group scale={0.25}>
      {/* Hull */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[5, 1, 1.5]} />
        <meshStandardMaterial color="#e63946" />
      </mesh>
      <mesh position={[2.5, 0, 0]} rotation={[0, 0, -Math.PI/2]}>
         <cylinderGeometry args={[0.75, 0.75, 1, 16]} />
         <meshStandardMaterial color="#e63946" />
      </mesh>
      {/* Bridge */}
      <mesh position={[-1.5, 1, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Containers */}
      <mesh position={[0.5, 0.75, 0.3]}>
        <boxGeometry args={[0.8, 0.5, 0.4]} />
        <meshStandardMaterial color="#457b9d" />
      </mesh>
      <mesh position={[1.5, 0.75, -0.3]}>
        <boxGeometry args={[0.8, 0.5, 0.4]} />
        <meshStandardMaterial color="#fca311" />
      </mesh>
      <mesh position={[0.5, 1.25, 0.3]}>
        <boxGeometry args={[0.8, 0.5, 0.4]} />
        <meshStandardMaterial color="#2a9d8f" />
      </mesh>
    </group>
  );
};

const Train = () => {
  return (
    <group scale={0.25}>
      {/* Engine */}
      <mesh position={[1.5, 0.5, 0]}>
        <boxGeometry args={[1.5, 1, 1]} />
        <meshStandardMaterial color="#fca311" />
      </mesh>
      {/* Cars */}
      {[-0.5, -2.5, -4.5].map((x, i) => (
        <mesh key={i} position={[x, 0.5, 0]}>
          <boxGeometry args={[1.8, 1, 1]} />
          <meshStandardMaterial color="#8d99ae" />
        </mesh>
      ))}
    </group>
  );
};

// -- ANIMATED ROUTE LOGIC --

interface RouteProps {
  points: [number, number, number][];
  VehicleComponent: React.FC;
  speed?: number;
  yOffset?: number;
}

const AnimatedVehicleRoute: React.FC<RouteProps> = ({ points, VehicleComponent, speed = 1, yOffset = 0 }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(p[0], p[1], p[2])));
  }, [points]);

  const linePoints = useMemo(() => curve.getPoints(100), [curve]);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Smooth infinite loop timing
    const time = (state.clock.getElapsedTime() * 0.05 * speed) % 1;
    
    const position = curve.getPointAt(time);
    const lookAtPosition = curve.getPointAt((time + 0.01) % 1);
    
    groupRef.current.position.copy(position);
    groupRef.current.position.y += yOffset; 
    groupRef.current.lookAt(lookAtPosition);
    
    // Subtle vehicle bounce
    if (yOffset === 0) {
      groupRef.current.position.y += Math.abs(Math.sin(time * Math.PI * 60)) * 0.05;
    } else {
      // Plane floats smoothly
      groupRef.current.position.y += Math.sin(time * Math.PI * 10) * 0.2;
      groupRef.current.rotation.z += Math.sin(time * Math.PI * 5) * 0.1;
    }
  });

  return (
    <group>
      {/* Dashed Path Line */}
      <Line 
        points={linePoints} 
        color="#ffffff" 
        lineWidth={1.5}
        dashed 
        dashScale={5} 
        dashSize={2} 
        dashOffset={0}
        transparent 
        opacity={0.6} 
      />
      {/* Map Nodes (Endpoints) */}
      <mesh position={points[0]} rotation={[-Math.PI/2, 0, 0]}>
        <circleGeometry args={[0.3, 32]} />
        <meshBasicMaterial color="#ffffff" />
        <mesh position={[0,0,0.01]}>
           <circleGeometry args={[0.15, 32]} />
           <meshBasicMaterial color="#178b90" />
        </mesh>
      </mesh>
      <mesh position={points[points.length-1]} rotation={[-Math.PI/2, 0, 0]}>
        <circleGeometry args={[0.3, 32]} />
        <meshBasicMaterial color="#ffffff" />
        <mesh position={[0,0,0.01]}>
           <circleGeometry args={[0.15, 32]} />
           <meshBasicMaterial color="#178b90" />
        </mesh>
      </mesh>

      {/* The moving vehicle */}
      <group ref={groupRef}>
        <VehicleComponent />
      </group>
    </group>
  );
};

export const Earth3D: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  // Slow continuous spin of the entire map
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(Date.now() * 0.0005) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Base Map Surface (Bright Teal) */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[25, 20]} />
        <meshStandardMaterial color="#178b90" roughness={0.3} metalness={0.2} />
      </mesh>
      
      {/* Abstract Grid to give it scale and context */}
      <gridHelper args={[25, 25, 0xffffff, 0xffffff]} position={[0, -0.05, 0]} material-opacity={0.15} material-transparent />

      {/* Routes & Vehicles */}
      {/* Ship Route (Ocean curve) */}
      <AnimatedVehicleRoute 
        points={[[-8, 0, 5], [-3, 0, 6], [4, 0, 5], [9, 0, 3]]} 
        VehicleComponent={Ship} 
        speed={0.8}
      />
      {/* Plane Route (Air curve) */}
      <AnimatedVehicleRoute 
        points={[[-9, 0, -5], [-4, 0, -2], [3, 0, -4], [9, 0, -6]]} 
        VehicleComponent={Airplane} 
        speed={2.0}
        yOffset={3.0}
      />
      {/* Truck Route (Land zig-zag) */}
      <AnimatedVehicleRoute 
        points={[[-6, 0, -2], [-2, 0, 1], [3, 0, 0], [7, 0, 4]]} 
        VehicleComponent={Truck} 
        speed={1.4}
      />
      {/* Train Route (Long curve) */}
      <AnimatedVehicleRoute 
        points={[[-8, 0, 1], [-2, 0, -2], [4, 0, -1], [8, 0, -2]]} 
        VehicleComponent={Train} 
        speed={1.1}
      />
    </group>
  );
};
