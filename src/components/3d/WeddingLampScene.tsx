import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface WeddingLampSceneProps {
  className?: string;
}

export const WeddingLampScene: React.FC<WeddingLampSceneProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.2, 5.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Group for Lamp
    const lampGroup = new THREE.Group();
    lampGroup.position.set(0, -1.1, 0);
    scene.add(lampGroup);

    // Materials - Brass Metallic finish
    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.85,
      roughness: 0.25,
      envMapIntensity: 1.0,
    });

    const darkBrassMaterial = new THREE.MeshStandardMaterial({
      color: 0xaa820a,
      metalness: 0.9,
      roughness: 0.35,
    });

    // 1. Lamp Base (Circular tiered pedestals)
    const baseBottom = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.3, 0.2, 32), brassMaterial);
    baseBottom.position.y = 0.1;
    lampGroup.add(baseBottom);

    const baseMiddle = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 1.05, 0.18, 32), darkBrassMaterial);
    baseMiddle.position.y = 0.28;
    lampGroup.add(baseMiddle);

    const baseTop = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.8, 0.22, 32), brassMaterial);
    baseTop.position.y = 0.46;
    lampGroup.add(baseTop);

    // 2. Central Fluted Pillar (Kuthuvilakku stem)
    const stemLower = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.28, 0.8, 24), brassMaterial);
    stemLower.position.y = 0.92;
    lampGroup.add(stemLower);

    const stemRing1 = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.08, 16, 32), brassMaterial);
    stemRing1.rotation.x = Math.PI / 2;
    stemRing1.position.y = 1.35;
    lampGroup.add(stemRing1);

    const stemUpper = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.16, 0.8, 24), brassMaterial);
    stemUpper.position.y = 1.78;
    lampGroup.add(stemUpper);

    // 3. Lower Oil Bowl (Thattu)
    const lowerBowl = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.25, 0.22, 32), brassMaterial);
    lowerBowl.position.y = 2.15;
    lampGroup.add(lowerBowl);

    const lowerBowlRim = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.05, 16, 32), darkBrassMaterial);
    lowerBowlRim.rotation.x = Math.PI / 2;
    lowerBowlRim.position.y = 2.25;
    lampGroup.add(lowerBowlRim);

    // 4. Middle Stem Tier
    const midStem = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 0.5, 24), brassMaterial);
    midStem.position.y = 2.5;
    lampGroup.add(midStem);

    // 5. Main Oil Diya Tier with 5 Spouts (Pancha Mukhi)
    const mainBowl = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 0.2, 0.28, 32), brassMaterial);
    mainBowl.position.y = 2.85;
    lampGroup.add(mainBowl);

    // 5 Spout tips for the wicks
    const spoutCount = 5;
    const spoutGroup = new THREE.Group();
    for (let i = 0; i < spoutCount; i++) {
      const angle = (i / spoutCount) * Math.PI * 2;
      const spout = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.35, 16), brassMaterial);
      spout.rotation.z = -Math.PI / 3;
      spout.rotation.y = angle;
      spout.position.set(Math.cos(angle) * 1.15, 2.92, Math.sin(angle) * 1.15);
      spoutGroup.add(spout);
    }
    lampGroup.add(spoutGroup);

    // 6. Crowning Top Finial (Annam / Peacock motif pinnacle)
    const finialPillar = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 0.4, 24), brassMaterial);
    finialPillar.position.y = 3.15;
    lampGroup.add(finialPillar);

    const finialCrown = new THREE.Mesh(new THREE.OctahedronGeometry(0.3, 2), brassMaterial);
    finialCrown.scale.set(0.6, 1.2, 0.6);
    finialCrown.position.y = 3.55;
    lampGroup.add(finialCrown);

    // 7. Dynamic Flame at the Center Top
    const flameMat = new THREE.MeshBasicMaterial({
      color: 0xffa028,
      transparent: true,
      opacity: 0.9,
    });
    const flameCoreMat = new THREE.MeshBasicMaterial({
      color: 0xfffae0,
      transparent: true,
      opacity: 0.95,
    });

    const flameOuter = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.45, 16), flameMat);
    flameOuter.position.y = 3.9;
    lampGroup.add(flameOuter);

    const flameInner = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.28, 16), flameCoreMat);
    flameInner.position.y = 3.82;
    lampGroup.add(flameInner);

    // 8. Lights
    const ambientLight = new THREE.AmbientLight(0xfff3d6, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffeedd, 2.2);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd4af37, 1.8);
    rimLight.position.set(-3, 2, -2);
    scene.add(rimLight);

    // Warm Flickering Point Light from Diya
    const flameLight = new THREE.PointLight(0xffaa22, 3.5, 7);
    flameLight.position.set(0, 2.7, 0);
    scene.add(flameLight);

    // 9. Floating Golden Dust Particles
    const particleCount = 80;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4.5;
      positions[i * 3 + 1] = Math.random() * 4 - 1.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4.5;
      particleSpeeds[i] = 0.005 + Math.random() * 0.01;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffd97d,
      size: 0.05,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Mouse Parallax Interaction
    let targetRotationY = 0;
    let targetRotationX = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationY = x * 0.35;
      targetRotationX = -y * 0.15;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Slow gentle rotation + mouse tilt
      lampGroup.rotation.y += (targetRotationY + elapsed * 0.12 - lampGroup.rotation.y) * 0.05;
      lampGroup.rotation.x += (targetRotationX - lampGroup.rotation.x) * 0.05;

      // Realistic flame flicker
      const flicker = Math.sin(elapsed * 12) * 0.08 + Math.cos(elapsed * 23) * 0.04;
      flameOuter.scale.set(1 + flicker, 1 + flicker * 1.6, 1 + flicker);
      flameOuter.rotation.z = Math.sin(elapsed * 8) * 0.06;
      flameInner.scale.set(1 + flicker * 0.8, 1 + flicker * 1.2, 1 + flicker * 0.8);
      flameLight.intensity = 3.2 + Math.sin(elapsed * 15) * 0.6;

      // Particle animation (golden dust rising)
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        let y = posAttr.getY(i);
        y += particleSpeeds[i];
        if (y > 3.0) y = -1.5;
        posAttr.setY(i, y);
      }
      posAttr.needsUpdate = true;
      particleSystem.rotation.y = elapsed * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[400px] md:h-[480px] flex items-center justify-center pointer-events-none select-none ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[#120508] via-transparent to-transparent pointer-events-none" />
    </div>
  );
};
