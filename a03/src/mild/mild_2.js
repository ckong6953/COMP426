
/**
 *
 * @param variable
 * @returns {{type: ("undefined"|"object"|"boolean"|"number"|"string"|"function"|"symbol"|"bigint"), value: *}}
 * example: identifyVariable(4);
 * returns: { type: 'number', value: 4 }
 */
export function identifyVariable(variable) {
  
   let type = typeof variable;

   const entries = new Map ([
      ['type', type],
      ['value',variable]
  ]);

   const varType = Object.fromEntries(entries);
    
   return varType;
}


/**
 *
 * @param array
 * @returns {[]}
 * example: identifyArray(['some', 3, [3, 4], false]);
 * returns: [
 { type: 'string', value: 'some' },
 { type: 'number', value: 3 },
 { type: 'object', value: [ 3, 4 ] },
 { type: 'boolean', value: false }
 ]

 */
export function identifyArray(array) {
    let idArray = new Array();

    for (let i = 0; i < array.length; i++){
        let type = typeof array[i];

        const entries = new Map ([
            ['type', type],
            ['value',array[i]]
        ]);
        const varType = Object.fromEntries(entries);

        idArray[i] = varType;
    }

    return idArray;
}

/**
 * mutates the object that is passed in.
 * @param object
 * @param key
 * @returns {*} does not have to return anything
 *
 * example:
 * let obj = {
    name: 'Mr. Boss',
    title: 'boss',
    age: 33,
    password: 'pass123'
};
 removeKey(obj, 'password');
 obj now does not contain the `password` field
 */
export function removeKey(object, key) {
    delete object[key];
}


/**
 * Does not mutate the object passed in
 * @param object
 * @param key
 * @returns {*} The object with its keys removed
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 * let obj = {
    name: 'Mr. Boss',
    title: 'boss',
    age: 33,
    password: 'pass123'
};
 obj = removeKeyNonDestructive(obj, 'password');
 obj will not have the `password` field only because it was assigned the result of the function.
 If only `removeKeyNonDestructive` was called, nothing would have changed.
 */
export function removeKeyNonDestructive(object, key) {
    const {[key]: remove, ... rest} = object;
    object = rest;
    return object;
}

/*let obj = {
    name: 'Mr. Boss',
    title: 'boss',
    age: 33,
    password: 'pass123',
};

console.log(removeKeyNonDestructive(obj,'password'));
*/

/**
 * Remove and return the listed keys. Without mutating the object passed in.
 * @param object
 * @param {string[]} keyList
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 *
 * example:


 let obj = {
    name: 'Mr. Boss',
    title: 'boss',
    age: 33,
    password: 'pass123'
 };
 obj = removeKeys(obj, ['password', 'age']);
 // object not looks like this
 { name: 'Mr. Boss', title: 'boss' }

 * @return {*} The object with its keys removed.
 */
export function removeKeys(object, keyList) {
    for (let i = 0; i < keyList.length; i++){
        const {[keyList[i]]: remove, ... rest} = object;
        object = rest;
    }
    return object;
}

/*let obj = {
    name: 'Mr. Boss',
    title: 'boss',
    age: 33,
    password: 'pass123'
 };
console.log(removeKeys(obj, ['password', 'age']));
*/