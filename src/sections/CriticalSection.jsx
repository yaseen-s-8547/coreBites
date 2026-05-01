import React from "react"

export default function CriticalSection({ section }) {

  const codeBlock = section.blocks.find(b => b.type === "code")
  const explanations = section.blocks.filter(b => b.type === "explanation")
  const patternBlock = section.blocks.find(b => b.type === "pattern")

  return (
    <div className="mb-12">

      <div className="rounded-2xl border border-yellow-700/40 bg-yellow-900/10 p-6">

        {/* LABEL */}
        <div className="mb-4 text-xs uppercase tracking-wider text-yellow-400">
          Critical Moment
        </div>

        {/* CODE */}
        <div className="mb-6 bg-black rounded-lg p-4 text-green-400 font-mono text-sm whitespace-pre-line">
          {codeBlock.content}
        </div>

        {/* BREAKDOWN */}
        <div className="space-y-4 mb-6">
          {explanations.map((exp, index) => (
            <div
              key={index}
              className="bg-slate-800/60 p-4 rounded-lg text-slate-200 whitespace-pre-line"
            >
              {exp.content}
            </div>
          ))}
        </div>

        {/* PATTERN */}
        {patternBlock && (
          <div className="bg-yellow-800/20 border border-yellow-600/40 p-4 rounded-lg text-yellow-200 font-medium">
            {patternBlock.content}
          </div>
        )}

      </div>

    </div>
  )
}