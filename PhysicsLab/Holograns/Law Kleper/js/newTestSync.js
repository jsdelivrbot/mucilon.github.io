if (!window.altspace || !window.altspace.inClient) {
   document.write('<h3>To view this example, please open this page in <a href="http://altvr.com"> AltspaceVR </a></h3>');
}



initSystem('start()');


function part1(){

var initData = {ownerUserId: user.userId,radius: 50}
var sun = sceneSync.instantiate('Sun',initData,true);

}

function part2(){

var initData = {ownerUserId: user.userId,name: "Earth",radius: 20}
var earth = sceneSync.instantiate('Planet',initData,true);
earth.position.set(300,150,0);

}


function part3(){

var initData = {ownerUserId: user.userId,text: "teste", size: 20,height: 5,color: 0xffffff,transparent: true,opacity: 0.5};
texto = sceneSync.instantiate('Text',initData,true);
texto.position.set(-300,-150,0);	
	
}


function start(){


var initData = {ownerUserId: user.userId,text: 'Parte 1',funct: 'part1()'}
var button1 = sceneSync.instantiate('Button',initData,true);
button1.position.set(-500,-200,-500);

var initData = {ownerUserId: user.userId,text: 'Parte 2',funct: 'part2()'}
var button2 = sceneSync.instantiate('Button',initData,true);
button2.position.set(-425,-200,-500);


var initData = {ownerUserId: user.userId,text: 'Parte 3',funct: 'part3()'}
var button3 = sceneSync.instantiate('Button',initData,true);
button3.position.set(-350,-200,-500);

render();
}


function render() {
  
  requestAnimationFrame(render);
  sim.scene.updateAllBehaviors();

}  
