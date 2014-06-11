(function (root) {
  var TicTacToe = root.TicTacToe = (root.TicTacToe || {});
  var Game = TicTacToe.Game = function () {
    this.player = Game.marks;
    this.board = Game.makeBoard();
  }

  Game.marks = ['x', 'o'];

  Game.prototype.makeBoard = function () {
    var board = [],
    row;
    for (var i = 0; i < 3; i++) {
      row = new Array(null, null, null);
      board.push(row);
    }
  };

  Game.prototype.isNotNull = function(pos) {
    return this.board[pos[0]][pos[1]] === null;
  };

  Game.prototype.diagonalWinner = function() {
    var game = this;

    var diagonalPositions1 = [[0, 0], [1, 1], [2, 2]];
    var diagonalPositions2 = [[2, 0], [1, 1], [0, 2]];

    var winner = null;

    _.each(Game.marks, function (mark) {
      function wonDiagonal (diagonalPositions) {
        return _.every(diagonalPositions, function (pos) {
          return game.board[pos[0]][pos[1]] === mark;
        });
      }

      var won = _.any(
        [diagonalPositions1, diagonalPositions2],
        wonDiagonal
      );

      if (won) {
        winner = mark;
      }
    });

    return winner;
  };

  Game.prototype.horizontalWinner = function() {
    var game = this;

    var winner = null;

    _.each(Game.marks, function (mark) {
      var indices = [0, 1, 2];

      var won = _.any(indices, function (i) {
        return _.every(indices, function (j) {
          return game.board[i][j] === mark;
        });
      });

      if (won) {
        winner = mark;
      }

    });

    return winner;
  };

  Game.prototype.verticalWinner = function() {
    var game = this;

    var winner = null;
    _.each(Game.marks, function (mark) {
      var indices = [0, 1, 2];

      var won = _.any(indices, function (j) {
        return _.every(indices, function (i) {
          return game.board[i][j] === mark;
        });
      });

      if (won) {
        winner = mark;
      }
    });

    return winner;
  };

  Game.prototype.winner = function() {
    return (
      this.diagonalWinner() || this.horizontalWinner() || this.verticalWinner()
    );
  };
});