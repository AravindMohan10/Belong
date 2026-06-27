"use client";

import dynamic from "next/dynamic";

export const HeroVideoBackground = dynamic(
  () =>
    import("@/components/landing/hero-video").then((mod) => ({
      default: mod.HeroVideo,
    })),
  { ssr: false },
);
