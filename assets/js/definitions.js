/*
 * When you click a word, a popover appears with the morphology and definition
*/

var displayedPopover = null;

function findLexiconItem(strongNum) {
	if(strongNum in lexiconObject) {
		return lexiconObject[strongNum];
	}
	return null;
}

// By default, popovers don't disappear until the word is clicked, so this makes them disappear when clicked outside
function makePopoversHideable() {

	$(".word").click(function() {
		// Gets the strong number without the letter
		var strongNum = $(this).attr("word-strong-number").substr(1);
		var item = findLexiconItem(strongNum);
		if (item != null) {
			$(this).attr("data-content", "<i>" + item["morphology"] + "</i><br>" + item["long"]);
		}

		// If definition was not found
		else {
			$(this).attr("data-content", "<i>" + $(this).attr("word-morphology") + "</i><br>No definition found");
		}
		if(displayedPopover != null && !displayedPopover.is($(this))) {
			displayedPopover.popover('hide');
		}
		displayedPopover = $(this);
	});

	$('body').on('click', function (e) {
        if (displayedPopover != null && !displayedPopover.is(e.target) && displayedPopover.has(e.target).length === 0) {
            displayedPopover.popover('hide');
        }
	});

	// Fixes a bug so only one click is needed to reopen a popover
	$('body').on('hidden.bs.popover', function (e) {
	    $(e.target).data("bs.popover").inState.click = false;
	});

}

// Main
$(function() {
	var lexiconFileNAme = "assets/json/lexicons/lexicon-eph-english.json";
	var continueStartingFunction = function(lexiconText, deadParam) {
		return continueStarting(lexiconText, deadParam);
	};
	readTextFile(lexiconFileNAme, continueStartingFunction);
});

// Continues Main after async readTextFile()
function continueStarting(lexiconText, deadParam) {
	var lexiconJson = JSON.parse(lexiconText);
	parseLexicon(lexiconJson);
}

function parseLexicon(lexiconJson) {
	for(var wordIndex = 0; wordIndex < lexiconJson.length; wordIndex++) {
		parseLexiconWord(lexiconJson[wordIndex]);
	}
	lexiconIsParsed = true;
}

function parseLexiconWord(wordJson) {
	var strongNumber = wordJson["strongs"];
	var word = {};
	word["morphology"] = wordJson["morphology"];
	word["long"] = wordJson["long"];
	lexiconObject[strongNumber] = word;
}

function handleDefinitionPopovers() {
	makePopoversHideable();
	// Creates popovers for all words
    $('[data-toggle="popover"]').popover(); 
}

function destroyPreviousPopovers() {
	$('[data-toggle="popover"]').popover('destroy');
}