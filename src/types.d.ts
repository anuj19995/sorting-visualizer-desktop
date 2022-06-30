import { Bar } from "./app/State";

export type ActionType =
  | { type: "PLAY"; payload: boolean }
  | { type: "SORT_DONE"; payload: boolean }
  | { type: "ADD_ALGORITHM"; payload: string }
  | { type: "OPEN_ALGORITHM_MODAL"; payload: boolean }
  | { type: "ADD_ARRAY"; payload: Bar[] }
  | { type: "NEW_BARS_ADDED"; payload: boolean }
  | { type: "ADD_SPEED"; payload: number }
  | { type: "OPEN_MODAL"; payload: ModalOpenPayloadType }
  | { type: "CLOSE_MODAL" }
  | { type: "CHANGE_SCREEN" }
  | { type: "ADD_SVG"; payload: any };

export type ReducerType<S, A> = (state: S, action: A) => S;

export interface AppContextType {
  AppState: AppStateType;
  dispatch: React.Dispatch<ActionType>;
}

export type SwapObjType = {
  first: Bar;
  second: Bar;
  isSwap: boolean;
  isMakeHeap?: boolean;
};

export type ModalOpenPayloadType = { for: string; id: number };
export interface AppStateType {
  isPlay: boolean;
  isModalOpen: boolean;
  modalState: ModalOpenPayloadType;
  whichAlgorithm: string;
  speed: number;
  isSortDone: boolean;
  barsArray: Bar[];
  isNewBarsAdded: boolean;
  svg: {
    box: any;
    width: number;
    height: number;
  };
  isFullScreen: boolean;
  isAlgorithmModelOpen: boolean;
}
