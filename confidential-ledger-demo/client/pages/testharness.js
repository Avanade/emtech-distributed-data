import { useRouter } from "next/router";
import { TableIcon } from "@heroicons/react/solid";

export default function DataId() {
    const router = useRouter();
    const testguid = "9d965b53-1e92-4507-a3b6-49a38803cc68";
    return (
        <div className="py-10">
            <header>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                    <TableIcon className="-ml-1 mr-1 h-5 w-5" aria-hidden="true" />
                    <h1 className="text-3xl font-bold leading-tight text-gray-900">
                        My Data
                    </h1>
                </div>
            </header>
            <main>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="px-4 py-8 sm:px-0">
                        You're trying to look at {did}.
                    </div>
                </div>
            </main>
        </div>
    );
}
