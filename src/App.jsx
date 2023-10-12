import * as THREE from 'three'
import { useEffect, useLayoutEffect, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF, useAnimations, useScroll, ScrollControls, Box } from "@react-three/drei"
import { gsap } from 'gsap'

function Model(props) {
  const ref = useRef();
  const scroll = useScroll()
  const { nodes, animations } = useGLTF('/stickman.glb')
  const { actions } = useAnimations(animations, ref)
  const tl = useRef();
  
  useEffect(() => {
    actions['running'].reset().play().paused = true
    }, [])

  useFrame(() => {
    actions['running'].time = actions['running'].getClip().duration * scroll.offset
    tl.current.seek(scroll.offset * tl.current.duration());
  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    // Character movement
    tl.current.to(ref.current.position, { duration: 1, x: -3 }, 0.05)
    // tl.current.to(ref.current.position, { duration: 1, y: -3 }, ">");
  }, []);

  return (
     <group {...props} ref={ref}>
        <group name="Skeletc">
          <primitive object={nodes.root} />
          <skinnedMesh name="Stickman" geometry={nodes.Stickman.geometry} material={new THREE.MeshPhongMaterial()} skeleton={nodes.Stickman.skeleton} />
        </group>
    </group>
  )
}

function CodeLine(props) {
  const colors = ['red', 'green', 'blue', 'orange', 'yellow']
  const random = Math.floor(Math.random() * 5)

  return (
    <Box args={[10, 0.3, 3]} position={[0, -1.3, 0]} material={new THREE.MeshPhongMaterial()} material-color={colors[random]} />
  )
}

const App = () => (
  <Canvas shadows gl={{ antialias: true }} camera={{ position: [0, 0, -10], fov: 60 }}>
    <color attach="background" args={["#1F1F1F"]} />
    <directionalLight intensity={2} position={[0, 20, -30]} castShadow shadow-mapSize={1024} shadow-bias={-0.0001} />
    <ambientLight intensity={1} />
      <ScrollControls pages={1} damping={0.25}>
        <Model position={[0, -1, 0]} rotation={[0, Math.PI / 2, 0]}/>
        <CodeLine />
      </ScrollControls>
  </Canvas>
)

export default App