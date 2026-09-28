export default function Skeleton({ className = "", ...props }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse motion-reduce:animate-none rounded-cb-sm bg-cb-surface-muted ${className}`}
      {...props}
    />
  )
}