import {
  ExclamationCircleIcon,
  RefreshIcon,
  ShareIcon,
} from "@heroicons/react/solid";
import BasicPage from "@/components/BasicPage";
import Timeline from "@/components/Timeline";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export default function ShareFeed() {
  const { data, error } = useSWR("/api/feed", fetcher);

  if (error)
    return (
      <BasicPage title="Error loading feed" icon={ExclamationCircleIcon} />
    );
  if (!data) return <BasicPage title="Loading feed" icon={RefreshIcon} />;

  return (
    <BasicPage title="Data Shared Over Time" icon={ShareIcon}>
      <Timeline feed={data} />
    </BasicPage>
  );
}
