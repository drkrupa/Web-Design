import mpg_data from "./data/mpg_data";

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
    car_data = car_data.filter(a => a['horsepower'] >= minHorsepower);
    car_data = car_data.filter(b => b['torque'] >= minTorque);

    let car_data_sorted = [], car_data_temp = JSON.parse(JSON.stringify(car_data));
    for (let i = 0; i < car_data_temp.length; i++) {
        let max = 0, index = 0;
        for (let j = 0; j < car_data_temp.length; j++) {
            if (car_data_temp[j]['horsepower'] > max && car_data_sorted.length == 0) {
                index = j;
                max = car_data_temp[j]['horsepower'];
            } else if (car_data_temp[j]['horsepower'] > max && car_data_temp[j]['horsepower'] <= car_data_sorted[car_data_sorted.length - 1]['horsepower']) {
                index = j;
                max = car_data_temp[j]['horsepower'];
            }
        }
        car_data_sorted[i] = car_data[index];
        car_data_temp[index]['horsepower'] = 0;
    }

    return car_data_sorted;
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
    car_data = car_data.filter(a => a['highway_mpg'] >= minHighway);
    car_data = car_data.filter(b => b['city_mpg'] >= minCity);

    let car_data_sorted = [], car_data_temp = JSON.parse(JSON.stringify(car_data));
    for (let i = 0; i < car_data_temp.length; i++) {
        let max = 0, index = 0;
        for (let j = 0; j < car_data_temp.length; j++) {
            if (car_data_temp[j]['highway_mpg'] > max && car_data_sorted.length == 0) {
                index = j;
                max = car_data_temp[j]['highway_mpg'];
            } else if (car_data_temp[j]['highway_mpg'] > max && car_data_temp[j]['highway_mpg'] <= car_data_sorted[car_data_sorted.length - 1]['highway_mpg']) {
                index = j;
                max = car_data_temp[j]['highway_mpg'];
            }
        }
        car_data_sorted[i] = car_data[index];
        car_data_temp[index]['highway_mpg'] = 0;
    }

    return car_data_sorted;
}

//console.log(searchMpg(mpg_data, 29, 35));

/**
 * Find all cars where 'id' contains the search term below.
 * Sort the results so that if the term appears earlier in the string
 * it will appear earlier in the list. Make sure searching and sorting ignores case.
 * @param car_data
 * @param searchTerm A string to that is used for searching
 * @returns {[]} array of cars
 */
export function searchName(car_data, searchTerm) {
    let car_data_caps = JSON.parse(JSON.stringify(car_data)), car_data_sorter = [], car_data_sorter_caps = [];
    searchTerm = searchTerm.toUpperCase();
    for (let i = 0; i < car_data_caps.length; i++) {
        car_data_caps[i]['id'] = car_data_caps[i]['id'].toUpperCase();
        if (car_data_caps[i]['id'].includes(searchTerm)) {
            car_data_sorter_caps[car_data_sorter_caps.length] = car_data_caps[i];
            car_data_sorter[car_data_sorter.length] = car_data[i];
            car_data_sorter[car_data_sorter.length - 1]['i'] = car_data_sorter_caps[car_data_sorter_caps.length - 1]['id'].indexOf(searchTerm);
        }
    }

    car_data_sorter.sort(function(a, b) {
        return a['i'] - b['i'];
    });

    for (let i = 0; i < car_data_sorter.length; i++) {
        delete car_data_sorter[i]['i'];
    }

    
    /*let sorted = [], sorted_caps = [], caps_temp = JSON.parse(JSON.stringify(car_data_sorter_caps));
    for (let i = 0; i < car_data_sorter_caps.length; i++) {
        let min = 10000000, index = 0;
        for (let j = car_data_sorter_caps.length -1; j >= 0; j--) {
            let check = car_data_sorter_caps[j]['id'].indexOf(searchTerm);
            if (check <= min && sorted.length == 0 && check > -1) {
                min = check;
                index = j;
            } else if (check <= min && check > -1) {
                        min = check;
                        index = j;   
            }
        }
        sorted[i] = car_data_sorter[index];
        sorted_caps[i] = caps_temp[index];
        car_data_sorter_caps[index]['id'] = '';
     }*/

    //console.log(sorted_ints);
    return car_data_sorter;

}

console.log(searchName(mpg_data, 'sport sedan AT'));
//searchName(mpg_data, 'sedan');


/**
 * Find all cars made in the years asked for.
 * Sort the results by year in descending order. 
 *
 * @param car_data
 * @param {number[]} years - array of years to be included in the results e.g. [2010, 2012]
 * @returns {[]} an array of car objects
 */
export function searchByYear(car_data, years) {
    for (let i = 0; i < years.length; i++) {
        let temp = years[i], max = 0, index = 0;
        for (let j = i; j < years.length; j++) {
            if (years[j] > max) {
                max = years[j];
                index = j;
            }
        }
        years[i] = years[index];
        years[index] = temp;
    }

    let year_data = [];
    for (let i = 0; i < years.length; i++) {
        for (let j = 0; j < car_data.length; j++) {
            if (car_data[j]['year'] == years[i]) {
                year_data[year_data.length] = car_data[j];
            }
        }
    }
    return year_data;
}

