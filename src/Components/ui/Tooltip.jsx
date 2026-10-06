import { cloneElement, isValidElement, useId } from "react"

const positions = {
    top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
    bottom: "left-1/2 top-full mt-2 -translate-x-1/2",
    left: "right-full top-1/2 mr-2 -translate-y-1/2",
    right: "left-full top-1/2 ml-2 -translate-y-1/2",
}

export default function Tooltip({
    children,
    label,
    position = "top",
    className = "",
}) {
    const tooltipId = useId()

    if (!isValidElement(children)) {
        throw new Error("Tooltip requires a single valid React element as its child.")
    }

    const describedBy = [children.props["aria-describedby"], tooltipId]
        .filter(Boolean)
        .join(" ")
    const trigger = cloneElement(children, { "aria-describedby": describedBy })

    return (
        <span className={`group/tooltip relative inline-flex ${className}`}>
            {trigger}
            <span
                id={tooltipId}
                role="tooltip"
                className={`pointer-events-none invisible absolute z-50 max-w-56 whitespace-nowrap rounded-cb-sm bg-cb-ink px-cb-2 py-cb-1 text-center text-cb-xs font-cb-medium text-white opacity-0 shadow-cb-sm transition-opacity duration-150 group-hover/tooltip:visible group-hover/tooltip:opacity-100 group-focus-within/tooltip:visible group-focus-within/tooltip:opacity-100 motion-reduce:transition-none ${positions[position] || positions.top}`}
            >
                {label}
            </span>
        </span>
    )
}
