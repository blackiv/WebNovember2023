document.addEventListener("DOMContentLoaded", function () {
    const convertForm = document.getElementById("convert-form");
    const celsiusDegreesField = document.getElementById("celsius-degrees-field");
    const kelvinDegreesTextField = document.getElementById("kelvin-degrees-text");
    const fahrenheitDegreesTextField = document.getElementById("fahrenheit-degrees-text");

    celsiusDegreesField.addEventListener("input", function () {
        convertForm.requestSubmit();
    });

    convertForm.addEventListener("submit", function (e) {
        e.preventDefault();

        if (celsiusDegreesField.value === "") {
            kelvinDegreesTextField.textContent = "";
            fahrenheitDegreesTextField.textContent = "";
        } else {
            const celsiusDegrees = parseFloat(celsiusDegreesField.value);
            kelvinDegreesTextField.textContent = (celsiusDegrees + 273.15).toFixed(2);
            fahrenheitDegreesTextField.textContent = ((celsiusDegrees - 32) * 5 / 9).toFixed(2);
        }

    });
    convertForm.requestSubmit();
});