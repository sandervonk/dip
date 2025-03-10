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
const ThreeJSEarth = () => {
  const containerRef = useRef(null);
  // State for window resizing
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Equivalent to the init() function in the original code
    let camera, scene, renderer, controls, globe, clock;

    // Initialize clock for animation
    clock = new THREE.Clock();

    // Camera setup - identical to original
    camera = new THREE.PerspectiveCamera(
      25,
      windowSize.width / windowSize.height,
      0.1,
      100
    );
    camera.position.set(4.5, 2, 3);

    // Scene setup
    scene = new THREE.Scene();

    // Sun - identical directional light setup
    const sun = new THREE.DirectionalLight("#ffffff", 2);
    sun.position.set(0, 0, 3);
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
    globe = new THREE.Mesh(sphereGeometry, globeMaterial);
    scene.add(globe);

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
    renderer = new WebGPURenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(windowSize.width, windowSize.height);

    // Append to the container div instead of directly to body
    containerRef.current.appendChild(renderer.domElement);

    // Controls - identical to original
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minDistance = 3;
    controls.maxDistance = 30;

    // Animation function - identical to original
    function animate() {
      const delta = clock.getDelta();
      globe.rotation.y += delta * 0.025;

      controls.update();

      renderer.render(scene, camera);

      // Use requestAnimationFrame instead of renderer.setAnimationLoop for React
      requestAnimationFrame(animate);
    }

    // Start animation
    animate();

    // Window resize handler
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function for React component unmounting
    return () => {
      window.removeEventListener("resize", handleResize);

      // Dispose of ThreeJS resources
      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material.dispose) {
            object.material.dispose();
          }
        }
      });
    };
  }, [windowSize]); // Re-initialize when window size changes

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100vh" }}></div>
  );
};

export default ThreeJSEarth;
