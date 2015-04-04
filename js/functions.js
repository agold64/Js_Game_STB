(function () {
    'use strict';

    // Arrays
    var dice = [], tile = [], totalTile = [];

    // Score
    var startScore = '45';
    U.setText('score', startScore);

    // Flip Tile
    for (var i = 1; i < 10; i++) {
        var element = document.getElementById([i]);
        totalTile[i] = i;

        element.onclick = function () {
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
                                    console.log('match ' + i);
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
            console.log(totalTile);
            console.log(tile);
        }
    }

    // Roll Dice
    function rollDice() {
        clearArray(tile);

        var dice1 = document.getElementById('dice1');
        var dice2 = document.getElementById('dice2');

        var d1 = Math.floor(Math.random() * 6) + 1;
        var d2 = Math.floor(Math.random() * 6) + 1;

        var diceTotal = d1 + d2;
        dice.push(diceTotal);

        dice1.innerHTML = d1;
        dice2.innerHTML = d2;

        document.getElementById('rollDice').disabled = true;
        console.log('Rolled ' + dice);
    }


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

    // End Turn
    function endTurn() {
        document.getElementById('rollDice').disabled = true;
        for (i = 1; i < 10; i++) {
            U.removeClass([i], 'flipped');
        }
        alert("Your final score is " + startScore);
    }

    // Reset Game
    function resetGame() {
        location.reload();
    }

    // EventHandlers
    window.onload = function () {
        U.addEvent(document.getElementById('rollDice'), 'click', rollDice);
        U.addEvent(document.getElementById('endGame'), 'click', resetGame);
        U.addEvent(document.getElementById('endTurn'), 'click', endTurn);
        U.addEvent(document.getElementById('closeModal'), 'click', U.closeModal);
    }

}());