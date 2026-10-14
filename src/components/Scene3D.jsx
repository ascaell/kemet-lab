import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles, MeshDistortMaterial, Sphere, Line, Html } from '@react-three/drei';
import * as THREE from 'three';
import { usePharmaStore } from '../store/usePharmaStore';

function BotanicalCore({ plant, isScientific }) {
    const groupRef = useRef();
    const coreRef = useRef();

    // Génération procédurale de la structure moléculaire (atomes + liaisons chimiques)
    const moleculeData = useMemo(() => {
        const atoms = [];
        const bonds = [];
        const count = plant.scientificProof.atomsCount || 18;

        for (let i = 0; i < count; i++) {
            const phi = Math.acos(-1 + (2 * i) / count);
            const theta = Math.sqrt(count * Math.PI) * phi;
            const radius = 1.6 + (i % 3) * 0.45;

            atoms.push({
                id: i,
                position: new THREE.Vector3(
                    radius * Math.cos(theta) * Math.sin(phi),
                    radius * Math.sin(theta) * Math.sin(phi),
                    radius * Math.cos(phi)
                ),
                type: i % 4 === 0 ? 'O' : i % 5 === 0 ? 'N' : 'C',
                size: i % 4 === 0 ? 0.22 : 0.16
            });
        }

        // Créer les liaisons entre atomes proches
        for (let i = 0; i < atoms.length; i++) {
            for (let j = i + 1; j < atoms.length; j++) {
                if (atoms[i].position.distanceTo(atoms[j].position) < 1.65) {
                    bonds.push([atoms[i].position, atoms[j].position]);
                }
            }
        }

        return { atoms, bonds };
    }, [plant]);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * (isScientific ? 0.35 : 0.18);
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.12;
        }
        if (coreRef.current) {
            const targetScale = isScientific ? 0.45 : 1.35;
            coreRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
        }
    });

    return (
        <group ref={groupRef}>
            {/* Coeur Organique (dominant en mode Ancestral) */}
            <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
                <Sphere ref={coreRef} args={[1, 64, 64]}>
                    <MeshDistortMaterial
                        color={plant.color}
                        emissive={plant.color}
                        emissiveIntensity={isScientific ? 0.15 : 0.45}
                        roughness={0.2}
                        metalness={0.6}
                        distort={isScientific ? 0.15 : 0.45}
                        speed={2.5}
                        wireframe={isScientific}
                    />
                </Sphere>
            </Float>

            {/* Anneaux Botaniques / Orbites */}
            <mesh rotation={[Math.PI / 2.5, 0, 0]}>
                <torusGeometry args={[2.3, 0.012, 16, 100]} />
                <meshBasicMaterial color={plant.moleculeColor} transparent opacity={0.35} />
            </mesh>

            {/* Structure Moléculaire 3D (déployée en mode Scientifique) */}
            {isScientific && (
                <group>
                    {moleculeData.atoms.map((atom) => (
                        <mesh key={atom.id} position={atom.position}>
                            <sphereGeometry args={[atom.size, 32, 32]} />
                            <meshStandardMaterial
                                color={
                                    atom.type === 'O'
                                        ? '#ef4444' // Oxygène (Rouge)
                                        : atom.type === 'N'
                                            ? '#3b82f6' // Azote (Bleu)
                                            : plant.moleculeColor // Carbone
                                }
                                emissive={plant.moleculeColor}
                                emissiveIntensity={0.4}
                                roughness={0.1}
                                metalness={0.8}
                            />
                        </mesh>
                    ))}

                    {moleculeData.bonds.map((bond, idx) => (
                        <Line
                            key={idx}
                            points={bond}
                            color={plant.moleculeColor}
                            lineWidth={1.8}
                            transparent
                            opacity={0.65}
                        />
                    ))}
                </group>
            )}

            {/* Étiquette Holographique 3D */}
            <Html position={[0, -2.5, 0]} center distanceFactor={8}>
                <div
                    style={{
                        background: 'rgba(10, 14, 18, 0.85)',
                        border: `1px solid ${plant.color}`,
                        padding: '6px 14px',
                        borderRadius: '999px',
                        color: '#fff',
                        fontSize: '12px',
                        whiteSpace: 'nowrap',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        boxShadow: `0 0 20px ${plant.color}44`
                    }}
                >
                    {isScientific ? plant.scientificProof.mainMolecule : plant.name}
                </div>
            </Html>
        </group>
    );
}

export default function Scene3D() {
    const { selectedPlant, viewMode } = usePharmaStore();
    const isScientific = viewMode === 'scientific';

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <color attach="background" args={['#070a0e']} />
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color={selectedPlant.moleculeColor} />
                <pointLight position={[-10, -10, -5]} intensity={0.8} color="#fbbf24" />

                <Sparkles
                    count={90}
                    scale={7}
                    size={1.8}
                    speed={0.4}
                    color={selectedPlant.moleculeColor}
                />

                <BotanicalCore plant={selectedPlant} isScientific={isScientific} />

                <OrbitControls
                    enablePan={false}
                    minDistance={3.5}
                    maxDistance={9}
                    autoRotate={false}
                />
            </Canvas>
        </div>
    );
}