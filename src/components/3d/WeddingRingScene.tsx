import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const WeddingRingScene: React.FC<{ className?: string }> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 4.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Gold material
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xdfb743,
      metalness: 0.92,
      roughness: 0.18,
    });

    const roseGoldMat = new THREE.MeshStandardMaterial({
      color: 0xe09b85,
      metalness: 0.9,
      roughness: 0.22,
    });

    const diamondMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.05,
      roughness: 0.02,
      transmission: 0.9,
      thickness: 0.5,
      ior: 2.4,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    // Ring 1 (Groom's Classic Gold Band)
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.12, 24, 64), goldMat);
    ring1.rotation.set(0.6, 0.4, 0);
    ring1.position.set(-0.35, 0, 0);
    group.add(ring1);

    // Ring 2 (Bride's Solitaire Diamond Ring)
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.09, 24, 64), roseGoldMat);
    ring2.rotation.set(-0.5, -0.6, 0.3);
    ring2.position.set(0.35, 0.1, 0.1);
    group.add(ring2);

    // Diamond Gemstone on Ring 2
    const diamond = new THREE.Mesh(new THREE.OctahedronGeometry(0.24, 2), diamondMat);
    diamond.scale.set(1, 1.4, 1);
    diamond.position.set(0.35, 0.95, 0.1);
    group.add(diamond);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xfffae0, 2.5, 10);
    pointLight.position.set(2, 3, 3);
    scene.add(pointLight);

    const rimLight = new THREE.DirectionalLight(0xd4af37, 2);
    rimLight.position.set(-3, -1, -2);
    scene.add(rimLight);

    // Render loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      group.rotation.y = elapsed * 0.45;
      group.rotation.x = Math.sin(elapsed * 0.3) * 0.15;
      diamond.rotation.y = elapsed * 0.8;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className={`relative flex items-center justify-center ${className}`} />;
};
