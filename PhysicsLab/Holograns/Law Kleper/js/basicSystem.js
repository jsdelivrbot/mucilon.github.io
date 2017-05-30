var font;
var user;
var sim;
var connection;
var sceneSync;


//funct = your hologram start function example 'start()'
function initSystem(funct) {

new THREE.FontLoader().load('https://cdn.rawgit.com/mrdoob/three.js/r74/examples/fonts/helvetiker_regular.typeface.js',function(e){

	font = e;

		altspace.getUser().then(function(e) {
			user = e;
			altspace.utilities.sync.connect(config).then(function(connection) {
	  			main(connection,funct);		
			});

		});
	});

}

function main(_connection){	
	connection = _connection
	sim = new altspace.utilities.Simulation();
	sceneSync = new altspace.utilities.behaviors.SceneSync(connection.instance);
  	sceneSync = new altspace.utilities.behaviors.SceneSync(connection.instance, { instantiators: { 
  		'createSyncedObject': createSyncedObject 
  	}, ready: onSyncReady });
  	sim.scene.addBehavior(sceneSync);
  	eval(funct);
}


//var initData = { ownerUserId: user.userId, name: 'ObjName' };
//var mySyncedObj = sceneSync.instantiate('createSyncedObject', initData, true /* removes the object from the scene for everyone when you disconnect */);
//mySyncedObj.add(myMesh);

function createSyncedObject(initData) {
    var obj = new THREE.Object3D();
    obj.name = initData.name;
    obj.addBehavior(new altspace.utilities.behaviors.Object3DSync({ position: true, rotation: true, scale: true }));
    sim.scene.add(obj);
    return obj;
}


function onSyncReady(firstInstance){
  if (firstInstance) {
    sceneSync.instantiate('createSyncedObject');
  }
}

