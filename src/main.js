import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer(); 
renderer.setSize(window.innerWidth , window.innerHeight); 
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75 , 
    window.innerWidth / window.innerHeight , 
    0.1 , 
    1000 
); 
const axiss = new THREE.AxesHelper(3); 
scene.add(axiss); 
camera.position.set(0,2,5);

const boxgeo = new THREE.BoxGeometry(); 
const bomaterial = new THREE.MeshBasicMaterial({color : 0x00FF00});
const box = new THREE.Mesh(boxgeo,bomaterial);
function animation () { 
    box.rotation.x += 0.1; 
    box.rotation.y += 0.01 ;
    box.rotation.z += 0.01 ;
    renderer.render(scene,camera);
}
scene.add(box);
renderer.setAnimationLoop(animation);

