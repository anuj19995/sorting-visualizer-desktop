import React, { useContext } from "react";
import { FaWalking } from "react-icons/fa";
import { GiRaceCar, GiTurtle } from "react-icons/gi";
import AppContext from "../../app/AppContext";

const Speed = () => {
  const { AppState, dispatch } = useContext(AppContext);
  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch({
      type: "ADD_SPEED",
      payload: parseInt(e.currentTarget.value),
    });
  };
  return (
    <article className="modal__content flex-center">
      <div className="choose">
        <input
          type="radio"
          aria-label="slow"
          name="speed"
          checked={AppState.speed === 1000}
          onChange={handleOnChange}
          value="1000"
          className="radio flex-center"
        />
        <p className="flex-center">
          <span className="flex-center">
            <GiTurtle />
          </span>
          <span>Slow</span>
        </p>
      </div>
      <div className="choose">
        <input
          type="radio"
          aria-label="normal"
          name="speed"
          checked={AppState.speed === 500}
          onChange={handleOnChange}
          value="500"
          className="radio flex-center"
        />
        <p className="flex-center">
          <span className="flex-center">
            <FaWalking />
          </span>
          <span>normal</span>
        </p>
      </div>
      <div className="choose">
        <input
          type="radio"
          aria-label="fast"
          name="speed"
          checked={AppState.speed === 0}
          onChange={handleOnChange}
          value="0"
          className="radio flex-center"
        />
        <p className="flex-center">
          <span className="flex-center">
            <GiRaceCar />
          </span>
          <span>fast</span>
        </p>
      </div>
    </article>
  );
};

export default Speed;
