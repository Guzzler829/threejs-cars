/*

in the future for making ThreeJS projects, USE THIS TO START:
https://github.com/Mugen87/three-jsm


*/


import * as THREE from "../node_modules/three/build/three.module.js";

//import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js";

import { Car } from "./models/car.js"
import { BigTruck } from "./models/bigtruck.js"
import { PickupTruck } from "./models/pickup.js"



//Make scene, camera, and renderer (renderer is the canvas)
const scene = new THREE.Scene();

/* Orthographic camera for preserving the geometries of the vertices

const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 150, cameraHeight = cameraWidth / aspectRatio;


const camera = new THREE.OrthographicCamera(
    cameraWidth / -2, //left
    cameraWidth / 2, //right
    cameraHeight / 2, //top
    cameraHeight / -2, //bottom

);

camera.position.z = 500;

*/

const camera = new THREE.PerspectiveCamera(
    45, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
);

camera.position.z = 350

const renderer = new THREE.WebGLRenderer({antialias: true});

//make background blue
scene.background = new THREE.Color( 0x6969aa );

//make the renderer canvas the full width and height of the window
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);

//append the body with the renderer canvas
document.body.appendChild(renderer.domElement);


//orbit controls babyyyy
//const controls = new OrbitControls( camera, renderer.domElement );
//controls.update();

//lights
const dirLight = new THREE.DirectionalLight(0xffffff, 1)
dirLight.position.x = 16;
dirLight.position.z = 20;
dirLight.position.y = 100;
dirLight.castShadow = true;
scene.add(dirLight);

const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.3)
dirLight2.position.x = -200;
dirLight2.position.z = 40;
dirLight2.position.y = 75;
dirLight2.castShadow = true;
scene.add(dirLight2);

const ambientLight = new THREE.AmbientLight( 0x606060 ); // soft white light
scene.add(ambientLight)




//Car!!11!!1

export const vehicleColors = [0xa82bf0, 0xf03030, 0xf0b630, 0x50f030, 0x3053f0, 0x626d73];

//let carColor = pickRandom(vehicleColors);

// Pick a random value from an array
function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

const vehicles = [Car(), PickupTruck(), BigTruck()];
for(let i in vehicles) {
    vehicles[i].rotation.x = - Math.PI / 2 + 0.12;
    vehicles[i].rotation.z = - Math.PI / 4;

    vehicles[i].position.x = i * 85 - (vehicles.length * 85 / 2);

    scene.add( vehicles[i] );
}



render();
function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);

    //controls.update();
}

//resize the canvas with the window

const resizeHandler = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};
window.addEventListener('resize', resizeHandler);