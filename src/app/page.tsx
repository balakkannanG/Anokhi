import { BrandStory, CustomRingPreview, DiamondEducationPreview, FeaturedTestimonial, JournalFeature, PromotionBanner, RingBuyingGuide, SocialGallery, WhyAnokhi } from "@/components/home/editorial-sections";
import { HomeHero } from "@/components/home/hero";
import { JewelleryCategories } from "@/components/home/jewellery-categories";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { ProductCollection } from "@/components/home/product-collection";
import { AnokhiCollection } from "@/components/home/ring-categories";
import { AnokhiPromise } from "@/components/home/anokhi-promise";
import { TestimonialsCarousel } from "@/components/home/testimonials-carousel";
import { FaqSection } from "@/components/home/faq-section";
import { RingShapeSelection } from "@/components/home/ring-shape-selection";
import { AnokhiExclusive } from "@/components/home/anokhi-exclusive";

export default function HomePage() {
  return (
    <main id="main-content">
      <HomeHero />
      <AnokhiPromise />
      <AnokhiCollection />
      {/* <ProductCollection
        description="A considered edit of fine jewellery, gathered around the details that stay with you."
        handle={process.env.SHOPIFY_FEATURED_JEWELLERY_HANDLE}
        href="/jewellery"
        linkLabel="EXPLORE JEWELLERY"
        title="THE ANOKHI SIGNATURE"
      /> */}
      <JewelleryCategories />
      {/* <ProductCollection
        description="A fresh study in shape, light and detail."
        handle={process.env.SHOPIFY_NEW_ARRIVALS_HANDLE}
        href="/shop?sort=newest"
        linkLabel="VIEW NEW ARRIVALS"
        title="New arrivals"
      /> */}
      {/* <ProductCollection
        description="A selection of pieces currently chosen by Anokhi customers."
        handle={process.env.SHOPIFY_BEST_SELLERS_HANDLE}
        href="/shop?sort=best-selling"
        linkLabel="VIEW BEST SELLERS"
        title="Best sellers"
      /> */}
      {/* <PromotionBanner /> */}
      {/* <BrandStory /> */}
      {/* <WhyAnokhi /> */}
      <RingShapeSelection />
      <AnokhiExclusive />
      {/* <DiamondEducationPreview /> */}
      {/* <CustomRingPreview /> */}
      {/* <RingBuyingGuide /> */}
      {/* <FeaturedTestimonial /> */}
      {/* <SocialGallery /> */}
      <TestimonialsCarousel />
      {/* <JournalFeature /> */}
      <FaqSection />
      {/* <NewsletterSection /> */}
    </main>
  );
}
