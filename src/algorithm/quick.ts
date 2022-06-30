import { Bar } from "../app/State";
import { SwapObjType } from "../types";
import { swap } from "./sort";

let swapObjArr: SwapObjType[] = [];

const partition = (sortedArr: Bar[], low: number, high: number) => {
  let left = low;
  let right = high;
  let pivot = low;
  while (true) {
    while (
      sortedArr[pivot].getHeight() <= sortedArr[right].getHeight() &&
      pivot !== right
    ) {
      let first = sortedArr[pivot];
      let second = sortedArr[right];
      let swapObj = {
        first,
        second,
        isSwap: false,
      };
      swapObjArr.push(swapObj);
      right--;
    }
    if (pivot === right) {
      return pivot;
    } else if (sortedArr[pivot].getHeight() > sortedArr[right].getHeight()) {
      swap(sortedArr, pivot, right);
      let first = sortedArr[pivot];
      let second = sortedArr[right];
      let swapObj = {
        first,
        second,
        isSwap: true,
      };
      swapObjArr.push(swapObj);
      left = pivot;
      pivot = right;
    }
    while (
      sortedArr[left].getHeight() <= sortedArr[pivot].getHeight() &&
      pivot !== left
    ) {
      let first = sortedArr[left];
      let second = sortedArr[pivot];
      let swapObj = {
        first,
        second,
        isSwap: false,
      };
      swapObjArr.push(swapObj);
      left++;
    }
    if (pivot === left) {
      return pivot;
    } else if (sortedArr[left].getHeight() > sortedArr[pivot].getHeight()) {
      swap(sortedArr, left, pivot);
      let first = sortedArr[left];
      let second = sortedArr[pivot];
      let swapObj = {
        first,
        second,
        isSwap: true,
      };
      swapObjArr.push(swapObj);
      right = pivot;
      pivot = left;
    }
  }
};
const quickSortMain = (sortedArr: Bar[], low: number, high: number) => {
  if (low < high) {
    let pi = partition(sortedArr, low, high);
    quickSortMain(sortedArr, low, pi - 1);
    quickSortMain(sortedArr, pi + 1, high);
  }
};
const quickSort = (unSortedArr: Bar[]) => {
  let sortedArr = [...unSortedArr];
  swapObjArr = [];
  quickSortMain(sortedArr, 0, sortedArr.length - 1);
  return { swapObjArr, sortedArr };
};
export default quickSort;
