function Text(texto,font,size,height,color,transparent,opacity,x,y,z) {
	this.texto = texto;
	this.font = font;
	this.size = size;
	this.height = height;
	this.color = color;
	this.transparent = transparent;
	this.opacity = opacity;
	this.x = x;
	this.y = y;
	this.z = z;
	this.mesh = createText(); 

	function createText(){

	var geometry = new THREE.TextGeometry(texto, {font: font,size: size,height: height });
	var material = new THREE.MeshBasicMaterial({color: color,transparent: transparent, opacity: opacity});
	var mesh = new THREE.Mesh(geometry, material);
	return mesh;

	}


}

function Button(texto,font,funct,width,height,color,transparent,opacity,x,y,z,initData){

	this.texto = texto;
	this.funct = funct;
	this.width = width;
	this.height = height;
	this.color = color;
	this.transparent = transparent;
	this.opacity = opacity;
	this.x = x;
	this.y = y;
	this.z = z;
	var aButton = createButton();

	var initData = { ownerUserId: user.userId, name: texto };
	this.button = sceneSync.instantiate('createSyncedObject', initData, true);
	this.button.add(aButton);



	function createButton(){

		var cube = new THREE.Mesh(
		new THREE.BoxGeometry( width, height, 1 ),
		new THREE.MeshBasicMaterial({color: color, transparent: transparent, opacity: opacity})
		);

        //function Text(text,font,size,height,color,transparent,opacity,x,y,z)
		buttontext = new Text(texto,font,10,3,0x00000,true,0.9,(x - (width + 2)),y,z);

		var button = new THREE.Group();
		button.add(cube);
		button.add(buttontext.mesh);

		button.addBehavior(new altspace.utilities.behaviors.HoverScale({ scale: 1.2, duration: 150 }));
		button.addBehavior(new altspace.utilities.behaviors.HoverColor({ event: 'cursordown', color: new THREE.Color(0x33ff33) }));

				// Assign button event handlers
		button.addEventListener('cursordown', function(event) {
		eval(funct);
		console.log(funct);
		});

		button.position.set(x,y,z);

		return button;
	}


} 