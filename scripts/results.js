function getDevice() {
	return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? true : false;
}
var handheld = getDevice();

function readCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) 
	  {
	  	var c = ca[i].trim();
	  	if (c.indexOf(name)==0) return c.substring(name.length,c.length);
	  }
	return '';
}

function inArray(arrayName, index) {	
	for (var j = 0; j < arrayName.length; j++) {
		if(arrayName[j] === index) {
			return true;
		}		
	}
	return false;
}

var dictionary = readCookie('dictionary');
var letters = readCookie('gameLetters');
var possibleWords = readCookie('posWords');
var possibleWordCount = readCookie('posWordCount');

var theWordsFound = readCookie('wordsFound');
var theWordsCount = readCookie('wordsFoundCount');

var dict = document.getElementById('dictionary');
dict.innerHTML = dictionary;

var gameLetters = document.getElementById('game-letters');
var splLetters = letters.split(",");
for(var x=0; x<splLetters.length; x++) {	
	gameLetters.innerHTML+='<li>'+splLetters[x]+'</li>';
	
}

var wordsFound = document.getElementById('wordsFoundCount');
wordsFound.innerHTML = theWordsCount;

var posWordCount = document.getElementById('posWordCount');
posWordCount.innerHTML = possibleWordCount;

var possibleWordsList = new Array();
possibleWordsList = possibleWords.split(",");

// sort full word list by length
possibleWordsList.sort(function(a,b){return b.length-a.length});
var results = document.getElementById('wordsFound');
var tblWordsFound = document.getElementById('tblWordsFound');


var foundArray = new Array();
foundArray = theWordsFound.split(",");

for(var i=0; i<possibleWordsList.length; i++) {
	var word = possibleWordsList[i]; 
	var wordIsFound = '';
	if(inArray(foundArray, word)) {
		wordIsFound = 'Found!';
	}
	tblWordsFound.innerHTML+='<tr><td class="wordFoundLetterCount">(' + word.length + ')</td><td>' + word + '</td><td class="isWordFound">' + wordIsFound + '</td></tr>';
}
