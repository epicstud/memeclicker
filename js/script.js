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
  updateScore: function()  {
    document.getElementById("score").innerHTML = game.score;
    document.getElementById("scorepersecond").innerHTML = game.getScorePerSecond();
    document.title = game.score + " memes - Meme Clicker";
  },

  updateShop: function() {
    document.getElementById("shopContainer").innerHTML = "";
    for (i = 0; i < building.name.length; i++) {
      document.getElementById("shopContainer").innerHTML += '<table class="shopButton unselectable" onclick="building.purchase('+i+')"><tr><td id="image"><img src="images/'+building.image[i]+'" height="64px" width="64px"></td><td id="nameAndCost"><p>'+building.name[i]+'</p><p><span>'+building.cost[i]+'</span> money</p></td><td id="amount"><span>'+building.count[i]+'</span></td></tr></table>';
    }
  }
};

function saveGame() {
  var gameSave = {
    score: game.score,
    totalScore: game.totalScore,
    totalClicks: game.totalClicks,
    clickValue: game.clickValue,
    version: game.version,
    buildingCount: building.count,
    buildingIncome: building.income,
    buildingCost: building.cost
    };
  localStorage.setItem("gameSave", JSON.stringify(gameSave));
}

function loadGame() {
  var savedGame = JSON.parse(localStorage.getItem("gameSave"));
  if (localStorage.getItem("gameSave") !== null) {
    if (typeof savedGame.score !== "undefined") game.score = savedGame.score;
    if (typeof savedGame.totalScore !== "undefined") game.totalScore = savedGame.totalScore;
    if (typeof savedGame.totalClicks !== "undefined") game.totalClicks = savedGame.totalClicks;
    if (typeof savedGame.clickValue !== "undefined") game.clickValue = savedGame.clickValue;
    if (typeof savedGame.version !== "undefined") game.version = savedGame.version;
    if (typeof savedGame.buildingCount !== "undefined") {
      for (i = 0; i < savedGame.buildingCount.length; i++) {
         building.count[i] = savedGame.buildingCount[i];
      }
    }
    if (typeof savedGame.buildingCount !== "undefined") {
      for (i = 0; i < savedGame.buildingCount.length; i++) {
         building.count[i] = savedGame.buildingCount[i];
      }
    }
    if (typeof savedGame.buildingCount !== "undefined") {
      for (i = 0; i < savedGame.buildingCount.length; i++) {
         building.count[i] = savedGame.buildingCount[i];
      }
    }
    if (typeof savedGame.buildingCount !== "undefined") {
      for (i = 0; i < savedGame.buildingCount.length; i++) {
         building.count[i] = savedGame.buildingCount[i];
      }
    }
  }
}

setInterval(function() {
  game.score += game.getScorePerSecond();
  game.totalScore += game.getScorePerSecond();
  display.updateScore();
  }, 1000);


document.getElementById("clicker").addEventListener("click", function() {
  game.totalClicks++;
  game.addToScore(game.clickValue);
}, false);

window.onload = function()  {
  loadGame();
  display.updateScore();
  display.updateShop();
};

setInterval (function() {
  saveGame();
}, 5000); // 5 seconds


document.getElementById('play').addEventListener('click', function (e) {
  e.preventDefault();
  document.getElementById('audio').play();
});
