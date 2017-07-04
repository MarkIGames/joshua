function checkInView() {
	camera.updateMatrix(); // make sure camera's local matrix is updated
	camera.updateMatrixWorld(); // make sure camera's world matrix is updated
	camera.matrixWorldInverse.getInverse( camera.matrixWorld );
	
	sunMesh.updateMatrix(); // make sure plane's local matrix is updated
	sunMesh.updateMatrixWorld(); // make sure plane's world matrix is updated
	
	earthMesh.updateMatrix(); // make sure plane's local matrix is updated
	earthMesh.updateMatrixWorld(); // make sure plane's world matrix is updated
	
	marsMesh.updateMatrix(); // make sure plane's local matrix is updated
	marsMesh.updateMatrixWorld(); // make sure plane's world matrix is updated
	
	venusMesh.updateMatrix(); // make sure plane's local matrix is updated
	venusMesh.updateMatrixWorld(); // make sure plane's world matrix is updated
	
	mercuryMesh.updateMatrix(); // make sure plane's local matrix is updated
	mercuryMesh.updateMatrixWorld(); // make sure plane's world matrix is updated
	
	saturnMesh.updateMatrix(); // make sure plane's local matrix is updated
	saturnMesh.updateMatrixWorld(); // make sure plane's world matrix is updated
	
	jupiterMesh.updateMatrix(); // make sure plane's local matrix is updated
	jupiterMesh.updateMatrixWorld(); // make sure plane's world matrix is updated
	
	neptuneMesh.updateMatrix(); // make sure plane's local matrix is updated
	neptuneMesh.updateMatrixWorld(); // make sure plane's world matrix is updated
	
	plutoMesh.updateMatrix(); // make sure plane's local matrix is updated
	plutoMesh.updateMatrixWorld(); // make sure plane's world matrix is updated
	
	uranusMesh.updateMatrix(); // make sure plane's local matrix is updated
	uranusMesh.updateMatrixWorld(); // make sure plane's world matrix is updated
	
	aimObject1.updateMatrix();
	aimObject1.updateMatrixWorld();
	
	aimObject1.children[0].children[0].updateMatrix();
	aimObject1.children[0].children[0].updateMatrixWorld();
	
	var frustum = new THREE.Frustum();
	frustum.setFromMatrix( new THREE.Matrix4().multiply( camera.projectionMatrix, camera.matrixWorldInverse ) );
	
	console.log('Sun');
	console.log( frustum.intersectsObject( sunMesh ) );
	console.log('Earth');
	console.log( frustum.intersectsObject( earthMesh ) );
	console.log('Saturn');
	console.log( frustum.intersectsObject( saturnMesh ) );
	console.log('Uranus');
	console.log( frustum.intersectsObject( uranusMesh ) );
	console.log('Neptune');
	console.log( frustum.intersectsObject( neptuneMesh ) );
	console.log('Jupiter');
	console.log( frustum.intersectsObject( jupiterMesh ) );
	console.log('Venus');
	console.log( frustum.intersectsObject( venusMesh ) );
	console.log('Mars');
	console.log( frustum.intersectsObject( marsMesh ) );
	console.log('Pluto');
	console.log( frustum.intersectsObject( plutoMesh ) );
	console.log('Mercury');
	console.log( frustum.intersectsObject( mercuryMesh ) );
	
	console.log('aimObject1Part');
	console.log( frustum.intersectsObject( aimObject1.children[0].children[0] ) );
	console.log('aimObject2');
	console.log( frustum.intersectsObject( aimObject2.children[0].children[0] ) );
	console.log('aimObject3');
	console.log( frustum.intersectsObject( aimObject3.children[0].children[0] ) );
	console.log('aimObject4');
	console.log( frustum.intersectsObject( aimObject4.children[0].children[0] ) );
	
	console.log('issObject');
	console.log( frustum.intersectsObject( issObject.children[0].children[0] ) );
}