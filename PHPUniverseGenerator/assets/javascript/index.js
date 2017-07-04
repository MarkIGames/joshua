if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
var radius = 2000;
var tilt = 0.41;
var rotationSpeed = 0.02;
var cloudsScale = 1.005;
var moonScale = 0.23;
var MARGIN = 0;
var SCREEN_HEIGHT = window.innerHeight - MARGIN * 2;
var SCREEN_WIDTH  = window.innerWidth;

var renderWidth = window.innerWidth * 0.65;
var renderHeight = window.innerHeight * 0.90;

var container;
var camera, controls, scene, renderer;
var geometry, meshPlanet, meshClouds, meshMoon;
var dirLight, pointLight, ambientLight;
var textureLoader = new THREE.TextureLoader();
var d, dPlanet, dMoon, dMoonVec = new THREE.Vector3();
var clock = new THREE.Clock();
var mouse = new THREE.Vector2(), INTERSECTED;

var cameraViewProjectionMatrix = new THREE.Matrix4();

init( jsonObject );
animate();

function init() {
	container = document.getElementById('galaxyView');
	camera = new THREE.PerspectiveCamera( 25, SCREEN_WIDTH / SCREEN_HEIGHT, 50, 1e7 );
	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2( 0x000000, 0.00000025 );
	controls = new THREE.FlyControls( camera );
	controls.movementSpeed = 1000;
	controls.domElement = container;
	controls.rollSpeed = Math.PI / 24;
	controls.autoForward = false;
	controls.dragToLook = false;
/*
	dirLight = new THREE.PointLight( 0xffffff);
	dirLight.position.set( 0, 0, -100000 );
	scene.add( dirLight );

	dirLight = new THREE.PointLight( 0xffffff , 0.20);
	dirLight.position.set( 0, 0, 32229600 );
	scene.add( dirLight );

	dirLight = new THREE.PointLight( 0xffffff , 0.33);
	dirLight.position.set( 32229600, 0, 0 );
	scene.add( dirLight );

	dirLight = new THREE.PointLight( 0xffffff , 0.33);
	dirLight.position.set( 32229600, 0, 0 );
	scene.add( dirLight );
*/

	addLights()
	
	buildPlanets(jsonObject);
	//scene.add( shipObject );

	var randomOffset = getRandomArbitrary(-4000,4000);

	camera.position.z = 50;
	camera.position.x = 50;

	// every time the camera or objects change position (or every frame)

	camera.updateMatrixWorld(); // make sure the camera matrix is updated
	camera.matrixWorldInverse.getInverse( camera.matrixWorld );
	cameraViewProjectionMatrix.multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse );

	// console.log( frustum.intersectsObject( object ) );

	// stars
	/*
	var i, r = radius, starsGeometry = [ new THREE.Geometry(), new THREE.Geometry() ];
	for ( i = 0; i < 250; i ++ ) {
		var vertex = new THREE.Vector3();
		vertex.x = Math.random() * 2 - 1;
		vertex.y = Math.random() * 2 - 1;
		vertex.z = Math.random() * 2 - 1;
		vertex.multiplyScalar( r );
		starsGeometry[ 0 ].vertices.push( vertex );
	}
	for ( i = 0; i < 1500; i ++ ) {
		var vertex = new THREE.Vector3();
		vertex.x = Math.random() * 2 - 1;
		vertex.y = Math.random() * 2 - 1;
		vertex.z = Math.random() * 2 - 1;
		vertex.multiplyScalar( r );
		starsGeometry[ 1 ].vertices.push( vertex );
	}
	var stars;
	var starsMaterials = [
		new THREE.PointsMaterial( { color: 0x555555, size: 2, sizeAttenuation: false } ),
		new THREE.PointsMaterial( { color: 0x555555, size: 1, sizeAttenuation: false } ),
		new THREE.PointsMaterial( { color: 0x333333, size: 2, sizeAttenuation: false } ),
		new THREE.PointsMaterial( { color: 0x3a3a3a, size: 1, sizeAttenuation: false } ),
		new THREE.PointsMaterial( { color: 0x1a1a1a, size: 2, sizeAttenuation: false } ),
		new THREE.PointsMaterial( { color: 0x1a1a1a, size: 1, sizeAttenuation: false } )
	];
	for ( i = 10; i < 30; i ++ ) {
		stars = new THREE.Points( starsGeometry[ i % 2 ], starsMaterials[ i % 6 ] );
		stars.rotation.x = Math.random() * 6;
		stars.rotation.y = Math.random() * 6;
		stars.rotation.z = Math.random() * 6;
		s = i * 10;
		stars.scale.set( s, s, s );
		stars.matrixAutoUpdate = false;
		stars.updateMatrix();
		scene.add( stars );
	}*/

	raycaster = new THREE.Raycaster();

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );

	renderer.setSize( renderWidth, renderHeight );
	renderer.sortObjects = false;
	container.appendChild( renderer.domElement );
	window.addEventListener( 'resize', onWindowResize, false );
	// postprocessing
	var renderModel = new THREE.RenderPass( scene, camera );
	var effectFilm = new THREE.FilmPass( 0, 0, 2048, false );
	effectFilm.renderToScreen = true;
	composer = new THREE.EffectComposer( renderer );
	composer.addPass( renderModel );
	composer.addPass( effectFilm );
}

function onWindowResize( event ) {
	camera.aspect = renderWidth / renderHeight;
	camera.updateProjectionMatrix();
	composer.reset();
}

function animate() {
	requestAnimationFrame( animate );
	render();
}

function onDocumentMouseMove( event ) {
	event.preventDefault();

	var mouseOffset = 0; //.300;

	mouse.x = ( event.clientX / renderWidth ) * 2 - 1 + (mouseOffset);
	mouse.y = - ( event.clientY / renderHeight ) * 2 + 1;
}

function render() {
	// rotate the planet and clouds
	var delta = clock.getDelta();

	rotatePlanets(delta);

	// find intersections
	raycaster.setFromCamera( mouse, camera );
	var intersects = raycaster.intersectObjects( scene.children );
	if ( intersects.length > 0 ) {
		if ( INTERSECTED != intersects[ 0 ].object ) {
			if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
			INTERSECTED = intersects[ 0 ].object;
			INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
			INTERSECTED.material.emissive.setHex( 0xff0000 );

			console.log(intersects[0].object.name);
			console.log(intersects[0].object.position.x);
			console.log(intersects[0].object.position.y);
			console.log(intersects[0].object.position.z);
		}
	} else {
		if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
		INTERSECTED = null;
	}
renderer.render( scene, camera );
	controls.update( delta );
	composer.render( delta );
}
