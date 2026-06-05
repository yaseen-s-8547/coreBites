import React, { useState } from "react"

const getBlockText = (block) =>
  block?.content || block?.prompt || block?.question || block?.label || ""

const getRequiredPattern = (block) => {
  if (!block) return null
  if (block.requiredPattern) return block.requiredPattern

  if (Array.isArray(block.rules)) {
    const includeRule = block.rules.find((rule) => rule.type === "includes")
    return includeRule?.value ?? null
  }

  return null
}

export default function PracticeGroupSection({ section, onComplete }) {
  const blocks = Array.isArray(section?.blocks) ? section.blocks : []
  const [answers, setAnswers] = useState({})
  const [selectedOptions, setSelectedOptions] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (index, value) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: value,
    }))
  }

  const handleSelectOption = (index, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [index]: option,
    }))
  }

  const checkAnswer = (block, userInput, selectedOption) => {
    if (!block) return false

    if (block.type === "quiz") {
      return selectedOption != null && selectedOption === block.answer
    }

    const requiredPattern = getRequiredPattern(block)
    if (!requiredPattern || !userInput) return false

    return userInput
      .toLowerCase()
      .includes(String(requiredPattern).toLowerCase())
  }

  const handleSubmit = () => {
    setSubmitted(true)

    const isComplete = blocks.every((block, index) =>
      checkAnswer(block, answers[index], selectedOptions[index])
    )

    if (isComplete) {
      onComplete?.()
    }
  }

  if (!blocks.length) {
    return (
      <div className="mb-12 p-6 rounded-2xl border border-slate-700 bg-cyan-900/10">
        <div className="text-slate-300">
          No practice items are available for this section.
        </div>
      </div>
    )
  }

  return (
    <div className="mb-12">
      <div className="rounded-2xl border border-cyan-700/40 bg-cyan-900/10 p-6">
        <div className="mb-4 text-xs uppercase tracking-wider text-cyan-400">
          Practice
        </div>

        <div className="space-y-6">
          {blocks.map((block, index) => {
            const userInput = answers[index] || ""
            const selectedOption = selectedOptions[index]
            const isCorrect = checkAnswer(block, userInput, selectedOption)
            const blockText = getBlockText(block)

            return (
              <div key={index}>
                <div className="text-cyan-100 mb-2">{blockText}</div>

                {block.type === "quiz" ? (
                  <div className="space-y-3">
                    {Array.isArray(block.options) && block.options.length ? (
                      block.options.map((option, optionIndex) => {
                        const isSelected = selectedOption === option
                        return (
                          <button
                            key={optionIndex}
                            type="button"
                            onClick={() => handleSelectOption(index, option)}
                            className={`w-full text-left rounded-lg px-4 py-3 border transition-all ${
                              isSelected
                                ? "border-cyan-400 bg-cyan-900/50"
                                : "border-slate-700 hover:border-slate-500"
                            }`}
                          >
                            {option}
                          </button>
                        )
                      })
                    ) : (
                      <div className="text-slate-400">No options available.</div>
                    )}
                  </div>
                ) : (
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
                    placeholder={block.placeholder || "Type your answer..."}
                  />
                )}

                {!submitted && block.hint && (
                  <div className="text-xs text-slate-400 mt-1">
                    Hint: {block.hint}
                  </div>
                )}

                {submitted && (
                  <div
                    className={`text-sm mt-1 ${
                      isCorrect ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {isCorrect ? "Correct" : "Try again"}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 px-4 py-2 bg-cyan-600 rounded-lg text-sm"
        >
          Check Answers
        </button>
      </div>
    </div>
  )
}
