import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/dev">
            <Button variant="ghost" className="pl-0 hover:pl-2 transition-all">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Documentation
            </Button>
          </Link>
        </div>

        <article className="prose prose-slate dark:prose-invert max-w-none lg:prose-lg">
          <h1 className="mb-2">{doc.title}</h1>
          {doc.date && (
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
              Last updated: {doc.date}
            </p>
          )}
          
          <ReactMarkdown rehypePlugins={[rehypeHighlight, rehypeSlug, rehypeAutolinkHeadings]}>
            {doc.content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
