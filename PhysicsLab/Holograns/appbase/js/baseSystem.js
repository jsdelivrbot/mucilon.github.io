			var sim = new altspace.utilities.Simulation();
			var config = { authorId: 'HoloLab', appId: 'appbase' };
			var sceneSync;
			var enclosure;
			var font;
			var user;
			var functStart;

			function initSystem(funct){
				functStart = funct; 	
				altspace.getUser().then(function(e) {
				user = e;
					new THREE.FontLoader().load('https://cdn.rawgit.com/mrdoob/three.js/r74/examples/fonts/helvetiker_regular.typeface.js',function(e){
						font = e;
								//Get the enclosure
								altspace.getEnclosure().then(function(e) {
									enclosure = e;
									//Connect to sync server
									altspace.utilities.sync.connect(config).then(function(connection) {
										//Retrieve SceneSync
										sceneSync = new altspace.utilities.behaviors.SceneSync(connection.instance, {
											instantiators: {
											'Init': init,
											'Text': createSyncedText,
											'Planet':createSyncedPlanet,
											'Sun':createSyncedSun,
											'Button':createSyncedButton 
											},//Create the cube
											ready: ready//Ready!
										});
										//Add SceneSync to the scene
										sim.scene.addBehavior(sceneSync);
									});
								});
					});
				});
			}


			function ready(firstInstance) {
				if (firstInstance) {
					var initData = {ownerUserId: user.userId};
					sceneSync.instantiate('Init',initData,true);
					
				}
			}

			function init(initData) {

				var text = createText("HoloLab",60,10,0x0000ff,false,0.7)
				text.position.set(-125,100,0);
				var geometry = new THREE.BoxGeometry(100, 50, 1);
				var material = new THREE.MeshBasicMaterial({color: 0x00ccff,transparent: true, opacity: 0.3});
				var cubeText = createText("Iniciar",15,5,0x00000,false,0.7);
				cubeText.position.x = -25;	
				var cube = new THREE.Mesh(geometry, material);


				var button = new THREE.Group();
				button.add(cube);
				button.add(cubeText);

				button.addBehavior(new altspace.utilities.behaviors.Object3DSync({ position: true, rotation: true, scale: true }));
				button.addEventListener('cursordown', function(event) {
					if (user.isModerator == true){
						eval(functStart);
					}
			    });

			    var finalMesh = new THREE.Group();
				finalMesh.add(text);
				finalMesh.add(button);

				sim.scene.add(finalMesh);	
				return finalMesh;
				     
			}

			function sceneClear(){

				while(sim.scene.children.length > 0){ 
	    			sceneSync.destroy(sim.scene.children[0]); 
				}

			}

			
			//var initData = {ownerUserId: user.userId,text: "teste", size: 20,height: 5,color: 0xffffff,transparent: true,opacity: 0.5};
			//sceneSync.instantiate('Text',initData,true);
			function createSyncedText(initData) {

				  var mesh = createText(initData.text,initData.size,initData.height,initData.color,initData.transparent,initData.opacity);
				  mesh.addBehavior(new altspace.utilities.behaviors.Object3DSync({ position: true, rotation: true, scale: true }));
				  sim.scene.add(mesh);
				  return mesh;

			}
			//var initData = {ownerUserId: user.userId,name: Earth,radius: 20}
			//sceneSync.instantiate('Planet',initData,true);
			function createSyncedPlanet(initData) {

				  var mesh = eval("Create"+initData.name+"("+initData.radius+")");
				  mesh.addBehavior(new altspace.utilities.behaviors.Object3DSync({ position: true, rotation: true, scale: true }));
				  sim.scene.add(mesh);
				  return mesh;

			}
			//var initData = {ownerUserId: user.userId,radius: 20}
			//sceneSync.instantiate('Sun',initData,true);
			function createSyncedSun(initData) {

				  var mesh = CreateSun(initData.radius);
				  mesh.addBehavior(new altspace.utilities.behaviors.Object3DSync({ position: true, rotation: true, scale: true }));
				  sim.scene.add(mesh);
				  return mesh;

			}
			//var initData = {ownerUserId: user.userId,text: 'botao1',funct: 'part1()'}
			//sceneSync.instantiate('Button',initData,true);
			function createSyncedButton(initData){

				var geometry = new THREE.BoxGeometry(50, 50, 1);
				var material = new THREE.MeshBasicMaterial({color: 0x00ccff,transparent: true, opacity: 0.3});
				var cube = new THREE.Mesh(geometry, material);
                var text = createText(initData.text,10,3,0x00000,false,0.9);
                text.position.x = -22;

				var button = new THREE.Group();
				button.add(cube);
				button.add(text);

				button.addBehaviors(
					new altspace.utilities.behaviors.Object3DSync({position: true})
				);
				//Add event listeners
				button.addEventListener('cursordown', function(event) {
					if (user.isModerator == true){
						eval(initData.funct);
					}
				});

				sim.scene.add(button);
				return button;

			}


