if (!window.altspace || !window.altspace.inClient) {
   document.write('<h3>To view this example, please open this page in <a href="http://altvr.com"> AltspaceVR </a></h3>');
}

var globalEarth;
var part = 1;

initSystem('start()');


function start(){


//globalEarth = new Planets('Earth',0.976,1.010,0.0000425,0.01,1,0,0,0,600000,500,0.005);


button1 = new Button('Parte 1',font,'part1()',50,50,0xfffff,true,0.3,-500,-200,-500);
button2 = new Button('Parte 2',font,'part = 2',50,50,0xfffff,true,0.3,-425,-200,-500);

//render();
}

function part1(){

text1 = new Text('parte 1',font,50,30,0x00000,true,0.9,0,0,0);
var obj = sceneSync.instantiate('createSyncedObject', initData, true);
obj.add(text1.mesh);
sim.scene.updateAllBehaviors();
}


function render() {
   requestAnimationFrame(render);

   if (part == 1) {
   globalEarth.obj.rotation.y += globalEarth.speedRotation;
  }

  sim.scene.updateAllBehaviors();
}  


