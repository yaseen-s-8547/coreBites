import { useEffect, useRef, useState } from "react"
import { Link, Outlet } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons"
import logo from "../assets/coreBitesLogo.png"
import SideBar from "../Components/SideBar"

export default function DashBoardLayOut() {
    const [isOpen, setIsOpen] = useState(false)
    const [isDesktop, setIsDesktop] = useState(false)
    const [image, setImage] = useState(null)
    const [userName, setUserName] = useState("User")
    const menuButtonRef = useRef(null)
    const navigationRef = useRef(null)

    useEffect(() => {
        const desktopQuery = window.matchMedia("(min-width: 1024px)")
        const updateBreakpoint = () => {
            setIsDesktop(desktopQuery.matches)
            if (desktopQuery.matches) setIsOpen(false)
        }

        updateBreakpoint()
        desktopQuery.addEventListener("change", updateBreakpoint)

        return () => desktopQuery.removeEventListener("change", updateBreakpoint)
    }, [])

    const closeMenu = () => {
        setIsOpen(false)
        if (!isDesktop) menuButtonRef.current?.focus()
    }

    useEffect(() => {
        if (!isOpen || isDesktop) return

        const focusableElements = navigationRef.current?.querySelectorAll(
            'a[href], button:not([disabled]), input:not([disabled])'
        )
        focusableElements?.[0]?.focus()

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setIsOpen(false)
                menuButtonRef.current?.focus()
                return
            }

            if (event.key !== "Tab" || !focusableElements?.length) return

            const firstElement = focusableElements[0]
            const lastElement = focusableElements[focusableElements.length - 1]

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault()
                lastElement.focus()
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault()
                firstElement.focus()
            }
        }

        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [isOpen, isDesktop])

    useEffect(() => {
        if (!isOpen || isDesktop) return

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = previousOverflow
        }
    }, [isOpen, isDesktop])

    const isMobileDrawerClosed = !isDesktop && !isOpen
    const isMobileDrawerOpen = !isDesktop && isOpen

    return (
        <div className="min-h-screen w-full bg-cb-atmosphere-subtle text-white">
            <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/15 bg-cb-ink px-cb-4 lg:hidden">
                <Link to="/app/home" onClick={closeMenu} className="flex min-h-11 items-center gap-cb-2" aria-label="CoreBites home">
                    <img src={logo} alt="" className="h-9 w-9 object-contain" />
                    <span className="zen-dots-regular text-cb-lg text-white">CoreBites</span>
                </Link>
                <button
                    ref={menuButtonRef}
                    type="button"
                    aria-label={isOpen ? "Close learner navigation" : "Open learner navigation"}
                    aria-expanded={isOpen}
                    aria-controls="learner-navigation"
                    onClick={() => setIsOpen(true)}
                    className="flex size-11 items-center justify-center rounded-cb-sm text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cb-focus motion-reduce:transition-none"
                >
                    <FontAwesomeIcon icon={faBars} aria-hidden="true" />
                </button>
            </header>

            {isMobileDrawerOpen && (
                <button
                    type="button"
                    tabIndex={-1}
                    aria-hidden="true"
                    onClick={closeMenu}
                    className="fixed inset-0 z-40 bg-black/55 lg:hidden"
                />
            )}

            <div className="flex min-h-[calc(100vh-4rem)] lg:min-h-screen">
                <aside
                    id="learner-navigation"
                    ref={navigationRef}
                    aria-label="Learner navigation"
                    aria-hidden={isMobileDrawerClosed}
                    aria-modal={isMobileDrawerOpen ? "true" : undefined}
                    role={isMobileDrawerOpen ? "dialog" : undefined}
                    inert={isMobileDrawerClosed || undefined}
                    className={`fixed inset-y-0 left-0 z-50 h-dvh w-72 max-w-[calc(100vw-3rem)] transform border-r border-cb-border bg-cb-surface transition-transform duration-200 motion-reduce:transition-none lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:max-w-none lg:translate-x-0 lg:transform-none lg:transition-none ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
                >
                    <button
                        type="button"
                        aria-label="Close learner navigation"
                        onClick={closeMenu}
                        className="absolute right-3 top-3 z-10 flex size-11 items-center justify-center rounded-cb-sm text-cb-ink transition-colors hover:bg-cb-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cb-focus motion-reduce:transition-none lg:hidden"
                    >
                        <FontAwesomeIcon icon={faXmark} aria-hidden="true" />
                    </button>
                    <SideBar
                        image={image}
                        setImage={setImage}
                        userName={userName}
                        setUserName={setUserName}
                        onNavigate={closeMenu}
                    />
                </aside>

                <main
                    inert={isMobileDrawerOpen || undefined}
                    aria-hidden={isMobileDrawerOpen}
                    className="min-w-0 flex-1 overflow-x-clip"
                >
                    <div className="mx-auto w-full max-w-7xl px-cb-4 py-cb-5 sm:px-cb-6 sm:py-cb-8 lg:px-cb-8">
                        <Outlet />
                    </div>
                </main>
                </div>
        </div>
    )
}
