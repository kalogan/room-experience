import dynamic from "next/dynamic";

// Three.js must not run on the server — next/dynamic with ssr: false
// defers the entire module until the browser hydrates.
// The 2D command interface is already visible, so no loading spinner is needed.
export const LabScene3DLazy = dynamic(() => import("./LabScene3D"), {
  ssr: false,
  loading: () => null,
});
