document.addEventListener("DOMContentLoaded", function () {
    const convertForm = document.getElementById("convert-form");
    const celsiusDegreesTextField = document.getElementById("celsius-degrees-field");
    const kelvinDegreesResultField = document.getElementById("kelvin-degrees-text");
    const fahrenheitDegreesResultField = document.getElementById("fahrenheit-degrees-text");

    celsiusDegreesTextField.addEventListener("input", function () {
        convertForm.requestSubmit();
    });

    convertForm.addEventListener("submit", function (e) {
        e.preventDefault();

        if (celsiusDegreesTextField.value === "") {
            kelvinDegreesResultField.textContent = "";
            fahrenheitDegreesResultField.textContent = "";
        } else {
            const celsiusDegrees = parseFloat(celsiusDegreesTextField.value);
            kelvinDegreesResultField.textContent = (celsiusDegrees + 273.15).toFixed(2);
            fahrenheitDegreesResultField.textContent = ((celsiusDegrees * 5 / 9) + 32).toFixed(2);
        }
    });

    convertForm.requestSubmit();
});