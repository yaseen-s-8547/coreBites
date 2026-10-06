import { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBriefcase, faCheck } from "@fortawesome/free-solid-svg-icons"
import Tooltip from "./Tooltip"
import Toast from "./Toast"

const FEEDBACK_DURATION = 1800
const ERROR_TOAST_DURATION = 3000

export default function AddToBagButton({
    itemName,
    onAdd,
    onAdded,
    toastMessage = "Added to Your Bag",
    className = "",
}) {
    const [status, setStatus] = useState("idle")
    const [toast, setToast] = useState(null)
    const resetTimer = useRef(null)
    const toastTimer = useRef(null)
    const isAdded = status === "added"
    const isDisabled = status === "pending" || isAdded

    useEffect(() => () => {
        window.clearTimeout(resetTimer.current)
        window.clearTimeout(toastTimer.current)
    }, [])

    const dismissToast = () => {
        window.clearTimeout(toastTimer.current)
        setToast(null)
    }

    const handleAdd = async () => {
        if (isDisabled) return

        setStatus("pending")

        try {
            await onAdd()
        } catch (error) {
            setStatus("idle")
            setToast({
                message: error.response?.data?.message || "Unable to add this lesson. Please try again.",
                variant: "error",
            })
            toastTimer.current = window.setTimeout(dismissToast, ERROR_TOAST_DURATION)
            return
        }

        setStatus("added")
        setToast({ message: toastMessage, variant: "success" })
        resetTimer.current = window.setTimeout(() => {
            setStatus("idle")
        }, FEEDBACK_DURATION)
        toastTimer.current = window.setTimeout(dismissToast, FEEDBACK_DURATION)
        onAdded?.()
    }

    const label = isAdded
        ? "Added!"
        : status === "pending"
            ? "Adding..."
            : "Add lesson to Your Bag"

    return (
        <>
            <Tooltip label={label} position="left">
                <button
                    type="button"
                    aria-label={isAdded ? `${itemName} added to Your Bag` : `Add ${itemName} to Your Bag`}
                    aria-live="polite"
                    disabled={isDisabled}
                    onClick={handleAdd}
                    className={`flex min-h-10 min-w-10 items-center justify-center gap-2 rounded-cb-sm px-2 font-cb-semibold text-cb-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cb-focus disabled:cursor-not-allowed ${isAdded ? "bg-green-700 text-white" : "bg-cb-primary text-cb-primary-contrast hover:bg-cb-primary-hover disabled:opacity-70"} ${className}`}
                >
                    <FontAwesomeIcon
                        icon={isAdded ? faCheck : faBriefcase}
                        aria-hidden="true"
                    />
                    {isAdded && <span>Added!</span>}
                </button>
            </Tooltip>
            {toast && (
                <Toast
                    message={toast.message}
                    variant={toast.variant}
                    onDismiss={dismissToast}
                />
            )}
        </>
    )
}
