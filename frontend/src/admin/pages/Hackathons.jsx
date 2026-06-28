import ResourceManager from "../components/ResourceManager";
import { hackathonConfig } from "../configs/resourceConfigs";

export default function Hackathons() {
  return <ResourceManager config={hackathonConfig} />;
}
