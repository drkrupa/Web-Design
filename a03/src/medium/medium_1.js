import {variance} from "./data/stats_helpers";


/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
    var sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }
    return sum;
    
}


/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {
    mergeSort(array);
    if (array.length % 2 == 0) {
        return ((array[array.length / 2] + array[(array.length/ 2) - 1]) / 2);
    } else {
        return array[((array.length - 1) / 2)];
    }
}

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {
    var stat = new Object();
    stat['length'] = array.length;
    stat['sum'] = getSum(array);
    stat['median'] = getMedian(array);
    stat['min'] = array[0];
    stat['max'] = array[array.length - 1];
    let mean = stat['sum'] / array.length;
    stat['mean'] = mean;
    stat['variance'] = variance(array, mean);
    stat['standard_deviation'] = Math.sqrt(stat['variance']);

    return stat;

}


export function mergeSort(array) {
    if (array.length == 1) {
        return array;
    } 
    var mid = Math.floor(array.length / 2);
    var left = array.slice(0, mid);
    var right = array.slice(mid);

    return merge(mergeSort(left), mergeSort(right));
}

export function merge(left, right){
    var result = [], leftIndex = 0, rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    if (leftIndex < left.length) {
        result.push(left[leftIndex]);
    } else {
        result.push(right[rightIndex]);
    }
    return result;
}


