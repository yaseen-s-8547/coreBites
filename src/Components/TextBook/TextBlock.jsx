export default function TextBlock({ block }) {
    return (
        <p className="mx-auto max-w-2xl whitespace-pre-line text-base leading-8 text-slate-300">
            {block.content}
        </p>
    )
}
