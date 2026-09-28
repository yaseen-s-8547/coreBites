import { useEffect, useId, useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faBookOpen,
    faBriefcase,
    faCamera,
    faDoorOpen,
    faFloppyDisk,
    faHouse,
    faPager,
    faPen,
    faPhone,
    faRupeeSign,
} from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import logo from "../assets/coreBitesLogo.png"
import Button from "./ui/Button"

const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"

const navigationItems = [
    { label: "Learn", icon: faHouse, path: "/app/home" },
    { label: "Library", icon: faPager, path: "/app/lesson" },
    { label: "Your Bag", icon: faBriefcase, path: "/app/bag" },
    { label: "About", icon: faBookOpen, path: "/app/about" },
    { label: "Pricing", icon: faRupeeSign, path: "/app/pricing" },
    { label: "Contact", icon: faPhone, path: "/app/contact" },
]

export default function SideBar({ image, setImage, userName, setUserName, onNavigate }) {
    const navigate = useNavigate()
    const inputId = useId()
    const [isEditName, setIsEditName] = useState(false)

    const handleUpload = (selectedFile) => {
        if (!selectedFile) {
            return
        }

        const token = localStorage.getItem("token")
        const formData = new FormData()
        formData.append("file", selectedFile)
        axios.post(`${apiBase}/profileImgUpload`, formData, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setImage(res.data.profilePhoto || "")
            })
            .catch((err) => {
                console.log(err.response?.data?.message || err)
            })
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        axios.get(`${apiBase}/getprofileImage`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setImage(res.data.profilePhoto || "")
            })
            .catch((err) => {
                console.log(err)
            })
    }, [setImage])

    const handleEditName = () => {
        setIsEditName(true)
    }

    const readUserName = () => {
        const token = localStorage.getItem("token")
        axios.get(`${apiBase}/getUserName`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setUserName(res.data.userName || "User")
            })
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        axios.get(`${apiBase}/getUserName`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setUserName(res.data.userName || "User")
            })
            .catch((err) => {
                console.log(err)
            })
    }, [setUserName])

    const handleSaveUserName = () => {
        const token = localStorage.getItem("token")
        axios.patch(`${apiBase}/saveusername`, { userName }, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                setIsEditName(false)
                readUserName()
            })
    }

    const handleLogOut = () => {
        localStorage.removeItem("token")
        navigate("/", { replace: true })
    }

    return (
        <div className="flex h-full min-h-0 flex-col gap-cb-5 overflow-y-auto bg-cb-surface p-cb-4 text-cb-ink">
            <Link
                to="/app/home"
                onClick={onNavigate}
                aria-label="CoreBites home"
                className="hidden min-h-14 items-center gap-cb-3 border-b border-cb-border pb-cb-4 lg:flex"
            >
                <img src={logo} alt="" className="h-10 w-10 object-contain" />
                <span className="zen-dots-regular text-cb-lg text-cb-ink">CoreBites</span>
            </Link>

            <section aria-label="Learner profile" className="flex min-w-0 items-center gap-cb-3 border-b border-cb-border pb-cb-5 pt-cb-10 lg:pt-0">
                {image ? (
                    <img
                        alt="Profile"
                        className="size-12 shrink-0 rounded-full border border-cb-border object-cover"
                        src={image}
                    />
                ) : (
                    <label
                        htmlFor={inputId}
                        aria-label="Upload profile photo"
                        className="flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-cb-border bg-cb-ink text-white focus-within:ring-2 focus-within:ring-cb-focus"
                    >
                        <FontAwesomeIcon icon={faCamera} aria-hidden="true" />
                        <input
                            className="sr-only"
                            accept="image/*"
                            onChange={(event) => handleUpload(event.target.files[0])}
                            type="file"
                            id={inputId}
                        />
                    </label>
                )}

                <div className="min-w-0 flex-1">
                    {isEditName ? (
                        <input
                            aria-label="Profile name"
                            className="w-full min-w-0 rounded-cb-sm border border-cb-border bg-cb-surface px-cb-2 py-cb-2 text-cb-sm text-cb-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cb-focus"
                            value={userName}
                            onChange={(event) => setUserName(event.target.value)}
                            onBlur={handleSaveUserName}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") event.currentTarget.blur()
                            }}
                        />
                    ) : (
                        <p className="truncate text-cb-sm font-cb-semibold text-cb-ink">
                            {userName || "User"}
                        </p>
                    )}
                    <p className="mt-1 text-cb-xs text-cb-muted">Learner account</p>
                </div>

                {isEditName ? (
                    <button
                        type="button"
                        aria-label="Save profile name"
                        onClick={handleSaveUserName}
                        className="flex size-11 shrink-0 items-center justify-center rounded-cb-sm text-cb-muted hover:bg-cb-surface-muted hover:text-cb-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cb-focus"
                    >
                        <FontAwesomeIcon icon={faFloppyDisk} aria-hidden="true" />
                    </button>
                ) : (
                    <button
                        type="button"
                        aria-label="Edit profile name"
                        onClick={handleEditName}
                        className="flex size-11 shrink-0 items-center justify-center rounded-cb-sm text-cb-muted hover:bg-cb-surface-muted hover:text-cb-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cb-focus"
                    >
                        <FontAwesomeIcon icon={faPen} aria-hidden="true" />
                    </button>
                )}
            </section>

            <nav aria-label="Primary learner navigation" className="flex-1">
                <ul className="flex flex-col gap-cb-1">
                    {navigationItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                end
                                onClick={onNavigate}
                                className={({ isActive }) => `flex min-h-11 items-center gap-cb-3 rounded-cb-sm px-cb-3 py-cb-2 text-cb-sm font-cb-medium transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cb-focus ${isActive ? "bg-cb-primary text-white" : "text-cb-text hover:bg-cb-surface-muted hover:text-cb-ink"}`}
                            >
                                <FontAwesomeIcon icon={item.icon} className="w-4" aria-hidden="true" />
                                <span>{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="border-t border-cb-border pt-cb-4">
                <Button variant="secondary" className="w-full justify-start" onClick={handleLogOut}>
                    <FontAwesomeIcon icon={faDoorOpen} aria-hidden="true" />
                    Log out
                </Button>
            </div>
        </div>
    )
}
