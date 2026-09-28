const controlClasses = "w-full rounded-cb-sm border border-cb-border bg-cb-surface px-cb-3 py-cb-2.5 text-cb-base leading-cb-body text-cb-ink placeholder:text-cb-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cb-focus disabled:cursor-not-allowed disabled:bg-cb-surface-muted disabled:text-cb-muted"

export function FieldLabel({ htmlFor, children, className = "" }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`mb-cb-2 block text-cb-sm font-cb-semibold text-cb-ink ${className}`}
    >
      {children}
    </label>
  )
}

export function Input({ className = "", ...props }) {
  return (
    <input
      className={`${controlClasses} ${className}`}
      {...props}
    />
  )
}

export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`${controlClasses} min-h-28 resize-y ${className}`}
      {...props}
    />
  )
}