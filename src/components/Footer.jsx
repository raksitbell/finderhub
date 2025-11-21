import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-slate-600 mb-2">
          &copy; 2023 FinderHub. All rights reserved.
        </p>
        <div>
          <Link
            href="/admin"
            className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
          >
            สำหรับเจ้าหน้าที่
          </Link>
        </div>
      </div>
    </footer>
  );
}
