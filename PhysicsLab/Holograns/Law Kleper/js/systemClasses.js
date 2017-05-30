
function Sun(radius,scale,speedRotation,x,y,z,initData){

	this.radius = radius;
	this.scale = scale;
	this.speedRotation = speedRotation;
	var mesh = CreateSun(radius*scale);
	mesh.position.set(x,y,z);

	mesh.addBehaviors(
    	new altspace.utilities.behaviors.Object3DSync({rotation: true})
	);

  // this.mesh = sceneSync.instantiate('createSyncedPart', initData, true);


	function rotation(){
	this.mesh.rotation += speedRotation;
	}


}


function Planets(name,perihelion,aphelion,radius,speedRotation,orbitalPeriod,sunX,sunY,sunZ,scalePlanet,scaleOrbit,velocityCoeff,initData) {
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

    this.meshPlanet =  eval("Create"+name+"(this.radius)");//  CreateEarth(this.radius); 

    this.meshPlanet.addBehaviors(
    	new altspace.utilities.behaviors.Object3DSync({position: true, rotation: true})
	);

    this.meshEllipse = PlanetEllipseMesh();

	this.realTimeOrbit = function calculateRealTimeOrbit(){
		
		this.orbitalPosition += this.speedTranslation; 
		   
		var x = this.largerRadius*Math.sin(this.orbitalPosition);
		var z = this.minorRadius*Math.cos(this.orbitalPosition);

		var v = new THREE.Vector3(x+this.center,this.sunY,z);

		this.meshPlanet.position.set(x+this.center,this.sunY,z);

		return v;
	}

	function PlanetEllipseMesh(){

		function Ellipse(xRadius, yRadius) {
			THREE.Curve.call( this );
			// add radius as a property
			this.xRadius = xRadius;
			this.yRadius = yRadius;
		}

		Ellipse.prototype = Object.create( THREE.Curve.prototype );
		Ellipse.prototype.constructor = Ellipse;
wdss
		// define the getPoint function for the subClass
		Ellipse.prototype.getPoint = function ( t ) {

		   var radians = 2 * Math.PI * t;
		   var value = new THREE.Vector3( this.xRadius * Math.cos( radians ),0,this.yRadius * Math.sin( radians ) );
		   return value;
	  	};

		 var path = new Ellipse(this.largerRadius,this.minorRadius);

		 var pathSegments = 64;
		 var tubeRadius = 0.5;
		 var radiusSegments = 16;
		 var closed = true;

		 var geometry = new THREE.TubeGeometry( path, pathSegments, tubeRadius, radiusSegments, closed );

		 var material = new THREE.MeshPhongMaterial( {color: 0xffffff, } );
		             // mesh
		 var mesh = new THREE.Mesh( geometry, material );

		 mesh.position.set(this.sunZ + this.center, this.sunY, this.sunZ);

		 return mesh;
	}
}

