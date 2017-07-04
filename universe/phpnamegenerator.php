<?php 

	function randomNameGenerator() {
		$name = null;
	
		function randVowel() {
			$vowels     = array("a","e","i","o","u");
			
			return $vowels[array_rand($vowels,1)];
		}
	
		function randConsonants() {
			$consonants = array("b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","x","z");
		
			return $consonants[array_rand($consonants,1)];
		}
		
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
	
		return $name;
	}
	
	echo randomNameGenerator();
?>

