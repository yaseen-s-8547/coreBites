export default function WarningBlock({ block }) {
    return (
        <div className="mx-auto max-w-2xl border-l-4 border-yellow-500 pl-4">
            <p className="whitespace-pre-line text-base leading-8 text-yellow-300">
            {block.content}
            </p>
        </div>
    )
}
