var game = {
  score: 0,
  totalScore: 0,
  totalClicks: 0,
  clickValue: 1,
  version: 0.000,

  addToScore: function(amount) {
    this.score += amount;
    this.totalScore += amount;
    display.updateScore();
  },

  getScorePerSecond: function() {
    var scorePerSecond = 0;
    for (i = 0; i < building.name.length; i++)  {
     scorePerSecond += building.income[i] * building.count[i];
    }
    return scorePerSecond;
  }
};

var building = {
  name: [
    "Cursor",
    "Grandma"

  ],
  image: [
    "cursor.png",
    "Grandma.png"

  ],
  count: [0, 0],
  income: [
    1,
    5

  ],
  cost:  [
    15,
    100
  ],

  purchase: function(index) {
    if (game.score >= this.cost[index]) {
      game.score -= this.cost[index];
      this.count[index]++;
      this.cost[index] = Math.ceil(this.cost[index] * 1.10);
      display.updateScore();
      display.updateShop();
            }
      }
};

var upgrade = {
    name: [
        "Bloxy Cola",
        "Witch Brew"
    ],
    description: [
        "Your friends stay awake thus giving you more money",
        "Even if your friends are sleeping, they are creating memes in there dream AKA sleep walking. But instead of sleep walking, they are using there hands."
    ],
    image: [
        "images/bloxycola.png",
        "images/witchbrew.png"
    ],
    type: [
        "building",
        "building"
    ],
    cost: [
        100,
        250
    ],
    buildingIndex: [
        0,
        0
    ],
    requirement: [
        1,
        5
    ],
    bonus: [
        2,
        2
    ],
    purchased: [false, false],

     purchase: function(index) {
        if (!this.purchased[index] && game.score >= this.cost[index]) {
            if (this.type[index] == "building" && building.count[this.buildingIndex[index]] >= this.requirement[index]) {
                game.score -= this.cost[index];
                building.income[this.buildingIndex[index]] *= this.bonus[index];
                this.purchased[index] = true;

                display.updateUpgrades();
                display.updateScore();
            } else if (this.type[index] == "click" && game.totalClicks >= this.requirement[index]) {
                game.score -= this.cost[index];
                game.clickValue *= this.bonus[index];
                this.purchased[index] = true;

                display.updateUpgrades();
                display.updateScore();
            }
        }
    }
};


var display = {
    updateScore: function() {
        document.getElementById("score").innerHTML = numberformat.format(game.score);
        document.getElementById("scorepersecond").innerHTML = numberformat.format(game.getScorePerSecond());
        document.getElementById("totals").innerHTML = numberformat.format(game.totalScore);
        document.title = numberformat.format(game.score) + " Salsa - Salsa Clicker";
    },

    updateShop: function () {
        document.getElementById("shopContainer").innerHTML = "";
        for (i = 0; i < building.name.length; i++) {
            document.getElementById("shopContainer").innerHTML += '<table class="shopButton" onclick="building.purchase('+i+')"><tr><td id="image"><img src="'+building.image[i]+'" title="'+building.description[i]+' &#10;"></td><td id="nameAndCost">'+building.name[i]+'<p></p><p><span>'+numberformat.format(building.cost[i])+'</span> Salsa</p></td><td id="amount"><span>'+numberformat.format(building.count[i])+'</span></td></tr></table>';
        }
    },
    updateUpgrades: function() {
        document.getElementById("upgradeContainer").innerHTML = "";
        for (i = 0; i < upgrade.name.length; i++) {
            if (!upgrade.purchased[i]) {
                if (upgrade.type[i] == "building" && building.count[upgrade.buildingIndex[i]] >= upgrade.requirement[i]) {
                    document.getElementById("upgradeContainer").innerHTML += '<img src="'+upgrade.image[i]+'" title="'+upgrade.name[i]+' &#10; '+upgrade.description[i]+' &#10; '+numberformat.format(upgrade.cost[i])+'(Salsa)" onclick="upgrade.purchase('+i+')">';
                } else if (upgrade.type[i] == "click" && game.totalClicks >= upgrade.requirement[i]) {
                    document.getElementById("upgradeContainer").innerHTML += '<img src="'+upgrade.image[i]+'" title="'+upgrade.name[i]+' &#10; '+upgrade.description[i]+' &#10; '+numberformat.format(upgrade.cost[i])+'(Salsa)" onclick="upgrade.purchase('+i+')">';
                }
            }
        }
    },
    updateAchievements: function() {
        document.getElementById("achievementContainer").innerHTML = "";
        for (i = 0; i < achievement.name.length; i++) {
            if (achievement.awarded[i]) {
                document.getElementById("achievementContainer").innerHTML += '<img src="'+achievement.image[i]+'" title="'+achievement.name[i]+' &#10 '+achievement.description[i]+'">';
            }
        }
    }
};

function saveGame() {
    var gameSave = {
        score: game.score,
        totalClicks: game.totalClicks,
        totalScore: game.totalScore,
        clickValue: game.clickValue,
        version: game.version,
        buildingCount: building.count,
        buildingIncome: building.income,
        buildingCost: building.cost,
        buildingDescription: building.description,
        upgradePurchased: upgrade.purchased,
        achievementAwarded: achievement.awarded
    };
    localStorage.setItem('gameSave', JSON.stringify(gameSave));
}

function loadGame() {
    var savedGame = JSON.parse(localStorage.getItem('gameSave'));
    if (localStorage.getItem('gameSave') !== null) {
        if (typeof savedGame.score !== "undefined") game.score = savedGame.score;
        if (typeof savedGame.totalScore !== "undefined") game.totalScore = savedGame.totalScore;
        if (typeof savedGame.totalClicks !== "undefined") game.totalClicks = savedGame.totalClicks;
        if (typeof savedGame.clickValue !== "undefined") game.clickValue = savedGame.clickValue;
        if (typeof savedGame.buildingCount !== "undefined") {
            for (i = 0; i < savedGame.buildingCount.length; i++) {
                building.count[i] = savedGame.buildingCount[i];
            }
        }
        if (typeof savedGame.buildingIncome !== "undefined") {
            for (i = 0; i < savedGame.buildingIncome.length; i++) {
                building.income[i] = savedGame.buildingIncome[i];
            }
        }
        if (typeof savedGame.buildingCost !== "undefined") {
            for (i = 0; i < savedGame.buildingCost.length; i++) {
                building.cost[i] = savedGame.buildingCost[i];
            }
        }
        if (typeof savedGame.upgradePurchased !== "undefined") {
            for (i = 0; i < savedGame.upgradePurchased.length; i++) {
                upgrade.purchased[i] = savedGame.upgradePurchased[i];
            }
        }
        if (typeof savedGame.achievementAwarded !== "undefined") {
            for (i = 0; i < savedGame.achievementAwarded.length; i++) {
                achievement.awarded[i] = savedGame.achievementAwarded[i];
            }
        }
        if (typeof savedGame.buildingDescription !== "undefined") {
            for (i = 0; i < savedGame.buildingDescription.length; i++) {
                building.description[i] = savedGame.buildingDescription[i];
            }
        }
    }
}

window.onload = function () {
    loadGame();
    document.getElementById("clicks").innerHTML = numberformat.format(game.totalClicks);
    display.updateScore();
    display.updateUpgrades();
    display.updateAchievements();
    display.updateShop();
}

function resetGame() {
    if(confirm("Are you sure you want to reset your game?")) {
        var gameSave = {};
        localStorage.setItem('gameSave', JSON.stringify(gameSave));
        location.reload();
    }
}

setInterval(function () {
    for (i = 0; i < achievement.name.length; i++) {
        if (achievement.type[i] == "score" && game.totalScore >= achievement.requirement[i]) achievement.earn(i);
        else if (achievement.type[i] == "click" && game.totalClicks >= achievement.requirement[i]) achievement.earn(i);
        else if (achievement.type[i] == "building" && building.count[achievement.objectIndex[i]] >= achievement.requirement[i]) achievement.earn(i);
    }
    display.updateAchievements();
}, 2000);

setInterval(function () {
    display.updateScore();
    display.updateUpgrades();
}, 1000);

setInterval(function () {
    display.updateScore();
    game.score+=game.getScorePerSecond();
    game.totalScore+=game.getScorePerSecond();
}, 1000);

setInterval(function () {
    saveGame();
}, 30000);

document.addEventListener("keydown", function (event){
    if (event.ctrlKey && event.which == 83) {
        event.preventDefault();
        saveGame();
    }
}, false);

document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.which == 84) {
        resetGame();
    }
}, false);
