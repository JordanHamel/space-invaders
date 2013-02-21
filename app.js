var Spaceship = function(pos_x, game) {

  var that = this;
  that.size = 30;
  that.game = game;

  that.pos = {
    x: pos_x,
    y: that.game.CANVAS_SIZE - that.size
  };

  that.draw = function () {
    that.game.ctx.fillStyle = "F00";
    that.game.ctx.fillRect(that.pos.x, that.pos.y, that.size, that.size);
  }
}

var Bullet = function(x_pos, y_pos, direction, game) {

  var that = this;
  that.direction = direction;
  that.game = game;

  that.SPEED = 10;
  that.HEIGHT = 10;
  that.WIDTH = 5;

  that.pos = {
    x: x_pos,
    y: y_pos
  }

  that.update = function() {
    if (direction) {
      that.pos.y -= that.SPEED;
    } else {
      that.pos.y += that.SPEED;
    };
  };

  that.draw = function() {
    that.game.ctx.fillStyle = "F00";
    that.game.ctx.fillRect(that.pos.x, that.pos.y, that.WIDTH, that.HEIGHT);
  };

}

var Game = function(ctx) {

  var that = this;
  that.ctx = ctx;

  that.CANVAS_SIZE = 500;
  that.STEP_SIZE = 5;
  that.INTERVAL_SIZE = 1000/16;

  that.spaceship = new Spaceship(20, that);
  that.intervalID = undefined;
  that.bullet = undefined;

  key('left', function() {
    that.spaceship.pos.x -= that.STEP_SIZE;
  });
  key('right', function() {
    that.spaceship.pos.x += that.STEP_SIZE;
  });
  key('up', function() {
    that.fireBullet();
  });

  that.play = function() {
    that.intervalID = setInterval(that.step, that.INTERVAL_SIZE);
  };

  that.update = function() {
    if (that.bullet) {
      that.bullet.update();
      if (that.bullet.pos.y < (0 - that.bullet.HEIGHT) ) {
        that.bullet = undefined;
      };
    };
  };

  that.draw = function() {
    if (that.bullet) {
      that.bullet.draw();
    };
    that.spaceship.draw();
  };

  that.step = function() {
    ctx.clearRect(0, 0, that.CANVAS_SIZE, that.CANVAS_SIZE);
    that.update();
    that.draw();


    // check game, if game over, clear interval
  };

  that.fireBullet = function() {
    if (that.bullet == undefined) {
      that.bullet = new Bullet((that.spaceship.pos.x + that.spaceship.size/2 - 2.5), that.spaceship.pos.y, true, that);
    };
  };

  //script
  that.play();
}