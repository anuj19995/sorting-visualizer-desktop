import { ActionType, AppStateType, ReducerType } from "../types";

const Reducer: ReducerType<AppStateType, ActionType> = (state, action) => {
  if (action.type === "NEW_BARS_ADDED") {
    return {
      ...state,
      isNewBarsAdded: action.payload,
    };
  }
  if (action.type === "SORT_DONE") {
    return {
      ...state,
      isSortDone: action.payload,
    };
  }
  if (action.type === "CHANGE_SCREEN") {
    return {
      ...state,
      isFullScreen: !state.isFullScreen,
    };
  }
  if (action.type === "ADD_SVG") {
    return {
      ...state,
      svg: action.payload,
      isPlay: false,
      barsArray: [],
      isNewBarsAdded: false,
      isSortDone: false,
      whichAlgorithm: "",
      isAlgorithmModelOpen: true,
    };
  }

  if (action.type === "ADD_ARRAY") {
    return {
      ...state,
      barsArray: action.payload,
    };
  }
  if (action.type === "ADD_ALGORITHM") {
    return {
      ...state,
      whichAlgorithm: action.payload,
    };
  }
  if (action.type === "OPEN_ALGORITHM_MODAL") {
    return {
      ...state,
      isAlgorithmModelOpen: action.payload,
    };
  }
  if (action.type === "ADD_SPEED") {
    return {
      ...state,
      speed: action.payload,
    };
  }

  if (action.type === "PLAY") {
    return {
      ...state,
      isPlay: action.payload,
    };
  }
  if (action.type === "CLOSE_MODAL") {
    return {
      ...state,
      isModalOpen: false,
    };
  }
  if (action.type === "OPEN_MODAL") {
    return {
      ...state,
      isModalOpen: true,
      modalState: action.payload,
    };
  }
  return state;
};
export default Reducer;
