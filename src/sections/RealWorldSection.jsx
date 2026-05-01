import React from "react"

export default function RealWorldSection({ section }) {
  const block = section.blocks[0]

  return (
    <div className="mb-10">

      <div className="rounded-xl border border-orange-700/30 bg-orange-900/10 p-5">

        <div className="text-orange-300 mb-2">
          Real World
        </div>

        <div className="text-orange-100 whitespace-pre-line">
          {block.content}
        </div>

      </div>

    </div>
  )
}