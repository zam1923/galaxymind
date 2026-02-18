"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";

/* ---------- BookMind テーマカラー（オレンジ系くすみ） ---------- */
const BM = "#c49a6c";

/* ---------- 理念ビュー（上層・横スクロール） ---------- */
function PhilosophyView({ onScrollToProduct }: { onScrollToProduct: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [section, setSection] = useState(0);
  const TOTAL = 5;
  const isScrollingRef = useRef(false);

  /* 横スクロール位置からセクション検知 */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const vw = el.clientWidth;
      const index = Math.round(el.scrollLeft / vw);
      setSection(index);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  /* マウスホイール（縦）→ 横スクロールに変換 */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // 横スクロールの意図がある場合はそのまま
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      e.preventDefault();

      if (isScrollingRef.current) return;

      const vw = el.clientWidth;
      const currentIndex = Math.round(el.scrollLeft / vw);

      if (e.deltaY > 20) {
        // 下スクロール → 右へ
        if (currentIndex >= TOTAL - 1) {
          // 最後のセクション → 下層へ
          onScrollToProduct();
          return;
        }
        isScrollingRef.current = true;
        el.scrollTo({ left: vw * (currentIndex + 1), behavior: "smooth" });
      } else if (e.deltaY < -20) {
        // 上スクロール → 左へ
        if (currentIndex <= 0) return;
        isScrollingRef.current = true;
        el.scrollTo({ left: vw * (currentIndex - 1), behavior: "smooth" });
      }

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 600);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [onScrollToProduct]);

  /* キーボード操作 */
  const scrollToIndex = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const vw = el.clientWidth;
    el.scrollTo({ left: vw * index, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const el = scrollRef.current;
      if (!el) return;
      const vw = el.clientWidth;
      const currentIndex = Math.round(el.scrollLeft / vw);

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        if (currentIndex < TOTAL - 1) {
          scrollToIndex(currentIndex + 1);
        }
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        if (currentIndex > 0) {
          scrollToIndex(currentIndex - 1);
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [scrollToIndex]);

  return (
    <div className="absolute inset-0 z-10 flex flex-col">
      {/* 背景の滲み */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -left-[15vw] top-[5vh] h-[50vh] w-[50vh] rounded-full blur-[120px]"
          style={{ background: `${BM}0a` }}
        />
        <div
          className="absolute -right-[10vw] top-[40vh] h-[40vh] w-[40vh] rounded-full blur-[100px]"
          style={{ background: `${BM}08` }}
        />
        <div
          className="absolute bottom-[10vh] left-[20vw] h-[35vh] w-[35vh] rounded-full blur-[100px]"
          style={{ background: `${BM}06` }}
        />
      </div>

      {/* ヘッダー */}
      <div className="relative z-10 flex shrink-0 items-center justify-between px-8 pt-8 md:px-12">
        <Link href="/" className="text-base font-semibold tracking-tight">
          <span className="text-gm-text/80">Galaxy</span>
          <span className="text-gm-indigo">Mind</span>
        </Link>
        <span
          className="rounded-full px-4 py-1.5 text-[9px] tracking-[0.2em] uppercase"
          style={{ background: `${BM}14`, color: `${BM}b3` }}
        >
          In Development
        </span>
      </div>

      {/* 横スクロールコンテナ */}
      <div
        ref={scrollRef}
        className="hide-scrollbar relative z-10 flex flex-1 snap-x snap-mandatory overflow-x-scroll"
      >
        {/* ----- Section 0: Hero ----- */}
        <div className="flex h-full w-screen shrink-0 snap-start snap-always items-center justify-center px-8 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <h1 className="mb-4 text-5xl font-bold tracking-tight text-gm-text md:text-7xl lg:text-8xl">
              Book
              <span style={{ color: BM }}>Mind</span>
            </h1>
            <p className="text-sm tracking-[0.3em] text-gm-text-muted/50 md:text-base">
              図書館事業理念マニフェスト
            </p>
          </motion.div>
        </div>

        {/* ----- Section 1: Vision ----- */}
        <div className="flex h-full w-screen shrink-0 snap-start snap-always items-center justify-center px-8 md:px-12">
          <div className="w-full max-w-3xl">
            <p
              className="mb-6 text-[10px] uppercase tracking-[0.4em]"
              style={{ color: `${BM}66` }}
            >
              Vision — 目指す理想の未来
            </p>
            <h2 className="mb-8 text-xl font-medium leading-[2] tracking-tight text-gm-text/90 md:text-2xl md:leading-[2]">
              すべての生徒たちが、内なる好奇心に出会い、
              <br className="hidden md:block" />
              自分だけの夢を育み合える学びの場。
            </h2>
            <p className="text-sm leading-[2.2] text-gm-text-muted/50">
              トレンドや効率、あるいは他人の正解に流されることなく、
              生徒一人一人が固有の興味関心に基づいて、
              自分の人生を歩み出せる学びの姿を目指す。
            </p>
          </div>
        </div>

        {/* ----- Section 2: Mission ----- */}
        <div className="flex h-full w-screen shrink-0 snap-start snap-always items-center justify-center px-8 md:px-12">
          <div className="w-full max-w-3xl">
            <p
              className="mb-6 text-[10px] uppercase tracking-[0.4em]"
              style={{ color: `${BM}66` }}
            >
              Mission — 果たしたい独自の役割
            </p>
            <h2 className="mb-8 text-xl font-medium leading-[2] tracking-tight text-gm-text/90 md:text-2xl md:leading-[2]">
              学校図書館を「模索」の場へ。
              <br />
              探究学習に「暇（余白）」と「偶然」を取り戻す。
            </h2>
            <p className="text-sm leading-[2.2] text-gm-text-muted/50">
              調査のための図書館から、未知の自分に出会うための図書館へ。
              効率化されたデジタル空間では得られない、身体的な場所性と偶発的な出会いを通じ、
              生徒の内発的動機に作用する。
            </p>
          </div>
        </div>

        {/* ----- Section 3: Values ----- */}
        <div className="flex h-full w-screen shrink-0 snap-start snap-always items-center justify-center px-8 md:px-12">
          <div className="w-full max-w-3xl">
            <p
              className="mb-10 text-[10px] uppercase tracking-[0.4em]"
              style={{ color: `${BM}66` }}
            >
              Values — 一貫して大切にする価値観
            </p>

            <div className="space-y-6">
              {[
                {
                  num: "01",
                  title: "「暇（Schola）」の保障",
                  body: "余白こそが思考の苗床である。何者でもない自分に戻り、本と対峙できる「贅沢な暇」を教育カリキュラムの中に死守する。",
                },
                {
                  num: "02",
                  title: "「偶然（Serendipity）」の肯定",
                  body: "アルゴリズムの檻を壊す。書架を歩くという身体的経験を通じて、自分でも気づかなかった「未知の興味」を引き出す。",
                },
                {
                  num: "03",
                  title: "「追体験（Reliving）」による視野の拡張",
                  body: "自分の小さな経験を超え、数多の著者が遺した言葉の海に潜ることで、世界の広さと選択肢の多さを実感させる。",
                },
              ].map((v) => (
                <div key={v.num} className="flex items-start gap-5">
                  <span
                    className="mt-1 shrink-0 text-[10px] tracking-[0.3em]"
                    style={{ color: `${BM}4d` }}
                  >
                    {v.num}
                  </span>
                  <div>
                    <h3 className="mb-2 text-base font-semibold tracking-tight text-gm-text/90">
                      {v.title}
                    </h3>
                    <p className="text-sm leading-[2] text-gm-text-muted/50">
                      {v.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ----- Section 4: 好奇心のライフサイクル ----- */}
        <div className="flex h-full w-screen shrink-0 snap-start snap-always items-center justify-center px-8 md:px-12">
          <div className="w-full max-w-3xl">
            <p
              className="mb-10 text-center text-[10px] uppercase tracking-[0.4em]"
              style={{ color: `${BM}66` }}
            >
              好奇心のライフサイクル
            </p>

            <div className="space-y-6">
              {/* 初等教育 */}
              <div className="rounded-[1.8rem] border border-white/[0.06] bg-gm-surface/40 p-8 md:p-10">
                <p
                  className="mb-1 text-[10px] tracking-[0.25em]"
                  style={{ color: `${BM}66` }}
                >
                  Elementary
                </p>
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-gm-text/90">
                  初等教育
                </h3>
                <p className="text-sm leading-[2] text-gm-text-muted/50">
                  本を通じて世界を広げ、豊かな好奇心を「育む」土壌となる。
                </p>
              </div>

              {/* 中等・高等教育 */}
              <div className="rounded-[1.8rem] border border-white/[0.06] bg-gm-surface/40 p-8 md:p-10">
                <p
                  className="mb-1 text-[10px] tracking-[0.25em]"
                  style={{ color: `${BM}66` }}
                >
                  Secondary
                </p>
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-gm-text/90">
                  中等・高等教育
                </h3>
                <p className="text-sm leading-[2] text-gm-text-muted/50">
                  多忙な日常に埋もれた本心を、本との対話を通じて「再発見」させる装置となる。
                </p>
              </div>

              {/* 共通メッセージ */}
              <div className="text-center">
                <div
                  className="mx-auto max-w-md rounded-[1.8rem] px-8 py-5"
                  style={{
                    border: `1px solid ${BM}14`,
                    background: `${BM}08`,
                  }}
                >
                  <p className="text-sm leading-[2] text-gm-text/70">
                    どの年代においても「自分だけの問い」に出会うことが目的。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* フッター */}
      <div className="relative z-10 flex shrink-0 items-center justify-between px-8 pb-6 md:px-12">
        {/* セクションインジケーター */}
        <div className="flex gap-2">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className="flex h-5 w-5 items-center justify-center"
            >
              <div
                className="rounded-full transition-all duration-500"
                style={{
                  width: section === i ? 16 : 6,
                  height: 6,
                  borderRadius: 3,
                  background:
                    section === i ? BM : "rgba(212,208,202,0.15)",
                }}
              />
            </button>
          ))}
        </div>

        {/* スワイプヒント / 事業へ */}
        <div className="flex items-center gap-4">
          {section < TOTAL - 1 ? (
            <div className="flex items-center gap-2 text-[10px] tracking-widest text-gm-text-muted/20">
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                <path
                  d="M1 5H13M13 5L9 1M13 5L9 9"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />
              </svg>
              <span>Swipe</span>
            </div>
          ) : (
            <button
              onClick={onScrollToProduct}
              className="text-[10px] tracking-widest transition-colors hover:text-gm-text-muted/60"
              style={{ color: `${BM}66` }}
            >
              事業へ ↓
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- 事業ビュー（下層・開発中） ---------- */
function ProductView({ onScrollToPhilosophy }: { onScrollToPhilosophy: () => void }) {
  return (
    <div className="absolute inset-0 z-10 flex flex-col">
      {/* 背景 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-[30vw] top-[20vh] h-[40vh] w-[40vh] rounded-full blur-[100px]"
          style={{ background: `${BM}06` }}
        />
      </div>

      {/* ヘッダー */}
      <div className="relative z-10 flex shrink-0 items-center justify-between px-8 pt-8 md:px-12">
        <p className="text-base font-semibold tracking-tight">
          <span style={{ color: BM }}>Book</span>
          <span className="text-gm-text/80">Mind</span>
        </p>
      </div>

      {/* メインコンテンツ */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-8 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <span
            className="mb-6 inline-block rounded-full px-5 py-2 text-[10px] tracking-[0.25em] uppercase"
            style={{ background: `${BM}14`, color: `${BM}80` }}
          >
            Coming Soon
          </span>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-gm-text/80 md:text-3xl">
            具体的な事業内容
          </h2>
          <p className="text-sm leading-[2] text-gm-text-muted/40">
            現在開発中です。
          </p>
        </motion.div>
      </div>

      {/* フッター */}
      <div className="relative z-10 flex shrink-0 items-center justify-between px-8 pb-6 md:px-12">
        <p className="text-[10px] text-gm-text-muted/20">
          &copy; 2026 GalaxyMind
        </p>

        {/* 上スクロールヒント */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex cursor-pointer flex-col items-center gap-1"
          onClick={onScrollToPhilosophy}
        >
          <motion.svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="text-gm-text-muted/20"
            animate={{ y: [0, -3, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <path
              d="M2 8L6 4L10 8"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
          <p className="text-[9px] tracking-[0.3em] text-gm-text-muted/20">
            理念
          </p>
        </motion.div>

        <Link
          href="/"
          className="group flex items-center gap-2 text-[10px] tracking-widest text-gm-text-muted/30 transition-colors hover:text-gm-text-muted/60"
        >
          <svg
            width="10"
            height="8"
            viewBox="0 0 10 8"
            fill="none"
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
          >
            <path
              d="M9 4H2M2 4L5 1M2 4L5 7"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          </svg>
          <span>Showroom</span>
        </Link>
      </div>
    </div>
  );
}

/* ---------- メインコンポーネント ---------- */
export function BookMindLP() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToProduct = useCallback(() => {
    const vh = containerRef.current?.clientHeight ?? 0;
    containerRef.current?.scrollTo({ top: vh, behavior: "smooth" });
  }, []);

  const scrollToPhilosophy = useCallback(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div
      ref={containerRef}
      className="hide-scrollbar h-[100dvh] w-screen snap-y snap-mandatory overflow-y-scroll bg-gm-bg"
    >
      {/* 上層: 理念（横スクロール） */}
      <section className="relative h-[100dvh] snap-start snap-always">
        <PhilosophyView onScrollToProduct={scrollToProduct} />
      </section>

      {/* 下層: 事業（開発中） */}
      <section className="relative h-[100dvh] snap-start snap-always">
        <ProductView onScrollToPhilosophy={scrollToPhilosophy} />
      </section>
    </div>
  );
}
