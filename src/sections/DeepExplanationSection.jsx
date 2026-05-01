import React from "react"

export default function DeepExplanationSection({ section }) {
  const block = section.blocks[0]

  return (
    <div className="mb-10">

      <div className="rounded-xl border border-green-700/30 bg-green-900/10 p-5">

        <div className="text-green-300 mb-2">
          Deep Understanding
        </div>

        <div className="text-green-100 whitespace-pre-line">
          {block.content}
        </div>

      </div>

    </div>
  )
}