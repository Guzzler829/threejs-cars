import { vehicleColors } from "../index.js";

export function Plane() {

    const plane = new THREE.Group();

    const color = pickRandom(vehicleColors);

    const main = new THREE.Mesh(
        new THREE.CapsuleGeometry(7.5, 64, 2, 12), 
        new THREE.MeshLambertMaterial({ color: color }) 
    );
    main.rotation.z = Math.PI / 2;
    main.castShadow = true;
    main.receiveShadow = true;
    plane.add(main);

    const wings = new THREE.Mesh(
        new THREE.BoxGeometry(15, 96, 5), 
        new THREE.MeshLambertMaterial({ color: color }) 
    );
    wings.position.x = 2;
    wings.castShadow = true;
    wings.receiveShadow = true;
    plane.add(wings);

    const horizontalStabilizer = new THREE.Mesh(
        new THREE.BoxGeometry(12, 45, 5),
        new THREE.MeshLambertMaterial({ color: color })         
    )
    horizontalStabilizer.position.x = -26;
    horizontalStabilizer.castShadow = true;
    horizontalStabilizer.receiveShadow = true;
    plane.add(horizontalStabilizer);

    const verticalStabilizer = new THREE.Mesh(
        new THREE.BoxGeometry(10, 5, 26),
        new THREE.MeshLambertMaterial({ color: color })         
    )
    verticalStabilizer.position.x = -28;
    verticalStabilizer.position.z = 5.5;
    verticalStabilizer.castShadow = true;
    verticalStabilizer.receiveShadow = true;
    plane.add(verticalStabilizer);

    const propeller = new THREE.Mesh(
        new THREE.BoxGeometry(2, 20, 2),
        new THREE.MeshLambertMaterial({ color: 0x404040 }) 
    );
    propeller.position. x = 40;
    propeller.castShadow = true;
    propeller.receiveShadow = true;
    plane.add(propeller);

    return plane;
}

// Pick a random value from an array
function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}