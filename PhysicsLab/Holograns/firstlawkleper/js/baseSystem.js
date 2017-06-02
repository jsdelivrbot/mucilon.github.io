			var sim = new altspace.utilities.Simulation();
			var config = { authorId: 'HoloLab', appId: 'firstlawkleper' };
			var sceneSync;
			var enclosure;
			var font;
			var user;
			var functStart;
			var vectorsEllipse;

			function initSystem(funct){
				functStart = funct; 	
				altspace.getUser().then(function(e) {
				user = e;
					new THREE.FontLoader().load('../../fonts/helvetiker_regular.typeface.json',function(e){
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
											'Button':createSyncedButton,
											'Ellipse': createSyncedEllipse,
											'DynEllipse': createSyncedDynamicEllipse,
											'Line': createSyncedLine,
											'Sphere': createSyncedSphere 
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
				text.position.set(-125,200,0);
				var textAppName = createText("1° Lei de Kleper",40,10,0xffffff,false,0.7)
				textAppName.position.set(-200,100,0);
				var geometry = new THREE.BoxGeometry(100, 50, 1);
				var material = new THREE.MeshBasicMaterial({color: 0x00ccff,transparent: true, opacity: 0.3});
				var cubeText = createText("Iniciar",15,5,0x00000,false,0.7);
				cubeText.position.x = -25;	
				var cube = new THREE.Mesh(geometry, material);



				var button = new THREE.Group();
				button.add(cube);
				button.add(cubeText);

			//	button.addBehavior(new altspace.utilities.behaviors.Object3DSync({ position: true, rotation: true, scale: true }));
				button.addEventListener('cursordown', function(event) {
					if (user.isModerator == true){
						eval(functStart);
					}
			    });

			    var finalMesh = new THREE.Group();
			    finalMesh.addBehavior(new altspace.utilities.behaviors.Object3DSync({ position: true, rotation: true, scale: true }));
				finalMesh.add(text);
				finalMesh.add(textAppName);
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

				  var mesh = eval("Create"+ initData.name + "(" + initData.radius + ")");
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

			//var initData = {ownerUserId: user.userId,largerRadius: 200,minorRadius: 100,x: 0,y: 0,z: 0}
			//sceneSync.instantiate('Ellipse',initData,true);
			function createSyncedEllipse(initData){

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

				 var path = new Ellipse(initData.largerRadius,initData.minorRadius);

				 var pathSegments = 64;
				 var tubeRadius = 0.5;
				 var radiusSegments = 16;
				 var closed = true;

				 var geometry = new THREE.TubeGeometry( path, pathSegments, tubeRadius, radiusSegments, closed );

				 var material = new THREE.MeshPhongMaterial( {color: 0xffffff } );
				             // mesh
				 var mesh = new THREE.Mesh( geometry, material );

				 mesh.addBehavior(new altspace.utilities.behaviors.Object3DSync({ position: true, rotation: true, scale: true }));

				 mesh.position.set(initData.x, initData.y, initData.z);

				 sim.scene.add(mesh);

				 return mesh;

			}

			//var initData = {ownerUserId: user.userId,vectors: vectorsArray}
			//sceneSync.instantiate('DynEllipse',initData,true);
			function createSyncedDynamicEllipse(initData){

				var pathSegments = 32;
				var tubeRadius = 2;
				var radiusSegments = 8;
				var closed = true; 

				var path = new THREE.CatmullRomCurve3(initData.vectors);

				var geometry = new THREE.TubeGeometry( path, pathSegments, tubeRadius, radiusSegments, closed );
				             
				var material = new THREE.MeshPhongMaterial({color: 0xff0000});
				                // mesh
				var mesh = new THREE.Mesh( geometry, material );
				mesh.addBehavior(new altspace.utilities.behaviors.Object3DSync({ position: true, rotation: true, scale: true }));

				sim.scene.add(mesh);

				return mesh;

			}

			//var initData = {ownerUserId: user.userId,start: startVectors,end: endVector}
			//sceneSync.instantiate('Line',initData,true);
			function createSyncedLine(initData){

				var pathSegments = 32;
				var tubeRadius = 0.5;
				var radiusSegments = 8;
				var closed = true; 
	

				var startVector =  new THREE.Vector3(initData.x0,initData.y0,initData.z0); //initData.startVector
				var endVector =  new THREE.Vector3(initData.x1,initData.y1,initData.sz1); //initData.endVector 
				var path = new THREE.LineCurve3(startVector,endVector);

				var geometry = new THREE.TubeGeometry( path, pathSegments, tubeRadius, radiusSegments, closed );
						             
				var material = new THREE.MeshPhongMaterial( {color: 0xffffff} );
						                // mesh
				var mesh = new THREE.Mesh( geometry, material );
				mesh.addBehavior(new altspace.utilities.behaviors.Object3DSync({ position: true, rotation: true, scale: true }));

				sim.scene.add(mesh);

				return mesh;


			}

			//var initData = {ownerUserId: user.userId,radius: 20,color: 0xffffff,transparent: true,opacity: 0.5}
			//sceneSync.instantiate('Sphere',initData,true);
			function createSyncedSphere(initData){

				   var geometry = new THREE.SphereGeometry(initData.radius, 32, 32)
				   var material = new THREE.MeshPhongMaterial({color: initData.color,transparent: initData.transparent,opacity: initData.opacity})
				   var mesh = new THREE.Mesh(geometry, material);
				   mesh.addBehavior(new altspace.utilities.behaviors.Object3DSync({ position: true, rotation: true, scale: true }));
				   sim.scene.add(mesh);
				   return mesh 

			}


