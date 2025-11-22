import React from "react";

export default function ItemDetailRow({ icon: Icon, label, value, iconColor }) {
  return (
    <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="p-2.5 rounded-xl bg-slate-50 text-slate-900 border border-slate-100">
          <Icon className={`w-5 h-5 ${iconColor || "text-slate-900"}`} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900 mb-1">{label}</h4>
          <p className="text-slate-600 text-sm leading-relaxed">{value}</p>
        </div>
      </div>
    </div>
  );
}
