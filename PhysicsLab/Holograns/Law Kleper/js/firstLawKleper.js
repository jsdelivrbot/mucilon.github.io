if (!window.altspace || !window.altspace.inClient) {
   document.write('<h3>To view this example, please open this page in <a href="http://altvr.com"> AltspaceVR </a></h3>');
}

var scaleOrbit = 500;
var scaleSun = 1000;
var scalePlanet = scaleSun*30;
var sunradius = 0.004;
var sunpositionx = 0;
var sunpositiony = -350;
var sunpositionz = 0;
var velocityCoeff = 0.005;
var part = 1;

var scene = new THREE.Scene();
var renderer = altspace.getThreeJSRenderer({version:'0.2.0'});

function newSun(){

	var mesh =CreateSun(sunradius*scaleSun);
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
    this.center = this.largerRadius - this.perihelion;
    this.orbitalPosition = 0;
    this.minorRadius = Math.sqrt(Math.pow(this.largerRadius,2) - Math.pow(this.center,2));
    this.meshPlanet =  eval("Create"+name+"(this.radius)");//  CreateEarth(this.radius);
    this.meshEllipse = PlanetEllipseMesh(this.largerRadius,this.minorRadius,this.center);  
}


function calculateRealTimeOrbit(planet){
	planet.orbitalPosition += planet.speedTranslation; 
	   
	var x = planet.largerRadius*Math.sin(planet.orbitalPosition);
	var z = planet.minorRadius*Math.cos(planet.orbitalPosition);
	var v = new THREE.Vector3(x+planet.center,sunpositiony,z);

	planet.meshPlanet.position.set(x+planet.center,sunpositiony,z);

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

	 var path = new Ellipse(largerRadius,minorRadius);

	 var pathSegments = 64;
	 var tubeRadius = 0.5;
	 var radiusSegments = 16;
	 var closed = true;

	 var geometry = new THREE.TubeGeometry( path, pathSegments, tubeRadius, radiusSegments, closed );

	 var material = new THREE.MeshPhongMaterial( {color: 0xffffff, } );
	             // mesh
	 var mesh = new THREE.Mesh( geometry, material );

	 mesh.position.set(sunpositionx + center, sunpositiony, sunpositionz);

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

		
	if (vectors.length <= 1258 ){
		vectors.push(calculateRealTimeOrbit(planet));
	}

	if (vectors.length > 1258 ){
		calculateRealTimeOrbit(planet);
	}else{
	//	scene.remove(orbitpart2);
	} 

	if (vectors.length > 1 && vectors.length <= 1258 ){
       scene.remove(orbitpart2);
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


function part3(){


var earth2 = new Planets('Earth',0.976,1.010,0.0000425,0.01,1);
var earth3 = new Planets('Earth',0.976,1.010,0.0000425,0.01,1);

earth2.meshPlanet.position.set(sunpositionx + earth2.aphelion,sunpositiony,sunpositionz);
scene.add(earth2.meshPlanet);

earth3.meshPlanet.position.set(sunpositionx - earth3.perihelion,sunpositiony,sunpositionz);
scene.add(earth3.meshPlanet);

scene.add(earth3.meshEllipse);

var geometry = new THREE.SphereGeometry(2, 32, 32);
var material = new THREE.MeshPhongMaterial( {color: 0xffffff, } );
var mesh = new THREE.Mesh(geometry, material);
mesh.position.set(earth3.center,sunpositiony,sunpositionz);
scene.add(mesh);	







}


var sun = newSun();
//Planets(name,perihelion,aphelion,radius,speedRotation,speedTranslation) Au values
//
var earth = new Planets('Earth',0.976,1.010,0.0000425,0.01,1);



scene.add(sun);

part1(earth);

scene.remove(orbitpart2);
scene.remove(earth);
part3();

render();

  function render() {
   requestAnimationFrame(render);

 //  part2(earth);
/*
  if (part == 1) {

   part1();

  } 

  if (part == 2) {

   part2();

  } 
 */
 earth.meshPlanet.rotation.y += earth.speedRotation;
 sun.rotation.y += 0.01; 

   renderer.render(scene);
  }
