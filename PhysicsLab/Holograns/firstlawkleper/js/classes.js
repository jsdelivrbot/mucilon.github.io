function Sun(radius,scale,speedRotation,x,y,z){

	this.radius = radius*scale;

	this.speedRotation = speedRotation;

	var initData = {ownerUserId: user.userId,radius: this.radius};

    this.mesh = sceneSync.instantiate('Sun',initData,true);
	this.mesh.position.set(x,y,z);

	this.rotation = function calculateRotation(){
						this.mesh.rotation += speedRotation;
					}
}


function Planets(name,perihelion,aphelion,radius,speedRotation,orbitalPeriod,sunX,sunY,sunZ,scalePlanet,scaleOrbit,velocityCoeff) {
    this.name = name;
    this.perihelion = perihelion*scaleOrbit;
    this.aphelion = aphelion*scaleOrbit;
    this.radius = radius*scalePlanet;
    this.speedRotation = speedRotation;
    this.sunX = sunX;
    this.sunY = sunY;
    this.sunZ = sunZ;
    this.speedTranslation = ( 1 / orbitalPeriod) * velocityCoeff;
	this.largerRadius = ((this.aphelion + this.perihelion)/2);
    this.center = this.largerRadius - this.perihelion;
    this.orbitalPosition = 0;
    this.minorRadius = Math.sqrt(Math.pow(this.largerRadius,2) - Math.pow(this.center,2));

    var initData = {ownerUserId: user.userId,name: this.name,radius: this.radius};
    this.meshPlanet = sceneSync.instantiate('Planet',initData,true);


    
	this.meshEllipse =  function createMeshEllipse(){
		
		var initData = {
			ownerUserId: user.userId,
			largerRadius: this.largerRadius,
			minorRadius: this.minorRadius,
			x: this.sunX,
			y: this.sunY,
			z: this.sunZ,
			center: this.center
		};

		return sceneSync.instantiate('Ellipse',initData,true);

	}
  

	this.realTimeOrbit = function calculateRealTimeOrbit(){
		
		this.orbitalPosition += this.speedTranslation; 
		   
		var x = this.largerRadius*Math.sin(this.orbitalPosition);
		var z = this.minorRadius*Math.cos(this.orbitalPosition);

		var v = new THREE.Vector3(x+this.center,this.sunY,z);

		this.meshPlanet.position.set(x+this.center,this.sunY,z);

		return v;
	}

	this.rotation = function calculateRotation(){
						this.mesh.rotation += speedRotation;
					}
}



function dynamicEllipseControl(planet){
this.planet = planet;	
this.vectorsArray = new Array();
this.orbitMesh;


this.animate = function animation(){

	if (this.vectorsArray.length <= 1258 ){
		this.vectorsArray.push(this.planet.realTimeOrbit());
	}

	if (this.vectorsArray.length > 1258 ){
		calculateRealTimeOrbit(this.planet.realTimeOrbit());
	}

	if (this.vectorsArray.length > 1 && this.vectorsArray.length <= 1258 ){
		sceneSync.destroy(this.orbitMesh);
		var initData = {ownerUserId: user.userId,vectors: this.vectorsArray}
		this.orbitMesh = sceneSync.instantiate('DynEllipse',initData,true);
	}
}

this.clearArray = function clearVectorArray(){
					this.vectorsArray = new Array();
				  }	

}