import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import axios from 'axios';

const Stock3DBarGraph = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Create axes for reference
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // Create bars for stock data
    const bars = [];
    const barMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });

    // Function to create a bar
    const createBar = (x, z, height) => {
      const barGeometry = new THREE.BoxGeometry(0.5, height, 0.5);
      const bar = new THREE.Mesh(barGeometry, barMaterial);
      bar.position.set(x, height / 2, z); // Center the bar vertically
      return bar;
    };

    // Initial bars (placeholder)
    const initialData = [1, 2, 3, 4, 5]; // Example data
    initialData.forEach((value, index) => {
      const bar = createBar(index * 1.5 - 3, 0, value);
      bars.push(bar);
      scene.add(bar);
    });

    // Position the camera
    camera.position.set(5, 10, 10);
    camera.lookAt(0, 0, 0);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Fetch stock data from Finnhub
    const fetchStockData = async () => {
      const apiKey = 'ctv0dspr01qg98te8kl0ctv0dspr01qg98te8klg';
      const symbol = 'AAPL'; // Example stock symbol
      const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;

      try {
        const response = await axios.get(url);
        const { c } = response.data; // Current price
        console.log('Current Price:', c);

        // Update bar heights based on stock price
        bars.forEach((bar, index) => {
          const newHeight = c / 50; // Adjust scaling as needed
          bar.scale.y = newHeight;
          bar.position.y = newHeight / 2; // Re-center the bar vertically
        });
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    // Fetch data every 5 seconds
    const interval = setInterval(fetchStockData, 5000);
    fetchStockData(); // Initial fetch

    // Cleanup
    return () => {
      clearInterval(interval);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef}></div>;
};

export default Stock3DBarGraph;