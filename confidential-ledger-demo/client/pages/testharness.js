import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import {
    ExclamationCircleIcon,
    RefreshIcon,
    TableIcon,
} from "@heroicons/react/solid";
import BasicPage from "@/components/BasicPage";

export default function TestHarness() {
    const testguid = "9d965b53-1e92-4507-a3b6-49a38803cc68";
    const { data, error } = useSWR(`/api/ledger/${testguid}`, fetcher);

    if (error)
        return (
            <BasicPage title="Error loading test harness" icon={ExclamationCircleIcon} />
        )
    if (!data) {
        return <BasicPage title="Loading confidential ledger test harness" icon={RefreshIcon} />;
    }

    return (
        <BasicPage title="Test Harness" icon={TableIcon}>
            {JSON.stringify(data)}
        </BasicPage>
    );
}
