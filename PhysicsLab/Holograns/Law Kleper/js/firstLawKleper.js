if (!window.altspace || !window.altspace.inClient) {
   document.write('<h3>To view this example, please open this page in <a href="http://altvr.com"> AltspaceVR </a></h3>');
}

var scaleOrbit = 500;
var scaleSun = 20000;
var scalePlanet = scaleSun*30;
var sunpositionx = 0;
var sunpositiony = -200;
var sunpositionz = 0;
var velocityCoeff = 0.005;

var scene = new THREE.Scene();
var renderer = altspace.getThreeJSRenderer({version:'0.2.0'});

function newSun(){

	var mesh =CreateSun(sunradius);
    mesh.position.set(sunpositionx,sunpositiony,sunpositionz);
    return mesh;
}

function Planets(name,perihelion,aphelion,radius,speedRotation,orbitalPeriod) {
    this.name = name;
    this.perihelion = perihelion*scaleOrbit;
    this.aphelion = aphelion*scaleOrbit;
    this.radius = radius*scalePlanet;
    this.speedRotation = speedRotation;
    this.speedTranslation = ( 1 / orbitalPeriod) * velocityCoeff;; 
	this.largerRadius = ((this.aphelion + this.perihelion)/2);
    this.center = this.lageradius - this.perihelion;
    this.orbitalPosition = 0;
    this.minorRadius = Math.sqrt(Math.pow(this.lageradius,2) - Math.pow(this.center,2));
    this.meshPlanet =  eval("Create"+name+"(this.radius)");//  CreateEarth(this.radius);
    this.meshEllipse = PlanetEllipseMesh(this.largerRadius,this.minorRadius,this.center);  
}


function calculateRealTimeOrbit(planet){
	planet.orbitalPosition += planet.speedTranslation; 
	   
	var x = planet.largerRadius*Math.sin(planet.orbitalPosition);
	var z = planet.minorRadius*Math.cos(planet.orbitalPosition);
	var v = new THREE.Vector3(x+planet.center,sunpositiony,z);

	planet.mesh.position.set(x+planet.center,sunpositiony,z);

	return v;
}

function PlanetEllipseMesh(largerRadius,minorRadius,center){

	function Ellipse(xRadius, yRadius) {
		THREE.Curve.call( this );
		// add radius as a property
		this.xRadius = xRadius;
		this.yRadius = yRadius;
	}

	Ellipse.prototype = Object.create( THREE.Curve.prototype );
	Ellipse.prototype.constructor = Ellipse;

	// define the getPoint function for the subClass
	Ellipse.prototype.getPoint = function ( t ) {

	   var radians = 2 * Math.PI * t;
	   var value = new THREE.Vector3( this.xRadius * Math.cos( radians ),0,this.yRadius * Math.sin( radians ) );
	   return value;
  	};

	 var path = new Ellipse(raiomaior,raiomenor);

	 var pathSegments = 64;
	 var tubeRadius = 0.5;
	 var radiusSegments = 16;
	 var closed = true;

	 var geometry = new THREE.TubeGeometry( path, pathSegments, tubeRadius, radiusSegments, closed );

	 var material = new THREE.MeshPhongMaterial( {color: 0xffffff, } );
	             // mesh
	 var mesh = new THREE.Mesh( geometry, material );

	 mesh.position.set(sunpositionx + centro, sunpositiony, sunpositionz);

	 return mesh;
}



function part1(planet){

   planet.meshPlanet.position.set(sunpositionx + planet.aphelion,sunpositiony,sunpositionz);
   scene.add(planet.meshPlanet);
   part = 0;
}


var vectors = new Array();
var orbitpart2;

function part2(planet){

		
	if (vectors.length <= 1255 ){
		vectors.push(calculateRealTimeOrbit(planet));
	}

	if (vectors.length > 1255 ){
		calculateRealTimeOrbit(planet);
	}else{
		scene.remove(orbitpart2);
	} 

	if (vectors.length > 1 && vectors.length <= 1255 ){

		var pathSegments = 32;
		var tubeRadius = 0.5;
		var radiusSegments = 8;
		var closed = false; 

		var path = new THREE.CatmullRomCurve3(vectors);

		var geometry = new THREE.TubeGeometry( path, pathSegments, tubeRadius, radiusSegments, closed );
		             
		var material = new THREE.MeshPhongMaterial( {color: 0xffffff, } );
		                // mesh
		orbitpart2 = new THREE.Mesh( geometry, material );
		scene.add(orbitpart2);
	}

}


var sun = newSun();
//Planets(name,perihelion,aphelion,radius,speedRotation,speedTranslation) Au values
//
var earth = Planets('Earth',0.976,1.010,0.0000425,0.01,1);

scene.add(sun);

part1();

render();

  function render() {
   requestAnimationFrame(render);
/*
  if (part == 1) {

   part1();

  } 

  if (part == 2) {

   part2();

  } 
 */

   renderer.render(scene);
  }
