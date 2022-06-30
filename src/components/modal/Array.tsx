import React, { useContext } from "react";
import AppContext from "../../app/AppContext";
import { Bar } from "../../app/State";
const Size = () => {
  const { AppState, dispatch } = useContext(AppContext);
  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    let barArray: Bar[] = [];
    let size = parseInt(e.currentTarget.value);
    let width = AppState.svg.width;
    let height = AppState.svg.height;
    let ratio = (width - size * 2) / size;
    for (let i = 0; i < size; i++) {
      let bar = new Bar(
        ratio,
        Math.floor(Math.random() * (height - 10)) + 10,
        `bar-${i}`,
        "#00214d",
        0,
        ratio * i + 2 * i,
        i
      );
      barArray.push(bar);
    }
    dispatch({ type: "OPEN_ALGORITHM_MODAL", payload: true });
    dispatch({ type: "SORT_DONE", payload: false });
    dispatch({ type: "NEW_BARS_ADDED", payload: true });
    dispatch({ type: "ADD_ARRAY", payload: barArray });
  };
  return (
    <article className="modal__content flex-center">
      <div className="flex-center range-container">
        <output className="bubble flex-center">
          {AppState.barsArray.length}
        </output>
        <input
          type="range"
          min="0"
          value={AppState.barsArray.length}
          onChange={handleOnChange}
          max={`${
            AppState.svg.width < 776 && AppState.svg.height < 776 ? 50 : 100
          }`}
          className="range"
        />
      </div>
    </article>
  );
};

export default Size;
