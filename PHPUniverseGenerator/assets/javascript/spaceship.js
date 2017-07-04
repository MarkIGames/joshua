var objectLoader = new THREE.ObjectLoader();
var shipObject;

objectLoader.load("assets/models/shuttle.json", function ( obj ) {

	obj.name = 'unnamed';
	
	shipObject = obj;
});