
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeBackground = () => {
  const containerRef = useRef();
  const mousePosition = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Create larger, more visible shapes
    const shapes = [];
    const geometries = [
      new THREE.IcosahedronGeometry(2, 0),
      new THREE.OctahedronGeometry(2, 0),
      new THREE.TetrahedronGeometry(2, 0)
    ];

    // Create more prominent materials
    const materials = [
      new THREE.MeshPhongMaterial({
        color: 0x9333ea,
        wireframe: true,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
        wireframeLinewidth: 2
      }),
      new THREE.MeshPhongMaterial({
        color: 0x3b82f6,
        wireframe: true,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
        wireframeLinewidth: 2
      })
    ];

    // Create shapes with better positioning
    for (let i = 0; i < 20; i++) {
      const geometry = geometries[i % geometries.length];
      const material = materials[i % materials.length].clone();
      const shape = new THREE.Mesh(geometry, material);
      
      // Position shapes more towards the front
      shape.position.set(
        Math.random() * 60 - 30,
        Math.random() * 60 - 30,
        Math.random() * 20 - 10 // Reduced z-range for better visibility
      );
      
      shape.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      // Larger scale for better visibility
      shape.scale.setScalar(Math.random() * 3 + 1.5);
      shapes.push(shape);
      scene.add(shape);
    }

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x9333ea, 2, 100);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x3b82f6, 2, 100);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    // Position camera closer
    camera.position.z = 25;

    const handleMouseMove = (event) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };

    const animate = () => {
      requestAnimationFrame(animate);

      shapes.forEach((shape, i) => {
        // More pronounced rotation
        shape.rotation.x += 0.002 * (i % 2 ? 1 : -1);
        shape.rotation.y += 0.002 * (i % 3 ? 1 : -1);
        
        // More responsive mouse movement
        shape.position.x += (mousePosition.current.x * 2 - shape.position.x * 0.1) * 0.05;
        shape.position.y += (mousePosition.current.y * 2 - shape.position.y * 0.1) * 0.05;
      });

      // More responsive camera movement
      camera.position.x += (mousePosition.current.x * 3 - camera.position.x) * 0.1;
      camera.position.y += (mousePosition.current.y * 3 - camera.position.y) * 0.1;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      shapes.forEach(shape => {
        shape.geometry.dispose();
        shape.material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />;
};