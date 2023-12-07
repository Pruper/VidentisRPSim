function makeHeir() {
    let isMale = roll(0, 1) == 0;
    let survived = roll(0, 100) > 50 || !document.getElementById("notSurviveChance").checked;

    if (!survived) {
        document.getElementById("output").innerHTML = `Gender: ${genderSymbol(isMale) + " " + genderName(isMale)}<br>Life Expectancy: ${roll(0, 3)} (did not survive...)`;
        return;
    }

    let isHero = roll(1, 1000) == 1 || document.getElementById("gauranteeHero").checked;
    let heirType, militaryRoll, authorityRoll, pietyRoll;
    let bonusRolls = [];

    if (isHero) {
        heirType = "Hero";
        militaryRoll = roll(25, 40);
        authorityRoll = roll(8, 15);
        pietyRoll = roll(8, 15);
        
        let numberOfBonuses = roll(1, 8);
        for (let i = 0; i < numberOfBonuses; i++) {
            bonusRolls.push(roll(1, 200));
        }

    } else {
        heirType = "Normal";
        militaryRoll = roll(1, 20);
        authorityRoll = roll(1, 10);
        pietyRoll = roll(1, 10);
    }

    let lifeExpectancy = getAge();

    // console.log("TYPE: " + heirType + ", MILITARY: " + militaryRoll + ", AUTHORITY: " + authorityRoll + ", PIETY: " + pietyRoll);

    document.getElementById("output").innerHTML = `Type: ${heirType}<br><br>Military: ${militaryRoll}<br>Authority: ${authorityRoll}<br>Piety: ${pietyRoll}${bonusRolls.length > 0 ? "<br><br>Bonuses: " + bonusRolls : ""}<br><br>Gender: ${genderSymbol(isMale) + " " + genderName(isMale)}<br>Life Expectancy: ${lifeExpectancy}`;
}

function genderSymbol(isMale) {
    return isMale ? "\u2642" : "\u2640";
}

function genderName(isMale) {
    return isMale ? "Male" : "Female";
}

function getColor(isMale) {
    return isMale ? "" : "";
}

function toggled(box) {
    document.getElementById("output").innerHTML = "";
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

// AGES UNTIL DEATH (NATURALLY)

function getAge(isMale) {
    let age = 30;
    let alive = true;

    while (alive) {
        let deathRoll = deathChance(age, isMale);
        if (Math.floor(Math.random() * 100) > deathRoll) {
            alive = false;
            break;
        }
        age += 4;
    }

    return age;
}

function deathChance(age, isMale) {
    let chance = 100 - ((isMale ? 7 : 5) * ((age - 30) / 4));
    return Math.max(1, chance);
}

// AGE CALCULATOR SIMULATOR

function ageSimulate(isMale = true, simAmount = 100000) {
    console.log("RUNNING SIMULATION FOR: " + genderName(isMale) + ", " + simAmount + " TIMES");
    let oldest = 0;
    let average = 0;
    let ages = {};
    for (let i = 0; i < simAmount; i++) {
        let age = getAge(isMale);
        if (age > oldest) oldest = age;
        average += age;
        if (!(typeof ages["" + age] == "undefined")) {
            ages["" + age]++;
        } else {
            ages["" + age] = 1;
        }
        // console.log("AGE: " + age);
    }
    console.log("OLDEST: " + oldest);
    console.log("AVERAGE: " + (average / simAmount));
    console.log(ages);
}