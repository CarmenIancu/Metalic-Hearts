var camera, scene, renderer;
var shapes = [];
init();

function init(){

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.set( 0, 150, 500 );
  scene.add( camera );

  // transform objects
  camera.position.x = 100;
  camera.position.y = -80;
  camera.position.z = 90;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  var light = new THREE.DirectionalLight(0x9955ff, 1);
  light.position.x = 200;
  light.position.y = 200;
  light.position.z = 200;
  camera.add( light );

    var light = new THREE.DirectionalLight(0x9955ff, 2);
  light.position.x = 50;
  light.position.y = 50;
  light.position.z = 50;
  camera.add( light );
  
 scene.background = new THREE.Color( '#606060' );
 
  var x = 0, y = 0;
  var heartShape = new THREE.Shape();
  heartShape.moveTo( x + 25, y + 25 );
  heartShape.bezierCurveTo( x + 25, y + 25, x + 20, y, x, y );
  heartShape.bezierCurveTo( x - 30, y, x - 30, y + 35,x - 30,y + 35 );
  heartShape.bezierCurveTo( x - 30, y + 55, x - 10, y + 77, x + 25, y + 95 );
  heartShape.bezierCurveTo( x + 60, y + 77, x + 80, y + 55, x + 80, y + 35 );
  heartShape.bezierCurveTo( x + 80, y + 35, x + 80, y, x + 50, y );
  heartShape.bezierCurveTo( x + 35, y, x + 25, y + 25, x + 25, y + 25 );

  
  var extrudeSettings = { amount: 1, bevelEnabled: true, bevelSegments: 20, steps: 2, bevelSize: 10, bevelThickness: 30 };
  
addShape( heartShape,  extrudeSettings, '#ff0000', 0.35, 0.85,  20, 20, 20, 
               Math.random()*0.6, Math.random()*0.6, Math.PI, 0.1+Math.random()*0.3);

  
addShape( heartShape,  extrudeSettings, '#ffff00', 0.35, 0.85,  10, 10, 10, 
             Math.random()*0.6, Math.random()*0.6, Math.PI, 0.1+Math.random()*0.3 );

addShape( heartShape,  extrudeSettings, '#FF69B4', 0.25, 0.35,   0, 0, 0, 
             Math.random()*0.6, Math.random()*0.6, Math.PI, 0.1+Math.random()*0.3 );

 addShape( heartShape,  extrudeSettings, '#00FF00', 0.45, 0.6,  -10, -10, -10, 
            Math.random()*0.6, Math.random()*0.6, Math.PI, 0.1+Math.random()*0.3 );


  renderer = new THREE.WebGLRenderer();
  document.getElementById('container').appendChild(renderer.domElement);
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
  
  }
function addShape( shape, extrudeSettings, color, roughness, metalness, x, y, z, rx, ry, rz, s) {
  var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
  var material = new THREE.MeshStandardMaterial( {color:color, roughness:roughness, metalness: metalness});
  var mesh = new THREE.Mesh( geometry, material);
  mesh.position.set( x+25, y-50, z );
  mesh.rotation.set( rx, ry, rz );
  mesh.scale.set( s, s, s );  
  shapes.push({shape: mesh, x: Math.random(), y: Math.random(), z: Math.random()});
  scene.add(mesh);
}

function animate() {
  var speed = 0.02;
  shapes.forEach(el => {
    el.shape.rotation.x += el.x * speed;
    el.shape.rotation.y += el.y * speed;
  });
}

function render() {
    requestAnimationFrame(render);
    animate();
    renderer.render(scene, camera);
}

