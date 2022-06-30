import React, { useContext } from "react";
import { IoMdSpeedometer } from "react-icons/io";
import { VscSymbolArray } from "react-icons/vsc";
import { FaPauseCircle, FaPlayCircle, FaSitemap } from "react-icons/fa";
import AppContext from "../app/AppContext";

const Aside = () => {
  const { AppState, dispatch } = useContext(AppContext);
  const checkEvent = (event: React.MouseEvent) => {
    if (AppState.isPlay) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
    return true;
  };
  const handlePlay = () => {
    if (AppState.barsArray.length === 0 || AppState.isSortDone) {
      dispatch({
        type: "OPEN_MODAL",
        payload: { for: "change array", id: 2 },
      });
    } else if (AppState.whichAlgorithm === "") {
      dispatch({
        type: "OPEN_MODAL",
        payload: { for: "choose algorithm", id: 3 },
      });
    } else {
      if (AppState.isAlgorithmModelOpen) {
        dispatch({ type: "OPEN_ALGORITHM_MODAL", payload: false });
      }
      dispatch({
        type: "PLAY",
        payload: !AppState.isPlay,
      });
    }
  };
  return (
    <aside className="aside">
      <button
        className="flex-center btn"
        aria-label="speed"
        onClick={(event) => {
          if (checkEvent(event)) {
            dispatch({
              type: "OPEN_MODAL",
              payload: { for: "change speed", id: 1 },
            });
          }
        }}
      >
        <IoMdSpeedometer />
      </button>
      <button
        className={`flex-center btn`}
        aria-label="array"
        onClick={(event) => {
          if (checkEvent(event)) {
            dispatch({
              type: "OPEN_MODAL",
              payload: { for: "change array", id: 2 },
            });
          }
        }}
      >
        <VscSymbolArray />
      </button>
      <button
        className={`flex-center btn algo`}
        aria-label="algorithm"
        onClick={() => {
          if (AppState.isAlgorithmModelOpen) {
            dispatch({
              type: "OPEN_MODAL",
              payload: { for: "choose algorithm", id: 3 },
            });
          }
        }}
      >
        <FaSitemap />
      </button>
      <button
        className="flex-center btn"
        aria-label="play/pause"
        onClick={handlePlay}
      >
        {AppState.isPlay ? <FaPauseCircle /> : <FaPlayCircle />}
      </button>
    </aside>
  );
};

export default Aside;
