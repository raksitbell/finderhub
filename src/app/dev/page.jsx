import { getDocs } from '@/lib/docs';
import DevDocsViewer from '@/components/dev/DevDocsViewer';
import Footer from '@/components/layout/Footer';

export default function DevDocsPage() {
  const docs = getDocs();

  return (
    <>
      <DevDocsViewer docs={docs} />
      <Footer />
    </>
  );
}
