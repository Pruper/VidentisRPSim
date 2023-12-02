function deathRoll() {
    let age = Number.parseInt(document.getElementById("age").value);
    let isMale = !document.getElementById("gender").checked;

    document.getElementById("output").innerHTML = `<p>Status: ${survives(age, isMale) ? "Lives until " + (age + 4) : "DIES THIS TURN!"}</p>`;
}

function survives(age, isMale) {
    if (age < 30) return true;
    let deathRoll = deathChance(age, isMale);
    if (Math.floor(Math.random() * 100) > deathRoll) {
        return false;
    }
    return true;
}

function deathChance(age, isMale) {
    let chance = 100 - ((isMale ? 7 : 5) * ((age - 30) / 4));
    return Math.max(1, chance);
}