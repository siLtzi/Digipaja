// Export all visual components
export { HomepageMockup } from "./HomepageMockup";
export { CodeEditorMockup } from "./CodeEditorMockup";
export { SearchEngineMockup } from "./SearchEngineMockup";
export { EcommerceMockup } from "./EcommerceMockup";

// Visual selector component
import { HomepageMockup } from "./HomepageMockup";
import { CodeEditorMockup } from "./CodeEditorMockup";
import { SearchEngineMockup } from "./SearchEngineMockup";
import { EcommerceMockup } from "./EcommerceMockup";

interface ServiceVisualProps {
  slug?: string;
  title: string;
}

export function ServiceVisual({ slug, title }: ServiceVisualProps) {
  switch (slug) {
    case "raataloidyt-kotisivut":
    case "custom-websites":
      return <HomepageMockup title={title} />;
    
    case "tekninen-toteutus":
    case "technical-implementation":
      return <CodeEditorMockup title={title} />;
    
    case "hakukoneoptimointi":
    case "seo":
    case "search-engine-optimization":
      return <SearchEngineMockup title={title} />;
    
    case "verkkokaupat":
    case "ecommerce":
    case "e-commerce":
      return <EcommerceMockup title={title} />;
    
    default:
      return null;
  }
}
