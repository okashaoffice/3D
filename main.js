import * as THREE from "three";

//Scene
const scene = new THREE.Scene();

//Create Our Cube
const geometry = new THREE.BoxGeometry(20, 20, 20,);

//Materila

const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
});

//Mesh

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0.10,10);
scene.add(light);

//Camera
const camera = new THREE.PerspectiveCamera(45, 800 / 600);
scene.add(camera);
camera.position.z = 20;

const canvas = document.querySelector(".webgl");

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(800, 600);
renderer.render(scene, camera);
