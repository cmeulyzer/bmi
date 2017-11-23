var usAgeRange = [20, 30, 40, 50, 60, 70, 80];
var percentiles = [5, 10, 15, 25, 50, 75, 85, 90, 95];

var usMen = [
    [19.3, 20.5, 21.2, 22.5, 25.5, 30.5, 33.1, 35.1, 39.2],
    [21.1, 22.4, 23.3, 24.8, 27.5, 31.9, 35.1, 36.5, 39.3],
    [21.9, 23.4, 24.3, 25.7, 28.5, 31.9, 34.4, 36.5, 40],
    [21.6, 22.7, 23.6, 25.4, 28.3, 32, 34, 35.2, 40.3],
    [21.6, 22.7, 23.6, 25.3, 28, 32.4, 35.3, 36.9, 41.2],
    [21.5, 23.2, 23.9, 25.4, 27.8, 30.9, 33.1, 34.9, 38.9],
    [20, 21.5, 22.5, 24.1, 26.3, 29, 31.1, 32.3, 33.8]
]

var usWomen = [
    [18.6, 19.8, 20.7, 21.9, 25.6, 31.8, 36, 38.9, 42],
    [19.8, 21.1, 22, 23.3, 27.6, 33.1, 36.6, 40, 44.7],
    [20, 21.5, 22.5, 23.7, 28.1, 33.4, 37, 39.6, 44.5],
    [19.9, 21.5, 22.2, 24.5, 28.6, 34.4, 38.3, 40.7, 45.2],
    [20, 21.7, 23, 24.5, 28.9, 33.4, 36.1, 38.7, 41.8],
    [20.5, 22.1, 22.9, 24.6, 28.3, 33.4, 36.5, 39.1, 42.9],
    [19.3, 20.4, 21.3, 23.3, 26.1, 29.7, 30.9, 32.8, 35.2]
]

function getPercentileComment() {
    var age = Math.trunc(ageInMonths / 12);
    var indexAge = usAgeRange.findIndex(function (number) {
        return number > age;
    }) - 1;
    var percentile;
    console.log("male " + male);
    female = document.getElementById("female").checked;
    male = document.getElementById("male").checked;
    var gender;
    if (male) { gender = "men"; } else { gender = "women"; }
    if (male) {
        var percentileIndex = usMen[indexAge].findIndex(function (bmiUsMen) {
            return bmiUsMen >= bmi;
        });
        if (percentileIndex === -1) {
            percentile = percentiles.reduce(function (a, b) {
                return Math.max(a, b);
            });
        } else {
            percentile = percentiles[percentileIndex];
        }
    }
    if (female) {
        var percentileIndex = usWomen[indexAge].findIndex(function (bmiUsWomen) {
            return bmiUsWomen >= bmi;
        });
        if (percentileIndex === -1) {
            percentile = getMaxOfArray(percentiles);
        } else {
            percentile = percentiles[percentileIndex];
        }
    }
    console.log("age = " + age + ", indexAge = " + indexAge
        + ", percentileIndex = " + percentileIndex
        + ", percentile = " + percentile);

    return "<br>You are in the " + percentile + "th percentile. "
        + (100 - percentile) + "% of us " + gender + " have a higher BMI. <br> Source percentiles: \"Anthropometric Reference Data for Children and Adults: United States\" from <a href=\"https://www.cdc.gov/nchs/data/series/sr_03/sr03_039.pdf\">CDC DHHS</a>.";
}

function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
}