/**
 * 
 * The Input Fields Validator and Formatter
 * @author dbosle
 * @version v1.0
 * 
 */


/**
 * Setter function for OnlyNumberInput()
 * 
 * @param {string} elementID the element id 
 */
function setOnlyNumberInput(elementID){
    document.getElementById(elementID).onkeydown = onlyNumberInput;
}


/**
 * onlyNumberInput function.
 * It controls input keys, and only accepts numbers.
 * And it lets ctrl+c and ctrl+x commands
 * 
 * Use with "setOnlyNumberInput("elementID");"
 * 
 * @param {Event} e keydown event, this
 */
function onlyNumberInput(e) {
    if (
        (e.which == 8) ||
        (e.which == 46) ||
        (e.which == 116) ||
        (e.which == 9) ||
        (e.which == 37) ||
        (e.which == 39) ||
        (e.which > 47 && e.which < 58) ||
        (e.which > 95 && e.which < 106) ||
        (e.ctrlKey && e.which == 67) ||
        (e.ctrlKey && e.which == 88)
    ) {
        checkRequiredField(e.target.id);
        return true;
    } else {
        checkRequiredField(e.target.id);
        return false;
    }
}


/**
 * Setter function for onlyPriceInput()
 * 
 * @param {string} elementID the element id 
 */
function setOnlyPriceInput(elementID){
    document.getElementById(elementID).onkeydown = onlyPriceInput;
    document.getElementById(elementID).addEventListener("blur", onlyPriceInput);
    document.getElementById(elementID).addEventListener("blur", inputPriceFormatter);
    document.getElementById(elementID).addEventListener("keydown", inputPriceFormatter);
}


/**
 * onlyPriceInput Function
 * It controls input keys, and only accepts numbers and point.
 * And it lets ctrl+c, ctrl+x and ctrl+v commands
 * 
 * Use with "setOnlyPriceInput("elementID");"
 * 
 * @param {Event} e keydown event, this
 */
function onlyPriceInput(e) {
    if (
        (e.which == 8) ||
        (e.which == 46) ||
        (e.which == 190) ||
        (e.which == 116) ||
        (e.which == 9) ||
        (e.which == 37) ||
        (e.which == 39) ||
        (e.which > 47 && e.which < 58) ||
        (e.which > 95 && e.which < 106) ||
        (e.ctrlKey && e.which == 86) ||
        (e.ctrlKey && e.which == 67) ||
        (e.ctrlKey && e.which == 88)
    ) {
        checkRequiredField(e.target.id);
        return true;
    } else {
        checkRequiredField(e.target.id);
        return false;
    }
}


/**
 * Input field Price Formatter
 * 
 * @param {Event} e this 
 */
function inputPriceFormatter(e) {

    let process;
    if (e.which == 13 || e.which == 9 || e.which == 0 || e.type == "blur") {
        process = true;
    }
    if (!process) {
        return;
    }

    //trim commas and points
    let str = e.target.value;
    let valid = true;
    while (valid) {
        if (str.endsWith(".") || str.endsWith(",")) {
            str = str.slice(0, (str.length - 1));
            valid = true;
        } else {
            valid = false;
        }
    }

    valid = true;
    while (valid) {
        if (str.startsWith(".") || str.startsWith(",")) {
            str = str.slice(1, str.length);
            valid = true;
        } else {
            valid = false;
        }
    }
    //trim commas and points

    let lastPoint = str.lastIndexOf(".");
    let lastComma = str.lastIndexOf(",");
    let decimalPart, fractionalPart, pointActive = false;
    valid = true;
    if (lastPoint == lastComma) {
        //no commas
        valid = false;
    }
    else if (lastPoint > lastComma) {
        //point at the end
        decimalPart = str.slice(0, lastPoint);
        fractionalPart = str.slice((lastPoint + 1), str.length);
        pointActive = true;
    }
    else {
        //comma at the end
        decimalPart = str.slice(0, lastComma);
        fractionalPart = str.slice((lastComma + 1), str.length);
        pointActive = true;
    }

    //clear commas and points
    while (valid) {
        if (decimalPart.includes(",") || decimalPart.includes(".")) {
            decimalPart = decimalPart.replace(",", "");
            decimalPart = decimalPart.replace(".", "");
            valid = true;
        } else {
            valid = false;
        }
    }
    //clear commas and points

    if (pointActive) {
        str = "";
        str += decimalPart;
        str += ".";
        str += fractionalPart;
        e.target.value = str;
    }
    else {
        if (isNaN(parseInt(str).toFixed(2))) {
            e.target.value = "";
        } else {
            e.target.value = parseInt(str).toFixed(2); // => If you don't want rounding delete toFixed()
        }
    }


}


/**
 * Required Input Fields Visualizer
 * 
 * @param {string} fieldId the element id 
 */
function checkRequiredField(fieldId) {
    if (document.getElementById(fieldId).required) {
        if (document.getElementById(fieldId).validity.valid) {
            document.getElementById(fieldId).style.border = "";
        } else {
            document.getElementById(fieldId).style.border = "1px solid red";
        }
    }
}


/**
 * Form Required Fields Style Cleaner
 */
function requiredStyleCleaner(){
    let style = document.createElement("style");
    style.innerHTML = `
    :invalid {
        box-shadow: none;
    }
    
    :-moz-submit-invalid {
        box-shadow: none;
    }
    
    :-moz-ui-invalid {
        box-shadow: none;
    }
    `;
    document.head.append(style);
}
requiredStyleCleaner();
