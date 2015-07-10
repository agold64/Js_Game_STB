(function () {
    'use strict';

    // Arrays
    var dice = [], tile = [], totalTile = [];


    // Score
    var startScore = '45';
    U.setText('score', startScore);


    // Clear Array
    function clearArray(arr) {
        //arr.length = 0;
        while (arr.length) {
            arr.pop();
        }
    }


    // Add Array
    function addArray(a, b) {
        return a + b;
    }


    // Remove Item From Array
    function removeItem(arr, item) {
        for (var i in arr) {
            if (arr[i] == item) {
                arr.splice(i, 1);
                break;
            }
        }
    }


    // Roll Dice
    function rollDice() {
        clearArray(tile);

        var dice1 = document.getElementById('dice1'),
            dice2 = document.getElementById('dice2'),
            d1 = Math.floor(Math.random() * 6) + 1,
            d2 = Math.floor(Math.random() * 6) + 1,
            diceTotal = d1 + d2;

        dice.push(diceTotal);

        dice1.innerHTML = d1;
        dice2.innerHTML = d2;

        document.getElementById('rollDice').disabled = true;
        console.log('Rolled ' + dice);
    }


    // Flip Function 
    function flip() {
        if (dice.length !== 0) {
            if ((!this.classList.contains('flipped')) && (!this.classList.contains('Locked'))) {
                tile.push(parseInt(this.id));
                var avg = tile.reduce(addArray, 0);

                if (avg <= dice) {
                    U.addClass(this.id, 'flipped');
                    if (avg == dice) {
                        startScore -= avg;
                        document.getElementById('score').textContent = startScore;
                        document.getElementById('rollDice').disabled = false;
                        for (var i in tile) {
                            U.addClass(tile[i].toString(), 'Locked');
                        }
                        clearArray(dice);

                        for (var i = 0; i < totalTile.length; i++) {
                            if (tile.indexOf(totalTile[i]) !== -1) {
                                totalTile.splice(i, 1);
                            }
                        }
                    }
                } else {
                    U.openModal("Number is Higher then Dice");
                    tile.pop();
                }
            } else if ((this.classList.contains('flipped')) && (!this.classList.contains('Locked'))) {
                U.removeClass(this.id, 'flipped');
                removeItem(tile, this.id);
            }
        } else {
            U.openModal("Roll Dice");
        }
        console.log('Clicked Tile ' + tile);
        console.log('Total Tile ' + totalTile);
    }


    // End Turn
    function endTurn() {
        document.getElementById('rollDice').disabled = true;
        for (i = 0; i < 10; i++) {
            U.removeClass([i], 'flipped');
        }
        alert("Your final score is " + startScore);
    }

    // Reset Game
    function resetGame() {
        location.reload();
        console.log('New Game Starting');
    }


    // Flip Tile
    function flipTile() {
        var card = document.getElementsByClassName('card');
        for (var i = 0, count = card.length; i < count; i++) {
            var data = card[i].id,
                element = document.getElementById(data);
            totalTile.push(parseInt(data));
            U.addEvent(element, 'click', flip);
        }
    }

    // EventHandlers
    U.addEvent(document.getElementById('rollDice'), 'click', rollDice);
    U.addEvent(document.getElementById('endGame'), 'click', resetGame);
    U.addEvent(document.getElementById('endTurn'), 'click', endTurn);
    U.addEvent(document.getElementById('closeModal'), 'click', U.closeModal);

    window.onload = flipTile;
}());