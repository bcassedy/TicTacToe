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

    
  };
});