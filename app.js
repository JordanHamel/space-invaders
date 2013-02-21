var Spaceship = function(pos_x, game) {

  var that = this;
  that.game = game;

  that.SIZE = 30;

  that.pos = {
    x: pos_x,
    y: that.game.CANVAS_SIZE - that.SIZE
  };

  that.draw = function () {
    that.game.ctx.fillStyle = "800080";
    that.game.ctx.fillRect(that.pos.x, that.pos.y, that.SIZE, that.SIZE);
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
    that.game.ctx.fillStyle = "CC0066";
    that.game.ctx.fillRect(that.pos.x, that.pos.y, that.WIDTH, that.HEIGHT);
  };
}

var Invader = function(x_pos, y_pos, ctx) {

  var that = this;
  that.direction = true;
  that.ctx = ctx;

  that.VELOCITY = 5;
  that.SIZE = 30;

  that.pos = {
    x: x_pos,
    y: y_pos
  }

  that.update = function() {
    that.pos.x += that.VELOCITY;
    if (that.pos.x > 500) {
      that.pos.x = 0 - that.SIZE;
    };
  }

  that.draw = function() {
    that.ctx.fillStyle = "0F0";
    that.ctx.fillRect(that.pos.x, that.pos.y, that.SIZE, that.SIZE);
  }
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
  that.invaders = [];

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
    that.createInvaders(1);
    that.intervalID = setInterval(that.step, that.INTERVAL_SIZE);
  };

  that.update = function() {
    if (that.bullet) {
      that.bullet.update();
      if (that.bullet.pos.y < (0 - that.bullet.HEIGHT) ) {
        that.bullet = undefined;
      };
    };
    // update each invader
    for (var i = 0; i < that.invaders.length; i++) {
      that.invaders[i].update();
    };
  };

  that.draw = function() {
    if (that.bullet) {
      that.bullet.draw();
    };
    that.spaceship.draw();
    // draw each invader
    for (var i = 0; i < that.invaders.length; i++) {
      that.invaders[i].draw();
    };
  };

  that.step = function() {
    ctx.clearRect(0, 0, that.CANVAS_SIZE, that.CANVAS_SIZE);
    that.update();
    if (that.bullet) {
      that.bulletHit();
    };
    that.draw();

    // check game, if game over, clear interval
  };

  that.fireBullet = function() {
    if (that.bullet == undefined) {
      that.bullet = new Bullet((that.spaceship.pos.x + that.spaceship.SIZE/2 - 2.5), that.spaceship.pos.y, true, that);
    };
  };

  that.createInvaders = function(n) {
    for (var i = 0; i < n; i++) {
      for (var y = 280; y > 79; y -= 45) {
        for (var x = 50; x < 480; x+= 45) {
          that.invaders.push(new Invader(x, y, that.ctx));
        }
      }
    };
  };

  that.bulletHit = function() {
    for (var i = 0; i < that.invaders.length; i++) {
      if (that.bullet.pos.x < that.invaders[i].pos.x + that.invaders[i].SIZE &&
        that.bullet.pos.x + that.bullet.WIDTH > that.invaders[i].pos.x &&
        that.bullet.pos.y < that.invaders[i].pos.y + that.invaders[i].SIZE &&
        that.bullet.pos.y + that.bullet.HEIGHT > that.invaders[i].pos.y) {
        that.invaders.splice(i, 1);
        that.bullet = undefined;
        return true;
      }
    };
  }

  //script
  that.play();
}

