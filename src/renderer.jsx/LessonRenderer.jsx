import React from "react"
import SectionEngine from "./SectionEngine"

export default function LessonRenderer({
  lesson,
  revealedIndex,
  onSectionComplete,
  sectionRefs,
}) {
  const sections = Array.isArray(lesson?.sections) ? lesson.sections : []
  const visibleUntil =
    typeof revealedIndex === "number" ? revealedIndex : sections.length - 1

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-10">{lesson.title}</h1>

      {sections.map((section, index) => (
        index <= visibleUntil && (
          <div
            key={section._id || index}
            ref={(node) => {
              if (sectionRefs?.current) {
                sectionRefs.current[index] = node
              }
            }}
            className="scroll-mt-24"
          >
            <SectionEngine
              section={section}
              sectionIndex={index}
              isActive={index === visibleUntil}
              onComplete={() => onSectionComplete?.(index)}
            />
          </div>
        )
      ))}
    </div>
  )
}
