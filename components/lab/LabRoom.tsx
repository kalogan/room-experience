"use client";

// ─── Low-poly room shell — Phase 08
// All geometry uses BoxGeometry or PlaneGeometry with meshStandardMaterial.
// No imported models. Camera presets connect in Phase 09.
// Visual polish (shadows, detail, proportions) deferred to Phase 27.

// ─── Room structure ───────────────────────────────────────────────────────────

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -1.5]}>
      <planeGeometry args={[10, 5.5]} />
      <meshStandardMaterial color="#0c1018" roughness={0.95} metalness={0} />
    </mesh>
  );
}

function Walls() {
  return (
    <group>
      {/* Back wall */}
      <mesh position={[0, 1.6, -4]}>
        <planeGeometry args={[10, 3.2]} />
        <meshStandardMaterial color="#090d15" roughness={1} />
      </mesh>
      {/* Left wall */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-5, 1.6, -1.5]}>
        <planeGeometry args={[5.5, 3.2]} />
        <meshStandardMaterial color="#090d15" roughness={1} />
      </mesh>
      {/* Right wall */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[5, 1.6, -1.5]}>
        <planeGeometry args={[5.5, 3.2]} />
        <meshStandardMaterial color="#090d15" roughness={1} />
      </mesh>
    </group>
  );
}

// ─── Desk area (left side) ────────────────────────────────────────────────────

function Desk() {
  return (
    <group>
      {/* Desktop surface */}
      <mesh position={[-2.2, 0.78, -0.7]}>
        <boxGeometry args={[2.5, 0.07, 1.15]} />
        <meshStandardMaterial color="#1c1408" roughness={0.7} metalness={0.05} />
      </mesh>
      {/* Left side panel */}
      <mesh position={[-3.4, 0.39, -0.7]}>
        <boxGeometry args={[0.06, 0.78, 1.15]} />
        <meshStandardMaterial color="#181208" roughness={0.8} />
      </mesh>
      {/* Right side panel */}
      <mesh position={[-1.0, 0.39, -0.7]}>
        <boxGeometry args={[0.06, 0.78, 1.15]} />
        <meshStandardMaterial color="#181208" roughness={0.8} />
      </mesh>
      {/* Back rail */}
      <mesh position={[-2.2, 0.55, -1.23]}>
        <boxGeometry args={[2.5, 0.35, 0.06]} />
        <meshStandardMaterial color="#141008" roughness={0.8} />
      </mesh>
    </group>
  );
}

function Monitor() {
  return (
    <group>
      {/* Monitor outer frame */}
      <mesh position={[-2.2, 1.28, -1.19]}>
        <boxGeometry args={[0.92, 0.63, 0.055]} />
        <meshStandardMaterial color="#080808" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Monitor screen — emissive for CRT glow */}
      <mesh position={[-2.2, 1.28, -1.165]}>
        <boxGeometry args={[0.83, 0.54, 0.01]} />
        <meshStandardMaterial
          color="#c8d8ff"
          emissive="#88aaff"
          emissiveIntensity={0.55}
          roughness={0.1}
        />
      </mesh>
      {/* Stand arm */}
      <mesh position={[-2.2, 0.96, -1.1]}>
        <boxGeometry args={[0.05, 0.22, 0.05]} />
        <meshStandardMaterial color="#101010" roughness={0.5} metalness={0.5} />
      </mesh>
      {/* Stand base */}
      <mesh position={[-2.2, 0.82, -1.06]}>
        <boxGeometry args={[0.26, 0.04, 0.18]} />
        <meshStandardMaterial color="#101010" roughness={0.5} metalness={0.5} />
      </mesh>
    </group>
  );
}

function Chair() {
  return (
    <group>
      {/* Seat */}
      <mesh position={[-2.2, 0.45, 0.1]}>
        <boxGeometry args={[0.72, 0.07, 0.65]} />
        <meshStandardMaterial color="#12161e" roughness={0.9} />
      </mesh>
      {/* Back rest */}
      <mesh position={[-2.2, 0.82, -0.22]}>
        <boxGeometry args={[0.68, 0.68, 0.07]} />
        <meshStandardMaterial color="#12161e" roughness={0.9} />
      </mesh>
      {/* Center support */}
      <mesh position={[-2.2, 0.22, 0.1]}>
        <boxGeometry args={[0.06, 0.45, 0.06]} />
        <meshStandardMaterial color="#0c0e12" roughness={0.8} metalness={0.2} />
      </mesh>
    </group>
  );
}

// ─── Bed area (right side) ────────────────────────────────────────────────────

function Bed() {
  return (
    <group>
      {/* Bed frame */}
      <mesh position={[3, 0.1, -1.6]}>
        <boxGeometry args={[1.65, 0.2, 2.6]} />
        <meshStandardMaterial color="#1c1408" roughness={0.8} />
      </mesh>
      {/* Mattress */}
      <mesh position={[3, 0.38, -1.6]}>
        <boxGeometry args={[1.55, 0.28, 2.4]} />
        <meshStandardMaterial color="#1a1e2a" roughness={0.95} />
      </mesh>
      {/* Blanket — bunched toward foot of bed */}
      <mesh position={[3, 0.59, -1.95]}>
        <boxGeometry args={[1.5, 0.12, 1.6]} />
        <meshStandardMaterial color="#1e2a3c" roughness={1} />
      </mesh>
      {/* Pillow */}
      <mesh position={[3, 0.64, -0.72]}>
        <boxGeometry args={[0.62, 0.11, 0.4]} />
        <meshStandardMaterial color="#b0a898" roughness={0.95} />
      </mesh>
      {/* Headboard */}
      <mesh position={[3, 0.62, -2.88]}>
        <boxGeometry args={[1.65, 0.6, 0.09]} />
        <meshStandardMaterial color="#1c1408" roughness={0.7} />
      </mesh>
      {/* Nightstand */}
      <mesh position={[4.15, 0.28, -0.7]}>
        <boxGeometry args={[0.5, 0.55, 0.45]} />
        <meshStandardMaterial color="#1c1408" roughness={0.7} />
      </mesh>
    </group>
  );
}

// ─── Couch / TV area (right side) ─────────────────────────────────────────────

function Couch() {
  return (
    <group>
      {/* Seat body */}
      <mesh position={[2.5, 0.22, 0.55]}>
        <boxGeometry args={[1.9, 0.44, 0.82]} />
        <meshStandardMaterial color="#1a1e28" roughness={0.9} />
      </mesh>
      {/* Back cushion */}
      <mesh position={[2.5, 0.54, 0.18]}>
        <boxGeometry args={[1.9, 0.46, 0.14]} />
        <meshStandardMaterial color="#202432" roughness={0.9} />
      </mesh>
      {/* Left arm */}
      <mesh position={[1.57, 0.28, 0.55]}>
        <boxGeometry args={[0.12, 0.56, 0.82]} />
        <meshStandardMaterial color="#1a1e28" roughness={0.9} />
      </mesh>
      {/* Right arm */}
      <mesh position={[3.43, 0.28, 0.55]}>
        <boxGeometry args={[0.12, 0.56, 0.82]} />
        <meshStandardMaterial color="#1a1e28" roughness={0.9} />
      </mesh>
    </group>
  );
}

function TV() {
  return (
    <group>
      {/* TV body */}
      <mesh position={[3.5, 1.85, -3.97]}>
        <boxGeometry args={[1.12, 0.66, 0.07]} />
        <meshStandardMaterial color="#080808" roughness={0.3} metalness={0.4} />
      </mesh>
      {/* TV screen — subtle emissive */}
      <mesh position={[3.5, 1.85, -3.94]}>
        <boxGeometry args={[1.02, 0.56, 0.01]} />
        <meshStandardMaterial
          color="#142030"
          emissive="#304878"
          emissiveIntensity={0.3}
          roughness={0.05}
        />
      </mesh>
      {/* TV stand column */}
      <mesh position={[3.5, 0.55, -3.82]}>
        <boxGeometry args={[0.1, 1.1, 0.12]} />
        <meshStandardMaterial color="#0c0c0c" roughness={0.4} metalness={0.5} />
      </mesh>
      {/* TV stand base */}
      <mesh position={[3.5, 0.03, -3.78]}>
        <boxGeometry args={[0.55, 0.05, 0.28]} />
        <meshStandardMaterial color="#0c0c0c" roughness={0.4} metalness={0.5} />
      </mesh>
    </group>
  );
}

// ─── Shelf area (back left wall) ──────────────────────────────────────────────

function Shelf() {
  return (
    <group>
      {/* Shelf board */}
      <mesh position={[-3.2, 2.05, -3.9]}>
        <boxGeometry args={[1.65, 0.06, 0.28]} />
        <meshStandardMaterial color="#1c1408" roughness={0.75} />
      </mesh>
      {/* Books */}
      <mesh position={[-3.82, 2.22, -3.86]}>
        <boxGeometry args={[0.11, 0.3, 0.22]} />
        <meshStandardMaterial color="#3a2414" roughness={0.9} />
      </mesh>
      <mesh position={[-3.69, 2.23, -3.86]}>
        <boxGeometry args={[0.09, 0.32, 0.22]} />
        <meshStandardMaterial color="#1a2a3a" roughness={0.9} />
      </mesh>
      <mesh position={[-3.57, 2.21, -3.86]}>
        <boxGeometry args={[0.14, 0.28, 0.22]} />
        <meshStandardMaterial color="#2a1a3a" roughness={0.9} />
      </mesh>
      <mesh position={[-3.43, 2.22, -3.86]}>
        <boxGeometry args={[0.1, 0.3, 0.22]} />
        <meshStandardMaterial color="#1a3a2a" roughness={0.9} />
      </mesh>
      {/* Record player body */}
      <mesh position={[-2.72, 2.11, -3.87]}>
        <boxGeometry args={[0.42, 0.06, 0.36]} />
        <meshStandardMaterial color="#141008" roughness={0.7} metalness={0.1} />
      </mesh>
      {/* Vinyl record (flat disc — approximated as thin box) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2.72, 2.15, -3.87]}>
        <cylinderGeometry args={[0.14, 0.14, 0.008, 24]} />
        <meshStandardMaterial color="#0c0c0c" roughness={0.3} metalness={0.6} />
      </mesh>
    </group>
  );
}

// ─── Wall decor ───────────────────────────────────────────────────────────────

function Calendar() {
  return (
    <group>
      {/* Paper */}
      <mesh position={[0.8, 1.95, -3.97]}>
        <boxGeometry args={[0.52, 0.72, 0.018]} />
        <meshStandardMaterial color="#d8d0c4" roughness={1} />
      </mesh>
      {/* Grid lines suggestion — subtle dark strip across middle */}
      <mesh position={[0.8, 1.82, -3.96]}>
        <boxGeometry args={[0.48, 0.03, 0.01]} />
        <meshStandardMaterial color="#9090a0" roughness={1} />
      </mesh>
    </group>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────

export function LabRoom() {
  return (
    <group>
      <Floor />
      <Walls />
      <Desk />
      <Monitor />
      <Chair />
      <Bed />
      <Couch />
      <TV />
      <Shelf />
      <Calendar />
    </group>
  );
}
