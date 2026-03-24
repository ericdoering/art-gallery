import { CopyButton } from "./CopyButton";

type SaleDialogueProps = {
    title: string;
    artworkId: string;
    setIsOpen: (isOpen: boolean) => void;
};

export default function SaleDialogue({
    title,
    artworkId,
    setIsOpen,
}: SaleDialogueProps) {
    const email = "ericdoeringart@gmail.com";

    const subject = `Purchase: "${title}" - ${artworkId}`;
    const body = `I would like to purchase the artwork "${title}" - ${artworkId}.`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-white p-8 shadow-xl">
                <h2 className="text-2xl font-serif mb-6 text-black">
                    Thank you for your interest in <span className="whitespace-nowrap">&quot;{title}&quot;</span>
                </h2>
                <p className="text-lg font-serif mb-6 text-black">
                    Follow the steps below to secure your purchase:
                </p>
                <ol className="list-decimal list-inside space-y-8 text-sm text-black">
                    <li>
                        Email us at{" "}
                        <span className="font-medium text-blue-600">{email}</span>
                    </li>
                    <li>
                        Use this subject line:
                        <div className="flex items-center gap-2 font-medium text-red-600 mt-1">
                            <span>{subject}</span>
                            <CopyButton text={subject} />
                        </div>
                    </li>
                    <li>
                        Use this in the email body:
                        <div className="font-medium mt-1 text-red-600">
                            {body}
                            <CopyButton text={body} />
                        </div>
                    </li>
                    <li>
                        Send the email and expect a response within 24–48 hours.
                    </li>
                </ol>
                <button
                    onClick={() => setIsOpen(false)}
                    className="mt-6 w-full bg-black text-white py-3 text-sm font-sans uppercase tracking-widest hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                    Close
                </button>
            </div>
        </div>
    );
}