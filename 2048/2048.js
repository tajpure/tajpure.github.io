var matrix = [];


function newGame() {
  // 在开始时，清除并重置矩阵
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      matrix[i][j] = null;
    }
  }
  // 创建两个新的随机数
  createRandom();
  createRandom();
  updateGrid();
}

function createRandom() {
  while (true) {
    var row = Math.floor(Math.random() * 4);
    var col = Math.floor(Math.random() * 4);
    if (matrix[row][col] === null) {
      // 90% 的概率生成 2，10% 的概率生成 4
      matrix[row][col] = Math.random() < 0.9 ? 2 : 4;
      break;
    }
  }
}

function updateGrid() {
  var cells = document.getElementsByClassName("cell");
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      var value = matrix[i][j];
      var cell = cells[i * 4 + j];
      cell.textContent = value === null ? "" : value;
    }
  }
}

window.onload = function () {
  var grid = document.getElementById("grid");

  for (var i = 0; i < 4; i++) {
    matrix[i] = [];
    for (var j = 0; j < 4; j++) {
      matrix[i][j] = null;
      var cell = document.createElement("div");
      cell.className = "cell";
      grid.appendChild(cell);
    }
  }

  // 初始化游戏和分数
  newGame();
  updateScore();

  };

var score = 0; // 初始化分数为0

function updateScore() {
    var scoreElement = document.getElementById('score');
    scoreElement.textContent = '分数: ' + score;
}

function rotateLeft(matrix) {
  console.log(matrix)
  var newMatrix = [];
  for (var i = 0; i < 4; i++) {
    newMatrix[i] = [];
    for (var j = 0; j < 4; j++) {
      newMatrix[i][j] = matrix[3 - j][i];
    }
  }
  return newMatrix;
}

function swipeLeft(matrix) {
  var moved = false;
  var score = 0;

  // 遍历每一行
  for (var i = 0; i < 4; i++) {
      var current = 0;

      // 遍历这一行的每一个元素
      for (var j = 1; j < 4; j++) {
          if (matrix[i][j] !== null) {
              // 如果这个元素不是空的，我们需要检查是否可以合并或者移动
              if (matrix[i][current] === null) {
                  // 如果current位置是空的，我们只需要移动
                  matrix[i][current] = matrix[i][j];
                  matrix[i][j] = null;
                  moved = true;
              } else if (matrix[i][current] === matrix[i][j]) {
                  // 如果current位置和当前元素相等，我们需要合并
                  matrix[i][current] *= 2;
                  score += matrix[i][current];
                  matrix[i][j] = null;
                  current++;
                  moved = true;
              } else if (matrix[i][current] !== matrix[i][j] && matrix[i][current+1] === null) {
                  // 如果current位置和当前元素不等，并且current右边的位置是空的，我们需要移动
                  matrix[i][current+1] = matrix[i][j];
                  matrix[i][j] = null;
                  current++;
                  moved = true;
              } else {
                  current++;
              }
          }
      }
  }

  return { moved: moved, score: score };
}


window.onkeydown = function(event) {
    var moved = false;

    if (event.key === 'ArrowUp') {
      matrix = rotateLeft(rotateLeft(rotateLeft(matrix)));
      var result = swipeLeft(matrix);
      moved = result.moved;
      score += result.score;
      matrix = rotateLeft(matrix);
    } else if (event.key === 'ArrowRight') {
        matrix = rotateLeft(rotateLeft(matrix));
        var result = swipeLeft(matrix);
        moved = result.moved;
        score += result.score;
        matrix = rotateLeft(rotateLeft(matrix));
    } else if (event.key === 'ArrowDown') {
      matrix = rotateLeft(matrix);
      var result = swipeLeft(matrix);
      moved = result.moved;
      score += result.score;
      matrix = rotateLeft(rotateLeft(rotateLeft(matrix)));
    } else if (event.key === 'ArrowLeft') {
        var result = swipeLeft(matrix);
        moved = result.moved;
        score += result.score;
    }
    console.log(moved)
    if (moved) {
        createRandom();
        updateGrid();
        updateScore(); // 更新分数
    } else if (isGameOver()) {
        alert('游戏结束！你的得分是：' + score);
    }
};

function isGameOver() {
  for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
          if (matrix[i][j] === null) {
              return false; // 还有空格
          }
          if (j !== 3 && matrix[i][j] === matrix[i][j + 1]) {
              return false; // 可合并的数字在右侧
          }
          if (i !== 3 && matrix[i][j] === matrix[i + 1][j]) {
              return false; // 可合并的数字在下侧
          }
      }
  }
  return true;
}