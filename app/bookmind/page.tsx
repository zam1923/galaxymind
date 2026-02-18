import type { Metadata } from "next";
import { BookMindLP } from "@/components/features/BookMindLP";

export const metadata: Metadata = {
  title: "BookMind — 学校図書館 × 探究学習 | GalaxyMind",
  description:
    "学校図書館を「模索」の場へ。探究学習に「暇（余白）」と「偶然」を取り戻す。すべての生徒たちが内なる好奇心に出会い、自分だけの夢を育み合える学びの場を。",
  openGraph: {
    title: "BookMind — 学校図書館 × 探究学習 | GalaxyMind",
    description:
      "学校図書館を「模索」の場へ。探究学習に「暇（余白）」と「偶然」を取り戻す。",
    type: "website",
  },
};

export default function BookMindPage() {
  return <BookMindLP />;
}
