import React, { useContext } from "react";
import AppContext from "../../app/AppContext";

const Algorithm = () => {
  const { AppState, dispatch } = useContext(AppContext);
  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch({
      type: "ADD_ALGORITHM",
      payload: e.currentTarget.value,
    });
  };
  return (
    <article className="modal__content flex-center">
      <div className="choose">
        <input
          type="radio"
          aria-label="bubble"
          name="algorithm"
          checked={AppState.whichAlgorithm === "bubble"}
          value="bubble"
          className="radio flex-center"
          onChange={handleOnChange}
        />
        <p>Bubble sort</p>
      </div>
      <div className="choose">
        <input
          type="radio"
          aria-label="merge"
          name="algorithm"
          checked={AppState.whichAlgorithm === "merge"}
          value="merge"
          className="radio flex-center"
          onChange={handleOnChange}
        />
        <p>merge sort</p>
      </div>
      <div className="choose">
        <input
          type="radio"
          aria-label="heap"
          name="algorithm"
          checked={AppState.whichAlgorithm === "heap"}
          value="heap"
          className="radio flex-center"
          onChange={handleOnChange}
        />
        <p>heap sort</p>
      </div>
      <div className="choose">
        <input
          type="radio"
          aria-label="quick"
          name="algorithm"
          checked={AppState.whichAlgorithm === "quick"}
          value="quick"
          className="radio flex-center"
          onChange={handleOnChange}
        />
        <p>quick sort</p>
      </div>
    </article>
  );
};

export default Algorithm;
