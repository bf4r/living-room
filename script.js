const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const videoElement = document.getElementById('screenShareVideo');
videoElement.width = 800;
videoElement.height = 600;
const videoTexture = new THREE.VideoTexture(videoElement);

const screenShareWallGeometry = new THREE.PlaneGeometry(8.888, 5);
const screenShareWallMaterial = new THREE.MeshBasicMaterial({ map: videoTexture });
const screenShareWall = new THREE.Mesh(screenShareWallGeometry, screenShareWallMaterial);
screenShareWall.position.set(0, 0, 4.999); // position opposite the sofa
screenShareWall.rotation.y = Math.PI; // rotate to face the sofa
scene.add(screenShareWall);

function isNearScreenShareWall() {
    const distance = camera.position.distanceTo(screenShareWall.position);
    return distance < 2;
}

async function startScreenSharing() {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        videoElement.srcObject = stream;
        videoElement.play();
    } catch (err) {
        console.error("Error: " + err);
    }
}
const wallColor = getRandomColor();
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const roomGeometry = new THREE.BoxGeometry(10, 5, 10);
const roomMaterial = new THREE.MeshPhongMaterial({ color: wallColor, side: THREE.BackSide });
const room = new THREE.Mesh(roomGeometry, roomMaterial);
scene.add(room);

    // more rooms
    // for (let i = 0; i <= 15; i++) {
    //     const roomGeometry = new THREE.BoxGeometry(10, 5, 10);
    //     const roomMaterial = new THREE.MeshPhongMaterial({ color: wallColor, side: THREE.BackSide });
    //     const room = new THREE.Mesh(roomGeometry, roomMaterial);
    //     room.position.set(15 + i * 15, 0, 0);
    //     scene.add(room);
    // }

    // for (let i = 0; i <= 15; i++) {
    //     const roomGeometry = new THREE.BoxGeometry(10, 5, 10);
    //     const roomMaterial = new THREE.MeshPhongMaterial({ color: wallColor, side: THREE.BackSide });
    //     const room = new THREE.Mesh(roomGeometry, roomMaterial);
    //     room.position.set(-(15 + i * 15), 0, 0);
    //     scene.add(room);
    // }
const OFFSET_Y = -0.5;
const PC_OFFSET_Y = -0.5;
const tableGeometry = new THREE.BoxGeometry(1.5, 0.05, 0.8);
const tableMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
const table = new THREE.Mesh(tableGeometry, tableMaterial);
table.position.set(3, PC_OFFSET_Y - 1.2, 0);
scene.add(table);

const legGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.75);
const legMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
const positions = [
        [3.65, PC_OFFSET_Y - 1.575, 0.3],
        [3.65, PC_OFFSET_Y - 1.575, -0.3],
        [2.35, PC_OFFSET_Y - 1.575, 0.3],
        [2.35, PC_OFFSET_Y - 1.575, -0.3]
    ];
positions.forEach(pos => {
        const leg = new THREE.Mesh(legGeometry, legMaterial);
        leg.position.set(...pos);
        scene.add(leg);
    });

    // computer
    const monitorGeometry = new THREE.BoxGeometry(0.6, 0.4, 0.05);
    const monitorMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const monitor = new THREE.Mesh(monitorGeometry, monitorMaterial);
    monitor.position.set(3, PC_OFFSET_Y - 0.8, 0);
    scene.add(monitor);

    const screenGeometry = new THREE.PlaneGeometry(0.55, 0.35);
    const screenMaterial = new THREE.MeshPhongMaterial({ color: 0x87CEEB });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(3, PC_OFFSET_Y - 0.8, 0.028);
    scene.add(screen);

    const computerStandGeometry = new THREE.BoxGeometry(0.05, 0.3, 0.05);
    const computerStand = new THREE.Mesh(computerStandGeometry, monitorMaterial);
    computerStand.position.set(3, PC_OFFSET_Y - 1, 0);
    scene.add(computerStand);

    const computerStand2Geometry = new THREE.BoxGeometry(0.3, 0.05, 0.05);
    const computerStand2 = new THREE.Mesh(computerStand2Geometry, monitorMaterial);
    computerStand2.position.set(3, PC_OFFSET_Y - 1.15, 0);
    scene.add(computerStand2);

    function createKey(x, y, z) {
        const keyGeometry = new THREE.BoxGeometry(0.05, 0.05, 0.05);
        const keyMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
        const key = new THREE.Mesh(keyGeometry, keyMaterial);
        key.position.set(x, y, z);
        return key;
    }

    const keyboardGeometry = new THREE.BoxGeometry(0.5, 0.02, 0.18);
    const keyboardMaterial = new THREE.MeshPhongMaterial({ color: 0x111111 });
    const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
    keyboard.position.set(3, PC_OFFSET_Y - 1.17, 0.175);
    scene.add(keyboard);


    KEYBOARD_OFFSET_X = 3;

    const kbKeys = [
        createKey(KEYBOARD_OFFSET_X, PC_OFFSET_Y - 1.17, 0.15),
        createKey(KEYBOARD_OFFSET_X - 0.075, PC_OFFSET_Y - 1.17, 0.15),
        createKey(KEYBOARD_OFFSET_X - 0.15, PC_OFFSET_Y - 1.17, 0.15),
        createKey(KEYBOARD_OFFSET_X - 0.2, PC_OFFSET_Y - 1.17, 0.15),
        createKey(KEYBOARD_OFFSET_X - 0.2, PC_OFFSET_Y - 1.17, 0.225),
        createKey(KEYBOARD_OFFSET_X - 0.125, PC_OFFSET_Y - 1.17, 0.225),
        createKey(KEYBOARD_OFFSET_X - 0.075, PC_OFFSET_Y - 1.17, 0.225),
        createKey(KEYBOARD_OFFSET_X, PC_OFFSET_Y - 1.17, 0.225),
        createKey(KEYBOARD_OFFSET_X + 0.075, PC_OFFSET_Y - 1.17, 0.225),
        createKey(KEYBOARD_OFFSET_X + 0.15, PC_OFFSET_Y - 1.17, 0.225),
        createKey(KEYBOARD_OFFSET_X + 0.2, PC_OFFSET_Y - 1.17, 0.225),
        createKey(KEYBOARD_OFFSET_X + 0.2, PC_OFFSET_Y - 1.17, 0.15),
        createKey(KEYBOARD_OFFSET_X + 0.125, PC_OFFSET_Y - 1.17, 0.15),
        createKey(KEYBOARD_OFFSET_X + 0.075, PC_OFFSET_Y - 1.17, 0.15)
    ];
    kbKeys.forEach(key => scene.add(key));

function createCouch() {
    const couchGroup = new THREE.Group();

    const baseGeometry = new THREE.BoxGeometry(2, 0.5, 1);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    couchGroup.add(base);

    const backrestGeometry = new THREE.BoxGeometry(2, 0.8, 0.2);
    const backrest = new THREE.Mesh(backrestGeometry, baseMaterial);
    backrest.position.set(0, 0.4, -0.4);
    couchGroup.add(backrest);

    const cushionGeometry = new THREE.BoxGeometry(0.6, 0.1, 0.8);
    const cushionMaterial = new THREE.MeshPhongMaterial({ color: 0xA0522D });
    for (let i = 0; i < 3; i++) {
        const cushion = new THREE.Mesh(cushionGeometry, cushionMaterial);
        cushion.position.set(-0.65 + i * 0.65, 0.3, 0.1);
        couchGroup.add(cushion);
    }

    return couchGroup;
}
function createChair() {
    const chair = new THREE.Group();

    const seatGeometry = new THREE.BoxGeometry(0.5, 0.1, 0.5);
    const seatMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const seat = new THREE.Mesh(seatGeometry, seatMaterial);
    seat.position.y = 0.5;
    chair.add(seat);

    const backrestGeometry = new THREE.BoxGeometry(0.5, 0.7, 0.1);
    const backrestMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const backrest = new THREE.Mesh(backrestGeometry, backrestMaterial);
    backrest.position.set(0, 0.8, 0.2);
    chair.add(backrest);

    const legGeometry = new THREE.BoxGeometry(0.1, 0.5, 0.1);
    const legMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });

    const legPositions = [
        { x: -0.2, y: 0.2, z: 0.2 },
        { x: -0.2, y: 0.2, z: -0.2 },
        { x: 0.2, y: 0.2, z: 0.2 },
        { x: 0.2, y: 0.2, z: -0.2 }
    ];

    legPositions.forEach(pos => {
        const leg = new THREE.Mesh(legGeometry, legMaterial);
        leg.position.set(pos.x, pos.y, pos.z);
        chair.add(leg);
    });

    return chair;
}

function createWindow() {
    const windowGroup = new THREE.Group();

    const frameGeometry = new THREE.BoxGeometry(1.5, 1.5, 0.05);
    const frameMaterial = new THREE.MeshPhongMaterial({ color: 0xc9824c });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    windowGroup.add(frame);

    const glassGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.05);
    const glassMaterial = new THREE.MeshPhongMaterial({ color: 0x3eb7e2 });
    const glass = new THREE.Mesh(glassGeometry, glassMaterial);
    glass.position.set(-0.35, 0.35, 0.001);
    windowGroup.add(glass);
    const glass2 = new THREE.Mesh(glassGeometry, glassMaterial);
    glass2.position.set(0.35, 0.35, 0.001);
    windowGroup.add(glass2);
    const glass3 = new THREE.Mesh(glassGeometry, glassMaterial);
    glass3.position.set(0.35, -0.35, 0.001);
    windowGroup.add(glass3);
    const glass4 = new THREE.Mesh(glassGeometry, glassMaterial);
    glass4.position.set(-0.35, -0.35, 0.001);
    windowGroup.add(glass4);

    return windowGroup;
}

function createCoffeeTable() {
    const tableGroup = new THREE.Group();

    const topGeometry = new THREE.BoxGeometry(1.2, 0.05, 0.6);
    const topMaterial = new THREE.MeshPhongMaterial({ color: 0x5C4033 });
    const top = new THREE.Mesh(topGeometry, topMaterial);
    tableGroup.add(top);

    const legGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.4);
    const legMaterial = new THREE.MeshPhongMaterial({ color: 0x3C280C });
    const legPositions = [
        [-0.55, -0.2, 0.25],
        [-0.55, -0.2, -0.25],
        [0.55, -0.2, 0.25],
        [0.55, -0.2, -0.25]
    ];
    legPositions.forEach(pos => {
        const leg = new THREE.Mesh(legGeometry, legMaterial);
        leg.position.set(...pos);
        tableGroup.add(leg);
    });

    return tableGroup;
}

function createPottedPlant() {
    const plantGroup = new THREE.Group();

    const potGeometry = new THREE.CylinderGeometry(0.15, 0.1, 0.2, 32);
    const potMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const pot = new THREE.Mesh(potGeometry, potMaterial);
    plantGroup.add(pot);

    const trunkGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.3, 32);
    const trunkMaterial = new THREE.MeshPhongMaterial({ color: 0x4CAF50 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set(0, 0.25, 0);
    plantGroup.add(trunk);

    const leafGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const leafMaterial = new THREE.MeshPhongMaterial({ color: 0x4CAF50 });
    for (let i = 0; i < 5; i++) {
        const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
        leaf.position.set(
            Math.random() * 0.2 - 0.1,
            0.3 + Math.random() * 0.2,
            Math.random() * 0.2 - 0.1
        );
        leaf.scale.set(0.5, 0.5, 0.5);
        plantGroup.add(leaf);
    }

    return plantGroup;
}

function createBookshelf() {
    const shelfGroup = new THREE.Group();

    const Y_OFFSET = 0.9;

    const frameGeometry = new THREE.BoxGeometry(1.5, 2, 0.1);
    const frameMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.y = Y_OFFSET;
    shelfGroup.add(frame);

    const shelfGeometry = new THREE.BoxGeometry(1.4, 0.05, 0.38);
    for (let i = 0; i < 4; i++) {
        const shelf = new THREE.Mesh(shelfGeometry, frameMaterial);
        shelf.position.set(0, -0.9 + i * 0.6 + Y_OFFSET, 0);
        shelfGroup.add(shelf);
    }

    const bookColors = [0xFF0000, 0x00FF00, 0x0000FF, 0xFFFF00, 0xFF00FF, 0x00FFFF];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 6; j++) {
            const bookGeometry = new THREE.BoxGeometry(0.1, 0.2, 0.15);
            const bookMaterial = new THREE.MeshPhongMaterial({ color: bookColors[Math.floor(Math.random() * bookColors.length)] });
            const book = new THREE.Mesh(bookGeometry, bookMaterial);
            book.position.set(-0.6 + j * 0.2, -0.8 + i * 0.6 + Y_OFFSET, 0);
            shelfGroup.add(book);
        }
    }

    return shelfGroup;
}

function createCeilingLamp() {
    const lampGroup = new THREE.Group();

    const shadeGeometry = new THREE.ConeGeometry(0.2, 0.3, 32);
    const shadeMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide });
    const shade = new THREE.Mesh(shadeGeometry, shadeMaterial);
    shade.position.set(0, -0.15, 0);
    lampGroup.add(shade);

    const cordGeometry = new THREE.CylinderGeometry(0.005, 0.005, 0.5);
    const cordMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    const cord = new THREE.Mesh(cordGeometry, cordMaterial);
    cord.position.set(0, 0.1, 0);
    lampGroup.add(cord);

    const bulbGeometry = new THREE.SphereGeometry(0.05, 32, 32);
    const bulbMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
    const bulb = new THREE.Mesh(bulbGeometry, bulbMaterial);
    bulb.position.set(0, -0.2, 0);
    lampGroup.add(bulb);

    const light = new THREE.PointLight(0xFFFFFF, 0.5, 10);
    light.position.set(0, -1, 0);
    lampGroup.add(light);

    return lampGroup;
}

function createRug() {
    const rugGeometry = new THREE.CircleGeometry(1, 32);
    const rugMaterial = new THREE.MeshPhongMaterial({ color: 0x964B00, side: THREE.DoubleSide });
    const rug = new THREE.Mesh(rugGeometry, rugMaterial);
    rug.rotation.x = -Math.PI / 2;
    return rug;
}

const couch = createCouch();
couch.position.set(0, OFFSET_Y - 1.86, -2);
scene.add(couch);

const coffeeTable = createCoffeeTable();
coffeeTable.position.set(0, OFFSET_Y - 1.5, -1);
scene.add(coffeeTable);

const plant1 = createPottedPlant();
plant1.position.set(3, OFFSET_Y - 1.86, -3);
scene.add(plant1);

const plant2 = createPottedPlant();
plant2.position.set(-3, OFFSET_Y - 1.86, -3);
scene.add(plant2);

{
const window1 = createWindow();
window1.position.set(3, OFFSET_Y + 1.5, -5.02);
scene.add(window1);

const window2 = createWindow();
window2.position.set(-3, OFFSET_Y + 1.5, -5.02);
scene.add(window2);

const window3 = createWindow();
window3.position.set(0, OFFSET_Y + 1.5, -5.02);
scene.add(window3);
}

{
const window1 = createWindow();
window1.position.set(3, OFFSET_Y - 0.5, -5.02);
scene.add(window1);

const window2 = createWindow();
window2.position.set(-3, OFFSET_Y - 0.5, -5.02);
scene.add(window2);

const window3 = createWindow();
window3.position.set(0, OFFSET_Y - 0.5, -5.02);
scene.add(window3);
}

const bookshelf = createBookshelf();
bookshelf.position.set(-4, OFFSET_Y - 1.86, 0);
scene.add(bookshelf);

const ceilingLamp = createCeilingLamp();
ceilingLamp.position.set(0, OFFSET_Y + 2, 0);
scene.add(ceilingLamp);

const rug = createRug();
rug.position.set(0, OFFSET_Y - 1.99, 1);
scene.add(rug);

const chairModel = createChair();
chairModel.position.set(3, OFFSET_Y - 2, 1);
scene.add(chairModel);

    camera.position.set(0, 0, 0);
    let pitch = 0;
    let yaw = 0;

    const collidableObjects = [];

    document.addEventListener('mousemove', (event) => {
        if (document.pointerLockElement === renderer.domElement) {
            const sensitivity = 0.002;
            yaw -= event.movementX * sensitivity;
            pitch -= event.movementY * sensitivity;
            pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));
        }
    });

    const keys = {};
document.addEventListener('keydown', (event) => {
    keys[event.key.toLowerCase()] = true;
    if (event.key.toLowerCase() === 'e' && isNearComputer()) {
        toggleComputerOverlay(true);
    }
    if (event.key.toLowerCase() === 'e' && isNearScreenShareWall()) {
        startScreenSharing();
    }
    if (event.key.toLowerCase() === 'r') {
        camera.fov = 80;
        camera.updateProjectionMatrix();
    }
});

window.addEventListener('wheel', (event) => {
    event.preventDefault();

    const zoomSpeed = 2;
    camera.fov += event.deltaY * zoomSpeed * 0.01;
    camera.fov = THREE.MathUtils.clamp(camera.fov, 1, 80);
    camera.updateProjectionMatrix();
});
    document.addEventListener('keyup', (event) => { keys[event.key.toLowerCase()] = false; });

    renderer.domElement.addEventListener('click', () => {
        renderer.domElement.requestPointerLock();
    });

    function checkCollision(position) {
        const playerRadius = 0.5;
        for (const object of collidableObjects) {
            const objectPosition = object.position;
            const objectGeometry = object.geometry;
            const objectBoundingBox = new THREE.Box3().setFromObject(object);
            const sphereCenter = new THREE.Vector3(position.x, position.y, position.z);
            if (objectBoundingBox.intersectsSphere(new THREE.Sphere(sphereCenter, playerRadius))) {
                return true;
            }
        }
        return false;
    }

    const gravity = -9.8;
    let velocity = new THREE.Vector3(0, 0, 0);
    let isGrounded = false;
    const jumpForce = 5;

    const computerOverlay = document.getElementById('computerOverlay');
    const exitComputerButton = document.getElementById('exitComputer');
    const computerScreen = document.getElementById('computerScreen');

    function isNearComputer() {
        const distance = camera.position.distanceTo(monitor.position);
        return distance < 2;
    }

    function getRandomColor() {
        return Math.floor(Math.random() * 16777215);
    }

    function toggleComputerOverlay(show) {
        if (show) {
            computerOverlay.style.display = 'flex';
            document.exitPointerLock();
            
            const nestingLevel = getNestingLevel();
            if (nestingLevel < 2) {
                computerScreen.style.display = 'block';
                computerScreen.src = window.location.href + '?level=' + (nestingLevel + 1);
            } else {
            }
        } else {
            computerOverlay.style.display = 'none';
            renderer.domElement.requestPointerLock();
        }
    }

    function getNestingLevel() {
        const urlParams = new URLSearchParams(window.location.search);
        return parseInt(urlParams.get('level') || '0');
    }

    exitComputerButton.addEventListener('click', () => toggleComputerOverlay(false));

    function animate() {
        requestAnimationFrame(animate);
        const deltaTime = 1 / 90;
        const qx = new THREE.Quaternion();
        qx.setFromAxisAngle(new THREE.Vector3(1, 0, 0), pitch);
        const qy = new THREE.Quaternion();
        qy.setFromAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
        const quaternion = qy.multiply(qx);
        camera.quaternion.copy(quaternion);
        if (!isGrounded) {
            velocity.y += gravity * deltaTime;
        }
        // jumping
        if (keys[' '] && isGrounded) {
            velocity.y = jumpForce;
            isGrounded = false;
        }
        const speed = 5;
        const moveDirection = new THREE.Vector3();

        if (keys['w']) moveDirection.z -= 1;
        if (keys['s']) moveDirection.z += 1;
        if (keys['a']) moveDirection.x -= 1;
        if (keys['d']) moveDirection.x += 1;

        moveDirection.normalize().multiplyScalar(speed * deltaTime);
        moveDirection.applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw);

        const newPosition = camera.position.clone();
        newPosition.x += moveDirection.x + velocity.x * deltaTime;
        newPosition.y += velocity.y * deltaTime;
        newPosition.z += moveDirection.z + velocity.z * deltaTime;

        if (!checkCollision(newPosition)) {
            camera.position.copy(newPosition);
        } else {
            velocity.set(0, 0, 0);
        }

        const groundCheck = camera.position.clone();
        groundCheck.y -= 1.3; // height is 1.8
        if (groundCheck.y <= -2.5) {
            isGrounded = true;
            velocity.y = 0;
            camera.position.y = Math.max(camera.position.y, -2.5);
        } else {
            isGrounded = false;
        }

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });