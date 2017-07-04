var loader = new THREE.AssimpJSONLoader();

var mirObject;
var issObject;

loader.load( 'assets/models/mir.json', function ( object ) {
	object.scale.multiplyScalar( 2 );
	
	object.position.z = (radius * 2) * -1;
	object.position.x = (radius * 10) * -1;
	object.name = 'Mir Station';
	
	//object.children[0].geometry.computeBoundingSphere();

	object.updateMatrixWorld( true );
	
	mirObject = object;
	
	scene.add( mirObject );
});

loader.load( 'assets/models/iss.json', function ( object ) {
	object.scale.multiplyScalar( 800 );
	
	object.position.z = (radius * 5) * -1;
	object.position.x = (radius * 10) * -1;
	object.name = 'ISS';
	
	for (var prop in object.children[0].children) {
		var obj = object.children[0].children[prop];
		
        // skip loop if the property is from prototype
        if(!obj.hasOwnProperty(prop)) {
        	obj.geometry.computeBoundingSphere();
        }
    }
	
	// Add to our world object list to iterate over
	addWorldObject(object.name, object.children[0].children[0]);
	
	object.updateMatrixWorld( true );
	
	issObject = object;
	
	scene.add( issObject );
});

var aimObject1;
var aimObject2;
var aimObject3;
var aimObject4;

loader.load( 'assets/models/aim.json', function ( object ) {
	object.scale.multiplyScalar( 25 );
	
	// Earth Probe
	object.position.z = (radius * 3) * -1;
	object.position.x = (radius * 10) * -1;
	object.name = 'Fuel Pod Alpha';
	
	for (var prop in object.children[0].children) {
		var obj = object.children[0].children[prop];
		
        // skip loop if the property is from prototype
        if(!obj.hasOwnProperty(prop)) {
        	obj.geometry.computeBoundingSphere();
        }
    }
	
	// Add to our world object list to iterate over
	addWorldObject(object.name, object.children[0].children[0]);
	
	object.updateMatrixWorld( true );
	
	//object.computeBoundingSphere();
	aimObject1 = object;
	
	scene.add( aimObject1 );
});

loader.load( 'assets/models/aim.json', function ( object ) {
	object.scale.multiplyScalar( 25 );
	
	// Neptune Probe
	object.position.z += 1187600 + (radius * 10);
	object.position.x -= 2238600 + (radius * 10);
	object.name = 'Fuel Pod Bravo';
	
	for (var prop in object.children[0].children) {
		var obj = object.children[0].children[prop];
		
        // skip loop if the property is from prototype
        if(!obj.hasOwnProperty(prop)) {
        	obj.geometry.computeBoundingSphere();
        }
    }
	
	// Add to our world object list to iterate over
	addWorldObject(object.name, object.children[0].children[0]);
	
	object.updateMatrixWorld( true );
	
	aimObject2 = object;
	
	scene.add( aimObject2 );
});

loader.load( 'assets/models/aim.json', function ( object ) {
	object.scale.multiplyScalar( 25 );
	
	// Venus Probe
	object.position.z -= 18600 + (radius * 2);
	object.position.x += 238600 + (radius * 2);
	object.name = 'Fuel Pod Charlie';
	
	for (var prop in object.children[0].children) {
		var obj = object.children[0].children[prop];
		
        // skip loop if the property is from prototype
        if(!obj.hasOwnProperty(prop)) {
        	obj.geometry.computeBoundingSphere();
        }
    }
	
	// Add to our world object list to iterate over
	addWorldObject(object.name, object.children[0].children[0]);
	
	object.updateMatrixWorld( true );
	
	//object.computeBoundingSphere();
	aimObject3 = object;
	
	scene.add( aimObject3 );
});

loader.load( 'assets/models/aim.json', function ( object ) {
	object.scale.multiplyScalar( 25 );
	
	// Jupiter Probe
	object.position.z += 22229600 + (radius * 23);
	object.position.x -= 22229600 + (radius * 23);
	object.name = 'Fuel Pod Delta';

	for (var prop in object.children[0].children) {
		var obj = object.children[0].children[prop];
		
        // skip loop if the property is from prototype
        if(!obj.hasOwnProperty(prop)) {
        	obj.geometry.computeBoundingSphere();
        }
    }
	
	// Add to our world object list to iterate over
	addWorldObject(object.name, object.children[0].children[0]);
	
	object.updateMatrixWorld( true );
	
	//object.computeBoundingSphere();
	aimObject4 = object;
	
	scene.add( aimObject4 );
});