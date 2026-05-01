import React from "react"

export default function ObservationSection({ section }) {

  // 👉 get first block (your JSON has one text block)
  const block = section.blocks[0]

  return (
    <div className="mb-10">

      {/* 🔥 MAIN CARD */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">

        {/* TOP LABEL */}
        <div className="mb-4 text-xs uppercase tracking-wider text-slate-400">
          Block 1 — Observation
        </div>

        {/* CONTENT */}
        <div className="text-slate-200 leading-relaxed whitespace-pre-line">
          {block.content}
        </div>

      </div>

    </div>
  )
}