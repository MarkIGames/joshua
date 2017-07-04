var lightMaxDistance      = 400;
var maxExposureOffset     = 0;
var maxExposureMultiplier = 1.9;
var lightMaxExposure      = (lightMaxDistance * maxExposureMultiplier) + maxExposureOffset;

var lightMaxDistanceAdd = lightMaxDistance;
var lightMaxDistanceSub = lightMaxDistance * -1;

var lightMaxExposureAdd = lightMaxExposure;
var lightMaxExposureSub = lightMaxExposure * -1;

var lightStrength = 1;

function addLights() {
	
	dirLight = new THREE.PointLight( 0xffffff, lightStrength, lightMaxExposureAdd );
	dirLight.position.set( 0, 0, lightMaxDistanceSub );
	scene.add( dirLight );

	dirLight = new THREE.PointLight( 0xffffff, lightStrength, lightMaxExposureAdd );
	dirLight.position.set( 0, 0, lightMaxDistanceAdd );
	scene.add( dirLight );

	dirLight = new THREE.PointLight( 0xffffff, lightStrength, lightMaxExposureAdd );
	dirLight.position.set( 0, lightMaxDistanceSub, 0 );
	scene.add( dirLight );

	dirLight = new THREE.PointLight( 0xffffff, lightStrength, lightMaxExposureAdd );
	dirLight.position.set( 0, lightMaxDistanceAdd, 0 );
	scene.add( dirLight );

	dirLight = new THREE.PointLight( 0xffffff, lightStrength, lightMaxExposureAdd );
	dirLight.position.set( lightMaxDistanceSub, 0, 0 );
	scene.add( dirLight );

	dirLight = new THREE.PointLight( 0xffffff, lightStrength, lightMaxExposureAdd );
	dirLight.position.set( lightMaxDistanceAdd, 0, 0 );
	scene.add( dirLight );
	
}