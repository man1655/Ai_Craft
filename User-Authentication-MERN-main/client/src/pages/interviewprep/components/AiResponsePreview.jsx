import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function AiResponsePreview({ content, isDarkMode }) {
  if (!content || typeof content !== 'string') {
    console.warn('Invalid or missing markdown content:', content);
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-[14px] prose prose-slate dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p({ children }) {
              // Render paragraphs as div to avoid invalid nesting of <div> inside <p>
              return <div className="mb-4 leading-5">{children}</div>;
            },
            strong({ children }) {
              return <strong>{children}</strong>;
            },
            em({ children }) {
              return <em>{children}</em>;
            },
            ul({ children }) {
              return <ul className="list-disc pl-6 space-y-2 my-4">{children}</ul>;
            },
            ol({ children }) {
              return <ol className="list-decimal pl-6 space-y-2 my-4">{children}</ol>;
            },
            li({ children }) {
              return <li className="mb-1">{children}</li>;
            },
            blockquote({ children }) {
              return (
                <blockquote className="border-l-4 border-gray-400 italic my-4 pl-4">
                  {children}
                </blockquote>
              );
            },
            h1({ children }) {
              return <h1 className="text-2xl font-bold mt-6 mb-4">{children}</h1>;
            },
            h2({ children }) {
              return <h2 className="text-xl font-bold mt-6 mb-3">{children}</h2>;
            },
            h3({ children }) {
              return <h3 className="text-lg font-bold mt-6 mb-2">{children}</h3>;
            },
            h4({ children }) {
              return <h4 className="text-base font-bold mt-4 mb-2">{children}</h4>;
            },
            a({ href, children }) {
              return (
                <a
                  href={href}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              );
            },
            table({ children }) {
              return (
                <div className="overflow-x-auto my-4">
                  <table className="min-w-full divide-y divide-gray-300 border border-gray-200">
                    {children}
                  </table>
                </div>
              );
            },
            thead({ children }) {
              return <thead className="bg-gray-50">{children}</thead>;
            },
            tbody({ children }) {
              return <tbody className="divide-y divide-gray-200">{children}</tbody>;
            },
            tr({ children }) {
              return <tr className="border-t">{children}</tr>;
            },
            th({ children }) {
              return (
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {children}
                </th>
              );
            },
            td({ children }) {
              return <td className="px-3 py-2 whitespace-nowrap text-sm">{children}</td>;
            },
            hr() {
              return <hr className="my-6 border-gray-200" />;
            },
            img({ src, alt }) {
              return <img src={src} alt={alt} className="my-4 max-w-full rounded" />;
            },
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              const language = match ? match[1] : 'text';
              const codeString = String(children).replace(/\n$/, '');

              const copyToClipboard = () => {
                navigator.clipboard.writeText(codeString).then(() => {
                  alert('Code copied to clipboard!');
                });
              };

              return !inline ? (
                <div
                  className={`relative my-6 border rounded-md overflow-hidden shadow-sm transition-all ${
                    isDarkMode ? 'bg-[#1e1e1e] border-gray-700' : 'bg-white border-gray-300'
                  }`}
                >
                  <div
                    className={`flex justify-between items-center px-4 py-2 text-xs font-mono border-b ${
                      isDarkMode
                        ? 'bg-[#2a2a2a] text-gray-300 border-gray-700'
                        : 'bg-gray-100 text-gray-700 border-gray-300'
                    }`}
                  >
                    <span className="uppercase tracking-wide">{language}</span>
                    <button
                      onClick={copyToClipboard}
                      className={`transition ${
                        isDarkMode ? 'text-blue-400 hover:text-blue-200' : 'text-blue-600 hover:text-blue-800'
                      }`}
                      aria-label="Copy code"
                      type="button"
                    >
                      Copy
                    </button>
                  </div>

                  <SyntaxHighlighter
                    style={isDarkMode ? oneDark : oneLight}
                    language={language}
                    PreTag="div"
                    customStyle={{
                      margin: 0,
                      padding: '1rem',
                      fontSize: '0.875rem',
                      backgroundColor: 'transparent',
                    }}
                    {...props}
                  >
                    {codeString}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code
                  className={`px-1 py-0.5 rounded text-sm font-mono ${
                    isDarkMode ? 'bg-[#2d2d2d] text-gray-200' : 'bg-gray-100'
                  }`}
                >
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default AiResponsePreview;
