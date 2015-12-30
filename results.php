<?php 
include("header.php");
?>
	<div class="container">
		<div id="results-header">
			<p class="floatl width50">You found <strong><span id="wordsFoundCount"></span>/<span id="posWordCount"></span></strong> words. </p>
			<p class="floatr width50 textr"><strong> Dictionary: </strong><span id="dictionary"></span></p>
			<div id="letter-container" class="clear">
				<div id="letter-grid">
					<ul id="game-letters"></ul>
				</div>
			</div>			
		</div>
		<div id="wordsFound"><table id="tblWordsFound" width="100%" cellspacing="0"></table></div>
	</div>	
	<script src="scripts/results.js"></script>
<?php include("footer.php"); ?>
