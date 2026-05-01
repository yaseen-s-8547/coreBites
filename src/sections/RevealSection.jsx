import React from "react"

export default function RevealSection({ section }) {

  const block = section.blocks[0]

  return (
    <div className="mb-10">

      <div className="rounded-2xl border border-emerald-700/40 bg-emerald-900/10 p-6">

        {/* LABEL */}
        <div className="mb-3 text-xs uppercase tracking-wider text-emerald-400">
          Explanation
        </div>

        {/* CONTENT */}
        <div className="text-emerald-100 leading-relaxed whitespace-pre-line">
          {block.content}
        </div>

      </div>

    </div>
  )
}