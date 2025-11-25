import React from "react";
import { Package, CheckCircle, RotateCcw } from "lucide-react";

/**
 * KeyMetrics Component
 *
 * Displays a set of cards showing key statistics (Total Items, Found, Returned).
 * Supports different visual variants for Public and Admin views.
 *
 * @param {Object} props
 * @param {Object} props.stats - Object containing count statistics { total, found, returned }.
 * @param {string} [props.variant="public"] - The visual variant ("public" or "admin").
 */
export default function KeyMetrics({ stats, variant = "public" }) {
  const labels = {
    public: {
      total: { title: "ทรัพย์สินในระบบ", subtitle: "จำนวน (ชิ้น)" },
      found: { title: "ทรัพย์สินที่พบเจอ", subtitle: "จำนวน (ชิ้น)" },
      returned: { title: "ทรัพย์สินที่คืนสู่เจ้าของแล้ว", subtitle: "จำนวน (ชิ้น)" },
    },
    admin: {
      total: { title: "จำนวนทรัพย์สินทั้งหมด", subtitle: "ทั้งหมด" },
      found: { title: "ทรัพย์สินที่พบ", subtitle: "ที่พบ" },
      returned: { title: "ทรัพย์สินที่คืน", subtitle: "ที่คืน" },
    },
  };

  const currentLabels = labels[variant] || labels.public;

  return (
    <div className="flex flex-col gap-4 w-full lg:w-80">
      {/* Total Items */}
      <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-400/20 rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-blue-200" />
          </div>
          <div>
            <div className="text-white/70 text-xs font-medium font-sans">
              {currentLabels.total.title}
            </div>
            <div className="text-xs text-white/60 font-sans">
              {currentLabels.total.subtitle}
            </div>
          </div>
        </div>
        <div className="text-2xl text-white font-sans font-medium">
          {stats?.total || 0}
        </div>
      </div>

      {/* Found Items */}
      <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-400/20 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-indigo-200" />
          </div>
          <div>
            <div className="text-white/70 text-xs font-medium font-sans">
              {currentLabels.found.title}
            </div>
            <div className="text-xs text-white/60 font-sans">
              {currentLabels.found.subtitle}
            </div>
          </div>
        </div>
        <div className="text-2xl text-white font-sans font-medium">
          {stats?.found || 0}
        </div>
      </div>

      {/* Returned Items */}
      <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-400/20 rounded-lg flex items-center justify-center">
            <RotateCcw className="w-5 h-5 text-orange-200" />
          </div>
          <div>
            <div className="text-white/70 text-xs font-medium font-sans">
              {currentLabels.returned.title}
            </div>
            <div className="text-xs text-white/60 font-sans">
              {currentLabels.returned.subtitle}
            </div>
          </div>
        </div>
        <div className="text-2xl text-white font-sans font-medium">
          {stats?.returned || 0}
        </div>
      </div>
    </div>
  );
}
