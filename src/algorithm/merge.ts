import { Bar } from "../app/State";
import { SwapObjType } from "../types";

let swapObjArr: SwapObjType[] = [];
const merge = (sortedArr: Bar[], start: number, mid: number, end: number) => {
  let lStart = mid - start + 1;
  let rStart = end - mid;
  let lStartA: Bar[] = [];
  let rStartA: Bar[] = [];
  let i = 0,
    j = 0,
    k = start;
  for (i = 0; i < lStart; i++) {
    lStartA.push(sortedArr[i + start]);
  }
  for (j = 0; j < rStart; j++) {
    rStartA.push(sortedArr[j + 1 + mid]);
  }
  (i = 0), (j = 0);
  while (i < lStart || j < rStart) {
    let tmp = sortedArr[k];
    let first = new Bar(
      tmp.getWidth(),
      tmp.getHeight(),
      tmp.getId(),
      tmp.getColor(),
      tmp.getY(),
      tmp.getX(),
      tmp.getIndex()
    );
    if (i < lStart && j < rStart) {
      if (lStartA[i].getHeight() <= rStartA[j].getHeight()) {
        let tmp = lStartA[i];
        let second = new Bar(
          tmp.getWidth(),
          tmp.getHeight(),
          tmp.getId(),
          tmp.getColor(),
          tmp.getY(),
          tmp.getX(),
          tmp.getIndex()
        );
        let swapObj = {
          first,
          second,
          isSwap: false,
        };
        swapObjArr.push(swapObj);
        sortedArr[k] = new Bar(
          tmp.getWidth(),
          tmp.getHeight(),
          tmp.getId(),
          tmp.getColor(),
          tmp.getY(),
          sortedArr[k].getX(),
          tmp.getIndex()
        );
        i++;
      } else {
        let tmp = rStartA[j];
        let second = new Bar(
          tmp.getWidth(),
          tmp.getHeight(),
          tmp.getId(),
          tmp.getColor(),
          tmp.getY(),
          tmp.getX(),
          tmp.getIndex()
        );
        let swapObj = {
          first,
          second,
          isSwap: false,
        };
        swapObjArr.push(swapObj);
        sortedArr[k] = new Bar(
          tmp.getWidth(),
          tmp.getHeight(),
          tmp.getId(),
          tmp.getColor(),
          tmp.getY(),
          sortedArr[k].getX(),
          tmp.getIndex()
        );
        j++;
      }
      k++;
    } else {
      if (i < lStart) {
        let tmp = lStartA[i];
        let second = new Bar(
          tmp.getWidth(),
          tmp.getHeight(),
          tmp.getId(),
          tmp.getColor(),
          tmp.getY(),
          tmp.getX(),
          tmp.getIndex()
        );
        let swapObj = {
          first,
          second,
          isSwap: false,
        };
        swapObjArr.push(swapObj);
        sortedArr[k] = new Bar(
          tmp.getWidth(),
          tmp.getHeight(),
          tmp.getId(),
          tmp.getColor(),
          tmp.getY(),
          sortedArr[k].getX(),
          tmp.getIndex()
        );
        k++;
        i++;
      } else {
        let tmp = rStartA[j];
        let second = new Bar(
          tmp.getWidth(),
          tmp.getHeight(),
          tmp.getId(),
          tmp.getColor(),
          tmp.getY(),
          tmp.getX(),
          tmp.getIndex()
        );
        let swapObj = {
          first,
          second,
          isSwap: false,
        };
        swapObjArr.push(swapObj);
        sortedArr[k] = new Bar(
          tmp.getWidth(),
          tmp.getHeight(),
          tmp.getId(),
          tmp.getColor(),
          tmp.getY(),
          sortedArr[k].getX(),
          tmp.getIndex()
        );
        k++;
        j++;
      }
    }
  }
};
const mergeSortMain = (sortedArr: Bar[], start: number, end: number) => {
  if (start < end) {
    let mid = Math.floor((start + end) / 2);
    mergeSortMain(sortedArr, start, mid);
    mergeSortMain(sortedArr, mid + 1, end);
    merge(sortedArr, start, mid, end);
  }
};
const mergeSort = (unSortedArr: Bar[]) => {
  let sortedArr = [...unSortedArr];
  swapObjArr = [];
  mergeSortMain(sortedArr, 0, sortedArr.length - 1);
  return { swapObjArr, sortedArr };
};
export default mergeSort;
