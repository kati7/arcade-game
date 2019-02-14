const step = {
    width: 101,
    height: 83
};

class Enemy {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
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
        this.x = this.x + this.speed * dt;
        if (this.x > 505) {
            this.reset();
        }
    }

    // Move the enemy to the left side of the board
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

    setSprite(sprite) {
        this.sprite = sprite;
        this.update();
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
        let newX, newY;
        switch(direction) {
            case 'left':
                newX = this.x - step.width;
                if (newX >= 0){
                    this.x = newX;
                }
                break;
            case 'right':
                newX = this.x + step.width;
                if (newX < 505){
                    this.x = newX;
                }
                break;
            case 'up':
                newY = this.y - step.height;
                if (newY >= 0) {
                    this.y = newY;
                    if (newY === 0) {
                        this.gameOver();
                    }
                } 
                break;
            case 'down':
                newY = this.y + step.height;
                if (newY < 6 * step.height) {
                    this.y = newY;
                }
                break;
        }
    }

    gameOver() {
        this.reset();
        winningModal.open();
    }
}

// Now instantiate your objects.
const allEnemies = [];
const player = new Player();

// Modals for:
// - choosing the characters at the beginning of the game
// - displaying information after winning the game
let focusedElementBeforeModal;

class Modal {
    constructor(overlay) {
        this.overlay = overlay;
        const closeButton = overlay.querySelector('.button-close')
        closeButton.addEventListener('click', this.close.bind(this));
        overlay.addEventListener('click', e => {
            if (e.srcElement.id === this.overlay.id) {
                this.close();
            }
        });
    }

    open() {
        focusedElementBeforeModal = document.activeElement;
        this.overlay.classList.remove('is-hidden');
    }
  
    close() {
        this.overlay.classList.add('is-hidden');
        focusedElementBeforeModal.focus();
    }
}

const winningModal = new Modal(document.querySelector('#winning-modal'));

const chooseCharacterModalOverlay = document.querySelector('#choose-character-modal');
const chooseCharacterModal = new Modal(chooseCharacterModalOverlay);
chooseCharacterModal.open();

const focusableElements = document.querySelectorAll('#choose-character-modal img');
const firstTabStop = focusableElements[0];
const lastTabStop = focusableElements[focusableElements.length - 1];
firstTabStop.focus();

chooseCharacterModalOverlay.addEventListener('keydown', function(e) {
    console.log(e.keyCode);
    // TAB key pressed
    if (e.keyCode === 9) {
        // SHIFT + TAB keys pressed
        if (e.shiftKey) {
            if (document.activeElement === firstTabStop) {
                e.preventDefault();
                lastTabStop.focus();
            }
        // just TAB key pressed
        } else {
            if (document.activeElement === lastTabStop) {
                e.preventDefault();
                firstTabStop.focus();
            }
        }
    // ENTER key pressed
    } else if (e.keyCode === 13) {
        if (document.activeElement.nodeName.toLowerCase() === 'img') {
            startGame(document.activeElement);
        }
    }
});

const characters = document.querySelector('.characters');
characters.addEventListener('click', function(evt) {
    if(evt.target.nodeName.toLowerCase() === 'img') {
        startGame(evt.target);
    }
});

function startGame(element) {
    chooseCharacter(element);

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

    generateEnemies();
}

function generateEnemies() {
    const ENEMIES_NO = 2;
    for (let i = 0; i < ENEMIES_NO; i++) {
        //choose speed between 100 and 500
        const speed = Math.floor(Math.random() * 400) + 100;
        //choose y between 1 * step.height and 3 * step.height
        const y = (Math.floor(Math.random() * 3) + 1) * step.height;
        //choose x between -500 and 500
        const x = Math.floor(Math.random() * 1000) - 500;
        const enemy = new Enemy(x, y, speed);
        allEnemies.push(enemy);
    }
}

function chooseCharacter(element) {
    const sprite = element.getAttribute('src');
    player.setSprite(sprite);
    chooseCharacterModal.close();
}

