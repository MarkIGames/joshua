<?php 

	session_start();

	date_default_timezone_set('America/Los_Angeles');
	
	if(isset($_GET['system'])) {
		echo '<pre>';
		print_r($_SESSION['universeData']);
		echo '</pre>';
	
		exit;
	}

	function returnRandomCoordinates( $maxDistance ) {
		$returnArray = array();
	
		$radius = $maxDistance;
	
		$randomRadius = rand(0, $radius);
	
		$randomAngle  = rand(0, 360);
	
		$coinFlip = rand(1,2);
		
		if($coinFlip == 2) {
			$newX = sin($randomAngle * (pi() / 180)) * ((100 / 100) * $randomRadius) - ($maxDistance * .5);
		} else {
			$newX = sin($randomAngle * (pi() / 180)) * ((100 / 100) * $randomRadius) + ($maxDistance * .5);
		}
	
		$newY = cos($randomAngle * (pi() / 180)) * ((100 / 100) * $randomRadius);
	
		return $returnArray = array('x'=>$newX,'y'=>$newY);
	}
	
	function randVowel() {
		$vowels = array("a","e","i","o","u");
	
		return $vowels[array_rand($vowels,1)];
	}
	
	function randConsonants() {
		$consonants = array("b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","x","z");
	
		return $consonants[array_rand($consonants,1)];
	}
	
	function randomNameGenerator() {
		$name = null;

		$pattern = rand(1,5);
	
		switch($pattern) {
			case 1:
				$name = ucfirst("" . randConsonants() . "" . randVowel() . "" . randConsonants() . "" . randVowel());
				break;
			case 2:
				$name = ucfirst("" . randConsonants() . "" . randVowel() . "" . randConsonants() . "" . randVowel() . "" . randVowel());
				break;
			case 3:
				$name = ucfirst("" . randConsonants() . "" . randVowel() . "" . randConsonants());
				break;
			case 4:
				$name = ucfirst("" . randConsonants() . "" . randVowel() . randVowel() . "" . "" . randConsonants() . "" . randConsonants() . "" . randVowel() . "" . randVowel());
				break;
			case 5:
				$name = ucfirst("" . randConsonants() . "" . randVowel() . "" . randConsonants() . "" . randVowel() . "" . randVowel() . "'" . randConsonants() . "" . randVowel() . "" . randConsonants() . "" . randVowel() . "" . randVowel());
				break;
		}
	
		if(isset($session['usedNames'][$name])) {
			$name = randomNameGenerator();
		}
		
		$_SESSION['usedNames'][$name] = $name;

		return $name;
	}
	
	if(isset($_GET['system'])) {
		echo '<pre>';
			print_r($_SESSION['universeData']);
		echo '</pre>';
		
		exit;
	}
	
	if(isset($_POST['submit'])) {
		
		$session['usedNames'] = array();
		
		$starTypes   = array('O','B','A','F','G','K','M');
		
		$planetTypes = array('Coreless','Desert','Dwarf','Terrestrial','Gas Giant','Ice','Lava','Ringed','Ocean');
		
		$cometTypes = array('Nickle','Iron','Mercury','Ice','Methane','Ammonia');
		
		$nebulaTypes  = array('Helium','Hydrogen','Chlorine','Hydrogen','Oxygen','Hydrogen','Nitrogen','Hydrogen','Ice');
		
		$nebulaColors = array('Green','Blue','Red','Orange','Brown','Yellow','Purple','White');
		
		if($_POST['galaxySize'] > 999) {
			$_POST['galaxySize'] = 999;
		}
		$lowEnd  = $_POST['galaxySize'] - 25;
		$highEnd = $_POST['galaxySize'];
		
		$systemCount = rand($lowEnd, $highEnd);
		
		$systemInformationArray = array();
		
		$systemCountIterator = $systemCount;
		
		$innerRim = $systemCount * .6795;
		$core     = $systemCount * .32;
		$outerRim = $systemCount * .0005;
		
		do {
			$systemInformationArray[$systemCountIterator] = array();
			
			$systemInformationArray[$systemCountIterator]['name'] = randomNameGenerator();
			
			$systemInformationArray[$systemCountIterator]['star'] = $starTypes[array_rand($starTypes,1)];
			
			if($systemCountIterator < $core) {
				$maxDistance = 20;
				$maxHeight   = 10;
			}
			if($systemCountIterator < $innerRim && $systemCountIterator > $core ) {
				$maxDistance = 50;
				$maxHeight   = 20;
			}
			if($systemCountIterator > $innerRim) {
				$maxDistance = 150;
				$maxHeight   = 50;
			}
			
			$coordArray = returnRandomCoordinates($maxDistance);
			
			$coordArray2 = returnRandomCoordinates($maxHeight);
			
			$systemInformationArray[$systemCountIterator]['X'] = $coordArray['x'];
			$systemInformationArray[$systemCountIterator]['Y'] = $coordArray['y'];
			
			$coinFlip = rand(1, 2);
			
			if($coinFlip == 1) {
				$systemInformationArray[$systemCountIterator]['Z'] = $coordArray2['y'];
			} else {
				$systemInformationArray[$systemCountIterator]['Z'] = $coordArray2['x'];
			}
						
			$nebulaRand = rand(0,100);
			
			$cometRand  = rand(0,100);
			
			if($nebulaRand < 4) {
				$systemInformationArray[$systemCountIterator]['nebula'] = true;
				$systemInformationArray[$systemCountIterator]['nebulaName'] = randomNameGenerator();
				$systemInformationArray[$systemCountIterator]['nebulaColor'] =  $nebulaTypes[array_rand($nebulaTypes,1)];
				$systemInformationArray[$systemCountIterator]['nebulaType'] = $nebulaColors[array_rand($nebulaColors,1)];
			} else {
				$systemInformationArray[$systemCountIterator]['nebula'] = false;
			}
			
			if($cometRand < 2) {
				$systemInformationArray[$systemCountIterator]['comet']      =  true;
				$systemInformationArray[$systemCountIterator]['cometOrbit'] = rand(40,120);
				$systemInformationArray[$systemCountIterator]['cometName']  = randomNameGenerator();
				$systemInformationArray[$systemCountIterator]['cometStartingOrbit'] = rand(0,360);
				$systemInformationArray[$systemCountIterator]['cometType']  = $cometTypes[array_rand($cometTypes,1)];
			} else {
				$systemInformationArray[$systemCountIterator]['comet'] = false;
			}
			
			$planetCount = rand(0, 12);
			
			$systemInformationArray[$systemCountIterator]['planets'] = array();
			
			$orbitalDistance = 0;
			
			if($planetCount > 0) {

				do {
					
					$orbitalDistance = $orbitalDistance + rand(1,2);
					
					$systemInformationArray[$systemCountIterator]['planets'][$planetCount] = array();
					$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['orbit']         = $orbitalDistance;
					$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['orbitalSpeed']  = (200 * $orbitalDistance) - rand(0,84); 
					$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['startingOrbit'] = rand(0,360);
					$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['rotation'] = rand(0,84);
					$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['name'] = randomNameGenerator();
					$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['type'] = $planetTypes[array_rand($planetTypes,1)];
					
					
					$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['moons'] = array();
					
					$moonRand1 = rand(0,100);
					$moonRand2 = rand(0,100);
					
					if($moonRand1 > 60) {
						$orbitalDistance = rand(1,10);
						
						$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['moons'][1] = array();
						$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['moons'][1]['orbit'] = $orbitalDistance;
						$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['moons'][1]['startingOrbit'] = rand(0,360);
						$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['moons'][1]['orbitalSpeed']  = (200 * $orbitalDistance) - rand(0,84);
						$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['moons'][1]['rotation'] = rand(0,84);
						$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['moons'][1]['name'] = randomNameGenerator();
					}
					
					if($moonRand2 > 90) {
						$orbitalDistance = rand(1,10);
						
						$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['moons'][2] = array();
						$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['moons'][2]['orbit'] = $orbitalDistance;
						$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['moons'][2]['startingOrbit'] = rand(0,360);
						$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['moons'][2]['orbitalSpeed']  = (200 * $orbitalDistance) - rand(0,84);
						$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['moons'][2]['rotation'] = rand(0,84);
						$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['moons'][2]['name'] = randomNameGenerator();
					}
					
					if($moonRand1 > 95) {
						$orbitalDistance = rand(1,10);
						
						$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['moons'][3] = array();
						$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['moons'][3]['orbit'] = $orbitalDistance;
						$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['moons'][3]['startingOrbit'] = rand(0,360);
						$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['moons'][3]['orbitalSpeed']  = (200 * $orbitalDistance) - rand(0,84);
						$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['moons'][3]['rotation'] = rand(0,84);
						$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['moons'][3]['name'] = randomNameGenerator();
					}
					
					if($moonRand2 > 96) {
						$orbitalDistance = rand(1,10);
						
						$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['moons'][4] = array();
						$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['moons'][4]['orbit'] = $orbitalDistance;
						$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['moons'][4]['startingOrbit'] = rand(0,360);
						$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['moons'][4]['orbitalSpeed']  = (200 * $orbitalDistance) - rand(0,84);
						$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['moons'][4]['rotation'] = rand(0,84);
						$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['moons'][4]['name'] = randomNameGenerator();
					}
					
					if($moonRand1 > 99) {
						$orbitalDistance = rand(1,10);
						
						$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['moons'][5] = array();
						$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['moons'][5]['orbit'] = $orbitalDistance;
						$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['moons'][5]['startingOrbit'] = rand(0,360);
						$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['moons'][5]['orbitalSpeed']  = (200 * $orbitalDistance) - rand(0,84);
						$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['moons'][5]['rotation'] = rand(0,84);
						$systemInformationArray[$systemCountIterator]['planets'][$planetCount]['moons'][5]['name'] = randomNameGenerator();
					}
					
					$planetCount = $planetCount - 1;
				} while($planetCount > 0);
				
			}
			
			$asteroidRand = rand(0,100);
			
			if($asteroidRand < 75) {
				$systemInformationArray[$systemCountIterator]['asteroids']['count'] = rand(200,700);
				$systemInformationArray[$systemCountIterator]['asteroids']['orbit'] = rand(1,30);
			} else {
				$systemInformationArray[$systemCountIterator]['asteroids']['count'] = 0;
			}
			
			$systemCountIterator = $systemCountIterator - 1;
			
		} while($systemCountIterator > 0);
		
		$_SESSION['universeData'] = $systemInformationArray;
		
	} else {
		$systemCount = 200;
	}
	
	if($systemCount < 200) {
		$systemDisplayCount = 200;
	} else {
		$systemDisplayCount = $systemCount;
	}
	
	echo '<form action="http://127.0.0.1:8888/universe/generator.php" method="post" accept-charset="ISO-8859-1" name="registration" id="registration">';
	echo 'Size: <input name="galaxySize" id="galaxySize" type="number" value="' . $systemDisplayCount . '">';
	echo '<input name="submit" id="submit" type="submit" value="submit"><br/>';
	echo '</form>';
	
	echo '<b>Side View:</b>';
	echo '<div id="galaxySideView" style="height: 400px; width: 700px;border: solid 1px black;background-color: #010101;">';

	if(isset($_POST['submit'])) {

		$systemCountSideIterator = $systemCount;
		
		do {
		
			$system = $systemInformationArray[$systemCountSideIterator];
		
			$system['X'] = $system['X'] + 325;
			$system['Z'] = $system['Z'] + 250;
		
			echo '<div style="height: 1px; width: 1px;background-color: #FF0000;position: absolute;top: ' . $system['Z'] . 'px;left: ' . $system['X'] . 'px;display: block;"></div>';
		
			$systemCountSideIterator = $systemCountSideIterator - 1;
		
		} while($systemCountSideIterator > 0);
		
	} else {
		echo '<font style="#FFFFFF">(Awaiting Data)</font>';
	}
	
	echo '</div><br/><br/>';
	
	echo '<b>Top View:</b>';
	echo '<div id="galaxyTopView" style="height: 400px; width: 700px;border: solid 1px black;background-color: #010101;">';
	
	$systemCountTopIterator = $systemCount;

	if(isset($_POST['submit'])) {
	
		do { 
			
			$system = $systemInformationArray[$systemCountTopIterator];
			
			$system['X'] = $system['X'] + 325;
			$system['Y'] = $system['Y'] + 685;
	
			echo '<div style="height: 1px; width: 1px;background-color: #FF0000;position: absolute;top: ' . $system['Y'] . 'px;left: ' . $system['X'] . 'px;display: block;"></div>';
			
			$systemCountTopIterator = $systemCountTopIterator - 1;
			
		} while($systemCountTopIterator > 0);
		

	} else {
		echo '<font style="#FFFFFF">(Awaiting Data)</font>';
	}
		
	echo '</div>';
	
	echo '<div id="galaxyDetailView" style="height: 862px; width: 700px;border: solid 1px black;position: absolute;top: 62px;left: 720px;">';
	
	echo '<iframe name="systemDetails" id="systemDetails" style="height: 100%; width: 100%;" src="generator.php?system=true"></iframe>';
	
	echo '</div>';
	
?>