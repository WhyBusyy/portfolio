import type { Metadata } from "next";
import Link from "next/link";
import TiptapEditorDemo from "./TiptapEditorDemo";

export const metadata: Metadata = {
  title: "tiptap-editor-kit Demo",
  description:
    "Ready-to-use Tiptap WYSIWYG editor with full toolbar, image upload, and table support.",
};

export default async function DemoPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  const fromPortfolio = from === "portfolio";

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {fromPortfolio && (
              <Link
                href="/#side-projects"
                className="flex items-center justify-center w-8 h-8 rounded-lg
                           bg-slate-100 dark:bg-white/[0.06]
                           hover:bg-slate-200 dark:hover:bg-white/[0.1] transition-colors
                           text-slate-500 dark:text-slate-400"
                aria-label="포트폴리오로 돌아가기"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 12L6 8L10 4" />
                </svg>
              </Link>
            )}
            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                tiptap-editor-kit
              </h1>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                WYSIWYG Editor — React & Vanilla JS
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <a
              href="https://www.npmjs.com/package/tiptap-editor-kit"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400
                         bg-slate-100 dark:bg-white/[0.06] rounded-lg
                         hover:bg-slate-200 dark:hover:bg-white/[0.1] transition-colors"
            >
              npm
            </a>
            <a
              href="https://github.com/WhyBusyy/tiptap-editor-kit"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400
                         bg-slate-100 dark:bg-white/[0.06] rounded-lg
                         hover:bg-slate-200 dark:hover:bg-white/[0.1] transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Demo */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        <TiptapEditorDemo />
      </main>
    </div>
  );
}
