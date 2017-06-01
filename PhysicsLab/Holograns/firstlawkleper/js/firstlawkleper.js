if (!window.altspace || !window.altspace.inClient) {
   document.write('<h3>To view this example, please open this page in <a href="http://altvr.com"> AltspaceVR </a></h3>');
}

var dynamicEllipse;
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
var earth = new Planets("Earth",0.976,1.010,0.0000425,0.01,1,sun.x,sun.y,sun.z,sun.scale*50,500,0.005);

dynamicEllipse = new dynamicEllipseControl(earth);

part = 2;

}


function part3(){

sceneClear();
createButtons();

//##################################################### SUN #############################################################################
//Sun(radius,scale,speedRotation,x,y,z)
var sun = new Sun(0.004,5000,0.0001,0,0,0);

var startVectors = new THREE.Vector3(sun.mesh.position.x,sun.mesh.position.y,sun.mesh.position.z);

var endVector = new THREE.Vector3(sun.mesh.position.x - 60,sun.mesh.position.y + 100,sun.mesh.position.z);

var initData = {ownerUserId: user.userId,start: startVectors,end: endVector};
var sunLine = sceneSync.instantiate('Line',initData,true);

var initData = {ownerUserId: user.userId,text: "Sol / Foco 2", size: 10,height: 3,color: 0x000000,transparent: false,opacity: 0.5};
var sunText = sceneSync.instantiate('Text',initData,true);
sunText.position.set(endVector.x - 60,endVector.y,endVector.z);

//################################################# APHELION #############################################################################

//Planets(name,perihelion,aphelion,radius,speedRotation,orbitalPeriod,sunX,sunY,sunZ,scalePlanet,scaleOrbit,velocityCoeff)
var earthAphelion = new Planets("Earth",0.976,1.010,0.0000425,0.01,1,sun.x,sun.y,sun.z,sun.scale*30,500,0.005);
earthAphelion.meshplanet.position.x = earthAphelion.aphelion;

var startVectors = new THREE.Vector3(earthAphelion.meshplanet.position.x,earthAphelion.meshplanet.position.y,earthAphelion.meshplanet.position.z);

var endVector = new THREE.Vector3(earthAphelion.meshplanet.position.x,earthAphelion.meshplanet.position.y + 100,earthAphelion.meshplanet.position.z);

var initData = {ownerUserId: user.userId,start: startVectors,end: endVector};
var aphelionLine = sceneSync.instantiate('Line',initData,true);

var initData = {ownerUserId: user.userId,text: "Afélio", size: 10,height: 3,color: 0x000000,transparent: false,opacity: 0.5};
var aphelionText = sceneSync.instantiate('Text',initData,true);
aphelionText.position.set(endVector.x - 30,endVector.y,endVector.z);

earthAphelion.meshEllipse();

//################################################# PERIHELION #############################################################################

//Planets(name,perihelion,aphelion,radius,speedRotation,orbitalPeriod,sunX,sunY,sunZ,scalePlanet,scaleOrbit,velocityCoeff)
var earthPerihelion = new Planets("Earth",0.976,1.010,0.0000425,0.01,1,sun.x,sun.y,sun.z,sun.scale*30,500,0.005);
earthPerihelion.meshplanet.position.x = -earthPerihelion.perihelion;

var startVectors = new THREE.Vector3(earthPerihelion.meshplanet.position.x,earthPerihelion.meshplanet.position.y,earthPerihelion.meshplanet.position.z);

var endVector = new THREE.Vector3(earthPerihelion.meshplanet.position.x,earthPerihelion.meshplanet.position.y + 100,earthPerihelion.meshplanet.position.z);

var initData = {ownerUserId: user.userId,start: startVectors,end: endVector};
var perihelionLine = sceneSync.instantiate('Line',initData,true);

var initData = {ownerUserId: user.userId,text: "Periélio", size: 10,height: 3,color: 0x000000,transparent: false,opacity: 0.5};
var perihelionText = sceneSync.instantiate('Text',initData,true);
perihelionText.position.set(endVector.x - 30,endVector.y,endVector.z);

//################################################# CENTER #############################################################################

var initData = {ownerUserId: user.userId,radius: 5,color: 0xffffff,transparent: false,opacity: 0.5}
var center = sceneSync.instantiate('Sphere',initData,true);
center.position.set(earthAphelion.meshplanet.position.center,earthAphelion.meshplanet.position.y,earthAphelion.meshplanet.position.z);

var startVectors = new THREE.Vector3(center.position.x,center.position.y,center.position.z);

var endVector = new THREE.Vector3(center.position.x,center.position.y + 100,center.position.);

var initData = {ownerUserId: user.userId,start: startVectors,end: endVector};
var centerLine = sceneSync.instantiate('Line',initData,true);

var initData = {ownerUserId: user.userId,text: "Centro", size: 10,height: 3,color: 0x000000,transparent: false,opacity: 0.5};
var centerText = sceneSync.instantiate('Text',initData,true);
centerText.position.set(endVector.x - 30,endVector.y,endVector.z);

//################################################# FOCUS  #############################################################################

var initData = {ownerUserId: user.userId,radius: 5,color: 0xff0000,transparent: false,opacity: 0.5}
var focus = sceneSync.instantiate('Sphere',initData,true);
focus.position.set(earthAphelion.meshplanet.position.center*2,earthAphelion.meshplanet.position.y,earthAphelion.meshplanet.position.z);

var startVectors = new THREE.Vector3(focus.position.x,focus.position.y,focus.position.z);

var endVector = new THREE.Vector3(focus.position.x + 60,focus.position.y + 100,focus.position.);

var initData = {ownerUserId: user.userId,start: startVectors,end: endVector};
var focusLine = sceneSync.instantiate('Line',initData,true);

var initData = {ownerUserId: user.userId,text: "Centro", size: 10,height: 3,color: 0x000000,transparent: false,opacity: 0.5};
var focusText = sceneSync.instantiate('Text',initData,true);
focusText.position.set(endVector.x - 30,endVector.y,endVector.z);

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
  	dynamicEllipse.animate();
  }


  sim.scene.updateAllBehaviors();

}  
