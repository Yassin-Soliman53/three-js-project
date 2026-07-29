import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import earthTextur from "./assets/earth.png";
import sunTexture from "./assets/8k_sun.png";
import jupiterTexture from "./assets/jupiter";
import marsTexture from "./assets/mars.png";
import mercuryTexture from "./assets/mercury.png";
import moonTexture from "./assets/moon.png";
import neptuneTexture from "./assets/neptune.png";
import saturnTexture from "./src/assets/saturn.png";
import uranusTexture from "./assets/uranus.png";
import venusTexture from "./assets/venus.png";
import { textureLoad } from 'three/src/nodes/TSL.js';

const renderer = new THREE.WebGLRender(); 
renderer.setsize(window.innerWidth,innerHeight);
renderer.setPixelRatio(Window.devicepixel);
document.body.appendChild(renderer.domElement);

const scence = new THREE.Scene(); 
const camera = new THREE.camera(
    45 , 
    Window.innerWidth / window.innerHeight, 
    0.1 , 
    1000
);
const orbit = new OrbitControls (camera , renderer.domElement); 
camera.position.set(-90 , 140 ,140); 
orbit.update(); 

const ambientLight = new THREE.AmbientLight('#555555');
scence.add(ambientLight);

const textureloader = new THREE.textureloader();

renderer.setcolor('#111111');

const sungeo = new THREE.SphereGeometry(16 , 30 , 30); 
const sunmat = new THREE.MeshBasicMaterial({
    map : textureloader.load(sunTexture),
    emmissive : 0xfffff, 
    emmissivesensivity : 1

}); 

const sun = new THREE.Mesh(sungeo , sunmat); 
scence.add(sun); 

const pointlight = new THREE.pointlight('#ffffff' , 2 , 300); 
scence.add(pointlight); 

const createplant = (size , texture , position ,ring) => { 
    const geo = new THREE.SphereGeometry(size , 30 , 30); 
    const mat = new THREE.MeshStandardMaterial({
        map : textureLoad.load(texture) 
    });

const mesh = new THREE.Mesh(geo, mat)
const obj = new THREE.Object3D()
obj.add(mesh)
if(ring){
    const ringGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 32)
    const ringMat = new THREE.MeshBasicMaterial({
        map: textureLoader.load(ring.texture),
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide
    })
    const ringMesh = new THREE.Mesh(ringGeo, ringMat)
    obj.add(ringMesh)
    ringMesh.position.x = position
    ringMesh.rotation.x = -0.5 * Math.PI
}    
};

function animate () {
    renderer.render(scence,camera);    
}
renderer.setanimateloop(animate);