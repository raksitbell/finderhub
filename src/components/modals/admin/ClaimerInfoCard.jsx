import React from "react";

/**
 * ClaimerInfoCard Component
 *
 * Displays information about the person who claimed an item.
 * Only visible when an item has been returned (status is false).
 *
 * @param {Object} props
 * @param {string} props.claimerName - The name of the claimer.
 * @param {string} props.claimerPhone - The phone number of the claimer.
 */
export default function ClaimerInfoCard({ claimerName, claimerPhone }) {
  return (
    <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100">
      <h4 className="text-sm font-bold text-blue-900 mb-3">
        Claimer Information
      </h4>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-blue-500 block text-xs font-medium mb-1">
            Name
          </span>
          <span className="text-blue-900 font-bold">{claimerName || "-"}</span>
        </div>
        <div>
          <span className="text-blue-500 block text-xs font-medium mb-1">
            Phone
          </span>
          <span className="text-blue-900 font-bold">{claimerPhone || "-"}</span>
        </div>
      </div>
    </div>
  );
}
