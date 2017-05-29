if (!window.altspace || !window.altspace.inClient) {
   document.write('<h3>To view this example, please open this page in <a href="http://altvr.com"> AltspaceVR </a></h3>');
}


var sim;
var connection;
var sceneSync;
var globalEarth;
var part = 1;
var config = { authorId: 'Mucilon', appId: 'TestSync' };


altspace.utilities.sync.connect(config).then(function(connection) {
	main(connection);
});


function main(_connection) {
	connection = _connection
	sim = new altspace.utilities.Simulation();
	sceneSync = new altspace.utilities.behaviors.SceneSync(connection.instance);
    sim.scene.addBehavior(sceneSync);
    start();

}


function start(){
// function Planets(name,perihelion,aphelion,radius,speedRotation,orbitalPeriod,sunX,sunY,sunZ,scalePlanet,scaleOrbit,velocityCoeff)	
globalEarth = new Planets('Earth',0.976,1.010,0.0000425,0.01,1,0,0,0,600000,500,0.005);

sim.scene.add(globalEarth.meshPlanet);


button1 = new Button('Parte 1','part = 1');
button1.position.set(-500, -200, -500);
button2 = new Button('Parte 2','part = 2');
button2.position.set(-425, -200, -500);

sim.scene.add(button1);

render();
}

function render() {
   requestAnimationFrame(render);

   if (part == 1) {
   globalEarth.meshPlanet.rotation.y += globalEarth.speedRotation;
  }

  sim.scene.updateAllBehaviors();
}  