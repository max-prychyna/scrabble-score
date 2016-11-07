/* Scrabble score module */
"user strict";

var scrabble = function() {

    var mdl = {},
        scoreMap = {
            1: 'AEIOULNRST',
            2: 'DG',
            3: 'BCMP',
            4: 'FHVWY',
            5: 'K',
            8: 'JX',
            10: 'QZ'
        },
        consoleArgs = process.argv.slice(2);

    //object with keys - letters and values - points integer
    var convertedLettersObj = Object.keys(scoreMap).reduce(function(prev, current) {
        var matchingLetters = scoreMap[current].split('');
        matchingLetters.forEach(function(letter) {
            prev[letter] = parseInt(current);
        });
        return prev;
    }, {});

    //print score for a single word
    function scoreWord(word) {
        return word.toUpperCase().split('').map(scoreLetter).reduce(sum, 0);
    }

    //print score for a single letter
    function scoreLetter(letter) {
        return convertedLettersObj[letter] || 0;
    }

    //calc sum helper
    function sum(a, b) {
        return a + b;
    }

    //calculate total for words/letters
    function calcTotal(input, consoleInput) {
        if (consoleInput) {
            return input.map(scoreWord).reduce(sum, 0);
        }
        //convert string to array
        if (typeof(input) !== 'string') {
            return console.log('Input must be a string');
        } else {
            return input.split(/[\s,]+/).map(scoreWord).reduce(sum, 0);
        }
    }

    //simple validate arguments function
    function checkArgsLength(cArgs, iArgs, cb) {
        if (iArgs && iArgs.length > 0) {
            return cb(false, true);
        }
        if (cArgs.length > 0) {
            return cb(true, false);
        }
        return cb(false, false);
    }

    //print out the score for all arguments
    mdl.findScrabble = function(inputArgs) {
        var final = 0;
        return checkArgsLength(consoleArgs, inputArgs, function(res1, res2) {
            if (res1) {
                final = calcTotal(consoleArgs, true);
            } else {
                final = calcTotal(inputArgs, false);
            }
            return final;
        });
    }

    return mdl;
};

//demonstration of console version example
if (process.argv.slice(2).length > 0) {
    scrabble().findScrabble();
}

module.exports = scrabble;