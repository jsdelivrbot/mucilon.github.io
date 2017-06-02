if (!window.altspace || !window.altspace.inClient) {
   document.write('<h3>To view this example, please open this page in <a href="http://altvr.com"> AltspaceVR </a></h3>');
}

var dynamicEllipse;
var earthPart2;
var part;


initSystem('start()');


function part1(){

sceneClear();
createButtons();

//Sun(radius,scale,speedRotation,x,y,z)
var sun = new Sun(0.004,20000,0.0001,0,0,0);

//Planets(name,perihelion,aphelion,radius,speedRotation,orbitalPeriod,sunX,sunY,sunZ,scalePlanet,scaleOrbit,velocityCoeff)
var earth = new Planets("Earth",0.976,1.010,0.0000425,0.01,1,sun.x,sun.y,sun.z,sun.scale*50,500,0.005);

part = 1;

}

function part2(){

sceneClear();
createButtons();

//Sun(radius,scale,speedRotation,x,y,z)
var sun = new Sun(0.004,20000,0.0001,0,0,0);

//Planets(name,perihelion,aphelion,radius,speedRotation,orbitalPeriod,sunX,sunY,sunZ,scalePlanet,scaleOrbit,velocityCoeff)
earthPart2 = new Planets("Earth",0.976,1.010,0.0000425,0.01,1,sun.x,sun.y,sun.z,sun.scale*50,500,0.005);


earthPart2.meshEllipse();
//dynamicEllipse = new dynamicEllipseControl(earth);

part = 2;

}


function part3(){

sceneClear();
createButtons();

//##################################################### SUN #############################################################################
//Sun(radius,scale,speedRotation,x,y,z)
var sun = new Sun(0.004,1000,0.0001,0,0,0);


var x0 = sun.mesh.position.x;
var y0 = sun.mesh.position.y;
var z0 = sun.mesh.position.z;

var x1 = sun.mesh.position.x - 60;
var y1 = sun.mesh.position.y + 100;
var z1 = sun.mesh.position.z;



var initData = {ownerUserId: user.userId,x0: x0,y0: y0,z0: z0,x1: x1,y1: y1,z1: z1};
var sunLine = sceneSync.instantiate('Line',initData,true);

var initData = {ownerUserId: user.userId,text: "Sol / Foco 1", size: 10,height: 3,color: 0xffffff,transparent: false,opacity: 0.5};
var sunText = sceneSync.instantiate('Text',initData,true);
sunText.position.set(x1 - 60,y1,z1);

//################################################# APHELION #############################################################################

//Planets(name,perihelion,aphelion,radius,speedRotation,orbitalPeriod,sunX,sunY,sunZ,scalePlanet,scaleOrbit,velocityCoeff)
var earthAphelion = new Planets("Earth",0.976,1.010,0.0000425,0.01,1,sun.x,sun.y,sun.z,sun.scale*30,500,0.005);
earthAphelion.meshPlanet.position.x = -earthAphelion.aphelion;



var x0 = earthAphelion.meshPlanet.position.x;
var y0 = earthAphelion.meshPlanet.position.y;
var z0 = earthAphelion.meshPlanet.position.z;

var x1 = earthAphelion.meshPlanet.position.x;
var y1 = earthAphelion.meshPlanet.position.y + 100;
var z1 = earthAphelion.meshPlanet.position.z;

var initData = {ownerUserId: user.userId,x0: x0,y0: y0,z0: z0,x1: x1,y1: y1,z1: z1};
var aphelionLine = sceneSync.instantiate('Line',initData,true);

var initData = {ownerUserId: user.userId,text: "Afelio", size: 10,height: 3,color: 0xffffff,transparent: false,opacity: 0.5};
var aphelionText = sceneSync.instantiate('Text',initData,true);
aphelionText.position.set(x1 - 30,y1,z1);

earthAphelion.meshEllipse();

//################################################# PERIHELION #############################################################################

//Planets(name,perihelion,aphelion,radius,speedRotation,orbitalPeriod,sunX,sunY,sunZ,scalePlanet,scaleOrbit,velocityCoeff)
var earthPerihelion = new Planets("Earth",0.976,1.010,0.0000425,0.01,1,sun.x,sun.y,sun.z,sun.scale*30,500,0.005);

earthPerihelion.meshPlanet.position.x = earthPerihelion.perihelion;


var x0 = earthPerihelion.meshPlanet.position.x;
var y0 = earthPerihelion.meshPlanet.position.y;
var z0 = earthPerihelion.meshPlanet.position.z;

var x1 = earthPerihelion.meshPlanet.position.x;
var y1 = earthPerihelion.meshPlanet.position.y + 100;
var z1 = earthPerihelion.meshPlanet.position.z;

var initData = {ownerUserId: user.userId,x0: x0,y0: y0,z0: z0,x1: x1,y1: y1,z1: z1};
var perihelionLine = sceneSync.instantiate('Line',initData,true);

var initData = {ownerUserId: user.userId,text: "Perielio", size: 10,height: 3,color: 0xffffff,transparent: false,opacity: 0.5};
var perihelionText = sceneSync.instantiate('Text',initData,true);
perihelionText.position.set(x1 - 30,y1,z1);

//################################################# CENTER #############################################################################

var initData = {ownerUserId: user.userId,radius: 2,color: 0x00ff00,transparent: false,opacity: 0.5}
var center = sceneSync.instantiate('Sphere',initData,true);
center.position.set(earthAphelion.center,earthAphelion.meshPlanet.position.y,earthAphelion.meshPlanet.position.z);

var x0 = center.position.x;
var y0 = center.position.y;
var z0 = center.position.z;

var x1 = center.position.x;
var y1 = center.position.y + 100;
var z1 = center.position.z;


var initData = {ownerUserId: user.userId,x0: x0,y0: y0,z0: z0,x1: x1,y1: y1,z1: z1};
var centerLine = sceneSync.instantiate('Line',initData,true);

var initData = {ownerUserId: user.userId,text: "Centro", size: 10,height: 3,color: 0xffffff,transparent: false,opacity: 0.5};
var centerText = sceneSync.instantiate('Text',initData,true);
centerText.position.set(x1 - 30,y1,z1);

//################################################# FOCUS  #############################################################################

var initData = {ownerUserId: user.userId,radius: 2,color: 0xff0000,transparent: false,opacity: 0.5}
var focus = sceneSync.instantiate('Sphere',initData,true);
focus.position.set(earthAphelion.center*2,earthAphelion.meshPlanet.position.y,earthAphelion.meshPlanet.position.z);


var x0 = focus.position.x;
var y0 = focus.position.y;
var z0 = focus.position.z;

var x1 = focus.position.x + 60;
var y1 = focus.position.y + 100;
var z1 = focus.position.z;


var initData = {ownerUserId: user.userId,x0: x0,y0: y0,z0: z0,x1: x1,y1: y1,z1: z1};
var focusLine = sceneSync.instantiate('Line',initData,true);

var initData = {ownerUserId: user.userId,text: "Foco 2", size: 10,height: 3,color: 0xffffff,transparent: false,opacity: 0.5};
var focusText = sceneSync.instantiate('Text',initData,true);
focusText.position.set(x1 - 30,y1,z1);


//################################################# CENTER LINE ###########################################################################


var x0 = -earthAphelion.aphelion;
var y0 = earthAphelion.meshPlanet.position.y;
var z0 = earthAphelion.meshPlanet.position.z;

var x1 = earthAphelion.perihelion;
var y1 = earthAphelion.meshPlanet.position.y;
var z1 = earthAphelion.meshPlanet.position.z;


var initData = {ownerUserId: user.userId,x0: x0,y0: y0,z0: z0,x1: x1,y1: y1,z1: z1};
var centerLine = sceneSync.instantiate('Line',initData,true);

part = 3;
	
}

function createButtons(){

var initData = {ownerUserId: user.userId,text: 'Parte 1',funct: 'part1()'}
var button1 = sceneSync.instantiate('Button',initData,true);
button1.position.set(-500,-200,-500);

var initData = {ownerUserId: user.userId,text: 'Parte 2',funct: 'part2()'}
var button2 = sceneSync.instantiate('Button',initData,true);
button2.position.set(-425,-200,-500);


var initData = {ownerUserId: user.userId,text: 'Parte 3',funct: 'part3()'}
var button3 = sceneSync.instantiate('Button',initData,true);
button3.position.set(-350,-200,-500);

}


function start(){
	
sceneClear();
createButtons();

render();
}


function render() {  
  requestAnimationFrame(render);

  if (part == 2){
  	//dynamicEllipse.animate();
  	earthPart2.realTimeOrbit();
  }


  sim.scene.updateAllBehaviors();

}  
