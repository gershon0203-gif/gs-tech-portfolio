import { useMemo, useRef, useState, type MutableRefObject } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Float, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

export type ScreenMode = 'code' | 'canvas' | 'product'

export const screenModes: ScreenMode[] = ['code', 'canvas', 'product']

const CODE_WIDTHS = [0.9, 0.55, 0.72, 0.38, 0.82, 0.62, 0.44, 0.7, 0.5, 0.28]

function ScreenContent({ mode, compact }: { mode: ScreenMode; compact: boolean }) {
  const orbit = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!orbit.current) return
    const t = clock.elapsedTime * 0.4
    orbit.current.position.set(Math.cos(t) * 0.62, 0.08 + Math.sin(t) * 0.34, 0.03)
  })

  return (
    <group position={[0, 1.28, 0.1]}>
      {/* window chrome */}
      <mesh position={[-1.3, 0.71, 0]}>
        <planeGeometry args={[0.06, 0.06]} />
        <meshBasicMaterial color="#d8431c" />
      </mesh>
      <mesh position={[-1.18, 0.71, 0]}>
        <planeGeometry args={[0.32, 0.012]} />
        <meshBasicMaterial color="#f5f3ee" transparent opacity={0.4} />
      </mesh>
      <mesh position={[1.31, 0.71, 0]}>
        <planeGeometry args={[0.06, 0.012]} />
        <meshBasicMaterial color="#f5f3ee" transparent opacity={0.25} />
      </mesh>
      <mesh position={[1.22, 0.71, 0]}>
        <planeGeometry args={[0.06, 0.012]} />
        <meshBasicMaterial color="#f5f3ee" transparent opacity={0.25} />
      </mesh>

      {mode === 'code' && (
        <group>
          {CODE_WIDTHS.slice(0, compact ? 7 : 10).map((width, index) => {
            const isAccent = index === 3 || index === 7
            return (
              <group key={index} position={[0, 0.48 - index * 0.105, 0]}>
                <mesh position={[-1.32, 0, 0]}>
                  <planeGeometry args={[0.025, 0.022]} />
                  <meshBasicMaterial
                    color={isAccent ? '#d8431c' : '#f5f3ee'}
                    transparent
                    opacity={isAccent ? 1 : 0.28}
                  />
                </mesh>
                <mesh position={[-1.26 + (width * 1.0) / 2, 0, 0]}>
                  <planeGeometry args={[width * 1.0, 0.022]} />
                  <meshBasicMaterial
                    color={isAccent ? '#e0633d' : '#f5f3ee'}
                    transparent
                    opacity={isAccent ? 0.9 : 0.52}
                  />
                </mesh>
              </group>
            )
          })}
          <mesh position={[-0.34, 0.48 - 10 * 0.105, 0]}>
            <planeGeometry args={[0.015, 0.09]} />
            <meshBasicMaterial color="#d8431c" />
          </mesh>
          <mesh position={[0.46, 0.48 - 10 * 0.105, 0]}>
            <planeGeometry args={[0.5, 0.014]} />
            <meshBasicMaterial color="#f5f3ee" transparent opacity={0.16} />
          </mesh>
        </group>
      )}

      {mode === 'canvas' && (
        <group>
          {[0.72, 0.52, 0.32].map((radius, index) => (
            <mesh key={radius} position={[0, 0.03, 0]}>
              <ringGeometry args={[radius, radius + 0.006, 96]} />
              <meshBasicMaterial
                color={index === 0 ? '#e0633d' : '#f5f3ee'}
                transparent
                opacity={index === 0 ? 0.75 : 0.24}
              />
            </mesh>
          ))}
          {[
            [-0.98, 0.62],
            [0.98, 0.62],
            [-0.98, -0.56],
            [0.98, -0.56],
          ].map(([x, y]) => (
            <group key={`${x}-${y}`} position={[x, y, 0]}>
              <mesh>
                <planeGeometry args={[0.06, 0.006]} />
                <meshBasicMaterial color="#f5f3ee" transparent opacity={0.4} />
              </mesh>
              <mesh>
                <planeGeometry args={[0.006, 0.06]} />
                <meshBasicMaterial color="#f5f3ee" transparent opacity={0.4} />
              </mesh>
            </group>
          ))}
          <mesh position={[0, 0.03, 0.02]}>
            <ringGeometry args={[0.12, 0.128, 64]} />
            <meshBasicMaterial color="#f5f3ee" transparent opacity={0.8} />
          </mesh>
          <mesh ref={orbit} position={[0.5, 0.3, 0.03]}>
            <circleGeometry args={[0.028, 24]} />
            <meshBasicMaterial color="#d8431c" />
          </mesh>
          <mesh position={[0, -0.63, 0]}>
            <planeGeometry args={[0.5, 0.012]} />
            <meshBasicMaterial color="#d8431c" transparent opacity={0.9} />
          </mesh>
        </group>
      )}

      {mode === 'product' && (
        <group>
          <group position={[-0.83, 0.04, 0]}>
            <mesh>
              <planeGeometry args={[0.78, 0.98]} />
              <meshBasicMaterial color="#f5f3ee" transparent opacity={0.07} />
            </mesh>
            <mesh position={[0, 0.36, 0.01]}>
              <planeGeometry args={[0.56, 0.014]} />
              <meshBasicMaterial color="#f5f3ee" transparent opacity={0.55} />
            </mesh>
            {[0.16, 0.04, -0.08].map((y, i) => (
              <mesh key={y} position={[0, y, 0.01]}>
                <planeGeometry args={[0.56 - i * 0.08, 0.01]} />
                <meshBasicMaterial color="#f5f3ee" transparent opacity={0.22} />
              </mesh>
            ))}
            <mesh position={[-0.18, -0.32, 0.01]}>
              <planeGeometry args={[0.22, 0.08]} />
              <meshBasicMaterial color="#d8431c" />
            </mesh>
          </group>

          <group position={[0, 0.04, 0]}>
            <mesh>
              <planeGeometry args={[0.78, 0.98]} />
              <meshBasicMaterial color="#f5f3ee" transparent opacity={0.07} />
            </mesh>
            {[0.1, 0.28, 0.18, 0.38].map((height, index) => (
              <mesh
                key={index}
                position={[-0.24 + index * 0.16, -0.32 + height / 2, 0.01]}
              >
                <planeGeometry args={[0.09, height]} />
                <meshBasicMaterial
                  color={index === 3 ? '#d8431c' : '#f5f3ee'}
                  transparent
                  opacity={index === 3 ? 1 : 0.35}
                />
              </mesh>
            ))}
          </group>

          <group position={[0.83, 0.04, 0]}>
            <mesh>
              <planeGeometry args={[0.78, 0.98]} />
              <meshBasicMaterial color="#f5f3ee" transparent opacity={0.07} />
            </mesh>
            <mesh position={[0, 0.3, 0.01]}>
              <ringGeometry args={[0.17, 0.175, 48]} />
              <meshBasicMaterial color="#d8431c" />
            </mesh>
            <mesh position={[0, 0.3, 0.01]}>
              <ringGeometry args={[0.24, 0.244, 48]} />
              <meshBasicMaterial color="#f5f3ee" transparent opacity={0.22} />
            </mesh>
            {[0.08, -0.04, -0.16].map((y, i) => (
              <mesh key={y} position={[0, y, 0.01]}>
                <planeGeometry args={[0.5 - i * 0.06, 0.01]} />
                <meshBasicMaterial color="#f5f3ee" transparent opacity={0.25} />
              </mesh>
            ))}
          </group>
        </group>
      )}
    </group>
  )
}

function Monitor({
  mode,
  onCycle,
  compact,
}: {
  mode: ScreenMode
  onCycle: () => void
  compact: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const pulse = useRef(1)
  const monitorRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    const target = hovered ? 1.025 : 1
    pulse.current = THREE.MathUtils.damp(pulse.current, target, 8, delta)
    if (monitorRef.current) monitorRef.current.scale.setScalar(pulse.current)
  })

  return (
    <group position={[0, 0.18, -0.3]}>
      {/* stand */}
      <mesh position={[0, 0.31, -0.12]}>
        <cylinderGeometry args={[0.045, 0.06, 0.38, 24]} />
        <meshStandardMaterial color="#2a2723" roughness={0.5} metalness={0.4} />
      </mesh>
      <RoundedBox
        args={[0.82, 0.035, 0.5]}
        radius={0.02}
        smoothness={3}
        position={[0, 0.13, -0.05]}
      >
        <meshStandardMaterial color="#24211d" roughness={0.55} metalness={0.35} />
      </RoundedBox>

      {/* monitor */}
      <group
        ref={monitorRef}
        position={[0, 0, 0]}
        onPointerOver={(event) => {
          event.stopPropagation()
          setHovered(true)
          if (!compact) document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = ''
        }}
        onClick={(event) => {
          event.stopPropagation()
          onCycle()
        }}
      >
        <RoundedBox
          args={[3.24, 2.02, 0.16]}
          radius={0.06}
          smoothness={4}
          position={[0, 1.28, 0]}
        >
          <meshStandardMaterial color="#2c2925" roughness={0.5} metalness={0.25} />
        </RoundedBox>

        <RoundedBox
          args={[3.02, 1.8, 0.03]}
          radius={0.035}
          smoothness={3}
          position={[0, 1.28, 0.09]}
        >
          <meshStandardMaterial
            color="#22211f"
            roughness={0.35}
            metalness={0.2}
            emissive="#2b2824"
            emissiveIntensity={0.55}
          />
        </RoundedBox>

        <ScreenContent mode={mode} compact={compact} />

        {/* chin detail */}
        <mesh position={[0, 0.4, 0.105]}>
          <planeGeometry args={[0.3, 0.012]} />
          <meshBasicMaterial color="#d8431c" />
        </mesh>
        <mesh position={[0.19, 0.4, 0.105]}>
          <circleGeometry args={[0.012, 12]} />
          <meshBasicMaterial color="#f5f3ee" transparent opacity={0.4} />
        </mesh>
      </group>
    </group>
  )
}

function FloatingCard({
  position,
  rotation,
  variant,
}: {
  position: [number, number, number]
  rotation: [number, number, number]
  variant: 'profile' | 'chart'
}) {
  return (
    <Float speed={1.15} rotationIntensity={0.18} floatIntensity={0.28} floatingRange={[-0.04, 0.06]}>
      <group position={position} rotation={rotation}>
        <RoundedBox args={[1.12, 0.74, 0.035]} radius={0.035} smoothness={3}>
          <meshStandardMaterial color="#26231f" roughness={0.5} metalness={0.25} />
        </RoundedBox>
        <mesh position={[0, 0, 0.021]}>
          <planeGeometry args={[1.06, 0.68]} />
          <meshBasicMaterial color="#f5f3ee" transparent opacity={0.035} />
        </mesh>

        {variant === 'profile' ? (
          <>
            <mesh position={[-0.45, 0.24, 0.03]}>
              <circleGeometry args={[0.055, 24]} />
              <meshBasicMaterial color="#d8431c" />
            </mesh>
            <mesh position={[0.06, 0.26, 0.03]}>
              <planeGeometry args={[0.55, 0.016]} />
              <meshBasicMaterial color="#f5f3ee" transparent opacity={0.6} />
            </mesh>
            <mesh position={[0.06, 0.21, 0.03]}>
              <planeGeometry args={[0.34, 0.012]} />
              <meshBasicMaterial color="#f5f3ee" transparent opacity={0.26} />
            </mesh>
            {[0.08, -0.02, -0.11].map((y, index) => (
              <mesh key={y} position={[-0.14, y, 0.03]}>
                <planeGeometry args={[0.72 - index * 0.12, 0.01]} />
                <meshBasicMaterial color="#f5f3ee" transparent opacity={0.18} />
              </mesh>
            ))}
            <mesh position={[-0.34, -0.25, 0.03]}>
              <planeGeometry args={[0.2, 0.055]} />
              <meshBasicMaterial color="#d8431c" />
            </mesh>
          </>
        ) : (
          <>
            <mesh position={[-0.42, 0.26, 0.03]}>
              <planeGeometry args={[0.28, 0.014]} />
              <meshBasicMaterial color="#f5f3ee" transparent opacity={0.55} />
            </mesh>
            {[0.18, 0.3, 0.12, 0.38, 0.26].map((height, index) => (
              <mesh
                key={index}
                position={[-0.38 + index * 0.16, -0.12 + height / 2 - 0.1, 0.03]}
              >
                <planeGeometry args={[0.08, height]} />
                <meshBasicMaterial
                  color={index === 3 ? '#d8431c' : '#f5f3ee'}
                  transparent
                  opacity={index === 3 ? 1 : 0.3}
                />
              </mesh>
            ))}
            <mesh position={[0.32, -0.24, 0.03]}>
              <circleGeometry args={[0.03, 16]} />
              <meshBasicMaterial color="#d8431c" />
            </mesh>
          </>
        )}
      </group>
    </Float>
  )
}

function Keyboard({ compact }: { compact: boolean }) {
  const cols = compact ? 8 : 10
  const rows = 3
  const keySize = 0.145
  const keys = useMemo(
    () =>
      Array.from({ length: cols * rows }, (_, index) => ({
        x: (index % cols) * keySize - ((cols - 1) * keySize) / 2,
        z: Math.floor(index / cols) * keySize - ((rows - 1) * keySize) / 2,
        index,
      })),
    [cols],
  )

  return (
    <group position={[0, 0.19, 1.18]} rotation={[0, 0, 0]}>
      <RoundedBox args={[1.9, 0.06, 0.72]} radius={0.03} smoothness={3} position={[0, 0, 0]}>
        <meshStandardMaterial color="#2c2925" roughness={0.6} metalness={0.2} />
      </RoundedBox>
      {keys.map(({ x, z, index }) => (
        <mesh key={index} position={[x, 0.038, z]}>
          <boxGeometry args={[keySize * 0.72, 0.018, keySize * 0.72]} />
          <meshStandardMaterial
            color={index === 27 ? '#d8431c' : '#3d3a33'}
            roughness={0.7}
          />
        </mesh>
      ))}
      <mesh position={[0, 0.036, ((rows - 1) * keySize) / 2 + 0.1]}>
        <boxGeometry args={[0.62, 0.018, 0.055]} />
        <meshStandardMaterial color="#3d3a33" roughness={0.7} />
      </mesh>
    </group>
  )
}

function IdeaObject() {
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={0.5}>
      <group position={[1.7, 3.05, -0.45]}>
        <mesh>
          <icosahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial
            color="#d8431c"
            wireframe
            emissive="#d8431c"
            emissiveIntensity={0.4}
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.11, 0]} />
          <meshStandardMaterial color="#f5f3ee" roughness={0.4} metalness={0.3} />
        </mesh>
      </group>
    </Float>
  )
}

export function Workbench({
  mode,
  onCycle,
  compact,
  progressRef,
}: {
  mode: ScreenMode
  onCycle: () => void
  compact: boolean
  progressRef: MutableRefObject<number>
}) {
  const parallax = useRef<THREE.Group>(null)
  const orb = useRef<THREE.Mesh>(null)
  const { camera, pointer } = useThree()

  useFrame(({ clock }, delta) => {
    const smooth = 1 - Math.pow(0.0015, delta)

    if (parallax.current) {
      parallax.current.rotation.y = THREE.MathUtils.damp(
        parallax.current.rotation.y,
        pointer.x * 0.15,
        5,
        delta,
      )
      parallax.current.rotation.x = THREE.MathUtils.damp(
        parallax.current.rotation.x,
        -pointer.y * 0.06,
        5,
        delta,
      )
    }

    const p = progressRef.current
    const targetX = pointer.x * 0.28
    const targetY = 1.52 - p * 0.16 + pointer.y * 0.12
    const targetZ = 9.0 - p * 1.1

    camera.position.x += (targetX - camera.position.x) * smooth
    camera.position.y += (targetY - camera.position.y) * smooth
    camera.position.z += (targetZ - camera.position.z) * smooth
    camera.lookAt(0, 1.52 - p * 0.08, 0)

    if (orb.current) {
      const t = clock.elapsedTime * 0.32
      orb.current.position.set(Math.cos(t) * 2.28, 1.32 + Math.sin(t * 0.9) * 0.9, Math.sin(t) * 0.55 - 0.3)
    }
  })

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[4.5, 7, 5]} intensity={2.2} color="#fff3e6" />
      <directionalLight position={[-5, 3, -3]} intensity={0.6} color="#e8e2d4" />
      <pointLight position={[-3.2, 2.8, 2.4]} intensity={10} distance={9} color="#d8431c" />
      <pointLight position={[2.8, 4.2, -2.5]} intensity={6} distance={8} color="#e0906a" />

      <group position={[0, 0, 0]}>
        <group rotation={[0.04, -0.32, 0]}>
          <group ref={parallax}>
            <RoundedBox
              args={[5.5, 0.14, 3.45]}
              radius={0.07}
              smoothness={4}
              position={[0, 0.08, 0]}
            >
              <meshStandardMaterial color="#26231f" roughness={0.8} metalness={0.1} />
            </RoundedBox>
            <mesh position={[0, 0.152, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[5.2, 3.15]} />
              <meshBasicMaterial color="#f5f3ee" transparent opacity={0.03} />
            </mesh>

            <Monitor mode={mode} onCycle={onCycle} compact={compact} />
            <Keyboard compact={compact} />

            <FloatingCard position={[-2.52, 2.18, 0.55]} rotation={[0.05, 0.34, -0.03]} variant="profile" />
            <FloatingCard position={[2.48, 1.62, 0.4]} rotation={[0.03, -0.36, 0.04]} variant="chart" />
            <IdeaObject />

            {/* orbital ring */}
            <mesh position={[0, 1.34, -0.3]} rotation={[1.42, 0.12, 0.28]}>
              <torusGeometry args={[2.34, 0.0065, 8, 160]} />
              <meshBasicMaterial color="#d8431c" transparent opacity={0.5} />
            </mesh>
            <mesh position={[0, 1.34, -0.3]} rotation={[1.78, -0.35, 0.1]}>
              <torusGeometry args={[2.62, 0.004, 8, 160]} />
              <meshBasicMaterial color="#f5f3ee" transparent opacity={0.22} />
            </mesh>
            <mesh ref={orb}>
              <sphereGeometry args={[0.032, 16, 16]} />
              <meshBasicMaterial color="#d8431c" />
            </mesh>

            {/* small anchor dots on the platform */}
            {[
              [-2.5, 0.17, 1.42],
              [2.42, 0.17, 1.3],
              [-2.35, 0.17, -1.3],
              [2.3, 0.17, -1.25],
            ].map(([x, y, z]) => (
              <mesh key={`${x}-${z}`} position={[x, y, z]}>
                <sphereGeometry args={[0.018, 12, 12]} />
                <meshBasicMaterial color="#f5f3ee" transparent opacity={0.28} />
              </mesh>
            ))}
          </group>
        </group>

        {!compact && (
          <ContactShadows
            position={[0, 0.01, 0]}
            opacity={0.32}
            scale={7}
            blur={2.8}
            far={4.2}
            resolution={256}
            frames={1}
            color="#22211f"
          />
        )}
      </group>

      {/* soft rear disc to ground the composition */}
      <mesh position={[0, 0.9, -3.4]} rotation={[0, 0, 0]}>
        <circleGeometry args={[3.4, 64]} />
        <meshBasicMaterial color="#e7e4dc" transparent opacity={0.32} />
      </mesh>
    </>
  )
}
