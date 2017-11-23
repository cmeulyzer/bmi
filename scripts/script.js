var settingUs;
var mass;
var height;
var male;
var female;
var ageInMonths;
var bmi;
var isValid;
var variation = document.querySelector("select").value;


// Event handlers for 'Reset' and 'Calculate' buttons
document.querySelector("#btn span:first-child")
    .addEventListener("click", function () {
        location.reload();
    })
document.querySelector("#btn span:nth-child(2)").addEventListener("click", diagnose);

// Event handlers for diplaying gender and age input
document.querySelector("select").addEventListener("change", function () {
    variation = document.querySelector("select").value;
    if (variation === "std" || variation === "us") {
        if (variation === "us") {
            document.querySelector("#additional legend").innerText = "Children and Adults: United States";
        } else {
            document.querySelector("#additional legend").innerText = "Child aged 2 to 20 years";
        }
        document.getElementById("additional").style.display = "block";
    } else {
        document.getElementById("additional").style.display = "none";
    }
})

// Event handling for labels mass & height
document.getElementById("eu").addEventListener('click', function () {
    document.getElementById("lblMass").innerText = "Mass in Kg";
    document.getElementById("lblHeight").innerText = "Height in meter";
})
document.getElementById("us").addEventListener('click', function () {
    document.getElementById("lblMass").innerText = "Mass in Lb";
    document.getElementById("lblHeight").innerText = "Height in inch";
})

function diagnose() {
    isValid = true;
    getAgeInMonths();
    console.log("Age in months: " + ageInMonths);
    validateForm();
    if (!isValid) return;
    calcBmi();
    var message = "This is considered as ";
    var ageIndex;
    if (ageInMonths >= 240.5 && ageInMonths < 252) {
        ageIndex = 218;
    } else {
        ageIndex = ages.findIndex(function (a) {
            return a > parseFloat(ageInMonths);
        }) - 1;
    }
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
            console.log(female);
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
            message = "Health Risk: (kg/m2) Risk of developing problems such as nutritional deficiency and osteoporosis";
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

function getAgeInMonths() {
    var dateOfBirth = new Date(document.getElementById("birthdate").value);
    ageInMonths = moment(dateOfBirth).diff(moment(), 'months', true) * -1;
    ageInMonths = Math.trunc(ageInMonths * 10) / 10;
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
    if (ageInMonths >= 24 && ageInMonths <= 240.5) {
        if (!female && !male) {
            isValid = false;
            var genderMsg = document.createElement("li");
            genderMsg.innerText = "Please select the gender.";
            document.querySelector("#errors ul").appendChild(genderMsg);
        }
    }
    var birthdate = new Date(document.getElementById("birthdate").value);
    console.log(birthdate);
    if (((male || female) && document.getElementById("birthdate").value == "") ||
        birthdate > moment()) {
        isValid = false;
        var dateMsg = document.createElement("li");
        dateMsg.innerText = "Please enter a valid date of birth.";
        document.querySelector("#errors ul").appendChild(dateMsg);
    }

    if (document.getElementById("birthdate").value != "") {
        if (!(birthdate instanceof Date && !isNaN(birthdate.valueOf()))) {
            isValid = false;
            var dateMsg = document.createElement("li");
            dateMsg.innerText = "Please enter a valid date of birth.";
            document.querySelector("#errors ul").appendChild(dateMsg);
        }
        if (variation == "std") {
            var ageToTest = moment().diff(moment(birthdate), 'years', true);
            if (ageToTest < 2 || ageToTest >= 21) {
                isValid = false;
                var dateMsg = document.createElement("li");
                dateMsg.innerText = "Please enter a valid date of birth. (age : 2 to 20 years only)";
                document.querySelector("#errors ul").appendChild(dateMsg);
            }

        }
    }



}

