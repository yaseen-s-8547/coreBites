import React from "react"

export default function MappingSection({ section }) {
  const block = section.blocks[0]

  return (
    <div className="mb-10">

      <div className="rounded-xl border border-purple-700/30 bg-purple-900/10 p-5">

        <div className="text-purple-300 mb-2">
          Mapping
        </div>

        <div className="text-purple-100 whitespace-pre-line">
          {block.content}
        </div>

      </div>

    </div>
  )
}