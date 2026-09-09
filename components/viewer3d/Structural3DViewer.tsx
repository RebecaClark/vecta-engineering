"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RotateCw, Maximize2, ShieldCheck, Box, Flame } from "lucide-react";

type MaterialMode = "solid" | "wireframe" | "stress";

interface MeshRecord {
  mesh: THREE.Mesh;
  solidMat: THREE.MeshStandardMaterial;
  wireframeMat: THREE.MeshBasicMaterial;
  stressMat: THREE.MeshStandardMaterial;
}

export const Structural3DViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [materialMode, setMaterialMode] = useState<MaterialMode>("solid");
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState<string | null>("nodal");
  const [modelLoaded, setModelLoaded] = useState(false);

  // Keep references to scene objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const materialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const meshRecordsRef = useRef<MeshRecord[]>([]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = mount.clientWidth || 600;
    const height = mount.clientHeight || 450;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 4.2);
    camera.lookAt(0, 0, 0);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      precision: "mediump",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    rendererRef.current = renderer;
    mount.appendChild(renderer.domElement);

    // 4. Studio Lighting (Neutral High-End Architectural Studio)
    const ambientLight = new THREE.AmbientLight(0xf0f2f5, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.4);
    dirLight1.position.set(4, 5, 3);
    scene.add(dirLight1);

    const fillLight = new THREE.DirectionalLight(0xdce3ed, 1.2);
    fillLight.position.set(-3, 2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xa0aec0, 1.5);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    // 5. Build High-Precision Cast Steel Structural Node
    const group = new THREE.Group();
    groupRef.current = group;
    scene.add(group);

    // Create materials for the parts
    const createNodeMaterial = () => {
      return new THREE.MeshStandardMaterial({
        color: 0x8e9196,
        metalness: 0.88,
        roughness: 0.22,
      });
    };

    materialsRef.current = [];
    meshRecordsRef.current = [];

    // Central Nodal Core Sphere (Initial procedural mesh while GLB loads)
    const coreMat = createNodeMaterial();
    materialsRef.current.push(coreMat);
    const coreGeo = new THREE.SphereGeometry(0.72, 32, 32);
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // 4 Branching Tectonics Arms
    const armDirections = [
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(0, -1, 0),
      new THREE.Vector3(1, 0.4, 0.3).normalize(),
      new THREE.Vector3(-1, 0.4, -0.3).normalize(),
    ];

    armDirections.forEach((dir) => {
      const armMat = createNodeMaterial();
      materialsRef.current.push(armMat);

      const armGeo = new THREE.CylinderGeometry(0.32, 0.42, 1.4, 24);
      const armMesh = new THREE.Mesh(armGeo, armMat);
      armMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
      armMesh.position.copy(dir.clone().multiplyScalar(1.0));
      group.add(armMesh);

      const ringMat = createNodeMaterial();
      materialsRef.current.push(ringMat);
      const ringGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.12, 24);
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
      ringMesh.position.copy(dir.clone().multiplyScalar(1.68));
      group.add(ringMesh);
    });

    // Asynchronously Load High-Precision 3D Factory GLB Model
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      "/models/structural_node.glb",
      (gltf) => {
        // Clear procedural geometry
        while (group.children.length > 0) {
          group.remove(group.children[0]);
        }

        const model = gltf.scene;
        model.scale.set(0.50, 0.50, 0.50);
        model.position.set(0, 0, 0);

        const newRecords: MeshRecord[] = [];

        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const name = child.name || "";
            // Default: Gunmetal Cast Steel S460ML
            let solidColor = 0x42464f;
            let metalness = 0.88;
            let roughness = 0.28;
            let stressColor = 0x343a46; // Deep navy slate (nominal axial load)

            if (name.includes("Core")) {
              solidColor = 0x4e535e; // Cast steel monolithic sphere
              metalness = 0.90;
              roughness = 0.22;
              stressColor = 0x9e382b; // Sober dark terracota FEA peak stress
            } else if (name.includes("Ring")) {
              solidColor = 0x5a544b; // Machined titanium-bronze datum band
              metalness = 0.85;
              roughness = 0.30;
              stressColor = 0x635748; // Muted bronze shear boundary
            } else if (name.includes("Flange")) {
              solidColor = 0x545964; // CNC machined structural steel mating face
              metalness = 0.92;
              roughness = 0.20;
              stressColor = 0x5e5648; // Bending shear transition
            } else if (name.includes("Gusset")) {
              solidColor = 0x383c44; // Weldable structural plate
              metalness = 0.84;
              roughness = 0.35;
              stressColor = 0x48505e; // Stress dissipation transfer
            } else if (name.includes("Bolt")) {
              solidColor = 0x1c1e22; // Blackened high-tensile alloy bolts (Grade 10.9)
              metalness = 0.85;
              roughness = 0.40;
              stressColor = 0x242830; // Pretensioned torque anchor
            }

            const solidMat = new THREE.MeshStandardMaterial({
              color: solidColor,
              metalness,
              roughness,
            });

            const wireframeMat = new THREE.MeshBasicMaterial({
              color: 0xc5a880,
              wireframe: true,
            });

            const stressMat = new THREE.MeshStandardMaterial({
              color: stressColor,
              metalness: 0.5,
              roughness: 0.35,
            });

            newRecords.push({
              mesh: child,
              solidMat,
              wireframeMat,
              stressMat,
            });

            // Set initial material mode
            if (materialMode === "wireframe") {
              child.material = wireframeMat;
            } else if (materialMode === "stress") {
              child.material = stressMat;
            } else {
              child.material = solidMat;
            }
          }
        });

        meshRecordsRef.current = newRecords;
        group.add(model);
        setModelLoaded(true);
      },
      undefined,
      (err) => {
        console.warn("Structural3DViewer: Using procedural fallback model", err);
      }
    );

    // 6. Mouse/Touch Orbit Handling
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationVelocity = { x: 0, y: 0 };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !groupRef.current) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - previousMousePosition.x;
      const deltaY = clientY - previousMousePosition.y;

      groupRef.current.rotation.y += deltaX * 0.008;
      groupRef.current.rotation.x += deltaY * 0.008;

      rotationVelocity = { x: deltaY * 0.004, y: deltaX * 0.004 };
      previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);

    domElement.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    // 7. Responsive Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!mountRef.current || !rendererRef.current) return;
      const newW = mountRef.current.clientWidth;
      const newH = mountRef.current.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    });
    resizeObserver.observe(mount);

    // 8. Animation Loop with Viewport Visibility Observer
    let animationFrameId: number;
    let isVisible = false;

    const animate = () => {
      if (!isVisible) return;
      animationFrameId = requestAnimationFrame(animate);

      if (groupRef.current) {
        if (!isDragging && autoRotate) {
          groupRef.current.rotation.y += 0.005;
        } else if (!isDragging) {
          // Inertia damping
          groupRef.current.rotation.x += rotationVelocity.x;
          groupRef.current.rotation.y += rotationVelocity.y;
          rotationVelocity.x *= 0.94;
          rotationVelocity.y *= 0.94;
        }
      }

      renderer.render(scene, camera);
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        const nowVisible = entry.isIntersecting;
        if (nowVisible && !isVisible) {
          isVisible = true;
          cancelAnimationFrame(animationFrameId);
          animate();
        } else if (!nowVisible) {
          isVisible = false;
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.05 }
    );
    visibilityObserver.observe(mount);

    // Initial render once
    renderer.render(scene, camera);

    // 9. Cleanup
    return () => {
      visibilityObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();

      domElement.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);

      domElement.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);

      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [autoRotate]);

  // Update Material Mode
  useEffect(() => {
    // 1. Update Loaded GLB Meshes
    meshRecordsRef.current.forEach((rec) => {
      if (materialMode === "wireframe") {
        rec.mesh.material = rec.wireframeMat;
      } else if (materialMode === "stress") {
        rec.mesh.material = rec.stressMat;
      } else {
        rec.mesh.material = rec.solidMat;
      }
    });

    // 2. Update Fallback Procedural Materials (if present)
    materialsRef.current.forEach((mat) => {
      if (materialMode === "wireframe") {
        mat.wireframe = true;
        mat.color.setHex(0xc5a880);
      } else if (materialMode === "stress") {
        mat.wireframe = false;
        mat.color.setHex(0x9e382b);
        mat.metalness = 0.5;
        mat.roughness = 0.35;
      } else {
        mat.wireframe = false;
        mat.color.setHex(0x484b54);
        mat.metalness = 0.88;
        mat.roughness = 0.28;
      }
      mat.needsUpdate = true;
    });
  }, [materialMode]);

  return (
    <section
      id="structural-3d"
      className="w-full border-b border-white/10 bg-[#0d0e10] py-16 md:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 relative overflow-hidden"
    >
      <div className="max-w-[1440px] xl:max-w-[1680px] mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#c5a880]" />
              <span className="font-mono text-[11px] text-[#c5a880] uppercase tracking-widest font-semibold">
                SEÇÃO 07 // INSPECIONADOR 3D INTERATIVO WEBGL
              </span>
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl text-[#e3e2e5] font-medium tracking-tight">
              Nó Estrutural Tectônico em Aço Fundido (S460ML)
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#8e9196] font-light leading-relaxed">
              Arraste para rotacionar em 360°. Modelo computacional com distribuição isotrópica para mega-conexões de outriggers com capacidade axial de 14.500 kN.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 font-mono text-xs text-[#c5a880] px-3 py-1.5 bg-[#121417] border border-white/10 blueprint-corner self-start sm:self-end">
            <ShieldCheck className="w-4 h-4" />
            <span>SOLDA AWS D1.1 // ZERO DEFEITOS ULTRASSOM</span>
          </div>
        </div>

        {/* Interactive 3D Canvas Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* 3D Canvas Box */}
          <div className="lg:col-span-8 relative h-[420px] sm:h-[480px] md:h-[540px] w-full bg-[#08090b] border border-white/10 blueprint-corner overflow-hidden group shadow-2xl">
            {/* Blueprint Grid Watermark */}
            <div className="absolute inset-0 bg-architectural-grid opacity-20 pointer-events-none" />

            {/* Three.js Mount */}
            <div
              ref={mountRef}
              className="w-full h-full cursor-grab active:cursor-grabbing select-none"
            />

            {/* HUD Viewport Overlay Controls */}
            <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 font-mono text-[10px] z-10 pointer-events-auto">
              <button
                type="button"
                onClick={() => setMaterialMode("solid")}
                className={`px-3 py-1.5 border transition-colors blueprint-corner cursor-pointer flex items-center gap-1.5 ${
                  materialMode === "solid"
                    ? "bg-[#c5a880] text-[#121417] font-bold border-[#c5a880]"
                    : "bg-[#121417]/80 text-[#8e9196] border-white/10 hover:text-[#e3e2e5]"
                }`}
              >
                <Box className="w-3 h-3" />
                <span>SÓLIDO METÁLICO</span>
              </button>

              <button
                type="button"
                onClick={() => setMaterialMode("wireframe")}
                className={`px-3 py-1.5 border transition-colors blueprint-corner cursor-pointer flex items-center gap-1.5 ${
                  materialMode === "wireframe"
                    ? "bg-[#c5a880] text-[#121417] font-bold border-[#c5a880]"
                    : "bg-[#121417]/80 text-[#8e9196] border-white/10 hover:text-[#e3e2e5]"
                }`}
              >
                <Maximize2 className="w-3 h-3" />
                <span>WIREFRAME</span>
              </button>

              <button
                type="button"
                onClick={() => setMaterialMode("stress")}
                className={`px-3 py-1.5 border transition-colors blueprint-corner cursor-pointer flex items-center gap-1.5 ${
                  materialMode === "stress"
                    ? "bg-[#9e382b] text-white font-bold border-[#9e382b]"
                    : "bg-[#121417]/80 text-[#8e9196] border-white/10 hover:text-[#e3e2e5]"
                }`}
              >
                <Flame className="w-3 h-3" />
                <span>TENSÃO VON MISES</span>
              </button>

              <button
                type="button"
                onClick={() => setAutoRotate(!autoRotate)}
                className="px-3 py-1.5 bg-[#121417]/80 hover:bg-[#1a1d22] text-[#8e9196] hover:text-[#c5a880] border border-white/10 font-mono text-[10px] transition-colors cursor-pointer flex items-center gap-1.5 blueprint-corner"
              >
                <RotateCw className={`w-3 h-3 ${autoRotate ? "text-[#c5a880]" : ""}`} />
                <span>{autoRotate ? "PAUSAR GIRO" : "GIRAR 360°"}</span>
              </button>
            </div>

            {/* Bottom Floating Interaction Cue & Model Status */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[9px] pointer-events-none">
              <div className="flex items-center gap-2 bg-[#090a0c]/85 px-2.5 py-1 border border-white/10 blueprint-corner">
                <span className={`w-1.5 h-1.5 rounded-full ${modelLoaded ? "bg-emerald-400 animate-pulse" : "bg-[#c5a880]"}`} />
                <span className="text-[#c5a880] font-semibold">
                  {modelLoaded ? "MODELO 3D-FACTORY // BLENDER PBR ATIVO" : "CARREGANDO MODELO GLB..."}
                </span>
              </div>
              <div className="text-[#8e9196] bg-[#090a0c]/80 px-2 py-1 border border-white/5 hidden sm:block">
                ARRASTE O MOUSE / TOUCH PARA ROTACIONAR 360°
              </div>
            </div>
          </div>

          {/* Right Inspection Data & Hotspot Specs */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 bg-[#121417]/90 border border-white/10 shadow-xl blueprint-corner space-y-4">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[#c5a880] font-bold">DOSSIÊ TÉCNICO DO COMPONENTE</span>
                <span className="text-[10px] text-[#8e9196]">REF // JN-460</span>
              </div>

              <div className="space-y-3 pt-2">
                <div
                  onClick={() => setActiveHotspot("nodal")}
                  className={`p-3 border transition-colors cursor-pointer blueprint-corner ${
                    activeHotspot === "nodal"
                      ? "bg-[#181a1f] border-[#c5a880]/60"
                      : "bg-[#0f1012] border-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-[#e3e2e5] font-semibold">Núcleo Esférico Central</span>
                    <span className="text-[#c5a880]">Ø 1.440 mm</span>
                  </div>
                  <p className="font-sans text-xs text-[#8e9196] pt-1 leading-relaxed">
                    Monobloco usinado em aço fundido especial com matriz de alívio térmico pós-soldagem.
                  </p>
                </div>

                <div
                  onClick={() => setActiveHotspot("flange")}
                  className={`p-3 border transition-colors cursor-pointer blueprint-corner ${
                    activeHotspot === "flange"
                      ? "bg-[#181a1f] border-[#c5a880]/60"
                      : "bg-[#0f1012] border-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-[#e3e2e5] font-semibold">Flanges de Encaixe Cônico</span>
                    <span className="text-[#c5a880]">14.500 kN</span>
                  </div>
                  <p className="font-sans text-xs text-[#8e9196] pt-1 leading-relaxed">
                    Resistência máxima à tração e compressão sem empenamento elasto-plástico.
                  </p>
                </div>

                <div
                  onClick={() => setActiveHotspot("stress")}
                  className={`p-3 border transition-colors cursor-pointer blueprint-corner ${
                    activeHotspot === "stress"
                      ? "bg-[#181a1f] border-[#c5a880]/60"
                      : "bg-[#0f1012] border-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-[#e3e2e5] font-semibold">Tensão Limite de Escoamento</span>
                    <span className="text-[#d9534f]">fy = 460 MPa</span>
                  </div>
                  <p className="font-sans text-xs text-[#8e9196] pt-1 leading-relaxed">
                    Testado em ensaios de impacto Charpy V a -40°C para tenacidade à fratura.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-[#8e9196]">
                <span>NORMA DE CONEXÃO</span>
                <span className="text-[#c5a880]">EN 1993-1-8 // AISC 358</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
