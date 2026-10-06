import { useEffect, useState } from "react"
import {
    clearAccessSession,
    endAuthSession,
    refreshAccessSession,
    setAccessSession,
} from "../api"
import AuthContext from "./AuthContext"

export default function AuthProvider({ children }) {
    const [status, setStatus] = useState("checking")
    const [role, setRole] = useState(null)

    useEffect(() => {
        let isMounted = true
        localStorage.removeItem("token")
        localStorage.removeItem("adminToken")

        refreshAccessSession()
            .then((session) => {
                if (!isMounted) return
                setRole(session.role)
                setStatus("authenticated")
            })
            .catch(() => {
                if (!isMounted) return
                clearAccessSession()
                setRole(null)
                setStatus("unauthenticated")
            })

        const handleSessionExpired = () => {
            setRole(null)
            setStatus("unauthenticated")
        }
        const handleSessionUpdated = (event) => {
            setRole(event.detail.role)
            setStatus("authenticated")
        }

        window.addEventListener("auth-session-expired", handleSessionExpired)
        window.addEventListener("auth-session-updated", handleSessionUpdated)

        return () => {
            isMounted = false
            window.removeEventListener("auth-session-expired", handleSessionExpired)
            window.removeEventListener("auth-session-updated", handleSessionUpdated)
        }
    }, [])

    const signIn = (session) => {
        localStorage.removeItem("token")
        localStorage.removeItem("adminToken")
        setAccessSession(session)
        setRole(session.role)
        setStatus("authenticated")
        window.dispatchEvent(new CustomEvent("auth-session-updated", {
            detail: { role: session.role },
        }))
    }

    const signOut = async () => {
        try {
            await endAuthSession()
        } finally {
            localStorage.removeItem("token")
            localStorage.removeItem("adminToken")
            setRole(null)
            setStatus("unauthenticated")
        }
    }

    return (
        <AuthContext.Provider value={{ status, role, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}
