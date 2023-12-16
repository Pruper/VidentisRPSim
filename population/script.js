function calculate() {
    let firstYear = getInputNumber("firstYear");
    let firstPopulation = getInputNumber("firstPopulation");
    let secondYear = getInputNumber("secondYear");
    let secondPopulation = getInputNumber("secondPopulation");
    let calculationYear = getInputNumber("calculationYear");

    let rate = growthRate(firstYear, firstPopulation, secondYear, secondPopulation);

    let calculatedPopulation = Math.round(firstPopulation * (rate ** (calculationYear - firstYear)));

    document.getElementById("output").innerHTML = `<p>Growth Rate: ${((rate - 1) * 100).toFixed(3)}%</p><p>Population in ${calculationYear}: ${calculatedPopulation.toLocaleString()}</p>`
}

function getInputNumber(elementId) {
    return Number.parseInt(document.getElementById(elementId).value);
}

function growthRate(firstYear, firstPopulation, secondYear, secondPopulation) {
    return (secondPopulation / firstPopulation) ** (1 / (secondYear - firstYear));
}