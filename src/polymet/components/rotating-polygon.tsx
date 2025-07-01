import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function RotatingPolygon() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    
    const currentMount = mountRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true // Transparent background
    });
    
    // Set size to twice the current size (160x160px)
    renderer.setSize(160, 160);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);
    
    // Camera position
    camera.position.z = 4;
    
    // Create icosahedron
    const geometry = new THREE.IcosahedronGeometry(1.5, 0);
    const material = new THREE.MeshPhongMaterial({
      color: 0x4a4a4a,
      emissive: 0x1a1a1a,
      emissiveIntensity: 0.1,
      shininess: 30,
      specular: 0x666666
    });
    const icosahedron = new THREE.Mesh(geometry, material);
    scene.add(icosahedron);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.6);
    keyLight.position.set(2, 3, 4);
    scene.add(keyLight);
    
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.2);
    fillLight.position.set(-3, -1, 2);
    scene.add(fillLight);
    
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.3);
    rimLight.position.set(0, 0, -5);
    scene.add(rimLight);
    
    // Animation
    let animationId: number;
    function animate() {
      animationId = requestAnimationFrame(animate);
      icosahedron.rotation.y += 0.003;
      icosahedron.rotation.x += 0.001;
      renderer.render(scene, camera);
    }
    animate();
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      currentMount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-40 h-40" />;
} 