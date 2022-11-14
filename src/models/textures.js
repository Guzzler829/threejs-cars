export function getBigTruckTailLightTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext("2d");

    //Fill background color
    context.fillStyle = "#eeeeee"
    context.fillRect(0, 0, canvas.width, canvas.height);

    //Tail lights
    context.fillStyle = "#dd2222";
    context.fillRect(4, 52, 24, 24);
    context.fillRect(100, 52, 24, 24);

    return new THREE.CanvasTexture(canvas);
}

export function getCarFrontTexture(color) {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 32;
    const context = canvas.getContext("2d");

    context.fillStyle = `#${color.toString(16).slice(0, 8)}`    
    context.fillRect(0, 0, 64, 32);

    context.fillStyle = "#666666";
    context.fillRect(8, 8, 48, 24);

    return new THREE.CanvasTexture(canvas);
}

export function getCarSideTexture(color) {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 32;
    const context = canvas.getContext("2d");

    context.fillStyle = `#${color.toString(16).slice(0, 8)}`    
    context.fillRect(0, 0, 128, 32);

    context.fillStyle = "#666666";
    context.fillRect(10, 8, 38, 24);
    context.fillRect(58, 8, 60, 24);

    return new THREE.CanvasTexture(canvas);
}

export function getCarHeadlightTexture(color) {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 64;
    const context = canvas.getContext("2d");

    //Fill background color
    context.fillStyle = `#${color.toString(16).slice(0, 8)}`
    context.fillRect(0, 0, canvas.width, canvas.height);

    //front air intake lines
    context.fillStyle = "#222222"
    const numOfLines = 5;
    for(let i = 0; i < numOfLines; i++) {
        context.fillRect(30, 16 + (i * 8), 68, 4);
    }

    //Headlights
    context.fillStyle = "#eeee22";
    context.fillRect(4, 4, 24, 24);
    context.fillRect(100, 4, 24, 24);

    return new THREE.CanvasTexture(canvas);
}

export function getCarTailLightTexture(color) {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 64;
    const context = canvas.getContext("2d");

    //Fill background color
    context.fillStyle = `#${color.toString(16).slice(0, 8)}`
    context.fillRect(0, 0, canvas.width, canvas.height);

    //Tail lights
    context.fillStyle = "#dd2222";
    context.fillRect(4, 4, 24, 24);
    context.fillRect(100, 4, 24, 24);

    return new THREE.CanvasTexture(canvas);
}