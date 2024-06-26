import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    return (
        <nav className="text-center mt-4">
            {links.map(link => (
                <Link
                    preserveScroll
                    href={link.url || ""}
                    key={link.label}
                    className={
                        "inline-block py-2 px-4 mx-1 rounded-lg text-xs " +
                        (link.active ? "bg-blue-600 text-white " : "bg-gray-200 text-gray-700 hover:bg-gray-300 ") +
                        (!link.url ? "text-gray-400 cursor-not-allowed" : "")
                    }
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </nav>
    );
}
