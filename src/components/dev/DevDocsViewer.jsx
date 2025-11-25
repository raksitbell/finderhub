"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, ArrowRight, Home, LayoutDashboard, Globe } from "lucide-react";

export default function DevDocsViewer({ docs }) {
  const [language, setLanguage] = useState("th"); // 'en' or 'th'

  const filteredDocs = docs.filter((doc) => {
    if (language === "th") {
      return doc.slug.endsWith(".th") || doc.slug === "API";
    } else {
      return !doc.slug.endsWith(".th");
    }
  });

  const translations = {
    en: {
      backHome: "Back to Home",
      adminDashboard: "Admin Dashboard",
      title: "Developer Documentation",
      description:
        "Technical guides, architecture overviews, and project standards for FinderHub.",
      readMore: "Read more",
      sitemapTitle: "Sitemap Viewer",
      sitemapDesc:
        "Interactive sitemap and architecture diagrams for the FinderHub project.",
      viewDiagrams: "View Diagrams",
      toolBadge: "Tool",
    },
    th: {
      backHome: "กลับหน้าหลัก",
      adminDashboard: "แดชบอร์ดผู้ดูแล",
      title: "เอกสารสำหรับนักพัฒนา",
      description:
        "คู่มือทางเทคนิค ภาพรวมสถาปัตยกรรม และมาตรฐานโครงการสำหรับ FinderHub",
      readMore: "อ่านเพิ่มเติม",
      sitemapTitle: "ดูแผนผังเว็บไซต์",
      sitemapDesc:
        "แผนผังเว็บไซต์แบบโต้ตอบและแผนภาพสถาปัตยกรรมสำหรับโครงการ FinderHub",
      viewDiagrams: "ดูแผนภาพ",
      toolBadge: "เครื่องมือ",
    },
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            {t.backHome}
          </Link>
          <Link
            href="/admin"
            className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <LayoutDashboard className="w-4 h-4 mr-2" />
            {t.adminDashboard}
          </Link>
        </div>

        {/* Language Toggle */}
        <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setLanguage("en")}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
              language === "en"
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage("th")}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
              language === "th"
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            ไทย
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            {t.title}
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            {t.description}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDocs.map((doc) => (
            <Link href={`/dev/${doc.slug}`} key={doc.slug} className="group">
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                      <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    {doc.slug.includes(".th") && (
                      <Badge
                        variant="secondary"
                        className="bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-300"
                      >
                        TH
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {doc.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3 text-gray-600 dark:text-gray-300">
                    {doc.snippet}
                  </CardDescription>
                  <div className="mt-4 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {t.readMore} <ArrowRight className="ml-1 w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

          <Link href="/dev/sitemap-viewer" className="group">
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg group-hover:bg-purple-100 dark:group-hover:bg-purple-900/40 transition-colors">
                    <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300"
                  >
                    {t.toolBadge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {t.sitemapTitle}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-3 text-gray-600 dark:text-gray-300">
                  {t.sitemapDesc}
                </CardDescription>
                <div className="mt-4 flex items-center text-sm font-medium text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {t.viewDiagrams} <ArrowRight className="ml-1 w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
