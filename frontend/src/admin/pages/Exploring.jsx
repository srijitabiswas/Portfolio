import ResourceManager from "../components/ResourceManager";
import { exploringConfig } from "../configs/resourceConfigs";
export default function Exploring() {
  return <ResourceManager config={exploringConfig} />;
}
