export default function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <header className="flex flex-col gap-cb-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow && (
          <p className="mb-cb-2 text-cb-xs font-cb-semibold uppercase text-cb-muted">
            {eyebrow}
          </p>
        )}
        <h1 className="text-cb-3xl font-cb-bold leading-cb-tight text-cb-ink">
          {title}
        </h1>
        {description && (
          <p className="mt-cb-2 max-w-2xl text-cb-base leading-cb-relaxed text-cb-muted">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex shrink-0 flex-wrap items-center gap-cb-2">
          {actions}
        </div>
      )}
    </header>
  )
}