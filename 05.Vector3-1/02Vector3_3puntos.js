


let camera 
let scene 
let renderer
let geometry 
let material 
let mesh
let clock
 
function init() {

renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


scene = new THREE.Scene();


//con tres puntos 
material=new THREE.MeshBasicMaterial({color:'red'})
geometry = new THREE.BufferGeometry();
 const points=[
 new THREE.Vector3( -1,  1, 0 ),
 new THREE.Vector3( -1, -1, 0 ),
 new THREE.Vector3(  1, -1, 0 )
 ]

geometry.setFromPoints(points)
geometry.computeVertexNormals()
mesh = new THREE.Mesh( geometry, material );

 scene.add(mesh)







camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,100 );
camera.position.set(0,0,-3);
camera.lookAt(mesh.position);

clock = new THREE.Clock();
window.addEventListener( 'resize', onWindowResize, false );
}



let dir=1;

function animate() {
requestAnimationFrame( animate );
let delta =  clock.getDelta();
 mesh.rotation.x += delta * 0.5;
 mesh.rotation.y += delta * 2;
 mesh.position.x += dir*delta;
 
if (mesh.position.x > 2) {
dir=-1;
} else if (mesh.position.x < - 2)  {
dir=1;
}
renderer.render( scene, camera );
}
 
 
function onWindowResize() {
windowHalfX = window.innerWidth / 2;
windowHalfY = window.innerHeight / 2;
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize( window.innerWidth, window.innerHeight );
}
 
init();
animate();