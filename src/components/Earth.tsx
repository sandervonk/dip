import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three/webgpu";
// Import regular Three.js materials
import { WebGPURenderer } from "three/webgpu";
// Import TSL components separately
import {
  step,
  normalWorld,
  output,
  texture,
  vec3,
  vec4,
  normalize,
  positionWorld,
  bumpMap,
  cameraPosition,
  color,
  uniform,
  mix,
  uv,
  max,
} from "three/tsl";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// get window from global scope
const window = globalThis;

// React component for the Three.js WebGPU Earth
const ThreeJSEarth = ({
  initialRotation = { x: 0, y: 0, z: 0 },
  initialPosition = { x: 4.5, y: 2, z: 3 },
  initialPanning = { x: 0, y: 0 },
  sunPosition = { x: 0, y: 0, z: 3 },
  autoRotate = true,
  autoRotateSpeed = 0.025,
  dampingFactor = 0.1,
  returnDelay = 2000,
  returnDuration = 1000,
}) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const globeRef = useRef(null);
  const rendererRef = useRef(null);
  const clockRef = useRef(null);
  const returnTimeoutRef = useRef(null);
  const isInteractingRef = useRef(false);
  const isReturningRef = useRef(false);
  const targetRotationRef = useRef(
    new THREE.Euler(initialRotation.x, initialRotation.y, initialRotation.z)
  );
  const targetPositionRef = useRef(
    new THREE.Vector3(initialPosition.x, initialPosition.y, initialPosition.z)
  );
  const targetSunRef = useRef(
    new THREE.Vector3(sunPosition.x, sunPosition.y, sunPosition.z)
  );
  const targetPanningRef = useRef(
    new THREE.Vector2(initialPanning.x, initialPanning.y)
  );

  // State for window resizing
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 800,
    height: typeof window !== "undefined" ? window.innerHeight : 600,
  });

  useEffect(() => {
    // Update target values when props change
    targetRotationRef.current = new THREE.Euler(
      initialRotation.x,
      initialRotation.y,
      initialRotation.z
    );
    targetPositionRef.current = new THREE.Vector3(
      initialPosition.x,
      initialPosition.y,
      initialPosition.z
    );

    targetSunRef.current = new THREE.Vector3(
      sunPosition.x,
      sunPosition.y,
      sunPosition.z
    );
    targetPanningRef.current = new THREE.Vector2(
      initialPanning.x,
      initialPanning.y
    );

    // If we have a camera and controls already set up, update them
    if (cameraRef.current && controlsRef.current && !isInteractingRef.current) {
      // Set the camera position directly
      cameraRef.current.position.copy(targetPositionRef.current);

      // Update the controls target for panning
      const panOffset = new THREE.Vector3(
        targetPanningRef.current.x,
        targetPanningRef.current.y,
        0
      );
      controlsRef.current.target.copy(panOffset);

      // Apply the rotation to the globe
      if (globeRef.current) {
        globeRef.current.rotation.set(
          targetRotationRef.current.x,
          targetRotationRef.current.y,
          targetRotationRef.current.z
        );
      }

      controlsRef.current.update();
    }
  }, [initialRotation, initialPosition, initialPanning]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Initialize clock for animation
    clockRef.current = new THREE.Clock();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      25,
      windowSize.width / windowSize.height,
      0.1,
      100
    );
    camera.position.set(
      initialPosition.x,
      initialPosition.y,
      initialPosition.z
    );
    cameraRef.current = camera;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Sun - identical directional light setup
    const sun = new THREE.DirectionalLight("#ffeeee", 2);
    sun.position.set(
      targetSunRef.current.x,
      targetSunRef.current.y,
      targetSunRef.current.z
    );
    scene.add(sun);

    // Uniforms - identical to original
    const atmosphereDayColor = uniform(color("#4db2ff"));
    const atmosphereTwilightColor = uniform(color("#bd5c28"));
    const roughnessLow = uniform(0.25);
    const roughnessHigh = uniform(0.45);

    // Texture loader
    const textureLoader = new THREE.TextureLoader();

    // Load textures - same as original
    const dayTexture = textureLoader.load("/img/texture/day.jpg");
    dayTexture.colorSpace = THREE.SRGBColorSpace;
    dayTexture.anisotropy = 8;

    const nightTexture = textureLoader.load("/img/texture/night.jpg");
    nightTexture.colorSpace = THREE.SRGBColorSpace;
    nightTexture.anisotropy = 8;

    const bumpRoughnessCloudsTexture = textureLoader.load(
      "/img/texture/clouds.jpg"
    );
    bumpRoughnessCloudsTexture.anisotropy = 8;

    // Fresnel calculation - identical to original
    const viewDirection = positionWorld.sub(cameraPosition).normalize();
    const fresnel = viewDirection.dot(normalWorld).abs().oneMinus().toVar();

    // Sun orientation - identical to original
    const sunOrientation = normalWorld.dot(normalize(sun.position)).toVar();

    // Atmosphere color - identical to original
    const atmosphereColor = mix(
      atmosphereTwilightColor,
      atmosphereDayColor,
      sunOrientation.smoothstep(-0.25, 0.75)
    );

    // Globe material - Using MeshStandardNodeMaterial from TSL
    const globeMaterial = new THREE.MeshStandardNodeMaterial();

    const cloudsStrength = texture(
      bumpRoughnessCloudsTexture,
      uv()
    ).b.smoothstep(0.2, 1);

    globeMaterial.colorNode = mix(
      texture(dayTexture),
      vec3(1),
      cloudsStrength.mul(2)
    );

    const roughness = max(
      texture(bumpRoughnessCloudsTexture).g,
      step(0.01, cloudsStrength)
    );
    globeMaterial.roughnessNode = roughness.remap(
      0,
      1,
      roughnessLow,
      roughnessHigh
    );

    const night = texture(nightTexture);
    const dayStrength = sunOrientation.smoothstep(-0.25, 0.5);

    const atmosphereDayStrength = sunOrientation.smoothstep(-0.5, 1);
    const atmosphereMix = atmosphereDayStrength.mul(fresnel.pow(2)).clamp(0, 1);

    let finalOutput = mix(night.rgb, output.rgb, dayStrength);
    finalOutput = mix(finalOutput, atmosphereColor, atmosphereMix);

    globeMaterial.outputNode = vec4(finalOutput, output.a);

    const bumpElevation = max(
      texture(bumpRoughnessCloudsTexture).r,
      cloudsStrength
    );
    globeMaterial.normalNode = bumpMap(bumpElevation);

    // Create the globe with same geometry as original
    const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);
    const globe = new THREE.Mesh(sphereGeometry, globeMaterial);
    // Apply initial rotation
    globe.rotation.set(initialRotation.x, initialRotation.y, initialRotation.z);
    scene.add(globe);
    globeRef.current = globe;

    // Atmosphere - Using MeshBasicNodeMaterial from TSL
    const atmosphereMaterial = new THREE.MeshBasicNodeMaterial({
      side: THREE.BackSide,
      transparent: true,
    });
    let alpha = fresnel.remap(0.73, 1, 1, 0).pow(3);
    alpha = alpha.mul(sunOrientation.smoothstep(-0.5, 1));
    atmosphereMaterial.outputNode = vec4(atmosphereColor, alpha);

    const atmosphere = new THREE.Mesh(sphereGeometry, atmosphereMaterial);
    atmosphere.scale.setScalar(1.04);
    scene.add(atmosphere);

    // Renderer - using WebGPURenderer explicitly imported
    let renderer;
    try {
      renderer = new WebGPURenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(windowSize.width, windowSize.height);
      rendererRef.current = renderer;

      // Append to the container div instead of directly to body
      if (containerRef.current) {
        containerRef.current.appendChild(renderer.domElement);
      }
    } catch (error) {
      console.error("Failed to initialize WebGPU renderer:", error);
      return;
    }

    // Set up initial panning target
    const panOffset = new THREE.Vector3(initialPanning.x, initialPanning.y, 0);

    // Controls - modified to include custom behavior
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = dampingFactor; // Increased damping for smoother movement
    controls.minDistance = 3;
    controls.maxDistance = 30;
    controls.target.copy(panOffset); // Set initial target for panning
    controlsRef.current = controls;

    // Add event listeners for interaction
    controls.addEventListener("start", () => {
      isInteractingRef.current = true;
      isReturningRef.current = false;

      // Clear any existing return timeout
      if (returnTimeoutRef.current) {
        clearTimeout(returnTimeoutRef.current);
      }
    });

    controls.addEventListener("end", () => {
      isInteractingRef.current = false;

      // Set a timeout to return to the target position
      returnTimeoutRef.current = setTimeout(() => {
        returnToTargetPosition();
      }, returnDelay);
    });

    // Function to smoothly return to target position
    const returnToTargetPosition = () => {
      if (isInteractingRef.current || isReturningRef.current) return;

      isReturningRef.current = true;

      const startTime = Date.now();
      const startPosition = camera.position.clone();
      const startTarget = controls.target.clone();

      // Store initial rotation for interpolation
      const startRotation = {
        x: globe.rotation.x,
        y: globe.rotation.y,
        z: globe.rotation.z,
      };

      // Animation function for smooth transition
      const animateReturn = () => {
        if (!isReturningRef.current) return;

        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / returnDuration, 1);

        // Ease out cubic function for smooth deceleration
        const easeOut = 1 - Math.pow(1 - progress, 3);

        // Interpolate camera position
        camera.position.lerpVectors(
          startPosition,
          targetPositionRef.current,
          easeOut
        );

        // Interpolate target (for panning)
        const targetVector = new THREE.Vector3(
          targetPanningRef.current.x,
          targetPanningRef.current.y,
          0
        );
        controls.target.lerpVectors(startTarget, targetVector, easeOut);

        // Interpolate globe rotation
        globe.rotation.x = THREE.MathUtils.lerp(
          startRotation.x,
          targetRotationRef.current.x,
          easeOut
        );
        globe.rotation.y = THREE.MathUtils.lerp(
          startRotation.y,
          targetRotationRef.current.y,
          easeOut
        );
        globe.rotation.z = THREE.MathUtils.lerp(
          startRotation.z,
          targetRotationRef.current.z,
          easeOut
        );

        controls.update();

        if (progress < 1) {
          requestAnimationFrame(animateReturn);
        } else {
          isReturningRef.current = false;
        }
      };

      animateReturn();
    };

    // Animation function
    function animate() {
      if (!rendererRef.current || !sceneRef.current || !cameraRef.current) {
        return;
      }

      const delta = clockRef.current.getDelta();

      // Auto-rotate if enabled and not currently interacting or returning
      if (autoRotate && !isInteractingRef.current && !isReturningRef.current) {
        globe.rotation.y += delta * autoRotateSpeed;

        // Update the target rotation to match (only y axis for auto-rotation)
        targetRotationRef.current.y = globe.rotation.y;
      }

      if (controlsRef.current) {
        controlsRef.current.update();
      }

      rendererRef.current.render(sceneRef.current, cameraRef.current);

      // Use requestAnimationFrame instead of renderer.setAnimationLoop for React
      requestAnimationFrame(animate);
    }

    // Start animation
    animate();

    // Window resize handler
    const handleResize = () => {
      if (typeof window === "undefined") return;

      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function for React component unmounting
    return () => {
      if (typeof window === "undefined") return;

      window.removeEventListener("resize", handleResize);

      // Clear any pending timeouts
      if (returnTimeoutRef.current) {
        clearTimeout(returnTimeoutRef.current);
      }

      // Remove event listeners
      if (controlsRef.current) {
        controlsRef.current.removeEventListener("start", () => {});
        controlsRef.current.removeEventListener("end", () => {});
        controlsRef.current.dispose();
      }

      // Dispose of ThreeJS resources
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (
          rendererRef.current.domElement &&
          rendererRef.current.domElement.parentNode
        ) {
          rendererRef.current.domElement.remove();
        }
      }

      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            if (object.geometry) object.geometry.dispose();
            if (object.material && object.material.dispose) {
              if (Array.isArray(object.material)) {
                object.material.forEach((material) => material.dispose());
              } else {
                object.material.dispose();
              }
            }
          }
        });
      }
    };
  }, []); // Initialize only once

  // Handle window resize effects separately
  useEffect(() => {
    if (!cameraRef.current || !rendererRef.current) return;

    // Update camera aspect ratio
    cameraRef.current.aspect = windowSize.width / windowSize.height;
    cameraRef.current.updateProjectionMatrix();

    // Update renderer size
    rendererRef.current.setSize(windowSize.width, windowSize.height);
  }, [windowSize]);

  return (
    <div>
      {/* Info section from the original HTML */}
      <div
        id="info"
        style={{
          position: "absolute",
          top: "10px",
          width: "100%",
          textAlign: "center",
          zIndex: 100,
        }}
      >
        <a href="https://threejs.org" target="_blank" rel="noopener">
          three.js webgpu
        </a>{" "}
        - earth
        <br />
        Based on{" "}
        <a
          href="https://threejs-journey.com/lessons/earth-shaders"
          target="_blank"
          rel="noopener"
        >
          Three.js Journey
        </a>{" "}
        lesson
        <br />
        Earth textures from{" "}
        <a
          href="https://www.solarsystemscope.com/textures/"
          target="_blank"
          rel="noopener"
        >
          Solar System Scope
        </a>{" "}
        (resized and merged)
      </div>

      {/* Container for the Three.js canvas */}
      <div ref={containerRef} style={{ width: "100%", height: "100vh" }}></div>
    </div>
  );
};

export default ThreeJSEarth;
