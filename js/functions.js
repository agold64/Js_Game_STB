(function () {

    // Arrays
    var dice = [];
    var tile = [];

    var startScore = '45';
    U.setText('score', startScore);

    // Flip Tile
    var button = document.getElementsByTagName('input');
    for (var i = 0, buttonCount = button.length; i < buttonCount; i++) {
        var data = button[i];

        // Refactor: Possibly take below function and add to Eventlistener as opposed to create one that includes the whole flip tile
        data.onclick = function () {
            tile.push(parseInt(this.value));
            var avg = tile.reduce(addArray, 0);

            if (dice === undefined || dice.length === 0) {
                U.openModal("Roll Dice First");
            } else {
                if (avg <= dice) {
                    U.addClass(this.value, 'flipped');
                    startScore -= this.value;

                    if (avg == dice) {
                        document.getElementById('rollDice').disabled = false;
                    }
                } else {
                    U.openModal("Number is Higher then Dice");
                    tile.pop();
                    avg -= this.value;
                }
            }

        }

    }


    // Score


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
    }

    // Add Array
    function addArray(a, b) {
        return a + b;
    }

    // End Game
    function endGame() {
        location.reload();
    }

    // EventHandlers
    window.onload = function () {
        U.addEvent(document.getElementById('rollDice'), 'click', rollDice);
        U.addEvent(document.getElementById('endGame'), 'click', endGame);
        U.addEvent(document.getElementById('closeModal'), 'click', U.closeModal);
    }

}());