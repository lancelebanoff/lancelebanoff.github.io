
//define globals to identify when a user is attempting to highlight
var highlighted_GLOBALS = {
	"clickDown": false,
	"clickUp": true,
	"startWord": 0,
	"endWord": 0,
	"startVerse": 0,
	"endVerse": 0
}

/** Returns currently highlighted text */
function getSelectedText() {
		var text = "";

		//check for window or document selections and return in var

		if (window.getSelection) {
			text = window.getSelection().toString();
		}
		else if (document.selection && document.selection.type != "Control") {
			text = document.selection.createRange().text;
		}
		return text;
}

function clearLastSelection() {
	if (window.getSelection) {
	  if (window.getSelection().empty) {  // Chrome
	    window.getSelection().empty();
	  } else if (window.getSelection().removeAllRanges) {  // Firefox
	    window.getSelection().removeAllRanges();
	  }
	} else if (document.selection) {  // IE?
	  document.selection.empty();
	}
}

/** Returns the selected elements in an array
 *  but only the elements that are words in each verse */
function getSelectedElements() {
	var selection = window.getSelection(); //get what the user selected
	var range = selection.getRangeAt(0);   //extract the range
	var docFragment = range.cloneContents(); //clone it into a doc fragment, which is like a 'cut-out' of the original html doc
	var words = docFragment.querySelectorAll('[word-number]'); //filter out everything except for words in verses
	return words;
	/*
	console.log('First Word: ' + words[0].innerText);
	console.log('Last Word: ' + words[words.length - 1].innerText);
	console.log('Words: ' + words);
	console.log(selection.anchorNode);
	console.log('Anchor offset: ' + selection.anchorOffset);
	console.log('Range Count: ' + selection.rangeCount);
	*/
}


/** Returns the string 'Selected word x from verse y to ...' after user has made a selection */
function getSelectionInformation(opts) {
	var words;
	if (opts) {
		words = opts['words'];
	}
	else {
		words = getSelectedElements();
	}
	if (words.length > 0) {
		var firstWord = words[0];
		var lastWord = words[words.length - 1];
		console.log('First Word: ' + firstWord);
		console.log('First Word Verse: ' + $(firstWord).attr('verse-number'));
		console.log('First Parent: ' + firstWord.parentElement);
		var firstVerse = $(firstWord.parentElement).attr('verse-number');
		console.log('FirstVerse: ' + firstVerse);
		var lastVerse = $(lastWord.parentElement).attr('verse-number');	
		console.log('LastVerse: ' + lastVerse);
		if (firstVerse == lastVerse) {
			if (firstWord == lastWord) {
				return "Selected word " + $(firstWord).attr('word-number') + " from verse " + $(firstWord).attr('verse-number');
			}
			return "Selected words " + $(firstWord).attr('word-number') + ' - ' + 
			$(lastWord).attr('word-number') + ' from verse ' + $(firstWord).attr('verse-number');
		}
		else {
			return "Selected word " + $(firstWord).attr('word-number') + ' from verse ' + 
			firstVerse + ' to word ' + $(lastWord).attr('word-number') + ' from verse ' + lastVerse;
		}
	}
	return "";
}

/** Called everytime a mouseup event is received. Checks for selected text and notifies user what words they selected and from
 *  from what verses 
 */
function doSomethingWithSelectedText() {
	//var selectedText = getSelectedText();
	var words = getSelectedElements();
	if (words && words.length > 0) {
		openDialog(getSelectionInformation());
	}
}

/** A function to count how many words are located in the selected text */
function wordCount(str) {
	var words = str.split(" ");
	for (var i = words.length - 1; i >= 0; i--) {
		if (words[i] === "") {
			words.splice(i, 1);
		}
	}
	return words.length;
}

/** This is called when page loads. It checks for selected text to keep the page persistent */
function checkForSelectedText() {
	doSomethingWithSelectedText();
}

$(function() {
	document.onmouseup = doSomethingWithSelectedText;
	document.onmousedown = clearLastSelection;
	document.onload = checkForSelectedText;
});