import { useEffect, useRef } from "react";
import React from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Background from "../assets/images.jpg";
import Moon from "../assets/moon.jpg";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { HiMiniCube } from "react-icons/hi2";

function Sphere() {
  const canvasRef = useRef();
  const controls = useRef();

  useEffect(() => {
    // Size declaer
    const Size = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    // initalize the size with use effect

    window.addEventListener("resize", () => {
      Size.width = window.innerWidth;
      Size.height = window.innerHeight;
      camera.aspect = Size.width / Size.height;
      camera.updateProjectionMatrix();
      renderObject.setSize(Size.width, Size.height);
    });
    //Material  color

    // Scene
    const scene = new THREE.Scene();
    // Camera
    const camera = new THREE.PerspectiveCamera(45, Size.width / Size.height);
    scene.add(camera);
    camera.position.z = 5;
    //texture for moon
    const texture = new THREE.TextureLoader();
    const moon = texture.load(Moon);

    // geometry
    const geometry = new THREE.SphereGeometry(1, 36, 32);
    const material = new THREE.MeshBasicMaterial({ map: moon });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    // Background
    const backgroundimg = new THREE.TextureLoader();
    const bgload = backgroundimg.load(Background);
    scene.background = bgload;

    // Render
    const renderObject = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderObject.setSize(Size.width, Size.height);
    renderObject.setPixelRatio(5);
    //Controls
    controls.current = new OrbitControls(camera, renderObject.domElement);

    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;
      renderObject.render(scene, camera);
    };
    animate();

    const timeline = gsap.timeline({ defaults: { duration: 1 } });
    timeline.fromTo(sphere.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 });
  }, []);

  return (
    <div>
      <div>
        <canvas ref={canvasRef} />
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2  pt-12">
        <ul>
          <Link to="/
          ">
            <li className="text-white font-bold text-5xl cursor-pointer">
              <HiMiniCube />
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Sphere;
