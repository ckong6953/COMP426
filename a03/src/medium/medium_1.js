import {variance} from "./data/stats_helpers.js";

/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
    let sum = array.reduce(function(a,b){
        return a + b;
    }, 0);

    return sum;
}

//console.log(getSum([3,4,5,56,3.9,4,2,54,5,2]));


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
    
    array.sort(function(a,b){
        return a-b;
    });

    let halfLength = Math.floor(array.length / 2);

    if(array.length % 2){
        return array[halfLength];
    }

    return (array[halfLength - 1] + array[halfLength]) /2.0;
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

    let minNum = Math.min.apply(null, array);
    let medianNum = getMedian(array);
    let maxNum = Math.max.apply(null, array);
    let lengthNum = array.length;
    let sumNum = getSum(array)
    let meanNum = sumNum / lengthNum;
    let varianceNum = variance (array, meanNum);
    let sdNum = Math.sqrt(varianceNum);

    let dataMap = new Map ();
    dataMap.set('length',lengthNum);
    dataMap.set('sum', sumNum);
    dataMap.set('mean', meanNum);
    dataMap.set('median',medianNum);
    dataMap.set('min', minNum);
    dataMap.set('max', maxNum);
    dataMap.set('variance', varianceNum);
    dataMap.set('standard_deviation', sdNum);

  
    const stats = Object.fromEntries(dataMap);
      
    return stats;
}

//console.log(getStatistics([3,2,4,5,5,5,2,6,7]));

