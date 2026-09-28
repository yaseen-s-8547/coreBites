const tones = {
  default: "border border-cb-border bg-cb-surface shadow-cb-sm",
  muted: "border border-cb-border bg-cb-surface-muted",
  plain: "bg-transparent",
}

const paddings = {
  none: "",
  sm: "p-cb-4",
  md: "p-cb-5 sm:p-cb-6",
  lg: "p-cb-6 sm:p-cb-8",
}

export default function Card({
  tone = "default",
  padding = "md",
  className = "",
  children,
  ...props
}) {
  return (
    <div
      className={`min-w-0 rounded-cb-md ${tones[tone] || tones.default} ${paddings[padding] ?? paddings.md} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}