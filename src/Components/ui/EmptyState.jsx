export default function EmptyState({ title, description, action, className = "" }) {
  return (
    <section
      role="status"
      className={`flex flex-col items-start gap-cb-3 border-l-2 border-cb-border py-cb-2 pl-cb-5 ${className}`}
    >
      <h2 className="text-cb-xl font-cb-semibold leading-cb-tight text-cb-ink">
        {title}
      </h2>
      {description && (
        <p className="max-w-xl text-cb-base leading-cb-relaxed text-cb-muted">
          {description}
        </p>
      )}
      {action}
    </section>
  )
}