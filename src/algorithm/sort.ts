import { Bar } from "../app/State";
import { SwapObjType } from "../types";
import bubbleSort from "./bubble";
import heapSort from "./heap";
import mergeSort from "./merge";
import quickSort from "./quick";

export const swap = (sortedArr: Bar[], i: number, j: number) => {
  let temp = sortedArr[i];
  sortedArr[i] = sortedArr[j];
  sortedArr[j] = temp;
};

const sort = (whichAlgorithm: string, unSortedArr: Bar[]) => {
  let returnValue: { swapObjArr: SwapObjType[]; sortedArr: Bar[] };
  switch (whichAlgorithm) {
    case "bubble":
      returnValue = bubbleSort(unSortedArr);
      break;
    case "quick":
      returnValue = quickSort(unSortedArr);
      break;
    case "merge":
      returnValue = mergeSort(unSortedArr);
      break;
    case "heap":
      returnValue = heapSort(unSortedArr);
      break;
    default:
      returnValue = { swapObjArr: [], sortedArr: [] };
  }
  return returnValue;
};

export default sort;
