<?php 
require_once("classes/class.game.php");

if (!empty($_POST)) {
	$numLetters = intval($_POST['selLetters']); // @post letters
	$dictionary = $_POST['selDictionary']; 		// @post dictionary
	$customLetters = $_POST['customLetters'];   // @post custom letters

	include("header.php");	// include header file

	try {	

		$newGame = new Wordscramble($numLetters, $dictionary, $customLetters); // instantiate Wordscramble Class
		
		$letters = $newGame->_numLetters; //@var number of letters
		$dict = $newGame->_dictionary; 	  //@var dictionary	
		$custom = $newGame->_customLetters; //@var custom letters

	?>

		<div id="outer-container">
			<div class="container">
				<div class="btnGroup">
					<input type="button" id="btnShuffle" class="dark-btn" value=" Shuffle " />
					<input type="button" id="btnFinish" class="dark-btn" value=" End Game " />
					<input type="button" id="btnNew" class="green-btn" value=" New Game " />
				</div>
				<div class="whichDict"> Dictionary: <span><?php echo $dict; ?></span></div>
			</div>  
		
			<div class="container" id="letter-container"></div>
			
			<section id="game-input" class="container">
				<input type="text" id="txtLetters" />
				<input type="button" id="btnEnter" value=" Enter " class="blue-btn" />	
				<span id="word-msg"></span>	
			</section>	
			
			<section id="game-letter-counts" class="container">
				<table id="tbl-game-letter-counts" cellspacing="0"></table>		
				<div id="words-found">
					<div> Words Found: <span id="totalWordsFound">0</span>/<span id="game-total-words">0</span></div>
				</div>
			</section>
				
			<section id="game-words-found" class="container"></section>	
		</div>
		<script src="lib/<?php echo $dict; ?>.json"></script>
		<script src="scripts/wordscramble.js"></script>
		<script>
			var newGame = new Wordscramble(<?php echo $letters; ?>,<?php echo "'".$dict."'"; ?>,<?php echo "'".$custom."'";?>);		
		</script>

	<?php
	} catch(Exception $e) {
		echo $e->getMessage();
	}
} else {
	header('location: index.php');
	exit();
}
?>	

<?php include_once("analytics.php") ?>
<?php include("footer.php"); ?>