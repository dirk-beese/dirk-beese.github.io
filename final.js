// Restart Game Button
var circles = $('.dot');
var playerNames = $('.playerName');
var playerWins = $('.playerWins');

var playerBlue = {'color': 'rgb(0, 0, 255)', 'wins': 0};
var playerRed = {'color': 'rgb(255, 0, 0)', 'wins': 0};

var player = playerBlue;

var turnInfo = $('#turn_info')

var restart = $('#restart_button')

alert('Welcome to Connect Four! Please input player names:');

playerBlue['name'] = prompt('Name of the blue player');
playerRed['name'] = prompt('Name of the red player');
$(playerNames.eq(0).text(playerBlue['name']))
$(playerNames.eq(1).text(playerRed['name']))

updateWins()

turnInfo.html("It is " + player['name'] + "'s turn");

function updateWins() {
    $(playerWins.eq(0).text(playerBlue['wins']))
    $(playerWins.eq(1).text(playerRed['wins']))
}

function clearBoard() {
    console.log('click')
    for (var m = 0; m < circles.length; m++) {
        circles.eq(m).css('background-color', 'rgb(187, 187, 187)')
    }
}
restart.click(clearBoard);

function changePlayer() {
    if (player === playerBlue) {
        playerBlue = player;
        player = playerRed;

    } else {
        playerRed = player;
        player = playerBlue;
    }
}

function checkArrayOfColors(rowArray) {
    var numberOfMatches = 0;
    for (var k = 0; k < rowArray.length; k++) {
        if (rowArray[k] === player['color']) {
            numberOfMatches++;
            if (numberOfMatches === 4) {
                return true;
            }
        } else {
            numberOfMatches=0
        }
    }
        return false
}

function checkGameStatus(circle) {
    var sameRowColors = [];
    var sameColColors = [];
    var sameDia1Colors = [];
    var sameDia2Colors = [];
    for (var l = 0; l < circles.length; l++) {
        var compareCircle = $(circles.eq(l));
        if (circle.attr('row') === compareCircle.attr('row')) {
                sameRowColors.push(compareCircle.css('background-color'));
        }
        if (circle.attr('col') === compareCircle.attr('col')) {
                sameColColors.push(compareCircle.css('background-color'));
        }
        if ((parseInt(circle.attr('row')) + parseInt(circle.attr('col'))) === (parseInt(compareCircle.attr('row')) + parseInt(compareCircle.attr('col')))) {
                sameDia1Colors.push(compareCircle.css('background-color'));
        }
        if ((circle.attr('row') - circle.attr('col')) === (compareCircle.attr('row') - compareCircle.attr('col'))) {
                sameDia2Colors.push(compareCircle.css('background-color'));
        }
    }
    return checkArrayOfColors(sameRowColors) || checkArrayOfColors(sameColColors) || checkArrayOfColors(sameDia1Colors) || checkArrayOfColors(sameDia2Colors)
}

function changeColorOfLowest(){
    var target_col = $(this).attr('col');

    for (var j = circles.length-1; j >= 0; j--) {
        var circle = $(circles.eq(j));
        if (circle.attr('col') === target_col && circle.css('background-color') === 'rgb(187, 187, 187)') {
            circle.css('background-color', player['color']);
            if (checkGameStatus(circle)) {
               alert('GameOver! ' + player['name']  + ' won. Congratulations')
               player['wins']++
               updateWins()
               // if (player['name'] == playerBlue['name']) {
               //      playerBlue['wins'] = playerBlue['wins'] + 1
               //  }
               // else {
               //      playerBlue['wins'] = playerBlue['wins'] + 1
               // }
            }
            changePlayer();
            turnInfo.html("It is " + player['name'] + "'s turn");
            break;
        }
    }
}

// Add attributes to circles
for (var i = 0; i < circles.length; i++) {
    var circle = $(circles.eq(i));
    circle.attr('col', i % 7);
    circle.attr('row', Math.floor(i / 7));
    circle.click(changeColorOfLowest);
}