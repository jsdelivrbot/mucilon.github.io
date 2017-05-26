  function CreateSun(radius){
   var geometry = new THREE.SphereGeometry(radius, 32, 32)
   var texture = THREE.ImageUtils.loadTexture('../../images/sunmap.jpg')
   var material = new THREE.MeshPhongMaterial({
    map : texture,
    bumpMap : texture,
    bumpScale: 0.05,
   })
   var mesh = new THREE.Mesh(geometry, material);
   return mesh 
  };


  function CreateEarth(radius){
   var geometry = new THREE.SphereGeometry(radius, 32, 32)
   var material = new THREE.MeshPhongMaterial({
    map  : THREE.ImageUtils.loadTexture('../../images/earthmap1k.jpg'),
    bumpMap  : THREE.ImageUtils.loadTexture('../../images/earthbump1k.jpg'),
    bumpScale : 0.05,
    specularMap : THREE.ImageUtils.loadTexture('../../images/earthspec1k.jpg'),
    specular : new THREE.Color('grey'),
   })
   var mesh = new THREE.Mesh(geometry, material);
   return mesh 
  };