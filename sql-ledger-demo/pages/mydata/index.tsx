import {
  TableIcon,
  ExclamationCircleIcon,
  RefreshIcon,
} from "@heroicons/react/solid";
import BasicPage from "@/components/BasicPage";
import ShareTable from "@/components/ShareTable";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export default function MyData() {
  const { data, error } = useSWR("/api/mydata", fetcher);

  if (error)
    return (
      <BasicPage
        title="Error loading shared data"
        icon={ExclamationCircleIcon}
      />
    );
  if (!data) return <BasicPage title="Loading feed" icon={RefreshIcon} />;

  let headerChildren = (
    <a
      href="/mydata/feed"
      type="button"
      className="inline-flex ml-8 items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      View Sharing Feed
    </a>
  );

  return (
    <BasicPage title="My Data" icon={TableIcon} headerChildren={headerChildren}>
      You are sharing the following data:
      <ShareTable data={data} />
    </BasicPage>
  );
}
