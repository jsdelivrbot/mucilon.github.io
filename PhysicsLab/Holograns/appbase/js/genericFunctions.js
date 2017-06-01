  function createText(text,size,height,color,transparent,opacity) {

    var geometry = new THREE.TextGeometry(text,{font: font,size: size,height: height });
    var material = new THREE.MeshBasicMaterial({color: color,transparent: transparent, opacity: opacity});
    var mesh = new THREE.Mesh(geometry, material);
    return mesh;

  }