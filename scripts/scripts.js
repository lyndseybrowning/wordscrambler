var selLetters = document.getElementById('selLetters');
selLetters.onchange=function() {
	var trigger = this.options[this.selectedIndex].value;
	document.getElementById('custom').className = (trigger === "custom") ? '' : 'hidden';
}

var customLetters = document.getElementById('customLetters');
customLetters.onkeydown = function(e) {
	return checkAlphaNumeric(e);
}


var submitBtn = document.getElementById('frm-game-options');
submitBtn.onsubmit = function(e){ 	
	var custom = document.getElementById('custom');

	if(custom.className != 'hidden') {	
		var custLetters = document.getElementById('customLetters');
		if(custLetters.value.length < 5) {
			var spanError = document.createElement('span');
			spanError.id = 'customError';	
			if(document.getElementById('customError')) {
				return false;
			}		
			spanError.innerHTML = "<span class='error'> You must enter between 5 and 8 characters! </span>";			
			custom.appendChild(spanError);		
			return false;
		}
	}
}

function checkAlphaNumeric(e) {
            
	if ((e.keyCode == 8 || e.keyCode == 46) || (e.keyCode >= 65 && e.keyCode <= 90) ||
	   (e.keyCode >= 97 && e.keyCode <= 122))
	    return true;

	return false;
}