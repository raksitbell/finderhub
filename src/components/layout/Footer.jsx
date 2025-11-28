import Link from "next/link";
import packageInfo from "../../../package.json";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-slate-600 mb-2">
          &copy; 2025 FinderHub. All rights reserved.
        </p>
        <div className="flex justify-center gap-4 items-center">
          <Link
            href="/admin"
            className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
          >
            สำหรับเจ้าหน้าที่
          </Link>
          <span className="text-slate-300">|</span>
          <Link
            href="/dev"
            className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
          >
            สำหรับนักพัฒนา
          </Link>
          <span className="text-slate-300">|</span>
          <span className="text-sm text-slate-400">v{packageInfo.version}</span>
        </div>
      </div>
    </footer>
  );
}
