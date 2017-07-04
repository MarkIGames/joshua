function buildPlanets( jsonObject ) {
	// Sun
		var sunMap = new THREE.MeshPhongMaterial( {
			specular: 0x333333,
			shininess: 50,
			//map: textureLoader.load( "assets/images/sun.jpg" ),
			normalScale: new THREE.Vector2( 0.85, 0.85 )
		} );
		
		sunGeo = new THREE.SphereGeometry( (radius * 100), 100, 50 );
		sunMesh = new THREE.Mesh( sunGeo, sunMap );
		sunMesh.rotation.y = 0;
		sunMesh.rotation.z = tilt;
		sunMesh.position.z -= 3129600;
		//meshPlanet3.position.x -= 1129600;
		
		sunMesh.geometry.computeBoundingSphere();
		
		sunMesh.name = 'Sun';
		
		// Add to our world object list to iterate over
		addWorldObject(sunMesh.name, sunMesh);
		
		scene.add( sunMesh );
	
	// Mercury
		var mercuryMap = new THREE.MeshPhongMaterial( {
			specular: 0x333333,
			shininess: 0.5,
			//map: textureLoader.load( "assets/images/mercury.jpg" ),
		} );
		
		mercuryGeo = new THREE.SphereGeometry( (radius * .38), 200, 50 );
		mercuryMesh = new THREE.Mesh( mercuryGeo, mercuryMap );
		mercuryMesh.rotation.y = 0;
		mercuryMesh.rotation.z = tilt;
		mercuryMesh.position.z -= 32200;
		mercuryMesh.position.x += 19200;
		
		mercuryMesh.geometry.computeBoundingSphere();
		
		mercuryMesh.name = 'Mercury';
		
		// Add to our world object list to iterate over
		addWorldObject(mercuryMesh.name, mercuryMesh);
		
		scene.add( mercuryMesh );		
		
	// Venus
		var venusMap = new THREE.MeshPhongMaterial( {
			specular: 0x333333,
			shininess: 0.5,
			//map: textureLoader.load( "assets/images/venus.jpg" ),
		} );
		
		venusGeo = new THREE.SphereGeometry( (radius * .95), 100, 50 );
		venusMesh = new THREE.Mesh( venusGeo, venusMap );
		venusMesh.rotation.y = 0;
		venusMesh.rotation.z = tilt;
		venusMesh.position.z -= 18600;
		venusMesh.position.x += 229600;
		
		venusMesh.geometry.computeBoundingSphere();
		
		venusMesh.name = 'Venus';
		
		// Add to our world object list to iterate over
		addWorldObject(venusMesh.name, venusMesh);
		
		scene.add( venusMesh );		
		
		// Venus Clouds
			var venusClouds = new THREE.MeshLambertMaterial( {
				//map: textureLoader.load( "assets/images/venusClouds.png" ),
				transparent: true
			} );
			
			venusCloudMesh = new THREE.Mesh( venusGeo, venusClouds );
			venusCloudMesh.scale.set( cloudsScale, cloudsScale, cloudsScale );
			venusCloudMesh.rotation.z = tilt;
			venusCloudMesh.position.z -= 18600;
			venusCloudMesh.position.x += 229600;
			
			venusCloudMesh.name = 'VenusClouds';
			
			scene.add( venusCloudMesh );		
		
	// Earth
		var earthMap = new THREE.MeshPhongMaterial( {
			specular: 0x333333,
			shininess: 0.5,
			//map: textureLoader.load( "assets/images/earth_atmos_2048.jpg" ),
			//specularMap: textureLoader.load( "assets/images/earth_specular_2048.jpg" ),
			//normalMap: textureLoader.load( "assets/images/earth_normal_2048.jpg" ),
			normalScale: new THREE.Vector2( 0.85, 0.85 )
		} );		
		
		earthGeo = new THREE.SphereGeometry( radius, 100, 50 );
		earthMesh = new THREE.Mesh( earthGeo, earthMap );
		earthMesh.rotation.y = 0;
		earthMesh.rotation.z = tilt;
	
		earthMesh.geometry.computeBoundingSphere();
		
		earthMesh.name = 'Earth';
		
		// Add to our world object list to iterate over
		addWorldObject(earthMesh.name, earthMesh);
		
		scene.add( earthMesh );
		
		// Earth clouds
		var earthClouds = new THREE.MeshLambertMaterial( {
			//map: textureLoader.load( "assets/images/earth_clouds_1024.png" ),
			transparent: true
		} );
		
		earthCloudMesh = new THREE.Mesh( earthGeo, earthClouds );
		earthCloudMesh.scale.set( cloudsScale, cloudsScale, cloudsScale );
		earthCloudMesh.rotation.z = tilt;
		
		earthCloudMesh.name = 'EarthClouds';
		
		scene.add( earthCloudMesh );
		
		// Moon
			var materialMoon = new THREE.MeshPhongMaterial( {
				shininess: 0.2,
				//map: textureLoader.load( "assets/images/moon.jpg" )
			} );
			
			meshMoon = new THREE.Mesh( geometry, materialMoon );
			meshMoon.position.set( radius * 5, 0, 0 );
			meshMoon.scale.set( moonScale, moonScale, moonScale );
			
			meshMoon.name = 'Moon';
			
			scene.add( meshMoon );		
		
	// Mars
		var marsMap = new THREE.MeshPhongMaterial( {
			specular: 0x333333,
			shininess: 0.5,
			//map: textureLoader.load( "assets/images/mars.jpg" ),
			normalScale: new THREE.Vector2( 0.85, 0.85 )
		} );
		
		marsGeo = new THREE.SphereGeometry( (radius * 1.05), 100, 50 );
		marsMesh = new THREE.Mesh( marsGeo, marsMap );
		marsMesh.rotation.y = 0;
		marsMesh.rotation.z = tilt;
		marsMesh.position.z += 14600;
		marsMesh.position.x -= 9600;
		
		marsMesh.geometry.computeBoundingSphere();
		
		marsMesh.name = 'Mars';
		
		// Add to our world object list to iterate over
		addWorldObject(marsMesh.name, marsMesh);
		
		scene.add( marsMesh );
	
		// Mars Clouds
			var marsClouds = new THREE.MeshLambertMaterial( {
				//map: textureLoader.load( "assets/images/earth_clouds_2048.png" ),
				transparent: true
			} );
			
			marsCloudMesh = new THREE.Mesh( marsGeo, marsClouds );
			marsCloudMesh.scale.set( cloudsScale, cloudsScale, cloudsScale );
			marsCloudMesh.rotation.z = tilt;
			marsCloudMesh.position.z += 14600;
			marsCloudMesh.position.x -= 9600;
			
			marsCloudMesh.name = 'MarsClouds';
			
			scene.add( marsCloudMesh );
			
	// Jupiter
		var jupiterMap = new THREE.MeshPhongMaterial( {
			specular: 0x333333,
			shininess: 0.5,
			//map: textureLoader.load( "assets/images/jupiter.jpg" ),
			normalScale: new THREE.Vector2( 0.85, 0.85 )
		} );
		
		jupiterGeo = new THREE.SphereGeometry( (radius * 22), 100, 50 );
		jupiterMesh = new THREE.Mesh( jupiterGeo, jupiterMap );
		jupiterMesh.rotation.y = 0;
		jupiterMesh.rotation.z = tilt;
		jupiterMesh.position.z += 22229600;
		jupiterMesh.position.x -= 22229600;
		
		jupiterMesh.geometry.computeBoundingSphere();
		
		jupiterMesh.name = 'Jupiter';
		
		// Add to our world object list to iterate over
		addWorldObject(jupiterMesh.name, jupiterMesh);
		
		scene.add( jupiterMesh );		
			
	// Saturn
		var saturnMap = new THREE.MeshPhongMaterial( {
			specular: 0x333333,
			shininess: 0.5,
			//map: textureLoader.load( "assets/images/saturn.jpg" ),
			normalScale: new THREE.Vector2( 0.85, 0.85 )
		} );
		
		saturnGeo = new THREE.SphereGeometry( (radius * 18), 100, 50 );
		saturnMesh = new THREE.Mesh( saturnGeo, saturnMap );
		saturnMesh.rotation.y = 0;
		saturnMesh.rotation.z = tilt;
		saturnMesh.position.z += 538600;
		saturnMesh.position.x -= 238600;
		
		saturnMesh.geometry.computeBoundingSphere();
		
		saturnMesh.name  = 'Saturn';
		saturnMesh.radius = radius * 18;
		saturnMesh.text  = 'This is Saturn. Saturn is a planet. Visit Saturn.<br/>' +
						  'Because Saturn is sometimes nice.';
		
		// Add to our world object list to iterate over
		addWorldObject(saturnMesh.name, saturnMesh);
		
		scene.add( saturnMesh );	
	
	// Uranus
		var uranusMap = new THREE.MeshPhongMaterial( {
			specular: 0x333333,
			shininess: 0.5,
			//map: textureLoader.load( "assets/images/uranus.jpg" ),
			normalScale: new THREE.Vector2( 0.85, 0.85 )
		} );
		
		uranusGeo = new THREE.SphereGeometry( (radius * 10), 100, 50 );
		uranusMesh = new THREE.Mesh( uranusGeo, uranusMap );
		uranusMesh.rotation.y = 0;
		uranusMesh.rotation.z = tilt;
		uranusMesh.position.z += 767600;
		uranusMesh.position.x -= 138600;
		
		uranusMesh.geometry.computeBoundingSphere();
		
		uranusMesh.name = 'Uranus';
		
		// Add to our world object list to iterate over
		addWorldObject(uranusMesh.name, uranusMesh);
		
		scene.add( uranusMesh );	
		
	// Neptune
		var neptuneMap = new THREE.MeshPhongMaterial( {
			specular: 0x333333,
			shininess: 0.5,
			//map: textureLoader.load( "assets/images/neptune.jpg" ),
			normalScale: new THREE.Vector2( 0.85, 0.85 )
		} );
		
		neptuneGeo = new THREE.SphereGeometry( (radius * 9), 100, 50 );
		neptuneMesh = new THREE.Mesh( neptuneGeo, neptuneMap );
		neptuneMesh.rotation.y = 0;
		neptuneMesh.rotation.z = tilt;
		neptuneMesh.position.z += 1187600;
		neptuneMesh.position.x -= 2238600;
		
		neptuneMesh.geometry.computeBoundingSphere();
		
		neptuneMesh.name = 'Neptune';
		
		// Add to our world object list to iterate over
		addWorldObject(neptuneMesh.name, neptuneMesh);
		
		scene.add( neptuneMesh );
			
	// Pluto
		var plutoMap = new THREE.MeshPhongMaterial( {
			specular: 0x333333,
			shininess: 0.5,
			//map: textureLoader.load( "assets/images/pluto.jpg" ),
			normalScale: new THREE.Vector2( 0.85, 0.85 )
		} );
		
		plutoGeo = new THREE.SphereGeometry( (radius * .4), 100, 50 );
		plutoMesh = new THREE.Mesh( plutoGeo, plutoMap );
		plutoMesh.rotation.y = 0;
		plutoMesh.rotation.z = tilt;
		plutoMesh.position.z += 1397600;
		plutoMesh.position.x += 1238600;
		
		plutoMesh.geometry.computeBoundingSphere();
		
		plutoMesh.name = 'Pluto';
		
		// Add to our world object list to iterate over
		addWorldObject(plutoMesh.name, plutoMesh);
		
		scene.add( plutoMesh );

}

function rotatePlanets( delta ) {
	mercuryMesh.rotation.y += (rotationSpeed + 0.01) * delta;
	
	venusMesh.rotation.y += (rotationSpeed + 0) * delta;
	venusCloudMesh.rotation.y += 1.30 * rotationSpeed * delta;	
	
	earthMesh.rotation.y += (rotationSpeed- 0.005) * delta;
	earthCloudMesh.rotation.y += 1.25 * rotationSpeed * delta;

	marsMesh.rotation.y += (rotationSpeed + 0) * delta;
	marsCloudMesh.rotation.y += 1.30 * rotationSpeed * delta;

	jupiterMesh.rotation.y += (rotationSpeed + 0) * delta;
	
	saturnMesh.rotation.y += (rotationSpeed + 0) * delta;
	
	uranusMesh.rotation.y += (rotationSpeed + 0) * delta;
	
	neptuneMesh.rotation.y += (rotationSpeed + 0) * delta;
	
	plutoMesh.rotation.y += (rotationSpeed + 0) * delta;
}