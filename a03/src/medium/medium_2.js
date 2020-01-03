import mpg_data from "./data/mpg_data";
import {getStatistics} from "./medium_1";

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
    avgMpg: mpg(mpg_data),
    allYearStats: yearStat(),
    ratioHybrids: rHybrids(),
};

export function mpg(mpgData) {
    let mpg = new Object(), city_sum = 0, highway_sum = 0;
    for (let i = 0; i < mpgData.length; i++) {
        city_sum += mpgData[i]['city_mpg'];
        highway_sum += mpgData[i]['highway_mpg'];
    }
    mpg['city'] = city_sum / mpgData.length;
    mpg['highway'] = highway_sum / mpgData.length;
    return mpg;

}

export function yearStat() {
    let year = [];
    for (let i = 0; i < mpg_data.length; i++) {
        year[i] = mpg_data[i]['year'];
    }
    return getStatistics(year);
}

export function rHybrids() {
    let hybrid_sum = 0;
    for (let i = 0; i < mpg_data.length; i++) {
        if (mpg_data[i]['hybrid']) {
            hybrid_sum++;
        }
    }
    return hybrid_sum / mpg_data.length;
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
    makerHybrids: hybridMakes(),
    avgMpgByYearAndHybrid: yearHybridMpg()
};

export function hybridMakes() {
    let makes = [];
    let mpg_hybrids = JSON.parse(JSON.stringify(mpg_data));
    mpg_hybrids = mpg_hybrids.filter(a => a['hybrid']);
    for (let i = 0; i < mpg_hybrids.length; i++) {
        if (makes.length == 0) {
            makes[0] = {make: mpg_hybrids[i]['make'], hybrids: [mpg_hybrids[i]['id']]};
        } else {
            for (let j = 0; j < makes.length; j++) {
                if (makes[j]['make'] == mpg_hybrids[i]['make']) {
                    makes[j]['hybrids'][makes[j]['hybrids'].length] = mpg_hybrids[i]['id'];
                    break;
                } else if (j == makes.length - 1) {
                    makes[makes.length] = {make: mpg_hybrids[i]['make'], hybrids: [mpg_hybrids[i]['id']]};
                    break;
                }
            }
        }
    }
    let sortHelp = [];
    for (let i = 0; i < makes.length; i++) {
        sortHelp[i] = makes[i]['hybrids'].length;
    }
    sortHelp.sort(function(a,b) {
        return b - a;
    });

    let makesSorted = [];
    for (let i = 0; i < sortHelp.length; i ++) {
        for (let j = 0; j < makes.length; j ++) {
            if (i == 0 && makes[j]['hybrids'].length == sortHelp[i]) {
                makesSorted[i] = JSON.parse(JSON.stringify(makes[j]));
                makes[j]['hybrids'] = [];
                break;
            } else if (makes[j]['hybrids'].length == sortHelp[i]) {
                makesSorted[i] = JSON.parse(JSON.stringify(makes[j]));
                makes[j]['hybrids'] = [];
                break;
            }
        }
    }
    //console.log(sortHelp);
    //console.log(makesSorted);
    return makesSorted;
}

export function yearHybridMpg() {
    let yearsChecked = [], yearMpg = new Object();
    for (let i = 0; i < mpg_data.length; i++) {
        let thisYear = mpg_data[i]['year'];
        if (yearsChecked.length == 0) {
            yearMpg[thisYear] = getYearMpg(thisYear);
            yearsChecked[0] = thisYear;
            continue;
        }
        for (let j = 0; j < yearsChecked.length; j++) {
            if (thisYear == yearsChecked[j]) {
                break;
            } else if (j == yearsChecked.length - 1) {
                yearMpg[thisYear] = getYearMpg(thisYear);
                yearsChecked[yearsChecked.length] = thisYear;
            }
        }
        
    }
    return yearMpg;
}

export function getYearMpg(checkYear) {
    let copy_mpg_data = JSON.parse(JSON.stringify(mpg_data));
    let thisYear = copy_mpg_data.filter(a => a['year'] == checkYear);
    let thisYearCopy = JSON.parse(JSON.stringify(thisYear));
    let thisYearHybrid = thisYear.filter(b => b['hybrid'] == true);
    let thisYearNonHybrid = thisYearCopy.filter(c => c['hybrid'] == false);
    let hybrids = mpg(thisYearHybrid);
    let non_hybrid = mpg(thisYearNonHybrid);

    let year_mpg = {'hybrid': hybrids, 'notHybrid': non_hybrid};
    return year_mpg;

}

//console.log(moreStats);
