const variants = {
  primary: "border border-transparent bg-cb-primary text-cb-primary-contrast hover:bg-cb-primary-hover",
  secondary: "border border-cb-border bg-cb-surface text-cb-ink hover:bg-cb-surface-muted",
  subtle: "border border-transparent bg-cb-surface-muted text-cb-ink hover:bg-cb-border",
  danger: "border border-transparent bg-cb-danger text-white hover:bg-cb-danger-hover",
}

const sizes = {
  sm: "min-h-9 px-cb-3 py-cb-2 text-cb-xs",
  md: "min-h-10 px-cb-4 py-cb-2.5 text-cb-sm",
  lg: "min-h-12 px-cb-6 py-cb-3 text-cb-base",
}

export default function Button({
  variant = "primary",
  size = "md",
  type = "button",
  className = "",
  children,
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-cb-2 rounded-cb-sm font-cb-semibold leading-cb-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cb-focus focus-visible:ring-offset-2 focus-visible:ring-offset-cb-surface disabled:cursor-not-allowed disabled:opacity-55 ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}