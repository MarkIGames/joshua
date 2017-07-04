var server       = "192.168.1.83";
var gameId       = 0;
var maxFuel               = 4400000; // Maximum fuel load
var curFuel               = 4400000; // Starting Fuel
var fuelLoss              = 100;     // Thruster Fuel Loss            
var messageCount    	  = 0;       // I don't know what this is
var sweep             	  = null;    // Radar Sweep
var range             	  = null;    // Radar Range
var mode              	  = null;    // Radar mode
var shipList         	  = {};      // Object holding ship and bullet Objects
var playerList       	  = {};      // Object holding ship and bullet Objects
var shipCount        	  = 0;       // Integar for tracking number of ships
var activeShipNumber 	  = 0;       // Integar for tracking number of ships
var setupGameBool         = false;   // Boolean variable for initial setup
var gameSpeed        	  = 50;      // Integar for standard game speed
var updateSpeed      	  = 50;      // Integar for standard game speed
var socket           	  = {};      // Empty object to avoid errors until it loads
var connectionAttempts    = -1;      // How many connection attempts we've made
var maxConnectionAttempts = 5;       // Connection variable, number of attempts to make
var connectionSleepTimer  = 30;      // Connection variable for time to wait 
var alertSent             = false;   // Tracking if alert has been set to abandon connection attempt
var activeObject          = null;    // Currently targeted object
var fuelCounter      	  = 0;       // Interval counter for main game loop
var intervalTime     	  = 0;       // Interval counter for main game loop
var angleMod              = -1.7;    // Angle offset to make ship face the right way
var fuelState             = false;   // Tracking state for refueling 

var shipId = 1138;

$(function() {
	
	$( window ).unload(function() {
	  return "Handler for .unload() called.";
	});
	
	// On keydown event...
	$(window).keyup(function(event) {
			// If key is TAB...
			if(event.keyCode == 9) { 
				// Stop it from tabbing through things
				event.preventDefault();
				$('#activePlayerList').css('display','none');
			}
	});
	
	$(window).keydown(function(event) {
		// If key is TAB...
		if(event.keyCode == 9) { 
			// Stop it from tabbing through things
			event.preventDefault();
			
			$('.newPlayer').remove();
			
			var details = details + '<tr class="newPlayer">' +
									'<td class="playerTableValue">' + shipList['' + shipId + ''].owner + '</td>' + 
								  	'<td class="playerTableValue">' + shipList['' + shipId + ''].displayName + '</td>' + 
									'<td class="playerTableValue">' + shipList['' + shipId + ''].type + '</td>' + 
									'<td class="playerTableValue">' + shipList['' + shipId + ''].hull + '</td>' + 
									
									'<td class="playerTableValue">--------</td>' + 
									'<td class="playerTableValue">--------</td>' +
									
									'<td class="playerTableValue">' + shipList['' + shipId + ''].heading  + '</td>' + 
									'<td class="playerTableValue">' + parseFloat(shipList['' + shipId + ''].speed)  + '</td>' +
								  '</tr>'; 				
			
			for (var key in playerList) {
				if(playerList[key].owner != 'server') {
					var range   = 0;
					var heading = 0;
					heading = parseInt(heading);
					range   = parseInt(range);
					
					details = details + '<tr class="newPlayer">' +
									'<td class="playerTableValue">' + playerList[key].owner + '</td>' + 
								  	'<td class="playerTableValue">' + playerList[key].displayName + '</td>' + 
									'<td class="playerTableValue">' + playerList[key].type + '</td>' + 
									'<td class="playerTableValue">' + playerList[key].hull + '</td>' + 
									
									'<td class="playerTableValue">' + range + '</td>' + 
									'<td class="playerTableValue">' + heading + '</td>' + 
									
									
									'<td class="playerTableValue">' + playerList[key].heading  + '</td>' + 
									'<td class="playerTableValue">' + parseFloat(playerList[key].speed)  + '</td>' +
								  '</tr>';
				}
			}
			
			$('#playerTable').append(details);
			
			$('#activePlayerList').css('display','block');
		}
	});
	
	//startGame();
	
	setupGame();
});

function moveShip() {
	if(speedState > 1) {
		var lostFuel = (fuelLoss * ((speedState - 1) / 2));
	} else {
		var lostFuel = fuelLoss;
	}
	curFuel = curFuel - lostFuel;
	
	shipList['' + shipId + ''].x = camera.position.x;
	shipList['' + shipId + ''].y = camera.position.y;
	shipList['' + shipId + ''].z = camera.position.z;
	
	shipList['' + shipId + ''].rotx = camera.rotation.x;
	shipList['' + shipId + ''].roty = camera.rotation.y;
	shipList['' + shipId + ''].rotz = camera.rotation.z;
}

function updateMyDetails() {
	shipList['' + shipId + ''].x = camera.position.x;
	shipList['' + shipId + ''].y = camera.position.y;
	shipList['' + shipId + ''].z = camera.position.z;
	
	shipList['' + shipId + ''].rotx = camera.rotation.x;
	shipList['' + shipId + ''].roty = camera.rotation.y;
	shipList['' + shipId + ''].rotz = camera.rotation.z;	
	
	var txt = shipList['' + shipId + ''];
	
	socket.emit('emit_player_data', txt, function (data){
		// Success
    });
}

function connectToServer() {
	socket = loadSocketFiles();
	
	return socket;
}

function loadSocketFiles() {
	try {
		var imported = document.createElement('script');
		imported.src = 'http://' + server + ':8000/socket.io/lib/socket.io.js';
		document.head.addEventListener('error', function( e ){
			if(alertSent == false) {
				alertSent = true;
				alert('Server is unavailable at this time. Returning to the login page.');
			}
			location.href='../';
		}, true);
		
		document.head.appendChild(imported);
	} catch (err) {

	}

	socket = finishConnection();
	
	return socket;
}

function finishConnection() {
	if(typeof io == "undefined") {

	} else {
		var conn_options = {
		  'sync disconnect on unload':false
		};
	
		socket = io.connect('http://' + server + ':8000', conn_options);
		
		socket.on('connect_error', function(err) {
			  alert('Failed');
		});
		return socket;
	}
}

function dieNow() {
	// Do nothing.
}

function returnAndDie() {
    location.href='../';
    return false;
}

function setupGame() {
	$('#shipId').html(shipId);
	// Create an object called ship1
	var ship1 = {};
		ship1['id']             = shipId;       // Ship ID
		ship1['displayName']    = 'Athena ' + shipId;     // Ship Name
		ship1['name']           = 'playerShip'; // Object Name
		ship1['type']           = 'Pegasus';     // Object Type
		ship1['otype']          = 'ship';		// Object Type
		ship1['hull']           = 100;          // Ship Health (100)
		ship1['heading']        = 0;	    // Object Heading
		ship1['rawheading']     = 0;	    // Object Heading
		ship1['speed']          = 0;            // Object Speed
		ship1['x']              = camera.position.x;	    // Object X Location
		ship1['y']              = camera.position.y;        // Object Y Location
		ship1['z']              = camera.position.z;        // Object Y Location
		
		ship1['rotx']           = camera.position.rotx;	    // Object X Location
		ship1['roty']           = camera.position.roty;        // Object Y Location
		ship1['rotz']           = camera.position.rotz;        // Object Y Location
		
		ship1['origin']         = 'ship1';      // Object Creator
		ship1['checked']        = false;        // Object Collision Checking Flag
	
		ship1['shipid']         = shipId;       // Set the Width
		ship1['fuel']		    = 4400000;     // Ships fuel
		ship1['faction']		= 0;            // Ships faction
		
		// Radar Settings
		ship1['sweep']          = sweep;        // Radar Sweep Arc
		ship1['range']          = range;        // Radar Range
		ship1['mode']           = mode;         // Radar Mode
		
		
	// Add ship1 to the ship list
	shipList['' + shipId + ''] = ship1;
	// Update the ship count
	shipCount = shipCount + 1;	

	//setupSockets();
	
	// Flag our game as setup to avoid looping
	setupGameBool = true;
}

function setupSockets() {
	token = {};
	token.name = shipList[shipId]['displayName'];
	token.game = 0;
	token.ship = shipList[shipId]['id'];
	
	socket = connectToServer();
	
	// Create a new socket connection
	socket.on('connect', function() {
		socket.emit('set token', token);
	});	
	
	socket.on('disconnect', function(){
		alert('Server Disconnected!');
		location.href='../';
	});
	
	socket.on('alert_message', function( message ){
		alert( message );
	});

	socket.on('transfer_fuel', function (data) {
		if(data.target == shipId) {
			shipList[shipId].fuel = data.amount;
		}
	});	
	
	// on every message recived we print the new datas inside the #broadcast-msg div
	socket.on('broadcast_msg', function (data) {
		var msg = '<li>' + data + '</li>';
		if(messageCount > 4) {
		$('ul#broadcast-msg li:first').remove();
		}
		$('#broadcast-msg').append(msg);
		
		messageCount = messageCount + 1;
	});
	
	socket.on('emit_wide_delete', function ( data ) { 
		if(data.shipid == shipId) {
			location.reload();
		}

		if(shipList['' + data.shipid + ''] != undefined && shipList['' + data.shipid + ''].type != 'bullet') {
			if($('.targetBox #' + data.shipid).length > 0) { $('.targetBox #' + data.shipid).remove(); }
		}
		
		delete shipList['' + data.shipid + ''];
		
		if(data.shipid == activeObject) {resetDetails();}
	});
		
	socket.on('disconnect_action', function (data) {
		removeShip( data );
	}); 	

	socket.on('broadcast_data', function (data) {
		processData( data );
	});
	
	socket.on('broadcast_newship', function (data) {
		toggleDoors();
		doorSetting = setTimeout(function(){toggleDoors()},3000);
	});	
	
	socket.on('broadcast_friendly_ships', function (data) {
		processFriendlyShips( data );
	});

	var userShip = shipList['' + shipId + ''];

	socket.emit('emit_player_data', userShip, function (data){
		// Success
    });	
}

function mainGameLoop() {	
	// If our game is not set up...
	if(setupGameBool == false) {
		// Trigger the load function
		setupGame();
	}
	
	if(activeObject != null) {
		updateDetails();
	}	

	if(fuelState == true && curFuel < maxFuel) {
		refuelShip();
	}
	
	checkProbes();
	
	checkDocking();
	
	updateFuel();

	runRadarDetection();
	
	updateHud();
	
	updateMyDetails();
	
	intervalTime = intervalTime + 1;
}

function refuelShip() {
	curFuel = curFuel + (fuelLoss * 8);
	
	if(curFuel > maxFuel) {
		curFuel = maxFuel;
	}
	
	shipList['' + shipId + ''].fuel = curFuel;
}

function startGame() {
	gameLoop = setInterval("mainGameLoop()", updateSpeed);
}	

function processData( data ) {
	for (var key1 in data) {
		if(data[key1].shipid == shipId) {
			shipList[key1].x          = parseFloat(data[key1].x);
			shipList[key1].y          = parseFloat(data[key1].y);
		} 
		if((data[key1].otype == 'ship' || data[key1].otype == 'squadron') && key1 != shipId) {
			var newShip = true;
			for (var key2 in shipList) {
				if(data[key1].shipid == shipList[key2].shipid) {
					newShip = false;
				} 
			}

			if(newShip == true) {
				if(shipObject != undefined) {
					var  newShipId = data[key1].shipid;
					
					shipList[newShipId] = data[key1];
					
					shipList[newShipId].object = shipObject.clone();
					
					shipList[newShipId].object.position.x = parseFloat(data[key1].x);
					shipList[newShipId].object.position.y = parseFloat(data[key1].y);
					shipList[newShipId].object.position.z = parseFloat(data[key1].z);
					
					shipList[newShipId].object.name = 'ship_' + key1;
					
					// Add new ship here...
					scene.add( shipList[newShipId].object );
	
					shipCount = shipCount + 1;
				}
			} else {
				shipList[key1].rawheading = parseFloat(data[key1].rawheading);
				shipList[key1].heading    = parseFloat(data[key1].heading);
				shipList[key1].speed      = parseFloat(data[key1].speed);
				
				moveServerShip(shipList[key1], data[key1]);
				
				shipList[key1].hull       = parseFloat(data[key1].hull);
				shipList[key1].orderset   = parseFloat(data[key1].orderset);
				
				shipList[key1].sweep      = parseFloat(data[key1].sweep);
				shipList[key1].range      = parseFloat(data[key1].range);
				shipList[key1].mode       = parseFloat(data[key1].mode);
				shipList[key1].bonus      = parseFloat(data[key1].bonus);				
			}
		}		
	}
}

function moveServerShip( oldShip, newShip ) {
	var xSpeed = 0;
	var ySpeed = 0;
	var zSpeed = 0;
	
	if(Math.round(parseFloat(oldShip.x)) != Math.round(parseFloat(newShip.x))) {
		xSpeed = 0.00001;
	}
	if(Math.round(parseFloat(oldShip.y)) != Math.round(parseFloat(newShip.y))) {
		ySpeed = 0.00001;
	}
	if(Math.round(parseFloat(oldShip.z)) != Math.round(parseFloat(newShip.z))) {
		zSpeed = 0.00001;
	}				

	var newX = parseFloat(newShip.x) - parseFloat(oldShip.x);
	var newY = parseFloat(newShip.y) - parseFloat(oldShip.y);
	var newZ = parseFloat(newShip.z) - parseFloat(oldShip.z);
	
	oldShip.x = parseFloat(newShip.x);
	oldShip.y = parseFloat(newShip.y);
	oldShip.z = parseFloat(newShip.z);				
	
	var direction = new THREE.Vector3(newX, newY, newZ);
	var vector = direction.clone().multiplyScalar(xSpeed, ySpeed, zSpeed);
	
	oldShip.object.rotation.x = newShip.rotx;
	oldShip.object.rotation.y = newShip.roty * angleMod;
	oldShip.object.rotation.z = newShip.rotz;
	
	if(xSpeed > 0 || ySpeed > 0 || zSpeed > 0) {
		oldShip.object.position.add(direction);
	}
}

function removeShip( shipToRemove ) {
	var selectedObject = scene.getObjectByName('ship_' + shipToRemove);
	
    scene.remove( selectedObject );
	
	delete shipList[shipToRemove];
	
	shipCount = shipCount - 1;
}

function changeSpeedMode( direction ) {
	if(direction == 'up' && speedState != 5) {
		speedState += 2;
	}
	if(direction == 'down' && speedState != 1) {
		speedState -= 2;
	}
}