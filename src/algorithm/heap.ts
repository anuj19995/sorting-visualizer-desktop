import { Bar } from "../app/State";
import { SwapObjType } from "../types";
import { swap } from "./sort";

let swapObjArr: SwapObjType[] = [];

const heapify = (unSortedArr: Bar[], end: number) => {
  let parent = 0;
  let child = 1;
  let parentHeight, leftChildHeight, rightChildHeight;
  if (child + 1 <= end) {
    parentHeight = unSortedArr[parent].getHeight();
    leftChildHeight = unSortedArr[child].getHeight();
    rightChildHeight = unSortedArr[child + 1].getHeight();
  } else if (child <= end) {
    parentHeight = unSortedArr[parent].getHeight();
    leftChildHeight = unSortedArr[child].getHeight();
    rightChildHeight = -100;
  } else {
    return;
  }
  while (
    (child <= end && leftChildHeight > parentHeight) ||
    (child + 1 <= end && rightChildHeight > parentHeight)
  ) {
    if (leftChildHeight > rightChildHeight) {
      let first = unSortedArr[child];
      let second = unSortedArr[parent];
      let swapObj = {
        first,
        second,
        isSwap: true,
      };
      swapObjArr.push(swapObj);
      swap(unSortedArr, child, parent);
      parent = child;
    } else {
      let first = unSortedArr[child + 1];
      let second = unSortedArr[parent];
      let swapObj = {
        first,
        second,
        isSwap: true,
      };
      swapObjArr.push(swapObj);
      swap(unSortedArr, child + 1, parent);
      parent = child + 1;
    }
    child = 2 * parent + 1;
    if (child + 1 <= end) {
      parentHeight = unSortedArr[parent].getHeight();
      leftChildHeight = unSortedArr[child].getHeight();
      rightChildHeight = unSortedArr[child + 1].getHeight();
    } else if (child <= end) {
      parentHeight = unSortedArr[parent].getHeight();
      leftChildHeight = unSortedArr[child].getHeight();
      rightChildHeight = -100;
    } else {
      return;
    }
  }
};

const heapSortMain = (unSortedArr: Bar[]) => {
  let end = unSortedArr.length - 1;
  while (end > 0) {
    let first = unSortedArr[0];
    let second = unSortedArr[end];
    let swapObj = {
      first,
      second,
      isSwap: true,
    };
    swapObjArr.push(swapObj);
    swap(unSortedArr, 0, end);
    end--;
    heapify(unSortedArr, end);
  }
};

const makeHeap = (unSortedArr: Bar[]) => {
  let i, child, parent;
  for (i = 2; i < unSortedArr.length; i++) {
    child = i;
    parent = Math.floor((child - 1) / 2);
    while (
      child > 0 &&
      unSortedArr[parent].getHeight() < unSortedArr[child].getHeight()
    ) {
      let first = unSortedArr[child];
      let second = unSortedArr[parent];
      let swapObj = {
        first,
        second,
        isSwap: true,
        isMakeHeap: true,
      };
      swapObjArr.push(swapObj);
      swap(unSortedArr, child, parent);
      child = parent;
      parent = Math.floor((child - 1) / 2);
      if (child <= 0 || parent < 0) {
        break;
      }
    }
  }
};
const heapSort = (unSortedArr: Bar[]) => {
  let sortedArr = [...unSortedArr];
  swapObjArr = [];
  makeHeap(sortedArr);
  heapSortMain(sortedArr);
  return { swapObjArr, sortedArr };
};
export default heapSort;
