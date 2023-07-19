const SNAKE_WIDTH = 15;
const BLOCK = 20;
const BACKGROUD_COLOR = "black";
const BOARD_SCORE_COLOR = "yellow";
const BOARD_SCORE_VICE_COLOR = "pink";
const WORD_COLOR = "green";

class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let currentdirection = new Position(1, 0);
let endGame = 0;
let longestLength = 3;

class Game {
  constructor() {
    //draw Board
    this.playBoard = document.getElementById("playBoard");
    this.contextPlay = this.playBoard.getContext("2d");
    this.contextSnake = this.contextPlay;
    this.playBoardWidth = 60 * BLOCK;
    this.boardHeight = 35 * BLOCK;
    this.body = [
      new Position(BLOCK * 8, BLOCK * 34),
      new Position(BLOCK * 7, BLOCK * 34),
      new Position(BLOCK * 6, BLOCK * 34),
    ];
    this.newPosition = new Position(1, 0);
  }

  drawPlayBoard() {
    this.playBoard.width = this.playBoardWidth;
    this.playBoard.height = this.boardHeight;
    this.contextPlay.fillStyle = BACKGROUD_COLOR;
    this.contextPlay.fillRect(0, 0, this.playBoardWidth, this.boardHeight);
  }

  drawSnake() {
    this.contextSnake.fillStyle = "red";
    this.contextSnake.fillRect(this.body[0].x, this.body[0].y, BLOCK, BLOCK);
    this.contextSnake.fillStyle = "white";
    for (let i = 1; i < this.body.length; i++) {
      this.contextSnake.fillRect(this.body[i].x, this.body[i].y, BLOCK, BLOCK);
    }
  }

  clearSnake() {
    this.contextSnake.fillStyle = BACKGROUD_COLOR;
    this.contextSnake.fillRect(this.body[0].x, this.body[0].y, BLOCK, BLOCK);
    this.contextSnake.fillStyle = BACKGROUD_COLOR;
    for (let i = 1; i < this.body.length; i++) {
      this.contextSnake.fillRect(this.body[i].x, this.body[i].y, BLOCK, BLOCK);
    }
  }

  moveSnake() {
    this.playerControl();
    this.clearSnake();

    for (let i = this.body.length - 1; i >= 1; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }
    this.body[0].x += +this.newPosition.x * BLOCK;
    this.body[0].y += +this.newPosition.y * BLOCK;
    this.moveSnakeThrough();
    this.drawSnake();
    this.endGame();
  }

  moveSnakeThrough() {
    let head = this.body[0];
    switch (true) {
      case head.x == -BLOCK:
        head.x = this.playBoardWidth - BLOCK;
        break;
      case head.x == 60 * BLOCK:
        head.x = 0;
        break;
      case head.y == -BLOCK:
        head.y = this.boardHeight - BLOCK;
        break;
      case head.y == 35 * BLOCK:
        head.y = 0;
        break;
      default:
        break;
    }
  }

  playerControl() {
    let thisOfGame = this;
    document.addEventListener("keyup", function (event) {
      let keyName = event.key;
      console.log(keyName);
      let keyControl = [
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "w",
        "W",
        "a",
        "A",
        "s",
        "S",
        "d",
        "D",
      ];
      if (keyControl.includes(keyName)) {
        switch (keyName) {
          case "ArrowUp":
          case "W":
          case "w":
            if (currentdirection.y == 1 || currentdirection.y == -1) {
              break;
            }
            thisOfGame.newPosition = new Position(0, -1);
            currentdirection = new Position(0, -1);
            break;
          case "ArrowDown":
          case "S":
          case "s":
            if (currentdirection.y == 1 || currentdirection.y == -1) {
              break;
            }
            thisOfGame.newPosition = new Position(0, 1);
            currentdirection = new Position(0, 1);
            break;
          case "ArrowLeft":
          case "A":
          case "a":
            if (currentdirection.x == 1 || currentdirection.x == -1) {
              break;
            }
            thisOfGame.newPosition = new Position(-1, 0);
            currentdirection = new Position(-1, 0);
            break;
          case "ArrowRight":
          case "D":
          case "d":
            if (currentdirection.x == 1 || currentdirection.x == -1) {
              break;
            }
            thisOfGame.newPosition = new Position(1, 0);
            currentdirection = new Position(1, 0);
            break;
        }
      }
    });
  }

  checkEat(x, y) {
    let head = this.body[0];
    return x == head.x && y == head.y;
  }

  checkEatSpecialFood(x, y) {
    let head = this.body[0];
    switch (true) {
      case x == head.x && y == head.y:
      case x + BLOCK == head.x && y == head.y:
      case x - BLOCK == head.x && y == head.y:
      case x == head.x && y + BLOCK == head.y:
      case x == head.x && y - BLOCK == head.y:
      case x + BLOCK == head.x && y + BLOCK == head.y:
      case x - BLOCK == head.x && y - BLOCK == head.y:
      case x + BLOCK == head.x && y - BLOCK == head.y:
      case x - BLOCK == head.x && y + BLOCK == head.y:
        return true;

      default:
        return false;
    }
  }

  snakeGrowth() {
    this.clearSnake();
    let snakeLength = this.body.length;
    let addFollowDirectX =
      this.body[snakeLength - 1].x - this.body[snakeLength - 2].x;
    let addFollowDirectY =
      this.body[snakeLength - 1].y - this.body[snakeLength - 2].y;

    let newPart = new Position(
      this.body[snakeLength - 1].x + addFollowDirectX,
      this.body[snakeLength - 1].y + addFollowDirectY
    );

    this.body.push(newPart);
    this.drawSnake();
  }

  snakeLength() {
    let snakeLength = this.body.length;
    return snakeLength;
  }

  checkRandomNumberForFood(x, y) {
    for (let i = 0; i < player.snakeLength(); i++) {
      if (x == this.body[i].x && y == this.body[i].y) {
        return false;
      }
    }
    return true;
  }

  endGame() {
    let head = this.body[0];
    for (let i = 1; i < this.body.length; i++) {
      if (head.x == this.body[i].x && head.y == this.body[i].y) {
        endGame = 1;
        break;
      }
    }
    if (this.body.length == 5 * 2) {
      endGame = 1;
    }
  }
}

let positionFoodX;
let positionFoodY;

class Food {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.food = document.getElementById("playBoard");
    this.contextFood = this.food.getContext("2d");
  }

  drawFood() {
    this.contextFood.fillStyle = "green";
    this.contextFood.fillRect(this.x, this.y, BLOCK, BLOCK);
  }

  clearFood() {
    this.contextFood.fillStyle = BACKGROUD_COLOR;
    this.contextFood.fillRect(this.x, this.y, BLOCK, BLOCK);
  }

  randomNumberOfWidth() {
    let randomNumber;
    for (let i = 1; i > 0; i++) {
      randomNumber = Math.floor(Math.random() * 100);
      if (randomNumber < 60) {
        break;
      }
    }
    return randomNumber;
  }

  randomNumberOfHeight() {
    let randomNumber;
    for (let i = 1; i > 0; i++) {
      randomNumber = Math.floor(Math.random() * 100);
      if (randomNumber < 35) {
        break;
      }
    }
    return randomNumber;
  }

  checkRandomNumber() {
    for (let i = 1; i > 0; i++) {
      this.x = this.randomNumberOfWidth() * BLOCK;
      this.y = this.randomNumberOfHeight() * BLOCK;
      if (player.checkRandomNumberForFood(this.x, this.y)) {
        break;
      }
    }
  }

  spawnFood() {
    this.checkRandomNumber();
    positionFoodX = this.x;
    positionFoodY = this.y;

    this.drawFood();
  }
}

let widthPosition;
let heightPosition;
let PositionOfSpecialFoodX;
let PositionOfSpecialFoodY;

class PositionOfPresent {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class SpecialFood {
  constructor() {
    this.present = [];
    this.specialFood = document.getElementById("playBoard");
    this.contextSpecialFood = this.specialFood.getContext("2d");
  }

  drawSpecialFood() {
    if (this.present.length == 0) {
      return;
    }
    this.contextSpecialFood.fillStyle = "green";
    for (let i = 0; i < this.present.length; i++) {
      this.contextSpecialFood.fillRect(
        this.present[i].x,
        this.present[i].y,
        BLOCK,
        BLOCK
      );
    }
  }

  clearSpecialFood() {
    if (this.present.length == 0) {
      return;
    }
    this.contextSpecialFood.fillStyle = BACKGROUD_COLOR;
    for (let i = 0; i < this.present.length; i++) {
      this.contextSpecialFood.fillRect(
        this.present[i].x,
        this.present[i].y,
        BLOCK,
        BLOCK
      );
    }
  }

  randomNumberOfHeight() {
    let randomNumber;
    for (let i = 1; i > 0; i++) {
      randomNumber = Math.floor(Math.random() * 100);
      if (randomNumber < 35) {
        break;
      }
    }
    return randomNumber * BLOCK;
  }

  randomNumberOfWidth() {
    let randomNumber;
    for (let i = 1; i > 0; i++) {
      randomNumber = Math.floor(Math.random() * 100);
      if (randomNumber < 60) {
        break;
      }
    }
    return randomNumber * BLOCK;
  }

  checkRandomNumber() {
    for (let i = 1; i > 0; i++) {
      widthPosition = this.randomNumberOfWidth();
      heightPosition = this.randomNumberOfHeight();
      if (player.checkRandomNumberForFood(widthPosition, heightPosition)) {
        break;
      }
    }
  }

  spawnSpecialFood() {
    if (!this.present.length == 0) {
      this.present.splice(0, 10);
    }

    this.checkRandomNumber();
    console.log(widthPosition, heightPosition);
    PositionOfSpecialFoodX = widthPosition;
    PositionOfSpecialFoodY = heightPosition;

    let newSpecialFood1 = new PositionOfPresent(widthPosition, heightPosition);
    let newSpecialFood2 = new PositionOfPresent(
      widthPosition - BLOCK,
      heightPosition
    );
    let newSpecialFood3 = new PositionOfPresent(
      widthPosition + BLOCK,
      heightPosition
    );
    let newSpecialFood4 = new PositionOfPresent(
      widthPosition,
      heightPosition - BLOCK
    );
    let newSpecialFood5 = new PositionOfPresent(
      widthPosition,
      heightPosition + BLOCK
    );
    let newSpecialFood6 = new PositionOfPresent(
      widthPosition - BLOCK,
      heightPosition + BLOCK
    );
    let newSpecialFood7 = new PositionOfPresent(
      widthPosition + BLOCK,
      heightPosition - BLOCK
    );
    let newSpecialFood8 = new PositionOfPresent(
      widthPosition - BLOCK,
      heightPosition - BLOCK
    );
    let newSpecialFood9 = new PositionOfPresent(
      widthPosition + BLOCK,
      heightPosition + BLOCK
    );

    this.present.push(newSpecialFood1);
    this.present.push(newSpecialFood2);
    this.present.push(newSpecialFood3);
    this.present.push(newSpecialFood4);
    this.present.push(newSpecialFood5);
    this.present.push(newSpecialFood6);
    this.present.push(newSpecialFood7);
    this.present.push(newSpecialFood8);
    this.present.push(newSpecialFood9);

    this.drawSpecialFood();
  }
}

let player = new Game();
player.drawPlayBoard();

let foodSpawn = new Food();
foodSpawn.spawnFood();

let specialfood = new SpecialFood();

let i = 0;
let spawnedSpecialFood = 0;
let timeWhile = setInterval(() => {
  player.moveSnake();

  if (player.checkEat(positionFoodX, positionFoodY)) {
    player.snakeGrowth();
    foodSpawn.spawnFood();
  }

  let snakeLength = player.snakeLength();

  if (snakeLength > 3 && (snakeLength - 3) % 5 == 0 && i == 0) {
    specialfood.spawnSpecialFood();
    setTimeout(function () {
      specialfood.clearSpecialFood();
      spawnedSpecialFood = 0;
    }, 6500);
    i = 1;
    spawnedSpecialFood = 1;
  } else {
    if (snakeLength > 3 && (snakeLength - 3) % 5 == 0) {
      i = 1;
    } else {
      i = 0;
    }
  }

  if (spawnedSpecialFood == 1) {
    if (
      player.checkEatSpecialFood(PositionOfSpecialFoodX, PositionOfSpecialFoodY)
    ) {
      for (let i = 1; i <= 5; i++) {
        player.snakeGrowth();
        specialfood.clearSpecialFood();
        spawnedSpecialFood = 0;
      }
    }
  }

  if (endGame == 1) {
    clearInterval(timeWhile);
  }
}, 100);

class Score {
  constructor() {
    this.scoreBoard = document.getElementById("scoreBoard");
    this.contextScore = this.scoreBoard.getContext("2d");
    this.scoreBoardWidth = 11.5 * BLOCK;
    this.scoreBoardHeight = 35 * BLOCK;
    this.scoreWidth = 8.5 * BLOCK;
    this.scoreHeight = 10 * BLOCK;
    this.positionScoreWidth = 1.5 * BLOCK;
    this.positionScoreHeight = 1.5 * BLOCK;
  }

  drawScoreBoard() {
    this.scoreBoard.width = this.scoreBoardWidth;
    this.scoreBoard.height = this.scoreBoardHeight;
    this.contextScore.fillStyle = BOARD_SCORE_COLOR;
    this.contextScore.fillRect(
      0,
      0,
      this.scoreBoardWidth,
      this.scoreBoardHeight
    );

    this.contextScore.fillStyle = BOARD_SCORE_VICE_COLOR;
    this.contextScore.fillRect(
      this.positionScoreWidth,
      this.positionScoreHeight,
      this.scoreWidth,
      this.scoreHeight
    );

    this.contextScore.font = "50px Arial";
    this.contextScore.fillStyle = WORD_COLOR;
    this.contextScore.fillText("LEVEL", 2 * BLOCK, 4 * BLOCK);

    this.contextScore.font = "150px Arial";
    this.contextScore.fillStyle = WORD_COLOR;
    this.contextScore.fillText("1", 3.5 * BLOCK, 10.5 * BLOCK);

    this.contextScore.font = "30px Arial";
    this.contextScore.fillStyle = WORD_COLOR;
    this.contextScore.fillText("SCORE", 3.1 * BLOCK, 14.5 * BLOCK);

    this.contextScore.font = "30px Arial";
    this.contextScore.fillStyle = WORD_COLOR;
    this.contextScore.fillText("HIGH-SCORE", 1 * BLOCK, 21 * BLOCK);

    this.contextScore.font = "30px Arial";
    this.contextScore.fillStyle = WORD_COLOR;
    this.contextScore.fillText("100", 4.5 * BLOCK, 24 * BLOCK);
  }

  clearScore() {
    this.contextScore.fillStyle = BOARD_SCORE_COLOR;
    this.contextScore.fillRect(2.5 * BLOCK, 15.5 * BLOCK, 7 * BLOCK, 3 * BLOCK);

    this.contextScore.fillStyle = BOARD_SCORE_COLOR;
    this.contextScore.fillRect(2.5 * BLOCK, 22.5 * BLOCK, 7 * BLOCK, 3 * BLOCK);
  }

  drawScore() {
    this.contextScore.font = "30px Arial";
    this.contextScore.fillStyle = WORD_COLOR;
    this.contextScore.fillText(
      `${(player.snakeLength() - 3) * 1}`,
      5 * BLOCK,
      17 * BLOCK
    );

    this.contextScore.font = "30px Arial";
    this.contextScore.fillStyle = WORD_COLOR;
    this.contextScore.fillText(
      `${(longestLength - 3) * 1}`,
      5 * BLOCK,
      24 * BLOCK
    );
  }
}

let score = new Score();

score.clearScore();
score.drawScoreBoard();

let timeWhile2 = setInterval(() => {
  score.clearScore();
  score.drawScore();

  if (endGame == 1) {
    if (player.snakeLength() >= longestLength) {
      longestLength = player.snakeLength();
      score.clearScore();
      score.drawScore();
    }
    clearInterval(timeWhile2);
  }
}, 100);
