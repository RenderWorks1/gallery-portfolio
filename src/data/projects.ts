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
    position: [-8.35, 1.55, 5.8],
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
    position: [-8.35, 1.55, -0.5],
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
    position: [-8.35, 1.55, -6.6],
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
    position: [2, 1.55, -1.6],
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
    wall: "back",
    position: [0, 1.55, -11.35],
    rotation: [0, 0, 0],
  },
];
