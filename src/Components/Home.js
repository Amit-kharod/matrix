import React, { useState, useRef, Suspense, useEffect } from "react";
import BlocklyComponent, { Block } from "../Blockly";
import "../blocks/customblocks";
import "../generator/generator";
import { useDispatch, useSelector } from "react-redux";
import ThreeDMatrix from "./ThreeDMatrix";
import { RobotCanvas } from "./3d/RobotCanvas";
import LevelDialog from "./Dialog/LevelDialog";
import { addBlockInstruction } from "../utils/blocklyInstructionSlice";

//import ThreeDRobot from "./threeDRobot";

const Home = () => {
  const gamesConfig = useSelector((store) => store.matrixConfig);
  const robotPositionRef = useRef(gamesConfig.gameConfigOne.robotStartPosition);
  const [robotPosition, setRobotPosition] = useState(
    gamesConfig.gameConfigOne.robotStartPosition
  );

  const [robotConfig, setRobotConfig] = useState({
    facing: "forward",
    robotPos: [0, 0],
  });

  const [congoModal, setCongoModal] = useState(false);
  const [failModal, setFailModal] = useState(false);
  const [isFullscreen, fullscreen] = useState(true);

  const dispatch = useDispatch();

  const congoHandler = () => {
    console.log("hello");
    setCongoModal(false);
  };

  const failedHandler = () => {
    setFailModal(false);
  };

  const resetRobotHandler = () => {
    setRobotConfig({ ...robotConfig, robotPos: [0, 0] });
    dispatch(addBlockInstruction([]));
  };

  const startButtonHandler = () => {
    fullscreen(false);
  };

  return (
    <>
      <LevelDialog
        title="🎉 Congratulations"
        open={congoModal}
        setOpen={setCongoModal}
        onConfirm={congoHandler}
        buttonText={"OK"}
      >
        You have successfully completed the level
      </LevelDialog>
      <LevelDialog
        title="🥺 Game over"
        open={failModal}
        setOpen={setFailModal}
        onConfirm={failedHandler}
        buttonText={"TRY AGAIN"}
      >
        You have crashed to an obstacle
      </LevelDialog>
      <div className="flex w-full ">
        <div className="w-1/2">
          <BlocklyComponent
            readOnly={false}
            trashcan={true}
            media={"media/"}
            move={{
              scrollbars: true,
              drag: true,
              wheel: true,
            }}
            robotPositionRef={robotPositionRef}
            robotPosition={robotPosition}
            setRobotPosition={setRobotPosition}
          >
            <Block type="turn_block" />
            <Block type="move_block" />
          </BlocklyComponent>
        </div>

        <div className={`w-1/2 canvas`}>
          {/* <ThreeDMatrix
          {...gamesConfig.gameConfigOne}
          robotPositionRef={robotPositionRef}
          robotPosition={robotPosition}
          setRobotPosition={setRobotPosition}
        /> */}
          <button
            onClick={resetRobotHandler}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded z-20"
          >
            Reset
          </button>
          <RobotCanvas
            setCongoModal={setCongoModal}
            setFailModal={setFailModal}
            robotConfig={robotConfig}
            isFullscreen={isFullscreen}
            fullscreen={fullscreen}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
