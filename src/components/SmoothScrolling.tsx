import { LenisOptions } from "lenis";
import { ReactLenis } from "lenis/react";

/**
 * SmoothScrolling component, wraps its children with a smooth scrolling effect using Lenis.
 *
 * @param {object} props - The props for the SmoothScrolling component (internal props.children holds the wrapped children)
 * @returns {JSX.Element} - The SmoothScrolling component using Lenis
 */
export default function SmoothScrolling({
  children,
}: {
  children: React.ReactNode;
}) {
  const options: LenisOptions = {
    lerp: 0.12,
    duration: 0.5,
    syncTouch: false,
    smoothWheel: true,
    wheelMultiplier: 1.2,
    touchMultiplier: 0.5,
  };

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
}
