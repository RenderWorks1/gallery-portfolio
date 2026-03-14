import { projects, type Project } from "@/data/projects";
import { Euler, Vector3 } from "three";

export const artworkData: Project[] = projects;
export const artworkMarkerLocalOffset: [number, number, number] = [0, -1.53, 2.2];

export function getArtworkMarkerPosition(project: Project): [number, number, number] {
  const markerOffset = new Vector3(...artworkMarkerLocalOffset).applyEuler(
    new Euler(0, project.rotation[1], 0),
  );

  return [
    project.position[0] + markerOffset.x,
    project.position[1] + markerOffset.y,
    project.position[2] + markerOffset.z,
  ];
}

export function getArtworkLightPosition(project: Project): [number, number, number] {
  const [x, y, z] = project.position;
  const lightHeight = y + 3;

  switch (project.wall) {
    case "left":
      return [x + 1.1, lightHeight, z];
    case "right":
      return [x - 1.1, lightHeight, z];
    case "back":
      return [x, lightHeight, z + 1.1];
    case "center-partition":
      return project.rotation[1] > 0
        ? [x + 1.1, lightHeight, z]
        : [x - 1.1, lightHeight, z];
    case "short-partition":
      return project.rotation[1] === Math.PI
        ? [x, lightHeight, z - 1.1]
        : [x, lightHeight, z + 1.1];
    default:
      return [x, lightHeight, z + 1.1];
  }
}
