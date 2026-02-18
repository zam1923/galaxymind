# MVP要件定義：GalaxyMind Webプラットフォーム

> 最終更新：2026-02-18
> 方針：BookMindはLP（理念ページ）のみ。GalaxyMindのプラットフォーム構築に集中する。

---

## スコープの整理

| 対象 | 方針 |
|---|---|
| **GalaxyMind LP** | プラットフォーム本体。引き続き構築・拡充する |
| **BookMind LP** | 理念・マニフェストページのみ完成。事業ツール開発は対象外 |
| **その他事業LP** | 今後追加していく（Coming Soon 状態で先行実装済み） |

---

## 画面一覧

### 実装済み ✅

| # | ページ / 画面 | URL | 状態 |
|---|---|---|---|
| 1 | GalaxyMind LP（イントロ + 理念） | `/` | ✅ 完成 |
| 2 | Showroom（ジャンル一覧 + プロダクトカード） | `/`（下層） | ✅ 完成 |
| 3 | BookMind LP（理念マニフェスト + 事業Coming Soon） | `/bookmind` | ✅ 完成 |

### 未実装・今後追加 🔜

| # | ページ / 画面 | URL | 優先度 | 概要 |
|---|---|---|---|---|
| 4 | GalaxyMind 理念 詳細ページ | `/philosophy` | Should | Vision / Mission / Values をより深く語るページ |
| 5 | 各事業LP（BookMind以外） | `/[product]` | Should | Showroomの他ジャンル事業が出来次第、専用LPを追加 |
| 6 | お問い合わせ / コンタクト | `/contact` | Could | 教育関係者・学校へのコンタクト窓口 |

---

## 機能要件

### 実装済み ✅

| # | 機能 | 詳細 |
|---|---|---|
| F1 | snap scroll ナビゲーション | 全ページで普通の縦スクロール禁止。snap-y / snap-x で全画面切り替え |
| F2 | イントロアニメーション | GalaxyMindロゴ出現 → Showroomへ |
| F3 | Showroom 2層構造 | ジャンル選択 → プロダクトカード → 専用LPへ遷移 |
| F4 | BookMind LP 横スクロール | 理念セクションを横スクロールで切り替え |
| F5 | framer-motion アニメーション | フェードイン / トランジション全体に適用済み |
| F6 | レスポンシブ対応 | モバイル / デスクトップ対応済み |

### 未実装・今後追加 🔜

| # | 機能 | 優先度 | 詳細 |
|---|---|---|---|
| F7 | **デプロイ（Render公開）** | **Must** | GitHub連携 → Render で本番公開 |
| F8 | OGP / SNSシェア対応 | Should | og:image の設定（現状テキストのみ） |
| F9 | アナリティクス | Could | Vercel Analytics or Google Analytics 導入 |

---

## 非機能要件

| 項目 | 目標 |
|---|---|
| 表示速度 | LCP 2.5秒以内 |
| デザイントーン | ダークテーマ・くすみカラー・余白贅沢（Apple Store的ミニマリズム） |
| スクロール規約 | 全ページで普通の縦スクロール禁止（snap scroll / 横スクロール） |
| テーマカラー | GalaxyMind: indigo `#8b8bbe` / BookMind: オレンジ系くすみ `#c49a6c` |

---

## 次のアクション（優先順）

1. **Render デプロイ** — GitHub リポジトリと連携して本番公開
2. **OGP画像設定** — SNSシェア時の見た目を整える
3. **他事業LPの追加** — Showroomの Coming Soon ジャンルが固まり次第

---

*BookMind MVP（探究学習支援ダッシュボード等）の要件定義は、事業化フェーズに入ってから別途作成する。*
