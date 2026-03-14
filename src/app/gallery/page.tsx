"use client";

import dynamic from "next/dynamic";
import LoadingScreen from "@/components/ui/LoadingScreen";

const GalleryScene = dynamic(() => import("@/components/three/GalleryScene"), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

export default function GalleryPage() {
  return <GalleryScene />;
}
