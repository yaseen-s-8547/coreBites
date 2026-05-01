import React from "react"

export default function TransitionSection({ section }) {
  const block = section.blocks[0]

  return (
    <div className="mb-10 text-center">

      <div className="text-lg text-slate-300 whitespace-pre-line leading-relaxed">
        {block.content}
      </div>

    </div>
  )
}