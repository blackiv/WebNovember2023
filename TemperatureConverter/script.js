document.addEventListener("DOMContentLoaded", function () {
    const convertForm = document.getElementById("convert-form");
    const celsiusDegreesField = document.getElementById("celsius-degrees-field");
    const kelvinDegreesText = document.getElementById("kelvin-degrees-text");
    const fahrenheitDegreesText = document.getElementById("fahrenheit-degrees-text");

    celsiusDegreesField.addEventListener("change", function () {
        convertForm.requestSubmit();
    });

    celsiusDegreesField.addEventListener("input", function () {
        convertForm.requestSubmit();
    });

    convertForm.addEventListener("submit", function (e) {
        e.preventDefault();

        if (celsiusDegreesField.value === "") {
            kelvinDegreesText.textContent = "";
            fahrenheitDegreesText.textContent = "";
        }
        else{
            const celsiusDegrees = parseFloat(celsiusDegreesField.value);
            kelvinDegreesText.textContent = (celsiusDegrees + 273.15).toFixed(2);
            fahrenheitDegreesText.textContent = ((celsiusDegrees - 32) * 5 / 9).toFixed(2);
        }

    });
    convertForm.requestSubmit();
});