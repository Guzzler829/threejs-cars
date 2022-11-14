export function Wheel() {
    const wheel = new THREE.Mesh(
        new THREE.BoxGeometry(12, 6, 12),
        new THREE.MeshLambertMaterial({ color: 0x333333 })
    );
    wheel.castShadow = false;
    wheel.receiveShadow = false;
    return wheel;
}