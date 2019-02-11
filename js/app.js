const step = {
    width: 101,
    height: 83
};

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 2 * step.width;
        this.y = 5 * step.height;
    }
    update() {}
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(direction) {
        let new_x, new_y;
        switch(direction) {
            case 'left':
              new_x = this.x - step.width;
              if (new_x >= 0){
                  this.x = new_x;
              }
              break;
            case 'right':
              new_x = this.x + step.width;
              if (new_x < 505){
                  this.x = new_x;
              }
              break;
            case 'up':
              new_y = this.y - step.height;
              if (new_y >= 0) {
                  this.y = new_y;
                  if (new_y === 0) {
                    console.log('water');
                  }
              } 
              break;
            case 'down':
              new_y = this.y + step.height;
              if (new_y < 6 * step.height) {
                  this.y = new_y;
              }
              break;
        }

    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [];
const player = new Player();
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
