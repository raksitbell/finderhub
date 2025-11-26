import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';

import { getDocBySlug, getDocs } from '@/lib/docs';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import 'highlight.js/styles/github-dark.css'; // Import highlight.js styles

export async function generateStaticParams() {
  const docs = getDocs();
  return docs.map((doc) => ({
    slug: doc.slug,
  }));
}

export default async function DocPage({ params }) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  // Extract headings for Table of Contents
  const headings = doc.content.match(/^#{2,3} .+$/gm) || [];
  const toc = headings.map((heading) => {
    const level = heading.match(/^#+/)[0].length;
    let text = heading.replace(/^#+\s+/, "");

    // Check for manual ID in the heading text (e.g. <a id="foo"></a>)
    const manualIdMatch = text.match(/<a\s+.*?id=["']([^"']+)["'].*?>/);
    let id = manualIdMatch ? manualIdMatch[1] : null;

    // Remove HTML tags from text for display
    text = text.replace(/<[^>]+>/g, "").trim();

    if (!id) {
      // Create a slug from the text that matches rehype-slug behavior
      // Support Unicode characters (e.g. Thai)
      id = text
        .toLowerCase()
        .trim()
        .replace(/[^\p{L}\p{N}\s-]/gu, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }
    return { level, text, id };
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/dev">
            <Button variant="ghost" className="pl-0 hover:pl-2 transition-all">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Documentation
            </Button>
          </Link>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <main className="lg:col-span-9">
            <article className="prose prose-slate dark:prose-invert max-w-none lg:prose-lg">
              <h1 className="mb-2">{doc.title}</h1>
              {doc.date && (
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
                  Last updated: {doc.date}
                </p>
              )}

              <ReactMarkdown
                rehypePlugins={[rehypeHighlight, rehypeSlug]}
              >
                {doc.content}
              </ReactMarkdown>
            </article>
          </main>

          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-10">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                On this page
              </h4>
              <nav className="flex flex-col space-y-2">
                {toc.map((item, index) => (
                  <a
                    key={index}
                    href={`#${item.id}`}
                    className={`text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                      item.level === 1
                        ? "font-medium text-gray-900 dark:text-gray-100"
                        : item.level === 2
                        ? "ml-4 text-gray-600 dark:text-gray-400"
                        : "ml-8 text-gray-500 dark:text-gray-500"
                    }`}
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
