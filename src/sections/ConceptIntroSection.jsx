import React from "react"

export default function ConceptIntroSection({ section }) {
  const block = section.blocks[0]

  return (
    <div className="mb-10">

      <div className="rounded-xl border border-blue-700/30 bg-blue-900/10 p-5">

        <div className="text-blue-300 font-medium mb-2">
          Concept
        </div>

        <div className="text-blue-100 whitespace-pre-line">
          {block.content}
        </div>

      </div>

    </div>
  )
}