import axios from "axios"
import { useEffect, useMemo, useRef, useState } from "react"
import { useParams } from "react-router-dom"

import LessonRenderer from "../renderer.jsx/LessonRenderer"

const INTERACTIVE_SECTION_TYPES = new Set([
  "interactive-question",
  "practice-group",
])

export default function UserLessonView() {
  const { id } = useParams()

  return <UserLessonSession key={id} lessonId={id} />
}

function UserLessonSession({ lessonId }) {
  const token = localStorage.getItem("token")

  const [lesson, setLesson] = useState(null)
  const [loading, setLoading] = useState(Boolean(token))
  const [error, setError] = useState(
    token ? null : "Please sign in to open this lesson."
  )
  const [revealedIndex, setRevealedIndex] = useState(0)
  const [completedSections, setCompletedSections] = useState({})
  const [lessonFinished, setLessonFinished] = useState(false)

  const sectionRefs = useRef([])
  const skipFirstScroll = useRef(true)

  useEffect(() => {
    if (!token) {
      return
    }

    let shouldIgnore = false

    axios
      .get("http://localhost:5000/getyourlessons", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (shouldIgnore) return

        const purchasedLessons = Array.isArray(res.data) ? res.data : []
        const selectedLesson = purchasedLessons.find(
          (item) => String(item._id) === String(lessonId)
        )

        if (!selectedLesson) {
          setError("Lesson not found.")
          return
        }

        setLesson(selectedLesson)
      })
      .catch((err) => {
        if (shouldIgnore) return

        if (err.response?.status === 401) {
          setError("Please sign in to open this lesson.")
        } else {
          setError("Failed to load lesson.")
        }
      })
      .finally(() => {
        if (shouldIgnore) return

        setLoading(false)
      })

    return () => {
      shouldIgnore = true
    }
  }, [lessonId, token])

  const sections = useMemo(
    () => (Array.isArray(lesson?.sections) ? lesson.sections : []),
    [lesson]
  )

  const currentSection = sections[revealedIndex]
  const isInteractive = INTERACTIVE_SECTION_TYPES.has(currentSection?.type)
  const currentSectionComplete =
    !isInteractive || Boolean(completedSections[revealedIndex])
  const isLastSection = revealedIndex >= sections.length - 1
  const progress = sections.length
    ? ((revealedIndex + 1) / sections.length) * 100
    : 0

  useEffect(() => {
    if (!lesson || loading) return

    if (skipFirstScroll.current) {
      skipFirstScroll.current = false
      return
    }

    window.requestAnimationFrame(() => {
      sectionRefs.current[revealedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    })
  }, [revealedIndex, lesson, loading])

  const handleSectionComplete = (sectionIndex) => {
    setCompletedSections((prev) => ({
      ...prev,
      [sectionIndex]: true,
    }))
  }

  const handleContinue = () => {
    if (!currentSectionComplete) return

    if (isLastSection) {
      setLessonFinished(true)
      return
    }

    setRevealedIndex((prev) => Math.min(prev + 1, sections.length - 1))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="text-slate-300">Loading lesson...</div>
      </div>
    )
  }

  if (error || !lesson) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="max-w-md rounded-2xl border border-red-500/40 bg-red-900/10 p-6 text-center">
          <h1 className="text-xl font-bold text-red-300 mb-2">
            Lesson unavailable
          </h1>
          <p className="text-slate-300">{error || "Lesson not found."}</p>
        </div>
      </div>
    )
  }

  if (!sections.length) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="max-w-md rounded-2xl border border-slate-700 bg-slate-900/60 p-6 text-center">
          <h1 className="text-xl font-bold mb-2">{lesson.title}</h1>
          <p className="text-slate-300">This lesson has no sections yet.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="sticky top-0 z-20 h-2 bg-slate-900">
        <div
          className="h-full bg-white transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <LessonRenderer
        lesson={lesson}
        revealedIndex={revealedIndex}
        onSectionComplete={handleSectionComplete}
        sectionRefs={sectionRefs}
      />

      <div className="max-w-4xl mx-auto px-4 pb-16">
        {lessonFinished ? (
          <div className="rounded-2xl border border-green-500/40 bg-green-900/20 p-5 text-green-300">
            Lesson complete.
          </div>
        ) : (
          <button
            type="button"
            onClick={handleContinue}
            disabled={!currentSectionComplete}
            className={`w-full rounded-xl px-5 py-4 font-bold transition-all ${
              currentSectionComplete
                ? "bg-white text-black hover:bg-slate-200"
                : "bg-slate-800 text-slate-500 cursor-not-allowed"
            }`}
          >
            {isLastSection ? "Finish Lesson" : "Continue"}
          </button>
        )}
      </div>
    </div>
  )
}
