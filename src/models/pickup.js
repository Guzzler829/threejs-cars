import { getCarTailLightTexture, getCarHeadlightTexture, getCarSideTexture, getCarFrontTexture } from "./textures.js"
import { vehicleColors } from "../index.js";
import { Wheel } from "./wheel.js";


export function PickupTruck() {
    const car = new THREE.Group();

    const color = pickRandom(vehicleColors);

    const carHeadlightTexture = getCarHeadlightTexture(color);
    carHeadlightTexture.center = new THREE.Vector2(0.5, 0.5);
    carHeadlightTexture.rotation = Math.PI / 2;
    const carTailLightTexture = getCarTailLightTexture(color);
    carTailLightTexture.center = new THREE.Vector2(0.5, 0.5);
    carTailLightTexture.rotation = Math.PI * 1.5;

    const main = new THREE.Mesh(
    new THREE.BoxGeometry(60, 30, 15), [
        new THREE.MeshLambertMaterial({ map: carHeadlightTexture }),
        new THREE.MeshLambertMaterial({ map: carTailLightTexture }),
        new THREE.MeshLambertMaterial({ color }),
        new THREE.MeshLambertMaterial({ color }),
        new THREE.MeshLambertMaterial({ color }),
        new THREE.MeshLambertMaterial({ color })
    ]);
    main.position.z = 12;
    main.castShadow = true;
    main.receiveShadow = true;
    car.add(main);

    const carFrontTexture = getCarFrontTexture(color);
    carFrontTexture.center = new THREE.Vector2(0.5, 0.5);
    carFrontTexture.rotation = Math.PI / 2;

    const carBackTexture = getCarFrontTexture(color);
    carBackTexture.center = new THREE.Vector2(0.5, 0.5);
    carBackTexture.rotation = -Math.PI / 2;

    const carLeftSideTexture = getCarSideTexture(color);
    carLeftSideTexture.flipY = false;

    const carRightSideTexture = getCarSideTexture(color);

    const cabin = new THREE.Mesh(new THREE.BoxGeometry(24, 24, 12), [
    new THREE.MeshLambertMaterial({ map: carFrontTexture }),
    new THREE.MeshLambertMaterial({ map: carBackTexture }),
    new THREE.MeshLambertMaterial({ map: carLeftSideTexture }),
    new THREE.MeshLambertMaterial({ map: carRightSideTexture }),
    new THREE.MeshLambertMaterial({ color: color }), // top
    new THREE.MeshLambertMaterial({ color: color }) // bottom
    ]);
    cabin.position.x = 4;
    cabin.position.z = 25.5;
    cabin.castShadow = true;
    cabin.receiveShadow = true;
    car.add(cabin);

    const backLeftWheel = new Wheel();
    backLeftWheel.position.x = -18;
    backLeftWheel.position.y = 13;
    backLeftWheel.position.z = 6;
    car.add(backLeftWheel);

    const frontLeftWheel = new Wheel();
    frontLeftWheel.position.x = 18;
    frontLeftWheel.position.y = 13;
    frontLeftWheel.position.z = 6;
    car.add(frontLeftWheel);

    const backRightWheel = new Wheel();
    backRightWheel.position.x = -18;
    backRightWheel.position.y = -13;
    backRightWheel.position.z = 6;
    car.add(backRightWheel);

    const frontRightWheel = new Wheel();
    frontRightWheel.position.x = 18;
    frontRightWheel.position.y = -13;
    frontRightWheel.position.z = 6;
    car.add(frontRightWheel);

    return car;
}

// Pick a random value from an array
function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}