import ResourceManager from "../components/ResourceManager";
import { skillConfig } from "../configs/resourceConfigs";
export default function Skills() {
  return <ResourceManager config={skillConfig} />;
}
