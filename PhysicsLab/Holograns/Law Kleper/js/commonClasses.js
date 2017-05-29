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

	var geometry = new THREE.TextGeometry(texto, {font: this.font,size: this.size,height: this.height });
	var material = new THREE.MeshBasicMaterial({color: this.color,transparent: this.transparent, opacity: this.opacity});
	var mesh = new THREE.Mesh(geometry, material);
	return mesh;

	}


}

function Button(texto,font,funct,width,height,color,transparent,opacity,x,y,z){

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
	this.button = createButton();


	function createButton(){

		var cube = new THREE.Mesh(
		new THREE.BoxGeometry( this.width, this.height, 1 ),
		new THREE.MeshBasicMaterial({color: this.color, transparent: this.transparent, opacity: this.opacity})
		);

        //function Text(text,font,size,height,color,transparent,opacity,x,y,z)
		buttontext = new Text(texto,font,10,3,0x00000,true,0.9,(this.x - (this.width/2)),this.y,this.z);

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

		return button;
	}


} 