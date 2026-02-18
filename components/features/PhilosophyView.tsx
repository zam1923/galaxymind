"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

/* ---------- 型定義 ---------- */
interface ValueCard {
  keyword: string;
  label: string;
  description: string;
  color: string;
}

interface PhilosophyViewProps {
  onBackToShowroom: () => void;
}

/* ---------- データ ---------- */
const values: ValueCard[] = [
  {
    keyword: "暇",
    label: "Schola",
    description:
      "余白こそが思考の苗床。\n自己と対峙するための「知のインフラ」を死守する。",
    color: "#8b8bbe",
  },
  {
    keyword: "偶然",
    label: "Serendipity",
    description:
      "予期せぬ知性と衝突する「身体的な場」を設計する。\nフィルターバブルを脱却し、未知との出会いを。",
    color: "#b8848f",
  },
  {
    keyword: "多層的な視座",
    label: "Perspective",
    description:
      "他者の知性や人生に触れ、人生の選択肢を正しく認識する。\n世界の解像度を上げていく。",
    color: "#8a9a8e",
  },
];

const elements = [
  {
    label: "A",
    title: "時間",
    subtitle: "Time",
    description: "成果を問わない余白の時間",
    color: "#c4a87a",
  },
  {
    label: "B",
    title: "場所",
    subtitle: "Place",
    description: "偶然の出会いが起きる物理的・デジタル空間",
    color: "#a18dae",
  },
  {
    label: "C",
    title: "方法",
    subtitle: "Method",
    description: "多様な情報と価値観に触れる媒介手段",
    color: "#7a9ab8",
  },
];

/* ---------- フェードインラッパー ---------- */
function FadeInWhenVisible({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Panel 1: Vision & Mission ---------- */
function VisionPanel() {
  return (
    <div className="flex h-full w-[80vw] shrink-0 flex-col items-center justify-center px-8 md:w-[60vw]">
      <div className="w-full max-w-lg text-center">
        <FadeInWhenVisible>
          <p className="mb-6 text-[10px] uppercase tracking-[0.5em] text-gm-text-muted/30">
            Vision
          </p>
          <h2 className="text-2xl font-bold leading-[1.8] tracking-wide text-gm-text/90 md:text-3xl">
            誰もが、自らの内なる好奇心に出会い、
            <br />
            自分だけの夢を語れる社会
          </h2>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.3}>
          <div className="mx-auto my-10 h-px w-16 bg-gm-indigo/20" />
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.5}>
          <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-gm-text-muted/30">
            Mission
          </p>
          <p className="text-base leading-[2] text-gm-text-muted/70 md:text-lg">
            「模索」しているすべてのひとに、
            <br />
            &ldquo;無目的&rdquo;な&ldquo;余白&rdquo;を提供する
          </p>
        </FadeInWhenVisible>
      </div>
    </div>
  );
}

/* ---------- Panel 2: Values ---------- */
function ValuesPanel() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="flex h-full w-[80vw] shrink-0 flex-col items-center justify-center px-8 md:w-[60vw]">
      <FadeInWhenVisible>
        <p className="mb-8 text-center text-[10px] uppercase tracking-[0.5em] text-gm-text-muted/30">
          Values
        </p>
      </FadeInWhenVisible>

      <div className="flex w-full max-w-2xl flex-col gap-4 md:flex-row md:gap-5">
        {values.map((v, i) => {
          const isExpanded = expanded === v.keyword;
          return (
            <FadeInWhenVisible key={v.keyword} delay={0.15 * i}>
              <button
                onClick={() =>
                  setExpanded(isExpanded ? null : v.keyword)
                }
                className="group w-full cursor-pointer text-left"
              >
                <div
                  className="overflow-hidden rounded-[1.8rem] border border-white/[0.06] bg-gm-surface/80 px-6 py-7 transition-all duration-500 hover:border-white/[0.12] md:px-7 md:py-8"
                >
                  <p
                    className="text-xl font-bold tracking-tight md:text-2xl"
                    style={{ color: `${v.color}cc` }}
                  >
                    {v.keyword}
                  </p>
                  <p
                    className="mt-1 text-[10px] tracking-[0.2em] uppercase"
                    style={{ color: `${v.color}60` }}
                  >
                    {v.label}
                  </p>

                  {/* 展開コンテンツ */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: isExpanded ? "auto" : 0,
                      opacity: isExpanded ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 whitespace-pre-line text-[12px] leading-[2] text-gm-text-muted/60">
                      {v.description}
                    </p>
                  </motion.div>

                  {/* タップヒント */}
                  <p className="mt-3 text-[9px] tracking-widest text-gm-text-muted/20 transition-colors group-hover:text-gm-text-muted/40">
                    {isExpanded ? "Tap to close" : "Tap to read"}
                  </p>
                </div>
              </button>
            </FadeInWhenVisible>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Panel 3: 模索の3要素 ---------- */
function ElementsPanel() {
  return (
    <div className="flex h-full w-[80vw] shrink-0 flex-col items-center justify-center px-8 md:w-[60vw]">
      <FadeInWhenVisible>
        <p className="mb-8 text-center text-[10px] uppercase tracking-[0.5em] text-gm-text-muted/30">
          3 Elements of Mosaku
        </p>
      </FadeInWhenVisible>

      <div className="mb-8 flex w-full max-w-md flex-col gap-4">
        {elements.map((el, i) => (
          <FadeInWhenVisible key={el.label} delay={0.15 * i}>
            <div className="flex items-center gap-5 rounded-[1.8rem] border border-white/[0.06] bg-gm-surface/80 px-6 py-5 md:px-7 md:py-6">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                style={{
                  background: `${el.color}15`,
                  color: `${el.color}aa`,
                }}
              >
                {el.label}
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <p className="text-lg font-semibold tracking-tight text-gm-text/80">
                    {el.title}
                  </p>
                  <p
                    className="text-[9px] tracking-[0.2em] uppercase"
                    style={{ color: `${el.color}60` }}
                  >
                    {el.subtitle}
                  </p>
                </div>
                <p className="mt-1 text-[12px] leading-relaxed text-gm-text-muted/50">
                  {el.description}
                </p>
              </div>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>

      <FadeInWhenVisible delay={0.5}>
        <p className="text-center text-[12px] leading-[2] text-gm-text-muted/40">
          どれか1つが欠けても、十分な模索はできない。
        </p>
      </FadeInWhenVisible>
    </div>
  );
}

/* ---------- Panel 4: 接続パネル ---------- */
function ConnectionPanel({
  onBackToShowroom,
}: {
  onBackToShowroom: () => void;
}) {
  return (
    <div className="flex h-full w-[80vw] shrink-0 flex-col items-center justify-center px-8 md:w-[60vw]">
      <FadeInWhenVisible>
        <div className="text-center">
          <p className="mb-6 text-[12px] leading-[2.2] text-gm-text-muted/50">
            その先にある9つの模索手段が、
            <br />
            下の Showroom です。
          </p>

          <button
            onClick={onBackToShowroom}
            className="group mt-4 inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-gm-surface/60 px-8 py-4 text-sm tracking-wider text-gm-text-muted/60 transition-all duration-300 hover:border-white/[0.15] hover:text-gm-text/80"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            >
              <path
                d="M7 2V10M7 10L3 6M7 10L11 6"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Go to Showroom</span>
          </button>
        </div>
      </FadeInWhenVisible>
    </div>
  );
}

/* ---------- メインコンポーネント ---------- */
export function PhilosophyView({ onBackToShowroom }: PhilosophyViewProps) {
  return (
    <div className="relative flex h-[100dvh] flex-col bg-gm-bg">
      {/* 背景装飾 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-[10vw] top-[20vh] h-[40vh] w-[40vh] rounded-full bg-gm-indigo/[0.02] blur-[120px]" />
        <div className="absolute -left-[5vw] bottom-[10vh] h-[35vh] w-[35vh] rounded-full bg-gm-rose/[0.02] blur-[100px]" />
      </div>

      {/* 上部ラベル */}
      <div className="relative z-10 flex shrink-0 items-center px-8 pt-8 md:px-12">
        <p className="text-[10px] uppercase tracking-[0.4em] text-gm-text-muted/30">
          Philosophy
        </p>
      </div>

      {/* 横スクロール4パネル */}
      <div className="hide-scrollbar relative z-10 flex flex-1 items-stretch overflow-x-auto">
        <VisionPanel />
        <ValuesPanel />
        <ElementsPanel />
        <ConnectionPanel onBackToShowroom={onBackToShowroom} />
      </div>

      {/* 下部ヒント */}
      <div className="relative z-10 flex shrink-0 items-center justify-between px-8 pb-6 md:px-12">
        <div className="flex items-center gap-2 text-[10px] tracking-widest text-gm-text-muted/20">
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
            <path
              d="M1 5H13M13 5L9 1M13 5L9 9"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          </svg>
          <span>Swipe to explore</span>
        </div>
        <p className="text-[10px] text-gm-text-muted/20">
          &copy; 2026 GalaxyMind
        </p>
      </div>
    </div>
  );
}
