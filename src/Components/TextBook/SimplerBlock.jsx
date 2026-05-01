export default function SimplerBlock({ block }) {
    return (
        <div className="mx-auto max-w-2xl border-l-4 border-sky-500 pl-4">
            <p className="whitespace-pre-line text-base leading-8 text-sky-200">
            {block.content}
            </p>
        </div>
    )
}
