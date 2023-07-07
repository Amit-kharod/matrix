import React, { useEffect, useRef } from "react";
import { Stats, OrbitControls } from "@react-three/drei";
import { Robot } from "./Robot";
import { DoubleSide } from "three";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { useSelector } from "react-redux";
import { Star } from "./Star";

export const RobotCanvas = ({ setCongoModal, setFailModal }) => {
  const [directions, setDirections] = useState([
    "left",
    "right",
    "right",
    "up",
    "down",
    "left",
    "right",
    "up",
    "down",
  ]);

  const robotConfig = {
    facing: "forward",
  };

  let blocklyInstruction = useSelector(
    (store) => store.blocklyInstruction.blockInstructionArray
  );

  useEffect(() => {
    console.log(blocklyInstruction);
  }, [blocklyInstruction]);
  const mesh = useRef();
  const mesh2 = useRef();
  const mesh3 = useRef();

  return (
    <>
      {/* <button style={{ marginLeft: "100px" }}>Move forward</button>
      <button>Move backword</button>
      <button>Turn right</button>
      <button>Turn left</button> */}
      <Canvas camera={{ position: [0, 5, 6] }}>
        <ambientLight />
        <spotLight
          intensity={0.9}
          angle={0.1}
          penumbra={1}
          position={[10, 15, 10]}
          castShadow
        />
        <Robot
          directions={blocklyInstruction}
          obstacles={[
            [1, 0],
            [1, 3],
            [3, 2],
            [0, 1],
          ]}
          goal={[0, -1]}
          setCongoModal={setCongoModal}
          setFailModal={setFailModal}
        />
        <Star />
        <OrbitControls />
        <gridHelper args={[9, 9, "red", "red", "red"]} />
        <mesh
          position={[0, -0.01, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[9, 9, 1]}
        >
          <planeBufferGeometry />
          <meshBasicMaterial color="orange" side={DoubleSide} />
        </mesh>
        <mesh position={[1, 0.25, 0]} ref={mesh}>
          <boxGeometry args={[1, 0.5, 1]} />
          <meshStandardMaterial color={"red"} />
        </mesh>
        <mesh position={[0, 0.25, 1]} ref={mesh}>
          <boxGeometry args={[1, 0.5, 1]} />
          <meshStandardMaterial color={"red"} />
        </mesh>
        <mesh position={[1, 0.25, 3]} ref={mesh2}>
          <boxGeometry args={[1, 0.5, 1]} />
          <meshStandardMaterial color={"red"} />
        </mesh>
        <mesh position={[3, 0.25, 2]} ref={mesh3}>
          <boxGeometry args={[1, 0.5, 1]} />
          <meshStandardMaterial color={"red"} />
        </mesh>
        <Stats />
      </Canvas>
    </>
  );
};
