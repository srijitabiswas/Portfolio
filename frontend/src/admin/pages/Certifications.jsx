import ResourceManager from "../components/ResourceManager";
import { certificationConfig } from "../configs/resourceConfigs";
export default function Certifications() {
  return <ResourceManager config={certificationConfig} />;
}
