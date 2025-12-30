import "./style.css";
import * as THREE from "../node_modules/three/build/three.module.js";
import gsap from "../node_modules/gsap/all.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const canvasContainer = document.querySelector("#app");
const state = {
  canClickCube: true,
};

const renderer = new THREE.WebGLRenderer({ antialias: true });
const devicePixelRatio = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
canvasContainer.appendChild(renderer.domElement);

const geometry = new THREE.IcosahedronGeometry(1, 2);
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  flatShading: true,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);

const keyLight = new THREE.DirectionalLight(0xffffff);
keyLight.position.set(-2, 1, 2);
keyLight.intensity = 2;
scene.add(keyLight);
// const keyLightHelper = new THREE.DirectionalLightHelper(keyLight, 1, 0x00ff00);
// scene.add(keyLightHelper);

const fillLight = new THREE.DirectionalLight(0xffffff);
fillLight.position.set(1, 1, 2);
fillLight.intensity = 1;
scene.add(fillLight);
// const fillLightHelper = new THREE.DirectionalLightHelper(
//   fillLight,
//   1,
//   0x0000ff
// );
// scene.add(fillLightHelper);

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

const cubeAnimationTimeline = gsap.timeline({
  paused: true,
  onComplete: () => {
    state.canClickCube = true;
  },
});

cubeAnimationTimeline.to(cube.scale, {
  duration: 1,
  ease: "elastic.out(1,0.3)",
  x: 2,
  y: 2,
  z: 2,
});

cubeAnimationTimeline.to(cube.scale, {
  duration: 1,
  ease: "slow(0.7,0.7,false)",
  x: 1,
  y: 1,
  z: 1,
});

function handleClick() {
  if (state.canClickCube) {
    cubeAnimationTimeline.restart();
    state.canClickCube = false;
  }
}

canvasContainer.addEventListener("click", handleClick);
canvasContainer.addEventListener("touch", handleClick);
