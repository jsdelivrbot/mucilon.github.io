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



function createMercury(radius){
  var geometry  = new THREE.SphereGeometry(radius, 32, 32)
  var material  = new THREE.MeshPhongMaterial({
    map : THREE.ImageUtils.loadTexture('../../images/mercurymap.jpg'),
    bumpMap : THREE.ImageUtils.loadTexture('../../images/mercurybump.jpg'),
    bumpScale: 0.005,
  })
  var mesh  = new THREE.Mesh(geometry, material)
  return mesh 
}

function createVenus(radius){
  var geometry  = new THREE.SphereGeometry(radius, 32, 32)
  var material  = new THREE.MeshPhongMaterial({
    map : THREE.ImageUtils.loadTexture('../../images/venusmap.jpg'),
    bumpMap : THREE.ImageUtils.loadTexture('../../images/venusbump.jpg'),
    bumpScale: 0.005,
  })
  var mesh  = new THREE.Mesh(geometry, material)
  return mesh 
}


function createMoon(radius){
  var geometry  = new THREE.SphereGeometry(radius, 32, 32)
  var material  = new THREE.MeshPhongMaterial({
    map : THREE.ImageUtils.loadTexture('../../images/moonmap1k.jpg'),
    bumpMap : THREE.ImageUtils.loadTexture('../../images/moonbump1k.jpg'),
    bumpScale: 0.002,
  })
  var mesh  = new THREE.Mesh(geometry, material)
  return mesh 
}

function createMars(radius){
  var geometry  = new THREE.SphereGeometry(radius, 32, 32)
  var material  = new THREE.MeshPhongMaterial({
    map : THREE.ImageUtils.loadTexture('../../images/marsmap1k.jpg'),
    bumpMap : THREE.ImageUtils.loadTexture('../../images/marsbump1k.jpg'),
    bumpScale: 0.05,
  })
  var mesh  = new THREE.Mesh(geometry, material)
  return mesh 
}

function createJupiter(radius){
  var geometry  = new THREE.SphereGeometry(radius, 32, 32)
  var texture = THREE.ImageUtils.loadTexture('../../images/jupitermap.jpg')
  var material  = new THREE.MeshPhongMaterial({
    map : texture,
    bumpMap : texture,
    bumpScale: 0.02,
  })
  var mesh  = new THREE.Mesh(geometry, material)
  return mesh 
}


function createSaturn(radius){
  var geometry  = new THREE.SphereGeometry(radius, 32, 32)
  var texture = THREE.ImageUtils.loadTexture('../../images/saturnmap.jpg')
  var material  = new THREE.MeshPhongMaterial({
    map : texture,
    bumpMap : texture,
    bumpScale: 0.05,
  })
  var mesh  = new THREE.Mesh(geometry, material)
  return mesh 
}




function createUranus(radius){
  var geometry  = new THREE.SphereGeometry(radius, 32, 32)
  var texture = THREE.ImageUtils.loadTexture('../../images/uranusmap.jpg')
  var material  = new THREE.MeshPhongMaterial({
    map : texture,
    bumpMap : texture,
    bumpScale: 0.05,
  })
  var mesh  = new THREE.Mesh(geometry, material)
  return mesh 
}



function createNeptune(radius){
  var geometry  = new THREE.SphereGeometry(radius, 32, 32)
  var texture = THREE.ImageUtils.loadTexture('../../images/neptunemap.jpg')
  var material  = new THREE.MeshPhongMaterial({
    map : texture,
    bumpMap : texture,
    bumpScale: 0.05,
  })
  var mesh  = new THREE.Mesh(geometry, material)
  return mesh 
}



function createPluto(radius){
  var geometry  = new THREE.SphereGeometry(radius, 32, 32)
  var material  = new THREE.MeshPhongMaterial({
    map : THREE.ImageUtils.loadTexture('../../images/plutomap1k.jpg'),
    bumpMap : THREE.ImageUtils.loadTexture('../../images/plutobump1k.jpg'),
    bumpScale: 0.005,
  })
  var mesh  = new THREE.Mesh(geometry, material)
  return mesh 
}

function createStarfield(radius){
  var texture = THREE.ImageUtils.loadTexture('../../images/galaxy_starfield.png')
  var material  = new THREE.MeshBasicMaterial({
    map : texture,
    side  : THREE.BackSide
  })
  var geometry  = new THREE.SphereGeometry(radius, 32, 32)
  var mesh  = new THREE.Mesh(geometry, material)
  return mesh 
}

