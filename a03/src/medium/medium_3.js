import mpg_data from "./data/mpg_data.js";

/*
mpg_data is imported for you but that is for testing purposes only. All of the functions should use
a car_data param that is supplied as the first parameter.

As you write these functions notice how they could possibly be chained together to solve more complicated
queries.
 */

/**
 * @param {array} car_data - an instance of mpg_data that should be used for filtering.
 * @param minHorsepower {number}
 * @param minTorque {number}
 *
 * @return {array} An array of car objects with horsepower >= minHorsePower and torque >= minTorque
 * sorted by horsepower in descending order.
 *
 */
export function searchHighPower(car_data, minHorsepower, minTorque) {
   let hpTorqueCars = car_data.filter(function(carObj){
       return carObj.horsepower >= minHorsepower &&
            carObj.torque >= minTorque;
   });
   hpTorqueCars.sort(function(a,b){
       return b.horsepower - a.horsepower;
   });
   return hpTorqueCars;
}


/**
 * @param {array} car_data
 * @param minCity
 * @param minHighway
 *
 *
 * @return {array} An array of car objects with highway_mpg >= minHighway and city_mpg >= minCity
 * sorted by highway_mpg in descending order
 *
 */
export function searchMpg(car_data, minCity, minHighway) {
    let mpgCars = car_data.filter(function(carObj){
        return carObj.highway_mpg >= minHighway &&
             carObj.city_mpg >= minCity;
    });
    mpgCars.sort(function(a,b){
        return b.highway_mpg - a.highway_mpg;
    });
    return mpgCars;
}


/**
 * Find all cars where 'id' contains the search term below.
 * Sort the results so that if the term appears earlier in the string
 * it will appear earlier in the list. Make sure searching and sorting ignores case.
 * @param car_data
 * @param searchTerm A string to that is used for searching
 * @returns {[]} array of cars
 */
export function searchName(car_data, searchTerm) {
    let nameCars = car_data.filter(function(carObj) {
        return carObj.id.toLowerCase().search(searchTerm.toLowerCase()) != -1;
    });

    nameCars.sort(function(a,b){
        return a.id.toLowerCase().indexOf(searchTerm.toLowerCase()) - b.id.toLowerCase().indexOf(searchTerm.toLowerCase());
    });
    return nameCars;
}

/**
 * Find all cars made in the years asked for.
 * Sort the results by year in descending order.
 *
 * @param car_data
 * @param {number[]} years - array of years to be included in the results e.g. [2010, 2012]
 * @returns {[]} an array of car objects
 */
export function searchByYear(car_data, years) {
    let yearCars = car_data.filter(function(carObj){
        return years.includes(carObj.year);
    });
    yearCars.sort(function(a,b){
        return b.year - a.year;
    });
    return yearCars;
}

