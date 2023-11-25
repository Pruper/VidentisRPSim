function makeHeir() {
    let isHero = roll(1, 1000) == 1 || document.getElementById("gauranteeHero").checked;
    let heirType, militaryRoll, authorityRoll, pietyRoll;

    if (isHero) {
        heirType = "Hero";
        militaryRoll = roll(7, 15);
        authorityRoll = roll(7, 15);
        pietyRoll = roll(7, 15);
    } else {
        heirType = "Normal";
        militaryRoll = roll(1, 10);
        authorityRoll = roll(1, 10);
        pietyRoll = roll(1, 10);
    }

    let lifeExpectancy = getAge();

    // console.log("TYPE: " + heirType + ", MILITARY: " + militaryRoll + ", AUTHORITY: " + authorityRoll + ", PIETY: " + pietyRoll);

    document.getElementById("output").innerHTML = `Type: ${heirType}<br><br>Military: ${militaryRoll}<br>Authority: ${authorityRoll}<br>Piety: ${pietyRoll}<br><br>Life Expectancy: ${lifeExpectancy}`;
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

function getAge() {
    let age = 30;
    let alive = true;

    function roll(age) {
        let chance = 100 - (7 * ((age - 30) / 4));
        return Math.max(1, chance);
    }

    while(alive) {
        let deathRoll = roll(age);
        if (Math.floor(Math.random() * 100) > deathRoll) {
            alive = false;
            break;
        }
        age += 4;
    }

    return age;
}

// simulator if I need it
/*
let oldest = 0;
let average = 0;
let ages = {};
for (let i = 0; i < 100000; i++) {
    let age = run();
    if (age > oldest) oldest = age;
    average += age;
    if (!(typeof ages["" + age] == "undefined")) {
        ages["" + age]++;
    } else {
        ages["" + age] = 1;
    }
    console.log("AGE: " + age);
}
console.log("OLDEST:" + oldest);
console.log("AVERAGE: " + (average / 100000));
console.log(ages);
*/