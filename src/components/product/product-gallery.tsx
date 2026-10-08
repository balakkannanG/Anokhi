"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { CaretLeft, CaretRight, MagnifyingGlass } from "@/components/ui/icons";
import type { ProductMedia, ShopifyImage } from "@/lib/shopify/types";

type GalleryItem = ProductMedia | (ShopifyImage & { mediaContentType: "IMAGE" });

function previewImage(item: GalleryItem): ShopifyImage | null {
  return "previewImage" in item ? item.previewImage ?? item.image : item;
}

function getVideoSources(item: GalleryItem) {
  return "sources" in item ? item.sources : [];
}

function trustedEmbed(item: GalleryItem): string | null {
  if (!("embedUrl" in item) || !item.embedUrl) return null;
  try {
    const url = new URL(item.embedUrl);
    if (url.protocol !== "https:") return null;
    if (!["youtube.com", "www.youtube.com", "youtube-nocookie.com", "www.youtube-nocookie.com", "player.vimeo.com"].includes(url.hostname)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

function MediaFrame({ item, title }: { item: GalleryItem; title: string }) {
  const preview = previewImage(item);
  if (item.mediaContentType === "VIDEO") {
    const sources = getVideoSources(item);
    return (
      <video
        aria-label={title}
        className="absolute inset-0 size-full bg-charcoal object-contain"
        controls
        playsInline
        poster={preview?.url}
        preload="none"
      >
        {sources.map((source) => <source key={source.url} src={source.url} type={source.mimeType} />)}
        Your browser does not support embedded video.
      </video>
    );
  }

  if (item.mediaContentType === "EXTERNAL_VIDEO") {
    const embed = trustedEmbed(item);
    return embed ? (
      <iframe
        allow="fullscreen; picture-in-picture"
        className="absolute inset-0 size-full border-0 bg-charcoal"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        sandbox="allow-scripts allow-same-origin allow-presentation"
        src={embed}
        title={`${title} video`}
      />
    ) : (
      <div className="absolute inset-0 grid place-items-center bg-charcoal p-6 text-center text-sm text-ivory">This video is not available.</div>
    );
  }

  return preview ? (
    <Image alt={preview.altText || title} className="object-cover" fill priority sizes="(max-width: 639px) 100vw, (max-width: 1023px) 58vw, 48vw" src={preview.url} />
  ) : null;
}

export function ProductGallery({
  images,
  media = [],
  title,
}: {
  images: ShopifyImage[];
  media?: ProductMedia[];
  title: string;
}) {
  const galleryItems: GalleryItem[] = media.length
    ? media
    : images.map((image) => ({ ...image, mediaContentType: "IMAGE" as const }));
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const active = galleryItems[activeIndex];

  if (!active) {
    return <div className="grid aspect-square place-items-center bg-cream px-6 text-center text-sm text-coffee" role="img" aria-label={`${title}, product image not available`}>Product images will appear when Shopify provides them.</div>;
  }

  const showItem = (index: number) => setActiveIndex((index + galleryItems.length) % galleryItems.length);

  return (
    <div className="grid gap-3 sm:grid-cols-[82px_1fr]">
      {galleryItems.length > 1 ? (
        <div aria-label="Product images" className="order-2 flex gap-2 overflow-x-auto sm:order-1 sm:flex-col sm:overflow-visible" role="list">
          {galleryItems.map((item, index) => {
            const image = previewImage(item);
            return (
              <button
                aria-label={`${item.mediaContentType === "VIDEO" ? "Play video" : "Show image"} ${index + 1} of ${galleryItems.length}`}
                aria-pressed={index === activeIndex}
                className={`relative size-[72px] shrink-0 overflow-hidden rounded-[8px] border bg-ivory sm:size-[76px] ${index === activeIndex ? "border-anokhi-plum" : "border-transparent"}`}
                key={item.id}
                onClick={() => showItem(index)}
                type="button"
              >
                {image ? <Image alt="" className="object-cover" fill sizes="76px" src={image.url} /> : <span aria-hidden="true" className="grid size-full place-items-center text-[10px] text-charcoal">VIDEO</span>}
              </button>
            );
          })}
        </div>
      ) : null}
      <div className="relative order-1 sm:order-2">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-[0.9] overflow-hidden rounded-[14px] bg-charcoal sm:aspect-square"
            initial={reduceMotion ? false : { opacity: 0.85, x: 10 }}
            key={active.id}
            onPanEnd={(_, info) => {
              if (Math.abs(info.offset.x) > 45 && galleryItems.length > 1) {
                showItem(activeIndex + (info.offset.x < 0 ? 1 : -1));
              }
            }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <MediaFrame item={active} title={title} />
          </motion.div>
        </AnimatePresence>
        {active.mediaContentType === "IMAGE" ? (
          <button aria-label="Zoom product image" className="absolute bottom-3 right-3 grid size-10 place-items-center rounded-full bg-ivory/95 text-charcoal" onClick={() => setZoomOpen(true)} type="button">
            <MagnifyingGlass aria-hidden="true" className="size-4" weight="light" />
          </button>
        ) : null}
        {galleryItems.length > 1 ? (
          <div className="absolute bottom-3 left-3 flex gap-1.5">
            <button aria-label="Previous product image" className="grid size-10 place-items-center rounded-full bg-ivory/95" onClick={() => showItem(activeIndex - 1)} type="button"><CaretLeft aria-hidden="true" className="size-4" weight="light" /></button>
            <button aria-label="Next product image" className="grid size-10 place-items-center rounded-full bg-ivory/95" onClick={() => showItem(activeIndex + 1)} type="button"><CaretRight aria-hidden="true" className="size-4" weight="light" /></button>
          </div>
        ) : null}
      </div>
      <Dialog onOpenChange={setZoomOpen} open={zoomOpen}>
        <DialogContent className="max-w-5xl border-0 bg-charcoal p-2 sm:p-3" showCloseButton>
          <DialogTitle className="sr-only">{title} image</DialogTitle>
          <DialogDescription className="sr-only">Zoomed product image. Close this dialog to return to product details.</DialogDescription>
          <div className="relative aspect-square max-h-[82dvh] w-full overflow-hidden bg-ivory">
            {previewImage(active) ? <Image alt={previewImage(active)?.altText || title} className="object-contain" fill sizes="90vw" src={previewImage(active)!.url} /> : null}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
