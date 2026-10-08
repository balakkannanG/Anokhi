import { GoldRateTicker } from "@/components/layout/gold-rate-ticker";

export function AnnouncementBar() {
  return (
    <div className="border-b border-taupe/35 bg-anokhi-plum px-4 py-2.5 text-parchment sm:px-6">
      <div className="relative mx-auto grid max-w-[1480px] grid-cols-1 items-center gap-2 sm:grid-cols-[1fr_auto] sm:gap-4">
        <p className="text-center font-display text-[10px] font-medium tracking-[0.16em] sm:absolute sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:whitespace-nowrap sm:text-xs">
          JEWELLERY FOR THE MOMENTS YOU KEEP
        </p>
        <div className="sm:col-start-2 sm:justify-self-end">
          <GoldRateTicker />
        </div>
      </div>
    </div>
  );
}
