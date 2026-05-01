import React from "react"

export default function ConnectionSection({ section }) {
  const block = section.blocks[0]

  return (
    <div className="mb-10">

      <div className="rounded-xl border border-indigo-700/30 bg-indigo-900/10 p-5">

        <div className="text-indigo-300 mb-2">
          Connection
        </div>

        <div className="text-indigo-100 whitespace-pre-line">
          {block.content}
        </div>

      </div>

    </div>
  )
}