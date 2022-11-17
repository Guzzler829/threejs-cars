export function Wheel() {
    const wheel = new THREE.Mesh(
        new THREE.CylinderGeometry(6, 6, 6, 20),
        new THREE.MeshLambertMaterial({ color: 0x333333 })
    );
    wheel.castShadow = false;
    wheel.receiveShadow = false;
    return wheel;
}