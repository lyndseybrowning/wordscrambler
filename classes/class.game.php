<?php 
class Wordscramble {

	/**
    * Holds the default number of letters
	* @var int $_numLettersDefault
	*/		
	public $_numLettersDefault = 7;
	
	/**
    * Holds the selected number of letters
	* 5,6,7,8 or 9
	* @var int $numLetters
	*/	
	public $_numLetters;
	
	/**
    * Holds the selected dictionary
	* enable, csw12, owl2
	* @var string $dictionary
	*/	
	public $_dictionary;

	/**
	* Holds the maximum number of letters
	* for a custom input
	* @var int $maxCustomLetters
	*/
	private $maxCustomLetters = 8;

	/**
	 * Holds the custom letters
	 * @var string $customLetters
	 */
	public $_customLetters;
	
	/**
    * Sets the number of letters and the dictionary to be used	 
	* @param int $numLetters, default = 7
	* @param string $dictionary
	*/	
	public function __construct($numLetters = 7, $dictionary, $custom = null) {
		$this->_setLetters($numLetters);
		$this->_setDictionary($dictionary);
		if(!empty($custom)) {
			$this->_setCustomLetters($custom);
		}
	}
	
	/**
    * Validates the existence of number of letters and its data type
	* @param int $numLetters
	* @throws InvalidArgumentException when int is not numbers only
	*/	
	protected function _setLetters($numLetters) {
			
		if(empty($numLetters)) {
			$numLetters = intval($this->_numLettersDefault); //use default value
		}
		elseif(!is_int($numLetters)) {
			throw new InvalidArgumentException(
				'Wordscramble Class only accepts the number of letters as an integer. Input was: '.$numLetters
			);
		}
		$this->_numLetters = $numLetters;
	}
	
	/**
    * Validates the existence of dictionary and its data type 
	* also checks that the json file corresponding to the dictionary exists. If not, we use ENABLE by default
	* @param String $dictionary
	* @throws InvalidArgumentException when $dictionary is not given
	* @throws InvalidArgumentException when $dictionary is not string
	* @throws Exception when dictionary doesn't exist
	*/	
	protected function _setDictionary($dictionary) {
		
		if(empty($dictionary)) {
			throw new InvalidArgumentException(
				'No value given for dictionary'
			);
		}			
		elseif(!is_string($dictionary)) {
			throw new InvalidArgumentException(
				'Wordscramble Class only accepts the dictionary as a string. Input was: '.$dictionary
			);
		}		

		//echo (dirname(__FILE__).'/lib/'.$dictionary.'.json');
		if(!file_exists('./lib/'.$dictionary.'.json')) {
			throw new Exception (
				'Selected dictionary file does not exist. Input was: '.$dictionary
			);
		}
		$this->_dictionary = $dictionary;
	}

	/**
	 * Validates the existence of custom letters and it's length
	 * @param string $customLetters
	 *
	 *
	 */
	protected function _setCustomLetters($customLetters) {

		if(!is_string($customLetters)) {
			throw new Exception (
				'Custom letters are in an invalid format. Should be string.'
			);
		}

		if(!ctype_alpha($customLetters)) {
			throw new Exception (
				'Custom letters are not alphabetical.'
			);			
		}

		if(strLen($customLetters)>$this->maxCustomLetters || strlen($customLetters)<5) {
			throw new Exception (
				'Error. Custom letters should be between 5 and 8 characters.'
			);
		}
		$this->_customLetters = $customLetters;
		$this->_numLetters = strLen($customLetters);
	}
}
?>