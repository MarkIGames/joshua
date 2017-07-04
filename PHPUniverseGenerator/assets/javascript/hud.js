var speedState = 1;       // Tracking speed state

function updateHud() {
	updateFuel();
}

function activateHudElement( element ) {
	$(element).addClass('activeElement');
}

function deActivateHudElement( element ) {
	$(element).removeClass('activeElement');
}

function updateFuel() {
	var newFuel = curFuel / maxFuel;
	
	$('#fuelValue').html(Math.round(newFuel * 100) + '%');
	$('#fuelCount').html(curFuel);
}

function checkDocking() {
	if(issObject != undefined) {
		var distance1 = distanceVector( camera.position, issObject.position );
	}
	
	if(mirObject != undefined) {
		var distance2 = distanceVector( camera.position, mirObject.position );
	}

	$('#dockOptionValue').html('DOCK');

	if(distance1 < 1000 || distance2 < 1300) {
		activateHudElement( $('#dockOptionHolder') );
		
		$('#dockOptionValue').html('DOCK');
		$('#dockOptionValue').addClass('dockOptionValue2');
		$('#dockOptionValue').removeClass('dockOptionValue1');
	} else {
		deActivateHudElement( $('#dockOptionHolder') );

		$('#dockOptionValue').html('NO-DOCK');
		$('#dockOptionValue').addClass('dockOptionValue1');
		$('#dockOptionValue').removeClass('dockOptionValue2');
	}
}

function checkProbes() {
	var object = findClosestProbe();
	
	if(object != undefined) {
		var distance = distanceVector( camera.position, object.position );
	
		$('#probeDistanceValue').html(Math.round(distance));
		
		if(distance < 1000) {
			activateHudElement( $('#probeDistanceValueHolder') );
			fuelState = true;
		} else {
			deActivateHudElement( $('#probeDistanceValueHolder') );
			fuelState = false;
		}
		
		if(fuelState == true && curFuel < maxFuel) {
			displayRefueling()
		}
	}
}

function displayRefueling() {
	$('#probeDistanceValue').html('REFUELING');
}

function findClosestProbe() {
	var probeArray = {};
	
	if(aimObject1 != undefined) {
	    var distance1 = distanceVector( camera.position, aimObject1.position );
	    probeArray[distance1] = aimObject1;
	}
	
	if(aimObject2 != undefined) {
		var distance2 = distanceVector( camera.position, aimObject2.position );
		probeArray[distance2] = aimObject2;
	}
	
	if(aimObject3 != undefined) {
		var distance3 = distanceVector( camera.position, aimObject3.position );
		probeArray[distance3] = aimObject3;
	}
	
	if(aimObject4 != undefined) {
		var distance4 = distanceVector( camera.position, aimObject4.position );
		probeArray[distance4] = aimObject4;
	}
	
	var closest = Math.min(distance1,distance2,distance3,distance4);
	
	return probeArray[closest];
}

function checkClosestProbe() {
	
}

function changeSpeedMode( direction ) {
	if(direction == 'up' && speedState != 5) {
		speedState += 2;
	}
	if(direction == 'down' && speedState != 1) {
		speedState -= 2;
	}
	
	if(speedState == 1) {
		$('#speedOptionValue').html('SLOW');
		$('#speedOptionValue').addClass('speedOptionValue1');
		$('#speedOptionValue').removeClass('speedOptionValue2');
	}
	if(speedState == 3) {
		$('#speedOptionValue').html('MED');
		$('#speedOptionValue').addClass('speedOptionValue2');
		$('#speedOptionValue').removeClass('speedOptionValue1');
	}
	if(speedState == 5) {
		$('#speedOptionValue').html('FAST');
		$('#speedOptionValue').addClass('speedOptionValue1');
		$('#speedOptionValue').removeClass('speedOptionValue2');
	}	

}