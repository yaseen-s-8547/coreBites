import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"

const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"

import LessonRenderer from "../renderer.jsx/LessonRenderer"

export default function AdminPreview() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [lesson, setLesson] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("adminToken")

    axios
      .get(`${apiBase}/lesson/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setLesson(res.data)
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          navigate("/app/admin")
        } else {
          setError("Failed to load lesson")
        }
      })
  }, [id, navigate])

  if (!lesson) {
    return <div className="text-white p-6">Loading...</div>
  }

  if (error) {
    return <div className="text-red-400 p-6">{error}</div>
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <LessonRenderer lesson={lesson} />
    </div>
  )
}
