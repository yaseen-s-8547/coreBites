import React, { useState } from "react"

export default function PracticeGroupSection({ section }) {

  const blocks = Array.isArray(section?.blocks) ? section.blocks : []
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (index, value) => {
    setAnswers(prev => ({
      ...prev,
      [index]: value
    }))
  }

  const checkAnswer = (block, userInput) => {
    if (!userInput || !block?.requiredPattern) return false

    return userInput
      .toLowerCase()
      .includes(String(block.requiredPattern).toLowerCase())
  }

  if (!blocks.length) {
    return (
      <div className="mb-12 p-6 rounded-2xl border border-slate-700 bg-cyan-900/10">
        <div className="text-slate-300">No practice items are available for this section.</div>
      </div>
    )
  }

  return (
    <div className="mb-12">

      <div className="rounded-2xl border border-cyan-700/40 bg-cyan-900/10 p-6">

        {/* LABEL */}
        <div className="mb-4 text-xs uppercase tracking-wider text-cyan-400">
          Practice
        </div>

        {/* QUESTIONS */}
        <div className="space-y-6">

          {section.blocks.map((block, index) => {

            const userInput = answers[index] || ""
            const isCorrect = checkAnswer(block, userInput)

            return (
              <div key={index}>

                {/* QUESTION */}
                <div className="text-cyan-100 mb-2">
                  {block.content}
                </div>

                {/* INPUT */}
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className={`w-full bg-black border rounded-lg px-3 py-2 text-white outline-none
                    ${
                      submitted
                        ? isCorrect
                          ? "border-green-500"
                          : "border-red-500"
                        : "border-slate-700"
                    }
                  `}
                  placeholder="Type your answer..."
                />

                {/* HINT */}
                {!submitted && block.hint && (
                  <div className="text-xs text-slate-400 mt-1">
                    Hint: {block.hint}
                  </div>
                )}

                {/* FEEDBACK */}
                {submitted && (
                  <div className={`text-sm mt-1 ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                    {isCorrect ? "Correct" : "Try again"}
                  </div>
                )}

              </div>
            )
          })}

        </div>

        {/* BUTTON */}
        <button
          onClick={() => setSubmitted(true)}
          className="mt-6 px-4 py-2 bg-cyan-600 rounded-lg text-sm"
        >
          Check Answers
        </button>

      </div>

    </div>
  )
}