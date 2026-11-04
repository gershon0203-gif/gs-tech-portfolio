import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { doors } from '../../data/doors'
import { archOutline, archShape } from './geometry'

const DOOR_WIDTH = 1.46
const DOOR_HEIGHT = 3.52
const FRAME_DEPTH = 0.24
const PANEL_DEPTH = 0.16

const FOG_COLOR = '#030913'
const FLOOR_COLOR = '#06101d'

function DoorUnit({
  index,
  hovered,
  opening,
  labelsReady,
  onHover,
  onOpen,
}: {
  index: number
  hovered: number | null
  opening: number | null
  labelsReady: boolean
  onHover: (index: number | null) => void
  onOpen: (index: number) => void
}) {
  const door = doors[index]
  const panelRef = useRef<THREE.Group>(null)
  const accent = door.finish.accent
  const isHovered = hovered === index
  const isOpening = opening === index

  const panelShape = useMemo(() => archShape(DOOR_WIDTH, DOOR_HEIGHT), [])
  const frameShape = useMemo(
    () => archOutline(DOOR_WIDTH, DOOR_HEIGHT, 0.15),
    [],
  )
  const lightShape = useMemo(
    () => archShape(DOOR_WIDTH - 0.05, DOOR_HEIGHT - 0.05, 0.03),
    [],
  )

  const panelSettings = useMemo(
    () => ({
      depth: PANEL_DEPTH,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.018,
      bevelThickness: 0.018,
      curveSegments: 24,
      steps: 1,
    }),
    [],
  )

  const frameSettings = useMemo(
    () => ({
      depth: FRAME_DEPTH,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.02,
      bevelThickness: 0.02,
      curveSegments: 24,
      steps: 1,
    }),
    [],
  )

  useFrame((_, delta) => {
    const panel = panelRef.current
    if (!panel) return
    const target = isOpening ? -1.78 : isHovered ? -0.14 : 0
    panel.rotation.y = THREE.MathUtils.damp(
      panel.rotation.y,
      target,
      isOpening ? 4.2 : 7.5,
      delta,
    )
  })

  useEffect(() => {
    if (!isHovered) return
    document.body.style.cursor = 'pointer'
    return () => {
      document.body.style.cursor = ''
    }
  }, [isHovered])

  return (
    <group position={door.position}>
      {/* The recess sits in front of the back wall; the open door reveals it. */}
      <mesh position={[0, 0.04, -0.34]} renderOrder={1}>
        <shapeGeometry args={[lightShape]} />
        <meshBasicMaterial
          color={isOpening ? '#ffffff' : '#b8dcff'}
          transparent
          opacity={isOpening ? 1 : isHovered ? 0.85 : 0.5}
          toneMapped={false}
        />
      </mesh>

      <pointLight
        position={[0, 1.7, -0.06]}
        color={isOpening ? '#ffffff' : accent}
        intensity={isOpening ? 26 : isHovered ? 12 : 5}
        distance={5.2}
        decay={2}
      />

      {/* Stone frame around a real opening. */}
      <mesh position={[0, 0, -0.06]} castShadow={false} receiveShadow={false}>
        <extrudeGeometry args={[frameShape, frameSettings]} />
        <meshStandardMaterial
          color={isHovered ? '#254160' : '#15283c'}
          metalness={0.55}
          roughness={0.32}
          emissive={accent}
          emissiveIntensity={isOpening ? 0.85 : isHovered ? 0.42 : 0.1}
        />
      </mesh>

      {/* Fluted pilasters give the frames weight. */}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * (DOOR_WIDTH / 2 + 0.34), 0, 0.02]}>
          <mesh position={[0, (DOOR_HEIGHT + 0.3) / 2 - 0.08, 0]}>
            <boxGeometry args={[0.22, DOOR_HEIGHT + 0.3, 0.3]} />
            <meshStandardMaterial
              color="#0b1828"
              metalness={0.58}
              roughness={0.4}
            />
          </mesh>
          <mesh position={[0, DOOR_HEIGHT + 0.16, 0.02]}>
            <boxGeometry args={[0.3, 0.12, 0.36]} />
            <meshStandardMaterial color="#1b3450" metalness={0.6} roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* Plinth + lit threshold. */}
      <mesh position={[0, 0.07, 0.09]}>
        <boxGeometry args={[DOOR_WIDTH + 0.7, 0.14, 0.42]} />
        <meshStandardMaterial color="#16293e" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.145, 0.12]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[DOOR_WIDTH + 0.18, 0.05]} />
        <meshBasicMaterial
          color={accent}
          transparent
          opacity={isOpening ? 1 : isHovered ? 0.85 : 0.38}
          toneMapped={false}
        />
      </mesh>

      {/* The physical leaf, hinged on the left. */}
      <group ref={panelRef} position={[-DOOR_WIDTH / 2, 0, 0]}>
        <group position={[DOOR_WIDTH / 2, 0, 0.03]}>
          <mesh>
            <extrudeGeometry args={[panelShape, panelSettings]} />
            <meshStandardMaterial
              color={door.finish.color}
              metalness={door.finish.metalness}
              roughness={door.finish.roughness}
              emissive={accent}
              emissiveIntensity={isOpening ? 0.22 : isHovered ? 0.11 : 0.025}
            />
          </mesh>

          {/* Moulded surface: grooves and a cross rail. */}
          {[-0.43, 0, 0.43].map((x) => (
            <mesh key={x} position={[x, 1.43, PANEL_DEPTH + 0.004]}>
              <boxGeometry args={[0.014, DOOR_HEIGHT - 0.9, 0.012]} />
              <meshStandardMaterial
                color="#02070d"
                metalness={0.2}
                roughness={0.75}
              />
            </mesh>
          ))}
          <mesh position={[0, 1.18, PANEL_DEPTH + 0.008]}>
            <boxGeometry args={[DOOR_WIDTH - 0.28, 0.028, 0.014]} />
            <meshStandardMaterial color="#02070d" roughness={0.7} metalness={0.2} />
          </mesh>
          <mesh position={[0, DOOR_HEIGHT - 1.28, PANEL_DEPTH + 0.008]}>
            <boxGeometry args={[DOOR_WIDTH - 0.34, 0.022, 0.012]} />
            <meshStandardMaterial color="#02070d" roughness={0.7} metalness={0.2} />
          </mesh>

          {/* Number plaque. */}
          <mesh position={[0, 2.68, PANEL_DEPTH + 0.01]}>
            <planeGeometry args={[0.42, 0.16]} />
            <meshStandardMaterial
              color="#d9e8f7"
              metalness={0.7}
              roughness={0.28}
              emissive={accent}
              emissiveIntensity={isHovered ? 0.35 : 0.08}
            />
          </mesh>

          {/* Handle: rosette, lever, and a bright catch of light. */}
          <group position={[DOOR_WIDTH * 0.33, 1.48, PANEL_DEPTH + 0.05]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.085, 0.085, 0.045, 24]} />
              <meshStandardMaterial
                color="#cfe3f7"
                metalness={1}
                roughness={0.18}
                emissive="#9fd4ff"
                emissiveIntensity={isHovered || isOpening ? 0.55 : 0.12}
              />
            </mesh>
            <mesh position={[0.12, 0, 0.055]} rotation={[0, 0, -0.06]}>
              <boxGeometry args={[0.3, 0.042, 0.05]} />
              <meshStandardMaterial
                color="#e8f4ff"
                metalness={1}
                roughness={0.14}
                emissive="#bfe6ff"
                emissiveIntensity={isHovered || isOpening ? 0.85 : 0.16}
              />
            </mesh>
            <mesh position={[0.28, 0, 0.055]}>
              <sphereGeometry args={[0.036, 16, 16]} />
              <meshStandardMaterial color="#f4fbff" metalness={0.9} roughness={0.12} />
            </mesh>
          </group>

          {/* Hinges. */}
          {[0.58, 1.72, 2.86].map((y) => (
            <mesh key={y} position={[-DOOR_WIDTH / 2 + 0.035, y, PANEL_DEPTH / 2]}>
              <boxGeometry args={[0.035, 0.19, 0.1]} />
              <meshStandardMaterial color="#7e9bb7" metalness={0.95} roughness={0.3} />
            </mesh>
          ))}
        </group>
      </group>

      {/* Click / hover volume slightly larger than the leaf. */}
      <mesh
        position={[0, DOOR_HEIGHT / 2, 0.24]}
        onPointerOver={(event: ThreeEvent<PointerEvent>) => {
          event.stopPropagation()
          onHover(index)
        }}
        onPointerOut={(event: ThreeEvent<PointerEvent>) => {
          event.stopPropagation()
          onHover(null)
        }}
        onClick={(event: ThreeEvent<MouseEvent>) => {
          event.stopPropagation()
          if (opening !== null) return
          onOpen(index)
        }}
      >
        <boxGeometry args={[DOOR_WIDTH + 0.45, DOOR_HEIGHT + 0.3, 0.22]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {labelsReady && (
        <Html
          position={[0, DOOR_HEIGHT + 0.62, 0.2]}
          center
          zIndexRange={[30, 0]}
          style={{ pointerEvents: 'none' }}
          wrapperClass="dw-door-label-wrap"
        >
          <div
            className={`dw-door-label ${isHovered || isOpening ? 'is-lit' : ''}`}
            data-door-index={index}
          >
            <span>{door.number}</span>
            <strong>{door.title}</strong>
            <em>{door.room}</em>
          </div>
        </Html>
      )}
    </group>
  )
}

function Hall({
  opening,
  hovered,
  labelsReady,
  onHover,
  onOpen,
}: {
  opening: number | null
  hovered: number | null
  labelsReady: boolean
  onHover: (index: number | null) => void
  onOpen: (index: number) => void
}) {
  const strips = useMemo(
    () => Array.from({ length: 11 }, (_, i) => -7.2 + i * 1.44),
    [],
  )

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[28, 24]} />
        <meshStandardMaterial
          color={FLOOR_COLOR}
          metalness={0.86}
          roughness={0.25}
          envMapIntensity={0.6}
        />
      </mesh>

      {/* Inlaid guide lines keep the floor architectural, not gridded. */}
      {[-6.2, -3.08, 0, 3.08, 6.2].map((x) => (
        <mesh key={x} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.012, -1.1]}>
          <planeGeometry args={[0.012, 8.4]} />
          <meshBasicMaterial color="#1d4d7c" transparent opacity={0.38} />
        </mesh>
      ))}
      {Array.from({ length: 9 }, (_, i) => -6 + i * 1.5).map((z) => (
        <mesh key={z} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.011, z]}>
          <planeGeometry args={[14.4, 0.01]} />
          <meshBasicMaterial color="#173d62" transparent opacity={0.2} />
        </mesh>
      ))}

      {/* Light pools at the thresholds. */}
      {doors.map((door, index) => (
        <mesh
          key={door.id}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[door.position[0], 0.018, door.position[2] + 1.5]}
        >
          <planeGeometry args={[2.5, 3.9]} />
          <meshBasicMaterial
            color={door.finish.accent}
            transparent
            opacity={opening === index ? 0.18 : hovered === index ? 0.11 : 0.045}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}

      {/* Back wall + vertical seams. */}
      <mesh position={[0, 5, -5.35]}>
        <boxGeometry args={[26, 10, 0.32]} />
        <meshStandardMaterial color="#030a13" metalness={0.3} roughness={0.72} />
      </mesh>
      {strips.map((x) => (
        <mesh key={x} position={[x, 5, -5.17]}>
          <boxGeometry args={[0.016, 9.6, 0.012]} />
          <meshBasicMaterial color="#1f5b91" transparent opacity={0.34} />
        </mesh>
      ))}

      {/* Side walls catch the blue rim light. */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 8.4, 4.4, -1.1]} rotation={[0, side * 0.28, 0]}>
          <boxGeometry args={[0.45, 8.8, 18]} />
          <meshStandardMaterial color="#06101c" metalness={0.35} roughness={0.68} />
        </mesh>
      ))}

      {/* Columns between the doors. */}
      {[-6.3, -3.08, 0, 3.08, 6.3].map((x) => (
        <group key={x} position={[x, 0, -4.5]}>
          <mesh position={[0, 3.12, 0]}>
            <cylinderGeometry args={[0.17, 0.21, 6.24, 28]} />
            <meshStandardMaterial color="#0b1b2c" metalness={0.7} roughness={0.34} />
          </mesh>
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.32, 0.36, 0.2, 28]} />
            <meshStandardMaterial color="#132941" metalness={0.72} roughness={0.3} />
          </mesh>
          <mesh position={[0, 6.18, 0]}>
            <cylinderGeometry args={[0.3, 0.34, 0.18, 28]} />
            <meshStandardMaterial color="#132941" metalness={0.72} roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* Ceiling beam + pendant cables. */}
      <mesh position={[0, 6.42, -4.3]}>
        <boxGeometry args={[15.4, 0.34, 0.8]} />
        <meshStandardMaterial color="#040c16" metalness={0.4} roughness={0.6} />
      </mesh>
      {doors.map((door) => (
        <group key={door.id} position={[door.position[0], 0, -3.9]}>
          <mesh position={[0, 5.55, 0]}>
            <boxGeometry args={[0.018, 1.7, 0.018]} />
            <meshBasicMaterial color="#8fb9df" transparent opacity={0.42} />
          </mesh>
          <mesh position={[0, 4.68, 0]}>
            <sphereGeometry args={[0.055, 16, 16]} />
            <meshBasicMaterial color="#e8f5ff" toneMapped={false} />
          </mesh>
          <pointLight
            position={[0, 4.6, 0]}
            color="#c7e6ff"
            intensity={8}
            distance={6}
            decay={2}
          />
        </group>
      ))}

      {doors.map((door, index) => (
        <DoorUnit
          key={door.id}
          index={index}
          hovered={hovered}
          opening={opening}
          labelsReady={labelsReady}
          onHover={onHover}
          onOpen={onOpen}
        />
      ))}

      {/* A pool of cold light behind the camera lifts the foreground. */}
      <pointLight position={[0, 2.4, 6]} color="#1b5b9d" intensity={12} distance={12} decay={2} />
    </group>
  )
}

function CameraRig({ opening }: { opening: number | null }) {
  const { camera, pointer } = useThree()
  const look = useRef(new THREE.Vector3(0, 1.78, -4.9))
  const target = useRef(new THREE.Vector3(0, 1.9, 8.4))

  useFrame((_, delta) => {
    const door = opening !== null ? doors[opening] : null

    if (door) {
      target.current.set(door.position[0] * 0.72, 1.78, door.position[2] + 5.4)
      look.current.lerp(
        new THREE.Vector3(door.position[0] * 0.86, 1.8, door.position[2] + 0.4),
        1 - Math.exp(-3.2 * delta),
      )
    } else {
      target.current.set(pointer.x * 0.62, 1.92 + pointer.y * 0.16, 8.4)
      look.current.lerp(
        new THREE.Vector3(pointer.x * 0.5, 1.76, -4.9),
        1 - Math.exp(-2.4 * delta),
      )
    }

    const ease = 1 - Math.exp(-3.4 * delta)
    camera.position.x += (target.current.x - camera.position.x) * ease
    camera.position.y += (target.current.y - camera.position.y) * ease
    camera.position.z += (target.current.z - camera.position.z) * ease
    camera.lookAt(look.current)

    const perspective = camera as THREE.PerspectiveCamera
    const nextFov = door ? 44 : 38
    if (Math.abs(perspective.fov - nextFov) > 0.01) {
      perspective.fov += (nextFov - perspective.fov) * ease
      perspective.updateProjectionMatrix()
    }
  })

  return null
}

export interface DoorwaySceneProps {
  opening: number | null
  onOpenDoor: (index: number) => void
  onHoverDoor?: (index: number | null) => void
}

export default function DoorwayScene({
  opening,
  onOpenDoor,
  onHoverDoor,
}: DoorwaySceneProps) {
  const [hovered, setHovered] = useState<number | null>(null)
  const [labelsReady, setLabelsReady] = useState(false)

  const handleHover = (index: number | null) => {
    setHovered(index)
    onHoverDoor?.(index)
  }

  return (
    <div className="dw-scene" aria-hidden="true">
      <Canvas
        dpr={[1, 1.65]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 1.92, 8.4], fov: 38, near: 0.1, far: 55 }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
          // Mount the DOM door plaques only once the canvas exists: drei's Html
          // measures its portal target at mount, and mounting too early can
          // leave the first plaque in a detached wrapper.
          setLabelsReady(true)
        }}
      >
        <color attach="background" args={[FOG_COLOR]} />
        <fog attach="fog" args={[FOG_COLOR, 9, 24]} />

        <ambientLight intensity={0.55} color="#8ab6e6" />
        <hemisphereLight args={['#5c9fe0', '#02060c', 0.8]} />
        <directionalLight position={[2.5, 7, 6]} intensity={0.9} color="#dceeff" />
        <directionalLight position={[-4, 4, -2]} intensity={0.35} color="#377dcc" />

        <Suspense fallback={null}>
          <Hall
            opening={opening}
            hovered={hovered}
            labelsReady={labelsReady}
            onHover={handleHover}
            onOpen={onOpenDoor}
          />
        </Suspense>
        <CameraRig opening={opening} />
      </Canvas>
    </div>
  )
}
