import { useContext, useEffect, useRef } from "react";
import AppContext from "../app/AppContext";
import * as d3 from "d3";
import { Bar } from "../app/State";
import sort from "../algorithm/sort";
import { SwapObjType } from "../types";

const Main = () => {
  const { AppState, dispatch } = useContext(AppContext);
  const resize = () => {
    let width = mainRef.current.getBoundingClientRect().width - 20;
    let height = mainRef.current.getBoundingClientRect().height - 20;
    d3.selectAll(".bar").remove();
    d3.select("#box").remove();
    let box = d3
      .select("#main")
      .append("svg")
      .attr("id", "box")
      .attr("width", width)
      .attr("height", height);
    dispatch({ type: "ADD_SVG", payload: { box, width, height } });
  };
  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);
  useEffect(() => {
    d3.selectAll(".bar").remove();
    AppState.barsArray.forEach((bar) => {
      AppState.svg.box
        .append("rect")
        .attr("class", "bar")
        .attr("id", bar.getId())
        .attr("x", bar.getX())
        .attr("y", bar.getY())
        .attr("width", bar.getWidth())
        .attr("height", bar.getHeight())
        .attr("fill", bar.getColor());
    });
  }, [AppState.barsArray]);

  // Refs
  const mainRef = useRef<HTMLElement>({} as HTMLElement);
  const animationRef = useRef(0);
  const sortedArrRef = useRef([] as Bar[]);
  const swapObjArrRef = useRef([] as SwapObjType[]);
  const indexRef = useRef(-1);
  const animateSortRef = useRef(() => {
    swap(swapObjArrRef.current, indexRef.current + 1, AppState.speed);
  });

  let swap = (swapObjArr: SwapObjType[], currIndex: number, speed: number) => {
    if (currIndex >= swapObjArr.length) {
      dispatch({ type: "OPEN_ALGORITHM_MODAL", payload: true });
      dispatch({ type: "ADD_ARRAY", payload: sortedArrRef.current });
      dispatch({ type: "SORT_DONE", payload: true });
      dispatch({ type: "PLAY", payload: false });
      cancelAnimationFrame(animationRef.current);
      return;
    }
    if (currIndex != 0) {
      let first = swapObjArr[currIndex - 1].first;
      let second = swapObjArr[currIndex - 1].second;
      d3.select(`#${first.getId()}`)
        .transition()
        .duration(speed)
        .attr("fill", first.getColor());
      d3.select(`#${second.getId()}`)
        .transition()
        .duration(speed)
        .attr("fill", second.getColor());
    }
    let first = swapObjArr[currIndex].first;
    let second = swapObjArr[currIndex].second;
    if (AppState.whichAlgorithm === "merge") {
      AppState.svg.box
        .append("rect")
        .attr("class", "bar")
        .attr("id", "copy")
        .attr("x", second.getX())
        .attr("y", second.getY())
        .attr("width", second.getWidth())
        .attr("height", second.getHeight())
        .attr("fill", "#fff");
      // ex.
      d3.select(`#copy`)
        .transition()
        .duration(speed)
        .attr("fill", "#ffd803")
        .attr("x", first.getX())
        .on("end", () => {
          d3.select(`#${first.getId()}`).remove();
          AppState.svg.box
            .append("rect")
            .attr("class", "bar")
            .attr("id", first.getId())
            .attr("x", first.getX())
            .attr("y", second.getY())
            .attr("width", second.getWidth())
            .attr("height", second.getHeight())
            .attr("fill", "#ffd803");
          d3.select("#copy").remove();
          animationRef.current = requestAnimationFrame(animateSortRef.current);
        });
    } else {
      if (swapObjArr[currIndex].isSwap) {
        let firstX = second.getX();
        let secondX = first.getX();
        first.setX(firstX);
        second.setX(secondX);
        if (swapObjArr[currIndex].isMakeHeap) {
          d3.select(`#${first.getId()}`)
            .transition()
            .duration(speed)
            .attr("fill", "#ff5470")
            .attr("x", first.getX());
          d3.select(`#${second.getId()}`)
            .transition()
            .duration(speed)
            .attr("fill", "#ff5470")
            .attr("x", second.getX())
            .on("end", () => {
              animationRef.current = requestAnimationFrame(
                animateSortRef.current
              );
            });
        } else {
          d3.select(`#${first.getId()}`)
            .transition()
            .duration(speed)
            .attr("fill", "#ffd803")
            .attr("x", first.getX());
          d3.select(`#${second.getId()}`)
            .transition()
            .duration(speed)
            .attr("fill", "#ffd803")
            .attr("x", second.getX())
            .on("end", () => {
              animationRef.current = requestAnimationFrame(
                animateSortRef.current
              );
            });
        }
      } else {
        d3.select(`#${first.getId()}`)
          .transition()
          .duration(speed)
          .attr("fill", "#ff5470");
        d3.select(`#${second.getId()}`)
          .transition()
          .duration(speed)
          .attr("fill", "#ff5470")
          .on("end", () => {
            animationRef.current = requestAnimationFrame(
              animateSortRef.current
            );
          });
      }
    }
    indexRef.current++;
  };
  useEffect(() => {
    dispatch({ type: "NEW_BARS_ADDED", payload: true });
    dispatch({ type: "ADD_ARRAY", payload: AppState.barsArray });
  }, [AppState.whichAlgorithm]);
  useEffect(() => {
    const { swapObjArr, sortedArr } = sort(
      AppState.whichAlgorithm,
      AppState.barsArray
    );
    sortedArrRef.current = sortedArr;
    swapObjArrRef.current = swapObjArr;
    indexRef.current = -1;

    dispatch({ type: "NEW_BARS_ADDED", payload: false });
  }, [AppState.isNewBarsAdded]);
  useEffect(() => {
    if (AppState.isPlay) {
      animateSortRef.current = () => {
        swap(swapObjArrRef.current, indexRef.current + 1, AppState.speed);
      };
      animationRef.current = requestAnimationFrame(animateSortRef.current);
    } else {
      animateSortRef.current = () => {};
      cancelAnimationFrame(animationRef.current);
    }
  }, [AppState.isPlay]);

  return <main ref={mainRef} id="main" className="main"></main>;
};

export default Main;
