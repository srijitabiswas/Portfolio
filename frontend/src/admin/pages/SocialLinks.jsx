import ResourceManager from "../components/ResourceManager";
import { socialLinkConfig } from "../configs/resourceConfigs";
export default function SocialLinks() {
  return <ResourceManager config={socialLinkConfig} />;
}
