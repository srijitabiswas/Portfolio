import ResourceManager from "../components/ResourceManager";
import { experienceConfig } from "../configs/resourceConfigs";
export default function Experience() {
  return <ResourceManager config={experienceConfig} />;
}
