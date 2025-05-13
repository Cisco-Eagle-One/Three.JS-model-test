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

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const loader = new GLTFLoader();

loader.load('models/conveyor.glb',
  gltf => {
    const model = gltf.scene;
    scene.add(model);
  },
  undefined,
  error => {
    console.error('Failed to load model:', error);
  }
);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
