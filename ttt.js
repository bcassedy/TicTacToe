(function (root) {
  var TicTacToe = root.TicTacToe = (root.TicTacToe || {});
  var Game = TicTacToe.Game = function () {
    this.player = Game.marks;
    this.board = this.makeBoard();
  }

  Game.marks = ['x', 'o'];

  // board setup functions
  Game.prototype.makeBoard = function () {
    var board = [],
    row;
    for (var i = 0; i < 3; i++) {
      row = new Array(null, null, null);
      board.push(row);
    }
    return board;
  };

  Game.prototype.displayBoard = function () {
    _.times(3, function(i) {
      _.times(3, function(j) {
        $('#board').append('<div data-coords=[' + i + ',' + j + '] class="square"></div>');
      });
    });
  }

  // move functions
  Game.prototype.emptyPos = function (pos) {
    return this.board[pos[0]][pos[1]] === null;
  };

  Game.prototype.makeMark = function (pos) {
    this.board[pos[0]][pos[1]] = this.player;
  };

  Game.prototype.move = function (pos) {
    if (!this.emptyPos(pos)) {
      return false;
    }
    this.makeMark(pos);
    this.switchPlayer();
    return true;
  };

  Game.prototype.validMove = function (pos) {
    function onBoard (coord) {
      return (coord < 3) && (coord >= 0);
    }

    return this.emptyPos(pos) && _.all(pos, onBoard);
  };

  // turn functions
  Game.prototype.switchPlayer = function () {
    if (this.player === Game.marks[0]) {
      this.player = Game.marks[1];
    } else {
      this.player = Game.marks[0];
    }
  };

  // check for winner functions
  Game.prototype.diagonalWinner = function () {
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

  Game.prototype.verticalWinner = function () {
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

  Game.prototype.winner = function () {
    return (
      this.diagonalWinner() || this.horizontalWinner() || this.verticalWinner()
    );
  };

  $(document).ready(function () {
    var game = TicTacToe.game = new TicTacToe.Game();
    TicTacToe.game.displayBoard();
    $('.square').on('click', function (event) {
      var row = $(event.target).data("coords")[0];
      var col = $(event.target).data("coords")[1];
      if (game.move([row, col])) {
        $(event.target).addClass(game.player);
        if (game.winner()) {
          var winner = game.winner();
          alert(winner + ' won!');
        }
      }


    });

    $('#new-game').on('click', function (event) {
      game = TicTacToe.game = new TicTacToe.Game();
      TicTacToe.game.displayBoard();
    });
  });
})(this);