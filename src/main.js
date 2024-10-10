import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';

//renderer
const canvas = document.querySelector('#three-canvas');
const renderer = new THREE.WebGLRenderer({
    //canvas: canvas,
    canvas,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
renderer.shadowMap.enabled = true;

//scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('White');

//camera
const camera = new THREE.PerspectiveCamera(
    60,//fove
    window.innerWidth / window.innerHeight,//aspect
    0.1,//near
    1000//far
);
//camera x,y,z
camera.position.set(-1, 3, 7);
scene.add(camera);

//controls
const controls = new OrbitControls( camera, renderer.domElement ); //mouseclick cam controls

//Light
const ambientLight = new THREE.AmbientLight('white', 1);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight('white', 3);//directionallight
dirLight.position.set(-3, 5, 1);
dirLight.castShadow = true;
scene.add(dirLight);

//mesh
//sonic shoe dust
const dust = new THREE.Mesh(
    new THREE.ConeGeometry(3, 5),//gemoetry
    //new THREE.MeshBasicMaterial({color: 'blue'})//materials test
    new THREE.MeshLambertMaterial({
        color: '#ffd78f',
        side: THREE.DoubleSide
    })
);
dust.rotation.z = THREE.MathUtils.degToRad(-90);
dust.position.x = -2;
dust.position.y = -1;
dust.castShadow = true;

//grass
const groundMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 10),
    new THREE.MeshLambertMaterial({
        color: 'green',
        side: THREE.DoubleSide
    })
);
groundMesh.rotation.x = THREE.MathUtils.degToRad(-90);
groundMesh.position.y = -1;
groundMesh.receiveShadow = true;

//sonic body
const sbody = new THREE.Mesh(
    new THREE.SphereGeometry(2),
    new THREE.MeshLambertMaterial({
        color: 'blue',
        side: THREE.DoubleSide
    })
);
sbody.position.x = 1;
sbody.position.y = 1;
sbody.castShadow = true;

//kusa
const kusa = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshLambertMaterial({
        color: 'red',
        side: THREE.DoubleSide
    })
);
kusa.position.x = 1;
kusa.position.y = -1;
kusa.castShadow = true;

//ring yellow
const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1, .11, 2),
    new THREE.MeshLambertMaterial({
        color: 'yellow',
        side: THREE.DoubleSide
    })
);
ring.position.x = 14;
ring.position.y = 1;
ring.castShadow = true;

//next bg
const bg = new THREE.Mesh(
    new THREE.CylinderGeometry(2, 2, 50),
    new THREE.MeshLambertMaterial({
        color: 'orange',
        side: THREE.DoubleSide
    })
);
bg.position.z = -9;

scene.add(dust, groundMesh, sbody, ring, kusa, bg);//all scenes

camera.lookAt(sbody.position);

//draw/animate
//let boxMeshY = 1; sample 1
const clock = new THREE.Clock();
function draw() {

    const delta = clock.getDelta(); //timer reference
    //console.log(delta);
    dust.position.x += delta * 20; //loops at beningging
    if (dust.position.x > 20) {
        dust.position.x = -20;
    }

    sbody.position.x += delta * 20; //loops at beningging
    if (sbody.position.x > 20) {
        sbody.position.x = -20;
    }

    kusa.position.x += delta * 20; //loops at beningging
    if (kusa.position.x > 20) {
        kusa.position.x = -20;
    }

    dust.position.x += 0.01;

    sbody.rotation.z += 0.01;
    sbody.position.x += 0.01;

    kusa.rotation.y += .1;
    kusa.rotation.x += .1;
    kusa.position.x += 0.01;

    ring.rotation.y += .1;

    bg.rotation.z += .01;

    //boxMeshY += 0.01; /sample 1
    //boxMesh.position.y = boxMeshY; //sampe 1
    //console.log(boxMeshY); //sample 1
    renderer.render(scene, camera);
    controls.update();
    //window.requestAnimationFrame(draw); //this or tje one below 
    renderer.setAnimationLoop(draw);
}

draw();

function setLayout() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

//events
window.addEventListener( 'resize', setLayout);
