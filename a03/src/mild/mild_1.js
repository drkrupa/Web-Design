/**
 *
 * @param {number} a
 * @param {number} b
 * @returns {string} 'a + b = (a + b)'
 *
 * example: sumToString(3, 4)
 * returns: '3 + 4 = 7'
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 */
export function sumToString(a, b) {
    return `${a} + ${b} = ${a + b}`;

}


/**
 *
 * @param {number} startNumber
 * @param {number} endNumber
 * @returns {number[]}
 *
 * example: getIncreasingArray(3, 7)
 * returns: [ 3, 4, 5, 6, 7 ]
 *
 */
export function getIncreasingArray(startNumber, endNumber) {
    var a = [];
    var length = endNumber + 1 - startNumber;
    for (let j = 0; j < length; j++) {
        a[j] = startNumber + j;
    }
    return a;
}
console.log(getIncreasingArray(3, 8));

/**
 *
 * @param {number[]} numbers
 * @return {{min: number, max: number}}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
 * and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
 */
export function maxAndMin(numbers) {
    var min = numbers[0], max = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        min = Math.min(min, numbers[i]);
        max = Math.max(max, numbers[i]);
    }
    var minmax = new Object();
    minmax['min'] = min;
    minmax['max'] = max;
    return minmax;
}
//console.log(maxAndMin([1, 4, 5, 3, 128]));

/**
 *
 * @param array - An array of any primitive type
 * @returns {object} Object where the keys are the values that were passed in
 * and the value was the number of times it occurred.
 *
 * example: countArray([3, 6, 3, 2, 2, 3, 'some', 'hello', 'some', [1, 2]])
 * returns: {'2': 2, '3': 3, '6': 1, some: 2, hello: 1, '1,2': 1}
 *
 */
export function countArray(array) {
    var a = new Object();
    for (let i = 0; i < array.length; i++){
        if (a[array[i]] == null) {
            a[array[i]] = 1;
        } else {
            a[array[i]] ++;
        }
    }
    return a;
}
//console.log(countArray([3, 6, 3, 2, 2, 3, 'some', 'hello', 'some', [1, 2]]));