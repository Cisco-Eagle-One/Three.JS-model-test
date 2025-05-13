import * as THREE from './libs/three.module.js';
import { GLTFLoader } from './libs/GLTFLoader.js';
import { OrbitControls } from './libs/OrbitControls.js';

const canvas = document.getElementById('scene');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(2, 2, 5);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

const light = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(light);

const loader = new GLTFLoader();
let conveyorCount = 0;

document.getElementById('add-conveyor').onclick = () => {
  loader.load('models/conveyor.glb', gltf => {
    const conveyor = gltf.scene;
    conveyor.position.x = conveyorCount * 1.5; // space out each conveyor
    scene.add(conveyor);
    conveyorCount++;
  });
};

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
