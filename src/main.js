import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import earthTexture from './assets/earth.png';
import sunTexture from './assets/8k_sun.png';
import jupiterTexture from './assets/jupiter.png';
import marsTexture from './assets/mars.png';
import mercuryTexture from './assets/mercury.png';
import neptuneTexture from './assets/neptune.png';
import saturnTexture from './assets/saturn.png';
import uranusTexture from './assets/uranus.png';
import venusTexture from './assets/venus.png';

const renderer = new THREE.WebGLRenderer({ antialias: true }); 
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene(); 
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const orbit = new OrbitControls(camera, renderer.domElement); 
camera.position.set(-90, 140, 140); 
orbit.update(); 

const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1.5);
scene.add(ambientLight);

const textureLoader = new THREE.TextureLoader();

const sunGeo = new THREE.SphereGeometry(16, 30, 30); 
const sunMat = new THREE.MeshBasicMaterial({ map: textureLoader.load(sunTexture) }); 
const sun = new THREE.Mesh(sunGeo, sunMat); 
scene.add(sun); 

const pointLight = new THREE.PointLight(0xFFFFFF, 30000, 500);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

const dirLight1 = new THREE.DirectionalLight(0xFFFFFF, 1.0);
dirLight1.position.set(100, 100, 100);
scene.add(dirLight1);

const dirLight2 = new THREE.DirectionalLight(0xFFFFFF, 0.5);
dirLight2.position.set(-100, -100, -100);
scene.add(dirLight2);

const createPlanet = (size, texture, position, ring) => { 
    const geo = new THREE.SphereGeometry(size, 30, 30); 
    const mat = new THREE.MeshStandardMaterial({ map: textureLoader.load(texture), roughness: 0.7 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.x = position;
    const obj = new THREE.Object3D();
    obj.add(mesh);
    if (ring) {
        const ringGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 32);
        const ringMat = new THREE.MeshBasicMaterial({
            map: textureLoader.load(ring.texture),
            transparent: true,
            opacity: 0.9,
            side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5 * Math.PI;
        obj.add(ringMesh);
    }
    scene.add(obj);
    return { mesh, obj };
};

const mercury = createPlanet(3.2, mercuryTexture, 28);
const venus = createPlanet(5.8, venusTexture, 44);
const earth = createPlanet(6, earthTexture, 62);
const mars = createPlanet(4, marsTexture, 78);
const jupiter = createPlanet(12, jupiterTexture, 100);
const saturn = createPlanet(10, saturnTexture, 138, { innerRadius: 10, outerRadius: 20, texture: saturnTexture });
const uranus = createPlanet(7, uranusTexture, 176, { innerRadius: 7, outerRadius: 12, texture: uranusTexture });
const neptune = createPlanet(7, neptuneTexture, 200);

function animate() {
    sun.rotateY(0.004);
    mercury.mesh.rotateY(0.004);
    venus.mesh.rotateY(0.002);
    earth.mesh.rotateY(0.02);
    mars.mesh.rotateY(0.018);
    jupiter.mesh.rotateY(0.04);
    saturn.mesh.rotateY(0.038);
    uranus.mesh.rotateY(0.03);
    neptune.mesh.rotateY(0.032);
    mercury.obj.rotateY(0.04);
    venus.obj.rotateY(0.015);
    earth.obj.rotateY(0.01);
    mars.obj.rotateY(0.008);
    jupiter.obj.rotateY(0.002);
    saturn.obj.rotateY(0.0009);
    uranus.obj.rotateY(0.0004);
    neptune.obj.rotateY(0.0001);
    orbit.update();
    renderer.render(scene, camera);    
}
renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
