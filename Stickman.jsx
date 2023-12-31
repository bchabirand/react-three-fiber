/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 public/stickman.glb 
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/stickman.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Skeletc" position={[-0.07, -0.063, -0.129]} rotation={[-2.961, 0.07, -3.039]}>
          <primitive object={nodes.root} />
          <skinnedMesh name="Stickman" geometry={nodes.Stickman.geometry} material={nodes.Stickman.material} skeleton={nodes.Stickman.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/stickman.glb')
