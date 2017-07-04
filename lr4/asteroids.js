var asteroidCounter = 0;	
var maxAsteroids    = 50;
var asteroidUid     = 0;

	$(function() {
		moveAsteroids();

		setInterval(moveAsteroids, 2000);
	});// End our On Ready Call
	
	function animationLoop() {
		var intervalLoop = getRandomArbitrary();
	}
	
	function spawnRandomAsteroid() {
		var type = 'rock' + getRandomNumber(1,6);
		
		console.log(type);
		
		var top = getRandomNumber(0,400);
		
		var rotation = getRandomNumber(0, 360);
		
		$('#asteroidField').html($('#asteroidField').html() + '<div id="asteroid' + asteroidUid + '" class="asteroid ' + type + '" style="top: ' + top + 'px;"></div>');
		
		$('#asteroid' + asteroidUid).rotate(rotation);
		
		var offset = getRandomNumber(10,100);
		
		$('#asteroid' + asteroidUid).css('marginLeft', '+=' + offset + 'px');
		
		$('#asteroid' + asteroidUid).stop().animate({
			'marginLeft' : "+=30px"
		}, 2100, "linear");
		
		asteroidCounter = asteroidCounter + 1;
		asteroidUid     = asteroidUid + 1;
	}
	
	function moveAsteroids() {
		if(asteroidCounter < maxAsteroids) {
			var ranNum = getRandomNumber(1,5);
			
			console.log(ranNum);
			
			spawnRandomAsteroid();
			spawnRandomAsteroid();
		}
		
		$('.asteroid').each(function() {
			if(parseInt($(this).css('margin-left')) >  $( window ).width()) {
				$(this).remove();
				asteroidCounter = asteroidCounter - 1;
			} else {
				$(this).stop().animate({
					'marginLeft' : "+=100px"
				}, 2100, "linear");
			}
		});
	}
	
	function getRandomNumber(max, min) {
	    return parseInt(Math.random() * (max - min) + min);
	}
	
	function randomRotation() {}
	
	jQuery.fn.rotate = function(degrees) {
	    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
	                 '-moz-transform' : 'rotate('+ degrees +'deg)',
	                 '-ms-transform' : 'rotate('+ degrees +'deg)',
	                 'transform' : 'rotate('+ degrees +'deg)'});
	    return $(this);
	};