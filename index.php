<?php include("header.php") ?>

	<div class="container" id="landing-content">
		<h3> Welcome! </h3>
		<p> The aim of the game is to find as many words as possible from the given letters. It's simple! </p>
		<p>There is no time limit, so take as long as you need. When you've finished, press the End Game button to see what words you missed! </p>
		<p> Select your dictionary and the number of letters to begin. </p>
		<form id="frm-game-options" class="round-border" action="wordscrambler.php" method="post">			
			<div>
				<label for="selDictionary"><span class="round-border info-icon bg-yellow rot-left"> ? </span> Dictionary </label>
				<select name="selDictionary" id="selDictionary">
					<option value="WWF"> Words With Friends  </option>
					<option value="TWL06"> TWL06 (North American) </option>
					<option value="CSW12"> CSW12 (British) </option>
				</select>	
			</div>
			<div>
				<label for="selLetters"><span class="round-border info-icon bg-light-blue rot-right"> ? </span> Letters </label>
				<select name="selLetters" id="selLetters"><?php
					for($i=5; $i<9; $i++) { 
					?><option value="<?php echo $i; ?>"><?php echo $i; ?> Letters </option><?php
					}			
				?><option value="custom"> Enter my own Letters </option></select>
			</div>
			<div class="hidden" id="custom">
				<label for="customLetters"> Enter between 5 and 8 Letters </label>
				<input type="text" name="customLetters" id="customLetters" maxlength="8" />
			</div>
			<div><label for="btnStart">&nbsp;</label><input type="submit" value=" Go " name="btnStart" id="btnStart" class="round-border bg-blue" /></div>			
		</form>		
	</div>
	<script src="scripts/scripts.js"></script>
<?php include_once("analytics.php") ?>
<?php include("footer.php") ?>