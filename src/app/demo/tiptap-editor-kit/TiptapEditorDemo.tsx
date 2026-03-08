"use client";

import { useState } from "react";
import TiptapEditor from "tiptap-editor-kit";
import "tiptap-editor-kit/styles.css";

const INITIAL_CONTENT = `
<h2>tiptap-editor-kit Demo</h2>
<p>이 에디터는 <strong>tiptap-editor-kit</strong> npm 패키지로 구현되었습니다.</p>
<p>아래 기능들을 직접 사용해보세요:</p>
<ul>
  <li><strong>서식</strong> — 굵게, 기울임, 밑줄, 취소선</li>
  <li><strong>제목</strong> — H1, H2, H3</li>
  <li><strong>색상</strong> — 글자 색상, 배경 색상</li>
  <li><strong>정렬</strong> — 왼쪽, 가운데, 오른쪽</li>
  <li><strong>삽입</strong> — 이미지 (드래그 & 드롭, 붙여넣기, 버튼), 링크, 리스트, 인용구</li>
  <li><strong>테이블</strong> — 삽입, 행/열 추가·삭제, 셀 병합·분할</li>
</ul>
<blockquote><p>이미지는 로컬 프리뷰로 표시됩니다. 실제 프로젝트에서는 <code>onImageUpload</code> prop으로 S3 등 외부 업로드를 연동할 수 있습니다.</p></blockquote>
`;

export default function TiptapEditorDemo() {
  const [content, setContent] = useState(INITIAL_CONTENT);
  const [showHtml, setShowHtml] = useState(false);

  return (
    <div className="space-y-6">
      {/* Editor */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Editor
          </h2>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
            React + TypeScript
          </span>
        </div>
        <TiptapEditor content={content} setContent={setContent} />
      </section>

      {/* HTML Output Toggle */}
      <section>
        <button
          type="button"
          onClick={() => setShowHtml((prev) => !prev)}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400
                     hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <span
            className="inline-block transition-transform"
            style={{ transform: showHtml ? "rotate(90deg)" : "rotate(0deg)" }}
          >
            ▶
          </span>
          HTML Output
        </button>

        {showHtml && (
          <pre
            className="mt-3 p-4 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06]
                        rounded-lg text-xs text-slate-600 dark:text-slate-400 font-mono
                        overflow-x-auto max-h-80 overflow-y-auto whitespace-pre-wrap break-all"
          >
            {content}
          </pre>
        )}
      </section>

      {/* Install Guide */}
      <section className="mt-10 pt-8 border-t border-slate-200 dark:border-white/[0.06]">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
          Quick Start
        </h2>
        <div className="space-y-3">
          <CodeBlock title="Install" code="npm install tiptap-editor-kit" />
          <CodeBlock
            title="Usage"
            code={`import TiptapEditor from 'tiptap-editor-kit';
import 'tiptap-editor-kit/styles.css';

function App() {
  const [content, setContent] = useState('');
  return <TiptapEditor content={content} setContent={setContent} />;
}`}
          />
        </div>
      </section>
    </div>
  );
}

function CodeBlock({ title, code }: { title: string; code: string }) {
  return (
    <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-white/[0.06]">
      <div className="px-4 py-2 bg-slate-100 dark:bg-white/[0.06] border-b border-slate-200 dark:border-white/[0.06]">
        <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {title}
        </span>
      </div>
      <pre className="p-4 bg-slate-50 dark:bg-white/[0.02] text-xs text-slate-700 dark:text-slate-300 font-mono overflow-x-auto">
        {code}
      </pre>
    </div>
  );
}
