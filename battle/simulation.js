class Log {
    constructor() {
        this.entries = [];
    }

    addEntry(entry) {
        this.entries.push(entry);
        return entry;
    }

    addBreak() {
        this.addEntry(" ");
        return " ";
    }

    getHtml() {
        return "<p>" + this.entries.join("</p><p>") + "<p>";
    }
}

let attackerModifiersById = {
    "river": { name: "Crossing River", value: -1 },
    "ocean": { name: "Amphibious Landing", value: -2 }
}

function simulate() {
    let log = new Log();

    let attackerTroops = Number.parseInt(document.getElementById("attackerTroops").value);
    let defenderTroops = Number.parseInt(document.getElementById("defenderTroops").value);

    let attackerPoints = troopsToPoints(attackerTroops);
    log.addEntry("Attacker has " + attackerPoints + " points");

    let defenderPoints = troopsToPoints(defenderTroops);
    log.addEntry("Defender has " + defenderPoints + " points");

    let difference = getDifference(attackerPoints, defenderPoints);
    log.addEntry("Difference is " + difference + " points, rolling " + Math.max(1, difference) + " dice for each.");
    difference = Math.max(1, difference);

    let attackModifier = 0;
    let attackModifierRollAmount = Math.min(difference, defenderTroops);
    let normalRollAmount = difference - attackModifierRollAmount;
    console.log(attackModifierRollAmount);
    if (document.getElementById("attackModifier").value != "") {
        let modifierId = document.getElementById("attackModifier").value;
        attackModifier = attackerModifiersById[modifierId].value;
        log.addEntry("Attacker has modifier: " + attackerModifiersById[modifierId].name + " (" + attackerModifiersById[modifierId].value + " per roll for " + attackModifierRollAmount + " rolls)");
    }

    let attackerModifierBonus = rollMultipleWithModifier(1, 6, attackModifierRollAmount, attackModifier, 0, 9999);
    let attackerNormalBonus = rollMultiple(1, 6, normalRollAmount);
    let attackerBonus = { result: attackerModifierBonus.result + attackerNormalBonus.result, rolls: attackerModifierBonus.rolls.concat(attackerNormalBonus.rolls)}

    attackerPoints += attackerBonus.result;
    log.addEntry("Attacker bonus roll was " + attackerBonus.result + " [" + attackerBonus.rolls + "], for a total of " + attackerPoints);

    let defenderBonus = rollMultiple(1, 6, difference);
    defenderPoints += defenderBonus.result;
    log.addEntry("Defender bonus roll was " + defenderBonus.result + " [" + defenderBonus.rolls + "], for a total of " + defenderPoints);

    if (attackerPoints > defenderPoints) {
        log.addEntry("Result: Attacker wins!");
    } else if (defenderPoints > attackerPoints) {
        log.addEntry("Result: Defender wins!");
    } else {
        log.addEntry("Result: Inconclusive");
    }

    document.getElementById("output").innerHTML = log.getHtml();
}

function roll(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

function rollMultiple(min, max, times) {
    let cumulative = 0;
    let rolls = [];

    for (let i = 0; i < times; i++) {
        let r = roll(min, max);
        cumulative += r;
        rolls.push(r);
    }

    // rolls.sort(function(a, b) { return b - a; });
    return { result: cumulative, rolls: rolls };
}

function rollMultipleWithModifier(min, max, times, modifier, absoluteMin, absoluteMax) {
    let cumulative = 0;
    let rolls = [];

    for (let i = 0; i < times; i++) {
        let r = Math.min(absoluteMax, Math.max(absoluteMin, roll(min, max) + modifier));
        cumulative += r;
        rolls.push(r);
    }

    // rolls.sort(function(a, b) { return b - a; });
    return { result: cumulative, rolls: rolls };
}

function troopsToPoints(troops) {
    return troops;
    // return Math.max(1, Math.round(Math.log(troops) / Math.log(1.1)));
}

function getDifference(first, second) {
    return Math.abs(first - second);
}