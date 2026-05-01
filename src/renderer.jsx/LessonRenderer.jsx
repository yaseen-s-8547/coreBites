import React from "react"
import SectionEngine from "./SectionEngine"

export default function LessonRenderer({ lesson }) {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-10">
        {lesson.title}
      </h1>

      {/* 🔥 CORE LOOP */}
      {lesson.sections.map((section, index) => (
        <SectionEngine key={index} section={section} />
      ))}

    </div>
  )
}