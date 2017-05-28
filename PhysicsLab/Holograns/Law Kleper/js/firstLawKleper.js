if (!window.altspace || !window.altspace.inClient) {
   document.write('<h3>To view this example, please open this page in <a href="http://altvr.com"> AltspaceVR </a></h3>');
}


var sim;
var connection;
var sceneSync;
var scaleOrbit = 500;
var scaleSun = 20000;
var scalePlanet = scaleSun*30;
var sunradius = 0.004;
var sunpositionx = 0;
var sunpositiony = -200;
var sunpositionz = 0;
var velocityCoeff = 0.005;
var part = 1;
var oldpart = 0;
var globalSun;
var globalEarth;
var globalFont;
var button1,button2,button3;

var scene = new THREE.Scene();
var renderer = altspace.getThreeJSRenderer({version:'0.2.0'});

function main(_connection) {
	connection = _connection
	sim = new altspace.utilities.Simulation();
	loadFont();//must load model before creating synced cube
}



function loadFont(){
new THREE.FontLoader().load(
			'https://cdn.rawgit.com/mrdoob/three.js/r74/examples/fonts/helvetiker_regular.typeface.js',
			setGlobalFont
);
}


function setGlobalFont(font){


globalFont = font;

start();

}

function createInstace(){

sceneSync = new altspace.utilities.behaviors.SceneSync(connection.instance, {
	instantiators: {
	'Start': star,
	'Render': render,
	'Part1': part1,
	'Part2': part2,
	'Part3': part3
	},

	ready: ready
	});
sim.scene.addBehavior(sceneSync);



}



function sceneClear(){

	while(sim.scene.children.length > 0){ 
    sim.scene.remove(sim.scene.children[0]); 
}

}


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

function createText(text,size,height,color,transparent,opacity) {
			//Text
	var geometry = new THREE.TextGeometry(text, {font: globalFont,size: size,height: height });
	var material = new THREE.MeshBasicMaterial({color: color,transparent: transparent, opacity: opacity});
	var mesh = new THREE.Mesh(geometry, material);
	return mesh;

}

function createButton(text,funct){

var cube = new THREE.Mesh(
new THREE.BoxGeometry( 50, 50, 1 ),
new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.5})
);

buttontext = createText(text,10,3,0x00000,true,0.9 );
buttontext.position.x = -22;
var button = new THREE.Group();
button.add(cube);
button.add(buttontext);

button.addBehavior(new altspace.utilities.behaviors.HoverScale({ scale: 1.2, duration: 150 }));
button.addBehavior(new altspace.utilities.behaviors.HoverColor({ event: 'cursordown', color: new THREE.Color(0x33ff33) }));

		// Assign button event handlers
button.addEventListener('cursordown', function(event) {
eval(funct);
console.log(funct);
});

return button;

} 







function part1(sun,planet){	
   sim.scene.add(sun);	
   planet.meshPlanet.position.set(sunpositionx + planet.aphelion,sunpositiony,sunpositionz);
   sim.scene.add(planet.meshPlanet);
 //  part = 0;
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
		scene.remove(orbitpart2);
	} 

	if (vectors.length > 1 && vectors.length <= 1258 ){
       sim.scene.remove(orbitpart2);
		var pathSegments = 32;
		var tubeRadius = 0.5;
		var radiusSegments = 8;
		var closed = false; 

		var path = new THREE.CatmullRomCurve3(vectors);

		var geometry = new THREE.TubeGeometry( path, pathSegments, tubeRadius, radiusSegments, closed );
		             
		var material = new THREE.MeshPhongMaterial( {color: 0xffffff, } );
		                // mesh
		orbitpart2 = new THREE.Mesh( geometry, material );
		sim.scene.add(orbitpart2);
	}

}


function part3(){

var pathSegments = 32;
var tubeRadius = 0.5;
var radiusSegments = 8;
var closed = false; 

var oldScaleSun = scaleSun;
var oldScalePlanet = scalePlanet;
var oldSunPositiony = sunpositiony;

sunpositiony = -50;
scaleSun = 1000;
scalePlanet = scaleSun*50;

//##########################################################################################################
//##########################################################################################################
//##########################################################################################################
//##########################################################################################################
var sun = newSun();
sim.scene.add(sun);

// add center sun for name
var start = new THREE.Vector3(sunpositionx,sunpositiony,sunpositionz);
var end = new THREE.Vector3(sunpositionx - 60,sunpositiony + 50,sunpositionz);
var path = new THREE.LineCurve3(start,end);

var geometry = new THREE.TubeGeometry( path, pathSegments, tubeRadius, radiusSegments, closed );
		             
var material = new THREE.MeshPhongMaterial( {color: 0xffffff, } );
		                // mesh
var mesh = new THREE.Mesh( geometry, material );
sim.scene.add(mesh);


//add sun name
var centertext = createText('Sol/Foco 1',10,3,0x00000,true,0.9 );
centertext.position.set(sunpositionx - 85,sunpositiony + 50,sunpositionz);
sim.scene.add(centertext);

//##########################################################################################################
//##########################################################################################################
//##########################################################################################################

var earth = new Planets('Earth',0.976,1.010,0.0000425,0.01,1);

var newEarthMesh = earth.meshPlanet.clone();

earth.meshPlanet.position.set(sunpositionx + earth.aphelion,sunpositiony,sunpositionz);
sim.scene.add(earth.meshPlanet);


// add aohelion sun for name
var start = new THREE.Vector3(sunpositionx + earth.aphelion,sunpositiony,sunpositionz);
var end = new THREE.Vector3(sunpositionx + earth.aphelion,sunpositiony + 50,sunpositionz);
var path = new THREE.LineCurve3(start,end);

var geometry = new THREE.TubeGeometry( path, pathSegments, tubeRadius, radiusSegments, closed );
		             
var material = new THREE.MeshPhongMaterial( {color: 0xffffff, } );
		                // mesh
var mesh = new THREE.Mesh( geometry, material );
sim.scene.add(mesh);


//add aphelion name
var centertext = createText('Afelio',10,3,0x00000,true,0.9 );
centertext.position.set(sunpositionx + earth.aphelion - 15,sunpositiony +50,sunpositionz);
sim.scene.add(centertext);

//##########################################################################################################
//##########################################################################################################
//##########################################################################################################

newEarthMesh.position.set(sunpositionx - earth.perihelion,sunpositiony,sunpositionz);
sim.scene.add(newEarthMesh);


// add aohelion sun for name
var start = new THREE.Vector3(sunpositionx - earth.perihelion,sunpositiony,sunpositionz);
var end = new THREE.Vector3(sunpositionx - earth.perihelion,sunpositiony + 50,sunpositionz);
var path = new THREE.LineCurve3(start,end);

var geometry = new THREE.TubeGeometry( path, pathSegments, tubeRadius, radiusSegments, closed );
		             
var material = new THREE.MeshPhongMaterial( {color: 0xffffff, } );
		                // mesh
var mesh = new THREE.Mesh( geometry, material );
sim.scene.add(mesh);


//add aphelion name
var centertext = createText('Perielio',10,3,0x00000,true,0.9 );
centertext.position.set(sunpositionx - earth.perihelion - 15,sunpositiony + 50,sunpositionz);
sim.scene.add(centertext);

//##########################################################################################################
//##########################################################################################################
//##########################################################################################################


sim.scene.add(earth.meshEllipse);

//##########################################################################################################
//##########################################################################################################
//##########################################################################################################


// add center
var geometry = new THREE.SphereGeometry(2, 32, 32);
var material = new THREE.MeshPhongMaterial( {color: 0xffffff, } );
var mesh = new THREE.Mesh(geometry, material);
mesh.position.set(earth.center,sunpositiony,sunpositionz);
sim.scene.add(mesh);


// add center line for name
var start = new THREE.Vector3(earth.center,sunpositiony,sunpositionz);
var end = new THREE.Vector3(earth.center,sunpositiony + 50,sunpositionz);
var path = new THREE.LineCurve3(start,end);

var geometry = new THREE.TubeGeometry( path, pathSegments, tubeRadius, radiusSegments, closed );
		             
var material = new THREE.MeshPhongMaterial( {color: 0xffffff, } );
		                // mesh
var mesh = new THREE.Mesh( geometry, material );
sim.scene.add(mesh);


//add center name
var centertext = createText('Centro',10,3,0x00000,true,0.9 );
centertext.position.set(earth.center - 15,sunpositiony + 50,sunpositionz);
sim.scene.add(centertext);

//##########################################################################################################
//##########################################################################################################
//##########################################################################################################

var geometry = new THREE.SphereGeometry(4, 32, 32);
var material = new THREE.MeshPhongMaterial( {color: 0x00000, } );
var mesh = new THREE.Mesh(geometry, material);
mesh.position.set(2*earth.center,sunpositiony,sunpositionz);
sim.scene.add(mesh);

var start = new THREE.Vector3(2*earth.center,sunpositiony,sunpositionz);
var end = new THREE.Vector3(2*earth.center + 60,sunpositiony+50,sunpositionz);
var path = new THREE.LineCurve3(start,end);

var geometry = new THREE.TubeGeometry( path, pathSegments, tubeRadius, radiusSegments, closed );
		             
var material = new THREE.MeshPhongMaterial( {color: 0xffffff, } );
		                // mesh
var mesh = new THREE.Mesh( geometry, material );
sim.scene.add(mesh);


//add center name
var centertext = createText('Foco 2',10,3,0x00000,true,0.9 );
centertext.position.set(2*earth.center+35,sunpositiony+50,sunpositionz);
sim.scene.add(centertext);


var start = new THREE.Vector3(-earth.perihelion,sunpositiony,sunpositionz);
var end = new THREE.Vector3(earth.aphelion,sunpositiony,sunpositionz);
var path = new THREE.LineCurve3(start,end);

var geometry = new THREE.TubeGeometry( path, pathSegments, tubeRadius, radiusSegments, closed );
		             
var material = new THREE.MeshPhongMaterial( {color: 0xffffff, } );
		                // mesh
var mesh = new THREE.Mesh( geometry, material );
sim.scene.add(mesh);

sunpositiony = oldSunPositiony;
scaleSun = oldScaleSun;
scalePlanet = oldScalePlanet;


}


function start(){
globalSun = newSun();
globalEarth = new Planets('Earth',0.976,1.010,0.0000425,0.01,1);

sim.scene.add(globalEarth.meshPlanet);


button1 = createButton('Parte 1','part = 1');
button1.position.set(-500, -200, -500);
button2 = createButton('Parte 2','part = 2');
button2.position.set(-425, -200, -500);
button3 = createButton('Parte 3','part = 3');
button3.position.set(-350, -200, -500);

sim.scene.add(button1);
sim.scene.add(button2);
sim.scene.add(button3); 

render();
}



  function render() {
   requestAnimationFrame(render);
   sim.scene.updateAllBehaviors();

  if (part != oldpart){
  	sceneClear();
   sim.scene.add(button1);
   sim.scene.add(button2);
   sim.scene.add(button3);
  // scene.clear()
   if (part == 1) {
   globalSun = newSun();
   globalEarth = new Planets('Earth',0.976,1.010,0.0000425,0.01,1);
   sim.scene.add(globalSun);
   sim.scene.add(globalEarth.meshPlanet);
   oldpart = part;
   part1(globalSun,globalEarth);
  }

   if (part == 2) {
   globalSun = newSun();
   globalEarth = new Planets('Earth',0.976,1.010,0.0000425,0.01,1);
   sim.scene.add(globalSun);
   sim.scene.add(globalEarth.meshPlanet);
   vectors = new Array();
   oldpart = part;
  }

  if (part == 3) {
   oldpart = part;
   part3();
  }	

  }	


  if (part == 2) {
   part2(globalEarth);
  }


 globalEarth.meshPlanet.rotation.y += globalEarth.speedRotation;
 globalSun.rotation.y += 0.01; 
  

//   renderer.render(sim.scene);
  }

function ready(firstInstance) {
	if (firstInstance) {
		sceneSync.instantiate('Start');
		sceneSync.instantiate('Render');
		sceneSync.instantiate('Part1');
		sceneSync.instantiate('Part2');
		sceneSync.instantiate('Part3');
		}
}



  var config = { authorId: 'Mucilon', appId: 'FirstLawKleper' };
altspace.utilities.sync.connect(config).then(function(connection) {
	main(connection);
});
