import type { Key } from 'react';
import { ArrowDown, ArrowRight, Check, Copy, ExternalLink } from 'lucide-react';
import {
  academicBlogContentDb,
  type AcademicLocalizedText,
  type AcademicReference,
  type AcademicSection,
} from '../data/blogContent';
import SyntaxHighlightedCode from './SyntaxHighlightedCode';

interface DynamicBlogArticleProps {
  lang: 'vi' | 'en';
  postId: string;
  copiedCode: boolean;
  onCopyCode: (code: string) => void;
}

export default function DynamicBlogArticle({
  lang,
  postId,
  copiedCode,
  onCopyCode,
}: DynamicBlogArticleProps) {
  const article = academicBlogContentDb[postId];
  const localize = (value: AcademicLocalizedText) => value[lang];
  const referencesById = new Map(article?.references.map((reference) => [reference.id, reference]));

  if (!article) {
    return (
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-400">
        {lang === 'vi' ? 'Nội dung bài viết đang được cập nhật.' : 'This article is being updated.'}
      </div>
    );
  }

  return (
    <>
      <section className="border-y border-[#E5E7EB] py-8 dark:border-slate-800" aria-labelledby="academic-abstract">
        <h2 id="academic-abstract" className="text-xs font-black uppercase tracking-[0.16em] text-[#5B6CFF] dark:text-[#7C8CFF]">
          {lang === 'vi' ? 'Tóm tắt' : 'Abstract'}
        </h2>
        <p className="mt-4 max-w-[74ch] text-base leading-8 text-slate-700 dark:text-slate-300">{localize(article.abstract)}</p>
        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-bold text-slate-700 dark:text-slate-300">{lang === 'vi' ? 'Từ khóa:' : 'Keywords:'}</span>
          {article.keywords.map((keyword, index) => <span key={index}>{localize(keyword)}</span>)}
        </div>
      </section>

      {article.sections.map((section) => (
        <AcademicSectionRenderer
          key={section.id}
          section={section}
          lang={lang}
          referencesById={referencesById}
          copiedCode={copiedCode}
          onCopyCode={onCopyCode}
        />
      ))}

      <section id="references" className="border-t border-[#E5E7EB] pt-10 dark:border-slate-800">
        <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
          {lang === 'vi' ? 'Tài liệu tham khảo' : 'References'}
        </h2>
        <ol className="mt-6 space-y-4">
          {article.references.map((reference, index) => (
            <li key={reference.id} className="grid gap-2 text-sm leading-7 text-slate-600 sm:grid-cols-[28px_1fr] dark:text-slate-300">
              <span className="font-mono text-xs font-bold text-[#5B6CFF] dark:text-[#7C8CFF]">[{index + 1}]</span>
              <span>
                <a href={reference.url} target="_blank" rel="noreferrer" className="font-bold text-slate-950 underline decoration-[#C7CEFF] underline-offset-4 hover:text-[#5B6CFF] dark:text-white dark:hover:text-[#7C8CFF]">
                  {localize(reference.title)}
                  <ExternalLink className="ml-1.5 inline h-3.5 w-3.5" />
                </a>
                <span className="block text-xs text-slate-500 dark:text-slate-400">{reference.publisher}, {reference.year}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

function AcademicSectionRenderer({
  section,
  lang,
  referencesById,
  copiedCode,
  onCopyCode,
}: {
  key?: Key;
  section: AcademicSection;
  lang: 'vi' | 'en';
  referencesById: Map<string, AcademicReference>;
  copiedCode: boolean;
  onCopyCode: (code: string) => void;
}) {
  const localize = (value: AcademicLocalizedText) => value[lang];
  const localizeSource = (source: string | AcademicLocalizedText) => typeof source === 'string' ? source : source[lang];

  return (
    <article id={section.id} className="scroll-mt-24 space-y-6">
      <h2 className="max-w-[34ch] text-2xl font-bold leading-tight tracking-tight text-slate-950 sm:text-3xl dark:text-white">
        {localize(section.title)}
      </h2>

      {section.thesis && (
        <p className="max-w-[72ch] border-l-4 border-[#5B6CFF] pl-5 text-base font-semibold leading-8 text-slate-800 dark:border-[#7C8CFF] dark:text-slate-200">
          {localize(section.thesis)}
        </p>
      )}

      <div className="max-w-[74ch] space-y-5 text-[15px] leading-8 text-slate-700 dark:text-slate-300">
        {section.paragraphs.map((paragraph, index) => <p key={index}>{localize(paragraph)}</p>)}
      </div>

      {section.subsections?.map((subsection, index) => (
        <section key={index} className="max-w-[74ch] space-y-4 pt-2">
          <h3 className="text-lg font-bold text-slate-950 dark:text-white">{localize(subsection.title)}</h3>
          <div className="space-y-4 text-[15px] leading-8 text-slate-700 dark:text-slate-300">
            {subsection.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{localize(paragraph)}</p>)}
          </div>
        </section>
      ))}

      {section.bullets && (
        <ul className="max-w-[74ch] space-y-3 border-l border-[#C7CEFF] pl-6 text-sm leading-7 text-slate-700 dark:border-[#343E78] dark:text-slate-300">
          {section.bullets.map((item, index) => (
            <li key={index} className="relative before:absolute before:-left-[1.65rem] before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#5B6CFF] dark:before:bg-[#7C8CFF]">
              {localize(item)}
            </li>
          ))}
        </ul>
      )}

      {section.table && (
        <div className="overflow-x-auto rounded-2xl border border-[#E5E7EB] dark:border-slate-800">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-[#F1F3FF] text-slate-950 dark:bg-[#12182D] dark:text-white">
              <tr>{section.table.headers.map((header, index) => <th key={index} className="border-b border-[#E5E7EB] px-5 py-4 font-bold dark:border-slate-800">{localize(header)}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] bg-white text-slate-700 dark:divide-slate-800 dark:bg-slate-900/40 dark:text-slate-300">
              {section.table.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex} className="min-w-48 px-5 py-4 align-top leading-7">{localize(cell)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {section.diagram?.type === 'education-ssi-lifecycle' && (
        <EducationLifecycleDiagram lang={lang} caption={localize(section.diagram.caption)} />
      )}

      {section.code && (
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
          <div className="flex items-center justify-between border-b border-slate-800 px-5 py-3">
            <span className="font-mono text-xs font-bold uppercase text-slate-400">{section.code.language}</span>
            <button onClick={() => onCopyCode(localizeSource(section.code!.source))} className="flex min-h-9 cursor-pointer items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 text-xs font-bold text-slate-300 hover:border-[#7C8CFF] hover:text-white">
              {copiedCode ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              {copiedCode ? (lang === 'vi' ? 'Đã sao chép' : 'Copied') : (lang === 'vi' ? 'Sao chép' : 'Copy')}
            </button>
          </div>
          <div className="max-h-[600px] overflow-auto p-5">
            <pre className="font-mono text-xs leading-7"><SyntaxHighlightedCode code={localizeSource(section.code.source)} language={section.code.language} /></pre>
          </div>
          <p className="border-t border-slate-800 px-5 py-3 text-xs leading-6 text-slate-400">{localize(section.code.caption)}</p>
        </div>
      )}

      {section.codeBlocks && (
        <div className="space-y-8">
          {section.codeBlocks.map((codeBlock, index) => {
            const source = localizeSource(codeBlock.source);
            return (
              <section key={index} className="space-y-3">
                <h3 className="text-base font-bold text-slate-950 dark:text-white">{localize(codeBlock.title)}</h3>
                <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
                  <div className="flex items-center justify-between border-b border-slate-800 px-5 py-3">
                    <span className="font-mono text-xs font-bold uppercase text-slate-400">{codeBlock.language}</span>
                    <button onClick={() => onCopyCode(source)} className="flex min-h-9 cursor-pointer items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 text-xs font-bold text-slate-300 hover:border-[#7C8CFF] hover:text-white">
                      {copiedCode ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                      {copiedCode ? (lang === 'vi' ? 'Đã sao chép' : 'Copied') : (lang === 'vi' ? 'Sao chép' : 'Copy')}
                    </button>
                  </div>
                  <div className="max-h-[600px] overflow-auto p-5">
                    <pre className="font-mono text-xs leading-7"><SyntaxHighlightedCode code={source} language={codeBlock.language} /></pre>
                  </div>
                  <p className="border-t border-slate-800 px-5 py-3 text-xs leading-6 text-slate-400">{localize(codeBlock.caption)}</p>
                </div>
              </section>
            );
          })}
        </div>
      )}

      {section.sources && section.sources.length > 0 && (
        <p className="max-w-[74ch] border-t border-[#E5E7EB] pt-4 text-xs leading-6 text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <span className="mr-2 font-bold text-slate-700 dark:text-slate-300">{lang === 'vi' ? 'Nguồn chuẩn:' : 'Standards cited:'}</span>
          {section.sources.map((sourceId, index) => {
            const reference = referencesById.get(sourceId);
            return reference ? (
              <span key={sourceId}>
                {index > 0 ? ', ' : ''}
                <a href={reference.url} target="_blank" rel="noreferrer" className="underline decoration-[#C7CEFF] underline-offset-4 hover:text-[#5B6CFF] dark:hover:text-[#7C8CFF]">
                  {reference.publisher}: {localize(reference.title)}
                </a>
              </span>
            ) : null;
          })}
        </p>
      )}
    </article>
  );
}

function EducationLifecycleDiagram({ lang, caption }: { lang: 'vi' | 'en'; caption: string }) {
  const copy = lang === 'vi'
    ? {
        issuer: 'Nhà trường / Issuer',
        holder: 'Sinh viên / Holder',
        verifier: 'Nhà tuyển dụng / Verifier',
        certnet: 'CertNet',
        issuerBody: 'Kiểm tra hồ sơ học vụ\nKý và phát hành VC',
        holderBody: 'Nhận VC qua DIDComm\nLưu trong secure vault\nĐồng ý tạo VP',
        verifierBody: 'Gửi yêu cầu chia sẻ\nXác minh VP và VC\nTrả kết quả',
        certnetBody: 'DID Document\nKhóa công khai\nCredential status',
        issue: '1. QR + DIDComm\n2. Phát hành VC',
        present: '3. QR + yêu cầu\n4. Gửi VP',
        resolve: '5. Resolve DID\n6. Kiểm tra trạng thái',
      }
    : {
        issuer: 'University / Issuer',
        holder: 'Student / Holder',
        verifier: 'Employer / Verifier',
        certnet: 'CertNet',
        issuerBody: 'Validate academic record\nSign and issue VC',
        holderBody: 'Receive VC over DIDComm\nStore in secure vault\nConsent and create VP',
        verifierBody: 'Send disclosure request\nVerify VP and VC\nReturn result',
        certnetBody: 'DID Document\nPublic keys\nCredential status',
        issue: '1. QR + DIDComm\n2. Issue VC',
        present: '3. QR + request\n4. Send VP',
        resolve: '5. Resolve DID\n6. Check status',
      };

  return (
    <figure className="rounded-2xl border border-[#E5E7EB] bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/40">
      <div className="grid items-center gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
        <DiagramActor title={copy.issuer} body={copy.issuerBody} />
        <DiagramFlow label={copy.issue} />
        <DiagramActor title={copy.holder} body={copy.holderBody} accent />
        <DiagramFlow label={copy.present} />
        <DiagramActor title={copy.verifier} body={copy.verifierBody} />
      </div>
      <div className="mx-auto mt-5 max-w-xl border-t border-dashed border-[#C7CEFF] pt-4 text-center dark:border-[#343E78]">
        <p className="mb-3 whitespace-pre-line text-xs font-semibold leading-5 text-slate-600 dark:text-slate-300">{copy.resolve}</p>
        <div className="rounded-2xl border border-[#C7CEFF] bg-[#F1F3FF] p-5 dark:border-[#343E78] dark:bg-[#12182D]">
          <p className="text-sm font-bold text-[#5B6CFF] dark:text-[#7C8CFF]">{copy.certnet}</p>
          <p className="mt-2 whitespace-pre-line text-xs leading-6 text-slate-600 dark:text-slate-300">{copy.certnetBody}</p>
        </div>
      </div>
      <figcaption className="mt-4 text-xs leading-6 text-slate-500 dark:text-slate-400">{caption}</figcaption>
    </figure>
  );
}

function DiagramActor({ title, body, accent = false }: { title: string; body: string; accent?: boolean }) {
  return (
    <div className={accent ? 'rounded-2xl border border-[#C7CEFF] bg-[#F1F3FF] p-5 dark:border-[#343E78] dark:bg-[#12182D]' : 'rounded-2xl border border-[#E5E7EB] p-5 dark:border-slate-800'}>
      <p className="text-sm font-bold text-slate-950 dark:text-white">{title}</p>
      <p className="mt-3 whitespace-pre-line text-xs leading-6 text-slate-600 dark:text-slate-300">{body}</p>
    </div>
  );
}

function DiagramFlow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-[#C7CEFF] px-3 py-3 text-center text-xs font-semibold leading-5 text-slate-600 lg:flex-col dark:border-[#343E78] dark:text-slate-300">
      <ArrowDown className="h-4 w-4 shrink-0 text-[#5B6CFF] lg:hidden dark:text-[#7C8CFF]" />
      <ArrowRight className="hidden h-4 w-4 shrink-0 text-[#5B6CFF] lg:block dark:text-[#7C8CFF]" />
      <span className="whitespace-pre-line">{label}</span>
    </div>
  );
}
