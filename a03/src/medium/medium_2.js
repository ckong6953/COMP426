import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: mpgCalc(mpg_data),
    allYearStats: getStatistics(yearCalc(mpg_data)),
    ratioHybrids: countHybrid(mpg_data),
};

// helper function used to calcualte the average mpg for all cars returned as a map
export function mpgCalc(array){
    
    let cityAvg = 0;
    let hwAvg = 0;

    array.forEach( function(carObj) {
        let carData = new Map(Object.entries(carObj));
        cityAvg += carData.get("city_mpg");
        hwAvg += carData.get("highway_mpg");
    });

    let carMpgObj = {
        "city": (cityAvg)/array.length,
        "highway": (hwAvg)/array.length
    }

    return carMpgObj;
}

// helper functin to compile the years of each car as an array.
export function yearCalc(array){
    let yearArray = new Array();
    array.forEach( function(carObj) {
        let carData = new Map(Object.entries(carObj));
        yearArray.push(carData.get('year'));
    });
    return yearArray;
}

// helper function to calculate the ratio of hybrid to nonhybrid cars
export function countHybrid(array){
    let hybridCount = 0;
    array.forEach( function(carObj) {
        let carData = new Map(Object.entries(carObj));
        if(carData.get('hybrid')){
            hybridCount++;
        }
    });

    return hybridCount/array.length;
}



/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: hybridMakeHelper(mpg_data,"make"),
    avgMpgByYearAndHybrid: calcYearStats(mpg_data,"year")
};

// function to group car objects by a property value
export function groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
      let key = obj[property]
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(obj)
      return acc
    }, {})
}

// function used to construct an object in which a grouped object is filtered
// by if it is hybrid or not. 
export function propHybridSort(objectArray, property){
    let allMakesObj = groupBy(objectArray, property);
    for (let makeIndex in allMakesObj){
        let hybridFilteredArray = allMakesObj[makeIndex].filter(function(carObj){
            return carObj.hybrid == true;
        });
    allMakesObj[makeIndex] = hybridFilteredArray;
  }
    return allMakesObj;
}

// helper function to generate array of objects according to make and if they are hybrid
export function hybridMakeHelper(objectArray,property){
    let unsortedHybridMake = propHybridSort(objectArray, property); 
    let makeHybridArray = new Array();
    for (let hybridIndex in unsortedHybridMake){
        let sortHybrids = unsortedHybridMake[hybridIndex];
        let carList = new Array();
        sortHybrids.forEach(function (carObj) {
            let carData = new Map (Object.entries(carObj));
            carList.push(carData.get("id"));
        });
        let makeHybridObj = {
            "make": hybridIndex,
            "hybrids": carList,
        };
        if (carList.length > 0){
            makeHybridArray.push(makeHybridObj);
        };
    }
    makeHybridArray.sort(function(a,b){
        return b.hybrids.length- a.hybrids.length;
    });
    return makeHybridArray;
}

export function calcYearStats(objectArray,property){
    let yearGroupObject = groupBy(objectArray, property);
    for (let yearObjectIndex in yearGroupObject){
       let yearArray = yearGroupObject[yearObjectIndex];
       let hybridArray = new Array();
       let nonHybridArray = new Array();
       yearArray.forEach(function(carObj){
        let carData = new Map(Object.entries(carObj));
        if (carData.get("hybrid")){
            hybridArray.push(carObj);
        }
        else{
            nonHybridArray.push(carObj);
        }
        });
        let bothObj = {
            "hybrid": mpgCalc(hybridArray),
            "notHybrid": mpgCalc(nonHybridArray)
        }
        yearGroupObject[yearObjectIndex] = bothObj;
    }
    return yearGroupObject;
}
