import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import gsap from "gsap";
import backgroundTexture from "../assets/images.jpg";
import cubeimg from "../assets/cube.jpg";
import { IoIosMoon } from "react-icons/io";
import { Link } from "react-router-dom";
function Cube() {
  const canvasRef = useRef();

  useEffect(() => {
    window.addEventListener("resize", () => {
      Sizes.width = window.innerWidth;
      Sizes.height = window.innerHeight;
      camera.aspect = Sizes.width / Sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(Sizes.width, Sizes.height);
    });

    // Initialize scene, camera, renderer
    const Sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    // Scene
    const scene = new THREE.Scene();
    //  Add Camera
    const camera = new THREE.PerspectiveCamera(45, Sizes.width / Sizes.height);
    scene.add(camera);
    camera.position.z = 5;
    // Custom Background
    const backgroundTextureLoader = new THREE.TextureLoader();
    const texturebg = backgroundTextureLoader.load(backgroundTexture);
    scene.background = texturebg;

    // Mterial texture
    const texture = new THREE.TextureLoader();
    const cubeTexture = texture.load(cubeimg);
    // Add a cube to the scene
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ map: cubeTexture });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    //Rendrerr
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(Sizes.width, Sizes.height);
    renderer.setPixelRatio(3);
    renderer.render(scene, camera);

    //controls
    const controls = new OrbitControls(camera, renderer.domElement);
    scene.add(controls);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };
    animate();

    const tl = gsap.timeline({ defaults: { duration: 1 } });
    tl.fromTo(cube.scale, { z: 0, y: 0, x: 0 }, { z: 1, y: 1, x: 1 });
    //Others
  }, []);

  return (
    <div>
      <div className="relative">
        <canvas ref={canvasRef} />
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2  pt-12">
        <ul>
          <Link to="/sphere">
            <li className="text-white font-bold text-4xl cursor-pointer">
              <IoIosMoon />
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Cube;
