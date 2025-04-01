import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three/webgpu";
import { WebGPURenderer } from "three/webgpu";
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
import { position2D, position3D } from "./EarthText";
import { useMotionValueEvent } from "motion/react";

// get window from global scope
const window = globalThis;

// Helper function to convert from Cartesian to Spherical coordinates
const cartesianToSpherical = (position: THREE.Vector3) => {
  const spherical = new THREE.Spherical();
  spherical.setFromVector3(position);
  return spherical;
};

// Helper function to convert from Spherical to Cartesian coordinates
const sphericalToCartesian = (spherical: THREE.Spherical) => {
  const vector = new THREE.Vector3();
  vector.setFromSpherical(spherical);
  return vector;
};

// Spherical linear interpolation (SLERP) function
const slerpSpherical = (
  start: THREE.Spherical,
  end: THREE.Spherical,
  t: number
) => {
  const result = new THREE.Spherical();

  // Interpolate radius, phi, and theta
  result.radius = THREE.MathUtils.lerp(start.radius, end.radius, t);

  // For theta (horizontal angle), handle wrapping around
  let deltaTheta = end.theta - start.theta;

  // Ensure we're taking the shortest path
  if (deltaTheta > Math.PI) deltaTheta -= Math.PI * 2;
  if (deltaTheta < -Math.PI) deltaTheta += Math.PI * 2;

  result.theta = start.theta + deltaTheta * t;

  // For phi (vertical angle), standard interpolation is fine
  result.phi = THREE.MathUtils.lerp(start.phi, end.phi, t);

  return result;
};

// React component for the Three.js WebGPU Earth
const ThreeJSEarth = ({
  initialRotation,
  initialPosition,
  initialPanning,
  sunPosition,
  autoRotate = true,
  autoRotateSpeed = 0.025,
  dampingFactor = 0.1,
  returnDelay = 250,
  returnDuration = 1500,
  className = "",
}: {
  initialRotation: position3D;
  initialPosition: position3D;
  initialPanning: position2D;
  sunPosition: position3D;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  dampingFactor?: number;
  returnDelay?: number;
  returnDuration?: number;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const globeRef = useRef<THREE.Mesh | null>(null);
  const rendererRef = useRef<WebGPURenderer | null>(null);
  const clockRef = useRef<THREE.Clock | null>(null);
  const returnTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInteractingRef = useRef(false);
  const isReturningRef = useRef(false);
  const targetRotationRef = useRef(
    new THREE.Euler(
      initialRotation.x.get(),
      initialRotation.y.get(),
      initialRotation.z.get()
    )
  );
  const targetPositionRef = useRef(
    new THREE.Vector3(
      initialPosition.x.get(),
      initialPosition.y.get(),
      initialPosition.z.get()
    )
  );
  // Store the target position in spherical coordinates
  const targetPositionSphericalRef = useRef(
    cartesianToSpherical(
      new THREE.Vector3(
        initialPosition.x.get(),
        initialPosition.y.get(),
        initialPosition.z.get()
      )
    )
  );
  const targetSunRef = useRef(
    new THREE.Vector3(
      sunPosition.x.get(),
      sunPosition.y.get(),
      sunPosition.z.get()
    )
  );
  const targetPanningRef = useRef(
    new THREE.Vector2(initialPanning.x.get(), initialPanning.y.get())
  );
  const sunLightRef = useRef<THREE.DirectionalLight | null>(null);

  // State for window resizing
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 800,
    height: typeof window !== "undefined" ? window.innerHeight : 600,
  });

  // Subscribe to MotionValue changes using useMotionValueEvent
  useMotionValueEvent(initialRotation.x, "change", (value) => {
    if (targetRotationRef.current) {
      targetRotationRef.current.x = value;
      updateSceneFromMotionValues();
    }
  });

  useMotionValueEvent(initialRotation.y, "change", (value) => {
    if (targetRotationRef.current) {
      targetRotationRef.current.y = value;
      updateSceneFromMotionValues();
    }
  });

  useMotionValueEvent(initialRotation.z, "change", (value) => {
    if (targetRotationRef.current) {
      targetRotationRef.current.z = value;
      updateSceneFromMotionValues();
    }
  });

  useMotionValueEvent(initialPosition.x, "change", (value) => {
    if (targetPositionRef.current) {
      targetPositionRef.current.x = value;
      // Update spherical coordinates when Cartesian coordinates change
      targetPositionSphericalRef.current = cartesianToSpherical(
        targetPositionRef.current
      );
      updateSceneFromMotionValues();
    }
  });

  useMotionValueEvent(initialPosition.y, "change", (value) => {
    if (targetPositionRef.current) {
      targetPositionRef.current.y = value;
      // Update spherical coordinates when Cartesian coordinates change
      targetPositionSphericalRef.current = cartesianToSpherical(
        targetPositionRef.current
      );
      updateSceneFromMotionValues();
    }
  });

  useMotionValueEvent(initialPosition.z, "change", (value) => {
    if (targetPositionRef.current) {
      targetPositionRef.current.z = value;
      // Update spherical coordinates when Cartesian coordinates change
      targetPositionSphericalRef.current = cartesianToSpherical(
        targetPositionRef.current
      );
      updateSceneFromMotionValues();
    }
  });

  useMotionValueEvent(initialPanning.x, "change", (value) => {
    if (targetPanningRef.current) {
      targetPanningRef.current.x = value;
      updateSceneFromMotionValues();
    }
  });

  useMotionValueEvent(initialPanning.y, "change", (value) => {
    if (targetPanningRef.current) {
      targetPanningRef.current.y = value;
      updateSceneFromMotionValues();
    }
  });

  useMotionValueEvent(sunPosition.x, "change", (value) => {
    if (targetSunRef.current) {
      targetSunRef.current.x = value;
      updateSceneFromMotionValues();
    }
  });

  useMotionValueEvent(sunPosition.y, "change", (value) => {
    if (targetSunRef.current) {
      targetSunRef.current.y = value;
      updateSceneFromMotionValues();
    }
  });

  useMotionValueEvent(sunPosition.z, "change", (value) => {
    if (targetSunRef.current) {
      targetSunRef.current.z = value;
      updateSceneFromMotionValues();
    }
  });

  // Function to update the scene based on MotionValue changes
  const updateSceneFromMotionValues = () => {
    if (!isInteractingRef.current && !isReturningRef.current) {
      // Update globe rotation
      if (globeRef.current) {
        globeRef.current.rotation.set(
          targetRotationRef.current.x,
          targetRotationRef.current.y,
          targetRotationRef.current.z
        );
      }

      // Update camera position
      if (cameraRef.current) {
        cameraRef.current.position.copy(targetPositionRef.current);
      }

      // Update controls target for panning
      if (controlsRef.current) {
        const panOffset = new THREE.Vector3(
          targetPanningRef.current.x,
          targetPanningRef.current.y,
          0
        );
        controlsRef.current.target.copy(panOffset);
        controlsRef.current.update();
      }

      // Update sun position
      if (sunLightRef.current) {
        sunLightRef.current.position.copy(targetSunRef.current);
      }
    }
  };

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
      initialPosition.x.get(),
      initialPosition.y.get(),
      initialPosition.z.get()
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
    sunLightRef.current = sun;

    // Uniforms - identical to original
    const atmosphereDayColor = uniform(color("#4db2ff"));
    const atmosphereTwilightColor = uniform(color("#bd5c28"));
    const roughnessLow = uniform(0.3);
    const roughnessHigh = uniform(0.55);

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
    globe.rotation.set(
      initialRotation.x.get(),
      initialRotation.y.get(),
      initialRotation.z.get()
    );
    scene.add(globe);
    globeRef.current = globe;

    // Atmosphere - Using MeshBasicNodeMaterial from TSL
    const atmosphereMaterial = new THREE.MeshBasicNodeMaterial({
      side: THREE.BackSide,
      transparent: true,
    });
    const alpha = fresnel
      .remap(0.73, 1, 1, 0)
      .pow(3)
      .mul(sunOrientation.smoothstep(-0.5, 1));
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
    const panOffset = new THREE.Vector3(
      initialPanning.x.get(),
      initialPanning.y.get(),
      0
    );

    // Controls - modified to include custom behavior
    const controls = new OrbitControls(camera, renderer.domElement);
    // disable zoom if on desktop, disable orbit on mobile (actions interfere with scroll)
    const touch = "ontouchstart" in window;
    controls.enableZoom = touch;
    controls.enableRotate = !touch;
    controls.enableDamping = true;
    controls.dampingFactor = dampingFactor; // Increased damping for smoother movement
    controls.minDistance = 2;
    controls.maxDistance = 20;
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

    // Function to smoothly return to target position using spherical coordinates
    const returnToTargetPosition = () => {
      if (isInteractingRef.current || isReturningRef.current) return;

      isReturningRef.current = true;

      const startTime = Date.now();

      // Convert current camera position to spherical coordinates
      const startPositionSpherical = cartesianToSpherical(camera.position);

      // Get target panning as Vector3
      const startTarget = controls.target.clone();
      const targetVector = new THREE.Vector3(
        targetPanningRef.current.x,
        targetPanningRef.current.y,
        0
      );

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

        // Interpolate camera position using SLERP in spherical coordinates
        const interpolatedSpherical = slerpSpherical(
          startPositionSpherical,
          targetPositionSphericalRef.current,
          easeOut
        );

        // Convert back to Cartesian coordinates and apply to camera
        const interpolatedPosition = sphericalToCartesian(
          interpolatedSpherical
        );
        camera.position.copy(interpolatedPosition);

        // Interpolate target (for panning)
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

      const delta = clockRef.current ? clockRef.current.getDelta() : 0;

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
        try {
          rendererRef.current?.dispose();
        } catch (error) {
          console.warn("Failed to dispose WebGPU renderer:", error);
        }
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
  }, []);

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
    <div
      ref={containerRef}
      className={className}
      style={{ width: "100%", height: "100dvh" }}
    ></div>
  );
};

export default ThreeJSEarth;
