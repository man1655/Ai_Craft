import React from "react";
import { getInitials } from "../../utils/helper";
import { FaTrash } from "react-icons/fa";

function SummaryCard({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) {
  return (
    <div
      className="bg-white border border-grey-300/400 rounded-xl p-2 overflow-hidden cursor-pointer hover:shadow-xl shadow-grey-100 relative group"
      onClick={onSelect}
    >
      {/* Delete Button in top-right */}
      <button
        className="absolute top-3 right-3 hidden group-hover:flex items-center gap-2 text-xs text-rose-500 font-medium bg-rose-50 px-3 py-1 rounded border border-rose-100 hover:border-rose-200 z-10"
        onClick={(e) => {
          e.stopPropagation(); // Prevent card click
          onDelete();
        }}
      >
        <FaTrash className="text-xs" /> Delete
      </button>

      {/* Top Colored Header */}
      <div
        className="rounded-lg p-4 relative"
        style={{
          background: colors.bgColor,
        }}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 bg-white rounded-md flex items-center justify-center mr-4">
            <span className="text-lg font-semibold text-black">{getInitials(role)}</span>
          </div>

          <div className="flex-grow">
            <h2 className="text-[17px] font-medium">{role}</h2>
            <p className="text-xs text-medium text-grey-900">{topicsToFocus}</p>
          </div>
        </div>
      </div>

      {/* Bottom Details */}
      <div className="px-3 pb-3">
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <div className="text-[10px] font-medium text-black px-3 py-1 border border-grey-900 rounded-full">
            Experience: {experience}
          </div>
          <div className="text-[10px] font-medium text-black px-3 py-1 border border-grey-900 rounded-full">
            {questions} Q&A
          </div>
          <div className="text-[10px] font-medium text-black px-3 py-1 border border-grey-900 rounded-full">
            Last Updated: {lastUpdated}
          </div>
        </div>
        <p className="text-[12px] text-gray-500 font-medium line-clamp-2 mt-3">
          {description}
        </p>
      </div>
    </div>
  );
}

export default SummaryCard;
