import axios from "axios"

const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
const api = axios.create({
    baseURL: apiBase,
    withCredentials: true,
})

let accessToken = null
let accessRole = null
let refreshPromise = null

export const setAccessSession = ({ accessToken: token, role }) => {
    accessToken = token || null
    accessRole = role || null
}

export const clearAccessSession = () => {
    accessToken = null
    accessRole = null
}

export const getAccessToken = () => accessToken

export const refreshAccessSession = async () => {
    if (!refreshPromise) {
        refreshPromise = axios
            .post(`${apiBase}/auth/refresh`, {}, { withCredentials: true })
            .then(({ data }) => {
                setAccessSession(data)
                return data
            })
            .finally(() => {
                refreshPromise = null
            })
    }

    return refreshPromise
}

api.interceptors.request.use((config) => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    } else {
        delete config.headers.Authorization
    }
    return config
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const request = error.config
        const status = error.response?.status
        const message = error.response?.data?.message?.toLowerCase()
        if (status === 401 && request?._retriedAfterRefresh && accessToken) {
            const expiredRole = accessRole
            clearAccessSession()
            window.dispatchEvent(new CustomEvent("auth-session-expired", {
                detail: { role: expiredRole },
            }))
            return Promise.reject(error)
        }

        const shouldRefresh = status === 401
            && accessToken
            && request
            && !request._retriedAfterRefresh
            && !request.url?.includes("/auth/refresh")
            && !request.url?.includes("/auth/logout")
            && !/\/(usersignin|adminsignin|admincheck|google-auth|usersignup)(\?|$)/.test(request.url || "")
            && ["invalid token", "token expired", "no token found"].includes(message)

        if (!shouldRefresh) return Promise.reject(error)

        request._retriedAfterRefresh = true

        try {
            const session = await refreshAccessSession()
            request.headers.Authorization = `Bearer ${session.accessToken}`
            return api(request)
        } catch (refreshError) {
            const expiredRole = accessRole
            clearAccessSession()
            window.dispatchEvent(new CustomEvent("auth-session-expired", {
                detail: { role: expiredRole },
            }))
            return Promise.reject(refreshError)
        }
    }
)

export const endAuthSession = async () => {
    try {
        await axios.post(`${apiBase}/auth/logout`, {}, { withCredentials: true })
    } finally {
        clearAccessSession()
    }
}

export default api
