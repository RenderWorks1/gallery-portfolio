export interface Project {
  id: string;
  title: string;
  description: string;
  screenshotUrl: string;
  liveUrl: string;
  tags: string[];
  year: string;
  wall: "left" | "right" | "back" | "center-partition" | "short-partition";
  position: [number, number, number];
  rotation: [number, number, number];
}

export const projects: Project[] = [
  {
    id: "render-works",
    title: "Render Works",
    description:
      "A refined property marketing platform focused on premium presentation, fast performance, and conversion-ready enquiry flows.",
    screenshotUrl: "/screenshots/renderworks.png",
    liveUrl: "https://renderworks.co",
    tags: ["Next.js", "Property", "CMS"],
    year: "2025",
    wall: "left",
    position: [-14.35, 1.55, 16],
    rotation: [0, Math.PI / 2, 0],
  },
  {
    id: "wrightson-construction",
    title: "Wrightson Construction",
    description:
      "A bold construction company site combining project showcases, trust signals, and an editorial approach to brand storytelling.",
    screenshotUrl: "/screenshots/wrightsonconstruction.png",
    liveUrl: "https://wrightsonconstruction.co.nz",
    tags: ["Branding", "Tailwind", "Motion"],
    year: "2025",
    wall: "left",
    position: [-14.35, 1.55, 5],
    rotation: [0, Math.PI / 2, 0],
  },
  {
    id: "church-scroll",
    title: "Church Scroll Hero",
    description:
      "An immersive landing experience built around editorial pacing, fluid motion, and a carefully art-directed visual hierarchy.",
    screenshotUrl: "/screenshots/project-03.svg",
    liveUrl: "https://example.com/church-scroll",
    tags: ["React", "Animation", "Storytelling"],
    year: "2026",
    wall: "left",
    position: [-14.35, 1.55, -7],
    rotation: [0, Math.PI / 2, 0],
  },
  {
    id: "answer-studio",
    title: "The Answer",
    description:
      "A minimalist studio presence that balances restrained typography, quiet interactions, and an intentionally premium user journey.",
    screenshotUrl: "/screenshots/project-04.svg",
    liveUrl: "https://example.com/the-answer",
    tags: ["Studio", "Minimal", "UI"],
    year: "2024",
    wall: "center-partition",
    position: [-2.4, 1.55, -2],
    rotation: [0, Math.PI / 2, 0],
  },
  {
    id: "common-estate",
    title: "Dunstan Common",
    description:
      "A real-estate style experience designed to feel cinematic, spatially generous, and easy to navigate across dense information.",
    screenshotUrl: "/screenshots/project-05.svg",
    liveUrl: "https://example.com/dunstan-common",
    tags: ["Next.js", "Real Estate", "Design System"],
    year: "2025",
    wall: "center-partition",
    position: [2.4, 1.55, -2],
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    id: "lead-intelligence",
    title: "Lead Intelligence",
    description:
      "A data-led B2B product concept with dashboard-like information density expressed through a polished marketing shell.",
    screenshotUrl: "/screenshots/project-06.svg",
    liveUrl: "https://example.com/lead-intelligence",
    tags: ["SaaS", "Dashboard", "B2B"],
    year: "2026",
    wall: "right",
    position: [14.35, 1.55, 10],
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    id: "rocks-holloway",
    title: "Rocks on Holloway",
    description:
      "A tactile hospitality-inspired site with strong image rhythm, moody contrast, and simple but effective booking cues.",
    screenshotUrl: "/screenshots/project-07.svg",
    liveUrl: "https://example.com/rocks-holloway",
    tags: ["Hospitality", "Editorial", "Visual Design"],
    year: "2025",
    wall: "right",
    position: [14.35, 1.55, -2],
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    id: "gallery-residency",
    title: "Gallery Residency",
    description:
      "A conceptual cultural platform built to show how brand systems, exhibits, and events can live inside one coherent interface.",
    screenshotUrl: "/screenshots/project-08.svg",
    liveUrl: "https://example.com/gallery-residency",
    tags: ["Concept", "Culture", "Art Direction"],
    year: "2026",
    wall: "back",
    position: [6, 1.55, -24.35],
    rotation: [0, 0, 0],
  },
  {
    id: "spatial-systems",
    title: "Spatial Systems",
    description:
      "A concept study exploring how motion, pacing, and structured content can make a digital product feel architectural.",
    screenshotUrl: "/screenshots/project-01.svg",
    liveUrl: "https://example.com/spatial-systems",
    tags: ["Three.js", "Systems", "Concept"],
    year: "2026",
    wall: "short-partition",
    position: [7, 1.55, -10.89],
    rotation: [0, 0, 0],
  },
  {
    id: "material-motion",
    title: "Material Motion",
    description:
      "A motion-led interface direction that pairs restrained typography with tactile transitions and subtle depth.",
    screenshotUrl: "/screenshots/project-02.svg",
    liveUrl: "https://example.com/material-motion",
    tags: ["Motion", "Brand", "Interface"],
    year: "2026",
    wall: "short-partition",
    position: [7, 1.55, -11.11],
    rotation: [0, Math.PI, 0],
  },
];
