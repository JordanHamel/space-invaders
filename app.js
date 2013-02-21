var Spaceship = function(pos_x, game) {

  var that = this;
  that.size = 30;

  that.pos = {
    x: pos_x,
    y: game.CANVAS_SIZE - that.size
  }

  that.draw = function () {
    game.ctx.fillStyle = "F00";
    game.ctx.fillRect(that.pos.x, that.pos.y, that.size, that.size);
  }
}

var Game = function(ctx) {

  var that = this;
  that.ctx = ctx;

  that.CANVAS_SIZE = 500;

  //script
  spaceship = new Spaceship(20, that);
  spaceship.draw();
}