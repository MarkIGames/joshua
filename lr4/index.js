	$(function() {
   
		// This controls the glow interval for the PLAY NOW button
		setInterval(function(){
				var glow = $('.playButton');
				glow.hasClass('glow') ? glow.removeClass('glow') : glow.addClass('glow');
			}, 2000);		
	});// End our On Ready Call