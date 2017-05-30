function SunMaterial(){
	
	var texture = THREE.ImageUtils.loadTexture('../../images/sunmap.jpg')
    var material = new THREE.MeshPhongMaterial({
    map : texture,
    bumpMap : texture,
    bumpScale: 0.05,
   })

return material;

}

function EarthMaterial(){

   var material = new THREE.MeshPhongMaterial({
    map  : THREE.ImageUtils.loadTexture('../../images/earthmap1k.jpg'),
    bumpMap  : THREE.ImageUtils.loadTexture('../../images/earthbump1k.jpg'),
    bumpScale : 0.05,
    specularMap : THREE.ImageUtils.loadTexture('../../images/earthspec1k.jpg'),
    specular : new THREE.Color('grey'),
   })

return material;

}

function createSyncedPlanet(initData) {

	var geometry = new THREE.SphereGeometry(1, 32, 32);
	var material = eval(initData.name+'Material()');
	var obj = new THREE.Mesh(geometry, material); //var obj = new THREE.Object3D();
    obj.name = initData.name;
    obj.addBehavior(new altspace.utilities.behaviors.Object3DSync({ position: true, rotation: true, scale: true }));
    scene.add(obj);
    return obj;

}

//create sync obj exemple

var initData = { ownerUserId: user.userId, name: 'Earth' };
var mySyncedEarth = sceneSync.instantiate('createSyncedPlanet', initData, true);
mySyncedEarth.scale(scaleEarth,scaleEarth,scaleEarth);



//#############################################################################################################################################
//#############################################################################################################################################

function createSyncedObject(initData) {
    var obj = new THREE.Object3D();
    obj.name = initData.name;
    obj.addBehavior(new altspace.utilities.behaviors.Object3DSync({ position: true, rotation: true, scale: true }));
    scene.add(obj);
    return obj;
}

var initData = { ownerUserId: user.userId, name: 'Earth' };
var mySyncedEarth = sceneSync.instantiate('createSyncedPlanet', initData, true);
mySyncedEarth.add(CreateEarth(radius)); //mySyncedEarth.add(myMesh);

