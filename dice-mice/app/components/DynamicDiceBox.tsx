"use client"
import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';

// Use dynamic import with ssr: false to disable SSR for this component
const DynamicDiceBox = dynamic(() => Promise.resolve(DiceBoxWrapper), { ssr: false });

// Create a wrapper component for DiceBox
const DiceBoxWrapper = () => {
  const diceBoxRef = useRef<HTMLDivElement | null>(null);
  const diceboxConfig = {
    id: "dice-canvas",
    assetPath: '/assets/', // Ensure the correct asset path
    startingHeight: 8,
    throwForce: 6,
    spinForce: 5,
    lightIntensity: 0.9
  }

  useEffect(() => {
    // Ensure DiceBox is initialized only once the component is mounted
    if (!diceBoxRef.current) return

    // Dynamically import DiceBox and initialize it once the DOM is available
    import('@3d-dice/dice-box').then((DiceBoxModule) => {
      const DiceBox = DiceBoxModule.default;
      const diceBox = new DiceBox('#dice-box', diceboxConfig);

      diceBox.init().then(() => {
        diceBox.roll('2d20');
      });
    });
  }, []);

  return <div ref={diceBoxRef} id="dice-box" />;
};

export default DynamicDiceBox;