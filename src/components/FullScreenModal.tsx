import { useContext } from "react";
import AppContext from "../app/AppContext";

const FullScreenModal = () => {
  const { dispatch } = useContext(AppContext);
  const handleFullScreen = () => {
    const fullScreenCheck = () => {
      if (document.fullscreenElement) return;
      return document.documentElement.requestFullscreen();
    };

    const rotate = async () => {
      try {
        if (
          screen.orientation.type !== "landscape-secondary" &&
          screen.orientation.type !== "landscape-primary"
        ) {
          await fullScreenCheck();
          await screen.orientation.lock("landscape");
        }
        dispatch({
          type: "CHANGE_SCREEN",
        });
      } catch (error) {
        console.log(error);
      }
    };
    rotate();
  };
  return (
    <div className="full-screen-modal flex-center">
      <button className="btn" onClick={handleFullScreen}>
        tap to go..
      </button>
    </div>
  );
};

export default FullScreenModal;
