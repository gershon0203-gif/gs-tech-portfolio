import * as THREE from 'three'

/**
 * Trace an arched doorway. Origin is the centre of the threshold, y = 0.
 * The top is a true semicircle so the silhouette reads as architecture,
 * not a rounded rectangle.
 */
function traceArch(
  target: THREE.Shape | THREE.Path,
  width: number,
  height: number,
  baseY = 0,
  clockwise = false,
) {
  const half = width / 2
  const straight = height - half

  if (!clockwise) {
    target.moveTo(-half, baseY)
    target.lineTo(half, baseY)
    target.lineTo(half, baseY + straight)
    target.absarc(0, baseY + straight, half, 0, Math.PI, false)
    target.lineTo(-half, baseY)
  } else {
    target.moveTo(-half, baseY)
    target.lineTo(-half, baseY + straight)
    target.absarc(0, baseY + straight, half, Math.PI, 0, true)
    target.lineTo(half, baseY)
  }
  target.closePath()
}

export function archShape(width: number, height: number, baseY = 0): THREE.Shape {
  const shape = new THREE.Shape()
  traceArch(shape, width, height, baseY)
  return shape
}

export function archPath(width: number, height: number, baseY = 0): THREE.Path {
  const path = new THREE.Path()
  traceArch(path, width, height, baseY, true)
  return path
}

/** A shaped frame with a real opening — the light comes through the void. */
export function archOutline(width: number, height: number, thickness: number): THREE.Shape {
  const shape = new THREE.Shape()
  traceArch(shape, width + thickness * 2, height + thickness * 2, 0)
  shape.holes.push(archPath(width, height, thickness))
  return shape
}
