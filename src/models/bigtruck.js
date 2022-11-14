import { getCarTailLightTexture, getCarHeadlightTexture, getCarSideTexture, getCarFrontTexture, getBigTruckTailLightTexture } from "./textures"
import { Wheel } from "./wheel";

export function BigTruck() {
    const car = new THREE.Group();

    const color = pickRandom(vehicleColors);

    const carHeadlightTexture = getCarHeadlightTexture(color);
    carHeadlightTexture.center = new THREE.Vector2(0.5, 0.5);
    carHeadlightTexture.rotation = Math.PI / 2;
    const carTailLightTexture = getCarTailLightTexture(color);
    carTailLightTexture.center = new THREE.Vector2(0.5, 0.5);
    carTailLightTexture.rotation = Math.PI * 1.5;

    const main = new THREE.Mesh(
    new THREE.BoxGeometry(82, 30, 15), [
        new THREE.MeshLambertMaterial({ map: carHeadlightTexture }),
        new THREE.MeshLambertMaterial({ color }),
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

    const cabin = new THREE.Mesh(new THREE.BoxGeometry(22, 28, 12), [
    new THREE.MeshLambertMaterial({ map: carFrontTexture }),
    new THREE.MeshLambertMaterial({ map: carBackTexture }),
    new THREE.MeshLambertMaterial({ map: carLeftSideTexture }),
    new THREE.MeshLambertMaterial({ map: carRightSideTexture }),
    new THREE.MeshLambertMaterial({ color: carColor }), // top
    new THREE.MeshLambertMaterial({ color: carColor }) // bottom
    ]);
    cabin.position.x = 18;
    cabin.position.z = 25.5;
    cabin.castShadow = true;
    cabin.receiveShadow = true;
    car.add(cabin);

    const bigTruckTailLightTexture = getBigTruckTailLightTexture();
    bigTruckTailLightTexture.center = new THREE.Vector2(0.5, 0.5);
    bigTruckTailLightTexture.rotation = Math.PI * 1.5;

    const cargo = new THREE.Mesh(new THREE.BoxGeometry(52, 29.8, 28), [
        new THREE.MeshLambertMaterial({ color: 0xeeeeee }),
        new THREE.MeshLambertMaterial({ map: bigTruckTailLightTexture }),
        new THREE.MeshLambertMaterial({ color: 0xeeeeee }),
        new THREE.MeshLambertMaterial({ color: 0xeeeeee }),
        new THREE.MeshLambertMaterial({ color: 0xeeeeee }),
        new THREE.MeshLambertMaterial({ color: 0xeeeeee })
    ]);
    cargo.position.x = -15.5;
    cargo.position.z = 22.5;
    cargo.castShadow = true;
    cargo.receiveShadow = true;
    car.add(cargo);

    const backLeftWheel = new Wheel();
    backLeftWheel.position.x = -16;
    backLeftWheel.position.y = 13;
    backLeftWheel.position.z = 6;
    car.add(backLeftWheel);

    const frontLeftWheel = new Wheel();
    frontLeftWheel.position.x = 24;
    frontLeftWheel.position.y = 13;
    frontLeftWheel.position.z = 6;
    car.add(frontLeftWheel);

    const backRightWheel = new Wheel();
    backRightWheel.position.x = -16;
    backRightWheel.position.y = -13;
    backRightWheel.position.z = 6;
    car.add(backRightWheel);

    const frontRightWheel = new Wheel();
    frontRightWheel.position.x = 24;
    frontRightWheel.position.y = -13;
    frontRightWheel.position.z = 6;
    car.add(frontRightWheel);

    return car;
}

// Pick a random value from an array
function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}