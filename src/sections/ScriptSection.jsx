import React from "react"

export default function ScriptSection({ section }) {

  const block = section.blocks[0]
  const content = block.content

  // 👉 split content into lines
  const lines = content.split("\n")

  return (
    <div className="mb-10">

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">

        {/* LABEL */}
        <div className="mb-4 text-xs uppercase tracking-wider text-slate-400">
          Script Breakdown
        </div>

        {/* CONTENT */}
        <div className="space-y-2 text-slate-200 leading-relaxed">

          {lines.map((line, index) => {

            const isCode = line.includes("<script")

            return (
              <div
                key={index}
                className={`
                  ${isCode ? "bg-black px-3 py-2 rounded text-green-400 font-mono" : ""}
                `}
              >
                {line}
              </div>
            )
          })}

        </div>

      </div>

    </div>
  )
}