"use client";

import { useRef, useState } from "react";
import { IntroAnimation } from "@/components/features/IntroAnimation";
import { ShowroomView } from "@/components/features/ShowroomView";
import { PhilosophyView } from "@/components/features/PhilosophyView";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToPhilosophy = () => {
    const vh = containerRef.current?.clientHeight ?? 0;
    containerRef.current?.scrollTo({ top: vh, behavior: "smooth" });
  };

  const scrollToShowroom = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="h-[100dvh] w-screen overflow-y-scroll snap-y snap-mandatory bg-gm-bg"
    >
      {/* イントロアニメーション */}
      {!introDone && (
        <IntroAnimation onComplete={() => setIntroDone(true)} />
      )}

      {/* 上層: Showroom */}
      <section className="relative h-[100dvh] snap-start snap-always">
        <ShowroomView visible={introDone} onScrollToPhilosophy={scrollToPhilosophy} />
      </section>

      {/* 下層: Philosophy */}
      <section className="h-[100dvh] snap-start snap-always">
        <PhilosophyView onBackToShowroom={scrollToShowroom} />
      </section>
    </div>
  );
}
