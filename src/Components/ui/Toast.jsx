export default function Toast({
    message,
    variant = "success",
    onDismiss,
    className = "",
}) {
    const isSuccess = variant === "success"

    return (
        <div
            role={isSuccess ? "status" : "alert"}
            className={`fixed bottom-5 right-5 z-[100] flex max-w-[calc(100vw-2.5rem)] items-center gap-cb-3 rounded-cb-md border border-cb-border border-l-4 ${isSuccess ? "border-l-green-600" : "border-l-red-600"} bg-cb-surface px-cb-4 py-cb-3 text-cb-sm text-cb-ink shadow-cb-sm ${className}`}
        >
            <span
                aria-hidden="true"
                className={`flex size-7 shrink-0 items-center justify-center rounded-full ${isSuccess ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
            >
                {isSuccess ? "✓" : "!"}
            </span>
            <span>{message}</span>
            {onDismiss && (
                <button
                    type="button"
                    aria-label="Dismiss notification"
                    onClick={onDismiss}
                    className="ml-cb-2 flex size-8 shrink-0 items-center justify-center rounded-cb-sm text-cb-muted hover:bg-cb-surface-muted hover:text-cb-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cb-focus"
                >
                    <span aria-hidden="true">×</span>
                </button>
            )}
        </div>
    )
}
