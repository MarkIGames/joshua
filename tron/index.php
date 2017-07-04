<?php

	date_default_timezone_set('America/Los_Angeles');

	if(isset($_GET['action'])) {
		$action = $_GET['action'];
	} else {
		$action = null;
	}
	
	echo '<link rel="stylesheet" type="text/css" href="index.css">';
	
	echo '<body>';
	
	echo '<br/><br/>';
	
	$yourFirstName = 'Joshua';
	
	$yourLastName  = 'Williams';

	$spacer = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp';
	
	if($yourFirstName == 'Joshua' || $yourFirstName == 'James') {
		$access = true;
	} else {
		$access = false;
	}
	
	if($access && $action == null) {
		$action = 'theArcade';
	}

	switch ($action) {
		case 'start':
			
			echo 'You have been rezzed into the Grid! WELCOME TO THE GRID! 
				  Before you lies a blue glowing city, people zip around 
				  on light cycles. Ships fly over head. Buildings blink 
				  and glow.<br/><br/>';

			echo '<img src="images/start.jpg"><br/><br/>';
			
			echo '<a href="' . $_SERVER['PHP_SELF'] . '?action=theStreet">Go the Street</a><br/>';
			
		break;
		case 'theStreet':
			
			echo 'Lightcyles are moving all around you, their drives zipping 
				  around. The lightcycles are moving very fast, as Recognizers
				  fly all around you. Building stretch up around you.<br/><br/>';
			
			echo '<img src="images/theStreet.jpg"><br/><br/>';
			
			echo '<a href="' . $_SERVER['PHP_SELF'] . '?action=theGames">Go the Games</a><br/>';
			echo '<a href="' . $_SERVER['PHP_SELF'] . '?action=castorsClub">Go the Club</a><br/>';
			echo '<a href="' . $_SERVER['PHP_SELF'] . '?action=seaOfSimulation">Go the Sea of Simulation</a><br/>';
			echo '<a href="' . $_SERVER['PHP_SELF'] . '?action=theBeacon">Go to the Beacon</a><br/>';
		
		break;
		case 'castorsClub':
			
			echo 'A party is going on all around you.<br/><br/>';
		
			echo '<img src="images/castorsClub.jpg"><br/><br/>';
			
			echo '<a href="' . $_SERVER['PHP_SELF'] . '?action=theStreet">Go the Street</a><br/>';
		
		break;
		case 'theGames':
			
			echo '<img src="images/theGames.jpg"><br/><br/>';
		
			echo '<a href="' . $_SERVER['PHP_SELF'] . '?action=theStreet">Go the Street</a><br/>';
		
		break;
		case 'seaOfSimulation':
				
			echo '<img src="images/seaOfSimulation.jpg"><br/><br/>';
				
			echo '<a href="' . $_SERVER['PHP_SELF'] . '?action=theStreet">Go the Street</a><br/>';
				
		break;		
		case 'theBeacon':
			
			echo '<img src="images/theBeacon.jpg"><br/><br/>';
		
			echo '<a href="' . $_SERVER['PHP_SELF'] . '?action=theStreet">Go the Street</a><br/>';
			echo '<a href="' . $_SERVER['PHP_SELF'] . '?action=theArcade">Exit the Grid</a><br/>';
		
		break;			
		case 'theArcade':
		
			echo '<img src="images/theArcade.jpg"><br/><br/>';
		
			echo '<a href="' . $_SERVER['PHP_SELF'] . '?action=start">Enter the Grid</a><br/>';
		
		break;
		
		// Encom Park
		// City Street
		// Encom Roof
		// Flynn's Hideout
		
		// Recognizer to Chase You
			// When it catches you you board the Recognizer
			// Get a Disc
			// Go to the games
		
	}
	
	echo '</body>';
	
?>