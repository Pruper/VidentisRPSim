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

    let attackerBonus = rollMultiple(1, 6, difference);
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
    return { result: cumulative, rolls: rolls.toString() };
}

function troopsToPoints(troops) {
    return troops;
    // return Math.max(1, Math.round(Math.log(troops) / Math.log(1.1)));
}

function getDifference(first, second) {
    return Math.abs(first - second);
}