"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

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

/* ---------- データ ---------- */
const profile = {
  name: "Toru Iwai",
  nameJa: "岩井 亨",
  role: "管理人 / Founder",
  affiliation: "金沢大学 経済学類",
  bio: "経済学・経営学を学びながら、図書館情報学・教育学・AI・にも関心を持つ。　　　　　　　GalaxyMindは「模索するすべてのひと」に向けた理念駆動型プラットフォーム。",
};

const interests = [
  { category: "学問", items: ["経済学", "経営学", "公共政策"] },
  { category: "技術", items: ["情報科学", "AI", "システム設計"] },
  { category: "社会", items: ["図書館情報学", "教育学", "社会システム"] },
];

const projects = [
  {
    name: "GalaxyMind",
    description: "理念駆動型プラットフォーム。模索する人々に余白を提供する。",
    role: "Founder / 開発",
    status: "進行中",
  },
  {
    name: "OpenClaw 運用",
    description: "AIアシスタントの業務規程策定と運用。",
    role: "設計・管理",
    status: "運用中",
  },
];

const links = [
  { name: "GitHub", url: "https://github.com/zam1923", handle: "@zam1923" },
];

/* ---------- セクション ---------- */
function HeroSection() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-8 pt-20">
      <FadeInWhenVisible>
        <div className="text-center">
          <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-gm-text-muted/30">
            Portfolio
          </p>
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-gm-text/90 md:text-5xl">
            {profile.name}
          </h1>
          <p className="mb-6 text-lg text-gm-text-muted/50">
            {profile.nameJa}
          </p>
          <p className="text-[12px] tracking-widest text-gm-indigo/60">
            {profile.role}
          </p>
        </div>
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.3}>
        <div className="mx-auto my-12 h-px w-16 bg-gm-indigo/20" />
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.5}>
        <div className="max-w-md text-center">
          <p className="text-[12px] leading-[2] text-gm-text-muted/60">
            {profile.affiliation}
          </p>
        </div>
      </FadeInWhenVisible>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="px-8 py-16 md:px-12">
      <FadeInWhenVisible>
        <p className="mb-8 text-center text-[10px] uppercase tracking-[0.5em] text-gm-text-muted/30">
          About
        </p>
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.2}>
        <div className="mx-auto max-w-2xl">
          <p className="text-center text-[14px] leading-[2.2] text-gm-text-muted/70">
            {profile.bio}
          </p>
        </div>
      </FadeInWhenVisible>
    </section>
  );
}

function InterestsSection() {
  return (
    <section className="px-8 py-16 md:px-12">
      <FadeInWhenVisible>
        <p className="mb-10 text-center text-[10px] uppercase tracking-[0.5em] text-gm-text-muted/30">
          Interests
        </p>
      </FadeInWhenVisible>

      <div className="mx-auto flex max-w-3xl flex-col gap-6 md:flex-row md:justify-center">
        {interests.map((group, i) => (
          <FadeInWhenVisible key={group.category} delay={0.15 * i}>
            <div className="rounded-[1.5rem] border border-white/[0.06] bg-gm-surface/60 px-8 py-6 text-center">
              <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-gm-text-muted/30">
                {group.category}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/[0.08] bg-gm-bg/50 px-4 py-1.5 text-[11px] text-gm-text-muted/60"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section className="px-8 py-16 md:px-12">
      <FadeInWhenVisible>
        <p className="mb-10 text-center text-[10px] uppercase tracking-[0.5em] text-gm-text-muted/30">
          Projects
        </p>
      </FadeInWhenVisible>

      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        {projects.map((project, i) => (
          <FadeInWhenVisible key={project.name} delay={0.15 * i}>
            <div className="rounded-[1.8rem] border border-white/[0.06] bg-gm-surface/60 px-6 py-6 md:px-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-gm-text/80">
                    {project.name}
                  </h3>
                  <p className="mt-1 text-[10px] text-gm-indigo/50">
                    {project.role}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-gm-indigo/10 px-3 py-1 text-[9px] text-gm-indigo/60">
                  {project.status}
                </span>
              </div>
              <p className="mt-3 text-[12px] leading-[1.8] text-gm-text-muted/50">
                {project.description}
              </p>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>
    </section>
  );
}

function LinksSection() {
  return (
    <section className="px-8 py-16 md:px-12">
      <FadeInWhenVisible>
        <p className="mb-10 text-center text-[10px] uppercase tracking-[0.5em] text-gm-text-muted/30">
          Links
        </p>
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.2}>
        <div className="flex justify-center gap-4">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-[1.5rem] border border-white/[0.06] bg-gm-surface/60 px-6 py-4 transition-all duration-300 hover:border-white/[0.12] hover:bg-gm-surface/80"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-gm-text-muted/30">
                {link.name}
              </p>
              <p className="mt-1 text-sm text-gm-text-muted/60 transition-colors group-hover:text-gm-text/80">
                {link.handle}
              </p>
            </a>
          ))}
        </div>
      </FadeInWhenVisible>
    </section>
  );
}

function BackSection() {
  return (
    <section className="px-8 py-16 md:px-12">
      <FadeInWhenVisible>
        <div className="text-center">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-gm-surface/60 px-8 py-4 text-sm tracking-wider text-gm-text-muted/60 transition-all duration-300 hover:border-white/[0.15] hover:text-gm-text/80"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            >
              <path
                d="M13 7H1M1 7L7 13M1 7L7 1"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Back to GalaxyMind</span>
          </Link>
        </div>
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.3}>
        <p className="mt-12 text-center text-[10px] text-gm-text-muted/20">
          &copy; 2026 GalaxyMind
        </p>
      </FadeInWhenVisible>
    </section>
  );
}

/* ---------- メインページ ---------- */
export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-gm-bg">
      {/* 背景装飾 */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-[10vw] top-[10vh] h-[40vh] w-[40vh] rounded-full bg-gm-indigo/[0.02] blur-[120px]" />
        <div className="absolute -left-[5vw] bottom-[20vh] h-[35vh] w-[35vh] rounded-full bg-gm-rose/[0.02] blur-[100px]" />
      </div>

      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <InterestsSection />
        <ProjectsSection />
        <LinksSection />
        <BackSection />
      </div>
    </main>
  );
}
