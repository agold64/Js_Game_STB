// Game Instructions
(function () {
    'use strict';
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.readyState === 4) {
            if ((ajax.status >= 200 && ajax.status < 300) || (ajax.status === 304)) {
                var obj = JSON.parse(ajax.responseText);
                response(obj);
            } else {
                alert('Error: ' + ajax.statusText);
            }
        }
    }

    function response(obj) {
        'use strict';
        var output = '';

        for (var i in obj) {
            var data = obj[i];
            output += '<h3>' + data.title + '</h3>';
            output += '<p>' + data.rules + '</p>';
            output += '<p>' + data.examples + '</p>';
            output += '<br /><a href="' + data.url + '" target="_blank">en.wikipedia.org/wiki/Shut_the_Box</a>';
            U.openModal(output);
        }
    }

    function instructions() {
        'use strict';
        ajax.open('GET', 'data/instructions.json', true);
        ajax.send(null);
    }


    U.addEvent(document.getElementById('rules'), 'click', instructions);
    U.addEvent(document.getElementById('closeModal'), 'click', U.closeModal);

})();