import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Model } from "./Roboting";

const ThreeDRobot = () => {
  return (
    <div className="w-12 h-12 ">
      <Canvas className="w-full h-full bg-blue-200">
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeDRobot;
