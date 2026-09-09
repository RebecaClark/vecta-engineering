"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  Layers,
  Activity,
  Shield,
  ArrowDown,
  RotateCw,
  Box,
  Maximize2,
  Flame,
  ChevronRight,
} from "lucide-react";
import { getGSAP } from "@/lib/gsap";

const EXPLODED_STAGES = [
  {
    id: "assembled",
    phase: "00",
    title: "Torre Monolítica Integrada",
    cota: "+284,40 M",
    desc: "Estado nominal montado. Todas as forças axiais, de cisalhamento e momentos de tombamento em equilíbrio estático perfeito.",
    spec: "FEA DETERMINÍSTICO // EQUILÍBRIO NOMINAL",
  },
  {
    id: "foundations",
    phase: "01",
    title: "Radier & Tubulões Subterrâneos",
    cota: "-35,00 M",
    desc: "Deslocamento vertical negativo da subestrutura: 48 tubulões escavados engastados na rocha matriz com concreto C60 autoadensável.",
    spec: "CAPACIDADE AXIAL: 145.000 kN // RECALQUE: < 8mm",
  },
  {
    id: "outriggers",
    phase: "02",
    title: "Mega-Colunas & Treliças Outrigger",
    cota: "+120,00 M",
    desc: "Expansão lateral dos braços cinéticos de contraventamento em 360°. Reduzem o momento fletor na base em 38%.",
    spec: "AÇO S460ML // NÓS SOLDADOS DE PENETRAÇÃO TOTAL",
  },
  {
    id: "tmd",
    phase: "03",
    title: "Amortecedor de Massa Sintonizada (TMD)",
    cota: "+265,00 M",
    desc: "Esfera pendular cinética de 650 toneladas com pistões hidráulicos viscosos. Dissipa energia cinética de ventos e sismos.",
    spec: "FREQUÊNCIA: 0.18 Hz // REDUÇÃO DE ACELERAÇÃO: 45%",
  },
  {
    id: "facade",
    phase: "04",
    title: "Pele de Vidro & Wireframe Estrutural",
    cota: "+284,40 M",
    desc: "Fachada unitizada translúcida desacoplada com juntas de expansão sísmica e lâminas com controle de pressão de vento.",
    spec: "PRESSÃO DE VENTO: 3.200 Pa // ISOLAMENTO U=1.1",
  },
];

type RenderMode = "solid" | "wireframe" | "stress";

export const StructuralExplodedView: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mountRef = useRef<HTMLDivElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [renderMode, setRenderMode] = useState<RenderMode>("solid");
  const [autoRotate, setAutoRotate] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);

  // References for Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const towerGroupRef = useRef<THREE.Group | null>(null);

  // Structural Layer Groups
  const fndGroupRef = useRef<THREE.Group | null>(null);
  const coreGroupRef = useRef<THREE.Group | null>(null);
  const outriggersGroupRef = useRef<THREE.Group | null>(null);
  const tmdGroupRef = useRef<THREE.Group | null>(null);
  const facadeGroupRef = useRef<THREE.Group | null>(null);

  // Material registry for live mode swapping
  const materialsRef = useRef<{
    solid: THREE.Material[];
    wireframe: THREE.Material[];
    stress: THREE.Material[];
  }>({ solid: [], wireframe: [], stress: [] });

  // Progress ref for animation loop
  const progressRef = useRef(0);
  const orbitAngleRef = useRef({ x: 0.15, y: 0.35 });
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });

  // 1. GSAP ScrollTrigger for pinning and scrubbing
  useEffect(() => {
    const { gsap, ScrollTrigger } = getGSAP();
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=240%",
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          setScrollProgress(p);
          progressRef.current = p;
          const stage = Math.min(
            EXPLODED_STAGES.length - 1,
            Math.floor(p * EXPLODED_STAGES.length)
          );
          setActiveStageIdx(stage);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 2. Three.js Scene Setup & Geometry Construction
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 700;
    const height = mount.clientHeight || 520;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 9.5);
    camera.lookAt(0, 0.2, 0);
    cameraRef.current = camera;

    // Renderer
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

    // Studio Lighting (Neutral High-End Architectural Studio)
    const ambientLight = new THREE.AmbientLight(0xf0f2f5, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const fillLight = new THREE.DirectionalLight(0xdce3ed, 1.2);
    fillLight.position.set(-5, 4, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xa0aec0, 1.4);
    rimLight.position.set(-6, -2, -4);
    scene.add(rimLight);

    // Subterranean Depth Light (Deep mineral slate)
    const subLight = new THREE.PointLight(0x252a33, 0.8, 10);
    subLight.position.set(0, -4, 0);
    scene.add(subLight);

    // Main Tower Group that orbits
    const towerGroup = new THREE.Group();
    towerGroupRef.current = towerGroup;
    scene.add(towerGroup);

    // Sober Architectural Materials
    const concreteSolidMat = new THREE.MeshStandardMaterial({
      color: 0x585c64,
      metalness: 0.08,
      roughness: 0.85,
    });
    const steelSolidMat = new THREE.MeshStandardMaterial({
      color: 0x484d56,
      metalness: 0.90,
      roughness: 0.25,
    });
    const bronzeSolidMat = new THREE.MeshStandardMaterial({
      color: 0x5e564c,
      metalness: 0.85,
      roughness: 0.28,
    });
    const glassSolidMat = new THREE.MeshStandardMaterial({
      color: 0x242a34,
      transparent: true,
      opacity: 0.22,
      roughness: 0.06,
      metalness: 0.10,
    });

    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0xc5a880,
      wireframe: true,
    });

    const stressHotMat = new THREE.MeshStandardMaterial({
      color: 0x8c3535,
      metalness: 0.5,
      roughness: 0.35,
    });
    const stressMidMat = new THREE.MeshStandardMaterial({
      color: 0x6e5d48,
      metalness: 0.4,
      roughness: 0.45,
    });
    const stressLowMat = new THREE.MeshStandardMaterial({
      color: 0x3d4554,
      metalness: 0.3,
      roughness: 0.55,
    });

    materialsRef.current = {
      solid: [concreteSolidMat, steelSolidMat, bronzeSolidMat, glassSolidMat],
      wireframe: [wireframeMat],
      stress: [stressHotMat, stressMidMat, stressLowMat],
    };

    // ==========================================
    // LAYER 1: FUNDAÇÕES & TUBULÕES (Sinks -Y)
    // ==========================================
    const fndGroup = new THREE.Group();
    fndGroupRef.current = fndGroup;
    towerGroup.add(fndGroup);

    // Foundation Raft Slab (Radier)
    const raftGeo = new THREE.BoxGeometry(3.6, 0.35, 3.6);
    const raftMesh = new THREE.Mesh(raftGeo, concreteSolidMat);
    raftMesh.position.y = -2.1;
    fndGroup.add(raftMesh);

    // 16 Deep Caissons / Piles into bedrock
    for (let x = -1.35; x <= 1.35; x += 0.9) {
      for (let z = -1.35; z <= 1.35; z += 0.9) {
        const pileGeo = new THREE.CylinderGeometry(0.065, 0.065, 1.8, 16);
        const pileMesh = new THREE.Mesh(pileGeo, concreteSolidMat);
        pileMesh.position.set(x, -3.1, z);
        fndGroup.add(pileMesh);
      }
    }

    // Bedrock datum ring
    const ringGeo = new THREE.RingGeometry(2.0, 2.05, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xc5a880, side: THREE.DoubleSide });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = -4.0;
    fndGroup.add(ringMesh);

    // ==========================================
    // LAYER 2: NÚCLEO CENTRAL C90 (Center Anchor)
    // ==========================================
    const coreGroup = new THREE.Group();
    coreGroupRef.current = coreGroup;
    towerGroup.add(coreGroup);

    // Main central core box (Hollow representation)
    const coreHeight = 4.6;
    const coreGeo = new THREE.BoxGeometry(1.3, coreHeight, 1.3);
    const coreMesh = new THREE.Mesh(coreGeo, concreteSolidMat);
    coreMesh.position.y = 0.4;
    coreGroup.add(coreMesh);

    // Core floor plates / shear apertures
    for (let y = -1.6; y <= 2.4; y += 0.5) {
      const slabGeo = new THREE.BoxGeometry(1.35, 0.04, 1.35);
      const slabMesh = new THREE.Mesh(slabGeo, steelSolidMat);
      slabMesh.position.y = y;
      coreGroup.add(slabMesh);
    }

    // ==========================================
    // LAYER 3: OUTRIGGERS & MEGA-COLUNAS (Expands X/Z)
    // ==========================================
    const outriggersGroup = new THREE.Group();
    outriggersGroupRef.current = outriggersGroup;
    towerGroup.add(outriggersGroup);

    // 4 Corner Mega Columns
    const cornerPositions = [
      { x: -1.3, z: -1.3 },
      { x: 1.3, z: -1.3 },
      { x: -1.3, z: 1.3 },
      { x: 1.3, z: 1.3 },
    ];

    cornerPositions.forEach((pos) => {
      const colGeo = new THREE.BoxGeometry(0.24, coreHeight, 0.24);
      const colMesh = new THREE.Mesh(colGeo, steelSolidMat);
      colMesh.position.set(pos.x, 0.4, pos.z);
      outriggersGroup.add(colMesh);
    });

    // Space Trusses connecting core to perimeter
    const trussLevels = [-0.5, 1.2];
    trussLevels.forEach((levelY) => {
      cornerPositions.forEach((pos) => {
        // Diagonal strut from core to column
        const dir = new THREE.Vector3(pos.x, 0, pos.z).normalize();
        const strutLength = 0.9;
        const strutGeo = new THREE.CylinderGeometry(0.045, 0.045, strutLength, 12);
        const strutMesh = new THREE.Mesh(strutGeo, steelSolidMat);
        strutMesh.position.set(pos.x * 0.55, levelY, pos.z * 0.55);
        strutMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
        outriggersGroup.add(strutMesh);
      });
    });

    // ==========================================
    // LAYER 4: TUNED MASS DAMPER (TMD) (Floats +Y)
    // ==========================================
    const tmdGroup = new THREE.Group();
    tmdGroupRef.current = tmdGroup;
    towerGroup.add(tmdGroup);

    // Top Crown Girders
    const crownGeo = new THREE.BoxGeometry(1.5, 0.15, 1.5);
    const crownMesh = new THREE.Mesh(crownGeo, steelSolidMat);
    crownMesh.position.y = 2.8;
    tmdGroup.add(crownMesh);

    // TMD Kinetic Pendulum Sphere
    const tmdSphereGeo = new THREE.SphereGeometry(0.42, 32, 32);
    const tmdSphere = new THREE.Mesh(tmdSphereGeo, bronzeSolidMat);
    tmdSphere.position.y = 2.2;
    tmdGroup.add(tmdSphere);

    // 4 Suspension Cables
    const cablePoints = [
      { top: new THREE.Vector3(-0.4, 2.8, -0.4), bot: new THREE.Vector3(0, 2.2, 0) },
      { top: new THREE.Vector3(0.4, 2.8, -0.4), bot: new THREE.Vector3(0, 2.2, 0) },
      { top: new THREE.Vector3(-0.4, 2.8, 0.4), bot: new THREE.Vector3(0, 2.2, 0) },
      { top: new THREE.Vector3(0.4, 2.8, 0.4), bot: new THREE.Vector3(0, 2.2, 0) },
    ];

    cablePoints.forEach((pts) => {
      const cableMat = new THREE.LineBasicMaterial({ color: 0xe3e2e5 });
      const cableGeo = new THREE.BufferGeometry().setFromPoints([pts.top, pts.bot]);
      const cableLine = new THREE.Line(cableGeo, cableMat);
      tmdGroup.add(cableLine);
    });

    // ==========================================
    // LAYER 5: CURTAIN WALL PELE DE VIDRO (Peels Forward)
    // ==========================================
    const facadeGroup = new THREE.Group();
    facadeGroupRef.current = facadeGroup;
    towerGroup.add(facadeGroup);

    // 4 Translucent Glass Planes surrounding the tower
    const facadeWidth = 3.0;
    const facadeHeight = 4.8;

    const facades = [
      { pos: [0, 0.4, 1.55], rot: [0, 0, 0] },
      { pos: [0, 0.4, -1.55], rot: [0, Math.PI, 0] },
      { pos: [1.55, 0.4, 0], rot: [0, Math.PI / 2, 0] },
      { pos: [-1.55, 0.4, 0], rot: [0, -Math.PI / 2, 0] },
    ];

    facades.forEach((f) => {
      const pGeo = new THREE.PlaneGeometry(facadeWidth, facadeHeight);
      const pMesh = new THREE.Mesh(pGeo, glassSolidMat);
      pMesh.position.set(f.pos[0], f.pos[1], f.pos[2]);
      pMesh.rotation.set(f.rot[0], f.rot[1], f.rot[2]);
      facadeGroup.add(pMesh);

      // Aluminum Mullions Grid (Edges)
      const edgeGeo = new THREE.EdgesGeometry(pGeo);
      const edgeMat = new THREE.LineBasicMaterial({ color: 0xc5a880, opacity: 0.6, transparent: true });
      const edgeLine = new THREE.LineSegments(edgeGeo, edgeMat);
      edgeLine.position.set(f.pos[0], f.pos[1], f.pos[2]);
      edgeLine.rotation.set(f.rot[0], f.rot[1], f.rot[2]);
      facadeGroup.add(edgeLine);
    });

    // ==========================================
    // 2.1 ASYNCHRONOUS GLB MODEL LOADER (3D-FACTORY)
    // ==========================================
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      "/models/vecta_tower_exploded.glb",
      (gltf) => {
        // Clear procedural geometry
        while (towerGroup.children.length > 0) {
          towerGroup.remove(towerGroup.children[0]);
        }

        const model = gltf.scene;
        // Vertical centering: tower spans Y = -2.30 to +5.20 (scale 0.76 fits fully in viewport)
        model.position.y = -1.10;
        model.scale.set(0.76, 0.76, 0.76);

        // Bind the 5 discrete parent layers for scroll-driven exploded scrollytelling
        const fnd = model.getObjectByName("Layer_Foundations") as THREE.Group;
        const core = model.getObjectByName("Layer_Core") as THREE.Group;
        const outriggers = model.getObjectByName("Layer_Outriggers") as THREE.Group;
        const tmd = model.getObjectByName("Layer_TMD") as THREE.Group;
        const facade = model.getObjectByName("Layer_Facade") as THREE.Group;

        if (fnd) fndGroupRef.current = fnd;
        if (core) coreGroupRef.current = core;
        if (outriggers) outriggersGroupRef.current = outriggers;
        if (tmd) tmdGroupRef.current = tmd;
        if (facade) facadeGroupRef.current = facade;

        // Traverse loaded meshes to assign materials and configure mode switching
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.userData.originalMaterial = child.material;

            const wireMat = new THREE.MeshBasicMaterial({
              color: 0xc5a880,
              wireframe: true,
            });
            child.userData.wireframeMaterial = wireMat;

            let stressColor = 0x4a5260; // Neutral structural slate
            const parentName = child.parent?.name || "";
            if (parentName.includes("Foundations") || child.position.y < -0.5) {
              stressColor = 0x8c3535; // Sombrio terracota: alta compressão nas fundações
            } else if (parentName.includes("TMD")) {
              stressColor = 0x3d4554; // Grafite usinado: pêndulo inercial
            } else if (parentName.includes("Facade")) {
              stressColor = 0x242a34; // Cinza fumê: envelope aerodinâmico
            } else if (parentName.includes("Core")) {
              stressColor = 0x6e5d48; // Bronze/âmbar técnico suave: cisalhamento acoplado
            } else {
              stressColor = 0x4a5260; // Aço estrutural neutro: outriggers e vigas
            }

            const stressMat = new THREE.MeshStandardMaterial({
              color: stressColor,
              metalness: 0.45,
              roughness: 0.35,
            });
            child.userData.stressMaterial = stressMat;

            // Set initial mode
            if (renderMode === "wireframe") {
              child.material = wireMat;
            } else if (renderMode === "stress") {
              child.material = stressMat;
            }
          }
        });

        towerGroup.add(model);
        setModelLoaded(true);
      },
      undefined,
      (err) => {
        console.warn("StructuralExplodedView: Using procedural fallback model", err);
      }
    );

    // ==========================================
    // 3. Pointer Drag Orbit Events
    // ==========================================
    const domEl = renderer.domElement;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = true;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      lastMousePosRef.current = { x: clientX, y: clientY };
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - lastMousePosRef.current.x;
      const deltaY = clientY - lastMousePosRef.current.y;

      orbitAngleRef.current.y += deltaX * 0.007;
      orbitAngleRef.current.x = Math.max(
        -0.5,
        Math.min(0.8, orbitAngleRef.current.x + deltaY * 0.007)
      );

      velocityRef.current = { x: deltaY * 0.003, y: deltaX * 0.003 };
      lastMousePosRef.current = { x: clientX, y: clientY };
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    domEl.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);

    domEl.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    // Responsive Resize
    const resizeObserver = new ResizeObserver(() => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const newW = mountRef.current.clientWidth;
      const newH = mountRef.current.clientHeight;
      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    });
    resizeObserver.observe(mount);

    // ==========================================
    // 4. Animation & Physics Render Loop with Visibility Observer
    // ==========================================
    let animId: number;
    let isVisible = false;

    const animate = () => {
      if (!isVisible) return;
      animId = requestAnimationFrame(animate);

      const p = progressRef.current; // 0 to 1

      // Physical Exploded Displacements along mounting axes
      if (fndGroupRef.current) {
        // Foundations sink downward along -Y
        fndGroupRef.current.position.y = -p * 2.2;
      }

      if (coreGroupRef.current) {
        // Core remains steady at center of mass
        coreGroupRef.current.position.y = 0;
      }

      if (outriggersGroupRef.current) {
        // Outriggers expand laterally on X/Z plane and scale slightly
        const outriggerSpread = p * 1.6;
        outriggersGroupRef.current.scale.set(
          1 + outriggerSpread * 0.45,
          1,
          1 + outriggerSpread * 0.45
        );
      }

      if (tmdGroupRef.current) {
        // TMD floats upward on +Y with subtle pendulum oscillation
        const pendulumSway = Math.sin(Date.now() * 0.002) * 0.08;
        tmdGroupRef.current.position.y = p * 2.1;
        tmdGroupRef.current.rotation.z = pendulumSway * (1 - p * 0.5);
      }

      if (facadeGroupRef.current) {
        // Glass Curtain wall expands forward and outward
        const facadeSpread = p * 2.0;
        facadeGroupRef.current.scale.set(
          1 + facadeSpread * 0.5,
          1 + p * 0.1,
          1 + facadeSpread * 0.5
        );
      }

      // Camera dynamic dolly during scroll scrub
      if (cameraRef.current) {
        // Smooth camera height and distance adjustment with slight panoramic pull-back
        const targetCamY = 0.8 + p * 0.4;
        const targetCamDist = 9.8 + p * 0.9;
        cameraRef.current.position.y = targetCamY;
        cameraRef.current.position.z = targetCamDist;
      }

      // Orbit Rotation
      if (towerGroupRef.current) {
        if (isDraggingRef.current) {
          towerGroupRef.current.rotation.x = orbitAngleRef.current.x;
          towerGroupRef.current.rotation.y = orbitAngleRef.current.y;
        } else {
          // Inertia damping
          orbitAngleRef.current.x += velocityRef.current.x;
          orbitAngleRef.current.y += velocityRef.current.y;
          velocityRef.current.x *= 0.93;
          velocityRef.current.y *= 0.93;

          if (autoRotate) {
            orbitAngleRef.current.y += 0.006;
          }

          towerGroupRef.current.rotation.x = orbitAngleRef.current.x;
          towerGroupRef.current.rotation.y = orbitAngleRef.current.y;
        }
      }

      renderer.render(scene, camera);
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        const nowVisible = entry.isIntersecting;
        if (nowVisible && !isVisible) {
          isVisible = true;
          cancelAnimationFrame(animId);
          animate();
        } else if (!nowVisible) {
          isVisible = false;
          cancelAnimationFrame(animId);
        }
      },
      { threshold: 0.05, rootMargin: "100px" }
    );
    visibilityObserver.observe(mount);

    // Initial render once
    renderer.render(scene, camera);

    // Cleanup
    return () => {
      visibilityObserver.disconnect();
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();

      domEl.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);

      domEl.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);

      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [autoRotate]);

  // 3. Mode Switcher (Solid / Wireframe / Stress)
  useEffect(() => {
    if (!towerGroupRef.current) return;

    towerGroupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (renderMode === "wireframe") {
          if (child.userData.wireframeMaterial) {
            child.material = child.userData.wireframeMaterial;
          } else {
            child.material.wireframe = true;
            if (child.material instanceof THREE.MeshStandardMaterial || child.material instanceof THREE.MeshBasicMaterial) {
              child.material.color.setHex(0xc5a880);
            }
          }
        } else if (renderMode === "stress") {
          if (child.userData.stressMaterial) {
            child.material = child.userData.stressMaterial;
          } else {
            child.material.wireframe = false;
            if (child.position.y < -1.5) {
              child.material.color.setHex(0x8c3535); // Sober dark terracota
            } else if (child.position.y > 1.8) {
              child.material.color.setHex(0x3d4554); // Grafite usinado
            } else {
              child.material.color.setHex(0x6e5d48); // Bronze técnico
            }
          }
        } else {
          // Solid PBR Architecture
          if (child.userData.originalMaterial) {
            child.material = child.userData.originalMaterial;
          } else {
            child.material.wireframe = false;
            if (child.geometry instanceof THREE.SphereGeometry) {
              child.material.color.setHex(0x5e564c); // Tungsten bronze
              child.material.metalness = 0.85;
            } else if (child.geometry instanceof THREE.PlaneGeometry) {
              child.material.color.setHex(0x242a34); // Smoked neutral glass
            } else if (child.geometry instanceof THREE.CylinderGeometry && child.position.y > 0) {
              child.material.color.setHex(0x484d56); // Structural steel
            } else {
              child.material.color.setHex(0x585c64); // Concrete & steel
            }
          }
        }
        child.material.needsUpdate = true;
      }
    });
  }, [renderMode]);

  const currentStage = EXPLODED_STAGES[activeStageIdx];

  return (
    <section
      id="exploded-view"
      ref={containerRef}
      className="relative w-full h-screen bg-[#07080a] text-[#e3e2e5] flex flex-col justify-between overflow-hidden border-b border-white/10 select-none"
    >
      {/* Background blueprint grid & laser line */}
      <div className="absolute inset-0 bg-architectural-grid opacity-15 pointer-events-none" />
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#c5a880]/30 to-transparent animate-scanline pointer-events-none" />

      {/* Top Telemetry Header */}
      <div className="relative z-20 w-full max-w-[1440px] xl:max-w-[1680px] mx-auto px-4 sm:px-8 pt-6 md:pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-[#c5a880] animate-pulse" />
          <div>
            <span className="font-mono text-[11px] text-[#c5a880] uppercase tracking-widest font-semibold block">
              SEÇÃO 06 // DESMONTAGEM AXONOMÉTRICA TECTÔNICA 3D (EXPLODED VIEW)
            </span>
            <h2 className="font-headline text-xl sm:text-2xl text-[#e3e2e5] font-medium tracking-tight">
              Anatomia Estrutural Dissociada por Scroll (WebGL 3D)
            </h2>
          </div>
        </div>

        {/* Real-time Telemetry Readout */}
        <div className="flex items-center gap-4 font-mono text-xs text-[#8e9196]">
          <div className="px-3 py-1 bg-[#121417] border border-white/10 flex items-center gap-2 blueprint-corner">
            <Activity className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>DISPERSÃO AXIAL:</span>
            <span className="text-[#c5a880] font-bold">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-[#121417] border border-white/10 blueprint-corner">
            <Shield className={`w-3.5 h-3.5 ${modelLoaded ? "text-emerald-400" : "text-[#c5a880]"}`} />
            <span className={modelLoaded ? "text-emerald-400 font-semibold" : "text-[#8e9196]"}>
              {modelLoaded ? "3D-FACTORY // BLENDER PBR ATIVO" : "CARREGANDO GLB..."}
            </span>
          </div>
        </div>
      </div>

      {/* Middle Center: The Exploded 3D WebGL Visualization */}
      <div className="relative z-10 flex-1 w-full max-w-[1440px] xl:max-w-[1680px] mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-2">
        {/* Left Side: Dynamic Stage Metadata Card */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          <div className="p-6 bg-[#121417]/90 border border-white/10 backdrop-blur-md shadow-2xl blueprint-corner space-y-4">
            <div className="flex items-center justify-between font-mono">
              <span className="text-xs font-bold text-[#c5a880] tracking-wider">
                COMPONENTE // {currentStage.phase}
              </span>
              <span className="text-[10px] text-[#e3e2e5] px-2 py-0.5 bg-[#c5a880]/15 border border-[#c5a880]/30 font-semibold">
                COTA {currentStage.cota}
              </span>
            </div>

            <h3 className="font-headline text-2xl text-[#e3e2e5] font-medium leading-tight">
              {currentStage.title}
            </h3>

            <p className="font-sans text-xs sm:text-sm text-[#8e9196] font-light leading-relaxed">
              {currentStage.desc}
            </p>

            <div className="pt-3 border-t border-white/5 space-y-1 font-mono text-[10px]">
              <span className="text-[#8e9196] block">ESPECIFICAÇÃO TÉCNICA</span>
              <span className="text-[#c5a880] font-medium block">{currentStage.spec}</span>
            </div>
          </div>

          {/* Interactive Stage Selectors */}
          <div className="grid grid-cols-5 gap-1.5 font-mono text-[10px]">
            {EXPLODED_STAGES.map((st, i) => (
              <div
                key={st.id}
                className={`p-2 border text-center transition-colors blueprint-corner ${
                  activeStageIdx === i
                    ? "bg-[#c5a880] text-[#121417] font-bold border-[#c5a880]"
                    : "bg-[#121417] text-[#8e9196] border-white/10"
                }`}
              >
                <span>F-{st.phase}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Interactive 3D WebGL Canvas */}
        <div className="lg:col-span-8 h-[420px] sm:h-[480px] md:h-[540px] w-full relative bg-[#090a0c] border border-white/10 blueprint-corner overflow-hidden group shadow-2xl">
          {/* Blueprint Grid Watermark */}
          <div className="absolute inset-0 bg-architectural-grid opacity-20 pointer-events-none" />

          {/* Three.js Canvas Mount */}
          <div
            ref={mountRef}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          />

          {/* HUD 3D Shader Controls */}
          <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 font-mono text-[10px] z-10 pointer-events-auto">
            <button
              type="button"
              onClick={() => setRenderMode("solid")}
              className={`px-3 py-1.5 border transition-colors blueprint-corner cursor-pointer flex items-center gap-1.5 ${
                renderMode === "solid"
                  ? "bg-[#c5a880] text-[#121417] font-bold border-[#c5a880]"
                  : "bg-[#121417]/85 text-[#8e9196] border-white/10 hover:text-[#e3e2e5]"
              }`}
            >
              <Box className="w-3 h-3" />
              <span>SÓLIDO 3D</span>
            </button>

            <button
              type="button"
              onClick={() => setRenderMode("wireframe")}
              className={`px-3 py-1.5 border transition-colors blueprint-corner cursor-pointer flex items-center gap-1.5 ${
                renderMode === "wireframe"
                  ? "bg-[#c5a880] text-[#121417] font-bold border-[#c5a880]"
                  : "bg-[#121417]/85 text-[#8e9196] border-white/10 hover:text-[#e3e2e5]"
              }`}
            >
              <Maximize2 className="w-3 h-3" />
              <span>WIREFRAME</span>
            </button>

            <button
              type="button"
              onClick={() => setRenderMode("stress")}
              className={`px-3 py-1.5 border transition-colors blueprint-corner cursor-pointer flex items-center gap-1.5 ${
                renderMode === "stress"
                  ? "bg-[#9e382b] text-white font-bold border-[#9e382b]"
                  : "bg-[#121417]/85 text-[#8e9196] border-white/10 hover:text-[#e3e2e5]"
              }`}
            >
              <Flame className="w-3 h-3" />
              <span>TENSÃO FEA</span>
            </button>

            <button
              type="button"
              onClick={() => setAutoRotate(!autoRotate)}
              className="px-3 py-1.5 bg-[#121417]/85 hover:bg-[#1a1d22] text-[#8e9196] hover:text-[#c5a880] border border-white/10 font-mono text-[10px] transition-colors cursor-pointer flex items-center gap-1.5 blueprint-corner"
            >
              <RotateCw className={`w-3 h-3 ${autoRotate ? "text-[#c5a880]" : ""}`} />
              <span>{autoRotate ? "PAUSAR GIRO" : "GIRAR 360°"}</span>
            </button>
          </div>

          {/* Bottom Floating Interaction Cue */}
          <div className="absolute bottom-3 right-3 font-mono text-[9px] text-[#8e9196] bg-[#090a0c]/85 px-2.5 py-1 border border-white/10 pointer-events-none">
            ROLE PARA EXPLODIR // ARRASTE O MOUSE/TOUCH PARA ROTACIONAR 360°
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Scrub Bar */}
      <div className="relative z-20 w-full max-w-[1440px] xl:max-w-[1680px] mx-auto px-4 sm:px-8 pb-6 border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[10px] text-[#8e9196]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[#c5a880]">
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            ROLE PARA EXPLODIR ESTRUTURA
          </span>
          <span>EIXO X-Y-Z ACOPLADO // HARDWARE ACCELERATED</span>
        </div>

        {/* Scrub Progress Track */}
        <div className="flex items-center gap-3 w-full sm:w-72">
          <span>0%</span>
          <div className="flex-1 h-1 bg-[#121417] border border-white/10 overflow-hidden">
            <div
              className="h-full bg-[#c5a880] transition-all duration-75 ease-out"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
          <span>100%</span>
        </div>

        <div>
          <span>ISO 19650 BIM NÍVEL 3 // WEBGL THREE.JS</span>
        </div>
      </div>
    </section>
  );
};
