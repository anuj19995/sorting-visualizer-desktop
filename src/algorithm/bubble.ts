import { Bar } from "../app/State";
import { SwapObjType } from "../types";

const bubbleSort = (unSortedArr: Bar[]) => {
  let sortedArr = [...unSortedArr];
  let swapObjArr: SwapObjType[] = [];
  let i,
    j,
    size = sortedArr.length;
  for (i = 0; i < size - 1; i++) {
    for (j = 0; j < size - i - 1; j++) {
      let first = sortedArr[j];
      let second = sortedArr[j + 1];
      let barObj = {
        first,
        second,
        isSwap: true,
      };
      if (first.getHeight() > second.getHeight()) {
        swapObjArr.push(barObj);
        sortedArr[j] = second;
        sortedArr[j + 1] = first;
      } else {
        swapObjArr.push({ ...barObj, isSwap: false });
      }
    }
  }
  return { swapObjArr, sortedArr };
};

export default bubbleSort;
