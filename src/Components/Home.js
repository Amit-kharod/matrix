import React, { useState, useRef, Suspense, useEffect } from "react";
import BlocklyComponent, { Block } from "../Blockly";
import "../blocks/customblocks";
import "../generator/generator";
import { useSelector } from "react-redux";
import ThreeDMatrix from "./ThreeDMatrix";
import { RobotCanvas } from "./3d/RobotCanvas";
import LevelDialog from "./Dialog/LevelDialog";
//import ThreeDRobot from "./threeDRobot";

const Home = () => {
  const gamesConfig = useSelector((store) => store.matrixConfig);
  const robotPositionRef = useRef(gamesConfig.gameConfigOne.robotStartPosition);
  const [robotPosition, setRobotPosition] = useState(
    gamesConfig.gameConfigOne.robotStartPosition
  );

  const [congoModal, setCongoModal] = useState(false);
  const [failModal, setFailModal] = useState(false);

  const congoHandler = () => {
    console.log('hello')
    setCongoModal(false)
  };

  const failedHandler = () => {
    setFailModal(false)
  };
  

  return (
    <div className="flex w-full ">
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
      <div className="w-1/2 bg-gray-900 canvas">
        {/* <ThreeDMatrix
          {...gamesConfig.gameConfigOne}
          robotPositionRef={robotPositionRef}
          robotPosition={robotPosition}
          setRobotPosition={setRobotPosition}
        /> */}
        <RobotCanvas setCongoModal={setCongoModal} setFailModal={setFailModal}/>
      </div>
    </div>
  );
};

export default Home;
