import React from "react"

export default function BridgeSection({ section }) {

  const block = section.blocks[0]

  return (
    <div className="mb-10 flex justify-center">

      <div className="max-w-xl w-full rounded-2xl border border-indigo-700/40 bg-indigo-900/10 p-6 text-center">

        {/* LABEL */}
        <div className="mb-3 text-xs uppercase tracking-wider text-indigo-400">
          Connection
        </div>

        {/* CONTENT */}
        <div className="text-indigo-100 leading-relaxed whitespace-pre-line">
          {block.content}
        </div>

      </div>

    </div>
  )
}