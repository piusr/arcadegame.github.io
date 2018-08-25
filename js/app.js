'use strict';
// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
        //We pass the x,y parameters to each bug its own initial x,y position
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        this.x = x;
        this.y = y + 60; //centers the enemy on the y axis
        this.speed = speed;
        this.step = 101;
        this.boundary = this.step * 5;
        this.resetPosition = -this.step; // Allows the enemy to flow out of the screen
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
    }
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //A conditional that checks the enemy is not passed the boundary
    if (this.x < this.boundary) {
        //
        //Increment x by speed * dt
        this.x += this.speed * dt;
    } else {
        //We reset position to start
        this.x = this.resetPosition;
    }
};

// Draw the enemy on the screen, required method for game. And if this is true increase step by 4
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



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


//Our Player Object
class Hero {
    //Constructor to enable us initialize a new object
    constructor() {
        //setting the position of our player on the canvas
        this.step = 101; //Distance between one block to another on x axis
        this.jump = 83; //Distance between one block to another on y axis   

        //We set a static start point for our player
        this.startX = this.step * 2;
        this.startY = (this.jump * 4) + 60;
        this.x = this.startX;
        this.y = this.startY;
        this.victory = false;

        //The image of our player is called
        this.sprite = 'images/char-boy.png';
    }

    //We now draw our player on the current x and y position on the canvas
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //We update the hero's x and y property according to the input provided
    handleInput(input) {
        switch (input) {
            case 'left':
                //We set a boundry for our player that ensures he does not go off screen
                if (this.x > 0) {
                    this.x -= this.step;
                }
                break;
            case 'up':
                if (this.y > 0) {
                    this.y -= this.jump;
                }
                break;
            case 'right':
                if (this.x < this.step * 4) {
                    this.x += this.step;
                }
                break;
            case 'down':
                if (this.y < this.jump * 4) {
                    this.y += this.jump;
                }
                break;

        }
    }

    //Updating Collusion
    update() {
        let count = 0;
        //We check collision
        for (let enemy of allEnemies) {
            //check if the player x and y collide with enemy
            if (this.y === enemy.y && (enemy.x + enemy.step / 2 > this.x && enemy.x < this.x + this.step / 2)) {
                this.reset();
            }
        }

        //Check to see if player reached the river and win
        if (this.y === 60) { //check to see if heros y equals to the top of the grid(0)
           
             this.victory = true;
           


        }

    }

    //Reseting the hero after collusion with the enemy back to the starting point
    reset() {
        //We set x and y to starting x and y
        this.y = this.startY;
        this.x = this.startX;
    }
}



//We initialize a new object in a variable player and bug
const player = new Hero();
const bug = new Enemy();
const bug1 = new Enemy(-101, 0, 600);
const bug2 = new Enemy(-101, 83, 100);
const bug3 = new Enemy(-101, 83, 250);
const bug4 = new Enemy((-101 * 2.5), 83, 250);
const bug5 = new Enemy(-101, 0, 400);
const bug6 = new Enemy(-101, 0, 100);




//We create an array that stores all our enemies
const allEnemies = [];
//We push the bug element into the array we created
allEnemies.push(bug1, bug2, bug3, bug4, bug5, bug6);
console.log(allEnemies);