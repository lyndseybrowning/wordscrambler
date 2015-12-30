function getDevice() {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? true : false;
}
var handheld = getDevice();
var evtListener = (handheld) ? 'touchstart' : 'click';
var wordsFound = 0;
var wordsFoundArray = [];

function writeCookie(cname,cvalue,exdays) {
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
    	var cookie = cookies[i];
    	var eqPos = cookie.indexOf("=");
    	var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    	document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

var Wordscramble = function (numLetters, dictionary, letterDist) {
    
	this.defaultDist = "AAAAAAAAABBCCDDDDDEEEEEEEEEEEEEFFGGGHHHHIIIIIIIIJKLLLLMMNNNNNOOOOOOOOPPQRRRRRRSSSSSTTTTTTTUUUUVVWWXYYZ";
    this.defaultNumLetters = 7;         // default number of letters
    this.numLetters = numLetters;       // number of letters the game will contain
    this.letterDist = letterDist;       // holds letter distribution (optional)   
    this.letterDistArray = [];          // holds array of letterDist    
    this.gameLetters = [];              // holds the random game letters
    this.tempGameLetters = [];          // holds temporary game letters for modification
	this.gameLettersChar = [];			// holds game letter character codes
    this.root = {};                     // trie root    
    this.minWordCount = 0;	   	        // minimum word count for an individual game
    this.resultsArray = [];		        // stores all possible words
    this.resultsFound = 0; 		        // stores number of all possible words
    this.currentWords = [];	            // words found so far
    this.currentWordsFound = 0;         // how many words found so far   
    this.eventListener = evtListener;   // touch or click
	this.dictionary = dictionary;	    // store the dictionary
	this.letterInput = document.getElementById('txtLetters');
	this.wordMsg = document.getElementById('word-msg');
	
    /* 
    * checks for user defined number of letters
    * no value sets numLetters to default
    **/
    if (!this.numLetters || typeof this.numLetters !== 'number') {
        this.numLetters = this.defaultNumLetters;
    }

    /* 
    * checks for user defined letter distribution
    * no value sets the final letters to the default distribution
    **/
    if (!this.letterDist) {
        this.letterDist = this.defaultDist;
        this.setMinWordCount(this.numLetters);  // set the min word count variable based on number of letters
    } else {
        this.letterDist = this.letterDist.toUpperCase();
        this.minWordCount = 0;
    }

    this.createArrayFromLetters(); 			// create letterDistArray from default/user letters
    this.createGameLetters();      			// finalise gameLetters array    	

};

/* 
* sets minWordCount
* param numLetters
**/
Wordscramble.prototype.setMinWordCount = function (numLetters) {

    switch (numLetters) {
        case 5:
            this.minWordCount = 30;
            break;
        case 6:
            this.minWordCount = 70;
            break;
        case 7:
            this.minWordCount = 100;
            break;
        case 8:
            this.minWordCount = 150;
            break;
        default:
            this.minWordCount = 30;
    }
};

/* 
* converts letterDist to letterDistArray
**/
Wordscramble.prototype.createArrayFromLetters = function () {

    for (var i = 0; i < this.letterDist.length; i++) {
        var letter = this.letterDist[i];
        this.letterDistArray.push(letter);
    }
};

/* 
* creates array from the letter distribution 
* based on the num letters
**/
Wordscramble.prototype.createGameLetters = function () {
	
	var _this = this;
    var ltrs = this.numLetters;         // number of letters
    var tmpDist = this.letterDistArray; // temporary distribution array

    // loop ltrs and create gameLetters
    for (var i = 0; i < ltrs; i++) {

        var randomLetter = Math.floor(Math.random() * tmpDist.length); // get a random letter 
        var letterFound = tmpDist[randomLetter];

        this.gameLetters.push(letterFound); // push random letter to gameLetters		
        this.removeFromArray(tmpDist, letterFound);  // remove this character from the temporary array so it cant get chosen again        
    }

	// letters to find words from
	var findWordsFrom = this.gameLetters.join("");
	
    // get total words and total words possible, which stores in this.resultsArray and this.resultsFound
    this.getWords(d.root, findWordsFrom, "");

    // check that the number of results found is within the minimum word count
    if (this.resultsFound < this.minWordCount) {        
        this.recreateGame(); // recreate the game using new letters
    } else {
		this.tempGameLetters = this.gameLetters.slice(0); // create temporary letters from gameLetters	
        this.displayLetters();			// display letters to user
		this.handleUserInteraction();   // handle user interaction, click/touch or keypress	
		this.clickFinish();
    }	
};

/* 
* removes a specified index from an array
* param arrayName, index
**/
Wordscramble.prototype.removeFromArray = function (arrayName, index) {

    var dist = arrayName;

    for (var i = dist.length; i--;) {
        if (dist[i] === index) {
            dist.splice(i, 1);
            break;
        }
    }
};

/* 
* creates the list element containing the letters
**/
Wordscramble.prototype.displayLetters = function () {

    // letters list
    var letters = this.gameLetters;
    var letterContainer = document.getElementById('letter-container');
	var letterGrid = document.createElement('div');
		letterGrid.id = "letter-grid";
		letterContainer.appendChild(letterGrid);
	
	var letterList = document.createElement('ul');
    	letterList.id = 'game-letters';   
    	letterGrid.appendChild(letterList);

    // word counts table
    var wordCountTbl = document.getElementById('tbl-game-letter-counts');
    var headerRow = document.createElement('tr');
    wordCountTbl.appendChild(headerRow);

    for (var i = 0; i < letters.length; i++) {
        var letter = letters[i];
        var li = document.createElement('li');
        li.innerHTML = letter;
        letterList.appendChild(li);        

		if(i != (letters.length-1)) {
			// append the word counts header row
			var wordCountHeader = document.createElement('th');
			headerRow.appendChild(wordCountHeader);
			
			// append table headers
			var letterCounter = letters.length - (i);
			wordCountHeader.innerHTML = letterCounter + 'LW';
	
			// append new row cells	
			var newCell = document.createElement('span');
			newCell.id = 'cell' + letterCounter;
			newCell.innerHTML = 0;
			
			wordCountHeader.appendChild(newCell);
		}
    }

    // append word count numbers
    var wordArray = this.resultsArray;

    // loop possible words and store counts in cells
    for (var j = 0; j < wordArray.length; j++) {
        var wLength = wordArray[j].length;
        var wCell = document.getElementById('cell' + wLength);
        wCell.innerHTML = parseInt(wCell.innerHTML) + 1;
    }
    // total possible words
    document.getElementById('game-total-words').innerHTML = this.resultsFound;
};

/* 
* handles user interaction with the letters, either via click/touch or keypress
**/
Wordscramble.prototype.handleUserInteraction = function () {

	var letterContainer = document.getElementById('game-letters');  // letter <ul>
    var lists = letterContainer.getElementsByTagName('li');         // get letters 
	var clearBtn = document.getElementById('btnClear');
    var theArray = this.tempGameLetters;
	var mainArray = this.gameLetters;
	var theCharArray = this.gameLettersChar;
    var theEvent = this.eventListener;
	var inputter = this.letterInput;	
	
	// enter a word
	var enter = document.getElementById('btnEnter');
	enter.addEventListener(theEvent, function (event) {	
		newGame.goWord(inputter.value);	
		theArray = mainArray.slice(0);
		inputter.value = '';
		newGame.recreateLetters();		
	}, false);
	
	// shuffle
	var shuffle = document.getElementById('btnShuffle');
	shuffle.addEventListener(theEvent, function (event) {	
		newGame.shuffleLetters(theArray);			
	}, false);
	
	// handle click/touch event
    for (var i = 0; i < lists.length; i++) {
		// current letter
        var theListItem = lists[i];		
        theListItem.addEventListener(theEvent, function (event) {																						
			
			var selLetter = event.target.innerHTML;
			
			if(this.className === 'letter-selected') {	
				this.className = ''; // remove class
				theArray.push(selLetter); // put back in array
				inputter.value = inputter.value.toUpperCase();
				inputter.value = inputter.value.replace(selLetter,  ''); // remove letter		
			} else {	
				this.className = 'letter-selected'; // add class
				newGame.removeFromArray(theArray, selLetter); // remove from array 	
				inputter.value+= selLetter; // add to text box		
			}	
        }, false);
    }
	
    // handle type event												
	this.letterInput.onkeydown = function(e) {	

		this.maxLength = newGame.numLetters;					   // max length of textbox based on numLetters
        e = e || window.event;	                                   // determine event
        var charCode = e.keyCode || e.which;                       // char pressed
        var charStr = String.fromCharCode(charCode).toUpperCase(); // string value of char pressed

		var gameLetters = document.getElementById('game-letters');
		var li = gameLetters.getElementsByTagName('li');
		var inTheArray = (newGame.inArray(theArray, charStr)) ? true : false;
		var self = this.value;
		var length = this.length;
		var leftChars = this.value.substring(length - 1, length).toUpperCase();
	
		if(!inTheArray && charCode !=8 && charCode !=13) 
			return false;
			
		if (inTheArray || charCode == 8 || charCode == 13) {		
			
			if (charCode == 8) { // user has pressed backspace 	
			
				var id = setInterval(function() {
					
					var boxValue = document.getElementById('txtLetters').value;					
						boxValue = boxValue.toUpperCase();				
					var li = gameLetters.getElementsByTagName('li')
	
					// loop through letters
					for (var z = 0; z < li.length; z++) {
						var thisLi = li[z];

						if (thisLi.className != '') {
						    thisLi.className = '';        
							theArray = mainArray.slice(0);
						}
					}
			
					if (boxValue.length) {
					    // loop through remaining letters
					    for (var txtLtr = 0; txtLtr < boxValue.length; txtLtr++) {                            					       
                            	
							// loop through list items at the same time
					        for (var gList = 0; gList < li.length; gList++) {
					            var theLi = li[gList];  // current item in the loop
					            var selectedList = (theLi.className === 'letter-selected') ? true : false; // if current list is selected

					            if (theLi.className != 'letter-selected' && boxValue[txtLtr] === theLi.innerHTML) { 
					                theLi.className = 'letter-selected';
									// remove from array									
									newGame.removeFromArray(theArray, theLi.innerHTML);
									break;
					            }
					        }					        
					    }						
					}
					//console.log("after clear - "+theArray);
					window.clearInterval(id);
				}, 10);	
			} else if (charCode == 13) {
				
				newGame.goWord(inputter.value);	
				theArray = mainArray.slice(0);
				inputter.value = '';
				newGame.recreateLetters();		
			} else {		
				
				// loop through the letters in the game
				for (var l = 0; l < li.length; l++) {			
					var thisLi = li[l];  // current item in the loop
					var selected = (thisLi.className === 'letter-selected') ? true : false;
	
					if(thisLi.innerHTML === charStr) { // if current item matches pressed letter	
						if(selected) {
							if (!inTheArray) {						
								thisLi.className = '';
								theArray.push(charStr);	// put back in array	
							}
						} else {							
							thisLi.className = 'letter-selected';
							newGame.removeFromArray(theArray, charStr); // remove from array 			
							break;
						}
					}
				} 
			}			
		} 
	return true;
	}		
};

Wordscramble.prototype.clickFinish = function() {
	var _this = this;	
	var el = document.getElementById('btnFinish');
	el.onclick = function() {
		if(confirm('Are you sure you want to end the current game?')) {
			_this.finishGame();
		}
	}
};

/* 
* checks the existence of a word based on param word
* @param string word
**/
Wordscramble.prototype.goWord = function(word) {		

	var letterContainer = document.getElementById('game-letters');  // letter <ul>
    var lists = letterContainer.getElementsByTagName('li');         // get letters 
	var gameLetters = this.tempGameLetters;

	var word = word.toUpperCase();
	if(word === '') {
		// no word entered!
		this.showUserMsg('No word entered!');		
		return false;
		
	} else if (this.hasWord(word)) {
		// word found!
		var inTheArray = (this.inArray(this.currentWords, word)) ? true : false;
	
		// only if word hasnt already been found
		if(!inTheArray) {
			//remove any error
			this.wordMsg.style.visibility = 'hidden';
			
			var wordsFoundList = document.getElementById('tbl-word-list');
			var totWordsFound = document.getElementById('totalWordsFound');

			var whereToGo = document.getElementById('game-words-found');
			var theWord = document.createElement('span');
				theWord.innerHTML = word;				
				whereToGo.insertBefore(theWord, whereToGo.firstChild);

			//store word found
			this.currentWords.push(word);
			wordsFoundArray.push(word);
			this.currentWordsFound++;
			wordsFound++;
			totWordsFound.innerHTML = this.currentWordsFound;		
				
			//decrement word from possible words
			document.getElementById('cell' + word.length).innerHTML = parseInt(document.getElementById('cell' + word.length).innerHTML) - 1;	
		} else {
			// word already found
			this.showUserMsg('Already found');	
		}		
	} else {
		// word not found!
		this.showUserMsg('Invalid word');			
	}	
};

Wordscramble.prototype.recreateLetters = function() {

	var letterContainer = document.getElementById('game-letters');  // letter <ul>
    var lists = letterContainer.getElementsByTagName('li');         // get letters 
	
	for (var z = 0; z < lists.length; z++) {
		var thisLi = lists[z];

		if (thisLi.className != '') {
			thisLi.className = '';   
		}
	}
};

Wordscramble.prototype.showUserMsg = function(msg) {		
	this.wordMsg.style.visibility = 'visible';
	this.wordMsg.innerHTML = msg;
};

/* 
* checks the existence of an index in a specified array
* @param array name
**/
Wordscramble.prototype.inArray = function(arrayName, index) {
	
	// loop array, if the letter isnt in it, return false
	for (var j = 0; j < arrayName.length; j++) {
		if(arrayName[j] === index) {
			return true;
		}		
	}
	return false;
};

/* 
* checks for the existance of a word in the dictionary
**/
Wordscramble.prototype.hasWord = function (word) {
    var current = d.root;

    //loop through letters to find branches
    for (var j = 0; j < word.length; j++) {
        var letter = word[j];
        //if theres no branch, there's no match
        if (!(letter in current)) {
            return false;
        }
        //set current to the most recent branch
        current = current[letter];
    }

    //return true or false
    return current.$ === 1;
};

/* 
* stores all possible words and total possible words from given starting letters
**/
Wordscramble.prototype.getWords = function (start, word, result) {
    var current = start; // start at root	

    for (var i = 0; i < word.length; i++) {
        var letter = word[i];
        var results = result;

        if (letter in current) {

            var cur = current[letter]; // set e as the current branch					
            results += letter; // store letter e

            //if we've reached the end of a word, store it in resultsArray
            if (cur.$ === 1) {

                //only add to array if it doesn't already exist
                if (this.resultsArray.indexOf(results) < 0) {
                    this.resultsArray.push(results);
                    this.resultsFound++;
                }
            }

            // go deeper, whilst removing the current letter         
            this.getWords(cur, word.replace(letter, ''), results);
        }
        results = results.replace(letter, '');
    }
    return false;
};

/* 
* shuffles the letters
**/
Wordscramble.prototype.shuffleLetters = function(whatLetters) {
	
	// recreate list HTML
	var letterContainer = document.getElementById('game-letters');  
    var lists = letterContainer.getElementsByTagName('li');      

	for (var i = 0; i < lists.length; i++) {		
		if(lists[i].className != '') {
			lists[i].className = '';
			whatLetters.push(lists[i].innerHTML);
		}
	}
	
	// sort letters randomly
	newLtrs = whatLetters.sort(function () {
		return 0.5 - Math.random();
	});
	
	for (var j = 0; j < lists.length; j++) {		
		lists[j].innerHTML = newLtrs[j];
	}	
	this.letterInput.value = '';
	this.letterInput.focus();
};

Wordscramble.prototype.finishGame = function() {
	
	var dict = this.dictionary;
	var letters = this.gameLetters;
	var possibleWords = this.resultsArray;
	var possibleWordCount = this.resultsFound;	
	var totalWordsFound = wordsFound;
	var totalWordsList = wordsFoundArray;	
		
	// create cookies
	writeCookie('dictionary', dict, 1);
	writeCookie('gameLetters', letters, 1);
	writeCookie('posWords', possibleWords, 1);
	writeCookie('posWordCount', possibleWordCount, 1);
	writeCookie('wordsFound', totalWordsList, 1);
	writeCookie('wordsFoundCount', totalWordsFound, 1);
	
	document.location.href='results.php';
};


/* 
* recreates the game
* based on new game or minWordCount
**/
Wordscramble.prototype.recreateGame = function () {

	// empty all inputs
    document.getElementById('letter-container').innerHTML = '';
    document.getElementById('tbl-game-letter-counts').innerHTML = '';
	document.getElementById('totalWordsFound').innerHTML = '0';
	document.getElementById('game-words-found').innerHTML = '';
	
	// empty variables
	this.wordMsg.innerHTML = '';	
	this.currentWords = [];
	this.currentWordsFound = 0;	
	this.gameLetters = [];
	this.tempGameLetters = [];	
	this.resultsArray = [];
	this.resultsFound = 0;	
	wordsFound = 0;
	wordsFoundArray = [];
			
    new Wordscramble(this.numLetters,this.dictionary);
};

/** 
 * Creates a new game when 'New Game' is pressed
 *
 */
var btnNew = document.getElementById('btnNew');	
btnNew.addEventListener(evtListener, function(e) {
	if (confirm('Are you sure you want to start a new game?')) {		
		newGame.recreateGame();				
	}		
	e.stopPropagation();
	e.preventDefault();	
}, false);	