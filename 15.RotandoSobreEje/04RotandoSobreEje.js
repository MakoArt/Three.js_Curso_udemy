
  let camera 
  let scene 
  let renderer
  let geometry
  let material 
  let mesh   
  let ref 
  let pivotPoint;
  let clock;

        function init() {
            renderer = new THREE.WebGLRenderer();
            renderer.setClearColor('gray',1);
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );

            scene = new THREE.Scene();
            
            //geometria  central 
            geometry = new THREE.BoxGeometry( 1.5, 1.5, 1.5 );
            material = new THREE.MeshBasicMaterial({ color: 'orangered'});
            ref = new THREE.Mesh( geometry, material );
            ref.position.set(0,0,0);
            scene.add( ref );
             
            //creamos el punto de giro 
            pivotPoint = new THREE.Object3D();
            pivotPoint.position.set(0,0,0);
            scene.add( pivotPoint );
             
            //creamos la geometria que va a girar
            geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
            material = new THREE.MeshBasicMaterial({ color: 'green'});
            mesh = new THREE.Mesh( geometry, material );
            
            //Añadimos el objeto al pivot point 
            pivotPoint.add(mesh);
            mesh.position.set(0,2,0)
            
            camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100 );
            camera.position.set (0,0,-4);
            camera.lookAt(pivotPoint.position);
            
          let ambient = new THREE.AmbientLight(0xffffff,0.3);
            scene.add(ambient);
          let light = new THREE.DirectionalLight(0xffffff, 1, 100, 2 );
            light.position.set(10, 20 , 15); 
            light.castShadow = true;
            scene.add(light);

            clock = new THREE.Clock();
            window.addEventListener( 'resize', onWindowResize, false );

        }

      let dir=1;
        function animate() {
            requestAnimationFrame( animate );
            
          let delta =  clock.getDelta();
            //giramos el objeto
            pivotPoint.rotation.z += delta * 2;
            
            renderer.render( scene, camera );
        }
        
        function onWindowResize() {

                windowHalfX = window.innerWidth / 2;
                windowHalfY = window.innerHeight / 2;

                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize( window.innerWidth, window.innerHeight );

        }
        
        window.addEventListener("DOMContentLoaded", function(event) {
            init();
            animate();
        });