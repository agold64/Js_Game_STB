(function () {

    // Arrays
    var dice = [];
    var tile = [];

    // Score
    var startScore = '45';
    U.setText('score', startScore);

    // Flip Tile
    for (var i = 1; i < 10; i++) {
        var element = document.getElementById([i]);

        element.onclick = function () {
            if ( (this.classList.contains('flipped')) && (!this.classList.contains('Locked')) ) {
                U.removeClass(this.id, 'flipped');
                tile.pop();
                avg -= this.id;
            } else {
                tile.push(parseInt(this.id));
                var avg = tile.reduce(addArray, 0);

                if (dice.length !== 0) {
                    if (avg <= dice) {
                        U.addClass(this.id, 'flipped');
                        if (avg == dice) {
                            document.getElementById('rollDice').disabled = false;
                            startScore -= avg;
                            document.getElementById('score').textContent = startScore;
                            for (var i in tile) {
                                U.addClass(tile[i].toString(), 'Locked');
                            }
                        }
                    } else {
                        U.openModal("Number is Higher then Dice");
                        tile.pop();
                        avg -= this.id;
                    }
                } else {
                    U.openModal("Roll Dice First");
                }
            }
            console.log('Tile ' + tile);
            console.log('Avg ' + avg);
            console.log('Score ' + startScore);
        }

    }


    // Roll Dice
    function rollDice() {
        clearArray(dice);
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
        while (arr.length) {
            arr.pop();
        }
        //arr.length = 0;
    }

    // Add Array
    function addArray(a, b) {
        return a + b;
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