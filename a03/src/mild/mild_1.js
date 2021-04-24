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
    let total = "";
    total = total + a.toString() + " + " + b.toString() + " = " + (a+b).toString();
    return total;
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
    let up_array = new Array();
    let counter = 0;
    for (let i = startNumber; i < (endNumber + 1); i++){
        up_array[counter] = i;
        counter = counter + 1;
    }
    return up_array;
}

/**
 *
 * @param {number[]} numbers
 * @return {{min: number, max: number}}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
 * and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
 */
export function maxAndMin(numbers) {
    const minNum = Math.min.apply(null, numbers);
    const maxNum = Math.max.apply(null, numbers);
    const entries = new Map ([
        ['min',minNum],
        ['max',maxNum]
    ]);

    const extrema = Object.fromEntries(entries);
    
    return extrema;
}


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
    let myMap = new Map();
    for (let i = 0; i < array.length; i++){
        let possKey = String(array[i]);
        if (myMap.has(possKey)){
            myMap.set(possKey, (myMap.get(possKey))+1);
        }
        else{
            myMap.set(possKey,1);
        }
    }

    const countedArray = Object.fromEntries(myMap);

    return countedArray;
}