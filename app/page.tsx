import Hero from "@/components/Hero";
import Calculator from "@/components/Calculator";
import ServiceCards from "@/components/ServiceCards";
import CitiesGrid from "@/components/CitiesGrid";
import FAQ from "@/components/FAQ";
import Gallery from "@/components/Gallery";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getHomeServices, getHomeFAQ } from "@/lib/data";
import { homeMetadata, faqSchema } from "@/lib/seo";

export const metadata = homeMetadata();

export default function HomePage() {
  const services = getHomeServices();
  const faq = getHomeFAQ();

  return (
    <>
      <SchemaMarkup data={faqSchema(faq)} />
      <Hero />
      <ServiceCards services={services} />
      <CitiesGrid />
      <Calculator />
      <Gallery />
      <FAQ items={faq} />
    </>
  );
}
