const celsiusForm = document.getElementById(`celsius-form`);
const celsiusInput = document.getElementById(`celsius-input`);
const convertToFahrenheitBtn = document.getElementById(`convertToFahrenheitBtn`);
const fahrenheitForm = document.getElementById(`fahrenheit-form`);
const fahrenheitInput = document.getElementById(`fahrenheit-input`);
const convertToCelsiusBtn = document.getElementById(`convertToCelsiusBtn`);
const inputValueLabel = document.getElementById(`input-value`);
const outputValueLabel = document.getElementById(`output-value`);
const resultInputOutput = document.getElementById(`result-input-output`);

function celsiusToFahrenheit(celsius) {
    if (celsius == `` || isNaN(celsius)) return null;
    const result = (celsius * (9 / 5)) + 32;
    return !Number.isInteger(result) ? result.toFixed(2) : result;
}

function fahrenheitToCelsius(fahrenheit) {
    if (fahrenheit == `` || isNaN(fahrenheit)) return null;
    const result = (fahrenheit - 32) * (5 / 9);
    return !Number.isInteger(result) ? result.toFixed(2) : result;
}

function clearInputMessages() {
    let inputMessages = document.getElementsByClassName(`input-message`);
    for(let inputMessage of inputMessages) {
        inputMessage.remove();
    }
}

function displayResult(input, result, unit) {
    clearInputMessages(); 

    let resultValueLabel;
    let inputWithUnit;
    let resultWithUnit;
    let tempForm;

    if (unit == `fahrenheit`) {
        inputWithUnit = `${input}°C`;
        resultWithUnit = `${result}°F`;
        tempForm = `celsius-form`;
    } else if (unit == `celsius`) {
        inputWithUnit = `${input}°F`;
        resultWithUnit = `${result}°C`;
        tempForm = `fahrenheit-form`;
    }

    resultValueLabel = (result == null) 
        ? `<p id="input-error" class="input-message text-sm text-red-500 font-semibold">Please Enter a value</p>`
        : `<p id="input-valid" class="input-message text-sm text-gray-700 font-semibold">${inputWithUnit} = ${resultWithUnit}</p>`
                        
    document.getElementById(tempForm).insertAdjacentHTML("beforeend", resultValueLabel);

    if (result == null) {

        resultInputOutput.innerHTML = `
                                        <p id="result-no-value" class="text-center flex flex-col justify-center items-center">
                                            <span class="text-4xl">🌡️</span>
                                            <span class="text-gray-700 font-medium">Enter a temperature and click convert</span>
                                        </p>`
    } else {

        resultInputOutput.innerHTML =  `
                                        <p id="result-input" class="flex flex-col justify-center items-center gap-1">
                                            <span id="input-value" class="text-2xl font-semibold text-gray-700">${inputWithUnit}</span>
                                            <span id="input-label" class="text-sm font-medium text-gray-700">Input</span>
                                        </p>

                                        <i class="bi bi-arrow-right text-2xl text-sky-500" aria-hidden="true"></i>

                                        <p id="result-output" class="flex flex-col justify-center items-center gap-1">
                                            <span id="output-value" class="text-2xl font-semibold text-sky-700">${resultWithUnit}</span>
                                            <span id="output-label" class="text-sm font-medium text-gray-700">Result</span>
                                        </p>`  ;
    }
}

convertToFahrenheitBtn.onclick = function(e) {
    e.preventDefault();
    const result = celsiusToFahrenheit(celsiusInput.value);
    displayResult(celsiusInput.value, result, `fahrenheit`);
}

convertToCelsiusBtn.onclick = function(e) {
    e.preventDefault();
    const result = fahrenheitToCelsius(fahrenheitInput.value);
    displayResult(fahrenheitInput.value, result, `celsius`);
}