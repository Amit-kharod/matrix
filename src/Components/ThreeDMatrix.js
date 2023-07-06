import * as THREE from "three";
import ThreeDRobot from "./ThreeDRobot";
import React, { useState, useRef, Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useSelector } from "react-redux";

const ThreeDMatrix = ({
  row,
  col,
  batteryPosition,
  obstaclePosition,
  robotStartPosition,
  robotEndPosition,
  robotPositionRef,
  robotPosition,
  setRobotPosition
}) => {
  const containerRef = useRef(null);
  const isCursorPressedRef = useRef(false);
  const cursorXRef = useRef(0);
  const cursorYRef = useRef(0);
  const sceneRef = useRef(null);

  const [filterBatteryPosition, setFilteredBatteryPosition] = useState(
    batteryPosition
  );

  useEffect(() => {
    const handleMouseDown = (event) => {
      if (event.detail === 2) {
        isCursorPressedRef.current = true;
      }
    };

    const handleMouseUp = () => {
      isCursorPressedRef.current = false;
    };

    const handleMouseMove = (event) => {
      if (isCursorPressedRef.current) {
        const movementX =
          event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        const movementY =
          event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        const rotationSpeed = 0.005;
        const rotationX = movementY * rotationSpeed;
        const rotationY = movementX * rotationSpeed;

        sceneRef.current.rotation.x -= rotationX;
        sceneRef.current.rotation.y -= rotationY;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousedown", handleMouseDown);
      container.addEventListener("mouseup", handleMouseUp);
      container.addEventListener("mousemove", handleMouseMove);

      return () => {
        container.removeEventListener("mousedown", handleMouseDown);
        container.removeEventListener("mouseup", handleMouseUp);
        container.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);
  const squareSize = 0.5;

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Canvas className="">
        <scene ref={sceneRef}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <gridHelper
            args={[col * squareSize, row * squareSize, "white", "white"]}
          />
          {Array.from({ length: row }, (_, i) =>
            Array.from({ length: col }, (_, j) => {
              const position = [
                (j - col / 2) * squareSize,
                (i - row / 2) * squareSize,
                0
              ];
              const isObstacle = obstaclePosition?.some(
                ([x, y]) => x === i + 1 && y === j + 1
              );
              const isRobot =
                robotPosition?.x === i + 1 && robotPosition?.y === j + 1;
              const isFilterBatteryPosition = filterBatteryPosition?.some(
                ([x, y]) => x === i + 1 && y === j + 1
              );
              const color = isObstacle
                ? "brown"
                : isRobot
                ? "green"
                : (i + j) % 2 === 0
                ? "blue"
                : "white";

              return (
                <mesh key={`${i}-${j}`} position={position}>
                  <planeBufferGeometry args={[squareSize, squareSize]} />
                  <meshBasicMaterial color={color} />
                  {isObstacle && (
                    <mesh position={[0, 0, squareSize / 2]}>
                      <boxGeometry
                        args={[squareSize, squareSize, squareSize]}
                      />
                      <meshBasicMaterial color="red" />
                    </mesh>
                  )}
                  {isFilterBatteryPosition && (
                    <mesh
                      rotation={[Math.PI / 2, 0, 0]}
                      position={[0, 0, squareSize / 2]}
                    >
                      <cylinderGeometry
                        args={[squareSize / 4, squareSize / 3]}
                      />
                      <meshBasicMaterial color="yellow" />
                    </mesh>
                  )}
                  {isRobot && (
                    <Html>
                      <mesh position={position}>
                        <group scale={[squareSize, squareSize, squareSize]}>
                          <ThreeDRobot />
                        </group>
                      </mesh>
                    </Html>
                  )}
                </mesh>
              );
            })
          )}
        </scene>
      </Canvas>
    </div>
  );
};

export default ThreeDMatrix;
