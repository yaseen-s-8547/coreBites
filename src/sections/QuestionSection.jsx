import React, { useState } from "react"

export default function QuestionSection({ section, onComplete }) {
  const [selected, setSelected] = useState(null)
  const [showResult, setShowResult] = useState(false)

  const textBlock = section.blocks.find((b) => b.type === "text")
  const quizBlock = section.blocks.find((b) => b.type === "quiz")

  const handleSelect = (option) => {
    setSelected(option)
    setShowResult(true)

    if (option === quizBlock.answer) {
      onComplete?.()
    }
  }

  const isCorrect = selected === quizBlock.answer

  return (
    <div className="mb-10">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="mb-4 text-xs uppercase tracking-wider text-slate-400">
          Block 2 - Question
        </div>

        <div className="text-slate-200 whitespace-pre-line mb-6">
          {textBlock.content}
        </div>

        <div className="space-y-3 mb-6">
          {quizBlock.options.map((option, index) => {
            const isSelected = selected === option
            const isAnswer = quizBlock.answer === option

            return (
              <div
                key={index}
                onClick={() => handleSelect(option)}
                className={`cursor-pointer px-4 py-3 rounded-lg border transition-all
                  ${isSelected && isAnswer && "border-green-500 bg-green-900/20"}
                  ${isSelected && !isAnswer && "border-red-500 bg-red-900/20"}
                  ${!isSelected && "border-slate-700 hover:border-slate-500"}
                `}
              >
                {option}
              </div>
            )
          })}
        </div>

        {showResult && (
          <div
            className={`p-4 rounded-lg text-sm mb-4 ${
              isCorrect
                ? "bg-green-900/20 text-green-300"
                : "bg-red-900/20 text-red-300"
            }`}
          >
            {isCorrect ? quizBlock.correctFeedback : quizBlock.wrongFeedback}
          </div>
        )}
      </div>
    </div>
  )
}
