if (!window.altspace || !window.altspace.inClient) {
   document.write('<h3>To view this example, please open this page in <a href="http://altvr.com"> AltspaceVR </a></h3>');
}


var sim;
var connection;
var sceneSync;
var globalEarth;
var part = 1;
var font;
var config = { authorId: 'Mucilon', appId: 'TestSync' };
var initData;


altspace.getUser().then(function(user) {
  initData = { ownerUserId: user.userId };
  loadFont();
});


function syncObj(obj){

globalObj = obj.clone();


}

function loadFont(){
new THREE.FontLoader().load(
      'https://cdn.rawgit.com/mrdoob/three.js/r74/examples/fonts/helvetiker_regular.typeface.js',
      setGlobalFont
);
}

function setGlobalFont(e){

font = e;
connectSync();

}

function connectSync(){

altspace.utilities.sync.connect(config).then(function(connection) {
  main(connection);
});

}

function main(_connection) {
	connection = _connection
	sim = new altspace.utilities.Simulation();
	sceneSync = new altspace.utilities.behaviors.SceneSync(connection.instance);

  sceneSync = new altspace.utilities.behaviors.SceneSync(connection.instance, { instantiators: { 'createSyncedObject': createSyncedObject }, ready: onSyncReady });
  sim.scene.addBehavior(sceneSync);
  start();

}


function onSyncReady(firstInstance){
  if (firstInstance) {
    sceneSync.instantiate('createSyncedObject');
  }
}


function start(){
// function Planets(name,perihelion,aphelion,radius,speedRotation,orbitalPeriod,sunX,sunY,sunZ,scalePlanet,scaleOrbit,velocityCoeff)	
globalEarth = new Planets('Earth',0.976,1.010,0.0000425,0.01,1,0,0,0,600000,500,0.005,initData);

sim.scene.add(globalEarth.meshPlanet);

//function Button(text,font,funct,width,height,color,transparent,opacity,x,y,z)

button1 = new Button('Parte 1',font,'part = 1',50,50,0xfffff,true,0.3,-500,-200,-500,initData);
button2 = new Button('Parte 2',font,'part = 2',50,50,0xfffff,true,0.3,-425,-200,-500,initData);
sim.scene.add(button1.button);
sim.scene.add(button2.button);

render();
}

function render() {
   requestAnimationFrame(render);

   if (part == 1) {
   globalEarth.meshPlanet.rotation.y += globalEarth.speedRotation;
  }

  sim.scene.updateAllBehaviors();
}  