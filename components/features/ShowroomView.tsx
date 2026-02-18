"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

/* ---------- 型定義 ---------- */
interface Product {
  id: string;
  title: string;
  tagline: string;
  description: string;
  details: string[];
  status: string;
  image: string | null;
  accentColor: string;
}

interface Genre {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string | null;
  accentColor: string;
  products: Product[];
}

/* ---------- データ ---------- */
const genres: Genre[] = [
  {
    id: "books",
    title: "本",
    subtitle: "Books",
    description: "多様な知",
    image: "/showroom/books.jpg",
    accentColor: "#8b8bbe",
    products: [
      {
        id: "bookmind",
        title: "BookMind",
        tagline: "学校図書館 × 探究学習",
        description:
          "学校図書館を「模索」の場へ。\n探究学習に「暇」と「偶然」を取り戻す。",
        details: [
          "成果を問わない「読書と対話の空白時間」を制度に。",
          "書架を歩く身体的経験から、未知の興味を引き出す。",
          "読書を「他者の人生の追体験」として、世界を広げる。",
        ],
        status: "In Development",
        image: null,
        accentColor: "#8b8bbe",
      },
      {
        id: "books-coming-1",
        title: "Coming Soon",
        tagline: "Coming Soon",
        description: "準備中のプロダクト。",
        details: [],
        status: "Coming Soon",
        image: null,
        accentColor: "#8b8bbe",
      },
    ],
  },
  {
    id: "art",
    title: "芸術",
    subtitle: "Art",
    description: "多様な感性",
    image: "/showroom/art.jpg",
    accentColor: "#b8848f",
    products: [
      {
        id: "art-coming-1",
        title: "Coming Soon",
        tagline: "Coming Soon",
        description: "準備中のプロダクト。",
        details: [],
        status: "Coming Soon",
        image: null,
        accentColor: "#b8848f",
      },
    ],
  },
  {
    id: "dialogue",
    title: "対話",
    subtitle: "Dialogue",
    description: "多様な考え方",
    image: "/showroom/dialogue.jpg",
    accentColor: "#8a9a8e",
    products: [
      {
        id: "dialogue-coming-1",
        title: "Coming Soon",
        tagline: "Coming Soon",
        description: "準備中のプロダクト。",
        details: [],
        status: "Coming Soon",
        image: null,
        accentColor: "#8a9a8e",
      },
    ],
  },
  {
    id: "travel",
    title: "旅",
    subtitle: "Travel",
    description: "多様な文化",
    image: "/showroom/travel.jpg",
    accentColor: "#c4a87a",
    products: [
      {
        id: "travel-coming-1",
        title: "Coming Soon",
        tagline: "Coming Soon",
        description: "準備中のプロダクト。",
        details: [],
        status: "Coming Soon",
        image: null,
        accentColor: "#c4a87a",
      },
    ],
  },
  {
    id: "museum",
    title: "博物館",
    subtitle: "Museum",
    description: "多様な歴史",
    image: "/showroom/museum.jpg",
    accentColor: "#a18dae",
    products: [
      {
        id: "museum-coming-1",
        title: "Coming Soon",
        tagline: "Coming Soon",
        description: "準備中のプロダクト。",
        details: [],
        status: "Coming Soon",
        image: null,
        accentColor: "#a18dae",
      },
    ],
  },
  {
    id: "film",
    title: "映画",
    subtitle: "Film",
    description: "多様な物語",
    image: "/showroom/film.jpg",
    accentColor: "#9b8a7a",
    products: [
      {
        id: "film-coming-1",
        title: "Coming Soon",
        tagline: "Coming Soon",
        description: "準備中のプロダクト。",
        details: [],
        status: "Coming Soon",
        image: null,
        accentColor: "#9b8a7a",
      },
    ],
  },
  {
    id: "club",
    title: "クラブ活動",
    subtitle: "Club",
    description: "多様な役割",
    image: "/showroom/club.jpg",
    accentColor: "#7a9ab8",
    products: [
      {
        id: "club-coming-1",
        title: "Coming Soon",
        tagline: "Coming Soon",
        description: "準備中のプロダクト。",
        details: [],
        status: "Coming Soon",
        image: null,
        accentColor: "#7a9ab8",
      },
    ],
  },
  {
    id: "volunteer",
    title: "ボランティア",
    subtitle: "Volunteer",
    description: "多様な社会の現実",
    image: "/showroom/volunteer.jpg",
    accentColor: "#8aba8e",
    products: [
      {
        id: "volunteer-coming-1",
        title: "Coming Soon",
        tagline: "Coming Soon",
        description: "準備中のプロダクト。",
        details: [],
        status: "Coming Soon",
        image: null,
        accentColor: "#8aba8e",
      },
    ],
  },
  {
    id: "nature",
    title: "自然",
    subtitle: "Nature",
    description: "多様な生命のサイクル",
    image: "/showroom/nature.jpg",
    accentColor: "#b8a87a",
    products: [
      {
        id: "nature-coming-1",
        title: "Coming Soon",
        tagline: "Coming Soon",
        description: "準備中のプロダクト。",
        details: [],
        status: "Coming Soon",
        image: null,
        accentColor: "#b8a87a",
      },
    ],
  },
];

/* ---------- 画像がないときのフォールバック ---------- */
function PlaceholderArt({
  color,
  opacity = 0.4,
}: {
  color: string;
  opacity?: number;
}) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ opacity }}
    >
      <motion.div
        className="absolute h-[70%] w-[70%] rounded-full blur-[50px]"
        style={{
          background: `radial-gradient(circle, ${color}40, transparent)`,
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute h-[40%] w-[40%] translate-x-[20%] translate-y-[15%] rounded-full blur-[35px]"
        style={{
          background: `radial-gradient(circle, ${color}25, transparent)`,
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{
          duration: 5,
          delay: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

/* ---------- プロダクト詳細モーダル ---------- */
function ProductDetail({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gm-bg/90 backdrop-blur-2xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative mx-4 w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/[0.06] bg-gm-surface"
      >
        {/* ヘッダー画像 */}
        <div className="relative h-56 overflow-hidden md:h-64">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
            />
          ) : (
            <PlaceholderArt color={product.accentColor} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gm-surface via-gm-surface/40 to-transparent" />
          <div className="absolute bottom-6 left-8 right-8">
            <h2 className="text-3xl font-bold tracking-tight text-gm-text md:text-4xl">
              {product.title}
            </h2>
            <p
              className="mt-1 text-xs tracking-[0.2em] opacity-60"
              style={{ color: product.accentColor }}
            >
              {product.tagline}
            </p>
          </div>
        </div>

        {/* コンテンツ */}
        <div className="px-8 pb-10 md:px-10">
          <div className="mb-6 flex">
            <span
              className="rounded-full px-4 py-1.5 text-[10px] tracking-[0.2em] uppercase"
              style={{
                background: `${product.accentColor}12`,
                color: `${product.accentColor}aa`,
              }}
            >
              {product.status}
            </span>
          </div>

          <p className="mb-8 whitespace-pre-line text-sm leading-[2] text-gm-text-muted md:text-base">
            {product.description}
          </p>

          {product.details.length > 0 && (
            <div className="space-y-3">
              {product.details.map((detail, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4 rounded-2xl bg-white/[0.02] px-5 py-4"
                >
                  <div
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                    style={{ background: product.accentColor, opacity: 0.5 }}
                  />
                  <p className="text-sm leading-[1.8] text-gm-text/60">
                    {detail}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white/60 backdrop-blur-sm transition-colors hover:bg-black/50 hover:text-white"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M1 1L11 11M11 1L1 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ---------- ジャンルShowroom ---------- */
function GenreShowroom({
  visible,
  onSelectGenre,
}: {
  visible: boolean;
  onSelectGenre: (genre: Genre) => void;
}) {
  return (
    <motion.div
      key="genre-showroom"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-1 flex-col justify-center px-8 md:px-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 10 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mb-5"
      >
        <p className="text-[10px] uppercase tracking-[0.4em] text-gm-text-muted/40">
          Showroom
        </p>
      </motion.div>

      {/* 横スクロールカード群 */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 40 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="hide-scrollbar -mx-8 flex gap-5 overflow-x-auto px-8 pb-4 md:-mx-12 md:gap-6 md:px-12"
      >
        {genres.map((genre, i) => (
          <motion.button
            key={genre.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
            transition={{
              duration: 0.6,
              delay: 0.7 + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{
              y: -8,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            onClick={() => onSelectGenre(genre)}
            className="group shrink-0 cursor-pointer text-left"
          >
            <div className="relative h-[300px] w-[200px] overflow-hidden rounded-[1.8rem] border border-white/[0.06] transition-all duration-500 hover:border-white/[0.15] md:h-[360px] md:w-[240px]">
              {/* 画像 or フォールバック */}
              <div className="absolute inset-0">
                {genre.image ? (
                  <>
                    <Image
                      src={genre.image}
                      alt={genre.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/5" />
                  </>
                ) : (
                  <div className="h-full w-full bg-gm-surface">
                    <PlaceholderArt color={genre.accentColor} opacity={0.3} />
                  </div>
                )}
              </div>

              {/* コンテンツ（下部） */}
              <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-7">
                <h3 className="mb-1 text-2xl font-semibold tracking-tight text-white/90 md:text-3xl">
                  {genre.title}
                </h3>
                <p
                  className="text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: `${genre.accentColor}99` }}
                >
                  {genre.subtitle}
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-gm-text-muted/50">
                  {genre.description}
                </p>

                <div
                  className="mt-4 flex items-center gap-1.5 text-[10px] tracking-widest opacity-30 transition-opacity duration-300 group-hover:opacity-70"
                  style={{ color: genre.accentColor }}
                >
                  <span>Explore</span>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  >
                    <path
                      d="M3 2L7 5L3 8"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* スクロールヒント */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ delay: 1.8 }}
        className="mt-4 flex items-center gap-2 text-[10px] tracking-widest text-gm-text-muted/20"
      >
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
          <path
            d="M1 5H13M13 5L9 1M13 5L9 9"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        </svg>
        <span>Swipe to explore</span>
      </motion.div>
    </motion.div>
  );
}

/* ---------- プロダクトShowroom ---------- */
/* ---------- プロダクトごとの専用ページマッピング ---------- */
const productPageMap: Record<string, string> = {
  bookmind: "/bookmind",
};

function ProductShowroom({
  genre,
  onBack,
  onSelectProduct,
}: {
  genre: Genre;
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
}) {
  const router = useRouter();
  return (
    <motion.div
      key="product-showroom"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-1 flex-col justify-center px-8 md:px-12"
    >
      {/* 戻るボタン + ジャンル名 */}
      <div className="mb-5 flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] tracking-widest text-gm-text-muted/50 transition-colors hover:bg-white/[0.04] hover:text-gm-text-muted"
        >
          <svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
          >
            <path
              d="M13 5H3M3 5L7 1M3 5L7 9"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          </svg>
          <span>Back</span>
        </button>
        <div className="flex items-baseline gap-3">
          <h2 className="text-lg font-semibold tracking-tight text-gm-text/80">
            {genre.title}
          </h2>
          <p
            className="text-[10px] tracking-[0.2em] uppercase"
            style={{ color: `${genre.accentColor}80` }}
          >
            {genre.subtitle}
          </p>
        </div>
      </div>

      {/* 横スクロールカード群 */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="hide-scrollbar -mx-8 flex gap-5 overflow-x-auto px-8 pb-4 md:-mx-12 md:gap-6 md:px-12"
      >
        {genre.products.map((product, i) => {
          const isComingSoon = product.status === "Coming Soon";

          return (
            <motion.button
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              onClick={() => {
                if (isComingSoon) return;
                const page = productPageMap[product.id];
                if (page) {
                  router.push(page);
                } else {
                  onSelectProduct(product);
                }
              }}
              className={`group shrink-0 text-left ${
                isComingSoon ? "cursor-default" : "cursor-pointer"
              }`}
            >
              <div
                className={`relative h-[300px] w-[230px] overflow-hidden rounded-[1.8rem] border transition-all duration-500 md:h-[360px] md:w-[280px] ${
                  isComingSoon
                    ? "border-dashed border-white/[0.04]"
                    : "border-white/[0.06] hover:border-white/[0.15]"
                }`}
              >
                {/* 画像 or フォールバック */}
                <div className="absolute inset-0">
                  {product.image ? (
                    <>
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/5" />
                    </>
                  ) : (
                    <div className="h-full w-full bg-gm-surface">
                      <PlaceholderArt
                        color={product.accentColor}
                        opacity={isComingSoon ? 0.15 : 0.4}
                      />
                    </div>
                  )}
                </div>

                {/* コンテンツ（下部） */}
                <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-7">
                  {/* ステータスバッジ */}
                  <div className="absolute right-4 top-4">
                    <span
                      className="rounded-full px-3 py-1 text-[9px] tracking-widest uppercase backdrop-blur-md"
                      style={{
                        background: isComingSoon
                          ? "rgba(255,255,255,0.03)"
                          : "rgba(0,0,0,0.3)",
                        color: isComingSoon
                          ? "rgba(255,255,255,0.15)"
                          : `${product.accentColor}cc`,
                      }}
                    >
                      {product.status}
                    </span>
                  </div>

                  {/* タイトル */}
                  <h3
                    className="mb-1 text-xl font-semibold tracking-tight md:text-2xl"
                    style={{
                      color: isComingSoon
                        ? "rgba(212,208,202,0.12)"
                        : "rgba(255,255,255,0.95)",
                    }}
                  >
                    {product.title}
                  </h3>
                  <p
                    className="text-[11px] tracking-wider"
                    style={{
                      color: isComingSoon
                        ? "rgba(138,134,144,0.15)"
                        : `${product.accentColor}99`,
                    }}
                  >
                    {product.tagline}
                  </p>

                  {!isComingSoon && (
                    <div
                      className="mt-4 flex items-center gap-1.5 text-[10px] tracking-widest opacity-40 transition-opacity duration-300 group-hover:opacity-70"
                      style={{ color: product.accentColor }}
                    >
                      <span>Open</span>
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                      >
                        <path
                          d="M3 2L7 5L3 8"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

/* ---------- メインShowroom ---------- */
interface ShowroomViewProps {
  visible: boolean;
  onScrollToPhilosophy?: () => void;
}

export function ShowroomView({ visible, onScrollToPhilosophy }: ShowroomViewProps) {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <motion.div
        className="absolute inset-0 z-10 flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.8, delay: visible ? 0.2 : 0 }}
      >
        {/* 背景にパレット風の色の滲み */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-[10vw] top-[10vh] h-[40vh] w-[40vh] rounded-full bg-gm-indigo/[0.03] blur-[100px]" />
          <div className="absolute -right-[5vw] top-[30vh] h-[35vh] w-[35vh] rounded-full bg-gm-rose/[0.025] blur-[100px]" />
          <div className="absolute bottom-[5vh] left-[30vw] h-[30vh] w-[30vh] rounded-full bg-gm-sage/[0.02] blur-[100px]" />
        </div>

        {/* 上部: ブランド */}
        <div className="relative z-10 flex shrink-0 items-center justify-between px-8 pt-8 md:px-12">
          <p className="text-base font-semibold tracking-tight">
            <span className="text-gm-text/80">Galaxy</span>
            <span className="text-gm-indigo">Mind</span>
          </p>
        </div>

        {/* 中央: Showroom（2階層切り替え） */}
        <div className="relative z-10 flex flex-1 flex-col justify-center">
          <AnimatePresence mode="wait">
            {selectedGenre === null ? (
              <GenreShowroom
                visible={visible}
                onSelectGenre={(genre) => setSelectedGenre(genre)}
              />
            ) : (
              <ProductShowroom
                genre={selectedGenre}
                onBack={() => setSelectedGenre(null)}
                onSelectProduct={(product) => setSelectedProduct(product)}
              />
            )}
          </AnimatePresence>
        </div>

        {/* 下部 */}
        <div className="relative z-10 flex shrink-0 items-center justify-between px-8 pb-6 md:px-12">
          <p className="text-[10px] text-gm-text-muted/20">
            &copy; 2026 GalaxyMind
          </p>

          {/* 上スクロールヒント */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ delay: 2.5 }}
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
              Philosophy
            </p>
          </motion.div>

          <p className="text-[10px] tracking-widest text-gm-text-muted/20">
            模索する、すべてのひとへ。
          </p>
        </div>
      </motion.div>

      {/* モーダル */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
