var settingUs;
var mass;
var height;
var male;
var female;
var ageInMonths;
var bmi;
var isValid;
var variation = "std";


// Event handlers for 'Reset' and 'Calculate' buttons
document.querySelector("#btn span:first-child")
    .addEventListener("click", function () {
        location.reload();
    })
document.querySelector("#btn span:nth-child(2)").addEventListener("click", diagnose);
document.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      diagnose();
    }
});

// Event handlers for diplaying gender and age input
document.querySelector("select").addEventListener("change", function () {
    variation = document.querySelector("select").value;
    if (variation === "std" || variation === "us") {
        if (variation === "us") {
            document.querySelector("#additional legend").innerText = "Males and females aged 20 and over";
            document.getElementById("result").innerText
                = "This calculator is for (us) males and females aged 20 and over only."
                + "\n" + "For children (2 - 20 years) please select variation = standard."
                + "Calculate the Body Mass Index by entering weight, height, date of birth & gender.";
        } else {
            document.querySelector("#additional legend").innerText = "Only for children aged 2 to 20 years";
            document.getElementById("result").innerText
                = "Calculate the Body Mass Index by entering weight and height."
                + "\n" + "For children (2-20 years) please enter the date of birth and gender.";
        }
        document.getElementById("additional").style.display = "block";
    } else {
        document.getElementById("additional").style.display = "none";
        document.getElementById("result").innerText = "Calculate the Body Mass Index by entering weight and height.";
    }
})

// Event handling for labels mass & height
document.getElementById("eu").addEventListener('click', function () {
    document.getElementById("lblMass").innerText = "Mass in Kg";
    document.getElementById("lblHeight").innerText = "Height in meter";
})
document.getElementById("us").addEventListener('click', function () {
    document.getElementById("lblMass").innerText = "Mass in Lb";
    document.getElementById("lblHeight").innerText = "Height in inches";
})

function diagnose() {
    isValid = true;
    getAgeInMonths();
    validateForm();
    if (!isValid) return;
    calcBmi();
    var message = "This is considered as ";
    var ageIndex;
    if (ageInMonths >= 240.5 && ageInMonths < 252) {
        ageIndex = 218;
    } else {
        var ageBmi = findAgeInBmiArr(ageInMonths);
        ageIndex = ages.indexOf(ageBmi) - 1;
    }
    console.log(ageIndex);
    message = updateMessage(message, ageIndex);
    showMsg(message);
}

function calcBmi() {
    settingUs = document.getElementById("us").checked;
    bmi = mass / Math.pow(height, 2);
    if (settingUs) {
        bmi = bmi * 703;
    }
}

function updateMessage(message, ageIndex) {
    if (variation == "std") {
        if (female) {
            if (bmi < bmiFemale[ageIndex][1]) {
                message += "underweight";
            } else if (bmi >= bmiFemale[ageIndex][6] && bmi <= bmiFemale[ageIndex][8]) {
                message += "overweight";
            } else if (bmi > bmiFemale[ageIndex][8]) {
                message += "obese";
            } else {
                message += "optimal";
            }
        } else if (male) {
            if (bmi < bmiMale[ageIndex][1]) {
                message += "underweight";
            } else if (bmi >= bmiMale[ageIndex][6] && bmi <= bmiMale[ageIndex][8]) {
                message += "overweight";
            } else if (bmi > bmiMale[ageIndex][8]) {
                message += "obese";
            } else {
                message += "optimal";
            }
        } else {
            if (bmi < 18.5) {
                message += "underweight";
            } else if (bmi >= 18.5 && bmi < 25) {
                message += "optimal";
            } else if (bmi >= 25 && bmi < 30) {
                message += "overweight";
            } else {
                message += "obese";
            }
        }
    }
    if (variation == "who") {
        if (bmi < 15) {
            message += "Very severly underweight";
        } else if (bmi >= 15 && bmi < 16) {
            message += "Severely underweight";
        } else if (bmi >= 16 && bmi < 18.5) {
            message += "Underweight";
        } else if (bmi >= 18.5 && bmi < 25) {
            message += "Normal (healthy weight)";
        } else if (bmi >= 25 && bmi < 30) {
            message += "Overweight";
        } else if (bmi >= 30 && bmi < 35) {
            message += "Obese Class I (Moderately obese)";
        } else if (bmi >= 35 && bmi < 40) {
            message += "Obese Class II (Severely obese)";
        } else {
            message += "Obese Class III (Very severely obese)";
        }
    }
    if (variation == "hk") {
        if (bmi < 18.5) {
            message += "Underweight";
        } else if (bmi >= 18.5 && bmi < 23) {
            message += "Normal Range";
        } else if (bmi >= 23 && bmi < 25) {
            message += "Overweight—At Risk";
        } else if (bmi >= 25 && bmi < 30) {
            message += "Overweight—Moderately Obese";
        } else {
            message += "Overweight—Severely Obese";
        }
    }
    if (variation == "jp") {
        if (bmi < 18.5) {
            message += "Low";
        } else if (bmi >= 18.5 && bmi < 25) {
            message += "Normal";
        } else if (bmi >= 25 && bmi < 30) {
            message += "Obese (Level 1)";
        } else if (bmi >= 30 && bmi < 35) {
            message += "Obese (Level 2)";
        } else if (bmi >= 35 && bmi < 40) {
            message += "Obese (Level 3)";
        } else {
            message += "Obese (Level 4)";
        }
    }
    if (variation == "sg") {
        if (bmi < 18.5) {
            message = "Health Risk: Risk of developing problems such as nutritional deficiency and osteoporosis";
        } else if (bmi >= 18.5 && bmi < 23) {
            message = "Health Risk: Low Risk (healthy range)";
        } else if (bmi >= 23 && bmi < 27.5) {
            message = "Health Risk: Moderate risk of developing heart disease, high blood pressure, stroke, diabetes";
        } else {
            message = "Health Risk: High risk of developing heart disease, high blood pressure, stroke, diabetes";
        }
    }
    if (variation == "us") {
        if (bmi < 18.5) {
            message += "underweight";
        } else if (bmi >= 18.5 && bmi < 25) {
            message += "normal";
        } else if (bmi >= 25 && bmi < 30) {
            message += "overweight";
        } else if (bmi >= 30 && bmi < 35) {
            message += "Obese Class I (Moderately obese)";
        } else if (bmi >= 35 && bmi < 40) {
            message += "Obese Class II (Severely obese)";
        } else {
            message += "Obese Class III (Very severely obese)";
        }
        message += getPercentileComment();
    }
    return message;
}

function showMsg(msg) {
    document.getElementById("result").innerHTML = "Your Body Mass Index (BMI) is : <strong>"
        + bmi.toFixed(1) + "</strong><br>" + msg + ".<br>";
    document.getElementById("mass").value = mass;
    document.getElementById("height").value = height;
}

function getBirthDate() {
    day = parseInt(document.getElementById("birthDay").value);
    month = parseInt(document.getElementById("birthMonth").value);
    year = parseInt(document.getElementById("birthYear").value);
    var birthDate = new Date(year, month, day);
    console.log("birthdate: " + birthDate);
    return birthDate;
}

function getAgeInMonths() {
    var dateOfBirth = getBirthDate();
    ageInMonths = moment(dateOfBirth).diff(moment(), 'months', true) * -1;
    ageInMonths = Math.floor(ageInMonths * 10) / 10;
    console.log("age in months: " + ageInMonths);
}

function validateForm() {
    var toRemove = document.querySelectorAll("#errors li");
    $(toRemove).remove();

    mass = parseFloat(document.getElementById("mass").value);
    if (isNaN(mass)) {
        isValid = false;
        var massMsg = document.createElement("li");
        massMsg.innerText = "Please enter a valid weight.";
        document.querySelector("#errors ul").appendChild(massMsg);
    }

    height = parseFloat(document.getElementById("height").value);
    if (isNaN(height)) {
        isValid = false;
        var heightMsg = document.createElement("li");
        heightMsg.innerText = "Please enter a valid height.";
        document.querySelector("#errors ul").appendChild(heightMsg);
    }

    female = document.getElementById("female").checked;
    male = document.getElementById("male").checked;
    if (variation !== "us") {
        if (ageInMonths >= 24 && ageInMonths <= 240.5) {
            if (!female && !male) {
                isValid = false;
                var genderMsg = document.createElement("li");
                genderMsg.innerText = "Please select the gender.";
                document.querySelector("#errors ul").appendChild(genderMsg);
            }
        }

    }

    var birthdate = getBirthDate();
    if (((male || female)
        && !(birthdate instanceof Date && !isNaN(birthdate.valueOf())))
        || birthdate > moment()
        || noValidAgeRange()) {
        isValid = false;
        var dateMsg = document.createElement("li");
        dateMsg.innerText = "Please enter a valid date of birth.";
        document.querySelector("#errors ul").appendChild(dateMsg);
    }

    function noValidAgeRange() {
        if (variation == "std") {
            var ageToTest = moment().diff(moment(birthdate), 'years', true);
            if (ageToTest < 2 || ageToTest >= 21) {
                return true;
            }
            return false;
        }
        return false;
    }

    if (variation === "us" && ageInMonths < 240) {
        isValid = false;
        var dateMsg = document.createElement("li");
        dateMsg.innerText = "This calculator is for males and females aged 20 and over only. Please enter a valid date of birth.";
        document.querySelector("#errors ul").appendChild(dateMsg);
    }

    if (variation === "us" && !(male || female)) {
        isValid = false;
        var genderMsg = document.createElement("li");
        genderMsg.innerText = "Please select the gender.";
        document.querySelector("#errors ul").appendChild(genderMsg);
    }

}

function findAgeInBmiArr(aim) {
    for (let i = 0; i < ages.length; i++) {
        if (aim < ages[i]) {
            return ages[i];
        }
    }
}