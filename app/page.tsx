import { IntroCanvas } from "@/components/home/intro-canvas";
import { HomeShopRail } from "@/components/home/home-shop-rail";
import { PageSections } from "@/components/storefront/page-sections";
import { PAGE_CONTENT } from "@/lib/constants/page-content";

export default async function Home() {
  return (
    <main>
      <IntroCanvas />
      <HomeShopRail />
      <PageSections sections={PAGE_CONTENT.home.sections} routeKey="home" />
    </main>
  );
}
