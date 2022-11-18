/*

in the future for making ThreeJS projects, USE THIS TO START:
https://github.com/Mugen87/three-jsm


*/


import * as THREE from "../node_modules/three/build/three.module.js";

//import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js";

import { Car } from "./models/car.js"
import { BigTruck } from "./models/bigtruck.js"
import { PickupTruck } from "./models/pickup.js"
import { Plane } from "./models/plane.js"



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

class ThirdPersonCamera {
    constructor(params) {
    this._params = params;
    this._camera = params.camera;

    this._currentPosition = new THREE.Vector3();
    this._currentLookat = new THREE.Vector3();
    }

    _CalculateIdealOffset() {
    const idealOffset = new THREE.Vector3(-15, 20, -30);
    idealOffset.applyQuaternion(this._params.target.Rotation);
    idealOffset.add(this._params.target.Position);
    return idealOffset;
    }

    _CalculateIdealLookat() {
    const idealLookat = new THREE.Vector3(0, 10, 50);
    idealLookat.applyQuaternion(this._params.target.Rotation);
    idealLookat.add(this._params.target.Position);
    return idealLookat;
    }

    Update(timeElapsed) {
    const idealOffset = this._CalculateIdealOffset();
    const idealLookat = this._CalculateIdealLookat();

    // const t = 0.05;
    // const t = 4.0 * timeElapsed;
    const t = 1.0 - Math.pow(0.001, timeElapsed);

    this._currentPosition.lerp(idealOffset, t);
    this._currentLookat.lerp(idealLookat, t);

    this._camera.position.copy(this._currentPosition);
    this._camera.lookAt(this._currentLookat);
    }
}


const camera = new THREE.PerspectiveCamera(
    70, 
    window.innerWidth / window.innerHeight, 
    55, 
    1500
);

camera.position.set( 0, 80, 200 );

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

const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(10000, 10000, 2),
    new THREE.MeshStandardMaterial({ color: 0x211e2b })
);
ground.receiveShadow = true;
ground.rotation.x = -Math.PI / 2;
scene.add(ground);


//Key input
let keys = {
    a: false,
    s: false,
    d: false,
    w: false
};

document.body.addEventListener( 'mousemove', function(e) {
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    
});

document.body.addEventListener( 'keydown', function(e) {
    
    var key = e.code.replace('Key', '').toLowerCase();
    if ( keys[ key ] !== undefined )
    keys[ key ] = true;
    
});
document.body.addEventListener( 'keyup', function(e) {
    
    var key = e.code.replace('Key', '').toLowerCase();
    if ( keys[ key ] !== undefined )
    keys[ key ] = false;
    
});

var time = 0;
var newPosition = new THREE.Vector3();
var matrix = new THREE.Matrix4();

var stop = 1;

var DEGTORAD = 0.01745327;
var temp = new THREE.Vector3;
var dir = new THREE.Vector3;
var eye = new THREE.Vector3;
var a = new THREE.Vector3;
var b = new THREE.Vector3;
var raycaster = new THREE.Raycaster;
var mouse = new THREE.Vector2;
var environment = [];
var coronaSafetyDistance = 0.3;
var goalDistance = coronaSafetyDistance;
var velocity = 0.0;
var speed = 0.0;
//var tip = 0;
var trafficCones = [];



//grid!!!
var gridHelper = new THREE.GridHelper( 1000, 50 );
scene.add( gridHelper );

//Car!!11!!1

export const vehicleColors = [0xa82bf0, 0xf03030, 0xf0b630, 0x50f030, 0x3053f0, 0x626d73];

//let carColor = pickRandom(vehicleColors);

// Pick a random value from an array
function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

const playerTruck = Car();
playerTruck.rotation.x = - Math.PI / 2;

let goal = new THREE.Object3D;
let follow = new THREE.Object3D;
goal.add( camera );
follow.position.z = -coronaSafetyDistance;
playerTruck.add( follow );

scene.add(playerTruck);

const buildingColors = [0x858585, 0x4a567d, 0x7d564a, 0x4f7a48];

var rand = Math.random;

for ( var x = 0; x < 10; x ++ ) {
    for ( var y = 0; y < 10; y ++ ) {
        
        let buildingHeight = 120 - rand() * 60;
        let building = new THREE.Mesh(
            new THREE.BoxGeometry(40, buildingHeight, 40),
            new THREE.MeshLambertMaterial({ color: pickRandom(buildingColors) })
        );
    
        building.position.set(  (( x - 5 ) / 10) * 3000 + 100, buildingHeight, (( y - 5 ) / 10) * 3000 + 100);
        building.scale.set( 1 + rand() * 2, 2, 1 + rand() * 2 );
        building.castShadow = true;
        building.receiveShadow = true;
        scene.add( building );
        
        environment.push( building );
        
    }
}

addTrafficCones(2500);

/*
const vehicles = [Car(), PickupTruck(), BigTruck(), Plane()];
for(let i in vehicles) {
    vehicles[i].rotation.x = - Math.PI / 2 + 0.12;
    vehicles[i].rotation.z = - Math.PI / 4;

    vehicles[i].position.x = i * 85 - (vehicles.length * 85 / 2);

    scene.add( vehicles[i] );
}
*/

render();
function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);

    updatePlayerVehicle(playerTruck)

    //controls.update();
}

function updatePlayerVehicle(mesh) {
    speed = 0.0;
    const friction = 0.95;
    const acceleration = 0.265;

    if ( keys.w )
    speed = acceleration;
    else if ( keys.s )
    speed = -acceleration;

    velocity += speed;
    velocity *= friction;
    mesh.translateX( velocity );

    if ( keys.a ){
        mesh.rotateZ(velocity / 200);
        // tip -= 0.1;
    } else if ( keys.d ) {
        mesh.rotateZ(-velocity / 200);
        // tip += 0.1;
    }
    // tip *= 0.5;
    // mesh.rotation.y = tip;
    
    
    a.lerp(mesh.position, 0.4);
    b.copy(goal.position);
    
    temp.setFromMatrixPosition(camera.matrixWorld);
    
    
    
    dir.copy( a ).sub( b ).normalize();
    
    eye.copy(dir).negate();
    raycaster.set( a, eye );
    var intersects = raycaster.intersectObjects( environment );

    var distance = coronaSafetyDistance;
    
    if ( intersects && intersects.length ) {
        var space = intersects[0].distance;
        var radius = .2;
        
        // Pick the shorter distance
        distance = Math.min( distance, space - radius );
        
    }
    
    goalDistance += ( distance - goalDistance ) * 0.2;
    
    let dis = a.distanceTo( b ) - goalDistance;
    
    goal.position.addScaledVector( dir, dis );
    temp.setFromMatrixPosition(follow.matrixWorld);
    goal.position.lerp(temp, 2);
    
    camera.lookAt( mesh.position );
}

function addTrafficCones(number) {
    for(let i = 0; i < number; i++) {
        let cone = new THREE.Mesh(
            new THREE.ConeGeometry(5, 10, 16),
            new THREE.MeshLambertMaterial({color: 0xff8c00})
        )
        cone.position.set(Math.random() * 10000, 10, Math.random() * 10000);
        scene.add(cone);
        trafficCones.push(cone);
    }
}

//resize the canvas with the window

const resizeHandler = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};
window.addEventListener('resize', resizeHandler);