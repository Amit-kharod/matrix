import React, { useEffect, useRef } from "react";
import {
  Stats,
  OrbitControls,
  Environment,
  PerspectiveCamera,
  RoundedBox,
} from "@react-three/drei";
import { Robot } from "./Robot";
import { DoubleSide, TextureLoader } from "three";
import { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSelector, useDispatch } from "react-redux";
import { Star } from "./Star";

export const RobotCanvas = ({
  setCongoModal,
  setFailModal,
  robotConfig,
  isFullscreen,
  fullscreen,
}) => {
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

  let blocklyInstruction = useSelector(
    (store) => store.blocklyInstruction.blockInstructionArray
  );

  const mesh = useRef();
  const mesh2 = useRef();
  const mesh3 = useRef();
  const orbit = useRef();
  const cameraRef = useRef();

  const textureLoader = new TextureLoader();
  const sandTexture = textureLoader.load("./assets/textures/mars.jpg");
  sandTexture.wrapS = sandTexture.wrapT = THREE.RepeatWrapping;
  sandTexture.repeat.set(9, 9); // Adjust the repeat values to control the tiling
  const stepDistance = 0.005;
  const [cameraPos, setCameraPos] = useState([-3.6, 6.6, -8.3]);
  const [cameraTypes, setCameraTypes] = useState({
    topStatic: [0, 18.5, 11.5],
    frontStatic: [0, 0.7, -3.8],
    sideFollow: [-6.5, 2.8, -4.9],
    topRotate: [-3.6, 6.6, -8.3],
  });
  const [cameraType, setCameraType] = useState("topRotate");
  const [camAnimation, setCamAnimation] = useState({
    from: null,
    to: null,
  });
  const [isCamAnimating, setIsCamAnimating] = useState(false);

  useEffect(() => {
    console.log(cameraRef);
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setCameraType("topRotate");
          setCamAnimation({
            ...camAnimation,
            to: cameraTypes.topRotate,
          });
          setIsCamAnimating("true");
        }}
        disabled={isCamAnimating ? true : false}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded z-20"
      >
        Top Rotate
      </button>
      <button
        onClick={() => {
          setCameraType("topStatic");
          setCamAnimation({
            ...camAnimation,
            to: cameraTypes.topStatic,
          });
          setIsCamAnimating("true");
        }}
        disabled={isCamAnimating ? true : false}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded z-20"
      >
        Top Static
      </button>
      <button
        onClick={() => {
          setCameraType("sideFollow");
          setCamAnimation({
            ...camAnimation,
            to: cameraTypes.sideFollow,
          });
          setIsCamAnimating("true");
        }}
        disabled={isCamAnimating ? true : false}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded z-20"
      >
        Side Follow
      </button>
      <button
        onClick={() => {
          setCameraType("frontStatic");
          setCamAnimation({
            ...camAnimation,
            to: cameraTypes.frontStatic,
          });
          setIsCamAnimating("true");
        }}
        disabled={isCamAnimating ? true : false}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded z-20"
      >
        Front Static
      </button>
      <Canvas>
        <ambientLight intensity={0.9} />
        <spotLight
          intensity={0.9}
          angle={0.4}
          penumbra={1}
          position={[10, 10, 10]}
          castShadow
        />
        <Environment files="./assets/nightSky.hdr" background />
        <PerspectiveCamera
          ref={cameraRef}
          makeDefault
          position={cameraPos}
          fov={40}
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
          robotConfig={robotConfig}
          orbitRef={orbit}
          cameraRef={cameraRef}
          cameraType={cameraType}
          setCameraType={setCameraType}
          isCamAnimating={isCamAnimating}
          setIsCamAnimating={setIsCamAnimating}
          camAnimation={camAnimation}
          setCamAnimation={setCamAnimation}
          cameraTypes={cameraTypes}
        />
        <Star />
        <OrbitControls
          ref={orbit}
          minDistance={3}
          maxDistance={30}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2.3}
        />

        <gridHelper args={[9, 9, "brown", "brown", "brown"]} />
        {/* <mesh position={[0, -0.06, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[9, 9, 0.1]} />
          <meshBasicMaterial color="orange" side={DoubleSide} />
        </mesh> */}
        <RoundedBox
          args={[9.2, 9.2, 0.15]}
          rotation={[Math.PI / 2, 0, 0]}
          radius={0.1}
          position={[0, -0.08, 0]}
        >
          <meshLambertMaterial attach="material" color={"orange"} />
        </RoundedBox>
        <RoundedBox
          args={[9.2, 9.2, 0.35]}
          rotation={[Math.PI / 2, 0, 0]}
          radius={0.1}
          position={[0, -0.28, 0]}
        >
          <meshLambertMaterial attach="material" color={"brown"} />
        </RoundedBox>
        <mesh position={[3, 0.25, 2]} ref={mesh3}>
          <boxGeometry args={[1, 0.5, 1]} />
          <meshStandardMaterial color={"red"} />
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
        <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1000, 1000]} />
          <meshStandardMaterial
            map={sandTexture}
            side={DoubleSide}
            roughness={2}
            metalness={0}
            color={"green"}
          />
        </mesh>
        {/* <Stats /> */}
      </Canvas>
    </>
  );
};
