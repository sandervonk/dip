import { LenisOptions } from "lenis";
import { ReactLenis } from "lenis/react";

function SmoothScrolling({ children }: { children: React.ReactNode }) {
  const options: LenisOptions = {
    lerp: 0.12,
    duration: 0.5,
    syncTouch: false,
    smoothWheel: true,
  };

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
}
export default SmoothScrolling;
