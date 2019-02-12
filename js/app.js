const step = {
    width: 101,
    height: 83
};

class Enemy {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.init_x = x;
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        // this.x = this.x + this.speed;
        this.x = this.x + this.speed * dt;
        if (this.x > 505) {
            this.reset();
        }
    }

    reset(){
        this.x = -1 * step.width;
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.reset();
    }
    reset(){
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
                    this.reset();
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
const allEnemies = [];
const enemies_no = 5;
for (let i = 0; i < enemies_no; i++) { 
    //choose speed between 100 and 500
    const speed = Math.floor(Math.random() * 400) + 100;
    //choose y between 1 * step.height and 3 * step.height
    const y = (Math.floor(Math.random() * 3) + 1) * step.height;
    //choose x between -500 and 500
    const x = Math.floor(Math.random() * 1000) - 500;

    const enemy = new Enemy(x, y, speed);
    allEnemies.push(enemy);
}
const player = new Player();



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


